'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { InlineScript } from '@/components/commons/InlineScript';
import { SidebarToggleIcon } from '@/components/shell/captured-icons';
import { cn } from '@/lib/cn';

/*
 * Sidebar primitives matching the captured shadcn-style markup (factory 103547):
 * the same elements, data attributes and classes, with one collapsible mode
 * ("icon"), one variant ("sidebar") and one side ("left"), which is all the shell uses.
 */

export type SidebarState = 'expanded' | 'collapsed';

const SIDEBAR_ID = 'app-sidebar';
const TRIGGER_ID = 'app-sidebar-trigger';
const COOKIE = 'sidebar_state';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const COOKIE_PATTERN = /(?:^|;\s*)sidebar_state=(expanded|collapsed)(?:;|$)/;
/** Every captured page server-renders the sidebar collapsed to its icon rail. */
const DEFAULT_STATE: SidebarState = 'collapsed';

function persistedState(): SidebarState {
  if (typeof document === 'undefined') return DEFAULT_STATE;
  return (document.cookie.match(COOKIE_PATTERN)?.[1] as SidebarState | undefined) ?? DEFAULT_STATE;
}

/*
 * Pages render statically with the default state. This applies a persisted choice to
 * the server markup before first paint, so there is no flash; the client's initial
 * state reads the same cookie, so hydration finds matching attributes.
 */
const PREPAINT_SCRIPT =
  `(function(){try{var m=document.cookie.match(${COOKIE_PATTERN});if(!m||m[1]!=='expanded')return;` +
  `var s=document.getElementById(${JSON.stringify(SIDEBAR_ID)});if(s){s.setAttribute('data-state','expanded');s.setAttribute('data-collapsible','');}` +
  `var t=document.getElementById(${JSON.stringify(TRIGGER_ID)});if(t)t.setAttribute('aria-expanded','true');}catch(e){}})();`;

interface SidebarContextValue {
  state: SidebarState;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const value = useContext(SidebarContext);
  if (!value) throw new Error('useSidebar must be used within SidebarProvider');
  return value;
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SidebarState>(persistedState);

