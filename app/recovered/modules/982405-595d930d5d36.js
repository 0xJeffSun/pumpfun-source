// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(225587),
    n = e.i(927974),
    r = e.i(690651);
  class i extends n.f {
    constructor({
      body: e,
      cause: n,
      details: i,
      headers: a,
      status: s,
      url: o,
    }) {
      (super("HTTP request failed.", {
        cause: n,
        details: i,
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
        (this.headers = a),
        (this.status = s),
        (this.url = o));
    }
  }
  class a extends n.f {
    constructor({ maxSize: e, size: t }) {
      (super("HTTP response body exceeded the size limit.", {
        metaMessages: [`Max: ${e} bytes`, `Received: ${t} bytes`],
        name: "ResponseBodyTooLargeError",
      }),
        Object.defineProperty(this, "maxSize", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "size", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.maxSize = e),
        (this.size = t));
    }
  }
  n.f;
  class s extends n.f {
    constructor({ body: e, error: n, url: i }) {
      (super("RPC Request failed.", {
        cause: n,
        details: n.message,
        metaMessages: [`URL: ${(0, r.p)(i)}`, `Request body: ${(0, t.f)(e)}`],
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
        (this.url = i));
    }
  }
  n.f;
  class o extends n.f {
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
  e.s(["y", 0, i, "S", 0, a, "V", 0, s, "t", 0, o]);
};
