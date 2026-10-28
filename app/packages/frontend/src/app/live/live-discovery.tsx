"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ArchivedStream } from "./live-data";
import { filterArchivedStreams } from "./live-filter";

type SectionId = "most-viewers" | "other-sections";
type SortId = "viewers" | "title";

const sections: ReadonlyArray<{ id: SectionId; label: string }> = [
  { id: "most-viewers", label: "Most viewers" },
  { id: "other-sections", label: "Other sections" },
];

function shortAddress(value: string): string {
  return `${value.slice(0, 5)}…${value.slice(-5)}`;
}

function StreamPlaceholder({ stream }: { stream: ArchivedStream }) {
  return (
    <span className="live-card-art" aria-hidden="true">
      <span>{stream.symbol.slice(0, 3)}</span>
      <small>Archived preview withheld</small>
    </span>
  );
}

function PlaybackPanel({
  selected,
  invalidSelection,
  onClose,
}: {
  selected?: ArchivedStream;
  invalidSelection: boolean;
  onClose: () => void;
}) {
  if (!selected && !invalidSelection) {
    return (
      <aside className="playback-panel" aria-labelledby="playback-heading">
        <p className="playback-kicker">Playback state</p>
        <h2 id="playback-heading">No archived stream selected</h2>
        <p>
          Select a captured card to inspect its read-only metadata. No player or
          production media session starts here.
        </p>
      </aside>
    );
  }

  if (invalidSelection) {
    return (
      <aside
        className="playback-panel playback-panel--warning"
        aria-labelledby="playback-heading"
        data-testid="invalid-stream-selection"
      >
        <div className="playback-heading-row">
          <div>
            <p className="playback-kicker">Invalid metadata</p>
            <h2 id="playback-heading">Selection unavailable</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close stream detail"
          >
            Close
          </button>
        </div>
        <p>
          The URL does not identify a record in the authenticated local
          snapshot. Nothing was fetched from a production service.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="playback-panel playback-panel--selected"
      aria-labelledby="playback-heading"
      data-testid="playback-unavailable"
    >
      <div className="playback-heading-row">
        <div>
          <p className="playback-kicker">Playback unavailable</p>
          <h2 id="playback-heading">{selected?.title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close stream detail"
        >
          Close
        </button>
      </div>
      <div
        className="playback-stage"
        aria-label="Archived playback unavailable"
      >
        <span aria-hidden="true">▶</span>
        <strong>No media session was started</strong>
        <small>
          Captured playlist metadata is intentionally not exposed or requested.
        </small>
      </div>
      <dl className="playback-facts">
        <div>
          <dt>Symbol</dt>
          <dd>{selected?.symbol}</dd>
        </div>
        <div>
          <dt>Viewers at capture</dt>
          <dd>{selected?.viewerCountAtCapture.toLocaleString("en-US")}</dd>
        </div>
        <div>
          <dt>Creator address</dt>
          <dd title={selected?.creatorAddress}>
            {selected ? shortAddress(selected.creatorAddress) : ""}
          </dd>
        </div>
      </dl>
      <p className="playback-boundary">
        This record was marked live in the archived response. That does not mean
        the broadcast is live now.
      </p>
    </aside>
  );
}

export default function LiveDiscovery({
  streams,
}: {
  streams: ArchivedStream[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const section: SectionId =
    searchParams.get("section") === "other-sections"
      ? "other-sections"
      : "most-viewers";
  const sort: SortId =
    searchParams.get("sort") === "title" ? "title" : "viewers";
  const query = searchParams.get("q") ?? "";
  const selectedId = searchParams.get("stream");
  const [draftQuery, setDraftQuery] = useState(query);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const selected = streams.find((stream) => stream.id === selectedId);
  const invalidSelection = selectedId !== null && selected === undefined;
  const results = useMemo(
    () => filterArchivedStreams(streams, query, sort),
    [query, sort, streams],
  );

  useEffect(() => setDraftQuery(query), [query]);

  const navigate = useCallback(
    (changes: Record<string, string | null>, replace = false) => {
      const parameters = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(changes)) {
        if (value === null || value === "") parameters.delete(key);
        else parameters.set(key, value);
      }
      const target = parameters.size ? `/live?${parameters}` : "/live";
      if (replace) router.replace(target, { scroll: false });
      else router.push(target, { scroll: false });
    },
    [router, searchParams],
  );

  const closeSelection = useCallback(() => {
    const previous = selectedId;
    navigate({ stream: null });
    if (previous) {
      requestAnimationFrame(() => cardRefs.current.get(previous)?.focus());
    }
  }, [navigate, selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSelection();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [closeSelection, selectedId]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate({ q: draftQuery.trim() || null, stream: null });
  }

  function selectSection(next: SectionId) {
    navigate({
      section: next === "most-viewers" ? null : next,
      stream: null,
    });
  }

  function handleSectionKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const current = sections.findIndex(({ id }) => id === section);
    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = current + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = current - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = sections.length - 1;
    else return;
    event.preventDefault();
    const target = sections[(next + sections.length) % sections.length];
    selectSection(target.id);
    requestAnimationFrame(() =>
      document.getElementById(`live-section-${target.id}`)?.focus(),
    );
  }

  return (
    <div className="live-workspace">
      <nav className="live-sections" aria-label="Live discovery sections">
        <div role="tablist" aria-label="Captured Live sections">
          {sections.map((item) => (
            <button
              id={`live-section-${item.id}`}
              key={item.id}
              type="button"
              role="tab"
              aria-controls="live-section-panel"
              aria-selected={section === item.id}
              tabIndex={section === item.id ? 0 : -1}
              onClick={() => selectSection(item.id)}
              onKeyDown={handleSectionKeyDown}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="live-layout">
        <section
          id="live-section-panel"
          className="live-discovery-panel"
          role="tabpanel"
          aria-labelledby={`live-section-${section}`}
        >
          {section === "other-sections" ? (
            <div
              className="live-empty"
              data-testid="other-sections-unavailable"
            >
              <p className="playback-kicker">Evidence boundary</p>
              <h2>Other section listings are unavailable</h2>
              <p>
                The captured client names additional discovery sections, but
                this reconstruction does not have a separately authenticated
                dataset for their cards.
              </p>
              <button
                type="button"
                onClick={() => selectSection("most-viewers")}
              >
                Return to captured cards
              </button>
            </div>
          ) : (
            <>
              <form
                className="live-controls"
                role="search"
                aria-label="Search the archived Live snapshot"
                onSubmit={submitSearch}
              >
                <label htmlFor="live-search">Search captured streams</label>
                <div className="live-control-row">
                  <input
                    id="live-search"
                    type="search"
                    value={draftQuery}
                    placeholder="Title, symbol, creator or mint"
                    autoComplete="off"
                    onChange={(event) => setDraftQuery(event.target.value)}
                  />
                  {draftQuery ? (
                    <button
                      type="button"
                      className="live-secondary-button"
                      onClick={() => {
                        setDraftQuery("");
                        navigate({ q: null, stream: null });
                      }}
                    >
                      Clear
                    </button>
                  ) : null}
                  <button type="submit" className="live-primary-button">
                    Search
                  </button>
                </div>
                <label htmlFor="live-sort">Sort captured cards</label>
                <select
                  id="live-sort"
                  value={sort}
                  onChange={(event) =>
                    navigate({
                      sort: event.target.value === "title" ? "title" : null,
                      stream: null,
                    })
                  }
                >
                  <option value="viewers">Viewers at capture</option>
                  <option value="title">Title</option>
                </select>
              </form>

              <div className="live-results-heading" aria-live="polite">
                <div>
                  <p className="playback-kicker">Historical snapshot</p>
                  <h2>
                    {results.length} captured{" "}
                    {results.length === 1 ? "record" : "records"}
                  </h2>
                </div>
                {query ? <p>Query: {query}</p> : null}
              </div>

              {results.length > 0 ? (
                <div className="stream-grid" aria-label="Archived stream cards">
                  {results.map((stream) => (
                    <article
                      className="live-card"
                      key={stream.id}
                      data-testid="archived-stream-card"
                    >
                      <StreamPlaceholder stream={stream} />
                      <div className="live-card-body">
                        <span className="archive-status">
                          Captured snapshot — not current
                        </span>
                        <h3>{stream.title}</h3>
                        <p className="live-symbol">{stream.symbol}</p>
                        <dl>
                          <div>
                            <dt>Viewers at capture</dt>
                            <dd>
                              {stream.viewerCountAtCapture.toLocaleString(
                                "en-US",
                              )}
                            </dd>
                          </div>
                          <div>
                            <dt>Creator</dt>
                            <dd title={stream.creatorAddress}>
                              {shortAddress(stream.creatorAddress)}
                            </dd>
                          </div>
                        </dl>
                        <button
                          type="button"
                          ref={(node) => {
                            if (node) cardRefs.current.set(stream.id, node);
                            else cardRefs.current.delete(stream.id);
                          }}
                          aria-label={`Inspect archived stream ${stream.title} ${stream.symbol}`}
                          aria-pressed={selected?.id === stream.id}
                          onClick={() => navigate({ stream: stream.id })}
                        >
                          Inspect archived metadata
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="live-empty" data-testid="live-empty-results">
                  <h2>No matching captured record</h2>
                  <p>
                    Nothing in this five-record archive matches the local query.
                    This says nothing about current broadcasts.
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        <PlaybackPanel
          selected={selected}
          invalidSelection={invalidSelection}
          onClose={closeSelection}
        />
      </div>
    </div>
  );
}