  const toggle = useCallback(() => {
    const next: SidebarState = state === 'expanded' ? 'collapsed' : 'expanded';
    document.cookie = `${COOKIE}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
    setState(next);
  }, [state]);

  useEffect(() => {
    // Cmd/Ctrl+B, as in the recovered provider. Narrow viewports use the bottom nav.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'b' || !(event.metaKey || event.ctrlKey)) return;
      if (window.matchMedia('(max-width: 767px)').matches) return;
      event.preventDefault();
      toggle();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggle]);

  const value = useMemo(() => ({ state, toggle }), [state, toggle]);

  return (
    <SidebarContext.Provider value={value}>
      <div
        style={{ '--sidebar-width': '13rem', '--sidebar-width-icon': '3.5rem' } as CSSProperties}
        className="group/sidebar-wrapper flex min-h-svh w-full"
        data-app-shell=""
        // The first-visit terms dialog marks the shell inert before hydration.
        suppressHydrationWarning
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({ children }: { children: ReactNode }) {
  const { state } = useSidebar();
  return (
    <>
      <div
        id={SIDEBAR_ID}
        className="group peer hidden text-text-primary md:block"
        data-state={state}
        data-collapsible={state === 'collapsed' ? 'icon' : ''}
        data-variant="sidebar"
        data-side="left"
      >
        <div className="relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180 group-data-[collapsible=icon]:w-[--sidebar-width-icon]" />
        <div
          className="z-40 hidden w-[--sidebar-width] transform-gpu transition-[left,right,width] duration-200 ease-linear md:flex left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l"
          style={{ position: 'fixed', top: 0, bottom: 0 }}
        >
          <div
            data-sidebar="sidebar"
            className="relative flex h-full w-full flex-col bg-bg-primary group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-border-secondary group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
      <InlineScript html={PREPAINT_SCRIPT} />
    </>
  );
}

export function SidebarHeader({ children }: { children: ReactNode }) {
  return (
    <div data-sidebar="header" className="flex h-12 shrink-0 flex-row items-center justify-between gap-0 p-0">
      {children}
    </div>
  );
}

export function SidebarContent({ children }: { children: ReactNode }) {
  return (
    <div
      data-sidebar="content"
      className="flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-x-hidden group-data-[collapsible=icon]:overflow-y-auto group-data-[collapsible=icon]:[scrollbar-width:none] group-data-[collapsible=icon]:[&::-webkit-scrollbar]:hidden custom-scrollbar dark gap-0 px-3 pb-3"
    >
      {children}
    </div>
  );
}

export function SidebarFooter({ className, children }: { className: string; children?: ReactNode }) {
  return (
    <div data-sidebar="footer" className={cn('flex flex-col gap-2 p-2', className)}>
      {children}
    </div>
  );
}

export function SidebarMenu({ children }: { children: ReactNode }) {
  return (
    <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-0.5">
      {children}
    </ul>
  );
}

export function SidebarMenuItem({ children }: { children: ReactNode }) {
  return (
    <li data-sidebar="menu-item" className="group/menu-item relative">
      {children}
    </li>
  );
}

const MENU_BUTTON_BASE =
  'peer/menu-button flex w-full items-center overflow-hidden p-2 text-left outline-none transition-[width,height,padding] focus-visible:ring-2 focus-visible:ring-text-accent active:bg-bg-tertiary active:text-text-primary disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50';
const MENU_BUTTON_ICON_RAIL =
  'group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center [&>svg]:size-[18px] [&>svg]:shrink-0';

/** Primary and Discover navigation links. */
export const NAV_BUTTON_CLASS = `${MENU_BUTTON_BASE} data-[state=open]:hover:bg-bg-secondary data-[state=open]:hover:text-text-primary [&>span:last-child]:truncate group-data-[collapsible=icon]:[&>span:last-child]:hidden relative h-8 gap-2.5 rounded-md px-2.5 text-[13px] font-medium text-text-secondary hover:bg-bg-secondary hover:text-text-primary data-[active=true]:bg-bg-tertiary data-[active=true]:font-medium data-[active=true]:text-text-primary ${MENU_BUTTON_ICON_RAIL}`;

/** Footer entries (Support, Terminal). */
export const FOOTER_BUTTON_CLASS = `${MENU_BUTTON_BASE} data-[active=true]:font-medium data-[state=open]:hover:bg-bg-secondary data-[state=open]:hover:text-text-primary [&>span:last-child]:truncate group-data-[collapsible=icon]:[&>span:last-child]:hidden relative h-8 gap-2.5 rounded-md px-2.5 text-[13px] font-medium text-text-tertiary hover:bg-bg-secondary hover:text-text-primary data-[active=true]:bg-bg-tertiary data-[active=true]:text-text-primary ${MENU_BUTTON_ICON_RAIL}`;

export function SidebarTrigger() {
  const { state, toggle } = useSidebar();
  return (
    <button
      id={TRIGGER_ID}
      type="button"
      data-sidebar="trigger"
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar"
      aria-controls={SIDEBAR_ID}
      aria-expanded={state === 'expanded'}
      onClick={toggle}
      className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border-secondary bg-bg-primary text-text-quaternary transition-colors hover:border-border-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent [&>svg]:size-3.5 mr-3 md:absolute md:right-0 md:top-3 md:z-50 md:mr-0 md:translate-x-1/2"
    >
      <SidebarToggleIcon />
    </button>
  );
}

export function SidebarRail() {
  const { toggle } = useSidebar();
  return (
    <button
      type="button"
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      title="Toggle Sidebar"
      onClick={toggle}
      className="hover:after:bg-border-tertiary absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex [[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize [[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize group-data-[collapsible=offcanvas]:hover:bg-bg-primary group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full [[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=right][data-collapsible=offcanvas]_&]:-left-2"
    />
  );
}
