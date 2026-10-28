// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(439587),
    a = e.i(574472);
  e.i(12692);
  var i = e.i(398902),
    s = e.i(642282),
    n = e.i(174251),
    o = e.i(529841),
    d = e.i(167958),
    c = e.i(724423),
    u = e.i(606933),
    p = e.i(352386),
    m = e.i(63289),
    f = e.i(149757),
    x = e.i(464154),
    h = e.i(640068),
    g = e.i(338319);
  e.s(
    [
      "f",
      0,
      function (e) {
        let y,
          v,
          b,
          w,
          j,
          N,
          I,
          _,
          k,
          C,
          S,
          P,
          U,
          A,
          E,
          D,
          F,
          q,
          M,
          z,
          T,
          L,
          O,
          Q,
          B,
          R,
          $,
          H,
          K,
          V,
          W = (0, l.c)(89),
          {
            isOpen: G,
            onOpenChange: J,
            mint: Z,
            calloutId: X,
            cacheCalloutId: Y,
            quotedAuthorName: ee,
            quotedNote: et,
            quotedSymbol: el,
            quotedCreatedAt: er,
            onPosted: ea,
          } = e,
          { t: ei } = (0, i.f)(),
          { address: es } = (0, a.F)();
        (W[0] !== J || W[1] !== ea
          ? ((y = () => {
              (ea?.(), J(!1));
            }),
            (W[0] = J),
            (W[1] = ea),
            (W[2] = y))
          : (y = W[2]),
          W[3] !== es || W[4] !== Y || W[5] !== X || W[6] !== Z || W[7] !== y
            ? ((v = {
                mint: Z,
                calloutId: X,
                cacheCalloutId: Y,
                address: es,
                onPosted: y,
              }),
              (W[3] = es),
              (W[4] = Y),
              (W[5] = X),
              (W[6] = Z),
              (W[7] = y),
              (W[8] = v))
            : (v = W[8]));
        let {
          content: en,
          contentMaxLength: eo,
          contentLength: ed,
          canSubmit: ec,
          isSubmitting: eu,
          submit: ep,
          mentions: em,
        } = (function (e) {
          let t,
            r,
            a,
            s,
            n,
            o,
            d = (0, l.c)(28),
            { t: c } = (0, i.f)(),
            {
              mint: g,
              calloutId: y,
              cacheCalloutId: v,
              address: b,
              onPosted: w,
            } = e,
            [j, N] = (0, p.useState)(""),
            [I, _] = (0, p.useState)(!1),
            k = (0, p.useRef)(!1),
            C = (0, u.useQueryClient)();
          d[0] !== j
            ? ((t = { content: j, setContent: N }), (d[0] = j), (d[1] = t))
            : (t = d[1]);
          let S = (0, f.f)(t);
          d[2] !== j ? ((r = j.trim()), (d[2] = j), (d[3] = r)) : (r = d[3]);
          let P = r;
          d[4] !== j || d[5] !== S
            ? ((a = S.serialize(j)), (d[4] = j), (d[5] = S), (d[6] = a))
            : (a = d[6]);
          let U = a.length,
            A = U <= h.F,
            E = !!b && !!y && !I && P.length > 0 && A;
          d[7] !== y || d[8] !== P || d[9] !== S
            ? ((s = async () => {
                if (!y) throw Error("calloutId required");
                await (0, h._)({
                  calloutId: y,
                  content: S.serialize(P),
                  isQuote: !0,
                });
              }),
              (d[7] = y),
              (d[8] = P),
              (d[9] = S),
              (d[10] = s))
            : (s = d[10]);
          let D = s;
          d[11] !== b ||
          d[12] !== v ||
          d[13] !== y ||
          d[14] !== E ||
          d[15] !== g ||
          d[16] !== w ||
          d[17] !== D ||
          d[18] !== C ||
          d[19] !== c
            ? ((n = async () => {
                if (!y || !b || !E || k.current) return !1;
                ((k.current = !0), _(!0));
                let e = null;
                try {
                  await D();
                } catch (t) {
                  e = t;
                }
                return (_(!1), (k.current = !1), e)
                  ? (m.c.error(c((0, h.s)(e, "quote"))), !1)
                  : (m.c.success(c("web.callouts.quote_posted")),
                    N(""),
                    C.invalidateQueries({ queryKey: (0, x.B)(g, y) }),
                    v &&
                      v !== y &&
                      C.invalidateQueries({ queryKey: (0, x.B)(g, v) }),
                    w?.(),
                    !0);
              }),
              (d[11] = b),
              (d[12] = v),
              (d[13] = y),
              (d[14] = E),
              (d[15] = g),
              (d[16] = w),
              (d[17] = D),
              (d[18] = C),
              (d[19] = c),
              (d[20] = n))
            : (n = d[20]);
          let F = n;
          return (
            d[21] !== E ||
            d[22] !== j ||
            d[23] !== U ||
            d[24] !== I ||
            d[25] !== S ||
            d[26] !== F
              ? ((o = {
                  content: j,
                  setContent: N,
                  contentMaxLength: h.F,
                  contentLength: U,
                  canSubmit: E,
                  isSubmitting: I,
                  submit: F,
                  mentions: S,
                }),
                (d[21] = E),
                (d[22] = j),
                (d[23] = U),
                (d[24] = I),
                (d[25] = S),
                (d[26] = F),
                (d[27] = o))
              : (o = d[27]),
            o
          );
        })(v);
        W[9] !== et
          ? ((b = et?.trim()), (W[9] = et), (W[10] = b))
          : (b = W[10]);
        let ef = b;
        W[11] !== el
          ? ((w = el?.replace(/^\$/, "")), (W[11] = el), (W[12] = w))
          : (w = W[12]);
        let ex = w,
          eh = ed > eo;
        (W[13] !== ei
          ? ((j = ei("callouts.repost.quote")), (W[13] = ei), (W[14] = j))
          : (j = W[14]),
          W[15] !== ei
            ? ((N = ei("web.callouts.quote_your_take")),
              (W[15] = ei),
              (W[16] = N))
            : (N = W[16]),
          W[17] !== N
            ? ((I = (0, t.jsx)("label", {
                htmlFor: "callout-quote",
                children: N,
              })),
              (W[17] = N),
              (W[18] = I))
            : (I = W[18]));
        let eg = eh && c.m.invalid;
        (W[19] !== eg
          ? ((_ = (0, g.c)("tabular-nums", eg)), (W[19] = eg), (W[20] = _))
          : (_ = W[20]),
          W[21] !== ed || W[22] !== eo || W[23] !== _
            ? ((k = (0, t.jsxs)("span", {
                className: _,
                "data-testid": "quote-callout-counter",
                children: [ed, "/", eo],
              })),
              (W[21] = ed),
              (W[22] = eo),
              (W[23] = _),
              (W[24] = k))
            : (k = W[24]),
          W[25] !== I || W[26] !== k
            ? ((C = (0, t.jsxs)("div", {
                className:
                  "flex items-center justify-between text-xs leading-4 text-text-quaternary",
                children: [I, k],
              })),
              (W[25] = I),
              (W[26] = k),
              (W[27] = C))
            : (C = W[27]),
          W[28] === Symbol.for("react.memo_cache_sentinel")
            ? ((S = (0, g.c)(c.F, c.D.valid, "h-auto items-stretch p-0")),
              (W[28] = S))
            : (S = W[28]));
        let ey = em.handleChange,
          ev = em.handleSelect;
        W[29] !== ei
          ? ((P = ei("web.callouts.quote_placeholder")),
            (W[29] = ei),
            (W[30] = P))
          : (P = W[30]);
        let eb = 2 * eo;
        (W[31] !== en ||
        W[32] !== em.handleChange ||
        W[33] !== em.handleSelect ||
        W[34] !== P ||
        W[35] !== eb
          ? ((U = (0, t.jsx)("div", {
              className: S,
              children: (0, t.jsx)("textarea", {
                id: "callout-quote",
                value: en,
                onChange: ey,
                onSelect: ev,
                placeholder: P,
                rows: 3,
                maxLength: eb,
                className:
                  "block min-h-20 w-full resize-none bg-transparent p-3 text-sm leading-5 text-text-primary outline-none placeholder:text-text-quaternary",
                autoFocus: !0,
              }),
            })),
            (W[31] = en),
            (W[32] = em.handleChange),
            (W[33] = em.handleSelect),
            (W[34] = P),
            (W[35] = eb),
            (W[36] = U))
          : (U = W[36]),
          W[37] !== em.selectSuggestion || W[38] !== em.suggestions
            ? ((A = (0, t.jsx)(s.f, {
                suggestions: em.suggestions,
                onSelect: em.selectSuggestion,
                testId: "quote-callout-mentions",
              })),
              (W[37] = em.selectSuggestion),
              (W[38] = em.suggestions),
              (W[39] = A))
            : (A = W[39]),
          W[40] !== C || W[41] !== U || W[42] !== A
            ? ((E = (0, t.jsxs)("div", {
                className: "flex flex-col gap-1",
                children: [C, U, A],
              })),
              (W[40] = C),
              (W[41] = U),
              (W[42] = A),
              (W[43] = E))
            : (E = W[43]),
          W[44] !== ee || W[45] !== ei
            ? ((D = ee ?? ei("web.callouts.quoted_anonymous_author")),
              (W[44] = ee),
              (W[45] = ei),
              (W[46] = D))
            : (D = W[46]),
          W[47] !== ex
            ? ((F = ex
                ? (0, t.jsxs)("span", {
                    className: "font-normal text-text-tertiary",
                    children: ["$", ex],
                  })
                : null),
              (W[47] = ex),
              (W[48] = F))
            : (F = W[48]),
          W[49] !== er
            ? ((q =
                null != er && er > 0
                  ? (0, t.jsx)("span", {
                      className: "font-normal text-text-tertiary tabular-nums",
                      children: (0, t.jsx)(o.f, { timestamp: er }),
                    })
                  : null),
              (W[49] = er),
              (W[50] = q))
            : (q = W[50]),
          W[51] !== D || W[52] !== F || W[53] !== q
            ? ((M = (0, t.jsxs)("p", {
                className:
                  "flex items-center gap-1.5 truncate text-xs font-medium leading-4 text-text-secondary",
                children: [D, F, q],
              })),
              (W[51] = D),
              (W[52] = F),
              (W[53] = q),
              (W[54] = M))
            : (M = W[54]),
          W[55] !== ef
            ? ((z = ef
                ? (0, t.jsx)("p", {
                    className:
                      "mt-0.5 w-full whitespace-pre-wrap break-words text-xs leading-4 text-text-primary",
                    children: (0, t.jsx)(n.f, {
                      content: ef,
                      density: "comfortable",
                    }),
                  })
                : null),
              (W[55] = ef),
              (W[56] = z))
            : (z = W[56]),
          W[57] !== M || W[58] !== z
            ? ((T = (0, t.jsxs)("blockquote", {
                "data-testid": "quote-callout-preview",
                className:
                  "w-full rounded-md border border-border-tertiary p-3",
                children: [M, z],
              })),
              (W[57] = M),
              (W[58] = z),
              (W[59] = T))
            : (T = W[59]),
          W[60] !== E || W[61] !== T
            ? ((L = (0, t.jsxs)(d.K, {
                className: "flex flex-col gap-4",
                children: [E, T],
              })),
              (W[60] = E),
              (W[61] = T),
              (W[62] = L))
            : (L = W[62]),
          W[63] !== J
            ? ((O = () => J(!1)), (W[63] = J), (W[64] = O))
            : (O = W[64]),
          W[65] !== ei
            ? ((Q = ei("common.cancel")), (W[65] = ei), (W[66] = Q))
            : (Q = W[66]),
          W[67] !== O || W[68] !== Q
            ? ((B = (0, t.jsx)(r.K, {
                size: d.Z,
                variant: "secondary",
                onClick: O,
                children: Q,
              })),
              (W[67] = O),
              (W[68] = Q),
              (W[69] = B))
            : (B = W[69]),
          W[70] !== ep
            ? ((R = () => void ep()), (W[70] = ep), (W[71] = R))
            : (R = W[71]));
        let ew = !ec;
        return (
          W[72] !== eu || W[73] !== ei
            ? (($ = ei(eu ? "web.callouts.posting" : "callouts.repost.post")),
              (W[72] = eu),
              (W[73] = ei),
              (W[74] = $))
            : ($ = W[74]),
          W[75] !== eu || W[76] !== R || W[77] !== ew || W[78] !== $
            ? ((H = (0, t.jsx)(r.K, {
                size: d.$,
                variant: "primary",
                onClick: R,
                isDisabled: ew,
                isLoading: eu,
                "data-testid": "quote-callout-submit",
                children: $,
              })),
              (W[75] = eu),
              (W[76] = R),
              (W[77] = ew),
              (W[78] = $),
              (W[79] = H))
            : (H = W[79]),
          W[80] !== B || W[81] !== H
            ? ((K = (0, t.jsxs)(d.c, { children: [B, H] })),
              (W[80] = B),
              (W[81] = H),
              (W[82] = K))
            : (K = W[82]),
          W[83] !== G ||
          W[84] !== J ||
          W[85] !== L ||
          W[86] !== K ||
          W[87] !== j
            ? ((V = (0, t.jsxs)(d.N, {
                open: G,
                onOpenChange: J,
                density: "comfortable",
                size: "md",
                title: j,
                "data-testid": "quote-callout-dialog",
                children: [L, K],
              })),
              (W[83] = G),
              (W[84] = J),
              (W[85] = L),
              (W[86] = K),
              (W[87] = j),
              (W[88] = V))
            : (V = W[88]),
          V
        );
      },
    ],
    462860,
  );
  var y = e.i(132838);
  e.i(402030);
  var v = e.i(759257),
    b = e.i(819757);
  let w = "POST /callout/{calloutId}/repost",
    j = "DELETE /callout/{calloutId}/repost",
    N = [w, j],
    I = {
      codes: {
        COOLDOWN: "callouts.repost.errors.cooldown",
        INSUFFICIENT_BALANCE: "callouts.repost.errors.insufficient_balance",
        NO_ELIGIBLE_WALLET: "callouts.repost.errors.no_eligible_wallet",
        REPLY_NOT_FOUND: "callouts.repost.errors.not_found",
        SPAM_RESTRICTED: "callouts.reply.errors.spam_restricted",
      },
      statuses: {
        404: "callouts.repost.errors.not_found",
        503: "callouts.reply.errors.balance_check_unavailable",
      },
      fallback: "web.callouts.repost_update_failed",
    },
    _ = (e) => {
      try {
        return JSON.parse(e);
      } catch {
        return null;
      }
    };
  async function k(e) {
    let { calloutId: t, replyId: l, signal: r } = e,
      a = await (0, v.j)()(w, {
        params: { calloutId: t },
        body: l ? { replyId: l } : {},
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        signal: r,
        parseJson: _,
      });
    return { created: a?.created ?? !0 };
  }
  async function C(e) {
    let { calloutId: t, replyId: l, signal: r } = e,
      a = await (0, v.j)()(j, {
        params: { calloutId: t },
        query: { replyId: l || void 0 },
        credentials: "include",
        signal: r,
        parseJson: _,
      });
    return { removed: a?.removed ?? !0 };
  }
  async function S(e) {
    e.reposted
      ? await k({ calloutId: e.calloutId })
      : await C({ calloutId: e.calloutId });
  }
  (e.s(["Q", 0, (e) => (0, b.I)(e, N, I), "R", 0, k, "n", 0, C], 164289),
    e.s(
      [
        "f",
        0,
        function () {
          let e,
            t = (0, l.c)(2),
            r = (0, u.useQueryClient)();
          return (
            t[0] !== r
              ? ((e = {
                  mutationFn: S,
                  onMutate: async (e) => {
                    let t = (0, x.B)(e.mint, e.cacheCalloutId ?? e.calloutId);
                    await r.cancelQueries({ queryKey: t });
                    let l = r.getQueryData(t);
                    if (l) {
                      let a = e.reposted ? 1 : -1;
                      r.setQueryData(t, {
                        ...l,
                        callout: {
                          ...l.callout,
                          repostedByViewer: e.reposted,
                          repostCount: Math.max(
                            (l.callout.repostCount ?? 0) + a,
                            0,
                          ),
                        },
                      });
                    }
                    return { previous: l };
                  },
                  onError: (e, t, l) => {
                    l?.previous &&
                      r.setQueryData(
                        (0, x.B)(t.mint, t.cacheCalloutId ?? t.calloutId),
                        l.previous,
                      );
                  },
                  onSettled: (e, t, l) => {
                    r.invalidateQueries({
                      queryKey: (0, x.B)(
                        l.mint,
                        l.cacheCalloutId ?? l.calloutId,
                      ),
                    });
                  },
                }),
                (t[0] = r),
                (t[1] = e))
              : (e = t[1]),
            (0, y.f)(e)
          );
        },
      ],
      968185,
    ));
};
