// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(944410),
    r = e.i(132838),
    n = e.i(606933),
    s = e.i(63289),
    a = e.i(38279),
    o = e.i(777683);
  e.s(
    [
      "f",
      0,
      (e) => {
        let l,
          c,
          d,
          u,
          m,
          p,
          f,
          x,
          b = (0, t.c)(18);
        (b[0] !== e
          ? ((l = void 0 === e ? {} : e), (b[0] = e), (b[1] = l))
          : (l = b[1]),
          b[2] !== l
            ? (({ onSuccess: d, onError: c, ...u } = l),
              (b[2] = l),
              (b[3] = c),
              (b[4] = d),
              (b[5] = u))
            : ((c = b[3]), (d = b[4]), (u = b[5])));
        let h = (0, i.useLivestreamApiClient)(),
          y = (0, n.useQueryClient)();
        return (
          b[6] !== h
            ? ((m = async (e) => {
                let { taskId: t, force: i } = e;
                await h.delete(`bounties/tasks/${encodeURIComponent(t)}`, {
                  ...(i ? { searchParams: { force: "true" } } : {}),
                });
              }),
              (b[6] = h),
              (b[7] = m))
            : (m = b[7]),
          b[8] !== d || b[9] !== y
            ? ((p = (e, t, i) => {
                (y.invalidateQueries({ queryKey: ["bounties", "myDrafts"] }),
                  y.invalidateQueries({ queryKey: a.Q.BOUNTY_RECOVERABLE() }),
                  y.invalidateQueries({ queryKey: a.Q.BOUNTY_DRAFT(t.taskId) }),
                  y.invalidateQueries({ queryKey: a.Q.BOUNTY_TASK(t.taskId) }),
                  d?.(e, t, i));
              }),
              (b[8] = d),
              (b[9] = y),
              (b[10] = p))
            : (p = b[10]),
          b[11] !== c
            ? ((f = async (e, t, i) => {
                let r = await (0, o.A)(e);
                if (r?.code === "BOUNTY_FUNDED_ON_CHAIN")
                  return void c?.(e, t, i);
                let n = await (0, o.u)(e, "Could not delete bounty draft.");
                (s.c.error(n), c?.(e, t, i));
              }),
              (b[11] = c),
              (b[12] = f))
            : (f = b[12]),
          b[13] !== u || b[14] !== m || b[15] !== p || b[16] !== f
            ? ((x = { ...u, mutationFn: m, onSuccess: p, onError: f }),
              (b[13] = u),
              (b[14] = m),
              (b[15] = p),
              (b[16] = f),
              (b[17] = x))
            : (x = b[17]),
          (0, r.f)(x)
        );
      },
    ],
    367643,
  );
  var l = e.i(711902);
  e.s(
    [
      "f",
      0,
      (e) => {
        let c,
          d,
          u,
          m,
          p,
          f,
          x,
          b,
          h = (0, t.c)(18);
        (h[0] !== e
          ? ((c = void 0 === e ? {} : e), (h[0] = e), (h[1] = c))
          : (c = h[1]),
          h[2] !== c
            ? (({ onSuccess: u, onError: d, ...m } = c),
              (h[2] = c),
              (h[3] = d),
              (h[4] = u),
              (h[5] = m))
            : ((d = h[3]), (u = h[4]), (m = h[5])));
        let y = (0, i.useLivestreamApiClient)(),
          g = (0, n.useQueryClient)();
        return (
          h[6] !== y
            ? ((p = async (e) => {
                let { taskId: t } = e,
                  i = await y
                    .post(`bounties/tasks/${encodeURIComponent(t)}/recover`)
                    .json();
                return l.R.parse(i);
              }),
              (h[6] = y),
              (h[7] = p))
            : (p = h[7]),
          h[8] !== u || h[9] !== g
            ? ((f = (e, t, i) => {
                if (
                  (g.invalidateQueries({ queryKey: a.Q.BOUNTY_RECOVERABLE() }),
                  g.invalidateQueries({ queryKey: ["bounties", "myDrafts"] }),
                  g.invalidateQueries({ queryKey: a.Q.BOUNTY_DRAFT(t.taskId) }),
                  g.invalidateQueries({ queryKey: a.Q.BOUNTY_TASK(t.taskId) }),
                  "NEEDS_FUNDING" !== e.status)
                )
                  for (let t of (g.invalidateQueries({
                    queryKey: a.Q.BOUNTY_PUBLIC_TASK(e.taskId),
                  }),
                  g.invalidateQueries({ queryKey: ["bounties", "publicList"] }),
                  g.invalidateQueries({
                    queryKey: ["bounties", "publicListV2"],
                  }),
                  g.invalidateQueries({
                    queryKey: ["bounties", "publicListV2Infinite"],
                  }),
                  a.w))
                    g.invalidateQueries({ queryKey: t });
                u?.(e, t, i);
              }),
              (h[8] = u),
              (h[9] = g),
              (h[10] = f))
            : (f = h[10]),
          h[11] !== d
            ? ((x = async (e, t, i) => {
                let r = await (0, o.u)(e, "Could not recover bounty.");
                (s.c.error(r), d?.(e, t, i));
              }),
              (h[11] = d),
              (h[12] = x))
            : (x = h[12]),
          h[13] !== m || h[14] !== p || h[15] !== f || h[16] !== x
            ? ((b = { ...m, mutationFn: p, onSuccess: f, onError: x }),
              (h[13] = m),
              (h[14] = p),
              (h[15] = f),
              (h[16] = x),
              (h[17] = b))
            : (b = h[17]),
          (0, r.f)(b)
        );
      },
    ],
    832705,
  );
};
