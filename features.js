// Phonics Lab — 新增功能：生词本 / 听写 / 拼写动画
// 依赖：app.js 已经把 DB / Phonics / $ / speak / ipaToSpoken 暴露在合适位置

(function () {
  const $ = (id) => document.getElementById(id);

  // ============================================================
  // 生词本（localStorage 持久化）
  // ============================================================
  const WB_KEY = "phonics_lab_wordbook_v1";

  function loadWordbook() {
    try { return JSON.parse(localStorage.getItem(WB_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function saveWordbook(wb) {
    try { localStorage.setItem(WB_KEY, JSON.stringify(wb)); } catch (e) {}
  }
  function isInWordbook(word) { return loadWordbook().includes(word); }
  function toggleWordbook(word) {
    let wb = loadWordbook();
    if (wb.includes(word)) wb = wb.filter(w => w !== word);
    else wb.push(word);
    saveWordbook(wb);
    updateWordbookCount();
    return wb.includes(word);
  }
  function updateWordbookCount() {
    const n = loadWordbook().length;
    const el = $("wordbookCount");
    if (el) el.textContent = n;
  }

  // 暴露给 app.js
  window.Wordbook = { load: loadWordbook, isIn: isInWordbook, toggle: toggleWordbook, count: () => loadWordbook().length };

  function renderWordbookDrawer() {
    const wb = loadWordbook();
    const list = $("wordbookList");
    if (!wb.length) {
      list.innerHTML = `<div class="wb-empty">还没有生词<br><br>点击卡片 ⭐ 收藏</div>`;
      return;
    }
    list.innerHTML = wb.map(w => {
      // 查 DB 拿 IPA
      const data = window.DB && window.DB[w];
      const ipa = data && window.Phonics ? `/${window.Phonics.analyze(w, data).ipaFull}/` : "";
      return `
        <div class="wb-item" data-word="${w}">
          <div>
            <div class="wb-word">${w}</div>
            <div class="wb-ipa">${ipa}</div>
          </div>
          <div>
            <button class="wb-del" data-word="${w}" title="删除">×</button>
          </div>
        </div>`;
    }).join("");
    list.querySelectorAll(".wb-del").forEach(btn => {
      btn.addEventListener("click", () => {
        const w = btn.dataset.word;
        toggleWordbook(w);
        renderWordbookDrawer();
        // 同步更新页面上所有卡片的星标
        document.querySelectorAll(`.card`).forEach(c => {
          if (c.querySelector(".word")?.textContent === w) {
            const star = c.querySelector(".star-btn");
            if (star) { star.classList.remove("starred"); star.textContent = "☆"; }
          }
        });
      });
    });
  }

  function setupWordbook() {
    updateWordbookCount();
    $("wordbookBtn").addEventListener("click", () => {
      $("wordbookDrawer").hidden = false;
      renderWordbookDrawer();
    });
    // 监听生词本变化事件（从卡片点星触发）
    window.addEventListener("wordbook:changed", () => {
      if (!$("wordbookDrawer").hidden) renderWordbookDrawer();
      updateWordbookCount();
    });
    $("drawerClose").addEventListener("click", () => {
      $("wordbookDrawer").hidden = true;
    });
    $("wbGenBtn").addEventListener("click", () => {
      const wb = loadWordbook();
      if (!wb.length) { alert("生词本是空的，先收藏一些词吧"); return; }
      document.querySelector('.tab[data-tab="manual"]').click();
      $("wordInput").value = wb.join("\n");
      $("wordbookDrawer").hidden = true;
      $("genBtn").click();
    });
    $("wbExportBtn").addEventListener("click", () => {
      const wb = loadWordbook();
      if (!wb.length) { alert("生词本是空的"); return; }
      const csv = "word,ipa\n" + wb.map(w => {
        const data = window.DB && window.DB[w];
        const ipa = data && window.Phonics ? `/${window.Phonics.analyze(w, data).ipaFull}/` : "";
        return `${w},${ipa}`;
      }).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `phonics_lab_wordbook_${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
    $("wbClearBtn").addEventListener("click", () => {
      if (!confirm("确定清空生词本？")) return;
      saveWordbook([]);
      updateWordbookCount();
      renderWordbookDrawer();
    });
  }

  // ============================================================
  // 听写模式
  // ============================================================
  const Dictation = {
    queue: [],
    current: null,
    idx: 0,
    attempts: 0,
    correct: 0,
    wrong: 0,
  };

  function speak(text, rate = 0.9) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
    const u = new SpeechSynthesisUtterance(text);
    u.lang = (document.querySelector('input[name="accent"]:checked') || {}).value || "en-US";
    u.rate = rate;
    window.speechSynthesis.speak(u);
    return u;
  }

  function getAccent() {
    return (document.querySelector('input[name="accent"]:checked') || {}).value || "en-US";
  }

  function setupDictation() {
    $("dictationBtn").addEventListener("click", () => {
      const raw = $("wordInput").value;
      const words = raw.split(/[\s,，;；\n\r]+/).map(w => w.trim().toLowerCase()).filter(Boolean);
      if (!words.length) {
        alert("先在输入框里放几个词，再点听写");
        return;
      }
      Dictation.queue = words.slice(0, 30);  // 最多 30 个
      Dictation.idx = 0;
      Dictation.attempts = 0;
      Dictation.correct = 0;
      Dictation.wrong = 0;
      $("dictationOverlay").hidden = false;
      $("dictationInput").value = "";
      $("dictationInput").classList.remove("correct", "wrong");
      $("dictationFeedback").textContent = "";
      $("dictationFeedback").className = "dictation-feedback";
      nextDictationWord();
    });

    $("dictationClose").addEventListener("click", endDictation);
    $("dictationInput").addEventListener("keydown", e => {
      if (e.key === "Enter") checkDictation();
    });
    $("dictCheckBtn").addEventListener("click", checkDictation);
    $("dictSkipBtn").addEventListener("click", () => {
      Dictation.wrong++;
      nextDictationWord();
    });
    $("dictPlayWord").addEventListener("click", () => {
      if (Dictation.current) speak(Dictation.current, 0.9);
    });
    $("dictPlaySlow").addEventListener("click", () => {
      if (Dictation.current) speak(Dictation.current, 0.5);
    });
    $("dictPlayPhoneme").addEventListener("click", () => {
      if (!Dictation.current || !window.Phonics) return;
      const data = window.DB && window.DB[Dictation.current];
      if (!data) return;
      const analyzed = window.Phonics.analyze(Dictation.current, data);
      const sounds = analyzed.phonemes.map(p => ipaToSpoken(p.ipa));
      try { window.speechSynthesis.cancel(); } catch(e) {}
      let i = 0;
      function next() {
        if (i >= sounds.length) return;
        const u = new SpeechSynthesisUtterance(sounds[i]);
        u.lang = getAccent();
        u.rate = 0.7;
        u.pitch = 1.2;
        u.onend = next;
        window.speechSynthesis.speak(u);
        i++;
      }
      next();
    });
  }

  function nextDictationWord() {
    if (Dictation.idx >= Dictation.queue.length) {
      endDictation();
      return;
    }
    Dictation.current = Dictation.queue[Dictation.idx];
    Dictation.attempts = 0;
    $("dictationProgress").textContent = `${Dictation.idx + 1} / ${Dictation.queue.length}`;
    $("dictationInput").value = "";
    $("dictationInput").classList.remove("correct", "wrong");
    $("dictationInput").disabled = false;
    $("dictationFeedback").textContent = "";
    $("dictationFeedback").className = "dictation-feedback";
    $("dictationPrompt").textContent = "听一听，写一写";
    // 显示 IPA 当提示
    const data = window.DB && window.DB[Dictation.current];
    if (data && window.Phonics) {
      const ipa = window.Phonics.analyze(Dictation.current, data).ipaFull;
      $("dictationIPA").textContent = `/${ipa}/`;
    } else {
      $("dictationIPA").textContent = "";
    }
    $("dictationInput").focus();
    // 自动播放一次
    setTimeout(() => speak(Dictation.current, 0.85), 250);
  }

  function checkDictation() {
    if (!Dictation.current) return;
    const input = $("dictationInput").value.trim().toLowerCase();
    if (!input) {
      $("dictationFeedback").textContent = "✏️ 写点什么再检查";
      return;
    }
    Dictation.attempts++;
    if (input === Dictation.current) {
      $("dictationInput").classList.add("correct");
      $("dictationInput").classList.remove("wrong");
      $("dictationFeedback").textContent = Dictation.attempts === 1 ? "✓ 一次过！厉害 ✨" : "✓ 对了～";
      $("dictationFeedback").className = "dictation-feedback ok";
      Dictation.correct++;
      $("dictationInput").disabled = true;
      // 显示答案
      $("dictationPrompt").innerHTML = Dictation.current.split("").map(c => `<span>${c}</span>`).join("");
      setTimeout(() => {
        Dictation.idx++;
        nextDictationWord();
      }, 1000);
    } else {
      $("dictationInput").classList.add("wrong");
      $("dictationFeedback").textContent = `✗ 再听一次试试（已尝试 ${Dictation.attempts} 次）`;
      $("dictationFeedback").className = "dictation-feedback no";
      Dictation.wrong++;
      // 错了自动再读一遍
      setTimeout(() => speak(Dictation.current, 0.7), 300);
    }
  }

  function endDictation() {
    $("dictationOverlay").hidden = true;
    if (Dictation.correct + Dictation.wrong > 0) {
      const total = Dictation.correct + Dictation.wrong;
      const pct = Math.round(Dictation.correct * 100 / total);
      alert(`听写完成！\n\n正确 ${Dictation.correct} / 共 ${total}（${pct}%）`);
    }
  }

  // ============================================================
  // 拼写动画（导出独立 HTML）
  // ============================================================
  let animState = null;

  function setupAnimation() {
    $("animBtn").addEventListener("click", () => {
      const raw = $("wordInput").value.trim();
      const word = raw.split(/[\s,，;；\n\r]+/)[0];
      if (!word) { alert("先输入一个词再生成拼写动画"); return; }
      openAnimation(word.toLowerCase());
    });
    $("animClose").addEventListener("click", () => {
      $("animModal").hidden = true;
      try { window.speechSynthesis.cancel(); } catch(e) {}
    });
    $("animPlay").addEventListener("click", playAnimation);
    $("animReplay").addEventListener("click", () => {
      resetAnimation(); playAnimation();
    });
    $("animExport").addEventListener("click", exportAnimation);
  }

  function openAnimation(word) {
    $("animWord").textContent = word;
    $("animModal").hidden = false;
    animState = { word, letters: word.split(""), data: window.DB && window.DB[word] };
    resetAnimation();
    // 自动播放一次
    setTimeout(playAnimation, 400);
  }

  function resetAnimation() {
    const stage = $("animLetters");
    if (!animState) return;
    stage.innerHTML = animState.letters.map(ch => {
      const isVowel = "aeiou".includes(ch);
      return `<div class="anim-letter ${isVowel ? 'vowel' : ''}" data-l="${ch}">${ch}</div>`;
    }).join("");
    $("animSound").textContent = "";
  }

  function playAnimation() {
    if (!animState) return;
    resetAnimation();
    const letters = $("animLetters").querySelectorAll(".anim-letter");
    const sound = $("animSound");
    const data = animState.data;
    let analyzed = null;
    if (data && window.Phonics) {
      analyzed = window.Phonics.analyze(animState.word, data);
    }

    try { window.speechSynthesis.cancel(); } catch(e) {}

    let i = 0;
    function playOne() {
      if (i >= letters.length) {
        // 整词读
        setTimeout(() => {
          sound.textContent = `/${analyzed ? analyzed.ipaFull : animState.word}/`;
          speak(animState.word, 0.85);
        }, 200);
        return;
      }
      const el = letters[i];
      el.classList.add("shown");
      // 找出当前字母对应的音素
      let soundText = "";
      if (analyzed && analyzed.phonemes[i]) {
        soundText = `/${analyzed.phonemes[i].ipa}/`;
      }
      sound.textContent = soundText;
      // 读这个音
      const u = new SpeechSynthesisUtterance(ipaToSpoken(soundText.replace(/\//g, "")) || animState.letters[i]);
      u.lang = getAccent();
      u.rate = 0.7;
      u.pitch = 1.2;
      u.onend = () => {
        i++;
        setTimeout(playOne, 250);
      };
      window.speechSynthesis.speak(u);
    }
    setTimeout(playOne, 100);
  }

  function ipaToSpoken(ipa) {
    const map = {
      "ɑ":"ah","æ":"a","ʌ":"uh","ɔ":"aw","ɛ":"eh","ɜr":"er","ɪ":"ih","ʊ":"oo",
      "iː":"ee","uː":"oo","eɪ":"ay","aɪ":"eye","aʊ":"ow","oʊ":"oh","ɔɪ":"oy",
      "ʃ":"sh","tʃ":"ch","ð":"th","θ":"th","ŋ":"ng","dʒ":"j","ɡ":"g","ʒ":"zh","j":"y"
    };
    let out = "";
    for (const ch of ipa) out += (map[ch] || ch) + " ";
    return out.trim();
  }

  // ===== 导出独立 HTML（自包含，可分享/反复观看）=====
  function exportAnimation() {
    if (!animState) return;
    const { word, letters } = animState;
    const data = animState.data;
    let ipa = word, phonemes = [];
    if (data && window.Phonics) {
      const a = window.Phonics.analyze(word, data);
      ipa = a.ipaFull;
      phonemes = a.phonemes.map(p => p.ipa);
    }

    // 生成自包含的 HTML
    const lettersHTML = letters.map(ch => {
      const isVowel = "aeiou".includes(ch);
      return `<div class="al ${isVowel ? 'v' : 'c'}">${ch}</div>`;
    }).join("");
    const phonemesHTML = phonemes.map(p => `<span class="ph">/${p}/</span>`).join(" ");

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>Spelling · ${word}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Helvetica Neue","PingFang SC",sans-serif;background:linear-gradient(135deg,#fff9f2 0%,#ffeae0 100%);min-height:100vh;display:grid;place-items:center;padding:20px;color:#2d3142}
  .box{background:#fff;border-radius:24px;padding:48px 40px;box-shadow:0 20px 50px rgba(45,49,66,.1);text-align:center;max-width:540px;width:100%}
  h1{font-size:42px;font-weight:800;letter-spacing:6px;margin-bottom:8px}
  .ipa{font-family:"SF Mono","Menlo",monospace;color:#6B4FA0;font-size:18px;margin-bottom:32px}
  .stage{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:24px 0;min-height:90px;align-items:center}
  .al{width:62px;height:74px;border:2.5px solid #e0d5c5;border-radius:12px;display:grid;place-items:center;font-size:44px;font-weight:800;color:#b6bcc8;background:#fafafa;transition:all .3s}
  .al.shown{transform:scale(1.1);background:#ffe4da;border-color:#ff8b6b;color:#ff8b6b;box-shadow:0 4px 14px rgba(255,139,107,.3)}
  .al.v{color:#ff8b6b}
  .al.v.shown{background:#ffe4da;border-color:#ff8b6b}
  .ph-box{font-family:"SF Mono",monospace;color:#6B4FA0;font-size:18px;min-height:28px;margin-bottom:20px}
  .ph{display:inline-block;background:#ECE4F5;padding:2px 10px;border-radius:99px;margin:2px 3px;font-size:14px}
  .ctrl{display:flex;gap:8px;justify-content:center;margin-top:18px}
  button{padding:10px 22px;border:none;border-radius:99px;font-size:14px;font-weight:700;cursor:pointer;transition:all .15s;font-family:inherit}
  .play{background:#ff8b6b;color:#fff}
  .play:hover{transform:translateY(-1px);box-shadow:0 6px 14px rgba(255,139,107,.4)}
  .replay{background:#fdf3e7;color:#6b7280}
  .replay:hover{background:#ffe4da;color:#ff8b6b}
  .wordmark{margin-top:24px;font-size:11px;color:#b6bcc8}
</style>
</head>
<body>
<div class="box">
  <h1>${word}</h1>
  <div class="ipa">/${ipa}/</div>
  <div class="stage" id="stage">${lettersHTML}</div>
  <div class="ph-box" id="phBox">${phonemesHTML}</div>
  <div class="ctrl">
    <button class="play" id="play">▶ 播放</button>
    <button class="replay" id="replay">↻ 重播</button>
  </div>
  <div class="wordmark">Phonics Lab · 拼写动画</div>
</div>
<script>
const letters = document.querySelectorAll('.al');
const phBox = document.getElementById('phBox');
const phonemes = ${JSON.stringify(phonemes)};
const word = ${JSON.stringify(word)};
const phs = document.querySelectorAll('.ph');

function reset(){letters.forEach(l=>l.classList.remove('shown'));phs.forEach(p=>p.classList.remove('active'));phBox.dataset.idx='-1';}

function play(){
  reset();
  let i=0;
  function next(){
    if(i>=letters.length){
      setTimeout(()=>{phBox.dataset.idx='all';phs.forEach(p=>p.classList.add('active'));speak(word,0.85);},200);
      return;
    }
    letters[i].classList.add('shown');
    if(phs[i]) phs[i].classList.add('active');
    const u = new SpeechSynthesisUtterance(spoken(phonemes[i]||letters[i].textContent));
    u.rate=0.7;u.pitch=1.2;u.onend=()=>{i++;setTimeout(next,250);};
    speechSynthesis.speak(u);
  }
  setTimeout(next,100);
}

function spoken(ipa){
  const m={"ɑ":"ah","æ":"a","ʌ":"uh","ɔ":"aw","ɛ":"eh","ɜr":"er","ɪ":"ih","ʊ":"oo","iː":"ee","uː":"oo","eɪ":"ay","aɪ":"eye","aʊ":"ow","oʊ":"oh","ɔɪ":"oy","ʃ":"sh","tʃ":"ch","ð":"th","θ":"th","ŋ":"ng","dʒ":"j","ɡ":"g","ʒ":"zh","j":"y"};
  return ipa.split('').map(c=>m[c]||c).join(' ');
}

function speak(text,rate){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=rate;speechSynthesis.speak(u);}

document.getElementById('play').addEventListener('click',play);
document.getElementById('replay').addEventListener('click',play);
setTimeout(play,500);
<\/script>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spell_${word}.html`;
    a.click();
    URL.revokeObjectURL(url);
    flash(`已导出 ${word} 的拼写动画`, "success");
  }

  // ============================================================
  // 启动
  // ============================================================
  document.addEventListener("DOMContentLoaded", () => {
    setupWordbook();
    setupDictation();
    setupAnimation();
  });
})();
