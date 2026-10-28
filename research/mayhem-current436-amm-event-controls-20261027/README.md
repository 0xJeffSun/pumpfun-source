# Mayhem436 AMM prefix and event-order checkpoint

This is a partial source-recovery checkpoint. No new complete AMM body or whole-ELF identity is claimed. The accepted whole-window frontier stays 436/441 normalized and 141 raw-local bodies; 429 satisfy the existing direct/code-reference relation.

## Primary candidate

Candidate `951f11ab20bf4396ffdd5d0407e6696b1e35bb0428972362e93d01a0a987a3da`; symbols `3f47fcde418858de4b5382afbdec41858bc2fd5afe68602ff85aeb9826188a24`. A fresh repeat produces both identical files. Exact 67-input source, root command/environment and LLVM IR are retained.

The true `#[event]` expansion now uses the explicit target discriminator, serialized declaration order and bool side, with the macro at the original 197:1 Source coordinate. It replaces the manual codecs without losing any 436/141 body, 4,473 positive direct edge or 486 observed Source obligation.

- Buy: entire normalized prefix through byte 7,144 matches original; 9,736 B, all 96 ordered callee shapes/positions and 115 CFG blocks match. The main CPI and CloseAccount use separate short-lived signer/bump temporaries. Full body remains unequal: 1,106/1,217 positional instruction slots.
- Sell: 17,312 B, all 47 ordered callees/positions and 249 CFG blocks match. Every opcode, all traced account-field reads, and all 39 final Event writes have original order. Full body remains unequal because stack/register allocation differs; Event base is -1,760 rather than original -1,728.
- Fresh native/token Buy/Sell corpus: 36 pairs, 72 signed transaction records, 144 independently verified signature fields, 7 successful originals, no mismatches. Exact non-compute logs and actual executable program accounts are checked. This is bounded evidence, separate from the older 434 union's 6,636-case replay.

## Retained alternative and limits

`alternative-direct-event/` keeps the same recovered Buy prefix with the higher positional-overlap direct Sell event (2,055/2,164 slots, event base -1,728). Its event opcode/store ordering remains different. Its own 18 Buy-pair receipts are retained; do not treat those as 18 Sell pairs or transfer the older 434 full-corpus result to either new image.

The phased Sell's two named 32 B key snapshots lose StorageLive markers during MIR GVN. Direct account-key borrows remove the slots but also remove required instructions; non-Copy key wrappers, constructors and factories did not close the body. Root-only MIR levels 0/1/3 and MIR-inlining-disabled controls all lose prior matches and are explicitly rejected non-historical experiments. No dummy operations, assembler, binary rewriting, matcher relaxation, sweep/burn execution or live chain call was used.

Run `verify.py` using a Python environment with the repository's solders dependency to recompute source/archive integrity, strict preservation, prefix/body diagnostics and the saved runtime checks.
