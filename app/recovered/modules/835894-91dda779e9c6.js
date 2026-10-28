// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(78436),
    n = e.i(666880),
    r = e.i(605587);
  let i = ["a", "b"],
    l = (e, t) => (0, r.c)(e) === (0, r.c)(t),
    a = (e, t) =>
      i.find((n) => {
        let r = e[n];
        return null !== r && l(r.mint, t);
      }),
    o = (0, t.$)((e, t) => {
      let o = (e) => {
        var o;
        let s,
          u,
          { pool: d, idleSeats: c } = t(),
          f = ((e, t, l = []) => {
            let o = { ...e },
              s = new Set(t.map((e) => (0, r.c)(e.mint))),
              u = (e) => {
                let t = o[e];
                return null === t || !s.has((0, r.c)(t.mint));
              };
            for (let e of t) {
              if (a(o, e.mint)) continue;
              let t = (0, n.f)(e),
                r =
                  i.find((e) => {
                    let r = o[e];
                    return (
                      null !== r && l.includes(e) && u(e) && t && (0, n.f)(r)
                    );
                  }) ??
                  i.find((e) => null === o[e]) ??
                  i.find(u);
              r && (o[r] = e);
            }
            return o.a === e.a && o.b === e.b ? e : o;
          })(d, e, c),
          m = c.filter((t) => {
            let n = f[t];
            return null === n || !e.some((e) => l(e.mint, n.mint));
          });
        return {
          pool: f,
          idleSeats: m.length === c.length ? c : m,
          frameProps:
            ((o = t().frameProps),
            (s = new Set(
              i.flatMap((e) => {
                let t = f[e];
                return t ? [(0, r.c)(t.mint)] : [];
              }),
            )),
            Object.keys(
              (u = Object.fromEntries(
                Object.entries(o).filter(([e]) => s.has(e)),
              )),
            ).length === Object.keys(o).length
              ? o
              : u),
        };
      };
      return {
        enabled: !1,
        pending: null,
        pendingProps: null,
        target: null,
        overlay: null,
        shell: null,
        hasChart: !1,
        pool: { a: null, b: null },
        seenCoins: [],
        idleSeats: [],
        frameProps: {},
        lastShape: null,
        setEnabled: (n) => {
          t().enabled !== n &&
            e(
              n
                ? { enabled: n }
                : {
                    enabled: n,
                    pending: null,
                    pendingProps: null,
                    target: null,
                    overlay: null,
                    shell: null,
                    hasChart: !1,
                    pool: { a: null, b: null },
                    idleSeats: [],
                    frameProps: {},
                  },
            );
        },
        requestPreboot: (n, { speculative: r = !1 } = {}) => {
          let { enabled: i, pending: s, target: u } = t();
          if (!i || (null !== u && l(u.props.coin.mint, n.mint))) return;
          if (null !== s && l(s.mint, n.mint)) {
            if (r) return;
            let { pool: i, idleSeats: l } = t(),
              o = a(i, n.mint);
            void 0 !== o &&
              l.includes(o) &&
              e({ idleSeats: l.filter((e) => e !== o) });
            return;
          }
          let d = o(u ? [u.props.coin, n] : [n]),
            c = r ? a(d.pool, n.mint) : void 0;
          e({
            pending: n,
            pendingProps: null,
            pool: d.pool,
            frameProps: d.frameProps,
            idleSeats:
              c && !d.idleSeats.includes(c) ? [...d.idleSeats, c] : d.idleSeats,
          });
        },
        refreshPending: (n) => {
          let { pending: r, pool: a } = t();
          if (null === r || !l(r.mint, n.mint) || r === n) return;
          let o = { ...a };
          for (let e of i) {
            let t = o[e];
            null !== t && l(t.mint, n.mint) && (o[e] = n);
          }
          e({ pending: n, pool: o });
        },
        clearPreboot: (n) => {
          let { pending: r } = t();
          null !== r &&
            l(r.mint, n) &&
            e({ pending: null, pendingProps: null });
        },
        registerSlot: (n, i) => {
          var l;
          let { target: a, pending: s, lastShape: u } = t();
          if (
            a?.slot === n &&
            ((l = a.props),
            Object.keys({ ...l, ...i }).every((e) => Object.is(l[e], i[e])))
          )
            return;
          let d = a?.slot !== n,
            c = d ? null : s,
            f = o(c ? [i.coin, c] : [i.coin]);
          e({
            target: { slot: n, props: i },
            pending: c,
            pendingProps: d ? null : t().pendingProps,
            ...f,
            frameProps: { ...f.frameProps, [(0, r.c)(i.coin.mint)]: i },
            lastShape: {
              widthPx: u?.widthPx ?? 1280,
              heightPx: i.heightPx,
              surface: i.surface,
            },
          });
        },
        releaseSlot: (n) => {
          let { target: r, pending: i } = t();
          r?.slot === n &&
            e(
              i
                ? { target: null, overlay: null }
                : {
                    target: null,
                    overlay: null,
                    pending: r.props.coin,
                    pendingProps: r.props,
                  },
            );
        },
        setOverlay: (n) => {
          t().overlay !== n && e({ overlay: n });
        },
        clearOverlay: (n) => {
          t().overlay === n && e({ overlay: null });
        },
        setHasChart: (n) => {
          t().hasChart !== n && e({ hasChart: n });
        },
        noteSeenCoin: (n) => {
          let { seenCoins: r } = t();
          r.some((e) => l(e.mint, n.mint)) ||
            e({ seenCoins: r.length < 4 ? [...r, n] : [...r.slice(0, -1), n] });
        },
        dropSeenCoin: (n) => {
          let { seenCoins: r } = t();
          r.some((e) => l(e.mint, n)) &&
            e({ seenCoins: r.filter((e) => !l(e.mint, n)) });
        },
        seatIdle: (n) => {
          let { enabled: r, pool: l, idleSeats: o } = t();
          if (!r) return;
          let s = ((e, t) => {
            if (a(e, t.mint)) return e;
            let n = i.find((t) => null === e[t]);
            return n ? { ...e, [n]: t } : e;
          })(l, n);
          if (s === l) return;
          let u = i.find((e) => s[e] !== l[e]);
          e({ pool: s, idleSeats: u && !o.includes(u) ? [...o, u] : o });
        },
        registerShell: (n) => {
          t().enabled && t().shell !== n && e({ shell: n });
        },
        releaseShell: (n) => {
          t().shell === n && e({ shell: null });
        },
        rememberSlotWidth: (n) => {
          let { lastShape: r } = t();
          !(n <= 0) &&
            r &&
            r.widthPx !== n &&
            e({ lastShape: { ...r, widthPx: n } });
        },
      };
    });
  e.s(["f", 0, 1280, "r", 0, a, "a", 0, l, "x", 0, o]);
};
