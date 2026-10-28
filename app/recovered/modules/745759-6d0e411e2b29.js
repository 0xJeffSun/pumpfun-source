// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r, e, o) => {
  var i = {
    single_source_shortest_paths: function (r, e, o) {
      var t,
        n,
        a,
        l,
        s,
        c,
        d,
        p = {},
        u = {};
      u[e] = 0;
      var h = i.PriorityQueue.make();
      for (h.push(e, 0); !h.empty(); )
        for (a in ((n = (t = h.pop()).value), (l = t.cost), (s = r[n] || {})))
          s.hasOwnProperty(a) &&
            ((c = l + s[a]),
            (d = u[a]),
            (void 0 === u[a] || d > c) &&
              ((u[a] = c), h.push(a, c), (p[a] = n)));
      if (void 0 !== o && void 0 === u[o])
        throw Error(
          ["Could not find a path from ", e, " to ", o, "."].join(""),
        );
      return p;
    },
    extract_shortest_path_from_predecessor_list: function (r, e) {
      for (var o = [], i = e; i; ) (o.push(i), r[i], (i = r[i]));
      return (o.reverse(), o);
    },
    find_path: function (r, e, o) {
      var t = i.single_source_shortest_paths(r, e, o);
      return i.extract_shortest_path_from_predecessor_list(t, o);
    },
    PriorityQueue: {
      make: function (r) {
        var e,
          o = i.PriorityQueue,
          t = {};
        for (e in ((r = r || {}), o)) o.hasOwnProperty(e) && (t[e] = o[e]);
        return ((t.queue = []), (t.sorter = r.sorter || o.default_sorter), t);
      },
      default_sorter: function (r, e) {
        return r.cost - e.cost;
      },
      push: function (r, e) {
        (this.queue.push({ value: r, cost: e }), this.queue.sort(this.sorter));
      },
      pop: function () {
        return this.queue.shift();
      },
      empty: function () {
        return 0 === this.queue.length;
      },
    },
  };
  e.exports = i;
};
