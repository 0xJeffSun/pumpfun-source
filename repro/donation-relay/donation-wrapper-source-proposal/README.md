# Relay: all normalized windows, not full byte identity

Two attributable ordinary-source refinements extend the frozen [488-window
baseline in PR184](https://github.com/lalalune/pumpfun-source/pull/184) to
**490/492 and then 492/492 normalized windows**, without losing a prior window.
The final output also increases complete **raw local matches from 142 to 317**.

**This is NOT byte-identical completion.** All meaningful ELF section lengths
now match and the output is exactly 818,280 bytes, the meaningful original ELF
extent. Nevertheless **18,623 common file bytes still differ**, and the captured
original also has 12,168 trailing allocation bytes. No binary patching or padding
is used to obtain the size agreement. Full core-program identity remains 0/4.
Normalized-window coverage permits established address/call masking and duplicate
alternatives; it is not a unique one-to-one function mapping or semantic proof.

## Causal source controls

Three states each contain exactly 60 ordinary source inputs, reconstructed from
immutable public baseline mappings plus readable source overrides/patches:

| Stage | Normalized / raw windows | ELF bytes | `.text` length difference | Common-position differing bytes |
| --- | ---: | ---: | ---: | ---: |
| Pinned settlement baseline | 488 / 142 | 818392 | +112 | 383718 |
| Declaration ownership and direct events | 490 / 142 | 818216 | -64 | 364619 |
| Literal fields match declaration order | 492 / 317 | 818280 | 0 | 18623 |

1. Change only `donation_handlers.rs` and `tools/donate/shared.rs`: place
   `DonationContext` fields in the measured declaration order, and construct the
   actual event directly after native temporary-account closing instead of
   materializing it earlier. This recovers complete normalized native wrapper
   ordinals **92 and 93**, each 6,272 bytes.
2. Change only `donation_handlers.rs`: write each real context literal in the
   same field order as that declaration. This recovers the remaining complete
   normalized token wrapper ordinals **94 and 95** and gains 175 raw local
   windows, with no losses. All four wrappers 92–95 become raw body-equal.

These are source-supported compiler ownership/order hypotheses, not proof of
unique historical field declarations. The real business calls are preserved;
no dead matching function, assembly template, custom linker order or copied
instruction blob is introduced. No selected checkpoint or prior sealed study is
replaced.

## Direct calls and data scope

The final four wrappers contain **18 actual direct calls** (6/6/3/3), no indirect
calls and no relocated data references. Every actual callee binds a complete
normalized body with recursively closed direct-call shape. Total closed pairs
advance 659 → 665 → 674. This is not arbitrary-state behavior or recursive
semantic equivalence.

The entire 19,863-byte `.rodata` remains raw-equal. At every stage the optional
checker independently revisits all **359 positional `.data.rel.ro` pointers**
and **507 nonpointer qwords**. It verifies 282 same-offset references into the
identical read-only section, 74 closed direct-call-shape text targets and three
same-offset data targets. **Five text targets contain indirect calls**; indirect
behavior and complete object-type/extent semantics remain unproved.

## Remaining exact raw differences

In the final output, the public parser recomputes these common-position counts:

| Section | Differing bytes |
| --- | ---: |
| `.text` | 18453 |
| `.data.rel.ro` | 25 |
| `.dynsym` | 4 |
| `.rel.dyn` | 139 |
| Other ELF header positions | 2 |

`.rodata`, `.dynamic`, `.dynstr` and `.shstrtab` are raw-equal. All section lengths
match. Raw position counts and matching lengths are not a percentage of remaining
engineering work; references/order and the original allocation tail still
prevent whole-file identity. The candidate SHA-256 is
`0486b905063c6d7442056939af92964fa13a4770991f261d46bbf57938460e78`,
not the original's `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`.

## Source-only verification

The packet contains ordinary source/maps/patches, static hashes/counts/address
correspondence and Python checkers. It contains **no ELF, archive, encoded
machine payload, replay case, log or archived build/runtime receipt/excerpt**.
Static metadata was freshly rederived from original/compiler outputs without
reading those receipts.

Both changed states were locally repeated with exact root-clean compiler outputs
and finite offline replay passed. These are local observations, **not
downloadable runtime evidence**. Protected relayer settlement success remains
untested. Default verification checks source integrity and recorded static
metadata only, reporting `compiler_executed=false`, `runtime_verified=false` and
`whole_file_equal=false`. No verifier mode builds or executes a target VM.

From a clone containing the pinned public source commits, with Python 3.11+:

```sh
P=repro/donation-relay/donation-wrapper-source-proposal
python3 -I -B "$P/verify.py"
python3 -I -B "$P/test_verify.py"
python3 -I -B "$P/verify.py" --materialize work/relay-wrappers492-source
```

Variants `baseline` and `native490` materialize the independent controls. Nine
stdlib tests check complete 60-input maps/materialization, mutation, patches,
unsafe paths/symlinks and the default no-artifact/no-receipt read boundary.

Use the [reviewed native Linux v1.48 recipe pinned by PR175](https://github.com/lalalune/pumpfun-source/blob/a56a22f32fce7dfe4e05c47d48e7b18651438779/repro/donation-relay/module-layout-facade-source-proposal/README.md#portable-local-compilation-recipe)
for each materialized source. Preserve all 253 locked public registry packages,
default features, release profile, explicit clean environment, source-path remap
and strip tool. Authenticate official tools and dependency inputs before running
native build scripts/procedural macros. Local observations use root-clean
rebuilds with verified dependency caches; fresh relocated all-dependency builds
must be checked independently, not assumed identical. No captured executable
payload enters compiler inputs; never patch an output to repair a discrepancy.

Optional remeasurement needs three local directories containing `candidate.so`
and `symbols.so`:

```sh
python3 -I -B "$P/verify.py" \
  --baseline-build /path/to/settlement488 \
  --native490-build /path/to/native490 \
  --complete492-build /path/to/wrappers492
```

It recomputes all inventories, gains/losses, full section comparisons, actual
wrapper callees and complete positional data graphs; expected hashes bind every
local input. The final symbol ELF hash is
`e41e3ebb30f5f8bd7e1427bf20b714c65eb1dc6b96cebbaffb46462fc87f28f4`.
