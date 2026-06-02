export type GrammarLesson = {
  title: string;
  wrong: string;
  correct: string;
  note: string;
};

export const grammarLessons: GrammarLesson[] = [
  {
    title: "by + verb-ing",
    wrong: "by listen my voice",
    correct: "by listening to my voice",
    note: "After 'by,' use the -ing form when you describe how something is done."
  },
  {
    title: "Make a cleaner request",
    wrong: "Can you build me an advanced grammar and English teaching guide?",
    correct: "Can you build a personalized English program for me?",
    note: "Natural spoken English often prefers shorter, cleaner sentence architecture."
  },
  {
    title: "Every day vs. everyday",
    wrong: "Give me everyday five idioms.",
    correct: "Give me five idioms every day.",
    note: "'Every day' means each day. 'Everyday' is an adjective: everyday English."
  },
  {
    title: "Want + object + infinitive",
    wrong: "I want that my English improves.",
    correct: "I want my English to improve.",
    note: "With 'want,' English usually uses object + to + verb: I want you to speak clearly."
  }
];
