// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  "use strict";
  let n = e.f({
      process: { id: () => 241457, module: () => e.r(241457) },
      "process/": { id: () => 241457, module: () => e.r(241457) },
    })("process/"),
    i = e.r(259390),
    {
      isReadable: o,
      isWritable: a,
      isIterable: s,
      isNodeStream: l,
      isReadableNodeStream: u,
      isWritableNodeStream: d,
      isDuplexNodeStream: c,
      isReadableStream: f,
      isWritableStream: h,
    } = e.r(283234),
    p = e.r(294343),
    {
      AbortError: g,
      codes: { ERR_INVALID_ARG_TYPE: b, ERR_INVALID_RETURN_VALUE: m },
    } = e.r(561079),
    { destroyer: y } = e.r(340202),
    w = e.r(654547),
    v = e.r(631284),
    _ = e.r(713386),
    { createDeferredPromise: S } = e.r(984651),
    E = e.r(70867),
    A = globalThis.Blob || i.Blob,
    x =
      void 0 !== A
        ? function (e) {
            return e instanceof A;
          }
        : function (e) {
            return !1;
          },
    M = globalThis.AbortController || e.r(712159).AbortController,
    { FunctionPrototypeCall: k } = e.r(763323);
  class P extends w {
    constructor(e) {
      (super(e),
        (null == e ? void 0 : e.readable) === !1 &&
          ((this._readableState.readable = !1),
          (this._readableState.ended = !0),
          (this._readableState.endEmitted = !0)),
        (null == e ? void 0 : e.writable) === !1 &&
          ((this._writableState.writable = !1),
          (this._writableState.ending = !0),
          (this._writableState.ended = !0),
          (this._writableState.finished = !0)));
    }
  }
  function O(e) {
    let t,
      r,
      n,
      i,
      s,
      l =
        e.readable && "function" != typeof e.readable.read
          ? v.wrap(e.readable)
          : e.readable,
      u = e.writable,
      d = !!o(l),
      c = !!a(u);
    function f(e) {
      let t = i;
      ((i = null), t ? t(e) : e && s.destroy(e));
    }
    return (
      (s = new P({
        readableObjectMode: !!(null != l && l.readableObjectMode),
        writableObjectMode: !!(null != u && u.writableObjectMode),
        readable: d,
        writable: c,
      })),
      c &&
        (p(u, (e) => {
          ((c = !1), e && y(l, e), f(e));
        }),
        (s._write = function (e, r, n) {
          u.write(e, r) ? n() : (t = n);
        }),
        (s._final = function (e) {
          (u.end(), (r = e));
        }),
        u.on("drain", function () {
          if (t) {
            let e = t;
            ((t = null), e());
          }
        }),
        u.on("finish", function () {
          if (r) {
            let e = r;
            ((r = null), e());
          }
        })),
      d &&
        (p(l, (e) => {
          ((d = !1), e && y(l, e), f(e));
        }),
        l.on("readable", function () {
          if (n) {
            let e = n;
            ((n = null), e());
          }
        }),
        l.on("end", function () {
          s.push(null);
        }),
        (s._read = function () {
          for (;;) {
            let e = l.read();
            if (null === e) {
              n = s._read;
              return;
            }
            if (!s.push(e)) return;
          }
        })),
      (s._destroy = function (e, o) {
        (e || null === i || (e = new g()),
          (n = null),
          (t = null),
          (r = null),
          null === i ? o(e) : ((i = o), y(u, e), y(l, e)));
      }),
      s
    );
  }
  t.exports = function e(t, r) {
    if (c(t)) return t;
    if (u(t)) return O({ readable: t });
    if (d(t)) return O({ writable: t });
    if (l(t)) return O({ writable: !1, readable: !1 });
    if (f(t)) return O({ readable: v.fromWeb(t) });
    if (h(t)) return O({ writable: _.fromWeb(t) });
    if ("function" == typeof t) {
      let {
        value: e,
        write: i,
        final: o,
        destroy: a,
      } = (function (e) {
        let { promise: t, resolve: r } = S(),
          i = new M(),
          o = i.signal;
        return {
          value: e(
            (async function* () {
              for (;;) {
                let e = t;
                t = null;
                let { chunk: i, done: a, cb: s } = await e;
                if ((n.nextTick(s), a)) return;
                if (o.aborted) throw new g(void 0, { cause: o.reason });
                (({ promise: t, resolve: r } = S()), yield i);
              }
            })(),
            { signal: o },
          ),
          write(e, t, n) {
            let i = r;
            ((r = null), i({ chunk: e, done: !1, cb: n }));
          },
          final(e) {
            let t = r;
            ((r = null), t({ done: !0, cb: e }));
          },
          destroy(e, t) {
            (i.abort(), t(e));
          },
        };
      })(t);
      if (s(e))
        return E(P, e, { objectMode: !0, write: i, final: o, destroy: a });
      let l = null == e ? void 0 : e.then;
      if ("function" == typeof l) {
        let t,
          r = k(
            l,
            e,
            (e) => {
              if (null != e) throw new m("nully", "body", e);
            },
            (e) => {
              y(t, e);
            },
          );
        return (t = new P({
          objectMode: !0,
          readable: !1,
          write: i,
          final(e) {
            o(async () => {
              try {
                (await r, n.nextTick(e, null));
              } catch (t) {
                n.nextTick(e, t);
              }
            });
          },
          destroy: a,
        }));
      }
      throw new m("Iterable, AsyncIterable or AsyncFunction", r, e);
    }
    if (x(t)) return e(t.arrayBuffer());
    if (s(t)) return E(P, t, { objectMode: !0, writable: !1 });
    if (
      f(null == t ? void 0 : t.readable) &&
      h(null == t ? void 0 : t.writable)
    )
      return P.fromWeb(t);
    if (
      "object" == typeof (null == t ? void 0 : t.writable) ||
      "object" == typeof (null == t ? void 0 : t.readable)
    )
      return O({
        readable:
          null != t && t.readable
            ? u(null == t ? void 0 : t.readable)
              ? null == t
                ? void 0
                : t.readable
              : e(t.readable)
            : void 0,
        writable:
          null != t && t.writable
            ? d(null == t ? void 0 : t.writable)
              ? null == t
                ? void 0
                : t.writable
              : e(t.writable)
            : void 0,
      });
    let i = null == t ? void 0 : t.then;
    if ("function" == typeof i) {
      let e;
      return (
        k(
          i,
          t,
          (t) => {
            (null != t && e.push(t), e.push(null));
          },
          (t) => {
            y(e, t);
          },
        ),
        (e = new P({ objectMode: !0, writable: !1, read() {} }))
      );
    }
    throw new b(
      r,
      [
        "Blob",
        "ReadableStream",
        "WritableStream",
        "Stream",
        "Iterable",
        "AsyncIterable",
        "Function",
        "{ readable, writable } pair",
        "Promise",
      ],
      t,
    );
  };
};
