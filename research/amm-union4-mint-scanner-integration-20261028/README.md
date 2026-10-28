# AMM union4 + recovered mint scanner: 770/785

This full source-only build composes the [standalone scanner recovery](../amm-mint-scanner-raw-20261028/README.md) from PR #480 into the [769-window union4](../claude-amm-union4-20261028/README.md). No maintained source checkpoint is changed.

| Complete Linux SDK v1.44 build | Normalized windows | Raw-equal bodies |
| --- | ---: | ---: |
| Unchanged union4, independently rebuilt here | 769 / 785 | 160 |
| Union4 + exact contributor source patch | **770 / 785** | **163** |

There are **zero normalized or raw losses**. The newly matched window is `0xf28b8..0xf2d60`: all **1,192 original bytes**, with no calls or relocations and no masked operands. Two previously normalized windows also become raw-equal through ordinary link placement: `0xf28a8` and `0x111360`.

The unchanged parent source reproduces both published union4 ELFs exactly. Two recompiles of both modified workspace crates produce byte-identical complete stripped and unstripped images. External dependency compilation is cached; this is not a fresh dependency/toolchain bootstrap.

- Stripped candidate SHA-256: `d4c48c898bb542d621fadd4d87a01ea9756216ca983a48352d69766d0aac2538`
- Unstripped SHA-256: `562bfa9e87b47713b0fa60d061c17e4612eea621aca930023914d3c3d84a79e4`
- Scanner body SHA-256: `cd1639db833841b5299e37ae8ba4d5978cc9ee8db1988ebfe8881cd6634c564d`

## Source and compilation

`source.patch` is unchanged from PR #480; the complete compiled source is archived under each build. Only `crates/native-transfer-fee/src/lib.rs` differs from union4. The successful-completion label, ordinary inline step helper, explicit extension-kind match, and partially expanded transfer-hook byte checks reproduce the observed compiler lowering. These are reconstruction choices, not evidence of historical source spelling. The other three linked native-transfer-fee functions retain normalized bodies, relocation patterns and resolved call targets.

The native Linux SDK v1.44 uses its official `sbpf-solana-solana` target libraries. Compiler, Cargo, objcopy, all 25 target libraries, compiled inputs and commands are recorded. The physical-source wrapper resolves registry symlinks without changing source text. Ordinary Cargo compilation and objcopy stripping produce the selected image: no original bytes enter compilation, linker ordering or output editing. The separate original-derived union4 layout layer is not applied here.

The parent's existing `admin_update_token_incentives` stack-frame diagnostics remain. This is a research candidate, not a warning-free maintained build.

## Runtime and offline verification

All **25 existing suites / 17,462 cases** pass their state, error, event and CPI comparisons: **35,074 transactions and 35,418 signatures**. Complete per-case reports and transaction sidecars are retained, rather than only summary hashes. The offline verifier independently compares every reported original/candidate observation except its raw `logs` field and can cryptographically reverify every saved transaction signature. The five inherited incentive error-order controls also pass, with ten signed executions.

**Ordered logs differ in 3,237 corpus cases.** Some suites deliberately exclude those fields; zero compared mismatches does not establish full diagnostic parity. The tests use bounded synthetic fixtures and captured dependencies, not exhaustive behavior or live-chain execution. Fifteen windows and whole-ELF equality remain open.

```sh
# Standard library only: archived source, ELFs, all window counts and case receipts.
python3 -I -B research/amm-union4-mint-scanner-integration-20261028/verify.py
python3 -I -B research/amm-union4-mint-scanner-integration-20261028/test_verify.py

# Also reverify all saved signatures; requires solders 0.27.1 in this interpreter.
python3 -B research/amm-union4-mint-scanner-integration-20261028/verify.py --signatures
```

The counterexample tests reject resealed false counts, a changed source patch, a falsified case observation with its pass flag preserved, and optimized Python with assertions disabled.

`builds/{parent,a,b}` retain exact source archives, compiler logs, input receipts, measurements and ELFs. `recorded-controller.py` and `runtime/recorded-replay-driver.py` are the exact controllers used, including their original workspace paths. They document these runs; adapting those paths or using a different environment requires new receipts. Hashes and receipts are reproducibility evidence, not cryptographic execution attestation.
