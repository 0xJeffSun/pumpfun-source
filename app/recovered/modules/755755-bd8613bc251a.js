// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  "use strict";
  let n,
    i,
    o,
    a = e.f({
      process: { id: () => 241457, module: () => e.r(241457) },
      "process/": { id: () => 241457, module: () => e.r(241457) },
    })("process/"),
    {
      ArrayIsArray: s,
      Promise: l,
      SymbolAsyncIterator: u,
      SymbolDispose: d,
    } = e.r(763323),
    c = e.r(294343),
    { once: f } = e.r(984651),
    h = e.r(340202),
    p = e.r(654547),
    {
      aggregateTwoErrors: g,
      codes: {
        ERR_INVALID_ARG_TYPE: b,
        ERR_INVALID_RETURN_VALUE: m,
        ERR_MISSING_ARGS: y,
        ERR_STREAM_DESTROYED: w,
        ERR_STREAM_PREMATURE_CLOSE: v,
      },
      AbortError: _,
    } = e.r(561079),
    { validateFunction: S, validateAbortSignal: E } = e.r(938720),
    {
      isIterable: A,
      isReadable: x,
      isReadableNodeStream: M,
      isNodeStream: k,
      isTransformStream: P,
      isWebStream: O,
      isReadableStream: B,
      isReadableFinished: I,
    } = e.r(283234),
    R = globalThis.AbortController || e.r(712159).AbortController;
  function T(e, t, r) {
    let n = !1;
    return (
      e.on("close", () => {
        n = !0;
      }),
      {
        destroy: (t) => {
          n || ((n = !0), h.destroyer(e, t || new w("pipe")));
        },
        cleanup: c(e, { readable: t, writable: r }, (e) => {
          n = !e;
        }),
      }
    );
  }
  function C(e) {
    if (A(e)) return e;
    if (M(e)) return j(e);
    throw new b("val", ["Readable", "Iterable", "AsyncIterable"], e);
  }
  async function* j(t) {
    (i || (i = e.r(631284)), yield* i.prototype[u].call(t));
  }
  async function N(e, t, r, { end: n }) {
    let i,
      o = null,
      a = (e) => {
        if ((e && (i = e), o)) {
          let e = o;
          ((o = null), e());
        }
      },
      s = () =>
        new l((e, t) => {
          i
            ? t(i)
            : (o = () => {
                i ? t(i) : e();
              });
        });
    t.on("drain", a);
    let u = c(t, { readable: !1 }, a);
    try {
      for await (let r of (t.writableNeedDrain && (await s()), e))
        t.write(r) || (await s());
      (n && (t.end(), await s()), r());
    } catch (e) {
      r(i !== e ? g(i, e) : e);
    } finally {
      (u(), t.off("drain", a));
    }
  }
  async function L(e, t, r, { end: n }) {
    P(t) && (t = t.writable);
    let i = t.getWriter();
    try {
      for await (let t of e) (await i.ready, i.write(t).catch(() => {}));
      (await i.ready, n && (await i.close()), r());
    } catch (e) {
      try {
        (await i.abort(e), r(e));
      } catch (e) {
        r(e);
      }
    }
  }
  function F(t, r, i) {
    let l, u, f, h;
    if ((1 === t.length && s(t[0]) && (t = t[0]), t.length < 2))
      throw new y("streams");
    let g = new R(),
      w = g.signal,
      S = null == i ? void 0 : i.signal,
      j = [];
    function F() {
      W(new _());
    }
    (E(S, "options.signal"),
      (o = o || e.r(984651).addAbortListener),
      S && (l = o(S, F)));
    let q = [],
      D = 0;
    function U(e) {
      W(e, 0 == --D);
    }
    function W(e, t) {
      var n;
      if (
        (e && (!u || "ERR_STREAM_PREMATURE_CLOSE" === u.code) && (u = e),
        u || t)
      ) {
        for (; q.length; ) q.shift()(u);
        (null == (n = l) || n[d](),
          g.abort(),
          t && (u || j.forEach((e) => e()), a.nextTick(r, u, f)));
      }
    }
    for (let r = 0; r < t.length; r++) {
      let o = t[r],
        s = r < t.length - 1,
        l = r > 0,
        u = s || (null == i ? void 0 : i.end) !== !1,
        d = r === t.length - 1;
      if (k(o)) {
        if (u) {
          let { destroy: e, cleanup: t } = T(o, s, l);
          (q.push(e), x(o) && d && j.push(t));
        }
        function $(e) {
          e &&
            "AbortError" !== e.name &&
            "ERR_STREAM_PREMATURE_CLOSE" !== e.code &&
            U(e);
        }
        (o.on("error", $),
          x(o) &&
            d &&
            j.push(() => {
              o.removeListener("error", $);
            }));
      }
      if (0 === r)
        if ("function" == typeof o) {
          if (!A((h = o({ signal: w }))))
            throw new m("Iterable, AsyncIterable or Stream", "source", h);
        } else h = A(o) || M(o) || P(o) ? o : p.from(o);
      else if ("function" == typeof o) {
        var z, H;
        if (
          ((h = o(
            (h = P(h) ? C(null == (z = h) ? void 0 : z.readable) : C(h)),
            { signal: w },
          )),
          s)
        ) {
          if (!A(h, !0)) throw new m("AsyncIterable", `transform[${r - 1}]`, h);
        } else {
          n || (n = e.r(909271));
          let t = new n({ objectMode: !0 }),
            r = null == (H = h) ? void 0 : H.then;
          if ("function" == typeof r)
            (D++,
              r.call(
                h,
                (e) => {
                  ((f = e),
                    null != e && t.write(e),
                    u && t.end(),
                    a.nextTick(U));
                },
                (e) => {
                  (t.destroy(e), a.nextTick(U, e));
                },
              ));
          else if (A(h, !0)) (D++, N(h, t, U, { end: u }));
          else if (B(h) || P(h)) {
            let e = h.readable || h;
            (D++, N(e, t, U, { end: u }));
          } else throw new m("AsyncIterable or Promise", "destination", h);
          let { destroy: i, cleanup: o } = T((h = t), !1, !0);
          (q.push(i), d && j.push(o));
        }
      } else if (k(o)) {
        if (M(h)) {
          D += 2;
          let e = (function (e, t, r, { end: n }) {
            let i = !1;
            if (
              (t.on("close", () => {
                i || r(new v());
              }),
              e.pipe(t, { end: !1 }),
              n)
            ) {
              function o() {
                ((i = !0), t.end());
              }
              I(e) ? a.nextTick(o) : e.once("end", o);
            } else r();
            return (
              c(e, { readable: !0, writable: !1 }, (t) => {
                let n = e._readableState;
                t &&
                "ERR_STREAM_PREMATURE_CLOSE" === t.code &&
                n &&
                n.ended &&
                !n.errored &&
                !n.errorEmitted
                  ? e.once("end", r).once("error", r)
                  : r(t);
              }),
              c(t, { readable: !1, writable: !0 }, r)
            );
          })(h, o, U, { end: u });
          x(o) && d && j.push(e);
        } else if (P(h) || B(h)) {
          let e = h.readable || h;
          (D++, N(e, o, U, { end: u }));
        } else if (A(h)) (D++, N(h, o, U, { end: u }));
        else
          throw new b(
            "val",
            [
              "Readable",
              "Iterable",
              "AsyncIterable",
              "ReadableStream",
              "TransformStream",
            ],
            h,
          );
        h = o;
      } else if (O(o)) {
        if (M(h)) (D++, L(C(h), o, U, { end: u }));
        else if (B(h) || A(h)) (D++, L(h, o, U, { end: u }));
        else if (P(h)) (D++, L(h.readable, o, U, { end: u }));
        else
          throw new b(
            "val",
            [
              "Readable",
              "Iterable",
              "AsyncIterable",
              "ReadableStream",
              "TransformStream",
            ],
            h,
          );
        h = o;
      } else h = p.from(o);
    }
    return (
      ((null != w && w.aborted) || (null != S && S.aborted)) && a.nextTick(F),
      h
    );
  }
  t.exports = {
    pipelineImpl: F,
    pipeline: function (...e) {
      return F(
        e,
        f((S(e[e.length - 1], "streams[stream.length - 1]"), e.pop())),
      );
    },
  };
};
