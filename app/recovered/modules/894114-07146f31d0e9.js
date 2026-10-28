// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.i(149502);
  var e = t.i(213618),
    r = t.i(241175),
    a = t.i(29777),
    s = t.i(611996),
    n = class extends s.f {
      #a;
      #s;
      #n;
      #i;
      #o;
      #l;
      #u;
      constructor(t) {
        var e;
        let r, a, s;
        (super(),
          (this.#u = !1),
          (this.#l = t.defaultOptions),
          this.setOptions(t.options),
          (this.observers = []),
          (this.#i = t.client),
          (this.#n = this.#i.getQueryCache()),
          (this.queryKey = t.queryKey),
          (this.queryHash = t.queryHash),
          (this.#a =
            ((s = (a =
              void 0 !==
              (r =
                "function" == typeof (e = this.options).initialData
                  ? e.initialData()
                  : e.initialData))
              ? "function" == typeof e.initialDataUpdatedAt
                ? e.initialDataUpdatedAt()
                : e.initialDataUpdatedAt
              : 0),
            {
              data: r,
              dataUpdateCount: 0,
              dataUpdatedAt: a ? (s ?? Date.now()) : 0,
              error: null,
              errorUpdateCount: 0,
              errorUpdatedAt: 0,
              fetchFailureCount: 0,
              fetchFailureReason: null,
              fetchMeta: null,
              isInvalidated: !1,
              status: a ? "success" : "pending",
              fetchStatus: "idle",
            })),
          (this.state = t.state ?? this.#a),
          this.scheduleGc());
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        return this.#o?.promise;
      }
      setOptions(t) {
        ((this.options = { ...this.#l, ...t }),
          this.updateGcTime(this.options.gcTime));
      }
      optionalRemove() {
        this.observers.length ||
          "idle" !== this.state.fetchStatus ||
          this.#n.remove(this);
      }
      setData(t, r) {
        let a = (0, e.M)(this.state.data, t, this.options);
        return (
          this.#d({
            data: a,
            type: "success",
            dataUpdatedAt: r?.updatedAt,
            manual: r?.manual,
          }),
          a
        );
      }
      setState(t, e) {
        this.#d({ type: "setState", state: t, setStateOptions: e });
      }
      cancel(t) {
        let r = this.#o?.promise;
        return (
          this.#o?.cancel(t),
          r ? r.then(e.z).catch(e.z) : Promise.resolve()
        );
      }
      destroy() {
        (super.destroy(), this.cancel({ silent: !0 }));
      }
      reset() {
        (this.destroy(), this.setState(this.#a));
      }
      isActive() {
        return this.observers.some(
          (t) => !1 !== (0, e.O)(t.options.enabled, this),
        );
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === e.V ||
              this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStale() {
        return (
          !!this.state.isInvalidated ||
          (this.getObserversCount() > 0
            ? this.observers.some((t) => t.getCurrentResult().isStale)
            : void 0 === this.state.data)
        );
      }
      isStaleByTime(t = 0) {
        return (
          this.state.isInvalidated ||
          void 0 === this.state.data ||
          !(0, e.C)(this.state.dataUpdatedAt, t)
        );
      }
      onFocus() {
        let t = this.observers.find((t) => t.shouldFetchOnWindowFocus());
        (t?.refetch({ cancelRefetch: !1 }), this.#o?.continue());
      }
      onOnline() {
        let t = this.observers.find((t) => t.shouldFetchOnReconnect());
        (t?.refetch({ cancelRefetch: !1 }), this.#o?.continue());
      }
      addObserver(t) {
        this.observers.includes(t) ||
          (this.observers.push(t),
          this.clearGcTimeout(),
          this.#n.notify({ type: "observerAdded", query: this, observer: t }));
      }
      removeObserver(t) {
        this.observers.includes(t) &&
          ((this.observers = this.observers.filter((e) => e !== t)),
          this.observers.length ||
            (this.#o &&
              (this.#u
                ? this.#o.cancel({ revert: !0 })
                : this.#o.cancelRetry()),
            this.scheduleGc()),
          this.#n.notify({
            type: "observerRemoved",
            query: this,
            observer: t,
          }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated || this.#d({ type: "invalidate" });
      }
      fetch(t, r) {
        if ("idle" !== this.state.fetchStatus) {
          if (void 0 !== this.state.data && r?.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (this.#o) return (this.#o.continueRetry(), this.#o.promise);
        }
        if ((t && this.setOptions(t), !this.options.queryFn)) {
          let t = this.observers.find((t) => t.options.queryFn);
          t && this.setOptions(t.options);
        }
        let s = new AbortController(),
          n = (t) => {
            Object.defineProperty(t, "signal", {
              enumerable: !0,
              get: () => ((this.#u = !0), s.signal),
            });
          },
          i = () => {
            let t = (0, e.W)(this.options, r),
              a = { client: this.#i, queryKey: this.queryKey, meta: this.meta };
            return (n(a), (this.#u = !1), this.options.persister)
              ? this.options.persister(t, a, this)
              : t(a);
          },
          o = {
            fetchOptions: r,
            options: this.options,
            queryKey: this.queryKey,
            client: this.#i,
            state: this.state,
            fetchFn: i,
          };
        (n(o),
          this.options.behavior?.onFetch(o, this),
          (this.#s = this.state),
          ("idle" === this.state.fetchStatus ||
            this.state.fetchMeta !== o.fetchOptions?.meta) &&
            this.#d({ type: "fetch", meta: o.fetchOptions?.meta }));
        let l = (t) => {
          (((0, a.M)(t) && t.silent) || this.#d({ type: "error", error: t }),
            (0, a.M)(t) ||
              (this.#n.config.onError?.(t, this),
              this.#n.config.onSettled?.(this.state.data, t, this)),
            this.scheduleGc());
        };
        return (
          (this.#o = (0, a.v)({
            initialPromise: r?.initialPromise,
            fn: o.fetchFn,
            abort: s.abort.bind(s),
            onSuccess: (t) => {
              if (void 0 === t)
                return void l(Error(`${this.queryHash} data is undefined`));
              try {
                this.setData(t);
              } catch (t) {
                l(t);
                return;
              }
              (this.#n.config.onSuccess?.(t, this),
                this.#n.config.onSettled?.(t, this.state.error, this),
                this.scheduleGc());
            },
            onError: l,
            onFail: (t, e) => {
              this.#d({ type: "failed", failureCount: t, error: e });
            },
            onPause: () => {
              this.#d({ type: "pause" });
            },
            onContinue: () => {
              this.#d({ type: "continue" });
            },
            retry: o.options.retry,
            retryDelay: o.options.retryDelay,
            networkMode: o.options.networkMode,
            canRun: () => !0,
          })),
          this.#o.start()
        );
      }
      #d(t) {
        let e = (e) => {
          switch (t.type) {
            case "failed":
              return {
                ...e,
                fetchFailureCount: t.failureCount,
                fetchFailureReason: t.error,
              };
            case "pause":
              return { ...e, fetchStatus: "paused" };
            case "continue":
              return { ...e, fetchStatus: "fetching" };
            case "fetch":
              return {
                ...e,
                ...i(e.data, this.options),
                fetchMeta: t.meta ?? null,
              };
            case "success":
              return {
                ...e,
                data: t.data,
                dataUpdateCount: e.dataUpdateCount + 1,
                dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
                error: null,
                isInvalidated: !1,
                status: "success",
                ...(!t.manual && {
                  fetchStatus: "idle",
                  fetchFailureCount: 0,
                  fetchFailureReason: null,
                }),
              };
            case "error":
              let r = t.error;
              if ((0, a.M)(r) && r.revert && this.#s)
                return { ...this.#s, fetchStatus: "idle" };
              return {
                ...e,
                error: r,
                errorUpdateCount: e.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: e.fetchFailureCount + 1,
                fetchFailureReason: r,
                fetchStatus: "idle",
                status: "error",
              };
            case "invalidate":
              return { ...e, isInvalidated: !0 };
            case "setState":
              return { ...e, ...t.state };
          }
        };
        ((this.state = e(this.state)),
          r.f.batch(() => {
            (this.observers.forEach((t) => {
              t.onQueryUpdate();
            }),
              this.#n.notify({ query: this, type: "updated", action: t }));
          }));
      }
    };
  function i(t, e) {
    return {
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchStatus: (0, a.e)(e.networkMode) ? "fetching" : "paused",
      ...(void 0 === t && { error: null, status: "pending" }),
    };
  }
  t.s(["X", 0, n, "W", 0, i]);
};
