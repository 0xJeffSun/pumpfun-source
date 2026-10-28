// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(51435),
    r = t.i(213618),
    a = new (class extends e.f {
      #t;
      #e;
      #r;
      constructor() {
        (super(),
          (this.#r = (t) => {
            if (!r.l && window.addEventListener) {
              let e = () => t();
              return (
                window.addEventListener("visibilitychange", e, !1),
                () => {
                  window.removeEventListener("visibilitychange", e);
                }
              );
            }
          }));
      }
      onSubscribe() {
        this.#e || this.setEventListener(this.#r);
      }
      onUnsubscribe() {
        this.hasListeners() || (this.#e?.(), (this.#e = void 0));
      }
      setEventListener(t) {
        ((this.#r = t),
          this.#e?.(),
          (this.#e = t((t) => {
            "boolean" == typeof t ? this.setFocused(t) : this.onFocus();
          })));
      }
      setFocused(t) {
        this.#t !== t && ((this.#t = t), this.onFocus());
      }
      onFocus() {
        let t = this.isFocused();
        this.listeners.forEach((e) => {
          e(t);
        });
      }
      isFocused() {
        return "boolean" == typeof this.#t
          ? this.#t
          : globalThis.document?.visibilityState !== "hidden";
      }
    })();
  t.s(["f", 0, a]);
};
