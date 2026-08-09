# 📖 Phonics Lab

> 输入英文单词，生成自然拼读学习卡片 · 小学/初中英语老师备课工具

一个纯静态的网页应用，输入一串单词（手动或粘贴课文），自动生成带音标、拼读音素、字母-音对应、Word Family、拼读规则提示的卡片。支持 TTS 朗读、听写模式、生词本、拼写动画导出。

## ✨ 功能

- 🎴 **智能拼读卡片** — IPA 音标 + 自然拼读音素 + 字母高亮对应 + 静默字母标记
- 🔊 **三档 TTS 朗读** — 整词 / 慢速 / 逐音素，可切换美音/英音
- ✍️ **听写模式** — 听音拼写、自动判分、结束弹结果报告
- ⭐ **生词本** — localStorage 持久化，CSV 导出
- 📼 **拼写动画** — 字母依次出现 + 逐个读音，可导出独立 HTML 分享
- 📚 **1251 词词库** — 192 人工核对小初核心词 + 1059 自动批量（基于 CMU 发音字典）
- 📥 **课文导入** — 粘贴段落自动抽词去重，统计在词库/不在词库
- 🖨 **打印友好** — A4 双栏卡片纸直接打印

## 🚀 使用

直接打开 `index.html` 即可（需要本地服务器或 file:// 协议，浏览 TTS 需用户手势触发）。

或者用 Python 起一个本地服务器：

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 📁 文件结构

```
phonics-lab/
├── index.html              # 页面结构
├── style.css               # 样式
├── app.js                  # 主程序
├── features.js             # 生词本 / 听写 / 拼写动画
├── phonics.js              # ARPAbet ↔ IPA 引擎
├── words.js                # 192 词人工核对的词库
├── data/
│   ├── words-extra.json    # 1059 词自动扩充（基于 CMU dict）
│   └── build-wordlist.js   # 词库生成脚本
└── README.md
```

## 🎓 适用对象

- 小学 3-6 年级英语老师（自然拼读教学）
- 初中 7-9 年级英语老师（音标复习、单词速记）
- 家长给孩子做听写 / 拼读练习

## 🛠 技术

- 纯 HTML / CSS / 原生 JS（无构建步骤）
- Web Speech API（TTS）
- localStorage（生词本）
- CMU Pronouncing Dictionary（发音数据源）

## 📜 License

MIT
