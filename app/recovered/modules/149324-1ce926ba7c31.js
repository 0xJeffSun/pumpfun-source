// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, a) => {
  for (
    var l = {
        glog: function (e) {
          if (e < 1) throw Error("glog(" + e + ")");
          return l.LOG_TABLE[e];
        },
        gexp: function (e) {
          for (; e < 0; ) e += 255;
          for (; e >= 256; ) e -= 255;
          return l.EXP_TABLE[e];
        },
        EXP_TABLE: Array(256),
        LOG_TABLE: Array(256),
      },
      r = 0;
    r < 8;
    r++
  )
    l.EXP_TABLE[r] = 1 << r;
  for (var r = 8; r < 256; r++)
    l.EXP_TABLE[r] =
      l.EXP_TABLE[r - 4] ^
      l.EXP_TABLE[r - 5] ^
      l.EXP_TABLE[r - 6] ^
      l.EXP_TABLE[r - 8];
  for (var r = 0; r < 255; r++) l.LOG_TABLE[l.EXP_TABLE[r]] = r;
  t.exports = l;
};
