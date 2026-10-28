// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = /^(?:0|[1-9]\d*)$/;
  e.exports = function (t, e) {
    var r = typeof t;
    return (
      !!(e = null == e ? 0x1fffffffffffff : e) &&
      ("number" == r || ("symbol" != r && n.test(t))) &&
      t > -1 &&
      t % 1 == 0 &&
      t < e
    );
  };
};
