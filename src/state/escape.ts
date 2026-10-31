import { useEffect, useRef } from 'react';

// ── One Escape stack for the whole app ──
// Each open layer (popover, dialog, expanded sheet, search with text…)
// registers a handler while it is active; one capture-phase listener calls
// only the most recently registered handler, so a single Escape peels back a
// single layer. The explorer registers the base layer (pause autoplay → leave
// the route → close the story), which always sits at the bottom.

type Handler = () => void;
interface Entry {
  id: number;
  handler: { current: Handler };
  base: boolean;
}

const stack: Entry[] = [];
let nextId = 1;

function onKeyDown(e: KeyboardEvent) {
  if (e.key !== 'Escape' || e.defaultPrevented) return;
  // Bases go below every regular layer regardless of registration order.
  const top = [...stack].reverse().find((s) => !s.base) ?? [...stack].reverse().find((s) => s.base);
  if (!top) return;
  e.preventDefault();
  e.stopPropagation();
  top.handler.current();
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', onKeyDown, true);
}

/**
 * Register an Escape handler while `active` is true. The latest active
 * registration wins; `base` layers only run when no regular layer is open.
 */
export function useEscape(handler: Handler, active = true, base = false): void {
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    if (!active) return;
    const entry: Entry = { id: nextId++, handler: ref, base };
    stack.push(entry);
    return () => {
      const i = stack.indexOf(entry);
      if (i >= 0) stack.splice(i, 1);
    };
  }, [active, base]);
}
