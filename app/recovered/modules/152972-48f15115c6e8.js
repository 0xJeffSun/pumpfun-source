// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(938277),
    r = e.i(365089),
    i = e.i(549200),
    l = (e.i(805089), e.i(860787));
  let s = i.g.borderTertiary,
    a = i.g.bgTertiary,
    d = i.g.textPrimary,
    n = { up: "#4ADE80", down: "#F87171", flat: i.g.textTertiary };
  i.g.bgTertiary;
  let o = new Set([
      "socialimages.pump.fun",
      "socialimages.devnet.pump.fun",
      "cdn.kolscan.io",
    ]),
    u = (e) => {
      if (e) {
        try {
          let { hostname: t } = new URL(e);
          if (o.has(t.toLowerCase()))
            return `/_next/image?url=${encodeURIComponent(e)}&w=48&q=75`;
        } catch {}
        return e;
      }
    },
    c = (e, t) => {
      if (!e || !t) return;
      let r = t[e]?.trim();
      if (r) return u((0, l.Z)({ sourceUrl: r, width: l.z.chart }) ?? void 0);
    },
    m = (e) => "number" == typeof e && Number.isFinite(e) && e > 0,
    p = (e) =>
      m(e) ? (e >= 1.02 ? "up" : e <= 0.98 ? "down" : "flat") : "flat",
    f = (e) => {
      let t = e.callerName?.trim();
      return t || (0, r.d)(e.userId, 4, 4);
    },
    b = "callout_";
  e.s([
    "j",
    0,
    a,
    "V",
    0,
    s,
    "X",
    0,
    "C",
    "r",
    0,
    d,
    "s",
    0,
    b,
    "d",
    0,
    n,
    "E",
    0,
    "F",
    "c",
    0,
    "K",
    "t",
    0,
    "V",
    "F",
    0,
    (e) => {
      let t = "string" == typeof e ? e : String(e);
      return t.startsWith(b) ? t.slice(b.length) : null;
    },
    "q",
    0,
    p,
    "N",
    0,
    (e) => {
      if (!m(e)) return "";
      if ("flat" === p(e)) return "≈0%";
      if (e >= 2) {
        let t = e.toFixed(e >= 10 ? 0 : 1).replace(/\.0$/, "");
        return `${t}\xd7`;
      }
      let t = (e - 1) * 100,
        r = Math.abs(t),
        i = r >= 10 ? r.toFixed(0) : r.toFixed(1);
      return `${t > 0 ? "+" : "−"}${i}%`;
    },
    "I",
    0,
    (e) => {
      var r;
      let i = f(e),
        l =
          "number" != typeof (r = e.marketCap) || !Number.isFinite(r) || r <= 0
            ? "—"
            : `$${(0, t.M)(r)}`,
        s = "—" === l ? `📣 ${i} called coin` : `📣 ${i} called coin at ${l}`,
        a = p(e.multiple),
        d = ((e) => {
          if (!m(e)) return "";
          if ("flat" === p(e)) return "0%";
          if (e >= 2) {
            let t = e.toFixed(e >= 10 ? 0 : 1).replace(/\.0$/, "");
            return `${t}x`;
          }
          let t = Math.abs((e - 1) * 100),
            r = t >= 10 ? t.toFixed(0) : t.toFixed(1);
          return `${r}%`;
        })(e.multiple),
        n = s;
      d &&
        ("up" === a
          ? (n = `${s} gaining ${d} since call`)
          : "down" === a && (n = `${s} losing ${d} since call`));
      let o = e.note?.trim();
      return o ? `${n} \xb7 "${o}"` : n;
    },
    "L",
    0,
    (e) =>
      u((0, l.Z)({ sourceUrl: e.callerAvatar, width: l.z.chart }) ?? void 0),
    "p",
    0,
    f,
    "H",
    0,
    (e, t) => {
      if (e) return c(e, t);
    },
    "P",
    0,
    c,
  ]);
};
