'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, type FormEvent } from 'react';
import { SearchMobileIcon } from '../captured-icons';
import { onOpenSearch } from './search-events';

/**
 * The shell's search entry point (the captured search box and ⌘K hint open it).
 * Live results need the market-discovery API, which is not implemented locally, so
 * submitting hands the query to Explore. A native <dialog> provides the modal focus
 * handling and Escape-to-close.
 */
export function SearchDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const open = () => {
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        open();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const stopListening = onOpenSearch(open);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      stopListening();
    };
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const query = String(new FormData(form).get('q') ?? '').trim();
    dialogRef.current?.close();
    form.reset();
    router.push(query ? `/explore?q=${encodeURIComponent(query)}` : '/explore');
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search for coins and users"
      className="mx-auto mt-[12vh] w-[min(560px,calc(100vw-32px))] overflow-hidden rounded-xl border border-border-tertiary bg-bg-secondary p-0 text-text-primary shadow-lg backdrop:bg-black/60"
    >
      <form onSubmit={onSubmit} role="search" className="flex items-center gap-2 px-3">
        <SearchMobileIcon className="size-4 shrink-0 text-text-quaternary" />
        <input
          name="q"
          type="search"
          autoFocus
          autoComplete="off"
          aria-label="Search for coins and users"
          placeholder="Search for coins and users..."
          className="h-12 w-full bg-transparent text-[14px] outline-none placeholder:text-text-quaternary"
        />
        <kbd className="h-5 shrink-0 rounded-sm bg-bg-quaternary px-1.5 text-xs leading-5 text-text-quaternary">Esc</kbd>
      </form>
      <p className="border-t border-border-secondary px-3 py-2 text-xs text-text-tertiary">
        Live results need the market-discovery API, which is not implemented locally. Press Enter to search on Explore.
      </p>
    </dialog>
  );
}
