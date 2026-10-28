// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(26566),
    n = e.i(548801),
    r = e.i(746685);
  class a extends n.f {
    constructor({
      body: e,
      cause: n,
      details: a,
      headers: i,
      status: s,
      url: o,
    }) {
      (super("HTTP request failed.", {
        cause: n,
        details: a,
        metaMessages: [
          s && `Status: ${s}`,
          `URL: ${(0, r.p)(o)}`,
          e && `Request body: ${(0, t.f)(e)}`,
        ].filter(Boolean),
        name: "HttpRequestError",
      }),
        Object.defineProperty(this, "body", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "headers", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "status", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "url", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.body = e),
        (this.headers = i),
        (this.status = s),
        (this.url = o));
    }
  }
  n.f;
  class i extends n.f {
    constructor({ body: e, error: n, url: a }) {
      (super("RPC Request failed.", {
        cause: n,
        details: n.message,
        metaMessages: [`URL: ${(0, r.p)(a)}`, `Request body: ${(0, t.f)(e)}`],
        name: "RpcRequestError",
      }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "url", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.code = n.code),
        (this.data = n.data),
        (this.url = a));
    }
  }
  n.f;
  class s extends n.f {
    constructor({ body: e, url: n }) {
      (super("The request took too long to respond.", {
        details: "The request timed out.",
        metaMessages: [`URL: ${(0, r.p)(n)}`, `Request body: ${(0, t.f)(e)}`],
        name: "TimeoutError",
      }),
        Object.defineProperty(this, "url", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.url = n));
    }
  }
  e.s(["y", 0, a, "V", 0, i, "t", 0, s]);
};
