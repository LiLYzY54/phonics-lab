// 构建小学+初中词库
// 输入：
//   - cmudict.dict （CMU 标准发音字典）
//   - 人工抽取的拼读规则集合
// 输出：
//   - words-extra.json （自动生成的扩展词库）

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname);
const CMU_PATH = path.join(DATA_DIR, "cmudict.dict");

// 1. 解析 CMU dict
function loadCMU() {
  const lines = fs.readFileSync(CMU_PATH, "utf8").split("\n");
  const dict = {};
  lines.forEach(line => {
    line = line.trim();
    if (!line || line.startsWith(";;;") || line.startsWith("#")) return;
    // 格式: WORD  PHONEME1 PHONEME2 ...  或  WORD(2)  PHONEMES  （多音）
    const spaceIdx = line.indexOf(" ");
    if (spaceIdx < 0) return;
    let word = line.slice(0, spaceIdx);
    const rest = line.slice(spaceIdx + 1).trim();
    // 跳过变体 (2), (3) ...
    if (/\(\d+\)$/.test(word)) return;
    word = word.toLowerCase();
    // 跳过带 # 开头的注释行（如 "aachen AA1 K AH0 N # place, german"）
    const phonemes = rest.split(/\s+/).filter(Boolean);
    if (!dict[word]) dict[word] = phonemes;
  });
  return dict;
}

// 2. 字母→音素的拼读规则
const SOUND_RULES = [
  // 3字母组合
  [/^(thr|str|spr|scr|spl|shr|skw|sch|scr|str|thr)$/, m => m[0] === "thr" ? "TH R" : m[0] === "str" ? "S T R" : m[0] === "spr" ? "S P R" : m[0] === "scr" ? "S K R" : m[0] === "spl" ? "S P L" : m[0] === "shr" ? "SH R" : m[0] === "skw" ? "S K W" : m[0] === "sch" ? "S K" : m[0]],
  // 2字母组合
  [/^(sh|ch|th|wh|ph|ck|ng|qu|ai|ay|ee|ea|ie|oa|ow|ou|oy|oi|aw|au|ew|oo|ar|er|ir|or|ur|al|ue|wr|kn|gn)$/, m => {
    const map = {
      sh:"SH", ch:"CH", th:"TH", wh:"W", ph:"F", ck:"K", ng:"NG", qu:"K W",
      ai:"EY", ay:"EY", ee:"IY", ea:"IY", ie:"IY", oa:"OW", ow:"OW", ou:"AW",
      oy:"OY", oi:"OY", aw:"AO", au:"AO", ew:"UW", oo:"UW",
      ar:"AA R", er:"ER", ir:"ER", or:"AO R", ur:"ER", al:"AO L",
      ue:"UW", wr:"R", kn:"N", gn:"N",
    };
    return map[lc(m[0])];
  }],
  // 单字母
  [/^[bcdfghjklmnpqrstvwxyz]$/, m => {
    const map = { b:"B", c:"K", d:"D", f:"F", g:"G", h:"HH", j:"JH", k:"K", l:"L", m:"M", n:"N", p:"P", q:"K", r:"R", s:"S", t:"T", v:"V", w:"W", x:"K S", y:"Y", z:"Z" };
    return map[lc(m[0])];
  }],
  // 单字母元音
  [/^[aeiou]$/, m => ({ a:"AE", e:"EH", i:"IH", o:"AA", u:"AH" })[lc(m[0])]],
];

function lc(s) { return s.toLowerCase(); }

// 把单词切成 grapheme 块（最长匹配）
function tokenizeWordGraphemes(word) {
  const out = [];
  let i = 0;
  const w = word.toLowerCase();
  while (i < w.length) {
    let matched = null;
    for (let len = Math.min(3, w.length - i); len > 0; len--) {
      const slice = w.slice(i, i + len);
      for (const [re] of SOUND_RULES) {
        if (slice.match(re) && slice.match(re)[0] === slice) {
          matched = slice;
          break;
        }
      }
      if (matched) break;
    }
    if (!matched) {
      // fallback
      out.push({ g: w[i], s: "" });
      i++;
    } else {
      out.push({ g: matched, s: "" });
      i += matched.length;
    }
  }
  return out;
}

