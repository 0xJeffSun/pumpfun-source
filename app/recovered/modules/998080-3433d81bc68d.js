// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(598670);
  function o(t) {
    ((this.mode = r.NUMERIC), (this.data = t.toString()));
  }
  ((o.getBitsLength = function (t) {
    return 10 * Math.floor(t / 3) + (t % 3 ? (t % 3) * 3 + 1 : 0);
  }),
    (o.prototype.getLength = function () {
      return this.data.length;
    }),
    (o.prototype.getBitsLength = function () {
      return o.getBitsLength(this.data.length);
    }),
    (o.prototype.write = function (t) {
      let e, i;
      for (e = 0; e + 3 <= this.data.length; e += 3)
        ((i = parseInt(this.data.substr(e, 3), 10)), t.put(i, 10));
      let r = this.data.length - e;
      r > 0 && ((i = parseInt(this.data.substr(e), 10)), t.put(i, 3 * r + 1));
    }),
    (e.exports = o));
};
