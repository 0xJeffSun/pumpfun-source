// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018),
    n = e.i(705313),
    s = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    l = e.i(741084),
    c = e.i(673550),
    d = e.i(677778),
    o = e.i(604860),
    u = e.i(307105),
    m = e.i(369091),
    f = e.i(571097);
  let h =
      "flex w-14 shrink-0 flex-col items-center gap-1.5 rounded-lg transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-green disabled:opacity-40",
    p = "w-full truncate text-center text-[11px] leading-4 text-text-secondary";
  function x(e) {
    let r,
      n,
      s,
      a,
      c = (0, i.c)(16),
      { recipient: d, url: m, isDisabled: f, isSending: p, onSend: x } = e;
    c[0] !== d.peerId || c[1] !== m
      ? ((r = { url: m, peerId: d.peerId, surface: "strip" }),
        (c[0] = d.peerId),
        (c[1] = m),
        (c[2] = r))
      : (r = c[2]);
    let { share: y } = (0, o.f)(r);
    c[3] !== p || c[4] !== d.kind || c[5] !== d.mutual || c[6] !== d.peerId
      ? ((n =
          "conversation" === d.kind
            ? (0, t.jsx)(g, { isSending: p, peerId: d.peerId })
            : (0, t.jsx)(b, {
                avatarSeed: d.peerId,
                avatarSrc: (0, l.f)(d.mutual.profileImageUrl),
                isAnonymous: !d.mutual.username,
                isLoading: !1,
                isSending: p,
                name: (0, u.m)(d.mutual),
              })),
        (c[3] = p),
        (c[4] = d.kind),
        (c[5] = d.mutual),
        (c[6] = d.peerId),
        (c[7] = n))
      : (n = c[7]);
    let v = n;
    return (
      c[8] !== x || c[9] !== d || c[10] !== y
        ? ((s = () => x(d, y)),
          (c[8] = x),
          (c[9] = d),
          (c[10] = y),
          (c[11] = s))
        : (s = c[11]),
      c[12] !== v || c[13] !== f || c[14] !== s
        ? ((a = (0, t.jsx)("button", {
            className: h,
            disabled: f,
            onClick: s,
            type: "button",
            children: v,
          })),
          (c[12] = v),
          (c[13] = f),
          (c[14] = s),
          (c[15] = a))
        : (a = c[15]),
      a
    );
  }
  function g(e) {
    let r,
      n = (0, i.c)(7),
      { peerId: s, isSending: a } = e,
      l = (0, c.f)(s),
      d = null === l.username;
    return (
      n[0] !== a ||
      n[1] !== l.avatarSeed ||
      n[2] !== l.avatarSrc ||
      n[3] !== l.displayName ||
      n[4] !== l.isLoading ||
      n[5] !== d
        ? ((r = (0, t.jsx)(b, {
            avatarSeed: l.avatarSeed,
            avatarSrc: l.avatarSrc,
            isAnonymous: d,
            isLoading: l.isLoading,
            isSending: a,
            name: l.displayName,
          })),
          (n[0] = a),
          (n[1] = l.avatarSeed),
          (n[2] = l.avatarSrc),
          (n[3] = l.displayName),
          (n[4] = l.isLoading),
          (n[5] = d),
          (n[6] = r))
        : (r = n[6]),
      r
    );
  }
  function b(e) {
    let s,
      a,
      l,
      c,
      d,
      o = (0, i.c)(19),
      {
        avatarSeed: u,
        avatarSrc: f,
        isAnonymous: h,
        isLoading: x,
        isSending: g,
        name: b,
      } = e,
      { ipfsPrefix: y } = (0, m.useIpfsPrefix)();
    if (x) {
      let e, i, r;
      return (
        o[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)("span", {
              "aria-hidden": !0,
              className:
                "block size-11 animate-pulse rounded-full bg-bg-secondary",
            })),
            (i = (0, t.jsx)("span", {
              "aria-hidden": !0,
              className:
                "my-0.5 block h-3 w-10 animate-pulse rounded-md bg-bg-secondary",
            })),
            (o[0] = e),
            (o[1] = i))
          : ((e = o[0]), (i = o[1])),
        o[2] !== b
          ? ((r = (0, t.jsxs)(t.Fragment, {
              children: [
                e,
                i,
                (0, t.jsx)("span", { className: "sr-only", children: b }),
              ],
            })),
            (o[2] = b),
            (o[3] = r))
          : (r = o[3]),
        r
      );
    }
    return (
      o[4] !== u || o[5] !== f || o[6] !== y || o[7] !== h
        ? ((s = (0, t.jsx)(n.f, {
            address: u,
            alt: "",
            className: "size-11 rounded-full object-cover",
            height: 44,
            ipfsPrefix: y,
            isAnonymous: h,
            src: f,
            width: 44,
          })),
          (o[4] = u),
          (o[5] = f),
          (o[6] = y),
          (o[7] = h),
          (o[8] = s))
        : (s = o[8]),
      o[9] !== g
        ? ((a = g
            ? (0, t.jsx)("span", {
                className:
                  "absolute inset-0 flex items-center justify-center rounded-full bg-bg-primary/70",
                children: (0, t.jsx)(r.AC, {
                  "aria-hidden": !0,
                  className: "size-5 animate-spin text-text-primary",
                }),
              })
            : null),
          (o[9] = g),
          (o[10] = a))
        : (a = o[10]),
      o[11] !== s || o[12] !== a
        ? ((l = (0, t.jsxs)("span", {
            className: "relative size-11",
            children: [s, a],
          })),
          (o[11] = s),
          (o[12] = a),
          (o[13] = l))
        : (l = o[13]),
      o[14] !== b
        ? ((c = (0, t.jsx)("span", { className: p, children: b })),
          (o[14] = b),
          (o[15] = c))
        : (c = o[15]),
      o[16] !== l || o[17] !== c
        ? ((d = (0, t.jsxs)(t.Fragment, { children: [l, c] })),
          (o[16] = l),
          (o[17] = c),
          (o[18] = d))
        : (d = o[18]),
      d
    );
  }
  function y(e) {
    let r,
      n,
      s,
      a = (0, i.c)(9),
      { icon: l, label: c, isDisabled: d, onClick: o } = e;
    return (
      a[0] !== l
        ? ((r = (0, t.jsx)("span", {
            className:
              "flex size-11 items-center justify-center rounded-full border border-border-secondary bg-bg-secondary text-text-secondary",
            children: (0, t.jsx)(l, { className: "size-5" }),
          })),
          (a[0] = l),
          (a[1] = r))
        : (r = a[1]),
      a[2] !== c
        ? ((n = (0, t.jsx)("span", { className: p, children: c })),
          (a[2] = c),
          (a[3] = n))
        : (n = a[3]),
      a[4] !== d || a[5] !== o || a[6] !== r || a[7] !== n
        ? ((s = (0, t.jsxs)("button", {
            className: h,
            disabled: d,
            onClick: o,
            type: "button",
            children: [r, n],
          })),
          (a[4] = d),
          (a[5] = o),
          (a[6] = r),
          (a[7] = n),
          (a[8] = s))
        : (s = a[8]),
      s
    );
  }
  e.s([
    "DmShareStrip",
    0,
    function (e) {
      let n,
        l,
        c,
        o,
        m,
        h = (0, i.c)(16),
        { url: p, onDismissHost: g, onSeeMore: b } = e,
        { t: v } = (0, a.f)();
      h[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = { enabled: !0, waitForFullInbox: !1 }), (h[0] = n))
        : (n = h[0]);
      let {
          recipients: j,
          isLoading: I,
          hasReadError: N,
          hasMore: S,
          retry: k,
        } = (0, d.f)(n),
        [P, w] = (0, s.useState)(null),
        C = (0, s.useRef)(!1),
        _ = (0, s.useRef)(!1);
      (h[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = () => (
            (_.current = !0),
            () => {
              _.current = !1;
            }
          )),
          (c = []),
          (h[1] = l),
          (h[2] = c))
        : ((l = h[1]), (c = h[2])),
        (0, s.useEffect)(l, c));
      let A = I && 0 === j.length,
        F = !A && 0 === j.length && N;
      if (!A && !F && 0 === j.length) return null;
      h[3] !== g
        ? ((o = (e, t) => {
            C.current ||
              ((C.current = !0),
              w(e.peerId),
              t((0, u._)(e)).then((e) => {
                ((C.current = !1), w(null), e && _.current && g());
              }));
          }),
          (h[3] = g),
          (h[4] = o))
        : (o = h[4]);
      let E = o;
      if (
        h[5] !== S ||
        h[6] !== b ||
        h[7] !== j ||
        h[8] !== k ||
        h[9] !== E ||
        h[10] !== P ||
        h[11] !== F ||
        h[12] !== A ||
        h[13] !== v ||
        h[14] !== p
      ) {
        let e = j.slice(0, 4),
          i = F || j.length > 4 || S,
          n = null !== P;
        ((m = (0, t.jsx)(f.$, {
          children: A
            ? (0, t.jsx)(f.t, {})
            : (0, t.jsxs)("ul", {
                className: "flex gap-2.5",
                children: [
                  e.map((e) =>
                    (0, t.jsx)(
                      "li",
                      {
                        children: (0, t.jsx)(x, {
                          isDisabled: n,
                          isSending: P === e.peerId,
                          onSend: E,
                          recipient: e,
                          url: p,
                        }),
                      },
                      `${e.kind}:${e.peerId}`,
                    ),
                  ),
                  F
                    ? (0, t.jsx)("li", {
                        children: (0, t.jsx)(y, {
                          icon: r.Am,
                          isDisabled: n,
                          label: v("common.retry"),
                          onClick: k,
                        }),
                      })
                    : null,
                  i
                    ? (0, t.jsx)("li", {
                        children: (0, t.jsx)(y, {
                          icon: r.kK,
                          isDisabled: n,
                          label: v("common.see_more"),
                          onClick: () => b({ url: p }),
                        }),
                      })
                    : null,
                ],
              }),
        })),
          (h[5] = S),
          (h[6] = b),
          (h[7] = j),
          (h[8] = k),
          (h[9] = E),
          (h[10] = P),
          (h[11] = F),
          (h[12] = A),
          (h[13] = v),
          (h[14] = p),
          (h[15] = m));
      } else m = h[15];
      return m;
    },
  ]);
};
