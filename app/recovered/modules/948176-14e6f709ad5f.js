// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r,
    a = {
      EntryStatus: function () {
        return o;
      },
      Fallback: function () {
        return i;
      },
      createCacheMap: function () {
        return s;
      },
      deleteFromCacheMap: function () {
        return y;
      },
      deleteMapEntry: function () {
        return g;
      },
      getFromCacheMap: function () {
        return f;
      },
      isValueExpired: function () {
        return d;
      },
      setInCacheMap: function () {
        return h;
      },
      setSizeInCacheMap: function () {
        return v;
      },
    };
  for (var l in a) Object.defineProperty(n, l, { enumerable: !0, get: a[l] });
  let u = e.r(237833);
  var o =
    (((r = {})[(r.Empty = 0)] = "Empty"),
    (r[(r.Pending = 1)] = "Pending"),
    (r[(r.Fulfilled = 2)] = "Fulfilled"),
    (r[(r.Rejected = 3)] = "Rejected"),
    r);
  let i = {},
    c = {};
  function s() {
    return {
      parent: null,
      key: null,
      value: null,
      map: null,
      prev: null,
      next: null,
      size: 0,
    };
  }
  function f(e, t, n, r, a, l) {
    let o = (function e(t, n, r, a, l, u, o) {
      let s, f;
      if (null !== a) ((s = a.value), (f = a.parent));
      else if (l && u !== c) ((s = c), (f = null));
      else {
        if (null === r.value) return r;
        let e = r.value;
        return d(t, n, e) ? (g(r), null) : o && 2 !== e.status ? null : r;
      }
      let h = r.map;
      if (null !== h) {
        let r = h.get(s);
        if (void 0 !== r) {
          let a = e(t, n, r, f, l, s, o);
          if (null !== a) return a;
        }
        let a = h.get(i);
        if (void 0 !== a) return e(t, n, a, f, l, s, o);
      }
      return null;
    })(e, t, n, r, a, 0, l);
    return null === o || null === o.value ? null : ((0, u.lruPut)(o), o.value);
  }
  function d(e, t, n) {
    return n.staleAt <= e || n.version < t;
  }
  function h(e, t, n, r) {
    let a = (function (e, t, n) {
      let r = e,
        a = t,
        l = null;
      for (;;) {
        let e = l;
        if (null !== a) ((l = a.value), (a = a.parent));
        else if (n && e !== c) {
          if (null === r.value) return r;
          l = c;
        } else break;
        let t = r.map;
        if (null !== t) {
          let e = t.get(l);
          if (void 0 !== e) {
            r = e;
            continue;
          }
        } else ((t = new Map()), (r.map = t));
        let u = {
          parent: r,
          key: l,
          value: null,
          map: null,
          prev: null,
          next: null,
          size: 0,
        };
        (t.set(l, u), (r = u));
      }
      return r;
    })(e, t, r);
    (p(a, n), (0, u.lruPut)(a), (0, u.updateLruSize)(a, n.size));
  }
  function p(e, t) {
    null !== e.value && ((e.value.ref = null), (e.value = null));
    let n = t.ref;
    ((e.value = t),
      (t.ref = e),
      (0, u.updateLruSize)(e, t.size),
      null !== n && n !== e && n.value === t && g(n));
  }
  function y(e) {
    let t = e.ref;
    null !== t && ((e.ref = null), g(t));
  }
  function g(e) {
    ((e.value = null), (0, u.deleteFromLru)(e));
    let t = e.map;
    if (null === t) {
      let t = e.parent,
        n = e.key;
      for (; null !== t; ) {
        let e = t.map;
        if (
          null !== e &&
          (e.delete(n), 0 === e.size) &&
          ((t.map = null), null === t.value)
        ) {
          ((n = t.key), (t = t.parent));
          continue;
        }
        break;
      }
    } else {
      let n = t.get(c);
      void 0 !== n && null !== n.value && p(e, n.value);
    }
  }
  function v(e, t) {
    let n = e.ref;
    null !== n && ((e.size = t), (0, u.updateLruSize)(n, t));
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
