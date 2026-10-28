// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(283195);
  ((r.render = function (t, e, r) {
    var o;
    let i = r,
      a = e;
    (void 0 !== i || (e && e.getContext) || ((i = e), (e = void 0)),
      e ||
        (a = (function () {
          try {
            return document.createElement("canvas");
          } catch (t) {
            throw Error("You need to specify a canvas element");
          }
        })()),
      (i = n.getOptions(i)));
    let l = n.getImageWidth(t.modules.size, i),
      s = a.getContext("2d"),
      u = s.createImageData(l, l);
    return (
      n.qrToImageData(u.data, t, i),
      (o = a),
      s.clearRect(0, 0, o.width, o.height),
      o.style || (o.style = {}),
      (o.height = l),
      (o.width = l),
      (o.style.height = l + "px"),
      (o.style.width = l + "px"),
      s.putImageData(u, 0, 0),
      a
    );
  }),
    (r.renderToDataURL = function (t, e, n) {
      let o = n;
      (void 0 !== o || (e && e.getContext) || ((o = e), (e = void 0)),
        o || (o = {}));
      let i = r.render(t, e, o),
        a = o.type || "image/png",
        l = o.rendererOpts || {};
      return i.toDataURL(a, l.quality);
    }));
};
