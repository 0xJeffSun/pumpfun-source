// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    n = e.i(238153),
    r = e.i(492421),
    i = e.i(870429),
    a = e.i(516467),
    o = e.i(511518);
  function l(e, t) {
    let n = (0, r.f)(),
      i =
        t?.weekStartsOn ??
        t?.locale?.options?.weekStartsOn ??
        n.weekStartsOn ??
        n.locale?.options?.weekStartsOn ??
        0,
      o = (0, a.f)(e, t?.in),
      l = o.getDay();
    return (
      o.setDate(o.getDate() - (7 * (l < i) + l - i)),
      o.setHours(0, 0, 0, 0),
      o
    );
  }
  function s(e, t) {
    return l(e, { ...t, weekStartsOn: 1 });
  }
  var u = e.i(487122);
  function d(e, t) {
    let n = (0, a.f)(e, t?.in),
      r = n.getFullYear(),
      i = (0, u.f)(n, 0);
    (i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0));
    let o = s(i),
      l = (0, u.f)(n, 0);
    (l.setFullYear(r, 0, 4), l.setHours(0, 0, 0, 0));
    let d = s(l);
    return n.getTime() >= o.getTime()
      ? r + 1
      : n.getTime() >= d.getTime()
        ? r
        : r - 1;
  }
  function c(e, t) {
    let n = (0, a.f)(e, t?.in),
      i = n.getFullYear(),
      o = (0, r.f)(),
      s =
        t?.firstWeekContainsDate ??
        t?.locale?.options?.firstWeekContainsDate ??
        o.firstWeekContainsDate ??
        o.locale?.options?.firstWeekContainsDate ??
        1,
      d = (0, u.f)(t?.in || e, 0);
    (d.setFullYear(i + 1, 0, s), d.setHours(0, 0, 0, 0));
    let c = l(d, t),
      f = (0, u.f)(t?.in || e, 0);
    (f.setFullYear(i, 0, s), f.setHours(0, 0, 0, 0));
    let h = l(f, t);
    return +n >= +c ? i + 1 : +n >= +h ? i : i - 1;
  }
  function f(e, t) {
    let n = Math.abs(e).toString().padStart(t, "0");
    return (e < 0 ? "-" : "") + n;
  }
  let h = {
      y(e, t) {
        let n = e.getFullYear(),
          r = n > 0 ? n : 1 - n;
        return f("yy" === t ? r % 100 : r, t.length);
      },
      M(e, t) {
        let n = e.getMonth();
        return "M" === t ? String(n + 1) : f(n + 1, 2);
      },
      d: (e, t) => f(e.getDate(), t.length),
      a(e, t) {
        let n = e.getHours() / 12 >= 1 ? "pm" : "am";
        switch (t) {
          case "a":
          case "aa":
            return n.toUpperCase();
          case "aaa":
            return n;
          case "aaaaa":
            return n[0];
          default:
            return "am" === n ? "a.m." : "p.m.";
        }
      },
      h: (e, t) => f(e.getHours() % 12 || 12, t.length),
      H: (e, t) => f(e.getHours(), t.length),
      m: (e, t) => f(e.getMinutes(), t.length),
      s: (e, t) => f(e.getSeconds(), t.length),
      S(e, t) {
        let n = t.length;
        return f(
          Math.trunc(e.getMilliseconds() * Math.pow(10, n - 3)),
          t.length,
        );
      },
    },
    m = {
      G: function (e, t, n) {
        let r = +(e.getFullYear() > 0);
        switch (t) {
          case "G":
          case "GG":
          case "GGG":
            return n.era(r, { width: "abbreviated" });
          case "GGGGG":
            return n.era(r, { width: "narrow" });
          default:
            return n.era(r, { width: "wide" });
        }
      },
      y: function (e, t, n) {
        if ("yo" === t) {
          let t = e.getFullYear();
          return n.ordinalNumber(t > 0 ? t : 1 - t, { unit: "year" });
        }
        return h.y(e, t);
      },
      Y: function (e, t, n, r) {
        let i = c(e, r),
          a = i > 0 ? i : 1 - i;
        return "YY" === t
          ? f(a % 100, 2)
          : "Yo" === t
            ? n.ordinalNumber(a, { unit: "year" })
            : f(a, t.length);
      },
      R: function (e, t) {
        return f(d(e), t.length);
      },
      u: function (e, t) {
        return f(e.getFullYear(), t.length);
      },
      Q: function (e, t, n) {
        let r = Math.ceil((e.getMonth() + 1) / 3);
        switch (t) {
          case "Q":
            return String(r);
          case "QQ":
            return f(r, 2);
          case "Qo":
            return n.ordinalNumber(r, { unit: "quarter" });
          case "QQQ":
            return n.quarter(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "QQQQQ":
            return n.quarter(r, { width: "narrow", context: "formatting" });
          default:
            return n.quarter(r, { width: "wide", context: "formatting" });
        }
      },
      q: function (e, t, n) {
        let r = Math.ceil((e.getMonth() + 1) / 3);
        switch (t) {
          case "q":
            return String(r);
          case "qq":
            return f(r, 2);
          case "qo":
            return n.ordinalNumber(r, { unit: "quarter" });
          case "qqq":
            return n.quarter(r, {
              width: "abbreviated",
              context: "standalone",
            });
          case "qqqqq":
            return n.quarter(r, { width: "narrow", context: "standalone" });
          default:
            return n.quarter(r, { width: "wide", context: "standalone" });
        }
      },
      M: function (e, t, n) {
        let r = e.getMonth();
        switch (t) {
          case "M":
          case "MM":
            return h.M(e, t);
          case "Mo":
            return n.ordinalNumber(r + 1, { unit: "month" });
          case "MMM":
            return n.month(r, { width: "abbreviated", context: "formatting" });
          case "MMMMM":
            return n.month(r, { width: "narrow", context: "formatting" });
          default:
            return n.month(r, { width: "wide", context: "formatting" });
        }
      },
      L: function (e, t, n) {
        let r = e.getMonth();
        switch (t) {
          case "L":
            return String(r + 1);
          case "LL":
            return f(r + 1, 2);
          case "Lo":
            return n.ordinalNumber(r + 1, { unit: "month" });
          case "LLL":
            return n.month(r, { width: "abbreviated", context: "standalone" });
          case "LLLLL":
            return n.month(r, { width: "narrow", context: "standalone" });
          default:
            return n.month(r, { width: "wide", context: "standalone" });
        }
      },
      w: function (e, t, n, i) {
        let s,
          d,
          h,
          m,
          g,
          p =
            Math.round(
              (l((s = (0, a.f)(e, i?.in)), i) -
                ((d = (0, r.f)()),
                (h =
                  i?.firstWeekContainsDate ??
                  i?.locale?.options?.firstWeekContainsDate ??
                  d.firstWeekContainsDate ??
                  d.locale?.options?.firstWeekContainsDate ??
                  1),
                (m = c(s, i)),
                (g = (0, u.f)(i?.in || s, 0)).setFullYear(m, 0, h),
                g.setHours(0, 0, 0, 0),
                l(g, i))) /
                o.A,
            ) + 1;
        return "wo" === t
          ? n.ordinalNumber(p, { unit: "week" })
          : f(p, t.length);
      },
      I: function (e, t, n) {
        let r,
          i,
          l,
          c =
            Math.round(
              (s((r = (0, a.f)(e, void 0))) -
                ((i = d(r, void 0)),
                (l = (0, u.f)(r, 0)).setFullYear(i, 0, 4),
                l.setHours(0, 0, 0, 0),
                s(l))) /
                o.A,
            ) + 1;
        return "Io" === t
          ? n.ordinalNumber(c, { unit: "week" })
          : f(c, t.length);
      },
      d: function (e, t, n) {
        return "do" === t
          ? n.ordinalNumber(e.getDate(), { unit: "date" })
          : h.d(e, t);
      },
      D: function (e, t, n) {
        let r,
          o,
          l =
            ((r = (0, a.f)(e, void 0)),
            (0, i.f)(
              r,
              ((o = (0, a.f)(r, void 0)).setFullYear(o.getFullYear(), 0, 1),
              o.setHours(0, 0, 0, 0),
              o),
            ) + 1);
        return "Do" === t
          ? n.ordinalNumber(l, { unit: "dayOfYear" })
          : f(l, t.length);
      },
      E: function (e, t, n) {
        let r = e.getDay();
        switch (t) {
          case "E":
          case "EE":
          case "EEE":
            return n.day(r, { width: "abbreviated", context: "formatting" });
          case "EEEEE":
            return n.day(r, { width: "narrow", context: "formatting" });
          case "EEEEEE":
            return n.day(r, { width: "short", context: "formatting" });
          default:
            return n.day(r, { width: "wide", context: "formatting" });
        }
      },
      e: function (e, t, n, r) {
        let i = e.getDay(),
          a = (i - r.weekStartsOn + 8) % 7 || 7;
        switch (t) {
          case "e":
            return String(a);
          case "ee":
            return f(a, 2);
          case "eo":
            return n.ordinalNumber(a, { unit: "day" });
          case "eee":
            return n.day(i, { width: "abbreviated", context: "formatting" });
          case "eeeee":
            return n.day(i, { width: "narrow", context: "formatting" });
          case "eeeeee":
            return n.day(i, { width: "short", context: "formatting" });
          default:
            return n.day(i, { width: "wide", context: "formatting" });
        }
      },
      c: function (e, t, n, r) {
        let i = e.getDay(),
          a = (i - r.weekStartsOn + 8) % 7 || 7;
        switch (t) {
          case "c":
            return String(a);
          case "cc":
            return f(a, t.length);
          case "co":
            return n.ordinalNumber(a, { unit: "day" });
          case "ccc":
            return n.day(i, { width: "abbreviated", context: "standalone" });
          case "ccccc":
            return n.day(i, { width: "narrow", context: "standalone" });
          case "cccccc":
            return n.day(i, { width: "short", context: "standalone" });
          default:
            return n.day(i, { width: "wide", context: "standalone" });
        }
      },
      i: function (e, t, n) {
        let r = e.getDay(),
          i = 0 === r ? 7 : r;
        switch (t) {
          case "i":
            return String(i);
          case "ii":
            return f(i, t.length);
          case "io":
            return n.ordinalNumber(i, { unit: "day" });
          case "iii":
            return n.day(r, { width: "abbreviated", context: "formatting" });
          case "iiiii":
            return n.day(r, { width: "narrow", context: "formatting" });
          case "iiiiii":
            return n.day(r, { width: "short", context: "formatting" });
          default:
            return n.day(r, { width: "wide", context: "formatting" });
        }
      },
      a: function (e, t, n) {
        let r = e.getHours() / 12 >= 1 ? "pm" : "am";
        switch (t) {
          case "a":
          case "aa":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "aaa":
            return n
              .dayPeriod(r, { width: "abbreviated", context: "formatting" })
              .toLowerCase();
          case "aaaaa":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      b: function (e, t, n) {
        let r,
          i = e.getHours();
        switch (
          ((r =
            12 === i
              ? "noon"
              : 0 === i
                ? "midnight"
                : i / 12 >= 1
                  ? "pm"
                  : "am"),
          t)
        ) {
          case "b":
          case "bb":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "bbb":
            return n
              .dayPeriod(r, { width: "abbreviated", context: "formatting" })
              .toLowerCase();
          case "bbbbb":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      B: function (e, t, n) {
        let r,
          i = e.getHours();
        switch (
          ((r =
            i >= 17
              ? "evening"
              : i >= 12
                ? "afternoon"
                : i >= 4
                  ? "morning"
                  : "night"),
          t)
        ) {
          case "B":
          case "BB":
          case "BBB":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "BBBBB":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      h: function (e, t, n) {
        if ("ho" === t) {
          let t = e.getHours() % 12;
          return (0 === t && (t = 12), n.ordinalNumber(t, { unit: "hour" }));
        }
        return h.h(e, t);
      },
      H: function (e, t, n) {
        return "Ho" === t
          ? n.ordinalNumber(e.getHours(), { unit: "hour" })
          : h.H(e, t);
      },
      K: function (e, t, n) {
        let r = e.getHours() % 12;
        return "Ko" === t
          ? n.ordinalNumber(r, { unit: "hour" })
          : f(r, t.length);
      },
      k: function (e, t, n) {
        let r = e.getHours();
        return (0 === r && (r = 24), "ko" === t)
          ? n.ordinalNumber(r, { unit: "hour" })
          : f(r, t.length);
      },
      m: function (e, t, n) {
        return "mo" === t
          ? n.ordinalNumber(e.getMinutes(), { unit: "minute" })
          : h.m(e, t);
      },
      s: function (e, t, n) {
        return "so" === t
          ? n.ordinalNumber(e.getSeconds(), { unit: "second" })
          : h.s(e, t);
      },
      S: function (e, t) {
        return h.S(e, t);
      },
      X: function (e, t, n) {
        let r = e.getTimezoneOffset();
        if (0 === r) return "Z";
        switch (t) {
          case "X":
            return p(r);
          case "XXXX":
          case "XX":
            return b(r);
          default:
            return b(r, ":");
        }
      },
      x: function (e, t, n) {
        let r = e.getTimezoneOffset();
        switch (t) {
          case "x":
            return p(r);
          case "xxxx":
          case "xx":
            return b(r);
          default:
            return b(r, ":");
        }
      },
      O: function (e, t, n) {
        let r = e.getTimezoneOffset();
        switch (t) {
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + g(r, ":");
          default:
            return "GMT" + b(r, ":");
        }
      },
      z: function (e, t, n) {
        let r = e.getTimezoneOffset();
        switch (t) {
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + g(r, ":");
          default:
            return "GMT" + b(r, ":");
        }
      },
      t: function (e, t, n) {
        return f(Math.trunc(e / 1e3), t.length);
      },
      T: function (e, t, n) {
        return f(+e, t.length);
      },
    };
  function g(e, t = "") {
    let n = e > 0 ? "-" : "+",
      r = Math.abs(e),
      i = Math.trunc(r / 60),
      a = r % 60;
    return 0 === a ? n + String(i) : n + String(i) + t + f(a, 2);
  }
  function p(e, t) {
    return e % 60 == 0 ? (e > 0 ? "-" : "+") + f(Math.abs(e) / 60, 2) : b(e, t);
  }
  function b(e, t = "") {
    let n = Math.abs(e);
    return (e > 0 ? "-" : "+") + f(Math.trunc(n / 60), 2) + t + f(n % 60, 2);
  }
  let w = (e, t) => {
      switch (e) {
        case "P":
          return t.date({ width: "short" });
        case "PP":
          return t.date({ width: "medium" });
        case "PPP":
          return t.date({ width: "long" });
        default:
          return t.date({ width: "full" });
      }
    },
    _ = (e, t) => {
      switch (e) {
        case "p":
          return t.time({ width: "short" });
        case "pp":
          return t.time({ width: "medium" });
        case "ppp":
          return t.time({ width: "long" });
        default:
          return t.time({ width: "full" });
      }
    },
    y = {
      p: _,
      P: (e, t) => {
        let n,
          r = e.match(/(P+)(p+)?/) || [],
          i = r[1],
          a = r[2];
        if (!a) return w(e, t);
        switch (i) {
          case "P":
            n = t.dateTime({ width: "short" });
            break;
          case "PP":
            n = t.dateTime({ width: "medium" });
            break;
          case "PPP":
            n = t.dateTime({ width: "long" });
            break;
          default:
            n = t.dateTime({ width: "full" });
        }
        return n.replace("{{date}}", w(i, t)).replace("{{time}}", _(a, t));
      },
    },
    z = /^D+$/,
    v = /^Y+$/,
    x = ["D", "DD", "YY", "YYYY"],
    M = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    S = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    T = /^'([^]*?)'?$/,
    D = /''/g,
    P = /[a-zA-Z]/;
  function k(e, t, i) {
    let o = (0, r.f)(),
      l = i?.locale ?? o.locale ?? n.f,
      s =
        i?.firstWeekContainsDate ??
        i?.locale?.options?.firstWeekContainsDate ??
        o.firstWeekContainsDate ??
        o.locale?.options?.firstWeekContainsDate ??
        1,
      u =
        i?.weekStartsOn ??
        i?.locale?.options?.weekStartsOn ??
        o.weekStartsOn ??
        o.locale?.options?.weekStartsOn ??
        0,
      d = (0, a.f)(e, i?.in);
    if (
      (!(
        d instanceof Date ||
        ("object" == typeof d &&
          "[object Date]" === Object.prototype.toString.call(d))
      ) &&
        "number" != typeof d) ||
      isNaN(+(0, a.f)(d))
    )
      throw RangeError("Invalid time value");
    let c = t
      .match(S)
      .map((e) => {
        let t = e[0];
        return "p" === t || "P" === t ? (0, y[t])(e, l.formatLong) : e;
      })
      .join("")
      .match(M)
      .map((e) => {
        if ("''" === e) return { isToken: !1, value: "'" };
        let t = e[0];
        if ("'" === t) {
          var n;
          let t;
          return {
            isToken: !1,
            value: (t = (n = e).match(T)) ? t[1].replace(D, "'") : n,
          };
        }
        if (m[t]) return { isToken: !0, value: e };
        if (t.match(P))
          throw RangeError(
            "Format string contains an unescaped latin alphabet character `" +
              t +
              "`",
          );
        return { isToken: !1, value: e };
      });
    l.localize.preprocessor && (c = l.localize.preprocessor(d, c));
    let f = { firstWeekContainsDate: s, weekStartsOn: u, locale: l };
    return c
      .map((n) => {
        if (!n.isToken) return n.value;
        let r = n.value;
        return (
          ((!i?.useAdditionalWeekYearTokens && v.test(r)) ||
            (!i?.useAdditionalDayOfYearTokens && z.test(r))) &&
            (function (e, t, n) {
              var r, i, a;
              let o,
                l =
                  ((r = e),
                  (i = t),
                  (a = n),
                  (o = "Y" === r[0] ? "years" : "days of the month"),
                  `Use \`${r.toLowerCase()}\` instead of \`${r}\` (in \`${i}\`) for formatting ${o} to the input \`${a}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);
              if ((console.warn(l), x.includes(e))) throw RangeError(l);
            })(r, t, String(e)),
          (0, m[r[0]])(d, r, l.localize, f)
        );
      })
      .join("");
  }
  var N = e.i(250954),
    O = e.i(103882),
    C = e.i(119470);
  let E = /[T ]/,
    H = /[Z ]/i,
    q = /([Z+-].*)$/,
    F = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
    W =
      /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
    $ = /^([+-])(\d{2})(?::?(\d{2}))?$/;
  function Y(e) {
    return e ? parseInt(e) : 1;
  }
  function I(e) {
    return (e && parseFloat(e.replace(",", "."))) || 0;
  }
  let L = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function j(e) {
    return e % 400 == 0 || (e % 4 == 0 && e % 100 != 0);
  }
  var R =
    (((t = {}).DEFAULT = "P p"),
    (t.COMPACT = "dd/MM/yyyy, HH:mm"),
    (t.TIME_ONLY = "HH:mm"),
    t);
  let U = (e, t = "P p") => {
    try {
      let n;
      if ("string" == typeof e)
        n = (function (e) {
          let t,
            n,
            r = () => (0, u.f)(void 0, 0 / 0),
            i = (function (e) {
              let t,
                n = {},
                r = e.split(E);
              if (r.length > 2) return n;
              if (
                (/:/.test(r[0])
                  ? (t = r[0])
                  : ((n.date = r[0]),
                    (t = r[1]),
                    H.test(n.date) &&
                      ((n.date = e.split(H)[0]),
                      (t = e.substr(n.date.length, e.length)))),
                t)
              ) {
                let e = q.exec(t);
                e
                  ? ((n.time = t.replace(e[1], "")), (n.timezone = e[1]))
                  : (n.time = t);
              }
              return n;
            })(e);
          if (i.date) {
            let e = (function (e, t) {
              let n = RegExp(
                  "^(?:(\\d{4}|[+-]\\d{" +
                    (4 + t) +
                    "})|(\\d{2}|[+-]\\d{" +
                    (2 + t) +
                    "})$)",
                ),
                r = e.match(n);
              if (!r) return { year: 0 / 0, restDateString: "" };
              let i = r[1] ? parseInt(r[1]) : null,
                a = r[2] ? parseInt(r[2]) : null;
              return {
                year: null === a ? i : 100 * a,
                restDateString: e.slice((r[1] || r[2]).length),
              };
            })(i.date, void 0 ?? 2);
            t = (function (e, t) {
              var n, r, i, a, o, l, s, u, d, c;
              if (null === t) return new Date(0 / 0);
              let f = e.match(F);
              if (!f) return new Date(0 / 0);
              let h = !!f[4],
                m = Y(f[1]),
                g = Y(f[2]) - 1,
                p = Y(f[3]),
                b = Y(f[4]),
                w = Y(f[5]) - 1;
              if (h) {
                let e, l;
                return ((n = b), (r = w), n >= 1 && n <= 53 && r >= 0 && r <= 6)
                  ? ((i = t),
                    (a = b),
                    (o = w),
                    (e = new Date(0)).setUTCFullYear(i, 0, 4),
                    (l = e.getUTCDay() || 7),
                    e.setUTCDate(e.getUTCDate() + ((a - 1) * 7 + o + 1 - l)),
                    e)
                  : new Date(0 / 0);
              }
              {
                let e = new Date(0);
                return ((l = t),
                (s = g),
                (u = p),
                s >= 0 &&
                  s <= 11 &&
                  u >= 1 &&
                  u <= (L[s] || (j(l) ? 29 : 28)) &&
                  ((d = t), (c = m) >= 1 && c <= (j(d) ? 366 : 365)))
                  ? (e.setUTCFullYear(t, g, Math.max(m, p)), e)
                  : new Date(0 / 0);
              }
            })(e.restDateString, e.year);
          }
          if (!t || isNaN(+t)) return r();
          let l = +t,
            s = 0;
          if (
            i.time &&
            isNaN(
              (s = (function (e) {
                var t, n, r;
                let i = e.match(W);
                if (!i) return 0 / 0;
                let a = I(i[1]),
                  l = I(i[2]),
                  s = I(i[3]);
                return ((t = a),
                (n = l),
                (r = s),
                24 === t
                  ? 0 === n && 0 === r
                  : r >= 0 && r < 60 && n >= 0 && n < 60 && t >= 0 && t < 25)
                  ? a * o.r + l * o.z + 1e3 * s
                  : 0 / 0;
              })(i.time)),
            )
          )
            return r();
          if (i.timezone) {
            if (
              isNaN(
                (n = (function (e) {
                  var t;
                  if ("Z" === e) return 0;
                  let n = e.match($);
                  if (!n) return 0;
                  let r = "+" === n[1] ? -1 : 1,
                    i = parseInt(n[2]),
                    a = (n[3] && parseInt(n[3])) || 0;
                  return (t = a) >= 0 && t <= 59
                    ? r * (i * o.r + a * o.z)
                    : 0 / 0;
                })(i.timezone)),
              )
            )
              return r();
          } else {
            let e = new Date(l + s),
              t = (0, a.f)(0, void 0);
            return (
              t.setFullYear(
                e.getUTCFullYear(),
                e.getUTCMonth(),
                e.getUTCDate(),
              ),
              t.setHours(
                e.getUTCHours(),
                e.getUTCMinutes(),
                e.getUTCSeconds(),
                e.getUTCMilliseconds(),
              ),
              t
            );
          }
          return (0, a.f)(l + s + n, void 0);
        })(e);
      else if ("number" == typeof e) n = new Date(e);
      else {
        if (!(e instanceof Date)) return "Invalid Input Type";
        n = e;
      }
      if (isNaN(n.getTime())) return "Invalid Date";
      return k(n, t);
    } catch {
      return "Invalid Date";
    }
  };
  e.s(
    [
      "W",
      () => R,
      "B",
      0,
      (e, t = !1) => {
        if (!Number.isFinite(e) || e < 0) return "0:00";
        let n = Math.floor(e),
          r = Math.floor(n / 3600),
          i = Math.floor((n % 3600) / 60),
          a = n % 60;
        return t || 0 !== r
          ? `${String(r)}:${String(i).padStart(2, "0")}:${String(a).padStart(2, "0")}`
          : `${i}:${String(a).padStart(2, "0")}`;
      },
      "C",
      0,
      U,
      "K",
      0,
      (e) =>
        (0, O.f)((0, u.f)(e, e), (0, N.f)(e))
          ? "Today"
          : (0, O.f)((0, u.f)(e, e), (0, C.f)((0, N.f)(e), 1))
            ? "Yesterday"
            : k(e, "dd MMM yyyy").toUpperCase(),
      "q",
      0,
      (e) => {
        let t = new Date(e);
        if (isNaN(t.getTime())) return "Invalid Date";
        let n = Math.floor((new Date().getTime() - t.getTime()) / 864e5);
        if (0 === n) return "today";
        if (1 === n) return "1d ago";
        if (n < 7) return `${n}d ago`;
        let r = Math.floor(n / 7);
        if (1 === r) return "1w ago";
        if (r < 4) return `${r}w ago`;
        let i = Math.floor(n / 30);
        if (1 === i) return "1mo ago";
        if (i > 1 && i < 12) return `${i}mo ago`;
        if (0 === i) return `${r}w ago`;
        let a = Math.floor(n / 365);
        return 1 === a ? "1y ago" : `${a}y ago`;
      },
      "P",
      0,
      (e) => U(e, "HH:mm"),
      "J",
      0,
      (e) => {
        let t = new Date(e),
          n = (new Date().getTime() - t.getTime()) / 6e4;
        if (isNaN(n)) return "Invalid Date";
        if (n < 1) return "<1m";
        if (n < 60) return `${Math.floor(n)}m`;
        if (n < 1440) return `${Math.floor(n / 60)}h`;
        if (n < 10080) return `${Math.floor(n / 1440)}d`;
        if (n < 43200) return `${Math.floor(n / 10080)}w`;
        else if (n < 525600) return `${Math.floor(n / 43200)}m`;
        else return `${Math.floor(n / 525600)}y`;
      },
      "U",
      0,
      (e) =>
        Number.isFinite(e)
          ? e >= 1e12
            ? Math.floor(e / 1e3)
            : Math.floor(e)
          : 0,
    ],
    29054,
  );
};
