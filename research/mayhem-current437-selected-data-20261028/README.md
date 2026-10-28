# Qualified437 selected data obligations

This remeasures the existing selected-data, writer-record and counted-literal obligations on the exact [qualified437 candidate](../mayhem-current437-composition-20261028/README.md), `da217317cd82d23898b846c1d3b47d8643b495fad90796c2a6ef62b37cfbbeef`. The original and candidate binaries are unchanged. The reader logic is inherited from the earlier proofs; those 436-bound packets are not edited or relabeled.

| Measure | Qualified436 | Qualified437 |
|---|---:|---:|
| Complete normalized windows / raw-local bodies | 436 / 141 | 437 / 141 |
| Direct-call relation | 429 windows / 601 pairs | 431 windows / 603 pairs |
| Selected-data relation after all obligations | 429 windows / 579 pairs | 431 windows / 581 pairs |
| Matching Source sites | 486 | 499 |
| Relocated code-address sites | 48 | 48 |
| References to selected 32-byte prefixes | 119 | 121 |
| Original selected 32-byte records | 30 | 30 |
| References to five selected 48-byte writer spans | 47 | 48 |
| Counted instruction-label intervals | 20 / 553 bytes | 21 / 575 bytes |

The new SweepFees body and wrapper provide the additional observations, including the exact 22-byte `Instruction: SweepFees` literal. Every candidate comparison is recomputed independently. Different candidate addresses are not treated as identical numeric pointers, and counterpart counts are not added across artifacts.

The selected 32-byte relation checks all matching Source coordinates, relocated code-address loads and explicitly shaped data prefixes. Twenty-two ambiguous direct-call pairs are rejected by those data obligations. The writer extension checks two more relocated method words in each of five 48-byte spans. The final stage compares every byte in 21 counted instruction-label intervals. Each count is loaded into r2 immediately before an actual relocation-confirmed `sol_log_` call, with its pointer loaded into r1. The checked entry prefix is straight-line, and branches cannot bypass the pointer/length setup. These are exact byte intervals, not extents inferred from adjacency or NUL termination.

The two native crate archives in `source-context/` authenticate against the qualified437 source archive's Cargo.lock checksums. They document Anchor's label construction and Solana's pointer/length logger. The qualified Rust function names independently agree with the 21 labels. This is source context for those call arguments, not proof of the historical macro build or runtime logging semantics.

The data relation covers 431 original windows. It does not prove that the 32/48-byte spans are complete allocations, that all indirect calls consume those pointers, or that all data and relocations match. Normalized-body equality is not raw whole-body or whole-ELF identity. This packet performs no compiler, VM, network or target execution and adds no runtime qualification.

Verification uses the repository's unchanged ELF reader, normalizer and admitted data readers. It binds the exact old/new images, source archive and reader hashes, checks allocated-image correspondence, and recomputes all stages. Corruption tests mutate all ten extra method pointers and all 21 literals, plus a new Sweep Source coordinate and data scalar, a code target, native source archive and reader bytes. The earlier predicates still accept the relevant masked body while the affected stronger relation rejects it. Positive boundary and portable-filesystem controls are retained.

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B verify.py --repo /absolute/path/to/pumpfun-source
PYTHONDONTWRITEBYTECODE=1 python3 -B test_verify.py
```
