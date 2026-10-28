// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(298352);
  ((i.render = function (t, e, i) {
    var o;
    let n = i,
      a = e;
    (void 0 !== n || (e && e.getContext) || ((n = e), (e = void 0)),
      e ||
        (a = (function () {
          try {
            return document.createElement("canvas");
          } catch (t) {
            throw Error("You need to specify a canvas element");
          }
        })()),
      (n = r.getOptions(n)));
    let s = r.getImageWidth(t.modules.size, n),
      l = a.getContext("2d"),
      c = l.createImageData(s, s);
    return (
      r.qrToImageData(c.data, t, n),
      (o = a),
      l.clearRect(0, 0, o.width, o.height),
      o.style || (o.style = {}),
      (o.height = s),
      (o.width = s),
      (o.style.height = s + "px"),
      (o.style.width = s + "px"),
      l.putImageData(c, 0, 0),
      a
    );
  }),
    (i.renderToDataURL = function (t, e, r) {
      let o = r;
      (void 0 !== o || (e && e.getContext) || ((o = e), (e = void 0)),
        o || (o = {}));
      let n = i.render(t, e, o),
        a = o.type || "image/png",
        s = o.rendererOpts || {};
      return n.toDataURL(a, s.quality);
    }));
};
