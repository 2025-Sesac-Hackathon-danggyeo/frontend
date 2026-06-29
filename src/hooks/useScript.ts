import { useState, useEffect } from 'react';
import { scriptsApi } from '../api/scripts';
import { getLocalScriptById } from '../store/scripts';
import type { ScriptDetail } from '../types';

export function useScript(id: number | undefined) {
  const [script, setScript] = useState<ScriptDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    scriptsApi
      .getById(id)
      .then(setScript)
      .catch(() => {
        // API 미연동 시 localStorage 또는 mock 데이터에서 ID로 조회
        const local = getLocalScriptById(id);
        if (local) {
          setScript(local);
        } else {
          setError('대본을 찾을 수 없습니다.');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { script, loading, error };
}
