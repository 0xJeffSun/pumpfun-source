// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "2.43.3",
    n = {
      getDocsUrl: ({ docsBaseUrl: e, docsPath: t = "", docsSlug: n }) =>
        t ? `${e ?? "https://viem.sh"}${t}${n ? `#${n}` : ""}` : void 0,
      version: `viem@${t}`,
    };
  e.s(
    [
      "f",
      0,
      class e extends Error {
        constructor(r, a = {}) {
          let i =
              a.cause instanceof e
                ? a.cause.details
                : a.cause?.message
                  ? a.cause.message
                  : a.details,
            s = (a.cause instanceof e && a.cause.docsPath) || a.docsPath,
            o = n.getDocsUrl?.({ ...a, docsPath: s });
          (super(
            [
              r || "An error occurred.",
              "",
              ...(a.metaMessages ? [...a.metaMessages, ""] : []),
              ...(o ? [`Docs: ${o}`] : []),
              ...(i ? [`Details: ${i}`] : []),
              ...(n.version ? [`Version: ${n.version}`] : []),
            ].join("\n"),
            a.cause ? { cause: a.cause } : void 0,
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
            (this.docsPath = s),
            (this.metaMessages = a.metaMessages),
            (this.name = a.name ?? this.name),
            (this.shortMessage = r),
            (this.version = t));
        }
        walk(e) {
          return (function e(t, n) {
            return n?.(t)
              ? t
              : t && "object" == typeof t && "cause" in t && void 0 !== t.cause
                ? e(t.cause, n)
                : n
                  ? null
                  : t;
          })(this, e);
        }
      },
    ],
    548801,
  );
};
