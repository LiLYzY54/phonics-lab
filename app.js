// Phonics Lab — 主程序（v2：架构升级版）

(function () {
  const $ = (id) => document.getElementById(id);

  // ===== 词库（合并 words.js 手工 + words-extra.json 自动）=====
  // 优先级：words.js (人工高质量) > words-extra.json (自动批量)
  const DB = Object.create(null);
  const DB_META = Object.create(null);  // { source: "manual" | "auto" }
  window.DB = DB;  // 暴露给 features.js 使用

  async function loadAll() {
    // 1. 手工核心词
    if (window.WORD_DB) {
      Object.entries(window.WORD_DB).forEach(([w, data]) => {
        DB[w] = data;
        DB_META[w] = "manual";
      });
    }
    // 2. 词族信息（仅手动词有）
    if (window.WORD_FAMILIES) {
      window.WORD_FAMILIES = window.WORD_FAMILIES;
    }

    // 3. 自动扩充词
    try {
      const resp = await fetch("data/words-extra.json");
      if (resp.ok) {
        const extra = await resp.json();
        let added = 0;
        Object.entries(extra).forEach(([w, data]) => {
          if (!DB[w]) {
            DB[w] = data;
            DB_META[w] = "auto";
            added++;
          }
        });
        console.log(`已加载额外 ${added} 词`);
      }
    } catch (e) {
      console.warn("加载扩展词库失败:", e);
    }

    const total = Object.keys(DB).length;
    const manual = Object.values(DB_META).filter(s => s === "manual").length;
    const auto = Object.values(DB_META).filter(s => s === "auto").length;
    flash(`词库就绪 · ${total} 词（${manual} 人工 + ${auto} 自动）`, "success");
    updateDbStats();
  }

  function updateDbStats() {
    const el = $("dbStats");
    if (el && Object.keys(DB).length) {
      el.textContent = `📚 词库: ${Object.keys(DB).length}`;
    }
  }

  // ===== 工具：把单词拆成 grapheme 块（兜底用，DB 里有就直接用）=====
  const FALLBACK_RULES = [
    [/^(thr|str|spr|scr|spl|shr|skw|sch)$/],
    [/^(sh|ch|th|wh|ph|ck|ng|qu|ai|ay|ee|ea|ie|oa|ow|ou|oy|oi|aw|au|ew|oo|ar|er|ir|or|ur|al|ue|wr|kn|gn)$/],
    [/^[bcdfghjklmnpqrstvwxyz]$/],
    [/^[aeiou]$/],
  ];
  const FALLBACK_SOUNDS = {
    "sh":"ʃ","ch":"tʃ","th":"θ","wh":"w","ph":"f","ck":"k","ng":"ŋ","qu":"kw",
    "ai":"eɪ","ay":"eɪ","ee":"iː","ea":"iː","ie":"iː","oa":"oʊ","ow":"oʊ","ou":"aʊ",
    "oy":"ɔɪ","oi":"ɔɪ","aw":"ɔ","au":"ɔ","ew":"juː","oo":"uː",
    "ar":"ɑr","er":"ɜr","ir":"ɜr","or":"ɔr","ur":"ɜr","al":"ɔl",
    "thr":"θr","str":"str","spr":"spr","scr":"skr","spl":"spl","shr":"ʃr","skw":"skw","sch":"sk",
    "a":"æ","e":"ɛ","i":"ɪ","o":"ɑ","u":"ʌ",
    "b":"b","c":"k","d":"d","f":"f","g":"ɡ","h":"h","j":"dʒ","k":"k","l":"l","m":"m","n":"n","p":"p","q":"k","r":"r","s":"s","t":"t","v":"v","w":"w","x":"ks","y":"j","z":"z",
  };

  function fallbackAnalyze(word) {
    const w = word.toLowerCase();
    const out = [];
    let i = 0;
    while (i < w.length) {
      let matched = null;
      for (let len = Math.min(3, w.length - i); len > 0; len--) {
        const slice = w.slice(i, i + len);
        for (const [re] of FALLBACK_RULES) {
          if (re.test(slice) && slice.match(re)[0] === slice) {
            matched = slice;
            break;
          }
        }
        if (matched) break;
      }
      if (!matched) { out.push({ g: w[i], s: "" }); i++; }
      else { out.push({ g: matched, s: FALLBACK_SOUNDS[matched] || "" }); i += matched.length; }
    }
    return { cmu: "", graphemes: out, pos: "", family: "", example: "", _fallback: true };
  }

  // ===== 切分音节（基于 grapheme 中"实读"元音的位置）=====
  function splitSyllables(graphemes) {
    const isVowelG = (g, idx, all) => {
      const lc = g.g.toLowerCase();
      if (["ai","ay","ee","ea","ie","oa","ow","oy","oi","aw","au","ew","oo","ar","er","ir","or","ur","al","igh","ue","ui","ou"].includes(lc)) return true;
      if (["sch","thr","str","spr","scr","spl","shr","skw"].includes(lc)) return false;
      const isLast = idx === all.length - 1;
      if (lc === "e" && isLast) return false;
      if (/^[aeiouy]$/.test(lc)) return true;
      return false;
    };
    const vowelIdx = [];
    graphemes.forEach((g, i) => { if (isVowelG(g, i, graphemes)) vowelIdx.push(i); });
    if (vowelIdx.length <= 1) return [graphemes];
    const groups = [];
    let cur = [];
    const splitSet = new Set(vowelIdx.slice(0, -1).map(i => i + 1));
    graphemes.forEach((g, i) => {
      cur.push(g);
      if (splitSet.has(i + 1) && i + 1 < graphemes.length) {
        groups.push(cur);
        cur = [];
      }
    });
    if (cur.length) groups.push(cur);
    return groups;
  }

  // ===== 把 grapheme 数组"展开"成显示用的字母块 =====
  function expandGraphemesForDisplay(graphemes) {
    const out = [];
    graphemes.forEach(g => {
      if (g.silent) {
        out.push({ g: g.g, s: "", kind: "silent", stressed: false });
        return;
      }
      const cat = window.Phonics.classify(g.g);
      out.push({ g: g.g, s: g.s, kind: cat, stressed: g.stressed });
    });
    return out;
  }

  function graphemeToSpelling(g) { return g.g; }

  // ===== 拼读规则解释（从 grapheme 推测）=====
  function explainRule(graphemes) {
    if (!graphemes || graphemes.length < 1) return null;
    // 找最长的"非单字母" grapheme（这些最有解释价值）
    const notable = graphemes.find(g => g.g.length > 1 && !g.silent);
    if (!notable) return null;
    const lc = notable.g.toLowerCase();
    const rules = {
      "sh": "sh: /ʃ/ 两字母共同发一个音",
      "ch": "ch: /tʃ/ 字母组合",
      "th": "th: /θ/ 或 /ð/ 咬舌音",
      "wh": "wh: /w/（美音）",
      "ph": "ph: /f/（ph 替代 f）",
      "ck": "ck: /k/ 紧跟短元音后的 k",
      "ng": "ng: /ŋ/ 鼻音",
      "qu": "qu: /kw/",
      "ai": "ai: /eɪ/ 长元音 a 的字母组合",
      "ay": "ay: /eɪ/ 词尾的 ai",
      "ee": "ee: /iː/ 长元音 e",
      "ea": "ea: /iː/（多数情况）",
      "oa": "oa: /oʊ/ 长元音 o",
      "ow": "ow: /oʊ/（作元音组合）",
      "ou": "ou: /aʊ/（多数情况）",
      "oo": "oo: /uː/（多数情况）",
      "ar": "ar: /ɑr/ R 控制元音",
      "er": "er: /ɜr/ R 控制元音",
      "or": "or: /ɔr/ R 控制元音",
      "igh": "igh: /aɪ/ 长元音 i 的字母组合",
      "ai_e": "a_e: silent e 让 a 发本身音 /eɪ/",
      "i_e": "i_e: silent e 让 i 发 /aɪ/",
      "o_e": "o_e: silent e 让 o 发 /oʊ/",
      "u_e": "u_e: silent e 让 u 发 /juː/",
    };
    return rules[lc] || `${lc}: 字母组合`;
  }

  // ===== 主渲染：把输入 → 单词卡 =====
  function renderWord(word) {
    const w = word.toLowerCase().trim();
    if (!w) return null;
    const dbEntry = DB[w];
    const isKnown = !!dbEntry;
    const data = isKnown ? dbEntry : fallbackAnalyze(w);
    const analyzed = window.Phonics.analyze(w, data);

    const syllableGroups = splitSyllables(analyzed.graphemes);
    const syllableTexts = syllableGroups.map(g => g.map(x => graphemeToSpelling(x)).join(""));
    const stressIndex = analyzed.syllables.findIndex(s => s.stressed === "primary");
    const familyWords = (data.family && window.WORD_FAMILIES && window.WORD_FAMILIES[data.family]) || [];
    const rule = explainRule(analyzed.graphemes);
    const source = DB_META[w] || (data._fallback ? "fallback" : "manual");

    return {
      word: w, isKnown, data, analyzed, syllableGroups,
      syllableTexts, stressIndex, familyWords, rule, source,
    };
  }

  // ===== 渲染单张卡片 =====
  function renderCard(info) {
    const tmpl = $("cardTemplate").content.cloneNode(true);
    const card = tmpl.querySelector(".card");
    if (!info.isKnown) card.classList.add("unknown");
    if (info.source === "auto") card.classList.add("auto");

    card.querySelector(".word").textContent = info.word;

    const sylBreak = card.querySelector(".syllable-break");
    if (info.syllableTexts.length > 1) {
      sylBreak.innerHTML = info.syllableTexts
        .map((s, i) => `<span>${s}</span>${i < info.syllableTexts.length-1 ? '<span class="syll-dot">·</span>' : ""}`)
        .join("");
    } else {
      sylBreak.style.display = "none";
    }

    if ($("optIPA").checked) {
      card.querySelector(".ipa").textContent = `/${info.analyzed.ipaFull || "—"}/`;
    } else {
      card.querySelector(".ipa").style.display = "none";
    }

    if ($("optPhonics").checked && info.analyzed.phonicsFull) {
      card.querySelector(".phonics").textContent = info.analyzed.phonicsFull;
    } else {
      card.querySelector(".phonics").style.display = "none";
    }

    // grapheme 块
    const gRow = card.querySelector(".grapheme-row");
    const expanded = expandGraphemesForDisplay(info.analyzed.graphemes);
    let expIdx = 0;
    info.syllableGroups.forEach((group, sylIdx) => {
      const gCount = group.length;
      for (let k = 0; k < gCount && expIdx < expanded.length; k++) {
        const eg = expanded[expIdx];
        const el = document.createElement("div");
        el.className = `grapheme cat-${eg.kind}`;
        if (info.stressIndex === sylIdx && eg.kind === "vowel") {
          el.classList.add("cat-stress-primary");
        }
        el.innerHTML = `
          <span class="g-text">${eg.g}</span>
          <span class="g-sound">${eg.s ? "/" + eg.s + "/" : ""}</span>
        `;
        gRow.appendChild(el);
        expIdx++;
      }
    });

    const posEl = card.querySelector(".pos");
    if (info.data.pos) {
      posEl.textContent = `📚 ${info.data.pos}`;
    } else { posEl.style.display = "none"; }

    const famEl = card.querySelector(".family");
    if (info.data.family && $("optFamily").checked) {
      const others = info.familyWords.filter(x => x !== info.word).slice(0, 4);
      famEl.textContent = `👨‍👩‍👧 family: ${info.data.family}` + (others.length ? ` · ${others.join("/")}` : "");
    } else { famEl.style.display = "none"; }

    card.querySelector(".count").textContent = `🔊 ${info.syllableTexts.length} 音节`;

    const exEl = card.querySelector(".example");
    if (info.data.example && $("optExample").checked) {
      card.querySelector(".ex-text").textContent = info.data.example;
      // 例句 TTS
      const exPlayBtn = card.querySelector(".play-ex");
      exPlayBtn.addEventListener("click", () => {
        exPlayBtn.classList.add("playing");
        const u = speak(info.data.example, 0.85, 1);
        u.onend = () => exPlayBtn.classList.remove("playing");
      });
    } else { exEl.style.display = "none"; }

    // 生词本星标
    const starBtn = card.querySelector(".star-btn");
    const wordbook = window.Wordbook ? window.Wordbook.load() : [];
    if (wordbook.includes(info.word)) starBtn.classList.add("starred"), starBtn.textContent = "★";
    starBtn.addEventListener("click", () => {
      const nowIn = window.Wordbook.toggle(info.word);
      if (nowIn) {
        starBtn.classList.add("starred");
        starBtn.textContent = "★";
        flash(`已收藏 "${info.word}" 到生词本`, "success");
      } else {
        starBtn.classList.remove("starred");
        starBtn.textContent = "☆";
        flash(`已从生词本移除`, "");
      }
      window.dispatchEvent(new Event("wordbook:changed"));
    });

    // 拼读规则提示
    const ruleEl = card.querySelector(".rule");
    if (info.rule && $("optShowRule").checked) {
      ruleEl.textContent = `📐 ${info.rule}`;
    } else { ruleEl.style.display = "none"; }

    // 音频
    const accent = document.querySelector('input[name="accent"]:checked').value;
    function speak(text, rate = 0.9, pitch = 1) {
      try { window.speechSynthesis.cancel(); } catch(e) {}
      const u = new SpeechSynthesisUtterance(text);
      u.lang = accent;
      u.rate = rate;
      u.pitch = pitch;
      const voices = window.speechSynthesis.getVoices();
      const v = voices.find(v => v.lang === accent) || voices.find(v => v.lang.startsWith("en"));
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
      return u;
    }

    const wordBtn = card.querySelector(".play-word");
    wordBtn.addEventListener("click", () => {
      wordBtn.classList.add("playing");
      const u = speak(info.word, 0.9, 1);
      u.onend = () => wordBtn.classList.remove("playing");
    });

    const slowBtn = card.querySelector(".play-slow");
    slowBtn.addEventListener("click", () => {
      slowBtn.classList.add("playing");
      const u = speak(info.word, 0.5, 1);
      u.onend = () => slowBtn.classList.remove("playing");
    });

    const phBtn = card.querySelector(".play-phoneme");
    phBtn.addEventListener("click", () => {
      phBtn.classList.add("playing");
      const sounds = info.analyzed.phonemes.map(p => ipaToSpoken(p.ipa));
      try { window.speechSynthesis.cancel(); } catch(e) {}
      let i = 0;
      function next() {
        if (i >= sounds.length) {
          phBtn.classList.remove("playing");
          return;
        }
        const u = new SpeechSynthesisUtterance(sounds[i]);
        u.lang = accent;
        u.rate = 0.7;
        u.pitch = 1.2;
        u.onend = next;
        window.speechSynthesis.speak(u);
        i++;
      }
      next();
    });

    return card;
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
  window.ipaToSpoken = ipaToSpoken;  // 暴露给 features.js

  // ===== 主入口：生成 =====
  function generate() {
    const raw = $("wordInput").value;
    const words = raw.split(/[\s,，;；\n\r]+/).map(w => w.trim()).filter(Boolean);
    if (!words.length) {
      flash("请先输入几个单词", "warn");
      return;
    }
    const output = $("output");
    output.innerHTML = "";
    let knownCount = 0;
    words.forEach(w => {
      const info = renderWord(w);
      if (!info) return;
      const card = renderCard(info);
      output.appendChild(card);
      if (info.isKnown) knownCount++;
    });
    $("printBtn").disabled = false;
    flash(`已生成 ${words.length} 张卡片 · 收录 ${knownCount}/${words.length}`, knownCount === words.length ? "success" : "warn");
  }

  function flash(text, type) {
    const pill = $("statusPill");
    pill.textContent = text;
    pill.className = "status-pill" + (type ? " " + type : "");
  }

  // ===== 课文抽取 =====
  function extractFromText() {
    const text = $("importInput").value;
    if (!text.trim()) { flash("粘贴一段课文先", "warn"); return; }
    // 提取所有英文单词
    let words = text.match(/[A-Za-z][A-Za-z'\-]*/g) || [];
    if ($("optLowercase").checked) words = words.map(w => w.toLowerCase());
    if ($("optMinLen").checked) words = words.filter(w => w.length > 2);
    // 去重保序
    const seen = new Set();
    const unique = [];
    words.forEach(w => { if (!seen.has(w)) { seen.add(w); unique.push(w); } });

    let display = unique;
    let knownCount = 0;
    if ($("optOnlyKnown").checked) {
      display = unique.filter(w => DB[w]);
    }
    knownCount = display.filter(w => DB[w]).length;

    const res = $("importResult");
    res.innerHTML = `
      <div class="ir-summary">
        共抽取 <b>${unique.length}</b> 个唯一词，其中 <b>${knownCount}</b> 个在词库
        ${$("optOnlyKnown").checked ? `（已过滤）` : ""}
      </div>
      <div class="ir-words">${display.map(w =>
        `<span class="ir-w ${DB[w] ? 'has' : 'no'}">${w}</span>`
      ).join("")}</div>
      <div class="ir-actions">
        <button class="btn btn-primary btn-sm" id="irGenBtn">✨ 用这些词生成卡片</button>
      </div>
    `;
    $("irGenBtn").addEventListener("click", () => {
      $("wordInput").value = display.join("\n");
      // 切回手动 tab
      document.querySelector('.tab[data-tab="manual"]').click();
      generate();
    });
  }

  // ===== Tab 切换 =====
  function setupTabs() {
    document.querySelectorAll(".tab").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(b => b.classList.remove("tab-active"));
        btn.classList.add("tab-active");
        const target = btn.dataset.tab;
        document.querySelectorAll(".tab-panel").forEach(p => {
          p.hidden = p.dataset.tab !== target;
        });
      });
    });
  }

  // ===== 事件绑定 =====
  function bindEvents() {
    $("genBtn").addEventListener("click", generate);
    $("wordInput").addEventListener("keydown", e => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") generate();
    });
    $("clearBtn").addEventListener("click", () => {
      $("wordInput").value = "";
      $("output").innerHTML = `<div class="empty"><div class="empty-emoji">🐣</div><p>输入几个单词，<br>看看它们是怎么"拼"出来的～</p></div>`;
      $("printBtn").disabled = true;
      flash("已清空", "");
    });
    $("sampleBtn").addEventListener("click", () => {
      $("wordInput").value = ["cat","cake","rain","blue","play","school","happy","friend","running","elephant","computer","birthday"].join("\n");
      generate();
    });
    $("printBtn").addEventListener("click", () => window.print());
    $("extractBtn").addEventListener("click", extractFromText);

    ["optIPA","optPhonics","optFamily","optExample","optShowRule"].forEach(id => {
      $(id).addEventListener("change", () => {
        if ($("output").children.length && $("output").firstElementChild.classList.contains("card")) {
          generate();
        }
      });
    });
    document.querySelectorAll('input[name="accent"]').forEach(r => {
      r.addEventListener("change", () => {
        flash("口音已切换", "");
      });
    });
  }

  // ===== 启动 =====
  async function boot() {
    setupTabs();
    bindEvents();
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    flash("加载词库中…", "warn");
    await loadAll();
  }

  boot();
})();
