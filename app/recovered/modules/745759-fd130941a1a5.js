// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, i) => {
  var o = {
    single_source_shortest_paths: function (e, r, i) {
      var t,
        a,
        n,
        l,
        c,
        s,
        d,
        p = {},
        u = {};
      u[r] = 0;
      var h = o.PriorityQueue.make();
      for (h.push(r, 0); !h.empty(); )
        for (n in ((a = (t = h.pop()).value), (l = t.cost), (c = e[a] || {})))
          c.hasOwnProperty(n) &&
            ((s = l + c[n]),
            (d = u[n]),
            (void 0 === u[n] || d > s) &&
              ((u[n] = s), h.push(n, s), (p[n] = a)));
      if (void 0 !== i && void 0 === u[i])
        throw Error(
          ["Could not find a path from ", r, " to ", i, "."].join(""),
        );
      return p;
    },
    extract_shortest_path_from_predecessor_list: function (e, r) {
      for (var i = [], o = r; o; ) (i.push(o), e[o], (o = e[o]));
      return (i.reverse(), i);
    },
    find_path: function (e, r, i) {
      var t = o.single_source_shortest_paths(e, r, i);
      return o.extract_shortest_path_from_predecessor_list(t, i);
    },
    PriorityQueue: {
      make: function (e) {
        var r,
          i = o.PriorityQueue,
          t = {};
        for (r in ((e = e || {}), i)) i.hasOwnProperty(r) && (t[r] = i[r]);
        return ((t.queue = []), (t.sorter = e.sorter || i.default_sorter), t);
      },
      default_sorter: function (e, r) {
        return e.cost - r.cost;
      },
      push: function (e, r) {
        (this.queue.push({ value: e, cost: r }), this.queue.sort(this.sorter));
      },
      pop: function () {
        return this.queue.shift();
      },
      empty: function () {
        return 0 === this.queue.length;
      },
    },
  };
  r.exports = o;
};
