# Bounded natural source contract

The implementable fragment is the already retained candidate's `donation::create` at donation.rs:44–111, bound by D1–D6 in claims.json. This is a natural Rust source hypothesis supported by the retained original/candidate comparisons, not recovered historical source identity. No patch is proposed: changing diagnostics or strengthening admission here would require a separately authorized semantics decision.

Its control flow is:

1. Admit canonical typed Curve, donation PDA, payer, global and event accounts through retained Anchor parsing/init rules.
2. Reject disabled creation with the early log and direct error conversion; otherwise preserve existing-version state with its log and success.
3. For any nonzero Curve reserve, take the typed creator and length-bounded raw quote (zero/absent defaults to wrapped SOL). Otherwise validate and decode the canonical AMM Pool and take its coin creator and quote.
4. If selected creator names the canonical sharing PDA, validate Fees ownership, nonempty data, checked codec, mint, administrator equality, revocation and Active status in that order. Otherwise require payer equal selected creator.
5. After all scoped borrows end, initialize donation fields, read Clock, emit log/event CPI, and let generated exit serialize state.

Bounded premises: validated account-owner/program/PDA primitives; typed decoders return owned values and release data borrows; no outstanding mutable RefCell data alias at the raw `borrow()`; ordinary allocator/Borsh operations succeed or return/abort as framework semantics specify; failed instructions/outer transactions roll back funding and state; fixed event CPI invokes self with event PDA signing; foreign accounts are not serialized by Fees exits. Allocation/OOM and arbitrary standard-library failure behavior are not proven here.

The creator may be an authorized wallet or the active unrevoked sharing administrator. Neither arbitrary relay config IDs nor arbitrary raw quote keys acquire an account-policy guarantee from this contract. Creator snapshots, no-op behavior and the all-zero-reserve selector are intentional observed candidate semantics. This contract does not establish mint extension eligibility, relay consent, upgrade trust, complete original handler correspondence or whole-program equivalence.
