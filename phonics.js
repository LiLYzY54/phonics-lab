// 自然拼读引擎
// 输入：单词 + WORD_DB 条目
// 输出：音节、音素、IPA、字母-音对应（带颜色分类）

(function () {
  // ARPAbet → IPA 转换表
  const ARPABET_TO_IPA = {
    // 元音
    "AA":"ɑ", "AE":"æ", "AH":"ʌ", "AO":"ɔ",
    "AW":"aʊ", "AY":"aɪ", "EH":"ɛ", "ER":"ɜr",
    "EY":"eɪ", "IH":"ɪ", "IY":"iː", "OW":"oʊ",
    "OY":"ɔɪ", "UH":"ʊ", "UW":"uː",
    // 辅音
    "B":"b", "CH":"tʃ", "D":"d", "DH":"ð",
    "F":"f", "G":"ɡ", "HH":"h", "JH":"dʒ",
    "K":"k", "L":"l", "M":"m", "N":"n", "NG":"ŋ",
    "P":"p", "R":"r", "S":"s", "SH":"ʃ",
    "T":"t", "TH":"θ", "V":"v", "W":"w",
    "Y":"j", "Z":"z", "ZH":"ʒ",
  };

  // 元音集（用于识别音节核）
  const VOWELS = new Set([
    "AA","AE","AH","AO","AW","AY","EH","ER","EY",
    "IH","IY","OW","OY","UH","UW"
  ]);

  // 字母组合的颜色分类：vowel / consonant / digraph
  function classify(grapheme) {
    const lc = grapheme.toLowerCase();
    const vowelChars = "aeiou";
    const digraphs = ["sh","ch","th","wh","ph","ck","ng","qu","ai","ay","ee","ea","oa","ow","ou","ie","ue","oy","oi","aw","au","ew","oo","ar","er","ir","or","ur","al","a_e","e_e","i_e","o_e","u_e","igh","wr","kn","thr","spl","spr","scr","str","cl","cr","dr","fl","fr","gl","gr","pl","pr","sl","sm","sn","sp","st","sw","tr","tw","bl","br"];
    if (digraphs.includes(lc)) return "digraph";
    if (lc.length > 1) return "digraph";
    if (vowelChars.includes(lc)) return "vowel";
    if (lc === "y") return "special";
    return "consonant";
  }

  // 解析 CMU 音素串 → 带重读标记的音素数组
  function parseCmu(cmuStr) {
    const tokens = cmuStr.split(/\s+/).filter(Boolean);
    return tokens.map(tok => {
      // 末尾数字是重音
      const m = tok.match(/^([A-Z]+)([012]?)$/);
      if (!m) return null;
      const arpa = m[1];
      const stress = m[2] ? parseInt(m[2], 10) : null;
      return {
        arpa,
        stress,
        ipa: ARPABET_TO_IPA[arpa] || arpa,
        isVowel: VOWELS.has(arpa),
        isConsonant: !VOWELS.has(arpa) && ARPABET_TO_IPA[arpa],
        // 简化的拼读符号（用 IPA + 重音符号）
        phonics: ARPABET_TO_IPA[arpa] + (stress === 1 ? "ˈ" : stress === 2 ? "ˌ" : ""),
      };
    }).filter(Boolean);
  }

  // 给 CMU 音素按重音位置标重读
  function markSyllableStress(phonemes) {
    // 简单策略：每个含重音的元音 → 整个音节重读
    let inSyllable = false;
    let syllableIndex = 0;
    let syllables = [];
    let cur = [];
    phonemes.forEach(p => {
      cur.push(p);
      if (p.isVowel) {
        // 元音结束当前音节
        syllables.push(cur);
        cur = [];
      }
    });
    if (cur.length) syllables.push(cur);
    return syllables;
  }

  // 主要入口：把单词 + DB 条目解析成完整音节数据
  function analyze(word, dbEntry) {
    const w = word.toLowerCase();
    const phonemes = parseCmu(dbEntry.cmu);
    const syllableArr = markSyllableStress(phonemes);

    // 给每个音节一个重音标记
    const syllables = syllableArr.map(syl => {
      const stressed = syl.some(p => p.stress === 1) ? "primary"
                    : syl.some(p => p.stress === 2) ? "secondary"
                    : "unstressed";
      return {
        phonemes: syl,
        stressed,
        ipa: syl.map(p => p.ipa).join(""),
        phonics: syl.map(p => p.phonics).join(""),
      };
    });

    // 把 grapheme 数组按音节划分（简单按 grapheme 字母长度与音节边界对齐）
    const graphemes = dbEntry.graphemes || [];

    // 音节数 = 元音数
    const syllableCount = syllables.length || 1;

    return {
      word: w,
      cmu: dbEntry.cmu,
      syllables,
      graphemes,
      syllableCount,
      pos: dbEntry.pos,
      family: dbEntry.family,
      example: dbEntry.example,
      // 完整 IPA
      ipaFull: phonemes.map(p => p.ipa).join(""),
      // 完整 phonics 串
      phonicsFull: phonemes.map(p => p.phonics).join(""),
    };
  }

  // 把单词按音节切开（用于显示用 · 分隔）
  function syllabify(analyzed) {
    // 如果 grapheme 完整且能在音素间定位，用音素切；否则按音节数均分
    return analyzed.syllables.map(syl =>
      syl.phonemes.map(p => p.ipa).join("")
    );
  }

  // 暴露到全局
  window.Phonics = {
    parseCmu,
    analyze,
    classify,
    syllabify,
    ARPABET_TO_IPA,
    VOWELS,
  };
})();
