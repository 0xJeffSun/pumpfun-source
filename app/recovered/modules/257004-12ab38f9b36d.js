// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(528600),
    n = e.i(4911),
    r = e.i(639374);
  let i = ({ calloutId: e, authorWallet: t }) => {
    if (!e?.trim()) return;
    let n = t?.trim();
    if (n && (0, r.f)(n)) return n;
  };
  e.s(
    [
      "O",
      0,
      ({ calloutId: e, authorWallet: t }) => {
        let n = i({ calloutId: e, authorWallet: t });
        if (n && e) return { calloutUser: n, calloutId: e };
      },
      "T",
      0,
      i,
    ],
    266610,
  );
  var a = e.i(503630),
    s = e.i(605587);
  let l = (e) =>
      [e?.canonical_svm_wallet, e?.address].find(
        (e) => "string" == typeof e && (0, r.f)(e),
      ),
    o = async (e) => {
      if ((0, r.f)(e)) return e;
      try {
        return l(
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
        sponsored: n,
        isPrivyEmbeddedSigner: r,
      }) => {
        if ((n || r) && e && (0, s.I)(e.mint, t))
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
        return a || (i && (0, n.f)(i, { strict: !1 }) ? i : void 0);
      },
      "M",
      0,
      o,
      "n",
      0,
      l,
    ],
    257004,
  );
};
