// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.TradeApi = void 0));
  let r = e.r(582279),
    o = e.r(376244),
    a = e.r(804140),
    s = e.r(480780),
    i = e.r(316332);
  t.TradeApi = {
    typeName: "pumpfun.trading.v1.TradeApi",
    methods: {
      getCoins: {
        name: "GetCoins",
        I: r.TradeApiGetCoinsRequest,
        O: r.TradeApiGetCoinsResponse,
        kind: o.MethodKind.Unary,
      },
      listCoins: {
        name: "ListCoins",
        I: r.TradeApiListCoinsRequest,
        O: r.TradeApiListCoinsResponse,
        kind: o.MethodKind.Unary,
      },
      getHolders: {
        name: "GetHolders",
        I: r.TradeApiGetHoldersRequest,
        O: a.HolderSet,
        kind: o.MethodKind.Unary,
      },
      getMarks: {
        name: "GetMarks",
        I: r.TradeApiGetMarksRequest,
        O: r.TradeApiGetMarksResponse,
        kind: o.MethodKind.Unary,
      },
      getCandles: {
        name: "GetCandles",
        I: r.TradeApiGetCandlesRequest,
        O: s.CandleSeries,
        kind: o.MethodKind.Unary,
      },
      listTrades: {
        name: "ListTrades",
        I: r.TradeApiListTradesRequest,
        O: r.TradePage,
        kind: o.MethodKind.Unary,
      },
      getPositions: {
        name: "GetPositions",
        I: r.TradeApiGetPositionsRequest,
        O: r.TradeApiGetPositionsResponse,
        kind: o.MethodKind.Unary,
      },
      getOpenOrders: {
        name: "GetOpenOrders",
        I: r.TradeApiGetOpenOrdersRequest,
        O: r.TradeApiGetOpenOrdersResponse,
        kind: o.MethodKind.Unary,
      },
      getPortfolioChart: {
        name: "GetPortfolioChart",
        I: r.TradeApiGetPortfolioChartRequest,
        O: r.TradeApiGetPortfolioChartResponse,
        kind: o.MethodKind.Unary,
      },
      getRealizedPnl: {
        name: "GetRealizedPnl",
        I: r.TradeApiGetRealizedPnlRequest,
        O: r.TradeApiGetRealizedPnlResponse,
        kind: o.MethodKind.Unary,
      },
      getReplay: {
        name: "GetReplay",
        I: r.TradeApiGetReplayRequest,
        O: r.TradeApiGetReplayResponse,
        kind: o.MethodKind.Unary,
      },
      getFees: {
        name: "GetFees",
        I: r.TradeApiGetFeesRequest,
        O: r.TradeApiGetFeesResponse,
        kind: o.MethodKind.Unary,
      },
      listQuoteAssets: {
        name: "ListQuoteAssets",
        I: r.TradeApiListQuoteAssetsRequest,
        O: r.TradeApiListQuoteAssetsResponse,
        kind: o.MethodKind.Unary,
      },
      watch: {
        name: "Watch",
        I: i.WatchRequest,
        O: i.Frame,
        kind: o.MethodKind.BiDiStreaming,
      },
    },
  };
};
