// Fixed UI chrome for the inductive-study renderer (Precept method).
//
// These are the labels/headings that wrap the study content but are NOT part
// of any individual study's data — they're identical across all 1,189
// chapters. Rather than translate them per-study (redundant) or hardcode them
// in English in the web/mobile StudyPanel, they live here once per language
// and both clients read them via getStudyLabels(language).
//
// To add a language: add an entry to BY_LANG keyed by its base ISO code.
// getStudyLabels matches by base ISO (so "ro-RO" and "ro" both resolve to RO)
// and falls back to English.

export interface StudyLabels {
  /** Title prefix, rendered as `${inductiveStudyOf} ${study.title}`. */
  inductiveStudyOf: string;
  /** Observation section heading. */
  observationSection: string;
  /** Collapsible header above the observation steps. */
  aboutObservationTitle: string;
  /** Body paragraph inside the observation "about" collapsible. */
  aboutObservationBody: string;
  /** Interpretation section heading. */
  interpretationSection: string;
  /** Collapsible header above the interpretation movements. */
  aboutInterpretationTitle: string;
  /** Word before a movement number, rendered as `${movement} 1 — ...`. */
  movement: string;
  /** Application section heading. */
  applicationSection: string;
  /** Collapsible header above the application questions. */
  applyOneQuestion: string;
  /** Label above the verse-reference list in keyword steps. */
  versesLabel: string;
  /** Label above the chapter theme in the final (segments) step. */
  chapterThemeLabel: string;
  /** Bulk expand-all control. */
  expandAll: string;
  /** Bulk collapse-all control. */
  collapseAll: string;
}

const EN: StudyLabels = {
  inductiveStudyOf: 'Inductive Study of',
  observationSection: 'Observation — 9 Inductive Steps',
  aboutObservationTitle: 'About the nine observation steps',
  aboutObservationBody:
    'Observation asks what the text *says* — slowing down to mark the keywords, contrasts, repetitions, and structural cues the author left for you. Each of the nine steps below builds the evidence the interpretation that follows is built on. Don’t skip ahead; the meaning comes from what you observed.',
  interpretationSection: 'Interpretation',
  aboutInterpretationTitle: 'About the interpretation movements',
  movement: 'Movement',
  applicationSection: 'Application',
  applyOneQuestion: 'Apply, one question per movement',
  versesLabel: 'Verses',
  chapterThemeLabel: 'Chapter theme',
  expandAll: 'Expand All',
  collapseAll: 'Collapse All',
};

const RO: StudyLabels = {
  inductiveStudyOf: 'Studiu inductiv —',
  observationSection: 'Observație — 9 pași inductivi',
  aboutObservationTitle: 'Despre cei nouă pași de observație',
  aboutObservationBody:
    'Observația întreabă ce *spune* textul — încetinind pentru a marca cuvintele-cheie, contrastele, repetițiile și indiciile structurale pe care autorul ți le-a lăsat. Fiecare dintre cei nouă pași de mai jos construiește dovezile pe care se sprijină interpretarea care urmează. Nu sări înainte; sensul vine din ceea ce ai observat.',
  interpretationSection: 'Interpretare',
  aboutInterpretationTitle: 'Despre mișcările de interpretare',
  movement: 'Mișcarea',
  applicationSection: 'Aplicație',
  applyOneQuestion: 'Aplică — o întrebare pentru fiecare mișcare',
  versesLabel: 'Versete',
  chapterThemeLabel: 'Tema capitolului',
  expandAll: 'Extinde tot',
  collapseAll: 'Restrânge tot',
};

const ES: StudyLabels = {
  inductiveStudyOf: 'Estudio inductivo de',
  observationSection: 'Observación — 9 pasos inductivos',
  aboutObservationTitle: 'Sobre los nueve pasos de observación',
  aboutObservationBody:
    'La observación pregunta qué *dice* el texto — deteniéndose para marcar las palabras clave, los contrastes, las repeticiones y las señales estructurales que el autor dejó para ti. Cada uno de los nueve pasos siguientes construye la evidencia sobre la que se basa la interpretación que sigue. No te adelantes; el significado proviene de lo que observaste.',
  interpretationSection: 'Interpretación',
  aboutInterpretationTitle: 'Sobre los movimientos de interpretación',
  movement: 'Movimiento',
  applicationSection: 'Aplicación',
  applyOneQuestion: 'Aplica, una pregunta por movimiento',
  versesLabel: 'Versículos',
  chapterThemeLabel: 'Tema del capítulo',
  expandAll: 'Expandir todo',
  collapseAll: 'Contraer todo',
};

const BY_LANG: Record<string, StudyLabels> = { en: EN, ro: RO, es: ES };

/**
 * UI chrome labels for the given language. Matches by base ISO code
 * ("ro-RO" → "ro"), falling back to English for any unsupported language.
 */
export function getStudyLabels(language?: string): StudyLabels {
  if (!language) return EN;
  const base = language.toLowerCase().split('-')[0];
  return BY_LANG[base] ?? EN;
}
