import Fastify from "fastify";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { validateHeaderName, validateHeaderValue } from "node:http";
import { fileURLToPath } from "node:url";
import { registerPostRoutes } from "./posts-routes.js";
import { PostStore, defaultPostStore } from "./posts-store.js";
import { registerUserRoutes } from "./users-routes.js";
import { UserStore, defaultStore } from "./users-store.js";
import { registerCompetitionRoutes } from "./competitions-routes.js";
import { CompetitionStore, defaultCompetitionStore } from "./competitions-store.js";
import { registerCoinRoutes, registerSolPriceRoute } from "./coins-routes.js";
import { CoinStore, defaultCoinStore } from "./coins-store.js";
import { registerPortfolioRoutes } from "./portfolio-routes.js";
import { PortfolioStore, defaultPortfolioStore } from "./portfolio-store.js";
import { registerGraphRoutes } from "./graph-routes.js";
import { GraphStore, defaultGraphStore } from "./graph-store.js";
import { registerFeedRoutes } from "./feed-routes.js";
import { FeedStore, defaultFeedStore } from "./feed-store.js";
import { registerRewardRoutes } from "./rewards-routes.js";
import { RewardStore, defaultRewardStore } from "./rewards-store.js";
import { registerSettingsRoutes } from "./settings-routes.js";
import { SettingsStore, defaultSettingsStore } from "./settings-store.js";
import { registerNotificationRoutes } from "./notifications-routes.js";
import { NotificationStore, defaultNotificationStore } from "./notifications-store.js";
import { registerAuthRoutes } from "./auth-routes.js";
import { AuthStore, defaultAuthStore } from "./auth-store.js";
import { registerLivestreamRoutes } from "./livestream-routes.js";
import { LivestreamStore, defaultLivestreamStore } from "./livestream-store.js";
import { registerCoinCreationRoutes } from "./coin-creation-routes.js";
import { CoinCreationStore, defaultCoinCreationStore } from "./coin-creation-store.js";

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

/**
 * Routes handled natively and therefore excluded from the generic replay loop.
 * Key: `METHOD /openapi-path` (the OpenAPI template path, not the Fastify param path).
 */
const NATIVE_ROUTES = new Set<string>([
  // Users / Profiles
  "GET /users",
  "GET /users/{id}",
  "POST /users/batch",
  "GET /users/username-exists/{username}",
  "GET /users/search-v2",
  "GET /users/{id}/overview",
  "POST /profiles/verified",
  // Posts
  "GET /posts",
  "GET /posts/{postId}",
  "GET /posts/{postId}/replies",
  "GET /posts/{postId}/likers",
  "GET /posts/{postId}/quotes",
  "GET /posts/{postId}/reposters",
  // Competitions / Leaderboards
  "GET /competitions",
  "GET /competitions/{idOrSlug}",
  "GET /competitions/{id}/entries/{entryId}",
  "GET /competitions/{id}/entries/{entryId}/highlights",
  "GET /competitions/{id}/highlights",
  // Coins / Market Discovery
  "GET /coins",
  "GET /coins/trending",
  "GET /coins/new",
  "GET /coins/top",
  "GET /coins/search",
  "GET /coins/{mint}",
  "POST /coins/batch",
  "GET /coins/{mint}/trades",
  "GET /coins/{mint}/holders",
  // Portfolio / Positions / Trades
  "GET /positions/{wallet}",
  "GET /positions/{wallet}/{mint}",
  "GET /positions/{wallet}/pnl",
  "GET /trades/{wallet}",
  "GET /trades/coin/{mint}",
  // Follow Graph
  "GET /users/{id}/followers",
  "GET /users/{id}/following",
  "POST /graph/is-following",
  "POST /graph/batch-is-following",
  "GET /users/{id}/mutual-followers/{otherId}",
  "GET /groups/{groupId}/members",
  // Feed / Callouts
  "GET /feed/home",
  "GET /feed/coin/{mint}",
  "GET /feed/user/{userId}",
  "GET /callout/coin/{coin}",
  "GET /callouts",
  // Rewards / Fees
  "GET /rewards/{wallet}",
  "GET /rewards/{wallet}/summary",
  "GET /rewards/{wallet}/holder",
  "GET /rewards/{wallet}/creator-payouts",
  "GET /rewards/{wallet}/referral",
  "GET /fees/schedule",
  // Settings
  "GET /settings/{wallet}",
  "GET /settings/{wallet}/notifications",
  "GET /settings/{wallet}/privacy",
  // Notifications
  "GET /notifications/{wallet}",
  "GET /notifications/{wallet}/unread-count",
  // Auth / Identity
  "GET /auth/session/{sessionId}",
  "GET /auth/sessions/{wallet}",
  "POST /auth/validate-key",
  "GET /auth/account/{wallet}",
  "GET /auth/linked-accounts/{wallet}",
  "GET /auth/api-keys/{wallet}",
  // Livestream
  "GET /livestreams",
  "GET /livestreams/scheduled",
  "GET /livestreams/{streamId}",
  "GET /livestreams/host/{wallet}",
  "GET /livestreams/coin/{mint}",
  // Coin Creation
  "GET /coin-creation/drafts/{wallet}",
  "GET /coin-creation/draft/{draftId}",
  "GET /coin-creation/record/{mint}",
  "POST /coin-creation/validate",
]);

