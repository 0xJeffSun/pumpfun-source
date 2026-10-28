// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(643492),
    n = e.i(119031),
    r = class extends t.f {
      constructor(e, t) {
        super(e, t);
      }
      bindMethods() {
        (super.bindMethods(),
          (this.fetchNextPage = this.fetchNextPage.bind(this)),
          (this.fetchPreviousPage = this.fetchPreviousPage.bind(this)));
      }
      setOptions(e, t) {
        super.setOptions({ ...e, behavior: (0, n.T)() }, t);
      }
      getOptimisticResult(e) {
        return ((e.behavior = (0, n.T)()), super.getOptimisticResult(e));
      }
      fetchNextPage(e) {
        return this.fetch({
          ...e,
          meta: { fetchMore: { direction: "forward" } },
        });
      }
      fetchPreviousPage(e) {
        return this.fetch({
          ...e,
          meta: { fetchMore: { direction: "backward" } },
        });
      }
      createResult(e, t) {
        let { state: r } = e,
          i = super.createResult(e, t),
          { isFetching: a, isRefetching: o, isError: s, isRefetchError: l } = i,
          u = r.fetchMeta?.fetchMore?.direction,
          c = s && "forward" === u,
          d = a && "forward" === u,
          f = s && "backward" === u,
          h = a && "backward" === u;
        return {
          ...i,
          fetchNextPage: this.fetchNextPage,
          fetchPreviousPage: this.fetchPreviousPage,
          hasNextPage: (0, n.B)(t, r.data),
          hasPreviousPage: (0, n.u)(t, r.data),
          isFetchNextPageError: c,
          isFetchingNextPage: d,
          isFetchPreviousPageError: f,
          isFetchingPreviousPage: h,
          isRefetchError: l && !c && !f,
          isRefetching: o && !d && !h,
        };
      }
    },
    i = e.i(967985);
  e.s(
    [
      "useInfiniteQuery",
      0,
      function (e, t) {
        return (0, i.f)(e, r, t);
      },
    ],
    761459,
  );
};
