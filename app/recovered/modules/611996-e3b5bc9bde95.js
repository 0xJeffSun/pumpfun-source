// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(213618),
    r = class {
      #D;
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        (this.clearGcTimeout(),
          (0, e.u)(this.gcTime) &&
            (this.#D = setTimeout(() => {
              this.optionalRemove();
            }, this.gcTime)));
      }
      updateGcTime(t) {
        this.gcTime = Math.max(this.gcTime || 0, t ?? (e.l ? 1 / 0 : 3e5));
      }
      clearGcTimeout() {
        this.#D && (clearTimeout(this.#D), (this.#D = void 0));
      }
    };
  t.s(["f", 0, r]);
};
