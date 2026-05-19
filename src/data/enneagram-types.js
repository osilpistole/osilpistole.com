// src/data/enneagram-types.js
//
// Three exports:
//   TYPES         — per-type data (9 entries) keyed by typeId 1..9
//   TYPE_WINGS    — per-type+wing data (18 entries) keyed by `${typeId}w${wingId}`
//   ARROWS        — canonical growth + stress lookup keyed by typeId
//
// Bible verses use the ESV translation. Swap freely.

export const ARROWS = {
  1: { growth: 7, stress: 4 },
  2: { growth: 4, stress: 8 },
  3: { growth: 6, stress: 9 },
  4: { growth: 1, stress: 2 },
  5: { growth: 8, stress: 7 },
  6: { growth: 9, stress: 3 },
  7: { growth: 5, stress: 1 },
  8: { growth: 2, stress: 5 },
  9: { growth: 3, stress: 6 },
}

// Wing options per type (the two adjacent types on the Enneagram circle)
export const WING_OPTIONS = {
  1: [9, 2],
  2: [1, 3],
  3: [2, 4],
  4: [3, 5],
  5: [4, 6],
  6: [5, 7],
  7: [6, 8],
  8: [7, 9],
  9: [8, 1],
}

// Per-type data — shared by both wings of that type
export const TYPES = {
  1: {
    name: 'The Reformer',
    growthParagraph: 'When you are healthy, you take on the best of Type 7 — joy, spontaneity, lightness, the ability to receive what is good. Your inner critic quiets down enough that you can actually enjoy the work you have made instead of immediately seeing what is wrong with it. You start to trust that "good enough" is, in fact, good. You laugh more. You build with a sense of play instead of pressure. The integrity is still there — that does not leave — but it stops feeling like a leash and starts feeling like a gift.',
    stressParagraph: 'Under pressure, you slip into the harder side of Type 4 — moody, resentful, withdrawn, convinced no one understands how hard you are trying. The inner critic gets louder and turns from "this is not good enough" into "I am not good enough." You take things personally. You feel uniquely misunderstood. The work that usually energizes you starts feeling pointless. The fastest way back: forgive yourself for being human, and re-engage with one small thing you can actually finish.',
    bibleVerse: {
      reference: 'Philippians 1:6 (ESV)',
      text: 'And I am sure of this, that he who began a good work in you will bring it to completion at the day of Jesus Christ.',
    },
  },
  2: {
    name: 'The Helper',
    growthParagraph: 'When you are healthy, you take on the best of Type 4 — the willingness to feel what you actually feel, to know what you actually want, to honor your own inner world. You stop performing helpfulness and start being present. You can give from overflow instead of from need. You let yourself receive — compliments, gifts, support, love — without flinching. Your boundaries get clearer because you finally believe you are worth them. You are still a giver, but it stops costing you yourself.',
    stressParagraph: 'Under pressure, you slip into the harder side of Type 8 — controlling, demanding, suddenly aggressive about being seen and appreciated. The hidden hunger you have been suppressing breaks the surface as anger. You move from "I just want to help" to "after everything I have done for you." You may issue ultimatums, withdraw your help as a weapon, or burn through a relationship to prove you were the one who mattered. The fastest way back: name what you actually need and ask for it, before the resentment builds.',
    bibleVerse: {
      reference: '1 John 4:19 (ESV)',
      text: 'We love because he first loved us.',
    },
  },
  3: {
    name: 'The Achiever',
    growthParagraph: 'When you are healthy, you take on the best of Type 6 — loyalty to people over performance, the willingness to ask for help, the courage to commit to something even when it is not "winning" yet. You build slower and deeper instead of faster and shinier. You let people see what is actually behind the image. You give up image management long enough to find out who you really are when no one is watching — and discover that person is enough. The drive does not leave; it just stops running you.',
    stressParagraph: 'Under pressure, you slip into the harder side of Type 9 — shutdown, numb, disengaged from the very ambition that usually fuels you. You start everything and finish nothing. You binge content or food or scrolling to escape. You become hard to reach emotionally. People feel you check out even when you are physically present. The fastest way back: stop trying to do bigger things and do one small, real thing. Move your body. Tell someone how you actually feel.',
    bibleVerse: {
      reference: 'Galatians 1:10 (ESV)',
      text: 'For am I now seeking the approval of man, or of God? Or am I trying to please man? If I were still trying to please man, I would not be a servant of Christ.',
    },
  },
  4: {
    name: 'The Individualist',
    growthParagraph: 'When you are healthy, you take on the best of Type 1 — discipline, focus, the steadiness to do the work even when you do not feel inspired. Your depth becomes useful instead of paralyzing. You stop waiting for the perfect mood and you build anyway. You finish things. You hold yourself to a standard not out of self-criticism but out of self-respect. The artistry is still there. The longing is still there. But you also become a person who shows up.',
    stressParagraph: 'Under pressure, you slip into the harder side of Type 2 — clingy, over-giving, suddenly anxious about how everyone is feeling about you. You drop your own work to manage other people\'s emotions. You over-extend yourself, then resent it. You may hold on to relationships that are not working because being alone with yourself feels worse than being used. The fastest way back: come back to your own creative work. Make something just for you, without an audience.',
    bibleVerse: {
      reference: 'Isaiah 43:1 (ESV)',
      text: 'Fear not, for I have redeemed you; I have called you by name, you are mine.',
    },
  },
  5: {
    name: 'The Investigator',
    growthParagraph: 'When you are healthy, you take on the best of Type 8 — action, embodiment, the willingness to take up space and act on what you know. The library of insight you have been collecting finally moves into the world. You speak up. You commit. You stop waiting until you "have enough information" and you ship. People are surprised by your conviction — but you knew it was there the whole time.',
    stressParagraph: 'Under pressure, you slip into the harder side of Type 7 — scattered, restless, jumping from one new interest to another without depth. The careful mind that usually goes deep starts skating across surfaces. You overcommit, then withdraw. You distract yourself with consumption — books, ideas, plans — to avoid actually doing. The fastest way back: pick the smallest possible step in the one project that matters most, and take it.',
    bibleVerse: {
      reference: 'Proverbs 3:5–6 (ESV)',
      text: 'Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.',
    },
  },
  6: {
    name: 'The Loyalist',
    growthParagraph: 'When you are healthy, you take on the best of Type 9 — calm, trust, the ability to settle into a moment without scanning it for threats. The "what could go wrong" voice quiets. You feel held — by God, by your people, by something bigger than the worst-case scenario. You make decisions without exhausting yourself with backup plans. You discover that not every shoe is about to drop, and your nervous system gets to rest.',
    stressParagraph: 'Under pressure, you slip into the harder side of Type 3 — image-obsessed, scrambling to look like you have it together, performing competence instead of asking for help. You hustle through the anxiety instead of facing it. You attach your worth to being seen as successful. You push down the doubt instead of letting it teach you something. The fastest way back: tell one trusted person the truth about how anxious you actually are. Stop performing.',
    bibleVerse: {
      reference: 'Isaiah 41:10 (ESV)',
      text: 'Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.',
    },
  },
  7: {
    name: 'The Enthusiast',
    growthParagraph: 'When you are healthy, you take on the best of Type 5 — depth, focus, the willingness to go deep on one thing instead of skimming many. You commit. You sit with discomfort instead of running from it. The novelty addiction loosens its grip, and you find a different kind of satisfaction in finishing something. You realize that depth is its own adventure. The joy is still there — but it is no longer a defense against pain.',
    stressParagraph: 'Under pressure, you slip into the harder side of Type 1 — critical, perfectionistic, suddenly harsh on yourself and everyone around you. The fun stops, and the inner critic takes over. You get nitpicky about other people, then about yourself, then about the whole project. You start over instead of finishing. The fastest way back: stop trying to do it right. Pick one piece of it, finish it badly, and let that be enough.',
    bibleVerse: {
      reference: 'Ecclesiastes 3:1 (ESV)',
      text: 'For everything there is a season, and a time for every matter under heaven.',
    },
  },
  8: {
    name: 'The Challenger',
    growthParagraph: 'When you are healthy, you take on the best of Type 2 — softness, generosity, the willingness to receive care without it feeling like weakness. You let people see the tender parts you have spent a lifetime protecting. Your protection of others becomes less about control and more about love. You find out that being soft is not the same as being small — it is the most powerful thing you can do. The strength is still there, but it does not have to defend itself anymore.',
    stressParagraph: 'Under pressure, you slip into the harder side of Type 5 — withdrawn, isolated, cynical, refusing to engage. You disappear from people who need you. You harden your borders and decide the world is not worth the energy. You over-strategize from a distance instead of acting. The fastest way back: come back to your body. Move. Eat. Sleep. And re-engage with one person who has earned your trust.',
    bibleVerse: {
      reference: 'Micah 6:8 (ESV)',
      text: 'He has told you, O man, what is good; and what does the Lord require of you but to do justice, and to love kindness, and to walk humbly with your God?',
    },
  },
  9: {
    name: 'The Peacemaker',
    growthParagraph: 'When you are healthy, you take on the best of Type 3 — direction, drive, the willingness to want something and go after it. You show up. You take initiative. You stop disappearing into other people\'s plans and start having your own. The avoidance loosens. You discover that your presence — your real, opinionated, full-color presence — is exactly what the people you love have been waiting for. The peace is still there, but now it is a peace you chose, not a peace you settled for.',
    stressParagraph: 'Under pressure, you slip into the harder side of Type 6 — anxious, suspicious, suddenly imagining all the things that could go wrong with the very thing you were avoiding. The avoidance hardens into dread. You catastrophize. You cannot sleep. You attach to the wrong people for safety. The fastest way back: name the thing you have been avoiding, and take the smallest possible step toward it. Action calms the loop.',
    bibleVerse: {
      reference: 'Joshua 24:15 (ESV)',
      text: 'And if it is evil in your eyes to serve the Lord, choose this day whom you will serve... But as for me and my house, we will serve the Lord.',
    },
  },
}

