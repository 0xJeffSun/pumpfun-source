// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  let n = e.r(608407),
    i = e.r(628494),
    o = ["keyword", "gray", "hex"],
    a = {};
  for (let e of Object.keys(i)) a[[...i[e].labels].sort().join("")] = e;
  let s = {};
  function l(e, t) {
    let r, u;
    if (!(this instanceof l)) return new l(e, t);
    if ((t && t in o && (t = null), t && !(t in i)))
      throw Error("Unknown model: " + t);
    if (null == e)
      ((this.model = "rgb"), (this.color = [0, 0, 0]), (this.valpha = 1));
    else if (e instanceof l)
      ((this.model = e.model),
        (this.color = [...e.color]),
        (this.valpha = e.valpha));
    else if ("string" == typeof e) {
      let t = n.get(e);
      if (null === t) throw Error("Unable to parse color from string: " + e);
      ((this.model = t.model),
        (u = i[this.model].channels),
        (this.color = t.value.slice(0, u)),
        (this.valpha = "number" == typeof t.value[u] ? t.value[u] : 1));
    } else if (e.length > 0) {
      ((this.model = t || "rgb"), (u = i[this.model].channels));
      let r = Array.prototype.slice.call(e, 0, u);
      ((this.color = c(r, u)),
        (this.valpha = "number" == typeof e[u] ? e[u] : 1));
    } else if ("number" == typeof e)
      ((this.model = "rgb"),
        (this.color = [(e >> 16) & 255, (e >> 8) & 255, 255 & e]),
        (this.valpha = 1));
    else {
      this.valpha = 1;
      let t = Object.keys(e);
      "alpha" in e &&
        (t.splice(t.indexOf("alpha"), 1),
        (this.valpha = "number" == typeof e.alpha ? e.alpha : 0));
      let n = t.sort().join("");
      if (!(n in a))
        throw Error("Unable to parse color from object: " + JSON.stringify(e));
      this.model = a[n];
      let { labels: o } = i[this.model],
        s = [];
      for (r = 0; r < o.length; r++) s.push(e[o[r]]);
      this.color = c(s);
    }
    if (s[this.model])
      for (u = i[this.model].channels, r = 0; r < u; r++) {
        let e = s[this.model][r];
        e && (this.color[r] = e(this.color[r]));
      }
    ((this.valpha = Math.max(0, Math.min(1, this.valpha))),
      Object.freeze && Object.freeze(this));
  }
  for (let e of ((l.prototype = {
    toString() {
      return this.string();
    },
    toJSON() {
      return this[this.model]();
    },
    string(e) {
      let t = this.model in n.to ? this : this.rgb(),
        r =
          1 === (t = t.round("number" == typeof e ? e : 1)).valpha
            ? t.color
            : [...t.color, this.valpha];
      return n.to[t.model](r);
    },
    percentString(e) {
      let t = this.rgb().round("number" == typeof e ? e : 1),
        r = 1 === t.valpha ? t.color : [...t.color, this.valpha];
      return n.to.rgb.percent(r);
    },
    array() {
      return 1 === this.valpha ? [...this.color] : [...this.color, this.valpha];
    },
    object() {
      let e = {},
        { channels: t } = i[this.model],
        { labels: r } = i[this.model];
      for (let n = 0; n < t; n++) e[r[n]] = this.color[n];
      return (1 !== this.valpha && (e.alpha = this.valpha), e);
    },
    unitArray() {
      let e = this.rgb().color;
      return (
        (e[0] /= 255),
        (e[1] /= 255),
        (e[2] /= 255),
        1 !== this.valpha && e.push(this.valpha),
        e
      );
    },
    unitObject() {
      let e = this.rgb().object();
      return (
        (e.r /= 255),
        (e.g /= 255),
        (e.b /= 255),
        1 !== this.valpha && (e.alpha = this.valpha),
        e
      );
    },
    round(e) {
      var t;
      return (
        (e = Math.max(e || 0, 0)),
        new l(
          [
            ...this.color.map(
              ((t = e),
              function (e) {
                return Number(e.toFixed(t));
              }),
            ),
            this.valpha,
          ],
          this.model,
        )
      );
    },
    alpha(e) {
      return void 0 !== e
        ? new l([...this.color, Math.max(0, Math.min(1, e))], this.model)
        : this.valpha;
    },
    red: u("rgb", 0, d(255)),
    green: u("rgb", 1, d(255)),
    blue: u("rgb", 2, d(255)),
    hue: u(
      ["hsl", "hsv", "hsl", "hwb", "hcg"],
      0,
      (e) => ((e % 360) + 360) % 360,
    ),
    saturationl: u("hsl", 1, d(100)),
    lightness: u("hsl", 2, d(100)),
    saturationv: u("hsv", 1, d(100)),
    value: u("hsv", 2, d(100)),
    chroma: u("hcg", 1, d(100)),
    gray: u("hcg", 2, d(100)),
    white: u("hwb", 1, d(100)),
    wblack: u("hwb", 2, d(100)),
    cyan: u("cmyk", 0, d(100)),
    magenta: u("cmyk", 1, d(100)),
    yellow: u("cmyk", 2, d(100)),
    black: u("cmyk", 3, d(100)),
    x: u("xyz", 0, d(95.047)),
    y: u("xyz", 1, d(100)),
    z: u("xyz", 2, d(108.833)),
    l: u("lab", 0, d(100)),
    a: u("lab", 1),
    b: u("lab", 2),
    keyword(e) {
      return void 0 !== e ? new l(e) : i[this.model].keyword(this.color);
    },
    hex(e) {
      return void 0 !== e ? new l(e) : n.to.hex(this.rgb().round().color);
    },
    hexa(e) {
      if (void 0 !== e) return new l(e);
      let t = this.rgb().round().color,
        r = Math.round(255 * this.valpha)
          .toString(16)
          .toUpperCase();
      return (1 === r.length && (r = "0" + r), n.to.hex(t) + r);
    },
    rgbNumber() {
      let e = this.rgb().color;
      return ((255 & e[0]) << 16) | ((255 & e[1]) << 8) | (255 & e[2]);
    },
    luminosity() {
      let e = this.rgb().color,
        t = [];
      for (let [r, n] of e.entries()) {
        let e = n / 255;
        t[r] = e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
      }
      return 0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2];
    },
    contrast(e) {
      let t = this.luminosity(),
        r = e.luminosity();
      return t > r ? (t + 0.05) / (r + 0.05) : (r + 0.05) / (t + 0.05);
    },
    level(e) {
      let t = this.contrast(e);
      return t >= 7 ? "AAA" : t >= 4.5 ? "AA" : "";
    },
    isDark() {
      let e = this.rgb().color;
      return (2126 * e[0] + 7152 * e[1] + 722 * e[2]) / 1e4 < 128;
    },
    isLight() {
      return !this.isDark();
    },
    negate() {
      let e = this.rgb();
      for (let t = 0; t < 3; t++) e.color[t] = 255 - e.color[t];
      return e;
    },
    lighten(e) {
      let t = this.hsl();
      return ((t.color[2] += t.color[2] * e), t);
    },
    darken(e) {
      let t = this.hsl();
      return ((t.color[2] -= t.color[2] * e), t);
    },
    saturate(e) {
      let t = this.hsl();
      return ((t.color[1] += t.color[1] * e), t);
    },
    desaturate(e) {
      let t = this.hsl();
      return ((t.color[1] -= t.color[1] * e), t);
    },
    whiten(e) {
      let t = this.hwb();
      return ((t.color[1] += t.color[1] * e), t);
    },
    blacken(e) {
      let t = this.hwb();
      return ((t.color[2] += t.color[2] * e), t);
    },
    grayscale() {
      let e = this.rgb().color,
        t = 0.3 * e[0] + 0.59 * e[1] + 0.11 * e[2];
      return l.rgb(t, t, t);
    },
    fade(e) {
      return this.alpha(this.valpha - this.valpha * e);
    },
    opaquer(e) {
      return this.alpha(this.valpha + this.valpha * e);
    },
    rotate(e) {
      let t = this.hsl(),
        r = t.color[0];
      return ((r = (r = (r + e) % 360) < 0 ? 360 + r : r), (t.color[0] = r), t);
    },
    mix(e, t) {
      if (!e || !e.rgb)
        throw Error(
          'Argument to "mix" was not a Color instance, but rather an instance of ' +
            typeof e,
        );
      let r = e.rgb(),
        n = this.rgb(),
        i = void 0 === t ? 0.5 : t,
        o = 2 * i - 1,
        a = r.alpha() - n.alpha(),
        s = ((o * a == -1 ? o : (o + a) / (1 + o * a)) + 1) / 2,
        u = 1 - s;
      return l.rgb(
        s * r.red() + u * n.red(),
        s * r.green() + u * n.green(),
        s * r.blue() + u * n.blue(),
        r.alpha() * i + n.alpha() * (1 - i),
      );
    },
  }),
  Object.keys(i))) {
    if (o.includes(e)) continue;
    let { channels: t } = i[e];
    ((l.prototype[e] = function (...t) {
      var r;
      return this.model === e
        ? new l(this)
        : t.length > 0
          ? new l(t, e)
          : new l(
              [
                ...(Array.isArray((r = i[this.model][e].raw(this.color)))
                  ? r
                  : [r]),
                this.valpha,
              ],
              e,
            );
    }),
      (l[e] = function (...r) {
        let n = r[0];
        return ("number" == typeof n && (n = c(r, t)), new l(n, e));
      }));
  }
  function u(e, t, r) {
    for (let n of (e = Array.isArray(e) ? e : [e]))
      (s[n] || (s[n] = []))[t] = r;
    return (
      (e = e[0]),
      function (n) {
        let i;
        return (
          void 0 !== n
            ? (r && (n = r(n)), ((i = this[e]()).color[t] = n))
            : ((i = this[e]().color[t]), r && (i = r(i))),
          i
        );
      }
    );
  }
  function d(e) {
    return function (t) {
      return Math.max(0, Math.min(e, t));
    };
  }
  function c(e, t) {
    for (let r = 0; r < t; r++) "number" != typeof e[r] && (e[r] = 0);
    return e;
  }
  t.exports = l;
};
