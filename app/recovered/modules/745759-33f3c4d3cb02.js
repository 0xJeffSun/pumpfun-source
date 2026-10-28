// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r, e, o) => {
  var i = {
    single_source_shortest_paths: function (r, e, o) {
      var a,
        t,
        l,
        n,
        c,
        s,
        d,
        p = {},
        v = {};
      v[e] = 0;
      var u = i.PriorityQueue.make();
      for (u.push(e, 0); !u.empty(); )
        for (l in ((t = (a = u.pop()).value), (n = a.cost), (c = r[t] || {})))
          c.hasOwnProperty(l) &&
            ((s = n + c[l]),
            (d = v[l]),
            (void 0 === v[l] || d > s) &&
              ((v[l] = s), u.push(l, s), (p[l] = t)));
      if (void 0 !== o && void 0 === v[o])
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
