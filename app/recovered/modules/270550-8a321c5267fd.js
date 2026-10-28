// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var r = e.i(149502);
  class n {
    constructor(e) {
      ((this.consecutiveFailures = 0),
        (this.attempts = 0),
        (this.nextAttemptAtMs = 0),
        (this.baseDelayMs = e.retryBaseDelayMs ?? 5e3),
        (this.maxDelayMs = e.retryMaxDelayMs ?? 12e4),
        (this.jitter = e.retryJitter ?? 0.2),
        (this.maxAttempts = e.retryMaxAttempts ?? 8));
    }
    waitMs(e) {
      return Math.max(0, this.nextAttemptAtMs - e);
    }
    recordSuccess() {
      ((this.consecutiveFailures = 0),
        (this.attempts = 0),
        (this.nextAttemptAtMs = 0));
    }
    recordFailure(e, t = {}) {
      ((this.consecutiveFailures += 1), (this.attempts += 1));
      let r = Math.max(this.baseDelayMs, 2 * (t.cadenceMs ?? 0)),
        n = Math.min(this.consecutiveFailures - 1, 30),
        i = Math.max(
          Math.round(
            Math.max(r, Math.min(this.maxDelayMs, r * 2 ** n)) *
              (1 + (2 * Math.random() - 1) * this.jitter),
          ),
          t.minDelayMs ?? 0,
        );
      this.nextAttemptAtMs = e + i;
      let s = this.attempts,
        o = s >= this.maxAttempts;
      return (
        o && (this.attempts = 0),
        { attempt: s, delayMs: i, exhausted: o }
      );
    }
  }
  class i extends Error {
    constructor(e, t, r, n, i) {
      (super(e),
        (this.stage = t),
        (this.statusCode = r),
        (this.details = n),
        (this.retryAfterMs = i),
        (this.name = "UserEventJsonSDKError"));
    }
    toLogContext() {
      return {
        errorName: this.name,
        errorMessage: this.message,
        errorStage: this.stage,
        errorStatusCode: this.statusCode,
        errorDetails: this.details,
      };
    }
  }
  function s(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
  }
  function o(e) {
    if (!s(e)) return [];
    let t = [],
      r = e.webClientProperties ?? e.web,
      n = e.mobileClientProperties ?? e.mobile,
      i = e.systemClientProperties ?? e.system;
    return (
      null != r && t.push(["webClientProperties", r]),
      null != n && t.push(["mobileClientProperties", n]),
      null != i && t.push(["systemClientProperties", i]),
      t
    );
  }
  function a(e) {
    return new Date(e).toISOString();
  }
  class l {
    constructor(e) {
      if (
        ((this.autoFlushActive = !1),
        (this.serverIntervalHintMs = 0),
        (this.idleIntervalMs = 0),
        (this.idleSnapBackPending = !1),
        (this.isFlushInProgress = !1),
        (this.ongoingFlushPromise = null),
        (this.legacyEventKeyPrefix = "ue:json:e:"),
        (this.versionedEventKeyPrefix = "ue:json:e2:"),
        (this.lastPurgeGenerationKey = "ue:json:lastPurgeGeneration"),
        (this.isInitialized = !1),
        (this.config = e),
        (this.storage = e.storageAdapter),
        (this.maxQueueSize = e.maxQueueSize ?? l.DEFAULT_MAX_QUEUE_SIZE),
        (this.retryPolicy = new n({
          retryBaseDelayMs: e.retryBaseDelayMs,
          retryMaxDelayMs: e.retryMaxDelayMs ?? e.flushBackoffMaxMs,
          retryJitter: e.retryJitter,
          retryMaxAttempts: e.retryMaxAttempts,
        })),
        this.log("JSON SDK initializing"),
        !e.endpoint)
      )
        throw new i("endpoint is required", "initialization");
      if (!e.eventsRoute)
        throw new i("eventsRoute is required", "initialization");
      if (!e.authRoute) throw new i("authRoute is required", "initialization");
      if (!e.apiKey) throw new i("apiKey is required", "initialization");
      if (!e.encryptionKey)
        throw new i("encryptionKey is required", "initialization");
      if (!e.storageAdapter)
        throw new i("storageAdapter is required", "initialization");
      if (!e.sdkVersion)
        throw new i("sdkVersion is required", "initialization");
      ((this.initPromise = this.initializeQueue()),
        this.config.flushIntervalMs > 0 && this.startAutoFlush(),
        this.log("JSON SDK initialized"));
    }
    async initializeQueue() {
      try {
        await this.maybePurgeOnInit();
      } catch (e) {
        this.logError(
          "Purge on init failed; recording without purge",
          this.errorToLogContext(e),
        );
      }
      this.isInitialized = !0;
    }
    async ensureInit() {
      this.isInitialized || (await this.initPromise);
    }
    parseGeneration(e) {
      if (!e) return null;
      let t = String(e).trim();
      if (!/^\d+$/.test(t)) return null;
      let r = Number.parseInt(t, 10);
      return Number.isFinite(r) ? r : null;
    }
    async maybePurgeOnInit() {
      let e = this.parseGeneration(this.config.purgeGeneration),
        t = await this.storage.getItem(this.lastPurgeGenerationKey),
        r = this.parseGeneration(t);
      (null == r || (null != e && e > r)) &&
        (await this.storage.clearAll(),
        await this.storage.setItem(
          this.lastPurgeGenerationKey,
          String(e ?? 0),
        ));
    }
    isEventKey(e) {
      return (
        e.startsWith(this.versionedEventKeyPrefix) ||
        e.startsWith(this.legacyEventKeyPrefix)
      );
    }
    eventKeySortableId(e) {
      return e.startsWith(this.versionedEventKeyPrefix)
        ? e.slice(this.versionedEventKeyPrefix.length)
        : e.slice(this.legacyEventKeyPrefix.length);
    }
    async listEventKeys() {
      return (await this.storage.getAllKeys())
        .filter((e) => this.isEventKey(e))
        .sort((e, t) =>
          this.eventKeySortableId(e) < this.eventKeySortableId(t) ? -1 : 1,
        );
    }
    async enqueue(e) {
      await this.ensureInit();
      let t = `${Date.now().toString(36)}-${e.eventId}`,
        r = JSON.stringify({ v: this.config.sdkVersion, e: e });
      await this.storage.setItem(`${this.versionedEventKeyPrefix}${t}`, r);
      let n = await this.listEventKeys();
      if (n.length > this.maxQueueSize)
        for (let e of n.slice(0, n.length - this.maxQueueSize))
          await this.storage.removeItem(e);
      this.snapBackIdleInterval();
    }
    snapBackIdleInterval() {
      let e = this.autoFlushBaseMs();
      if (
        this.autoFlushActive &&
        this.config.idleFlushMaxIntervalMs &&
        !(this.idleIntervalMs <= e)
      ) {
        if (((this.idleIntervalMs = e), this.flushTimer)) {
          (clearTimeout(this.flushTimer), this.scheduleAutoFlush(e));
          return;
        }
        this.idleSnapBackPending = !0;
      }
    }
    async peekBatchGroups(e) {
      await this.ensureInit();
      let t = (await this.listEventKeys()).slice(0, Math.max(0, e)),
        r = new Map(),
        n = [];
      for (let e of t) {
        let t = await this.storage.getItem(e);
        if (!t) {
          n.push(e);
          continue;
        }
        try {
          let i = JSON.parse(t),
            o = this.config.sdkVersion,
            a = i;
          if (e.startsWith(this.versionedEventKeyPrefix)) {
            if ("string" != typeof i?.v || !s(i?.e)) {
              n.push(e);
              continue;
            }
            ((o = i.v), (a = i.e));
          }
          let l = r.get(o);
          (l || ((l = { keys: [], events: [] }), r.set(o, l)),
            l.keys.push(e),
            l.events.push(a));
        } catch {
          n.push(e);
        }
      }
      for (let e of n) await this.storage.removeItem(e);
      return Array.from(r.entries()).map(([e, t]) => ({ sdkVersion: e, ...t }));
    }
    async removeByKeys(e) {
      for (let t of e) await this.storage.removeItem(t);
    }
    async queueSize() {
      return (await this.ensureInit(), (await this.listEventKeys()).length);
    }
    async queueHasAny() {
      return (await this.queueSize()) > 0;
    }
    validateEventShape(e) {
      let t = [],
        r = [],
        n = (e, r) => {
          (null == r || "" === r) && t.push(e);
        };
      (n("sessionId", e.sessionId),
        n("sourceScreen", e.sourceScreen),
        n("sourceElement", e.sourceElement),
        n("sourceElementType", e.sourceElementType),
        n("platform", e.platform),
        n("eventType", e.eventType),
        n("eventBody", e.eventBody),
        n("userProperties", e.userProperties),
        ("number" == typeof e.sessionStartTime &&
          Number.isFinite(e.sessionStartTime)) ||
          r.push("sessionStartTime"));
      let a = o(e.clientContext);
      if (1 !== a.length)
        throw new i(
          "Exactly one clientContext variant is required",
          "validation",
          void 0,
          { variants: a.map(([e]) => e) },
        );
      if (
        (void 0 === e.eventBody ||
          null === e.eventBody ||
          s(e.eventBody) ||
          r.push("eventBody"),
        void 0 === e.userProperties ||
          null === e.userProperties ||
          s(e.userProperties) ||
          r.push("userProperties"),
        void 0 === e.experiments || s(e.experiments) || r.push("experiments"),
        t.length > 0 || r.length > 0)
      )
        throw new i("Invalid JSON user event shape", "validation", void 0, {
          missingFields: t,
          invalidFields: r,
        });
    }
    buildProtoJsonEvent(e, t) {
      this.config.validationEnabled && this.validateEventShape(e);
      let r = o(e.clientContext),
        n = String(e.eventType),
        i = {
          eventId: crypto.randomUUID(),
          eventTime: a(t.getTime()),
          sessionId: e.sessionId,
          sessionStartTime: a(e.sessionStartTime),
          sourceScreen: e.sourceScreen,
          sourceElement: e.sourceElement,
          sourceElementType: e.sourceElementType,
          platform: e.platform,
          userProperties: e.userProperties,
          experiments: e.experiments ?? {},
        };
      if (r.length > 0) {
        let [e, t] = r[0];
        i[e] = t;
      }
      return (
        e.ownershipGroup && (i.ownershipGroup = e.ownershipGroup),
        void 0 !== e.eventType &&
          null !== e.eventType &&
          void 0 !== e.eventBody &&
          null !== e.eventBody &&
          (i[n] = e.eventBody),
        i
      );
    }
    errorToLogContext(e) {
      return e instanceof i
        ? e.toLogContext()
        : e instanceof Error
          ? { errorName: e.name, errorMessage: e.message, errorStack: e.stack }
          : { errorMessage: String(e) };
    }
    async recordEvent(e, t) {
      try {
        this.log("Recording event");
        let r = this.buildProtoJsonEvent(e, t?.eventTime ?? new Date());
        (await this.enqueue(r),
          this.log("Event recorded", { eventId: r.eventId }));
      } catch (e) {
        throw (
          this.logError("Failed to record event", this.errorToLogContext(e)),
          e
        );
      }
    }
    async flush() {
      return this.runFlush(!1);
    }
    async runFlush(e) {
      for (; this.isFlushInProgress && this.ongoingFlushPromise; )
        (this.log("Flush coalesced"),
          await this.ongoingFlushPromise.catch(() => void 0));
      ((this.isFlushInProgress = !0),
        (this.ongoingFlushPromise = this.executeFlush(e)));
      try {
        return await this.ongoingFlushPromise;
      } finally {
        ((this.isFlushInProgress = !1), (this.ongoingFlushPromise = null));
      }
    }
    async getEventBufferSize() {
      return this.queueSize();
    }
    async shutdown() {
      (this.log("Shutting down JSON SDK"), this.stopAutoFlush());
      try {
        let e = await this.runFlush(!0);
        this.log("Shutdown complete", { eventsFlushed: e });
      } catch (e) {
        this.logError("Shutdown flush failed", this.errorToLogContext(e));
      }
    }
    async executeFlush(e) {
      let t = 0,
        r = this.retryPolicy.waitMs(Date.now());
      if (r > 0 && !e)
        return (
          this.log("Flush skipped: retry backoff in effect", { retryInMs: r }),
          0
        );
      for (; await this.queueHasAny(); ) {
        let e = await this.peekBatchGroups(this.config.batchSize);
        if (0 === e.reduce((e, t) => e + t.events.length, 0)) break;
        for (let r of e) {
          try {
            await this.sendEvents(r.events, r.sdkVersion);
          } catch (e) {
            throw (await this.recordBatchFailure(r.keys, e), e);
          }
          (await this.removeByKeys(r.keys),
            this.retryPolicy.recordSuccess(),
            (t += r.events.length));
        }
      }
      return (t > 0 && this.log("Flush completed", { totalFlushed: t }), t);
    }
    async recordBatchFailure(e, t) {
      let r = t instanceof i ? (t.retryAfterMs ?? 0) : 0,
        {
          attempt: n,
          delayMs: s,
          exhausted: o,
        } = this.retryPolicy.recordFailure(Date.now(), {
          cadenceMs: this.autoFlushBaseMs(),
          minDelayMs: r,
        });
      if (
        (this.log("Batch send failed; next attempt gated", {
          attempt: n,
          delayMs: s,
          exhausted: o,
        }),
        o)
      ) {
        this.logError("Dropping batch after exhausting retry attempts", {
          attempts: n,
          eventCount: e.length,
          lastError: this.errorToLogContext(t),
        });
        try {
          await this.removeByKeys(e);
        } catch (e) {
          this.logError(
            "Failed to drop exhausted batch",
            this.errorToLogContext(e),
          );
        }
      }
    }
    async sendEvents(e, t) {
      let r = this.buildUrl(this.config.endpoint, this.config.eventsRoute),
        n = JSON.stringify({ events: e }),
        s = new TextEncoder().encode(n),
        o = await this.encryptPayload(s),
        a = crypto.randomUUID(),
        u = await this.getAuthToken(),
        c = await this.computeHmacHex(u, a, o),
        h = {
          "Content-Type": "application/json",
          "X-Payload-Id": a,
          Authorization: `Bearer ${u}`,
          "X-Signature": c,
          "X-Signature-Alg": "HMAC-SHA256",
          "X-User-Events-SDK-Version": t,
          "X-User-Type": "USER",
        };
      (this.config.isInternalUser && (h["X-User-Type"] = "DEV"),
        this.config.isTestBuild && (h["X-Client-Environment"] = "TEST_BUILD"));
      let d = new AbortController(),
        y = setTimeout(() => d.abort(), this.config.timeout);
      try {
        let e = await fetch(r, {
          method: "POST",
          headers: h,
          body: o,
          signal: d.signal,
        });
        if ((clearTimeout(y), 200 !== e.status)) {
          401 === e.status && (this.cachedToken = void 0);
          let t = await e.text().catch(() => "");
          throw new i(
            `HTTP ${e.status}: ${t}`,
            "network",
            e.status,
            void 0,
            l.parseRetryAfterMs(e),
          );
        }
      } catch (t) {
        if ((clearTimeout(y), t instanceof i))
          throw (this.logError("Failed to send events", t.toLogContext()), t);
        let e = new i(
          `Network error: ${t instanceof Error ? t.message : "unknown"}`,
          "network",
        );
        throw (this.logError("Failed to send events", e.toLogContext()), e);
      }
    }
    async encryptPayload(e) {
      let t = (function (e) {
          if (void 0 !== globalThis.Buffer)
            return new Uint8Array(globalThis.Buffer.from(e, "base64"));
          let t = atob(e),
            r = new Uint8Array(t.length);
          for (let e = 0; e < t.length; e++) r[e] = t.charCodeAt(e);
          return r;
        })(this.config.encryptionKey),
        r = await crypto.subtle.importKey("raw", t, { name: "AES-GCM" }, !1, [
          "encrypt",
        ]),
        n = crypto.getRandomValues(new Uint8Array(12)),
        i = await crypto.subtle.encrypt({ name: "AES-GCM", iv: n }, r, e),
        s = new Uint8Array(n.length + i.byteLength);
      return (s.set(n, 0), s.set(new Uint8Array(i), n.length), s);
    }
    async computeHmacHex(e, t, r) {
      let n = new TextEncoder(),
        i = n.encode(e),
        s = n.encode(t),
        o = new Uint8Array(s.length + r.length);
      (o.set(s, 0), o.set(r, s.length));
      let a = await crypto.subtle.importKey(
        "raw",
        i,
        { name: "HMAC", hash: "SHA-256" },
        !1,
        ["sign"],
      );
      return Array.from(new Uint8Array(await crypto.subtle.sign("HMAC", a, o)))
        .map((e) => e.toString(16).padStart(2, "0"))
        .join("");
    }
    async getAuthToken() {
      let e = Date.now();
      if (this.cachedToken && this.cachedToken.expiresAtMs - 5e3 > e)
        return this.cachedToken.token;
      let { tokenProvider: t } = this.config;
      if (t)
        try {
          let r = await t();
          if (r?.token) {
            this.cachedToken = {
              token: r.token,
              expiresAtMs: e + l.getTokenCacheTtlMs(r.expiresIn),
            };
            let t = Number(r.flushIntervalMs);
            return (
              (this.serverIntervalHintMs = Number.isFinite(t) && t > 0 ? t : 0),
              r.token
            );
          }
          r &&
            this.logError(
              "Token provider returned no token; falling back to API key",
              {},
            );
        } catch (e) {
          this.logError("Token provider failed; falling back to API key", {
            errorMessage: e instanceof Error ? e.message : "unknown",
          });
        }
      return this.fetchTokenWithApiKey(e);
    }
    async fetchTokenWithApiKey(e) {
      let t = this.buildUrl(this.config.endpoint, this.config.authRoute),
        r = new AbortController(),
        n = setTimeout(() => r.abort(), this.config.timeout),
        s = this.exchangeDeviceId();
      try {
        let o = await fetch(t, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-API-Key": this.config.apiKey,
            ...(s ? { "Content-Type": "application/json" } : {}),
          },
          ...(s ? { body: JSON.stringify({ deviceId: s }) } : {}),
          signal: r.signal,
        });
        if ((clearTimeout(n), !o.ok))
          throw (
            (this.cachedToken = void 0),
            new i(
              `Auth failed: HTTP ${o.status}`,
              "authentication",
              o.status,
              void 0,
              l.parseRetryAfterMs(o),
            )
          );
        let a = await o.json();
        if (!a.token)
          throw new i("Auth response missing token", "authentication");
        this.cachedToken = {
          token: a.token,
          expiresAtMs: e + l.getTokenCacheTtlMs(a.expiresIn),
        };
        let u = Number(a.flushIntervalMs);
        return (
          (this.serverIntervalHintMs = Number.isFinite(u) && u > 0 ? u : 0),
          a.token
        );
      } catch (t) {
        if ((clearTimeout(n), (this.cachedToken = void 0), t instanceof i))
          throw (this.logError("Auth token fetch failed", t.toLogContext()), t);
        let e = new i(
          `Auth token fetch failed: ${t instanceof Error ? t.message : "unknown"}`,
          "authentication",
        );
        throw (this.logError("Auth token fetch failed", e.toLogContext()), e);
      }
    }
    exchangeDeviceId() {
      try {
        let e = this.config.deviceIdProvider?.();
        return e && new TextEncoder().encode(e).length <= 256 ? e : void 0;
      } catch (e) {
        this.log("deviceIdProvider failed; exchanging without a device id", {
          error: e instanceof Error ? e.message : String(e),
        });
        return;
      }
    }
    static getTokenCacheTtlMs(e) {
      let t =
        "number" == typeof e
          ? e
          : "string" == typeof e && e.trim().length > 0
            ? Number(e)
            : 0 / 0;
      return !Number.isFinite(t) || t <= 0 ? l.DEFAULT_TOKEN_CACHE_MS : 1e3 * t;
    }
    startAutoFlush() {
      this.autoFlushActive ||
        ((this.autoFlushActive = !0),
        (this.idleIntervalMs = this.config.flushIntervalMs),
        this.scheduleAutoFlush(this.config.flushIntervalMs));
    }
    scheduleAutoFlush(e) {
      ((this.flushTimer = setTimeout(async () => {
        this.flushTimer = void 0;
        let e = await this.runAutoFlushTick();
        this.autoFlushActive && this.scheduleAutoFlush(e);
      }, e)),
        "object" == typeof this.flushTimer &&
          "unref" in this.flushTimer &&
          this.flushTimer.unref());
    }
    autoFlushBaseMs() {
      return Math.max(this.config.flushIntervalMs, this.serverIntervalHintMs);
    }
    async runAutoFlushTick() {
      let e = this.autoFlushBaseMs();
      if (this.config.canFlush && !this.config.canFlush()) return e;
      try {
        let t = await this.flush(),
          r = this.retryPolicy.waitMs(Date.now());
        if (r > 0) return Math.max(e, r);
        let n = this.idleSnapBackPending;
        return (
          (this.idleSnapBackPending = !1),
          (this.idleIntervalMs =
            this.config.idleFlushMaxIntervalMs && 0 === t && !n
              ? Math.min(
                  2 * this.idleIntervalMs,
                  this.config.idleFlushMaxIntervalMs,
                )
              : e),
          this.idleIntervalMs
        );
      } catch (t) {
        return (
          this.logError("Auto flush failed", this.errorToLogContext(t)),
          Math.max(e, this.retryPolicy.waitMs(Date.now()))
        );
      }
    }
    stopAutoFlush() {
      ((this.autoFlushActive = !1),
        this.flushTimer &&
          (clearTimeout(this.flushTimer), (this.flushTimer = void 0)));
    }
    static parseRetryAfterMs(e) {
      let t = e.headers?.get?.("Retry-After");
      if (!t) return;
      let r = Number(t);
      if (Number.isFinite(r) && r >= 0) return 1e3 * r;
      let n = Date.parse(t);
      if (!Number.isNaN(n)) return Math.max(0, n - Date.now());
    }
    buildUrl(e, t) {
      let r = e.replace(/\/$/, ""),
        n = t.startsWith("/") ? t : `/${t}`;
      return `${r}${n}`;
    }
    log(e, t) {
      if (!this.config.debug) return;
      let r = `[UserEventJsonSDK] ${e}`;
      this.config.logger
        ? this.config.logger(r, t)
        : void 0 !== t
          ? console.log(r, t)
          : console.log(r);
    }
    logError(e, t) {
      let r = `[UserEventJsonSDK] ${e}`;
      this.config.errorLogger
        ? this.config.errorLogger(r, t)
        : void 0 !== t
          ? console.error(r, t)
          : console.error(r);
    }
  }
  ((l.DEFAULT_TOKEN_CACHE_MS = 3e5), (l.DEFAULT_MAX_QUEUE_SIZE = 1e3));
  var u = e.i(292686),
    c = e.i(254667),
    h = e.i(886813),
    d = e.i(350741),
    y = e.i(338319),
    f = e.i(852938),
    m = e.i(928468),
    g = e.i(806846),
    p = e.i(267350);
  class v {
    storage;
    constructor(e = !1) {
      if (e)
        if ((0, p.H)()) this.storage = sessionStorage;
        else throw Error("sessionStorage is not available in this environment");
      else if ((0, p.V)()) this.storage = localStorage;
      else throw Error("localStorage is not available in this environment");
    }
    getItem(e) {
      try {
        return this.storage.getItem(e);
      } catch (e) {
        return (console.warn("Failed to get item from storage:", e), null);
      }
    }
    setItem(e, t) {
      try {
        this.storage.setItem(e, t);
      } catch (e) {
        console.warn("Failed to set item in storage:", e);
      }
    }
    removeItem(e) {
      try {
        this.storage.removeItem(e);
      } catch (e) {
        console.warn("Failed to remove item from storage:", e);
      }
    }
    getAllKeys() {
      try {
        let e = [];
        for (let t = 0; t < this.storage.length; t++) {
          let r = this.storage.key(t);
          r && e.push(r);
        }
        return e;
      } catch (e) {
        return (console.warn("Failed to get all keys from storage:", e), []);
      }
    }
    clear() {
      try {
        this.storage.clear();
      } catch (e) {
        console.warn("Failed to clear storage:", e);
      }
    }
  }
  class w {
    storage = new Map();
    getItem(e) {
      return this.storage.get(e) || null;
    }
    setItem(e, t) {
      this.storage.set(e, t);
    }
    removeItem(e) {
      this.storage.delete(e);
    }
    getAllKeys() {
      return Array.from(this.storage.keys());
    }
    clear() {
      this.storage.clear();
    }
  }
  var S = e.i(498936),
    T = e.i(38279),
    A = e.i(60326),
    b = e.i(524711),
    E = e.i(394156);
  async function M(e) {
    try {
      let t = await e();
      return Number.isFinite(t) && t > 0 ? t : null;
    } catch {
      return null;
    }
  }
  async function I(e, t, r) {
    if (!e.success || !e.data) return null;
    let n = (0, S.f)(e.data);
    if (n.nativeBalance < 0 || n.totalValue < 0) return null;
    let i = n.solPrice > 0 ? n.solPrice : await M(r);
    return {
      solBalance: n.nativeBalance,
      totalBalance: n.totalValue,
      uniqueTokens: n.tokenCount,
      solPriceUsd: i,
      usdcBalance: t,
    };
  }
  async function F(e) {
    let t = (0, E.s)();
    if (!t) return null;
    try {
      let r = await t.ensureQueryData((0, b.g)({ userAddress: e }));
      return await I(r, (0, m.N)(e) ?? null, () =>
        t.ensureQueryData({
          queryKey: T.Q.SOL_PRICE,
          queryFn: () => (0, A.f)({}),
        }),
      );
    } catch {
      return null;
    }
  }
  let k = "true" === r.default.env.NEXT_PUBLIC_EVENT_TRACKING_ENABLED,
    x = null,
    P = null,
    D =
      /failed to fetch|load failed|networkerror|network request failed|aborted|timed out|timeout/i,
    C = (function (e = {}) {
      return {
        info: (t, r) => {
          k && console.log(`[UserEventsSDK] ${t}`, { ...e, ...r });
        },
        error: (t, r) => {
          c.y.error("user_events_sdk.error", { message: t, ...e, ...r });
        },
        warn: (t, r) => {
          c.y.warn("user_events_sdk.warn", { message: t, ...e, ...r });
        },
      };
    })({ file: "lib/user-events-sdk/recorder.ts", metadata: {} }),
    B = {
      sourceScreen: u.Ae.UNSPECIFIED,
      sourceElement: u.k9.UNSPECIFIED,
      sourceElementType: u.eD.UNSPECIFIED,
    };
  function _() {
    t?.flush().catch(() => void 0);
  }
  function K() {
    return (
      void 0 === t &&
        (t = (function () {
          try {
            var e;
            let t, r;
            try {
              t = new v();
            } catch (e) {
              (C.warn("localStorage not available, using memory storage", {
                error: String(e),
              }),
                (t = new w()));
            }
            let n =
                ((e = t),
                (r = async () => {
                  for (let t of e.getAllKeys())
                    t.startsWith("ue:") && e.removeItem(t);
                }),
                {
                  getItem: async (t) => e.getItem(t),
                  setItem: async (t, r) => e.setItem(t, r),
                  removeItem: async (t) => e.removeItem(t),
                  getAllKeys: async () => e.getAllKeys(),
                  clear: r,
                  clearAll: r,
                }),
              i = new l({
                endpoint: "https://w-iqit73m191t4x.lantern-echo.com",
                apiKey: "c3ee8338-645b-4a9a-984a-2ffcb258f1fb",
                encryptionKey: "l0JXSjWdZ6LqV70B2terI5CFqzO07fJiwl4k27Heg4c=",
                sdkVersion: "13.9.77",
                storageAdapter: n,
                eventsRoute: "/ingestion/events",
                authRoute: "/ingestion/token",
                timeout: 1e4,
                batchSize: 100,
                flushIntervalMs: 1e4,
                canFlush: () =>
                  "visible" === document.visibilityState &&
                  !1 !== navigator.onLine,
                validationEnabled: !1,
                debug: k && !1,
                isInternalUser: !1,
                isTestBuild: !1,
                logger: (e, t) => {
                  C.info(e, { metadata: t });
                },
                errorLogger: (e, t) => {
                  let r, n;
                  (((n =
                    "object" == typeof (r = t?.lastError) && null !== r
                      ? r
                      : t),
                  n?.errorStatusCode === void 0 &&
                    D.test(String(n?.errorMessage ?? "")))
                    ? C.warn
                    : C.error)(e, { error: e, metadata: t });
                },
              });
            return (
              window.addEventListener("pagehide", _),
              C.info("SDK initialized successfully"),
              i
            );
          } catch (e) {
            return (
              C.error("Failed to initialize SDK", { error: String(e) }),
              null
            );
          }
        })()),
      t
    );
  }
  async function $(e) {
    let t = Date.now();
    if (null !== x && t - x < 6e4) return null;
    let r = await (function (e) {
      if (P && P.wallet === e) return P.promise;
      let t = F(e).finally(() => {
        P?.promise === t && (P = null);
      });
      return ((P = { wallet: e, promise: t }), t);
    })(e);
    return ((x = r ? null : t), r);
  }
  async function N() {
    var e, t;
    let r = (0, y.e)(),
      n = null;
    r && (n = await $(r));
    let i = (0, d.D)()?.userId;
    return {
      walletAddress: r || void 0,
      ...(i ? { pumpUserId: i } : {}),
      visitorId: (0, p.w)(),
      walletBalanceSol: n?.solBalance,
      walletBalanceTotal: n?.totalBalance,
      uniqueTokensHeld: n?.uniqueTokens,
      tradableBalanceUsd: r
        ? ((e = n),
          (t = (0, m.N)(r) ?? n?.usdcBalance ?? void 0),
          e && void 0 !== t
            ? 0 === e.solBalance
              ? t
              : null !== e.solPriceUsd
                ? e.solBalance * e.solPriceUsd + t
                : void 0
            : void 0)
        : void 0,
      walletType: (0, p.P)(),
      deviceId: (0, h.$)(),
      flags: {},
    };
  }
  async function U(e, t, r, n) {
    let i = await N();
    n?.walletAddress && (i.walletAddress = n.walletAddress);
    let s = window.navigator.userAgent,
      o = await (0, p.c)(),
      a = {
        webClientProperties: {
          entrypoint: t.sourceScreen ? String(t.sourceScreen) : void 0,
          origin: window.location.origin,
          integration: "web",
          location: void 0,
          device: {
            screenHeight: window.screen.height,
            screenWidth: window.screen.width,
            viewportHeight: window.innerHeight,
            viewportWidth: window.innerWidth,
          },
          userAgent: {
            rawUserAgent: s,
            device: o.device,
            operatingSystem: o.operatingSystem,
            browser: o.browser,
            browserVersion: o.browserVersion,
          },
          url: {
            fullUrl: window.location.href,
            host: window.location.host,
            path: window.location.pathname,
          },
          businessUnit: u.lG.RETAIL,
        },
      },
      l = {
        ...{
          sessionId: (0, p.d)(),
          sessionStartTime: (0, p.l)(),
          sourceScreen: t.sourceScreen,
          sourceElement: t.sourceElement,
          sourceElementType: t.sourceElementType,
          platform: u.mI.WEB,
          clientContext: a,
          userProperties: i,
          experiments: "codeChangeFlag" in e ? (0, g.Z)() : void 0,
          ownershipGroup: t.ownershipGroup,
        },
        eventType: Object.keys(e)[0],
        eventBody: Object.values(e)[0],
      };
    await r.recordEvent(l);
  }
  function L(e, t) {
    let r,
      n = e.sourceContext ?? B;
    (0, f.C)() &&
      (function (e, t, r) {
        try {
          let n = Object.keys(e)[0] || "unknown",
            i = (e) => {
              let t = {};
              for (let [r, n] of Object.entries(e))
                "number" == typeof n && (t[n] = r);
              return t;
            },
            s = i(u.z),
            o = i(u.of),
            a = i(u.jc),
            l = [u.Ae, u.k9, u.eD, u.SI, u.Vx, u.EG, u.R1, u.A2, u.a6].map(i),
            c = {
              interactionType: i(u.EG),
              interaction_type: i(u.EG),
              tradeDirection: i(u.R1),
              trade_direction: i(u.R1),
              program: i(u.SI),
              blockchainProgram: i(u.SI),
              assetType: i(u.Vx),
              asset_type: i(u.Vx),
              walletType: i(u.A2),
              wallet_type: i(u.A2),
              attribution: i(u.a6),
              appAttribution: i(u.a6),
              sourceScreen: i(u.Ae),
              source_screen: i(u.Ae),
              sourceElement: i(u.k9),
              source_element: i(u.k9),
              sourceElementType: i(u.eD),
              source_element_type: i(u.eD),
              authVariant: i(u.LF),
              auth_variant: i(u.LF),
              flowType: i(u.LB),
              flow_type: i(u.LB),
              authMethod: i(u.pi),
              auth_method: i(u.pi),
              authType: i(u.Db),
              auth_type: i(u.Db),
              errorCategory: i(u.TF),
              error_category: i(u.TF),
              triggerReason: i(u.wv),
              trigger_reason: i(u.wv),
              fromLayout: i(u.A),
              from_layout: i(u.A),
              toLayout: i(u.A),
              to_layout: i(u.A),
              upsellType: i(u.Nb),
              upsell_type: i(u.Nb),
              shareType: i(u.qp),
              share_type: i(u.qp),
              shareMethod: i(u.hF),
              share_method: i(u.hF),
              "changeTradeModal.type": i(u.Z3),
              "changeTradeSettings.type": i(u.pB),
              "changeTradeSettings.settingType": i(u.go),
              "interactTradeAmount.tradeType": i(u.go),
              "changeChart.changeType": i(u.y6),
              "changeChartSettings.type": i(u.WQ),
              "codeChartLoaded.type": i(u.vv),
              "codeChartLoaded.provider": i(u.ex),
              "interactChartIcon.userType": i(u.jH),
              "interactChartIcon.displayType": i(u.rn),
              "changeFilterSettings.status": i(u.eI),
              "interactFollowUser.actionType": i(u.M3),
              "interactProfileSettings.actionType": i(u.St),
              "interactOpenDmInbox.entryPoint": s,
              "interactOpenDmThread.entryPoint": s,
              "seenDmMutualFollowGate.entryPoint": s,
              "interactStartDmConversation.entryPoint": s,
              "interactDmConversationPref.entryPoint": s,
              "interactDmConversationPref.action": i(u.IE),
              "interactDmConversationPref.muteDuration": i(u.Bz),
              "interactDmConversationPref.status": i(u.tL),
              "seenDmInbox.slice": i(u.zm),
              "interactSendDm.contentType": o,
              "codeDmSendSuccess.contentType": o,
              "codeDmSendFailed.contentType": o,
              "codeDmSendBlockedLocally.contentType": o,
              "interactSendDm.bodyLengthBucket": i(u.hS),
              "interactSendDm.attachmentSource": i(u.Gq),
              "interactSendDm.embedType": a,
              "interactOpenDmEmbed.embedType": a,
              "codeDmSendFailed.errorReason": i(u.vc),
              "codeDmSendBlockedLocally.blockReason": i(u.JD),
              "codeDmMessageDelivered.deliveryChannel": i(u.jC),
              "codeDmThreadClosed.exitReason": i(u.md),
            },
            d = new Set([
              "unreadConversationCount",
              "conversationCount",
              "unreadMessageTotal",
              "unreadCountOnOpen",
              "inboxPosition",
              "unreadCleared",
              "msSinceThreadOpen",
              "latencyMs",
              "deliveryLatencyMs",
              "durationMs",
              "messagesSent",
              "messagesReceivedInSession",
              "historyPagesLoaded",
              "messageAgeSeconds",
              "resultPosition",
              "mutualCandidateCount",
              "absolutePosition",
              "absolute_position",
              "relativePosition",
              "relative_position",
              "recommendationRank",
              "recommendation_rank",
              "recommendationScore",
              "recommendation_score",
              "solAmount",
              "sol_amount",
              "usdMarketCap",
              "usd_market_cap",
              "timestamp",
              "time",
            ]),
            m = (e, t) => {
              if (null == t) return;
              if ("string" == typeof t) return t;
              let r = ((e, t) => {
                if (null != t)
                  return "string" == typeof t ? t : (e[t] ?? String(t));
              })(e, t);
              return `${r} (${t})`;
            },
            v = (e, t) => {
              if (Array.isArray(e)) return e.map((e) => v(e, t));
              if (e && "object" == typeof e)
                return Object.fromEntries(
                  Object.entries(e).map(([e, t]) => [e, v(t, e)]),
                );
              if ("number" == typeof e) {
                if (t && d.has(t)) return e;
                let r = t && (c[`${n}.${t}`] ?? c[t]);
                if (r) {
                  let t = r[e];
                  if ("string" == typeof t) return `${t} (${e})`;
                }
                for (let t of l) {
                  let r = t[e];
                  if ("string" == typeof r) return `${r} (${e})`;
                }
              }
              return e;
            },
            w = v(e),
            S = {
              sourceScreen: m(i(u.Ae), t.sourceScreen),
              sourceElement: m(i(u.k9), t.sourceElement),
              sourceElementType: m(i(u.eD), t.sourceElementType),
              ownershipGroup: t.ownershipGroup,
            },
            T = (0, g.Z)(),
            A = {
              sessionId: (0, p.d)(),
              deviceId: (0, h.$)(),
              walletAddress: r?.walletAddress || (0, y.e)() || void 0,
            },
            b = "codeChangeFlag" === n;
          (0, f.J)({
            source: "user-events",
            name: n,
            payload: {
              userEventBody: w,
              sourceContext: S,
              debugContext: A,
              ...(b
                ? {
                    experiments: T,
                    flags: Object.fromEntries(
                      Object.entries(T).map(([e, t]) => [
                        e,
                        String(t?.served ?? t),
                      ]),
                    ),
                  }
                : {}),
            },
          });
        } catch (e) {
          C.error("Failed to prepare debug event", { error: String(e) });
        }
      })(e.userEventBody, n, e.options);
    try {
      r = K();
    } catch (t) {
      (C.error("Failed to prepare event", { error: String(t) }),
        e.options?.onFailed?.());
      return;
    }
    r
      ? U(e.userEventBody, n, r, e.options)
          .then(() => {
            e.options?.onFlushed?.();
          })
          .catch((r) => {
            C.error("Failed to process event", {
              error: String(r),
              eventType: Object.keys(e.userEventBody)[0] || void 0,
            });
            let n = (e.attempts ?? 0) + 1;
            t && n < 3 ? t({ ...e, attempts: n }) : e.options?.onFailed?.();
          })
      : e.options?.onFailed?.();
  }
  e.s(
    [
      "destroy",
      0,
      function () {
        (window.removeEventListener("pagehide", _),
          (t = void 0),
          (x = null),
          (P = null));
      },
      "ensureSdk",
      0,
      function () {
        return K();
      },
      "flushQueue",
      0,
      function (e, t) {
        for (let r of e) L(r, t);
      },
      "getSdk",
      0,
      K,
      "isInitialized",
      0,
      function () {
        return null != t;
      },
      "peekSdk",
      0,
      function () {
        return t;
      },
      "processQueuedEvent",
      0,
      L,
    ],
    270550,
  );
};
