// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  let n = e.r(942420),
    i = {};
  for (let e of Object.keys(n)) i[n[e]] = e;
  let o = {
    rgb: { channels: 3, labels: "rgb" },
    hsl: { channels: 3, labels: "hsl" },
    hsv: { channels: 3, labels: "hsv" },
    hwb: { channels: 3, labels: "hwb" },
    cmyk: { channels: 4, labels: "cmyk" },
    xyz: { channels: 3, labels: "xyz" },
    lab: { channels: 3, labels: "lab" },
    lch: { channels: 3, labels: "lch" },
    hex: { channels: 1, labels: ["hex"] },
    keyword: { channels: 1, labels: ["keyword"] },
    ansi16: { channels: 1, labels: ["ansi16"] },
    ansi256: { channels: 1, labels: ["ansi256"] },
    hcg: { channels: 3, labels: ["h", "c", "g"] },
    apple: { channels: 3, labels: ["r16", "g16", "b16"] },
    gray: { channels: 1, labels: ["gray"] },
  };
  for (let e of ((t.exports = o), Object.keys(o))) {
    if (!("channels" in o[e])) throw Error("missing channels property: " + e);
    if (!("labels" in o[e]))
      throw Error("missing channel labels property: " + e);
    if (o[e].labels.length !== o[e].channels)
      throw Error("channel and label counts mismatch: " + e);
    let { channels: t, labels: r } = o[e];
    (delete o[e].channels,
      delete o[e].labels,
      Object.defineProperty(o[e], "channels", { value: t }),
      Object.defineProperty(o[e], "labels", { value: r }));
  }
  ((o.rgb.hsl = function (e) {
    let t,
      r = e[0] / 255,
      n = e[1] / 255,
      i = e[2] / 255,
      o = Math.min(r, n, i),
      a = Math.max(r, n, i),
      s = a - o;
    (a === o
      ? (t = 0)
      : r === a
        ? (t = (n - i) / s)
        : n === a
          ? (t = 2 + (i - r) / s)
          : i === a && (t = 4 + (r - n) / s),
      (t = Math.min(60 * t, 360)) < 0 && (t += 360));
    let l = (o + a) / 2;
    return [
      t,
      100 * (a === o ? 0 : l <= 0.5 ? s / (a + o) : s / (2 - a - o)),
      100 * l,
    ];
  }),
    (o.rgb.hsv = function (e) {
      let t,
        r,
        n,
        i,
        o,
        a = e[0] / 255,
        s = e[1] / 255,
        l = e[2] / 255,
        u = Math.max(a, s, l),
        d = u - Math.min(a, s, l),
        c = function (e) {
          return (u - e) / 6 / d + 0.5;
        };
      return (
        0 === d
          ? ((i = 0), (o = 0))
          : ((o = d / u),
            (t = c(a)),
            (r = c(s)),
            (n = c(l)),
            a === u
              ? (i = n - r)
              : s === u
                ? (i = 1 / 3 + t - n)
                : l === u && (i = 2 / 3 + r - t),
            i < 0 ? (i += 1) : i > 1 && (i -= 1)),
        [360 * i, 100 * o, 100 * u]
      );
    }),
    (o.rgb.hwb = function (e) {
      let t = e[0],
        r = e[1],
        n = e[2];
      return [
        o.rgb.hsl(e)[0],
        (1 / 255) * Math.min(t, Math.min(r, n)) * 100,
        100 * (n = 1 - (1 / 255) * Math.max(t, Math.max(r, n))),
      ];
    }),
    (o.rgb.cmyk = function (e) {
      let t = e[0] / 255,
        r = e[1] / 255,
        n = e[2] / 255,
        i = Math.min(1 - t, 1 - r, 1 - n);
      return [
        100 * ((1 - t - i) / (1 - i) || 0),
        100 * ((1 - r - i) / (1 - i) || 0),
        100 * ((1 - n - i) / (1 - i) || 0),
        100 * i,
      ];
    }),
    (o.rgb.keyword = function (e) {
      let t,
        r = i[e];
      if (r) return r;
      let o = 1 / 0;
      for (let r of Object.keys(n)) {
        let i = n[r],
          a = (e[0] - i[0]) ** 2 + (e[1] - i[1]) ** 2 + (e[2] - i[2]) ** 2;
        a < o && ((o = a), (t = r));
      }
      return t;
    }),
    (o.keyword.rgb = function (e) {
      return n[e];
    }),
    (o.rgb.xyz = function (e) {
      let t = e[0] / 255,
        r = e[1] / 255,
        n = e[2] / 255;
      return [
        100 *
          (0.4124 *
            (t = t > 0.04045 ? ((t + 0.055) / 1.055) ** 2.4 : t / 12.92) +
            0.3576 *
              (r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92) +
            0.1805 *
              (n = n > 0.04045 ? ((n + 0.055) / 1.055) ** 2.4 : n / 12.92)),
        100 * (0.2126 * t + 0.7152 * r + 0.0722 * n),
        100 * (0.0193 * t + 0.1192 * r + 0.9505 * n),
      ];
    }),
    (o.rgb.lab = function (e) {
      let t = o.rgb.xyz(e),
        r = t[0],
        n = t[1],
        i = t[2];
      return (
        (r /= 95.047),
        (n /= 100),
        (i /= 108.883),
        [
          116 * (n = n > 0.008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116) - 16,
          500 * ((r = r > 0.008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116) - n),
          200 * (n - (i = i > 0.008856 ? i ** (1 / 3) : 7.787 * i + 16 / 116)),
        ]
      );
    }),
    (o.hsl.rgb = function (e) {
      let t,
        r,
        n,
        i = e[0] / 360,
        o = e[1] / 100,
        a = e[2] / 100;
      if (0 === o) return [(n = 255 * a), n, n];
      t = a < 0.5 ? a * (1 + o) : a + o - a * o;
      let s = 2 * a - t,
        l = [0, 0, 0];
      for (let e = 0; e < 3; e++)
        ((r = i + -((1 / 3) * (e - 1))) < 0 && r++,
          r > 1 && r--,
          (n =
            6 * r < 1
              ? s + (t - s) * 6 * r
              : 2 * r < 1
                ? t
                : 3 * r < 2
                  ? s + (t - s) * (2 / 3 - r) * 6
                  : s),
          (l[e] = 255 * n));
      return l;
    }),
    (o.hsl.hsv = function (e) {
      let t = e[0],
        r = e[1] / 100,
        n = e[2] / 100,
        i = r,
        o = Math.max(n, 0.01);
      ((n *= 2), (r *= n <= 1 ? n : 2 - n), (i *= o <= 1 ? o : 2 - o));
      let a = (n + r) / 2;
      return [
        t,
        100 * (0 === n ? (2 * i) / (o + i) : (2 * r) / (n + r)),
        100 * a,
      ];
    }),
    (o.hsv.rgb = function (e) {
      let t = e[0] / 60,
        r = e[1] / 100,
        n = e[2] / 100,
        i = Math.floor(t) % 6,
        o = t - Math.floor(t),
        a = 255 * n * (1 - r),
        s = 255 * n * (1 - r * o),
        l = 255 * n * (1 - r * (1 - o));
      switch (((n *= 255), i)) {
        case 0:
          return [n, l, a];
        case 1:
          return [s, n, a];
        case 2:
          return [a, n, l];
        case 3:
          return [a, s, n];
        case 4:
          return [l, a, n];
        case 5:
          return [n, a, s];
      }
    }),
    (o.hsv.hsl = function (e) {
      let t,
        r,
        n = e[0],
        i = e[1] / 100,
        o = e[2] / 100,
        a = Math.max(o, 0.01);
      r = (2 - i) * o;
      let s = (2 - i) * a;
      return [
        n,
        100 * (t = (t = (i * a) / (s <= 1 ? s : 2 - s)) || 0),
        100 * (r /= 2),
      ];
    }),
    (o.hwb.rgb = function (e) {
      let t,
        r,
        n,
        i,
        o = e[0] / 360,
        a = e[1] / 100,
        s = e[2] / 100,
        l = a + s;
      l > 1 && ((a /= l), (s /= l));
      let u = Math.floor(6 * o),
        d = 1 - s;
      ((t = 6 * o - u), (1 & u) != 0 && (t = 1 - t));
      let c = a + t * (d - a);
      switch (u) {
        default:
        case 6:
        case 0:
          ((r = d), (n = c), (i = a));
          break;
        case 1:
          ((r = c), (n = d), (i = a));
          break;
        case 2:
          ((r = a), (n = d), (i = c));
          break;
        case 3:
          ((r = a), (n = c), (i = d));
          break;
        case 4:
          ((r = c), (n = a), (i = d));
          break;
        case 5:
          ((r = d), (n = a), (i = c));
      }
      return [255 * r, 255 * n, 255 * i];
    }),
    (o.cmyk.rgb = function (e) {
      let t = e[0] / 100,
        r = e[1] / 100,
        n = e[2] / 100,
        i = e[3] / 100;
      return [
        255 * (1 - Math.min(1, t * (1 - i) + i)),
        255 * (1 - Math.min(1, r * (1 - i) + i)),
        255 * (1 - Math.min(1, n * (1 - i) + i)),
      ];
    }),
    (o.xyz.rgb = function (e) {
      let t,
        r,
        n,
        i = e[0] / 100,
        o = e[1] / 100,
        a = e[2] / 100;
      return (
        (t =
          (t = 3.2406 * i + -1.5372 * o + -0.4986 * a) > 0.0031308
            ? 1.055 * t ** (1 / 2.4) - 0.055
            : 12.92 * t),
        (r =
          (r = -0.9689 * i + 1.8758 * o + 0.0415 * a) > 0.0031308
            ? 1.055 * r ** (1 / 2.4) - 0.055
            : 12.92 * r),
        (n =
          (n = 0.0557 * i + -0.204 * o + 1.057 * a) > 0.0031308
            ? 1.055 * n ** (1 / 2.4) - 0.055
            : 12.92 * n),
        [
          255 * (t = Math.min(Math.max(0, t), 1)),
          255 * (r = Math.min(Math.max(0, r), 1)),
          255 * (n = Math.min(Math.max(0, n), 1)),
        ]
      );
    }),
    (o.xyz.lab = function (e) {
      let t = e[0],
        r = e[1],
        n = e[2];
      return (
        (t /= 95.047),
        (r /= 100),
        (n /= 108.883),
        [
          116 * (r = r > 0.008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116) - 16,
          500 * ((t = t > 0.008856 ? t ** (1 / 3) : 7.787 * t + 16 / 116) - r),
          200 * (r - (n = n > 0.008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116)),
        ]
      );
    }),
    (o.lab.xyz = function (e) {
      let t,
        r,
        n,
        i = e[0],
        o = e[1],
        a = e[2];
      ((t = o / 500 + (r = (i + 16) / 116)), (n = r - a / 200));
      let s = r ** 3,
        l = t ** 3,
        u = n ** 3;
      return (
        (r = (s > 0.008856 ? s : (r - 16 / 116) / 7.787) * 100),
        [
          (t = (l > 0.008856 ? l : (t - 16 / 116) / 7.787) * 95.047),
          r,
          (n = (u > 0.008856 ? u : (n - 16 / 116) / 7.787) * 108.883),
        ]
      );
    }),
    (o.lab.lch = function (e) {
      let t,
        r = e[0],
        n = e[1],
        i = e[2];
      return (
        (t = (360 * Math.atan2(i, n)) / 2 / Math.PI) < 0 && (t += 360),
        [r, Math.sqrt(n * n + i * i), t]
      );
    }),
    (o.lch.lab = function (e) {
      let t = e[0],
        r = e[1],
        n = (e[2] / 360) * 2 * Math.PI;
      return [t, r * Math.cos(n), r * Math.sin(n)];
    }),
    (o.rgb.ansi16 = function (e, t = null) {
      let [r, n, i] = e,
        a = null === t ? o.rgb.hsv(e)[2] : t;
      if (0 === (a = Math.round(a / 50))) return 30;
      let s =
        30 +
        ((Math.round(i / 255) << 2) |
          (Math.round(n / 255) << 1) |
          Math.round(r / 255));
      return (2 === a && (s += 60), s);
    }),
    (o.hsv.ansi16 = function (e) {
      return o.rgb.ansi16(o.hsv.rgb(e), e[2]);
    }),
    (o.rgb.ansi256 = function (e) {
      let t = e[0],
        r = e[1],
        n = e[2];
      return t === r && r === n
        ? t < 8
          ? 16
          : t > 248
            ? 231
            : Math.round(((t - 8) / 247) * 24) + 232
        : 16 +
            36 * Math.round((t / 255) * 5) +
            6 * Math.round((r / 255) * 5) +
            Math.round((n / 255) * 5);
    }),
    (o.ansi16.rgb = function (e) {
      let t = e % 10;
      if (0 === t || 7 === t)
        return (e > 50 && (t += 3.5), [(t = (t / 10.5) * 255), t, t]);
      let r = (~~(e > 50) + 1) * 0.5;
      return [
        (1 & t) * r * 255,
        ((t >> 1) & 1) * r * 255,
        ((t >> 2) & 1) * r * 255,
      ];
    }),
    (o.ansi256.rgb = function (e) {
      let t;
      if (e >= 232) {
        let t = (e - 232) * 10 + 8;
        return [t, t, t];
      }
      return [
        (Math.floor((e -= 16) / 36) / 5) * 255,
        (Math.floor((t = e % 36) / 6) / 5) * 255,
        ((t % 6) / 5) * 255,
      ];
    }),
    (o.rgb.hex = function (e) {
      let t = (
        ((255 & Math.round(e[0])) << 16) +
        ((255 & Math.round(e[1])) << 8) +
        (255 & Math.round(e[2]))
      )
        .toString(16)
        .toUpperCase();
      return "000000".substring(t.length) + t;
    }),
    (o.hex.rgb = function (e) {
      let t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!t) return [0, 0, 0];
      let r = t[0];
      3 === t[0].length &&
        (r = r
          .split("")
          .map((e) => e + e)
          .join(""));
      let n = parseInt(r, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, 255 & n];
    }),
    (o.rgb.hcg = function (e) {
      let t,
        r = e[0] / 255,
        n = e[1] / 255,
        i = e[2] / 255,
        o = Math.max(Math.max(r, n), i),
        a = Math.min(Math.min(r, n), i),
        s = o - a;
      return (
        (t = s < 1 ? a / (1 - s) : 0),
        [
          360 *
            (((s <= 0
              ? 0
              : o === r
                ? ((n - i) / s) % 6
                : o === n
                  ? 2 + (i - r) / s
                  : 4 + (r - n) / s) /
              6) %
              1),
          100 * s,
          100 * t,
        ]
      );
    }),
    (o.hsl.hcg = function (e) {
      let t = e[1] / 100,
        r = e[2] / 100,
        n = r < 0.5 ? 2 * t * r : 2 * t * (1 - r),
        i = 0;
      return (n < 1 && (i = (r - 0.5 * n) / (1 - n)), [e[0], 100 * n, 100 * i]);
    }),
    (o.hsv.hcg = function (e) {
      let t = e[1] / 100,
        r = e[2] / 100,
        n = t * r,
        i = 0;
      return (n < 1 && (i = (r - n) / (1 - n)), [e[0], 100 * n, 100 * i]);
    }),
    (o.hcg.rgb = function (e) {
      let t = e[0] / 360,
        r = e[1] / 100,
        n = e[2] / 100;
      if (0 === r) return [255 * n, 255 * n, 255 * n];
      let i = [0, 0, 0],
        o = (t % 1) * 6,
        a = o % 1,
        s = 1 - a,
        l = 0;
      switch (Math.floor(o)) {
        case 0:
          ((i[0] = 1), (i[1] = a), (i[2] = 0));
          break;
        case 1:
          ((i[0] = s), (i[1] = 1), (i[2] = 0));
          break;
        case 2:
          ((i[0] = 0), (i[1] = 1), (i[2] = a));
          break;
        case 3:
          ((i[0] = 0), (i[1] = s), (i[2] = 1));
          break;
        case 4:
          ((i[0] = a), (i[1] = 0), (i[2] = 1));
          break;
        default:
          ((i[0] = 1), (i[1] = 0), (i[2] = s));
      }
      return (
        (l = (1 - r) * n),
        [(r * i[0] + l) * 255, (r * i[1] + l) * 255, (r * i[2] + l) * 255]
      );
    }),
    (o.hcg.hsv = function (e) {
      let t = e[1] / 100,
        r = t + (e[2] / 100) * (1 - t),
        n = 0;
      return (r > 0 && (n = t / r), [e[0], 100 * n, 100 * r]);
    }),
    (o.hcg.hsl = function (e) {
      let t = e[1] / 100,
        r = (e[2] / 100) * (1 - t) + 0.5 * t,
        n = 0;
      return (
        r > 0 && r < 0.5
          ? (n = t / (2 * r))
          : r >= 0.5 && r < 1 && (n = t / (2 * (1 - r))),
        [e[0], 100 * n, 100 * r]
      );
    }),
    (o.hcg.hwb = function (e) {
      let t = e[1] / 100,
        r = t + (e[2] / 100) * (1 - t);
      return [e[0], (r - t) * 100, (1 - r) * 100];
    }),
    (o.hwb.hcg = function (e) {
      let t = e[1] / 100,
        r = 1 - e[2] / 100,
        n = r - t,
        i = 0;
      return (n < 1 && (i = (r - n) / (1 - n)), [e[0], 100 * n, 100 * i]);
    }),
    (o.apple.rgb = function (e) {
      return [(e[0] / 65535) * 255, (e[1] / 65535) * 255, (e[2] / 65535) * 255];
    }),
    (o.rgb.apple = function (e) {
      return [(e[0] / 255) * 65535, (e[1] / 255) * 65535, (e[2] / 255) * 65535];
    }),
    (o.gray.rgb = function (e) {
      return [(e[0] / 100) * 255, (e[0] / 100) * 255, (e[0] / 100) * 255];
    }),
    (o.gray.hsl = function (e) {
      return [0, 0, e[0]];
    }),
    (o.gray.hsv = o.gray.hsl),
    (o.gray.hwb = function (e) {
      return [0, 100, e[0]];
    }),
    (o.gray.cmyk = function (e) {
      return [0, 0, 0, e[0]];
    }),
    (o.gray.lab = function (e) {
      return [e[0], 0, 0];
    }),
    (o.gray.hex = function (e) {
      let t = 255 & Math.round((e[0] / 100) * 255),
        r = ((t << 16) + (t << 8) + t).toString(16).toUpperCase();
      return "000000".substring(r.length) + r;
    }),
    (o.rgb.gray = function (e) {
      return [((e[0] + e[1] + e[2]) / 3 / 255) * 100];
    }));
};
