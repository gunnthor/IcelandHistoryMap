import { ConflictEvent } from '../../types';
import { ICELAND_OUTLINE } from '../../data/icelandOutline';

// "Where in Iceland": a thumbnail of the island with the event's spot marked.
// A story opened from a shared link lands the map deep in a valley with no
// names on it; this keeps the place in context at a glance. Longitude is
// scaled by cos(65°) so the island keeps its proportions.

const K = Math.cos((65 * Math.PI) / 180);
const WEST = -24.7;
const EAST = -13.3;
const NORTH = 66.65;
const SOUTH = 63.25;
const UNIT = 100;
const VB_W = Math.round((EAST - WEST) * K * UNIT);
const VB_H = Math.round((NORTH - SOUTH) * UNIT);

const px = (lat: number, lng: number): [number, number] => [(lng - WEST) * K * UNIT, (NORTH - lat) * UNIT];
const OUTLINE_D = `M${ICELAND_OUTLINE.map(([lng, lat]) => px(lat, lng).map((n) => n.toFixed(1)).join(' ')).join('L')}Z`;

export function Locator({ event, width = 64 }: { event: ConflictEvent; width?: number }) {
  const [x, y] = px(event.coordinates[0], event.coordinates[1]);
  const u = VB_W / width; // viewBox units per screen pixel
  return (
    <svg
      className="locator"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width={width}
      height={Math.round((width * VB_H) / VB_W)}
      aria-hidden="true"
      focusable="false"
    >
      <path className="locator__land" d={OUTLINE_D} strokeWidth={u} />
      <circle className="locator__halo" cx={x} cy={y} r={5.5 * u} />
      <circle className="locator__dot" cx={x} cy={y} r={3 * u} strokeWidth={1.25 * u} />
    </svg>
  );
}
