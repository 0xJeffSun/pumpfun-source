// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(745018),
    r = e.i(439587),
    n = e.i(292686),
    s = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    o = e.i(63289),
    l = e.i(624335),
    c = e.i(445242);
  let d = (e) => {
    let i,
      r,
      n = (0, c.c)(3),
      { className: s } = e;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)("path", {
            d: "M10.667 4.09165H12.0003C12.7367 4.09165 13.3337 4.68861 13.3337 5.42499V13.7583C13.3337 14.4947 12.7367 15.0917 12.0003 15.0917H5.00033C4.26395 15.0917 3.66699 14.4947 3.66699 13.7583V5.42499C3.66699 4.68861 4.26395 4.09165 5.00033 4.09165H6.33366M10.667 4.09165V5.09165C10.667 5.45984 10.3685 5.75832 10.0003 5.75832H7.00033C6.63214 5.75832 6.33366 5.45984 6.33366 5.09165V4.09165M10.667 4.09165C10.667 3.35527 10.07 2.75832 9.33366 2.75832H7.66699C6.93061 2.75832 6.33366 3.35527 6.33366 4.09165",
            stroke: "black",
            strokeWidth: "1.5",
            strokeLinecap: "square",
            strokeLinejoin: "round",
          })),
          (n[0] = i))
        : (i = n[0]),
      n[1] !== s
        ? ((r = (0, t.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "17",
            height: "17",
            viewBox: "0 0 17 17",
            fill: "none",
            className: s,
            children: i,
          })),
          (n[1] = s),
          (n[2] = r))
        : (r = n[2]),
      r
    );
  };
  var u = e.i(370562),
    m = e.i(45459),
    p = e.i(182119),
    f = e.i(880898);
  let x = {
      tiktok: "https://www.tiktok.com/upload",
      instagram: "https://www.instagram.com/",
    },
    b = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/webp": "webp",
      "video/mp4": "mp4",
      "video/quicktime": "mov",
      "video/webm": "webm",
    },
    h = (e) => {
      let t = (({ contentType: e, url: t, kind: i }) => {
        if (e) {
          let t = b[e.toLowerCase()];
          if (t) return t;
        }
        let r = ((e) => {
          let t = e.split(/[?#]/, 1)[0].split("/").filter(Boolean).at(-1);
          if (!t) return;
          let i = t.lastIndexOf(".");
          if (!(i <= 0) && i !== t.length - 1)
            return t.slice(i + 1).toLowerCase();
        })(t);
        return r || ("video" === i ? "mp4" : "jpg");
      })({ contentType: e.contentType, url: e.url, kind: e.kind });
      return `pump-bounty-${e.kind}.${t}`;
    },
    y = async (e) => {
      if ("u" > typeof navigator && navigator.clipboard)
        try {
          await navigator.clipboard.writeText(e);
        } catch {}
    },
    g = async (e) => {
      try {
        let t = await fetch(e.url);
        if (!t.ok) return;
        let i = await t.blob(),
          r = h({
            url: e.url,
            kind: e.kind,
            contentType: e.contentType ?? i.type,
          });
        return new File([i], r, { type: e.contentType ?? i.type });
      } catch {
        return;
      }
    },
    v = new Map(),
    w = (e) => {
      let { url: t } = e,
        i = v.get(t);
      if (i) return i;
      let r = g(e).then((e) => (e || v.delete(t), e));
      return (v.set(t, r), r);
    },
    k = async (e) => w(e),
    j = async (e) => {
      let { target: t, media: i, caption: r, onTrack: n } = e,
        s = window.open("", "_blank");
      if (i) {
        let e = await k(i);
        if (
          e &&
          ((e) => {
            if (
              "u" < typeof navigator ||
              "function" != typeof navigator.share ||
              "function" != typeof navigator.canShare ||
              !e
            )
              return !1;
            try {
              return navigator.canShare({ files: [e] });
            } catch {
              return !1;
            }
          })(e)
        )
          try {
            return (
              await navigator.share({ files: [e], text: r }),
              s?.close(),
              n?.("native"),
              "shared"
            );
          } catch (e) {
            if (e instanceof DOMException && "AbortError" === e.name)
              return (s?.close(), "cancelled");
          }
      }
      let a = y(r);
      return (
        ((e, t) => {
          let i = x[t];
          if (e && !e.closed) {
            e.location.href = i;
            return;
          }
          window.open(i, "_blank", "noopener,noreferrer");
        })(s, t),
        i &&
          ((e) => {
            if ("u" < typeof document) return;
            let t = document.createElement("a");
            ((t.href = e.url),
              (t.download = h({
                url: e.url,
                kind: e.kind,
                contentType: e.contentType,
              })),
              (t.rel = "noopener"),
              (t.target = "_blank"),
              t.click());
          })(i),
        await a,
        n?.("fallback"),
        "shared"
      );
    };
  var _ = e.i(595673),
    N = e.i(909318),
    I = e.i(56087);
  function C(e) {
    let i,
      r,
      n,
      s,
      o,
      l,
      d,
      u,
      m,
      p,
      f = (0, c.c)(30),
      {
        title: x,
        subtitle: b,
        bountyImageUrl: h,
        coinImageUrl: y,
        coinMint: g,
      } = e,
      { t: v } = (0, a.f)(),
      w = !!h,
      k = !w && !!(y && g),
      j = w || k,
      _ = j ? "/OpenGraphRetail_v4_coin.png" : "/OpenGraphRetail_v4.png";
    f[0] !== x
      ? ((i = x.trim() || "Bounty"), (f[0] = x), (f[1] = i))
      : (i = f[1]);
    let C = i;
    f[2] !== b ? ((r = b?.trim() ?? ""), (f[2] = b), (f[3] = r)) : (r = f[3]);
    let S = r,
      A = `url(${_})`;
    f[4] !== A
      ? ((n = {
          backgroundImage: A,
          backgroundSize: "317px 166px",
          backgroundPosition: "0 0",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#111412",
        }),
        (f[4] = A),
        (f[5] = n))
      : (n = f[5]);
    let F = j
      ? "absolute left-[21px] top-1/2 flex max-w-[150px] -translate-y-1/2 flex-col justify-center gap-1.5"
      : "relative flex h-full w-full flex-col justify-center gap-1.5 p-5";
    return (
      f[6] !== v
        ? ((s = v("web.share.bounty_eyebrow")), (f[6] = v), (f[7] = s))
        : (s = f[7]),
      f[8] !== s
        ? ((o = (0, t.jsx)("span", {
            className:
              "text-[10px] font-bold uppercase tracking-[0.14em] text-white/70",
            children: s,
          })),
          (f[8] = s),
          (f[9] = o))
        : (o = f[9]),
      f[10] !== C
        ? ((l = (0, t.jsx)("h4", {
            className:
              "line-clamp-2 text-left text-base font-bold leading-snug text-white",
            children: C,
          })),
          (f[10] = C),
          (f[11] = l))
        : (l = f[11]),
      f[12] !== S
        ? ((d = S
            ? (0, t.jsx)("p", {
                className:
                  "truncate text-left text-xs font-medium text-white/80",
                children: S,
              })
            : null),
          (f[12] = S),
          (f[13] = d))
        : (d = f[13]),
      f[14] !== F || f[15] !== o || f[16] !== l || f[17] !== d
        ? ((u = (0, t.jsxs)("div", { className: F, children: [o, l, d] })),
          (f[14] = F),
          (f[15] = o),
          (f[16] = l),
          (f[17] = d),
          (f[18] = u))
        : (u = f[18]),
      f[19] !== h ||
      f[20] !== y ||
      f[21] !== g ||
      f[22] !== w ||
      f[23] !== j ||
      f[24] !== v
        ? ((m = j
            ? (0, t.jsx)("div", {
                className:
                  "absolute right-[21px] top-1/2 flex h-[110px] w-[110px] -translate-y-1/2 items-center justify-center overflow-hidden rounded-[5px]",
                children: w
                  ? (0, t.jsx)("img", {
                      alt: v("web.share.bounty_preview_alt"),
                      className: "h-[110px] w-[110px] object-cover",
                      src: h,
                    })
                  : (0, t.jsx)(N.f, {
                      alt: v("web.share.reward_coin_alt"),
                      className:
                        "h-[110px] w-[110px] rounded-[5px] object-cover",
                      height: 110,
                      imageType: I.d.COIN_IMAGE,
                      mint: g,
                      sourceImageUrl: y,
                      width: 110,
                    }),
              })
            : null),
          (f[19] = h),
          (f[20] = y),
          (f[21] = g),
          (f[22] = w),
          (f[23] = j),
          (f[24] = v),
          (f[25] = m))
        : (m = f[25]),
      f[26] !== u || f[27] !== m || f[28] !== n
        ? ((p = (0, t.jsx)("div", {
            className: "flex flex-col items-center justify-center",
            children: (0, t.jsxs)("div", {
              className:
                "relative h-[166px] w-full max-w-[317px] overflow-hidden rounded-lg",
              style: n,
              children: [u, m],
            }),
          })),
          (f[26] = u),
          (f[27] = m),
          (f[28] = n),
          (f[29] = p))
        : (p = f[29]),
      p
    );
  }
  let S = { tiktok: n.hF.TIKTOK, instagram: n.hF.INSTAGRAM },
    A = (0, s.forwardRef)(
      (
        {
          bountyId: e,
          bountyTitle: c,
          bountyDescription: x,
          bountyImageUrl: b,
          coinImageUrl: h,
          coinMint: y,
          submissionId: g,
          commentId: v,
          shareMedia: k,
          trigger: N,
          onOpen: I,
          onClose: A,
        },
        F,
      ) => {
        let { t: U } = (0, a.f)(),
          [T, E] = (0, s.useState)(!1),
          D = (0, s.useRef)(!1);
        ((0, s.useImperativeHandle)(F, () => ({
          open: () => E(!0),
          close: () => E(!1),
        })),
          (0, s.useEffect)(() => {
            if (T) {
              ((D.current = !0), I?.());
              return;
            }
            D.current && A?.();
          }, [T]));
        let {
            shareUrl: B,
            shareText: L,
            dialogTitle: P,
          } = (0, f.$)({
            bountyId: e,
            bountyTitle: c,
            submissionId: g,
            commentId: v,
          }),
          Q = (0, s.useMemo)(
            () =>
              k ||
              (b
                ? { url: b, kind: "image" }
                : h && y
                  ? { url: h, kind: "image" }
                  : void 0),
            [k, b, h, y],
          );
        (0, s.useEffect)(() => {
          T && Q && w(Q);
        }, [T, Q]);
        let O = async (e) => {
            var t;
            let i, r;
            "shared" ===
              (await j({
                target: e,
                media: Q,
                caption:
                  ((i = (t = { shareText: L, shareUrl: B }).shareText.trim()),
                  (r = t.shareUrl.trim()),
                  i
                    ? r
                      ? `${i}

${r}`
                      : i
                    : r),
                onTrack: () => {
                  (0, _.fG)({
                    shareType: n.qp.UNSPECIFIED,
                    shareMethod: S[e],
                    mint: y,
                    shareUrl: B,
                  });
                },
              })) && E(!1);
          },
          K = async () => {
            (0, _.fG)({
              shareType: n.qp.UNSPECIFIED,
              shareMethod: n.hF.COPY_LINK,
              mint: y,
              shareUrl: B,
            });
            try {
              (await navigator.clipboard.writeText(B),
                o.c.success(U("web.common.link_copied")));
            } catch (e) {
              (console.error("Error copying to clipboard", e),
                o.c.error(U("web.common.link_copy_failed_alt")));
            }
          };
        return (0, t.jsx)("div", {
          onClick: (e) => e.stopPropagation(),
          children: (0, t.jsxs)(p.N, {
            open: T,
            onOpenChange: E,
            children: [
              (0, t.jsx)(p.a, {
                asChild: !0,
                children:
                  N ||
                  (0, t.jsx)("div", {
                    className:
                      "flex cursor-pointer flex-row items-center justify-center",
                    children: (0, t.jsx)(i.AS, {
                      className: "h-4 w-4 text-gray-400 hover:text-gray-300",
                    }),
                  }),
              }),
              (0, t.jsx)(p.d, {
                className:
                  "w-[380px] overflow-hidden border-zinc-800 bg-zinc-900 p-0 text-text-primary shadow-lg",
                children: (0, t.jsxs)("div", {
                  className: "flex flex-col gap-4 p-6",
                  children: [
                    (0, t.jsx)(p.t, {
                      className:
                        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
                      children: (0, t.jsx)(l.f, {}),
                    }),
                    (0, t.jsxs)("div", {
                      className: "flex flex-col gap-1",
                      children: [
                        (0, t.jsx)("h3", {
                          className: "text-lg font-medium",
                          children: P,
                        }),
                        (0, t.jsx)("p", {
                          className:
                            "text-sm font-normal leading-normal text-text-tertiary",
                          children: U("web.share.copy_or_share_description"),
                        }),
                      ],
                    }),
                    (0, t.jsx)(C, {
                      bountyImageUrl: b,
                      coinImageUrl: h,
                      coinMint: y,
                      subtitle: x,
                      title: c,
                    }),
                    (0, t.jsxs)("div", {
                      className: "mt-4 flex flex-col items-stretch gap-3",
                      children: [
                        (0, t.jsx)(r.K, {
                          iconStart: (0, t.jsx)(d, { className: "h-4 w-4" }),
                          isFullWidth: !0,
                          onClick: K,
                          variant: "primary",
                          children: U("common.copy_link"),
                        }),
                        (0, t.jsx)(r.K, {
                          iconStart: (0, t.jsx)(m.f, { className: "h-4 w-4" }),
                          isFullWidth: !0,
                          onClick: () => {
                            (0, _.fG)({
                              shareType: n.qp.UNSPECIFIED,
                              shareMethod: n.hF.TWITTER,
                              mint: y,
                              shareUrl: B,
                            });
                            let e = `https://twitter.com/intent/tweet?text=${encodeURIComponent(L)}&url=${encodeURIComponent(B)}`;
                            (window.open(e, "_blank"), E(!1));
                          },
                          variant: "secondary",
                          children: U("web.share.share_on_x"),
                        }),
                        (0, t.jsx)(r.K, {
                          iconStart: (0, t.jsx)(u.l, { className: "h-4 w-4" }),
                          isFullWidth: !0,
                          onClick: () => O("tiktok"),
                          variant: "secondary",
                          children: U("web.share.share_to_tiktok"),
                        }),
                        (0, t.jsx)(r.K, {
                          iconStart: (0, t.jsx)(u.u, { className: "h-4 w-4" }),
                          isFullWidth: !0,
                          onClick: () => O("instagram"),
                          variant: "secondary",
                          children: U("web.share.share_to_instagram"),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        });
      },
    );
  ((A.displayName = "BountyShareDialog"), e.s(["f", 0, A], 418292));
  var F = e.i(426091);
  let U = {
      default: "hover:bg-bg-tertiary hover:text-white",
      danger: "hover:bg-[#F87171]/10 hover:text-[#F87171]",
      info: "hover:bg-[#60A5FA]/10 hover:text-[#60A5FA]",
      positive: "hover:bg-positive/10 hover:text-positive",
    },
    T = {
      default: "bg-bg-tertiary text-white",
      danger: "bg-[#F87171]/12 text-[#F87171]",
      info: "bg-[#60A5FA]/12 text-[#60A5FA]",
      positive: "bg-positive/12 text-positive",
    },
    E = s.default.forwardRef(function (e, i) {
      let r,
        n,
        s,
        a,
        o,
        l,
        d,
        u,
        m,
        p,
        f,
        x,
        b,
        h = (0, c.c)(27);
      h[0] !== e
        ? (({
            icon: s,
            label: a,
            count: n,
            accent: u,
            showLabel: d,
            active: m,
            onClick: o,
            className: r,
            ...l
          } = e),
          (h[0] = e),
          (h[1] = r),
          (h[2] = n),
          (h[3] = s),
          (h[4] = a),
          (h[5] = o),
          (h[6] = l),
          (h[7] = d),
          (h[8] = u),
          (h[9] = m))
        : ((r = h[1]),
          (n = h[2]),
          (s = h[3]),
          (a = h[4]),
          (o = h[5]),
          (l = h[6]),
          (d = h[7]),
          (u = h[8]),
          (m = h[9]));
      let y = void 0 === u ? "default" : u,
        g = void 0 !== m && m ? T[y] : U[y];
      return (
        h[10] !== r || h[11] !== g
          ? ((p = (0, F.c)(
              "inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-xs text-text-tertiary transition-colors",
              g,
              r,
            )),
            (h[10] = r),
            (h[11] = g),
            (h[12] = p))
          : (p = h[12]),
        h[13] !== o
          ? ((f = (e) => {
              (e.stopPropagation(), o?.(e));
            }),
            (h[13] = o),
            (h[14] = f))
          : (f = h[14]),
        h[15] !== n || h[16] !== a || h[17] !== d
          ? ((x = d
              ? (0, t.jsx)("span", { children: a })
              : null != n && (0, t.jsx)("span", { children: n })),
            (h[15] = n),
            (h[16] = a),
            (h[17] = d),
            (h[18] = x))
          : (x = h[18]),
        h[19] !== s ||
        h[20] !== a ||
        h[21] !== i ||
        h[22] !== l ||
        h[23] !== p ||
        h[24] !== f ||
        h[25] !== x
          ? ((b = (0, t.jsxs)("button", {
              "aria-label": a,
              className: p,
              onClick: f,
              ref: i,
              type: "button",
              ...l,
              children: [s, x],
            })),
            (h[19] = s),
            (h[20] = a),
            (h[21] = i),
            (h[22] = l),
            (h[23] = p),
            (h[24] = f),
            (h[25] = x),
            (h[26] = b))
          : (b = h[26]),
        b
      );
    });
  e.s(["f", 0, E], 154998);
};
