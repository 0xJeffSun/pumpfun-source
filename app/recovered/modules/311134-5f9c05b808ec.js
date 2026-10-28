// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    hmrRefresh: function () {
      return l.hmrRefresh;
    },
    navigate: function () {
      return l.navigate;
    },
    push: function () {
      return l.push;
    },
    refresh: function () {
      return l.refresh;
    },
    replace: function () {
      return l.replace;
    },
    restore: function () {
      return l.restore;
    },
    traverse: function () {
      return l.traverse;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(679035);
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