// 3. 中小学词汇（手抓常用词，约 800-1200 个）
const PRIMARY_WORDS = `pen pencil ruler eraser crayon book bag school
head face nose mouth eye ear arm finger leg foot body
red yellow green blue purple white black orange pink brown
cat dog monkey panda rabbit duck pig bird bear elephant mouse squirrel
cake bread hotdog hamburger chicken juice milk water tea coffee
one two three four five six seven eight nine ten
doll boat ball kite balloon car plane
boy girl teacher student this my friend
I am nice good morning afternoon meet goodbye too
father dad mother mom man woman grandmother grandfather sister brother
let's great really and how family
eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty
peach pear orange watermelon apple banana strawberry grape like some thanks
bus bike taxi jeep desk chair walkman lamp your zoo
small big long short tall giraffe deer
window board light picture door floor classroom computer wall fan clean
good idea all right job Chinese book English math school bag story notebook
colour fat may sure here you are twenty one thirty forty fifty heavy sorry
long hair short thin strong quiet friend
study bathroom bedroom living kitchen fish room open close phone sofa shelf fridge
rice noodle soup vegetable beef dinner wait hungry
knife chopstick spoon plate fork pass ready try help yourself show yummy use
family parent uncle aunt baby people member only puppy
computer board fan light this is my that your
class English music P.E. math Chinese
jacket shirt skirt dress T-shirt sweater whose
jeans pants sock shoe shorts these those
warm cold cool hot weather report wear today
horse hen lamb goat cow donkey key rabbit pig duck
tomato cucumber potato onion carrot fresh there
Monday Tuesday Wednesday Thursday Friday Saturday Sunday day
weekend week often sometimes always never
cabbage pork mutton eggplant green bean tofu potato tomato lunch we menu sound
healthy tasty sweet sour fresh salty favourite fruit
empty trash cook meal sweep clean helpful ill wash just do make
set table wash clothes do dish put away try robot chess use
air conditioner curtain trash bin mirror end table own look bedroom bathroom
computer room playground garden library canteen first second
run get up go to school home bed ready hurry
Maths Science P.E. Music Art
Monday Tuesday Wednesday Thursday Friday Saturday Sunday
spring summer fall winter season which best always play with snow
leaf up north Halloween everyone then Thanksgiving date
January February March April May June July August September October November December
why because answer phone talk child see later listen
paint great really fine thank thanks
fly draw picture beautiful jeep jump kangaroo key guess open right lion lock night nest
umbrella look out
elephant
big small long short tall
pencil case pencil box eraser
look at come in
come on who is
watch TV funny ice cream
goose watch TV
hungry please them very much taste queen quiet fruit certainly rainbow snake tiger
game here toy box on under`;

