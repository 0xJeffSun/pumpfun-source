// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(194672),
    n = e.i(526658),
    r = e.i(433710),
    i = e.i(775975),
    o = e.i(645912);
  function s(e) {
    return e >= 500;
  }
  e.s(
    [
      "Z",
      0,
      s,
      "D",
      0,
      function (e) {
        try {
          return e.clone();
        } catch (e) {
          return;
        }
      },
    ],
    158927,
  );
  let u = {
    AGENT: "agent",
    CONSOLE: "console",
    CUSTOM: "custom",
    LOGGER: "logger",
    NETWORK: "network",
    SOURCE: "source",
    REPORT: "report",
  };
  e.s(["f", 0, u], 393386);
  let a = 80 * o.A,
    l = 20 * o.y,
    c = i._,
    d = i.R;
  function f(e, t, n, i, o, s) {
    0 === t.transportStatus &&
    0 === t.queuedPayloads.size() &&
    t.bandwidthMonitor.canHandle(e)
      ? p(e, t, n, s, {
          onSuccess: () => g(0, t, n, i, o, s),
          onFailure: () => {
            (t.queuedPayloads.enqueue(e) ||
              s.notify({
                type: "queue-full",
                bandwidth: t.bandwidthMonitor.stats(),
                payload: e,
              }),
              (function e(t, n, i, o, s) {
                2 === t.transportStatus &&
                  (0, r.Q)(() => {
                    p(t.queuedPayloads.first(), t, n, s, {
                      onSuccess: () => {
                        (t.queuedPayloads.dequeue(),
                          (t.currentBackoffTime = d),
                          g(1, t, n, i, o, s));
                      },
                      onFailure: () => {
                        ((t.currentBackoffTime = Math.min(
                          c,
                          2 * t.currentBackoffTime,
                        )),
                          e(t, n, i, o, s));
                      },
                    });
                  }, t.currentBackoffTime);
              })(t, n, i, o, s));
          },
        })
      : t.queuedPayloads.enqueue(e) ||
        s.notify({
          type: "queue-full",
          bandwidth: t.bandwidthMonitor.stats(),
          payload: e,
        });
  }
  function p(e, t, n, r, { onSuccess: i, onFailure: o }) {
    (t.bandwidthMonitor.add(e),
      n(e, (n) => {
        var u;
        (t.bandwidthMonitor.remove(e),
          "opaque" !== (u = n).type &&
          ((0 === u.status && !navigator.onLine) ||
            408 === u.status ||
            429 === u.status ||
            s(u.status))
            ? ((t.transportStatus =
                t.bandwidthMonitor.ongoingRequestCount > 0 ? 1 : 2),
              (e.retry = {
                count: e.retry ? e.retry.count + 1 : 1,
                lastFailureStatus: n.status,
              }),
              r.notify({
                type: "failure",
                bandwidth: t.bandwidthMonitor.stats(),
                payload: e,
              }),
              o())
            : ((t.transportStatus = 0),
              r.notify({
                type: "success",
                bandwidth: t.bandwidthMonitor.stats(),
                payload: e,
              }),
              i()));
      }));
  }
  function g(e, t, n, r, s, a) {
    0 === e &&
      t.queuedPayloads.isFull() &&
      !t.queueFullReported &&
      (s({
        message: `Reached max ${r} events size queued for upload: ${l / o.y}MiB`,
        source: u.AGENT,
        startClocks: (0, i.o)(),
      }),
      (t.queueFullReported = !0));
    let c = t.queuedPayloads;
    for (t.queuedPayloads = y(); c.size() > 0; ) f(c.dequeue(), t, n, r, s, a);
  }
  function y() {
    let e = [];
    return {
      bytesCount: 0,
      enqueue(t) {
        return (
          !this.isFull() && (e.push(t), (this.bytesCount += t.bytesCount), !0)
        );
      },
      first: () => e[0],
      dequeue() {
        let t = e.shift();
        return (t && (this.bytesCount -= t.bytesCount), t);
      },
      size: () => e.length,
      isFull() {
        return this.bytesCount >= l;
      },
    };
  }
  let m = !1;
  function v(e, n, r) {
    fetch(e.build("fetch", n), { method: "POST", body: n.data, mode: "cors" })
      .then(
        (0, t.l)((e) =>
          null == r ? void 0 : r({ status: e.status, type: e.type }),
        ),
      )
      .catch((0, t.l)(() => (null == r ? void 0 : r({ status: 0 }))));
  }
  e.s(
    [
      "f",
      0,
      function (e, r, i) {
        let o = new n.S(),
          s = {
            transportStatus: 0,
            currentBackoffTime: d,
            bandwidthMonitor: {
              ongoingRequestCount: 0,
              ongoingByteCount: 0,
              canHandle(e) {
                return (
                  0 === this.ongoingRequestCount ||
                  (this.ongoingByteCount + e.bytesCount <= a &&
                    this.ongoingRequestCount < 32)
                );
              },
              add(e) {
                ((this.ongoingRequestCount += 1),
                  (this.ongoingByteCount += e.bytesCount));
              },
              remove(e) {
                ((this.ongoingRequestCount -= 1),
                  (this.ongoingByteCount -= e.bytesCount));
              },
              stats() {
                return {
                  ongoingByteCount: this.ongoingByteCount,
                  ongoingRequestCount: this.ongoingRequestCount,
                };
              },
            },
            queuedPayloads: y(),
            queueFullReported: !1,
          };
        return {
          observable: o,
          send: (n) => {
            for (let u of e)
              f(
                n,
                s,
                (e, n) =>
                  (function (e, n, r, i) {
                    (function () {
                      try {
                        return (
                          window.Request &&
                          "keepalive" in new Request("http://a")
                        );
                      } catch (e) {
                        return !1;
                      }
                    })() && r.bytesCount < n
                      ? fetch(e.build("fetch-keepalive", r), {
                          method: "POST",
                          body: r.data,
                          keepalive: !0,
                          mode: "cors",
                        })
                          .then(
                            (0, t.l)((e) =>
                              null == i
                                ? void 0
                                : i({ status: e.status, type: e.type }),
                            ),
                          )
                          .catch((0, t.l)(() => v(e, r, i)))
                      : v(e, r, i);
                  })(u, r, e, n),
                u.trackType,
                i,
                o,
              );
          },
          sendOnExit: (n) => {
            for (let i of e)
              !(function (e, n, r) {
                if (navigator.sendBeacon && r.bytesCount < n)
                  try {
                    let t = e.build("beacon", r);
                    if (navigator.sendBeacon(t, r.data)) return;
                  } catch (e) {
                    var i;
                    ((i = e), m || ((m = !0), (0, t.v)(i)));
                  }
                v(e, r);
              })(i, r, n);
          },
        };
      },
    ],
    848686,
  );
};
