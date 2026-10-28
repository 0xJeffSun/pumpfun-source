// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(462931),
    o = t.r(490470),
    i = t.r(878524),
    a = t.r(908829),
    u = /^\[object .+?Constructor\]$/,
    c = Object.prototype,
    l = Function.prototype.toString,
    s = c.hasOwnProperty,
    f = RegExp(
      "^" +
        l
          .call(s)
          .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?",
          ) +
        "$",
    );
  e.exports = function (t) {
    return !(!i(t) || o(t)) && (n(t) ? f : u).test(a(t));
  };
};
