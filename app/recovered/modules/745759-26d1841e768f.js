// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, i, r) => {
  "use strict";
  var n = {
    single_source_shortest_paths: function (e, i, r) {
      var t,
        o,
        a,
        s,
        u,
        d,
        l,
        c = {},
        b = {};
      b[i] = 0;
      var w = n.PriorityQueue.make();
      for (w.push(i, 0); !w.empty(); )
        for (a in ((o = (t = w.pop()).value), (s = t.cost), (u = e[o] || {})))
          u.hasOwnProperty(a) &&
            ((d = s + u[a]),
            (l = b[a]),
            (void 0 === b[a] || l > d) &&
              ((b[a] = d), w.push(a, d), (c[a] = o)));
      if (void 0 !== r && void 0 === b[r])
        throw Error(
          ["Could not find a path from ", i, " to ", r, "."].join(""),
        );
      return c;
    },
    extract_shortest_path_from_predecessor_list: function (e, i) {
      for (var r = [], n = i; n; ) (r.push(n), e[n], (n = e[n]));
      return (r.reverse(), r);
    },
    find_path: function (e, i, r) {
      var t = n.single_source_shortest_paths(e, i, r);
      return n.extract_shortest_path_from_predecessor_list(t, r);
    },
    PriorityQueue: {
      make: function (e) {
        var i,
          r = n.PriorityQueue,
          t = {};
        for (i in ((e = e || {}), r)) r.hasOwnProperty(i) && (t[i] = r[i]);
        return ((t.queue = []), (t.sorter = e.sorter || r.default_sorter), t);
      },
      default_sorter: function (e, i) {
        return e.cost - i.cost;
      },
      push: function (e, i) {
        (this.queue.push({ value: e, cost: i }), this.queue.sort(this.sorter));
      },
      pop: function () {
        return this.queue.shift();
      },
      empty: function () {
        return 0 === this.queue.length;
      },
    },
  };
  i.exports = n;
};
