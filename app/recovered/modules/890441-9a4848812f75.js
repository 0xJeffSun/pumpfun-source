// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    class {
      constructor() {
        this.callbacks = {};
      }
      notify(e, t) {
        let n = this.callbacks[e];
        n && n.forEach((e) => e(t));
      }
      subscribe(e, t) {
        return (
          this.callbacks[e] || (this.callbacks[e] = []),
          this.callbacks[e].push(t),
          {
            unsubscribe: () => {
              this.callbacks[e] = this.callbacks[e].filter((e) => t !== e);
            },
          }
        );
      }
    },
  ]);
};
