// The AI Feelings Spectrum — 7 questions, 6 archetypes.
// Each option nudges points toward one or two archetypes.

export type ArchetypeKey =
  | "up_too_late"
  | "quiet_avoider"
  | "prompt_curious"
  | "fatigued"
  | "secret_evangelist"
  | "worried_carrier";

export type Archetype = {
  key: ArchetypeKey;
  name: string;
  tagline: string;
  vibe: string; // one-liner body text
  emoji: string;
  bg: string; // tailwind bg class (for result card)
  fg: string; // tailwind text class
  ring: string; // tailwind shadow color utility
  mantra: string;
  also_known_as: string;
};

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  up_too_late: {
    key: "up_too_late",
    name: "The Up-Too-Late Builder",
    tagline: "Three tabs of docs, one of you, zero of sleep.",
    vibe:
      "You're in it. You talk to your laptop like a friend. You have ten half-built projects and one unshakable grin. You'd like someone to say 'that's amazing' without also saying 'please rest.'",
    emoji: "🌙",
    bg: "bg-[hsl(330_95%_58%)]",
    fg: "text-white",
    ring: "chunky-shadow-lime",
    mantra: "sleep is also a feature",
    also_known_as: "the one whose partner has said 'it's 2am' this week",
  },
  quiet_avoider: {
    key: "quiet_avoider",
    name: "The Quiet Avoider",
    tagline: "Not against it. Just… not yet. Okay maybe never. Okay maybe soon.",
    vibe:
      "You haven't really used it. And the not-using is starting to feel louder than the using would. The avoidance itself has become a weight. You're not alone here — half this room is you.",
    emoji: "🌫️",
    bg: "bg-[hsl(230_85%_55%)]",
    fg: "text-white",
    ring: "chunky-shadow-pink",
    mantra: "curiosity beats shame, gently",
    also_known_as: "the one who closes the tab every time",
  },
  prompt_curious: {
    key: "prompt_curious",
    name: "The Quietly Behind",
    tagline: "Everyone on LinkedIn is building agents. You're still figuring out prompts.",
    vibe:
      "You use it. A bit. You feel like you should know more. LinkedIn is a threat, not a feed. You'd love a room where 'I don't get it' is a full sentence, not a confession.",
    emoji: "🧩",
    bg: "bg-[hsl(265_80%_62%)]",
    fg: "text-white",
    ring: "chunky-shadow-lime",
    mantra: "you are not behind, you are in it",
    also_known_as: "the one who screenshots other people's workflows",
  },
  fatigued: {
    key: "fatigued",
    name: "The AI-Fatigued",
    tagline: "If one more person says 'have you tried asking Gemini,' you will scream.",
    vibe:
      "You're tired. Of the takes. Of the pivots. Of every product turning into a chat box. You want one conversation that isn't telling you about a new prompt or a feature or telling you what the future of work is.",
    emoji: "🫠",
    bg: "bg-[hsl(43_95%_58%)]",
    fg: "text-[hsl(240_30%_12%)]",
    ring: "chunky-shadow-pink",
    mantra: "your weariness is data, not a defect",
    also_known_as: "the one who mutes 'AI' on Twitter",
  },
  secret_evangelist: {
    key: "secret_evangelist",
    name: "The Secret Evangelist",
    tagline: "You love it. Everyone around you is scared or cynical. You feel weirdly alone.",
    vibe:
      "The joy is real and you can't say it out loud without a caveat. You want a room of people who also feel the magic, who also have complicated thoughts, and who won't make you choose.",
    emoji: "✨",
    bg: "bg-[hsl(86_80%_55%)]",
    fg: "text-[hsl(240_30%_12%)]",
    ring: "chunky-shadow-blue",
    mantra: "delight is allowed, even now",
    also_known_as: "the one who got yelled at at dinner last week",
  },
  worried_carrier: {
    key: "worried_carrier",
    name: "The Worried Carrier",
    tagline: "Not using it much. Carrying a lot about it. Kids, jobs, the future, the shape of us.",
    vibe:
      "You don't need a tutorial. You need a place to put the 3am thoughts. About your kid's future. About your identity at work. About what we lose when everything gets easier and lonelier.",
    emoji: "🌊",
    bg: "bg-[hsl(240_30%_20%)]",
    fg: "text-[hsl(46_100%_95%)]",
    ring: "chunky-shadow-lime",
    mantra: "worrying out loud is a form of care",
    also_known_as: "the one who lies awake thinking about their kid's college",
  },
};

