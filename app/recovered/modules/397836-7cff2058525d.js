// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(292686),
    r = e.i(26101),
    n = e.i(806846);
  function i(e) {
    let r = { sourceElementType: t.eD.BUTTON, ownershipGroup: "BOUNTIES" };
    switch (e) {
      case "global-sidebar":
        return {
          ...r,
          sourceScreen: t.Ae.UNSPECIFIED,
          sourceElement: t.k9.GLOBAL_SIDE_BAR,
        };
      case "global-nav":
        return {
          ...r,
          sourceScreen: t.Ae.UNSPECIFIED,
          sourceElement: t.k9.UNSPECIFIED,
        };
      case "creation-modal":
        return {
          ...r,
          sourceScreen: t.Ae.BOUNTY_CREATE,
          sourceElement: t.k9.BOUNTY_CREATION_MODAL,
        };
      case "detail":
        return {
          ...r,
          sourceScreen: t.Ae.BOUNTY_DETAILS,
          sourceElement: t.k9.UNSPECIFIED,
        };
      case "home":
        return {
          ...r,
          sourceScreen: t.Ae.HOME,
          sourceElement: t.k9.UNSPECIFIED,
        };
      default:
        return {
          ...r,
          sourceScreen: t.Ae.BOUNTIES,
          sourceElement: t.k9.UNSPECIFIED,
        };
    }
  }
  function o(e) {
    return {
      sourceScreen: "create" === e ? t.Ae.BOUNTY_CREATE : t.Ae.BOUNTY_DETAILS,
      sourceElement: t.k9.UPSELL_CARD_GENERIC,
      sourceElementType: t.eD.MODAL,
      ownershipGroup: "GROWTH",
    };
  }
  e.s([
    "s",
    0,
    function (e) {
      switch (e) {
        case "open":
          return t.nk.OPEN;
        case "done":
          return t.nk.PAID;
        default:
          return t.nk.UNSPECIFIED;
      }
    },
    "K",
    0,
    function (e) {
      (0, n.j)(
        (0, r.yC)({
          bountyId: e.bountyId,
          rewardToken: e.rewardToken,
          rewardAmount: e.rewardAmount,
          amountUsd: e.amountUsd,
        }),
        i("detail"),
      );
    },
    "G",
    0,
    function (e) {
      (0, n.j)(
        (0, r.Zy)({
          title: e.title,
          summary: e.summary,
          hasMedia: e.hasMedia,
          rewardToken: e.rewardToken,
          rewardSplit: e.rewardSplit,
          rewardTotal: e.rewardTotal,
          amountUsd: e.amountUsd,
          bountyId: e.bountyId,
        }),
        i("creation-modal"),
      );
    },
    "A",
    0,
    function (e) {
      (0, n.j)(
        (0, r.lr)({
          bountyId: e.bountyId,
          ...(void 0 !== e.bountyStatus
            ? { bountyStatus: e.bountyStatus }
            : {}),
        }),
        i("detail"),
      );
    },
    "L",
    0,
    function (e) {
      (0, n.j)(
        (0, r.gt)({
          title: e.title,
          summary: e.summary,
          hasMedia: e.hasMedia,
          rewardToken: e.rewardToken,
          rewardSplit: e.rewardSplit,
          rewardTotal: e.rewardTotal,
          amountUsd: e.amountUsd,
        }),
        i("creation-modal"),
      );
    },
    "P",
    0,
    function (e) {
      let i = (0, r.hS)({
        upsellType: t.Nb.PUMP_APP,
        interactionType:
          "dismiss" === e.interactionType ? t.EG.DISMISS : t.EG.CLICK,
      });
      (0, n.j)(i, o(e.surface));
    },
    "k",
    0,
    function (e) {
      (0, n.j)(
        (0, r.iL)({
          interactionType: t.EG.CLICK,
          bountyId: e.bountyId,
          bountyStatus: e.bountyStatus,
        }),
        i(e.source),
      );
    },
    "J",
    0,
    function (e) {
      (0, n.j)((0, r.xC)({ interactionType: t.EG.CLICK }), i(e.source));
    },
    "B",
    0,
    function (e) {
      let i = (0, r.hS)({
        upsellType: t.Nb.PUMP_APP,
        interactionType: t.EG.VIEWED,
      });
      (0, n.j)(i, o(e.surface));
    },
    "$",
    0,
    function (e) {
      (0, n.j)((0, r.EN)({ interactionType: t.EG.CLICK }), i(e.source));
    },
  ]);
};
