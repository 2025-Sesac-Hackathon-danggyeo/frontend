import type { ScriptDetail } from '../types';
import { MOCK_SCRIPTS, MOCK_SCRIPT_DETAIL } from '../mocks/scripts';

const STORAGE_KEY = 'sfitz_scripts';

export function getLocalScripts(): ScriptDetail[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function getLocalScriptById(id: number): ScriptDetail | null {
  const found = getLocalScripts().find(s => s.id === id);
  if (found) return found;

  // mock 데이터 ID(1-7)는 MOCK_SCRIPT_DETAIL 내용을 기반으로 반환
  const mock = MOCK_SCRIPTS.find(s => s.id === id);
  if (mock) {
    return { ...MOCK_SCRIPT_DETAIL, id: mock.id, title: mock.title, date: mock.date };
  }
  return null;
}

export function saveLocalScript(script: ScriptDetail): void {
  const scripts = getLocalScripts();
  const idx = scripts.findIndex(s => s.id === script.id);
  if (idx >= 0) scripts[idx] = script;
  else scripts.unshift(script);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts));
}

export function deleteLocalScript(id: number): void {
  const scripts = getLocalScripts().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts));
}
