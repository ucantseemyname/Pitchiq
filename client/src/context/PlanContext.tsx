import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface PlanContextValue {
  /** Whether the user has an active paid (Pro) plan. */
  isPro: boolean;
  setPro: (value: boolean) => void;
  togglePro: () => void;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

const STORAGE_KEY = 'pitchiq-pro';

export function PlanProvider({ children }: { children: ReactNode }) {
  const [isPro, setProState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, isPro ? '1' : '0');
    } catch {
      /* storage unavailable, non-fatal */
    }
  }, [isPro]);

  const setPro = useCallback((value: boolean) => setProState(value), []);
  const togglePro = useCallback(() => setProState((p) => !p), []);

  const value = useMemo(
    () => ({ isPro, setPro, togglePro }),
    [isPro, setPro, togglePro],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error('usePlan must be used within a PlanProvider');
  return ctx;
}
