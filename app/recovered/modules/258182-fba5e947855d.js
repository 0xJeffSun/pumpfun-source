// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    l = e.i(352386),
    a = e.i(408750);
  let n = (e, t) => ["callouts", "replies", e, t],
    i = (e, t, r) => [...n(e, t), "children", r],
    s = 0,
    o = new Set(),
    u = () => {
      for (let e of ((s += 1), o)) e();
    },
    d = (e) => (
      o.add(e),
      () => {
        o.delete(e);
      }
    ),
    c = () => s,
    m = new Map(),
    f = (e, t) => `${e}|${t}`,
    p = (e, t) => ({
      ...e,
      directReplyCount: Math.max((e.directReplyCount ?? 0) + t, 0),
      ...("number" == typeof e.threadReplyCount
        ? { threadReplyCount: Math.max(e.threadReplyCount + t, 0) }
        : {}),
    });
  function h(e, t, r = "all", l = null) {
    let a = f(e, t),
      n = m.get(a);
    if (!n) return [];
    let i = Date.now(),
      s = n.filter((e) => i - e.registeredAtMs <= 3e5);
    return (
      0 === s.length ? m.delete(a) : s.length !== n.length && m.set(a, s),
      s
        .filter((e) => e.parentReplyId === l)
        .filter((e) => "all" === r || e.isAuthorReply)
        .map((e) => e.reply)
    );
  }
  let y = new Map(),
    g = (e) => {
      if (0 === y.size) return e;
      let t = !1,
        r = e.map((e) => {
          let r = y.get(e.replyId);
          return void 0 === r || (e.likedByViewer ?? !1) === r
            ? e
            : ((t = !0), { ...e, likedByViewer: r });
        });
      return t ? r : e;
    };
  function x(e) {
    return `${e.userId.toLowerCase()}|${e.content.trim()}`;
  }
  function I(e) {
    return e.replyId;
  }
  e.s([
    "a",
    0,
    function (e, t) {
      let {
        mint: r,
        calloutId: l,
        reply: a,
        isAuthorReply: s,
        parentReplyId: o,
      } = t;
      if (o) {
        let t = i(r, l, o),
          n = e.getQueryData(t);
        if (!n || n.some((e) => e.replyId === a.replyId)) return;
        e.setQueryData(t, [...n, a]);
        return;
      }
      for (let [t, i] of e.getQueriesData({ queryKey: n(r, l) }))
        !(!i || ("author" === t.at(-1) && !s) || t.includes("children")) &&
          (i.some((e) => e.replyId === a.replyId) ||
            e.setQueryData(t, [...i, a]));
    },
    "v",
    0,
    g,
    "k",
    0,
    function (e, t) {
      let { mint: r, calloutId: l, replyId: a, delta: i } = t;
      for (let [t, s] of e.getQueriesData({ queryKey: n(r, l) }))
        s?.some((e) => e.replyId === a) &&
          e.setQueryData(
            t,
            s.map((e) => (e.replyId === a ? p(e, i) : e)),
          );
      let s = !1;
      for (let [e, t] of m) {
        let r = !1,
          l = t.map((e) =>
            e.reply.replyId !== a
              ? e
              : ((r = !0), { ...e, reply: p(e.reply, i) }),
          );
        r && (m.set(e, l), (s = !0));
      }
      s && u();
    },
    "o",
    0,
    n,
    "Q",
    0,
    i,
    "g",
    0,
    function (e) {
      return y.get(e);
    },
    "u",
    0,
    h,
    "N",
    0,
    function (e, t, r, l) {
      let a = m.get(f(e, t));
      if (!a) return !1;
      let n = Date.now();
      return a.some((e) => e.reply.replyId === r && n - e.registeredAtMs <= l);
    },
    "K",
    0,
    function (e, t) {
      let r = !1;
      for (let [l, a] of m) {
        let n = !1,
          i = a.map((r) =>
            r.reply.replyId !== e
              ? r
              : ((n = !0),
                {
                  ...r,
                  reply: {
                    ...r.reply,
                    likeCount: Math.max((r.reply.likeCount ?? 0) + t, 0),
                  },
                }),
          );
        n && (m.set(l, i), (r = !0));
      }
      r && u();
    },
    "j",
    0,
    function (e, t) {
      let r = y.get(e);
      return (y.set(e, t), u(), r);
    },
    "t",
    0,
    function (e, t, r, l) {
      let a = f(e, t),
        n = m.get(a) ?? [];
      (m.set(a, [
        ...n,
        {
          reply: r,
          isAuthorReply: l.isAuthorReply,
          parentReplyId: l.parentReplyId ?? null,
          registeredAtMs: Date.now(),
        },
      ]),
        u());
    },
    "w",
    0,
    function (e, t) {
      (void 0 === t ? y.delete(e) : y.set(e, t), u());
    },
    "L",
    0,
    function () {
      return (0, l.useSyncExternalStore)(d, c, c);
    },
    "E",
    0,
    function (e) {
      let i,
        s,
        o,
        u,
        m,
        f = (0, t.c)(26),
        {
          mint: p,
          calloutId: y,
          enabled: v,
          scope: w,
          refetchIntervalMs: b,
        } = e,
        A = void 0 === w ? "author" : w,
        N = (void 0 === v || v) && !!p && !!y,
        k = p ?? null,
        C = y ?? null;
      if (f[0] !== A || f[1] !== k || f[2] !== C)
        ((i = [...n(k, C), A]), (f[0] = A), (f[1] = k), (f[2] = C), (f[3] = i));
      else i = f[3];
      f[4] !== y || f[5] !== p || f[6] !== A
        ? ((s = (e) => {
            let { signal: t } = e;
            if (!p || !y) throw Error("mint and calloutId required");
            return (0, a.L)({ mint: p, calloutId: y, scope: A, signal: t });
          }),
          (f[4] = y),
          (f[5] = p),
          (f[6] = A),
          (f[7] = s))
        : (s = f[7]);
      let E = b ?? !1;
      f[8] !== N || f[9] !== i || f[10] !== s || f[11] !== E
        ? ((o = {
            enabled: N,
            queryKey: i,
            queryFn: s,
            staleTime: 15e3,
            gcTime: 3e5,
            refetchOnWindowFocus: !1,
            refetchInterval: E,
            refetchIntervalInBackground: !1,
          }),
          (f[8] = N),
          (f[9] = i),
          (f[10] = s),
          (f[11] = E),
          (f[12] = o))
        : (o = f[12]);
      let _ = (0, r.useQuery)(o);
      if (
        ((0, l.useSyncExternalStore)(d, c, c),
        f[13] !== y || f[14] !== p || f[15] !== _.data || f[16] !== A)
      ) {
        e: {
          let e,
            t = _.data ?? [];
          if (!p || !y) {
            u = t;
            break e;
          }
          let r = h(p, y, A);
          if (0 === r.length) {
            u = g(t);
            break e;
          }
          let l = new Set(t.map(I)),
            a = new Set(t.map(x)),
            n = r.filter(
              (e) =>
                !l.has(e.replyId) &&
                (!e.replyId.startsWith("pending-") ||
                  !a.has(`${e.userId.toLowerCase()}|${e.content.trim()}`)),
            ),
            i = 0 === n.length ? t : [...t, ...n];
          (f[18] !== i ? ((e = g(i)), (f[18] = i), (f[19] = e)) : (e = f[19]),
            (u = e));
        }
        ((f[13] = y), (f[14] = p), (f[15] = _.data), (f[16] = A), (f[17] = u));
      } else u = f[17];
      let R = u;
      return (
        f[20] !== _.error ||
        f[21] !== _.isError ||
        f[22] !== _.isLoading ||
        f[23] !== _.refetch ||
        f[24] !== R
          ? ((m = {
              replies: R,
              isLoading: _.isLoading,
              isError: _.isError,
              error: _.error,
              refetch: _.refetch,
            }),
            (f[20] = _.error),
            (f[21] = _.isError),
            (f[22] = _.isLoading),
            (f[23] = _.refetch),
            (f[24] = R),
            (f[25] = m))
          : (m = f[25]),
        m
      );
    },
  ]);
};
