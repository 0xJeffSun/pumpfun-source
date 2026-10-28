// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(628151),
    o = t.r(731351),
    i = t.r(299931),
    a = t.r(762091),
    l = t.r(271112),
    s = t.r(853658),
    u = t.r(546711),
    f = t.r(105693),
    h = t.r(701763),
    c = t.r(725510),
    g = t.r(546103),
    d = t.r(310413),
    p = t.r(658931);
  function m(t, e, r) {
    let n,
      o,
      i = t.size,
      a = g.getEncodedBits(e, r);
    for (n = 0; n < 15; n++)
      ((o = ((a >> n) & 1) == 1),
        n < 6
          ? t.set(n, 8, o, !0)
          : n < 8
            ? t.set(n + 1, 8, o, !0)
            : t.set(i - 15 + n, 8, o, !0),
        n < 8
          ? t.set(8, i - n - 1, o, !0)
          : n < 9
            ? t.set(8, 15 - n - 1 + 1, o, !0)
            : t.set(8, 15 - n - 1, o, !0));
    t.set(i - 8, 8, 1, !0);
  }
  r.create = function (t, e) {
    let r, g;
    if (void 0 === t || "" === t) throw Error("No input text");
    let E = o.M;
    return (
      void 0 !== e &&
        ((E = o.from(e.errorCorrectionLevel, o.M)),
        (r = c.from(e.version)),
        (g = u.from(e.maskPattern)),
        e.toSJISFunc && n.setToSJISFunction(e.toSJISFunc)),
      (function (t, e, r, o) {
        let g;
        if (Array.isArray(t)) g = p.fromArray(t);
        else if ("string" == typeof t) {
          let n = e;
          if (!n) {
            let e = p.rawSplit(t);
            n = c.getBestVersionForData(e, r);
          }
          g = p.fromString(t, n || 40);
        } else throw Error("Invalid data");
        let E = c.getBestVersionForData(g, r);
        if (!E)
          throw Error(
            "The amount of data is too big to be stored in a QR Code",
          );
        if (e) {
          if (e < E)
            throw Error(
              "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " +
                E +
                ".\n",
            );
        } else e = E;
        let y = (function (t, e, r) {
            let o = new i();
            r.forEach(function (e) {
              (o.put(e.mode.bit, 4),
                o.put(e.getLength(), d.getCharCountIndicator(e.mode, t)),
                e.write(o));
            });
            let a =
              (n.getSymbolTotalCodewords(t) - f.getTotalCodewordsCount(t, e)) *
              8;
            for (
              o.getLengthInBits() + 4 <= a && o.put(0, 4);
              o.getLengthInBits() % 8 != 0;

            )
              o.putBit(0);
            let l = (a - o.getLengthInBits()) / 8;
            for (let t = 0; t < l; t++) o.put(t % 2 ? 17 : 236, 8);
            return (function (t, e, r) {
              let o,
                i,
                a = n.getSymbolTotalCodewords(e),
                l = a - f.getTotalCodewordsCount(e, r),
                s = f.getBlocksCount(e, r),
                u = a % s,
                c = s - u,
                g = Math.floor(a / s),
                d = Math.floor(l / s),
                p = d + 1,
                m = g - d,
                E = new h(m),
                y = 0,
                w = Array(s),
                A = Array(s),
                C = 0,
                B = new Uint8Array(t.buffer);
              for (let t = 0; t < s; t++) {
                let e = t < c ? d : p;
                ((w[t] = B.slice(y, y + e)),
                  (A[t] = E.encode(w[t])),
                  (y += e),
                  (C = Math.max(C, e)));
              }
              let T = new Uint8Array(a),
                I = 0;
              for (o = 0; o < C; o++)
                for (i = 0; i < s; i++) o < w[i].length && (T[I++] = w[i][o]);
              for (o = 0; o < m; o++) for (i = 0; i < s; i++) T[I++] = A[i][o];
              return T;
            })(o, t, e);
          })(e, r, g),
          w = new a(n.getSymbolSize(e));
        !(function (t, e) {
          let r = t.size,
            n = s.getPositions(e);
          for (let e = 0; e < n.length; e++) {
            let o = n[e][0],
              i = n[e][1];
            for (let e = -1; e <= 7; e++)
              if (!(o + e <= -1) && !(r <= o + e))
                for (let n = -1; n <= 7; n++)
                  i + n <= -1 ||
                    r <= i + n ||
                    ((e >= 0 && e <= 6 && (0 === n || 6 === n)) ||
                    (n >= 0 && n <= 6 && (0 === e || 6 === e)) ||
                    (e >= 2 && e <= 4 && n >= 2 && n <= 4)
                      ? t.set(o + e, i + n, !0, !0)
                      : t.set(o + e, i + n, !1, !0));
          }
        })(w, e);
        let A = w.size;
        for (let t = 8; t < A - 8; t++) {
          let e = t % 2 == 0;
          (w.set(t, 6, e, !0), w.set(6, t, e, !0));
        }
        return (
          !(function (t, e) {
            let r = l.getPositions(e);
            for (let e = 0; e < r.length; e++) {
              let n = r[e][0],
                o = r[e][1];
              for (let e = -2; e <= 2; e++)
                for (let r = -2; r <= 2; r++)
                  -2 === e ||
                  2 === e ||
                  -2 === r ||
                  2 === r ||
                  (0 === e && 0 === r)
                    ? t.set(n + e, o + r, !0, !0)
                    : t.set(n + e, o + r, !1, !0);
            }
          })(w, e),
          m(w, r, 0),
          e >= 7 &&
            (function (t, e) {
              let r,
                n,
                o,
                i = t.size,
                a = c.getEncodedBits(e);
              for (let e = 0; e < 18; e++)
                ((r = Math.floor(e / 3)),
                  (n = (e % 3) + i - 8 - 3),
                  (o = ((a >> e) & 1) == 1),
                  t.set(r, n, o, !0),
                  t.set(n, r, o, !0));
            })(w, e),
          !(function (t, e) {
            let r = t.size,
              n = -1,
              o = r - 1,
              i = 7,
              a = 0;
            for (let l = r - 1; l > 0; l -= 2)
              for (6 === l && l--; ; ) {
                for (let r = 0; r < 2; r++)
                  if (!t.isReserved(o, l - r)) {
                    let n = !1;
                    (a < e.length && (n = ((e[a] >>> i) & 1) == 1),
                      t.set(o, l - r, n),
                      -1 == --i && (a++, (i = 7)));
                  }
                if ((o += n) < 0 || r <= o) {
                  ((o -= n), (n = -n));
                  break;
                }
              }
          })(w, y),
          isNaN(o) && (o = u.getBestMask(w, m.bind(null, w, r))),
          u.applyMask(o, w),
          m(w, r, o),
          {
            modules: w,
            version: e,
            errorCorrectionLevel: r,
            maskPattern: o,
            segments: g,
          }
        );
      })(t, r, E, g)
    );
  };
};
