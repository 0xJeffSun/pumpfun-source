// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(
    [
      "BACKOFF_BASE_MS",
      0,
      1e3,
      "BACKOFF_MAX_MS",
      0,
      3e4,
      "DRAIN_BASE_MS",
      0,
      500,
      "backoffDelay",
      0,
      (e, t) => Math.min(3e4, 1e3 * 2 ** e) * (0.5 + t()),
      "drainDelay",
      0,
      (e) => 500 * (0.5 + e()),
    ],
    168266,
  );
  var t = e.i(872682);
  e.s(
    [
      "STREAM_PROTOCOL",
      0,
      "pumpfun.trading.v1",
      "decodeFrame",
      0,
      (e) =>
        t.Frame.fromBinary(e instanceof Uint8Array ? e : new Uint8Array(e)),
      "encodeWatch",
      0,
      (e) => new t.WatchRequest(e).toBinary(),
      "ordinalKey",
      0,
      (e) => (e ? `${e.blockId}:${e.txIndex}:${e.eventIndex}` : ""),
    ],
    776238,
  );
};
