// Inductive Bible Study (Precept Method) content types.
// Each chapter study has 9 observation steps + interpretation movements +
// application questions, mirroring the Precept inductive method.
//
// StudyStep is a discriminated union by `kind` so each step's renderer
// can produce the right shape (prose / Q&A / table / contrast rows / etc.)
// without leaking layout concerns into the data file.
//
// NOTE: Several record shapes include a `[key: string]: unknown` index
// signature. This is defensive: our AI generation pipeline can produce
// chapter files with model-emitted extra keys (especially as artifacts of
// json-repair recovery on responses with unescaped quotes inside body
// strings). The renderer reads named fields only and ignores extras, so
// the looseness has no runtime cost — it just keeps strict TypeScript
// downstream (mobile) from rejecting the entire `node_modules/@versemate`
// tree. Consumers should still rely on the documented named fields.

export interface StudyStepBase {
  number: number;
  title: string;
  /** One-line description of the step (matches the methodology). */
  summary: string;
}

/** Plain prose body — used for short narrative steps (e.g. step 1, 7). */
export interface StepProse extends StudyStepBase {
  kind: 'prose';
  body: string;
}

/** Q&A grid — each item is its own expandable sub-card. Used for step 2 (5 W's). */
export interface StepQA extends StudyStepBase {
  kind: 'qa';
  items: { tag?: string; q: string; a: string; [key: string]: unknown }[];
}

/** Key-word inventory for step 3. */
export interface StepKeywords extends StudyStepBase {
  kind: 'keywords';
  inventory: {
    word: string;
    /** Greek root in English transliteration (e.g. "adelphoi"). */
    greek?: string;
    count: number;
    verses: string;
    /** Short, accurate gloss of the word's meaning in context. */
    definition?: string;
    [key: string]: unknown;
  }[];
}

/** Multiple lists, each its own table. Used for step 4. */
export interface StepLists extends StudyStepBase {
  kind: 'lists';
  lists: {
    title: string;
    columns: [string, string]; // [verse-label, truth-label]
    rows: { ref: string; truth: string; [key: string]: unknown }[];
    [key: string]: unknown;
  }[];
}

/** Contrasts / similes — each row a separate item. Step 5.
 *  `type` is widened to string to tolerate model-emitted variants like
 *  "Irony" or "Comparison/Contrast" that don't fit the canonical three.
 *  Renderers should treat unknown values as "Contrast" or just display
 *  the raw label. */
export interface StepContrasts extends StudyStepBase {
  kind: 'contrasts';
  items: {
    verses: string;
    type: 'Contrast' | 'Comparison' | 'Metaphor' | string;
    pairing: string;
    [key: string]: unknown;
  }[];
}

/** Tagged bullet list — verse range + text. Used for steps 1, 6, 7, 8. */
export interface StepBullets extends StudyStepBase {
  kind: 'bullets';
  /** Optional lead paragraph rendered above the items. */
  intro?: string;
  items: { tag?: string; text: string; [key: string]: unknown }[];
  /** Optional trailing prose (e.g. step 6's commentary on temptation gestation). */
  note?: string;
}

/** Themed segments — chapter theme + visual-summary blocks. Step 9. */
export interface StepSegments extends StudyStepBase {
  kind: 'segments';
  themeHeadline: string;
  segments: { title: string; body: string; [key: string]: unknown }[];
}

export type StudyStep =
  | StepProse
  | StepQA
  | StepKeywords
  | StepLists
  | StepContrasts
  | StepBullets
  | StepSegments;

export interface StudyMovement {
  number: number;
  title: string;
  range: string;
  /** Short scripture excerpt that sets the movement (1 sentence). */
  excerpt?: string;
  /** Markdown body — Greek illumination + commentary, paraphrased / original. */
  body: string;
  [key: string]: unknown;
}

export interface StudyApplication {
  range: string;
  question: string;
  [key: string]: unknown;
}

/** Full inductive study for a single chapter. */
export interface InductiveStudy {
  bookId: number;
  bookName: string;
  chapter: number;
  /** Display title, e.g. "James 1". */
  title: string;
  /** "The Precept Method, Verse by Verse" — kept in data, not shown as banner. */
  subtitle: string;
  /** One-line theme using the text's own words. */
  themeOneLine: string;
  steps: StudyStep[];
  interpretation: {
    intro?: string;
    movements: StudyMovement[];
  };
  application: {
    intro?: string;
    questions: StudyApplication[];
  };
}
