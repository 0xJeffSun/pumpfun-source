import { createHash } from "node:crypto";

export const LIVE_CAPTURE_URL = "https://pump.fun/live";
export const LIVE_CAPTURE_PATH = "evidence/web/objects/c45d40b52df03727";
export const LIVE_CAPTURE_SHA256 =
  "aeff704c15d99482fe6e6347a92db0170dffeceb940a70e61dcc10002b006355";
export const LIVE_CAPTURE_BYTES = 785_309;

const archivedMints = [
  "7bS1mH6MXbw1GnEkKTU6w5YLTywPkQ1w3YVZXWFupump",
  "5so4kmqqUvgtJdedUueDz64p4nEhJeCmodKbQqeppump",
  "Fn5ikZ1VagQTt1B94zBeLP1Gixp2BCxtXVspUk9Vpump",
  "25eDKrPdeZWbSVhYjzcpdcuEtBT2RbgsqEyDnRoMpump",
  "DN19UoW5dbaN2PM7FPxz66zj7LVLjYFeKXKBFuq4pump",
] as const;

const allowedCardFields = new Set([
  "id",
  "mint",
  "coinCreatedTimestamp",
  "title",
  "creator",
  "marketCap",
  "thumbnail",
  "ipfsThumbnail",
  "thumbnailUpdatedAt",
  "avatarUri",
  "isLive",
  "playlistUrl",
  "viewerCount",
  "linkUrl",
  "symbol",
  "coin",
]);

type UnknownRecord = Record<string, unknown>;

export type ArchivedStream = {
  id: string;
  mint: string;
  title: string;
  symbol: string;
  creatorAddress: string;
  viewerCountAtCapture: number;
  wasLiveAtCapture: true;
};

export type LiveSnapshot = {
  capturedAt: string;
  sourceUrl: string;
  sha256: string;
  streams: ArchivedStream[];
};

export class LiveEvidenceError extends Error {
  override name = "LiveEvidenceError";
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function safeString(
  record: UnknownRecord,
  field: string,
  context: string,
): string {
  const value = record[field];
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length > 160 ||
    /[\u0000-\u001f\u007f]/u.test(value)
  ) {
    throw new LiveEvidenceError(`${context} ${field} is invalid`);
  }
  return value;
}

function decodeEscapedObject(source: string, start: number): unknown {
  let depth = 0;
  let inString = false;
  let end = -1;

  for (let index = start; index < source.length; index += 1) {
    if (source[index] === "\\" && source[index + 1] === '"') {
      inString = !inString;
      index += 1;
      continue;
    }
    if (inString) continue;
    if (source[index] === "{") depth += 1;
    if (source[index] === "}" && --depth === 0) {
      end = index + 1;
      break;
    }
  }

  if (end < 0 || end - start > 16_384) {
    throw new LiveEvidenceError("Archived stream object boundary is invalid");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(
      source.slice(start, end).replaceAll('\\"', '"').replaceAll("\\\\", "\\"),
    );
  } catch (error) {
    throw new LiveEvidenceError(
      `Archived stream object is invalid JSON: ${error instanceof Error ? error.message : "unknown parse failure"}`,
    );
  }
  return unescapeFlightStrings(parsed);
}

// React Flight stores a string that starts with "$" as "$$"; any other
// "$"-prefixed string is an unresolved Flight reference and is rejected.
function unescapeFlightStrings(value: unknown): unknown {
  if (typeof value === "string") {
    if (value.startsWith("$$")) return value.slice(1);
    if (value.startsWith("$")) {
      throw new LiveEvidenceError("Archived stream contains an unresolved Flight reference");
    }
    return value;
  }
  if (Array.isArray(value)) return value.map(unescapeFlightStrings);
  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, unescapeFlightStrings(item)]),
    );
  }
  return value;
}

