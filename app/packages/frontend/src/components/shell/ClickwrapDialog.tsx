'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { pumpButtonClass } from '@/components/ui/pump-button';
import { CLICKWRAP_COOKIE, CLICKWRAP_MAX_AGE, isClickwrapOutOfScope } from './clickwrap';

function shell(): Element | null {
  return document.querySelector('[data-app-shell]');
}

/**
 * The captured first-visit terms dialog. It is always in the markup; CSS hides it
 * once `html` carries an accepted or out-of-scope attribute. Pre-paint scripts set
 * those on full loads; this component keeps them current on client navigation.
 */
export function ClickwrapDialog() {
  const pathname = usePathname();
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute('data-clickwrap-oos', isClickwrapOutOfScope(pathname));
    const visible = !root.hasAttribute('data-clickwrap-accepted') && !root.hasAttribute('data-clickwrap-oos');
    shell()?.toggleAttribute('inert', visible);
    if (visible) continueRef.current?.focus();
  }, [pathname]);

  function accept() {
    document.cookie = `${CLICKWRAP_COOKIE}=true; path=/; max-age=${CLICKWRAP_MAX_AGE}; samesite=lax`;
    document.documentElement.setAttribute('data-clickwrap-accepted', '');
    shell()?.removeAttribute('inert');
    document.getElementById('main-content')?.focus();
  }

  return (
    <div
      aria-describedby="clickwrap-description"
      aria-labelledby="clickwrap-title"
      aria-modal="true"
      className="fixed inset-0 z-[999] flex items-center justify-center p-6 max-[640px]:items-end max-[640px]:p-0"
      data-clickwrap-overlay=""
      role="dialog"
    >
      {/* Captured as an inert click target: dismissing does not accept the terms. */}
      <button aria-label="Dismiss" className="absolute inset-0 cursor-default bg-black/75" tabIndex={-1} type="button" />
      <div
        className="relative flex w-full max-w-[640px] flex-col bg-bg-primary p-6 shadow-[0_0_0_1px_var(--color-border-secondary)] rounded-[16px] max-[640px]:rounded-b-none max-[640px]:rounded-t-[24px]"
        tabIndex={-1}
      >
        {/* The cover image (/dialog-clickwrap-cover.webp) is not in the capture; keep its 592x333 box. */}
        <div aria-hidden="true" className="aspect-[592/333] w-full rounded-xl border border-solid border-border-secondary bg-bg-secondary max-[640px]:rounded-[20px]" />
        <div className="_1AbQgq_spacer" style={{ height: 24 }} />
        <p className="font-bold text-2xl text-text-primary text-center" id="clickwrap-title">
          Welcome to Pump<span className="text-text-accent">.</span>fun!
        </p>
        <div className="_1AbQgq_spacer" style={{ height: 16 }} />
        <p className="text-text-tertiary text-center" id="clickwrap-description">
          Pump lets anyone create coins, giving everyone equal access to buy and sell from the start. Prices can move quickly, so trade carefully.
        </p>
        <div className="_1AbQgq_spacer" style={{ height: 24 }} />
        <button ref={continueRef} aria-pressed="false" className={pumpButtonClass({ size: 48, width: 'full' })} type="button" onClick={accept}>
          <span>Continue</span>
        </button>
        <div className="_1AbQgq_spacer" style={{ height: 16 }} />
        <p className="text-xs text-text-tertiary mx-auto max-w-[480px] text-center">
          By clicking this button, you agree to the{' '}
          <Link className="underline" href="/docs/terms-and-conditions">
            Terms and Conditions
          </Link>
          ,{' '}
          <Link className="underline" href="/docs/privacy-policy">
            Privacy Policy
          </Link>
          , and certify that you are over 18 years old.
        </p>
      </div>
    </div>
  );
}
