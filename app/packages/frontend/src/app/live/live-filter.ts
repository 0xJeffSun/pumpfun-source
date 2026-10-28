import type { ArchivedStream } from "./live-data";

function comparable(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("en-US");
}

export function filterArchivedStreams(
  streams: readonly ArchivedStream[],
  query: string,
  sort: "viewers" | "title",
): ArchivedStream[] {
  const normalized = comparable(query.trim());
  const filtered = normalized
    ? streams.filter((stream) =>
        [stream.title, stream.symbol, stream.creatorAddress, stream.mint].some(
          (value) => comparable(value).includes(normalized),
        ),
      )
    : [...streams];

  return filtered.sort((left, right) => {
    if (sort === "title") {
      return (
        comparable(left.title).localeCompare(
          comparable(right.title),
          "en-US",
        ) || left.mint.localeCompare(right.mint, "en-US")
      );
    }
    return (
      right.viewerCountAtCapture - left.viewerCountAtCapture ||
      left.mint.localeCompare(right.mint, "en-US")
    );
  });
}
