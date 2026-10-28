// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.protoBase64 = void 0));
  let r =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
        "",
      ),
    o = [];
  for (let e = 0; e < r.length; e++) o[r[e].charCodeAt(0)] = e;
  ((o[45] = r.indexOf("+")),
    (o[95] = r.indexOf("/")),
    (t.protoBase64 = {
      dec(e) {
        let n = (3 * e.length) / 4;
        "=" == e[e.length - 2] ? (n -= 2) : "=" == e[e.length - 1] && (n -= 1);
        let t = new Uint8Array(n),
          r = 0,
          a = 0,
          s,
          i = 0;
        for (let n = 0; n < e.length; n++) {
          if (void 0 === (s = o[e.charCodeAt(n)]))
            switch (e[n]) {
              case "=":
                a = 0;
              case "\n":
              case "\r":
              case "	":
              case " ":
                continue;
              default:
                throw Error("invalid base64 string.");
            }
          switch (a) {
            case 0:
              ((i = s), (a = 1));
              break;
            case 1:
              ((t[r++] = (i << 2) | ((48 & s) >> 4)), (i = s), (a = 2));
              break;
            case 2:
              ((t[r++] = ((15 & i) << 4) | ((60 & s) >> 2)), (i = s), (a = 3));
              break;
            case 3:
              ((t[r++] = ((3 & i) << 6) | s), (a = 0));
          }
        }
        if (1 == a) throw Error("invalid base64 string.");
        return t.subarray(0, r);
      },
      enc(e) {
        let n = "",
          t = 0,
          o,
          a = 0;
        for (let s = 0; s < e.length; s++)
          switch (((o = e[s]), t)) {
            case 0:
              ((n += r[o >> 2]), (a = (3 & o) << 4), (t = 1));
              break;
            case 1:
              ((n += r[a | (o >> 4)]), (a = (15 & o) << 2), (t = 2));
              break;
            case 2:
              ((n += r[a | (o >> 6)]), (n += r[63 & o]), (t = 0));
          }
        return (t && ((n += r[a]), (n += "="), 1 == t && (n += "=")), n);
      },
    }));
};