const MIDDLE_SCHOOL_WORDS = `family parent cousin
holiday Christmas birthday
season weather
January February March April May June July August September October November December
spring summer autumn fall winter
Monday Tuesday Wednesday Thursday Friday Saturday Sunday
morning afternoon evening night noon midnight
breakfast lunch dinner supper
clothes hat coat sweater
jacket jeans sneakers slippers sandals boots
hobby interest habit
movie film song music dance sing draw paint
sport basketball football tennis volleyball ping-pong badminton
computer keyboard mouse screen printer
mobile phone message email
website internet online
travel trip journey visit
vacation holiday tour
hotel restaurant museum theater
airport station train bus taxi bicycle
traffic light road bridge
country world city town village
population people language
culture tradition custom
history geography science
math mathematics physics chemistry biology
art music literature poetry
language English Chinese French Japanese
subject exam test quiz
homework assignment project
classmate friend partner
teacher professor student pupil
dictionary magazine newspaper
library bookstore stationery
pen pencil eraser sharpener
ruler compass protractor
paper notebook folder
idea thought dream memory
problem solution answer question
story tale novel fiction
poem paragraph sentence word
listen speak read write
grammar vocabulary spelling
pronunciation accent dialect
borrow lend return
bring take fetch carry
buy sell pay cost
give take receive
open close shut
push pull lift
break fix repair
build destroy
start stop continue
begin end finish
win lose beat
catch throw catch
run walk jog
sit stand lie
laugh cry smile
love hate like
know understand remember forget
learn study practice
think believe guess
hope wish expect
try attempt succeed fail
help assist support
need require demand
enjoy appreciate
feel emotion
choose select pick
change modify
grow develop increase decrease
move remove
add subtract multiply divide
clean dirty wash
hot warm cool cold
fast slow quick
high low tall short
big small large tiny
heavy light strong weak
rich poor expensive cheap
old new young
early late
easy hard difficult
right wrong correct
true false real
full empty
open closed shut
start finish begin end
afraid alone amazing
animal answer appear
arrive ask attack
attempt attention avoid
baby back ball band
bank base battle
beach beautiful become
before begin behind
believe below beside
between beyond board
boat body border
born borrow boss
bottle bottom brain
branch brave breath
bridge bright broad
broken brother brown
build building burn
business busy butter
cake call camera
camp capital captain
care careful carefully
carry catch cause
center central century
chance character check
choose church circle
class clean clear
climb clock close
cloud coast coat
coffee coin collect
college colour common
company compare complete
computer concert condition
confirm consider contain
continue control corner
cost cotton count
country couple courage
course court cover
create crime cross
crowd cup current
customer dangerous dark
date daughter day
dead deal debate
decide decision deep
defense deliver demand
depend describe design
destroy detail develop
dialogue different difficult
dinner direct direction
dirty discover discuss
distance district divide
doctor dollar door
down draw dream
drink drive driver
drop dust duty
each ear earth
east easy eat
economy education either
electric else empty
encourage enemy energy
enjoy enough enter
environment equal especially
establish even evening
event ever everyone
everything example excellent
excited exciting excuse
exercise expect experience
explain explore express
extremely face fact
factor fail fair
fall famous far
farm farmer fast
father fault favor
fear feature fee
feel fellow female
field fight figure
final finally find
fine finger first
fish fix flag
flat floor flower
fly follow food
foot football force
foreign forest forget
form former forth
fortune forward four
free friend fright
front fruit fuel
full fun future
game garden gas
gate general gentle
girl give glass
gold gone good
government grade grand
grass great green
ground group grow
guide guitar happen
happy hard harm
hat head health
hear heart heavy
hello help here
hide high hill
history hit hold
hole holiday home
hope horse hospital
hot hotel hour
house however huge
human hundred hungry
hunt hurry husband
ice idea important
include increase indeed
industry information inside
instead interest into
introduce invite island
item job join
journey joy judge
jump just keep
key kick kill
kind king kitchen
knee knife knock
know knowledge lake
land language large
last late later
laugh law lay
lead learn least
leave left leg
less lesson let
letter level library
lie life lift
light like line
list listen little
live local locate
long look lose
loud love low
luck machine main
make man manage
many map mark
market marry match
matter may maybe
mean measure meet
member memory mention
menu message middle
might mind minute
mirror miss modern
moment money month
mood moon morning
most mother mountain
mouth move much
music must name
narrow nation nature
near nearly necessary
need neighbor neither
network never news
next nice night
nine none north
nose note nothing
notice number occur
ocean offer office
often oil old
once one only
open operate opinion
opposite option orange
order ordinary organize
original other otherwise
outside over owner
page paint pair
palace paper parent
park part party
pass past path
patient pay peace
people perform perhaps
period person phone
pick picture piece
place plan plant
play please plenty
pocket point police
policy politics poor
popular position positive
possible post power
practice prefer prepare
present president pressure
pretty prevent price
prince principal print
private probably problem
produce program promise
protect prove provide
public pull purpose
push put quality
question quickly quiet
quite race radio
rain raise range
reach read ready
real really reason
receive recent record
red reduce refer
reflect refuse regard
region relate relax
remain remember repair
repeat reply report
represent require research
rest result return
rich ride right
rise risk river
road rock role
room round rule
run safe sale
same save say
school science sea
season seat second
secret section security
seek seem sell
send senior sense
sentence serious serve
set settle several
shake shall shape
share shoot short
should show side
sign similar simple
since sing single
sister sit situation
skill sky sleep
slow small smart
smile smoke snow
social society soft
soldier some someone
something sometimes soon
sorry sort sound
south space speak
special speed spend
sport spring stage
stand standard star
start state station
stay step still
stone stop store
story straight strange
street strong study
stuff style success
sudden suggest summer
sun support sure
surface surprise sweet
table take talk
tall taste teach
team tear technology
tell ten term
test than thank
that their them
then theory there
these they thick
thin thing think
third this those
though thought thousand
three through throw
thus tie time
tire today together
told tomorrow tonight
too tool tooth
top total touch
toward town track
trade train travel
treat tree trouble
true try turn
twelve twenty two
type uncle under
understand unit until
upon use usual
value various vegetable
very view village
visit voice volume
vote wait walk
wall want war
warm wash waste
watch water wave
way wear weather
week weight welcome
west what wheel
when where whether
which while white
who whole why
wide wife wild
will win wind
window winter wish
with within without
woman wonder word
work world worry
worth would write
wrong yard year
yellow yes yesterday
yet you young
your zero zoo`;

const ALL_WORDS = [
  ...PRIMARY_WORDS.split(/\s+/).filter(Boolean),
  ...MIDDLE_SCHOOL_WORDS.split(/\s+/).filter(Boolean),
].map(w => w.toLowerCase().replace(/[^a-z'-]/g, ""));

// 4. 主流程
function build() {
  const cmu = loadCMU();
  console.log(`CMU dict 加载: ${Object.keys(cmu).length} 词`);

  const result = {};
  let matched = 0;
  let notMatched = 0;
  let manualAlready = new Set();

  ALL_WORDS.forEach(word => {
    if (!word || word.length < 2) return;
    if (manualAlready.has(word)) return;
    const cmuPhon = cmu[word];
    if (!cmuPhon) {
      notMatched++;
      return;
    }
    const graphemes = tokenizeWordGraphemes(word);
    result[word] = {
      cmu: cmuPhon.join(" "),
      graphemes,
    };
    matched++;
  });

  console.log(`匹配 CMU: ${matched}, 未匹配: ${notMatched}`);

  fs.writeFileSync(
    path.join(DATA_DIR, "words-extra.json"),
    JSON.stringify(result, null, 0)  // 紧凑模式，文件小
  );
  console.log(`已生成 words-extra.json，共 ${Object.keys(result).length} 词`);
}

build();
