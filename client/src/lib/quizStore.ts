// Tiny in-memory store for quiz state across page navigations.
// Intentionally not using localStorage/sessionStorage (blocked in sandbox iframe).

import type { ArchetypeKey } from "./quiz";

type QuizState = {
  archetype: ArchetypeKey | null;
  answers: Record<string, number> | null;
};

let state: QuizState = { archetype: null, answers: null };
const listeners = new Set<() => void>();

export function setQuizResult(archetype: ArchetypeKey, answers: Record<string, number>) {
  state = { archetype, answers };
  listeners.forEach((l) => l());
}

export function getQuizResult(): QuizState {
  return state;
}

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
