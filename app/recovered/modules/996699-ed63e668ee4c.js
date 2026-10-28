// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(935258);
  let r = /\b(PSA|BGS|CGC|SGC|TAG|ACE|ARS)\s*(\d{1,2}(?:\.\d)?)\b/i,
    i = /#\s*([A-Z0-9-]+)/i,
    l = /^\s*((?:19|20)\d{2})\b/,
    a = /^([A-Za-z][A-Za-z ]{1,20})\/(?=\S)/,
    o = (e) => {
      let t = e.replace(/\s+/g, " ").trim(),
        n = t.match(r),
        o = n ? `${(n[1] ?? "").toUpperCase()} ${n[2] ?? ""}` : null;
      if (t.includes("·")) {
        let [e = t, ...n] = t
            .split("·")
            .map((e) => e.trim())
            .filter(Boolean)
            .filter((e) => !r.test(e)),
          i = n.length > 0 ? s(n.join(" · ")) : null;
        return { name: u(e), set: i, grade: o };
      }
      let c = t.match(l)?.[1] ?? null,
        d = t.match(i),
        m = d ? `#${d[1]}` : null,
        f = d ? t.slice((d.index ?? 0) + d[0].length) : t.replace(l, ""),
        p = n ? f.search(r) : -1,
        h = (p >= 0 ? f.slice(0, p) : f).trim(),
        g = p >= 0 && n ? f.slice(p + n[0].length).trim() : "",
        y = h.match(a)?.[1] ?? null,
        v = y ? h.slice(y.length + 1).trim() : h,
        b = [c, y ? u(y) : null, g ? s(g) : null, m].filter(
          (e) => null !== e && "" !== e,
        );
      return {
        name: u(v || t),
        set: b.length > 0 ? b.join(" · ") : null,
        grade: o,
      };
    },
    s = (e) =>
      u(e.replace(/\|.*$/, "").trim())
        .replace(/\s+pok[eé]mon$/i, "")
        .replace(/\bpok[eé]mon\b/i, "Pokémon")
        .replace(/\s+#/, " · #")
        .trim(),
    u = (e) =>
      e !== e.toUpperCase()
        ? e
        : e
            .toLowerCase()
            .replace(/(^|[\s/(-])([a-z])/g, (e, t, n) => t + n.toUpperCase())
            .replace(/\b(Ex|Gx|Vmax|Vstar|V|Xy|Sm|Sv|Bw|Dp|Tcg)\b/g, (e) =>
              e.toUpperCase(),
            ),
    c = (e) => {
      if ("string" != typeof e) return null;
      let t = e.trim();
      return "" === t ? null : t;
    },
    d = /(\d{1,2}(?:\.\d)?)\s*$/,
    m = async ({ nftAddress: e, signal: t }) => {
      let n,
        r = await fetch(
          `https://api.collectorcrypt.com/cards/publicNft/${encodeURIComponent(e)}`,
          { headers: { Accept: "application/json" }, signal: t },
        );
      if (404 === r.status) return null;
      if (!r.ok) throw Error(`Collector Crypt ${r.status} for card ${e}`);
      let i = await r.json();
      if (!("object" == typeof i && null !== i && !Array.isArray(i)))
        throw Error(`Collector Crypt served no card row for ${e}`);
      return (
        (n = i.images ?? {}),
        {
          nftAddress: c(i.nftAddress) ?? e,
          name: ((e) => {
            let t = c(e.gemrateCardName);
            if (null !== t) return t;
            let n = c(e.itemName);
            return null === n ? null : o(n).name || n;
          })(i),
          grade: ((e) => {
            let t = c(e.gradingCompany),
              n = c(e.grade),
              r = n?.match(d)?.[1];
            if (null !== t && void 0 !== r) return `${t.toUpperCase()} ${r}`;
            let i = c(e.itemName);
            return (null === i ? null : o(i).grade) ?? n;
          })(i),
          setName: c(i.set),
          image: ((...e) => {
            for (let t of e) {
              let e = c(t);
              if (null !== e) return e;
            }
            return null;
          })(n.frontS, n.frontM, n.front, i.frontImage),
          priceUsd: ((e) => {
            if (null == e || "" === e) return null;
            let t = "number" == typeof e ? e : Number(e);
            return Number.isFinite(t) && t > 0 ? t : null;
          })(i.insuredValue),
        }
      );
    };
  function f(e) {
    return {
      queryKey: ["collectibles", "collectorCryptCard", e],
      queryFn: (t) => {
        let { signal: n } = t;
        return m({ nftAddress: e, signal: n });
      },
      staleTime: 6e5,
      retry: !1,
      refetchOnWindowFocus: !1,
    };
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let r,
          i,
          l,
          a = (0, t.c)(7);
        a[0] !== e
          ? ((r = (t) => {
              let n = new Map(),
                r = !1;
              return (
                t.forEach((t, i) => {
                  let l = e[i];
                  void 0 !== l &&
                    (t.isSuccess
                      ? n.set(l, t.data)
                      : t.isError
                        ? n.set(l, null)
                        : (r = !0));
                }),
                { cardByMint: n, isPending: r }
              );
            }),
            (a[0] = e),
            (a[1] = r))
          : (r = a[1]);
        let o = r;
        return (
          a[2] !== e ? ((i = e.map(f)), (a[2] = e), (a[3] = i)) : (i = a[3]),
          a[4] !== o || a[5] !== i
            ? ((l = { queries: i, combine: o }),
              (a[4] = o),
              (a[5] = i),
              (a[6] = l))
            : (l = a[6]),
          (0, n.f)(l)
        );
      },
    ],
    996699,
  );
};
