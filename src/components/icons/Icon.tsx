import { EventType } from '../../types';
import { UI_ICONS, TYPE_GLYPHS, IconName } from './paths';

export type { IconName } from './paths';
export { glyphSvg, iconSvg, FLAG_ICONS } from './paths';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  /** Give a label only when the icon carries meaning on its own; icons next
   *  to text stay decorative (aria-hidden). */
  label?: string;
}

// Static markup from paths.ts — never user data — so innerHTML is safe here.
export function Icon({ name, size = 20, className, label }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ? `icon ${className}` : 'icon'}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: UI_ICONS[name] }}
    />
  );
}

interface TypeGlyphProps {
  type: EventType;
  size?: number;
  className?: string;
}

/** The bare event-type glyph (no disc) — decorative; pair it with text. */
export function TypeGlyph({ type, size = 16, className }: TypeGlyphProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ? `glyph ${className}` : 'glyph'}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: TYPE_GLYPHS[type] }}
    />
  );
}

/**
 * The "type seal": pigment disc + bone glyph + confidence rim. The shared
 * mark of the whole product — the same seal is the map marker, the filter
 * swatch, the search-result icon and the story header.
 */
export function TypeSeal({
  type,
  confidence = 'high',
  size = 28,
  className,
}: {
  type: EventType;
  confidence?: 'high' | 'medium' | 'low';
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`seal seal--${type} seal--${confidence}${className ? ` ${className}` : ''}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <TypeGlyph type={type} size={Math.round(size * 0.56)} />
    </span>
  );
}
