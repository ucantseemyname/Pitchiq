import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/organisms/AppHeader';
import { Button } from '../components/atoms/Button';
import { Field } from '../components/atoms/Field';
import { Input } from '../components/atoms/Input';
import { Select } from '../components/atoms/Select';
import { Textarea } from '../components/atoms/Textarea';
import { ProgressBar } from '../components/molecules/ProgressBar';
import { FormStepper, type StepMeta } from '../components/molecules/FormStepper';
import { UpgradeDialog } from '../components/molecules/UpgradeDialog';
import { LayoutThumb } from '../components/molecules/LayoutThumb';
import { ArrowRight, Sparkle, Lock, Crown } from '../components/atoms/icons';
import { useProposal } from '../context/ProposalContext';
import { usePlan } from '../context/PlanContext';
import { BUDGETS, SERVICE_TYPES, TIMELINES, TONES, LAYOUTS } from '../data/formOptions';
import type { Budget, Layout, ProposalForm, ServiceType, Timeline, Tone } from '../lib/types';

const STEP_LABELS = ['Your Info', 'Client Info', 'Project', 'Tone'];

const STEP_META: StepMeta[] = [
  { title: 'Your information', description: 'You and your service' },
  { title: 'About your client', description: 'Who the proposal is for' },
  { title: 'Project details', description: 'Scope, budget, and timeline' },
  { title: 'Tone & layout', description: 'Voice and document style' },
];

/** Fields that must be filled before leaving each step. */
const STEP_REQUIRED: (keyof ProposalForm)[][] = [
  ['senderName', 'serviceType'],
  ['clientName', 'projectDescription'],
  ['budget', 'timeline', 'deliverables'],
  ['tone']];

