// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "2.56.0",
    r = {
      getDocsUrl: ({ docsBaseUrl: e, docsPath: t = "", docsSlug: r }) =>
        t ? `${e ?? "https://viem.sh"}${t}${r ? `#${r}` : ""}` : void 0,
      version: `viem@${t}`,
    };
  e.s(
    [
      "f",
      0,
      class e extends Error {
        constructor(n, s = {}) {
          let i =
              s.cause instanceof e
                ? s.cause.details
                : s.cause?.message
                  ? s.cause.message
                  : s.details,
            o = (s.cause instanceof e && s.cause.docsPath) || s.docsPath,
            a = r.getDocsUrl?.({ ...s, docsPath: o });
          (super(
            [
              n || "An error occurred.",
              "",
              ...(s.metaMessages ? [...s.metaMessages, ""] : []),
              ...(a ? [`Docs: ${a}`] : []),
              ...(i ? [`Details: ${i}`] : []),
              ...(r.version ? [`Version: ${r.version}`] : []),
            ].join("\n"),
            s.cause ? { cause: s.cause } : void 0,
          ),
            Object.defineProperty(this, "details", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "docsPath", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "metaMessages", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "shortMessage", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "version", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "BaseError",
            }),
            (this.details = i),
            (this.docsPath = o),
            (this.metaMessages = s.metaMessages),
            (this.name = s.name ?? this.name),
            (this.shortMessage = n),
            (this.version = t));
        }
        walk(e) {
          return (function e(t, r) {
            return r?.(t)
              ? t
              : t && "object" == typeof t && "cause" in t && void 0 !== t.cause
                ? e(t.cause, r)
                : r
                  ? null
                  : t;
          })(this, e);
        }
      },
    ],
    927974,
  );
};
