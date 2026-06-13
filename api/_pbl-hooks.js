// 1,000 Viral Hooks — Personal Brand Launch (PBL)
// Categorized hook templates for the 30 Days Done content plan generator.
// Used by /api/30days-plan (Phase 2) to construct fresh hooks for each day.

export const HOOK_CATEGORIES = {
  EDUCATIONAL: 'educational',
  COMPARISON: 'comparison',
  MYTH_BUSTING: 'myth_busting',
  STORYTELLING: 'storytelling',
  AUTHORITY: 'authority',
  DAY_IN_LIFE: 'day_in_life',
  RANDOM: 'random',
}

// A curated sample — the AI uses these as PATTERNS, not literal text.
// Each pattern has placeholders like {audience}, {result}, {pain}, {timeframe}.
// The generator fills them with the user's actual specifics.
export const HOOK_PATTERNS = {
  [HOOK_CATEGORIES.EDUCATIONAL]: [
    'This represents your {topic} before, during, and after {transformation}',
    "Here's exactly how much {action} you need to {result}",
    'Can you tell us how to {result} in 60 seconds?',
    "This is what {thing} looks like when you're {action}. And this is what they look like when you're not.",
    "I'm going to tell you how to get {result}, {method}.",
    "It took me 10 years to learn this but I'll teach it to you in less than 1 minute.",
    "When you get {result}, here are the {number} things you have to do right away.",
    "If you don't have {item}, do {alternative}.",
    "Here's how to develop {skill} so strong that you physically can't stop.",
    'If I woke up {pain_point} tomorrow, and wanted to {dream_result} by {timeframe}, here\'s exactly what I would do.',
    "If you're a {audience} and you want {dream_result} by {avenue}, then listen to this.",
    "As a responsible {age} year old with a goal to {goal}, here are 3 things I will never regret doing.",
    "Not to flex, but I'm pretty good at {skill}.",
    "Are you still {bad_action}? I've got {result} in {timeframe} and I have never done that.",
    'I think I just found the biggest {niche} cheat code.',
    'Here are 3 people who will make you a better {title}.',
    "Everyone tells you to {action} but nobody actually tells you how. Here's a {timeframe} step-by-step tutorial.",
    "If you're {age}, these are the {number} things you need to do so you don't end up {pain_point} by {older_age}.",
    "If I were starting over with no {advantage}, here are the top {number} things I would do.",
    "Here's exactly how you're gonna lock in if you want to {dream_result}.",
    'If you want to end up {pain_point}, then skip this video.',
    "{action} for {time_period} and you will get {dream_result}.",
    'In 60 seconds I\'m going to teach you more about {topic} than you have ever learned.',
    "I'd do this before {decision}.",
    "If you're trying to {dream_result} and you haven't got a clue what to do, I'm going to show you an example.",
    "If I had {timeframe} to get a job as a {title}, this is what I would do.",
    'Things that are damaging your {asset} without you even realizing it.',
    "Why is it we are all so stressed about {topic} but we also all have {paradox}.",
    'Stop {bad_action} if you actually want {dream_result}.',
    "This is what {money_amount} will get you in {location}.",
    'There is one thing above all that sets the top {title} apart from the rest.',
  ],

  [HOOK_CATEGORIES.COMPARISON]: [
    'This is an {option_a}, and this is an {option_b}.',
    'This {a} and this {b} have the same amount of {metric}.',
    "A lot of people ask me what's better for {dream_result} — {a} or {b}. I achieved it doing one and it's not even close.",
    'For this {item} you could have all of these {alternatives}.',
    'This {a} has {ingredient} in it, and this {b} has {worse_ingredient} in it.',
    "This group didn't {action} and this group did.",
    'For this {price}, you could have this whole {bundle}.',
    "How long would it take you to go from {before} to {after}?",
    "If you're between {age_low} and {age_high} and you want to {dream_result}, you have to do these {number} things.",
    'One {item}, and {number} of my {items} have the same {metric}.',
    'This is {x} before you {action}, this is {x} after you {action}.',
    'Cheap vs. Expensive {item}.',
  ],

  [HOOK_CATEGORIES.MYTH_BUSTING]: [
    'This is why doing {common_action} makes you {pain_point}.',
    'This is how you {dream_result} while {guilty_pleasure}.',
    "If you're really a {label}, why aren't you doing {challenged_belief}?",
    "Just because you do {action} doesn't make you a good {label}.",
    "If you are {bad_action} just once per {timeframe}, you are screwed.",
    "No, your {thing} is not causing {bad_result}.",
    'Let me de-influence you from {action}.',
    'More {audience} need to hear this: {common_belief} will not get you {dream_result}.',
    "It's time to throw away your {item}, you don't need it anymore.",
    "They said, \"{cliché}.\" That's a lie.",
    "Don't {action} until you've done this one thing.",
    "Stop using {item} for {result}.",
    "Your life is boring because you don't {action}.",
    "{item} is actually a really good {alternative} for {result}.",
    "Just because you have never {action} before doesn't make you a {label} person.",
    "I have never met a single person that {pattern} and still has time to {dream_result}.",
    "What if I told you making your own {item} is actually super easy and only costs {price}?",
    "There is absolutely no reason for you to be {pain_point} every single day just because you are trying to {dream_result}.",
    "You're using your {item} wrong and I am going to show you how to use it the right way.",
  ],

  [HOOK_CATEGORIES.STORYTELLING]: [
    'I started my {business} when I was {age} with {budget}.',
    '{number} years ago my {person} told me {quote}.',
    "I have {timeframe} to get my life together.",
    "I don't have a backup plan so this kind of needs to work.",
    'This is how my {event} changed my life.',
    'So about {timeframe} ago my {person} and I did {action}.',
    "{number} years ago I decided to {decision}.",
    "Yesterday I was at {location} when I noticed something {observation}.",
    "Is it possible to {dream_result} while {constraint} in {timeframe}?",
    'When is it time to do {decision}?',
    "When I was {state}, I was always {bad_habit}.",
    'If you are anything like me, you take your {topic} very seriously.',
    'In {timeframe}, I went from {before} to {after}.',
    "Hi I am {name} and I am starting {business} from scratch.",
    "This is probably the scariest thing I have ever done.",
    "It all started when {person} {action}.",
    "I've {achievement} despite having {obstacle} and this is the routine that did it.",
    'I am leaving my {salary} dream job at {company} to {action}.',
    'When I told my {person} I was going to start doing this, they thought it was the worst idea ever.',
    "Today I woke up and realized {realization}.",
    "I think (insert belief) so I have been taking matters into my own hands.",
    "I have a confession. I have no problem {easy_thing} but it's the process of actually {hard_thing} that feels so {adjective}.",
    'I worked at {company} for {time} and now I am exposing everything they keep from customers.',
    "Buying things I don't need because I have adult money.",
  ],

  [HOOK_CATEGORIES.AUTHORITY]: [
    'My {before_thing} used to look like this and now they look like this.',
    '{number} YEARS it took me from {before} to {after}.',
    'How to turn this into this in {number} simple steps.',
    "{big_result} from {item}. Here's how you can do it in {number} steps.",
    "Over the past {timeframe} I've grown my {asset} from {before} to {after}.",
    'Just {number} {action} took my client from {before} to {after}.',
    'My customer got {dream_result} without {pain_point}.',
    'How I got my {asset} from this to this.',
    "I became a {achievement} at {age} and if I could give you {number} pieces of advice, it would be…",
    "Everyone is complimenting my {asset} because of one routine that I do.",
    "I lost over {metric} in {timeframe} and here are the {number} things I would do if I was to start all over.",
    "I'm in a {state} and these {number} habits dramatically transformed my {asset}.",
    "I got {dream_result} on all of my {items} with minimal {effort}, and here's how.",
    "If I were to create a {thing} today, this is how I would do it.",
    "What I do in a day as someone who has achieved {dream_result}.",
    "In {year} my business made {dollar_amount}.",
    "As a {title} for several years, I often get asked: {question}.",
    "I have never ended {thing} with a {result} or below.",
    "I jumped my {metric} from {before} to {after}.",
    "After {achievement}, here is one thing I learned the hard way so you don't have to.",
  ],

  [HOOK_CATEGORIES.DAY_IN_LIFE]: [
    'We all have the same 24 hours in a day so here I am putting my 24 hours to work.',
    'Day 1 of starting over my whole entire life.',
    "Being a {label}, my days vary quite a lot from one another.",
    'Day in the life of a {label} person.',
    "Welcome back to the day in the life of two {labels} trying to build the next {company}.",
    'I am a {age} year old {title}, and I am heading to {event}.',
    'This is a day in the life of a {title}, {niche} edition.',
    'Come to work with me as a {title}.',
    "Day # of trying to make {money} by the end of the year, by {method}.",
    'Day in the life of a future millionaire.',
    "This is what an average day of a {title} looks like a week out from {event}.",
  ],

  [HOOK_CATEGORIES.RANDOM]: [
    'This is {large_number} of {item}.',
    "What {title} says vs what they mean.",
    "{trend} is the most disgusting trend on social media.",
    "I do not believe in {common_belief}, I believe in {your_belief}.",
    "If you like these {style}, you'll probably like my {work}.",
    "{brand} didn't want to sponsor this video, let me show you what they're missing.",
    "I am trying a different {item} for each letter of the alphabet.",
  ],
}

