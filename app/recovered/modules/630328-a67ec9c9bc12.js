// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(411365),
    n = e.i(433710),
    r = e.i(194672),
    i = e.i(895453),
    s = e.i(63794),
    o = e.i(775975);
  e.i(82314);
  var a = e.i(354878),
    l = e.i(848686),
    u = e.i(91623),
    c = e.i(883589),
    d = e.i(600937);
  let p = new Map();
  function f(e) {
    for (let t of p.keys()) t < e && p.delete(t);
  }
  var m = e.i(237790);
  let v = /\/(?![vV]\d{1,2}\/)([^/\d?]*\d+[^/?]*)/g,
    g = (e, t) => e || (t ? t.replace(v, "/?") : "/");
  var h = e.i(760474);
  let w = {
    sampleIntervalMs: 10,
    collectIntervalMs: 6e4,
    minProfileDurationMs: 5e3,
    minNumberOfSamples: 50,
  };
  e.s(
    [
      "DEFAULT_RUM_PROFILER_CONFIGURATION",
      0,
      w,
      "createRumProfiler",
      0,
      function (e, v, b, y, k, I = w) {
        let T,
          M,
          S,
          _ =
            ((M = (0, l.f)(
              [e.profilingEndpointBuilder],
              e.batchBytesLimit,
              (e) => {
                (v.notify(14, { error: e }),
                  (0, a.Y)("Error reported to customer", {
                    "error.message": e.message,
                  }));
              },
            )),
            (S = k(6)),
            {
              async send({ event: e, ...t }) {
                let n = new FormData(),
                  r = (0, u.x)(e);
                if (!r) throw Error("Failed to serialize event");
                n.append(
                  "event",
                  new Blob([r], { type: "application/json" }),
                  "event.json",
                );
                let i = r.length;
                for (let [e, r] of (0, c._)(t)) {
                  let t = (0, u.x)(r);
                  if (!t) throw Error("Failed to serialize attachment");
                  let s = await (function (e, t) {
                    return new Promise((n) => {
                      (e.write(t),
                        e.finish((e) => {
                          n(e);
                        }));
                    });
                  })(S, t);
                  ((i += s.outputBytesCount),
                    n.append(e, new Blob([s.output]), e));
                }
                M.send({ data: n, bytesCount: i });
              },
            }),
          E = (0, d.b)(d.T.LONG_ANIMATION_FRAME),
          O = [],
          P = { state: "stopped" };
        function N() {
          let t,
            a = (0, s.K)().Profiler;
          if (!a)
            throw (
              y.set({
                status: "error",
                error_reason: "not-supported-by-browser",
              }),
              Error("RUM Profiler is not supported in this browser.")
            );
          R(P).catch(r.v);
          let { cleanupTasks: l, observer: u } = (function (t) {
            let n;
            if ("running" === t.state)
              return { cleanupTasks: t.cleanupTasks, observer: t.observer };
            let r = [];
            if (e.trackLongTasks) {
              (n = new PerformanceObserver(D)).observe({
                entryTypes: [E ? "long-animation-frame" : "longtask"],
              });
              let e = v.subscribe(12, (e) => {
                !(function ({ rawRumEvent: e, startTime: t }) {
                  var n;
                  e.type === m.A.LONG_TASK &&
                    ((n = e.long_task.id), p.set(t, n));
                })(e);
              });
              (r.push(() => (null == n ? void 0 : n.disconnect())),
                r.push(e.unsubscribe));
            }
            let i = v.subscribe(2, (e) => {
              let t = {
                viewId: e.id,
                viewName: g(e.name, document.location.pathname),
                startClocks: e.startClocks,
              };
              (C(t), (T = t));
            });
            return (r.push(i.unsubscribe), { cleanupTasks: r, observer: n });
          })(P);
          try {
            t = new a({
              sampleInterval: I.sampleIntervalMs,
              maxBufferSize: Math.round(
                (1.5 * I.collectIntervalMs) / I.sampleIntervalMs,
              ),
            });
          } catch (e) {
            e instanceof Error &&
            e.message.includes("disabled by Document Policy")
              ? (i.s.warn(
                  "[DD_RUM] Profiler startup failed. Ensure your server includes the `Document-Policy: js-profiling` response header when serving HTML pages.",
                  e,
                ),
                y.set({
                  status: "error",
                  error_reason: "missing-document-policy-header",
                }))
              : y.set({
                  status: "error",
                  error_reason: "unexpected-exception",
                });
            return;
          }
          (y.set({ status: "running", error_reason: void 0 }),
            (P = {
              state: "running",
              startClocks: (0, o.o)(),
              profiler: t,
              timeoutId: (0, n.Q)(N, I.collectIntervalMs),
              longTasks: [],
              views: [],
              cleanupTasks: l,
              observer: u,
            }),
            C(T),
            t.addEventListener("samplebufferfull", A));
        }
        async function R(t) {
          var i, s;
          if ("running" !== t.state) return;
          (L(
            null != (s = null == (i = t.observer) ? void 0 : i.takeRecords())
              ? s
              : [],
          ),
            (0, n.z)(t.timeoutId),
            t.profiler.removeEventListener("samplebufferfull", A));
          let { startClocks: a, longTasks: l, views: u } = t,
            c = (0, o.o)();
          await t.profiler
            .stop()
            .then((t) => {
              let n = (0, o.o)(),
                r = l.length > 0,
                i = (0, o.G)(a.timeStamp, n.timeStamp) < I.minProfileDurationMs,
                s =
                  (function (e) {
                    let t = 0;
                    for (let n of e) void 0 !== n.stackId && t++;
                    return t;
                  })(t.samples) < I.minNumberOfSamples;
              (!r && (i || s)) ||
                ((function (t) {
                  var n, r, i, s;
                  let a,
                    l,
                    u,
                    c = null == (n = b.findTrackedSession()) ? void 0 : n.id,
                    d = {
                      event:
                        ((r = t),
                        (i = e),
                        (s = c),
                        (a = (0, h.z)(i)),
                        (l = (function (e, t, n) {
                          let r = { application: { id: t } };
                          n && (r.session = { id: n });
                          let { ids: i, names: s } = (function (e) {
                            let t = { ids: [], names: [] };
                            for (let n of e)
                              (t.ids.push(n.viewId),
                                n.viewName && t.names.push(n.viewName));
                            return (
                              (t.names = Array.from(new Set(t.names))),
                              t
                            );
                          })(e.views);
                          i.length && (r.view = { id: i, name: s });
                          let o = e.longTasks
                            .map((e) => e.id)
                            .filter((e) => void 0 !== e);
                          return (o.length && (r.long_task = { id: o }), r);
                        })(r, i.applicationId, s)),
                        (u = a.concat([
                          "language:javascript",
                          "runtime:chrome",
                          "family:chrome",
                          "host:browser",
                        ])),
                        {
                          ...l,
                          attachments: ["wall-time.json"],
                          start: new Date(
                            r.startClocks.timeStamp,
                          ).toISOString(),
                          end: new Date(r.endClocks.timeStamp).toISOString(),
                          family: "chrome",
                          runtime: "chrome",
                          format: "json",
                          version: 4,
                          tags_profiler: u.join(","),
                          _dd: { clock_drift: (0, o.K)() },
                        }),
                      "wall-time.json": t,
                    };
                  _.send(d);
                })(
                  Object.assign(t, {
                    startClocks: a,
                    endClocks: n,
                    clocksOrigin: (0, o.t)(),
                    longTasks: l,
                    views: u,
                    sampleInterval: I.sampleIntervalMs,
                  }),
                ),
                f(c.relative));
            })
            .catch(r.v);
        }
        async function j(e) {
          "running" === P.state &&
            (P.cleanupTasks.forEach((e) => e()),
            await R(P),
            (P = { state: e }));
        }
        function C(e) {
          "running" === P.state && e && P.views.push(e);
        }
        function A() {
          N();
        }
        function D(e) {
          L(e.getEntries());
        }
        function L(e) {
          if ("running" === P.state)
            for (let n of e) {
              var t;
              if (n.duration < I.sampleIntervalMs) continue;
              let e = (0, o.j)(n.startTime),
                r = ((t = e.relative), p.get(t));
              P.longTasks.push({
                id: r,
                duration: n.duration,
                entryType: n.entryType,
                startClocks: e,
              });
            }
        }
        function B() {
          "hidden" === document.visibilityState && "running" === P.state
            ? j("paused").catch(r.v)
            : "visible" === document.visibilityState &&
              "paused" === P.state &&
              N();
        }
        function F() {
          N();
        }
        return {
          start: function (n) {
            "running" !== P.state &&
              ((T = n
                ? {
                    startClocks: n.startClocks,
                    viewId: n.id,
                    viewName: g(n.name, document.location.pathname),
                  }
                : void 0),
              O.push(
                (0, t.W)(e, window, "visibilitychange", B).stop,
                (0, t.W)(e, window, "beforeunload", F).stop,
              ),
              N());
          },
          stop: async function e() {
            (await j("stopped"),
              O.forEach((e) => e()),
              f((0, o.o)().relative),
              y.set({ status: "stopped", error_reason: void 0 }));
          },
          isStopped: function () {
            return "stopped" === P.state;
          },
          isRunning: function () {
            return "running" === P.state;
          },
          isPaused: function () {
            return "paused" === P.state;
          },
        };
      },
    ],
    630328,
  );
};
