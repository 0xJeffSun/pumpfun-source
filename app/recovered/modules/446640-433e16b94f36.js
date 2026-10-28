// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(365089),
    a = e.i(352386);
  e.i(12692);
  var i = e.i(398902),
    n = e.i(781864);
  e.i(267146);
  var s = e.i(540805),
    o = e.i(56087),
    d = e.i(538794),
    c = e.i(338319),
    u = e.i(90832),
    m = e.i(422642),
    h = e.i(716983);
  function f(e) {
    let l,
      a,
      i,
      n,
      s = (0, r.c)(11),
      { background: o, cardWidth: d, cardHeight: c, hideBackground: u } = e,
      m = void 0 !== u && u,
      h = "loop" === o.type && "right_square" === o.fit;
    s[0] !== o || s[1] !== c || s[2] !== d || s[3] !== m
      ? ((l = m
          ? null
          : (0, t.jsx)(p, { background: o, cardWidth: d, cardHeight: c })),
        (s[0] = o),
        (s[1] = c),
        (s[2] = d),
        (s[3] = m),
        (s[4] = l))
      : (l = s[4]);
    let f = h
      ? "linear-gradient(90deg, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.86) 26%, rgba(10,10,15,0.45) 56%, rgba(10,10,15,0.12) 100%)"
      : "linear-gradient(180deg, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.35) 50%, rgba(10,10,15,0.75) 100%)";
    return (
      s[5] !== f
        ? ((a = (0, t.jsx)("div", {
            className: "absolute inset-0",
            style: { background: f },
          })),
          (s[5] = f),
          (s[6] = a))
        : (a = s[6]),
      s[7] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)("div", {
            className: "absolute inset-0",
            style: {
              background:
                "linear-gradient(180deg, rgba(10,10,15,0.5) 0%, transparent 26%, transparent 70%, rgba(10,10,15,0.62) 100%)",
            },
          })),
          (s[7] = i))
        : (i = s[7]),
      s[8] !== l || s[9] !== a
        ? ((n = (0, t.jsxs)("div", {
            "aria-hidden": !0,
            className: "pointer-events-none absolute inset-0 overflow-hidden",
            children: [l, a, i],
          })),
          (s[8] = l),
          (s[9] = a),
          (s[10] = n))
        : (n = s[10]),
      n
    );
  }
  function p(e) {
    let l,
      a,
      i = (0, r.c)(14),
      { background: n, cardWidth: s, cardHeight: o } = e;
    if ("loop" === n.type && "right_square" === n.fit) {
      let e;
      return (
        i[0] !== n.posterUrl || i[1] !== n.videoUrl || i[2] !== o || i[3] !== s
          ? ((e = (0, t.jsx)(y, {
              videoUrl: n.videoUrl,
              posterUrl: n.posterUrl,
              cardWidth: s,
              cardHeight: o,
            })),
            (i[0] = n.posterUrl),
            (i[1] = n.videoUrl),
            (i[2] = o),
            (i[3] = s),
            (i[4] = e))
          : (e = i[4]),
        e
      );
    }
    if ("loop" === n.type) {
      let e;
      return (
        i[5] !== n.posterUrl || i[6] !== n.videoUrl
          ? ((e = (0, t.jsx)(x, {
              videoUrl: n.videoUrl,
              posterUrl: n.posterUrl,
            })),
            (i[5] = n.posterUrl),
            (i[6] = n.videoUrl),
            (i[7] = e))
          : (e = i[7]),
        e
      );
    }
    if ("video" === n.type) {
      let e;
      return (
        i[8] !== n.uri
          ? ((e = (0, t.jsx)("video", {
              src: n.uri,
              autoPlay: !0,
              loop: !0,
              muted: !0,
              playsInline: !0,
              className: "absolute inset-0 size-full scale-125 object-cover",
            })),
            (i[8] = n.uri),
            (i[9] = e))
          : (e = i[9]),
        e
      );
    }
    return (
      i[10] !== n.uri
        ? ((l = (0, h.f)(n.uri)), (i[10] = n.uri), (i[11] = l))
        : (l = i[11]),
      i[12] !== l
        ? ((a = (0, t.jsx)("img", {
            src: l,
            alt: "",
            crossOrigin: "anonymous",
            className: "absolute inset-0 size-full scale-125 object-cover",
          })),
          (i[12] = l),
          (i[13] = a))
        : (a = i[13]),
      a
    );
  }
  function x(e) {
    let l,
      i,
      n,
      s = (0, r.c)(9),
      { videoUrl: o, posterUrl: d } = e,
      [c, u] = (0, a.useState)(!1);
    return (
      s[0] !== d
        ? ((l = (0, t.jsx)("img", {
            src: d,
            alt: "",
            className: "absolute inset-0 size-full scale-125 object-cover",
          })),
          (s[0] = d),
          (s[1] = l))
        : (l = s[1]),
      s[2] !== c || s[3] !== d || s[4] !== o
        ? ((i = c
            ? null
            : (0, t.jsx)(
                "video",
                {
                  src: o,
                  poster: d,
                  autoPlay: !0,
                  loop: !0,
                  muted: !0,
                  playsInline: !0,
                  onError: () => u(!0),
                  className:
                    "absolute inset-0 size-full scale-125 object-cover",
                },
                o,
              )),
          (s[2] = c),
          (s[3] = d),
          (s[4] = o),
          (s[5] = i))
        : (i = s[5]),
      s[6] !== l || s[7] !== i
        ? ((n = (0, t.jsxs)(t.Fragment, { children: [l, i] })),
          (s[6] = l),
          (s[7] = i),
          (s[8] = n))
        : (n = s[8]),
      n
    );
  }
  function y(e) {
    let l,
      i,
      n,
      s,
      o = (0, r.c)(13),
      { videoUrl: d, posterUrl: c, cardWidth: u, cardHeight: m } = e,
      [h, f] = (0, a.useState)(!1),
      p = -(0.04 * u);
    return (
      o[0] !== m || o[1] !== p
        ? ((l = { right: p, width: m, height: m }),
          (o[0] = m),
          (o[1] = p),
          (o[2] = l))
        : (l = o[2]),
      o[3] !== c
        ? ((i = (0, t.jsx)("img", {
            src: c,
            alt: "",
            className: "absolute inset-0 size-full object-cover",
          })),
          (o[3] = c),
          (o[4] = i))
        : (i = o[4]),
      o[5] !== h || o[6] !== c || o[7] !== d
        ? ((n = h
            ? null
            : (0, t.jsx)(
                "video",
                {
                  src: d,
                  poster: c,
                  autoPlay: !0,
                  loop: !0,
                  muted: !0,
                  playsInline: !0,
                  onError: () => f(!0),
                  className: "absolute inset-0 size-full object-cover",
                },
                d,
              )),
          (o[5] = h),
          (o[6] = c),
          (o[7] = d),
          (o[8] = n))
        : (n = o[8]),
      o[9] !== l || o[10] !== i || o[11] !== n
        ? ((s = (0, t.jsxs)("div", {
            className: "absolute top-0",
            style: l,
            children: [i, n],
          })),
          (o[9] = l),
          (o[10] = i),
          (o[11] = n),
          (o[12] = s))
        : (s = o[12]),
      s
    );
  }
  e.i(566551);
  var g = e.i(106006);
  let b = 340 / 720,
    j = (e) => Math.round(e * b),
    v = j(27),
    w = j(173),
    k = j(150),
    M = j(84),
    S = 340 - 2 * v,
    _ = 16 * b,
    N = {
      headline: "text-[19px] leading-6 font-bold",
      title: "text-[17px] leading-[22px] font-bold",
      statValue: "text-[13px] leading-4 font-bold",
      labelMd: "text-[13px] leading-[18px] font-semibold",
      labelSm: "text-[11px] leading-[14px] font-semibold",
      legal: "text-[9.5px] leading-3 font-medium",
      body: "text-[13px] leading-[18px]",
    },
    U = "tracking-[-0.03em]",
    L = j(20);
  function $(e) {
    let l,
      a,
      n,
      o,
      u,
      m,
      h,
      f,
      p,
      x,
      y,
      g,
      b,
      w,
      k = (0, r.c)(37),
      { pnlUsd: M, pnlPct: S, isPositive: _, palette: $, testIdSuffix: C } = e,
      { t: F } = (0, i.f)();
    if (k[0] !== _ || k[1] !== S || k[2] !== M) {
      let e;
      ((a = j(52)),
        k[6] !== _ || k[7] !== S
          ? ((e = null === S ? null : `${_ ? "▲" : "▼"} ${(0, d.e)(S)}`),
            (k[6] = _),
            (k[7] = S),
            (k[8] = e))
          : (e = k[8]),
        (l = e));
      let t = j(22),
        r =
          null === l
            ? 0
            : Math.ceil(l.length * t * 0.66) + j(6) + 2 * j(14) + 2,
        i = 340 - 2 * v - (null === l ? 0 : L + r),
        o = (0, s.u)(M);
      ((n = (0, d.x)(o, a) <= i ? o : `${M > 0 ? "+" : ""}${(0, s.l)(M)}`),
        (k[0] = _),
        (k[1] = S),
        (k[2] = M),
        (k[3] = l),
        (k[4] = a),
        (k[5] = n));
    } else ((l = k[3]), (a = k[4]), (n = k[5]));
    let R = n;
    (k[9] === Symbol.for("react.memo_cache_sentinel")
      ? ((o = { gap: j(10) }),
        (u = (0, c.c)(N.legal, "uppercase tracking-tight text-white/60")),
        (k[9] = o),
        (k[10] = u))
      : ((o = k[9]), (u = k[10])),
      k[11] !== _ || k[12] !== F
        ? ((m = F(_ ? "coin_details.profit" : "coin_details.loss")),
          (k[11] = _),
          (k[12] = F),
          (k[13] = m))
        : (m = k[13]),
      k[14] !== m
        ? ((h = (0, t.jsx)("p", { className: u, children: m })),
          (k[14] = m),
          (k[15] = h))
        : (h = k[15]),
      k[16] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = { gap: L }), (k[16] = f))
        : (f = k[16]));
    let z = `position-pnl-share-amount${C}`;
    return (
      k[17] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = (0, c.c)(
            "tracking-[-0.05em]",
            "whitespace-nowrap font-extrabold leading-none tabular-nums",
          )),
          (k[17] = p))
        : (p = k[17]),
      k[18] !== a || k[19] !== $.primary
        ? ((x = { color: $.primary, fontSize: a }),
          (k[18] = a),
          (k[19] = $.primary),
          (k[20] = x))
        : (x = k[20]),
      k[21] !== R || k[22] !== z || k[23] !== x
        ? ((y = (0, t.jsx)("span", {
            "data-testid": z,
            className: p,
            style: x,
            children: R,
          })),
          (k[21] = R),
          (k[22] = z),
          (k[23] = x),
          (k[24] = y))
        : (y = k[24]),
      k[25] !== l ||
      k[26] !== $.badgeBg ||
      k[27] !== $.glowRgb ||
      k[28] !== $.primary ||
      k[29] !== C
        ? ((g =
            null !== l
              ? (0, t.jsx)("span", {
                  "data-testid": `position-pnl-share-pct${C}`,
                  className: (0, c.c)(
                    U,
                    "inline-flex h-6 items-center whitespace-nowrap rounded-md border px-1.5 text-[11px] font-bold leading-none tabular-nums",
                  ),
                  style: {
                    color: $.primary,
                    backgroundColor: $.badgeBg,
                    borderColor: `rgba(${$.glowRgb}, 0.4)`,
                  },
                  children: l,
                })
              : null),
          (k[25] = l),
          (k[26] = $.badgeBg),
          (k[27] = $.glowRgb),
          (k[28] = $.primary),
          (k[29] = C),
          (k[30] = g))
        : (g = k[30]),
      k[31] !== y || k[32] !== g
        ? ((b = (0, t.jsxs)("div", {
            className: "flex items-center",
            style: f,
            children: [y, g],
          })),
          (k[31] = y),
          (k[32] = g),
          (k[33] = b))
        : (b = k[33]),
      k[34] !== b || k[35] !== h
        ? ((w = (0, t.jsxs)("div", {
            className: "flex flex-col",
            style: o,
            children: [h, b],
          })),
          (k[34] = b),
          (k[35] = h),
          (k[36] = w))
        : (w = k[36]),
      w
    );
  }
  function C({ couldHaveMadeUsd: e, pnlUsd: r, palette: l, testIdSuffix: a }) {
    let { t: n } = (0, i.f)(),
      o = (0, u.w)(e),
      m = Math.min(M, Math.floor(((340 - 2 * v) / (0, d.x)(o, 1)) * 1));
    return (0, t.jsxs)("div", {
      className: "flex flex-col",
      style: { gap: j(6) },
      children: [
        (0, t.jsx)(I, {
          palette: l,
          testId: `position-pnl-share-paper-handed${a}`,
        }),
        (0, t.jsx)("p", {
          className: (0, c.c)(N.body, "text-white/70"),
          children: n("share.coin.couldve_made"),
        }),
        (0, t.jsx)("span", {
          "data-testid": `position-pnl-share-fumble-amount${a}`,
          className: (0, c.c)(
            U,
            "self-start whitespace-nowrap font-extrabold leading-none tabular-nums",
          ),
          style: { color: l.primary, fontSize: m },
          children: o,
        }),
        (0, t.jsx)("p", {
          className: (0, c.c)(N.body, "text-white/70"),
          children: n("web.share.pnl_took_and_left", { amount: (0, s.u)(r) }),
        }),
      ],
    });
  }
  function F(e) {
    let l,
      a,
      n,
      s,
      o,
      d = (0, r.c)(38),
      {
        spentUsd: c,
        entryMarketCapUsd: m,
        reachedOrLiveMarketCapUsd: h,
        isMultipleMode: f,
      } = e,
      { t: p } = (0, i.f)();
    if (d[0] !== m || d[1] !== f || d[2] !== h || d[3] !== c || d[4] !== p) {
      if (((l = []), null != c && c > 0)) {
        let e, t, r;
        (d[6] !== p
          ? ((e = p("callouts.position_card.spent_label")),
            (d[6] = p),
            (d[7] = e))
          : (e = d[7]),
          d[8] !== c ? ((t = (0, u.N)(c)), (d[8] = c), (d[9] = t)) : (t = d[9]),
          d[10] !== e || d[11] !== t
            ? ((r = { key: "spent", label: e, value: t }),
              (d[10] = e),
              (d[11] = t),
              (d[12] = r))
            : (r = d[12]),
          l.push(r));
      }
      if (null != m && m > 0) {
        let e, t, r;
        (d[13] !== f || d[14] !== p
          ? ((e = p(
              f
                ? "share.coin.called"
                : "coin_details.position_metrics.average_entry",
            )),
            (d[13] = f),
            (d[14] = p),
            (d[15] = e))
          : (e = d[15]),
          d[16] !== m
            ? ((t = (0, u.N)(m)), (d[16] = m), (d[17] = t))
            : (t = d[17]),
          d[18] !== e || d[19] !== t
            ? ((r = { key: "entry", label: e, value: t }),
              (d[18] = e),
              (d[19] = t),
              (d[20] = r))
            : (r = d[20]),
          l.push(r));
      }
      if (null != h && h > 0) {
        let e, t, r;
        (d[21] !== f || d[22] !== p
          ? ((e = p(f ? "share.coin.reached" : "common.market_cap")),
            (d[21] = f),
            (d[22] = p),
            (d[23] = e))
          : (e = d[23]),
          d[24] !== h
            ? ((t = (0, u.N)(h)), (d[24] = h), (d[25] = t))
            : (t = d[25]),
          d[26] !== e || d[27] !== t
            ? ((r = { key: "mcap", label: e, value: t }),
              (d[26] = e),
              (d[27] = t),
              (d[28] = r))
            : (r = d[28]),
          l.push(r));
      }
      ((d[0] = m), (d[1] = f), (d[2] = h), (d[3] = c), (d[4] = p), (d[5] = l));
    } else l = d[5];
    return 0 === l.length
      ? null
      : (d[29] !== l.length
          ? ((a = 3 === l.length ? j(28) : j(48)),
            (d[29] = l.length),
            (d[30] = a))
          : (a = d[30]),
        d[31] !== a
          ? ((n = { gap: a }), (d[31] = a), (d[32] = n))
          : (n = d[32]),
        d[33] !== l ? ((s = l.map(R)), (d[33] = l), (d[34] = s)) : (s = d[34]),
        d[35] !== n || d[36] !== s
          ? ((o = (0, t.jsx)("div", {
              className: "flex",
              style: n,
              children: s,
            })),
            (d[35] = n),
            (d[36] = s),
            (d[37] = o))
          : (o = d[37]),
        o);
  }
  function R(e) {
    return (0, t.jsxs)(
      "div",
      {
        className: "flex flex-col gap-0.5",
        children: [
          (0, t.jsx)("span", {
            className: (0, c.c)(
              N.statValue,
              "tracking-[-0.05em]",
              "tabular-nums",
            ),
            children: e.value,
          }),
          (0, t.jsx)("span", {
            className: (0, c.c)(N.legal, "font-normal text-white/60"),
            children: e.label,
          }),
        ],
      },
      e.key,
    );
  }
  function z() {
    let e,
      l,
      a,
      n,
      s,
      o = (0, r.c)(7),
      { t: d } = (0, i.f)();
    return (
      o[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, c.c)(
            N.legal,
            "ml-auto inline-flex shrink-0 items-center gap-1 self-start rounded-full px-2 py-0.5 font-bold uppercase tracking-[0.08em] text-[#0A0A0F]",
          )),
          (l = { background: "linear-gradient(135deg, #86EFAC, #F87171)" }),
          (a = (0, t.jsx)("span", { "aria-hidden": !0, children: "↗" })),
          (o[0] = e),
          (o[1] = l),
          (o[2] = a))
        : ((e = o[0]), (l = o[1]), (a = o[2])),
      o[3] !== d
        ? ((n = d("mayhem_mode.mayhem_mode")), (o[3] = d), (o[4] = n))
        : (n = o[4]),
      o[5] !== n
        ? ((s = (0, t.jsxs)("span", {
            className: e,
            style: l,
            children: [a, n],
          })),
          (o[5] = n),
          (o[6] = s))
        : (s = o[6]),
      s
    );
  }
  function I(e) {
    let l,
      a,
      n,
      s,
      o = (0, r.c)(11),
      { palette: d, testId: u } = e,
      { t: m } = (0, i.f)();
    o[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((l = (0, c.c)(
          N.labelSm,
          "inline-flex self-start rounded-md border px-1.5 py-0.5 font-bold",
        )),
        (o[0] = l))
      : (l = o[0]);
    let h = `rgba(${d.glowRgb}, 0.4)`;
    return (
      o[1] !== d.badgeBg || o[2] !== d.primary || o[3] !== h
        ? ((a = {
            color: d.primary,
            backgroundColor: d.badgeBg,
            borderColor: h,
          }),
          (o[1] = d.badgeBg),
          (o[2] = d.primary),
          (o[3] = h),
          (o[4] = a))
        : (a = o[4]),
      o[5] !== m
        ? ((n = m("share.coin.paper_handed")), (o[5] = m), (o[6] = n))
        : (n = o[6]),
      o[7] !== a || o[8] !== n || o[9] !== u
        ? ((s = (0, t.jsx)("span", {
            "data-testid": u,
            className: l,
            style: a,
            children: n,
          })),
          (o[7] = a),
          (o[8] = n),
          (o[9] = u),
          (o[10] = s))
        : (s = o[10]),
      s
    );
  }
  function A(e) {
    let l,
      n,
      s,
      d,
      c,
      u = (0, r.c)(18),
      { mint: m, imageUri: f, isBanned: p, symbol: x } = e,
      { t: y } = (0, i.f)(),
      [g, b] = (0, a.useState)(!1);
    if (u[0] !== g || u[1] !== f || u[2] !== p || u[3] !== m || u[4] !== x) {
      n = Symbol.for("react.early_return_sentinel");
      e: {
        let e = (0, o.t)({
          sourceImageUrl: f ?? void 0,
          mint: m,
          imageType: o.d.COIN_IMAGE,
          width: 80,
          height: 80,
          isBanned: p,
        });
        if (!e || g) {
          let e, r;
          (u[7] !== x
            ? ((e = x.slice(0, 1).toUpperCase() || "?"), (u[7] = x), (u[8] = e))
            : (e = u[8]),
            u[9] !== e
              ? ((r = (0, t.jsx)("div", {
                  className:
                    "size-9 shrink-0 overflow-hidden rounded-[10px] border-2 border-white/15 bg-white/10 flex items-center justify-center text-base font-bold text-white/80",
                  children: e,
                })),
                (u[9] = e),
                (u[10] = r))
              : (r = u[10]),
            (n = r));
          break e;
        }
        l = (0, h.f)(e);
      }
      ((u[0] = g),
        (u[1] = f),
        (u[2] = p),
        (u[3] = m),
        (u[4] = x),
        (u[5] = l),
        (u[6] = n));
    } else ((l = u[5]), (n = u[6]));
    return n !== Symbol.for("react.early_return_sentinel")
      ? n
      : (u[11] !== x || u[12] !== y
          ? ((s = y("web.share.coin_logo_alt", {
              symbol: x || y("web.share.generic_coin"),
            })),
            (u[11] = x),
            (u[12] = y),
            (u[13] = s))
          : (s = u[13]),
        u[14] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = () => b(!0)), (u[14] = d))
          : (d = u[14]),
        u[15] !== l || u[16] !== s
          ? ((c = (0, t.jsx)("img", {
              src: l,
              alt: s,
              width: 40,
              height: 40,
              crossOrigin: "anonymous",
              className:
                "size-9 shrink-0 overflow-hidden rounded-[10px] border-2 border-white/15 bg-white/10 object-cover",
              onError: d,
            })),
            (u[15] = l),
            (u[16] = s),
            (u[17] = c))
          : (c = u[17]),
        c);
  }
  function O(e) {
    let l,
      i,
      n,
      s = (0, r.c)(11),
      { holder: o, sizeClass: d } = e,
      [c, u] = (0, a.useState)(!1),
      m = `${void 0 === d ? "size-5" : d} shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/10`;
    if (!o.avatarUrl || c) {
      let e,
        r,
        l = `${m} flex items-center justify-center text-[9px] font-bold text-white/80`;
      return (
        s[0] !== o.displayName
          ? ((e = o.displayName.slice(0, 1).toUpperCase()),
            (s[0] = o.displayName),
            (s[1] = e))
          : (e = s[1]),
        s[2] !== l || s[3] !== e
          ? ((r = (0, t.jsx)("div", {
              className: l,
              "aria-hidden": !0,
              children: e,
            })),
            (s[2] = l),
            (s[3] = e),
            (s[4] = r))
          : (r = s[4]),
        r
      );
    }
    s[5] !== o.avatarUrl
      ? ((l = (0, h.f)(o.avatarUrl)), (s[5] = o.avatarUrl), (s[6] = l))
      : (l = s[6]);
    let f = `${m} object-cover`;
    return (
      s[7] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = () => u(!0)), (s[7] = i))
        : (i = s[7]),
      s[8] !== l || s[9] !== f
        ? ((n = (0, t.jsx)("img", {
            src: l,
            alt: "",
            crossOrigin: "anonymous",
            className: f,
            onError: i,
          })),
          (s[8] = l),
          (s[9] = f),
          (s[10] = n))
        : (n = s[10]),
      n
    );
  }
  function B() {
    let e,
      l,
      a,
      i = (0, r.c)(3);
    return (
      i[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("img", {
            src: "/logo.png",
            alt: "",
            width: 18,
            height: 18,
            className: "relative top-px size-[18px]",
          })),
          (l = (0, c.c)(N.headline, "tracking-tight")),
          (i[0] = e),
          (i[1] = l))
        : ((e = i[0]), (l = i[1])),
      i[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsxs)("div", {
            className: "flex shrink-0 items-center gap-1.5 opacity-90",
            children: [
              e,
              (0, t.jsxs)("span", {
                className: l,
                children: [
                  "pump",
                  (0, t.jsx)("span", {
                    className: "text-[#86EFAC]",
                    children: ".",
                  }),
                  "fun",
                ],
              }),
            ],
          })),
          (i[2] = a))
        : (a = i[2]),
      a
    );
  }
  function T(e) {
    let l,
      a,
      i,
      n,
      s,
      o,
      u,
      m = (0, r.c)(19),
      {
        background: h,
        transparentCapture: p,
        testId: x,
        dataTier: y,
        children: b,
        ref: j,
      } = e,
      w = p ? "" : "border border-white/10";
    m[0] !== w
      ? ((l = (0, c.c)(
          g.f.className,
          "relative overflow-hidden rounded-[18px] text-white antialiased",
          w,
        )),
        (m[0] = w),
        (m[1] = l))
      : (l = m[1]);
    let k = p ? "transparent" : d.C;
    return (
      m[2] !== k
        ? ((a = { width: 340, height: 279, backgroundColor: k }),
          (m[2] = k),
          (m[3] = a))
        : (a = m[3]),
      m[4] !== h || m[5] !== p
        ? ((i = (0, t.jsx)(f, {
            background: h,
            cardWidth: 340,
            cardHeight: 279,
            hideBackground: p,
          })),
          (m[4] = h),
          (m[5] = p),
          (m[6] = i))
        : (i = m[6]),
      m[7] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, c.c)(
            "absolute inset-0 flex flex-col justify-between",
            "[text-shadow:0_1px_4px_rgba(10,10,15,0.85)]",
          )),
          (s = { padding: v }),
          (m[7] = n),
          (m[8] = s))
        : ((n = m[7]), (s = m[8])),
      m[9] !== b
        ? ((o = (0, t.jsx)("div", { className: n, style: s, children: b })),
          (m[9] = b),
          (m[10] = o))
        : (o = m[10]),
      m[11] !== y ||
      m[12] !== j ||
      m[13] !== l ||
      m[14] !== a ||
      m[15] !== i ||
      m[16] !== o ||
      m[17] !== x
        ? ((u = (0, t.jsxs)("div", {
            ref: j,
            "data-testid": x,
            "data-tier": y,
            className: l,
            style: a,
            children: [i, o],
          })),
          (m[11] = y),
          (m[12] = j),
          (m[13] = l),
          (m[14] = a),
          (m[15] = i),
          (m[16] = o),
          (m[17] = x),
          (m[18] = u))
        : (u = m[18]),
      u
    );
  }
  e.s(
    [
      "d",
      0,
      N,
      "T",
      0,
      A,
      "K",
      0,
      O,
      "Y",
      0,
      U,
      "u",
      0,
      279,
      "h",
      0,
      b,
      "f",
      0,
      340,
      "z",
      0,
      w,
      "U",
      0,
      S,
      "g",
      0,
      _,
      "n",
      0,
      B,
      "L",
      0,
      function (e) {
        let a,
          s,
          o,
          u,
          h,
          f,
          p,
          x,
          y,
          g,
          v,
          M,
          _,
          L,
          R,
          I,
          E,
          P,
          D,
          W,
          q,
          H,
          G,
          J,
          K,
          V,
          Y = (0, r.c)(125),
          {
            mint: X,
            coinName: Z,
            coinSymbol: Q,
            coinImageUri: ee,
            isCoinBanned: et,
            pnlUsd: er,
            pnlPct: el,
            investedUsd: ea,
            avgEntryMcapUsd: ei,
            marketCapUsd: en,
            isClosed: es,
            holder: eo,
            background: ed,
            transparentCapture: ec,
            showChart: eu,
            chart: em,
            chartAnnotations: eh,
            cardDesign: ef,
            fumbleCouldHaveMadeUsd: ep,
            heroMultiple: ex,
            calloutMarketCapUsd: ey,
            ref: eg,
          } = e,
          eb = void 0 !== ec && ec,
          ej = void 0 === eu || eu,
          { t: ev } = (0, i.f)(),
          ew = el ?? (er >= 0 ? 0 : -1);
        Y[0] !== ew
          ? ((a = (0, d.t)(ew)), (Y[0] = ew), (Y[1] = a))
          : (a = Y[1]);
        let ek = a,
          eM = "fumbled" === ef && null != ep && ep > 0,
          eS = "mayhem" === ef,
          e_ = eM ? d.J : d.l[ek],
          eN = er >= 0;
        Y[2] !== Q
          ? ((s = Q?.replace(/^\$/, "") ?? ""), (Y[2] = Q), (Y[3] = s))
          : (s = Y[3]);
        let eU = s,
          eL = eb ? "-foreground" : "";
        if (
          Y[4] !== ei ||
          Y[5] !== ed ||
          Y[6] !== ey ||
          Y[7] !== em ||
          Y[8] !== ee ||
          Y[9] !== Z ||
          Y[10] !== eU ||
          Y[11] !== ep ||
          Y[12] !== ex ||
          Y[13] !== ea ||
          Y[14] !== es ||
          Y[15] !== et ||
          Y[16] !== eN ||
          Y[17] !== en ||
          Y[18] !== X ||
          Y[19] !== e_ ||
          Y[20] !== el ||
          Y[21] !== er ||
          Y[22] !== eg ||
          Y[23] !== ej ||
          Y[24] !== eM ||
          Y[25] !== eS ||
          Y[26] !== ev ||
          Y[27] !== eL ||
          Y[28] !== ek ||
          Y[29] !== eb
        ) {
          let e,
            r,
            a,
            i,
            s,
            m,
            b,
            w,
            k,
            S,
            F,
            I,
            O = void 0 === ex ? null : (0, n.b)(ex);
          f = null !== O;
          let B = 0 !== er || (el ?? 0) !== 0 || (ea ?? 0) > 0;
          x = eM && !f;
          let E = B && !f && !x;
          u = ej && null != em;
          let P = f && null != ey && ey > 0 ? ey : null,
            D = null !== P && void 0 !== ex ? P * ex : null;
          ((h = f ? P : ei),
            (p = f ? D : en),
            (o = T),
            (g = eg),
            (v = ed),
            (M = eb),
            (_ = `position-pnl-share-card${eL}`),
            (L = eM ? "fumbled" : ek),
            Y[43] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = { gap: j(11) }), (Y[43] = e))
              : (e = Y[43]),
            Y[44] === Symbol.for("react.memo_cache_sentinel")
              ? ((r = { gap: j(20) }), (Y[44] = r))
              : (r = Y[44]),
            Y[45] !== ee || Y[46] !== eU || Y[47] !== et || Y[48] !== X
              ? ((a = (0, t.jsx)(A, {
                  mint: X,
                  imageUri: ee,
                  isBanned: et,
                  symbol: eU,
                })),
                (Y[45] = ee),
                (Y[46] = eU),
                (Y[47] = et),
                (Y[48] = X),
                (Y[49] = a))
              : (a = Y[49]),
            Y[50] === Symbol.for("react.memo_cache_sentinel")
              ? ((i = (0, c.c)(N.title, "truncate")), (Y[50] = i))
              : (i = Y[50]),
            Y[51] !== Z || Y[52] !== eU || Y[53] !== X
              ? ((s = Z || eU || (0, l.d)(X, 4, 4)),
                (Y[51] = Z),
                (Y[52] = eU),
                (Y[53] = X),
                (Y[54] = s))
              : (s = Y[54]),
            Y[55] !== s
              ? ((m = (0, t.jsx)("p", { className: i, children: s })),
                (Y[55] = s),
                (Y[56] = m))
              : (m = Y[56]),
            Y[57] !== eU
              ? ((b = eU
                  ? (0, t.jsxs)("p", {
                      className: (0, c.c)(
                        N.labelSm,
                        "truncate uppercase tracking-[0.04em] text-white/60",
                      ),
                      children: ["$", eU],
                    })
                  : null),
                (Y[57] = eU),
                (Y[58] = b))
              : (b = Y[58]),
            Y[59] !== m || Y[60] !== b
              ? ((w = (0, t.jsxs)("div", {
                  className: "flex min-w-0 flex-col",
                  children: [m, b],
                })),
                (Y[59] = m),
                (Y[60] = b),
                (Y[61] = w))
              : (w = Y[61]),
            Y[62] !== es || Y[63] !== eS || Y[64] !== ev
              ? ((k = eS
                  ? (0, t.jsx)(z, {})
                  : es
                    ? (0, t.jsx)("span", {
                        className: (0, c.c)(
                          N.legal,
                          "ml-auto shrink-0 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 uppercase tracking-[0.08em] text-white/80",
                        ),
                        children: ev("common.closed"),
                      })
                    : null),
                (Y[62] = es),
                (Y[63] = eS),
                (Y[64] = ev),
                (Y[65] = k))
              : (k = Y[65]),
            Y[66] !== a || Y[67] !== w || Y[68] !== k
              ? ((S = (0, t.jsxs)("div", {
                  className: "flex items-center",
                  style: r,
                  children: [a, w, k],
                })),
                (Y[66] = a),
                (Y[67] = w),
                (Y[68] = k),
                (Y[69] = S))
              : (S = Y[69]),
            Y[70] !== ep ||
            Y[71] !== e_ ||
            Y[72] !== er ||
            Y[73] !== x ||
            Y[74] !== eL
              ? ((F =
                  x && null != ep
                    ? (0, t.jsx)(C, {
                        couldHaveMadeUsd: ep,
                        pnlUsd: er,
                        palette: e_,
                        testIdSuffix: eL,
                      })
                    : null),
                (Y[70] = ep),
                (Y[71] = e_),
                (Y[72] = er),
                (Y[73] = x),
                (Y[74] = eL),
                (Y[75] = F))
              : (F = Y[75]),
            Y[76] !== eN ||
            Y[77] !== e_ ||
            Y[78] !== el ||
            Y[79] !== er ||
            Y[80] !== E ||
            Y[81] !== eL
              ? ((I = E
                  ? (0, t.jsx)($, {
                      pnlUsd: er,
                      pnlPct: el,
                      isPositive: eN,
                      palette: e_,
                      testIdSuffix: eL,
                    })
                  : null),
                (Y[76] = eN),
                (Y[77] = e_),
                (Y[78] = el),
                (Y[79] = er),
                (Y[80] = E),
                (Y[81] = eL),
                (Y[82] = I))
              : (I = Y[82]),
            Y[83] !== S || Y[84] !== F || Y[85] !== I
              ? ((R = (0, t.jsxs)("div", {
                  className: "flex flex-col",
                  style: e,
                  children: [S, F, I],
                })),
                (Y[83] = S),
                (Y[84] = F),
                (Y[85] = I),
                (Y[86] = R))
              : (R = Y[86]),
            (y =
              null !== O
                ? (0, t.jsx)("span", {
                    "data-testid": `position-pnl-share-multiple${eL}`,
                    className: (0, c.c)(
                      U,
                      "self-start whitespace-nowrap font-extrabold leading-none tabular-nums text-[#86EFAC]",
                    ),
                    style: {
                      fontSize: j(110),
                      marginLeft: Math.max(
                        0,
                        40 + j(20) / 2 - (0, d.x)(O, j(110)) / 2,
                      ),
                    },
                    children: O,
                  })
                : null),
            (Y[4] = ei),
            (Y[5] = ed),
            (Y[6] = ey),
            (Y[7] = em),
            (Y[8] = ee),
            (Y[9] = Z),
            (Y[10] = eU),
            (Y[11] = ep),
            (Y[12] = ex),
            (Y[13] = ea),
            (Y[14] = es),
            (Y[15] = et),
            (Y[16] = eN),
            (Y[17] = en),
            (Y[18] = X),
            (Y[19] = e_),
            (Y[20] = el),
            (Y[21] = er),
            (Y[22] = eg),
            (Y[23] = ej),
            (Y[24] = eM),
            (Y[25] = eS),
            (Y[26] = ev),
            (Y[27] = eL),
            (Y[28] = ek),
            (Y[29] = eb),
            (Y[30] = o),
            (Y[31] = u),
            (Y[32] = h),
            (Y[33] = f),
            (Y[34] = p),
            (Y[35] = x),
            (Y[36] = y),
            (Y[37] = g),
            (Y[38] = v),
            (Y[39] = M),
            (Y[40] = _),
            (Y[41] = L),
            (Y[42] = R));
        } else
          ((o = Y[30]),
            (u = Y[31]),
            (h = Y[32]),
            (f = Y[33]),
            (p = Y[34]),
            (x = Y[35]),
            (y = Y[36]),
            (g = Y[37]),
            (v = Y[38]),
            (M = Y[39]),
            (_ = Y[40]),
            (L = Y[41]),
            (R = Y[42]));
        return (
          Y[87] !== em ||
          Y[88] !== eh ||
          Y[89] !== u ||
          Y[90] !== e_ ||
          Y[91] !== x
            ? ((I = u
                ? (0, t.jsx)("div", {
                    style: { height: x ? k : w },
                    children: (0, t.jsx)(m.f, {
                      prices: em.isLoading ? [] : em.prices,
                      markers: em.isLoading ? [] : em.markers,
                      width: S,
                      height: x ? k : w,
                      palette: e_,
                      scale: b,
                      annotations: x && !em.isLoading ? eh : void 0,
                    }),
                  })
                : null),
              (Y[87] = em),
              (Y[88] = eh),
              (Y[89] = u),
              (Y[90] = e_),
              (Y[91] = x),
              (Y[92] = I))
            : (I = Y[92]),
          Y[93] === Symbol.for("react.memo_cache_sentinel")
            ? ((E = { gap: j(11) }), (Y[93] = E))
            : (E = Y[93]),
          Y[94] !== h ||
          Y[95] !== ea ||
          Y[96] !== f ||
          Y[97] !== p ||
          Y[98] !== x
            ? ((P = x
                ? null
                : (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(F, {
                        spentUsd: f ? null : ea,
                        entryMarketCapUsd: h,
                        reachedOrLiveMarketCapUsd: p,
                        isMultipleMode: f,
                      }),
                      (0, t.jsx)("div", { className: "h-px bg-white/10" }),
                    ],
                  })),
              (Y[94] = h),
              (Y[95] = ea),
              (Y[96] = f),
              (Y[97] = p),
              (Y[98] = x),
              (Y[99] = P))
            : (P = Y[99]),
          Y[100] !== eo
            ? ((D = (0, t.jsx)(O, { holder: eo })), (Y[100] = eo), (Y[101] = D))
            : (D = Y[101]),
          Y[102] === Symbol.for("react.memo_cache_sentinel")
            ? ((W = (0, c.c)(N.labelMd, "truncate")), (Y[102] = W))
            : (W = Y[102]),
          Y[103] !== eo.displayName
            ? ((q = (0, t.jsx)("span", {
                className: W,
                children: eo.displayName,
              })),
              (Y[103] = eo.displayName),
              (Y[104] = q))
            : (q = Y[104]),
          Y[105] !== D || Y[106] !== q
            ? ((H = (0, t.jsxs)("div", {
                className: "flex min-w-0 flex-1 items-center gap-2",
                children: [D, q],
              })),
              (Y[105] = D),
              (Y[106] = q),
              (Y[107] = H))
            : (H = Y[107]),
          Y[108] === Symbol.for("react.memo_cache_sentinel")
            ? ((G = (0, t.jsx)(B, {})), (Y[108] = G))
            : (G = Y[108]),
          Y[109] !== H
            ? ((J = (0, t.jsxs)("div", {
                className: "flex items-center justify-between gap-2.5",
                children: [H, G],
              })),
              (Y[109] = H),
              (Y[110] = J))
            : (J = Y[110]),
          Y[111] !== P || Y[112] !== J
            ? ((K = (0, t.jsxs)("div", {
                className: "flex flex-col",
                style: E,
                children: [P, J],
              })),
              (Y[111] = P),
              (Y[112] = J),
              (Y[113] = K))
            : (K = Y[113]),
          Y[114] !== o ||
          Y[115] !== y ||
          Y[116] !== I ||
          Y[117] !== K ||
          Y[118] !== g ||
          Y[119] !== v ||
          Y[120] !== M ||
          Y[121] !== _ ||
          Y[122] !== L ||
          Y[123] !== R
            ? ((V = (0, t.jsxs)(o, {
                ref: g,
                background: v,
                transparentCapture: M,
                testId: _,
                dataTier: L,
                children: [R, y, I, K],
              })),
              (Y[114] = o),
              (Y[115] = y),
              (Y[116] = I),
              (Y[117] = K),
              (Y[118] = g),
              (Y[119] = v),
              (Y[120] = M),
              (Y[121] = _),
              (Y[122] = L),
              (Y[123] = R),
              (Y[124] = V))
            : (V = Y[124]),
          V
        );
      },
      "V",
      0,
      T,
      "A",
      0,
      j,
    ],
    446640,
  );
  var E = e.i(545063),
    P = e.i(63289),
    D = e.i(188291),
    W = e.i(254667),
    q = e.i(66094);
  let H = async (e) => {
    if (q.R.has(e.type) || "u" < typeof document) return e;
    try {
      if (await (0, q.q)(e)) return e;
      let t = await (0, q.$)(e);
      try {
        let r = (0, q.J)((0, q.H)(t), 1080),
          l = await (0, q.d)(t, r, "image/jpeg", 0.85);
        return new File([l], (0, q.e)(e.name, "jpg"), {
          type: "image/jpeg",
          lastModified: e.lastModified,
        });
      } finally {
        "close" in t && t.close();
      }
    } catch (t) {
      return (
        W.y.warn("share card background: keeping the upload as picked", {
          type: e.type,
          error: t instanceof Error ? t.message : String(t),
        }),
        e
      );
    }
  };
  var G = e.i(78436);
  let J = (e) => {
      let t = e.userId?.trim() || void 0,
        r = e.address?.trim() || void 0;
      return t || r ? { userId: t, address: r } : null;
    },
    K = "uploads",
    V = "scope",
    Y = ["pnl", "rewards"],
    X = (e) => ("string" == typeof e && "" !== e ? e : void 0),
    Z = (e) => {
      if ("object" != typeof e || null === e) return null;
      let {
          id: t,
          scope: r,
          ownerUserId: l,
          ownerAddress: a,
          blob: i,
          name: n,
          type: s,
          lastModified: o,
          durationSeconds: d,
          addedAt: c,
        } = e,
        u = { userId: X(l), address: X(a) };
      return "string" == typeof t &&
        "" !== t &&
        Y.some((e) => e === r) &&
        (void 0 !== u.userId || void 0 !== u.address) &&
        i instanceof Blob &&
        "number" == typeof c &&
        Number.isFinite(c)
        ? {
            id: t,
            scope: r,
            owner: u,
            file:
              i instanceof File
                ? i
                : new File([i], "string" == typeof n ? n : "", {
                    type: "string" == typeof s ? s : i.type,
                    lastModified: "number" == typeof o ? o : c,
                  }),
            durationSeconds:
              "number" == typeof d && Number.isFinite(d) && d > 0 ? d : void 0,
            addedAt: c,
          }
        : null;
    },
    Q = null,
    ee = () =>
      Q ||
      (Q = new Promise((e) => {
        let t;
        if ("u" < typeof indexedDB) return void e(null);
        let r = (t) => {
          (W.y.warn("share card uploads: storage unavailable", { error: t }),
            e(null));
        };
        try {
          t = indexedDB.open("pump-share-card-uploads", 1);
        } catch (e) {
          r(e);
          return;
        }
        ((t.onupgradeneeded = () => {
          let e = t.result;
          e.objectStoreNames.contains(K) ||
            e.createObjectStore(K, { keyPath: "id" }).createIndex(V, "scope");
        }),
          (t.onsuccess = () => {
            let r = t.result,
              l = () => {
                (r.close(), (Q = null));
              };
            ((r.onversionchange = l), (r.onclose = l), e(r));
          }),
          (t.onerror = () => r(t.error)));
      })),
    et = (e) =>
      new Promise((t, r) => {
        ((e.oncomplete = () => t()),
          (e.onabort = () => r(e.error ?? Error("transaction aborted"))));
      }),
    er = async ({ scope: e, owner: t }) => {
      let r = await ee();
      if (!r) return [];
      try {
        let l = r.transaction(K, "readonly").objectStore(K).index(V).getAll(e);
        return (
          await new Promise((e, t) => {
            ((l.onsuccess = () => e(l.result)), (l.onerror = () => t(l.error)));
          })
        )
          .map(Z)
          .filter(
            (e) =>
              null !== e &&
              ((void 0 !== t.userId && e.owner.userId === t.userId) ||
                (void 0 !== t.address && e.owner.address === t.address)),
          )
          .sort((e, t) => t.addedAt - e.addedAt);
      } catch (e) {
        return (W.y.warn("share card uploads: read failed", { error: e }), []);
      }
    },
    el = async (e) => {
      let t = await ee();
      if (t)
        try {
          let r = t.transaction(K, "readwrite");
          (r
            .objectStore(K)
            .put({
              id: e.id,
              scope: e.scope,
              ownerUserId: e.owner.userId,
              ownerAddress: e.owner.address,
              blob: e.file,
              name: e.file.name,
              type: e.file.type,
              lastModified: e.file.lastModified,
              durationSeconds: e.durationSeconds,
              addedAt: e.addedAt,
            }),
            await et(r));
        } catch (e) {
          W.y.warn("share card uploads: write failed", { error: e });
        }
    },
    ea = async (e) => {
      if (0 === e.length) return;
      let t = await ee();
      if (t)
        try {
          let r = t.transaction(K, "readwrite"),
            l = r.objectStore(K);
          for (let t of e) l.delete(t);
          await et(r);
        } catch (e) {
          W.y.warn("share card uploads: delete failed", { error: e });
        }
    },
    ei = (0, G.$)()(() => ({ lists: {} })),
    en = [],
    es = ({ scope: e, viewer: t }) => {
      let r = J(t);
      return `${e}:${r?.userId ?? r?.address ?? ""}`;
    },
    eo = (e) => ei.getState().lists[e] ?? en,
    ed = (e) => ({
      id: e.id,
      addedAt: e.addedAt,
      uri: URL.createObjectURL(e.file),
      kind: (0, D.C)(e.file),
      file: e.file,
      durationSeconds: e.durationSeconds,
    }),
    ec = ({ key: e, uploads: t, isSaved: r }) => {
      let l = t.slice(0, 10),
        a = t.slice(10);
      for (let e of a) URL.revokeObjectURL(e.uri);
      (ei.setState((t) => ({ lists: { ...t.lists, [e]: l } })),
        r && a.length > 0 && ea(a.map((e) => e.id)));
    },
    eu = new Map();
  e.s(
    [
      "f",
      0,
      function ({ scope: e, enabled: t = !0 }) {
        let r,
          { t: l } = (0, i.f)(),
          { userId: n, address: s } = (0, E.U)(),
          o = ei(
            ((r = { scope: e, viewer: { userId: n, address: s } }),
            (e) => e.lists[es(r)] ?? en),
          ),
          [d, c] = (0, a.useState)(!1);
        return (
          (0, a.useEffect)(() => {
            t &&
              ((e) => {
                let t = J(e.viewer);
                if (!t) return Promise.resolve();
                let r = es(e);
                if (eu.get(r)) return;
                let l = er({ scope: e.scope, owner: t }).then((e) => {
                  let t = eo(r),
                    l = new Set(t.map((e) => e.id)),
                    a = e.filter((e) => !l.has(e.id)).map(ed);
                  0 !== a.length &&
                    ec({
                      key: r,
                      uploads: [...t, ...a].sort(
                        (e, t) => t.addedAt - e.addedAt,
                      ),
                      isSaved: !0,
                    });
                });
                return eu.set(r, l);
              })({ scope: e, viewer: { userId: n, address: s } });
          }, [t, e, n, s]),
          {
            customBackgrounds: o,
            isPicking: d,
            addUpload: async (t) => {
              c(!0);
              try {
                let r,
                  a = (0, D.C)(t),
                  i = "video" === a ? 50 : "gif" === a ? 4 : 10;
                if (t.size > 1048576 * i)
                  return (
                    P.c.error(l("share.profile.bg_too_large", { size: i })),
                    null
                  );
                if ("video" === a) {
                  let e = await new Promise((e) => {
                    let r = URL.createObjectURL(t),
                      l = document.createElement("video");
                    ((l.preload = "metadata"),
                      (l.onloadedmetadata = () => {
                        (URL.revokeObjectURL(r), e(l.duration));
                      }),
                      (l.onerror = () => {
                        (URL.revokeObjectURL(r), e(0 / 0));
                      }),
                      (l.src = r));
                  });
                  if (Number.isFinite(e) && e > 10)
                    return (
                      P.c.error(
                        l("share.profile.bg_too_long", { seconds: 10 }),
                      ),
                      null
                    );
                  r = Number.isFinite(e) ? e : void 0;
                }
                return (({
                  scope: e,
                  viewer: t,
                  file: r,
                  durationSeconds: l,
                }) => {
                  let a = J(t),
                    i = ed({
                      id: crypto.randomUUID(),
                      file: r,
                      durationSeconds: l,
                      addedAt: Date.now(),
                    }),
                    n = es({ scope: e, viewer: t });
                  return (
                    ec({ key: n, uploads: [i, ...eo(n)], isSaved: null !== a }),
                    a &&
                      el({
                        id: i.id,
                        scope: e,
                        owner: a,
                        file: r,
                        durationSeconds: l,
                        addedAt: i.addedAt,
                      }),
                    i
                  );
                })({
                  scope: e,
                  viewer: { userId: n, address: s },
                  file: "image" === a ? await H(t) : t,
                  durationSeconds: r,
                });
              } finally {
                c(!1);
              }
            },
            removeUpload: (t) =>
              (({ uri: e, ...t }) => {
                let r = es(t),
                  l = eo(r).find((t) => t.uri === e);
                l &&
                  (URL.revokeObjectURL(l.uri),
                  ei.setState((e) => ({
                    lists: {
                      ...e.lists,
                      [r]: (e.lists[r] ?? en).filter((e) => e.id !== l.id),
                    },
                  })),
                  J(t.viewer) && ea([l.id]));
              })({ scope: e, viewer: { userId: n, address: s }, uri: t }),
          }
        );
      },
    ],
    532470,
  );
};
