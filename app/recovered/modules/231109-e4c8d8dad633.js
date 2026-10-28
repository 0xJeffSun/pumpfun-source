// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502);
  let i = {
    ACCOUNT_TABS: [
      { label: "Tokens" },
      { label: "NFTs" },
      { label: "Activity" },
    ],
    SECURE_SITE_ORIGIN:
      (void 0 !== t.default && void 0 !== t.default.env
        ? t.default.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN
        : void 0) || "https://secure.walletconnect.org",
    VIEW_DIRECTION: { Next: "next", Prev: "prev" },
    DEFAULT_CONNECT_METHOD_ORDER: ["email", "social", "wallet"],
    ANIMATION_DURATIONS: {
      HeaderText: 120,
      ModalHeight: 150,
      ViewTransition: 150,
    },
  };
  e.s(["f", 0, i]);
};
