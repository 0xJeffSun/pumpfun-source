import Fastify from "fastify";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { validateHeaderName, validateHeaderValue } from "node:http";
import { fileURLToPath } from "node:url";

export type Fixture = {
  method: string;
  path: string;
  query?: Record<string, string>;
  status: number;
  headers?: Record<string, string>;
  body: unknown;
  source: string;
};

const reservedFixturePaths = new Set([
  "/health",
  "/__reconstruction/status",
  "/__reconstruction/openapi.json",
]);

function compareKeys([left]: [string, string], [right]: [string, string]) {
  return left === right ? 0 : left < right ? -1 : 1;
}

export function fixtureKey(
  method: string,
  path: string,
  query: Record<string, string> = {},
) {
  const parameters = new URLSearchParams(
    Object.entries(query).sort(compareKeys),
  );
  return `${method.toUpperCase()} ${path}?${parameters.toString()}`;
}

function fixtureProvenance(fixture: unknown, index: number) {
  const source =
    fixture && typeof fixture === "object"
      ? (fixture as { source?: unknown }).source
      : undefined;
  if (typeof source !== "string" || source.length === 0) {
    return `fixture[${index}] source=<missing>`;
  }
  const digest = createHash("sha256").update(source).digest("hex").slice(0, 12);
  return `fixture[${index}] sourceSha256=${digest}`;
}

function validateFixture(
  fixture: unknown,
  index: number,
): asserts fixture is Fixture {
  const provenance = fixtureProvenance(fixture, index);
  if (!fixture || typeof fixture !== "object" || Array.isArray(fixture)) {
    throw new Error(
      `Invalid fixture registration (${provenance}): expected an object`,
    );
  }
  const candidate = fixture as Partial<Record<keyof Fixture, unknown>>;
  if (!Object.hasOwn(candidate, "body") || candidate.body === undefined) {
    throw new Error(
      `Invalid fixture registration (${provenance}): body must be explicitly present; use null for a JSON null body`,
    );
  }
  if (typeof candidate.source !== "string" || candidate.source.length === 0) {
    throw new Error(
      `Invalid fixture registration (${provenance}): source must be a non-empty string`,
    );
  }
  if (typeof candidate.method !== "string" || candidate.method.length === 0) {
    throw new Error(
      `Invalid fixture registration (${provenance}): method must be a non-empty string`,
    );
  }
  if (!["GET", "HEAD"].includes(candidate.method.toUpperCase())) {
    throw new Error(
      `Invalid fixture registration (${provenance}): only GET and HEAD are supported`,
    );
  }
  if (
    typeof candidate.path !== "string" ||
    !candidate.path.startsWith("/") ||
    candidate.path.startsWith("//") ||
    candidate.path.includes("?") ||
    candidate.path.includes("#")
  ) {
    throw new Error(
      `Invalid fixture registration (${provenance}): path must be a local absolute path without a query or fragment`,
    );
  }
  if (candidate.query !== undefined) {
    if (
      candidate.query === null ||
      typeof candidate.query !== "object" ||
      Array.isArray(candidate.query) ||
      Object.getPrototypeOf(candidate.query) !== Object.prototype
    ) {
      throw new Error(
        `Invalid fixture registration (${provenance}): query must be a plain object`,
      );
    }
    if (
      Object.values(candidate.query).some((value) => typeof value !== "string")
    ) {
      throw new Error(
        `Invalid fixture registration (${provenance}): query values must be strings`,
      );
    }
  }
  if (
    typeof candidate.status !== "number" ||
    !Number.isInteger(candidate.status) ||
    candidate.status < 200 ||
    candidate.status > 599
  ) {
    throw new Error(
      `Invalid fixture registration (${provenance}): status must be an integer from 200 through 599`,
    );
  }
  const status = candidate.status as number;
  if (
    candidate.body !== null &&
    (status === 204 || status === 304)
  ) {
    throw new Error(
      `Invalid fixture registration (${provenance}): status ${status} responses cannot carry a body; use null`,
    );
  }
  if (candidate.headers !== undefined) {
    if (
      candidate.headers === null ||
      typeof candidate.headers !== "object" ||
      Array.isArray(candidate.headers) ||
      Object.getPrototypeOf(candidate.headers) !== Object.prototype
    ) {
      throw new Error(
        `Invalid fixture registration (${provenance}): headers must be a plain object`,
      );
    }
    for (const [name, value] of Object.entries(candidate.headers)) {
      try {
        validateHeaderName(name);
      } catch {
        throw new Error(
          `Invalid fixture registration (${provenance}): headers contain an invalid HTTP field name`,
        );
      }
      if (typeof value !== "string") {
        throw new Error(
          `Invalid fixture registration (${provenance}): header values must be strings`,
        );
      }
      try {
        validateHeaderValue(name, value);
      } catch {
        throw new Error(
          `Invalid fixture registration (${provenance}): headers contain an invalid HTTP field value`,
        );
      }
    }
  }
}

function registerFixtures(fixtures: Fixture[]) {
  if (!Array.isArray(fixtures)) {
    throw new Error("Invalid fixture registration: expected an array");
  }
  const fixtureMap = new Map<string, Fixture>();
  const provenanceByKey = new Map<string, string>();
  fixtures.forEach((fixture, index) => {
    validateFixture(fixture, index);
    const provenance = fixtureProvenance(fixture, index);
    if (reservedFixturePaths.has(fixture.path)) {
      const pathDigest = createHash("sha256")
        .update(fixture.path)
        .digest("hex")
        .slice(0, 12);
      throw new Error(
        `Reserved fixture route pathSha256=${pathDigest}: ${provenance}`,
      );
    }
    const key = fixtureKey(fixture.method, fixture.path, fixture.query);
    const previous = provenanceByKey.get(key);
    if (previous) {
      const keyDigest = createHash("sha256")
        .update(key)
        .digest("hex")
        .slice(0, 12);
      throw new Error(
        `Duplicate canonical fixture key keySha256=${keyDigest}: ${previous}; ${provenance}`,
      );
    }
    fixtureMap.set(key, fixture);
    provenanceByKey.set(key, provenance);
  });
  return fixtureMap;
}

