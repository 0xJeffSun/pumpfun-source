// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.walletLabelsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.object({
      label: o.z.string().optional(),
      globalLabel: o.z.string().optional(),
      isPumpUser: o.z.boolean().optional(),
    });
  r.walletLabelsRoutes = (0, n.defineRoutes)({
    "PUT /wallet-labels/{wallet}": {
      summary: "Set or replace your label for a wallet",
      params: o.z.object({
        wallet: o.z.string().describe("Solana base58 or EVM 0x address"),
      }),
      body: o.z.object({
        label: o.z
          .string()
          .max(64)
          .regex(/^[A-Za-z0-9\s]+$/)
          .describe(
            "Label text: letters, digits, and spaces only; trimmed, collapsed, and length-checked (2-32 chars) server-side.",
          ),
      }),
      response: o.z.object({ label: o.z.string() }),
      emits: ["LABEL_LIMIT_REACHED"],
    },
    "DELETE /wallet-labels/{wallet}": {
      summary: "Remove your label for a wallet",
      params: o.z.object({
        wallet: o.z.string().describe("Solana base58 or EVM 0x address"),
      }),
      response: o.z.object({ removed: o.z.boolean() }),
    },
    "POST /wallet-labels/batch": {
      summary:
        "Batch-resolve label decoration (personal label, global label, registration state) for a page of wallets",
      body: o.z.object({
        wallets: o.z
          .array(o.z.string().max(64))
          .min(1)
          .max(200)
          .describe("Wallet addresses (Solana base58 or EVM 0x) to decorate."),
      }),
      response: o.z.object({ labels: o.z.record(o.z.string(), s) }),
    },
  });
};
