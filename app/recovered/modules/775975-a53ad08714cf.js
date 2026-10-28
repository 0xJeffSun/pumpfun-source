// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  function n(e, t) {
    return +e.toFixed(t);
  }
  function r(e) {
    return "number" == typeof e;
  }
  e.s(
    [
      "H",
      0,
      r,
      "M",
      0,
      function (e) {
        return r(e) && e >= 0 && e <= 100;
      },
      "e",
      0,
      function (e) {
        return 0 !== e && 100 * Math.random() <= e;
      },
      "I",
      0,
      n,
    ],
    589036,
  );
  function i() {
    return new Date().getTime();
  }
  function o() {
    return i();
  }
  function s() {
    return performance.now();
  }
  function u(e, t) {
    return e + t;
  }
  function a(e) {
    return e - l();
  }
  function l() {
    var e, n;
    return (
      void 0 === t &&
        (t =
          null !=
          (n = null == (e = performance.timing) ? void 0 : e.navigationStart)
            ? n
            : performance.timeOrigin),
      t
    );
  }
  e.s(
    [
      "n",
      0,
      36e5,
      "_",
      0,
      6e4,
      "R",
      0,
      1e3,
      "S",
      0,
      31536e6,
      "z",
      0,
      u,
      "o",
      0,
      function () {
        return { relative: s(), timeStamp: o() };
      },
      "t",
      0,
      function () {
        return { relative: 0, timeStamp: l() };
      },
      "K",
      0,
      function () {
        return Math.round(i() - u(l(), performance.now()));
      },
      "C",
      0,
      i,
      "G",
      0,
      function (e, t) {
        return t - e;
      },
      "D",
      0,
      a,
      "F",
      0,
      function (e) {
        return e < 31536e6;
      },
      "H",
      0,
      s,
      "j",
      0,
      function (e) {
        var t, n;
        let r;
        return {
          relative: e,
          timeStamp:
            ((t = e),
            (r = i() - performance.now()) > l()
              ? Math.round(u(r, t))
              : ((n = t), Math.round(u(l(), n)))),
        };
      },
      "J",
      0,
      o,
      "Y",
      0,
      function (e) {
        return { relative: a(e), timeStamp: e };
      },
      "T",
      0,
      function (e) {
        return r(e) ? n(1e6 * e, 0) : e;
      },
    ],
    775975,
  );
};
