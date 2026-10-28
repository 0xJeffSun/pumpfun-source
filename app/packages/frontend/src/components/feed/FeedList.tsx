import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { FeedItem, type FeedItemData } from "./FeedItem";

type FeedListProps = {
  items: FeedItemData[];
  loading?: boolean;
};

function FeedSkeleton() {
  return (
    <div className="flex gap-3 border-b border-border-secondary px-1 py-4">
      <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <div className="flex gap-4 pt-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

/** Vertical list of feed items with loading and empty states. */
export function FeedList({ items, loading = false }: FeedListProps) {
  if (loading) {
    return (
      <div aria-busy="true">
        {Array.from({ length: 5 }, (_, i) => (
          <FeedSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        description="This feed is empty in the local reconstruction."
      />
    );
  }

  return (
    <div>
      {items.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </div>
  );
}
