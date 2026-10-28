// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(393547),
    r = e.i(532617),
    n = e.i(575663);
  class o extends r.f {
    constructor({
      body: e,
      cause: r,
      details: o,
      headers: s,
      status: a,
      url: i,
    }) {
      (super("HTTP request failed.", {
        cause: r,
        details: o,
        metaMessages: [
          a && `Status: ${a}`,
          `URL: ${(0, n.p)(i)}`,
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
        (this.headers = s),
        (this.status = a),
        (this.url = i));
    }
  }
  r.f;
  class s extends r.f {
    constructor({ body: e, error: r, url: o }) {
      (super("RPC Request failed.", {
        cause: r,
        details: r.message,
        metaMessages: [`URL: ${(0, n.p)(o)}`, `Request body: ${(0, t.f)(e)}`],
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
        (this.code = r.code),
        (this.data = r.data),
        (this.url = o));
    }
  }
  r.f;
  class a extends r.f {
    constructor({ body: e, url: r }) {
      (super("The request took too long to respond.", {
        details: "The request timed out.",
        metaMessages: [`URL: ${(0, n.p)(r)}`, `Request body: ${(0, t.f)(e)}`],
        name: "TimeoutError",
      }),
        Object.defineProperty(this, "url", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.url = r));
    }
  }
  e.s(["y", 0, o, "V", 0, s, "t", 0, a]);
};
