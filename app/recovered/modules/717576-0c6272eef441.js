// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, a) => {
  var l = e.r(149324);
  function r(e, t) {
    if (void 0 == e.length) throw Error(e.length + "/" + t);
    for (var a = 0; a < e.length && 0 == e[a]; ) a++;
    this.num = Array(e.length - a + t);
    for (var l = 0; l < e.length - a; l++) this.num[l] = e[l + a];
  }
  ((r.prototype = {
    get: function (e) {
      return this.num[e];
    },
    getLength: function () {
      return this.num.length;
    },
    multiply: function (e) {
      for (
        var t = Array(this.getLength() + e.getLength() - 1), a = 0;
        a < this.getLength();
        a++
      )
        for (var i = 0; i < e.getLength(); i++)
          t[a + i] ^= l.gexp(l.glog(this.get(a)) + l.glog(e.get(i)));
      return new r(t, 0);
    },
    mod: function (e) {
      if (this.getLength() - e.getLength() < 0) return this;
      for (
        var t = l.glog(this.get(0)) - l.glog(e.get(0)),
          a = Array(this.getLength()),
          i = 0;
        i < this.getLength();
        i++
      )
        a[i] = this.get(i);
      for (var i = 0; i < e.getLength(); i++)
        a[i] ^= l.gexp(l.glog(e.get(i)) + t);
      return new r(a, 0).mod(e);
    },
  }),
    (t.exports = r));
};
