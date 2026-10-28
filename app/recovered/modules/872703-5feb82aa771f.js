// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    s = e.i(445242),
    a = e.i(157633),
    l = e.i(745018),
    r = e.i(534061),
    i = e.i(426091),
    o = e.i(517770),
    n = e.i(789022),
    c = e.i(907484),
    d = e.i(352386);
  e.i(12692);
  var u = e.i(398902),
    m = e.i(412427),
    h = e.i(845785),
    p = e.i(855376),
    b = e.i(827935),
    g = e.i(254667),
    f = e.i(886813),
    x = e.i(77962);
  let v = "jg777hurg3m5612bf57uirt9k";
  var j = e.i(113939),
    y = e.i(267350),
    N = e.i(338319);
  let k = (e) => {
    try {
      b.F.destroyMonitor(e);
    } catch {}
  };
  var z = d;
  let w = (e) =>
    e instanceof Error &&
    e.message.includes("Cannot destructure property 'loader'") &&
    e.message.includes("$state");
  class _ extends z.Component {
    state = { hasError: !1, canRetry: !1, isVidstackError: !1 };
    retryFrame = null;
    static getDerivedStateFromError(e) {
      return { hasError: !0, canRetry: !1, isVidstackError: w(e) };
    }
    componentDidCatch(e, t) {
      w(e)
        ? (this.retryFrame = requestAnimationFrame(() => {
            ((this.retryFrame = null),
              this.setState((e) => ({ ...e, canRetry: !0 })));
          }))
        : this.props.onError?.();
    }
    componentWillUnmount() {
      null !== this.retryFrame &&
        (cancelAnimationFrame(this.retryFrame), (this.retryFrame = null));
    }
    render() {
      return this.state.hasError
        ? this.state.isVidstackError
          ? this.state.canRetry
            ? this.props.children
            : null
          : (this.props.fallback ?? null)
        : this.props.children;
    }
  }
  var P = e.i(271373);
  let S = (e) => {
      let a,
        l,
        r,
        i,
        o,
        n = (0, s.c)(20);
      n[0] !== e ? ((a = E(e)), (n[0] = e), (n[1] = a)) : (a = n[1]);
      let { playerSrc: c, sourceKey: u } = a,
        [m, h] = (0, d.useState)(null),
        [p, b] = (0, d.useState)(u);
      u !== p && (b(u), h(null));
      let g = m === u;
      n[2] !== e || n[3] !== u
        ? ((l = () => {
            (h(u), e.onError?.());
          }),
          (n[2] = e),
          (n[3] = u),
          (n[4] = l))
        : (l = n[4]);
      let f = l;
      if (g) {
        let s;
        return (
          n[5] !== e.className || n[6] !== e.src
            ? ((s = (0, t.jsx)(I, { className: e.className, src: e.src })),
              (n[5] = e.className),
              (n[6] = e.src),
              (n[7] = s))
            : (s = n[7]),
          s
        );
      }
      return (
        n[8] !== e.className || n[9] !== e.src
          ? ((r = (0, t.jsx)(I, { className: e.className, src: e.src })),
            (n[8] = e.className),
            (n[9] = e.src),
            (n[10] = r))
          : (r = n[10]),
        n[11] !== f || n[12] !== c || n[13] !== e
          ? ((i = (0, t.jsx)(C, { ...e, onError: f, playerSrc: c })),
            (n[11] = f),
            (n[12] = c),
            (n[13] = e),
            (n[14] = i))
          : (i = n[14]),
        n[15] !== f || n[16] !== u || n[17] !== r || n[18] !== i
          ? ((o = (0, t.jsx)(_, { fallback: r, onError: f, children: i }, u)),
            (n[15] = f),
            (n[16] = u),
            (n[17] = r),
            (n[18] = i),
            (n[19] = o))
          : (o = n[19]),
        o
      );
    },
    E = ({ src: e, sourceType: t, sources: s }) => {
      let a = [];
      for (let e of s ?? []) {
        if (0 === e.src.length) continue;
        let t = (0, P.g)({ src: e.src, mimeType: e.mimeType });
        a.push({ src: e.src, ...(t ? { type: t } : {}) });
      }
      if (a.length > 0) return { playerSrc: a, sourceKey: JSON.stringify(a) };
      let l = (0, P.g)({ src: e, mimeType: t }),
        r = { src: e, ...(l ? { type: l } : {}) };
      return { playerSrc: l ? [r] : e, sourceKey: JSON.stringify([r]) };
    },
    I = (e) => {
      let a,
        r,
        o,
        n,
        c,
        d,
        m,
        h = (0, s.c)(16),
        { src: p, className: b } = e,
        { t: g } = (0, u.f)();
      return (
        h[0] !== b
          ? ((a = (0, i.c)(
              "flex aspect-video w-full flex-col items-center justify-center gap-2 bg-bg-tertiary p-3 text-center",
              b,
            )),
            (h[0] = b),
            (h[1] = a))
          : (a = h[1]),
        h[2] !== g
          ? ((r = g("web.bounties.video_cant_play")), (h[2] = g), (h[3] = r))
          : (r = h[3]),
        h[4] !== r
          ? ((o = (0, t.jsx)("p", {
              className: "text-xs text-text-tertiary",
              children: r,
            })),
            (h[4] = r),
            (h[5] = o))
          : (o = h[5]),
        h[6] !== g
          ? ((n = g("web.bounties.open_video")), (h[6] = g), (h[7] = n))
          : (n = h[7]),
        h[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = (0, t.jsx)(l.q4, { className: "h-3 w-3" })), (h[8] = c))
          : (c = h[8]),
        h[9] !== p || h[10] !== n
          ? ((d = (0, t.jsxs)("a", {
              className:
                "pointer-events-auto inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-black/70",
              href: p,
              onClick: q,
              rel: "noreferrer",
              target: "_blank",
              children: [n, c],
            })),
            (h[9] = p),
            (h[10] = n),
            (h[11] = d))
          : (d = h[11]),
        h[12] !== a || h[13] !== o || h[14] !== d
          ? ((m = (0, t.jsxs)("div", { className: a, children: [o, d] })),
            (h[12] = a),
            (h[13] = o),
            (h[14] = d),
            (h[15] = m))
          : (m = h[15]),
        m
      );
    },
    C = (e) => {
      let a,
        l,
        c,
        u,
        z,
        w,
        _,
        P = (0, s.c)(34),
        {
          className: S,
          mediaClassName: E,
          controls: I,
          maxHeight: C,
          onError: T,
          onCanPlay: F,
          onPlay: q,
          autoPlay: A,
          loop: U,
          muted: B,
          playsInline: V,
          preload: J,
          load: M,
          posterLoad: O,
          poster: K,
          posterAlt: L,
          controlsVisibility: D,
          controlsLayout: W,
          playerSrc: $,
          muxAnalytics: G,
        } = e,
        Q = void 0 === I || I,
        Y = void 0 === V || V,
        Z = void 0 === J ? "metadata" : J,
        H = void 0 === L ? "" : L,
        X = void 0 === D ? "always" : D,
        ee = void 0 === W ? "default" : W,
        et = ((e) => {
          let t,
            a,
            l,
            r = (0, s.c)(4),
            i = (0, d.useRef)(null);
          r[0] !== e
            ? ((t = (t, s) => {
                if (
                  !e ||
                  !v ||
                  (i.current && (k(i.current), (i.current = null)),
                  !(0, x.UF)(t) && !(0, x.G4)(t))
                )
                  return;
                let a = t.video;
                i.current = a;
                let l = (0, N.e)() ?? m.J.ANONYMOUS;
                var r = {
                  debug: !1,
                  data: (() => {
                    try {
                      return j.f.getInstance();
                    } catch {
                      return j.f.init({ appName: h.v.PUMP_WEB });
                    }
                  })().build(h.$.Vod, h.J.VIDSTACK, {
                    envKey: v,
                    videoId: e.videoId,
                    videoTitle: e.videoTitle,
                    mintId: e.associatedCoinMint ?? e.bountyId,
                    creatorId: e.creatorId,
                    creatorCcUserId: e.creatorCcUserId,
                    viewerId: l,
                    viewerCcUserId: (0, N.Q)(),
                    sessionId: (0, y.d)(),
                    participantRole: m.E.PARTICIPANT,
                    page: e.page,
                    playerName: e.playerName,
                    experimentName: null,
                    property: p.f.PUMP_WEB,
                    deviceId: (0, f.$)() ?? "",
                  }),
                };
                try {
                  b.F.monitor(a, r);
                } catch (e) {
                  g.y.warn(
                    "[BountyMuxAnalytics] Mux monitor failed (analytics blocked?)",
                    { error: e instanceof Error ? e.message : String(e) },
                  );
                }
              }),
              (r[0] = e),
              (r[1] = t))
            : (t = r[1]);
          let o = t;
          if (
            (r[2] === Symbol.for("react.memo_cache_sentinel")
              ? ((a = () => () => {
                  i.current && (k(i.current), (i.current = null));
                }),
                (l = []),
                (r[2] = a),
                (r[3] = l))
              : ((a = r[2]), (l = r[3])),
            (0, d.useEffect)(a, l),
            e && v)
          )
            return o;
        })(G);
      P[0] !== C
        ? ((a = {
            ...(C ? { maxHeight: C } : {}),
            "--media-slider-thumb-size": "10px",
            "--media-slider-track-height": "3px",
          }),
          (P[0] = C),
          (P[1] = a))
        : (a = P[1]);
      let es = a;
      P[2] !== E
        ? ((l = (0, i.c)(
            "h-full w-full [&>video]:h-full [&>video]:w-full",
            E,
            E?.includes("object-cover") && "[&>video]:object-cover",
            E?.includes("object-contain") && "[&>video]:object-contain",
            E?.includes("object-fill") && "[&>video]:object-fill",
            E?.includes("object-none") && "[&>video]:object-none",
            E?.includes("object-scale-down") && "[&>video]:object-scale-down",
          )),
          (P[2] = E),
          (P[3] = l))
        : (l = P[3]);
      let ea = l,
        el = E?.includes("object-contain")
          ? "object-contain [&_img]:object-contain"
          : "object-cover [&_img]:object-cover";
      return (
        P[4] !== S
          ? ((c = (0, i.c)("group/bounty-video flex aspect-video w-full", S)),
            (P[4] = S),
            (P[5] = c))
          : (c = P[5]),
        P[6] !== ea
          ? ((u = (0, t.jsx)(n.s, { className: ea })), (P[6] = ea), (P[7] = u))
          : (u = P[7]),
        P[8] !== K || P[9] !== H || P[10] !== el
          ? ((z = K
              ? (0, t.jsx)(n.n, {
                  alt: H,
                  className: (0, i.c)(
                    "pointer-events-none absolute inset-0 z-0 h-full w-full bg-bg-tertiary opacity-0 transition-opacity duration-200 data-[visible]:opacity-100 [&_img]:h-full [&_img]:w-full",
                    el,
                  ),
                  src: K,
                })
              : null),
            (P[8] = K),
            (P[9] = H),
            (P[10] = el),
            (P[11] = z))
          : (z = P[11]),
        P[12] !== Q || P[13] !== ee || P[14] !== X
          ? ((w = Q
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(o.R, {
                      action: "toggle:paused",
                      className: "absolute inset-0 z-0 block h-full w-full",
                      event: "pointerup",
                    }),
                    (0, t.jsx)(o.R, {
                      action: "toggle:fullscreen",
                      className:
                        "absolute inset-0 z-0 hidden h-full w-full md:block",
                      event: "dblpointerup",
                    }),
                    (0, t.jsx)(R, {
                      controlsLayout: ee,
                      controlsVisibility: X,
                    }),
                  ],
                })
              : null),
            (P[12] = Q),
            (P[13] = ee),
            (P[14] = X),
            (P[15] = w))
          : (w = P[15]),
        P[16] !== A ||
        P[17] !== M ||
        P[18] !== U ||
        P[19] !== B ||
        P[20] !== F ||
        P[21] !== T ||
        P[22] !== et ||
        P[23] !== q ||
        P[24] !== $ ||
        P[25] !== es ||
        P[26] !== Y ||
        P[27] !== O ||
        P[28] !== Z ||
        P[29] !== u ||
        P[30] !== z ||
        P[31] !== w ||
        P[32] !== c
          ? ((_ = (0, t.jsxs)(n.O, {
              autoPlay: A,
              className: c,
              load: M,
              loop: U,
              muted: B,
              onCanPlay: F,
              onError: T,
              onPlay: q,
              onProviderChange: r.f,
              onProviderSetup: et,
              playsInline: Y,
              posterLoad: O,
              preload: Z,
              src: $,
              style: es,
              children: [u, z, w],
            })),
            (P[16] = A),
            (P[17] = M),
            (P[18] = U),
            (P[19] = B),
            (P[20] = F),
            (P[21] = T),
            (P[22] = et),
            (P[23] = q),
            (P[24] = $),
            (P[25] = es),
            (P[26] = Y),
            (P[27] = O),
            (P[28] = Z),
            (P[29] = u),
            (P[30] = z),
            (P[31] = w),
            (P[32] = c),
            (P[33] = _))
          : (_ = P[33]),
        _
      );
    },
    T =
      "group pointer-events-auto inline-flex size-7 items-center justify-center rounded-md bg-black/55 text-white transition-colors hover:bg-black/70",
    F =
      "group pointer-events-auto inline-flex size-6 items-center justify-center rounded-full text-white transition-colors hover:bg-bg-quaternary",
    R = (e) => {
      let l,
        r,
        n,
        d,
        u,
        m,
        h = (0, s.c)(20),
        { controlsLayout: p, controlsVisibility: b } = e,
        g =
          "hover" === b
            ? "opacity-0 transition-opacity duration-150 group-hover/bounty-video:opacity-100 group-focus-within/bounty-video:opacity-100"
            : "";
      if ("compact" === p) {
        let e, s, l, r;
        return (
          h[0] !== g
            ? ((e = (0, i.c)(
                "pointer-events-none absolute bottom-2.5 right-2.5 z-10",
                g,
              )),
              (h[0] = g),
              (h[1] = e))
            : (e = h[1]),
          h[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((s = (0, t.jsxs)(o.x, {
                className: F,
                children: [
                  (0, t.jsx)(a.qJ, {
                    className:
                      "hidden size-3 group-data-[paused]:block group-data-[ended]:hidden",
                    size: 12,
                  }),
                  (0, t.jsx)(a.kl, {
                    className:
                      "size-3 group-data-[paused]:hidden group-data-[ended]:hidden",
                    size: 12,
                  }),
                  (0, t.jsx)(a.B4, {
                    className: "hidden size-3 group-data-[ended]:block",
                    size: 12,
                  }),
                ],
              })),
              (h[2] = s))
            : (s = h[2]),
          h[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((l = (0, t.jsxs)("div", {
                className:
                  "flex items-center gap-0.5 rounded-full bg-black/50 px-0.5 py-0.5 backdrop-blur-sm",
                children: [
                  s,
                  (0, t.jsxs)(o.L, {
                    className: F,
                    children: [
                      (0, t.jsx)(a.kg, {
                        className:
                          "hidden size-3 group-data-[state='muted']:block",
                        size: 12,
                      }),
                      (0, t.jsx)(a.vj, {
                        className:
                          "hidden size-3 group-data-[state='low']:block",
                        size: 12,
                      }),
                      (0, t.jsx)(a.e, {
                        className:
                          "hidden size-3 group-data-[state='high']:block",
                        size: 12,
                      }),
                    ],
                  }),
                ],
              })),
              (h[3] = l))
            : (l = h[3]),
          h[4] !== e
            ? ((r = (0, t.jsx)("div", { className: e, children: l })),
              (h[4] = e),
              (h[5] = r))
            : (r = h[5]),
          r
        );
      }
      if ("minimal" === p) {
        let e, s, l, r;
        return (
          h[6] !== g
            ? ((e = (0, i.c)(
                "pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-end bg-gradient-to-t from-black/60 to-transparent px-2 pb-2 pt-6",
                g,
              )),
              (h[6] = g),
              (h[7] = e))
            : (e = h[7]),
          h[8] === Symbol.for("react.memo_cache_sentinel")
            ? ((s = (0, t.jsxs)(o.x, {
                className: T,
                children: [
                  (0, t.jsx)(a.qJ, {
                    className:
                      "hidden size-3.5 group-data-[paused]:block group-data-[ended]:hidden",
                    size: 14,
                  }),
                  (0, t.jsx)(a.kl, {
                    className:
                      "size-3.5 group-data-[paused]:hidden group-data-[ended]:hidden",
                    size: 14,
                  }),
                  (0, t.jsx)(a.B4, {
                    className: "hidden size-3.5 group-data-[ended]:block",
                    size: 14,
                  }),
                ],
              })),
              (h[8] = s))
            : (s = h[8]),
          h[9] === Symbol.for("react.memo_cache_sentinel")
            ? ((l = (0, t.jsxs)("div", {
                className: "flex items-center gap-1.5",
                children: [
                  s,
                  (0, t.jsxs)(o.L, {
                    className: T,
                    children: [
                      (0, t.jsx)(a.kg, {
                        className:
                          "hidden size-3.5 group-data-[state='muted']:block",
                        size: 14,
                      }),
                      (0, t.jsx)(a.vj, {
                        className:
                          "hidden size-3.5 group-data-[state='low']:block",
                        size: 14,
                      }),
                      (0, t.jsx)(a.e, {
                        className:
                          "hidden size-3.5 group-data-[state='high']:block",
                        size: 14,
                      }),
                    ],
                  }),
                ],
              })),
              (h[9] = l))
            : (l = h[9]),
          h[10] !== e
            ? ((r = (0, t.jsx)("div", { className: e, children: l })),
              (h[10] = e),
              (h[11] = r))
            : (r = h[11]),
          r
        );
      }
      return (
        h[12] !== g
          ? ((l = (0, i.c)(
              "pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 bg-gradient-to-t from-black/75 via-black/45 to-transparent px-2 pb-2 pt-4",
              g,
            )),
            (h[12] = g),
            (h[13] = l))
          : (l = h[13]),
        h[14] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = (0, t.jsxs)(c.f.Root, {
              className:
                "group pointer-events-auto relative inline-flex h-5 w-full cursor-pointer touch-none select-none items-center outline-none",
              children: [
                (0, t.jsxs)(c.f.Track, {
                  className: "relative h-[3px] w-full rounded-full bg-white/35",
                  children: [
                    (0, t.jsx)(c.f.TrackFill, {
                      className:
                        "absolute h-full w-[var(--slider-fill)] rounded-full bg-white will-change-[width]",
                    }),
                    (0, t.jsx)(c.f.Progress, {
                      className:
                        "absolute h-full w-[var(--slider-progress)] rounded-full bg-white/45 will-change-[width]",
                    }),
                  ],
                }),
                (0, t.jsx)(c.f.Thumb, {
                  className:
                    "absolute left-[var(--slider-fill)] top-1/2 block size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-white opacity-100 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] will-change-[left]",
                }),
              ],
            })),
            (h[14] = r))
          : (r = h[14]),
        h[15] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = (0, t.jsxs)(o.x, {
              className: T,
              children: [
                (0, t.jsx)(a.qJ, {
                  className:
                    "hidden size-3.5 group-data-[paused]:block group-data-[ended]:hidden",
                  size: 14,
                }),
                (0, t.jsx)(a.kl, {
                  className:
                    "size-3.5 group-data-[paused]:hidden group-data-[ended]:hidden",
                  size: 14,
                }),
                (0, t.jsx)(a.B4, {
                  className: "hidden size-3.5 group-data-[ended]:block",
                  size: 14,
                }),
              ],
            })),
            (h[15] = n))
          : (n = h[15]),
        h[16] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = (0, t.jsxs)(o.L, {
              className: T,
              children: [
                (0, t.jsx)(a.kg, {
                  className: "hidden size-3.5 group-data-[state='muted']:block",
                  size: 14,
                }),
                (0, t.jsx)(a.vj, {
                  className: "hidden size-3.5 group-data-[state='low']:block",
                  size: 14,
                }),
                (0, t.jsx)(a.e, {
                  className: "hidden size-3.5 group-data-[state='high']:block",
                  size: 14,
                }),
              ],
            })),
            (h[16] = d))
          : (d = h[16]),
        h[17] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = (0, t.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [
                n,
                (0, t.jsxs)("div", {
                  className: "flex items-center gap-1.5",
                  children: [
                    d,
                    (0, t.jsxs)(o.C, {
                      className: T,
                      children: [
                        (0, t.jsx)(a.El, {
                          className: "size-3.5 group-data-[active]:hidden",
                          size: 14,
                        }),
                        (0, t.jsx)(a.aI, {
                          className:
                            "hidden size-3.5 group-data-[active]:block",
                          size: 14,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })),
            (h[17] = u))
          : (u = h[17]),
        h[18] !== l
          ? ((m = (0, t.jsxs)("div", { className: l, children: [r, u] })),
            (h[18] = l),
            (h[19] = m))
          : (m = h[19]),
        m
      );
    };
  function q(e) {
    return e.stopPropagation();
  }
  e.s(
    [
      "BountyVideoPlayerImpl",
      0,
      (e) => {
        let a,
          l = (0, s.c)(2);
        return (
          l[0] !== e
            ? ((a = (0, t.jsx)(S, { ...e })), (l[0] = e), (l[1] = a))
            : (a = l[1]),
          a
        );
      },
    ],
    872703,
  );
};
