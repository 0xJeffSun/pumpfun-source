import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  mkdtemp,
  mkdir,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  analyzeFactory,
  buildGraph,
  countSourceLines,
  publishGraph,
  verifyGraph,
} from "../scripts/factory-graph/core.mjs";

const hash = (value) => createHash("sha256").update(value).digest("hex");

async function fixture({
  corruptHash = false,
  corruptRange = false,
  reverse = false,
} = {}) {
  const root = await mkdtemp(join(tmpdir(), "factory-graph-"));
  for (const path of ["recovered/modules", "evidence/web/objects", "contracts"])
    await mkdir(join(root, path), { recursive: true });
  const factories = [
    {
      id: 1,
      raw: `(e)=>{var t=e.i(2);e.A(3);e.i(99);e.i("react");e.s(["answer",0,t],1)}`,
    },
    { id: 2, raw: `(e)=>{e.s(["value",0,42],2)}` },
    { id: 2, raw: `(e)=>{e.s(["value",0,43],2)}` },
    { id: 3, raw: `(e)=>{e.i(3);e.s(["cycle",0,true],3)}` },
  ];
  const source = `globalThis.TURBOPACK=[${factories.map((item) => item.raw).join(",")}];`;
  const jsPath = "evidence/web/objects/source.js";
  await writeFile(join(root, jsPath), source);
  const html = `<html><script src="/_next/static/chunks/source.js"></script></html>`;
  const htmlPath = "evidence/web/objects/home.html";
  await writeFile(join(root, htmlPath), html);
  const modules = [];
  for (const item of factories) {
    const start = source.indexOf(item.raw);
    const digest = hash(item.raw);
    const path = `recovered/modules/${item.id}-${digest.slice(0, 12)}.js`;
    await writeFile(
      join(root, path),
      `// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.\n${item.raw};\n`,
    );
    modules.push({
      ids: [item.id],
      sha256: digest,
      origins: [
        {
          source: jsPath,
          url: "https://pump.fun/_next/static/chunks/source.js",
          start,
          end: start + item.raw.length,
        },
      ],
      path,
    });
  }
  if (reverse) modules.reverse();
  if (corruptRange) modules[0].origins[0].end -= 1;
  const manifest = {
    records: [
      {
        url: "https://pump.fun/_next/static/chunks/source.js",
        final_url: "https://pump.fun/_next/static/chunks/source.js",
        status: 200,
        path: jsPath,
        bytes: Buffer.byteLength(source),
        sha256: corruptHash ? "0".repeat(64) : hash(source),
        headers: { "content-type": "application/javascript" },
      },
      {
        url: "https://pump.fun/",
        final_url: "https://pump.fun/",
        status: 200,
        path: htmlPath,
        bytes: Buffer.byteLength(html),
        sha256: hash(html),
        headers: { "content-type": "text/html; charset=utf-8" },
      },
    ],
  };
  await writeFile(
    join(root, "recovered/modules.json"),
    JSON.stringify({
      rangeEncoding:
        "UTF-16 code-unit half-open offsets in UTF-8 decoded source",
      modules,
      failures: [],
    }),
  );
  await writeFile(
    join(root, "evidence/web/manifest.json"),
    JSON.stringify(manifest),
  );
  await writeFile(
    join(root, "contracts/internal-operations.json"),
    JSON.stringify({ operations: [] }),
  );
  await writeFile(
    join(root, "contracts/developer-bindings.json"),
    JSON.stringify({ bindings: [] }),
  );
  return root;
}

test("line census excludes recovery banners, blanks, and comment-only lines", () => {
  assert.equal(
    countSourceLines(
      "// Recovered Turbopack factory. banner\n// comment\n(e) => {\n  /* note */\n  e.i(1); // inline\n}\n",
    ),
    3,
  );
});

test("AST reader recognizes only calls through the factory runtime binding", () => {
  const result = analyzeFactory(
    `(e)=>{other.i(9);e.i(2);e.A(3);e.A(variable);e.s(["x",0,1],4)}`,
  );
  assert.deepEqual(result.exports, ["x"]);
  assert.deepEqual(
    result.imports.map(({ kind, target, static: isStatic }) => [
      kind,
      target,
      isStatic,
    ]),
    [
      ["direct", 2, true],
      ["dynamic", 3, true],
      ["dynamic", null, false],
    ],
  );
});

test("malformed source never produces a partial AST result", () => {
  assert.throws(() => analyzeFactory(`(e)=>{e.i(`), /malformed factory/);
  assert.throws(
    () => countSourceLines(`(e)=>{`),
    /cannot count malformed source/,
  );
});

