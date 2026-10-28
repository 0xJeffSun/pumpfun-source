// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(241175),
    i = e.i(643492),
    n = e.i(51435),
    s = e.i(213618);
  function l(e, t) {
    return e.filter((e) => !t.includes(e));
  }
  var a = class extends n.f {
      #e;
      #t;
      #r;
      #i;
      #n;
      #s;
      #l;
      #a;
      #o = [];
      constructor(e, t, r) {
        (super(),
          (this.#e = e),
          (this.#i = r),
          (this.#r = []),
          (this.#n = []),
          (this.#t = []),
          this.setQueries(t));
      }
      onSubscribe() {
        1 === this.listeners.size &&
          this.#n.forEach((e) => {
            e.subscribe((t) => {
              this.#u(e, t);
            });
          });
      }
      onUnsubscribe() {
        this.listeners.size || this.destroy();
      }
      destroy() {
        ((this.listeners = new Set()),
          this.#n.forEach((e) => {
            e.destroy();
          }));
      }
      setQueries(e, t, i) {
        ((this.#r = e),
          (this.#i = t),
          r.f.batch(() => {
            let e = this.#n,
              t = this.#c(this.#r);
            ((this.#o = t),
              t.forEach((e) =>
                e.observer.setOptions(e.defaultedQueryOptions, i),
              ));
            let r = t.map((e) => e.observer),
              n = r.map((e) => e.getCurrentResult()),
              s = r.some((t, r) => t !== e[r]);
            (e.length === r.length && !s) ||
              ((this.#n = r),
              (this.#t = n),
              this.hasListeners() &&
                (l(e, r).forEach((e) => {
                  e.destroy();
                }),
                l(r, e).forEach((e) => {
                  e.subscribe((t) => {
                    this.#u(e, t);
                  });
                }),
                this.#d()));
          }));
      }
      getCurrentResult() {
        return this.#t;
      }
      getQueries() {
        return this.#n.map((e) => e.getCurrentQuery());
      }
      getObservers() {
        return this.#n;
      }
      getOptimisticResult(e, t) {
        let r = this.#c(e),
          i = r.map((e) =>
            e.observer.getOptimisticResult(e.defaultedQueryOptions),
          );
        return [i, (e) => this.#f(e ?? i, t), () => this.#h(i, r)];
      }
      #h(e, t) {
        return t.map((r, i) => {
          let n = e[i];
          return r.defaultedQueryOptions.notifyOnChangeProps
            ? n
            : r.observer.trackResult(n, (e) => {
                t.forEach((t) => {
                  t.observer.trackProp(e);
                });
              });
        });
      }
      #f(e, t) {
        return t
          ? ((this.#s && this.#t === this.#a && t === this.#l) ||
              ((this.#l = t),
              (this.#a = this.#t),
              (this.#s = (0, s.B)(this.#s, t(e)))),
            this.#s)
          : e;
      }
      #c(e) {
        let t = new Map(this.#n.map((e) => [e.options.queryHash, e])),
          r = [];
        return (
          e.forEach((e) => {
            let n = this.#e.defaultQueryOptions(e),
              s = t.get(n.queryHash);
            s
              ? r.push({ defaultedQueryOptions: n, observer: s })
              : r.push({
                  defaultedQueryOptions: n,
                  observer: new i.f(this.#e, n),
                });
          }),
          r
        );
      }
      #u(e, t) {
        let r = this.#n.indexOf(e);
        if (-1 !== r) {
          var i;
          let e;
          ((this.#t = ((i = this.#t), ((e = i.slice(0))[r] = t), e)),
            this.#d());
        }
      }
      #d() {
        if (this.hasListeners()) {
          let e = this.#s,
            t = this.#h(this.#t, this.#o);
          e !== this.#f(t, this.#i?.combine) &&
            r.f.batch(() => {
              this.listeners.forEach((e) => {
                e(this.#t);
              });
            });
        }
      }
    },
    o = e.i(606933),
    u = e.i(324062),
    c = e.i(921489),
    d = e.i(389623),
    f = e.i(485881),
    h = e.i(667669);
  e.s(
    [
      "f",
      0,
      function ({ queries: e, ...n }, s) {
        let l = (0, o.useQueryClient)(s),
          m = (0, u.f)(),
          p = (0, c.f)(),
          b = t.useMemo(
            () =>
              e.map((e) => {
                let t = l.defaultQueryOptions(e);
                return (
                  (t._optimisticResults = m ? "isRestoring" : "optimistic"),
                  t
                );
              }),
            [e, l, m],
          );
        (b.forEach((e) => {
          ((0, f.p)(e), (0, d.l)(e, p));
        }),
          (0, d.E)(p));
        let [g] = t.useState(() => new a(l, b, n)),
          [y, v, w] = g.getOptimisticResult(b, n.combine),
          _ = !m && !1 !== n.subscribed;
        (t.useSyncExternalStore(
          t.useCallback(
            (e) => (_ ? g.subscribe(r.f.batchCalls(e)) : h.z),
            [g, _],
          ),
          () => g.getCurrentResult(),
          () => g.getCurrentResult(),
        ),
          t.useEffect(() => {
            g.setQueries(b, n, { listeners: !1 });
          }, [b, n, g]));
        let x = y.some((e, t) => (0, f.Q)(b[t], e))
          ? y.flatMap((e, t) => {
              let r = b[t];
              if (r) {
                let t = new i.f(l, r);
                if ((0, f.Q)(r, e)) return (0, f.X)(r, t, p);
                (0, f.t)(e, m) && (0, f.X)(r, t, p);
              }
              return [];
            })
          : [];
        if (x.length > 0) throw Promise.all(x);
        let E = y.find((e, t) => {
          let r = b[t];
          return (
            r &&
            (0, d.P)({
              result: e,
              errorResetBoundary: p,
              throwOnError: r.throwOnError,
              query: l.getQueryCache().get(r.queryHash),
              suspense: r.suspense,
            })
          );
        });
        if (E?.error) throw E.error;
        return v(w());
      },
    ],
    935258,
  );
};
