# Access-control and donation-context source composition

This ordinary-source composition combines the already validated [access-control placement](../access-control-layout-source/README.md) with [DonateContext naming and compatibility alias](../donate-context-raw-recovery/README.md). Against the access-control baseline, the only changed file is `src/tools/donate/shared.rs`; all60 source inputs are bound by SHA256. No binary patch, custom linker ordering, assembly, padding, or matching-only function is introduced.

The actual composition improves complete raw original-function matches **376→379**, gaining exactly51,52,112 with no losses; all492normalized windows remain matched. The three recovered bodies are the DonateContext cleanup, BTreeSet cleanup, and shared donation worker. Their exact starts are33384,33912,131136. These are source/compiler-layout hypotheses, not proof of the historical identifier.

The complete runtime/settlement block194–204 remains at exact original addresses with raw-equal bodies. The three new bodies have60actual direct calls, all bound to normalized complete-body pairs with recursive direct-call-shape closure. The runtime block adds103 such calls. No indirect call occurs in these selected bodies; complete referenced-object extents and indirect runtime behavior elsewhere remain unproved.

| Measure | Access-control baseline | Composition |
| --- | ---: | ---: |
| Normalized windows | 492 | 492 |
| Raw windows | 376 | 379 |
| Common-position differing bytes | 9398 | 8901 |
| .text differing bytes | 9324 | 8829 |
| .rel.dyn differing bytes | 49 | 47 |
| .data.rel.ro differing bytes | 25 | 25 |
| Compiler ELF bytes | 818280 | 818280 |

All ELF/program/section headers and the entire .dynsym,.rodata,.dynamic,.dynstr,.shstrtab remain exact. The positional data graph still contains359verified pointers and507exact nonpointer qwords; five referenced text targets contain indirect calls.

Whole-file identity remains false:8901meaningful common-position byte differences and12168original-only allocation bytes remain. Normalized matching and direct-call shape are not full semantic or byte identity.

## Source-only verification

```sh
python3 -I -B repro/donation-relay/access-control-donate-context-source/verify.py
```

The default reads ordinary source and static metadata only. It does not build or run a VM. Materialization requires a new destination:

```sh
python3 -I -B repro/donation-relay/access-control-donate-context-source/verify.py --materialize /tmp/relay-composition-source
```

Optional independent remeasurement accepts actual build directories containing candidate.so and unstripped.so:

```sh
python3 -I -B repro/donation-relay/access-control-donate-context-source/verify.py --baseline-build work/relay-488-donation/layout-access-control --recovered-build work/relay-488-donation/layout-access-donate-context
```

Actual build, repeat and replay evidence is retained separately in [the artifact packet](../access-control-donate-context-artifact/README.md).
