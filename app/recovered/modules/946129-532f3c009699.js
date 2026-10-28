// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var r = e.i(445242),
    a = e.i(311282),
    o = e.i(751275),
    i = e.i(986071),
    n = e.i(148269);
  function s(e) {
    let t,
      o = (0, r.c)(2),
      i = void 0 === e ? "" : e;
    return (
      o[0] !== i
        ? ((t = a.d.withDefault(i)), (o[0] = i), (o[1] = t))
        : (t = o[1]),
      (0, a.o)("q", t)
    );
  }
  (e.s(["f", 0, s], 524517),
    e.s(
      [
        "f",
        0,
        function () {
          let e,
            l,
            d,
            c,
            m,
            u = (0, r.c)(15),
            k = (0, o.y)();
          u[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = t ??=
                (0, a.k)({ parse: (e) => e, serialize: (e) => e }).withDefault(
                  n.Q,
                )),
              (u[0] = e))
            : (e = u[0]);
          let [f, h] = (0, a.o)(i.f.HOME.SORT, e),
            [_] = s();
          u[1] !== _ ? ((l = _.trim()), (u[1] = _), (u[2] = l)) : (l = u[2]);
          let y = "" !== l;
          u[3] !== y || u[4] !== f || u[5] !== k
            ? ((d = (0, n.P)(f, { variant: k, hasSearchTerm: y })),
              (u[3] = y),
              (u[4] = f),
              (u[5] = k),
              (u[6] = d))
            : (d = u[6]);
          let p = d;
          u[7] !== h ? ((c = (e) => h(e)), (u[7] = h), (u[8] = c)) : (c = u[8]);
          let w = c;
          return (
            u[9] !== f ||
            u[10] !== p.notice ||
            u[11] !== p.sort ||
            u[12] !== w ||
            u[13] !== h
              ? ((m = {
                  homeSort: p.sort,
                  setHomeSort: w,
                  rawHomeSort: f,
                  setRawHomeSort: h,
                  legacyNotice: p.notice,
                }),
                (u[9] = f),
                (u[10] = p.notice),
                (u[11] = p.sort),
                (u[12] = w),
                (u[13] = h),
                (u[14] = m))
              : (m = u[14]),
            m
          );
        },
      ],
      946129,
    ));
};
