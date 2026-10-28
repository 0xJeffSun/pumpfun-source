// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(761806),
    r = e.i(565693),
    i = e.i(303232);
  function o() {
    let e = new Map();
    return {
      emit(t, n) {
        e.get(t)?.forEach((e) => e(n));
      },
      on(t, n) {
        (e.has(t) || e.set(t, new Set()), e.get(t).add(n));
      },
      off(t, n) {
        e.get(t)?.delete(n);
      },
    };
  }
  e.s(["f", 0, o], 254780);
  class l {
    nodesRef = { current: [] };
    events = o();
    addNode(e) {
      this.nodesRef.current.push(e);
    }
    removeNode(e) {
      let t = this.nodesRef.current.findIndex((t) => t === e);
      -1 !== t && this.nodesRef.current.splice(t, 1);
    }
  }
  e.s(["f", 0, l], 105759);
  var s = e.i(732486);
  let u = t.createContext(null),
    a = t.createContext(null),
    c = () => t.useContext(u)?.id || null,
    f = (e) => {
      let n = t.useContext(a);
      return e ?? n;
    };
  e.s(
    [
      "s",
      0,
      function (e) {
        let { children: n, id: r } = e,
          i = c();
        return (0, s.jsx)(u.Provider, {
          value: t.useMemo(() => ({ id: r, parentId: i }), [r, i]),
          children: n,
        });
      },
      "V",
      0,
      function (e) {
        let { children: t, externalTree: n } = e,
          r = (0, i.f)(() => n ?? new l()).current;
        return (0, s.jsx)(a.Provider, { value: r, children: t });
      },
      "T",
      0,
      function (e) {
        let t = (0, n.f)(),
          i = f(e),
          o = c();
        return (
          (0, r.f)(() => {
            if (!t) return;
            let e = { id: t, parentId: o };
            return (
              i?.addNode(e),
              () => {
                i?.removeNode(e);
              }
            );
          }, [i, t, o]),
          t
        );
      },
      "G",
      0,
      c,
      "$",
      0,
      f,
    ],
    656522,
  );
};
