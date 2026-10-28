// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(984086),
    o = t.r(669993),
    n = t.r(554818),
    a = t.r(205920),
    s = t.r(816830),
    l = t.r(269436),
    c = t.r(48130),
    u = t.r(81774),
    d = t.r(362351),
    h = t.r(700608),
    p = t.r(993368),
    f = t.r(598670),
    g = t.r(793490);
  function w(t, e, i) {
    let r,
      o,
      n = t.size,
      a = p.getEncodedBits(e, i);
    for (r = 0; r < 15; r++)
      ((o = ((a >> r) & 1) == 1),
        r < 6
          ? t.set(r, 8, o, !0)
          : r < 8
            ? t.set(r + 1, 8, o, !0)
            : t.set(n - 15 + r, 8, o, !0),
        r < 8
          ? t.set(8, n - r - 1, o, !0)
          : r < 9
            ? t.set(8, 15 - r - 1 + 1, o, !0)
            : t.set(8, 15 - r - 1, o, !0));
    t.set(n - 8, 8, 1, !0);
  }
  i.create = function (t, e) {
    let i, p;
    if (void 0 === t || "" === t) throw Error("No input text");
    let b = o.M;
    return (
      void 0 !== e &&
        ((b = o.from(e.errorCorrectionLevel, o.M)),
        (i = h.from(e.version)),
        (p = c.from(e.maskPattern)),
        e.toSJISFunc && r.setToSJISFunction(e.toSJISFunc)),
      (function (t, e, i, o) {
        let p;
        if (Array.isArray(t)) p = g.fromArray(t);
        else if ("string" == typeof t) {
          let r = e;
          if (!r) {
            let e = g.rawSplit(t);
            r = h.getBestVersionForData(e, i);
          }
          p = g.fromString(t, r || 40);
        } else throw Error("Invalid data");
        let b = h.getBestVersionForData(p, i);
        if (!b)
          throw Error(
            "The amount of data is too big to be stored in a QR Code",
          );
        if (e) {
          if (e < b)
            throw Error(
              "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " +
                b +
                ".\n",
            );
        } else e = b;
        let m = (function (t, e, i) {
            let o = new n();
            i.forEach(function (e) {
              (o.put(e.mode.bit, 4),
                o.put(e.getLength(), f.getCharCountIndicator(e.mode, t)),
                e.write(o));
            });
            let a =
              (r.getSymbolTotalCodewords(t) - u.getTotalCodewordsCount(t, e)) *
              8;
            for (
              o.getLengthInBits() + 4 <= a && o.put(0, 4);
              o.getLengthInBits() % 8 != 0;

            )
              o.putBit(0);
            let s = (a - o.getLengthInBits()) / 8;
            for (let t = 0; t < s; t++) o.put(t % 2 ? 17 : 236, 8);
            return (function (t, e, i) {
              let o,
                n,
                a = r.getSymbolTotalCodewords(e),
                s = a - u.getTotalCodewordsCount(e, i),
                l = u.getBlocksCount(e, i),
                c = a % l,
                h = l - c,
                p = Math.floor(a / l),
                f = Math.floor(s / l),
                g = f + 1,
                w = p - f,
                b = new d(w),
                m = 0,
                v = Array(l),
                y = Array(l),
                x = 0,
                $ = new Uint8Array(t.buffer);
              for (let t = 0; t < l; t++) {
                let e = t < h ? f : g;
                ((v[t] = $.slice(m, m + e)),
                  (y[t] = b.encode(v[t])),
                  (m += e),
                  (x = Math.max(x, e)));
              }
              let C = new Uint8Array(a),
                k = 0;
              for (o = 0; o < x; o++)
                for (n = 0; n < l; n++) o < v[n].length && (C[k++] = v[n][o]);
              for (o = 0; o < w; o++) for (n = 0; n < l; n++) C[k++] = y[n][o];
              return C;
            })(o, t, e);
          })(e, i, p),
          v = new a(r.getSymbolSize(e));
        !(function (t, e) {
          let i = t.size,
            r = l.getPositions(e);
          for (let e = 0; e < r.length; e++) {
            let o = r[e][0],
              n = r[e][1];
            for (let e = -1; e <= 7; e++)
              if (!(o + e <= -1) && !(i <= o + e))
                for (let r = -1; r <= 7; r++)
                  n + r <= -1 ||
                    i <= n + r ||
                    ((e >= 0 && e <= 6 && (0 === r || 6 === r)) ||
                    (r >= 0 && r <= 6 && (0 === e || 6 === e)) ||
                    (e >= 2 && e <= 4 && r >= 2 && r <= 4)
                      ? t.set(o + e, n + r, !0, !0)
                      : t.set(o + e, n + r, !1, !0));
          }
        })(v, e);
        let y = v.size;
        for (let t = 8; t < y - 8; t++) {
          let e = t % 2 == 0;
          (v.set(t, 6, e, !0), v.set(6, t, e, !0));
        }
        return (
          !(function (t, e) {
            let i = s.getPositions(e);
            for (let e = 0; e < i.length; e++) {
              let r = i[e][0],
                o = i[e][1];
              for (let e = -2; e <= 2; e++)
                for (let i = -2; i <= 2; i++)
                  -2 === e ||
                  2 === e ||
                  -2 === i ||
                  2 === i ||
                  (0 === e && 0 === i)
                    ? t.set(r + e, o + i, !0, !0)
                    : t.set(r + e, o + i, !1, !0);
            }
          })(v, e),
          w(v, i, 0),
          e >= 7 &&
            (function (t, e) {
              let i,
                r,
                o,
                n = t.size,
                a = h.getEncodedBits(e);
              for (let e = 0; e < 18; e++)
                ((i = Math.floor(e / 3)),
                  (r = (e % 3) + n - 8 - 3),
                  (o = ((a >> e) & 1) == 1),
                  t.set(i, r, o, !0),
                  t.set(r, i, o, !0));
            })(v, e),
          !(function (t, e) {
            let i = t.size,
              r = -1,
              o = i - 1,
              n = 7,
              a = 0;
            for (let s = i - 1; s > 0; s -= 2)
              for (6 === s && s--; ; ) {
                for (let i = 0; i < 2; i++)
                  if (!t.isReserved(o, s - i)) {
                    let r = !1;
                    (a < e.length && (r = ((e[a] >>> n) & 1) == 1),
                      t.set(o, s - i, r),
                      -1 == --n && (a++, (n = 7)));
                  }
                if ((o += r) < 0 || i <= o) {
                  ((o -= r), (r = -r));
                  break;
                }
              }
          })(v, m),
          isNaN(o) && (o = c.getBestMask(v, w.bind(null, v, i))),
          c.applyMask(o, v),
          w(v, i, o),
          {
            modules: v,
            version: e,
            errorCorrectionLevel: i,
            maskPattern: o,
            segments: p,
          }
        );
      })(t, i, b, p)
    );
  };
};