export function validateArchivedStream(
  input: unknown,
  expectedMint?: string,
): ArchivedStream {
  if (!isRecord(input)) {
    throw new LiveEvidenceError("Archived stream must be an object");
  }
  const unexpected = Object.keys(input).filter(
    (field) => !allowedCardFields.has(field),
  );
  if (unexpected.length > 0) {
    throw new LiveEvidenceError(
      `Archived stream contains unexpected fields: ${unexpected.join(", ")}`,
    );
  }

  const mint = safeString(input, "mint", "Archived stream");
  const id = safeString(input, "id", "Archived stream");
  if (id !== mint || (expectedMint !== undefined && mint !== expectedMint)) {
    throw new LiveEvidenceError("Archived stream identity does not match");
  }
  if (input.isLive !== true) {
    throw new LiveEvidenceError(
      "Archived stream live-at-capture flag is invalid",
    );
  }
  if (
    typeof input.viewerCount !== "number" ||
    !Number.isSafeInteger(input.viewerCount) ||
    input.viewerCount < 0 ||
    input.viewerCount > 10_000_000
  ) {
    throw new LiveEvidenceError("Archived stream viewer count is invalid");
  }
  if (
    !isRecord(input.creator) ||
    Object.keys(input.creator).join() !== "address"
  ) {
    throw new LiveEvidenceError("Archived stream creator metadata is invalid");
  }
  if (!isRecord(input.coin)) {
    throw new LiveEvidenceError("Archived stream coin metadata is invalid");
  }
  if (input.coin.mint !== mint) {
    throw new LiveEvidenceError("Archived stream coin identity does not match");
  }

  return {
    id,
    mint,
    title: safeString(input, "title", "Archived stream"),
    symbol: safeString(input, "symbol", "Archived stream"),
    creatorAddress: safeString(
      input.creator,
      "address",
      "Archived stream creator",
    ),
    viewerCountAtCapture: input.viewerCount,
    wasLiveAtCapture: true,
  };
}

export function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export function parseLiveCapture(
  bytes: Uint8Array,
  expectedSha256 = LIVE_CAPTURE_SHA256,
): ArchivedStream[] {
  if (bytes.byteLength > 1_000_000) {
    throw new LiveEvidenceError("Captured Live page exceeds the size limit");
  }
  const actualSha256 = sha256(bytes);
  if (actualSha256 !== expectedSha256) {
    throw new LiveEvidenceError(
      `Captured Live page SHA-256 mismatch: expected ${expectedSha256}, received ${actualSha256}`,
    );
  }

  let source: string;
  try {
    source = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new LiveEvidenceError("Captured Live page is not valid UTF-8");
  }

  const streams = archivedMints.map((mint) => {
    const marker = `{\\"id\\":\\"${mint}\\",\\"mint\\":\\"${mint}\\"`;
    const start = source.indexOf(marker);
    if (start < 0) {
      throw new LiveEvidenceError(
        `Captured Live page is missing the archived record for ${mint}`,
      );
    }
    return validateArchivedStream(decodeEscapedObject(source, start), mint);
  });

  return streams.sort(
    (left, right) =>
      right.viewerCountAtCapture - left.viewerCountAtCapture ||
      left.mint.localeCompare(right.mint, "en-US"),
  );
}

export function verifyLiveEvidence(
  bytes: Uint8Array,
  manifest: unknown,
): LiveSnapshot {
  if (!isRecord(manifest) || !Array.isArray(manifest.records)) {
    throw new LiveEvidenceError("Capture manifest records are missing");
  }
  const matches = manifest.records.filter(
    (record): record is UnknownRecord =>
      isRecord(record) && record.url === LIVE_CAPTURE_URL,
  );
  if (matches.length !== 1) {
    throw new LiveEvidenceError("Capture manifest Live record is not unique");
  }
  const record = matches[0];
  if (
    record.final_url !== LIVE_CAPTURE_URL ||
    record.status !== 200 ||
    record.path !== LIVE_CAPTURE_PATH ||
    record.bytes !== LIVE_CAPTURE_BYTES ||
    record.sha256 !== LIVE_CAPTURE_SHA256
  ) {
    throw new LiveEvidenceError(
      "Capture manifest Live provenance does not match",
    );
  }
  if (bytes.byteLength !== LIVE_CAPTURE_BYTES) {
    throw new LiveEvidenceError(
      "Captured Live page byte length does not match",
    );
  }
  if (typeof manifest.captured_at !== "string") {
    throw new LiveEvidenceError("Capture manifest timestamp is missing");
  }
  const capturedAt = new Date(manifest.captured_at);
  if (!Number.isFinite(capturedAt.getTime())) {
    throw new LiveEvidenceError("Capture manifest timestamp is invalid");
  }

  return {
    capturedAt: manifest.captured_at,
    sourceUrl: LIVE_CAPTURE_URL,
    sha256: LIVE_CAPTURE_SHA256,
    streams: parseLiveCapture(bytes),
  };
}
