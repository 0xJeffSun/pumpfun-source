// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(77962),
    i = e.i(607079);
  e.s([
    "f",
    0,
    class {
      #U;
      src = (0, i.signal)("");
      referrerPolicy = null;
      get iframe() {
        return this.#U;
      }
      constructor(e) {
        ((this.#U = e),
          e.setAttribute("frameBorder", "0"),
          e.setAttribute("aria-hidden", "true"),
          e.setAttribute(
            "allow",
            "autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope",
          ),
          null !== this.referrerPolicy &&
            e.setAttribute("referrerpolicy", this.referrerPolicy));
      }
      setup() {
        ((0, i.listenEvent)(window, "message", this.#W.bind(this)),
          (0, i.listenEvent)(this.#U, "load", this.onLoad.bind(this)),
          (0, i.effect)(this.#_.bind(this)));
      }
      #_() {
        let e = this.src();
        if (!e.length) return void this.#U.setAttribute("src", "");
        let s = (0, i.peek)(() => this.buildParams());
        this.#U.setAttribute("src", (0, t.cs)(e, s));
      }
      postMessage(e, i) {
        t.MJ || this.#U.contentWindow?.postMessage(JSON.stringify(e), i ?? "*");
      }
      #W(e) {
        let t = this.getOrigin();
        if (
          (null === e.source || e.source === this.#U?.contentWindow) &&
          (!(0, i.isString)(t) || t === e.origin)
        ) {
          try {
            let t = JSON.parse(e.data);
            t && this.onMessage(t, e);
            return;
          } catch (e) {}
          e.data && this.onMessage(e.data, e);
        }
      }
    },
  ]);
};
