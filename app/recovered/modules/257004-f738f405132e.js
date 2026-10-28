// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(528600),
    i = e.i(4911),
    r = e.i(639374);
  let a = ({ calloutId: e, authorWallet: t }) => {
    if (!e?.trim()) return;
    let i = t?.trim();
    if (i && (0, r.f)(i)) return i;
  };
  e.s(
    [
      "O",
      0,
      ({ calloutId: e, authorWallet: t }) => {
        let i = a({ calloutId: e, authorWallet: t });
        if (i && e) return { calloutUser: i, calloutId: e };
      },
      "T",
      0,
      a,
    ],
    266610,
  );
  var n = e.i(503630),
    l = e.i(605587);
  let o = (e) =>
      [e?.canonical_svm_wallet, e?.address].find(
        (e) => "string" == typeof e && (0, r.f)(e),
      ),
    s = async (e) => {
      if ((0, r.f)(e)) return e;
      try {
        return o(
          await (0, t.e)({
            clientServerUrl: (0, n.R)(),
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
        sponsored: i,
        isPrivyEmbeddedSigner: r,
      }) => {
        if ((i || r) && e && (0, l.I)(e.mint, t))
          return a({
            calloutId: e.impression.calloutId,
            authorWallet: e.impression.calloutAuthorWallet,
          });
      },
      "r",
      0,
      ({ authorId: e, authorCcUserId: t }) => {
        let a = e?.trim();
        if (a && (0, r.f)(a)) return a;
        let n = t?.trim();
        return n || (a && (0, i.f)(a, { strict: !1 }) ? a : void 0);
      },
      "M",
      0,
      s,
      "n",
      0,
      o,
    ],
    257004,
  );
};