// Per-type+wing data — what is unique to each of the 18 combinations
export const TYPE_WINGS = {
  '1w9': {
    subtitle: 'The Steady Reformer',
    coreDescription: 'You carry the moral clarity of a Type 1 with the calm depth of a Type 9. You are the quiet integrity in the room — the one who has thought hard about what is right and is unwilling to compromise it, but who does not need to make a scene to hold the line. You build slowly and thoughtfully. You prefer a clean process over a fast one. People who know you well describe you as principled, fair, and steadier than they are. You are wired to reform from a place of peace, not pressure — and the people you serve feel that.',
    strengths: [
      'Unshakable integrity — your word is your bond, and clients feel that immediately.',
      'You can sit with complexity without rushing to a sloppy answer.',
      'Calm leadership in chaos — you steady rooms without dominating them.',
      'You build for the long haul, not the next launch.',
    ],
    blindSpots: [
      'You can be so deliberate that you never actually launch.',
      'You may withhold your opinion in places where your clarity is exactly what is needed.',
      'You can confuse "thinking it through" with avoidance.',
      'You sometimes hold yourself to a standard that quietly punishes you.',
    ],
    businessStyle: 'You teach, lead, and build with a calm authority that people trust. Your offers feel substantive — not flashy, not loud, but solid. You are wired more for depth than reach, and the right audience for you values that exact quality.',
  },
  '1w2': {
    subtitle: 'The Compassionate Reformer',
    coreDescription: 'You carry the moral clarity of a Type 1 with the warmth and people-focus of a Type 2. You are not just trying to fix problems — you are trying to help the actual people inside them. Your standards are high, but they are aimed at lifting people up, not knocking them down. You take responsibility for the well-being of those you lead. You feel called to make things right AND make people whole. People experience you as warm, clear, and just — a rare combination — and they feel safe being honest with you because they know you will both tell them the truth and stand with them.',
    strengths: [
      'You hold high standards AND high care — clients can feel both.',
      'You teach with conviction and serve with warmth.',
      'You see what is wrong AND what people need to be made whole.',
      'You are willing to do hard work for the people you love.',
    ],
    blindSpots: [
      'You can take on too many people\'s problems and burn out.',
      'Your inner critic can spill over onto the people you serve.',
      'You may resent people who do not meet the standard you set for them.',
      'You sometimes confuse helping with controlling.',
    ],
    businessStyle: 'You are wired for advocacy, teaching, and mentoring — work where moral clarity meets real care. Your best offers combine teaching with personal hand-holding. You do well in formats where you can shape both the content AND the experience.',
  },
  '2w1': {
    subtitle: 'The Devoted Helper',
    coreDescription: 'You carry the warmth of a Type 2 with the principled steadiness of a Type 1. You help because it is right — and you help with discipline, structure, and a sense of duty that most pure 2s do not have. Your service is reliable. You show up. You follow through. You see helping as a calling, not just a feeling. People come to you for clarity AND comfort. You are the friend who tells them the truth lovingly, the leader who holds boundaries while still seeing each person, the helper who is not afraid to challenge someone for their own good.',
    strengths: [
      'You combine warmth with structure — your help actually transforms people.',
      'You are reliable in ways that surprise people who underestimate "helpers."',
      'You hold yourself to high standards of integrity in service.',
      'You can lovingly tell people hard truths.',
    ],
    blindSpots: [
      'You can become resentful when others do not match your level of effort.',
      'You may help out of duty when you actually need to rest.',
      'You can be self-critical about how you serve, never feeling it is enough.',
      'You sometimes mistake "I should" for "I want to."',
    ],
    businessStyle: 'You do well in structured 1:1 or small-group work where you can give consistent, personalized care. Mentorship and discipleship formats fit you. You build trust through follow-through, not flash.',
  },
  '2w3': {
    subtitle: 'The Magnetic Helper',
    coreDescription: 'You carry the warmth of a Type 2 with the charisma and drive of a Type 3. You are the helper who builds a movement, the leader who genuinely loves the people in the room. You can read a room and meet what is in it. You are wired for visibility — not because you crave attention, but because being seen lets you serve more people. You are warm AND ambitious. You can build something big without losing the personal touch. People who know you describe you as magnetic, generous, and surprisingly driven for someone so kind.',
    strengths: [
      'You can scale care — you build platforms that still feel personal.',
      'You read people quickly and meet them where they are.',
      'You bring warmth into rooms where it is needed.',
      'You combine vision with genuine love for the people you serve.',
    ],
    blindSpots: [
      'You can let your image of being "the helper" become a performance.',
      'You may over-extend yourself for the sake of being seen as generous.',
      'You sometimes confuse "they love me" with "I love me."',
      'You can struggle to be alone with yourself when no one is being served.',
    ],
    businessStyle: 'You are wired for group programs, communities, and visible mentorship. You can run a podcast, a course, a coaching group, or a movement — all at once. You serve best when you can build something with both reach AND closeness.',
  },
  '3w2': {
    subtitle: 'The Charming Achiever',
    coreDescription: 'You carry the drive of a Type 3 with the warmth and people-focus of a Type 2. You are the achiever who actually likes people. You succeed by drawing them in. You read rooms quickly. You charm easily. You are the natural networker who never makes networking feel transactional because you actually care. You are wired to win — but winning, for you, includes lifting the people you bring with you. People describe you as confident, charismatic, generous, and effective. You are someone others want to be around because they feel both inspired and seen.',
    strengths: [
      'You can sell with warmth — people feel cared for in the process.',
      'You are a natural connector and community-builder.',
      'You move fast AND keep people on the journey.',
      'You inspire others to chase their goals alongside you.',
    ],
    blindSpots: [
      'You can perform connection instead of actually being present.',
      'You may keep proving yourself when nobody is asking you to.',
      'You confuse external success with internal worth.',
      'You can flatter when honest feedback would serve more.',
    ],
    businessStyle: 'You shine in visible, people-centric formats — speaking, group coaching, podcasting, masterminds. You can build a brand AND a community. Your offers should leverage your magnetism and your capacity to make people feel both inspired and seen.',
  },
  '3w4': {
    subtitle: 'The Soulful Achiever',
    coreDescription: 'You carry the drive of a Type 3 with the depth and distinctness of a Type 4. You do not just want to succeed — you want to succeed at something that means something. You are not interested in generic. You are the achiever who is also an artist. You build things that look polished AND feel personal. Your work has both teeth and tenderness. You move fast, but the moments that matter — the ones where you turn what you have lived through into something useful for others — those are not rushed. People describe you as both ambitious and unusually thoughtful, both shiny and substantive.',
    strengths: [
      'You can build at scale without losing depth or soul.',
      'You turn your personal story into transformative content.',
      'Your work has a distinctive voice that cannot be copied.',
      'You combine drive with emotional resonance.',
    ],
    blindSpots: [
      'You can over-curate your image and lose the actual person underneath.',
      'You may set impossibly high standards that exhaust you.',
      'You can swing between "I am amazing" and "I am nothing."',
      'You sometimes withhold the raw parts of you that would actually serve others most.',
    ],
    businessStyle: 'You do well in formats that let you build a personal brand — speaking, writing, premium coaching, distinctive courses. Your business should reflect YOU, not a template. People pay for the depth, not the polish.',
  },
  '4w3': {
    subtitle: 'The Expressive Creative',
    coreDescription: 'You carry the depth of a Type 4 with the ambition and visibility of a Type 3. You feel things deeply AND want to be seen. You are the creative who actually wants an audience — not because you need approval, but because what you have inside you is worth sharing. You move with intensity. You bring your whole self to the work. You are not afraid of beauty, drama, or distinction. People who know you describe you as expressive, magnetic, and a little intense — but the right ones know that intensity is exactly what makes your work matter.',
    strengths: [
      'You can turn personal depth into work that resonates publicly.',
      'You have a distinctive voice and you are not afraid to use it.',
      'You combine emotional depth with the discipline to actually ship.',
      'You inspire others to be more themselves.',
    ],
    blindSpots: [
      'You can swing between "I am uniquely gifted" and "I am uniquely unworthy."',
      'You may over-identify with your image and lose track of the soul underneath.',
      'You can chase recognition and call it expression.',
      'You sometimes hold yourself back because nothing feels distinctive enough yet.',
    ],
    businessStyle: 'You shine in visible, expressive work — speaking, writing, premium courses, content creation. Your business should let your voice come through. People are buying YOU, not the deliverable. Lean into being distinctive.',
  },
  '4w5': {
    subtitle: 'The Quiet Creator',
    coreDescription: 'You carry the depth of a Type 4 with the intellectual focus and introversion of a Type 5. You are the creative who is also a thinker. You build slowly, carefully, and with depth most people do not have the patience for. You are not interested in being seen — you are interested in being true. Your work might be quieter, but it lasts longer. You are wired to make something that matters, even if it takes years. People who find your work tend to become deeply loyal — because it speaks to something real that they have not heard anywhere else.',
    strengths: [
      'You build work of unusual depth and longevity.',
      'You are unafraid to take time and go where others rush past.',
      'Your work has an internal coherence that cannot be faked.',
      'You attract a smaller but fiercely loyal audience.',
    ],
    blindSpots: [
      'You can over-prepare and never launch.',
      'You may convince yourself the world does not need what you have.',
      'You can disappear into your inner world and lose touch with the people you would serve.',
      'You sometimes wait for the perfect moment that never comes.',
    ],
    businessStyle: 'You do best in deep, focused work — writing, niche courses, contemplative mentorship, books, signature frameworks. You do not need a huge audience. You need the right audience and the willingness to keep showing up.',
  },
  '5w4': {
    subtitle: 'The Insightful Visionary',
    coreDescription: 'You carry the analytical depth of a Type 5 with the creativity and emotional resonance of a Type 4. You are the thinker who is also an artist. You see patterns most people miss, and you express them in ways that make people stop and feel something. You are unusual. You know it. Your work tends to combine careful research with surprising beauty. You attract people who are tired of surface-level content. You are wired to think originally and express it in a way that lands — even if it takes you longer than most to feel ready.',
    strengths: [
      'You see patterns and connections others miss.',
      'You can turn analysis into something beautiful and felt.',
      'Your work attracts thoughtful, depth-hungry people.',
      'You are wired for original thinking, not derivative content.',
    ],
    blindSpots: [
      'You can stay in research mode forever.',
      'You may believe you need to know more before sharing.',
      'You can be precious about your work and protect it from real-world feedback.',
      'You sometimes share at a level that loses the people who would benefit most.',
    ],
    businessStyle: 'You do well in writing, frameworks, niche courses, and high-trust mentorship of other thinkers. Your offers should leverage your originality. Do not flatten your voice to fit "what sells" — the audience for what you actually make is out there.',
  },
  '5w6': {
    subtitle: 'The Strategic Builder',
    coreDescription: 'You carry the analytical depth of a Type 5 with the loyalty and security-focus of a Type 6. You are the thinker who is also a planner — the strategist who builds systems that hold. You are deeply competent. You do not promise what you cannot deliver. You research, then build, then refine. People come to you for clarity AND for the sense that nothing is going to fall through the cracks. You are wired for solving problems that take both deep thinking and dependable execution.',
    strengths: [
      'You see systems and structures most people overlook.',
      'You build with rigor and dependability.',
      'You research thoroughly before committing.',
      'You combine intellectual depth with practical follow-through.',
    ],
    blindSpots: [
      'You can over-research and miss the window to act.',
      'You may catastrophize when you should just ship.',
      'You can come across as colder than you actually are.',
      'You sometimes hide behind systems instead of being personally present.',
    ],
    businessStyle: 'You shine in technical teaching, frameworks, consulting, and structured courses. Your offers should leverage your depth AND your reliability. People will pay well for "you have figured it out so I do not have to."',
  },
  '6w5': {
    subtitle: 'The Thoughtful Loyalist',
    coreDescription: 'You carry the loyalty and watchfulness of a Type 6 with the intellectual focus of a Type 5. You are the quiet professional. The one who has thought about things deeply and has earned the trust of the people around you slowly. You commit hard, but you take your time getting there. You are wired for trustworthy expertise. You attract people who value substance over flash. Your audience may be smaller, but they are loyal in ways that astonish you.',
    strengths: [
      'You build deep, lasting trust with the people you serve.',
      'You do thorough work and do not cut corners.',
      'You are calm under pressure because you have already imagined the pressure.',
      'You see risks others miss.',
    ],
    blindSpots: [
      'You can hesitate to start because you see all the ways it could go wrong.',
      'You may underestimate how much value you bring.',
      'You can hide behind expertise instead of being personal.',
      'You sometimes confuse caution with wisdom.',
    ],
    businessStyle: 'You do well in expert positioning — courses, consulting, frameworks, in-depth content. Your offers should leverage your reliability and depth. You do not need to be loud. You need to be trustworthy, and you already are.',
  },
  '6w7': {
    subtitle: 'The Warm Loyalist',
    coreDescription: 'You carry the loyalty of a Type 6 with the warmth and outward energy of a Type 7. You are the loyal friend who is also a fun friend. The dependable one who also lights up a room. You build trust quickly because you are both warm AND solid. People come to you for both real talk AND a laugh. You are wired for community. You make people feel safe AND alive. Your business benefits from your ability to be both a real anchor AND fun to be around.',
    strengths: [
      'You build community easily — people stay because they feel both safe and alive.',
      'You combine reliability with warmth in a rare way.',
      'You can lighten heavy rooms without making things shallow.',
      'You make people feel seen and known.',
    ],
    blindSpots: [
      'You can scatter your energy across too many commitments.',
      'You may avoid hard conversations to keep the room warm.',
      'You can confuse being liked with being trusted.',
      'You sometimes downplay your own concerns to keep others comfortable.',
    ],
    businessStyle: 'You shine in group programs, communities, podcasts, and warm-feeling mentorship. Your offers should leverage your relational gift. People come for the work AND the feeling of being in your orbit.',
  },
  '7w6': {
    subtitle: 'The Joyful Connector',
    coreDescription: 'You carry the optimism and energy of a Type 7 with the loyalty and warmth of a Type 6. You are the fun friend who actually stays. The bringer of joy who also shows up when things are hard. You make life feel possible. People are drawn to you because you make them believe they can do the thing. You are wired for both connection AND momentum. Your business benefits from your ability to gather people, energize them, and walk with them long enough to see real change.',
    strengths: [
      'You energize rooms — people leave feeling like they can do it.',
      'You build loyalty through warmth AND playfulness.',
      'You make hard journeys feel doable.',
      'You combine joy with real follow-through.',
    ],
    blindSpots: [
      'You can over-promise in a moment of excitement.',
      'You may avoid sitting with the people in pain because it dims your light.',
      'You can scatter your energy across too many ideas.',
      'You sometimes confuse enthusiasm with strategy.',
    ],
    businessStyle: 'You shine in group programs, cohorts, communities, and high-energy mentorship. Your offers should leverage your contagious belief. People come for the joy AND stay for the transformation.',
  },
  '7w8': {
    subtitle: 'The Bold Adventurer',
    coreDescription: 'You carry the optimism of a Type 7 with the boldness and drive of a Type 8. You are not just an enthusiast — you are an enthusiast who acts. You move fast, you build big, you say yes to the thing other people are still thinking about. You are wired for action and for adventure. You inspire others by showing them what is possible — not because you talk about it, but because you have already done it. Your business benefits from your willingness to take risks and your refusal to wait around for permission.',
    strengths: [
      'You move faster than most people — and finish things others would still be planning.',
      'You inspire by example, not theory.',
      'You combine optimism with real-world execution.',
      'You see big, and you go for big.',
    ],
    blindSpots: [
      'You can move so fast that you outrun the people you are leading.',
      'You may underestimate hard things because you are wired to find a way through.',
      'You can dismiss pain — yours or others\' — because it slows you down.',
      'You sometimes confuse activity with progress.',
    ],
    businessStyle: 'You shine in bold offers — premium coaching, masterminds, in-person events, courses with high-energy launches. Your offers should match your appetite. People are paying for the fire as much as the framework.',
  },
  '8w7': {
    subtitle: 'The Independent Leader',
    coreDescription: 'You carry the strength of a Type 8 with the energy and outward focus of a Type 7. You are the bold leader who is also fun, the powerhouse who can charm a room. You move with conviction. You take up space without apologizing. You are wired to lead, to disrupt, to push past what others think is possible. You also know how to bring people with you. Your business benefits from your willingness to be the face, take the risk, and tell the truth most people are too polite to say.',
    strengths: [
      'You lead boldly and people follow.',
      'You are unafraid of conflict or hard conversations.',
      'You combine power with genuine charisma.',
      'You can rally people around a vision and execute it.',
    ],
    blindSpots: [
      'You can overpower the people you are trying to lead.',
      'You may rush past important nuance because you are wired for action.',
      'You can mistake your discomfort with vulnerability for "I do not need that."',
      'You sometimes burn bridges you would later want.',
    ],
    businessStyle: 'You shine in high-stakes, high-visibility work — speaking, premium coaching, masterminds, public leadership. Your offers should leverage your boldness. People are paying to be led by someone who actually leads.',
  },
  '8w9': {
    subtitle: 'The Grounded Force',
    coreDescription: 'You carry the strength of a Type 8 with the calm and groundedness of a Type 9. You are the bold leader who is also a steadying presence — the powerhouse who does not need to dominate to lead. You move with quiet authority. You take up space without making it a scene. People follow you because they feel safe AND inspired around you. You are wired for slow-burning, deeply-rooted impact. Your business benefits from your ability to be both strong AND grounded — a rare combination people are hungry for.',
    strengths: [
      'You lead with calm authority — people trust you immediately.',
      'You are strong without needing to dominate.',
      'You hold space for both hard truths AND real care.',
      'You are unshakable in ways that calm everyone around you.',
    ],
    blindSpots: [
      'You can hold so much that you forget to ask for what you need.',
      'You may delay confrontation when it is actually needed.',
      'You can confuse calm with permission.',
      'You sometimes underestimate how much your presence affects others.',
    ],
    businessStyle: 'You do well in deep, durable formats — premium mentorship, long-term coaching, signature programs, leadership development. Your offers should leverage your gravitas. People will pay well for the rare combination of strength AND steadiness.',
  },
  '9w8': {
    subtitle: 'The Anchoring Peacemaker',
    coreDescription: 'You carry the peace of a Type 9 with the strength and clarity of a Type 8. You are the calm presence with surprising backbone. You are easygoing — until you are not. People underestimate you because of your gentleness, and then they meet your line and realize how clearly you hold it. You are wired for advocacy. You bring peace AND you do not let injustice slide. Your business benefits from your steadiness AND your willingness to take a real stand when it matters.',
    strengths: [
      'You can mediate conflict without losing yourself in it.',
      'You hold the line without aggression.',
      'You are the safe presence that also speaks truth.',
      'You combine calm with surprising courage.',
    ],
    blindSpots: [
      'You can let things slide for too long, then explode.',
      'You may avoid taking a stand until it is forced.',
      'You can confuse keeping the peace with keeping silent.',
      'You sometimes do not know what you want until someone challenges you.',
    ],
    businessStyle: 'You shine in mediation, mentorship, leadership coaching, and group work that needs a steady anchor. Your offers should leverage your calm authority. People pay for the safety AND the truth-telling.',
  },
  '9w1': {
    subtitle: 'The Principled Peacemaker',
    coreDescription: 'You carry the peace of a Type 9 with the moral clarity of a Type 1. You are the calm presence who also stands for something specific. You are easygoing in posture but rooted in conviction. You do not need to argue your principles — they show up in how you live. People come to you for calm clarity AND for a sense of moral direction. You are wired for thoughtful, principled leadership. Your business benefits from your ability to be both gracious AND uncompromising on what actually matters.',
    strengths: [
      'You combine peacefulness with quiet conviction.',
      'You hold high standards without becoming harsh.',
      'You bring order to the chaos around you.',
      'You are trustworthy in ways people can feel.',
    ],
    blindSpots: [
      'You can avoid your own anger until it leaks out as judgment.',
      'You may quietly resent people who do not meet your standards.',
      'You can over-think action because you want it to be the "right" action.',
      'You sometimes withhold your truth because you are not sure it is welcome.',
    ],
    businessStyle: 'You do well in teaching, mentoring, leadership development, and steady-hand coaching. Your offers should leverage your principled calm. People pay for the rare combination of grace AND moral clarity.',
  },
}
