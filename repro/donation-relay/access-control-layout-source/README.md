# Relay access-control source placement recovery

Replacing six explicit leading relayer checks with Anchor's authentic
`#[access_control(check_relayer(&ctx.accounts.signer))]` attribute restores the
original placement of the runtime block and five settlement entry functions.
No instruction body, guard argument, business call or data layout is changed.
The upstream macro inserts the same check before the same function statements.

| Measurement | Parent | Recovered |
| --- | ---: | ---: |
| Complete normalized original windows | 492 | 492 |
| Complete raw-local original windows | 317 | 376 |
| Differing common file positions | 18,623 | 9,398 |
| Meaningful ELF bytes | 818,280 | 818,280 |

There are59 raw gains and no raw or normalized losses. All original windows
194–204 now have the correct starts and exact raw bodies, including entrypoint,
allocation/panic routines and the five settlement entry functions. Their103
actual direct calls have matching complete callee bodies and closed recursive
direct-call shapes. This is not a recursive semantic proof.

All ELF, program and section headers are now byte-equal. The full `.dynsym`,
`.dynamic`, `.rodata`, `.dynstr` and `.shstrtab` sections are also byte-equal.
Remaining differences are9,324 positions in `.text`,25 in `.data.rel.ro`,49 in
`.rel.dyn`, and the12,168 captured allocation-tail bytes. All2,327 relocation
entries remain present;34 records differ. This is still not whole-file identity.

The source changes only `src/lib.rs` in the existing60-input reconstruction.
Attribute macro expansion changes item placement without changing the explicit
operation. Pinned compiler code orders local items by definition identity;
late attribute expansion is a plausible explanation of the observed relocation
and reversed block. The exact compiler DefId allocation was not traced, so that
mechanism remains inference. The source/output effect is measured directly.

## Reproduction

```sh
python3 -I -B repro/donation-relay/access-control-layout-source/verify.py
python3 -I -B repro/donation-relay/access-control-layout-source/verify.py \
  --materialize /tmp/relay-access-control --variant recovered
```

Default verification checks source maps, the one-file patch and static expected
metadata. It does not compile, execute a VM, read build receipts or establish
runtime success. Optional `--baseline-build` and `--recovered-build` directories
must each contain `candidate.so` and `unstripped.so`; that mode independently
remeasures full ELF functions, headers, relocations and positional data.

The [artifact packet](../access-control-layout-artifact/README.md) retains actual
compiler outputs, independent repeat-build and fresh bounded replay evidence.
No source-only file contains an ELF, archive, encoded instruction stream or
post-link patch. No new inline/no-inline directive, linker-order script or
synthetic matching caller is introduced. The [allocation history](../allocation-provenance/README.md)
explains the capture's capacity separately from Rust ELF construction.
