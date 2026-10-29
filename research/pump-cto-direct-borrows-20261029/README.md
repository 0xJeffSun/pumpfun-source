# Pump CTO direct-borrow source proposal

**Uncompiled research overlay.** This packet proposes five direct `AccountInfo`
borrows and removes two redundant outer emptiness checks in the used
`admin_cto::execute` path. It does not replace maintained program source, assign
an existing executable to new source, or claim a window gain or runtime pass.

The original `0x22a10` body is 27,400 bytes. The selected `0x2fd30` body is
19,632 bytes. They contain **154 versus 177 defined direct calls**, plus three
relocated external calls each. The 148 shared attributed callee occurrences are
not the selected body's total call count. External `call -1` instructions are
resolved through `.rel.dyn` and `.dynsym`, including the original inline Rc
overflow `abort`; they are not miscounted as self calls or missing business guards.

## Original instruction evidence and proposed source

The five original token-reader arguments come directly from their context's
`AccountInfo` field. The selected body instead clones each field to a temporary
before passing its address. Offsets below are relative to each body's start:

| Used operation | Original call | Selected call | Account field |
| --- | --- | --- | --- |
| Wallet quote frozen | `+0x2648` | `+0x1910` | `+0x40` |
| Shared AMM quote frozen | `+0x24d0` | `+0x3cf0` | `+0x88` |
| Shared AMM quote amount | `+0x2518` | `+0x3de8` | `+0x88` |
| Shared creator-vault quote amount | `+0x20c8` | `+0x4898` | `+0x48` |
| Shared creator-vault quote frozen | `+0x2110` | `+0x4980` | `+0x48` |

[The argument ledger](evidence/borrow-proof.json) retains exact instruction
contexts. The verifier compares their complete bytes to the two authenticated
ELFs. The source changes `&field.to_account_info()` to `field.as_ref()` at these
five used calls. Two other calls already use direct borrows and remain unchanged.

The wallet and shared-AMM frozen predicates also redundantly call
`data_is_empty()` before `token_frozen()`, whose first operation already returns
`Ok(false)` for empty data. Removing those two outer checks preserves that empty
account result and retains the helper's checked borrow/deserialization path.
All owner/signer checks, business guards, error operations and their order remain
in the proposal. The separate `pay_token` helper remains unchanged.

| Defined direct-callee count | Selected control | Source prediction | Original |
| --- | ---: | ---: | ---: |
| `AccountInfo::clone` | 53 | 48 | 33 |
| `AccountInfo::data_is_empty` | 8 | 6 | 6 |
| `token_frozen` | 5 | 5 | 5 |
| `token_raw_amount` | 2 | 2 | 2 |

Predictions are not compiler results. Other clone clusters and the `pay_token`
caller/callee boundary remain separate attribution work. No attribute, compiler
flag, dependency, SDK, binary, comparator or source-origin bypass is changed.

## Source and image bindings

The analysis input is maintained revision
`1285b5e9e3a29c1e2cf32246d6046035e5d66fad`. Live main
`a18e1e89b59bf9d734955550c92f321c97c95e62` still contains the identical source.
The research overlay is the only proposed program source change:

| Input | SHA-256 |
| --- | --- |
| [Unchanged before source](source/admin_cto.before.rs) | `6353b1f7b9e613bb8d819000c504d44410b04f7da7dfbdc7fb2e5132df100180` |
| [Proposed source](source/admin_cto.rs) | `f4a2bb7d33431e0fb4911e39d5e03c8bb9f45c6f7a184da21d1a6762f9127955` |
| Captured original allocation | `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` |
| Selected symbol ELF | `49df399b8a36a0a60de03e8d55f1417261dc451e44845ca9d17a94040968c680` |

The exact before-source Git blob is
`f8127a38285fa993c5fbdcb99304451bf8ccb4ee`. The selected symbol ELF is published
at `research/pump-final-composition-673-20261028/artifacts/unstripped.so`.
[The patch](proposal.patch) is an overlay for
`programs/pump/src/creator/admin_cto.rs`, not an applied maintained-source change.

The source inherits explicitly engineered blank-line positioning from earlier
qualified reconstruction. This proposal adds no padding and preserves all 775
newlines plus the explicit `error!`, `require!`, `panic!`, `unwrap` and `expect`
token line/column ledger. That finite token check does not prove every
compiler-generated `Location` remains equal; the native build must verify them.

## Repeatable checks

From a complete repository checkout:

```sh
python3 -B scripts/verify_evidence.py
python3 -B scripts/test_tooling.py
python3 -B research/pump-cto-direct-borrows-20261029/verify.py \
  --original evidence/original/pump/deployed.so \
  --selected-symbols research/pump-final-composition-673-20261028/artifacts/unstripped.so
python3 -B research/pump-cto-direct-borrows-20261029/test_verify.py \
  --original evidence/original/pump/deployed.so \
  --selected-symbols research/pump-final-composition-673-20261028/artifacts/unstripped.so
```

All nine original/dependency captures and six comparator controls pass. The
proposal verifier passes normally and under `python3 -O`; its three negative
controls reject an undeclared source edit and mutations to each image's argument
witness. Exact commands, script/source/input hashes and outputs are retained in
[validation](validation/receipt.json). These checks read ELF bytes; they do not
execute captured programs or compile the proposal.

The authenticated native-673 control is independently queued in
[run 40791064153](https://github.com/shawkkkkk/pumpfun-source/actions/runs/40791064153).
The exact `f4a2bb7d…` overlay is separately staged for a candidate build after a
passing control. Native compilation, full 1,035-window census, complete call/data
comparison and focused/broad differential runtime validation are **pending**.
Existing selected-image runtime receipts do not qualify this overlay. Current
global counts and selected artifacts remain unchanged.

Attribution: the original/candidate callee ledger supplied by the creation worker
was independently decoded from the authenticated images before this proposal;
the CI worker owns the independent control/candidate builds. This packet contains
the CTO-specific source correction and exact argument witnesses. It does not
claim original source spelling, private build provenance, security acceptance or
work from those independent build units.
