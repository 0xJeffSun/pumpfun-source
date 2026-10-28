// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(938277),
    r = e.i(892091),
    i = e.i(152972);
  let l = (e) => {
    let t = e.lastIndexOf("#");
    return -1 === t ? e : e.slice(0, t);
  };
  e.s(["M", 0, l, "o", 0, (e, t) => `${e}#${t}`], 343909);
  var s = e.i(805089),
    a = e.i(911372),
    d = e.i(921152);
  let n = ({ resolution: e }) => (0, d.B)((0, d.t)(e)) / 1e3,
    o = {
      my: 0,
      dev: 1,
      mayhem: 2,
      tracked: 3,
      kol: 4,
      following: 5,
      verified: 6,
      callout: 7,
      bounty: 8,
      unknown: 9,
    },
    u = [
      ["my_", "my"],
      ["dev_", "dev"],
      ["kol_", "kol"],
      ["following_", "following"],
      ["verified_", "verified"],
      [i.s, "callout"],
      [r.H, "bounty"],
    ],
    c = ({ id: e, model: t }) =>
      t
        ? "trade" === t.kind || "tradeGroup" === t.kind
          ? t.source
          : t.kind
        : (u.find(([t]) => e.startsWith(t))?.[1] ?? "unknown");
  e.i(267146);
  var m = e.i(540805);
  let p = "pf-marker-id:",
    f = (e, t, r) => {
      for (let [i, l] of e) {
        let { time: s } = l;
        (!Number.isFinite(s) || (s >= t && s < r)) && e.delete(i);
      }
    };
  e.s(["B", 0, 24, "p", 0, 24, "y", 0, 20, "C", 0, p, "H", 0, f], 606721);
  let b = (e, t) =>
      604800 === t ? (0, d.h)(1e3 * e) / 1e3 : Math.floor(e / t) * t,
    y = (e) => {
      let t = new Set();
      return e.filter(({ model: e }) => {
        let r;
        if (!e.tx) return !0;
        let i = (r = e.tx).startsWith("0x") ? r.toLowerCase() : r;
        return !t.has(i) && (t.add(i), !0);
      });
    },
    S = (e, t, r) =>
      `${e} ${r}${1 === e ? "" : "s"}${t > 0 ? ` ${(0, m.l)(t)}` : ""}`,
    h = ({ members: e, barSec: t }) => {
      var r;
      let i = [...e].sort((e, t) => t.mark.time - e.mark.time),
        l = i[0],
        s = l.model,
        a = i.reduce(
          (e, { model: t }) => {
            let r,
              i =
                Number.isFinite((r = Number(t.amountUSD ?? 0))) && r > 0
                  ? r
                  : 0;
            return "buy" === t.tradeType
              ? { ...e, buyCount: e.buyCount + 1, buyUsd: e.buyUsd + i }
              : { ...e, sellCount: e.sellCount + 1, sellUsd: e.sellUsd + i };
          },
          { buyCount: 0, sellCount: 0, buyUsd: 0, sellUsd: 0 },
        ),
        d =
          ((r = s.tradeType),
          a.buyUsd !== a.sellUsd
            ? a.buyUsd > a.sellUsd
              ? "buy"
              : "sell"
            : a.buyCount !== a.sellCount
              ? a.buyCount > a.sellCount
                ? "buy"
                : "sell"
              : r),
        n = i.find(({ model: e }) => e.tradeType === d) ?? l,
        o = b(l.mark.time, t),
        u = i.length,
        c = (({
          name: e,
          count: t,
          buyCount: r,
          sellCount: i,
          buyUsd: l,
          sellUsd: s,
        }) => {
          let a = [];
          return (
            r > 0 && a.push(S(r, l, "buy")),
            i > 0 && a.push(S(i, s, "sell")),
            `${e} \xb7 ${t} trades: ${a.join(", ")}`
          );
        })({
          name:
            s.displayName?.trim() ||
            s.kol?.name?.trim() ||
            s.walletAddress.slice(0, 6),
          count: u,
          ...a,
        }),
        m = `group_${s.walletAddress}_${o}_${u}`;
      return {
        mark: {
          id: m,
          time: l.mark.time,
          color: n.mark.color,
          text: c,
          label: String(Math.min(u, 99)),
          labelFontColor: "white",
          minSize: 24,
          imageUrl: l.mark.imageUrl,
          showLabelWhenImageLoaded: !0,
        },
        model: {
          kind: "tradeGroup",
          id: m,
          time: l.mark.time,
          source: s.source,
          label: s.label,
          title: c,
          tradeType: d,
          chainId: s.chainId,
          walletAddress: s.walletAddress,
          profileAddress: s.profileAddress,
          displayName: s.displayName,
          avatarUrl: s.avatarUrl,
          isVerified: s.isVerified,
          kol: s.kol,
          bucketStartSec: o,
          bucketEndSec: o + t,
          trades: i.map(({ model: e }) => e),
          ...a,
        },
      };
    };
  var k = e.i(426897);
  let g = [
      "1S",
      "15S",
      "30S",
      "1",
      "5",
      "15",
      "30",
      "60",
      "240",
      "360",
      "720",
      "1D",
      "1W",
    ],
    D = { background: "#0d1f12", border: "#4ADE80" },
    M = { background: "#1f0d0d", border: "#F87171" },
    v = { background: "#102014", border: "#4ADE80" },
    $ = { background: "#20100c", border: "#F87171" },
    A = { background: "#102014", border: "#38bdf8" },
    w = { background: "#20100c", border: "#38bdf8" },
    U = (e, t) => t?.[e]?.trim() || void 0,
    I = (e, t) => !!t?.[e],
    T = (e) => {
      let t = e.name?.trim();
      return t ? ` \xb7 Top trader: ${t}` : "";
    },
    x = (e, t) => {
      let r = !!(
          e &&
          (t?.current.buttonDisplayOptions.myTrades.walletAddress === e ||
            t?.current.buttonDisplayOptions.myTrades.trades?.some(
              (t) => t.userAddress === e,
            ))
        ),
        i = !!(
          e &&
          (t?.current.buttonDisplayOptions.devTrades.walletAddress === e ||
            t?.current.buttonDisplayOptions.devTrades.trades?.some(
              (t) => t.userAddress === e,
            ))
        ),
        l = !!(
          e &&
          (t?.current.buttonDisplayOptions.mayhemTrades?.walletAddress === e ||
            t?.current.buttonDisplayOptions.mayhemTrades?.trades?.some(
              (t) => t.userAddress === e,
            ))
        ),
        s =
          !!t?.current.buttonDisplayOptions.trackedTrades.trackedWallets?.some(
            (t) => t.trackedWalletAddress === e,
          ),
        a = !!t?.current.buttonDisplayOptions.kolTrades?.kolByWallet?.[e],
        d =
          !!t?.current.buttonDisplayOptions.followingTrades
            ?.followingByWallet?.[e],
        n =
          !!t?.current.buttonDisplayOptions.verifiedTrades?.verifiedWallets?.[
            e
          ];
      return r
        ? "my"
        : i
          ? "dev"
          : l
            ? "mayhem"
            : s
              ? "tracked"
              : a
                ? "kol"
                : d
                  ? "following"
                  : n
                    ? "verified"
                    : "tracked";
    },
    O = (e, t, r) => {
      let l = t ? "B" : "S",
        s = e.slice(0, 6),
        a = r?.current.buttonDisplayOptions.trackedTrades.trackedWallets?.find(
          (t) => t.trackedWalletAddress === e,
        ),
        d = !!(
          e &&
          (r?.current.buttonDisplayOptions.myTrades.walletAddress === e ||
            r?.current.buttonDisplayOptions.myTrades.trades?.some(
              (t) => t.userAddress === e,
            ))
        ),
        n = !!(
          e &&
          (r?.current.buttonDisplayOptions.devTrades.walletAddress === e ||
            r?.current.buttonDisplayOptions.devTrades.trades?.some(
              (t) => t.userAddress === e,
            ))
        ),
        o = !!(
          e &&
          (r?.current.buttonDisplayOptions.mayhemTrades?.walletAddress === e ||
            r?.current.buttonDisplayOptions.mayhemTrades?.trades?.some(
              (t) => t.userAddress === e,
            ))
        ),
        u = r?.current.buttonDisplayOptions.kolTrades?.kolByWallet?.[e],
        c =
          !!r?.current.buttonDisplayOptions.followingTrades
            ?.followingByWallet?.[e],
        m =
          !!r?.current.buttonDisplayOptions.verifiedTrades?.verifiedWallets?.[
            e
          ],
        p = U(e, r?.current.traderUsernames),
        f = p;
      return (
        d
          ? (s = "You")
          : n
            ? ((l = t ? "DB" : "DS"), (s = "Dev"))
            : o
              ? ((l = t ? "MB" : "MS"), (s = "Mayhem"))
              : a
                ? ((l = a.emoji), (s = a.name), (f = a.name))
                : u
                  ? ((l = i.c),
                    (s = (f = u.name?.trim() || p) || e.slice(0, 6)))
                  : c
                    ? ((l = i.E), (s = p || e.slice(0, 6)))
                    : m && ((l = i.t), (s = p || e.slice(0, 6))),
        { label: l, prefix: s, displayName: f }
      );
    },
    _ = (e, t) => {
      switch (e) {
        case "mayhem":
          return t ? D : M;
        case "kol":
        case "verified":
          return t ? v : $;
        case "following":
          return t ? A : w;
        default:
          return t ? "green" : "red";
      }
    },
    F = (e, r, i) =>
      `${e} ${"buy" === r ? "bought" : "sold"} ${(0, k.k)(i) ? (0, t.q)(i, 2, "$") : "–"}`,
    L = ({
      prefix: e,
      type: r,
      usdAmount: i,
      solAmount: l,
      priceUSD: a,
      priceSOL: d,
      currency: n,
      displayMode: o,
      currentSolPriceInUSD: u,
    }) => {
      if ("USD" !== n)
        return ((e, r, i, l, a, d, n) => {
          let o = F(e, r, a),
            u = Number(i),
            c = d ? Number(d) : 0;
          if ("marketcap" === l) {
            if (!(0, k.k)(c)) return o;
            let e = 1e9 * c,
              r = n && n > 0 ? n : u > 0 ? u : 1;
            return `${o} at ${(0, t.q)(e / r, 0, "")} SOL Market Cap`;
          }
          if (!(0, k.k)(u)) return o;
          let m = (0, s.f)({ value: i, fixedDecimalLength: 2 });
          return `${o} at ${m} SOL`;
        })(e, r, d, o, i, a, u);
      let c = F(e, r, i),
        m = Number(a);
      if (!(0, k.k)(m)) return c;
      if ("marketcap" === o) {
        let e = 1e9 * m;
        return `${c} at ${(0, t.q)(e, 0)} USD Market Cap`;
      }
      let p = (0, s.f)({ value: m, fixedDecimalLength: 2 });
      return `${c} at ${p} USD`;
    },
    P = async ({
      resolution: e,
      periodParams: t,
      onHistoryCallback: r,
      onErrorCallback: i,
      fetchData: l,
      dataCache: s,
      olderPageFailures: a,
    }) => {
      let n = (0, d.t)(e),
        o = (e) => ({
          time: e.timestamp,
          open: e.open,
          high: e.high,
          low: e.low,
          close: e.close,
          volume: parseFloat(e.volume),
        }),
        u = 1e3 * t.from,
        { countBack: c } = t,
        m = (e) => t.firstDataRequest || Math.floor(e.timestamp / 1e3) < t.to,
        p = (e) => e.filter(m).sort((e, t) => e.timestamp - t.timestamp),
        f = (e) => {
          let t;
          for (let r of e)
            (void 0 === t || r.timestamp < t) && (t = r.timestamp);
          return t;
        },
        b = (e) => {
          let t = f(e);
          return void 0 !== t && (t > u || c > e.filter(m).length);
        };
      try {
        let e = t.firstDataRequest ? [] : s.get(n) || [];
        0 === e.length && (e = await l(n));
        let i = !1;
        for (; b(e); ) {
          let t = f(e),
            d = `${n}:${t}`;
          try {
            (await l(n, t), a?.delete(d));
          } catch (i) {
            console.error("Error loading older bars:", i);
            let t = (a?.get(d) ?? 0) + 1;
            (a?.set(d, t), r(p(e).map(o), { noData: t >= 2 }));
            return;
          }
          let u = s.get(n) || e,
            c = f(u);
          if (void 0 === c || c >= t) {
            i = !0;
            break;
          }
          e = u;
        }
        let d = ((e) => {
          let t = p(e),
            r = 0;
          for (let e of t) e.timestamp >= u && (r += 1);
          let i = Math.max(r, c, 1);
          return t.slice(Math.max(0, t.length - i)).map(o);
        })(e);
        r(d, { noData: 0 === d.length && (i || 0 === e.length) });
      } catch (e) {
        (console.error("Error loading bars:", e), i(e));
      }
    },
    W = (e) => ("string" == typeof e ? new Date(e).getTime() : 1e3 * Number(e)),
    N = (
      e,
      {
        idPrefix: t,
        prefix: r,
        label: i,
        currency: l,
        displayMode: s,
        currentSolPriceInUSD: a,
        idx: d,
        colorOverride: n,
        imageUrl: o,
        textSuffix: u,
        textOverride: c,
      },
    ) => {
      let m,
        p = Math.floor(W(e.timestamp) / 1e3),
        f = "buy" === e.type,
        b = n ? n(f) : f ? "green" : "red",
        y =
          c ??
          ((m = L({
            prefix: r,
            type: e.type,
            usdAmount: e.amountUSD ?? 0,
            solAmount: e.amountSOL ?? 0,
            priceUSD: e.priceUSD ?? 0,
            priceSOL: e.priceSOL ?? 0,
            currency: l,
            displayMode: s,
            currentSolPriceInUSD: a,
          })),
          u ? `${m}${u}` : m);
      return {
        id: `${t}_${e.userAddress}_${p}_${e.type}_${e.tx || d}`,
        time: p,
        color: b,
        text: y,
        label: i,
        labelFontColor: "white",
        minSize: 20,
        imageUrl: o,
      };
    },
    B = (e, t, r, l, s) => {
      t &&
        e?.length &&
        e.forEach((e, t) => {
          let a = W(e.timestamp);
          if (
            (s.respectTimeRange && (a < s.timeStartMs || a > s.timeEndMs)) ||
            !(0, k.V)(e)
          )
            return;
          let {
              idPrefix: d,
              prefix: n,
              label: o,
              source: u,
              displayName: c,
            } = l(e, t),
            m = (0, i.P)(e.userAddress, s.traderProfileImages),
            p = s.kolByWallet?.[e.userAddress],
            f = p ? T(p) : void 0,
            b = N(e, {
              idPrefix: d,
              prefix: n,
              label: o,
              currency: s.currency,
              displayMode: s.displayMode,
              currentSolPriceInUSD: s.currentSolPriceInUSD,
              idx: t,
              colorOverride: s.colorOverride,
              imageUrl: m,
              textSuffix: f,
            });
          (r.push(b),
            H({
              chainId: s.chainId,
              currentSolPriceInUSD: s.currentSolPriceInUSD,
              displayName:
                c || p?.name?.trim() || U(e.userAddress, s.traderUsernames),
              imageUrl: m,
              isVerified: I(e.userAddress, s.verifiedWallets),
              kolEntry: p,
              label: o,
              mark: b,
              popoverModels: s.popoverModels,
              profileAddress: s.traderIdentities?.[e.userAddress],
              source: u,
              trade: e,
            }));
        });
    },
    C = (e) =>
      !Number.isFinite(e) || e <= 0
        ? 0
        : e > 1e10
          ? Math.floor(e / 1e3)
          : Math.floor(e),
    q = { background: i.j, border: i.V },
    E = (e) => {
      let t = C(e.createdAt);
      return t && e.calloutId
        ? {
            id: `${i.s}${e.calloutId}`,
            time: t,
            color: q,
            text: (0, i.I)(e),
            label: i.X,
            labelFontColor: i.r,
            minSize: 24,
            imageUrl: (0, i.L)(e),
          }
        : null;
    },
    R = { background: r.h, border: r.d },
    V = (e) => {
      let t = (0, r.b)(e.postedAtMs);
      return t && e.taskId
        ? {
            id: `${r.H}${e.taskId}`,
            time: t,
            color: R,
            text: (0, r.R)(e),
            label: r.s,
            labelFontColor: r.k,
            minSize: 24,
          }
        : null;
    },
    H = ({
      chainId: e,
      currentSolPriceInUSD: t,
      displayName: r,
      imageUrl: i,
      isVerified: l,
      kolEntry: s,
      label: a,
      mark: d,
      popoverModels: n,
      profileAddress: o,
      source: u,
      trade: c,
    }) => {
      n &&
        n.set(String(d.id), {
          kind: "trade",
          id: String(d.id),
          time: d.time,
          source: u,
          label: a,
          title: d.text,
          tradeType: "sell" === c.type ? "sell" : "buy",
          chainId: e,
          walletAddress: c.userAddress,
          profileAddress: o,
          displayName: r,
          isVerified: l,
          tx: c.tx,
          amountUSD: c.amountUSD,
          amountSOL: c.amountSOL,
          priceUSD: c.priceUSD,
          priceSOL: c.priceSOL,
          currentSolPriceInUSD: t,
          avatarUrl: i,
          kol: s,
        });
    },
    z = (e, t, r) => {
      e &&
        e.set(String(t), {
          kind: "trade",
          id: String(t),
          time: r.time,
          source: r.tradeType,
          label: r.label,
          title: r.text,
          tradeType:
            r.side ?? (r.text.toLowerCase().includes("sold") ? "sell" : "buy"),
          chainId: r.chainId,
          walletAddress: r.walletAddress,
          profileAddress: r.profileAddress,
          displayName: r.displayName,
          isVerified: r.isVerified,
          tx: r.tx,
          amountUSD: r.amountUSD,
          amountSOL: r.amountSOL,
          priceUSD: r.priceUSD,
          priceSOL: r.priceSOL,
          currentSolPriceInUSD: r.currentSolPriceInUSD,
          avatarUrl: r.imageUrl,
          kol: r.kol,
        });
    },
    j = (e, t, r) => {
      e &&
        e.set(String(t.id), {
          kind: "callout",
          id: String(t.id),
          time: t.time,
          title: t.text,
          callout: r,
        });
    },
    K = (e, t, r) => {
      e &&
        e.set(String(t.id), {
          kind: "bounty",
          id: String(t.id),
          time: t.time,
          title: t.text,
          bounty: r,
        });
    },
    G = (e) => {
      let r,
        i,
        l =
          ((r = e.walletAddress),
          (i = e.kolEntry),
          i?.name?.trim() || r.slice(0, 6)),
        a = "buy" === e.type ? "bought" : "sold",
        d = Number(e.amountUSD ?? 0),
        n = Number.isFinite(d) && d > 0 ? `$${(0, t.J)(d)}` : "",
        o = ((e, r, i, l) => {
          let a = Number(e.priceUSD ?? 0),
            d = Number(e.priceSOL ?? 0);
          if ("SOL" === r) {
            if ("marketcap" === i) {
              if (l && l > 0) {
                if (!Number.isFinite(a) || a <= 0) return "";
                let e = 1e9 * a;
                return `${(0, t.q)(e / l, 0, "")} SOL`;
              }
              return !Number.isFinite(d) || d <= 0
                ? ""
                : `${(0, t.q)(1e9 * d, 0, "")} SOL`;
            }
            return !Number.isFinite(d) || d <= 0
              ? ""
              : `${(0, s.f)({ value: d, fixedDecimalLength: 2 })} SOL`;
          }
          return !Number.isFinite(a) || a <= 0
            ? ""
            : "marketcap" === i
              ? (0, t.q)(1e9 * a, 0)
              : (0, s.f)({
                  value: a,
                  showCurrency: !0,
                  currencySymbol: "$",
                  fixedDecimalLength: 2,
                });
        })(
          { priceUSD: e.priceUSD, priceSOL: e.priceSOL },
          e.currency,
          e.displayMode,
          e.currentSolPriceInUSD,
        );
      return n && o
        ? `${l} ${a} ${n} at ${o}`
        : n
          ? `${l} ${a} ${n}`
          : o
            ? `${l} ${a} at ${o}`
            : `${l} ${a}`;
    },
    X = (e, t, r) => {
      for (let [l, s] of Object.entries(e)) {
        if (
          !s?.length ||
          r.excludedAddresses.has(l) ||
          r.excludedAddresses.has(s[0].userAddress)
        )
          continue;
        let e = U(l, r.traderUsernames),
          a = e || l.slice(0, 6),
          d = (0, i.P)(l, r.traderProfileImages),
          n = r.kolByWallet?.[l],
          o = "verified" === r.source || I(l, r.verifiedWallets);
        s.forEach((i, s) => {
          let u = W(i.timestamp);
          if (u < r.timeStartMs || u > r.timeEndMs || !(0, k.V)(i)) return;
          let c = N(i, {
            idPrefix: `${r.source}_${l}`,
            prefix: a,
            label: r.label,
            currency: r.currency,
            displayMode: r.displayMode,
            currentSolPriceInUSD: r.currentSolPriceInUSD,
            idx: s,
            colorOverride: r.colorOverride,
            imageUrl: d,
          });
          (t.push(c),
            H({
              chainId: r.chainId,
              currentSolPriceInUSD: r.currentSolPriceInUSD,
              displayName: e,
              imageUrl: d,
              isVerified: o,
              kolEntry: n,
              label: r.label,
              mark: c,
              popoverModels: r.popoverModels,
              profileAddress: l,
              source: r.source,
              trade: i,
            }));
        });
      }
    },
    Y = (e, t, l, s, d, n, o, u, c, m) => {
      let S = 1e3 * e,
        g = 1e3 * t,
        F = [];
      c && f(c, e, t);
      let {
        myTradesEnabled: P,
        devTradesEnabled: q,
        trackedTradesEnabled: R,
        mayhemTradesEnabled: Y,
        calloutsEnabled: Z,
        kolTradesEnabled: J,
        bountiesEnabled: Q,
        followingTradesEnabled: ee = !1,
        verifiedTradesEnabled: et = !1,
      } = s;
      if (!l?.current) return F;
      let {
          activeWalletFilter: er,
          filteredWalletTrades: ei,
          buttonDisplayOptions: el,
          traderProfileImages: es,
          traderUsernames: ea,
          traderIdentities: ed,
        } = l.current,
        en = el?.kolTrades?.kolByWallet,
        eo = el?.verifiedTrades?.verifiedWallets;
      er &&
        ei?.length &&
        ei.forEach((e) => {
          let t = ((e, t, r = "SOL", l = "price", s) => {
            let a,
              d =
                e.timestamp > 1e10
                  ? Math.floor(e.timestamp / 1e3)
                  : e.timestamp,
              n = e.walletId || "",
              o = "buy" === e.type,
              { label: u, prefix: c, displayName: m } = O(n, o, t),
              p = x(n, t),
              f = t?.current.buttonDisplayOptions.kolTrades?.kolByWallet?.[n],
              b =
                "kol" === p
                  ? G({
                      walletAddress: n,
                      kolEntry: f,
                      type: e.type,
                      amountUSD: e.amountUSD,
                      priceUSD: e.priceUSD,
                      priceSOL: e.priceSOL,
                      currency: r,
                      displayMode: l,
                      currentSolPriceInUSD: s ?? 0,
                    })
                  : ((a = L({
                      prefix: c,
                      type: e.type,
                      usdAmount: e.amountUSD || 0,
                      solAmount: e.amountSOL || 0,
                      priceUSD: e.priceUSD || 0,
                      priceSOL: e.priceSOL || 0,
                      currency: r,
                      displayMode: l,
                      currentSolPriceInUSD: s,
                    })),
                    f ? `${a}${T(f)}` : a),
              y = _(p, o),
              S =
                "tracked" === p
                  ? void 0
                  : "kol" === p
                    ? (0, i.H)(n, t?.current?.traderProfileImages)
                    : (0, i.P)(n, t?.current?.traderProfileImages);
            return {
              id: `wallet_${n || e.id}_${e.timestamp}`,
              time: d,
              color: y,
              text: b,
              label: u,
              labelFontColor: "white",
              minSize: 20,
              slotIndexId: e.slotIndexId,
              tradeType: p,
              side: e.type,
              walletAddress: n,
              tx: e.transactionId,
              amountUSD: e.amountUSD,
              amountSOL: e.amountSOL,
              priceUSD: e.priceUSD,
              priceSOL: e.priceSOL,
              currentSolPriceInUSD: s,
              kol: f,
              displayName: m,
              profileAddress: t?.current.traderIdentities?.[n] ?? n,
              isVerified: I(
                n,
                t?.current.buttonDisplayOptions.verifiedTrades?.verifiedWallets,
              ),
              imageUrl: S,
            };
          })(e, l, d, n, o);
          ((t.chainId = m?.chainId), F.push(t), z(c, t.id, t));
        });
      let eu = el?.devTrades?.trades,
        ec = el?.myTrades?.trades,
        em = el?.trackedTrades;
      if (
        (B(
          eu,
          q,
          F,
          (e) => ({
            idPrefix: "dev",
            prefix: "Dev",
            label: "buy" === e.type ? "DB" : "DS",
            source: "dev",
          }),
          {
            currency: d,
            displayMode: n,
            currentSolPriceInUSD: o,
            timeStartMs: S,
            timeEndMs: g,
            respectTimeRange: !1,
            traderProfileImages: es,
            kolByWallet: en,
            traderUsernames: ea,
            traderIdentities: ed,
            verifiedWallets: eo,
            chainId: m?.chainId,
            popoverModels: c,
          },
        ),
        B(
          ec,
          P,
          F,
          (e) => ({
            idPrefix: "my",
            prefix: "You",
            label: "buy" === e.type ? "B" : "S",
            source: "my",
          }),
          {
            currency: d,
            displayMode: n,
            currentSolPriceInUSD: o,
            timeStartMs: S,
            timeEndMs: g,
            respectTimeRange: !0,
            traderProfileImages: es,
            kolByWallet: en,
            traderUsernames: ea,
            traderIdentities: ed,
            verifiedWallets: eo,
            chainId: m?.chainId,
            popoverModels: c,
          },
        ),
        R && em?.tradesByWallet)
      ) {
        let { tradesByWallet: e, trackedWallets: t } = em;
        Object.entries(e).forEach(([e, r]) => {
          let i = t?.find((t) => t.trackedWalletAddress === e);
          i &&
            B(
              r,
              !0,
              F,
              () => ({
                idPrefix: `tracked_${e}`,
                prefix: i.name,
                label: i.emoji,
                source: "tracked",
                displayName: i.name,
              }),
              {
                currency: d,
                displayMode: n,
                currentSolPriceInUSD: o,
                timeStartMs: S,
                timeEndMs: g,
                respectTimeRange: !0,
                kolByWallet: en,
                traderUsernames: ea,
                traderIdentities: ed,
                verifiedWallets: eo,
                chainId: m?.chainId,
                popoverModels: c,
              },
            );
        });
      }
      B(
        el?.mayhemTrades?.trades,
        Y,
        F,
        (e) => ({
          idPrefix: "mayhem",
          prefix: "Mayhem",
          label: "buy" === e.type ? "MB" : "MS",
          source: "mayhem",
        }),
        {
          currency: d,
          displayMode: n,
          currentSolPriceInUSD: o,
          timeStartMs: S,
          timeEndMs: g,
          traderProfileImages: es,
          respectTimeRange: !1,
          colorOverride: (e) => (e ? D : M),
          kolByWallet: en,
          traderUsernames: ea,
          traderIdentities: ed,
          verifiedWallets: eo,
          chainId: m?.chainId,
          popoverModels: c,
        },
      );
      let ep = el?.kolTrades;
      J &&
        ep?.tradesByWallet &&
        ((e, t, r, l) => {
          for (let [s, a] of Object.entries(e)) {
            if (!a?.length) continue;
            let e = a[0].userAddress,
              d = (t) => !!t && (t === s || t === e);
            if (
              d(l.myAddress) ||
              d(l.devAddress) ||
              d(l.mayhemAddress) ||
              l.trackedAddresses.has(s) ||
              (e && l.trackedAddresses.has(e))
            )
              continue;
            let n = t?.[s],
              o = n?.name?.trim() || U(s, l.traderUsernames),
              u = o || s.slice(0, 6),
              c = I(s, l.verifiedWallets),
              m = (0, i.H)(s, l.traderProfileImages);
            a.forEach((e, t) => {
              let a = W(e.timestamp);
              if (a < l.timeStartMs || a > l.timeEndMs || !(0, k.V)(e)) return;
              let d = N(e, {
                idPrefix: `kol_${s}`,
                prefix: u,
                label: i.c,
                currency: l.currency,
                displayMode: l.displayMode,
                currentSolPriceInUSD: l.currentSolPriceInUSD,
                idx: t,
                colorOverride: (e) => (e ? v : $),
                imageUrl: m,
                textOverride: G({
                  walletAddress: s,
                  kolEntry: n,
                  type: e.type,
                  amountUSD: e.amountUSD,
                  priceUSD: e.priceUSD,
                  priceSOL: e.priceSOL,
                  currency: l.currency,
                  displayMode: l.displayMode,
                  currentSolPriceInUSD: l.currentSolPriceInUSD,
                }),
              });
              (r.push(d),
                H({
                  chainId: l.chainId,
                  currentSolPriceInUSD: l.currentSolPriceInUSD,
                  displayName: o,
                  imageUrl: m,
                  isVerified: c,
                  kolEntry: n,
                  label: i.c,
                  mark: d,
                  popoverModels: l.popoverModels,
                  profileAddress: s,
                  source: "kol",
                  trade: e,
                }));
            });
          }
        })(ep.tradesByWallet, ep.kolByWallet, F, {
          currency: d,
          displayMode: n,
          currentSolPriceInUSD: o,
          timeStartMs: S,
          timeEndMs: g,
          traderProfileImages: es,
          myAddress: el?.myTrades?.walletAddress,
          devAddress: el?.devTrades?.walletAddress,
          mayhemAddress: el?.mayhemTrades?.walletAddress,
          trackedAddresses: new Set(
            (el?.trackedTrades?.trackedWallets ?? []).map(
              (e) => e.trackedWalletAddress,
            ),
          ),
          traderUsernames: ea,
          verifiedWallets: eo,
          chainId: m?.chainId,
          popoverModels: c,
        });
      let ef = {
          currency: d,
          displayMode: n,
          currentSolPriceInUSD: o,
          timeStartMs: S,
          timeEndMs: g,
          traderProfileImages: es,
          traderUsernames: ea,
          verifiedWallets: eo,
          kolByWallet: en,
          chainId: m?.chainId,
          popoverModels: c,
        },
        eb = new Set(
          [
            el?.myTrades?.walletAddress,
            el?.devTrades?.walletAddress,
            el?.mayhemTrades?.walletAddress,
            ...(el?.trackedTrades?.trackedWallets ?? []).map(
              (e) => e.trackedWalletAddress,
            ),
            ...Object.keys(en ?? {}),
          ].filter((e) => !!e),
        ),
        ey = el?.followingTrades;
      ee &&
        ey?.tradesByWallet &&
        X(ey.tradesByWallet, F, {
          ...ef,
          source: "following",
          label: i.E,
          colorOverride: (e) => (e ? A : w),
          excludedAddresses: eb,
        });
      let eS = el?.verifiedTrades;
      (et &&
        eS?.tradesByWallet &&
        X(eS.tradesByWallet, F, {
          ...ef,
          source: "verified",
          label: i.t,
          colorOverride: (e) => (e ? v : $),
          excludedAddresses: new Set([
            ...eb,
            ...Object.keys(ey?.followingByWallet ?? {}),
          ]),
        }),
        Z &&
          el?.callouts?.callouts?.length &&
          ((e, t, r) => {
            if (e?.length)
              for (let i of e) {
                let e = C(i.createdAt);
                if (!e || !i.calloutId) continue;
                let l = 1e3 * e;
                if (
                  r.respectTimeRange &&
                  (l < r.timeStartMs || l > r.timeEndMs)
                )
                  continue;
                let s = E(i);
                s && (t.push(s), j(r.popoverModels, s, i));
              }
          })(el.callouts.callouts, F, {
            timeStartMs: S,
            timeEndMs: g,
            respectTimeRange: !0,
            popoverModels: c,
          }),
        Q &&
          el?.bounties?.bounties?.length &&
          ((e, t, i) => {
            if (e?.length)
              for (let l of e) {
                let e = (0, r.b)(l.postedAtMs);
                if (!e || !l.taskId) continue;
                let s = 1e3 * e;
                if (
                  i.respectTimeRange &&
                  (s < i.timeStartMs || s > i.timeEndMs)
                )
                  continue;
                let a = V(l);
                a && (t.push(a), K(i.popoverModels, a, l));
              }
          })(el.bounties.bounties, F, {
            timeStartMs: S,
            timeEndMs: g,
            respectTimeRange: !0,
            popoverModels: c,
          }),
        u &&
          u.length > 0 &&
          u.forEach((e) => {
            let t = !1;
            switch (e.tradeType) {
              case "my":
                t = P;
                break;
              case "dev":
                t = q;
                break;
              case "tracked":
                t = R;
                break;
              case "mayhem":
                t = Y;
                break;
              case "kol":
                t = J;
                break;
              case "following":
                t = ee;
                break;
              case "verified":
                t = et;
                break;
              default:
                t = !1;
            }
            t &&
              (F.push({
                id: e.slotIndexId,
                time: e.time,
                color: e.color,
                text: e.text,
                label: e.label,
                labelFontColor: e.labelFontColor,
                minSize: e.minSize,
                imageUrl: e.imageUrl,
              }),
              (e.chainId = m?.chainId),
              z(c, e.slotIndexId, e));
          }));
      let eh = (({ marks: e, popoverModels: t, threshold: r, barSec: i }) => {
        if (!t || !(0, a.h)(r) || void 0 === i || !Number.isFinite(i) || i <= 0)
          return e;
        let l = (e) => {
            var r, l;
            let s = t.get(String(e.id));
            return s?.kind === "trade" &&
              s.walletAddress &&
              Number.isFinite(e.time)
              ? {
                  key:
                    ((r = s.walletAddress),
                    (l = b(e.time, i)),
                    `${r.startsWith("0x") ? r.toLowerCase() : r}|${l}`),
                  model: { ...s, walletAddress: s.walletAddress },
                }
              : null;
          },
          s = new Map();
        for (let t of e) {
          let e = l(t);
          if (!e) continue;
          let r = s.get(e.key),
            i = { mark: t, model: e.model };
          r ? r.push(i) : s.set(e.key, [i]);
        }
        let d = new Map();
        for (let [e, t] of s) {
          let l = y(t);
          l.length < r || d.set(e, h({ members: l, barSec: i }));
        }
        if (0 === d.size) return e;
        let n = new Set(),
          o = [];
        for (let r of e) {
          let e = l(r)?.key,
            i = void 0 === e ? void 0 : d.get(e);
          if (!i || void 0 === e) {
            o.push(r);
            continue;
          }
          (t.delete(String(r.id)),
            n.has(e) || (n.add(e), o.push(i.mark), t.set(i.model.id, i.model)));
        }
        return o;
      })({
        marks: F,
        popoverModels: c,
        threshold: l.current.markerGroupThreshold ?? a.p,
        barSec: m?.barSec,
      });
      return (
        m?.includeNativeTooltipMarkerIds &&
          ((e) => {
            for (let t of e)
              t.text = `${t.text}
${p}${t.id}`;
          })(eh),
        eh
      );
    },
    Z = (e) => {
      if (!e?.length) return null;
      let t = 1 / 0;
      for (let r of e)
        Number.isFinite(r.timestamp) && r.timestamp < t && (t = r.timestamp);
      return Number.isFinite(t) ? Math.floor(t / 1e3) : null;
    },
    J = (e, t) =>
      null === t ? [] : e.filter((e) => Number.isFinite(e.time) && e.time >= t),
    Q = () => {
      let e = new Map(),
        t = -1 / 0;
      return {
        inspect: (r, i, l, s = null) => {
          let a = i >= t;
          a && (t = i);
          let d = {
            staleHeld: !1,
            isFullRange: a,
            fullRange: { from: 0, to: t },
          };
          if (0 === e.size) return d;
          let n = new Set(l.map((e) => String(e.id)));
          for (let [t, l] of e)
            if (
              (null !== s && l < s) ||
              (l >= r && (a || l < i) && !n.has(t))
            ) {
              d.staleHeld = !0;
              break;
            }
          return d;
        },
        commit: (t, r) => {
          for (let i of (r && e.clear(), t)) e.set(String(i.id), i.time);
        },
      };
    };
  e.s(
    [
      "o",
      0,
      { bars: 1, timescale: 2 },
      "L",
      0,
      (
        e,
        t,
        r,
        i,
        s,
        u,
        m,
        p,
        f,
        b,
        y,
        S,
        h,
        k,
        D,
        M,
        v = "Pump",
        $ = { includeSeconds: !0 },
        A,
        w,
      ) => {
        let U = () =>
            g.filter(
              (e) =>
                ($.includeSeconds || !e.endsWith("S")) &&
                (!1 !== $.includeSixHour || "360" !== e),
            ),
          I = Q(),
          T = Q(),
          x = () => y?.current?.bubblePlacement ?? "candles",
          O = () => (0, a.h)(y?.current?.markerGroupThreshold ?? a.p),
          _ = new Map();
        return {
          onReady: (e) => {
            setTimeout(
              () =>
                e({
                  supported_resolutions: U(),
                  supports_time: !0,
                  supports_marks: !0,
                  supports_timescale_marks: !0,
                }),
              0,
            );
          },
          searchSymbols: () => {},
          resolveSymbol: (e, t) => {
            let i = l(e),
              s = {
                ticker: e,
                name: i,
                description: i,
                type: "crypto",
                session: "24x7",
                timezone: "Etc/UTC",
                exchange: "function" == typeof v ? v() : v,
                minmov: 1,
                has_intraday: !0,
                has_daily: !0,
                daily_multipliers: ["1"],
                has_seconds: $.includeSeconds,
                has_weekly_and_monthly: !0,
                weekly_multipliers: ["1"],
                supported_resolutions: U(),
                volume_precision: 8,
              };
            ("marketcap" === r ? (s.pricescale = 100) : (s.pricescale = 1e9),
              setTimeout(() => t(s), 0));
          },
          getBars: async (t, r, i, l, a) => {
            await P({
              symbolInfo: t,
              resolution: r,
              periodParams: i,
              onHistoryCallback: l,
              onErrorCallback: a,
              fetchData: e,
              dataCache: s,
              olderPageFailures: _,
            });
          },
          subscribeBars: (e, t, r, l) => {
            i.set(l, r);
            let s = (0, d.t)(t);
            m.has(s) || m.set(s, new Map());
            let a = u.get(s);
            a && r(a);
          },
          unsubscribeBars: (e) => {
            i.delete(e);
          },
          getMarks: (e, i, l, a, o) => {
            let u = S(),
              c = b(),
              m = Z(s.get(f.current)),
              p =
                void 0 !== o ? n({ resolution: o }) : (0, d.B)(f.current) / 1e3,
              g = (e, i) =>
                J(Y(e, i, y, u, t, r, h, c, k, { ...D, barSec: p }), m),
              v = "axis" === x(),
              $ = v ? [] : g(i, l),
              w = I.inspect(i, l, $, m),
              U = w.staleHeld && (A?.("bars") ?? !1);
            ((U || O()) &&
              !w.isFullRange &&
              !v &&
              ($ = g(w.fullRange.from, w.fullRange.to)),
              v || M?.(),
              I.commit($, U),
              a($));
          },
          getTimescaleMarks: (e, i, l, a, d) => {
            let u = x(),
              m = n({ resolution: d }),
              p = Z(s.get(f.current)),
              g = (e, i) =>
                "candles" === u
                  ? { ticks: [], members: new Map() }
                  : (({ marks: e, resolutionSec: t, popoverModels: r }) => {
                      let i = Number.isFinite(t) && t > 0 ? t : 1,
                        l = new Map();
                      for (let t of e) {
                        if (!Number.isFinite(t.time)) continue;
                        let e = String(t.id),
                          s = o[c({ id: e, model: r.get(e) })],
                          a = Math.floor(t.time / i) * i,
                          d = l.get(a);
                        d
                          ? d.push({ id: e, mark: t, rank: s })
                          : l.set(a, [{ id: e, mark: t, rank: s }]);
                      }
                      let s = [];
                      for (let [e, t] of l) {
                        t.sort((e, t) => t.mark.time - e.mark.time);
                        let r = t.reduce(
                          (e, t) => (!e || t.rank < e.rank ? t : e),
                          void 0,
                        );
                        r && s.push({ time: e, members: t, winner: r });
                      }
                      let a =
                        s.length > 600
                          ? s
                              .sort(
                                (e, t) =>
                                  e.winner.rank - t.winner.rank ||
                                  t.time - e.time,
                              )
                              .slice(0, 600)
                          : s;
                      a.sort((e, t) => e.time - t.time);
                      let d = new Map();
                      return {
                        ticks: a.map((e) => {
                          let t = (({ time: e, members: t, winner: r }) => {
                            let i,
                              l,
                              s = t
                                .slice(0, 5)
                                .map(({ mark: e }) => e.text || e.label),
                              a = t.length - s.length;
                            return {
                              id: (({ bucketSec: e }) => `ts_${e}`)({
                                bucketSec: e,
                              }),
                              time: e,
                              shape: "circle",
                              color:
                                "string" == typeof (i = r.mark).color
                                  ? i.color
                                  : i.color.border,
                              label:
                                1 === t.length
                                  ? r.mark.label
                                  : (l = t.length) > 9
                                    ? "9+"
                                    : String(l),
                              labelFontColor: "#FFFFFF",
                              tooltip: a > 0 ? [...s, `+${a} more`] : s,
                            };
                          })(e);
                          return (
                            d.set(
                              String(t.id),
                              e.members.map((e) => e.id),
                            ),
                            t
                          );
                        }),
                        members: d,
                      };
                    })({
                      marks: J(
                        Y(e, i, y, S(), t, r, h, b(), k, { ...D, barSec: m }),
                        p,
                      ),
                      resolutionSec: m,
                      popoverModels: k ?? new Map(),
                    }),
              v = g(i, l),
              $ = T.inspect(i, l, v.ticks, p),
              U = $.staleHeld && (A?.("timescale") ?? !1);
            if (
              ((U || O()) &&
                !$.isFullRange &&
                "candles" !== u &&
                (v = g($.fullRange.from, $.fullRange.to)),
              "candles" !== u && M?.(),
              w)
            )
              for (let [e, t] of (U && w.clear(), v.members)) w.set(e, t);
            (T.commit(v.ticks, U), a(v.ticks));
          },
        };
      },
      "H",
      0,
      G,
      "S",
      0,
      T,
      "j",
      0,
      (e, t) => U(e, t) || e.slice(0, 6),
      "I",
      0,
      P,
      "C",
      0,
      (e, t, r = "SOL", l = "price", s) => {
        let a,
          d = new Date(e.timestamp).getTime() / 1e3,
          n = "buy" === e.type,
          o = parseFloat(e.amountSol || "0"),
          u = parseFloat(e.amountUsd || "0"),
          c = parseFloat(e.priceUsd || "0"),
          m = parseFloat(e.priceSol || "0"),
          { label: p, prefix: f, displayName: b } = O(e.userAddress, n, t),
          y = x(e.userAddress, t),
          S =
            t?.current.buttonDisplayOptions.kolTrades?.kolByWallet?.[
              e.userAddress
            ],
          h =
            "kol" === y
              ? G({
                  walletAddress: e.userAddress,
                  kolEntry: S,
                  type: e.type,
                  amountUSD: u,
                  priceUSD: c,
                  priceSOL: m,
                  currency: r,
                  displayMode: l,
                  currentSolPriceInUSD: s ?? 0,
                })
              : ((a = L({
                  prefix: f,
                  type: e.type,
                  usdAmount: u,
                  solAmount: o,
                  priceUSD: c,
                  priceSOL: m,
                  currency: r,
                  displayMode: l,
                  currentSolPriceInUSD: s,
                })),
                S ? `${a}${T(S)}` : a),
          k = _(y, n),
          g =
            "tracked" === y
              ? void 0
              : "kol" === y
                ? (0, i.H)(
                    S?.walletAddress ?? e.userAddress,
                    t?.current?.traderProfileImages,
                  )
                : (0, i.P)(e.userAddress, t?.current?.traderProfileImages);
        return {
          id: `unified_${e.tx}_${e.slotIndexId}`,
          time: d,
          color: k,
          text: h,
          label: p,
          labelFontColor: "white",
          minSize: 20,
          slotIndexId: e.slotIndexId,
          tradeType: y,
          side: e.type,
          walletAddress: e.userAddress,
          tx: e.tx,
          amountUSD: u,
          amountSOL: o,
          priceUSD: c,
          priceSOL: m,
          currentSolPriceInUSD: s,
          kol: S,
          displayName: b,
          profileAddress:
            t?.current.traderIdentities?.[e.userAddress] ?? e.userAddress,
          isVerified: I(
            e.userAddress,
            t?.current.buttonDisplayOptions.verifiedTrades?.verifiedWallets,
          ),
          imageUrl: g,
        };
      },
    ],
    839982,
  );
};
