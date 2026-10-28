// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "2.56.0",
    a = {
      getDocsUrl: ({ docsBaseUrl: e, docsPath: t = "", docsSlug: a }) =>
        t ? `${e ?? "https://viem.sh"}${t}${a ? `#${a}` : ""}` : void 0,
      version: `viem@${t}`,
    };
  e.s(
    [
      "f",
      0,
      class e extends Error {
        constructor(r, n = {}) {
          let i =
              n.cause instanceof e
                ? n.cause.details
                : n.cause?.message
                  ? n.cause.message
                  : n.details,
            o = (n.cause instanceof e && n.cause.docsPath) || n.docsPath,
            l = a.getDocsUrl?.({ ...n, docsPath: o });
          (super(
            [
              r || "An error occurred.",
              "",
              ...(n.metaMessages ? [...n.metaMessages, ""] : []),
              ...(l ? [`Docs: ${l}`] : []),
              ...(i ? [`Details: ${i}`] : []),
              ...(a.version ? [`Version: ${a.version}`] : []),
            ].join("\n"),
            n.cause ? { cause: n.cause } : void 0,
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
            (this.metaMessages = n.metaMessages),
            (this.name = n.name ?? this.name),
            (this.shortMessage = r),
            (this.version = t));
        }
        walk(e) {
          return (function e(t, a) {
            return a?.(t)
              ? t
              : t && "object" == typeof t && "cause" in t && void 0 !== t.cause
                ? e(t.cause, a)
                : a
                  ? null
                  : t;
          })(this, e);
        }
      },
    ],
    927974,
  );
};
