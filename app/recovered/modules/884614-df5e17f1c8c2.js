// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(77962),
    i = e.i(517770),
    n = e.i(607079);
  let o = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  class l extends n.Component {
    static props = { normalLabel: "Normal", rates: o };
    #e;
    #t;
    #r;
    get value() {
      return this.#r.value;
    }
    get disabled() {
      let { rates: e } = this.$props,
        { canSetPlaybackRate: t } = this.#e.$state;
      return !t() || 0 === e().length;
    }
    constructor() {
      (super(),
        (this.#r = new r.vp()),
        (this.#r.onValueChange = this.#i.bind(this)));
    }
    onSetup() {
      ((this.#e = (0, r.Dg)()),
        (0, n.hasProvidedContext)(r.xw) && (this.#t = (0, n.useContext)(r.xw)));
    }
    onConnect(e) {
      ((0, n.effect)(this.#n.bind(this)),
        (0, n.effect)(this.#o.bind(this)),
        (0, n.effect)(this.#l.bind(this)));
    }
    getOptions() {
      let { rates: e, normalLabel: t } = this.$props;
      return e().map((e) => ({
        label: 1 === e ? t : e + "×",
        value: e.toString(),
      }));
    }
    #n() {
      this.#r.value = this.#a();
    }
    #o() {
      let { normalLabel: e } = this.$props,
        { playbackRate: t } = this.#e.$state,
        r = t();
      this.#t?.hint.set(1 === r ? e() : r + "×");
    }
    #l() {
      this.#t?.disable(this.disabled);
    }
    #a() {
      let { playbackRate: e } = this.#e.$state;
      return e().toString();
    }
    #i(e, t) {
      if (this.disabled) return;
      let r = +e;
      (this.#e.remote.changePlaybackRate(r, t),
        this.dispatch("change", { detail: r, trigger: t }));
    }
  }
  let a = l.prototype;
  ((0, n.prop)(a, "value"),
    (0, n.prop)(a, "disabled"),
    (0, n.method)(a, "getOptions"),
    e.s([
      "f",
      0,
      function (e) {
        let n = (0, i.o)(),
          o = t.useRef(null);
        return (
          o.current || (o.current = new r.vL()),
          t.useEffect(() => {
            let t = e && "current" in e ? e.current : e,
              i = t instanceof r.kc ? t : n?.player;
            (o.current.setPlayer(i ?? null), o.current.setTarget(t ?? null));
          }, [n, e && "current" in e ? e.current : e]),
          o.current
        );
      },
    ]));
};
