// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(982069),
    r = t.i(241175),
    a = t.i(894114),
    s = t.i(51435),
    n = t.i(591379),
    i = t.i(213618),
    o = class extends s.f {
      constructor(t, e) {
        (super(),
          (this.options = e),
          (this.#i = t),
          (this.#c = null),
          (this.#h = (0, n.f)()),
          this.options.experimental_prefetchInRender ||
            this.#h.reject(
              Error(
                "experimental_prefetchInRender feature flag is not enabled",
              ),
            ),
          this.bindMethods(),
          this.setOptions(e));
      }
      #i;
      #f = void 0;
      #p = void 0;
      #m = void 0;
      #y;
      #v;
      #h;
      #c;
      #g;
      #b;
      #w;
      #x;
      #R;
      #E;
      #S = new Set();
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        1 === this.listeners.size &&
          (this.#f.addObserver(this),
          l(this.#f, this.options) ? this.#C() : this.updateResult(),
          this.#O());
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return u(this.#f, this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return u(this.#f, this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        ((this.listeners = new Set()),
          this.#T(),
          this.#k(),
          this.#f.removeObserver(this));
      }
      setOptions(t, e) {
        let r = this.options,
          a = this.#f;
        if (
          ((this.options = this.#i.defaultQueryOptions(t)),
          void 0 !== this.options.enabled &&
            "boolean" != typeof this.options.enabled &&
            "function" != typeof this.options.enabled &&
            "boolean" != typeof (0, i.O)(this.options.enabled, this.#f))
        )
          throw Error(
            "Expected enabled to be a boolean or a callback that returns a boolean",
          );
        (this.#I(),
          this.#f.setOptions(this.options),
          r._defaulted &&
            !(0, i.U)(this.options, r) &&
            this.#i
              .getQueryCache()
              .notify({
                type: "observerOptionsUpdated",
                query: this.#f,
                observer: this,
              }));
        let s = this.hasListeners();
        (s && d(this.#f, a, this.options, r) && this.#C(),
          this.updateResult(e),
          s &&
            (this.#f !== a ||
              (0, i.O)(this.options.enabled, this.#f) !==
                (0, i.O)(r.enabled, this.#f) ||
              (0, i.H)(this.options.staleTime, this.#f) !==
                (0, i.H)(r.staleTime, this.#f)) &&
            this.#M());
        let n = this.#Q();
        s &&
          (this.#f !== a ||
            (0, i.O)(this.options.enabled, this.#f) !==
              (0, i.O)(r.enabled, this.#f) ||
            n !== this.#E) &&
          this.#F(n);
      }
      getOptimisticResult(t) {
        var e, r;
        let a = this.#i.getQueryCache().build(this.#i, t),
          s = this.createResult(a, t);
        return (
          (e = this),
          (r = s),
          (0, i.U)(e.getCurrentResult(), r) ||
            ((this.#m = s),
            (this.#v = this.options),
            (this.#y = this.#f.state)),
          s
        );
      }
      getCurrentResult() {
        return this.#m;
      }
      trackResult(t, e) {
        let r = {};
        return (
          Object.keys(t).forEach((a) => {
            Object.defineProperty(r, a, {
              configurable: !1,
              enumerable: !0,
              get: () => (this.trackProp(a), e?.(a), t[a]),
            });
          }),
          r
        );
      }
      trackProp(t) {
        this.#S.add(t);
      }
      getCurrentQuery() {
        return this.#f;
      }
      refetch({ ...t } = {}) {
        return this.fetch({ ...t });
      }
      fetchOptimistic(t) {
        let e = this.#i.defaultQueryOptions(t),
          r = this.#i.getQueryCache().build(this.#i, e);
        return r.fetch().then(() => this.createResult(r, e));
      }
      fetch(t) {
        return this.#C({ ...t, cancelRefetch: t.cancelRefetch ?? !0 }).then(
          () => (this.updateResult(), this.#m),
        );
      }
      #C(t) {
        this.#I();
        let e = this.#f.fetch(this.options, t);
        return (t?.throwOnError || (e = e.catch(i.z)), e);
      }
      #M() {
        this.#T();
        let t = (0, i.H)(this.options.staleTime, this.#f);
        if (i.l || this.#m.isStale || !(0, i.u)(t)) return;
        let e = (0, i.C)(this.#m.dataUpdatedAt, t);
        this.#x = setTimeout(() => {
          this.#m.isStale || this.updateResult();
        }, e + 1);
      }
      #Q() {
        return (
          ("function" == typeof this.options.refetchInterval
            ? this.options.refetchInterval(this.#f)
            : this.options.refetchInterval) ?? !1
        );
      }
      #F(t) {
        (this.#k(),
          (this.#E = t),
          !i.l &&
            !1 !== (0, i.O)(this.options.enabled, this.#f) &&
            (0, i.u)(this.#E) &&
            0 !== this.#E &&
            (this.#R = setInterval(() => {
              (this.options.refetchIntervalInBackground || e.f.isFocused()) &&
                this.#C();
            }, this.#E)));
      }
      #O() {
        (this.#M(), this.#F(this.#Q()));
      }
      #T() {
        this.#x && (clearTimeout(this.#x), (this.#x = void 0));
      }
      #k() {
        this.#R && (clearInterval(this.#R), (this.#R = void 0));
      }
      createResult(t, e) {
        let r,
          s = this.#f,
          o = this.options,
          u = this.#m,
          h = this.#y,
          f = this.#v,
          p = t !== s ? t.state : this.#p,
          { state: m } = t,
          y = { ...m },
          v = !1;
        if (e._optimisticResults) {
          let r = this.hasListeners(),
            n = !r && l(t, e),
            i = r && d(t, s, e, o);
          ((n || i) && (y = { ...y, ...(0, a.W)(m.data, t.options) }),
            "isRestoring" === e._optimisticResults && (y.fetchStatus = "idle"));
        }
        let { error: g, errorUpdatedAt: b, status: w } = y;
        if (e.select && void 0 !== y.data)
          if (u && y.data === h?.data && e.select === this.#g) r = this.#b;
          else
            try {
              ((this.#g = e.select),
                (r = e.select(y.data)),
                (r = (0, i.M)(u?.data, r, e)),
                (this.#b = r),
                (this.#c = null));
            } catch (t) {
              this.#c = t;
            }
        else r = y.data;
        if (void 0 !== e.placeholderData && void 0 === r && "pending" === w) {
          let t;
          if (u?.isPlaceholderData && e.placeholderData === f?.placeholderData)
            t = u.data;
          else if (
            ((t =
              "function" == typeof e.placeholderData
                ? e.placeholderData(this.#w?.state.data, this.#w)
                : e.placeholderData),
            e.select && void 0 !== t)
          )
            try {
              ((t = e.select(t)), (this.#c = null));
            } catch (t) {
              this.#c = t;
            }
          void 0 !== t &&
            ((w = "success"), (r = (0, i.M)(u?.data, t, e)), (v = !0));
        }
        this.#c &&
          ((g = this.#c), (r = this.#b), (b = Date.now()), (w = "error"));
        let x = "fetching" === y.fetchStatus,
          R = "pending" === w,
          E = "error" === w,
          S = R && x,
          C = void 0 !== r,
          O = {
            status: w,
            fetchStatus: y.fetchStatus,
            isPending: R,
            isSuccess: "success" === w,
            isError: E,
            isInitialLoading: S,
            isLoading: S,
            data: r,
            dataUpdatedAt: y.dataUpdatedAt,
            error: g,
            errorUpdatedAt: b,
            failureCount: y.fetchFailureCount,
            failureReason: y.fetchFailureReason,
            errorUpdateCount: y.errorUpdateCount,
            isFetched: y.dataUpdateCount > 0 || y.errorUpdateCount > 0,
            isFetchedAfterMount:
              y.dataUpdateCount > p.dataUpdateCount ||
              y.errorUpdateCount > p.errorUpdateCount,
            isFetching: x,
            isRefetching: x && !R,
            isLoadingError: E && !C,
            isPaused: "paused" === y.fetchStatus,
            isPlaceholderData: v,
            isRefetchError: E && C,
            isStale: c(t, e),
            refetch: this.refetch,
            promise: this.#h,
          };
        if (this.options.experimental_prefetchInRender) {
          let e = (t) => {
              "error" === O.status
                ? t.reject(O.error)
                : void 0 !== O.data && t.resolve(O.data);
            },
            r = () => {
              e((this.#h = O.promise = (0, n.f)()));
            },
            a = this.#h;
          switch (a.status) {
            case "pending":
              t.queryHash === s.queryHash && e(a);
              break;
            case "fulfilled":
              ("error" === O.status || O.data !== a.value) && r();
              break;
            case "rejected":
              ("error" !== O.status || O.error !== a.reason) && r();
          }
        }
        return O;
      }
      updateResult(t) {
        let e = this.#m,
          r = this.createResult(this.#f, this.options);
        if (
          ((this.#y = this.#f.state),
          (this.#v = this.options),
          void 0 !== this.#y.data && (this.#w = this.#f),
          (0, i.U)(r, e))
        )
          return;
        this.#m = r;
        let a = {},
          s = () => {
            if (!e) return !0;
            let { notifyOnChangeProps: t } = this.options,
              r = "function" == typeof t ? t() : t;
            if ("all" === r || (!r && !this.#S.size)) return !0;
            let a = new Set(r ?? this.#S);
            return (
              this.options.throwOnError && a.add("error"),
              Object.keys(this.#m).some((t) => this.#m[t] !== e[t] && a.has(t))
            );
          };
        (t?.listeners !== !1 && s() && (a.listeners = !0),
          this.#j({ ...a, ...t }));
      }
      #I() {
        let t = this.#i.getQueryCache().build(this.#i, this.options);
        if (t === this.#f) return;
        let e = this.#f;
        ((this.#f = t),
          (this.#p = t.state),
          this.hasListeners() &&
            (e?.removeObserver(this), t.addObserver(this)));
      }
      onQueryUpdate() {
        (this.updateResult(), this.hasListeners() && this.#O());
      }
      #j(t) {
        r.f.batch(() => {
          (t.listeners &&
            this.listeners.forEach((t) => {
              t(this.#m);
            }),
            this.#i
              .getQueryCache()
              .notify({ query: this.#f, type: "observerResultsUpdated" }));
        });
      }
    };
  function l(t, e) {
    return (
      (!1 !== (0, i.O)(e.enabled, t) &&
        void 0 === t.state.data &&
        ("error" !== t.state.status || !1 !== e.retryOnMount)) ||
      (void 0 !== t.state.data && u(t, e, e.refetchOnMount))
    );
  }
  function u(t, e, r) {
    if (!1 !== (0, i.O)(e.enabled, t)) {
      let a = "function" == typeof r ? r(t) : r;
      return "always" === a || (!1 !== a && c(t, e));
    }
    return !1;
  }
  function d(t, e, r, a) {
    return (
      (t !== e || !1 === (0, i.O)(a.enabled, t)) &&
      (!r.suspense || "error" !== t.state.status) &&
      c(t, r)
    );
  }
  function c(t, e) {
    return (
      !1 !== (0, i.O)(e.enabled, t) && t.isStaleByTime((0, i.H)(e.staleTime, t))
    );
  }
  t.s(["f", 0, o]);
};
