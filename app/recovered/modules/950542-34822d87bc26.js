// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, a, r) => {
  var i,
    n =
      ((i = [
        { name: "lowercase", re: /[a-z]/, length: 26 },
        { name: "uppercase", re: /[A-Z]/, length: 26 },
        { name: "numbers", re: /[0-9]/, length: 10 },
        { name: "symbols", re: /[^a-zA-Z0-9]/, length: 33 },
      ]),
      function (e) {
        return i.reduce(function (a, r) {
          return a + (r.re.test(e) ? r.length : 0);
        }, 0);
      });
  a.exports = function (e) {
    var a;
    return e
      ? ((a = n(e)), Math.round((e.length * Math.log(a)) / Math.LN2))
      : 0;
  };
};
