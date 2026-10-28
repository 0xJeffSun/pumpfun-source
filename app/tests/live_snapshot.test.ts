import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  LIVE_CAPTURE_BYTES,
  LIVE_CAPTURE_PATH,
  LIVE_CAPTURE_SHA256,
  LIVE_CAPTURE_URL,
  parseLiveCapture,
  sha256,
  validateArchivedStream,
  verifyLiveEvidence,
} from "../packages/frontend/src/app/live/live-data.ts";
import { filterArchivedStreams } from "../packages/frontend/src/app/live/live-filter.ts";

const capture = new URL(
  "../evidence/web/objects/c45d40b52df03727",
  import.meta.url,
);
const manifest = new URL("../evidence/web/manifest.json", import.meta.url);

async function realEvidence() {
  const [bytes, manifestValue] = await Promise.all([
    readFile(capture),
    readFile(manifest, "utf8").then(JSON.parse),
  ]);
  return { bytes, manifestValue };
}

test("authenticates the exact captured Live HTML and extracts five bounded records", async () => {
  const { bytes, manifestValue } = await realEvidence();
  assert.equal(bytes.byteLength, LIVE_CAPTURE_BYTES);
  assert.equal(sha256(bytes), LIVE_CAPTURE_SHA256);

  const snapshot = verifyLiveEvidence(bytes, manifestValue);
  assert.equal(snapshot.sourceUrl, LIVE_CAPTURE_URL);
  assert.equal(snapshot.capturedAt, "2026-10-28T10:48:45.546100+00:00");
  assert.equal(snapshot.streams.length, 5);
  assert.deepEqual(
    snapshot.streams.map((stream) => stream.viewerCountAtCapture),
    [42, 34, 26, 24, 20],
  );
  assert.equal(snapshot.streams[0]?.title, "M");
  assert.equal(snapshot.streams[0]?.symbol, "$M");
  assert.equal(
    snapshot.streams[0]?.creatorAddress,
    "Aq7jiTAePZ1onBGDV6yUFNF6RnhYG8ALcwfdxBv7EGky",
  );
  assert.equal(snapshot.streams[0]?.wasLiveAtCapture, true);
});

test("rendered symbols and titles match the capture's server-rendered text", async () => {
  const { bytes, manifestValue } = await realEvidence();
  const html = new TextDecoder().decode(bytes);
  for (const stream of verifyLiveEvidence(bytes, manifestValue).streams) {
    assert.ok(!stream.symbol.startsWith("$$"), stream.symbol);
    assert.ok(html.includes(`>${stream.symbol}<`), `symbol ${stream.symbol}`);
    assert.ok(html.includes(`>${stream.title}<`), `title ${stream.title}`);
  }
});

test("unresolved React Flight references fail closed", async () => {
  const { bytes } = await realEvidence();
  const source = new TextDecoder().decode(bytes);
  const escaped = '\\"symbol\\":\\"$$M\\"';
  assert.ok(source.includes(escaped));
  const mutated = new TextEncoder().encode(
    source.replace(escaped, '\\"symbol\\":\\"$@3\\"'),
  );
  assert.throws(
    () => parseLiveCapture(mutated, sha256(mutated)),
    /unresolved Flight reference/,
  );
});

test("keeps external media fields out of the browser-facing data model", async () => {
  const { bytes } = await realEvidence();
  const [stream] = parseLiveCapture(bytes);
  assert.deepEqual(Object.keys(stream).sort(), [
    "creatorAddress",
    "id",
    "mint",
    "symbol",
    "title",
    "viewerCountAtCapture",
    "wasLiveAtCapture",
  ]);
  assert.equal("playlistUrl" in stream, false);
  assert.equal("thumbnail" in stream, false);
});

test("fails closed for changed capture bytes and changed provenance", async () => {
  const { bytes, manifestValue } = await realEvidence();
  const changedBytes = Buffer.from(bytes);
  changedBytes[100] ^= 1;
  assert.throws(() => parseLiveCapture(changedBytes), /SHA-256 mismatch/);

  const changedManifest = structuredClone(manifestValue);
  const record = changedManifest.records.find(
    (value: { url?: string }) => value.url === LIVE_CAPTURE_URL,
  );
  record.path = "evidence/web/objects/not-the-live-capture";
  assert.throws(
    () => verifyLiveEvidence(bytes, changedManifest),
    /provenance does not match/,
  );
  assert.equal(LIVE_CAPTURE_PATH, "evidence/web/objects/c45d40b52df03727");
});

test("rejects invalid stream identity, state, counts and unexpected fields", () => {
  const valid = {
    id: "mint",
    mint: "mint",
    title: "Title",
    symbol: "T",
    creator: { address: "creator" },
    isLive: true,
    viewerCount: 2,
    coin: { mint: "mint" },
  };
  assert.equal(validateArchivedStream(valid).viewerCountAtCapture, 2);
  for (const invalid of [
    { ...valid, id: "different" },
    { ...valid, isLive: false },
    { ...valid, viewerCount: -1 },
    { ...valid, viewerCount: 1.5 },
    { ...valid, creator: { address: "creator", verified: true } },
    { ...valid, playlistToken: "secret" },
    { ...valid, coin: { mint: "different" } },
  ]) {
    assert.throws(() => validateArchivedStream(invalid), /Archived stream/);
  }
});

test("searches supported archived identity fields and sorts deterministically", async () => {
  const { bytes } = await realEvidence();
  const streams = parseLiveCapture(bytes);
  assert.equal(filterArchivedStreams(streams, "$major", "viewers").length, 1);
  assert.equal(
    filterArchivedStreams(streams, "EWa9rEDV", "viewers")[0]?.title,
    "A",
  );
  assert.deepEqual(
    filterArchivedStreams(streams, "", "title").map((stream) => stream.title),
    ["A", "J", "M", "O", "R"],
  );
  assert.deepEqual(
    filterArchivedStreams(streams, "", "viewers").map(
      (stream) => stream.viewerCountAtCapture,
    ),
    [42, 34, 26, 24, 20],
  );
});
