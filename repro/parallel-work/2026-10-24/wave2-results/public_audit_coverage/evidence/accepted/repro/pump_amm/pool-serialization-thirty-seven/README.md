# AMM37 Pool serializer correction

`Pool::try_serialize` now propagates the discriminator and Borsh writer errors
through Anchor's `From<io::Error>` implementation. This is the one source change:
the two explicit string/`ProgramError` conversions become direct `?` followed by
`Ok(())`. The original complete exit and its direct targets support that change.

The pinned v1.44 clean main-path build is **1,175,720 bytes**, SHA-256
`5a68db39372121c6406727bced3087aa9caf63f14a999ac68206c9b5b3401216`.
It is whole-file identical to the separately built scratch executable tested by
all **25 existing suites / 17,462 cases**, with no mismatches. The case corpus and
37 recovered handlers are unchanged; this package adds no unique test inputs or
handlers. `create_config` remains absent from the active implementation.

The complete normalized Pool exit now matches the original at
`0x4210..0x48b8` (1,704 bytes), including all 24 direct calls to matching complete
target bodies and the exact consumed discriminator bytes. The previous
GlobalConfig exit match remains (1,648 bytes, 24 direct calls). Normalization
masks only actual relocation and direct-call immediates in memory; no executable
is modified. Complete-function matches are 448 of 641 symbol-bounded candidate
functions, up from 447. Original function bounds are inferred from entry/call
targets, not historical debug symbols. This is not a claim of transitive rodata
identity or recovered historical source, compiler, dependency graph or flags.
Whole-file and ELF-extent equality to the captured original remain **false**.

`static-evidence.tar.gz` retains all 90 sealed diagnostic files plus their
unchanged `manifest.json` (SHA-256
`482fff7b381639a6b4c01147b2df424efd8237003437742588b15ca497f96134`).
That historical report correctly describes the patch as uncompiled at the time
of its sealing. `scratch-build/` retains its own complete 81-file manifest and
the fresh build/test records. Main and scratch build logs, 18 source inputs,
36 harness/helper inputs including `scripts/build_source_manifest.py`, and
13 runtime inputs are bound separately. The prior checkpoint
`repro/pump_amm/serialization-thirty-seven` remains unchanged.

Verification from the repository root:

```sh
python3 repro/pump_amm/pool-serialization-thirty-seven/verify.py
```

The verifier is portable and read-only. A copied package can be checked from
another directory with `python3 /path/to/package/verify.py --original
/path/to/captured/pump_amm.so`; add `--repo /path/to/repo` to check the current
source/helper/runtime paths too. Scratch-only helper paths absent from a clean
checkout are verified in the frozen test archive and reported separately.
Without a repository, the verifier still checks
all packaged hashes, source/test archives, original raw static windows, complete
exit/direct-target/discriminator matches, main/scratch identity and all receipts;
it reports zero external runtime inputs verified. `replay-commands.json` contains
the 25 existing replay commands targeting this final artifact. Actual scratch
commands and exits are retained in `regression-run.json`.

The only two builds were the scratch build and its main-path reproduction; both
passed. All 25 suite attempts passed. No new runtime probes, initializer recovery,
compiler variants, binary edits, or live transactions were used.
