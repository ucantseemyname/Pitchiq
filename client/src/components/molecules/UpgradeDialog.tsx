import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { Crown, Check, X } from '../atoms/icons';

interface UpgradeDialogProps {
  open: boolean;
  onClose: () => void;
  /** Called when the user chooses the demo unlock. */
  onUnlock: () => void;
  /** Short name of the locked feature, e.g. "the Storytelling tone". */
  feature?: string;
}

const PERKS = [
  'All 8 writing tones, including Simple English',
  '4 proposal layouts',
  'Unlimited proposals',
  'Priority generation',
];

/**
 * Shown when a free user selects a Pro-only tone or layout. Explains the paid
 * feature and offers a link to pricing plus a clearly-labelled demo unlock
 * (since this MVP has no real payment flow).
 */
export function UpgradeDialog({ open, onClose, onUnlock, feature }: UpgradeDialogProps) {
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Upgrade to Pro"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-[22px] border border-hairline bg-white shadow-float dark:border-dark-hairline dark:bg-dark-surface">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 animate-blob rounded-full bg-primary/20 blur-3xl" />
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-ink dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X width={18} height={18} />
        </button>

        <div className="relative p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Crown width={14} height={14} /> Pro feature
          </span>

          <h2 className="mt-5 font-serif text-2xl font-medium text-ink dark:text-white">
            {feature ? `${feature} is a Pro feature.` : 'Unlock more with Pro.'}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            Upgrade to unlock premium tones and proposal layouts, from just
            <span className="font-semibold text-ink dark:text-white"> $9/month</span>.
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white">
                  <Check width={12} height={12} />
                </span>
                <span className="text-[15px] text-ink dark:text-white/90">{perk}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <Button fullWidth onClick={() => navigate('/#pricing')}>
              See plans
            </Button>
            <button
              onClick={() => {
                onUnlock();
                onClose();
              }}
              className="text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-ink hover:underline dark:hover:text-white"
            >
              Try Pro free (demo unlock)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
