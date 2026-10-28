// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r, e, o) => {
  var i = {
    single_source_shortest_paths: function (r, e, o) {
      var a,
        t,
        n,
        l,
        c,
        s,
        d,
        u = {},
        v = {};
      v[e] = 0;
      var p = i.PriorityQueue.make();
      for (p.push(e, 0); !p.empty(); )
        for (n in ((t = (a = p.pop()).value), (l = a.cost), (c = r[t] || {})))
          c.hasOwnProperty(n) &&
            ((s = l + c[n]),
            (d = v[n]),
            (void 0 === v[n] || d > s) &&
              ((v[n] = s), p.push(n, s), (u[n] = t)));
      if (void 0 !== o && void 0 === v[o])
        throw Error(
          ["Could not find a path from ", e, " to ", o, "."].join(""),
        );
      return u;
    },
    extract_shortest_path_from_predecessor_list: function (r, e) {
      for (var o = [], i = e; i; ) (o.push(i), r[i], (i = r[i]));
      return (o.reverse(), o);
    },
    find_path: function (r, e, o) {
      var a = i.single_source_shortest_paths(r, e, o);
      return i.extract_shortest_path_from_predecessor_list(a, o);
    },
    PriorityQueue: {
      make: function (r) {
        var e,
          o = i.PriorityQueue,
          a = {};
        for (e in ((r = r || {}), o)) o.hasOwnProperty(e) && (a[e] = o[e]);
        return ((a.queue = []), (a.sorter = r.sorter || o.default_sorter), a);
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
