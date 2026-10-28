import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inventory } from "../scripts/inventory.mjs";

const inventoryScript = fileURLToPath(
  new URL("../scripts/inventory.mjs", import.meta.url),
);

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

function bundle(factories, { prefix = "", literals = [] } = {}) {
  const entries = factories
    .flatMap(({ id, code }) => [JSON.stringify(id), code])
    .join(",\n");
  const expressions = literals.map((literal) => `${JSON.stringify(literal)};`);
  return `${prefix}globalThis.TURBOPACK.push([\n"synthetic",\n${entries}\n]);\n${expressions.join("\n")}\n`;
}

async function makeWorkspace(t, sources) {
  const root = await mkdtemp(path.join(tmpdir(), "pump-inventory-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "evidence/web/objects"), { recursive: true });
  const records = [];
  for (const [index, source] of sources.entries()) {
    const name = source.name ?? `source-${index}.js`;
    const relative = `evidence/web/objects/${name}`;
    if (source.contents !== undefined) {
      await writeFile(path.join(root, relative), source.contents);
    }
    records.push({
      url: source.url ?? `https://example.invalid/${name}`,
      path: relative,
      status: source.status ?? 200,
      sha256: source.sha256 ?? `synthetic-${index}`,
    });
  }
  await writeFile(
    path.join(root, "evidence/web/manifest.json"),
    JSON.stringify({ records }, null, 2) + "\n",
  );
  return root;
}

async function readJson(root, relative) {
  return JSON.parse(await readFile(path.join(root, relative), "utf8"));
}

async function runInventory(root, options = {}) {
  return inventory(root, { log: () => {}, ...options });
}

function runInventoryCli(root) {
  return spawnSync(process.execPath, [inventoryScript, "--root", root], {
    encoding: "utf8",
  });
}

async function factoryFiles(root) {
  return (await readdir(path.join(root, "recovered/modules")))
    .filter((name) => name.endsWith(".js"))
    .sort();
}

async function snapshot(root) {
  const result = {};
  const reports = [
    "recovered/modules.json",
    "contracts/internal-operations.json",
    "evidence/web/dependency-paths.json",
  ];
  for (const relative of reports) {
    result[relative] = (await readFile(path.join(root, relative))).toString(
      "hex",
    );
  }
  for (const filename of await factoryFiles(root)) {
    const relative = `recovered/modules/${filename}`;
    result[relative] = (await readFile(path.join(root, relative))).toString(
      "hex",
    );
  }
  return result;
}

async function assertNoStagingDirectories(root) {
  assert.deepEqual(
    (await readdir(root)).filter((name) =>
      name.startsWith(".inventory-stage-"),
    ),
    [],
  );
}

test("generates a valid synthetic factory inventory", async (t) => {
  const source = bundle(
    [{ id: 101, code: 'function alpha() { return "alpha"; }' }],
    {
      prefix: 'throw new Error("Captured input must not execute");\n',
    },
  );
  const root = await makeWorkspace(t, [{ contents: source }]);
  const report = await runInventory(root);
  assert.equal(report.modules.length, 1);
  assert.deepEqual(report.failures, []);
  assert.deepEqual(report.modules[0].ids, [101]);
  assert.match(
    await readFile(path.join(root, report.modules[0].path), "utf8"),
    /^\/\/ Recovered Turbopack factory\./,
  );
});

test("retains multiple IDs and origins for one shared factory variant", async (t) => {
  const code = 'function shared() { return "same"; }';
  const root = await makeWorkspace(t, [
    { name: "one.js", contents: bundle([{ id: 201, code }]) },
    { name: "two.js", contents: bundle([{ id: 202, code }]) },
  ]);
  await runInventory(root);
  const report = await readJson(root, "recovered/modules.json");
  assert.equal(report.modules.length, 1);
  assert.deepEqual(report.modules[0].ids, [201, 202]);
  assert.equal(report.modules[0].origins.length, 2);
});

test("binds each factory SHA-256 to its exact captured source slice", async (t) => {
  const source = bundle([
    { id: 301, code: 'function provenance() { return "exact"; }' },
  ]);
  const root = await makeWorkspace(t, [{ contents: source }]);
  await runInventory(root);
  const report = await readJson(root, "recovered/modules.json");
  const module = report.modules[0];
  const origin = module.origins[0];
  const recovered = source.slice(origin.start, origin.end);
  assert.equal(digest(recovered), module.sha256);
  assert.equal(recovered, 'function provenance() { return "exact"; }');
});

test("records factory ranges as UTF-16 code-unit offsets", async (t) => {
  const prefix = '"😀";\n';
  const source = bundle(
    [{ id: 401, code: 'function unicodeRange() { return "ok"; }' }],
    { prefix },
  );
  const root = await makeWorkspace(t, [{ contents: source }]);
  await runInventory(root);
  const report = await readJson(root, "recovered/modules.json");
  const { start, end } = report.modules[0].origins[0];
  assert.equal(start, source.indexOf("function unicodeRange"));
  assert.equal(
    source.slice(start, end),
    'function unicodeRange() { return "ok"; }',
  );
  assert.ok(Buffer.byteLength(source.slice(0, start), "utf8") > start);
  assert.equal(
    report.rangeEncoding,
    "UTF-16 code-unit half-open offsets in UTF-8 decoded source",
  );
});

test("a parser failure exits nonzero without publishing reports", async (t) => {
  const root = await makeWorkspace(t, [
    {
      name: "valid.js",
      contents: bundle([
        { id: 501, code: "function valid() { return true; }" },
      ]),
    },
    { name: "malformed.js", contents: "globalThis.TURBOPACK.push([" },
  ]);
  const result = runInventoryCli(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /evidence\/web\/objects\/malformed\.js/);
  assert.doesNotMatch(result.stdout, /"modules"/);
  await assert.rejects(access(path.join(root, "recovered/modules.json")));
});

test("a missing captured source exits nonzero without publishing reports", async (t) => {
  const root = await makeWorkspace(t, [
    { name: "missing.js", contents: undefined },
  ]);
  const result = runInventoryCli(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /evidence\/web\/objects\/missing\.js/);
  assert.match(result.stderr, /ENOENT/);
  await assert.rejects(access(path.join(root, "recovered/modules.json")));
});

test("failed parsing preserves previous reports and factory files", async (t) => {
  const relative = "evidence/web/objects/source-0.js";
  const root = await makeWorkspace(t, [
    {
      contents: bundle([
        { id: 601, code: 'function stable() { return "stable"; }' },
      ]),
    },
  ]);
  await runInventory(root);
  const before = await snapshot(root);
  await writeFile(path.join(root, relative), "globalThis.TURBOPACK.push([");
  await assert.rejects(runInventory(root), /Inventory extraction failed/);
  assert.deepEqual(await snapshot(root), before);
  await assertNoStagingDirectories(root);
});

test("removes obsolete generator-owned factories after source removal", async (t) => {
  const relative = "evidence/web/objects/source-0.js";
  const first = { id: 701, code: 'function first() { return "first"; }' };
  const second = { id: 702, code: 'function second() { return "second"; }' };
  const root = await makeWorkspace(t, [{ contents: bundle([first, second]) }]);
  await runInventory(root);
  const initial = await factoryFiles(root);
  assert.equal(initial.length, 2);
  await writeFile(path.join(root, relative), bundle([first]));
  await runInventory(root);
  const current = await factoryFiles(root);
  assert.equal(current.length, 1);
  assert.ok(initial.includes(current[0]));
  assert.equal(
    (await readJson(root, "recovered/modules.json")).modules.length,
    1,
  );
});

test("replaces the obsolete hashed file when factory source changes", async (t) => {
  const relative = "evidence/web/objects/source-0.js";
  const root = await makeWorkspace(t, [
    {
      contents: bundle([
        { id: 801, code: 'function changed() { return "v1"; }' },
      ]),
    },
  ]);
  await runInventory(root);
  const [oldName] = await factoryFiles(root);
  await writeFile(
    path.join(root, relative),
    bundle([{ id: 801, code: 'function changed() { return "v2"; }' }]),
  );
  await runInventory(root);
  const [newName] = await factoryFiles(root);
  assert.notEqual(newName, oldName);
  assert.equal((await factoryFiles(root)).length, 1);
  await assert.rejects(access(path.join(root, "recovered/modules", oldName)));
});

test("preserves unknown files in the recovered modules directory", async (t) => {
  const root = await makeWorkspace(t, [
    {
      contents: bundle([
        { id: 901, code: 'function known() { return "known"; }' },
      ]),
    },
  ]);
  await mkdir(path.join(root, "recovered/modules"), { recursive: true });
  await writeFile(
    path.join(root, "recovered/modules/analyst-notes.txt"),
    "user-owned\n",
  );
  await runInventory(root);
  assert.equal(
    await readFile(
      path.join(root, "recovered/modules/analyst-notes.txt"),
      "utf8",
    ),
    "user-owned\n",
  );
});

test("does not collapse distinct factory variants sharing an ID", async (t) => {
  const root = await makeWorkspace(t, [
    {
      contents: bundle([
        { id: 1001, code: 'function variant() { return "one"; }' },
        { id: 1001, code: 'function variant() { return "two"; }' },
      ]),
    },
  ]);
  await runInventory(root);
  const report = await readJson(root, "recovered/modules.json");
  assert.equal(report.modules.length, 2);
  assert.equal(new Set(report.modules.map((module) => module.sha256)).size, 2);
  assert.equal(new Set(report.modules.map((module) => module.path)).size, 2);
});

test("unchanged inputs generate byte-identical outputs repeatedly", async (t) => {
  const root = await makeWorkspace(t, [
    {
      contents: bundle(
        [{ id: 1101, code: 'function repeatable() { return "same"; }' }],
        { literals: ["GET /repeatable"] },
      ),
    },
  ]);
  await runInventory(root);
  const first = await snapshot(root);
  await runInventory(root);
  assert.deepEqual(await snapshot(root), first);
  await assertNoStagingDirectories(root);
});

test("keeps static operation extraction and occurrences consistent", async (t) => {
  const source = bundle(
    [{ id: 1201, code: 'function operations() { return "GET /inside"; }' }],
    { literals: ["POST /alpha", "GET /zeta", "GET /zeta"] },
  );
  const root = await makeWorkspace(t, [{ contents: source }]);
  await runInventory(root);
  const report = await readJson(root, "contracts/internal-operations.json");
  assert.deepEqual(
    report.operations.map((entry) => entry.operation),
    ["GET /inside", "GET /zeta", "POST /alpha"],
  );
  assert.equal(report.occurrences.length, 4);
  for (const occurrence of report.occurrences) {
    assert.equal(
      JSON.parse(source.slice(occurrence.start, occurrence.end)),
      occurrence.operation,
    );
  }
});

test("keeps dependency path observations and offsets consistent", async (t) => {
  const dependency =
    "node_modules/.pnpm/react@19.2.3/node_modules/react/index.js";
  const source = bundle(
    [{ id: 1301, code: "function dependency() { return true; }" }],
    { literals: [dependency] },
  );
  const root = await makeWorkspace(t, [{ contents: source }]);
  await runInventory(root);
  const report = await readJson(root, "evidence/web/dependency-paths.json");
  assert.deepEqual(report, [
    {
      specifier: "react@19.2.3",
      source: "evidence/web/objects/source-0.js",
      offset: source.indexOf(dependency),
    },
  ]);
});

test("a formatting failure preserves every previous output", async (t) => {
  const relative = "evidence/web/objects/source-0.js";
  const root = await makeWorkspace(t, [
    {
      contents: bundle([
        { id: 1401, code: 'function format() { return "before"; }' },
      ]),
    },
  ]);
  await runInventory(root);
  const before = await snapshot(root);
  await writeFile(
    path.join(root, relative),
    bundle([{ id: 1401, code: 'function format() { return "after"; }' }]),
  );
  await assert.rejects(
    runInventory(root, {
      formatFactory: async () => {
        throw new Error("synthetic formatter failure");
      },
    }),
    /Unable to format recovered factory/,
  );
  assert.deepEqual(await snapshot(root), before);
  await assertNoStagingDirectories(root);
});

test("a publication failure rolls back every replaced output", async (t) => {
  const relative = "evidence/web/objects/source-0.js";
  const root = await makeWorkspace(t, [
    {
      contents: bundle([
        { id: 1501, code: 'function publish() { return "before"; }' },
      ]),
    },
  ]);
  await runInventory(root);
  const before = await snapshot(root);
  await writeFile(
    path.join(root, relative),
    bundle([{ id: 1501, code: 'function publish() { return "after"; }' }]),
  );
  await assert.rejects(
    runInventory(root, {
      beforePublish: ({ relative: target }) => {
        if (target === "recovered/modules.json") {
          throw new Error("synthetic publication failure");
        }
      },
    }),
    /previous outputs restored/,
  );
  assert.deepEqual(await snapshot(root), before);
  await assertNoStagingDirectories(root);
});

test("rejects a generated filename collision with an unrelated file", async (t) => {
  const code = 'function collision() { return "generated"; }';
  const root = await makeWorkspace(t, [
    { contents: bundle([{ id: 1601, code }]) },
  ]);
  const filename = `1601-${digest(code).slice(0, 12)}.js`;
  await mkdir(path.join(root, "recovered/modules"), { recursive: true });
  await writeFile(
    path.join(root, "recovered/modules", filename),
    "unrelated analyst content\n",
  );
  await assert.rejects(runInventory(root), /collides with an unrelated file/);
  assert.equal(
    await readFile(path.join(root, "recovered/modules", filename), "utf8"),
    "unrelated analyst content\n",
  );
  await assert.rejects(access(path.join(root, "recovered/modules.json")));
  await assertNoStagingDirectories(root);
});
