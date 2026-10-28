// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(352386),
    n = e.i(933185),
    a = e.i(748117);
  function s({ src: e, ...r }) {
    return (0, t.jsx)("img", { src: e, ...r, style: { display: "none" } });
  }
  let o = (0, r.createContext)({
    currentScreen: null,
    lastScreen: null,
    navigate: a.n,
    navigateBack: a.n,
    resetNavigation: a.n,
    setModalData: a.n,
    onUserCloseViaDialogOrKeybindRef: void 0,
  });
  e.s([
    "M",
    0,
    (e) => {
      let a = (0, n.a)(),
        [i, l] = (0, r.useState)(e.initialScreen),
        u = (0, r.useRef)(null);
      ((0, r.useEffect)(() => {
        e.open || (u.current = null);
      }, [e.open]),
        (0, r.useEffect)(() => {
          u.current = null;
        }, [e.initialScreen]));
      let p = {
        data: e.data,
        setModalData: e.setModalData,
        currentScreen: e.initialScreen,
        lastScreen: i,
        navigate: (t, r = !0) => {
          (e.setInitialScreen(t), r && l(e.initialScreen));
        },
        navigateBack: () => {
          e.setInitialScreen(i);
        },
        resetNavigation: () => {
          (e.setInitialScreen(null), l(null));
        },
        onUserCloseViaDialogOrKeybindRef: u,
      };
      return (0, t.jsxs)(o.Provider, {
        value: p,
        children: [
          ("string" == typeof a.appearance.logo ||
            "img" === a.appearance.logo?.type) &&
            (0, t.jsx)(s, {
              src:
                "string" == typeof a.appearance.logo
                  ? a.appearance.logo
                  : a.appearance.logo.props.src,
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
