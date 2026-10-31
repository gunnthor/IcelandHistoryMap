import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n';
import { useExplorer } from '../../state/explorer';
import { IconButton } from '../ui';
import { Icon } from '../icons/Icon';

const SHOW_MS = 5000;

/** "We couldn't find that event" — after a deep link to an unknown id. Holds
 *  still while hovered or focused, so it can always be read and dismissed. */
export function MissingToast() {
  const { t } = useI18n();
  const x = useExplorer();
  const id = x.state.missingLinkId;
  const [held, setHeld] = useState(false);
  const announced = useRef(false);

  useEffect(() => {
    if (!id || announced.current) return;
    announced.current = true;
    x.announce(t.missingEvent);
  }, [id, x, t.missingEvent]);

  useEffect(() => {
    if (!id || held) return;
    const timer = window.setTimeout(x.dismissMissing, SHOW_MS);
    return () => window.clearTimeout(timer);
  }, [id, held, x.dismissMissing]);

  if (!id) return null;
  return (
    <div
      className="chrome-toast ui-glass"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <Icon name="info" size={18} className="chrome-toast__icon" />
      <p className="chrome-toast__text">{t.missingEvent}</p>
      <IconButton icon="x" label={t.close} onClick={x.dismissMissing} iconSize={18} />
    </div>
  );
}