// Documented developer API key shape (contracts/developer.openapi.json,
// components/securitySchemes/bearer): the prefix `pf_live_` followed by 43
// base62 characters and a 6-character base62 checksum. The checksum algorithm
// and the key store are not observable, so the gate validates the documented
// shape only; a well-formed key is accepted as presented, never as a verified
// credential. Scope, revocation and rate-limit outcomes need a key store and
// stay unmodeled.
const apiKeyPattern = /^pf_live_[0-9A-Za-z]{49}$/;

async function apiKeyGate(
  request: {
    headers: Record<string, string | string[] | undefined>;
    url: string;
  },
  reply: any,
) {
  const authorization = request.headers.authorization;
  const alias = request.headers["x-api-key"];
  let candidate: string | undefined;
  if (typeof authorization === "string") {
    const bearer = /^Bearer\s+(.+)$/i.exec(authorization.trim());
    if (bearer) candidate = bearer[1];
  }
  if (candidate === undefined && typeof alias === "string") {
    candidate = alias;
  }
  if (candidate !== undefined && apiKeyPattern.test(candidate)) return;
  // The observed 401 envelope (evidence/api-probes.json, object
  // 1837f7894abd389a) reports the path without the local /v1 prefix and names
  // both key headers; the specification's examples diverge on both points, so
  // the captured response wins. Only the timestamp is volatile.
  const separator = request.url.indexOf("?");
  const pathname =
    separator < 0 ? request.url : request.url.slice(0, separator);
  reply.code(401).send({
    statusCode: 401,
    timestamp: new Date().toISOString(),
    path: pathname.startsWith("/v1/") ? pathname.slice(3) : pathname,
    error: candidate === undefined ? "API_KEY_REQUIRED" : "API_KEY_INVALID",
    message:
      candidate === undefined
        ? "Send Authorization: Bearer <key> or x-api-key: <key>"
        : "The key is malformed (wrong prefix, length or checksum) or unknown.",
  });
}

export function buildApp(fixtures: Fixture[] = []) {
  // Reject an invalid inventory before constructing an application that can listen.
  const fixtureMap = registerFixtures(fixtures);
  const app = Fastify({ logger: false });
  const specPath = fileURLToPath(
    new URL("../../../contracts/developer.openapi.json", import.meta.url),
  );
  const specification = readFileSync(specPath, "utf8");
  const spec = JSON.parse(specification) as {
    paths: Record<string, Record<string, unknown>>;
  };
  app.get("/health", async () => ({
    status: "ok",
    mode: "reconstruction",
    compatibility: "unqualified",
  }));
  app.get("/__reconstruction/openapi.json", async (_, reply) =>
    reply.type("application/json").send(specification),
  );
  app.get("/__reconstruction/status", async () => ({
    fixtureCount: fixtureMap.size,
    specificationSha256: createHash("sha256")
      .update(specification)
      .digest("hex"),
    compatibility: "unqualified",
  }));
  // Routing recognizes documented paths; no fabricated domain responses or live proxy fallback.
  for (const [path, item] of Object.entries(spec.paths)) {
    for (const method of Object.keys(item).filter((value) =>
      ["get", "post", "put", "patch", "delete", "head", "options"].includes(
        value,
      ),
    )) {
      app.route({
        method: method.toUpperCase() as "GET",
        url: "/v1" + path.replace(/\{([^}]+)\}/g, ":$1"),
        // Every documented operation declares the global bearer requirement;
        // the gate runs before replay so a fixture cannot bypass it.
        preHandler: apiKeyGate,
        handler: replay,
      });
    }
  }
  app.all("/*", replay);

  function replay(request: { method: string; url: string }, reply: any) {
    // URL normalizes dot segments; fixture paths must match the raw request target.
    const separator = request.url.indexOf("?");
    const pathname =
      separator < 0 ? request.url : request.url.slice(0, separator);
    const entries = [
      ...new URLSearchParams(
        separator < 0 ? "" : request.url.slice(separator + 1),
      ).entries(),
    ];
    // The fixture format cannot represent duplicate query keys: fail explicitly.
    if (new Set(entries.map(([key]) => key)).size !== entries.length) {
      return reply
        .code(501)
        .send({ error: "DUPLICATE_QUERY_KEYS_UNIMPLEMENTED" });
    }
    const fixture = fixtureMap.get(
      fixtureKey(request.method, pathname, Object.fromEntries(entries)),
    );
    if (!fixture) {
      return reply.code(501).send({
        error: "COMPATIBILITY_NOT_IMPLEMENTED",
        method: request.method,
        path: pathname,
      });
    }
    if (fixture.headers) reply.headers(fixture.headers);
    // Fastify sends strings verbatim and null as an empty payload, even for JSON.
    const contentType = reply.getHeader("content-type");
    if (
      (fixture.body === null || typeof fixture.body === "string") &&
      typeof contentType === "string" &&
      /^application\/(?:[^;\s]+\+)?json(?:\s*;|$)/i.test(contentType)
    ) {
      return reply.code(fixture.status).send(JSON.stringify(fixture.body));
    }
    return reply.code(fixture.status).send(fixture.body);
  }

  return app;
}
