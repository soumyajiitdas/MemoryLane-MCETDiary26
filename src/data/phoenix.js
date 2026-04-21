// All phoenix magazine content in a single flat array.
// Order pages by `id`. The `type` field controls how each page is rendered.
// Supported types:
//   'cover'  — full-bleed cover image, uses `src`
//   'image'  — photo with caption, uses `src` + `caption`
//   'poem'   — poem block, uses `title` + `author` + `content` (array of lines)
//   'story'  — article/story, uses `title` + `author` + `excerpt` (array of paragraphs)

export const phoenixPages = [
  {
    id: 0,
    type: 'cover',
    src: '/images/phoenix/phoenix-cover.webp',
  },
  {
    id: 1,
    type: 'image',
    src: '/images/phoenix/content_img/1.png',
    caption: "Not perfect, just real - and that was enough!",
  },
  {
    id: 2,
    type: 'image',
    src: '/images/phoenix/content_img/2.png',
    caption: 'May the flower bloom in the darkest corner of your soul.',
  },
  {
    id: 3,
    type: 'story',
    title: 'A Conversation He Never Had...',
    author: 'Soumyajit',
    excerpt: [
      "He wasn't the kind of person who filled rooms with laughter or energy. He didn't turn heads or dominate conversations. But he watched. He listened. He thought. And within that quiet exterior was a world no one really saw. Not because he hid it-but because no one ever asked to look.",
      "He had grown up in a small home filled with warmth and routines. His parents weren't rich, but they were rich in a way the world didn't measure. His father, a man of few words and constant effort, and his mother, whose affection showed more in action than speech, created a world where love didn't need grand gestures to be felt. Their lives were simple-but never lacking in meaning.",
      'And in that little home, he grew up learning responsibility before rebellion, gratitude before greed. His family was his safe space. His parents were his world. And yet, even with them, he struggled to express just how deeply he felt.',
      'His room was his sanctuary-and his prison-where his thoughts could roam freely, but voice couldn\'t.',
      "It was where he studied, daydreamed, and built quiet versions of his dreams in his head. But it was also the place where sentences formed but never found the courage to escape his lips.",
      "He wasn't lonely-not exactly-he had always been good at making friends. In school, in college-he was never left out. But he was never truly in either. His friends shared their lives with ease-teasing each other, talking to him, opening up without hesitation. He, on the other hand, felt like he was holding a glass of water too full to move without spilling. He wanted to tell them how much their presence meant, how they made his days lighter, how just being included gave him a sense of belonging. But somewhere between their words and his silence, a gap remained, behind a wall of hesitation, that he never managed to close. So to them, he remained an ordinary friend-pleasant, quietly dependable, but not someone who left a mark when gone.",
      'The same pattern repeated at home. He shared everything with his parents-the good, the bad, the pointless. Like a schoolboy, he told them how his day went, what he did, what annoyed him, what made him smile. It was unusual for someone his age, but it gave him peace. And yet, the most important words-how deeply he loved them, how much they meant to him, how afraid he was of one day losing them without ever saying it-those remained unsaid. He feared his silence would cost him the people he loved the most.',
      "Each night, lying in that small room, he rehearsed sentences he'd never say out loud. And each morning, he stepped out wearing the mask of someone who didn't have anything to say.",
      '~Continue the story: Parts 2 & 3 await in the magazine~',
    ],
  },
  {
    id: 4,
    type: 'poem',
    title: "Where's Home",
    author: 'Raihan',
    content: [
      "I'm wandering through the dark,",
      "No one's around to bark.",
      "Is it freedom that I own?",
      'Or a soul left alone?',
      "Is it a peace I've found?",
      'Or a quite life with no one around?',
      "So, where's home? Where's home?",
      'Is there one to call my own?',
      'Is it a place or a face?',
      "With my mind I'm in a race.",
      'CANTES THAT SHEYE',
      'YOUR EYES',
      "Now I'm looking for a place to rest my head,",
      "But somewhere it's already dead.",
      "I'm searching a place to call my own, But more I look it feels unknown.",
      "Maybe someday I'll find my way back home, And I can call the place all my own...my own.",
    ],
  },
  {
    id: 5,
    type: 'image',
    src: '/images/phoenix/content_img/3.png',
    caption: "What repeats isn't the design, it's the feeling.",
  },
  {
    id: 6,
    type: 'poem',
    title: 'বলছি সুভাষ আছে ?',
    author: 'Subhodeep',
    content: [
      'শুনলাম তারা তোমায় নাকি সন্মান দেবে?',
      'সে দিক তাতে ভালোই হবে, তাদের এতদিন পর মনে পড়েছে দেশবাসীর প্রাণে সুভাষ রয়েছে।',
      'তোমায় নিয়ে চলছে এখন ভীষণ রাজনীতি, ভাবিনি এদেশ করবে তোমার এমন পরিণতি।',
      'এ বলে নেতাজি আমার দলের তো ও বলে আমার, রাজনীতিতে ভুলেই গেছে নেতাজি তো সবার।',
      'স্বাধীনতা তুমি এনেছো দেশে দেশ মা আজ তোমায় ডাকছে ভালোবেসে, ফিরবে তুমি এদেশেতেই মনেতে আশা রাখি তুমি তো নেতাজী, জানি তুমি দেবে না মোদের ফাঁকি।',
      'বাড়িতে বাড়িতে সবাই নেতা কেও রাম তো কেও ফুলে পোতা মুখেই তাদের বড়ো বড়ো কথা কাজের বেলায় তারাই লাপাতা।',
      'সাহস এদের একদমই নেই শুধুই আছে ভাষণ এরা নাকি সব নেতা মন্ত্রী এরা করছে দেশ শাসন।',
      'তুমি নাকি এদের দলের, শুনলেও হাসি পায় আরে নেতাজি হতে গেলে সাহস লাগে রে ভাই।',
      'স্বাধীন হয়েও পরাধীন এদেশ ভুলেছে স্বাধীনতার স্বাদ জানি তুমি আসবে আবার আহা এ গন্ধ যে স্বাধীনতার',
      "নেতা মন্ত্রী তো অনেক এসেছে গেছে সবার কাছে একটাই প্রশ্ন, ' বলছি সুভাষ আছে? '",
    ],
  },
  {
    id: 7,
    type: 'story',
    title: 'Satyajit Ray: A Universe in Himself',
    author: 'Anoushka',
    excerpt: [
      "Born on 2nd May 1921, Satyajit Ray would have turned 104 this year. It's not just a number it is a reminder of how far ahead of his time he truly was. A polymath in the truest sense, Ray was not only a legendary film director but also a screenwriter, author, lyricist, magazine editor, illustrator, calligrapher, and music composer. To say that he was a universe unto himself is not exaggeration it's simply fact.",
      'His cinematic legacy includes timeless masterpieces such as The Apu Trilogy, The Music Room, The Big City, Charulata, and the ever-enchanting Goopy-Bagha trilogy. Each of these works continues to shape the very language of Indian and world cinema.',
      "I still remember watching Pather Panchali for the first time on a DVD my mother brought home. I was barely eight or nine, oblivious to the life-altering experience that awaited me. Now at twenty, that film feels etched not just into my memory, but into my very being like a gentle scar left by something beautiful and true. It taught me the fragility of moments, how life turns on a whisper. It didn't even have a traditional script-it was born from Ray Sir's sketches and notes. And yet, it won eleven international awards, including the Best Human Document at the 1956 Cannes Film Festival. The Times of India once said, 'It is absurd to compare it with any other Indian cinema [...] Pather Panchali is pure cinema.' They were right.",
      '~Continue reading: Next lines await in the magazine~',
    ],
  },
];

// Legacy export kept for backward-compatibility (unused after refactor)
export const phoenixData = {
  stories: phoenixPages.filter(p => p.type === 'story'),
  poems:   phoenixPages.filter(p => p.type === 'poem'),
  images:  phoenixPages.filter(p => p.type === 'image'),
};
