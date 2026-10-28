'use client';

import Link from 'next/link';
import { CREATE_MENU, MOBILE_MORE_MENU } from '@/config/navigation';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { MobileCreateIcon, MobileExploreIcon, MobileGoIcon, MobileHomeIcon, MobileMenuIcon } from './captured-icons';

const ITEM_CLASS = 'flex flex-col items-center justify-center p-2 text-white';
// The captured triggers set outline-none; keep a visible keyboard focus ring.
const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-text-accent';

/**
 * The fixed bottom navigation shown below the `md` breakpoint. It comes last in DOM
 * order (the capture places it before the header) so assistive technology reaches
 * the page header first; being fixed, its position on screen is unchanged.
 */
export function MobileNav() {
  return (
    <div className="md:hidden">
      <nav
        aria-label="Mobile"
        className="left-0 right-0 z-50 mt-16 flex items-center justify-around border-t border-t-[rgba(248,250,252,0.1)] bg-bg-secondary pt-2"
        style={{ position: 'fixed', bottom: 0, paddingBottom: 'calc(8px + env(safe-area-inset-bottom))' }}
      >
        <div
          aria-hidden="true"
          data-testid="mobile-nav-glass-bleed"
          className="pointer-events-none absolute inset-x-0 top-full bg-bg-secondary"
          style={{ height: 128 }}
        />
        <Link href="/" aria-label="Home" className={`${ITEM_CLASS} ${FOCUS_RING}`}>
          <MobileHomeIcon />
        </Link>
        <Link href="/explore" aria-label="Explore" className={`${ITEM_CLASS} ${FOCUS_RING}`}>
          <MobileExploreIcon />
        </Link>
        <DropdownMenu
          label="Create"
          items={CREATE_MENU}
          placement="top-start"
          renderTrigger={(props) => (
            <button
              {...props}
              aria-label="Create"
              data-testid="create-button-mobile-nav"
              className={`flex flex-col items-center justify-center p-2 outline-none text-white ${FOCUS_RING}`}
            >
              <MobileCreateIcon />
            </button>
          )}
        />
        <Link href="/go" aria-label="GO" className={`${ITEM_CLASS} ${FOCUS_RING}`}>
          <MobileGoIcon />
        </Link>
        <DropdownMenu
          label="More"
          items={MOBILE_MORE_MENU}
          placement="top-end"
          renderTrigger={(props) => (
            <button
              {...props}
              aria-label="More"
              className={`flex flex-col items-center justify-center p-2 text-white outline-none ${FOCUS_RING}`}
            >
              <MobileMenuIcon />
            </button>
          )}
        />
      </nav>
    </div>
  );
}
