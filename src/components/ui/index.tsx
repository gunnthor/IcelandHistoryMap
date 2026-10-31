import {
  ButtonHTMLAttributes,
  ReactNode,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Icon, IconName } from '../icons/Icon';
import { useEscape } from '../../state/escape';
import { Confidence } from '../../types';
import { CONFIDENCE_CONFIG } from '../../utils/eventConfig';
import './ui.css';

// ── Button ──
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  icon?: IconName;
  iconEnd?: IconName;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', icon, iconEnd, className, children, type = 'button', ...rest },
  ref,
) {
  const cls = `ui-btn ui-btn--${variant}${size === 'sm' ? ' ui-btn--sm' : ''}${className ? ` ${className}` : ''}`;
  return (
    <button ref={ref} type={type} className={cls} {...rest}>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
      {children}
      {iconEnd && <Icon name={iconEnd} size={size === 'sm' ? 16 : 18} />}
    </button>
  );
});

// ── Icon button: the label is mandatory (it's the accessible name) ──
interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  icon: IconName;
  label: string;
  float?: boolean;
  iconSize?: number;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, float, iconSize = 20, className, type = 'button', title, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`ui-icon-btn${float ? ' ui-icon-btn--float' : ''}${className ? ` ${className}` : ''}`}
      aria-label={label}
      title={title ?? label}
      {...rest}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  );
});

// ── Segmented control (a radio group) ──
interface SegmentedProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: ReactNode; title?: string; lang?: string }[];
  onChange: (v: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({ label, value, options, onChange, className }: SegmentedProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  // Radio-group keyboard model: one tab stop, arrows move and select.
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };
  return (
    <div className={`ui-seg${className ? ` ${className}` : ''}`} role="radiogroup" aria-label={label}>
      {options.map((o, i) => (
        <button
          key={o.value}
          ref={(el) => (refs.current[i] = el)}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          tabIndex={o.value === value ? 0 : -1}
          className="ui-seg__btn"
          title={o.title}
          lang={o.lang}
          onClick={() => onChange(o.value)}
          onKeyDown={(e) => onKeyDown(e, i)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ── Confidence pips ──
export function Pips({ confidence, className }: { confidence: Confidence; className?: string }) {
  const n = CONFIDENCE_CONFIG[confidence].pips;
  return (
    <span className={`ui-pips${className ? ` ${className}` : ''}`} aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <i key={i} className={i <= n ? 'on' : undefined} />
      ))}
    </span>
  );
}

// ── Popover ──
// Anchored, portaled panel. Closes on outside pointer-down, Escape (via the
// escape stack) and when the anchor scrolls away; returns focus to the
// anchor when closed by keyboard.
type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end';

interface PopoverProps {
  open: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement>;
  placement?: Placement;
  /** Accessible name for the panel. */
  label: string;
  role?: 'dialog' | 'menu' | 'listbox';
  className?: string;
  /** Move focus into the panel on open (default true). Search results keep
   *  focus in the input instead. */
  autoFocus?: boolean;
  width?: number;
  children: ReactNode;
}

export function Popover({
  open,
  onClose,
  anchorRef,
  placement = 'bottom-start',
  label,
  role = 'dialog',
  className,
  autoFocus = true,
  width,
  children,
}: PopoverProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top?: number; left?: number; right?: number; bottom?: number }>({});

  const place = useCallback(() => {
    const a = anchorRef.current?.getBoundingClientRect();
    if (!a) return;
    const gap = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = width ?? panelRef.current?.offsetWidth ?? 280;
    const clampLeft = (x: number) => Math.max(8, Math.min(x, vw - w - 8));
    switch (placement) {
      case 'bottom-start':
        setPos({ top: a.bottom + gap, left: clampLeft(a.left) });
        break;
      case 'bottom-end':
        setPos({ top: a.bottom + gap, left: clampLeft(a.right - w) });
        break;
      case 'top-start':
        setPos({ bottom: vh - a.top + gap, left: clampLeft(a.left) });
        break;
      case 'top-end':
        setPos({ bottom: vh - a.top + gap, left: clampLeft(a.right - w) });
        break;
      case 'left-start':
        setPos({ top: a.top, right: vw - a.left + gap });
        break;
      case 'left-end':
        setPos({ bottom: vh - a.bottom, right: vw - a.left + gap });
        break;
    }
  }, [anchorRef, placement, width]);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || anchorRef.current?.contains(t)) return;
      onClose();
    };
    const onResize = () => place();
    document.addEventListener('pointerdown', onDown, true);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('resize', onResize);
    };
  }, [open, onClose, anchorRef, place]);

  useEffect(() => {
    if (!open || !autoFocus) return;
    const first = panelRef.current?.querySelector<HTMLElement>(
      'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])',
    );
    first?.focus();
  }, [open, autoFocus]);

  useEscape(() => {
    onClose();
    anchorRef.current?.focus();
  }, open);

  if (!open) return null;
  return createPortal(
    <div
      ref={panelRef}
      className={`ui-popover ui-glass${className ? ` ${className}` : ''}`}
      role={role}
      aria-label={label}
      style={{ ...pos, width }}
    >
      {children}
    </div>,
    document.body,
  );
}

// ── Modal dialog ──
// Native <dialog>.showModal(): focus trap, inert background and top-layer
// stacking for free. Escape goes through the app's escape stack so it peels
// exactly one layer; focus returns to whatever opened it.
interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  tone?: 'dark' | 'vellum';
  className?: string;
  children: ReactNode;
}

export function Dialog({ open, onClose, labelledBy, tone = 'dark', className, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      opener.current = document.activeElement as HTMLElement | null;
      d.showModal();
    } else if (!open && d.open) {
      d.close();
      opener.current?.focus?.();
    }
  }, [open]);

  useEscape(onClose, open);

  return (
    <dialog
      ref={ref}
      className={`ui-dialog ${tone === 'vellum' ? 'on-vellum' : 'ui-dialog--dark'}${className ? ` ${className}` : ''}`}
      aria-labelledby={labelledBy}
      // Native Escape handling is replaced by the escape stack above.
      onCancel={(e) => e.preventDefault()}
      onClick={(e) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (e.target === ref.current) onClose();
      }}
    >
      {open && children}
    </dialog>
  );
}
