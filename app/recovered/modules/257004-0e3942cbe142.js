// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(528600),
    l = e.i(4911),
    r = e.i(639374);
  let i = ({ calloutId: e, authorWallet: t }) => {
    if (!e?.trim()) return;
    let l = t?.trim();
    if (l && (0, r.f)(l)) return l;
  };
  e.s(
    [
      "O",
      0,
      ({ calloutId: e, authorWallet: t }) => {
        let l = i({ calloutId: e, authorWallet: t });
        if (l && e) return { calloutUser: l, calloutId: e };
      },
      "T",
      0,
      i,
    ],
    266610,
  );
  var a = e.i(503630),
    s = e.i(605587);
  let n = (e) =>
      [e?.canonical_svm_wallet, e?.address].find(
        (e) => "string" == typeof e && (0, r.f)(e),
      ),
    o = async (e) => {
      if ((0, r.f)(e)) return e;
      try {
        return n(
          await (0, t.e)({
            clientServerUrl: (0, a.R)(),
            userIdentifier: e,
            fetchOptions: { signal: AbortSignal.timeout(3500) },
          }),
        );
      } catch {
        return;
      }
    };
  e.s(
    [
      "$",
      0,
      ({
        lastClickImpression: e,
        mint: t,
        sponsored: l,
        isPrivyEmbeddedSigner: r,
      }) => {
        if ((l || r) && e && (0, s.I)(e.mint, t))
          return i({
            calloutId: e.impression.calloutId,
            authorWallet: e.impression.calloutAuthorWallet,
          });
      },
      "r",
      0,
      ({ authorId: e, authorCcUserId: t }) => {
        let i = e?.trim();
        if (i && (0, r.f)(i)) return i;
        let a = t?.trim();
        return a || (i && (0, l.f)(i, { strict: !1 }) ? i : void 0);
      },
      "M",
      0,
      o,
      "n",
      0,
      n,
    ],
    257004,
  );
};
