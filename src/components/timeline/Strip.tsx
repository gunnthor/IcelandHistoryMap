import { Axis, at } from './model';

// ── A compact, decorative rendering of the axis ──
// Era bands, one tick per event and the selection pin, with no labels:
// the scrubber and the sheet's year slider draw on it. Interaction and
// semantics live on the element that hosts it (a slider), so all of this is
// aria-hidden.
export function Strip({ axis, cursor = -1 }: { axis: Axis; cursor?: number }) {
  const { list, n } = axis;
  return (
    <div className="tl-strip" aria-hidden="true">
      {axis.bands.map((b) => (
        <span
          key={b.id}
          className="tl-strip__band"
          data-active={b.active || undefined}
          style={{ left: at(b.first, n), width: at(b.last + 1 - b.first, n) }}
        />
      ))}
      {list.map((e, i) => (
        <span
          key={e.id}
          className={`tl-strip__slot${axis.inRange(i) ? '' : ' is-out'}${i === cursor ? ' is-cursor' : ''}`}
          style={{ left: at(i + 0.5, n) }}
        >
          <span className={`tl-tick tl-tick--${e.type} tl-tick--${e.confidence}`} />
        </span>
      ))}
      {axis.selected >= 0 && <span className="tl-strip__pin" style={{ left: at(axis.selected + 0.5, n) }} />}
    </div>
  );
}
