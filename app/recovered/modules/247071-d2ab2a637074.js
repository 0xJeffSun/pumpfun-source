// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = /\s+/g;
  r.exports = class e {
    constructor(r, t) {
      if (((t = n(t)), r instanceof e))
        if (
          r.loose === !!t.loose &&
          r.includePrerelease === !!t.includePrerelease
        )
          return r;
        else return new e(r.raw, t);
      if (r instanceof o)
        return (
          (this.raw = r.value),
          (this.set = [[r]]),
          (this.formatted = void 0),
          this
        );
      if (
        ((this.options = t),
        (this.loose = !!t.loose),
        (this.includePrerelease = !!t.includePrerelease),
        (this.raw = r.trim().replace(s, " ")),
        (this.set = this.raw
          .split("||")
          .map((e) => this.parseRange(e.trim()))
          .filter((e) => e.length)),
        !this.set.length)
      )
        throw TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        let e = this.set[0];
        if (
          ((this.set = this.set.filter((e) => !$(e[0]))), 0 === this.set.length)
        )
          this.set = [e];
        else if (this.set.length > 1) {
          for (let e of this.set)
            if (1 === e.length && R(e[0])) {
              this.set = [e];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (void 0 === this.formatted) {
        this.formatted = "";
        for (let e = 0; e < this.set.length; e++) {
          e > 0 && (this.formatted += "||");
          let r = this.set[e];
          for (let e = 0; e < r.length; e++)
            (e > 0 && (this.formatted += " "),
              (this.formatted += r[e].toString().trim()));
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(e) {
      e = e.replace(I, "");
      let r =
          ((this.options.includePrerelease && f) | (this.options.loose && m)) +
          ":" +
          e,
        t = i.get(r);
      if (t) return t;
      let s = this.options.loose,
        n = s ? p[h.HYPHENRANGELOOSE] : p[h.HYPHENRANGE];
      (a(
        "hyphen replace",
        (e = e.replace(n, y(this.options.includePrerelease))),
      ),
        a("comparator trim", (e = e.replace(p[h.COMPARATORTRIM], u))),
        a("tilde trim", (e = e.replace(p[h.TILDETRIM], E))),
        a("caret trim", (e = e.replace(p[h.CARETTRIM], d))));
      let l = e
        .split(" ")
        .map((e) => L(e, this.options))
        .join(" ")
        .split(/\s+/)
        .map((e) => x(e, this.options));
      (s &&
        (l = l.filter(
          (e) => (
            a("loose invalid filter", e, this.options),
            !!e.match(p[h.COMPARATORLOOSE])
          ),
        )),
        a("range list", l));
      let c = new Map();
      for (let e of l.map((e) => new o(e, this.options))) {
        if ($(e)) return [e];
        c.set(e.value, e);
      }
      c.size > 1 && c.has("") && c.delete("");
      let R = [...c.values()];
      return (i.set(r, R), R);
    }
    intersects(r, t) {
      if (!(r instanceof e)) throw TypeError("a Range is required");
      return this.set.some(
        (e) =>
          v(e, t) &&
          r.set.some(
            (r) =>
              v(r, t) && e.every((e) => r.every((r) => e.intersects(r, t))),
          ),
      );
    }
    test(e) {
      if (!e) return !1;
      if ("string" == typeof e)
        try {
          e = new l(e, this.options);
        } catch (e) {
          return !1;
        }
      for (let r = 0; r < this.set.length; r++)
        if (C(this.set[r], e, this.options)) return !0;
      return !1;
    }
  };
  let i = new (e.r(415320))(),
    n = e.r(769097),
    o = e.r(580740),
    a = e.r(777453),
    l = e.r(401542),
    {
      safeRe: p,
      src: c,
      t: h,
      comparatorTrimReplace: u,
      tildeTrimReplace: E,
      caretTrimReplace: d,
    } = e.r(990950),
    { FLAG_INCLUDE_PRERELEASE: f, FLAG_LOOSE: m } = e.r(444946),
    I = RegExp(c[h.BUILD], "g"),
    $ = (e) => "<0.0.0-0" === e.value,
    R = (e) => "" === e.value,
    v = (e, r) => {
      let t = !0,
        s = e.slice(),
        i = s.pop();
      for (; t && s.length; )
        ((t = s.every((e) => i.intersects(e, r))), (i = s.pop()));
      return t;
    },
    L = (e, r) => (
      a("comp", (e = e.replace(p[h.BUILD], "")), r),
      a("caret", (e = S(e, r))),
      a("tildes", (e = N(e, r))),
      a("xrange", (e = A(e, r))),
      a("stars", (e = P(e, r))),
      e
    ),
    g = (e) => !e || "x" === e.toLowerCase() || "*" === e,
    N = (e, r) =>
      e
        .trim()
        .split(/\s+/)
        .map((e) => O(e, r))
        .join(" "),
    O = (e, r) => {
      let t = r.loose ? p[h.TILDELOOSE] : p[h.TILDE],
        s = r.includePrerelease ? "-0" : "";
      return e.replace(t, (r, t, i, n, o) => {
        let l;
        return (
          a("tilde", e, r, t, i, n, o),
          g(t)
            ? (l = "")
            : g(i)
              ? (l = `>=${t}.0.0${s} <${+t + 1}.0.0-0`)
              : g(n)
                ? (l = `>=${t}.${i}.0${s} <${t}.${+i + 1}.0-0`)
                : o
                  ? (a("replaceTilde pr", o),
                    (l = `>=${t}.${i}.${n}-${o} <${t}.${+i + 1}.0-0`))
                  : (l = `>=${t}.${i}.${n} <${t}.${+i + 1}.0-0`),
          a("tilde return", l),
          l
        );
      });
    },
    S = (e, r) =>
      e
        .trim()
        .split(/\s+/)
        .map((e) => w(e, r))
        .join(" "),
    w = (e, r) => {
      a("caret", e, r);
      let t = r.loose ? p[h.CARETLOOSE] : p[h.CARET],
        s = r.includePrerelease ? "-0" : "";
      return e.replace(t, (r, t, i, n, o) => {
        let l;
        return (
          a("caret", e, r, t, i, n, o),
          g(t)
            ? (l = "")
            : g(i)
              ? (l = `>=${t}.0.0${s} <${+t + 1}.0.0-0`)
              : g(n)
                ? (l =
                    "0" === t
                      ? `>=${t}.${i}.0${s} <${t}.${+i + 1}.0-0`
                      : `>=${t}.${i}.0${s} <${+t + 1}.0.0-0`)
                : o
                  ? (a("replaceCaret pr", o),
                    (l =
                      "0" === t
                        ? "0" === i
                          ? `>=${t}.${i}.${n}-${o} <${t}.${i}.${+n + 1}-0`
                          : `>=${t}.${i}.${n}-${o} <${t}.${+i + 1}.0-0`
                        : `>=${t}.${i}.${n}-${o} <${+t + 1}.0.0-0`))
                  : (a("no pr"),
                    (l =
                      "0" === t
                        ? "0" === i
                          ? `>=${t}.${i}.${n} <${t}.${i}.${+n + 1}-0`
                          : `>=${t}.${i}.${n} <${t}.${+i + 1}.0-0`
                        : `>=${t}.${i}.${n} <${+t + 1}.0.0-0`)),
          a("caret return", l),
          l
        );
      });
    },
    A = (e, r) => (
      a("replaceXRanges", e, r),
      e
        .split(/\s+/)
        .map((e) => T(e, r))
        .join(" ")
    ),
    T = (e, r) => {
      e = e.trim();
      let t = r.loose ? p[h.XRANGELOOSE] : p[h.XRANGE];
      return e.replace(t, (t, s, i, n, o, l) => {
        let p, c, h;
        if (
          (a("xRange", e, t, s, i, n, o, l),
          (p = i),
          (c = n),
          (h = o),
          (g(p) && !g(c)) || (g(c) && h && !g(h)))
        )
          return e;
        let u = g(i),
          E = u || g(n),
          d = E || g(o);
        return (
          "=" === s && d && (s = ""),
          (l = r.includePrerelease ? "-0" : ""),
          u
            ? (t = ">" === s || "<" === s ? "<0.0.0-0" : "*")
            : s && d
              ? (E && (n = 0),
                (o = 0),
                ">" === s
                  ? ((s = ">="),
                    E ? ((i = +i + 1), (n = 0)) : (n = +n + 1),
                    (o = 0))
                  : "<=" === s && ((s = "<"), E ? (i = +i + 1) : (n = +n + 1)),
                "<" === s && (l = "-0"),
                (t = `${s + i}.${n}.${o}${l}`))
              : E
                ? (t = `>=${i}.0.0${l} <${+i + 1}.0.0-0`)
                : d && (t = `>=${i}.${n}.0${l} <${i}.${+n + 1}.0-0`),
          a("xRange return", t),
          t
        );
      });
    },
    P = (e, r) => (a("replaceStars", e, r), e.trim().replace(p[h.STAR], "")),
    x = (e, r) => (
      a("replaceGTE0", e, r),
      e.trim().replace(p[r.includePrerelease ? h.GTE0PRE : h.GTE0], "")
    ),
    y = (e) => (r, t, s, i, n, o, a, l, p, c, h, u) => (
      (t = g(s)
        ? ""
        : g(i)
          ? `>=${s}.0.0${e ? "-0" : ""}`
          : g(n)
            ? `>=${s}.${i}.0${e ? "-0" : ""}`
            : o
              ? `>=${t}`
              : `>=${t}${e ? "-0" : ""}`),
      (l = g(p)
        ? ""
        : g(c)
          ? `<${+p + 1}.0.0-0`
          : g(h)
            ? `<${p}.${+c + 1}.0-0`
            : u
              ? `<=${p}.${c}.${h}-${u}`
              : e
                ? `<${p}.${c}.${+h + 1}-0`
                : `<=${l}`),
      `${t} ${l}`.trim()
    ),
    C = (e, r, t) => {
      for (let t = 0; t < e.length; t++) if (!e[t].test(r)) return !1;
      if (r.prerelease.length && !t.includePrerelease) {
        for (let t = 0; t < e.length; t++)
          if (
            (a(e[t].semver),
            e[t].semver !== o.ANY && e[t].semver.prerelease.length > 0)
          ) {
            let s = e[t].semver;
            if (
              s.major === r.major &&
              s.minor === r.minor &&
              s.patch === r.patch
            )
              return !0;
          }
        return !1;
      }
      return !0;
    };
};
