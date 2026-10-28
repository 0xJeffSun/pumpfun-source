// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(352386),
    n = e.i(933185),
    s = e.i(748117);
  function i({ src: e, ...r }) {
    return (0, t.jsx)("img", { src: e, ...r, style: { display: "none" } });
  }
  let o = (0, r.createContext)({
    currentScreen: null,
    lastScreen: null,
    navigate: s.n,
    navigateBack: s.n,
    resetNavigation: s.n,
    setModalData: s.n,
    onUserCloseViaDialogOrKeybindRef: void 0,
  });
  e.s([
    "M",
    0,
    (e) => {
      let s = (0, n.a)(),
        [a, u] = (0, r.useState)(e.initialScreen),
        l = (0, r.useRef)(null);
      ((0, r.useEffect)(() => {
        e.open || (l.current = null);
      }, [e.open]),
        (0, r.useEffect)(() => {
          l.current = null;
        }, [e.initialScreen]));
      let c = {
        data: e.data,
        setModalData: e.setModalData,
        currentScreen: e.initialScreen,
        lastScreen: a,
        navigate: (t, r = !0) => {
          (e.setInitialScreen(t), r && u(e.initialScreen));
        },
        navigateBack: () => {
          e.setInitialScreen(a);
        },
        resetNavigation: () => {
          (e.setInitialScreen(null), u(null));
        },
        onUserCloseViaDialogOrKeybindRef: l,
      };
      return (0, t.jsxs)(o.Provider, {
        value: c,
        children: [
          ("string" == typeof s.appearance.logo ||
            "img" === s.appearance.logo?.type) &&
            (0, t.jsx)(i, {
              src:
                "string" == typeof s.appearance.logo
                  ? s.appearance.logo
                  : s.appearance.logo.props.src,
            }),
          e.children,
        ],
      });
    },
    "u",
    0,
    () => (0, r.useContext)(o),
  ]);
};
