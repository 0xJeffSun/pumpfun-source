// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(310413),
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
  function i(t) {
    ((this.mode = n.ALPHANUMERIC), (this.data = t));
  }
  ((i.getBitsLength = function (t) {
    return 11 * Math.floor(t / 2) + (t % 2) * 6;
  }),
    (i.prototype.getLength = function () {
      return this.data.length;
    }),
    (i.prototype.getBitsLength = function () {
      return i.getBitsLength(this.data.length);
    }),
    (i.prototype.write = function (t) {
      let e;
      for (e = 0; e + 2 <= this.data.length; e += 2) {
        let r = 45 * o.indexOf(this.data[e]);
        ((r += o.indexOf(this.data[e + 1])), t.put(r, 11));
      }
      this.data.length % 2 && t.put(o.indexOf(this.data[e]), 6);
    }),
    (e.exports = i));
};
