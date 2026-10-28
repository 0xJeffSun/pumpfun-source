// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var n = e.r(942420),
    i = e.r(734226),
    o = Object.hasOwnProperty,
    a = Object.create(null);
  for (var s in n) o.call(n, s) && (a[n[s]] = s);
  var l = (t.exports = { to: {}, get: {} });
  function u(e, t, r) {
    return Math.min(Math.max(t, e), r);
  }
  function d(e) {
    var t = Math.round(e).toString(16).toUpperCase();
    return t.length < 2 ? "0" + t : t;
  }
  ((l.get = function (e) {
    var t, r;
    switch (e.substring(0, 3).toLowerCase()) {
      case "hsl":
        ((t = l.get.hsl(e)), (r = "hsl"));
        break;
      case "hwb":
        ((t = l.get.hwb(e)), (r = "hwb"));
        break;
      default:
        ((t = l.get.rgb(e)), (r = "rgb"));
    }
    return t ? { model: r, value: t } : null;
  }),
    (l.get.rgb = function (e) {
      if (!e) return null;
      var t,
        r,
        i,
        a = [0, 0, 0, 1];
      if ((t = e.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i))) {
        for (i = t[2], t = t[1], r = 0; r < 3; r++) {
          var s = 2 * r;
          a[r] = parseInt(t.slice(s, s + 2), 16);
        }
        i && (a[3] = parseInt(i, 16) / 255);
      } else if ((t = e.match(/^#([a-f0-9]{3,4})$/i))) {
        for (i = (t = t[1])[3], r = 0; r < 3; r++)
          a[r] = parseInt(t[r] + t[r], 16);
        i && (a[3] = parseInt(i + i, 16) / 255);
      } else if (
        (t = e.match(
          /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
        ))
      ) {
        for (r = 0; r < 3; r++) a[r] = parseInt(t[r + 1], 0);
        t[4] &&
          (t[5] ? (a[3] = 0.01 * parseFloat(t[4])) : (a[3] = parseFloat(t[4])));
      } else if (
        (t = e.match(
          /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
        ))
      ) {
        for (r = 0; r < 3; r++) a[r] = Math.round(2.55 * parseFloat(t[r + 1]));
        t[4] &&
          (t[5] ? (a[3] = 0.01 * parseFloat(t[4])) : (a[3] = parseFloat(t[4])));
      } else if (!(t = e.match(/^(\w+)$/))) return null;
      else
        return "transparent" === t[1]
          ? [0, 0, 0, 0]
          : o.call(n, t[1])
            ? (((a = n[t[1]])[3] = 1), a)
            : null;
      for (r = 0; r < 3; r++) a[r] = u(a[r], 0, 255);
      return ((a[3] = u(a[3], 0, 1)), a);
    }),
    (l.get.hsl = function (e) {
      if (!e) return null;
      var t = e.match(
        /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
      );
      if (t) {
        var r = parseFloat(t[4]);
        return [
          ((parseFloat(t[1]) % 360) + 360) % 360,
          u(parseFloat(t[2]), 0, 100),
          u(parseFloat(t[3]), 0, 100),
          u(isNaN(r) ? 1 : r, 0, 1),
        ];
      }
      return null;
    }),
    (l.get.hwb = function (e) {
      if (!e) return null;
      var t = e.match(
        /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
      );
      if (t) {
        var r = parseFloat(t[4]);
        return [
          ((parseFloat(t[1]) % 360) + 360) % 360,
          u(parseFloat(t[2]), 0, 100),
          u(parseFloat(t[3]), 0, 100),
          u(isNaN(r) ? 1 : r, 0, 1),
        ];
      }
      return null;
    }),
    (l.to.hex = function () {
      var e = i(arguments);
      return (
        "#" +
        d(e[0]) +
        d(e[1]) +
        d(e[2]) +
        (e[3] < 1 ? d(Math.round(255 * e[3])) : "")
      );
    }),
    (l.to.rgb = function () {
      var e = i(arguments);
      return e.length < 4 || 1 === e[3]
        ? "rgb(" +
            Math.round(e[0]) +
            ", " +
            Math.round(e[1]) +
            ", " +
            Math.round(e[2]) +
            ")"
        : "rgba(" +
            Math.round(e[0]) +
            ", " +
            Math.round(e[1]) +
            ", " +
            Math.round(e[2]) +
            ", " +
            e[3] +
            ")";
    }),
    (l.to.rgb.percent = function () {
      var e = i(arguments),
        t = Math.round((e[0] / 255) * 100),
        r = Math.round((e[1] / 255) * 100),
        n = Math.round((e[2] / 255) * 100);
      return e.length < 4 || 1 === e[3]
        ? "rgb(" + t + "%, " + r + "%, " + n + "%)"
        : "rgba(" + t + "%, " + r + "%, " + n + "%, " + e[3] + ")";
    }),
    (l.to.hsl = function () {
      var e = i(arguments);
      return e.length < 4 || 1 === e[3]
        ? "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)"
        : "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + e[3] + ")";
    }),
    (l.to.hwb = function () {
      var e = i(arguments),
        t = "";
      return (
        e.length >= 4 && 1 !== e[3] && (t = ", " + e[3]),
        "hwb(" + e[0] + ", " + e[1] + "%, " + e[2] + "%" + t + ")"
      );
    }),
    (l.to.keyword = function (e) {
      return a[e.slice(0, 3)];
    }));
};
