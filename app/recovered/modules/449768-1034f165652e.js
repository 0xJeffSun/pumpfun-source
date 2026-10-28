// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(598670),
    o = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":",
    ];
  function n(t) {
    ((this.mode = r.ALPHANUMERIC), (this.data = t));
  }
  ((n.getBitsLength = function (t) {
    return 11 * Math.floor(t / 2) + (t % 2) * 6;
  }),
    (n.prototype.getLength = function () {
      return this.data.length;
    }),
    (n.prototype.getBitsLength = function () {
      return n.getBitsLength(this.data.length);
    }),
    (n.prototype.write = function (t) {
      let e;
      for (e = 0; e + 2 <= this.data.length; e += 2) {
        let i = 45 * o.indexOf(this.data[e]);
        ((i += o.indexOf(this.data[e + 1])), t.put(i, 11));
      }
      this.data.length % 2 && t.put(o.indexOf(this.data[e]), 6);
    }),
    (e.exports = n));
};
