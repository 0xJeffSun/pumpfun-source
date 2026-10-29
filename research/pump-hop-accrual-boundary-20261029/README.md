# Per-hop fee-accrual call-boundary proposal

This is an **uncompiled source proposal**, based on the maintained composition673
source and the captured original call/data flow. It is not a qualified binary
selection. The original per-hop window `0x5b3b0` (18,584 bytes) calls the existing
`BondingCurve::accrue_fees` body twice. The maintained selected body `0x67860`
(19,536 bytes) calls it zero times and performs the used accounting inline.
Restore those two real calls rather than replacing the route with a historical
snapshot. No function-window gain, whole-file identity, or Mayhem fix is claimed.

The publication parent is current main
`506921d658deeef506b281233d98b911d60e08c0`. Its hop source is the same Git blob
`742644a74a43f555a4d6d8a74fcdc1b3e76f74fb` analyzed at
`1285b5e9e3a29c1e2cf32246d6046035e5d66fad`. Before SHA256 is
`679b34ae4965bf1cdc999e0f45f3ae5e171116c5f04173e7394c3b9e48a0fb43`;
the sole maintained source overlay has SHA256
`734bdae1189dd4e4f54a27fd215624611228f36b92d3877b63f00df19ccc9e44`.
The selected control remains composition673: stripped `199fd737…` and symbols
`49df399b…`, with 1,019 normalized / 188 raw windows. Those are **control** counts,
not measurements of this overlay.

## Original arguments, stores and result uses

The raw caller/callee extracts and complete per-hop actual-callee occurrence
ledger are retained. Callee identities compare entire bodies using the unchanged
official narrow call/ELF-pointer normalizer, rather than numeric call targets.
They do not establish historical Rust spelling.

| Original call offset within `0x5b3b0` | Arguments / state | Success result |
| --- | --- | --- |
| `+0x2508` | `r2=self` from frame `-0xab8`; `r3=global` from `*(frame[-0xa48])+8`; `r4=protocol` from `-0xaf8`; `r5=creator` from `-0xb00` | Result tag2 at `-0x6d0`, value at `-0x6c8` loaded into `r6` |
| `+0x25b8` | Only with post-fill flag `-0xa98` nonzero; same self/global, protocol `-0xb10`, creator `-0xb30`. Before the call, store post quote `-0xb08` at self `+0x98` and post base `-0xac8` at `+0x90` | Same Result slot; success value into `r9` |

The target `0xa1bd8` is 1,456 bytes and matches current `0xb39b0` under the
official normalization (SHA256 `cfd961a7…`). It reads the Mayhem flag at self
`+0x9a`, splits protocol fees, checks and stores retained protocol fees at
`+0x78` and creator fees at `+0x70`, and returns raw buyback. The caller checks
`r6+r9`, applies `post_fee_amount` to that sum and separately to `r9`, then checks
received-sum minus received-post. These are the maintained raw/received value
roles in the proposed source.

`proposal.diff` replaces only that used manual accounting, places post-fill
state stores before the second call as observed, and removes the later duplicate
fee stores. The existing helper retains both terminal split assertions and
checked additions. The existing route amount/Mayhem/whitelist guards,673 fee
snapshot and shared vault admission, completion flag, transfers and events remain.
The ordering of fee writes and their failures deliberately changes to follow the
original call boundary; ordinary and overflow/error behavior still needs runtime
qualification. Removed/moved source-operation lines remain blank to preserve
unrelated existing error positions. This is disclosed position preservation, not
a new padding recipe or evidence of historical source coordinates. Existing
layout annotations are untouched.

## Rejected Mayhem witness

Two already retained, genuinely signed AMM→Pump messages were run on the original
and selected immutable images, changing only serialized curve byte81 from0 to1.
Both images rejected inside Pump with `6108 MultiHopMayhemCurveNotSupported`,
Source484. The saved structured errors, events, inner instructions, return data
and account states agree. Compute-meter lines differ; literal full-log equality
is not claimed. This is **two distinct transactions, four executed outcomes and
four signature occurrences**, with the actual captured Pump loader and actual
AMM→Pump CPI. It does not qualify an admitted Mayhem hop, demonstrate a bug, or
test this unbuilt overlay. No initializer or signer/owner/domain bypass was used.

The gzip record retains complete prestates, public signed messages, outcomes and
input hashes. The original producer is preserved unchanged, including its
historical absolute paths; it is a provenance record, not a portable controller.
No private key or credential is included. `verify.py` checks the single-byte
mutation, actual Ed25519 signatures and recorded rejection without sending any
new transaction.

## Reproduce the static verification

With the repository's existing Python/solders environment and the immutable
composition673 symbols artifact available:

```sh
python3 -B research/pump-hop-accrual-boundary-20261029/verify.py \
  --repository /absolute/path/to/pumpfun-source \
  --selected-symbols /absolute/path/to/composition673/artifacts/unstripped.so
```

The maintained source is read from this checkout; `--repository` supplies
authenticated existing scripts and original capture. `--original` can explicitly
select the unchanged captured Pump allocation. The verifier checks the exact
overlay/diff, retained Source-line positions, all107 original and109 selected
actual callee occurrences and complete normalized callee bodies, both helper
identities and original call offsets, and all four saved signature occurrences.
It performs no build or VM replay. Packet hashes are in `MANIFEST.json`.

Native fixed-toolchain compilation, a fresh local repeat, full1,035-window census,
actual candidate-call identities, and original/changed-image runtime comparisons
remain **pending**. No SDK, captures, workflow, dependencies, comparator, global
completion ledger, constructor, CTA helper or stopped lane is changed. This draft
exists to make the bounded original-backed source overlay reviewable while the
qualified native build cohort is prepared.
