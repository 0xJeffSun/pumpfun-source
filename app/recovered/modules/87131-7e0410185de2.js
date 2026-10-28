// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  ((t.exports = l), (l.default = l), (l.stable = c), (l.stableStringify = c));
  var n = "[...]",
    i = "[Circular]",
    o = [],
    a = [];
  function s() {
    return {
      depthLimit: Number.MAX_SAFE_INTEGER,
      edgesLimit: Number.MAX_SAFE_INTEGER,
    };
  }
  function l(e, t, r, l) {
    (void 0 === l && (l = s()),
      (function e(t, r, o, a, s, l, d) {
        if (((l += 1), "object" == typeof t && null !== t)) {
          for (c = 0; c < a.length; c++)
            if (a[c] === t) return void u(i, t, r, s);
          if (
            (void 0 !== d.depthLimit && l > d.depthLimit) ||
            (void 0 !== d.edgesLimit && o + 1 > d.edgesLimit)
          )
            return void u(n, t, r, s);
          if ((a.push(t), Array.isArray(t)))
            for (c = 0; c < t.length; c++) e(t[c], c, c, a, t, l, d);
          else {
            var c,
              f = Object.keys(t);
            for (c = 0; c < f.length; c++) {
              var h = f[c];
              e(t[h], h, c, a, t, l, d);
            }
          }
          a.pop();
        }
      })(e, "", 0, [], void 0, 0, l));
    try {
      d = 0 === a.length ? JSON.stringify(e, t, r) : JSON.stringify(e, f(t), r);
    } catch (e) {
      return JSON.stringify(
        "[unable to serialize, circular reference is too complex to analyze]",
      );
    } finally {
      for (; 0 !== o.length; ) {
        var d,
          c = o.pop();
        4 === c.length
          ? Object.defineProperty(c[0], c[1], c[3])
          : (c[0][c[1]] = c[2]);
      }
    }
    return d;
  }
  function u(e, t, r, n) {
    var i = Object.getOwnPropertyDescriptor(n, r);
    void 0 !== i.get
      ? i.configurable
        ? (Object.defineProperty(n, r, { value: e }), o.push([n, r, t, i]))
        : a.push([t, r, e])
      : ((n[r] = e), o.push([n, r, t]));
  }
  function d(e, t) {
    return e < t ? -1 : +(e > t);
  }
  function c(e, t, r, l) {
    void 0 === l && (l = s());
    var c,
      h =
        (function e(t, r, a, s, l, c, f) {
          if (((c += 1), "object" == typeof t && null !== t)) {
            for (h = 0; h < s.length; h++)
              if (s[h] === t) return void u(i, t, r, l);
            try {
              if ("function" == typeof t.toJSON) return;
            } catch (e) {
              return;
            }
            if (
              (void 0 !== f.depthLimit && c > f.depthLimit) ||
              (void 0 !== f.edgesLimit && a + 1 > f.edgesLimit)
            )
              return void u(n, t, r, l);
            if ((s.push(t), Array.isArray(t)))
              for (h = 0; h < t.length; h++) e(t[h], h, h, s, t, c, f);
            else {
              var h,
                p = {},
                g = Object.keys(t).sort(d);
              for (h = 0; h < g.length; h++) {
                var b = g[h];
                (e(t[b], b, h, s, t, c, f), (p[b] = t[b]));
              }
              if (void 0 === l) return p;
              (o.push([l, r, t]), (l[r] = p));
            }
            s.pop();
          }
        })(e, "", 0, [], void 0, 0, l) || e;
    try {
      c = 0 === a.length ? JSON.stringify(h, t, r) : JSON.stringify(h, f(t), r);
    } catch (e) {
      return JSON.stringify(
        "[unable to serialize, circular reference is too complex to analyze]",
      );
    } finally {
      for (; 0 !== o.length; ) {
        var p = o.pop();
        4 === p.length
          ? Object.defineProperty(p[0], p[1], p[3])
          : (p[0][p[1]] = p[2]);
      }
    }
    return c;
  }
  function f(e) {
    return (
      (e =
        void 0 !== e
          ? e
          : function (e, t) {
              return t;
            }),
      function (t, r) {
        if (a.length > 0)
          for (var n = 0; n < a.length; n++) {
            var i = a[n];
            if (i[1] === t && i[0] === r) {
              ((r = i[2]), a.splice(n, 1));
              break;
            }
          }
        return e.call(this, t, r);
      }
    );
  }
};
