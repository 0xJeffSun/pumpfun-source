// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r,
    a,
    l = {
      ACTION_HMR_REFRESH: function () {
        return f;
      },
      ACTION_NAVIGATE: function () {
        return i;
      },
      ACTION_REFRESH: function () {
        return o;
      },
      ACTION_RESTORE: function () {
        return c;
      },
      ACTION_SERVER_ACTION: function () {
        return d;
      },
      ACTION_SERVER_PATCH: function () {
        return s;
      },
      PrefetchKind: function () {
        return h;
      },
      ScrollBehavior: function () {
        return p;
      },
    };
  for (var u in l) Object.defineProperty(n, u, { enumerable: !0, get: l[u] });
  let o = "refresh",
    i = "navigate",
    c = "restore",
    s = "server-patch",
    f = "hmr-refresh",
    d = "server-action";
  var h = (((r = {}).AUTO = "auto"), (r.FULL = "full"), r),
    p =
      (((a = {})[(a.Default = 0)] = "Default"),
      (a[(a.NoScroll = 1)] = "NoScroll"),
      a);
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
