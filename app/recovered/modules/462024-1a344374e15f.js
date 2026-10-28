// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(365089),
    r = e.i(668487),
    n = e.i(90832);
  let i = {
      SOL: {
        id: "So11111111111111111111111111111111111111112",
        imageUri:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        mint: "So11111111111111111111111111111111111111112",
        name: "Solana",
        symbol: "SOL",
      },
      USDC: {
        id: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        imageUri:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        name: "USD Coin",
        symbol: "USDC",
      },
      PUMP: {
        id: "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn",
        imageUri: "https://pump.fun/pump-logomark.svg",
        mint: "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn",
        name: "Pump",
        symbol: "PUMP",
      },
    },
    a = new Map([
      ["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", "USDC"],
      ["Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", "USDT"],
      ["2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo", "PYUSD"],
      ["USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA", "USDS"],
      ["2u1tszSeqZ3qBWF3uNGPFc8TzMk2tdiwknnRMWGWjGWH", "USDG"],
      ["9zNQRsGLjNKwCUU5Gq5LR8beUCPzQMVMqKAi3SSZh54u", "FDUSD"],
      ["DEkqHyPN7GMRJ5cArtQFAWefqbZb33Hyf6s5iCwjEonT", "USDe"],
      ["HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr", "EURC"],
    ]);
  function o(e) {
    return (
      "open" === e.status &&
      ("WINNER_BY_WINNER" === e.payoutMode || !e.hasResolution)
    );
  }
  let s = (e) => {
      let t = e % 100;
      if (t >= 11 && t <= 13) return `${e}th`;
      switch (e % 10) {
        case 1:
          return `${e}st`;
        case 2:
          return `${e}nd`;
        case 3:
          return `${e}rd`;
        default:
          return `${e}th`;
      }
    },
    l = (e, t) =>
      new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: t,
      }).format(e),
    d = (e, t) =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1,
        timeZone: t,
      }).format(e),
    u = (e) => e ?? new Date((0, r.t)());
  function m(e, t) {
    let r = u(t?.now),
      n = new Date(e);
    if (Number.isNaN(n.getTime())) return "Published";
    let i = t?.timeZone,
      a = r.getTime() - n.getTime();
    if (!Number.isFinite(a) || a < 0) return "Published now";
    let o = Math.floor(a / 1e3);
    if (o < 60) return "Published now";
    let m = Math.floor(o / 60);
    if (m < 60) return `Published ${m}min ago`;
    let c = l(n, i),
      f = l(r, i),
      p = d(n, i);
    if (c === f) {
      let e = Math.floor(m / 60);
      return `Published ${e}h ago`;
    }
    let h = new Date(r);
    if ((h.setDate(h.getDate() - 1), c === l(h, i)))
      return `Published yesterday at ${p}`;
    if (a < 6048e5) {
      let e = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        timeZone: i,
      }).format(n);
      return `Published on ${e} at ${p}`;
    }
    let g = new Intl.DateTimeFormat("en-GB", {
        month: "long",
        timeZone: i,
      }).format(n),
      w = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        timeZone: i,
      }).format(n),
      y = Number(
        new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          timeZone: i,
        }).format(n),
      );
    return `Published on ${s(y)} ${g} ${w} at ${p}`;
  }
  function c(e, t) {
    let r = u(t?.now),
      n = new Date(e);
    if (Number.isNaN(n.getTime())) return "Last edited";
    let i = t?.timeZone,
      a = d(n, i),
      o = l(n, i);
    if (o === l(r, i)) return `Last edited at ${a}`;
    let m = new Date(r);
    if ((m.setDate(m.getDate() - 1), o === l(m, i)))
      return `Last edited at ${a} yesterday`;
    let c = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        timeZone: i,
      }).format(n),
      f = new Intl.DateTimeFormat("en-GB", {
        month: "long",
        timeZone: i,
      }).format(n),
      p = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        timeZone: i,
      }).format(n),
      h = Number(
        new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          timeZone: i,
        }).format(n),
      );
    return `Last edited on ${c} ${s(h)} of ${f} ${p} at ${a}`;
  }
  function f(e) {
    if (!e.publishedAt) return;
    let t = Date.parse(e.publishedAt);
    if (!Number.isFinite(t)) return;
    if (e.editedAt) {
      let r = Date.parse(e.editedAt);
      if (!Number.isFinite(r) || r <= t) return;
      return e.editedAt;
    }
    if (!e.updatedAt) return;
    let r = Date.parse(e.updatedAt);
    if (Number.isFinite(r) && !(r <= t)) return e.updatedAt;
  }
  function p(e) {
    let t = Date.now() - new Date(e).getTime();
    if (!Number.isFinite(t) || t < 0) return "now";
    let r = Math.floor(t / 1e3);
    if (r < 60) return "now";
    let n = Math.floor(r / 60);
    if (n < 60) return `${n}m`;
    let i = Math.floor(n / 60);
    if (i < 24) return `${i}h`;
    let a = Math.floor(i / 24);
    return a < 7
      ? `${a}d`
      : new Date(e).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
  }
  e.s([
    "i",
    0,
    i,
    "K",
    0,
    [
      "all",
      "design",
      "code",
      "research",
      "strategy",
      "motion",
      "content",
      "community",
      "analytics",
    ],
    "u",
    0,
    function (e) {
      if ("PENDING_REVIEW" === e.moderationStatus || !o(e)) return !1;
      if (e.expiresAt) {
        let t = Date.parse(e.expiresAt);
        if (Number.isFinite(t) && t <= Date.now()) return !1;
      }
      return !0;
    },
    "Q",
    0,
    o,
    "k",
    0,
    function (e, t) {
      if ("USD" === t) return `$${Math.round(e).toLocaleString("en-US")}`;
      if ("SOL" === t) return `${(0, n.m)(e)} ${t}`;
      if (Math.abs(e) >= 1e4)
        return `${new Intl.NumberFormat("en-US", { compactDisplay: "short", maximumFractionDigits: 1, notation: "compact" }).format(e).replace(".0", "")} ${t}`;
      let r = !Number.isInteger(e);
      return `${e.toLocaleString("en-US", { maximumFractionDigits: +!!r, minimumFractionDigits: +!!r })} ${t}`;
    },
    "n",
    0,
    function (e) {
      if (!Number.isFinite(e) || e <= 0) return "$0";
      if (e < 1e3) return (0, n.c)(e);
      let t = Math.round(e);
      return `$${t.toLocaleString("en-US")}`;
    },
    "X",
    0,
    function (e) {
      return new Date(e).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    },
    "w",
    0,
    function (e) {
      return `${e} ${1 === e ? "sub." : "subs."}`;
    },
    "l",
    0,
    function (e) {
      return `${e} submission${1 === e ? "" : "s"}`;
    },
    "C",
    0,
    c,
    "r",
    0,
    m,
    "I",
    0,
    function (e, t) {
      if (t?.displayUpdate) return p(t.displayUpdate.createdAt);
      if (!e.publishedAt) return `Saved \xb7 ${p(e.createdAt)}`;
      let r = m(e.publishedAt, { now: t?.now, timeZone: t?.timeZone }),
        n = f(e);
      if (!n) return r;
      let i = c(n, { now: t?.now, timeZone: t?.timeZone });
      return `${r} \xb7 ${i}`;
    },
    "$",
    0,
    p,
    "j",
    0,
    function (e) {
      if (e) return a.get(e.trim());
    },
    "U",
    0,
    function (e) {
      let t = new Date(e).getTime();
      if (!Number.isFinite(t)) return null;
      let n = t - (0, r.t)();
      if (n <= 0) return null;
      let i = Math.floor(n / 864e5),
        a = Math.floor((n / 36e5) % 24),
        o = Math.floor((n / 6e4) % 60),
        s = Math.floor((n / 1e3) % 60);
      return i > 0
        ? `${i}d ${a}h ${o}m ${s}s`
        : a > 0
          ? `${a}h ${o}m ${s}s`
          : o > 0
            ? `${o}m ${s}s`
            : `${s}s`;
    },
    "B",
    0,
    (e) => e.username?.trim() || (0, t.d)(e.address) || "Unknown",
    "R",
    0,
    function (e, t) {
      return t || ("USD" === e ? null : i[e]);
    },
    "V",
    0,
    f,
    "o",
    0,
    function (e) {
      let t = Date.now(),
        r = new Date(e).getTime() - t;
      if (r <= 0) return "Closed";
      let n = Math.floor(r / 864e5),
        i = Math.floor((r / 36e5) % 24),
        a = Math.floor((r / 6e4) % 60);
      return n > 0
        ? `${n}d ${i}h left`
        : i > 0
          ? `${i}h ${a}m left`
          : `${a}m left`;
    },
    "M",
    0,
    function (e) {
      return e === i.SOL.mint || e === i.USDC.mint || e === i.PUMP.mint;
    },
  ]);
};
