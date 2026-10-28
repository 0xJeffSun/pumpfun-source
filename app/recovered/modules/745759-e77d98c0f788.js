// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var i = {
    single_source_shortest_paths: function (e, t, r) {
      var n,
        o,
        a,
        l,
        s,
        c,
        d,
        h = {},
        p = {};
      p[t] = 0;
      var u = i.PriorityQueue.make();
      for (u.push(t, 0); !u.empty(); )
        for (a in ((o = (n = u.pop()).value), (l = n.cost), (s = e[o] || {})))
          s.hasOwnProperty(a) &&
            ((c = l + s[a]),
            (d = p[a]),
            (void 0 === p[a] || d > c) &&
              ((p[a] = c), u.push(a, c), (h[a] = o)));
      if (void 0 !== r && void 0 === p[r])
        throw Error(
          ["Could not find a path from ", t, " to ", r, "."].join(""),
        );
      return h;
    },
    extract_shortest_path_from_predecessor_list: function (e, t) {
      for (var r = [], i = t; i; ) (r.push(i), e[i], (i = e[i]));
      return (r.reverse(), r);
    },
    find_path: function (e, t, r) {
      var n = i.single_source_shortest_paths(e, t, r);
      return i.extract_shortest_path_from_predecessor_list(n, r);
    },
    PriorityQueue: {
      make: function (e) {
        var t,
          r = i.PriorityQueue,
          n = {};
        for (t in ((e = e || {}), r)) r.hasOwnProperty(t) && (n[t] = r[t]);
        return ((n.queue = []), (n.sorter = e.sorter || r.default_sorter), n);
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
  t.exports = i;
};
