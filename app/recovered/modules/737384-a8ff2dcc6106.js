// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(132838),
    r = e.i(606933),
    a = e.i(408750),
    i = e.i(464154);
  function s(e) {
    return (0, a.J)({ calloutId: e.calloutId, liked: e.liked });
  }
  e.s([
    "f",
    0,
    function () {
      let e,
        a = (0, t.c)(2),
        n = (0, r.useQueryClient)();
      return (
        a[0] !== n
          ? ((e = {
              mutationFn: s,
              onMutate: async (e) => {
                let t = (0, i.B)(e.mint, e.cacheCalloutId ?? e.calloutId);
                await n.cancelQueries({ queryKey: t });
                let l = n.getQueryData(t);
                if (l) {
                  let r = e.liked ? 1 : -1;
                  n.setQueryData(t, {
                    ...l,
                    callout: {
                      ...l.callout,
                      likedByViewer: e.liked,
                      likeCount: Math.max((l.callout.likeCount ?? 0) + r, 0),
                    },
                  });
                }
                return { previous: l };
              },
              onError: (e, t, l) => {
                l?.previous &&
                  n.setQueryData(
                    (0, i.B)(t.mint, t.cacheCalloutId ?? t.calloutId),
                    l.previous,
                  );
              },
              onSettled: (e, t, l) => {
                n.invalidateQueries({
                  queryKey: (0, i.B)(l.mint, l.cacheCalloutId ?? l.calloutId),
                });
              },
            }),
            (a[0] = n),
            (a[1] = e))
          : (e = a[1]),
        (0, l.f)(e)
      );
    },
  ]);
};
