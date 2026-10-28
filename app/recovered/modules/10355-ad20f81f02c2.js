// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  let t = [{ value: "3" }, { value: "7" }, { value: "14" }, { value: "30" }],
    r = [{ value: "10m" }, ...t];
  e.s([
    "U",
    0,
    "10m",
    "N",
    0,
    { SOL: 9, PUMP: 6 },
    "r",
    0,
    (e = "SOL") => ({
      id:
        "u" > typeof crypto && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `pool-${Math.random().toString(36).slice(2)}`,
      kind: e,
      humanAmount: "",
      customMint: "",
    }),
    "s",
    0,
    (e, t) =>
      r.some((t) => t.value === e)
        ? "10m" === e
          ? t("web.bounties.duration_devnet_ten_minutes")
          : t("web.bounties.duration_days", { count: Number(e) })
        : null,
    "A",
    0,
    (e) => ("10m" === e ? 6e5 : 24 * Number(e) * 36e5),
    "S",
    0,
    t,
    "j",
    0,
    { 1: "web.bounties.step_details", 2: "web.bounties.step_rewards" },
  ]);
};
