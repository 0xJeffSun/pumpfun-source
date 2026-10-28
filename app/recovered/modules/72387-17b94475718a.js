// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    s = e.i(352386),
    r = e.i(636447),
    a = e.i(759547),
    o = e.i(748117),
    n = e.i(586539),
    i = e.i(42799),
    l = e.i(653327),
    d = e.i(332835),
    c = e.i(810824),
    u = e.i(410979),
    p = e.i(335341),
    f = e.i(786847),
    m = e.i(40028),
    _ = e.i(541021);
  function g() {
    let e = (0, n.q)(),
      { closePrivyModal: t, privy: r, createAnalyticsEvent: a } = (0, o.u)(),
      i = e?.flowId,
      l = (0, s.useMemo)(() => (i ? (0, n.t)(a, i) : () => {}), [a, i]),
      d = e?.params ?? null,
      c = e?.config ?? { status: "loading" },
      u = (0, s.useCallback)(
        (e) => {
          let t = h(i);
          if (
            !t ||
            ((0, n.x)({ modalState: e }, i), t.modalState.step === e.step)
          )
            return;
          l({
            eventName: "sdk_deposit_address_step_viewed",
            payload: {
              step: e.step,
              ...("error" === e.step ? { errorCode: e.code } : {}),
            },
          });
          let s = (0, n.y)(e);
          s && l({ eventName: "sdk_deposit_address_concluded", payload: s });
        },
        [l, i],
      ),
      p = (0, s.useCallback)(async () => {
        let t = e?.controller,
          s = e?.flowId;
        if (d && t && s && !t.signal.aborted) {
          (0, n.x)({ config: { status: "loading" } }, s);
          try {
            await (0, n.z)(r, t.signal, s);
          } catch (e) {
            if (t.signal.aborted) return;
            throw (
              (0, n.x)(
                {
                  config: {
                    status: "error",
                    error:
                      e instanceof Error
                        ? e
                        : Error("Failed to load deposit config"),
                  },
                },
                s,
              ),
              e
            );
          }
        }
      }, [d, r, e?.controller, e?.flowId]),
      f = (0, s.useCallback)(() => {
        let e = h(i);
        if (!e) return;
        let { modalState: s } = e;
        if (
          (l({
            eventName: "sdk_deposit_address_exited",
            payload: {
              step: s.step,
              ...("error" === s.step ? { errorCode: s.code } : {}),
            },
          }),
          "complete" === s.step)
        )
          e.onComplete("completed");
        else if ("address" === s.step)
          (l({
            eventName: "sdk_deposit_address_concluded",
            payload: { outcome: "address_shown", step: "address" },
          }),
            e.onComplete("address_shown"));
        else if ("failed" === s.step) e.onError(Error("DEPOSIT_FAILED"));
        else if ("error" === s.step) e.onError(Error(s.code));
        else {
          let t = (0, n.A)({ step: s.step });
          (t && l({ eventName: "sdk_deposit_address_concluded", payload: t }),
            e.onError(Error("USER_EXITED")));
        }
        t({ shouldCallAuthOnSuccess: !1 });
      }, [i, t, l]);
    return {
      modalState: e?.modalState ?? { step: "intro" },
      setModalState: u,
      config: c,
      retryConfig: p,
      params: d,
      close: f,
      onBack: e?.onBack,
      createDepositAddressEvent: l,
    };
  }
  function h(e) {
    let t = n.q.getState();
    return t && t.flowId === e ? t : null;
  }
  function y(e) {
    let { modalState: t, config: s, params: r, ...a } = g();
    if (
      ((function (e, t) {
        if (e.step !== t) throw Error("UNEXPECTED_STATE");
      })(t, e),
      !r || "ready" !== s.status)
    )
      throw Error("UNEXPECTED_STATE");
    return { state: t, configData: s.data, params: r, ...a };
  }
  function C(e, t) {
    return Math.ceil(t / e);
  }
  function E(e, t) {
    switch (e.status) {
      case "succeeded":
        return {
          step: "complete",
          selectedCurrency: t.selectedCurrency,
          selectedChain: t.selectedChain,
          quote: t.quote,
          order: e,
        };
      case "failed":
      case "rejected":
        return {
          step: "failed",
          selectedCurrency: t.selectedCurrency,
          selectedChain: t.selectedChain,
          quote: t.quote,
          order: e,
        };
      case "pending":
        return {
          step: "processing",
          selectedCurrency: t.selectedCurrency,
          selectedChain: t.selectedChain,
          availableChains: t.availableChains,
          quote: t.quote,
          depositAddress: t.depositAddress,
          order: e,
        };
      default:
        return (e.status, { step: "error", code: "UNEXPECTED_STATE" });
    }
  }
  function w() {
    let {
        state: e,
        setModalState: r,
        close: l,
        params: d,
        configData: c,
        createDepositAddressEvent: u,
      } = y("address"),
      {
        quote: p,
        selectedCurrency: f,
        selectedChain: m,
        availableChains: _,
        depositAddress: h,
      } = e;
    return (
      (function ({ enabled: e }) {
        let { privy: t } = (0, o.u)(),
          { setModalState: r } = g(),
          { state: a, params: l } = y("address"),
          { walletId: d } = l,
          c = a.quote.created_at,
          u = (0, n.q)((e) => e?.flowId);
        (0, s.useEffect)(() => {
          t.track({
            name: "sdk_deposit_address_order_poll_started",
            properties: { version: "v3", action: "next_order", walletId: d },
          });
          let e = new AbortController(),
            s = !1;
          return (
            (0, i.Z)({
              operation: async () =>
                (
                  await i.l.getCryptoDepositAccountNextOrder(t, {
                    walletId: d,
                    after: c,
                  })
                ).order ?? void 0,
              until: (e) => void 0 !== e,
              delay: 2e3,
              interval: 2e3,
              attempts: C(2e3, 18e5),
              signal: e.signal,
            }).then((o) => {
              if (e.signal.aborted) return;
              let i = n.q.getState();
              i &&
                i.flowId === u &&
                "address" === i.modalState.step &&
                ((s = !0),
                t.track({
                  name: "sdk_deposit_address_order_poll_stopped",
                  properties: {
                    version: "v3",
                    action: "next_order",
                    walletId: d,
                    reason:
                      "success" === o.status && o.result ? "found" : "timeout",
                  },
                }),
                "success" === o.status && o.result
                  ? r(E(o.result, a))
                  : "max_attempts" === o.status &&
                    r({
                      step: "error",
                      code: "TIMEOUT_WAITING_FOR_NEXT_ORDER",
                    }));
            }),
            () => {
              (e.abort(),
                s ||
                  t.track({
                    name: "sdk_deposit_address_order_poll_stopped",
                    properties: {
                      version: "v3",
                      action: "next_order",
                      walletId: d,
                      reason: "aborted",
                    },
                  }));
            }
          );
        }, [c, e, u, t, r, d]);
      })({ enabled: !0 }),
      (0, t.jsx)(a.d, {
        quote: {
          deposit_address: h,
          indicative_rate: i.l.indicativeRateFromQuote(p),
          ...(null != d.slippageBps ? { slippage_bps: d.slippageBps } : {}),
        },
        selectedCurrency: f,
        selectedChain: m,
        destinationSymbol: i.l.findCatalogSymbol({
          config: c,
          chain: d.destination.chain,
          asset: d.destination.asset,
        }),
        destinationChainName: d.destination.chain
          ? (0, a.c)(i.l.resolveChainAlias(d.destination.chain), c.chains)
          : "",
        destinationAsset: d.destination.asset,
        onBack: () => {
          (u({
            eventName: "sdk_deposit_address_action",
            payload: { action: "back", step: "address" },
          }),
            1 !== _.length
              ? r({ step: "network", selectedCurrency: f, availableChains: _ })
              : r({ step: "token" }));
        },
        onClose: l,
      })
    );
  }
  function b() {
    let { close: e } = y("complete");
    return (0, t.jsx)(u.C, {
      icon: l.f,
      iconVariant: "success",
      title: "Transfer complete",
      subtitle:
        "Your deposit was received and the funds are now available in your wallet.",
      showClose: !0,
      onClose: e,
      primaryCta: { label: "Done", onClick: e },
      watermark: !1,
    });
  }
  function k(e) {
    return {
      symbol: e.symbol,
      name: e.name,
      logoURI: e.logo_uri,
      chains: e.chains,
    };
  }
  function S(e, t) {
    return e.chains.flatMap((e) => {
      let s = t.chains[e.caip2];
      return s
        ? [
            {
              caip2: e.caip2,
              displayName: s.display_name,
              iconUrl: s.icon_url,
              vmType: s.vm_type,
              currencyAddress: e.address,
              currencyDecimals: e.decimals,
            },
          ]
        : [];
    });
  }
  function T(e, t) {
    return i.l
      .filterDepositConfig(e, t)
      .currencies.filter((t) => S(k(t), e).length > 0)
      .map(k);
  }
  function A({ config: e, source: t }) {
    return 0 === T(e, t).length
      ? {
          step: "error",
          code: "ROUTE_UNAVAILABLE",
          message: "No source tokens match the provided filter",
        }
      : { step: "token" };
  }
  function v() {
    let e = n.q.getState();
    return (
      !!e &&
      "ready" === e.config.status &&
      T(e.config.data, e.params.source).length > 0
    );
  }
  function N() {
    let {
      modalState: e,
      setModalState: r,
      config: a,
      params: o,
      retryConfig: n,
      close: i,
      createDepositAddressEvent: l,
    } = g();
    if ("error" !== e.step) throw Error("UNEXPECTED_STATE");
    let { code: c } = e,
      {
        title: p,
        subtitle: f,
        detail: m,
        iconVariant: _,
      } = ((e) => {
        switch (e) {
          case "AMOUNT_TOO_LOW":
            return {
              title: "Amount too low",
              subtitle:
                "The deposit amount is below the minimum for this route.",
              detail: "Try a larger amount or a different token.",
              iconVariant: "warning",
            };
          case "INSUFFICIENT_LIQUIDITY":
            return {
              title: "Insufficient liquidity",
              subtitle:
                "There isn't enough liquidity for this route right now.",
              detail: "Try a smaller amount or a different network.",
              iconVariant: "warning",
            };
          case "UNSUPPORTED_CHAIN":
            return {
              title: "Unsupported chain",
              subtitle:
                "Deposits from this chain type aren't supported yet. Try a different network.",
              iconVariant: "warning",
            };
          case "UNSUPPORTED_CURRENCY":
          case "UNSUPPORTED_ROUTE":
          case "ROUTE_UNAVAILABLE":
          case "NO_SWAP_ROUTES_FOUND":
          case "NO_INTERNAL_SWAP_ROUTES_FOUND":
          case "NO_QUOTES":
            return {
              title: "Route not available",
              subtitle:
                "This deposit route isn't supported right now. Try a different token or network.",
              iconVariant: "warning",
            };
          case "SANCTIONED_WALLET_ADDRESS":
            return {
              title: "Address restricted",
              subtitle:
                "This address cannot be used for deposits due to compliance restrictions.",
              iconVariant: "warning",
            };
          case "DEPOSIT_ADDRESSES_NOT_ENABLED":
            return {
              title: "Not enabled",
              subtitle: "Deposit addresses are not enabled for this app.",
              iconVariant: "warning",
            };
          case "NOT_AUTHENTICATED":
            return {
              title: "Not signed in",
              subtitle: "Please sign in to continue with your deposit.",
              iconVariant: "warning",
            };
          default:
            return {
              title: "Something went wrong",
              subtitle: "We couldn't complete your request. Please try again.",
              iconVariant: "subtle",
            };
        }
      })(c),
      [h, y] = (0, s.useState)(!1),
      C = "ready" !== a.status || (null != o && T(a.data, o.source).length > 0);
    return (0, t.jsx)(u.C, {
      icon: d.f,
      iconVariant: _,
      title: p,
      subtitle: m ? `${f} ${m}` : f,
      showClose: !0,
      onClose: i,
      primaryCta: C
        ? {
            label: "Try again",
            onClick: async () => {
              if (
                (l({
                  eventName: "sdk_deposit_address_action",
                  payload: { action: "retry", step: "error", errorCode: c },
                }),
                "ready" !== a.status)
              ) {
                y(!0);
                try {
                  if ((await n(), v())) return void r({ step: "token" });
                } catch {}
                y(!1);
              } else v() && r({ step: "token" });
            },
            loading: h,
          }
        : void 0,
      watermark: !0,
    });
  }
  function I() {
    let { close: e } = y("failed");
    return (0, t.jsx)(p.S, {
      icon: d.f,
      iconVariant: "error",
      title: "Transfer failed",
      subtitle: "Something went wrong processing your transfer.",
      showClose: !0,
      onClose: e,
      primaryCta: { label: "Done", onClick: e },
      watermark: !0,
    });
  }
  function x() {
    let {
        close: e,
        setModalState: r,
        config: a,
        params: o,
        onBack: n,
        createDepositAddressEvent: i,
      } = g(),
      [l, d] = (0, s.useState)(!1);
    return (
      (0, s.useEffect)(() => {
        l &&
          o &&
          ("ready" === a.status && r(A({ config: a.data, source: o.source })),
          "error" === a.status &&
            r({ step: "error", code: "ROUTE_UNAVAILABLE" }));
      }, [l, a, o, r]),
      (0, t.jsx)(u.C, {
        icon: c.f,
        iconVariant: "subtle",
        title: "Add funds",
        subtitle: "Top up your account by sending crypto from any wallet.",
        showClose: !0,
        onClose: e,
        showBack: !!n,
        onBack: n
          ? () => {
              (i({
                eventName: "sdk_deposit_address_action",
                payload: { action: "back", step: "intro" },
              }),
                n());
            }
          : void 0,
        primaryCta: {
          label: "Continue",
          onClick: () => {
            (i({
              eventName: "sdk_deposit_address_action",
              payload: { action: "continue", step: "intro" },
            }),
              "ready" === a.status && o
                ? r(A({ config: a.data, source: o.source }))
                : "error" === a.status
                  ? r({ step: "error", code: "ROUTE_UNAVAILABLE" })
                  : d(!0));
          },
          loading: l && "loading" === a.status,
          loadingText: null,
        },
        watermark: !0,
      })
    );
  }
  function D() {
    let { params: e, setModalState: t } = g(),
      { privy: r } = (0, o.u)(),
      { signWithUserSigner: l } = (0, m.u)(),
      [d, c] = (0, s.useState)(!1);
    return {
      confirm: (0, s.useCallback)(
        async (s, o, d) => {
          if (!e) return;
          let u = n.q.getState();
          if (!u || u.controller.signal.aborted) return;
          let { flowId: p } = u,
            f = e.destination.chain;
          if (!f)
            return void t({
              step: "error",
              code: "UNSUPPORTED_CHAIN",
              message: "Destination chain is required",
            });
          c(!0);
          let m = n.q.getState()?.depositAccounts;
          try {
            let a =
              "ready" === m?.status
                ? Promise.resolve(m.data)
                : i.l.createCryptoDepositAccount(r, l, {
                    walletId: e.walletId,
                    type: "inline_route",
                    source: e.source,
                    destination: e.destination,
                  });
            "ready" !== m?.status &&
              (0, n.x)({ depositAccounts: { status: "loading" } }, p);
            let [c, u] = await Promise.all([
              i.l.getCryptoDepositAccountQuote(r, {
                source: {
                  chain: s.caip2,
                  asset: i.l.quoteSourceAsset({
                    symbol: o.symbol,
                    address: s.currencyAddress,
                  }),
                },
                destination: { chain: f, asset: e.destination.asset },
                ...(null != e.slippageBps
                  ? { slippageBps: e.slippageBps }
                  : {}),
              }),
              a,
            ]);
            (0, n.x)({ depositAccounts: { status: "ready", data: u } }, p);
            let _ = i.l.pickDepositAddressForChain({
              accounts: u.deposit_accounts,
              selectedChain: s,
            });
            if (!_)
              return void t({
                step: "error",
                code: "ROUTE_UNAVAILABLE",
                message:
                  "No deposit address is available for the selected chain",
              });
            t({
              step: "address",
              selectedCurrency: o,
              selectedChain: s,
              availableChains: d,
              quote: c,
              depositAddress: _,
            });
          } catch (o) {
            let e,
              s = o instanceof Error ? o : Error(String(o)),
              r =
                "status" in s && "number" == typeof s.status
                  ? s.status
                  : void 0;
            ((e =
              s instanceof i.W && "feature_not_enabled" === s.code
                ? "DEPOSIT_ADDRESSES_NOT_ENABLED"
                : r && r >= 500
                  ? "UNKNOWN_ERROR"
                  : (0, a.t)(s.message)),
              "ready" !== m?.status &&
                (0, n.x)({ depositAccounts: { status: "error", error: s } }, p),
              t({ step: "error", code: e, message: s.message }));
          } finally {
            c(!1);
          }
        },
        [e, r, t, l],
      ),
      isFetching: d,
    };
  }
  function U() {
    let {
        state: e,
        setModalState: r,
        close: a,
        createDepositAddressEvent: o,
      } = y("network"),
      [i, l] = (0, s.useState)(-1),
      { availableChains: d } = e,
      { confirm: c, isFetching: m } = (function () {
        let e = (0, n.q)(),
          { params: t } = g(),
          { confirm: r, isFetching: a } = D();
        return {
          confirm: (0, s.useCallback)(
            async (s) => {
              if (!s || !t) return;
              let a = e?.modalState;
              a &&
                "network" === a.step &&
                (await r(s, a.selectedCurrency, a.availableChains));
            },
            [t, e, r],
          ),
          isFetching: a,
        };
      })();
    return (0, t.jsx)(p.S, {
      title: "Select network",
      eyebrow: (0, t.jsxs)("span", {
        style: { display: "flex", alignItems: "center", gap: "0.375rem" },
        children: [
          (0, t.jsx)("img", {
            src: e.selectedCurrency.logoURI,
            alt: "",
            style: { width: "1rem", height: "1rem", borderRadius: "50%" },
          }),
          "Send ",
          e.selectedCurrency.symbol,
        ],
      }),
      showBack: !0,
      onBack: () => {
        (o({
          eventName: "sdk_deposit_address_action",
          payload: { action: "back", step: "network" },
        }),
          r({ step: "token" }));
      },
      showClose: !0,
      onClose: a,
      watermark: !0,
      children: (0, t.jsx)(f.S, {
        style: { marginTop: "1rem", height: "22rem" },
        $colorScheme: "light",
        children: d.map((e, s) =>
          (0, t.jsxs)(
            u.O,
            {
              $selected: i === s,
              disabled: m,
              onClick: () => {
                (o({
                  eventName: "sdk_deposit_address_action",
                  payload: {
                    action: "network_selected",
                    step: "network",
                    network: e.caip2,
                  },
                }),
                  l(s),
                  c(e));
              },
              children: [
                (0, t.jsx)(u.N, { src: e.iconUrl, alt: e.displayName }),
                (0, t.jsx)(u.a, { children: e.displayName }),
                m && s === i && (0, t.jsx)(u.b, {}),
              ],
            },
            e.caip2,
          ),
        ),
      }),
    });
  }
  function O() {
    let { close: e } = y("processing");
    return (
      (function ({ enabled: e }) {
        let { privy: t } = (0, o.u)(),
          { setModalState: r } = g(),
          { state: a, params: l } = y("processing"),
          { walletId: d } = l,
          c = a.order.id,
          u = (0, n.q)((e) => e?.flowId);
        (0, s.useEffect)(() => {
          t.track({
            name: "sdk_deposit_address_order_poll_started",
            properties: { version: "v3", action: "get_order", walletId: d },
          });
          let e = new AbortController(),
            s = !1;
          return (
            (0, i.Z)({
              operation: () =>
                i.l.getCryptoDepositAccountOrder(t, {
                  walletId: d,
                  orderId: c,
                }),
              until: (e) => "pending" !== e.status,
              delay: 2e3,
              interval: 2e3,
              attempts: C(2e3, 18e5),
              signal: e.signal,
            }).then((o) => {
              if (e.signal.aborted) return;
              let i = n.q.getState();
              i &&
                i.flowId === u &&
                "processing" === i.modalState.step &&
                i.modalState.order.id === c &&
                ((s = !0),
                t.track({
                  name: "sdk_deposit_address_order_poll_stopped",
                  properties: {
                    version: "v3",
                    action: "get_order",
                    walletId: d,
                    reason: "success" === o.status ? "found" : "timeout",
                  },
                }),
                "success" === o.status
                  ? r(E(o.result, a))
                  : "max_attempts" === o.status &&
                    r({ step: "error", code: "TIMEOUT_ORDER_COMPLETION" }));
            }),
            () => {
              (e.abort(),
                s ||
                  t.track({
                    name: "sdk_deposit_address_order_poll_stopped",
                    properties: {
                      version: "v3",
                      action: "get_order",
                      walletId: d,
                      reason: "aborted",
                    },
                  }));
            }
          );
        }, [e, u, c, t, r, d]);
      })({ enabled: !0 }),
      (0, t.jsx)(a.D, { onClose: e })
    );
  }
  function j() {
    let {
        close: e,
        setModalState: r,
        config: a,
        createDepositAddressEvent: o,
      } = g(),
      {
        confirm: n,
        currencies: i,
        isFetching: l,
      } = (function () {
        let { config: e, params: t, setModalState: r } = g(),
          { confirm: a, isFetching: o } = D(),
          n = "ready" === e.status && t ? T(e.data, t.source) : [];
        return {
          confirm: (0, s.useCallback)(
            async (t) => {
              if ("ready" !== e.status || !t) return;
              let s = S(t, e.data);
              if (1 !== s.length)
                r({ step: "network", selectedCurrency: t, availableChains: s });
              else {
                let e = s[0];
                await a(e, t, s);
              }
            },
            [e, a, r],
          ),
          currencies: n,
          isFetching: o,
        };
      })(),
      [d, c] = (0, s.useState)(-1);
    return (0, t.jsx)(p.S, {
      title: "Select token",
      subtitle: "Choose the asset you'll send.",
      showBack: !0,
      onBack: () => {
        (o({
          eventName: "sdk_deposit_address_action",
          payload: { action: "back", step: "token" },
        }),
          r({ step: "intro" }));
      },
      showClose: !0,
      onClose: e,
      watermark: !0,
      children:
        "error" === a.status
          ? (0, t.jsx)(u.L, {
              children: (0, t.jsx)(u.S, { children: "Failed to load tokens" }),
            })
          : "loading" === a.status
            ? (0, t.jsx)(u.L, { children: (0, t.jsx)(_.L, {}) })
            : (0, t.jsx)(f.S, {
                style: { marginTop: "1rem", height: "22rem" },
                $colorScheme: "light",
                children: i.map((e, s) =>
                  (0, t.jsxs)(
                    u.O,
                    {
                      $selected: d === s,
                      disabled: l,
                      onClick: () => {
                        (o({
                          eventName: "sdk_deposit_address_action",
                          payload: {
                            action: "token_selected",
                            step: "token",
                            token: e.symbol,
                          },
                        }),
                          c(s),
                          n(e));
                      },
                      children: [
                        (0, t.jsx)(u.T, { src: e.logoURI, alt: e.symbol }),
                        (0, t.jsx)(u.a, { children: e.name }),
                        l && s === d
                          ? (0, t.jsx)(u.b, {})
                          : (0, t.jsx)(u.c, { children: e.symbol }),
                      ],
                    },
                    e.symbol,
                  ),
                ),
              }),
    });
  }
  function R() {
    let { modalState: e, setModalState: s } = g();
    return (0, t.jsx)(a.e, {
      onError: (e) =>
        s({ step: "error", code: "UNEXPECTED_STATE", message: e.message }),
      resetKey: e.step,
      children: (0, t.jsx)(q, {}),
    });
  }
  function q() {
    let { modalState: e } = g();
    switch (e.step) {
      case "intro":
        return (0, t.jsx)(x, {});
      case "token":
        return (0, t.jsx)(j, {});
      case "network":
        return (0, t.jsx)(U, {});
      case "address":
        return (0, t.jsx)(w, {});
      case "processing":
        return (0, t.jsx)(O, {});
      case "complete":
        return (0, t.jsx)(b, {});
      case "failed":
        return (0, t.jsx)(I, {});
      case "error":
        return (0, t.jsx)(N, {});
      default:
        return null;
    }
  }
  (e.i(252494),
    e.i(698870),
    e.i(785373),
    e.s([
      "default",
      0,
      {
        component: () => {
          let { onUserCloseViaDialogOrKeybindRef: e } = (0, r.u)(),
            a = (0, n.q)(),
            { close: o, config: i } = g();
          return (
            (0, s.useEffect)(() => {
              e.current = o;
            }, [e, o]),
            (0, s.useEffect)(() => {
              if ("ready" === i.status) {
                for (let e of i.data.currencies) new Image().src = e.logo_uri;
                for (let e of Object.values(i.data.chains))
                  new Image().src = e.icon_url;
              }
            }, [i]),
            a ? (0, t.jsx)(R, {}) : null
          );
        },
      },
    ]));
};
