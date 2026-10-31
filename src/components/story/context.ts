import { RefObject, createContext, useContext } from 'react';
import { ConflictEvent } from '../../types';
import { Route } from '../../state/explorer';
import { IconName } from '../icons/Icon';

/** A finished route, kept after the store has left it so the end card can
 *  recap it and offer "Start over". Stops are ids so a language switch on the
 *  end card re-resolves names. */
export interface FinishedRoute {
  route: Route;
  stopIds: string[];
  /** The stop that was open when the route finished. */
  lastId: string;
}

/** One of the two "step" controls (‹ ›): Earlier/Later outside a route,
 *  Previous/Next stop (or Finish) inside one. */
export interface StepControl {
  label: string;
  /** Full accessible name ("Earlier: Apavatnsför, 1238"). */
  aria: string;
  icon: IconName;
  disabled: boolean;
  run: () => void;
}

export interface StoryController {
  event: ConflictEvent;
  finished: FinishedRoute | null;
  /** id of the h2 that names the shell (aria-labelledby). */
  titleId: string;
  headingRef: RefObject<HTMLHeadingElement>;
  scrollRef: RefObject<HTMLDivElement>;
  /** The selection came from the visitor's own hand (not autoplay, a route
   *  step or page load) — shells expand themselves for it. */
  userOpened: boolean;
  eli12: boolean;
  setEli12: (on: boolean) => void;
  /** Close the story; also pauses autoplay / leaves a route, since those
   *  would otherwise reopen it or be left running with no controls. */
  close: () => void;
  share: () => void;
  copied: boolean;
  /** Leave the route and show the end card. */
  finish: () => void;
  /** Clear the end card (before starting something new from it). */
  clearFinished: () => void;
  /** "Start over" for a person route (the store's followPerson resumes at
   *  the open stop, so we reopen stop 1 first). */
  restartPerson: (key: string, firstId: string) => void;
  prev: StepControl;
  next: StepControl;
  /** Scroll the trust section into view and focus its heading. */
  jumpToTrust: () => void;
}

export const StoryContext = createContext<StoryController | null>(null);

export function useStory(): StoryController {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error('useStory must be used inside <Story>');
  return ctx;
}

/** Present only inside the bottom sheet: lets the peek view's
 *  "Read the full story" (and jumps deeper into the article) open it fully
 *  first — below full, the sheet's content doesn't scroll. */
export const SheetContext = createContext<{ expand: (focusHeading?: boolean) => void } | null>(null);