export default function GeneratePage() {
  const navigate = useNavigate();
  const { form, updateForm } = useProposal();
  const { isPro, setPro } = usePlan();
  const [step, setStep] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [upgradeFor, setUpgradeFor] = useState<string | null>(null);

  /** Select a tone/layout, or prompt to upgrade if it's Pro-only and locked. */
  const selectTone = (value: Tone, pro: boolean) => {
    if (pro && !isPro) return setUpgradeFor(`The ${value} tone`);
    updateForm({ tone: value });
  };
  const selectLayout = (value: Layout, name: string, pro: boolean) => {
    if (pro && !isPro) return setUpgradeFor(`The ${name} layout`);
    updateForm({ layout: value });
  };

  const missing = useMemo(() => {
    const required = STEP_REQUIRED[step - 1];
    return required.filter((k) => String(form[k]).trim().length === 0);
  }, [form, step]);

  const canAdvance = missing.length === 0;

  const goNext = () => {
    if (!canAdvance) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (step < 4) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final step → generate.
      navigate('/proposal');
    }
  };

  const goBack = () => {
    setShowErrors(false);
    if (step > 1) setStep((s) => s - 1);
  };

  const fieldInvalid = (key: keyof ProposalForm) =>
    showErrors && missing.includes(key);

  return (
    <div className="min-h-screen bg-canvas dark:bg-dark-canvas">
      <AppHeader />

      <main className="container-px py-8 sm:py-12">
        <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-[360px_1fr] lg:gap-8">
          {/* Left: dark editorial panel with vertical stepper */}
          <aside className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white lg:sticky lg:top-24">
            <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 animate-blob rounded-full bg-primary/25 blur-3xl" />
            <div className="relative">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                Build your proposal
              </div>
              <h1 className="mt-3 font-serif text-3xl font-medium leading-[1.1] sm:text-4xl">
                A few quick <span className="italic text-primary">questions.</span>
              </h1>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
                Takes about two minutes. No account needed, your answers stay in
                your browser.
              </p>
              <div className="mt-9">
                <FormStepper steps={STEP_META} current={step} />
              </div>
            </div>
          </aside>

          {/* Right: form card */}
          <div>
            {/* Compact progress on mobile (stepper is hidden) */}
            <div className="mb-6 lg:hidden">
              <ProgressBar current={step} total={4} labels={STEP_LABELS} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                goNext();
              }}
              className="rounded-3xl border border-hairline bg-white p-7 shadow-card sm:p-9 dark:border-dark-hairline dark:bg-dark-surface"
            >
              <div className="mb-7">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Step {step} of 4
                </span>
                <h2 className="mt-1.5 font-serif text-2xl font-medium text-ink sm:text-3xl dark:text-white">
                  {STEP_META[step - 1].title}
                </h2>
              </div>

              <div key={step} className="flex animate-fade-up flex-col gap-6">
              {step === 1 && (
                <>
                  <Field label="Name / agency name" htmlFor="senderName" required>
                    <Input
                      id="senderName"
                      placeholder="e.g. Studio Northstar"
                      value={form.senderName}
                      autoFocus
                      aria-invalid={fieldInvalid('senderName')}
                      onChange={(e) => updateForm({ senderName: e.target.value })}
                    />
                  </Field>
                  <Field label="Service type" htmlFor="serviceType" required>
                    <Select
                      id="serviceType"
                      options={SERVICE_TYPES}
                      placeholder="Select a service"
                      value={form.serviceType}
                      aria-invalid={fieldInvalid('serviceType')}
                      onChange={(e) =>
                        updateForm({ serviceType: e.target.value as ServiceType })
                      }
                    />
                  </Field>
                  <Field
                    label="Location"
                    htmlFor="location"
                    hint="Optional, helps personalize the proposal."
                  >
                    <Input
                      id="location"
                      placeholder="e.g. Austin, TX"
                      value={form.location}
                      onChange={(e) => updateForm({ location: e.target.value })}
                    />
                  </Field>
                </>
              )}

              {step === 2 && (
                <>
                  <Field label="Client name / company" htmlFor="clientName" required>
                    <Input
                      id="clientName"
                      placeholder="e.g. Northwind Co."
                      value={form.clientName}
                      autoFocus
                      aria-invalid={fieldInvalid('clientName')}
                      onChange={(e) => updateForm({ clientName: e.target.value })}
                    />
                  </Field>
                  <Field
                    label="Industry"
                    htmlFor="industry"
                    hint="Optional, e.g. SaaS, hospitality, e-commerce."
                  >
                    <Input
                      id="industry"
                      placeholder="e.g. Direct-to-consumer skincare"
                      value={form.industry}
                      onChange={(e) => updateForm({ industry: e.target.value })}
                    />
                  </Field>
                  <Field
                    label="Project description"
                    htmlFor="projectDescription"
                    required
                  >
                    <Textarea
                      id="projectDescription"
                      rows={5}
                      placeholder="Describe the project, goals, and what the client is hoping to achieve…"
                      value={form.projectDescription}
                      aria-invalid={fieldInvalid('projectDescription')}
                      onChange={(e) =>
                        updateForm({ projectDescription: e.target.value })
                      }
                    />
                  </Field>
                </>
              )}

              {step === 3 && (
                <>
                  <Field label="Budget" htmlFor="budget" required>
                    <Select
                      id="budget"
                      options={BUDGETS}
                      placeholder="Select a budget range"
                      value={form.budget}
                      aria-invalid={fieldInvalid('budget')}
                      onChange={(e) =>
                        updateForm({ budget: e.target.value as Budget })
                      }
                    />
                  </Field>
                  <Field label="Timeline" htmlFor="timeline" required>
                    <Select
                      id="timeline"
                      options={TIMELINES}
                      placeholder="Select a timeline"
                      value={form.timeline}
                      aria-invalid={fieldInvalid('timeline')}
                      onChange={(e) =>
                        updateForm({ timeline: e.target.value as Timeline })
                      }
                    />
                  </Field>
                  <Field
                    label="Key deliverables"
                    htmlFor="deliverables"
                    required
                    hint="List the main things you'll deliver, one per line works well."
                  >
                    <Textarea
                      id="deliverables"
                      rows={5}
                      placeholder={'e.g.\n- 90-second brand film\n- 3 social cutdowns\n- Color grading & sound mix'}
                      value={form.deliverables}
                      aria-invalid={fieldInvalid('deliverables')}
                      onChange={(e) => updateForm({ deliverables: e.target.value })}
                    />
                  </Field>
                </>
              )}

              {step === 4 && (
                <div className="flex flex-col gap-8">
                  {/* Tone */}
                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink dark:text-white">
                      Tone <span className="text-primary">*</span>
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {TONES.map((tone) => {
                        const selected = form.tone === tone.value;
                        const locked = Boolean(tone.pro) && !isPro;
                        return (
                          <button
                            key={tone.value}
                            type="button"
                            onClick={() => selectTone(tone.value, Boolean(tone.pro))}
                            aria-pressed={selected}
                            className={`relative flex flex-col items-start gap-1 rounded-2xl border p-5 text-left transition-all ${
                              selected
                                ? 'border-primary bg-primary/5 shadow-glow'
                                : 'border-hairline bg-white hover:border-ink/30 dark:border-dark-hairline dark:bg-dark-surface dark:hover:border-white/30'
                            } ${locked ? 'opacity-70' : ''}`}
                          >
                            {tone.pro && (
                              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                                {locked ? <Lock width={10} height={10} /> : <Crown width={10} height={10} />}
                                Pro
                              </span>
                            )}
                            <span className="text-base font-bold text-ink dark:text-white">
                              {tone.value}
                            </span>
                            <span className="text-sm text-muted">{tone.description}</span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Layout */}
                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink dark:text-white">
                      Proposal layout
                      <span className="text-xs font-normal text-muted">
                        (how your document looks)
                      </span>
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {LAYOUTS.map((layout) => {
                        const selected = form.layout === layout.value;
                        const locked = Boolean(layout.pro) && !isPro;
                        return (
                          <button
                            key={layout.value}
                            type="button"
                            onClick={() =>
                              selectLayout(layout.value, layout.name, Boolean(layout.pro))
                            }
                            aria-pressed={selected}
                            className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                              selected
                                ? 'border-primary bg-primary/5 shadow-glow'
                                : 'border-hairline bg-white hover:border-ink/30 dark:border-dark-hairline dark:bg-dark-surface dark:hover:border-white/30'
                            } ${locked ? 'opacity-70' : ''}`}
                          >
                            <LayoutThumb layout={layout.value} />
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-1.5 text-[15px] font-bold text-ink dark:text-white">
                                {layout.name}
                                {layout.pro && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                                    {locked ? <Lock width={9} height={9} /> : <Crown width={9} height={9} />}
                                    Pro
                                  </span>
                                )}
                              </span>
                              <span className="mt-0.5 block text-xs text-muted">
                                {layout.description}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
              )}
            </div>

              {showErrors && !canAdvance && (
                <p role="alert" className="mt-5 text-sm font-medium text-primary">
                  Please fill in the required fields to continue.
                </p>
              )}

              {/* Nav buttons */}
              <div className="mt-9 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={goBack}
                  disabled={step === 1}
                  className={step === 1 ? 'invisible' : ''}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  size="lg"
                  iconRight={
                    step === 4 ? (
                      <Sparkle width={18} height={18} />
                    ) : (
                      <ArrowRight width={18} height={18} />
                    )
                  }
                >
                  {step === 4 ? 'Generate Proposal' : 'Next'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <UpgradeDialog
        open={upgradeFor !== null}
        feature={upgradeFor ?? undefined}
        onClose={() => setUpgradeFor(null)}
        onUnlock={() => setPro(true)}
      />
    </div>
  );
}
