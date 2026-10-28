// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(433710),
    n = e.i(667611),
    r = e.i(775975);
  let i = r._,
    o = null,
    s = new Set();
  e.s([
    "f",
    0,
    function ({ expireDelay: e, maxEntries: u }) {
      let a = [];
      o || (o = (0, t.y)(() => void s.forEach((e) => e()), i));
      let l = () => {
        let t = (0, r.H)() - e;
        for (; a.length > 0 && a[a.length - 1].endTime < t; ) a.pop();
      };
      return (
        s.add(l),
        {
          add: function (e, t) {
            let r = {
              value: e,
              startTime: t,
              endTime: 1 / 0,
              remove: () => {
                (0, n.i)(a, r);
              },
              close: (e) => {
                r.endTime = e;
              },
            };
            return (u && a.length >= u && a.pop(), a.unshift(r), r);
          },
          find: function (e = 1 / 0, t = { returnInactive: !1 }) {
            for (let n of a)
              if (n.startTime <= e) {
                if (t.returnInactive || e <= n.endTime) return n.value;
                break;
              }
          },
          closeActive: function (e) {
            let t = a[0];
            t && 1 / 0 === t.endTime && t.close(e);
          },
          findAll: function (e = 1 / 0, t = 0) {
            let n = (0, r.z)(e, t);
            return a
              .filter((t) => t.startTime <= n && e <= t.endTime)
              .map((e) => e.value);
          },
          reset: function () {
            a = [];
          },
          stop: function () {
            (s.delete(l), 0 === s.size && o && ((0, t.x)(o), (o = null)));
          },
        }
      );
    },
  ]);
};
