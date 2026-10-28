// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r,
    a,
    l,
    u = {
      FetchStrategy: function () {
        return s;
      },
      NavigationResultTag: function () {
        return i;
      },
      PrefetchPriority: function () {
        return c;
      },
    };
  for (var o in u) Object.defineProperty(n, o, { enumerable: !0, get: u[o] });
  var i =
      (((r = {})[(r.MPA = 0)] = "MPA"),
      (r[(r.Success = 1)] = "Success"),
      (r[(r.NoOp = 2)] = "NoOp"),
      (r[(r.Async = 3)] = "Async"),
      r),
    c =
      (((a = {})[(a.Intent = 2)] = "Intent"),
      (a[(a.Default = 1)] = "Default"),
      (a[(a.Background = 0)] = "Background"),
      a),
    s =
      (((l = {})[(l.LoadingBoundary = 0)] = "LoadingBoundary"),
      (l[(l.StaticShell = 1)] = "StaticShell"),
      (l[(l.RuntimeShell = 2)] = "RuntimeShell"),
      (l[(l.PPR = 3)] = "PPR"),
      (l[(l.PPRRuntime = 4)] = "PPRRuntime"),
      (l[(l.Full = 5)] = "Full"),
      l);
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
