import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { EMPTY_FORM, type ProposalForm } from '../lib/types';

interface ProposalContextValue {
  form: ProposalForm;
  /** Merge a partial update into the form. */
  updateForm: (patch: Partial<ProposalForm>) => void;
  /** Replace the entire form (e.g. reset). */
  setForm: (form: ProposalForm) => void;
  resetForm: () => void;
  /** True once the user has filled at least the required fields. */
  isComplete: boolean;
}

const ProposalContext = createContext<ProposalContextValue | undefined>(undefined);

const REQUIRED: (keyof ProposalForm)[] = [
  'senderName',
  'serviceType',
  'clientName',
  'projectDescription',
  'budget',
  'timeline',
  'deliverables',
  'tone',
];

export function ProposalProvider({ children }: { children: ReactNode }) {
  const [form, setFormState] = useState<ProposalForm>(EMPTY_FORM);

  const updateForm = useCallback((patch: Partial<ProposalForm>) => {
    setFormState((prev) => ({ ...prev, ...patch }));
  }, []);

  const setForm = useCallback((next: ProposalForm) => setFormState(next), []);

  const resetForm = useCallback(() => setFormState(EMPTY_FORM), []);

  const isComplete = useMemo(
    () => REQUIRED.every((k) => String(form[k]).trim().length > 0),
    [form],
  );

  const value = useMemo(
    () => ({ form, updateForm, setForm, resetForm, isComplete }),
    [form, updateForm, setForm, resetForm, isComplete],
  );

  return <ProposalContext.Provider value={value}>{children}</ProposalContext.Provider>;
}

export function useProposal(): ProposalContextValue {
  const ctx = useContext(ProposalContext);
  if (!ctx) throw new Error('useProposal must be used within a ProposalProvider');
  return ctx;
}
