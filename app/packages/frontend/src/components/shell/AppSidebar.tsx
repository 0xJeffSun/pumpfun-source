'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CREATE_MENU, DISCOVER_NAV, PRIMARY_NAV, SUPPORT_UNAVAILABLE, TERMINAL_URL, isNavActive, type NavLink } from '@/config/navigation';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { pumpButtonClass } from '@/components/ui/pump-button';
import {
  FOOTER_BUTTON_CLASS,
  NAV_BUTTON_CLASS,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { CreateIcon, ExternalLinkIcon, SupportIcon, TerminalIcon } from './captured-icons';
import { Logomark } from './Logomark';

/** The desktop sidebar of the captured app shell (factory 721426, AppSidebar). */
export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <Link className="flex h-full items-center overflow-hidden pl-[19px] pr-2 group-data-[collapsible=icon]:px-4" href="/">
          <Logomark />
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <nav aria-label="Primary" className="contents">
          <div className="flex flex-col mt-2">
            <SidebarMenu>
              {PRIMARY_NAV.map((link) => (
                <NavItem key={link.href} link={link} active={isNavActive(pathname, link.href)} />
              ))}
            </SidebarMenu>
          </div>
          <div aria-hidden="true" className="mx-auto my-2 hidden h-px w-6 bg-border-secondary group-data-[collapsible=icon]:block" />
          <div className="flex flex-col mt-4 group-data-[collapsible=icon]:mt-0">
            <div className="px-2.5 pb-1 text-[11px] font-normal leading-none text-text-quaternary group-data-[collapsible=icon]:hidden">Discover</div>
            <SidebarMenu>
              {DISCOVER_NAV.map((link) => (
                <NavItem key={link.href} link={link} active={isNavActive(pathname, link.href)} />
              ))}
            </SidebarMenu>
          </div>
        </nav>
        <div className="mt-3">
          <DropdownMenu
            label="Create"
            items={CREATE_MENU}
            placement="right-start"
            renderTrigger={(props) => (
              <button
                {...props}
                aria-pressed="false"
                data-testid="create-button-sidebar"
                className={`${pumpButtonClass({ size: 32, width: 'full' })} overflow-hidden whitespace-nowrap !text-[13px] !font-medium group-data-[state=collapsed]:mx-auto group-data-[state=collapsed]:!size-8 group-data-[state=collapsed]:!p-0 group-data-[state=collapsed]:[&>span]:hidden`}
              >
                <CreateIcon />
                <span>Create</span>
              </button>
            )}
          />
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-border-secondary px-3 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <button
              type="button"
              data-sidebar="menu-button"
              data-size="default"
              data-active="false"
              data-testid="help-support-button-sidebar"
              title={SUPPORT_UNAVAILABLE}
              className={FOOTER_BUTTON_CLASS}
            >
              <SupportIcon />
              <span className="flex-1 truncate group-data-[collapsible=icon]:hidden">Support</span>
            </button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <a
              href={TERMINAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-sidebar="menu-button"
              data-size="default"
              data-active="false"
              aria-label="Terminal (opens in a new tab)"
              className={FOOTER_BUTTON_CLASS}
            >
              <TerminalIcon />
              <span className="flex-1 truncate group-data-[collapsible=icon]:hidden">Terminal</span>
              <ExternalLinkIcon />
            </a>
          </SidebarMenuItem>
          {/* "Get the app" (mobile-app promotion) is an excluded surface; see app/AGENTS.md. */}
        </SidebarMenu>
      </SidebarFooter>
      {/* The captured second footer hosts a client-only widget; its padding is part of the layout. */}
      <SidebarFooter className="px-3 pb-2 pt-0" />
      <SidebarRail />
    </Sidebar>
  );
}

function NavItem({ link, active }: { link: NavLink; active: boolean }) {
  const Icon = (active && link.activeIcon) || link.icon;
  return (
    <SidebarMenuItem>
      <Link
        href={link.href}
        data-sidebar="menu-button"
        data-size="default"
        data-active={active}
        aria-current={active ? 'page' : undefined}
        // The visible label is display:none on the collapsed rail; keep an accessible name.
        aria-label={link.badge ? `${link.label} (${link.badge})` : link.label}
        className={NAV_BUTTON_CLASS}
      >
        <Icon />
        {link.badge && (
          <span aria-hidden="true" className="absolute right-1 top-1 hidden size-1.5 rounded-full bg-bg-accent group-data-[collapsible=icon]:block" />
        )}
        <span className="flex min-w-0 flex-1 items-center gap-1.5 group-data-[collapsible=icon]:hidden">
          <span className="truncate">{link.label}</span>
          {link.badge && (
            <span className="inline-flex h-[18px] shrink-0 items-center rounded-sm bg-bg-accent/[0.12] px-1.5 text-[11px] font-medium leading-none text-text-accent">
              {link.badge}
            </span>
          )}
        </span>
      </Link>
    </SidebarMenuItem>
  );
}
