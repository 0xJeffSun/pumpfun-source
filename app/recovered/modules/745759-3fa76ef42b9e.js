// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, i) => {
  var n = {
    single_source_shortest_paths: function (e, t, i) {
      var a,
        r,
        l,
        o,
        s,
        c,
        d,
        u = {},
        p = {};
      p[t] = 0;
      var h = n.PriorityQueue.make();
      for (h.push(t, 0); !h.empty(); )
        for (l in ((r = (a = h.pop()).value), (o = a.cost), (s = e[r] || {})))
          s.hasOwnProperty(l) &&
            ((c = o + s[l]),
            (d = p[l]),
            (void 0 === p[l] || d > c) &&
              ((p[l] = c), h.push(l, c), (u[l] = r)));
      if (void 0 !== i && void 0 === p[i])
        throw Error(
          ["Could not find a path from ", t, " to ", i, "."].join(""),
        );
      return u;
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