test("variant collisions remain ambiguous instead of resolving arbitrarily", async () => {
  const root = await fixture();
  const reports = await buildGraph(root, {
    routes: ["/", "/missing"],
    targetLines: 4,
    maximumLines: 100,
  });
  const edges = reports["IMPORT-EDGES.json.gz"];
  const direct = edges.find((edge) => edge.requestedId === 2);
  assert.equal(direct.resolution, "AMBIGUOUS");
  assert.equal(direct.candidates.length, 2);
  assert.equal(
    edges.find((edge) => edge.requestedId === 3 && edge.kind === "dynamic")
      .resolution,
    "EXACT",
  );
  assert.equal(
    edges.find((edge) => edge.requestedId === 99).resolution,
    "UNRESOLVED",
  );
  assert.equal(
    edges.find((edge) => edge.requestedId === "react").resolution,
    "EXTERNAL",
  );
  assert.ok(edges.some((edge) => edge.source === edge.target));
  assert.equal(
    reports["ROUTE-ATTRIBUTION.json"]["/missing"].status,
    "NO_EXACT_CAPTURE",
  );
});

test("capture hash and UTF-16 source range mutations fail closed", async () => {
  await assert.rejects(
    buildGraph(await fixture({ corruptHash: true }), {
      routes: ["/"],
      targetLines: 1,
      maximumLines: 100,
    }),
    /capture hash mismatch/,
  );
  await assert.rejects(
    buildGraph(await fixture({ corruptRange: true }), {
      routes: ["/"],
      targetLines: 1,
      maximumLines: 100,
    }),
    /source range mismatch/,
  );
});

test("symlinked evidence is rejected", async () => {
  const root = await fixture();
  const manifestPath = join(root, "evidence/web/manifest.json");
  const realPath = join(root, "manifest-real.json");
  await writeFile(realPath, await readFile(manifestPath));
  await writeFile(manifestPath, "{}");
  await import("node:fs/promises").then(({ unlink }) => unlink(manifestPath));
  await symlink(realPath, manifestPath);
  await assert.rejects(
    buildGraph(root, { routes: ["/"], targetLines: 1, maximumLines: 100 }),
    /symlink rejected/,
  );
});

test("publication is deterministic and generated evidence rejects tampering", async () => {
  const first = await fixture();
  const second = await fixture({ reverse: true });
  await publishGraph(first, "research/graph", {
    routes: ["/"],
    targetLines: 4,
    maximumLines: 100,
  });
  await publishGraph(second, "research/graph", {
    routes: ["/"],
    targetLines: 4,
    maximumLines: 100,
  });
  const firstManifest = await readFile(
    join(first, "research/graph/MANIFEST.json"),
    "utf8",
  );
  const secondManifest = await readFile(
    join(second, "research/graph/MANIFEST.json"),
    "utf8",
  );
  assert.equal(firstManifest, secondManifest);
  await verifyGraph(first, "research/graph");
  await writeFile(join(first, "research/graph/unexpected.json"), "{}\n");
  await assert.rejects(
    verifyGraph(first, "research/graph"),
    /unexpected generated evidence/,
  );
  await rm(join(first, "research/graph/unexpected.json"));
  await writeFile(join(first, "research/graph/GRAPH-SUMMARY.json"), "{}\n");
  await assert.rejects(
    verifyGraph(first, "research/graph"),
    /generated evidence mismatch/,
  );
});

test("an interrupted replacement restores the last complete graph", async () => {
  const root = await fixture();
  await publishGraph(root, "research/graph", {
    routes: ["/"],
    targetLines: 4,
    maximumLines: 100,
  });
  const before = await readFile(
    join(root, "research/graph/MANIFEST.json"),
    "utf8",
  );
  await assert.rejects(
    publishGraph(root, "research/graph", {
      routes: ["/"],
      targetLines: 4,
      maximumLines: 100,
      onPublishStage: () => {
        throw new Error("simulated interruption");
      },
    }),
    /simulated interruption/,
  );
  assert.equal(
    await readFile(join(root, "research/graph/MANIFEST.json"), "utf8"),
    before,
  );
  await verifyGraph(root, "research/graph");
});

test(
  "checked-in corpus rebuild stays within the authenticated 200K-300K range",
  { timeout: 30_000 },
  async () => {
    const root = join(import.meta.dirname, "..");
    const reports = await buildGraph(root);
    const summary = reports["GRAPH-SUMMARY.json"];
    assert.ok(
      summary.analyzedLines >= 200_000 && summary.analyzedLines <= 300_000,
    );
    assert.ok(summary.uniqueFactories > 0);
    assert.equal(
      summary.edges,
      summary.resolutions.EXACT +
        summary.resolutions.AMBIGUOUS +
        summary.resolutions.UNRESOLVED +
        summary.resolutions.EXTERNAL,
    );
    assert.equal(reports["VERIFY-RESULTS.json"].capturedCodeExecuted, false);
  },
);
