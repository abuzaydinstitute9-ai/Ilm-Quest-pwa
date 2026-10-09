// Audio + motivation configuration. Files are loaded from assets/audio/ when present; nothing here touches saved progress.
// 'text' is the English-only fallback spoken by the browser if the recording is missing (Arabic phrases are never machine-spoken).
const AUDIO={
tracks:["assets/audio/background-01.mp3","assets/audio/background-02.mp3","assets/audio/background-03.mp3"], // only approved, licensed, instrument-free nasheed
voice:{
level:[
{file:"assets/audio/voice/level-1.mp3",text:"You passed. May Allah increase you in knowledge."},
{file:"assets/audio/voice/level-2.mp3",text:"Excellent! Keep learning."},
{file:"assets/audio/voice/level-3.mp3",text:"Well done. Your journey continues."},
{file:"assets/audio/voice/level-4.mp3",text:"You discovered something new."}],
phase:{file:"assets/audio/voice/phase.mp3",text:"A new chapter of your journey has begun."},
badge:{file:"assets/audio/voice/badge.mp3",text:"Well done. You earned a new badge."},
daily:{file:"assets/audio/voice/daily.mp3",text:"You completed today's Ilm. Keep going."}},
messages:["Your journey of knowledge continues. Keep going.","One letter, one lesson, one step at a time.","Seek knowledge and let what you learn benefit you.","Do not stop learning. Every level brings a new discovery.","Learn today. Remember tomorrow. Share what benefits others.","Small steps every day lead to great knowledge.","Begin with Bismillah and take the next step.","Every letter you recognise is progress.","Patience and consistency build lasting knowledge."],
// Shown occasionally. Only entries marked verified are used. Check Arabic against the Mushaf / hadith edition before release.
quotes:[
{ar:"وَقُل رَّبِّ زِدْنِي عِلْمًا",en:"And say: My Lord, increase me in knowledge.",ref:"Qur'an 20:114",verification:"verified"},
{ar:"هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",en:"Are those who know equal to those who do not know?",ref:"Qur'an 39:9",verification:"verified"},
{ar:"يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",en:"Allah will raise those of you who believe and those who were given knowledge, by degrees.",ref:"Qur'an 58:11",verification:"verified"},
{ar:"إِنَّ مَعَ الْعُسْرِ يُسْرًا",en:"Indeed, with hardship comes ease.",ref:"Qur'an 94:6",verification:"verified"},
{ar:"مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",en:"Whoever follows a path seeking knowledge, Allah makes easy for him a path to Paradise.",ref:"Sahih Muslim 2699",verification:"verified"},
{ar:"خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",en:"The best of you are those who learn the Qur'an and teach it.",ref:"Sahih al-Bukhari 5027",verification:"verified"}]};
