// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(944410),
    n = e.i(132838),
    a = e.i(690877),
    i = e.i(711902),
    o = e.i(466931),
    l = e.i(38279);
  let u = async ({ api: e, args: t }) => {
      let r = await e.post("bounties/fees/quote", { json: t }).json();
      return i.U.parse(r);
    },
    s = async ({ api: e, taskId: t }) => {
      let r = await e
        .get(`bounties/fees/tasks/${encodeURIComponent(t)}`)
        .json();
      return i.Z.parse(r);
    },
    c = ({ quotes: e, payerAddress: t, quoteNonce: r }) =>
      e.find((e) => e.payerAddress === t && e.quoteNonce === r),
    d = (e, t) =>
      new Promise((r, n) => {
        if (t?.aborted)
          return void n(new DOMException("Aborted", "AbortError"));
        let a = () => {
            (clearTimeout(i), n(new DOMException("Aborted", "AbortError")));
          },
          i = setTimeout(() => {
            (t?.removeEventListener("abort", a), r());
          }, e);
        t?.addEventListener("abort", a);
      }),
    f = async ({
      api: e,
      taskId: t,
      payerAddress: r,
      quoteNonce: n,
      signal: a,
    }) => {
      let i = Date.now() + 9e4,
        o = null;
      for (;;) {
        try {
          let a = await s({ api: e, taskId: t }),
            i = c({ quotes: a.quotes, payerAddress: r, quoteNonce: n });
          if (i && ((o = i), "VERIFIED" === i.status))
            return { status: "verified", quote: i };
        } catch {}
        if (Date.now() + 3e3 >= i) return { status: "timeout", quote: o };
        await d(3e3, a);
      }
    };
  e.s([
    "j",
    0,
    () => {
      let e,
        a = (0, t.c)(2),
        i = (0, r.useLivestreamApiClient)();
      return (
        a[0] !== i
          ? ((e = {
              mutationFn: async (e) => {
                try {
                  return await u({ api: i, args: e });
                } catch (t) {
                  throw (
                    (0, o.l)({
                      error: t,
                      feature: "bounties",
                      operation: "fee-quote",
                      context: {
                        mint: e.feeMint,
                        purpose: e.purpose,
                        taskId: e.taskId,
                      },
                    }),
                    t
                  );
                }
              },
            }),
            (a[0] = i),
            (a[1] = e))
          : (e = a[1]),
        (0, n.f)(e)
      );
    },
    "M",
    0,
    () => {
      let e,
        n = (0, t.c)(2),
        a = (0, r.useLivestreamApiClient)();
      return (
        n[0] !== a
          ? ((e = (e) => f({ ...e, api: a })), (n[0] = a), (n[1] = e))
          : (e = n[1]),
        e
      );
    },
    "B",
    0,
    (e) => {
      let n,
        i,
        o,
        u = (0, t.c)(10),
        { taskId: c, address: d, enabled: f } = e,
        m = (0, r.useLivestreamApiClient)(),
        p = !!((void 0 === f || f) && c && d);
      return (
        u[0] !== d || u[1] !== c
          ? ((n = l.Q.BOUNTY_FEE_STATUS(c ?? "", d ?? "")),
            (u[0] = d),
            (u[1] = c),
            (u[2] = n))
          : (n = u[2]),
        u[3] !== m || u[4] !== c
          ? ((i = () => s({ api: m, taskId: c ?? "" })),
            (u[3] = m),
            (u[4] = c),
            (u[5] = i))
          : (i = u[5]),
        u[6] !== p || u[7] !== n || u[8] !== i
          ? ((o = { enabled: p, queryKey: n, queryFn: i, staleTime: 15e3 }),
            (u[6] = p),
            (u[7] = n),
            (u[8] = i),
            (u[9] = o))
          : (o = u[9]),
        (0, a.useQuery)(o)
      );
    },
  ]);
};
