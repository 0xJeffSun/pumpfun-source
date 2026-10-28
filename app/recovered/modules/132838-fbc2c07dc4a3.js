// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(462852),
    r = e.i(241175),
    n = e.i(51435),
    a = e.i(213618),
    o = class extends n.f {
      #e;
      #t = void 0;
      #i;
      #r;
      constructor(e, t) {
        (super(),
          (this.#e = e),
          this.setOptions(t),
          this.bindMethods(),
          this.#n());
      }
      bindMethods() {
        ((this.mutate = this.mutate.bind(this)),
          (this.reset = this.reset.bind(this)));
      }
      setOptions(e) {
        let t = this.options;
        ((this.options = this.#e.defaultMutationOptions(e)),
          (0, a.U)(this.options, t) ||
            this.#e
              .getMutationCache()
              .notify({
                type: "observerOptionsUpdated",
                mutation: this.#i,
                observer: this,
              }),
          t?.mutationKey &&
          this.options.mutationKey &&
          (0, a.q)(t.mutationKey) !== (0, a.q)(this.options.mutationKey)
            ? this.reset()
            : this.#i?.state.status === "pending" &&
              this.#i.setOptions(this.options));
      }
      onUnsubscribe() {
        this.hasListeners() || this.#i?.removeObserver(this);
      }
      onMutationUpdate(e) {
        (this.#n(), this.#a(e));
      }
      getCurrentResult() {
        return this.#t;
      }
      reset() {
        (this.#i?.removeObserver(this),
          (this.#i = void 0),
          this.#n(),
          this.#a());
      }
      mutate(e, t) {
        return (
          (this.#r = t),
          this.#i?.removeObserver(this),
          (this.#i = this.#e.getMutationCache().build(this.#e, this.options)),
          this.#i.addObserver(this),
          this.#i.execute(e)
        );
      }
      #n() {
        let e = this.#i?.state ?? (0, i.r)();
        this.#t = {
          ...e,
          isPending: "pending" === e.status,
          isSuccess: "success" === e.status,
          isError: "error" === e.status,
          isIdle: "idle" === e.status,
          mutate: this.mutate,
          reset: this.reset,
        };
      }
      #a(e) {
        r.f.batch(() => {
          if (this.#r && this.hasListeners()) {
            let t = this.#t.variables,
              i = this.#t.context;
            e?.type === "success"
              ? (this.#r.onSuccess?.(e.data, t, i),
                this.#r.onSettled?.(e.data, null, t, i))
              : e?.type === "error" &&
                (this.#r.onError?.(e.error, t, i),
                this.#r.onSettled?.(void 0, e.error, t, i));
          }
          this.listeners.forEach((e) => {
            e(this.#t);
          });
        });
      }
    },
    s = e.i(606933),
    l = e.i(667669);
  e.s(
    [
      "f",
      0,
      function (e, i) {
        let n = (0, s.useQueryClient)(i),
          [a] = t.useState(() => new o(n, e));
        t.useEffect(() => {
          a.setOptions(e);
        }, [a, e]);
        let u = t.useSyncExternalStore(
            t.useCallback((e) => a.subscribe(r.f.batchCalls(e)), [a]),
            () => a.getCurrentResult(),
            () => a.getCurrentResult(),
          ),
          c = t.useCallback(
            (e, t) => {
              a.mutate(e, t).catch(l.z);
            },
            [a],
          );
        if (u.error && (0, l.Z)(a.options.throwOnError, [u.error]))
          throw u.error;
        return { ...u, mutate: c, mutateAsync: u.mutate };
      },
    ],
    132838,
  );
};
