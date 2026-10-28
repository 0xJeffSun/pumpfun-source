// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(862570),
    i = e.i(679877),
    s = Object.defineProperty,
    r = (e, t, i) => {
      let r;
      return (r = "symbol" != typeof t ? t + "" : t) in e
        ? s(e, r, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[r] = i);
    };
  class a extends t.f {
    constructor(e) {
      (super(),
        (this.opts = e),
        r(this, "protocol", "wc"),
        r(this, "version", 2));
    }
  }
  var n = Object.defineProperty;
  class o extends t.f {
    constructor(e, t) {
      var i, s;
      let r;
      (super(),
        (this.core = e),
        (this.logger = t),
        (i = "records"),
        (s = new Map()),
        (r = "symbol" != typeof i ? i + "" : i) in this
          ? n(this, r, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: s,
            })
          : (this[r] = s));
    }
  }
  class c extends t.f {
    constructor(e, t) {
      (super(), (this.relayer = e), (this.logger = t));
    }
  }
  class l extends t.f {
    constructor(e) {
      super();
    }
  }
  class h extends t.f {
    constructor(e, t) {
      (super(), (this.relayer = e), (this.logger = t));
    }
  }
  class u extends t.f {
    constructor(e, t) {
      (super(), (this.core = e), (this.logger = t));
    }
  }
  var d = Object.defineProperty,
    p = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? d(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  (i.default,
    i.EventEmitter,
    e.s([
      "C",
      0,
      a,
      "r",
      0,
      class {
        constructor(e, t) {
          ((this.projectId = e), (this.logger = t));
        }
      },
      "M",
      0,
      class {
        constructor(e) {
          this.client = e;
        }
      },
      "I",
      0,
      class {
        constructor(e, t, i) {
          ((this.core = e), (this.logger = t), (this.telemetryEnabled = i));
        }
      },
      "g",
      0,
      u,
      "d",
      0,
      o,
      "a",
      0,
      class {
        constructor(e, t) {
          ((this.logger = e), (this.core = t));
        }
      },
      "G",
      0,
      c,
      "k",
      0,
      l,
      "W",
      0,
      class {
        constructor(e) {
          ((this.opts = e), p(this, "protocol", "wc"), p(this, "version", 2));
        }
      },
      "i",
      0,
      class {
        constructor(e, t, i, s) {
          ((this.core = e), (this.logger = t), (this.name = i));
        }
      },
      "B",
      0,
      h,
      "y",
      0,
      class {
        constructor(e, t, i) {
          ((this.core = e), (this.logger = t), (this.store = i));
        }
      },
    ]));
};
