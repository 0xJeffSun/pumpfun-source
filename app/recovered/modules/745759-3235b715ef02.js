// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  var i = {
    single_source_shortest_paths: function (e, r, t) {
      var o,
        n,
        a,
        l,
        s,
        c,
        d,
        h = {},
        p = {};
      p[r] = 0;
      var u = i.PriorityQueue.make();
      for (u.push(r, 0); !u.empty(); )
        for (a in ((n = (o = u.pop()).value), (l = o.cost), (s = e[n] || {})))
          s.hasOwnProperty(a) &&
            ((c = l + s[a]),
            (d = p[a]),
            (void 0 === p[a] || d > c) &&
              ((p[a] = c), u.push(a, c), (h[a] = n)));
      if (void 0 !== t && void 0 === p[t])
        throw Error(
          ["Could not find a path from ", r, " to ", t, "."].join(""),
        );
      return h;
    },
    extract_shortest_path_from_predecessor_list: function (e, r) {
      for (var t = [], i = r; i; ) (t.push(i), e[i], (i = e[i]));
      return (t.reverse(), t);
    },
    find_path: function (e, r, t) {
      var o = i.single_source_shortest_paths(e, r, t);
      return i.extract_shortest_path_from_predecessor_list(o, t);
    },
    PriorityQueue: {
      make: function (e) {
        var r,
          t = i.PriorityQueue,
          o = {};
        for (r in ((e = e || {}), t)) t.hasOwnProperty(r) && (o[r] = t[r]);
        return ((o.queue = []), (o.sorter = e.sorter || t.default_sorter), o);
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
  r.exports = i;
};
