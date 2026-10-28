// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  let t, i, n, r, o, a;
  var s,
    u,
    c = e.i(452495),
    l = e.i(436509),
    d = e.i(354878),
    f = e.i(715363),
    p = e.i(126939),
    m = e.i(262876),
    v = e.i(683904),
    g = e.i(194672),
    b = e.i(163981),
    y = e.i(526658),
    h = e.i(586419);
  function T() {
    let e = S();
    return new y.S((t) => {
      if (!e) return;
      let i = new e((0, g.l)((e) => t.notify(e)));
      return (
        i.observe(document, {
          attributes: !0,
          characterData: !0,
          childList: !0,
          subtree: !0,
        }),
        () => i.disconnect()
      );
    });
  }
  function S() {
    let e,
      t = window;
    if (
      t.Zone &&
      ((e = (0, h.f)(t, "MutationObserver")),
      t.MutationObserver && e === t.MutationObserver)
    ) {
      let i = new t.MutationObserver(b.z),
        n = (0, h.f)(i, "originalInstance");
      e = n && n.constructor;
    }
    return (e || (e = t.MutationObserver), e);
  }
  e.s(["C", 0, T, "q", 0, S], 789767);
  var _ = e.i(973447);
  let E = e.i(890441).f;
  var A = e.i(347773),
    I = e.i(651151);
  let w = A.d;
  var C = e.i(344766),
    N = e.i(744767),
    R = e.i(382433),
    O = e.i(867736),
    x = e.i(775975),
    L = e.i(158927),
    k = e.i(141898),
    M = e.i(753603),
    P = e.i(333575);
  let D = "initial_document",
    U = [
      [C.x.DOCUMENT, (e) => D === e],
      [C.x.XHR, (e) => "xmlhttprequest" === e],
      [C.x.FETCH, (e) => "fetch" === e],
      [C.x.BEACON, (e) => "beacon" === e],
      [C.x.CSS, (e, t) => /\.css$/i.test(t)],
      [C.x.JS, (e, t) => /\.js$/i.test(t)],
      [
        C.x.IMAGE,
        (e, t) =>
          ["image", "img", "icon"].includes(e) ||
          null !== /\.(gif|jpg|jpeg|tiff|png|svg|ico)$/i.exec(t),
      ],
      [C.x.FONT, (e, t) => null !== /\.(woff|eot|woff2|ttf)$/i.exec(t)],
      [
        C.x.MEDIA,
        (e, t) =>
          ["audio", "video"].includes(e) || null !== /\.(mp3|mp4)$/i.exec(t),
      ],
    ];
  function V(e) {
    let t = e.name;
    if (!(0, k.f)(t)) return C.x.OTHER;
    let i = (0, k.z)(t);
    for (let [t, n] of U) if (n(e.initiatorType, i)) return t;
    return C.x.OTHER;
  }
  function F(...e) {
    for (let t = 1; t < e.length; t += 1) if (e[t - 1] > e[t]) return !1;
    return !0;
  }
  function G(e) {
    return "xmlhttprequest" === e.initiatorType || "fetch" === e.initiatorType;
  }
  function H(e) {
    let { duration: t, startTime: i, responseEnd: n } = e;
    return 0 === t && i < n ? (0, x.G)(i, n) : t;
  }
  function B(e) {
    if (!z(e)) return;
    let {
        startTime: t,
        fetchStart: i,
        workerStart: n,
        redirectStart: r,
        redirectEnd: o,
        domainLookupStart: a,
        domainLookupEnd: s,
        connectStart: u,
        secureConnectionStart: c,
        connectEnd: l,
        requestStart: d,
        responseStart: f,
        responseEnd: p,
      } = e,
      m = { download: W(t, f, p), first_byte: W(t, d, f) };
    return (
      0 < n && n < i && (m.worker = W(t, n, i)),
      i < l &&
        ((m.connect = W(t, u, l)), u <= c && c <= l && (m.ssl = W(t, c, l))),
      i < s && (m.dns = W(t, a, s)),
      t < o && (m.redirect = W(t, r, o)),
      m
    );
  }
  function K(e) {
    return e.duration >= 0;
  }
  function z(e) {
    var t;
    let i = F(
        e.startTime,
        e.fetchStart,
        e.domainLookupStart,
        e.domainLookupEnd,
        e.connectStart,
        e.connectEnd,
        e.requestStart,
        e.responseStart,
        e.responseEnd,
      ),
      n =
        !((t = e).redirectEnd > t.startTime) ||
        F(e.startTime, e.redirectStart, e.redirectEnd, e.fetchStart);
    return i && n;
  }
  function W(e, t, i) {
    if (e <= t && t <= i)
      return {
        duration: (0, x.T)((0, x.G)(t, i)),
        start: (0, x.T)((0, x.G)(e, t)),
      };
  }
  function $(e) {
    return "" === e.nextHopProtocol ? void 0 : e.nextHopProtocol;
  }
  function q(e) {
    return "" === e.deliveryType ? "other" : e.deliveryType;
  }
  function j(e) {
    if (e.startTime < e.responseStart) {
      let { encodedBodySize: t, decodedBodySize: i, transferSize: n } = e;
      return {
        size: i,
        encoded_body_size: t,
        decoded_body_size: i,
        transfer_size: n,
      };
    }
    return {
      size: void 0,
      encoded_body_size: void 0,
      decoded_body_size: void 0,
      transfer_size: void 0,
    };
  }
  function Y(e) {
    return e && (!(0, M.j)(e) || (0, P.M)(P.J.TRACK_INTAKE_REQUESTS));
  }
  let J = /data:(.+)?(;base64)?,/g;
  function X(e, t = 24e3) {
    if (e.length <= t || !e.startsWith("data:")) return e;
    let i = e.substring(0, 100).match(J);
    return i ? `${i[0]}[...]` : e;
  }
  e.s(
    [
      "k",
      0,
      D,
      "x",
      0,
      q,
      "H",
      0,
      B,
      "v",
      0,
      H,
      "Z",
      0,
      $,
      "C",
      0,
      j,
      "u",
      0,
      V,
      "o",
      0,
      K,
      "D",
      0,
      z,
      "B",
      0,
      Y,
      "I",
      0,
      G,
      "f",
      0,
      X,
    ],
    24245,
  );
  var Q = e.i(883589),
    Z = e.i(70296),
    ee = e.i(970961),
    et = e.i(974155),
    ei = e.i(424838),
    en = e.i(589036);
  let er = new Map();
  function eo(e, t) {
    var i, n;
    let r, o, a;
    if (100 === t) return !0;
    if (0 === t) return !1;
    let s = er.get(t);
    return s && e === s.sessionId
      ? s.decision
      : ((r = window.BigInt
          ? ((i = BigInt(`0x${e.split("-")[4]}`)),
            (n = t),
            (o = BigInt("1111111111111111111")),
            Number((i * o) % (a = BigInt("0x10000000000000000"))) <=
              (n / 100) * Number(a))
          : (0, en.e)(t)),
        er.set(t, { sessionId: e, decision: r }),
        r);
  }
  e.s(["f", 0, eo], 996799);
  function ea(e) {
    let t = crypto.getRandomValues(new Uint32Array(2));
    return (
      63 === e && (t[t.length - 1] >>>= 1),
      {
        toString(e = 10) {
          let i = t[1],
            n = t[0],
            r = "";
          do {
            let t = (i % e) * 0x100000000 + n;
            ((i = Math.floor(i / e)),
              (n = Math.floor(t / e)),
              (r = (t % e).toString(e) + r));
          } while (i || n);
          return r;
        },
      }
    );
  }
  function es(e) {
    return e.toString(16).padStart(16, "0");
  }
  function eu(e) {
    0 !== e.status ||
      e.isAborted ||
      ((e.traceId = void 0), (e.spanId = void 0), (e.traceSampled = void 0));
  }
  function ec(e, t, i, n) {
    return {
      clearTracingIfNeeded: eu,
      traceFetch: (r) =>
        el(e, r, t, i, n, (e) => {
          var t;
          if (
            r.input instanceof Request &&
            !(null == (t = r.init) ? void 0 : t.headers)
          )
            ((r.input = new Request(r.input)),
              Object.keys(e).forEach((t) => {
                r.input.headers.append(t, e[t]);
              }));
          else {
            r.init = (0, Z.P)(r.init);
            let t = [];
            (r.init.headers instanceof Headers
              ? r.init.headers.forEach((e, i) => {
                  t.push([i, e]);
                })
              : Array.isArray(r.init.headers)
                ? r.init.headers.forEach((e) => {
                    t.push(e);
                  })
                : r.init.headers &&
                  Object.keys(r.init.headers).forEach((e) => {
                    t.push([e, r.init.headers[e]]);
                  }),
              (r.init.headers = t.concat((0, Q._)(e))));
          }
        }),
      traceXhr: (r, o) =>
        el(e, r, t, i, n, (e) => {
          Object.keys(e).forEach((t) => {
            o.setRequestHeader(t, e[t]);
          });
        }),
    };
  }
  function el(e, t, i, n, r, o) {
    let a = i.findTrackedSession();
    if (!a) return;
    let s = e.allowedTracingUrls.find((e) => (0, et.c)([e.match], t.url, !0));
    if (!s) return;
    let u = eo(a.id, e.traceSampleRate);
    (u || e.traceContextInjection === ei.y.ALL) &&
      ((t.traceSampled = u),
      (t.traceId = ea(64)),
      (t.spanId = ea(63)),
      o(
        (function (e, t, i, n, r, o, a, s) {
          let u = {};
          if (
            (r.forEach((n) => {
              switch (n) {
                case "datadog":
                  Object.assign(u, {
                    "x-datadog-origin": "rum",
                    "x-datadog-parent-id": t.toString(),
                    "x-datadog-sampling-priority": i ? "1" : "0",
                    "x-datadog-trace-id": e.toString(),
                  });
                  break;
                case "tracecontext":
                  Object.assign(u, {
                    traceparent: `00-0000000000000000${es(e)}-${es(t)}-0${i ? "1" : "0"}`,
                    tracestate: `dd=s:${i ? "1" : "0"};o:rum`,
                  });
                  break;
                case "b3":
                  Object.assign(u, {
                    b3: `${es(e)}-${es(t)}-${i ? "1" : "0"}`,
                  });
                  break;
                case "b3multi":
                  Object.assign(u, {
                    "X-B3-TraceId": es(e),
                    "X-B3-SpanId": es(t),
                    "X-B3-Sampled": i ? "1" : "0",
                  });
              }
            }),
            s.propagateTraceBaggage)
          ) {
            let e = { "session.id": n },
              t = o.getContext().id;
            "string" == typeof t && (e["user.id"] = t);
            let i = a.getContext().id;
            "string" == typeof i && (e["account.id"] = i);
            let r = Object.entries(e)
              .map(([e, t]) => `${e}=${encodeURIComponent(t)}`)
              .join(",");
            r && (u.baggage = r);
          }
          return u;
        })(
          t.traceId,
          t.spanId,
          t.traceSampled,
          a.id,
          s.propagatorTypes,
          n,
          r,
          e,
        ),
      ));
  }
  e.s(
    [
      "R",
      0,
      function (e) {
        return (
          "object" === (0, ee.f)(e) &&
          (0, et.f)(e.match) &&
          Array.isArray(e.propagatorTypes)
        );
      },
      "S",
      0,
      ec,
    ],
    906679,
  );
  let ed = 1;
  function ef() {
    let e = ed;
    return ((ed += 1), e);
  }
  var ep = e.i(54913),
    em = e.i(839476),
    ev = e.i(748877);
  function eg(e) {
    return (0, en.H)(e) && e < 0 ? void 0 : e;
  }
  let eb = {
      ACTION: "action",
      ERROR: "error",
      LONG_TASK: "long_task",
      VIEW: "view",
      RESOURCE: "resource",
      VITAL: "vital",
    },
    ey = {
      LONG_TASK: "long-task",
      LONG_ANIMATION_FRAME: "long-animation-frame",
    },
    eh = {
      INITIAL_LOAD: "initial_load",
      ROUTE_CHANGE: "route_change",
      BF_CACHE: "bf_cache",
    },
    eT = { CLICK: "click", CUSTOM: "custom" },
    eS = {
      RAGE_CLICK: "rage_click",
      ERROR_CLICK: "error_click",
      DEAD_CLICK: "dead_click",
    },
    e_ = { DURATION: "duration", OPERATION_STEP: "operation_step" };
  function eE({ lifeCycle: e, isChildEvent: t, onChange: i = b.z }) {
    let n = {
        errorCount: 0,
        longTaskCount: 0,
        resourceCount: 0,
        actionCount: 0,
        frustrationCount: 0,
      },
      r = e.subscribe(13, (e) => {
        var r;
        if ("view" !== e.type && "vital" !== e.type && t(e))
          switch (e.type) {
            case eb.ERROR:
              ((n.errorCount += 1), i());
              break;
            case eb.ACTION:
              ((n.actionCount += 1),
                e.action.frustration &&
                  (n.frustrationCount += e.action.frustration.type.length),
                i());
              break;
            case eb.LONG_TASK:
              ((n.longTaskCount += 1), i());
              break;
            case eb.RESOURCE:
              (null == (r = e._dd) ? void 0 : r.discarded) ||
                ((n.resourceCount += 1), i());
          }
      });
    return {
      stop: () => {
        r.unsubscribe();
      },
      eventCounts: n,
    };
  }
  e.s(
    ["C", 0, eT, "j", 0, eS, "A", 0, eb, "n", 0, ey, "B", 0, eh, "J", 0, e_],
    237790,
  );
  var eA = e.i(433710),
    eI = e.i(411365);
  function ew(e, i) {
    return new y.S((n) => {
      var r;
      let o, a;
      if (!window.PerformanceObserver) return;
      let s = (e) => {
          let t = e.filter((e) => {
            var t;
            return !((t = e).entryType === u.RESOURCE && (!Y(t.name) || !K(t)));
          });
          t.length > 0 && n.notify(t);
        },
        c = !0,
        l = new PerformanceObserver(
          (0, g.l)((e) => {
            c ? (o = (0, eA.Q)(() => s(e.getEntries()))) : s(e.getEntries());
          }),
        );
      try {
        l.observe(i);
      } catch (e) {
        if ([u.RESOURCE, u.NAVIGATION, u.LONG_TASK, u.PAINT].includes(i.type)) {
          i.buffered &&
            (o = (0, eA.Q)(() => s(performance.getEntriesByType(i.type))));
          try {
            l.observe({ entryTypes: [i.type] });
          } catch (e) {
            return;
          }
        }
      }
      return (
        (c = !1),
        (r = e),
        !t &&
          void 0 !== window.performance &&
          "getEntries" in performance &&
          "addEventListener" in performance &&
          (t = (0, eI.W)(r, performance, "resourcetimingbufferfull", () => {
            performance.clearResourceTimings();
          })),
        eC(u.FIRST_INPUT) ||
          i.type !== u.FIRST_INPUT ||
          ({ stop: a } = (function (e, t) {
            let i = (0, x.C)(),
              n = !1,
              { stop: r } = (0, eI.U)(
                e,
                window,
                ["click", "mousedown", "keydown", "touchstart", "pointerdown"],
                (t) => {
                  var i, n;
                  if (!t.cancelable) return;
                  let r = {
                    entryType: "first-input",
                    processingStart: (0, x.H)(),
                    processingEnd: (0, x.H)(),
                    startTime: t.timeStamp,
                    duration: 0,
                    name: "",
                    cancelable: !1,
                    target: null,
                    toJSON: () => ({}),
                  };
                  "pointerdown" === t.type
                    ? ((i = e),
                      (n = r),
                      (0, eI.U)(
                        i,
                        window,
                        ["pointerup", "pointercancel"],
                        (e) => {
                          "pointerup" === e.type && o(n);
                        },
                        { once: !0 },
                      ))
                    : o(r);
                },
                { passive: !0, capture: !0 },
              );
            return { stop: r };
            function o(e) {
              if (!n) {
                ((n = !0), r());
                let o = e.processingStart - e.startTime;
                o >= 0 && o < (0, x.C)() - i && t(e);
              }
            }
          })(e, (e) => {
            s([e]);
          })),
        () => {
          (l.disconnect(), a && a(), (0, eA.z)(o));
        }
      );
    });
  }
  function eC(e) {
    return (
      window.PerformanceObserver &&
      void 0 !== PerformanceObserver.supportedEntryTypes &&
      PerformanceObserver.supportedEntryTypes.includes(e)
    );
  }
  function eN(e) {
    return e.nodeType === Node.TEXT_NODE;
  }
  function eR(e) {
    return e.nodeType === Node.COMMENT_NODE;
  }
  function eO(e) {
    return e.nodeType === Node.ELEMENT_NODE;
  }
  function ex(e) {
    return eO(e) && !!e.shadowRoot;
  }
  function eL(e) {
    return !!e.host && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && eO(e.host);
  }
  function ek(e) {
    return eL(e) ? e.host : e.parentNode;
  }
  (((s = u || (u = {})).EVENT = "event"),
    (s.FIRST_INPUT = "first-input"),
    (s.LARGEST_CONTENTFUL_PAINT = "largest-contentful-paint"),
    (s.LAYOUT_SHIFT = "layout-shift"),
    (s.LONG_TASK = "longtask"),
    (s.LONG_ANIMATION_FRAME = "long-animation-frame"),
    (s.NAVIGATION = "navigation"),
    (s.PAINT = "paint"),
    (s.RESOURCE = "resource"),
    (s.VISIBILITY_STATE = "visibility-state"),
    e.s(["T", 0, u, "y", 0, ew, "b", 0, eC], 600937),
    e.s(
      [
        "z",
        0,
        function (e, t) {
          let i = e.firstChild;
          for (; i; ) (t(i), (i = i.nextSibling));
          ex(e) && t(e.shadowRoot);
        },
        "I",
        0,
        ek,
        "a",
        0,
        function (e) {
          return e.childNodes.length > 0 || ex(e);
        },
        "D",
        0,
        eR,
        "h",
        0,
        eO,
        "c",
        0,
        ex,
        "i",
        0,
        eL,
        "A",
        0,
        eN,
      ],
      142934,
    ));
  let eM = "data-dd-excluded-activity-mutations";
  function eP(e, t, i) {
    let n,
      r = !1,
      o = (0, eA.Q)(
        (0, g.l)(() => c({ hadActivity: !1 })),
        100,
      ),
      a =
        void 0 !== i
          ? (0, eA.Q)(
              (0, g.l)(() => c({ hadActivity: !0, end: (0, x.J)() })),
              i,
            )
          : void 0,
      s = e.subscribe(({ isBusy: e }) => {
        ((0, eA.z)(o), (0, eA.z)(n));
        let t = (0, x.J)();
        e ||
          (n = (0, eA.Q)(
            (0, g.l)(() => c({ hadActivity: !0, end: t })),
            100,
          ));
      }),
      u = () => {
        ((r = !0), (0, eA.z)(o), (0, eA.z)(n), (0, eA.z)(a), s.unsubscribe());
      };
    function c(e) {
      r || (u(), t(e));
    }
    return { stop: u };
  }
  function eD(e, t, i, n) {
    return new y.S((r) => {
      let o,
        a = [],
        s = 0;
      return (
        a.push(
          t.subscribe((e) => {
            e.every(eV) || c();
          }),
          i.subscribe(c),
          ew(n, { type: u.RESOURCE }).subscribe((e) => {
            e.some((e) => !eU(n, e.name)) && c();
          }),
          e.subscribe(7, (e) => {
            eU(n, e.url) ||
              (void 0 === o && (o = e.requestIndex), (s += 1), c());
          }),
          e.subscribe(8, (e) => {
            eU(n, e.url) ||
              void 0 === o ||
              e.requestIndex < o ||
              ((s -= 1), c());
          }),
        ),
        () => {
          a.forEach((e) => e.unsubscribe());
        }
      );
      function c() {
        r.notify({ isBusy: s > 0 });
      }
    });
  }
  function eU(e, t) {
    return (0, et.c)(e.excludedActivityUrls, t);
  }
  function eV(e) {
    let t = "characterData" === e.type ? e.target.parentElement : e.target;
    return !!(t && eO(t) && t.matches(`[${eM}], [${eM}] *`));
  }
  let eF = "data-dd-action-name",
    eG = [
      eF,
      "data-testid",
      "data-test",
      "data-qa",
      "data-cy",
      "data-test-id",
      "data-qa-id",
      "data-testing",
      "data-component",
      "data-element",
      "data-source-file",
    ],
    eH = [
      eW,
      function (e) {
        if (e.id && !ez(e.id)) return `#${CSS.escape(e.id)}`;
      },
    ],
    eB = [
      eW,
      function (e) {
        if ("BODY" === e.tagName) return;
        let t = e.classList;
        for (let i = 0; i < t.length; i += 1) {
          let n = t[i];
          if (!ez(n)) return `${CSS.escape(e.tagName)}.${CSS.escape(n)}`;
        }
      },
      function (e) {
        return CSS.escape(e.tagName);
      },
    ];
  function eK(e, t) {
    let i;
    if (!e.isConnected) return;
    let n = e;
    for (; n && "HTML" !== n.nodeName; ) {
      let e = e$(n, eH, eq, t, i);
      if (e) return e;
      ((i =
        e$(n, eB, ej, t, i) ||
        eY(
          (function (e) {
            let t = e.parentElement.firstElementChild,
              i = 1;
            for (; t && t !== e; )
              (t.tagName === e.tagName && (i += 1), (t = t.nextElementSibling));
            return `${CSS.escape(e.tagName)}:nth-of-type(${i})`;
          })(n),
          i,
        )),
        (n = n.parentElement));
    }
    return i;
  }
  function ez(e) {
    return /[0-9]/.test(e);
  }
  function eW(e, t) {
    if (t) {
      let e = i(t);
      if (e) return e;
    }
    for (let e of eG) {
      let t = i(e);
      if (t) return t;
    }
    function i(t) {
      if (e.hasAttribute(t))
        return `${CSS.escape(e.tagName)}[${t}="${CSS.escape(e.getAttribute(t))}"]`;
    }
  }
  function e$(e, t, i, n, r) {
    for (let o of t) {
      let t = o(e, n);
      if (t && i(e, t, r)) return eY(t, r);
    }
  }
  function eq(e, t, i) {
    return 1 === e.ownerDocument.querySelectorAll(eY(t, i)).length;
  }
  function ej(e, t, i) {
    let n;
    if (void 0 === i) n = (e) => e.matches(t);
    else {
      let e = eY(`${t}:scope`, i);
      n = (t) => null !== t.querySelector(e);
    }
    let r = e.parentElement.firstElementChild;
    for (; r; ) {
      if (r !== e && n(r)) return !1;
      r = r.nextElementSibling;
    }
    return !0;
  }
  function eY(e, t) {
    return t ? `${e}>${t}` : e;
  }
  e.s(["z", 0, eG, "H", 0, eK], 328641);
  let eJ = {
      IGNORE: "ignore",
      HIDDEN: "hidden",
      ALLOW: ei.v.ALLOW,
      MASK: ei.v.MASK,
      MASK_USER_INPUT: ei.v.MASK_USER_INPUT,
      MASK_UNLESS_ALLOWLISTED: ei.v.MASK_UNLESS_ALLOWLISTED,
    },
    eX = "data-dd-privacy",
    eQ = {
      INPUT: !0,
      OUTPUT: !0,
      TEXTAREA: !0,
      SELECT: !0,
      OPTION: !0,
      DATALIST: !0,
      OPTGROUP: !0,
    };
  function eZ(e) {
    return `[${eX}="${e}"], .dd-privacy-${e}`;
  }
  function e0(e, t, i) {
    if (i && i.has(e)) return i.get(e);
    let n = ek(e),
      r = n ? e0(n, t, i) : t,
      o = e1(e3(e), r);
    return (i && i.set(e, o), o);
  }
  function e1(e, t) {
    switch (t) {
      case eJ.HIDDEN:
      case eJ.IGNORE:
        return t;
    }
    switch (e) {
      case eJ.ALLOW:
      case eJ.MASK:
      case eJ.MASK_USER_INPUT:
      case eJ.MASK_UNLESS_ALLOWLISTED:
      case eJ.HIDDEN:
      case eJ.IGNORE:
        return e;
      default:
        return t;
    }
  }
  function e3(e) {
    if (eO(e)) {
      if ("BASE" === e.tagName) return eJ.ALLOW;
      if ("INPUT" === e.tagName) {
        if (
          "password" === e.type ||
          "email" === e.type ||
          "tel" === e.type ||
          "hidden" === e.type
        )
          return eJ.MASK;
        let t = e.getAttribute("autocomplete");
        if (t && (t.startsWith("cc-") || t.endsWith("-password")))
          return eJ.MASK;
      }
      if (e.matches(eZ(eJ.HIDDEN))) return eJ.HIDDEN;
      if (e.matches(eZ(eJ.MASK))) return eJ.MASK;
      if (e.matches(eZ(eJ.MASK_UNLESS_ALLOWLISTED)))
        return eJ.MASK_UNLESS_ALLOWLISTED;
      if (e.matches(eZ(eJ.MASK_USER_INPUT))) return eJ.MASK_USER_INPUT;
      if (e.matches(eZ(eJ.ALLOW))) return eJ.ALLOW;
      if (
        (function (e) {
          if ("SCRIPT" === e.nodeName) return !0;
          if ("LINK" === e.nodeName) {
            let e = t("rel");
            return (
              (/preload|prefetch/i.test(e) && "script" === t("as")) ||
              "shortcut icon" === e ||
              "icon" === e
            );
          }
          if ("META" === e.nodeName) {
            let i = t("name"),
              n = t("rel"),
              r = t("property");
            return (
              /^msapplication-tile(image|color)$/.test(i) ||
              "application-name" === i ||
              "icon" === n ||
              "apple-touch-icon" === n ||
              "shortcut icon" === n ||
              "keywords" === i ||
              "description" === i ||
              /^(og|twitter|fb):/.test(r) ||
              /^(og|twitter):/.test(i) ||
              "pinterest" === i ||
              "robots" === i ||
              "googlebot" === i ||
              "bingbot" === i ||
              e.hasAttribute("http-equiv") ||
              "author" === i ||
              "generator" === i ||
              "framework" === i ||
              "publisher" === i ||
              "progid" === i ||
              /^article:/.test(r) ||
              /^product:/.test(r) ||
              "google-site-verification" === i ||
              "yandex-verification" === i ||
              "csrf-token" === i ||
              "p:domain_verify" === i ||
              "verify-v1" === i ||
              "verification" === i ||
              "shopify-checkout-api-token" === i
            );
          }
          function t(t) {
            return (e.getAttribute(t) || "").toLowerCase();
          }
          return !1;
        })(e)
      )
        return eJ.IGNORE;
    }
  }
  function e4(e, t) {
    switch (t) {
      case eJ.MASK:
      case eJ.HIDDEN:
      case eJ.IGNORE:
        return !0;
      case eJ.MASK_UNLESS_ALLOWLISTED:
        if (eN(e)) return !!e2(e.parentNode) || !e9(e.textContent || "");
        return e2(e);
      case eJ.MASK_USER_INPUT:
        return eN(e) ? e2(e.parentNode) : e2(e);
      default:
        return !1;
    }
  }
  function e2(e) {
    if (!e || e.nodeType !== e.ELEMENT_NODE) return !1;
    if ("INPUT" === e.tagName)
      switch (e.type) {
        case "button":
        case "color":
        case "reset":
        case "submit":
          return !1;
      }
    return !!eQ[e.tagName];
  }
  function e9(e) {
    var t;
    return (
      !(e && e.trim()) ||
      (null == (t = window.$DD_ALLOW)
        ? void 0
        : t.has(e.toLocaleLowerCase())) ||
      !1
    );
  }
  (e.s(
    [
      "D",
      0,
      "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
      "s",
      0,
      "***",
      "u",
      0,
      eQ,
      "K",
      0,
      eJ,
      "v",
      0,
      eX,
      "z",
      0,
      "hidden",
      "r",
      0,
      "x",
      "N",
      0,
      eZ,
    ],
    918640,
  ),
    e.s(
      [
        "c",
        0,
        e0,
        "P",
        0,
        e3,
        "G",
        0,
        function (e, t) {
          var i, n;
          let r = null == (i = e.parentElement) ? void 0 : i.tagName,
            o = e.textContent || "";
          if ("HEAD" !== r || o.trim()) {
            if ("SCRIPT" === r) o = "***";
            else if (t === eJ.HIDDEN) o = "***";
            else if (e4(e, t))
              if ("DATALIST" === r || "SELECT" === r || "OPTGROUP" === r) {
                if (!o.trim()) return;
              } else if ("OPTION" === r) o = "***";
              else if (t === eJ.MASK_UNLESS_ALLOWLISTED) {
                o = e9((n = o)) ? n : n.replace(/\S/g, "x");
              } else o = o.replace(/\S/g, "x");
            return o;
          }
        },
        "U",
        0,
        e1,
        "u",
        0,
        e4,
      ],
      559048,
    ));
  let e6 = x.R;
  function e5(e, t) {
    let i = e.closest(`[${t}]`);
    if (i) return ti(tt(i.getAttribute(t).trim()));
  }
  let e7 = [
      (e, t) => {
        if ("labels" in e && e.labels && e.labels.length > 0)
          return tr(e.labels[0], t);
      },
      (e) => {
        if ("INPUT" === e.nodeName) {
          let t = e.getAttribute("type");
          if ("button" === t || "submit" === t || "reset" === t)
            return { name: e.value, nameSource: "text_content" };
        }
      },
      (e, t) => {
        if (
          "BUTTON" === e.nodeName ||
          "LABEL" === e.nodeName ||
          "button" === e.getAttribute("role")
        )
          return tr(e, t);
      },
      (e) => tn(e, "aria-label"),
      (e, t) => {
        let i = e.getAttribute("aria-labelledby");
        if (i)
          return {
            name: i
              .split(/\s+/)
              .map((t) => {
                var i, n;
                return (
                  (i = e),
                  (n = t),
                  i.ownerDocument ? i.ownerDocument.getElementById(n) : null
                );
              })
              .filter((e) => !!e)
              .map((e) => to(e, t))
              .join(" "),
            nameSource: "text_content",
          };
      },
      (e) => tn(e, "alt"),
      (e) => tn(e, "name"),
      (e) => tn(e, "title"),
      (e) => tn(e, "placeholder"),
      (e, t) => {
        if ("options" in e && e.options.length > 0) return tr(e.options[0], t);
      },
    ],
    e8 = [(e, t) => tr(e, t)];
  function te(e, t, i) {
    let n = e,
      r = 0;
    for (
      ;
      r <= 10 &&
      n &&
      "BODY" !== n.nodeName &&
      "HTML" !== n.nodeName &&
      "HEAD" !== n.nodeName;

    ) {
      for (let e of t) {
        let t = e(n, i);
        if (t) {
          let { name: e, nameSource: i } = t,
            n = e && e.trim();
          if (n) return { name: ti(tt(n)), nameSource: i };
        }
      }
      if ("FORM" === n.nodeName) break;
      ((n = n.parentElement), (r += 1));
    }
  }
  function tt(e) {
    return e.replace(/\s+/g, " ");
  }
  function ti(e) {
    return e.length > 100 ? `${(0, em.C)(e, 100)} [...]` : e;
  }
  function tn(e, t) {
    return { name: e.getAttribute(t) || "", nameSource: "standard_attribute" };
  }
  function tr(e, t) {
    return { name: to(e, t) || "", nameSource: "text_content" };
  }
  function to(e, t) {
    if (e.isContentEditable) return;
    let {
      enablePrivacyForActionName: i,
      actionNameAttribute: n,
      defaultPrivacyLevel: r,
    } = t;
    if ((0, P.M)(P.J.USE_TREE_WALKER_FOR_ACTION_NAME)) {
      var o = e,
        a = n,
        s = i,
        u = r;
      let t = new Map(),
        c = document.createTreeWalker(
          o,
          NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
          function (e) {
            let i = e0(e, u, t);
            if (s && i && e4(e, i)) return NodeFilter.FILTER_REJECT;
            if (eO(e)) {
              if (e.hasAttribute(eF) || (a && e.hasAttribute(a)))
                return NodeFilter.FILTER_REJECT;
              let t = getComputedStyle(e);
              if (
                "visible" !== t.visibility ||
                "none" === t.display ||
                (t.contentVisibility && "visible" !== t.contentVisibility)
              )
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        ),
        l = "";
      for (; c.nextNode(); ) {
        let e = c.currentNode;
        if (eO(e)) {
          ("BR" === e.nodeName ||
            "P" === e.nodeName ||
            [
              "block",
              "flex",
              "grid",
              "list-item",
              "table",
              "table-caption",
            ].includes(getComputedStyle(e).display)) &&
            (l += " ");
          continue;
        }
        l += e.textContent || "";
      }
      return l.replace(/\s+/g, " ").trim();
    }
    if ("innerText" in e) {
      let t = e.innerText,
        r = (i) => {
          let n = e.querySelectorAll(i);
          for (let e = 0; e < n.length; e += 1) {
            let i = n[e];
            if ("innerText" in i) {
              let e = i.innerText;
              e && e.trim().length > 0 && (t = t.replace(e, ""));
            }
          }
        };
      return (
        r(`[${eF}]`),
        n && r(`[${n}]`),
        i && r(`${eZ(eJ.HIDDEN)}, ${eZ(eJ.MASK)}`),
        t
      );
    }
    return e.textContent;
  }
  function ta() {
    let e = window.getSelection();
    return !e || e.isCollapsed;
  }
  function ts(e) {
    return e.target instanceof Element && !1 !== e.isPrimary;
  }
  function tu(e) {
    if (
      e.hasPageActivity ||
      e.getUserActivity().input ||
      e.getUserActivity().scroll
    )
      return !1;
    let t = e.event.target;
    return (
      "LABEL" === t.tagName &&
        t.hasAttribute("for") &&
        (t = document.getElementById(t.getAttribute("for"))),
      !t ||
        !t.matches(
          'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]),textarea,select,[contenteditable],[contenteditable] *,canvas,a[href],a[href] *',
        )
    );
  }
  let tc = 10 * x.R,
    tl = new Map();
  function td(e, t) {
    (tl.set(e, t),
      tl.forEach((e, t) => {
        (0, x.G)(t, (0, x.H)()) > tc && tl.delete(t);
      }));
  }
  let tf = 5 * x._;
  function tp(e) {
    let t = tm(e)
        ? {
            action: {
              id: e.id,
              loading_time: eg((0, x.T)(e.duration)),
              frustration: { type: e.frustrationTypes },
              error: { count: e.counts.errorCount },
              long_task: { count: e.counts.longTaskCount },
              resource: { count: e.counts.resourceCount },
            },
            _dd: {
              action: {
                target: e.target,
                position: e.position,
                name_source: e.nameSource,
              },
            },
          }
        : { context: e.context },
      i = (0, ep.i)(
        {
          action: { id: (0, em.o)(), target: { name: e.name }, type: e.type },
          date: e.startClocks.timeStamp,
          type: eb.ACTION,
        },
        t,
      ),
      n = tm(e) ? e.duration : void 0,
      r = tm(e) ? { events: e.events } : { handlingStack: e.handlingStack };
    return {
      rawRumEvent: i,
      duration: n,
      startTime: e.startClocks.relative,
      domainContext: r,
    };
  }
  function tm(e) {
    return e.type !== eT.CUSTOM;
  }
  var tv = e.i(393386),
    tg = e.i(80400),
    tb = e.i(222943),
    ty = e.i(895453),
    th = e.i(812019);
  function tT(e, t) {
    var i;
    let n, r;
    if (window.requestIdleCallback && window.cancelIdleCallback) {
      let i = window.requestIdleCallback((0, g.l)(e), t);
      return () => window.cancelIdleCallback(i);
    }
    return (
      (i = e),
      (n = (0, x.C)()),
      (r = (0, eA.Q)(() => {
        i({
          didTimeout: !1,
          timeRemaining: () => Math.max(0, 50 - ((0, x.C)() - n)),
        });
      }, 0)),
      () => (0, eA.z)(r)
    );
  }
  e.s(["f", 0, tT], 324959);
  let tS = x.R,
    t_ = new WeakSet();
  function tE(e) {
    return (0, x.z)(e.startTime, e.duration);
  }
  function tA(e, t, i) {
    return document.readyState === t || "complete" === document.readyState
      ? (i(), { stop: b.z })
      : (0, eI.W)(
          e,
          window,
          "complete" === t ? "load" : "DOMContentLoaded",
          i,
          { once: !0 },
        );
  }
  e.s(
    [
      "m",
      0,
      function (e, t) {
        return new Promise((i) => {
          tA(e, t, i);
        });
      },
      "h",
      0,
      tA,
    ],
    80964,
  );
  let tI = 2 * x._;
  function tw(e, t) {
    let i = t && Number(t);
    if (e && i) return { traceId: e, traceTime: i };
  }
  function tC(e) {
    if (e && eR(e)) {
      let t = /^\s*DATADOG;(.*?)\s*$/.exec(e.data);
      if (t) return t[1];
    }
  }
  function tN() {
    if (eC(u.NAVIGATION)) {
      let e = performance.getEntriesByType(u.NAVIGATION)[0];
      if (e) return e;
    }
    let e = (function () {
        let e = {},
          t = performance.timing;
        for (let i in t)
          if ((0, en.H)(t[i])) {
            let n = t[i];
            e[i] = 0 === n ? 0 : (0, x.D)(n);
          }
        return e;
      })(),
      t = {
        entryType: u.NAVIGATION,
        initiatorType: "navigation",
        name: window.location.href,
        startTime: 0,
        duration: e.loadEventEnd,
        decodedBodySize: 0,
        encodedBodySize: 0,
        transferSize: 0,
        workerStart: 0,
        toJSON: () => ({ ...t, toJSON: void 0 }),
        ...e,
      };
    return t;
  }
  let tR = 32 * e.i(645912).A;
  function tO(e, t, i, n) {
    let r = G(e) && n ? n.getMatchingRequest(e) : void 0;
    return tx(e, r, i, t);
  }
  function tx(e, t, i, n) {
    var r, o, a, s;
    if (!e && !t) return;
    let u = t
      ? (function (e, t) {
          if (e.traceSampled && e.traceId && e.spanId)
            return {
              _dd: {
                span_id: e.spanId.toString(),
                trace_id: e.traceId.toString(),
                rule_psr: t.rulePsr,
              },
            };
        })(t, n)
      : (function (e, t) {
          if (e.traceId)
            return {
              _dd: {
                trace_id: e.traceId,
                span_id: ea(63).toString(),
                rule_psr: t.rulePsr,
              },
            };
        })(e, n);
    if (!n.trackResources && !u) return;
    let c = e ? (0, x.j)(e.startTime) : t.startClocks,
      l = e
        ? H(e)
        : ((r = i),
          (o = c),
          (a = t.duration),
          r.wasInPageStateDuringPeriod("frozen", o.relative, a) ? void 0 : a),
      d =
        t &&
        (function (e, t) {
          var i;
          let n =
            ((i = e.url),
            t.allowedGraphQlUrls.find((e) => (0, et.c)([e.match], i)));
          if (n)
            return (function (e, t = !1) {
              var i;
              let n, r;
              if (!e || "string" != typeof e) return;
              try {
                n = JSON.parse(e);
              } catch (e) {
                return;
              }
              if (!n || !n.query) return;
              let o = n.query.trim(),
                a =
                  null == (i = o.match(/^\s*(query|mutation|subscription)\b/i))
                    ? void 0
                    : i[1],
                s = n.operationName;
              if (a)
                return (
                  n.variables && (r = JSON.stringify(n.variables)),
                  {
                    operationType: a,
                    operationName: s,
                    variables: r,
                    payload: t ? (0, em.C)(o, tR, "...") : void 0,
                  }
                );
            })(e.body, n.trackPayload);
        })(t, n),
      f = (0, ep.i)(
        {
          date: c.timeStamp,
          resource: {
            id: (0, em.o)(),
            duration: (0, x.T)(l),
            type: t ? (t.type === C.$.XHR ? C.x.XHR : C.x.FETCH) : V(e),
            method: t ? t.method : void 0,
            status_code: t
              ? t.status
              : 0 === (s = e.responseStatus)
                ? void 0
                : s,
            url: t ? X(t.url) : e.name,
            protocol: e && $(e),
            delivery_type: e && q(e),
            graphql: d,
          },
          type: eb.RESOURCE,
          _dd: { discarded: !n.trackResources },
        },
        u,
        e &&
          (function (e) {
            let { renderBlockingStatus: t } = e;
            return {
              resource: { render_blocking_status: t, ...j(e), ...B(e) },
            };
          })(e),
      );
    return {
      startTime: c.relative,
      duration: l,
      rawRumEvent: f,
      domainContext: (function (e, t) {
        if (t) {
          let i = {
            performanceEntry: e,
            isAborted: t.isAborted,
            handlingStack: t.handlingStack,
          };
          return t.type === C.$.XHR
            ? { xhr: t.xhr, ...i }
            : {
                requestInput: t.input,
                requestInit: t.init,
                response: t.response,
                error: t.error,
                ...i,
              };
        }
        return { performanceEntry: e };
      })(e, t),
    };
  }
  var tL = x,
    tk = e.i(831323);
  let tM = 10 * x._,
    tP = 10 * x._;
  function tD(e, t, i = window) {
    if ("hidden" === document.visibilityState)
      return { timeStamp: 0, stop: b.z };
    if (eC(u.VISIBILITY_STATE)) {
      let e = performance
        .getEntriesByType(u.VISIBILITY_STATE)
        .filter((e) => "hidden" === e.name)
        .find((e) => e.startTime >= t.relative);
      if (e) return { timeStamp: e.startTime, stop: b.z };
    }
    let n = 1 / 0,
      { stop: r } = (0, eI.U)(
        e,
        i,
        ["pagehide", "visibilitychange"],
        (e) => {
          ("pagehide" === e.type || "hidden" === document.visibilityState) &&
            ((n = e.timeStamp), r());
        },
        { capture: !0 },
      );
    return {
      get timeStamp() {
        return n;
      },
      stop: r,
    };
  }
  let tU = (e) => {
    var t, i;
    let n, r, o, a;
    return (
      e.previousRect.width * e.previousRect.height +
      e.currentRect.width * e.currentRect.height -
      ((t = e.previousRect),
      (i = e.currentRect),
      (n = Math.max(t.left, i.left)),
      (r = Math.max(t.top, i.top)),
      (o = Math.min(t.right, i.right)),
      (a = Math.min(t.bottom, i.bottom)),
      n >= o || r >= a ? 0 : (o - n) * (a - r))
    );
  };
  function tV({ x: e, y: t, width: i, height: n }) {
    return { x: e, y: t, width: i, height: n };
  }
  let tF = 5 * x.R,
    tG = x.R,
    tH = 0,
    tB = 1 / 0,
    tK = 0,
    tz = () => (i ? tH : window.performance.interactionCount || 0),
    tW = +x._;
  function t$() {
    let e = window.visualViewport;
    return Math.round(
      e
        ? e.pageTop - e.offsetTop
        : void 0 !== window.scrollY
          ? window.scrollY
          : window.pageYOffset || 0,
    );
  }
  function tq(e) {
    var t;
    return (
      n ||
        ((t = e),
        (n = new y.S((e) => {
          let { throttled: i } = (0, b.N)(() => {
            e.notify(tj());
          }, 200);
          return (0, eI.W)(t, window, "resize", i, { capture: !0, passive: !0 })
            .stop;
        }))),
      n
    );
  }
  function tj() {
    let e = window.visualViewport;
    return e
      ? { width: Number(e.width * e.scale), height: Number(e.height * e.scale) }
      : {
          width: Number(window.innerWidth || 0),
          height: Number(window.innerHeight || 0),
        };
  }
  (e.s(
    [
      "s",
      0,
      function () {
        let e = window.visualViewport;
        return Math.round(
          e
            ? e.pageLeft - e.offsetLeft
            : void 0 !== window.scrollX
              ? window.scrollX
              : window.pageXOffset || 0,
        );
      },
      "w",
      0,
      t$,
    ],
    205326,
  ),
    e.s(["P", 0, tj, "z", 0, tq], 855035));
  let tY = x.R,
    tJ = 5 * tL._,
    tX = 5 * tL._;
  function tQ(e) {
    let t = e.indexOf("?");
    return t < 0 ? e : e.slice(0, t);
  }
  var tZ = e.i(57549),
    t0 = e.i(528276),
    t1 = e.i(181349),
    t3 = e.i(848686);
  let t4 = A.d;
  function t2(e) {
    return Object.prototype.hasOwnProperty.call(history, e)
      ? history
      : History.prototype;
  }
  let t9 = A.d,
    t6 = 10 * x.R;
  function t5() {
    0 !== r.batchCount && ((0, d.W)("Customer data measures", r), ie());
  }
  function t7() {
    return { min: 1 / 0, max: 0, sum: 0 };
  }
  function t8(e, t) {
    ((e.sum += t), (e.min = Math.min(e.min, t)), (e.max = Math.max(e.max, t)));
  }
  function ie() {
    r = { batchCount: 0, batchBytesCount: t7(), batchMessagesCount: t7() };
  }
  let it = A.d;
  function ii() {
    return "hidden" === document.visibilityState
      ? "hidden"
      : document.hasFocus()
        ? "active"
        : "passive";
  }
  var ir = e.i(709549);
  function io(e, t, i) {
    function n(i) {
      t.wasInPageStateDuringPeriod(
        "frozen",
        i.startClocks.relative,
        i.duration,
      ) || e.notify(12, iu(i));
    }
    return {
      addOperationStepVital: function (t, i, n, r) {
        if (!(0, P.M)(P.J.FEATURE_OPERATION_VITAL)) return;
        let { operationKey: o, context: a, description: s } = n || {},
          u = {
            name: t,
            type: e_.OPERATION_STEP,
            operationKey: o,
            failureReason: r,
            stepType: i,
            startClocks: (0, x.o)(),
            context: (0, ir.f)(a),
            description: s,
          };
        e.notify(12, iu(u));
      },
      addDurationVital: n,
      startDurationVital: (e, t = {}) => ia(i, e, t),
      stopDurationVital: (e, t = {}) => {
        is(n, i, e, t);
      },
    };
  }
  function ia({ vitalsByName: e, vitalsByReference: t }, i, n = {}) {
    let r = { name: i, startClocks: (0, x.o)(), ...n },
      o = { __dd_vital_reference: !0 };
    return (e.set(i, r), t.set(o, r), o);
  }
  function is(e, { vitalsByName: t, vitalsByReference: i }, n, r = {}) {
    var o, a, s, u, c;
    let l = "string" == typeof n ? t.get(n) : i.get(n);
    l &&
      (e(
        ((o = l),
        (a = l.startClocks),
        (s = r),
        (u = (0, x.o)()),
        {
          name: o.name,
          type: e_.DURATION,
          startClocks: a,
          duration: (0, x.G)(a.timeStamp, u.timeStamp),
          context: (0, ep.i)(o.context, s.context),
          description: null != (c = s.description) ? c : o.description,
        }),
      ),
      "string" == typeof n ? t.delete(n) : i.delete(n));
  }
  function iu(e) {
    let { startClocks: t, type: i, name: n, description: r, context: o } = e,
      a = {
        id: (0, em.o)(),
        type: i,
        name: n,
        description: r,
        ...(i === e_.DURATION
          ? { duration: (0, x.T)(e.duration) }
          : {
              step_type: e.stepType,
              operation_key: e.operationKey,
              failure_reason: e.failureReason,
            }),
      };
    return {
      rawRumEvent: { date: t.timeStamp, vital: a, type: eb.VITAL, context: o },
      startTime: t.relative,
      duration: i === e_.DURATION ? e.duration : void 0,
      domainContext: {},
    };
  }
  e.s(
    [
      "e",
      0,
      function () {
        return { vitalsByName: new Map(), vitalsByReference: new WeakMap() };
      },
      "k",
      0,
      ia,
      "Y",
      0,
      io,
      "a",
      0,
      is,
    ],
    728306,
  );
  var ic = e.i(484247);
  let il = x.R;
  function id(e, t) {
    let i = (0, em.H)(document.cookie, e),
      n = (0, eA.y)(() => {
        let n = (0, em.H)(document.cookie, e);
        n !== i && t(n);
      }, il);
    return () => {
      (0, eA.x)(n);
    };
  }
  let ip = "datadog-ci-visibility-test-execution-id";
  var im = e.i(513510),
    iv = e.i(921636),
    ig = e.i(760474);
  function ib(e) {
    return "object" === (0, ee.f)(e);
  }
  let iy = {
      "view.name": "string",
      "view.url": "string",
      "view.referrer": "string",
    },
    ih = { context: "object" },
    iT = { service: "string", version: "string" };
  var iS = e.i(654518);
  let i_ = ev.x,
    iE = [eb.ACTION, eb.ERROR, eb.LONG_TASK, eb.RESOURCE, eb.VITAL];
  (e.s(
    [
      "f",
      0,
      function (e, t, n, s, h, S, A, k, M) {
        var P, U, V, F, H, B, W, $, q, j, J;
        let X,
          et,
          ei,
          er,
          eo,
          ea,
          es,
          eu = [],
          el = new E(),
          ed = i_();
        el.subscribe(13, (e) => (0, c.f)("rum", e));
        let e_ = (e) => {
            (el.notify(14, { error: e }),
              (0, d.Y)("Error reported to customer", {
                "error.message": e.message,
              }));
          },
          eR = (0, l.y)(e),
          ex = eR.subscribe((e) => {
            el.notify(11, e);
          });
        eu.push(() => ex.unsubscribe());
        let eL = (0, d.O)("browser-rum-sdk", e, ed, e_, eR, h);
        eu.push(eL.stop);
        let ek = (0, f.K)()
          ? ((X = {
              id: "00000000-aaaa-0000-aaaa-000000000000",
              sessionReplay: +!!(0, f.S)("records"),
            }),
            {
              findTrackedSession: () => X,
              expire: b.z,
              expireObservable: new y.S(),
              setForcedReplay: b.z,
            })
          : ((et = (0, tZ.f)(
              e,
              "rum",
              (t) => {
                var i, n, r;
                return (
                  (i = e),
                  "0" === (r = n = t) || "1" === r || "2" === r
                    ? n
                    : (0, en.e)(i.sessionSampleRate)
                      ? (0, en.e)(i.sessionReplaySampleRate)
                        ? "1"
                        : "2"
                      : "0"
                );
              },
              S,
            )).expireObservable.subscribe(() => {
              el.notify(9);
            }),
            et.renewObservable.subscribe(() => {
              el.notify(10);
            }),
            et.sessionStateUpdateObservable.subscribe(
              ({ previousState: e, newState: t }) => {
                if (!e.forcedReplay && t.forcedReplay) {
                  let e = et.findSession();
                  e && (e.isReplayForced = !0);
                }
              },
            ),
            {
              findTrackedSession: (e) => {
                let t = et.findSession(e);
                if (t && "0" !== t.trackingType)
                  return {
                    id: t.id,
                    sessionReplay:
                      "1" === t.trackingType ? 1 : 2 * !!t.isReplayForced,
                    anonymousId: t.anonymousId,
                  };
              },
              expire: et.expire,
              expireObservable: et.expireObservable,
              setForcedReplay: () =>
                et.updateSessionState({ forcedReplay: "1" }),
            });
        if ((0, f.K)()) {
          let e;
          ((e = (0, f.g)()),
            el.subscribe(13, (t) => {
              e.send("rum", t);
            }));
        } else {
          let t,
            i,
            n =
              ((P = ek.expireObservable),
              (t = [e.rumEndpointBuilder]),
              e.replica && t.push(e.replica.rumEndpointBuilder),
              (i = (0, t0.f)({
                encoder: h(2),
                request: (0, t3.f)(t, e.batchBytesLimit, e_),
                flushController: (0, t1.f)({
                  messagesLimit: e.batchMessagesLimit,
                  bytesLimit: e.batchBytesLimit,
                  durationLimit: e.flushTimeout,
                  pageMayExitObservable: eR,
                  sessionExpireObservable: P,
                }),
                messageBytesLimit: e.messageBytesLimit,
              })),
              el.subscribe(13, (e) => {
                e.type === eb.VIEW ? i.upsert(e, e.view.id) : i.add(e);
              }),
              i);
          (eu.push(() => n.stop()),
            (U = n.flushController.flushObservable),
            eL.metricsEnabled &&
              (ie(),
              (o = !1),
              el.subscribe(13, () => {
                o = !0;
              }),
              U.subscribe(({ bytesCount: e, messagesCount: t }) => {
                o &&
                  ((o = !1),
                  (r.batchCount += 1),
                  t8(r.batchBytesCount, e),
                  t8(r.batchMessagesCount, t));
              }),
              (0, eA.y)(t5, t6)));
        }
        let eM = T(),
          eU =
            ((V = location),
            (ei = (0, Z.P)(V)),
            new y.S((t) => {
              var i, n;
              let { stop: r } = (function (e, t) {
                  let { stop: i } = (0, _.m)(
                      t2("pushState"),
                      "pushState",
                      ({ onPostCall: e }) => {
                        e(t);
                      },
                    ),
                    { stop: n } = (0, _.m)(
                      t2("replaceState"),
                      "replaceState",
                      ({ onPostCall: e }) => {
                        e(t);
                      },
                    ),
                    { stop: r } = (0, eI.W)(e, window, "popstate", t);
                  return {
                    stop: () => {
                      (i(), n(), r());
                    },
                  };
                })(e, a),
                { stop: o } =
                  ((i = e), (n = a), (0, eI.W)(i, window, "hashchange", n));
              function a() {
                if (ei.href === V.href) return;
                let e = (0, Z.P)(V);
                (t.notify({ newLocation: e, oldLocation: ei }), (ei = e));
              }
              return () => {
                (r(), o());
              };
            })),
          { observable: eV, stop: eG } = (function () {
            let e = new y.S(),
              { stop: t } = (0, _.m)(window, "open", () => e.notify());
            return { observable: e, stop: t };
          })();
        (eu.push(eG),
          ed.register(0, ({ eventType: t }) => {
            let i = e.source;
            return {
              type: t,
              _dd: {
                format_version: 2,
                drift: (0, x.K)(),
                configuration: {
                  session_sample_rate: (0, en.I)(e.sessionSampleRate, 3),
                  session_replay_sample_rate: (0, en.I)(
                    e.sessionReplaySampleRate,
                    3,
                  ),
                  profiling_sample_rate: (0, en.I)(e.profilingSampleRate, 3),
                },
                browser_sdk_version: (0, f.K)() ? "6.22.0" : void 0,
                sdk_name: M,
              },
              application: { id: e.applicationId },
              date: (0, x.J)(),
              source: i,
            };
          }),
          ed.register(1, () => ({ application: { id: e.applicationId } })));
        let eH = (function (e, t, i = 500) {
            let n,
              r = (0, I.f)({ expireDelay: it, maxEntries: 4e3 });
            (eC(u.VISIBILITY_STATE) &&
              performance.getEntriesByType(u.VISIBILITY_STATE).forEach((e) => {
                a("hidden" === e.name ? "hidden" : "active", e.startTime);
              }),
              a(ii(), (0, x.H)()));
            let { stop: o } = (0, eI.U)(
              t,
              window,
              [
                "pageshow",
                "focus",
                "blur",
                "visibilitychange",
                "resume",
                "freeze",
                "pagehide",
              ],
              (e) => {
                var t;
                a(
                  "freeze" === (t = e).type
                    ? "frozen"
                    : "pagehide" === t.type
                      ? t.persisted
                        ? "frozen"
                        : "terminated"
                      : ii(),
                  e.timeStamp,
                );
              },
              { capture: !0 },
            );
            function a(e, t = (0, x.H)()) {
              e !== n &&
                ((n = e),
                r.closeActive(t),
                r.add({ state: n, startTime: t }, t));
            }
            function s(e, t, i) {
              return r.findAll(t, i).some((t) => t.state === e);
            }
            return (
              e.register(
                0,
                ({ startTime: e, duration: t = 0, eventType: n }) =>
                  n === eb.VIEW
                    ? {
                        type: n,
                        _dd: {
                          page_states: (function (e, t, i) {
                            if (0 !== e.length)
                              return e
                                .slice(-i)
                                .reverse()
                                .map(({ state: e, startTime: i }) => ({
                                  state: e,
                                  start: (0, x.T)((0, x.G)(t, i)),
                                }));
                          })(r.findAll(e, t), e, i),
                        },
                      }
                    : n === eb.ACTION || n === eb.ERROR
                      ? { type: n, view: { in_foreground: s("active", e, 0) } }
                      : ev.Y,
              ),
              {
                wasInPageStateDuringPeriod: s,
                addPageState: a,
                stop: () => {
                  (o(), r.stop());
                },
              }
            );
          })(ed, e),
          eB =
            ((er = (0, I.f)({ expireDelay: w })),
            el.subscribe(1, (e) => {
              var t;
              er.add(
                {
                  service: (t = e).service,
                  version: t.version,
                  context: t.context,
                  id: t.id,
                  name: t.name,
                  startClocks: t.startClocks,
                },
                e.startClocks.relative,
              );
            }),
            el.subscribe(6, ({ endClocks: e }) => {
              er.closeActive(e.relative);
            }),
            el.subscribe(3, (e) => {
              let t = er.find(e.startClocks.relative);
              t &&
                (e.name && (t.name = e.name),
                e.context && (t.context = e.context),
                (t.sessionIsActive = e.sessionIsActive));
            }),
            el.subscribe(10, () => {
              er.reset();
            }),
            {
              findView: (e) => er.find(e),
              stop: () => {
                er.stop();
              },
            });
        eu.push(() => eB.stop());
        let ez = (function (e, t, i, n) {
          let r,
            o = (0, I.f)({ expireDelay: t4 });
          (e.subscribe(1, ({ startClocks: e }) => {
            let t = n.href;
            (o.add(s({ url: t, referrer: r || document.referrer }), e.relative),
              (r = t));
          }),
            e.subscribe(6, ({ endClocks: e }) => {
              o.closeActive(e.relative);
            }));
          let a = i.subscribe(({ newLocation: e }) => {
            let t = o.find();
            if (t) {
              let i = (0, x.H)();
              (o.closeActive(i),
                o.add(s({ url: e.href, referrer: t.referrer }), i));
            }
          });
          function s({ url: e, referrer: t }) {
            return { url: e, referrer: t };
          }
          return (
            t.register(0, ({ startTime: e, eventType: t }) => {
              let i = o.find(e);
              return i
                ? { type: t, view: { url: i.url, referrer: i.referrer } }
                : ev.a;
            }),
            {
              findUrl: (e) => o.find(e),
              stop: () => {
                (a.unsubscribe(), o.stop());
              },
            }
          );
        })(el, ed, eU, location);
        eu.push(() => ez.stop());
        let eW =
          ((eo = (0, I.f)({ expireDelay: t9 })),
          el.subscribe(1, ({ startClocks: e }) => {
            eo.add({}, e.relative);
          }),
          el.subscribe(6, ({ endClocks: e }) => {
            eo.closeActive(e.relative);
          }),
          ed.register(0, ({ startTime: t, eventType: i }) => {
            if (
              !e.trackFeatureFlagsForEvents
                .concat([eb.VIEW, eb.ERROR])
                .includes(i)
            )
              return ev.Y;
            let n = eo.find(t);
            return !n || (0, Z.n)(n) ? ev.Y : { type: i, feature_flags: n };
          }),
          {
            addFeatureFlagEvaluation: (e, t) => {
              let i = eo.find();
              i && (i[e] = t);
            },
          });
        (ed.register(0, ({ eventType: e, startTime: i }) => {
          let n,
            r,
            o,
            a = ek.findTrackedSession(i),
            s = eB.findView(i);
          return a && s
            ? (e === eb.VIEW
                ? ((n = !!t.getReplayStats(s.id) || void 0),
                  (r = 1 === a.sessionReplay),
                  (o = !!s.sessionIsActive && void 0))
                : (n = !!t.isRecording() || void 0),
              {
                type: e,
                session: {
                  id: a.id,
                  type: "user",
                  has_replay: n,
                  sampled_for_replay: r,
                  is_active: o,
                },
              })
            : ev.a;
        }),
          ed.register(1, ({ startTime: e }) => {
            let t = ek.findTrackedSession(e);
            return t ? { session: { id: t.id } } : ev.Y;
          }),
          ed.register(0, ({ eventType: e }) => ({
            type: e,
            connectivity: (0, iS.f)(),
          })),
          ed.register(1, () => (S.isGranted() ? ev.Y : ev.a)));
        let e$ = (0, m.x)(ed, e, "rum", !0),
          eq = (0, v.x)(ed, e, ek, "rum"),
          ej = (0, p.w)(ed, e, "rum"),
          {
            actionContexts: eY,
            addAction: eX,
            addEvent: eQ,
            stop: eZ,
          } = (function (e, t, i, n, r, o, s) {
            let u,
              c,
              d,
              f,
              p = (function (e, t, i, n, r) {
                let { unsubscribe: o } = e.subscribe(0, (t) => {
                  e.notify(12, tp(t));
                });
                (t.register(0, ({ startTime: e, eventType: t }) => {
                  if (t !== eb.ERROR && t !== eb.RESOURCE && t !== eb.LONG_TASK)
                    return ev.Y;
                  let i = a.findActionId(e);
                  return i ? { type: t, action: { id: i } } : ev.Y;
                }),
                  t.register(1, ({ startTime: e }) => ({
                    action: { id: a.findActionId(e) },
                  })));
                let a = { findActionId: b.z },
                  s = b.z;
                return (
                  r.trackUserInteractions &&
                    ({ actionContexts: a, stop: s } = (function (e, t, i, n) {
                      let r,
                        o = (0, I.f)({ expireDelay: tf }),
                        a = new y.S();
                      (e.subscribe(10, () => {
                        o.reset();
                      }),
                        e.subscribe(5, c),
                        e.subscribe(11, (e) => {
                          e.reason === l.C.UNLOADING && c();
                        }));
                      let { stop: s } = (function (
                        e,
                        { onPointerDown: t, onPointerUp: i },
                      ) {
                        let n,
                          r,
                          o = { selection: !1, input: !1, scroll: !1 },
                          a = [
                            (0, eI.W)(
                              e,
                              window,
                              "pointerdown",
                              (e) => {
                                ts(e) &&
                                  ((n = ta()),
                                  (o = {
                                    selection: !1,
                                    input: !1,
                                    scroll: !1,
                                  }),
                                  (r = t(e)));
                              },
                              { capture: !0 },
                            ),
                            (0, eI.W)(
                              e,
                              window,
                              "selectionchange",
                              () => {
                                (n && ta()) || (o.selection = !0);
                              },
                              { capture: !0 },
                            ),
                            (0, eI.W)(
                              e,
                              window,
                              "scroll",
                              () => {
                                o.scroll = !0;
                              },
                              { capture: !0, passive: !0 },
                            ),
                            (0, eI.W)(
                              e,
                              window,
                              "pointerup",
                              (e) => {
                                if (ts(e) && r) {
                                  let t = o;
                                  (i(r, e, () => t), (r = void 0));
                                }
                              },
                              { capture: !0 },
                            ),
                            (0, eI.W)(
                              e,
                              window,
                              "input",
                              () => {
                                o.input = !0;
                              },
                              { capture: !0 },
                            ),
                          ];
                        return {
                          stop: () => {
                            a.forEach((e) => e.stop());
                          },
                        };
                      })(n, {
                        onPointerDown: (r) =>
                          (function (e, t, i, n, r) {
                            var o;
                            let a;
                            if (
                              (a = e.enablePrivacyForActionName
                                ? e0(n.target, e.defaultPrivacyLevel)
                                : eJ.ALLOW) === eJ.HIDDEN
                            )
                              return;
                            let s = (function (e, t, i) {
                                let n = e.target.getBoundingClientRect(),
                                  r = eK(e.target, i.actionNameAttribute);
                                r && td(e.timeStamp, r);
                                let { name: o, nameSource: a } = (function (
                                  e,
                                  t,
                                  i = eJ.ALLOW,
                                ) {
                                  let { actionNameAttribute: n } = t,
                                    r = e5(e, eF) || (n && e5(e, n));
                                  return r
                                    ? {
                                        name: r,
                                        nameSource: "custom_attribute",
                                      }
                                    : i === eJ.MASK
                                      ? {
                                          name: "Masked Element",
                                          nameSource: "mask_placeholder",
                                        }
                                      : te(e, e7, t) ||
                                        te(e, e8, t) || {
                                          name: "",
                                          nameSource: "blank",
                                        };
                                })(e.target, i, t);
                                return {
                                  type: eT.CLICK,
                                  target: {
                                    width: Math.round(n.width),
                                    height: Math.round(n.height),
                                    selector: r,
                                  },
                                  position: {
                                    x: Math.round(e.clientX - n.left),
                                    y: Math.round(e.clientY - n.top),
                                  },
                                  name: o,
                                  nameSource: a,
                                };
                              })(n, a, e),
                              u = !1;
                            return (
                              (o = (e) => {
                                u = e.hadActivity;
                              }),
                              eP(eD(t, i, r, e), o, 100),
                              {
                                clickActionBase: s,
                                hadActivityOnPointerDown: () => u,
                              }
                            );
                          })(n, e, t, r, i),
                        onPointerUp: (
                          { clickActionBase: r, hadActivityOnPointerDown: s },
                          c,
                          l,
                        ) => {
                          !(function (e, t, i, n, r, o, a, s, u, c, l) {
                            var d, f;
                            let p = (function e(t, i, n, r, o) {
                              let a,
                                s = (0, em.o)(),
                                u = (0, x.o)(),
                                c = i.add(s, u.relative),
                                l = eE({
                                  lifeCycle: t,
                                  isChildEvent: (e) =>
                                    void 0 !== e.action &&
                                    (Array.isArray(e.action.id)
                                      ? e.action.id.includes(s)
                                      : e.action.id === s),
                                }),
                                d = 0,
                                f = [],
                                p = new y.S();
                              function m(e) {
                                0 === d &&
                                  ((d = 1),
                                  (a = e) ? c.close((0, x.D)(a)) : c.remove(),
                                  l.stop(),
                                  p.notify());
                              }
                              return {
                                event: o,
                                stop: m,
                                stopObservable: p,
                                get hasError() {
                                  return l.eventCounts.errorCount > 0;
                                },
                                get hasPageActivity() {
                                  return void 0 !== a;
                                },
                                getUserActivity: n,
                                addFrustration: (e) => {
                                  f.push(e);
                                },
                                startClocks: u,
                                isStopped: () => 1 === d || 2 === d,
                                clone: () => e(t, i, n, r, o),
                                validate: (e) => {
                                  if ((m(), 1 !== d)) return;
                                  let {
                                      resourceCount: i,
                                      errorCount: n,
                                      longTaskCount: c,
                                    } = l.eventCounts,
                                    p = {
                                      duration: a && (0, x.G)(u.timeStamp, a),
                                      startClocks: u,
                                      id: s,
                                      frustrationTypes: f,
                                      counts: {
                                        resourceCount: i,
                                        errorCount: n,
                                        longTaskCount: c,
                                      },
                                      events: null != e ? e : [o],
                                      event: o,
                                      ...r,
                                    };
                                  (t.notify(0, p), (d = 2));
                                },
                                discard: () => {
                                  (m(), (d = 2));
                                },
                              };
                            })(t, r, c, s, u);
                            a(p);
                            let m =
                              null == (d = null == s ? void 0 : s.target)
                                ? void 0
                                : d.selector;
                            m && td(u.timeStamp, m);
                            let { stop: v } =
                                ((f = (e) => {
                                  e.hadActivity &&
                                  e.end < p.startClocks.timeStamp
                                    ? p.discard()
                                    : e.hadActivity
                                      ? p.stop(e.end)
                                      : l()
                                        ? p.stop(p.startClocks.timeStamp)
                                        : p.stop();
                                }),
                                eP(eD(t, i, n, e), f, tc)),
                              g = t.subscribe(5, ({ endClocks: e }) => {
                                p.stop(e.timeStamp);
                              }),
                              b = o.subscribe(() => {
                                p.stop();
                              });
                            p.stopObservable.subscribe(() => {
                              (g.unsubscribe(), v(), b.unsubscribe());
                            });
                          })(n, e, t, i, o, a, u, r, c, l, s);
                        },
                      });
                      return {
                        stop: () => {
                          (c(), a.notify(), s());
                        },
                        actionContexts: { findActionId: (e) => o.findAll(e) },
                      };
                      function u(e) {
                        if (!r || !r.tryAppend(e)) {
                          let t = e.clone();
                          r = (function (e, t) {
                            let i,
                              n = [],
                              r = 0;
                            function o(e) {
                              (e.stopObservable.subscribe(a),
                                n.push(e),
                                (0, eA.z)(i),
                                (i = (0, eA.Q)(s, e6)));
                            }
                            function a() {
                              1 === r &&
                                n.every((e) => e.isStopped()) &&
                                ((r = 2), t(n));
                            }
                            function s() {
                              ((0, eA.z)(i), 0 === r && ((r = 1), a()));
                            }
                            return (
                              o(e),
                              {
                                tryAppend: (e) => {
                                  var t, i, a, u;
                                  return (
                                    0 === r &&
                                    (!(n.length > 0) ||
                                    ((t = n[n.length - 1].event),
                                    (i = e.event),
                                    t.target === i.target &&
                                      100 >=
                                        ((a = t),
                                        (u = i),
                                        Math.sqrt(
                                          Math.pow(a.clientX - u.clientX, 2) +
                                            Math.pow(a.clientY - u.clientY, 2),
                                        )) &&
                                      t.timeStamp - i.timeStamp <= e6)
                                      ? (o(e), !0)
                                      : (s(), !1))
                                  );
                                },
                                stop: () => {
                                  s();
                                },
                              }
                            );
                          })(e, (e) => {
                            !(function (e, t) {
                              let { isRage: i } = (function (e, t) {
                                if (
                                  (function (e) {
                                    if (
                                      e.some(
                                        (e) =>
                                          e.getUserActivity().selection ||
                                          e.getUserActivity().scroll,
                                      )
                                    )
                                      return !1;
                                    for (let t = 0; t < e.length - 2; t += 1)
                                      if (
                                        e[t + 3 - 1].event.timeStamp -
                                          e[t].event.timeStamp <=
                                        x.R
                                      )
                                        return !0;
                                    return !1;
                                  })(e)
                                )
                                  return (
                                    t.addFrustration(eS.RAGE_CLICK),
                                    e.some(tu) &&
                                      t.addFrustration(eS.DEAD_CLICK),
                                    t.hasError &&
                                      t.addFrustration(eS.ERROR_CLICK),
                                    { isRage: !0 }
                                  );
                                let i = e.some(
                                  (e) => e.getUserActivity().selection,
                                );
                                return (
                                  e.forEach((e) => {
                                    (e.hasError &&
                                      e.addFrustration(eS.ERROR_CLICK),
                                      tu(e) &&
                                        !i &&
                                        e.addFrustration(eS.DEAD_CLICK));
                                  }),
                                  { isRage: !1 }
                                );
                              })(e, t);
                              i
                                ? (e.forEach((e) => e.discard()),
                                  t.stop((0, x.J)()),
                                  t.validate(e.map((e) => e.event)))
                                : (t.discard(), e.forEach((e) => e.validate()));
                            })(e, t);
                          });
                        }
                      }
                      function c() {
                        r && r.stop();
                      }
                    })(e, i, n, r)),
                  {
                    addAction: (t) => {
                      e.notify(12, tp(t));
                    },
                    actionContexts: a,
                    stop: () => {
                      (o(), s());
                    },
                  }
                );
              })(e, t, r, o, i),
              m = {
                addEvent: (t, i, n, r) => {
                  iE.includes(i.type) &&
                    e.notify(12, {
                      startTime: t,
                      rawRumEvent: i,
                      domainContext: n,
                      duration: r,
                    });
                },
              },
              v =
                ((c = requestAnimationFrame(
                  (0, g.l)(() => {
                    u = tj();
                  }),
                )),
                (d = tq(i).subscribe((e) => {
                  u = e;
                }).unsubscribe),
                t.register(0, ({ eventType: e }) => ({
                  type: e,
                  display: u ? { viewport: u } : void 0,
                })),
                {
                  stop: () => {
                    (d(), c && cancelAnimationFrame(c));
                  },
                }),
              h = (function (
                e,
                t,
                i = (function (e, t) {
                  var i;
                  let n = window.cookieStore
                    ? ((i = e),
                      (e, t) =>
                        (0, eI.W)(i, window.cookieStore, "change", (i) => {
                          let n =
                            i.changed.find((t) => t.name === e) ||
                            i.deleted.find((t) => t.name === e);
                          n && t(n.value);
                        }).stop)
                    : id;
                  return new y.S((e) => n(t, (t) => e.notify(t)));
                })(e, ip),
              ) {
                var n;
                let r =
                    (0, ic.P)(ip) ||
                    (null == (n = window.Cypress) ? void 0 : n.env("traceId")),
                  o = i.subscribe((e) => {
                    r = e;
                  });
                return (
                  t.register(0, ({ eventType: e }) =>
                    "string" != typeof r
                      ? ev.Y
                      : {
                          type: e,
                          session: { type: "ci_test" },
                          ci_test: { test_execution_id: r },
                        },
                  ),
                  {
                    stop: () => {
                      o.unsubscribe();
                    },
                  }
                );
              })(i, t);
            return (
              t.register(0, ({ eventType: e }) =>
                (0, im.P)()
                  ? {
                      type: e,
                      session: { type: "synthetics" },
                      synthetics: {
                        test_id: (0, im.n)(),
                        result_id: (0, im.K)(),
                        injected: (0, im.j)(),
                      },
                    }
                  : ev.Y,
              ),
              (a = {
                [eb.VIEW]: {
                  "view.performance.lcp.resource_url": "string",
                  ...ih,
                  ...iy,
                  ...iT,
                },
                [eb.ERROR]: {
                  "error.message": "string",
                  "error.stack": "string",
                  "error.resource.url": "string",
                  "error.fingerprint": "string",
                  ...ih,
                  ...iy,
                  ...iT,
                },
                [eb.RESOURCE]: {
                  "resource.url": "string",
                  ...ih,
                  ...iy,
                  ...iT,
                },
                [eb.ACTION]: {
                  "action.target.name": "string",
                  ...ih,
                  ...iy,
                  ...iT,
                },
                [eb.LONG_TASK]: {
                  "long_task.scripts[].source_url": "string",
                  "long_task.scripts[].invoker": "string",
                  ...ih,
                  ...iy,
                  ...iT,
                },
                [eb.VITAL]: { ...ih, ...iy, ...iT },
              }),
              (f = {
                [eb.ERROR]: (0, iv.f)(eb.ERROR, i.eventRateLimiterThreshold, s),
                [eb.ACTION]: (0, iv.f)(
                  eb.ACTION,
                  i.eventRateLimiterThreshold,
                  s,
                ),
                [eb.VITAL]: (0, iv.f)(eb.VITAL, i.eventRateLimiterThreshold, s),
              }),
              e.subscribe(
                12,
                ({
                  startTime: n,
                  duration: r,
                  rawRumEvent: o,
                  domainContext: s,
                }) => {
                  let u = t.triggerHook(0, {
                    eventType: o.type,
                    startTime: n,
                    duration: r,
                  });
                  if (u === ev.a) return;
                  let c = (0, ep.i)(u, o, { ddtags: (0, ig.z)(i).join(",") });
                  (function (e, t, i, n) {
                    var r, o;
                    if (t) {
                      let n,
                        r,
                        s =
                          ((o = a[e.type]),
                          (r = ((e) => t(e, i))((n = (0, ep.F)(e)))),
                          (0, Q._)(o).forEach(([t, i]) =>
                            (function e(t, i, n, r) {
                              let [o, ...a] = n;
                              if ("[]" === o) {
                                Array.isArray(t) &&
                                  Array.isArray(i) &&
                                  t.forEach((t, n) => e(t, i[n], a, r));
                                return;
                              }
                              if (ib(t) && ib(i)) {
                                var s, u, c, l;
                                let n;
                                if (a.length > 0) return e(t[o], i[o], a, r);
                                ((s = t),
                                  (u = o),
                                  (c = i[o]),
                                  (l = r),
                                  (n = (0, ee.f)(c)) === l
                                    ? (s[u] = (0, ir.f)(c))
                                    : "object" === l &&
                                      ("undefined" === n || "null" === n) &&
                                      (s[u] = {}));
                              }
                            })(e, n, t.split(/\.|(?=\[\])/), i),
                          ),
                          r);
                      if (!1 === s && e.type !== eb.VIEW) return !1;
                      !1 === s &&
                        ty.s.warn(
                          "Can't dismiss view events using beforeSend!",
                        );
                    }
                    return !(null == (r = n[e.type])
                      ? void 0
                      : r.isLimitReached());
                  })(c, i.beforeSend, s, f) &&
                    ((0, Z.n)(c.context) && delete c.context, e.notify(13, c));
                },
              ),
              {
                pageStateHistory: n,
                addAction: p.addAction,
                addEvent: m.addEvent,
                actionContexts: p.actionContexts,
                stop: () => {
                  (p.stop(), h.stop(), v.stop(), n.stop());
                },
              }
            );
          })(el, ed, e, eH, eM, eV, e_);
        eu.push(eZ);
        let {
          addTiming: e1,
          startView: e3,
          setViewName: e4,
          setViewContext: e2,
          setViewContextProperty: e9,
          getViewContext: tt,
          stop: ti,
        } = ((F = location),
        el.subscribe(4, (i) => {
          var n, r, o, a, s, u, c, l, d, f, p, m, v, g, b, y, h, T, S, _;
          let E, A, I;
          return el.notify(
            12,
            ((n = i),
            (r = e),
            (E = t.getReplayStats(n.id)),
            (A =
              null ==
              (a =
                null == (o = n.commonViewMetrics)
                  ? void 0
                  : o.cumulativeLayoutShift)
                ? void 0
                : a.devicePixelRatio),
            (I = {
              _dd: {
                document_version: n.documentVersion,
                replay_stats: E,
                cls: A ? { device_pixel_ratio: A } : void 0,
                configuration: {
                  start_session_replay_recording_manually:
                    r.startSessionReplayRecordingManually,
                },
              },
              date: n.startClocks.timeStamp,
              type: eb.VIEW,
              view: {
                action: { count: n.eventCounts.actionCount },
                frustration: { count: n.eventCounts.frustrationCount },
                cumulative_layout_shift:
                  null == (s = n.commonViewMetrics.cumulativeLayoutShift)
                    ? void 0
                    : s.value,
                cumulative_layout_shift_time: (0, x.T)(
                  null == (u = n.commonViewMetrics.cumulativeLayoutShift)
                    ? void 0
                    : u.time,
                ),
                cumulative_layout_shift_target_selector:
                  null == (c = n.commonViewMetrics.cumulativeLayoutShift)
                    ? void 0
                    : c.targetSelector,
                first_byte: (0, x.T)(
                  null == (l = n.initialViewMetrics.navigationTimings)
                    ? void 0
                    : l.firstByte,
                ),
                dom_complete: (0, x.T)(
                  null == (d = n.initialViewMetrics.navigationTimings)
                    ? void 0
                    : d.domComplete,
                ),
                dom_content_loaded: (0, x.T)(
                  null == (f = n.initialViewMetrics.navigationTimings)
                    ? void 0
                    : f.domContentLoaded,
                ),
                dom_interactive: (0, x.T)(
                  null == (p = n.initialViewMetrics.navigationTimings)
                    ? void 0
                    : p.domInteractive,
                ),
                error: { count: n.eventCounts.errorCount },
                first_contentful_paint: (0, x.T)(
                  n.initialViewMetrics.firstContentfulPaint,
                ),
                first_input_delay: (0, x.T)(
                  null == (m = n.initialViewMetrics.firstInput)
                    ? void 0
                    : m.delay,
                ),
                first_input_time: (0, x.T)(
                  null == (v = n.initialViewMetrics.firstInput)
                    ? void 0
                    : v.time,
                ),
                first_input_target_selector:
                  null == (g = n.initialViewMetrics.firstInput)
                    ? void 0
                    : g.targetSelector,
                interaction_to_next_paint: (0, x.T)(
                  null == (b = n.commonViewMetrics.interactionToNextPaint)
                    ? void 0
                    : b.value,
                ),
                interaction_to_next_paint_time: (0, x.T)(
                  null == (y = n.commonViewMetrics.interactionToNextPaint)
                    ? void 0
                    : y.time,
                ),
                interaction_to_next_paint_target_selector:
                  null == (h = n.commonViewMetrics.interactionToNextPaint)
                    ? void 0
                    : h.targetSelector,
                is_active: n.isActive,
                name: n.name,
                largest_contentful_paint: (0, x.T)(
                  null == (T = n.initialViewMetrics.largestContentfulPaint)
                    ? void 0
                    : T.value,
                ),
                largest_contentful_paint_target_selector:
                  null == (S = n.initialViewMetrics.largestContentfulPaint)
                    ? void 0
                    : S.targetSelector,
                load_event: (0, x.T)(
                  null == (_ = n.initialViewMetrics.navigationTimings)
                    ? void 0
                    : _.loadEvent,
                ),
                loading_time: eg((0, x.T)(n.commonViewMetrics.loadingTime)),
                loading_type: n.loadingType,
                long_task: { count: n.eventCounts.longTaskCount },
                performance: (function (
                  { cumulativeLayoutShift: e, interactionToNextPaint: t },
                  {
                    firstContentfulPaint: i,
                    firstInput: n,
                    largestContentfulPaint: r,
                  },
                ) {
                  return {
                    cls: e && {
                      score: e.value,
                      timestamp: (0, x.T)(e.time),
                      target_selector: e.targetSelector,
                      previous_rect: e.previousRect,
                      current_rect: e.currentRect,
                    },
                    fcp: i && { timestamp: (0, x.T)(i) },
                    fid: n && {
                      duration: (0, x.T)(n.delay),
                      timestamp: (0, x.T)(n.time),
                      target_selector: n.targetSelector,
                    },
                    inp: t && {
                      duration: (0, x.T)(t.value),
                      timestamp: (0, x.T)(t.time),
                      target_selector: t.targetSelector,
                    },
                    lcp: r && {
                      timestamp: (0, x.T)(r.value),
                      target_selector: r.targetSelector,
                      resource_url: r.resourceUrl,
                    },
                  };
                })(n.commonViewMetrics, n.initialViewMetrics),
                resource: { count: n.eventCounts.resourceCount },
                time_spent: (0, x.T)(n.duration),
              },
              display: n.commonViewMetrics.scroll
                ? {
                    scroll: {
                      max_depth: n.commonViewMetrics.scroll.maxDepth,
                      max_depth_scroll_top:
                        n.commonViewMetrics.scroll.maxDepthScrollTop,
                      max_scroll_height:
                        n.commonViewMetrics.scroll.maxScrollHeight,
                      max_scroll_height_time: (0, x.T)(
                        n.commonViewMetrics.scroll.maxScrollHeightTime,
                      ),
                    },
                  }
                : void 0,
              privacy: { replay_level: r.defaultPrivacyLevel },
              device: {
                locale: navigator.language,
                locales: navigator.languages,
                time_zone: (function () {
                  try {
                    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
                  } catch (e) {
                    return;
                  }
                })(),
              },
            }),
            (0, Z.n)(n.customTimings) ||
              (I.view.custom_timings = (0, Z.A)(n.customTimings, x.T)),
            {
              rawRumEvent: I,
              startTime: n.startClocks.relative,
              duration: n.duration,
              domainContext: { location: n.location },
            }),
          );
        }),
        ed.register(0, ({ startTime: e, eventType: t }) => {
          let i = eB.findView(e);
          return i
            ? {
                type: t,
                service: i.service,
                version: i.version,
                context: i.context,
                view: { id: i.id, name: i.name },
              }
            : ev.a;
        }),
        ed.register(1, ({ startTime: e }) => {
          var t;
          return { view: { id: null == (t = eB.findView(e)) ? void 0 : t.id } };
        }),
        (function (e, t, n, r, o, a, s, c) {
          let d,
            f,
            p = new Set(),
            m = v(eh.INITIAL_LOAD, (0, tL.t)(), c);
          function v(a, s, c) {
            let d = (function (e, t, n, r, o, a, s = (0, tL.o)(), c) {
              var d;
              let f,
                p = (0, em.o)(),
                m = new y.S(),
                v = {},
                h = 0,
                T = (0, Z.P)(o),
                S = (0, tk.f)(),
                _ = !0,
                E = null == c ? void 0 : c.name,
                A = (null == c ? void 0 : c.service) || r.service,
                I = (null == c ? void 0 : c.version) || r.version,
                w = null == c ? void 0 : c.context;
              w && S.setContext(w);
              let C = {
                id: p,
                name: E,
                startClocks: s,
                service: A,
                version: I,
                context: w,
              };
              (e.notify(1, C), e.notify(2, C));
              let { throttled: N, cancel: R } = (0, b.N)(z, 3e3, {
                  leading: !1,
                }),
                {
                  setLoadEvent: O,
                  setViewEnd: L,
                  stop: k,
                  stopINPTracking: M,
                  getCommonViewMetrics: P,
                } = (function (e, t, n, r, o, a, s) {
                  let c = {},
                    { stop: l, setLoadEvent: d } = (function (
                      e,
                      t,
                      i,
                      n,
                      r,
                      o,
                      a,
                    ) {
                      var s;
                      let u = r === eh.INITIAL_LOAD,
                        c = !0,
                        l = [],
                        d = tD(n, o);
                      function f() {
                        if (!c && !u && l.length > 0) {
                          let e = Math.max(...l);
                          e < d.timeStamp - o.relative && a(e);
                        }
                      }
                      let { stop: p } =
                        ((s = (e) => {
                          c &&
                            ((c = !1),
                            e.hadActivity &&
                              l.push((0, x.G)(o.timeStamp, e.end)),
                            f());
                        }),
                        eP(eD(e, t, i, n), s, void 0));
                      return {
                        stop: () => {
                          (p(), d.stop());
                        },
                        setLoadEvent: (e) => {
                          u && ((u = !1), l.push(e), f());
                        },
                      };
                    })(e, t, n, r, a, s, (e) => {
                      ((c.loadingTime = e), o());
                    }),
                    { stop: f } = (function (
                      e,
                      t,
                      i,
                      n = (function (e, t = tY) {
                        return new y.S((i) => {
                          if (window.ResizeObserver) {
                            let n = (0, b.N)(
                                function () {
                                  i.notify(
                                    (function () {
                                      let e = t$(),
                                        { height: t } = tj();
                                      return {
                                        scrollHeight: Math.round(
                                          (
                                            document.scrollingElement ||
                                            document.documentElement
                                          ).scrollHeight,
                                        ),
                                        scrollDepth: Math.round(t + e),
                                        scrollTop: e,
                                      };
                                    })(),
                                  );
                                },
                                t,
                                { leading: !1, trailing: !0 },
                              ),
                              r =
                                document.scrollingElement ||
                                document.documentElement,
                              o = new ResizeObserver((0, g.l)(n.throttled));
                            r && o.observe(r);
                            let a = (0, eI.W)(
                              e,
                              window,
                              "scroll",
                              n.throttled,
                              { passive: !0 },
                            );
                            return () => {
                              (n.cancel(), o.disconnect(), a.stop());
                            };
                          }
                        });
                      })(e),
                    ) {
                      let r = 0,
                        o = 0,
                        a = 0,
                        s = n.subscribe(
                          ({
                            scrollDepth: e,
                            scrollTop: n,
                            scrollHeight: s,
                          }) => {
                            let u = !1;
                            if ((e > r && ((r = e), (u = !0)), s > o)) {
                              o = s;
                              let e = (0, x.H)();
                              ((a = (0, x.G)(t.relative, e)), (u = !0));
                            }
                            u &&
                              i({
                                maxDepth: Math.min(r, o),
                                maxDepthScrollTop: n,
                                maxScrollHeight: o,
                                maxScrollHeightTime: a,
                              });
                          },
                        );
                      return { stop: () => s.unsubscribe() };
                    })(r, s, (e) => {
                      c.scroll = e;
                    }),
                    { stop: p } = (function (e, t, i) {
                      let n, r, o, a, s;
                      if (!(eC(u.LAYOUT_SHIFT) && "WeakRef" in window))
                        return { stop: b.z };
                      let c = 0;
                      i({ value: 0 });
                      let l =
                          ((a = 0),
                          (s = 0),
                          {
                            update: (e) => {
                              let t;
                              return (
                                void 0 === r ||
                                e.startTime - o >= tG ||
                                e.startTime - r >= tF
                                  ? ((r = o = e.startTime),
                                    (s = a = e.value),
                                    (t = !0))
                                  : ((a += e.value),
                                    (o = e.startTime),
                                    (t = e.value > s) && (s = e.value)),
                                { cumulatedValue: a, isMaxValue: t }
                              );
                            },
                          }),
                        d = ew(e, {
                          type: u.LAYOUT_SHIFT,
                          buffered: !0,
                        }).subscribe((r) => {
                          var o;
                          for (let a of r) {
                            if (a.hadRecentInput || a.startTime < t) continue;
                            let { cumulatedValue: r, isMaxValue: s } =
                              l.update(a);
                            if (s) {
                              let e = (function (e) {
                                let t;
                                for (let i of e)
                                  if (i.node && eO(i.node)) {
                                    let e = tU(i);
                                    (!t || tU(t) < e) && (t = i);
                                  }
                                return t;
                              })(a.sources);
                              n = {
                                target: (null == e ? void 0 : e.node)
                                  ? new WeakRef(e.node)
                                  : void 0,
                                time: (0, x.G)(t, a.startTime),
                                previousRect:
                                  null == e ? void 0 : e.previousRect,
                                currentRect: null == e ? void 0 : e.currentRect,
                                devicePixelRatio: window.devicePixelRatio,
                              };
                            }
                            if (r > c) {
                              c = r;
                              let t =
                                null == (o = null == n ? void 0 : n.target)
                                  ? void 0
                                  : o.deref();
                              i({
                                value: (0, en.I)(c, 4),
                                targetSelector:
                                  t && eK(t, e.actionNameAttribute),
                                time: null == n ? void 0 : n.time,
                                previousRect: (
                                  null == n ? void 0 : n.previousRect
                                )
                                  ? tV(n.previousRect)
                                  : void 0,
                                currentRect: (
                                  null == n ? void 0 : n.currentRect
                                )
                                  ? tV(n.currentRect)
                                  : void 0,
                                devicePixelRatio:
                                  null == n ? void 0 : n.devicePixelRatio,
                              });
                            }
                          }
                        });
                      return {
                        stop: () => {
                          d.unsubscribe();
                        },
                      };
                    })(r, s.relative, (e) => {
                      ((c.cumulativeLayoutShift = e), o());
                    }),
                    {
                      stop: m,
                      getInteractionToNextPaint: v,
                      setViewEnd: h,
                    } = (function (e, t, n) {
                      var r;
                      let o, a, s, c;
                      if (
                        !(
                          eC(u.EVENT) &&
                          window.PerformanceEventTiming &&
                          "interactionId" in PerformanceEventTiming.prototype
                        )
                      )
                        return {
                          getInteractionToNextPaint: () => void 0,
                          setViewEnd: b.z,
                          stop: b.z,
                        };
                      let {
                          getViewInteractionCount: l,
                          stopViewInteractionCount: d,
                        } =
                          ((r = n),
                          "interactionCount" in performance ||
                            i ||
                            (i = new window.PerformanceObserver(
                              (0, g.l)((e) => {
                                e.getEntries().forEach((e) => {
                                  e.interactionId &&
                                    ((tB = Math.min(tB, e.interactionId)),
                                    (tH =
                                      ((tK = Math.max(tK, e.interactionId)) -
                                        tB) /
                                        7 +
                                      1));
                                });
                              }),
                            )).observe({
                              type: "event",
                              buffered: !0,
                              durationThreshold: 0,
                            }),
                          (s = r === eh.INITIAL_LOAD ? 0 : tz()),
                          (c = { stopped: !1 }),
                          {
                            getViewInteractionCount: () =>
                              c.stopped ? c.interactionCount : tz() - s,
                            stopViewInteractionCount: () => {
                              c = { stopped: !0, interactionCount: tz() - s };
                            },
                          }),
                        f = 1 / 0,
                        p = (function (e) {
                          let t = [];
                          function i() {
                            t.sort((e, t) => t.duration - e.duration).splice(
                              10,
                            );
                          }
                          return {
                            process(e) {
                              let n = t.findIndex(
                                  (t) => e.interactionId === t.interactionId,
                                ),
                                r = t[t.length - 1];
                              -1 !== n
                                ? e.duration > t[n].duration &&
                                  ((t[n] = e), i())
                                : (t.length < 10 || e.duration > r.duration) &&
                                  (t.push(e), i());
                            },
                            estimateP98Interaction() {
                              let i = Math.min(
                                t.length - 1,
                                Math.floor(e() / 50),
                              );
                              return t[i];
                            },
                          };
                        })(l),
                        m = -1;
                      function v(i) {
                        for (let e of i)
                          e.interactionId &&
                            e.startTime >= t &&
                            e.startTime <= f &&
                            p.process(e);
                        let n = p.estimateP98Interaction();
                        if (n && n.duration !== m) {
                          var r;
                          let i;
                          ((m = n.duration),
                            (a = (0, x.G)(t, n.startTime)),
                            (r = n.startTime),
                            (i = tl.get(r)),
                            tl.delete(r),
                            !(o = i) &&
                              n.target &&
                              eO(n.target) &&
                              (o = eK(n.target, e.actionNameAttribute)));
                        }
                      }
                      let y = ew(e, {
                          type: u.FIRST_INPUT,
                          buffered: !0,
                        }).subscribe(v),
                        h = ew(e, {
                          type: u.EVENT,
                          durationThreshold: 40,
                          buffered: !0,
                        }).subscribe(v);
                      return {
                        getInteractionToNextPaint: () =>
                          m >= 0
                            ? {
                                value: Math.min(m, tW),
                                targetSelector: o,
                                time: a,
                              }
                            : l()
                              ? { value: 0 }
                              : void 0,
                        setViewEnd: (e) => {
                          ((f = e), d());
                        },
                        stop: () => {
                          (h.unsubscribe(), y.unsubscribe());
                        },
                      };
                    })(r, s.relative, a);
                  return {
                    stop: () => {
                      (l(), p(), f());
                    },
                    stopINPTracking: m,
                    setLoadEvent: d,
                    setViewEnd: h,
                    getCommonViewMetrics: () => (
                      (c.interactionToNextPaint = v()),
                      c
                    ),
                  };
                })(e, t, n, r, K, a, s),
                { stop: D, initialViewMetrics: U } =
                  a === eh.INITIAL_LOAD
                    ? (function (e, t, i, n) {
                        var r, o;
                        let a,
                          s = {},
                          { stop: c } = (function (e, t, i = tN) {
                            return (function (e, t) {
                              let i,
                                { stop: n } = tA(e, "complete", () => {
                                  i = (0, eA.Q)(() => t());
                                });
                              return {
                                stop: () => {
                                  (n(), (0, eA.z)(i));
                                },
                              };
                            })(e, () => {
                              var e;
                              let n = i();
                              n.loadEventEnd <= 0 ||
                                t({
                                  domComplete: (e = n).domComplete,
                                  domContentLoaded: e.domContentLoadedEventEnd,
                                  domInteractive: e.domInteractive,
                                  loadEvent: e.loadEventEnd,
                                  firstByte:
                                    e.responseStart >= 0 &&
                                    e.responseStart <= (0, x.H)()
                                      ? e.responseStart
                                      : void 0,
                                });
                            });
                          })(e, (e) => {
                            (i(e.loadEvent), (s.navigationTimings = e), n());
                          }),
                          l = tD(e, t),
                          { stop: d } =
                            ((r = (e) => {
                              ((s.firstContentfulPaint = e), n());
                            }),
                            {
                              stop: ew(e, {
                                type: u.PAINT,
                                buffered: !0,
                              }).subscribe((e) => {
                                let t = e.find(
                                  (e) =>
                                    "first-contentful-paint" === e.name &&
                                    e.startTime < l.timeStamp &&
                                    e.startTime < tM,
                                );
                                t && r(t.startTime);
                              }).unsubscribe,
                            }),
                          { stop: f } = (function (e, t, i, n) {
                            let r = 1 / 0,
                              { stop: o } = (0, eI.U)(
                                e,
                                i,
                                ["pointerdown", "keydown"],
                                (e) => {
                                  r = e.timeStamp;
                                },
                                { capture: !0, once: !0 },
                              ),
                              a = 0,
                              s = ew(e, {
                                type: u.LARGEST_CONTENTFUL_PAINT,
                                buffered: !0,
                              }).subscribe((i) => {
                                let o = (0, Q.x)(
                                  i,
                                  (e) =>
                                    e.entryType ===
                                      u.LARGEST_CONTENTFUL_PAINT &&
                                    e.startTime < r &&
                                    e.startTime < t.timeStamp &&
                                    e.startTime < tP &&
                                    e.size > a,
                                );
                                if (o) {
                                  var s;
                                  let t;
                                  (o.element &&
                                    (t = eK(o.element, e.actionNameAttribute)),
                                    n({
                                      value: o.startTime,
                                      targetSelector: t,
                                      resourceUrl:
                                        "" === (s = o).url ? void 0 : s.url,
                                    }),
                                    (a = o.size));
                                }
                              });
                            return {
                              stop: () => {
                                (o(), s.unsubscribe());
                              },
                            };
                          })(e, l, window, (e) => {
                            ((s.largestContentfulPaint = e), n());
                          }),
                          { stop: p } =
                            ((o = (e) => {
                              ((s.firstInput = e), n());
                            }),
                            (a = ew(e, {
                              type: u.FIRST_INPUT,
                              buffered: !0,
                            }).subscribe((t) => {
                              let i = t.find((e) => e.startTime < l.timeStamp);
                              if (i) {
                                let t,
                                  n = (0, x.G)(i.startTime, i.processingStart);
                                (i.target &&
                                  eO(i.target) &&
                                  (t = eK(i.target, e.actionNameAttribute)),
                                  o({
                                    delay: n >= 0 ? n : 0,
                                    time: i.startTime,
                                    targetSelector: t,
                                  }));
                              }
                            })),
                            {
                              stop: () => {
                                a.unsubscribe();
                              },
                            });
                        return {
                          stop: function () {
                            (c(), d(), f(), p(), l.stop());
                          },
                          initialViewMetrics: s,
                        };
                      })(r, s, O, K)
                    : { stop: b.z, initialViewMetrics: {} };
              a === eh.BF_CACHE &&
                ((d = s.relative),
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    ((e) => {
                      ((U.firstContentfulPaint = e),
                        (U.largestContentfulPaint = { value: e }),
                        K());
                    })((0, x.G)(d, (0, x.H)()));
                  });
                }));
              let { stop: V, eventCounts: F } = (function (e, t, i) {
                  let { stop: n, eventCounts: r } = eE({
                    lifeCycle: e,
                    isChildEvent: (e) => e.view.id === t,
                    onChange: i,
                  });
                  return { stop: n, eventCounts: r };
                })(e, p, K),
                G = (0, eA.y)(z, tJ),
                H = e.subscribe(11, (e) => {
                  e.reason === l.C.UNLOADING && z();
                });
              function B() {
                e.notify(3, {
                  id: p,
                  name: E,
                  context: S.getContext(),
                  startClocks: s,
                  sessionIsActive: _,
                });
              }
              function K() {
                (B(), N());
              }
              function z() {
                (R(), B(), (h += 1));
                let t = void 0 === f ? (0, tL.J)() : f.timeStamp;
                e.notify(4, {
                  customTimings: v,
                  documentVersion: h,
                  id: p,
                  name: E,
                  service: A,
                  version: I,
                  context: S.getContext(),
                  loadingType: a,
                  location: T,
                  startClocks: s,
                  commonViewMetrics: P(),
                  initialViewMetrics: U,
                  duration: (0, tL.G)(s.timeStamp, t),
                  isActive: void 0 === f,
                  sessionIsActive: _,
                  eventCounts: F,
                });
              }
              return (
                z(),
                S.changeObservable.subscribe(K),
                {
                  get name() {
                    return E;
                  },
                  service: A,
                  version: I,
                  contextManager: S,
                  stopObservable: m,
                  end(t = {}) {
                    var i, n;
                    f ||
                      ((f = null != (i = t.endClocks) ? i : (0, tL.o)()),
                      (_ = null == (n = t.sessionIsActive) || n),
                      e.notify(5, { endClocks: f }),
                      e.notify(6, { endClocks: f }),
                      (0, eA.x)(G),
                      L(f.relative),
                      k(),
                      H.unsubscribe(),
                      z(),
                      (0, eA.Q)(() => {
                        this.stop();
                      }, tX));
                  },
                  stop() {
                    (D(), V(), M(), m.notify());
                  },
                  addTiming(e, t) {
                    var i;
                    let n;
                    if (f) return;
                    let r = (0, tL.F)(t) ? t : (0, tL.G)(s.timeStamp, t);
                    ((v[
                      ((n = (i = e).replace(/[^a-zA-Z0-9-_.@$]/g, "_")) !== i &&
                        ty.s.warn(
                          `Invalid timing name: ${i}, sanitized to: ${n}`,
                        ),
                      n)
                    ] = r),
                      K());
                  },
                  setViewName(e) {
                    ((E = e), z());
                  },
                }
              );
            })(t, n, r, o, e, a, s, c);
            return (
              p.add(d),
              d.stopObservable.subscribe(() => {
                p.delete(d);
              }),
              d
            );
          }
          return (
            t.subscribe(10, () => {
              m = v(eh.ROUTE_CHANGE, void 0, {
                name: m.name,
                service: m.service,
                version: m.version,
                context: m.contextManager.getContext(),
              });
            }),
            t.subscribe(9, () => {
              m.end({ sessionIsActive: !1 });
            }),
            s &&
              ((f = a.subscribe(({ oldLocation: e, newLocation: t }) => {
                var i, n;
                let r;
                ((i = e),
                  (n = t),
                  (i.pathname === n.pathname &&
                    (("" !== (r = n.hash.substring(1)) &&
                      document.getElementById(r)) ||
                      tQ(n.hash) === tQ(i.hash))) ||
                    (m.end(), (m = v(eh.ROUTE_CHANGE))));
              })),
              o.trackBfcacheViews &&
                (d = (function (e, t) {
                  let { stop: i } = (0, eI.W)(
                    e,
                    window,
                    "pageshow",
                    (e) => {
                      e.persisted && t(e);
                    },
                    { capture: !0 },
                  );
                  return i;
                })(o, (e) => {
                  m.end();
                  let t = (0, tL.j)(e.timeStamp);
                  m = v(eh.BF_CACHE, t, void 0);
                }))),
            {
              addTiming: (e, t = (0, tL.J)()) => {
                m.addTiming(e, t);
              },
              startView: (e, t) => {
                (m.end({ endClocks: t }), (m = v(eh.ROUTE_CHANGE, t, e)));
              },
              setViewContext: (e) => {
                m.contextManager.setContext(e);
              },
              setViewContextProperty: (e, t) => {
                m.contextManager.setContextProperty(e, t);
              },
              setViewName: (e) => {
                m.setViewName(e);
              },
              getViewContext: () => m.contextManager.getContext(),
              stop: () => {
                (f && f.unsubscribe(),
                  d && d(),
                  m.end(),
                  p.forEach((e) => e.stop()));
              },
            }
          );
        })(F, el, eM, eV, e, eU, !e.trackViewsManually, s));
        eu.push(ti);
        let { stop: tn } = (function (e, t) {
          if (!t.metricsEnabled) return { stop: b.z };
          let { unsubscribe: i } = e.subscribe(
            4,
            ({ initialViewMetrics: e }) => {
              var t, n;
              e.largestContentfulPaint &&
                e.navigationTimings &&
                ((0, d.W)("Initial view metrics", {
                  metrics:
                    ((t = e.largestContentfulPaint),
                    (n = e.navigationTimings),
                    {
                      lcp: { value: t.value },
                      navigation: {
                        domComplete: n.domComplete,
                        domContentLoaded: n.domContentLoaded,
                        domInteractive: n.domInteractive,
                        firstByte: n.firstByte,
                        loadEvent: n.loadEvent,
                      },
                    }),
                }),
                i());
            },
          );
          return { stop: i };
        })(el, eL);
        eu.push(tn);
        let { stop: tr } = (function (
          e,
          t,
          i,
          n = (function () {
            let e = [];
            function t(t) {
              let n;
              if (t.didTimeout) {
                let e = performance.now();
                n = () => 30 - (performance.now() - e);
              } else n = t.timeRemaining.bind(t);
              for (; n() > 0 && e.length; ) e.shift()();
              e.length && i();
            }
            function i() {
              tT(t, { timeout: tS });
            }
            return {
              push(t) {
                1 === e.push(t) && i();
              },
              stop() {
                e.length = 0;
              },
            };
          })(),
          r = function (e, t, i = tN) {
            tA(e, "interactive", () => {
              let e = i(),
                n = Object.assign(e.toJSON(), {
                  entryType: u.RESOURCE,
                  initiatorType: D,
                  duration: e.responseEnd,
                  traceId: (function (e) {
                    var t;
                    let i,
                      n,
                      r =
                        ((i = (t = e).querySelector("meta[name=dd-trace-id]")),
                        (n = t.querySelector("meta[name=dd-trace-time]")),
                        tw(i && i.content, n && n.content) ||
                          (function (e) {
                            let t = (function (e) {
                              for (let t = 0; t < e.childNodes.length; t += 1) {
                                let i = tC(e.childNodes[t]);
                                if (i) return i;
                              }
                              if (e.body)
                                for (
                                  let t = e.body.childNodes.length - 1;
                                  t >= 0;
                                  t -= 1
                                ) {
                                  let i = e.body.childNodes[t],
                                    n = tC(i);
                                  if (n) return n;
                                  if (!eN(i)) break;
                                }
                            })(e);
                            if (t)
                              return tw(
                                (0, em.H)(t, "trace-id"),
                                (0, em.H)(t, "trace-time"),
                              );
                          })(e));
                    if (!(!r || r.traceTime <= (0, x.C)() - tI))
                      return r.traceId;
                  })(document),
                  toJSON: () => ({ ...n, toJSON: void 0 }),
                });
              t(n);
            });
          },
        ) {
          let o,
            a = t.trackEarlyRequests;
          if (a) {
            let t, i;
            ((t = new Set()),
              (i = e.subscribe(8, (e) => {
                (t.add(e),
                  t.size > 1e3 &&
                    ((0, d.Y)("Too many requests"),
                    t.delete(t.values().next().value)));
              })),
              (o = {
                getMatchingRequest(e) {
                  let i,
                    n = 1 / 0;
                  for (let r of t) {
                    let t = e.startTime - r.startClocks.relative;
                    0 <= t &&
                      t < n &&
                      r.url === e.name &&
                      ((n = Math.abs(t)), (i = r));
                  }
                  return (i && t.delete(i), i);
                },
                stop() {
                  i.unsubscribe();
                },
              }));
          } else
            e.subscribe(8, (e) => {
              c(() => {
                var n, r, o;
                return (
                  (n = e),
                  (r = t),
                  (o = i),
                  tx(
                    (function (e) {
                      if (!performance || !("getEntriesByName" in performance))
                        return;
                      let t = performance.getEntriesByName(e.url, "resource");
                      if (!t.length || !("toJSON" in t[0])) return;
                      let i = t
                        .filter((e) => !t_.has(e))
                        .filter((e) => K(e) && z(e))
                        .filter((t) => {
                          var i, n, r;
                          return (
                            (i = t),
                            (n = e.startClocks.relative),
                            (r = tE({
                              startTime: e.startClocks.relative,
                              duration: e.duration,
                            })),
                            i.startTime >= n - 1 && tE(i) <= (0, x.z)(r, 1)
                          );
                        });
                      if (1 === i.length) return (t_.add(i[0]), i[0].toJSON());
                    })(n),
                    n,
                    o,
                    r,
                  )
                );
              });
            });
          let s = ew(t, { type: u.RESOURCE, buffered: !0 }).subscribe((e) => {
            for (let n of e) (a || !G(n)) && c(() => tO(n, t, i, o));
          });
          function c(t) {
            n.push(() => {
              let i = t();
              i && e.notify(12, i);
            });
          }
          return (
            r(t, (e) => {
              c(() => tO(e, t, i, o));
            }),
            {
              stop: () => {
                (n.stop(), s.unsubscribe());
              },
            }
          );
        })(el, e, eH);
        if ((eu.push(tr), e.trackLongTasks))
          if (eC(u.LONG_ANIMATION_FRAME)) {
            let t,
              { stop: i } =
                ((t = ew(e, {
                  type: u.LONG_ANIMATION_FRAME,
                  buffered: !0,
                }).subscribe((e) => {
                  for (let t of e) {
                    let e = (0, x.j)(t.startTime),
                      i = {
                        date: e.timeStamp,
                        long_task: {
                          id: (0, em.o)(),
                          entry_type: ey.LONG_ANIMATION_FRAME,
                          duration: (0, x.T)(t.duration),
                          blocking_duration: (0, x.T)(t.blockingDuration),
                          first_ui_event_timestamp: (0, x.T)(
                            t.firstUIEventTimestamp,
                          ),
                          render_start: (0, x.T)(t.renderStart),
                          style_and_layout_start: (0, x.T)(
                            t.styleAndLayoutStart,
                          ),
                          start_time: (0, x.T)(t.startTime),
                          scripts: t.scripts.map((e) => ({
                            duration: (0, x.T)(e.duration),
                            pause_duration: (0, x.T)(e.pauseDuration),
                            forced_style_and_layout_duration: (0, x.T)(
                              e.forcedStyleAndLayoutDuration,
                            ),
                            start_time: (0, x.T)(e.startTime),
                            execution_start: (0, x.T)(e.executionStart),
                            source_url: e.sourceURL,
                            source_function_name: e.sourceFunctionName,
                            source_char_position: e.sourceCharPosition,
                            invoker: e.invoker,
                            invoker_type: e.invokerType,
                            window_attribution: e.windowAttribution,
                          })),
                        },
                        type: eb.LONG_TASK,
                        _dd: { discarded: !1 },
                      };
                    el.notify(12, {
                      rawRumEvent: i,
                      startTime: e.relative,
                      duration: t.duration,
                      domainContext: { performanceEntry: t },
                    });
                  }
                })),
                { stop: () => t.unsubscribe() });
            eu.push(i);
          } else
            ew(e, { type: u.LONG_TASK, buffered: !0 }).subscribe((t) => {
              for (let i of t) {
                if (i.entryType !== u.LONG_TASK || !e.trackLongTasks) break;
                let t = (0, x.j)(i.startTime),
                  n = {
                    date: t.timeStamp,
                    long_task: {
                      id: (0, em.o)(),
                      entry_type: ey.LONG_TASK,
                      duration: (0, x.T)(i.duration),
                    },
                    type: eb.LONG_TASK,
                    _dd: { discarded: !1 },
                  };
                el.notify(12, {
                  rawRumEvent: n,
                  startTime: t.relative,
                  duration: i.duration,
                  domainContext: { performanceEntry: i },
                });
              }
            });
        let { addError: to } =
          ((ea = new y.S()),
          k.subscribe((e) => {
            0 === e.type && ea.notify(e.error);
          }),
          (0, tb.f)([ty.T.error]).subscribe((e) => ea.notify(e.error)),
          (0, th.w)(e, [th.$.cspViolation, th.$.intervention]).subscribe((e) =>
            ea.notify(e),
          ),
          ea.subscribe((e) => el.notify(14, { error: e })),
          (B = el).subscribe(14, ({ error: e }) => {
            var t;
            let i, n;
            B.notify(
              12,
              ((i = {
                date: (t = e).startClocks.timeStamp,
                error: {
                  id: (0, em.o)(),
                  message: t.message,
                  source: t.source,
                  stack: t.stack,
                  handling_stack: t.handlingStack,
                  component_stack: t.componentStack,
                  type: t.type,
                  handling: t.handling,
                  causes: t.causes,
                  source_type: "browser",
                  fingerprint: t.fingerprint,
                  csp: t.csp,
                },
                type: eb.ERROR,
                context: t.context,
              }),
              (n = { error: t.originalError, handlingStack: t.handlingStack }),
              {
                rawRumEvent: i,
                startTime: t.startClocks.relative,
                domainContext: n,
              }),
            );
          }),
          {
            addError: ({
              error: e,
              handlingStack: t,
              componentStack: i,
              startClocks: n,
              context: r,
            }) => {
              let o = (0, tg.K)({
                originalError: e,
                handlingStack: t,
                componentStack: i,
                startClocks: n,
                nonErrorPrefix: "Provided",
                source: tv.f.CUSTOM,
                handling: "handled",
              });
              ((o.context = (0, ep.i)(o.context, r)),
                B.notify(14, { error: o }));
            },
          });
        (k.unbuffer(),
          (es = ec(e, ek, eq, ej)),
          (W = el),
          ($ = e),
          (q = es),
          (0, R.f)($).subscribe((e) => {
            if (Y(e.url))
              switch (e.state) {
                case "start":
                  (q.traceXhr(e, e.xhr),
                    (e.requestIndex = ef()),
                    W.notify(7, { requestIndex: e.requestIndex, url: e.url }));
                  break;
                case "complete":
                  (q.clearTracingIfNeeded(e),
                    W.notify(8, {
                      duration: e.duration,
                      method: e.method,
                      requestIndex: e.requestIndex,
                      spanId: e.spanId,
                      startClocks: e.startClocks,
                      status: e.status,
                      traceId: e.traceId,
                      traceSampled: e.traceSampled,
                      type: C.$.XHR,
                      url: e.url,
                      xhr: e.xhr,
                      isAborted: e.isAborted,
                      handlingStack: e.handlingStack,
                      body: e.body,
                    }));
              }
          }),
          (j = el),
          (J = es),
          (0, N.f)().subscribe((e) => {
            if (Y(e.url))
              switch (e.state) {
                case "start":
                  (J.traceFetch(e),
                    (e.requestIndex = ef()),
                    j.notify(7, { requestIndex: e.requestIndex, url: e.url }));
                  break;
                case "resolve":
                  var t, i;
                  let n;
                  ((t = e),
                    (i = (t) => {
                      var i;
                      (J.clearTracingIfNeeded(e),
                        j.notify(8, {
                          duration: t,
                          method: e.method,
                          requestIndex: e.requestIndex,
                          responseType: e.responseType,
                          spanId: e.spanId,
                          startClocks: e.startClocks,
                          status: e.status,
                          traceId: e.traceId,
                          traceSampled: e.traceSampled,
                          type: C.$.FETCH,
                          url: e.url,
                          response: e.response,
                          init: e.init,
                          input: e.input,
                          isAborted: e.isAborted,
                          handlingStack: e.handlingStack,
                          body: null == (i = e.init) ? void 0 : i.body,
                        }));
                    }),
                    (n = t.response && (0, L.D)(t.response)) && n.body
                      ? (0, O.f)(
                          n.body,
                          () => {
                            i((0, x.G)(t.startClocks.timeStamp, (0, x.J)()));
                          },
                          { bytesLimit: 1 / 0, collectStreamBody: !1 },
                        )
                      : i((0, x.G)(t.startClocks.timeStamp, (0, x.J)())));
              }
          }));
        let tm = io(el, eH, A),
          tR =
            ((H = e.applicationId),
            {
              get: (e) => {
                let t = eB.findView(e),
                  i = ez.findUrl(e),
                  n = ek.findTrackedSession(e);
                if (n && t && i) {
                  let r = eY.findActionId(e);
                  return {
                    application_id: H,
                    session_id: n.id,
                    user_action: r ? { id: r } : void 0,
                    view: {
                      id: t.id,
                      name: t.name,
                      referrer: i.referrer,
                      url: i.url,
                    },
                  };
                }
              },
            });
        return (
          eu.push(() => n.stop()),
          {
            addAction: eX,
            addEvent: eQ,
            addError: to,
            addTiming: e1,
            addFeatureFlagEvaluation: eW.addFeatureFlagEvaluation,
            startView: e3,
            setViewContext: e2,
            setViewContextProperty: e9,
            getViewContext: tt,
            setViewName: e4,
            lifeCycle: el,
            viewHistory: eB,
            session: ek,
            stopSession: () => ek.expire(),
            getInternalContext: tR.get,
            startDurationVital: tm.startDurationVital,
            stopDurationVital: tm.stopDurationVital,
            addDurationVital: tm.addDurationVital,
            addOperationStepVital: tm.addOperationStepVital,
            globalContext: e$,
            userContext: eq,
            accountContext: ej,
            telemetry: eL,
            stop: () => {
              eu.forEach((e) => e());
            },
            hooks: ed,
          }
        );
      },
    ],
    2069,
  ),
    e.s([], 82314));
};
