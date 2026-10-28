// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, i) => {
  var n = {
    single_source_shortest_paths: function (e, t, i) {
      var a,
        l,
        r,
        o,
        s,
        c,
        d,
        h = {},
        u = {};
      u[t] = 0;
      var p = n.PriorityQueue.make();
      for (p.push(t, 0); !p.empty(); )
        for (r in ((l = (a = p.pop()).value), (o = a.cost), (s = e[l] || {})))
          s.hasOwnProperty(r) &&
            ((c = o + s[r]),
            (d = u[r]),
            (void 0 === u[r] || d > c) &&
              ((u[r] = c), p.push(r, c), (h[r] = l)));
      if (void 0 !== i && void 0 === u[i])
        throw Error(
          ["Could not find a path from ", t, " to ", i, "."].join(""),
        );
      return h;
    },
    extract_shortest_path_from_predecessor_list: function (e, t) {
      for (var i = [], n = t; n; ) (i.push(n), e[n], (n = e[n]));
      return (i.reverse(), i);
    },
    find_path: function (e, t, i) {
      var a = n.single_source_shortest_paths(e, t, i);
      return n.extract_shortest_path_from_predecessor_list(a, i);
    },
    PriorityQueue: {
      make: function (e) {
        var t,
          i = n.PriorityQueue,
          a = {};
        for (t in ((e = e || {}), i)) i.hasOwnProperty(t) && (a[t] = i[t]);
        return ((a.queue = []), (a.sorter = e.sorter || i.default_sorter), a);
      },
      default_sorter: function (e, t) {
        return e.cost - t.cost;
      },
      push: function (e, t) {
        (this.queue.push({ value: e, cost: t }), this.queue.sort(this.sorter));
      },
      pop: function () {
        return this.queue.shift();
      },
      empty: function () {
        return 0 === this.queue.length;
      },
    },
  };
  t.exports = n;
};
