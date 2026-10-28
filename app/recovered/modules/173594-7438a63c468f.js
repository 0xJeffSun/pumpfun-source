// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  "use strict";
  var e = t.i(607079),
    i = t.i(77962);
  t.i(352386);
  class s extends i.Fj {
    $$PROVIDER_TYPE = "AUDIO";
    get type() {
      return "audio";
    }
    airPlay;
    constructor(t, s) {
      (super(t, s),
        (0, e.scoped)(() => {
          this.airPlay = new i.GB(this.media, s);
        }, this.scope));
    }
    setup() {
      (super.setup(),
        "audio" === this.type && this.ctx.notify("provider-setup", this));
    }
    get audio() {
      return this.media;
    }
  }
  t.s(["AudioProvider", 0, s]);
};
