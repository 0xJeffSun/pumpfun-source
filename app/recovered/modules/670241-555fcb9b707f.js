// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(598670),
    o = t.r(984086);
  function n(t) {
    ((this.mode = r.KANJI), (this.data = t));
  }
  ((n.getBitsLength = function (t) {
    return 13 * t;
  }),
    (n.prototype.getLength = function () {
      return this.data.length;
    }),
    (n.prototype.getBitsLength = function () {
      return n.getBitsLength(this.data.length);
    }),
    (n.prototype.write = function (t) {
      let e;
      for (e = 0; e < this.data.length; e++) {
        let i = o.toSJIS(this.data[e]);
        if (i >= 33088 && i <= 40956) i -= 33088;
        else if (i >= 57408 && i <= 60351) i -= 49472;
        else
          throw Error(
            "Invalid SJIS character: " +
              this.data[e] +
              "\nMake sure your charset is UTF-8",
          );
        ((i = ((i >>> 8) & 255) * 192 + (255 & i)), t.put(i, 13));
      }
    }),
    (e.exports = n));
};