export type QuizOption = {
  label: string;
  emoji?: string;
  weights: Partial<Record<ArchetypeKey, number>>;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  sub?: string;
  options: QuizOption[];
};

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "time",
    prompt: "How much time did you spend with AI tools this week?",
    sub: "Honesty only. No one is counting.",
    options: [
      {
        label: "Embarrassing amount. I'm in a situationship with my laptop.",
        emoji: "🌙",
        weights: { up_too_late: 3, secret_evangelist: 1 },
      },
      {
        label: "A solid amount. Work stuff, some play.",
        emoji: "🧩",
        weights: { prompt_curious: 2, secret_evangelist: 1 },
      },
      {
        label: "A little. I dip in when I need to.",
        emoji: "🌤️",
        weights: { prompt_curious: 2, fatigued: 1 },
      },
      {
        label: "Basically zero. I keep meaning to.",
        emoji: "🌫️",
        weights: { quiet_avoider: 3, worried_carrier: 1 },
      },
    ],
  },
  {
    id: "linkedin",
    prompt: "You open LinkedIn. Someone's announcing their fifth AI agent this week. You:",
    options: [
      {
        label: "Save it, reverse-engineer it, build my own by Sunday.",
        emoji: "🛠️",
        weights: { up_too_late: 2, secret_evangelist: 2 },
      },
      {
        label: "Feel the dread bloom. Close the app. Feel it again later.",
        emoji: "😮‍💨",
        weights: { prompt_curious: 3, quiet_avoider: 1 },
      },
      {
        label: "Scroll past. I'm full.",
        emoji: "🙃",
        weights: { fatigued: 3 },
      },
      {
        label: "Wonder if I should even be on LinkedIn anymore.",
        emoji: "🌊",
        weights: { worried_carrier: 2, quiet_avoider: 1 },
      },
    ],
  },
  {
    id: "feeling",
    prompt: "If your AI feelings were a weather forecast, today is:",
    options: [
      { label: "Sunny. Genuinely excited.", emoji: "☀️", weights: { secret_evangelist: 3, up_too_late: 1 } },
      { label: "Foggy. A lot of 'I don't know.'", emoji: "🌫️", weights: { prompt_curious: 2, quiet_avoider: 2 } },
      { label: "Heatwave burnout. Make it stop.", emoji: "🥵", weights: { fatigued: 3 } },
      { label: "Storm watch. Low-grade dread.", emoji: "⛈️", weights: { worried_carrier: 3, quiet_avoider: 1 } },
    ],
  },
  {
    id: "dinner",
    prompt: "Someone at dinner says 'AI is going to take all our jobs.' You:",
    options: [
      {
        label: "Launch into a nuanced 20-minute monologue I've been refining for months.",
        emoji: "🎤",
        weights: { up_too_late: 2, secret_evangelist: 2 },
      },
      {
        label: "Change the subject. I cannot do this at dinner again.",
        emoji: "🙈",
        weights: { fatigued: 3 },
      },
      {
        label: "Quietly panic. They might be right. I don't want to say that out loud.",
        emoji: "🫠",
        weights: { worried_carrier: 3, prompt_curious: 1 },
      },
      {
        label: "Smile, nod, add nothing. I don't have a take.",
        emoji: "😐",
        weights: { quiet_avoider: 3 },
      },
    ],
  },
  {
    id: "work",
    prompt: "At work, your relationship with AI is most like:",
    options: [
      {
        label: "I'm the person other people DM with 'hey can you teach me.'",
        emoji: "🧙",
        weights: { up_too_late: 2, secret_evangelist: 2 },
      },
      {
        label: "I'm using it more than I admit in meetings.",
        emoji: "🤫",
        weights: { secret_evangelist: 2, prompt_curious: 2 },
      },
      {
        label: "I feel quietly behind. Everyone else seems fluent.",
        emoji: "🫥",
        weights: { prompt_curious: 3, worried_carrier: 1 },
      },
      {
        label: "I'm questioning whether I'm still good at my job.",
        emoji: "🌀",
        weights: { worried_carrier: 3, fatigued: 1 },
      },
    ],
  },
  {
    id: "want",
    prompt: "Finish the sentence: 'What I actually want right now is…'",
    options: [
      {
        label: "A room of people who also can't sleep because they're building.",
        emoji: "🔥",
        weights: { up_too_late: 3 },
      },
      {
        label: "Permission to say 'I don't get it' without being made small.",
        emoji: "🧡",
        weights: { prompt_curious: 2, quiet_avoider: 2 },
      },
      {
        label: "A break. A real one. From every conversation being This.",
        emoji: "🛟",
        weights: { fatigued: 3 },
      },
      {
        label: "Somewhere to put the 3am thoughts.",
        emoji: "🌌",
        weights: { worried_carrier: 3 },
      },
    ],
  },
  {
    id: "alone",
    prompt: "On a scale of 'not alone' to 'pretty alone in this,' where are you?",
    options: [
      {
        label: "Pretty alone. Nobody in my life feels what I feel about this.",
        emoji: "🪐",
        weights: { secret_evangelist: 2, worried_carrier: 2 },
      },
      {
        label: "Sometimes lonely, sometimes fine.",
        emoji: "🌓",
        weights: { prompt_curious: 2, quiet_avoider: 1 },
      },
      {
        label: "I have people, I just want better conversations.",
        emoji: "🫶",
        weights: { up_too_late: 1, secret_evangelist: 2, fatigued: 1 },
      },
      {
        label: "I don't even know where I am right now.",
        emoji: "🌀",
        weights: { quiet_avoider: 2, worried_carrier: 2 },
      },
    ],
  },
];

export function scoreQuiz(answers: Record<string, number>): ArchetypeKey {
  const totals: Record<ArchetypeKey, number> = {
    up_too_late: 0,
    quiet_avoider: 0,
    prompt_curious: 0,
    fatigued: 0,
    secret_evangelist: 0,
    worried_carrier: 0,
  };
  for (const q of QUESTIONS) {
    const idx = answers[q.id];
    if (idx == null) continue;
    const opt = q.options[idx];
    if (!opt) continue;
    for (const [k, v] of Object.entries(opt.weights)) {
      totals[k as ArchetypeKey] += v ?? 0;
    }
  }
  let winner: ArchetypeKey = "prompt_curious";
  let max = -Infinity;
  for (const [k, v] of Object.entries(totals) as [ArchetypeKey, number][]) {
    if (v > max) {
      max = v;
      winner = k;
    }
  }
  return winner;
}
