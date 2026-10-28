// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(598670),
    o = t.r(998080),
    n = t.r(449768),
    a = t.r(683144),
    s = t.r(670241),
    l = t.r(320596),
    c = t.r(984086),
    u = t.r(745759);
  function d(t) {
    return unescape(encodeURIComponent(t)).length;
  }
  function h(t, e, i) {
    let r,
      o = [];
    for (; null !== (r = t.exec(i)); )
      o.push({ data: r[0], index: r.index, mode: e, length: r[0].length });
    return o;
  }
  function p(t) {
    let e,
      i,
      o = h(l.NUMERIC, r.NUMERIC, t),
      n = h(l.ALPHANUMERIC, r.ALPHANUMERIC, t);
    return (
      c.isKanjiModeEnabled()
        ? ((e = h(l.BYTE, r.BYTE, t)), (i = h(l.KANJI, r.KANJI, t)))
        : ((e = h(l.BYTE_KANJI, r.BYTE, t)), (i = [])),
      o
        .concat(n, e, i)
        .sort(function (t, e) {
          return t.index - e.index;
        })
        .map(function (t) {
          return { data: t.data, mode: t.mode, length: t.length };
        })
    );
  }
  function f(t, e) {
    switch (e) {
      case r.NUMERIC:
        return o.getBitsLength(t);
      case r.ALPHANUMERIC:
        return n.getBitsLength(t);
      case r.KANJI:
        return s.getBitsLength(t);
      case r.BYTE:
        return a.getBitsLength(t);
    }
  }
  function g(t, e) {
    let i,
      l = r.getBestModeForData(t);
    if ((i = r.from(e, l)) !== r.BYTE && i.bit < l.bit)
      throw Error(
        '"' +
          t +
          '" cannot be encoded with mode ' +
          r.toString(i) +
          ".\n Suggested mode is: " +
          r.toString(l),
      );
    switch ((i === r.KANJI && !c.isKanjiModeEnabled() && (i = r.BYTE), i)) {
      case r.NUMERIC:
        return new o(t);
      case r.ALPHANUMERIC:
        return new n(t);
      case r.KANJI:
        return new s(t);
      case r.BYTE:
        return new a(t);
    }
  }
  ((i.fromArray = function (t) {
    return t.reduce(function (t, e) {
      return (
        "string" == typeof e
          ? t.push(g(e, null))
          : e.data && t.push(g(e.data, e.mode)),
        t
      );
    }, []);
  }),
    (i.fromString = function (t, e) {
      let o = (function (t, e) {
          let i = {},
            o = { start: {} },
            n = ["start"];
          for (let a = 0; a < t.length; a++) {
            let s = t[a],
              l = [];
            for (let t = 0; t < s.length; t++) {
              let c = s[t],
                u = "" + a + t;
              (l.push(u), (i[u] = { node: c, lastCount: 0 }), (o[u] = {}));
              for (let t = 0; t < n.length; t++) {
                let a = n[t];
                i[a] && i[a].node.mode === c.mode
                  ? ((o[a][u] =
                      f(i[a].lastCount + c.length, c.mode) -
                      f(i[a].lastCount, c.mode)),
                    (i[a].lastCount += c.length))
                  : (i[a] && (i[a].lastCount = c.length),
                    (o[a][u] =
                      f(c.length, c.mode) +
                      4 +
                      r.getCharCountIndicator(c.mode, e)));
              }
            }
            n = l;
          }
          for (let t = 0; t < n.length; t++) o[n[t]].end = 0;
          return { map: o, table: i };
        })(
          (function (t) {
            let e = [];
            for (let i = 0; i < t.length; i++) {
              let o = t[i];
              switch (o.mode) {
                case r.NUMERIC:
                  e.push([
                    o,
                    { data: o.data, mode: r.ALPHANUMERIC, length: o.length },
                    { data: o.data, mode: r.BYTE, length: o.length },
                  ]);
                  break;
                case r.ALPHANUMERIC:
                  e.push([o, { data: o.data, mode: r.BYTE, length: o.length }]);
                  break;
                case r.KANJI:
                  e.push([
                    o,
                    { data: o.data, mode: r.BYTE, length: d(o.data) },
                  ]);
                  break;
                case r.BYTE:
                  e.push([{ data: o.data, mode: r.BYTE, length: d(o.data) }]);
              }
            }
            return e;
          })(p(t, c.isKanjiModeEnabled())),
          e,
        ),
        n = u.find_path(o.map, "start", "end"),
        a = [];
      for (let t = 1; t < n.length - 1; t++) a.push(o.table[n[t]].node);
      return i.fromArray(
        a.reduce(function (t, e) {
          let i = t.length - 1 >= 0 ? t[t.length - 1] : null;
          return (
            i && i.mode === e.mode
              ? (t[t.length - 1].data += e.data)
              : t.push(e),
            t
          );
        }, []),
      );
    }),
    (i.rawSplit = function (t) {
      return i.fromArray(p(t, c.isKanjiModeEnabled()));
    }));
};
