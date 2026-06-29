import { useState, useEffect, useCallback } from 'react';
import { scriptsApi } from '../api/scripts';
import { MOCK_SCRIPTS } from '../mocks/scripts';
import { getLocalScripts, saveLocalScript, deleteLocalScript } from '../store/scripts';
import type { Script, ScriptDetail, Slide } from '../types';

export function useScripts() {
  const [scripts, setScripts] = useState<Script[]>(() => {
    const local = getLocalScripts();
    return [...local, ...MOCK_SCRIPTS];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScripts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await scriptsApi.getAll();
      setScripts(data);
    } catch {
      // API 미연동 시 localStorage + mock 데이터 유지
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchScripts(); }, [fetchScripts]);

  const createScript = async (data: { title: string; content: string; slides?: Slide[] }) => {
    try {
      const newScript = await scriptsApi.create({ title: data.title, content: data.content });
      setScripts(prev => [newScript, ...prev]);
      return newScript as Script;
    } catch {
      const id = Date.now();
      const date = new Date().toLocaleString('ko-KR');
      const detail: ScriptDetail = {
        id,
        title: data.title || '새로운 대본',
        content: data.content || '내용 없음',
        date,
        slides: data.slides ?? [{ order: 1, title: '슬라이드 1', text: data.content || '' }],
      };
      saveLocalScript(detail);
      setScripts(prev => [detail, ...prev]);
      return detail as Script;
    }
  };

  const deleteScript = async (id: number) => {
    try {
      await scriptsApi.delete(id);
    } catch {
      deleteLocalScript(id);
    }
    setScripts(prev => prev.filter(s => s.id !== id));
  };

  return { scripts, loading, error, refetch: fetchScripts, createScript, deleteScript };
}
