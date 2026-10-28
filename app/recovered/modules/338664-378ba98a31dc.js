// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(406288);
  let r = /\b(PSA|BGS|CGC|SGC|TAG|ACE|ARS)\s*(\d{1,2}(?:\.\d)?)\b/i,
    l = /#\s*([A-Z0-9-]+)/i,
    i = /^\s*((?:19|20)\d{2})\b/,
    a = /^([A-Za-z][A-Za-z ]{1,20})\/(?=[A-Za-z0-9])/,
    n = /\s*\([^)]*$/,
    s = /[\s/·,:;-]+$/,
    o = (e) => e.replace(n, "").replace(s, "").trim(),
    d = (e) => {
      let t = e.replace(/\s+/g, " ").trim(),
        n = t.match(r),
        s = n ? `${(n[1] ?? "").toUpperCase()} ${n[2] ?? ""}` : null;
      if (t.includes("·")) {
        let [e = t, ...l] = t
            .split("·")
            .map((e) => e.trim())
            .filter(Boolean)
            .filter((e) => !r.test(e)),
          i = l.length > 0 ? u(l.join(" · ")) : null;
        return { name: c(o(e) || e), set: i, grade: s };
      }
      let d = t.match(i)?.[1] ?? null,
        m = t.match(l),
        p = m ? `#${m[1]}` : null,
        h = m ? t.slice((m.index ?? 0) + m[0].length) : t.replace(i, ""),
        f = n ? h.search(r) : -1,
        g = (f >= 0 ? h.slice(0, f) : h).trim(),
        y = f >= 0 && n ? h.slice(f + n[0].length).trim() : "",
        b = g.match(a)?.[1] ?? null,
        v = b ? g.slice(b.length + 1).trim() : g,
        w = o(v) || v,
        x = [d, b ? c(b) : null, y ? u(y) : null, p].filter(
          (e) => null !== e && "" !== e,
        );
      return {
        name: c(w || t),
        set: x.length > 0 ? x.join(" · ") : null,
        grade: s,
      };
    },
    u = (e) =>
      c(e.replace(/\|.*$/, "").trim())
        .replace(/\s+pok[eé]mon$/i, "")
        .replace(/\bpok[eé]mon\b/i, "Pokémon")
        .replace(/\s+#/, " · #")
        .trim(),
    c = (e) =>
      e !== e.toUpperCase()
        ? e
        : e
            .toLowerCase()
            .replace(/(^|[\s/(-])([a-z])/g, (e, t, r) => t + r.toUpperCase())
            .replace(/\b(Ex|Gx|Vmax|Vstar|V|Xy|Sm|Sv|Bw|Dp|Tcg)\b/g, (e) =>
              e.toUpperCase(),
            );
  e.s(
    [
      "N",
      0,
      ({ set: e, serial: t, year: r }) => {
        let l = [
          e?.trim() ? u(e) : r && r > 0 ? String(r) : null,
          t?.trim() ? `#${t.trim()}` : null,
        ].filter((e) => null !== e);
        return l.length > 0 ? l.join(" · ") : null;
      },
      "O",
      0,
      d,
    ],
    444158,
  );
  let m = (e) => (void 0 === e ? {} : { provider: e });
  e.s(
    [
      "v",
      0,
      (e) => ({
        nftAddress: e.nftAddress,
        cardName: e.name,
        itemName: null,
        category: null,
        set: null,
        year: null,
        serial: null,
        grade: e.grade ?? null,
        gradingCompany: e.gradingCompany ?? null,
        certNumber: null,
        insuredValueUsd: e.priceUsd,
        isHorizontal: !1,
        setUrl: null,
        frontImage: e.image ?? null,
        thumbImage: e.image ?? null,
        backImage: null,
        lastTransferredAtMs: null,
        isCore: !0,
      }),
      "B",
      0,
      (e, t) => ({
        nftAddress: e.nftAddress,
        name: e.name || null,
        image: e.detailImage ?? e.pocketImage,
        priceUsd: e.priceUsd,
        grade: e.grade,
        gradingCompany: e.gradingCompany,
        ...(void 0 === t ? {} : { rarity: t }),
        ...(void 0 === e.provider ? {} : { provider: e.provider }),
      }),
      "A",
      0,
      (e) => ({
        nftAddress: e.nftAddress,
        name: e.name,
        image: e.image,
        priceUsd: e.markUsd,
        grade: e.grade,
        ...m((0, t.W)(e.provider) ?? void 0),
      }),
      "t",
      0,
      (e) => ({
        nftAddress: e.nftAddress,
        name: e.name,
        image: e.image,
        priceUsd: e.marketValueUsd,
        grade: e.grade,
      }),
      "_",
      0,
      (e, t, r) => {
        let l = d(e.name);
        return {
          nftAddress: e.nftAddress,
          name: l.name || e.name,
          image: e.image,
          priceUsd: e.priceUsd > 0 ? e.priceUsd : null,
          rarity: e.rarity,
          grade: l.grade,
          pack: { packType: t, relation: "inside" },
          ...m(r),
        };
      },
      "m",
      0,
      (e, t, r) => {
        let l = d(e.name);
        return {
          nftAddress: e.nftAddress,
          name: l.name || e.name,
          image: e.image,
          priceUsd: e.priceUsd > 0 ? e.priceUsd : null,
          rarity: "epic",
          grade: l.grade,
          pack: { packType: t, relation: "pulled" },
          ...m(r),
        };
      },
      "G",
      0,
      (e, t) => (e?.rarity === void 0 ? (t ?? null) : e.rarity),
    ],
    338664,
  );
};
