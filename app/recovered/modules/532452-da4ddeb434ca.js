// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o, a, s;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.MethodIdempotency = t.MethodKind = void 0),
    ((a = r || (t.MethodKind = r = {}))[(a.Unary = 0)] = "Unary"),
    (a[(a.ServerStreaming = 1)] = "ServerStreaming"),
    (a[(a.ClientStreaming = 2)] = "ClientStreaming"),
    (a[(a.BiDiStreaming = 3)] = "BiDiStreaming"),
    ((s = o || (t.MethodIdempotency = o = {}))[(s.NoSideEffects = 1)] =
      "NoSideEffects"),
    (s[(s.Idempotent = 2)] = "Idempotent"));
};
