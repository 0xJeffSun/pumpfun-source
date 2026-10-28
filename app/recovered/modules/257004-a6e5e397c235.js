// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(528600),
    i = e.i(4911),
    a = e.i(639374);
  let l = ({ calloutId: e, authorWallet: t }) => {
    if (!e?.trim()) return;
    let i = t?.trim();
    if (i && (0, a.f)(i)) return i;
  };
  e.s(
    [
      "O",
      0,
      ({ calloutId: e, authorWallet: t }) => {
        let i = l({ calloutId: e, authorWallet: t });
        if (i && e) return { calloutUser: i, calloutId: e };
      },
      "T",
      0,
      l,
    ],
    266610,
  );
  var r = e.i(503630),
    n = e.i(605587);
  let o = (e) =>
      [e?.canonical_svm_wallet, e?.address].find(
        (e) => "string" == typeof e && (0, a.f)(e),
      ),
    s = async (e) => {
      if ((0, a.f)(e)) return e;
      try {
        return o(
          await (0, t.e)({
            clientServerUrl: (0, r.R)(),
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
        isPrivyEmbeddedSigner: a,
      }) => {
        if ((i || a) && e && (0, n.I)(e.mint, t))
          return l({
            calloutId: e.impression.calloutId,
            authorWallet: e.impression.calloutAuthorWallet,
          });
      },
      "r",
      0,
      ({ authorId: e, authorCcUserId: t }) => {
        let l = e?.trim();
        if (l && (0, a.f)(l)) return l;
        let r = t?.trim();
        return r || (l && (0, i.f)(l, { strict: !1 }) ? l : void 0);
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
