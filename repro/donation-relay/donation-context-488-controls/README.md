# Relay construction-order controls at the 488-window frontier

This repeats all **24 permutations** of the four owned `AccountInfo` expression
initializers on the current reconstructed source. All retain **488/492 complete
normalized original windows and 142 raw-local matches**. There are no new
matched windows and no lost matches. The same four donation bodies, original
ordinals 92–95, remain unequal. No candidate is promoted.

The earlier [construction-order study](../donation-source-controls/README.md)
used the 482-window source, before complete shared-worker recovery. This packet
rechecks that source dimension after the worker matches. The parent is the
`after-close` variant of
[donation-close-order-controls](../donation-close-order-controls/README.md).
Only `src/donation_handlers.rs` changes. The four reordered fields are:

- `d`: `debouncer_token_account`
- `m`: `mint`
- `f`: `from_token_account`
- `p`: `token_program`

Each sequence is applied to all five handlers. The field declarations, field
values, native CPI and cleanup order, shared worker, ABI and return types stay
fixed. This is an initializer evaluation-order control, not a declaration-layout
search. It rules out these 24 source forms on this compiler/source baseline;
it does not establish a unique historical source or exhaustive equivalence.

## Evidence

All 24 runs compile the root crate, reuse dependencies from an independently
reproduced pinned Linux v1.48 baseline, and record unchanged-source checks.
Source mtimes are refreshed before Cargo so older materialization times cannot
silently select a cached root. Each launch binds the complete 60-input map,
compiler hash, target and remapping flags. The source materializer reconstructs
those inputs from the pinned parent and explicit permutations. Stripped and
unstripped outputs are compressed and addressed by SHA-256.

```sh
python3 -I -B repro/donation-relay/donation-context-488-controls/verify.py
python3 -I -B repro/donation-relay/donation-context-488-controls/verify.py \
  --materialize /tmp/relay-context-dmfp --variant context-dmfp
```

The verifier reanalyzes every complete original function window and resolves
subjects by symbol names. It validates compiler receipts and every source map.
Its only normalization is direct CALL displacement and relocation words.
`recorded-*-controller.py` files archive the actual work-directory recipes;
container and workspace paths need adapting for another machine. No original
machine-code fragments enter compilation. No runtime execution is claimed for
these rejected variants. Complete reconstructed-Rust ELF identity remains open.
