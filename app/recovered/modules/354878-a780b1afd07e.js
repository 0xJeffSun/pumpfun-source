// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var n = e.i(895453),
    r = e.i(80400),
    i = e.i(750671),
    o = e.i(333575),
    s = e.i(760474),
    u = e.i(303509),
    a = e.i(526658),
    l = e.i(775975),
    c = e.i(194672),
    d = e.i(452495),
    f = e.i(589036),
    p = e.i(91623),
    g = e.i(54913),
    y = e.i(305918),
    m = e.i(654518),
    v = e.i(715363),
    h = e.i(181349),
    b = e.i(848686),
    S = e.i(883589),
    w = e.i(436509),
    _ = e.i(645912);
  function k({
    encoder: e,
    request: t,
    flushController: r,
    messageBytesLimit: i,
  }) {
    let o = {},
      s = r.flushObservable.subscribe((n) =>
        (function (n) {
          let r = (0, S.k)(o).join("\n");
          o = {};
          let i = (0, w.e)(n.reason),
            s = i ? t.sendOnExit : t.send;
          if (i && e.isAsync) {
            let t = e.finishSync();
            t.outputBytesCount && s(E(t));
            let n = [t.pendingData, r].filter(Boolean).join("\n");
            n && s({ data: n, bytesCount: (0, _.C)(n) });
          } else
            (r &&
              e.write(
                e.isEmpty
                  ? r
                  : `
${r}`,
              ),
              e.finish((e) => {
                s(E(e));
              }));
        })(n),
      );
    function u(t, s) {
      let u,
        a,
        l = (0, p.x)(t),
        c = e.estimateEncodedBytesCount(l);
      c >= i
        ? n.s.warn(
            `Discarded a message whose size was bigger than the maximum allowed size ${i}KB. ${n.Z} ${n.y}/#technical-limitations`,
          )
        : (void 0 !== s &&
            void 0 !== o[s] &&
            ((u = o[s]),
            delete o[s],
            (a = e.estimateEncodedBytesCount(u)),
            r.notifyAfterRemoveMessage(a)),
          r.notifyBeforeAddMessage(c),
          void 0 !== s
            ? ((o[s] = l), r.notifyAfterAddMessage())
            : e.write(
                e.isEmpty
                  ? l
                  : `
${l}`,
                (e) => {
                  r.notifyAfterAddMessage(e - c);
                },
              ));
    }
    return { flushController: r, add: u, upsert: u, stop: s.unsubscribe };
  }
  function E(e) {
    return {
      data:
        "string" == typeof e.output
          ? e.output
          : new Blob([e.output], { type: "text/plain" }),
      bytesCount: e.outputBytesCount,
      encoding: e.encoding,
    };
  }
  e.s(["f", 0, k], 528276);
  let O = "DISCARDED",
    x = "SKIPPED";
  e.s(
    [
      "a",
      0,
      O,
      "Y",
      0,
      x,
      "x",
      0,
      function () {
        let e = {};
        return {
          register: (t, n) => (
            e[t] || (e[t] = []),
            e[t].push(n),
            {
              unregister: () => {
                e[t] = e[t].filter((e) => e !== n);
              },
            }
          ),
          triggerHook(t, n) {
            let r = e[t] || [],
              i = [];
            for (let e of r) {
              let t = e(n);
              if (t === O) return O;
              t !== x && i.push(t);
            }
            return (0, g.i)(...i);
          },
        };
      },
    ],
    748877,
  );
  var C = e.i(63794);
  let T = "configuration",
    R = "usage",
    A = [
      "https://www.datadoghq-browser-agent.com",
      "https://www.datad0g-browser-agent.com",
      "https://d3uc069fcn7uxw.cloudfront.net",
      "https://d20xtzwzcl0ceb.cloudfront.net",
      "http://localhost",
      "<anonymous>",
    ],
    $ = [u.d];
  function P() {
    return (t || (t = new a.O(100)), t);
  }
  function I(e, t) {
    P().notify({
      rawEvent: {
        type: "log",
        status: "error",
        ...(function (e) {
          if ((0, r.b)(e)) {
            var t;
            let n = (0, y.E)(e);
            return {
              error: {
                kind: n.name,
                stack: (0, i.n)(
                  (((t = n).stack = t.stack.filter(
                    (e) => !e.url || A.some((t) => e.url.startsWith(t)),
                  )),
                  t),
                ),
              },
              message: n.message,
            };
          }
          return { error: { stack: r.Z }, message: `Uncaught ${(0, p.x)(e)}` };
        })(e),
        ...t,
      },
    });
  }
  e.s(
    [
      "c",
      0,
      function (e) {
        P().notify({ rawEvent: { type: T, configuration: e } });
      },
      "Y",
      0,
      function (e, t) {
        ((0, c.u)(n.T.debug, e, t),
          P().notify({
            rawEvent: { type: "log", message: e, status: "debug", ...t },
          }));
      },
      "D",
      0,
      I,
      "W",
      0,
      function (e, t) {
        P().notify({
          rawEvent: { type: "log", message: e, status: "debug", ...t },
          metricName: e,
        });
      },
      "x",
      0,
      function (e) {
        P().notify({ rawEvent: { type: R, usage: e } });
      },
      "O",
      0,
      function (e, t, n, r, i, y) {
        let S = new a.S(),
          { stop: w } = (function (e, t, n, r, i) {
            let o = [];
            if ((0, v.K)()) {
              let e = (0, v.g)(),
                t = i.subscribe((t) => e.send("internal_telemetry", t));
              o.push(t.unsubscribe);
            } else {
              let s = [e.rumEndpointBuilder];
              e.replica &&
                e.site === u.f &&
                s.push(e.replica.rumEndpointBuilder);
              let l = k({
                encoder: r(4),
                request: (0, b.f)(s, e.batchBytesLimit, t),
                flushController: (0, h.f)({
                  messagesLimit: e.batchMessagesLimit,
                  bytesLimit: e.batchBytesLimit,
                  durationLimit: e.flushTimeout,
                  pageMayExitObservable: n,
                  sessionExpireObservable: new a.S(),
                }),
                messageBytesLimit: e.messageBytesLimit,
              });
              o.push(l.stop);
              let c = i.subscribe(l.add);
              o.push(c.unsubscribe);
            }
            return { stop: () => o.forEach((e) => e()) };
          })(t, r, i, y, S),
          { enabled: _, metricsEnabled: E } = (function (e, t, n, r, i = 1) {
            var u;
            let a = {},
              y = !$.includes(t.site) && (0, f.e)(t.telemetrySampleRate),
              v = {
                log: y,
                [T]: y && (0, f.e)(t.telemetryConfigurationSampleRate),
                [R]: y && (0, f.e)(t.telemetryUsageSampleRate),
                metric: y && (0, f.e)(i),
              },
              h = {
                is_local_file:
                  (null == (u = C.P.location) ? void 0 : u.protocol) ===
                  "file:",
                is_worker: C.Q,
              },
              b = P();
            return (
              b.subscribe(({ rawEvent: i, metricName: u }) => {
                var c, f, y, b;
                let S;
                if ((u && !v.metric) || !v[i.type]) return;
                let w = u || i.status || i.type,
                  _ = a[w];
                if (
                  (_ || (_ = a[w] = new Set()),
                  _.size >= t.maxTelemetryEventsPerPage)
                )
                  return;
                let k = (0, p.x)(i);
                if (_.has(k)) return;
                let E = n.triggerHook(1, { startTime: (0, l.o)().relative });
                if (E === O) return;
                let x =
                  ((c = E),
                  (f = e),
                  (y = i),
                  (b = h),
                  (S = {
                    type: "telemetry",
                    date: (0, l.o)().timeStamp,
                    service: f,
                    version: "6.22.0",
                    source: "browser",
                    _dd: { format_version: 2 },
                    telemetry: (0, g.i)(y, {
                      runtime_env: b,
                      connectivity: (0, m.f)(),
                      sdk_setup: "npm",
                    }),
                    ddtags: (0, s.z)(t).join(","),
                    experimental_features: Array.from((0, o.Y)()),
                  }),
                  (0, g.i)(S, c));
                (r.notify(x), (0, d.f)("telemetry", x), _.add(k));
              }),
              b.unbuffer(),
              (0, c.M)(I),
              { enabled: y, metricsEnabled: v.metric }
            );
          })(e, t, n, S);
        return { stop: w, enabled: _, metricsEnabled: E };
      },
    ],
    354878,
  );
};
