// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  "use strict";
  e.exports = function (t) {
    for (var e = [], i = t.length, r = 0; r < i; r++) {
      var o = t.charCodeAt(r);
      if (o >= 55296 && o <= 56319 && i > r + 1) {
        var n = t.charCodeAt(r + 1);
        n >= 56320 &&
          n <= 57343 &&
          ((o = (o - 55296) * 1024 + n - 56320 + 65536), (r += 1));
      }
      if (o < 128) {
        e.push(o);
        continue;
      }
      if (o < 2048) {
        (e.push((o >> 6) | 192), e.push((63 & o) | 128));
        continue;
      }
      if (o < 55296 || (o >= 57344 && o < 65536)) {
        (e.push((o >> 12) | 224),
          e.push(((o >> 6) & 63) | 128),
          e.push((63 & o) | 128));
        continue;
      }
      if (o >= 65536 && o <= 1114111) {
        (e.push((o >> 18) | 240),
          e.push(((o >> 12) & 63) | 128),
          e.push(((o >> 6) & 63) | 128),
          e.push((63 & o) | 128));
        continue;
      }
      e.push(239, 191, 189);
    }
    return new Uint8Array(e).buffer;
  };
};
