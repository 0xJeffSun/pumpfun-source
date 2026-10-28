// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    createSkippedSegmentData: function () {
      return u;
    },
    readFulfilledValue: function () {
      return o;
    },
    segmentToTransportSegment: function () {
      return c;
    },
    transportNodeToFlightRouterState: function () {
      return function e(t, n) {
        let r = {},
          a = t.c;
        if (void 0 !== a) for (let [t, l] of a) r[t] = e(l, n);
        let u = [s(t.s), r];
        return (
          void 0 !== t.h && (u[4] = t.h),
          u[0] === l.PAGE_SEGMENT_KEY && (u[5] = n),
          u
        );
      };
    },
    transportSegmentToSegment: function () {
      return s;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(706957);
  function u() {
    return { r: null, p: !0, v: null };
  }
  function o(e, t, n = t) {
    switch ((e.then(i, i), e.status)) {
      case "fulfilled":
        return e.value;
      case "rejected":
        return n;
      default:
        return t;
    }
  }
  let i = () => {};
  function c(e) {
    return "string" == typeof e ? e : { n: e[0], t: e[2], k: e[1], s: e[3] };
  }
  function s(e) {
    return "string" == typeof e ? e : [e.n, e.k ?? "", e.t, e.s];
  }
};
