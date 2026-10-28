# claude-mayhem-439-20261028

Source recovery of Mayhem window **O0077**, the PumpSwap `Buy` handler (`buy_pump_swap::handler`, original start 85600, 9,736 bytes), composed onto the current qualified frontier.

- **Parent:** Codex qualified438, `research/mayhem-current438-composition-20261028/` (stripped `b69ee99d…`, symbols `a4e4768d…`). This packet rebuilt that parent with the same recipe and got both files byte-for-byte.
- **With this change: 439/441 normalized windows.** The only gain is O0077.
  - No losses of any kind: body, raw, profile, edge or Source.
  - No stack-offset warning.
- **Remaining unmatched:**
  - O0083, `BuyV2` (18,648 bytes).
  - O0084, `SellV2` (18,096 bytes).
- **The complete ELF is still unequal to the original.** The stripped candidate is 765,856 bytes and the original is 777,408 bytes.

| Evidence (recomputed from the ELF bytes by `elf_check.py`) | qualified438 | this packet |
| --- | ---: | ---: |
| Full normalized original windows | 438 /441 | **439 /441** |
| Raw-local windows | 141 | 141 |
| Normalized-only windows | 297 | 298 |
| Unmatched windows | 3 | 2 |
| Matched original text | 660,264 /706,744 B | 670,000 /706,744 B |
| Ordered direct-call closure | 433 windows | 435 windows (+O0077, +O0191) |
| Positive direct calls | 4,573 | 4,670 |
| Positive Source observations | 502 | 505 |

## What changed
The source change is ordinary Rust in two files. It uses no asm, padding, patched bytes or unused operations. Lane `o0077-ir-r1` found it, building on `o0077-port-r1` and on the event form O0079 shipped in PR #417. The same two files were already measured on Claude's 437 tree, where they also gained O0077 with no losses.

### `src/instructions/buy_pump_swap.rs`
The handler grows from 129 to 130 lines.
- **CPIs.** The CPIs are plain calls with the `sol-vault` signer seeds written inline: `&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]`.
  - The `Buy` account literal is built in the original's order, followed by `.with_remaining_accounts(..)`.
  - The `close_account` CPI uses the same inline seeds.
- **Event.** The `SellEvent` (with `side:false`) is assembled exactly as in O0079:
  - Conditional scalars are let-bound in the original's load order.
  - `global_quote_deployed` selects on `native`, not on `native_accounting`.
  - The `Pubkey` fields stay inline `key()` temporaries. A let-bound key local loses its lifetime markers and shifts the frame by 64 B.
  - `quote_mint` is bound last.

### `src/instructions/pump_amm_interface.rs`
`#[inline(always)]` is added on `bought_amounts`. It replaces a blank line, so the file stays at 598 lines. The original inlines this helper: its panic locations are 403:23 and 404:26.

### IR proof
`llc` on rustc's own IR with the frame and phi edits reproduces the exact window. The lane notes are in `notes/` (from `o0077-ir-r1` and `o0077-port-r1`).

## Build
`builds/crecipe.py` replays the qualified438 `builds/first/launch.json` recipe on main. Only paths differ, and `verify.py` checks that the command matches argument for argument, apart from paths.
- **What it compiles.** It is a root-only `rustc` compile of `mayhem_recovered` against the qualified434 dependency archives. The `anchor_lang`, `anchor_spl` and `curve_accounts` rlibs are hash-pinned in the parent's `tools-observed.json`.
- **Linking.** The packet's `linker.py` swaps in the parent's `ordered.ld`.
- **The cargo build path cannot compile this tree.** `curve-accounts` uses `historical_anchor_program::declare_program!`, and the parent's controller passes that macro crate by hand.
- **Not a fresh dependency build.** Like the parent's own builds, these reuse the qualified dependency libraries.

Three builds produced the same stripped `e899e096…` and symbols `5d18b89a…`:
- the first build (`repeat-*` records);
- a clean build from a separate source copy and a separate dependency-cache clone (`build-*`, `launch.json`);
- a third build through the shared lane tool.

The same recipe on the unmodified parent tree reproduces `b69ee99d…` and `a4e4768d…` exactly.

## Runtime
These are fresh offline LiteSVM runs on this exact executable. The packet's controllers in `runtime/controllers/` are the qualified438 controllers, retargeted by `mkruntime.py`; only paths and the expected digest changed. The control is the qualified438 candidate. The harnesses come from main at `b7b3a84e3`, and their 15 recorded input hashes equal the parent's.

| Matrix | Cases | Signed records | Mismatches |
| --- | ---: | ---: | ---: |
| Trades (14 families, including the 3 `buy-amm-*` families that run O0077) | 6,636 pairs | 13,272 | 0 |
| Initializer: rejections | 53 pairs | 106 | 0 |
| Initializer: Pump CPI | 16 pairs | 62 | 0 |
| Sweeps (original, control, candidate) | 692 | 2,076 | 0 |
| Rates (original, control, candidate) | 150 | 450 | 0 |
| Target rates (O0073 boundary matrix) | 856 | 2,568 attested | 0 |

- **Trades** compare all of the following, where logs are compared modulo compute units:
  - account state, except the program account itself;
  - errors, inner instructions, return data, events and logs.
- **Sweeps and rates.** The control's logs equal the original's on every case.
- **Target rates.** There are no differences between the candidate and the parent.
- **Scope.** These finite matrices overlap. They are not unique-transaction counts or exhaustive-behavior counts. No live-chain transaction or deployment occurs.

## Layout
- **`source.patch`:** diff from qualified438 to shipped, using `a/programs/mayhem/…` paths. It touches two files.
- **`sources/`:**
  - `parent/` and `shipped/` hold the two touched files.
  - `source-inputs.parent438.json` equals the parent's `composed-inputs.json`.
  - `source-inputs.json` is the shipped 67-file inventory.
- **`builds/`:**
  - The candidate and symbols ELFs (gzip).
  - Both build records and stderr logs.
  - `crecipe.py`.
  - The link invocation record.
- **`measurement/`:**
  - `measure-vs-codex438.json` (`measure.py`).
  - `winreport.txt`.
  - `recomputed-elf.json` (`elf_check.py`).
- **`runtime/`:**
  - Per-case outputs: trades `.json.xz`, sweeps, initializer and target-rate files.
  - The controllers.
  - `summary.json`.
- **`notes/`:** lane notes for the O0077 mechanism.

## Verify
Run from a repository checkout. Both scripts use the standard library only and never compile or run a target.

    python -B research/claude-mayhem-439-20261028/verify.py
    python -B research/claude-mayhem-439-20261028/test_verify.py

What the scripts cover:
- **`verify.py`**:
  - It binds the parent inventory to the qualified438 archive on main.
  - It applies `source.patch`.
  - It checks the build records against the qualified438 recipe.
  - It recomputes the full 441-window census and the O0077 body, calls and Source profiles from the ELF bytes.
  - It recomputes every runtime count from the saved per-case outputs.
- **`test_verify.py`** rejects corrupted instructions, call targets and Source records. It also rejects unlisted files, symlinks and FIFOs, and an edited source or census. Finally, it rejects tampered trade, sweep and summary records.

What is not checked here:
- whole-ELF identity, which is unequal;
- re-verification of the saved transaction signatures, which needs `solders`;
- fresh dependency builds;
- arbitrary data or indirect-call equivalence.
