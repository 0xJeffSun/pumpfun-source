// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(310413),
    o = t.r(628151);
  function i(t) {
    ((this.mode = n.KANJI), (this.data = t));
  }
  ((i.getBitsLength = function (t) {
    return 13 * t;
  }),
    (i.prototype.getLength = function () {
      return this.data.length;
    }),
    (i.prototype.getBitsLength = function () {
      return i.getBitsLength(this.data.length);
    }),
    (i.prototype.write = function (t) {
      let e;
      for (e = 0; e < this.data.length; e++) {
        let r = o.toSJIS(this.data[e]);
        if (r >= 33088 && r <= 40956) r -= 33088;
        else if (r >= 57408 && r <= 60351) r -= 49472;
        else
          throw Error(
            "Invalid SJIS character: " +
              this.data[e] +
              "\nMake sure your charset is UTF-8",
          );
        ((r = ((r >>> 8) & 255) * 192 + (255 & r)), t.put(r, 13));
      }
    }),
    (e.exports = i));
};
