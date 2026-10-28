// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, a) => {
  var l = e.r(888267);
  function r(e) {
    ((this.mode = l.MODE_8BIT_BYTE), (this.data = e));
  }
  ((r.prototype = {
    getLength: function (e) {
      return this.data.length;
    },
    write: function (e) {
      for (var t = 0; t < this.data.length; t++)
        e.put(this.data.charCodeAt(t), 8);
    },
  }),
    (t.exports = r));
};
