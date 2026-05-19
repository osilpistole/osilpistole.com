// src/data/enneagram-questions.js
//
// 72 statements total — 8 per type, types 1–9.
// Each statement: { typeId: 1..9, text: string }
//
// Likert mapping (used for both UI labels and scoring weights):
//   Not me    = 0
//   Sometimes = 1
//   Often     = 2
//   Always    = 3
//
// Max possible score per type: 8 * 3 = 24

export const LIKERT_LABELS = ['Not me', 'Sometimes', 'Often', 'Always']
export const LIKERT_WEIGHTS = [0, 1, 2, 3]

export const QUESTIONS = [
  // Type 1 — The Reformer / Perfectionist
  { typeId: 1, text: 'I notice mistakes in things — typos, sloppy work, things done halfway — and they bother me.' },
  { typeId: 1, text: 'There is a voice in my head that is constantly telling me what I should be doing better.' },
  { typeId: 1, text: 'I hold myself to a standard most people would consider too strict.' },
  { typeId: 1, text: 'When I see something done wrong, I feel a strong pull to fix it or speak up.' },
  { typeId: 1, text: 'I have a clear sense of how things ought to be, and it is hard to let that go.' },
  { typeId: 1, text: 'I get frustrated with myself when I let small things slide.' },
  { typeId: 1, text: 'I would rather do something well or not do it at all.' },
  { typeId: 1, text: 'Even when something is finished, I see what could still be improved.' },

  // Type 2 — The Helper
  { typeId: 2, text: 'I am good at sensing what someone needs before they say it.' },
  { typeId: 2, text: 'I find it easier to give to others than to ask for something for myself.' },
  { typeId: 2, text: 'I want to be the person people come to when they need help.' },
  { typeId: 2, text: 'I sometimes do more for others than I have energy for, and do not say no when I should.' },
  { typeId: 2, text: 'Being needed by the people I love feels really good.' },
  { typeId: 2, text: 'I struggle to name what I actually want for me — I default to what others want.' },
  { typeId: 2, text: 'When I help someone, I quietly hope they will notice and appreciate it.' },
  { typeId: 2, text: 'I feel uncomfortable receiving from others — gifts, compliments, help.' },

  // Type 3 — The Achiever
  { typeId: 3, text: 'I am driven to be the best at what I do, and I notice when I am not.' },
  { typeId: 3, text: 'How I am perceived matters to me more than I would like to admit.' },
  { typeId: 3, text: 'I can adapt who I am to fit the room I am in.' },
  { typeId: 3, text: 'I focus on what success looks like and work backwards from there.' },
  { typeId: 3, text: 'I get a real charge out of accomplishment, recognition, and forward momentum.' },
  { typeId: 3, text: 'I would rather be efficient than slow down to feel something.' },
  { typeId: 3, text: 'I struggle to rest — being still feels like falling behind.' },
  { typeId: 3, text: 'I have sometimes shaped my image to match what wins approval in the room.' },

  // Type 4 — The Individualist
  { typeId: 4, text: 'I feel like there is something different about me that other people do not quite get.' },
  { typeId: 4, text: 'I am drawn to what is emotionally rich, beautiful, or melancholy — not the surface stuff.' },
  { typeId: 4, text: 'I often want what I do not have, and feel ordinary about what I do have.' },
  { typeId: 4, text: 'My moods can swing strongly, and I follow them rather than fight them.' },
  { typeId: 4, text: 'I want my life and work to express who I really am — not be generic.' },
  { typeId: 4, text: 'I sometimes feel envious of other people whose lives look easier than mine.' },
  { typeId: 4, text: 'The idea of being "average" or interchangeable really bothers me.' },
  { typeId: 4, text: 'I feel things deeply, and I am protective of that depth.' },

  // Type 5 — The Investigator
  { typeId: 5, text: 'I need a lot of time alone to recharge, and I guard it.' },
  { typeId: 5, text: 'I prefer watching and figuring something out before I jump in.' },
  { typeId: 5, text: 'I would rather know a lot about a few things than a little about many.' },
  { typeId: 5, text: 'People can drain me, especially in groups or unstructured social settings.' },
  { typeId: 5, text: 'I keep my inner world private — I do not share easily.' },
  { typeId: 5, text: 'Before committing to something, I want to understand it thoroughly.' },
  { typeId: 5, text: 'I get uncomfortable when others want more emotional or relational input from me than I have to give.' },
  { typeId: 5, text: 'My mind feels like my safest place.' },

  // Type 6 — The Loyalist
  { typeId: 6, text: 'I am always running scenarios in my head — what could go wrong, what to plan for.' },
  { typeId: 6, text: 'I am deeply loyal to the people and causes I commit to.' },
  { typeId: 6, text: 'I sometimes overthink decisions because I am looking for hidden problems.' },
  { typeId: 6, text: 'I trust people slowly, but once I trust you, I really show up.' },
  { typeId: 6, text: 'Authority is complicated for me — I respect it, then I question it.' },
  { typeId: 6, text: 'I find it hard to feel settled without a backup plan.' },
  { typeId: 6, text: 'I tend to assume something can go wrong and prepare for it just in case.' },
  { typeId: 6, text: 'I want to feel like I have a team, a safe place, or a structure I can count on.' },

  // Type 7 — The Enthusiast
  { typeId: 7, text: 'I have a lot of ideas going at once, and it is hard to pick just one.' },
  { typeId: 7, text: 'I would rather move on than sit with something hard or painful.' },
  { typeId: 7, text: 'I am always looking ahead to the next exciting thing.' },
  { typeId: 7, text: 'I dislike feeling stuck, limited, or trapped in a routine.' },
  { typeId: 7, text: 'I reframe negative situations to find what is still possible.' },
  { typeId: 7, text: 'I struggle to commit when I feel like committing closes other doors.' },
  { typeId: 7, text: 'I get bored easily and look for new stimulation.' },
  { typeId: 7, text: 'I keep multiple options open in case the current one stops feeling good.' },

  // Type 8 — The Challenger
  { typeId: 8, text: 'I would rather be too direct than too soft.' },
  { typeId: 8, text: 'I move fast on things I want — I do not wait for permission.' },
  { typeId: 8, text: 'I notice power dynamics and where the real influence is in a room.' },
  { typeId: 8, text: 'I am protective of the people I love — sometimes more than they want.' },
  { typeId: 8, text: 'I trust myself more than I trust experts, systems, or institutions.' },
  { typeId: 8, text: 'I have trouble showing the soft parts of me to people who have not earned it.' },
  { typeId: 8, text: 'I would rather lose a fight than feel small or controlled.' },
  { typeId: 8, text: 'I take up space when others will not, and people sometimes find it intense.' },

  // Type 9 — The Peacemaker
  { typeId: 9, text: 'I am good at seeing every side of a situation, which sometimes makes deciding hard.' },
  { typeId: 9, text: 'I avoid conflict when I can, even at my own cost.' },
  { typeId: 9, text: 'I lose track of what I want when I am with people I am close to.' },
  { typeId: 9, text: 'I procrastinate the things that take real energy.' },
  { typeId: 9, text: 'I am easygoing — most things are fine, until they are really not.' },
  { typeId: 9, text: 'I prefer keeping the peace over being honest about how I actually feel.' },
  { typeId: 9, text: 'I sometimes wait for life to come to me instead of going after it.' },
  { typeId: 9, text: 'When I do get angry, it comes out sideways or much later.' },
]
