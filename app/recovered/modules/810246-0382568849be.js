// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  function e(t, e) {
    -1 === t.indexOf(e) && t.push(e);
  }
  function i(t, e) {
    let i = t.indexOf(e);
    i > -1 && t.splice(i, 1);
  }
  (t.s(["I", 0, e, "i", 0, i], 926935),
    t.s(
      [
        "f",
        0,
        class {
          constructor() {
            this.subscriptions = [];
          }
          add(t) {
            return (e(this.subscriptions, t), () => i(this.subscriptions, t));
          }
          notify(t, e, i) {
            let s = this.subscriptions.length;
            if (s)
              if (1 === s) this.subscriptions[0](t, e, i);
              else
                for (let r = 0; r < s; r++) {
                  let s = this.subscriptions[r];
                  s && s(t, e, i);
                }
          }
          getSize() {
            return this.subscriptions.length;
          }
          clear() {
            this.subscriptions.length = 0;
          }
        },
      ],
      810246,
    ));
};