// Format types — what kind of post each idea should be
export const FORMATS = {
  TALKING_HEAD: 'talking_head',
  B_ROLL: 'b_roll',
  CAROUSEL: 'carousel',
  GRAPHIC: 'graphic',
}

export const FORMAT_GUIDANCE = {
  [FORMATS.TALKING_HEAD]: 'Film yourself talking direct to camera. ~30-60 seconds. Hook in the first 3 seconds.',
  [FORMATS.B_ROLL]: 'Voiceover layered over secondary footage — work in progress, environment shots, action clips. ~30-90 seconds.',
  [FORMATS.CAROUSEL]: '5-10 slide image carousel. First slide = hook. Final slide = CTA. Each slide one idea.',
  [FORMATS.GRAPHIC]: 'Static image with text overlay. The hook is the entire image. ~3-8 words on screen.',
}

// CTA types based on the user's stated goal
export const CTA_TYPES = {
  sales: [
    'Link in bio if you want {offer}.',
    'Comment "{keyword}" and I\'ll DM you the details.',
    'Save this if you\'re ready to {action}.',
  ],
  community: [
    'Tell me in the comments — which of these is YOU?',
    'Tag someone who needs to see this.',
    'What would you add? Drop it below.',
  ],
  awareness: [
    'Follow for more on {topic}.',
    'Save this so you don\'t lose it.',
    'Send this to one person who needs it.',
  ],
  list: [
    'Comment "list" and I\'ll DM you the link to join.',
    'Free guide in my bio.',
    'Take the free quiz — link in bio.',
  ],
}
