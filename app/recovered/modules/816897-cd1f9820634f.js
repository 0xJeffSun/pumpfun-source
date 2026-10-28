// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(944410),
    l = e.i(690877),
    i = e.i(662610),
    a = e.i(560328),
    n = e.i(989582),
    s = e.i(779106);
  function o(e) {
    return "INVITED" === e.status;
  }
  function d(e) {
    return "ACTIVE" === e.status;
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let u,
          c,
          m,
          p,
          h,
          f,
          g,
          y = (0, t.c)(20);
        y[0] !== e
          ? ((u = void 0 === e ? {} : e), (y[0] = e), (y[1] = u))
          : (u = y[1]);
        let { enabled: b } = u,
          v = void 0 === b || b,
          w = (0, i.f)();
        y[2] !== v
          ? ((c = { enabled: v }), (y[2] = v), (y[3] = c))
          : (c = y[3]);
        let x = ((e) => {
          let o,
            d,
            u,
            c,
            m = (0, t.c)(10);
          m[0] !== e
            ? ((o = void 0 === e ? {} : e), (m[0] = e), (m[1] = o))
            : (o = m[1]);
          let { enabled: p } = o,
            h = (0, r.useClientServerContract)(),
            f = (0, s.f)("squad-memberships"),
            g = (0, i.f)();
          m[2] !== f
            ? ((d = n.f.myMemberships(f)), (m[2] = f), (m[3] = d))
            : (d = m[3]);
          let y = null !== f && g && (void 0 === p || p);
          return (
            m[4] !== h
              ? ((u = (e) => {
                  let { signal: t } = e;
                  return (0, a.F)({ api: h, signal: t });
                }),
                (m[4] = h),
                (m[5] = u))
              : (u = m[5]),
            m[6] !== d || m[7] !== y || m[8] !== u
              ? ((c = { queryKey: d, enabled: y, staleTime: 6e4, queryFn: u }),
                (m[6] = d),
                (m[7] = y),
                (m[8] = u),
                (m[9] = c))
              : (c = m[9]),
            (0, l.useQuery)(c)
          );
        })(c);
        y[4] !== x.data || y[5] !== w
          ? ((m = w ? (x.data ?? []) : []),
            (y[4] = x.data),
            (y[5] = w),
            (y[6] = m))
          : (m = y[6]);
        let C = m;
        y[7] !== C ? ((p = C.filter(o)), (y[7] = C), (y[8] = p)) : (p = y[8]);
        let I = p;
        y[9] !== C
          ? ((h = C.find(d) ?? null), (y[9] = C), (y[10] = h))
          : (h = y[10]);
        let A = w && x.isSuccess,
          k = w && x.isError;
        return (
          y[11] !== x
            ? ((f = () => void x.refetch()), (y[11] = x), (y[12] = f))
            : (f = y[12]),
          y[13] !== I ||
          y[14] !== x.isPending ||
          y[15] !== h ||
          y[16] !== A ||
          y[17] !== k ||
          y[18] !== f
            ? ((g = {
                squad: h,
                invites: I,
                inviteCount: I.length,
                isPending: x.isPending,
                isResolved: A,
                isError: k,
                refetch: f,
              }),
              (y[13] = I),
              (y[14] = x.isPending),
              (y[15] = h),
              (y[16] = A),
              (y[17] = k),
              (y[18] = f),
              (y[19] = g))
            : (g = y[19]),
          g
        );
      },
    ],
    816897,
  );
};
