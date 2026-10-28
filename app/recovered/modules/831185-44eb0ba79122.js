// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(77962),
    i = e.i(607079);
  e.s([
    "f",
    0,
    class {
      #x;
      src = (0, i.signal)("");
      referrerPolicy = null;
      get iframe() {
        return this.#x;
      }
      constructor(e) {
        ((this.#x = e),
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
        ((0, i.listenEvent)(window, "message", this.#P.bind(this)),
          (0, i.listenEvent)(this.#x, "load", this.onLoad.bind(this)),
          (0, i.effect)(this.#k.bind(this)));
      }
      #k() {
        let e = this.src();
        if (!e.length) return void this.#x.setAttribute("src", "");
        let s = (0, i.peek)(() => this.buildParams());
        this.#x.setAttribute("src", (0, t.cs)(e, s));
      }
      postMessage(e, i) {
        t.MJ || this.#x.contentWindow?.postMessage(JSON.stringify(e), i ?? "*");
      }
      #P(e) {
        let t = this.getOrigin();
        if (
          (null === e.source || e.source === this.#x?.contentWindow) &&
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