export interface BuildAppOptions {
  /** Override the user store (for tests). */
  userStore?: UserStore;
  /** Override the post store (for tests). */
  postStore?: PostStore;
  /** Override the competition store (for tests). */
  competitionStore?: CompetitionStore;
  /** Override the coin store (for tests). */
  coinStore?: CoinStore;
  /** Override the portfolio store (for tests). */
  portfolioStore?: PortfolioStore;
  /** Override the graph store (for tests). */
  graphStore?: GraphStore;
  /** Override the feed store (for tests). */
  feedStore?: FeedStore;
  /** Override the reward store (for tests). */
  rewardStore?: RewardStore;
  /** Override the settings store (for tests). */
  settingsStore?: SettingsStore;
  /** Override the notification store (for tests). */
  notificationStore?: NotificationStore;
  /** Override the auth store (for tests). */
  authStore?: AuthStore;
  /** Override the livestream store (for tests). */
  livestreamStore?: LivestreamStore;
  /** Override the coin creation store (for tests). */
  coinCreationStore?: CoinCreationStore;
}

export function buildApp(fixtures: Fixture[] = [], opts: BuildAppOptions = {}) {
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
  // Register native handlers first. They win over a captured fixture for the same route.
  // They are documented /v1 operations too, so the same API-key gate runs before them.
  const store = opts.userStore ?? defaultStore;
  const postStore =
    opts.postStore ?? (opts.userStore ? new PostStore(undefined, store) : defaultPostStore);
  const compStore =
    opts.competitionStore ??
    (opts.userStore ? new CompetitionStore(undefined, store) : defaultCompetitionStore);
  const coinStore = opts.coinStore ?? defaultCoinStore;
  const portfolioStore =
    opts.portfolioStore ?? (opts.coinStore ? new PortfolioStore(undefined, coinStore) : defaultPortfolioStore);
  const graphStore =
    opts.graphStore ?? (opts.userStore ? new GraphStore(undefined, store) : defaultGraphStore);
  const feedStore =
    opts.feedStore ?? (opts.userStore ? new FeedStore(undefined, store) : defaultFeedStore);
  const rewardStore = opts.rewardStore ?? defaultRewardStore;
  const settingsStore = opts.settingsStore ?? defaultSettingsStore;
  const notificationStore =
    opts.notificationStore ?? (opts.userStore ? new NotificationStore(undefined, store) : defaultNotificationStore);
  const authStore = opts.authStore ?? defaultAuthStore;
  const livestreamStore = opts.livestreamStore ?? defaultLivestreamStore;
  const coinCreationStore = opts.coinCreationStore ?? defaultCoinCreationStore;

  // Register the sol-price route outside the API-key gate.
  registerSolPriceRoute(app, coinStore);

  app.register(async (native) => {
    native.addHook("preHandler", apiKeyGate);
    registerUserRoutes(native, store);
    registerPostRoutes(native, postStore);
    registerCompetitionRoutes(native, compStore);
    registerCoinRoutes(native, coinStore);
    registerPortfolioRoutes(native, portfolioStore);
    registerGraphRoutes(native, graphStore);
    registerFeedRoutes(native, feedStore);
    registerRewardRoutes(native, rewardStore);
    registerSettingsRoutes(native, settingsStore);
    registerNotificationRoutes(native, notificationStore);
    registerAuthRoutes(native, authStore);
    registerLivestreamRoutes(native, livestreamStore);
    registerCoinCreationRoutes(native, coinCreationStore);
  });

  // Routing recognizes documented paths; no fabricated domain responses or live proxy fallback.
  for (const [path, item] of Object.entries(spec.paths)) {
    for (const method of Object.keys(item).filter((value) =>
      ["get", "post", "put", "patch", "delete", "head", "options"].includes(
        value,
      ),
    )) {
      // Skip operations that a native handler already serves.
      if (NATIVE_ROUTES.has(`${method.toUpperCase()} ${path}`)) continue;
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
