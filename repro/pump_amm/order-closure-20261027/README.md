# Direct-call and bounded-literal proof for the 555-window checkpoint

This report binds candidate `ae8ac382db78f9542a3366f7281e15cbc5a19107849797ae805291114c48ef77` from the integrated order-recovery checkpoint.

The unmodified window matcher finds 555 original bodies. A greatest-fixed-point check of their actual internal direct-call target pairs retains 501 original windows (1,291 candidate pairs). Excluding every transitive indirect call leaves 259 windows; also excluding recorded static relocations and external calls leaves 71. Those restricted sets are different evidence scopes, not whole-program equivalence.

All 588 bounded literal uses agree. This checks only recognized straight-block string/memcmp consumers and their recoverable pointer/length inputs. It does not prove unseen data, indirect calls, external providers, or runtime equivalence.

Recompute from the repository root:

```sh
work/test-env/bin/python -B repro/pump_amm/call-closure-audit-20261027/audit.py \
  --candidate repro/pump_amm/parallel-order-recovery-20261027/results/build/candidate.so \
  --symbols repro/pump_amm/parallel-order-recovery-20261027/results/build/unstripped.so \
  --measurement repro/pump_amm/parallel-order-recovery-20261027/results/measurement.json.gz
```

`closure.json` contains the exact paired boundaries and pruning results; `literals.json` contains the observed slices and subsequent fixed point. The original normalization has not been relaxed.
