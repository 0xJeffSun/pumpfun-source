# Two recovered Mayhem source origins

Two narrow changes restore original Rust Source records while preserving the prior **432 normalized / 141 raw-local / 422 direct-closed** frontier. No new original function body is claimed.

| Consumer | Previous candidate origin | Recovered original origin |
| --- | --- | --- |
| O0270 BpfWriter `write_all`, reference at +256 | `vendor/anchor-lang/src/bpf_writer.rs:33:9` | `src/bpf_writer.rs:33:9` |
| O0112 ExtendAccountEvent `data`, reference at +496 | `programs/mayhem-program/src/lib.rs:387:1` | `programs/mayhem-program/src/instructions/extend_account.rs:27:1` |

The first uses an exact-file remap scoped to the Anchor dependency. Its unchanged-command control reproduces the complete baseline Anchor archive. The second moves the existing event definition into the recovered module and re-exports it, retaining all field/discriminator bytes. It uses existing source space and preserves other Source coordinates. There are three changed paths among the full 67-file source set: `Cargo.toml`, `src/lib.rs`, and `src/instructions/extend_account.rs`.

Both changes have isolated compiler controls. Their composition is built twice by recompiling Anchor, Anchor SPL, curve accounts and the root with the same pinned mixed SDK. Complete repeated outputs agree:

| Artifact | SHA-256 |
| --- | --- |
| Stripped candidate | `fc3ad66b46d50c4083886c8ffa3d88f302bce8532ca058a2f0412568fcbc6059` |
| Symbols | `c1bbfc8234ed4efbc6021bbb050c6fa9261e82b4cb04228e42ade6bbd3bc04f6` |

The original positive immediate-call observations remain 4,315. Positive Source observations grow 456→458, with no previous positive Source lost. All prior raw-local and normalized bodies and every direct-closed original window remain. All 447 linked physical function shapes and all 4,838 actual direct-call targets are unchanged; function body multisets are also checked, including duplicate symbol names. The event move changes ten symbol spellings; only the corresponding qualified-order selectors change, and both link maps are rechecked against the actual function extents.

The inherited 20 ordered quote data records, initializer 120 slots/five ordered callees/four bounded data references, and PR #300's selected nested integer-Debug route are rechecked on this artifact. These checks retain their bounded scopes; they do not establish complete data/vtable or formatter-output equivalence.

This is an incremental four-crate build over reused pinned dependencies, not a new SDK or full dependency rebuild. The standard strip operation is the only output transformation. No executable patch, assembly, synthetic operation, broad path remap or new matching mask is used. Original ELF inputs are used only for comparison/runtime qualification, never as compiler or linker input.

## Independently checked runtime records

The exact combined candidate passed fresh original-versus-candidate execution, followed by a separate saved-record cryptographic and effect check:

| Scope | Case pairs | Verified signed records | Original successes |
| --- | ---: | ---: | ---: |
| 14 trade families | 6,636 | 13,272 | Recorded per family |
| ExtendAccount | 301 | 602 | 84 |
| Initializer | 69 | 168 | 10 original-Pump CPI successes |
| Total across these separate scopes | 7,006 | 14,042 | Not a unique-transaction count |

All checked effects and non-compute logs agree. Every signed record is reverified and tied to the recorded original/candidate executable identities. Full case objects are compared with frozen case vectors. The trade JSON is retained losslessly as XZ; `runtime/compression.json` binds each captured JSON digest to its decoded bytes. These are finite saved offline VM records, not deployment, exhaustive behavior, or whole-ELF equivalence evidence.

## Verification and status inventory

```sh
python3 -B research/mayhem-source-origin-recovery-20261027/verify.py --require-runtime
python3 -B research/mayhem-source-origin-recovery-20261027/test_verify.py
```

All 20 positive and corruption tests passed; see `validation/test-results.txt`. Full verification needs Python 3 with `solders` for signature checks (tested with Python 3.12.11 and solders 0.27.1). The static-only mode uses the standard library.

The verifier reads saved evidence and does not run a compiler, VM, Git or network request. The full 67-file source map, exact delta, repeated artifacts/archives, compiler records and inherited proof inputs are bound. `inventory.json` and `inventory.tsv` classify every original window with actual counterpart names and addresses, local equality, and direct-call status.

Local raw equality, normalized equality, direct-call closure and finite runtime equality are distinct. General source provenance, paused work, full indirect/data closure and whole-original ELF identity remain open. The source-origin fixes do not close those broader gaps.
