// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    getLastCommittedTree: function () {
      return u;
    },
    setLastCommittedTree: function () {
      return o;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = null;
  function u() {
    return l;
  }
  function o(e) {
    l = e;
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
