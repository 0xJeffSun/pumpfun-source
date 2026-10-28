import Link from "next/link";

export type FeedItemData = {
  id: string;
  author: { address: string; name: string; avatar?: string };
  content: string;
  timestamp: string;
  likes: number;
  reposts: number;
  replies: number;
  isCallout?: boolean;
  media?: string[];
};

/** A single feed post with author, content, and engagement metrics. */
export function FeedItem({ item }: { item: FeedItemData }) {
  return (
    <article className="flex gap-3 border-b border-border-secondary px-1 py-4">
      <Link
        href={`/profile/${item.author.address}`}
        className="h-9 w-9 shrink-0 rounded-full bg-bg-tertiary"
        aria-label={`${item.author.name}'s profile`}
      >
        {item.author.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.author.avatar}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center rounded-full text-xs font-bold text-text-accent">
            {item.author.name.charAt(0).toUpperCase()}
          </span>
        )}
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Link
            href={`/profile/${item.author.address}`}
            className="truncate text-[13px] font-semibold text-text-primary hover:underline"
          >
            {item.author.name}
          </Link>
          <span className="shrink-0 text-[11px] text-text-muted">
            {item.timestamp}
          </span>
          {item.isCallout ? (
            <span className="shrink-0 rounded-md bg-bg-accent-inverse px-1.5 py-0.5 text-[10px] font-bold text-text-accent">
              Callout
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
          {item.content}
        </p>
        {item.media && item.media.length > 0 ? (
          <div className="mt-2 grid grid-cols-2 gap-1 overflow-hidden rounded-lg">
            {item.media.map((src, i) => (
              <div
                key={i}
                className="aspect-video bg-bg-tertiary"
                aria-label="Media attachment placeholder"
              />
            ))}
          </div>
        ) : null}
        <div className="mt-2 flex gap-5 text-[11px] text-text-muted">
          <span>{item.likes} likes</span>
          <span>{item.reposts} reposts</span>
          <span>{item.replies} replies</span>
        </div>
      </div>
    </article>
  );
}
