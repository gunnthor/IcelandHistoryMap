import { ConflictEvent } from '../../types';
import { ICELAND_OUTLINE } from '../../data/icelandOutline';

// A thumbnail of a story route: Iceland's outline with the stops placed by
// their real coordinates and joined by the brass line the route will draw on
// the map. Longitude is scaled by cos(65°) so the island keeps its true
// proportions at this latitude (an unscaled box stretches it 2.4× wide).

const K = Math.cos((65 * Math.PI) / 180);
const WEST = -24.7;
const EAST = -13.3;
const NORTH = 66.65;
const SOUTH = 63.25;
const UNIT = 100; // viewBox units per projected degree
const VB_W = Math.round((EAST - WEST) * K * UNIT);
const VB_H = Math.round((NORTH - SOUTH) * UNIT);

const px = ([lat, lng]: [number, number]): [number, number] => [
  +((lng - WEST) * K * UNIT).toFixed(1),
  +((NORTH - lat) * UNIT).toFixed(1),
];

const OUTLINE_D = `M${ICELAND_OUTLINE.map(([lng, lat]) => px([lat, lng]).join(' ')).join('L')}Z`;

/** Aspect ratio of the sketch (width / height), for layout. */
export const SKETCH_RATIO = VB_W / VB_H;

export function RouteSketch({ stops, width, className }: { stops: ConflictEvent[]; width: number; className?: string }) {
  // Dot radii are given in screen pixels and converted to viewBox units, so
  // a stop reads the same size on a small card and on the featured one.
  const u = VB_W / width;
  const pts = stops.map((e) => px(e.coordinates));
  return (
    <svg
      className={`route-sketch${className ? ` ${className}` : ''}`}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width={width}
      height={Math.round(width / SKETCH_RATIO)}
      aria-hidden="true"
      focusable="false"
    >
      <path className="route-sketch__land" d={OUTLINE_D} vectorEffect="non-scaling-stroke" />
      {pts.length > 1 && (
        <>
          <polyline className="route-sketch__casing" points={pts.map((p) => p.join(',')).join(' ')} vectorEffect="non-scaling-stroke" />
          <polyline className="route-sketch__line" points={pts.map((p) => p.join(',')).join(' ')} vectorEffect="non-scaling-stroke" />
        </>
      )}
      {pts.map(([x, y], i) =>
        i === 0 ? null : <circle key={i} className="route-sketch__stop" cx={x} cy={y} r={2.25 * u} vectorEffect="non-scaling-stroke" />,
      )}
      {pts[0] && <circle className="route-sketch__start" cx={pts[0][0]} cy={pts[0][1]} r={3.5 * u} vectorEffect="non-scaling-stroke" />}
    </svg>
  );
}
