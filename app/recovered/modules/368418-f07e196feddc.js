// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r,
    a = {
      PrefetchHint: function () {
        return u;
      },
      StaticAttemptHints: function () {
        return i;
      },
      StaticPrefetchDisabled: function () {
        return o;
      },
      SubtreePrefetchHints: function () {
        return c;
      },
      propagateSubtreeBits: function () {
        return s;
      },
    };
  for (var l in a) Object.defineProperty(n, l, { enumerable: !0, get: a[l] });
  var u =
    (((r = {})[(r.SubtreeHasPartialPrefetching = 2)] =
      "SubtreeHasPartialPrefetching"),
    (r[(r.SegmentHasLoadingBoundary = 4)] = "SegmentHasLoadingBoundary"),
    (r[(r.SubtreeHasLoadingBoundary = 8)] = "SubtreeHasLoadingBoundary"),
    (r[(r.IsRootLayoutOrAbove = 16)] = "IsRootLayoutOrAbove"),
    (r[(r.ParentInlinedIntoSelf = 32)] = "ParentInlinedIntoSelf"),
    (r[(r.InlinedIntoChild = 64)] = "InlinedIntoChild"),
    (r[(r.HeadInlinedIntoSelf = 128)] = "HeadInlinedIntoSelf"),
    (r[(r.HeadOutlined = 256)] = "HeadOutlined"),
    (r[(r.InliningHintsStale = 512)] = "InliningHintsStale"),
    (r[(r.PrefetchDisabled = 1024)] = "PrefetchDisabled"),
    (r[(r.SubtreeHasInstantFalse = 8192)] = "SubtreeHasInstantFalse"),
    (r[(r.ShouldAttemptStaticShell = 16384)] = "ShouldAttemptStaticShell"),
    (r[(r.ShouldAttemptStaticPrefetch = 32768)] =
      "ShouldAttemptStaticPrefetch"),
    (r[(r.IsClosedParam = 65536)] = "IsClosedParam"),
    (r[(r.SubtreeHasClosedParams = 131072)] = "SubtreeHasClosedParams"),
    r);
  let o = 1024,
    i = 49152,
    c = 139274;
  function s(e, t) {
    return (
      2 & t && (e |= 2),
      12 & t && (e |= 8),
      8192 & t && (e |= 8192),
      196608 & t && (e |= 131072),
      e
    );
  }
};
