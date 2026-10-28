// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(310413),
    o = t.r(938983),
    i = t.r(488440),
    a = t.r(120648),
    l = t.r(416133),
    s = t.r(214477),
    u = t.r(628151),
    f = t.r(745759);
  function h(t) {
    return unescape(encodeURIComponent(t)).length;
  }
  function c(t, e, r) {
    let n,
      o = [];
    for (; null !== (n = t.exec(r)); )
      o.push({ data: n[0], index: n.index, mode: e, length: n[0].length });
    return o;
  }
  function g(t) {
    let e,
      r,
      o = c(s.NUMERIC, n.NUMERIC, t),
      i = c(s.ALPHANUMERIC, n.ALPHANUMERIC, t);
    return (
      u.isKanjiModeEnabled()
        ? ((e = c(s.BYTE, n.BYTE, t)), (r = c(s.KANJI, n.KANJI, t)))
        : ((e = c(s.BYTE_KANJI, n.BYTE, t)), (r = [])),
      o
        .concat(i, e, r)
        .sort(function (t, e) {
          return t.index - e.index;
        })
        .map(function (t) {
          return { data: t.data, mode: t.mode, length: t.length };
        })
    );
  }
  function d(t, e) {
    switch (e) {
      case n.NUMERIC:
        return o.getBitsLength(t);
      case n.ALPHANUMERIC:
        return i.getBitsLength(t);
      case n.KANJI:
        return l.getBitsLength(t);
      case n.BYTE:
        return a.getBitsLength(t);
    }
  }
  function p(t, e) {
    let r,
      s = n.getBestModeForData(t);
    if ((r = n.from(e, s)) !== n.BYTE && r.bit < s.bit)
      throw Error(
        '"' +
          t +
          '" cannot be encoded with mode ' +
          n.toString(r) +
          ".\n Suggested mode is: " +
          n.toString(s),
      );
    switch ((r === n.KANJI && !u.isKanjiModeEnabled() && (r = n.BYTE), r)) {
      case n.NUMERIC:
        return new o(t);
      case n.ALPHANUMERIC:
        return new i(t);
      case n.KANJI:
        return new l(t);
      case n.BYTE:
        return new a(t);
    }
  }
  ((r.fromArray = function (t) {
    return t.reduce(function (t, e) {
      return (
        "string" == typeof e
          ? t.push(p(e, null))
          : e.data && t.push(p(e.data, e.mode)),
        t
      );
    }, []);
  }),
    (r.fromString = function (t, e) {
      let o = (function (t, e) {
          let r = {},
            o = { start: {} },
            i = ["start"];
          for (let a = 0; a < t.length; a++) {
            let l = t[a],
              s = [];
            for (let t = 0; t < l.length; t++) {
              let u = l[t],
                f = "" + a + t;
              (s.push(f), (r[f] = { node: u, lastCount: 0 }), (o[f] = {}));
              for (let t = 0; t < i.length; t++) {
                let a = i[t];
                r[a] && r[a].node.mode === u.mode
                  ? ((o[a][f] =
                      d(r[a].lastCount + u.length, u.mode) -
                      d(r[a].lastCount, u.mode)),
                    (r[a].lastCount += u.length))
                  : (r[a] && (r[a].lastCount = u.length),
                    (o[a][f] =
                      d(u.length, u.mode) +
                      4 +
                      n.getCharCountIndicator(u.mode, e)));
              }
            }
            i = s;
          }
          for (let t = 0; t < i.length; t++) o[i[t]].end = 0;
          return { map: o, table: r };
        })(
          (function (t) {
            let e = [];
            for (let r = 0; r < t.length; r++) {
              let o = t[r];
              switch (o.mode) {
                case n.NUMERIC:
                  e.push([
                    o,
                    { data: o.data, mode: n.ALPHANUMERIC, length: o.length },
                    { data: o.data, mode: n.BYTE, length: o.length },
                  ]);
                  break;
                case n.ALPHANUMERIC:
                  e.push([o, { data: o.data, mode: n.BYTE, length: o.length }]);
                  break;
                case n.KANJI:
                  e.push([
                    o,
                    { data: o.data, mode: n.BYTE, length: h(o.data) },
                  ]);
                  break;
                case n.BYTE:
                  e.push([{ data: o.data, mode: n.BYTE, length: h(o.data) }]);
              }
            }
            return e;
          })(g(t, u.isKanjiModeEnabled())),
          e,
        ),
        i = f.find_path(o.map, "start", "end"),
        a = [];
      for (let t = 1; t < i.length - 1; t++) a.push(o.table[i[t]].node);
      return r.fromArray(
        a.reduce(function (t, e) {
          let r = t.length - 1 >= 0 ? t[t.length - 1] : null;
          return (
            r && r.mode === e.mode
              ? (t[t.length - 1].data += e.data)
              : t.push(e),
            t
          );
        }, []),
      );
    }),
    (r.rawSplit = function (t) {
      return r.fromArray(g(t, u.isKanjiModeEnabled()));
    }));
};
