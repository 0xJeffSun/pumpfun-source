// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, o) => {
  var n =
    (e.e && e.e.__rest) ||
    function (e, t) {
      var o = {};
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) &&
          0 > t.indexOf(n) &&
          (o[n] = e[n]);
      if (null != e && "function" == typeof Object.getOwnPropertySymbols)
        for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++)
          0 > t.indexOf(n[i]) &&
            Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
            (o[n[i]] = e[n[i]]);
      return o;
    };
  (Object.defineProperty(o, "__esModule", { value: !0 }),
    (o.onUserEmailSupplied =
      o.showConversation =
      o.showTicket =
      o.startChecklist =
      o.startSurvey =
      o.showNews =
      o.showArticle =
      o.startTour =
      o.getVisitorId =
      o.trackEvent =
      o.onUnreadCountChange =
      o.onShow =
      o.onHide =
      o.showNewMessage =
      o.showMessages =
      o.showSpace =
      o.show =
      o.hide =
      o.update =
      o.shutdown =
      o.boot =
      o.Intercom =
        void 0));
  let i = e.r(178746),
    r = e.r(43489),
    a = (e, ...t) => {
      window.Intercom
        ? window.Intercom(e, ...t)
        : console.warn(
            "Please ensure Intercom is setup and running on client-side!",
          );
    };
  ((o.Intercom = (e) => {
    if ("object" != typeof e)
      return void console.warn(
        "Intercom initialiser called with invalid parameters.",
      );
    let { region: t = "us" } = e,
      o = n(e, ["region"]);
    "u" > typeof window &&
      !r.ref &&
      ((window.intercomSettings = Object.assign(Object.assign({}, o), {
        api_base: i.regionAPIs.get(t),
      })),
      (0, r.init)());
  }),
    (o.default = o.Intercom),
    (o.boot = (e) => a("boot", e)),
    (o.shutdown = () => a("shutdown")),
    (o.update = (e) => a("update", e)),
    (o.hide = () => a("hide")),
    (o.show = () => a("show")),
    (o.showSpace = (e) => a("showSpace", e)),
    (o.showMessages = () => a("showMessages")),
    (o.showNewMessage = (e) => a("showNewMessage", e)),
    (o.onHide = (e) => a("onHide", e)),
    (o.onShow = (e) => a("onShow", e)),
    (o.onUnreadCountChange = (e) => a("onUnreadCountChange", e)),
    (o.trackEvent = (...e) => a("trackEvent", ...e)),
    (o.getVisitorId = () => a("getVisitorId")),
    (o.startTour = (e) => a("startTour", e)),
    (o.showArticle = (e) => a("showArticle", e)),
    (o.showNews = (e) => a("showNews", e)),
    (o.startSurvey = (e) => a("startSurvey", e)),
    (o.startChecklist = (e) => a("startChecklist", e)),
    (o.showTicket = (e) => a("showTicket", e)),
    (o.showConversation = (e) => a("showConversation", e)),
    (o.onUserEmailSupplied = (e) => a("onUserEmailSupplied", e)));
};
