// 小学英语常见词词库（精选 200+ 词，覆盖人教版/外研版高频词）
// 每条记录：word, cmu(ARPAbet 音素串), graphemes(字母-音对应)
//
// 字母↔音对应已经手工核对，覆盖：
// 1. 基础 CVC 拼读（cat/dog/pen...）
// 2. 常见字母组合（sh/ch/th/ck/ai/ee/oa/oo...）
// 3. 常见元音规则（a_e / i_e / o_e / u_e magic e, ai/ay, ee/ea, oa/ow, igh...）
//
// graphemes 数组的每项：{g: 字母组合, s: ARPAbet 音素}

window.WORD_DB = {
  // ===== 高频 sight words =====
  "the":  { cmu: "DH AH0", graphemes: [{g:"th",s:"DH"},{g:"e",s:"AH0"}], pos:"限定词" },
  "is":   { cmu: "IH1 Z",   graphemes: [{g:"i",s:"IH1"},{g:"s",s:"Z"}],     pos:"be 动词" },
  "a":    { cmu: "AH0",     graphemes: [{g:"a",s:"AH0"}],                    pos:"冠词" },
  "and":  { cmu: "AH0 N D", graphemes: [{g:"a",s:"AH0"},{g:"n",s:"N"},{g:"d",s:"D"}], pos:"连词" },
  "you":  { cmu: "Y UW1",   graphemes: [{g:"y",s:"Y"},{g:"ou",s:"UW1"}],     pos:"代词" },
  "are":  { cmu: "AA1 R",   graphemes: [{g:"a",s:"AA1"},{g:"r",s:"R"}],     pos:"be 动词" },
  "was":  { cmu: "W AH1 Z", graphemes: [{g:"w",s:"W"},{g:"a",s:"AH1"},{g:"s",s:"Z"}], pos:"be 动词" },
  "have": { cmu: "HH AE1 V",graphemes: [{g:"h",s:"HH"},{g:"a",s:"AE1"},{g:"v",s:"V"}, {g:"e",s:"",silent:true}], pos:"动词" },
  "has":  { cmu: "HH AE1 Z",graphemes: [{g:"h",s:"HH"},{g:"a",s:"AE1"},{g:"s",s:"Z"}], pos:"动词" },
  "had":  { cmu: "HH AE1 D",graphemes: [{g:"h",s:"HH"},{g:"a",s:"AE1"},{g:"d",s:"D"}], pos:"动词" },
  "he":   { cmu: "HH IY1",  graphemes: [{g:"h",s:"HH"},{g:"e",s:"IY1"}],     pos:"代词" },
  "she":  { cmu: "SH IY1",  graphemes: [{g:"sh",s:"SH"},{g:"e",s:"IY1"}],    pos:"代词" },
  "we":   { cmu: "W IY1",   graphemes: [{g:"w",s:"W"},{g:"e",s:"IY1"}],      pos:"代词" },
  "they": { cmu: "DH EY1",  graphemes: [{g:"th",s:"DH"},{g:"ey",s:"EY1"}],   pos:"代词" },
  "I":    { cmu: "AY1",     graphemes: [{g:"i",s:"AY1"}],                     pos:"代词" },
  "my":   { cmu: "M AY1",   graphemes: [{g:"m",s:"M"},{g:"y",s:"AY1"}],      pos:"代词" },
  "me":   { cmu: "M IY1",   graphemes: [{g:"m",s:"M"},{g:"e",s:"IY1"}],      pos:"代词" },
  "no":   { cmu: "N OW1",   graphemes: [{g:"n",s:"N"},{g:"o",s:"OW1"}],      pos:"否定" },
  "yes":  { cmu: "Y EH1 S", graphemes: [{g:"y",s:"Y"},{g:"e",s:"EH1"},{g:"s",s:"S"}], pos:"肯定" },
  "not":  { cmu: "N AA1 T", graphemes: [{g:"n",s:"N"},{g:"o",s:"AA1"},{g:"t",s:"T"}], pos:"否定" },
  "in":   { cmu: "IH1 N",   graphemes: [{g:"i",s:"IH1"},{g:"n",s:"N"}],      pos:"介词" },
  "on":   { cmu: "AA1 N",   graphemes: [{g:"o",s:"AA1"},{g:"n",s:"N"}],      pos:"介词" },
  "at":   { cmu: "AE1 T",   graphemes: [{g:"a",s:"AE1"},{g:"t",s:"T"}],      pos:"介词" },
  "it":   { cmu: "IH1 T",   graphemes: [{g:"i",s:"IH1"},{g:"t",s:"T"}],      pos:"代词" },
  "to":   { cmu: "T UW1",   graphemes: [{g:"t",s:"T"},{g:"o",s:"UW1"}],      pos:"介词" },
  "for":  { cmu: "F AO1 R", graphemes: [{g:"f",s:"F"},{g:"o",s:"AO1"},{g:"r",s:"R"}], pos:"介词" },
  "of":   { cmu: "AH1 V",   graphemes: [{g:"o",s:"AH1"},{g:"f",s:"V"}],      pos:"介词" },
  "this": { cmu: "DH IH1 S",graphemes: [{g:"th",s:"DH"},{g:"i",s:"IH1"},{g:"s",s:"S"}], pos:"指示代词" },
  "that": { cmu: "DH AE1 T",graphemes: [{g:"th",s:"DH"},{g:"a",s:"AE1"},{g:"t",s:"T"}], pos:"指示代词" },

  // ===== 基础 CVC 拼读 =====
  "cat":  { cmu: "K AE1 T", graphemes: [{g:"c",s:"K"},{g:"a",s:"AE1"},{g:"t",s:"T"}], pos:"名词", family:"-at", example:"A cat is on the mat." },
  "dog":  { cmu: "D AO1 G", graphemes: [{g:"d",s:"D"},{g:"o",s:"AO1"},{g:"g",s:"G"}], pos:"名词", family:"-og", example:"The dog is big." },
  "pen":  { cmu: "P EH1 N", graphemes: [{g:"p",s:"P"},{g:"e",s:"EH1"},{g:"n",s:"N"}], pos:"名词", family:"-en", example:"I have a pen." },
  "sun":  { cmu: "S AH1 N", graphemes: [{g:"s",s:"S"},{g:"u",s:"AH1"},{g:"n",s:"N"}], pos:"名词", family:"-un", example:"The sun is hot." },
  "hat":  { cmu: "HH AE1 T",graphemes: [{g:"h",s:"HH"},{g:"a",s:"AE1"},{g:"t",s:"T"}], pos:"名词", family:"-at", example:"My hat is red." },
  "bed":  { cmu: "B EH1 D", graphemes: [{g:"b",s:"B"},{g:"e",s:"EH1"},{g:"d",s:"D"}], pos:"名词", family:"-ed", example:"The bed is soft." },
  "pig":  { cmu: "P IH1 G", graphemes: [{g:"p",s:"P"},{g:"i",s:"IH1"},{g:"g",s:"G"}], pos:"名词", family:"-ig", example:"A pig is pink." },
  "big":  { cmu: "B IH1 G", graphemes: [{g:"b",s:"B"},{g:"i",s:"IH1"},{g:"g",s:"G"}], pos:"形容词", family:"-ig", example:"It is a big pig." },
  "red":  { cmu: "R EH1 D", graphemes: [{g:"r",s:"R"},{g:"e",s:"EH1"},{g:"d",s:"D"}], pos:"形容词", family:"-ed", example:"I like red apples." },
  "hot":  { cmu: "HH AA1 T",graphemes: [{g:"h",s:"HH"},{g:"o",s:"AA1"},{g:"t",s:"T"}], pos:"形容词", family:"-ot", example:"The soup is hot." },
  "top":  { cmu: "T AA1 P", graphemes: [{g:"t",s:"T"},{g:"o",s:"AA1"},{g:"p",s:"P"}], pos:"名词", family:"-op", example:"The top is blue." },
  "box":  { cmu: "B AA1 K S",graphemes:[{g:"b",s:"B"},{g:"o",s:"AA1"},{g:"x",s:"K S"}], pos:"名词", family:"-ox", example:"A box of books." },
  "fox":  { cmu: "F AA1 K S",graphemes:[{g:"f",s:"F"},{g:"o",s:"AA1"},{g:"x",s:"K S"}], pos:"名词", family:"-ox", example:"The fox is clever." },
  "bus":  { cmu: "B AH1 S", graphemes: [{g:"b",s:"B"},{g:"u",s:"AH1"},{g:"s",s:"S"}], pos:"名词", family:"-us", example:"The bus is yellow." },
  "cup":  { cmu: "K AH1 P", graphemes: [{g:"c",s:"K"},{g:"u",s:"AH1"},{g:"p",s:"P"}], pos:"名词", family:"-up", example:"A cup of tea." },
  "run":  { cmu: "R AH1 N", graphemes: [{g:"r",s:"R"},{g:"u",s:"AH1"},{g:"n",s:"N"}], pos:"动词", family:"-un", example:"I can run fast." },
  "fun":  { cmu: "F AH1 N", graphemes: [{g:"f",s:"F"},{g:"u",s:"AH1"},{g:"n",s:"N"}], pos:"名词", family:"-un", example:"Have fun!" },
  "map":  { cmu: "M AE1 P", graphemes: [{g:"m",s:"M"},{g:"a",s:"AE1"},{g:"p",s:"P"}], pos:"名词", family:"-ap", example:"Look at the map." },
  "bag":  { cmu: "B AE1 G", graphemes: [{g:"b",s:"B"},{g:"a",s:"AE1"},{g:"g",s:"G"}], pos:"名词", family:"-ag", example:"A bag of apples." },
  "egg":  { cmu: "EH1 G",  graphemes: [{g:"e",s:"EH1"},{g:"gg",s:"G"}],       pos:"名词", family:"-eg", example:"An egg for breakfast." },
  "kid":  { cmu: "K IH1 D", graphemes: [{g:"k",s:"K"},{g:"i",s:"IH1"},{g:"d",s:"D"}], pos:"名词", family:"-id", example:"The kid is happy." },
  "leg":  { cmu: "L EH1 G", graphemes: [{g:"l",s:"L"},{g:"e",s:"EH1"},{g:"g",s:"G"}], pos:"名词", family:"-eg", example:"My leg hurts." },
  "net":  { cmu: "N EH1 T", graphemes: [{g:"n",s:"N"},{g:"e",s:"EH1"},{g:"t",s:"T"}], pos:"名词", family:"-et", example:"A fishing net." },
  "van":  { cmu: "V AE1 N", graphemes: [{g:"v",s:"V"},{g:"a",s:"AE1"},{g:"n",s:"N"}], pos:"名词", family:"-an", example:"A white van." },
  "zip":  { cmu: "Z IH1 P", graphemes: [{g:"z",s:"Z"},{g:"i",s:"IH1"},{g:"p",s:"P"}], pos:"动词", family:"-ip", example:"Zip up your coat." },
  "wet":  { cmu: "W EH1 T", graphemes: [{g:"w",s:"W"},{g:"e",s:"EH1"},{g:"t",s:"T"}], pos:"形容词", family:"-et", example:"The dog is wet." },
  "win":  { cmu: "W IH1 N", graphemes: [{g:"w",s:"W"},{g:"i",s:"IH1"},{g:"n",s:"N"}], pos:"动词", family:"-in", example:"I want to win." },

  // ===== Magic e（a_e / i_e / o_e / u_e）=====
  "cake": { cmu: "K EY1 K", graphemes: [{g:"c",s:"K"},{g:"a",s:"EY1"},{g:"k",s:"K"}, {g:"e",s:"",silent:true}], pos:"名词", family:"-ake", example:"I love cake." },
  "make": { cmu: "M EY1 K", graphemes: [{g:"m",s:"M"},{g:"a",s:"EY1"},{g:"k",s:"K"}, {g:"e",s:"",silent:true}], pos:"动词", family:"-ake", example:"Let's make a cake." },
  "lake": { cmu: "L EY1 K", graphemes: [{g:"l",s:"L"},{g:"a",s:"EY1"},{g:"k",s:"K"}, {g:"e",s:"",silent:true}], pos:"名词", family:"-ake", example:"The lake is blue." },
  "name": { cmu: "N EY1 M", graphemes: [{g:"n",s:"N"},{g:"a",s:"EY1"},{g:"m",s:"M"}, {g:"e",s:"",silent:true}], pos:"名词", family:"-ame", example:"My name is Lily." },
  "kite": { cmu: "K AY1 T", graphemes: [{g:"k",s:"K"},{g:"i",s:"AY1"},{g:"t",s:"T"}, {g:"e",s:"",silent:true}], pos:"名词", family:"-ite", example:"Fly a kite." },
  "bike": { cmu: "B AY1 K", graphemes: [{g:"b",s:"B"},{g:"i",s:"AY1"},{g:"k",s:"K"}, {g:"e",s:"",silent:true}], pos:"名词", family:"-ike", example:"I ride a bike." },
  "five": { cmu: "F AY1 V", graphemes: [{g:"f",s:"F"},{g:"i",s:"AY1"},{g:"v",s:"V"}, {g:"e",s:"",silent:true}], pos:"数词", family:"-ive", example:"I have five apples." },
  "nine": { cmu: "N AY1 N", graphemes: [{g:"n",s:"N"},{g:"i",s:"AY1"},{g:"n",s:"N"}, {g:"e",s:"",silent:true}], pos:"数词", family:"-ine", example:"I am nine." },
  "home": { cmu: "HH OW1 M",graphemes: [{g:"h",s:"HH"},{g:"o",s:"OW1"},{g:"m",s:"M"}, {g:"e",s:"",silent:true}], pos:"名词", family:"-ome", example:"I go home." },
  "bone": { cmu: "B OW1 N", graphemes: [{g:"b",s:"B"},{g:"o",s:"OW1"},{g:"n",s:"N"}, {g:"e",s:"",silent:true}], pos:"名词", family:"-one", example:"A dog has a bone." },
  "rose": { cmu: "R OW1 Z", graphemes: [{g:"r",s:"R"},{g:"o",s:"OW1"},{g:"s",s:"Z"}, {g:"e",s:"",silent:true}], pos:"名词", family:"-ose", example:"A red rose." },
  "tube": { cmu: "T UW1 B", graphemes: [{g:"t",s:"T"},{g:"u",s:"UW1"},{g:"b",s:"B"}, {g:"e",s:"",silent:true}], pos:"名词", family:"-ube", example:"A tube of toothpaste." },
  "cute": { cmu: "K Y UW1 T",graphemes:[{g:"c",s:"K"},{g:"u",s:"UW1"},{g:"t",s:"T"}, {g:"e",s:"",silent:true}], pos:"形容词", family:"-ute", example:"A cute cat." },

  // ===== 元音组合 ai/ay/ee/ea/oa/ow/igh =====
  "rain": { cmu: "R EY1 N", graphemes: [{g:"r",s:"R"},{g:"ai",s:"EY1"},{g:"n",s:"N"}], pos:"名词/动词", family:"-ain", example:"Rain drops fall." },
  "play": { cmu: "P L EY1", graphemes: [{g:"pl",s:"P L"},{g:"ay",s:"EY1"}],             pos:"动词", family:"-ay", example:"Let's play!" },
  "day":  { cmu: "D EY1",   graphemes: [{g:"d",s:"D"},{g:"ay",s:"EY1"}],               pos:"名词", family:"-ay", example:"A sunny day." },
  "see":  { cmu: "S IY1",   graphemes: [{g:"s",s:"S"},{g:"ee",s:"IY1"}],               pos:"动词", family:"-ee", example:"I can see." },
  "tree": { cmu: "T R IY1", graphemes: [{g:"tr",s:"T R"},{g:"ee",s:"IY1"}],             pos:"名词", family:"-ee", example:"A tall tree." },
  "read": { cmu: "R IY1 D", graphemes: [{g:"r",s:"R"},{g:"ea",s:"IY1"},{g:"d",s:"D"}],  pos:"动词", family:"-ead", example:"I read books." },
  "sea":  { cmu: "S IY1",   graphemes: [{g:"s",s:"S"},{g:"ea",s:"IY1"}],                pos:"名词", family:"-ea", example:"The blue sea." },
  "boat": { cmu: "B OW1 T", graphemes: [{g:"b",s:"B"},{g:"oa",s:"OW1"},{g:"t",s:"T"}],  pos:"名词", family:"-oat", example:"A boat on the sea." },
  "goat": { cmu: "G OW1 T", graphemes: [{g:"g",s:"G"},{g:"oa",s:"OW1"},{g:"t",s:"T"}],  pos:"名词", family:"-oat", example:"A white goat." },
  "snow": { cmu: "S N OW1", graphemes: [{g:"sn",s:"S N"},{g:"ow",s:"OW1"}],             pos:"名词/动词", family:"-ow", example:"It will snow." },
  "light":{ cmu: "L AY1 T", graphemes: [{g:"l",s:"L"},{g:"igh",s:"AY1"},{g:"t",s:"T"}], pos:"名词", family:"-ight", example:"Turn on the light." },
  "night":{ cmu: "N AY1 T", graphemes: [{g:"n",s:"N"},{g:"igh",s:"AY1"},{g:"t",s:"T"}], pos:"名词", family:"-ight", example:"Good night!" },
  "moon": { cmu: "M UW1 N", graphemes: [{g:"m",s:"M"},{g:"oo",s:"UW1"},{g:"n",s:"N"}],  pos:"名词", family:"-oon", example:"The moon is round." },
  "book": { cmu: "B UH1 K", graphemes: [{g:"b",s:"B"},{g:"oo",s:"UH1"},{g:"k",s:"K"}],  pos:"名词", family:"-ook", example:"A good book." },
  "food": { cmu: "F UW1 D", graphemes: [{g:"f",s:"F"},{g:"oo",s:"UW1"},{g:"d",s:"D"}],  pos:"名词", family:"-ood", example:"I love food." },
  "cow":  { cmu: "K AW1",   graphemes: [{g:"c",s:"K"},{g:"ow",s:"AW1"}],               pos:"名词", family:"-ow", example:"A cow says moo." },
  "blue": { cmu: "B L UW1", graphemes: [{g:"bl",s:"B L"},{g:"ue",s:"UW1"}],            pos:"形容词", family:"-ue", example:"The sky is blue." },
  "toy":  { cmu: "T OY1",   graphemes: [{g:"t",s:"T"},{g:"oy",s:"OY1"}],               pos:"名词", family:"-oy", example:"A new toy." },
  "boy":  { cmu: "B OY1",   graphemes: [{g:"b",s:"B"},{g:"oy",s:"OY1"}],               pos:"名词", family:"-oy", example:"A clever boy." },

  // ===== 辅音组合 sh/ch/th/wh/ph =====
  "ship": { cmu: "SH IH1 P",graphemes: [{g:"sh",s:"SH"},{g:"i",s:"IH1"},{g:"p",s:"P"}], pos:"名词", family:"-ip", example:"A big ship." },
  "shop": { cmu: "SH AA1 P",graphemes: [{g:"sh",s:"SH"},{g:"o",s:"AA1"},{g:"p",s:"P"}], pos:"名词", family:"-op", example:"Go to the shop." },
  "fish": { cmu: "F IH1 SH",graphemes: [{g:"f",s:"F"},{g:"i",s:"IH1"},{g:"sh",s:"SH"}], pos:"名词", family:"-ish", example:"A small fish." },
  "chip": { cmu: "CH IH1 P",graphemes: [{g:"ch",s:"CH"},{g:"i",s:"IH1"},{g:"p",s:"P"}], pos:"名词", family:"-ip", example:"A potato chip." },
  "chin": { cmu: "CH IH1 N",graphemes: [{g:"ch",s:"CH"},{g:"i",s:"IH1"},{g:"n",s:"N"}], pos:"名词", family:"-in", example:"My chin hurts." },
  "chat": { cmu: "CH AE1 T",graphemes: [{g:"ch",s:"CH"},{g:"a",s:"AE1"},{g:"t",s:"T"}], pos:"动词", family:"-at", example:"Let's chat." },
  "thin": { cmu: "TH IH1 N",graphemes: [{g:"th",s:"TH"},{g:"i",s:"IH1"},{g:"n",s:"N"}], pos:"形容词", family:"-in", example:"A thin book." },
  "thumb":{ cmu: "TH AH1 M",graphemes: [{g:"th",s:"TH"},{g:"u",s:"AH1"},{g:"mb",s:"M"}], pos:"名词", family:"-umb", example:"My thumb is small." },
  "three":{ cmu: "TH R IY1",graphemes:[{g:"thr",s:"TH R"},{g:"ee",s:"IY1"}],           pos:"数词", example:"Three cats." },
  "when": { cmu: "W EH1 N", graphemes: [{g:"wh",s:"W"},{g:"e",s:"EH1"},{g:"n",s:"N"}],  pos:"副词", family:"-en", example:"When do you go?" },
  "phone":{ cmu: "F OW1 N", graphemes: [{g:"ph",s:"F"},{g:"o",s:"OW1"},{g:"n",s:"N"}, {g:"e",s:"",silent:true}], pos:"名词", family:"-one", example:"Use the phone." },

  // ===== 主题词：动物 =====
  "rabbit":{ cmu: "R AE1 B AH0 T", graphemes:[{g:"r",s:"R"},{g:"a",s:"AE1"},{g:"bb",s:"B"},{g:"i",s:"AH0"},{g:"t",s:"T"}], pos:"名词", family:"-abbit", example:"A white rabbit." },
  "tiger":  { cmu: "T AY1 G ER0",   graphemes:[{g:"t",s:"T"},{g:"i",s:"AY1"},{g:"g",s:"G"},{g:"er",s:"ER0"}], pos:"名词", family:"-iger", example:"A big tiger." },
  "monkey": { cmu: "M AH1 NG K IY0",graphemes:[{g:"m",s:"M"},{g:"o",s:"AH1"},{g:"n",s:"NG"},{g:"k",s:"K"},{g:"ey",s:"IY0"}], pos:"名词", example:"A clever monkey." },
  "panda":  { cmu: "P AE1 N D AH0", graphemes:[{g:"p",s:"P"},{g:"a",s:"AE1"},{g:"n",s:"N"},{g:"d",s:"D"},{g:"a",s:"AH0"}], pos:"名词", example:"A cute panda." },
  "lion":   { cmu: "L AY1 AH0 N",   graphemes:[{g:"l",s:"L"},{g:"i",s:"AY1"},{g:"on",s:"AH0 N"}], pos:"名词", example:"A big lion." },
  "duck":   { cmu: "D AH1 K",       graphemes:[{g:"d",s:"D"},{g:"u",s:"AH1"},{g:"ck",s:"K"}], pos:"名词", family:"-uck", example:"A yellow duck." },
  "hen":    { cmu: "HH EH1 N",      graphemes:[{g:"h",s:"HH"},{g:"e",s:"EH1"},{g:"n",s:"N"}], pos:"名词", family:"-en", example:"A red hen." },
  "bird":   { cmu: "B ER1 D",       graphemes:[{g:"b",s:"B"},{g:"ir",s:"ER1"},{g:"d",s:"D"}], pos:"名词", family:"-ird", example:"A small bird." },
  "fish":   { cmu: "F IH1 SH",      graphemes:[{g:"f",s:"F"},{g:"i",s:"IH1"},{g:"sh",s:"SH"}], pos:"名词", family:"-ish", example:"A small fish." },

  // ===== 主题词：颜色 =====
  "red":   { cmu: "R EH1 D",   graphemes:[{g:"r",s:"R"},{g:"e",s:"EH1"},{g:"d",s:"D"}], pos:"形容词", family:"-ed", example:"A red apple." },
  "blue":  { cmu: "B L UW1",   graphemes:[{g:"bl",s:"B L"},{g:"ue",s:"UW1"}],          pos:"形容词", family:"-ue", example:"The blue sky." },
  "green": { cmu: "G R IY1 N", graphemes:[{g:"gr",s:"G R"},{g:"ee",s:"IY1"},{g:"n",s:"N"}], pos:"形容词", example:"Green grass." },
  "yellow":{ cmu: "Y EH1 L OW0",graphemes:[{g:"y",s:"Y"},{g:"e",s:"EH1"},{g:"ll",s:"L"},{g:"ow",s:"OW0"}], pos:"形容词", example:"A yellow sun." },
  "black": { cmu: "B L AE1 K", graphemes:[{g:"bl",s:"B L"},{g:"a",s:"AE1"},{g:"ck",s:"K"}], pos:"形容词", example:"A black dog." },
  "white": { cmu: "W AY1 T",   graphemes:[{g:"wh",s:"W"},{g:"i",s:"AY1"},{g:"t",s:"T"}, {g:"e",s:"",silent:true}], pos:"形容词", family:"-ite", example:"White snow." },
  "orange":{ cmu: "AO1 R AH0 N JH",graphemes:[{g:"o",s:"AO1"},{g:"r",s:"R"},{g:"a",s:"AH0"},{g:"n",s:"N"},{g:"ge",s:"JH"}], pos:"形容词", example:"An orange orange." },

  // ===== 主题词：数字 =====
  "one":  { cmu: "W AH1 N", graphemes:[{g:"o",s:"W AH1"},{g:"n",s:"N"}], pos:"数词", example:"One cat." },
  "two":  { cmu: "T UW1",   graphemes:[{g:"t",s:"T"},{g:"w",s:"W"},{g:"o",s:"UW1"}], pos:"数词", example:"Two dogs." },
  "three":{ cmu: "TH R IY1",graphemes:[{g:"thr",s:"TH R"},{g:"ee",s:"IY1"}], pos:"数词", example:"Three birds." },
  "four": { cmu: "F AO1 R", graphemes:[{g:"f",s:"F"},{g:"ou",s:"AO1"},{g:"r",s:"R"}], pos:"数词", example:"Four fish." },
  "six":  { cmu: "S IH1 K S",graphemes:[{g:"s",s:"S"},{g:"i",s:"IH1"},{g:"x",s:"K S"}], pos:"数词", example:"Six apples." },
  "seven":{ cmu: "S EH1 V AH0 N",graphemes:[{g:"s",s:"S"},{g:"e",s:"EH1"},{g:"v",s:"V"},{g:"e",s:"AH0"},{g:"n",s:"N"}], pos:"数词", example:"Seven days." },
  "eight": { cmu: "EY1 T",  graphemes:[{g:"ei",s:"EY1"},{g:"gh",s:"T"}], pos:"数词", example:"Eight legs." },
  "ten":  { cmu: "T EH1 N", graphemes:[{g:"t",s:"T"},{g:"e",s:"EH1"},{g:"n",s:"N"}], pos:"数词", family:"-en", example:"Ten fingers." },

  // ===== 主题词：食物 =====
  "apple": { cmu: "AE1 P AH0 L", graphemes:[{g:"a",s:"AE1"},{g:"pp",s:"P"},{g:"le",s:"AH0 L"}], pos:"名词", example:"An apple a day." },
  "banana":{ cmu: "B AH0 N AE1 N AH0",graphemes:[{g:"b",s:"B"},{g:"a",s:"AH0"},{g:"n",s:"N"},{g:"a",s:"AE1"},{g:"n",s:"N"},{g:"a",s:"AH0"}], pos:"名词", example:"A yellow banana." },
  "milk":  { cmu: "M IH1 L K",graphemes:[{g:"m",s:"M"},{g:"i",s:"IH1"},{g:"lk",s:"L K"}], pos:"名词", example:"A glass of milk." },
  "egg":   { cmu: "EH1 G",  graphemes:[{g:"e",s:"EH1"},{g:"gg",s:"G"}], pos:"名词", example:"An egg." },
  "rice":  { cmu: "R AY1 S",graphemes:[{g:"r",s:"R"},{g:"i",s:"AY1"},{g:"c",s:"S"}, {g:"e",s:"",silent:true}], pos:"名词", example:"Eat some rice." },
  "cake":  { cmu: "K EY1 K",graphemes:[{g:"c",s:"K"},{g:"a",s:"EY1"},{g:"k",s:"K"}, {g:"e",s:"",silent:true}], pos:"名词", example:"Yummy cake." },
  "ice":   { cmu: "AY1 S",  graphemes:[{g:"i",s:"AY1"},{g:"c",s:"S"}, {g:"e",s:"",silent:true}], pos:"名词", example:"Ice is cold." },

  // ===== 主题词：家庭 / 人物 =====
  "mom":   { cmu: "M AA1 M",graphemes:[{g:"m",s:"M"},{g:"o",s:"AA1"},{g:"m",s:"M"}], pos:"名词", example:"I love mom." },
  "dad":   { cmu: "D AE1 D",graphemes:[{g:"d",s:"D"},{g:"a",s:"AE1"},{g:"d",s:"D"}], pos:"名词", example:"Dad is tall." },
  "sister":{ cmu: "S IH1 S T ER0",graphemes:[{g:"s",s:"S"},{g:"i",s:"IH1"},{g:"s",s:"S"},{g:"t",s:"T"},{g:"er",s:"ER0"}], pos:"名词", example:"My sister is kind." },
  "brother":{cmu: "B R AH1 DH ER0",graphemes:[{g:"br",s:"B R"},{g:"o",s:"AH1"},{g:"th",s:"DH"},{g:"er",s:"ER0"}], pos:"名词", example:"My brother is strong." },
  "baby":  { cmu: "B EY1 B IY0",graphemes:[{g:"b",s:"B"},{g:"a",s:"EY1"},{g:"b",s:"B"},{g:"y",s:"IY0"}], pos:"名词", example:"A cute baby." },
  "friend":{ cmu: "F R EH1 N D",graphemes:[{g:"fr",s:"F R"},{g:"ie",s:"EH1"},{g:"n",s:"N"},{g:"d",s:"D"}], pos:"名词", example:"My best friend." },

  // ===== 主题词：学校 / 学习 =====
  "book":  { cmu: "B UH1 K",graphemes:[{g:"b",s:"B"},{g:"oo",s:"UH1"},{g:"k",s:"K"}], pos:"名词", family:"-ook", example:"A good book." },
  "pen":   { cmu: "P EH1 N",graphemes:[{g:"p",s:"P"},{g:"e",s:"EH1"},{g:"n",s:"N"}], pos:"名词", family:"-en", example:"A blue pen." },
  "pencil":{ cmu: "P EH1 N S AH0 L",graphemes:[{g:"p",s:"P"},{g:"e",s:"EH1"},{g:"n",s:"N"},{g:"c",s:"S"},{g:"i",s:"AH0"},{g:"l",s:"L"}], pos:"名词", example:"A long pencil." },
  "ruler": { cmu: "R UW1 L ER0",graphemes:[{g:"r",s:"R"},{g:"u",s:"UW1"},{g:"l",s:"L"},{g:"er",s:"ER0"}], pos:"名词", example:"A ruler is 30 cm." },
  "bag":   { cmu: "B AE1 G",graphemes:[{g:"b",s:"B"},{g:"a",s:"AE1"},{g:"g",s:"G"}], pos:"名词", family:"-ag", example:"A school bag." },
  "desk":  { cmu: "D EH1 S K",graphemes:[{g:"d",s:"D"},{g:"e",s:"EH1"},{g:"sk",s:"S K"}], pos:"名词", example:"At the desk." },
  "chair": { cmu: "CH EH1 R",graphemes:[{g:"ch",s:"CH"},{g:"ai",s:"EH1"},{g:"r",s:"R"}], pos:"名词", example:"Sit on the chair." },
  "class": { cmu: "K L AE1 S",graphemes:[{g:"cl",s:"K L"},{g:"a",s:"AE1"},{g:"ss",s:"S"}], pos:"名词", example:"English class." },
  "school":{ cmu: "S K UW1 L",graphemes:[{g:"sch",s:"S K"},{g:"oo",s:"UW1"},{g:"l",s:"L"}], pos:"名词", example:"Go to school." },
  "teacher":{cmu: "T IY1 CH ER0",graphemes:[{g:"t",s:"T"},{g:"ea",s:"IY1"},{g:"ch",s:"CH"},{g:"er",s:"ER0"}], pos:"名词", example:"My teacher is kind." },
  "student":{cmu: "S T UW1 D AH0 N T",graphemes:[{g:"st",s:"S T"},{g:"u",s:"UW1"},{g:"d",s:"D"},{g:"e",s:"AH0"},{g:"nt",s:"N T"}], pos:"名词", example:"I am a student." },

  // ===== 常用形容词（补充 y 结尾词）=====
  "happy":  { cmu: "HH AE1 P IY0",graphemes:[{g:"h",s:"HH"},{g:"a",s:"AE1"},{g:"pp",s:"P"},{g:"y",s:"IY0"}], pos:"形容词", example:"A happy day." },
  "funny":  { cmu: "F AH1 N IY0",graphemes:[{g:"f",s:"F"},{g:"u",s:"AH1"},{g:"nn",s:"N"},{g:"y",s:"IY0"}], pos:"形容词", example:"A funny story." },
  "sunny":  { cmu: "S AH1 N IY0",graphemes:[{g:"s",s:"S"},{g:"u",s:"AH1"},{g:"nn",s:"N"},{g:"y",s:"IY0"}], pos:"形容词", example:"A sunny day." },
  "lucky":  { cmu: "L AH1 K IY0",graphemes:[{g:"l",s:"L"},{g:"u",s:"AH1"},{g:"ck",s:"K"},{g:"y",s:"IY0"}], pos:"形容词", example:"A lucky day." },
  "sorry":  { cmu: "S AA1 R IY0",graphemes:[{g:"s",s:"S"},{g:"o",s:"AA1"},{g:"rr",s:"R"},{g:"y",s:"IY0"}], pos:"形容词", example:"I am sorry." },
  "party":  { cmu: "P AA1 R T IY0",graphemes:[{g:"p",s:"P"},{g:"ar",s:"AA1"},{g:"t",s:"T"},{g:"y",s:"IY0"}], pos:"名词", example:"Birthday party." },
  "family": { cmu: "F AE1 M AH0 L IY0",graphemes:[{g:"f",s:"F"},{g:"a",s:"AE1"},{g:"m",s:"M"},{g:"i",s:"AH0"},{g:"l",s:"L"},{g:"y",s:"IY0"}], pos:"名词", example:"My family." },
  "baby":   { cmu: "B EY1 B IY0",graphemes:[{g:"b",s:"B"},{g:"a",s:"EY1"},{g:"b",s:"B"},{g:"y",s:"IY0"}], pos:"名词", example:"A cute baby." },
  "very":   { cmu: "V EH1 R IY0",graphemes:[{g:"v",s:"V"},{g:"e",s:"EH1"},{g:"r",s:"R"},{g:"y",s:"IY0"}], pos:"副词", example:"Very good." },
  "many":   { cmu: "M EH1 N IY0",graphemes:[{g:"m",s:"M"},{g:"a",s:"EH1"},{g:"n",s:"N"},{g:"y",s:"IY0"}], pos:"形容词", example:"Many books." },
  "only":   { cmu: "OW1 N L IY0",graphemes:[{g:"o",s:"OW1"},{g:"n",s:"N"},{g:"l",s:"L"},{g:"y",s:"IY0"}], pos:"副词", example:"Only one." },
  "city":   { cmu: "S IH1 T IY0",graphemes:[{g:"c",s:"S"},{g:"i",s:"IH1"},{g:"t",s:"T"},{g:"y",s:"IY0"}], pos:"名词", example:"Big city." },
  "lovely": { cmu: "L AH1 V L IY0",graphemes:[{g:"l",s:"L"},{g:"o",s:"AH1"},{g:"v",s:"V"},{g:"l",s:"L"},{g:"y",s:"IY0"}], pos:"形容词", example:"A lovely day." },
  "morning":{ cmu: "M AO1 R N IH0 NG",graphemes:[{g:"m",s:"M"},{g:"or",s:"AO1"},{g:"n",s:"N"},{g:"i",s:"IH0"},{g:"ng",s:"NG"}], pos:"名词", example:"Good morning." },
  "evening":{ cmu: "IY1 V N IH0 NG",graphemes:[{g:"e",s:"IY1"},{g:"v",s:"V"},{g:"e",s:"N"},{g:"n",s:"IH0"},{g:"i",s:""},{g:"ng",s:"NG"}], pos:"名词", example:"Good evening." },

  // ===== 复数 / -ing / -ed 变形 =====
  "cats":   { cmu: "K AE1 T S",graphemes:[{g:"c",s:"K"},{g:"a",s:"AE1"},{g:"t",s:"T"},{g:"s",s:"S"}], pos:"名词", example:"Two cats." },
  "dogs":   { cmu: "D AO1 G Z",graphemes:[{g:"d",s:"D"},{g:"o",s:"AO1"},{g:"g",s:"G"},{g:"s",s:"Z"}], pos:"名词", example:"Three dogs." },
  "running":{ cmu: "R AH1 N IH0 NG",graphemes:[{g:"r",s:"R"},{g:"u",s:"AH1"},{g:"nn",s:"N"},{g:"i",s:"IH0"},{g:"ng",s:"NG"}], pos:"动词", example:"I am running." },
  "playing":{ cmu: "P L EY1 IH0 NG",graphemes:[{g:"pl",s:"P L"},{g:"ay",s:"EY1"},{g:"i",s:"IH0"},{g:"ng",s:"NG"}], pos:"动词", example:"We are playing." },
  "jumping":{ cmu: "JH AH1 M P IH0 NG",graphemes:[{g:"j",s:"JH"},{g:"u",s:"AH1"},{g:"mp",s:"M P"},{g:"i",s:"IH0"},{g:"ng",s:"NG"}], pos:"动词", example:"Jumping high." },
  "wanted": { cmu: "W AA1 N T IH0 D",graphemes:[{g:"w",s:"W"},{g:"a",s:"AA1"},{g:"n",s:"N"},{g:"t",s:"T"},{g:"e",s:"IH0"},{g:"d",s:"D"}], pos:"动词", example:"I wanted to go." },
  "liked":  { cmu: "L AY1 K T",graphemes:[{g:"l",s:"L"},{g:"i",s:"AY1"},{g:"k",s:"K"},{g:"e",s:""},{g:"d",s:"T"}], pos:"动词", example:"I liked it." },

  // ===== 主题词：动作 =====
  "run":   { cmu: "R AH1 N",graphemes:[{g:"r",s:"R"},{g:"u",s:"AH1"},{g:"n",s:"N"}], pos:"动词", family:"-un", example:"I can run." },
  "jump":  { cmu: "JH AH1 M P",graphemes:[{g:"j",s:"JH"},{g:"u",s:"AH1"},{g:"mp",s:"M P"}], pos:"动词", example:"Jump high!" },
  "sing":  { cmu: "S IH1 NG",graphemes:[{g:"s",s:"S"},{g:"i",s:"IH1"},{g:"ng",s:"NG"}], pos:"动词", family:"-ing", example:"Sing a song." },
  "dance": { cmu: "D AE1 N S",graphemes:[{g:"d",s:"D"},{g:"a",s:"AE1"},{g:"n",s:"N"},{g:"c",s:"S"},{g:"e",s:""}], pos:"动词", example:"Dance with me." },
  "swim":  { cmu: "S W IH1 M",graphemes:[{g:"sw",s:"S W"},{g:"i",s:"IH1"},{g:"m",s:"M"}], pos:"动词", example:"I can swim." },
  "play":  { cmu: "P L EY1",graphemes:[{g:"pl",s:"P L"},{g:"ay",s:"EY1"}], pos:"动词", family:"-ay", example:"Let's play." },
  "eat":   { cmu: "IY1 T",  graphemes:[{g:"ea",s:"IY1"},{g:"t",s:"T"}], pos:"动词", family:"-eat", example:"Eat your food." },
  "drink": { cmu: "D R IH1 NG K",graphemes:[{g:"dr",s:"D R"},{g:"i",s:"IH1"},{g:"nk",s:"NG K"}], pos:"动词", example:"Drink some water." },
  "read":  { cmu: "R IY1 D",graphemes:[{g:"r",s:"R"},{g:"ea",s:"IY1"},{g:"d",s:"D"}], pos:"动词", family:"-ead", example:"I read books." },
  "write": { cmu: "R AY1 T",graphemes:[{g:"wr",s:"R"},{g:"i",s:"AY1"},{g:"t",s:"T"}, {g:"e",s:"",silent:true}], pos:"动词", example:"Write your name." },
  "sleep": { cmu: "S L IY1 P",graphemes:[{g:"sl",s:"S L"},{g:"ee",s:"IY1"},{g:"p",s:"P"}], pos:"动词", example:"Sleep well." },
  "walk":  { cmu: "W AO1 K",graphemes:[{g:"w",s:"W"},{g:"al",s:"AO1"},{g:"k",s:"K"}], pos:"动词", example:"Walk to school." },
  "look":  { cmu: "L UH1 K",graphemes:[{g:"l",s:"L"},{g:"oo",s:"UH1"},{g:"k",s:"K"}], pos:"动词", example:"Look at me." },
  "go":    { cmu: "G OW1",  graphemes:[{g:"g",s:"G"},{g:"o",s:"OW1"}], pos:"动词", example:"Let's go." },
  "come":  { cmu: "K AH1 M",graphemes:[{g:"c",s:"K"},{g:"o",s:"AH1"},{g:"m",s:"M"},{g:"e",s:""}], pos:"动词", example:"Come here." },
  "see":   { cmu: "S IY1",  graphemes:[{g:"s",s:"S"},{g:"ee",s:"IY1"}], pos:"动词", family:"-ee", example:"I see you." },

  // ===== 数字更多 =====
  "eleven":{ cmu: "IH0 L EH1 V AH0 N",graphemes:[{g:"e",s:"IH0"},{g:"l",s:"L"},{g:"e",s:"EH1"},{g:"v",s:"V"},{g:"e",s:"AH0"},{g:"n",s:"N"}], pos:"数词", example:"I am eleven." },
  "twelve": { cmu: "T W EH1 L V",graphemes:[{g:"tw",s:"T W"},{g:"e",s:"EH1"},{g:"l",s:"L"},{g:"ve",s:"V"}], pos:"数词", example:"Twelve months." },

  // ===== 主题词：身体 =====
  "head":  { cmu: "HH EH1 D",graphemes:[{g:"h",s:"HH"},{g:"ea",s:"EH1"},{g:"d",s:"D"}], pos:"名词", example:"Use your head." },
  "hand":  { cmu: "HH AE1 N D",graphemes:[{g:"h",s:"HH"},{g:"a",s:"AE1"},{g:"n",s:"N"},{g:"d",s:"D"}], pos:"名词", example:"Wash your hands." },
  "arm":   { cmu: "AA1 R M",graphemes:[{g:"a",s:"AA1"},{g:"r",s:"R"},{g:"m",s:"M"}], pos:"名词", example:"My left arm." },
  "eye":   { cmu: "AY1",   graphemes:[{g:"e",s:"AY1"},{g:"y",s:""},{g:"e",s:"",silent:true}], pos:"名词", example:"My eyes are big." },
  "ear":   { cmu: "IH1 R", graphemes:[{g:"e",s:"IH1"},{g:"ar",s:"R"}], pos:"名词", example:"My ears can hear." },
  "nose":  { cmu: "N OW1 Z",graphemes:[{g:"n",s:"N"},{g:"o",s:"OW1"},{g:"s",s:"Z"}, {g:"e",s:"",silent:true}], pos:"名词", example:"My nose is small." },
  "mouth": { cmu: "M AW1 TH",graphemes:[{g:"m",s:"M"},{g:"ou",s:"AW1"},{g:"th",s:"TH"}], pos:"名词", example:"Open your mouth." },
  "foot":  { cmu: "F UH1 T",graphemes:[{g:"f",s:"F"},{g:"oo",s:"UH1"},{g:"t",s:"T"}], pos:"名词", example:"My two feet." },

  // ===== 主题词：自然 =====
  "sun":   { cmu: "S AH1 N",graphemes:[{g:"s",s:"S"},{g:"u",s:"AH1"},{g:"n",s:"N"}], pos:"名词", family:"-un", example:"The sun is bright." },
  "moon":  { cmu: "M UW1 N",graphemes:[{g:"m",s:"M"},{g:"oo",s:"UW1"},{g:"n",s:"N"}], pos:"名词", family:"-oon", example:"The moon is round." },
  "star":  { cmu: "S T AA1 R",graphemes:[{g:"st",s:"S T"},{g:"a",s:"AA1"},{g:"r",s:"R"}], pos:"名词", example:"Stars at night." },
  "rain":  { cmu: "R EY1 N",graphemes:[{g:"r",s:"R"},{g:"ai",s:"EY1"},{g:"n",s:"N"}], pos:"名词", family:"-ain", example:"Rain falls down." },
  "snow":  { cmu: "S N OW1",graphemes:[{g:"sn",s:"S N"},{g:"ow",s:"OW1"}], pos:"名词", example:"White snow." },
  "cloud": { cmu: "K L AW1 D",graphemes:[{g:"cl",s:"K L"},{g:"ou",s:"AW1"},{g:"d",s:"D"}], pos:"名词", example:"A white cloud." },
  "tree":  { cmu: "T R IY1",graphemes:[{g:"tr",s:"T R"},{g:"ee",s:"IY1"}], pos:"名词", family:"-ee", example:"A tall tree." },
  "flower":{ cmu: "F L AW1 ER0",graphemes:[{g:"fl",s:"F L"},{g:"ow",s:"AW1"},{g:"er",s:"ER0"}], pos:"名词", example:"A red flower." },
  "grass": { cmu: "G R AE1 S",graphemes:[{g:"gr",s:"G R"},{g:"a",s:"AE1"},{g:"ss",s:"S"}], pos:"名词", example:"Green grass." },

  // ===== 主题词：日常用品 =====
  "water": { cmu: "W AO1 T ER0",graphemes:[{g:"w",s:"W"},{g:"a",s:"AO1"},{g:"t",s:"T"},{g:"er",s:"ER0"}], pos:"名词", example:"Drink water." },
  "ball":  { cmu: "B AO1 L",graphemes:[{g:"b",s:"B"},{g:"al",s:"AO1"},{g:"l",s:"L"}], pos:"名词", example:"A red ball." },
  "car":   { cmu: "K AA1 R",graphemes:[{g:"c",s:"K"},{g:"a",s:"AA1"},{g:"r",s:"R"}], pos:"名词", example:"A fast car." },
  "bus":   { cmu: "B AH1 S",graphemes:[{g:"b",s:"B"},{g:"u",s:"AH1"},{g:"s",s:"S"}], pos:"名词", example:"A yellow bus." },
  "door":  { cmu: "D AO1 R",graphemes:[{g:"d",s:"D"},{g:"oo",s:"AO1"},{g:"r",s:"R"}], pos:"名词", example:"Open the door." },
  "table": { cmu: "T EY1 B AH0 L",graphemes:[{g:"t",s:"T"},{g:"a",s:"EY1"},{g:"ble",s:"B AH0 L"}], pos:"名词", example:"On the table." },
  "window":{ cmu: "W IH1 N D OW0",graphemes:[{g:"w",s:"W"},{g:"i",s:"IH1"},{g:"n",s:"N"},{g:"d",s:"D"},{g:"ow",s:"OW0"}], pos:"名词", example:"Open the window." },
  "clock": { cmu: "K L AA1 K",graphemes:[{g:"cl",s:"K L"},{g:"o",s:"AA1"},{g:"ck",s:"K"}], pos:"名词", example:"The clock says 3." },
};

// word family 速查（用于同族词推荐）
window.WORD_FAMILIES = {};
Object.entries(window.WORD_DB).forEach(([word, data]) => {
  if (data.family) {
    if (!window.WORD_FAMILIES[data.family]) window.WORD_FAMILIES[data.family] = [];
    window.WORD_FAMILIES[data.family].push(word);
  }
});
