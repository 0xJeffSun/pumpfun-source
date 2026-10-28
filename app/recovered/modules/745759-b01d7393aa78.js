// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, i) => {
  var r = {
    single_source_shortest_paths: function (e, t, i) {
      var n,
        o,
        a,
        l,
        s,
        c,
        d,
        h = {},
        u = {};
      u[t] = 0;
      var p = r.PriorityQueue.make();
      for (p.push(t, 0); !p.empty(); )
        for (a in ((o = (n = p.pop()).value), (l = n.cost), (s = e[o] || {})))
          s.hasOwnProperty(a) &&
            ((c = l + s[a]),
            (d = u[a]),
            (void 0 === u[a] || d > c) &&
              ((u[a] = c), p.push(a, c), (h[a] = o)));
      if (void 0 !== i && void 0 === u[i])
        throw Error(
          ["Could not find a path from ", t, " to ", i, "."].join(""),
        );
      return h;
    },
    extract_shortest_path_from_predecessor_list: function (e, t) {
      for (var i = [], r = t; r; ) (i.push(r), e[r], (r = e[r]));
      return (i.reverse(), i);
    },
    find_path: function (e, t, i) {
      var n = r.single_source_shortest_paths(e, t, i);
      return r.extract_shortest_path_from_predecessor_list(n, i);
    },
    PriorityQueue: {
      make: function (e) {
        var t,
          i = r.PriorityQueue,
          n = {};
        for (t in ((e = e || {}), i)) i.hasOwnProperty(t) && (n[t] = i[t]);
        return ((n.queue = []), (n.sorter = e.sorter || i.default_sorter), n);
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
  t.exports = r;
};
