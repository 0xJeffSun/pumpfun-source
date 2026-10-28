// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e, t) {
    let r;
    try {
      r = e();
    } catch (e) {
      return;
    }
    return {
      getItem: (e) => {
        var o;
        let n = (e) =>
            null === e ? null : JSON.parse(e, null == t ? void 0 : t.reviver),
          a = null != (o = r.getItem(e)) ? o : null;
        return a instanceof Promise ? a.then(n) : n(a);
      },
      setItem: (e, o) =>
        r.setItem(e, JSON.stringify(o, null == t ? void 0 : t.replacer)),
      removeItem: (e) => r.removeItem(e),
    };
  }
  let r = (e) => (t) => {
    try {
      let o = e(t);
      if (o instanceof Promise) return o;
      return {
        then: (e) => r(e)(o),
        catch(e) {
          return this;
        },
      };
    } catch (e) {
      return {
        then(e) {
          return this;
        },
        catch: (t) => r(t)(e),
      };
    }
  };
  e.s([
    "j",
    0,
    t,
    "V",
    0,
    (e, o) => (n, a, i) => {
      let s,
        l = {
          storage: t(() => localStorage),
          partialize: (e) => e,
          version: 0,
          merge: (e, t) => ({ ...t, ...e }),
          ...o,
        },
        d = !1,
        u = new Set(),
        c = new Set(),
        w = l.storage;
      if (!w)
        return e(
          (...e) => {
            (console.warn(
              `[zustand persist middleware] Unable to update item '${l.name}', the given storage is currently unavailable.`,
            ),
              n(...e));
          },
          a,
          i,
        );
      let b = () => {
          let e = l.partialize({ ...a() });
          return w.setItem(l.name, { state: e, version: l.version });
        },
        h = i.setState;
      i.setState = (e, t) => {
        (h(e, t), b());
      };
      let p = e(
        (...e) => {
          (n(...e), b());
        },
        a,
        i,
      );
      i.getInitialState = () => p;
      let f = () => {
        var e, t;
        if (!w) return;
        ((d = !1),
          u.forEach((e) => {
            var t;
            return e(null != (t = a()) ? t : p);
          }));
        let o =
          (null == (t = l.onRehydrateStorage)
            ? void 0
            : t.call(l, null != (e = a()) ? e : p)) || void 0;
        return r(w.getItem.bind(w))(l.name)
          .then((e) => {
            if (e)
              if ("number" != typeof e.version || e.version === l.version)
                return [!1, e.state];
              else {
                if (l.migrate) {
                  let t = l.migrate(e.state, e.version);
                  return t instanceof Promise
                    ? t.then((e) => [!0, e])
                    : [!0, t];
                }
                console.error(
                  "State loaded from storage couldn't be migrated since no migrate function was provided",
                );
              }
            return [!1, void 0];
          })
          .then((e) => {
            var t;
            let [r, o] = e;
            if ((n((s = l.merge(o, null != (t = a()) ? t : p)), !0), r))
              return b();
          })
          .then(() => {
            (null == o || o(s, void 0),
              (s = a()),
              (d = !0),
              c.forEach((e) => e(s)));
          })
          .catch((e) => {
            null == o || o(void 0, e);
          });
      };
      return (
        (i.persist = {
          setOptions: (e) => {
            ((l = { ...l, ...e }), e.storage && (w = e.storage));
          },
          clearStorage: () => {
            null == w || w.removeItem(l.name);
          },
          getOptions: () => l,
          rehydrate: () => f(),
          hasHydrated: () => d,
          onHydrate: (e) => (
            u.add(e),
            () => {
              u.delete(e);
            }
          ),
          onFinishHydration: (e) => (
            c.add(e),
            () => {
              c.delete(e);
            }
          ),
        }),
        l.skipHydration || f(),
        s || p
      );
    },
    "u",
    0,
    (e) => (t, r, o) => {
      let n = o.subscribe;
      return (
        (o.subscribe = (e, t, r) => {
          let a = e;
          if (t) {
            let n = (null == r ? void 0 : r.equalityFn) || Object.is,
              i = e(o.getState());
            ((a = (r) => {
              let o = e(r);
              if (!n(i, o)) {
                let e = i;
                t((i = o), e);
              }
            }),
              (null == r ? void 0 : r.fireImmediately) && t(i, i));
          }
          return n(a);
        }),
        e(t, r, o)
      );
    },
  ]);
};
