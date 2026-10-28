# Compose the credited harvest helpers onto the public AMM647 source

**Source-only progress packet; whole-binary reconstruction remains incomplete.**
This integrates the ordinary three-`AccountInfo` Anchor-SPL harvest mechanism
already recovered in [PR264](https://github.com/lalalune/pumpfun-source/pull/264)
and independently qualified on the older 638 parent in
[PR281](https://github.com/lalalune/pumpfun-source/pull/281).
It does not claim discovery of that mechanism or promote a repository checkpoint.

The frozen base is the public
[`event-decoder-recovery-20261027` packet](https://github.com/lalalune/pumpfun-source/tree/2310e96d94868bb0a57fb7231a4eae13d8f87d01/repro/pump_amm/event-decoder-recovery-20261027).
All 52 workspace source inputs are included under `base/`. The public 51-file
canonical source map, exact Git blob identities and unchanged public workspace
recipe are verified, so no private prerequisite or remote download is needed.
See [PROVENANCE.md](PROVENANCE.md).

## Reproduce the source, without a compiler or VM

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B source_tools.py
PYTHONDONTWRITEBYTECODE=1 python3 -B test_scope.py
PYTHONDONTWRITEBYTECODE=1 python3 -B source_tools.py --stage base --materialize /tmp/amm647-base
PYTHONDONTWRITEBYTECODE=1 python3 -B source_tools.py --stage harvest --materialize /tmp/amm649-harvest
```

Output directories must be fresh and outside this packet. The default verifier
checks source/integrity only. It does **not** execute Cargo, a target VM, network
access or live transactions, and does not attest native/runtime equality.

`harvest.patch` changes only `src/boost_burn.rs` and `src/utils/token.rs`.
It replaces the active inline SPL-instruction construction with the credited
three-handle helper, preserving all existing physical source coordinates.
The same 563-byte helper is appended to the token utility module. Forward and
reverse transformations must match all 52 exact source hashes; 50 files remain
unchanged. No new unsafe, compiler hints/options, forced linking, dead helper,
original-byte payload, post-link patching or target padding is introduced.
Temporary clone/allocation/AccountInfo ownership order intentionally differs
from the inline base; source inspection alone is not behavioral proof.

## Locally observed results, not supplied binary receipts

| Original-window metric | Public 647 | Composed source |
|---|---:|---:|
| Normalized membership / 785 |647|649|
| Maximum injective normalized capacity |645|649|
| Raw-local matches |148|148|
| Matched original text bytes /1,162,040 |810,544|814,688|
| Direct-call fixed-point injective capacity |586|590|

The two gained original windows are the 1,480-byte utility at 478768 and the
2,664-byte Anchor-SPL helper at 1011376. The emitted Boost caller really uses the
utility; its two actual direct callees and the SPL helper's 28 actual callees
match complete normalized bodies. All previous normalized/raw original-address
memberships, call-closed originals and positive classified callee/data checks
survive. The whole Boost parent remains unmatched, 1,872 data extents remain
unclassified, and 125 of 137 inferred Locations agree. These are not complete
call/data identities, semantic bijections or whole-file equality.

Independent official Linux v1.44 compilation reproduced both public 647 outputs
from an empty target, then repeated with all 363 dependency artifacts unchanged.
The composition likewise repeats both complete outputs with those 363 artifacts
unchanged. This Linux environment is an explicit adaptation, not claimed
historical provenance. Exactly three inherited incentive-wrapper frame-overlap
diagnostics remain: these are **not warning-free builds or stack-safety proofs**.
Compiled root machine objects repeat exactly; only nonallocated `lib.rmeta`
differs, so complete `.rlib` equality is not claimed.

Composed local output fingerprints, for independent comparison:
- Stripped 1,297,600-byte candidate:
  `406189ecf9173ab257edc084b5a4ba63c6daa0831ded92cbdd9ae3be4a9cdb2e`.
- Unstripped 1,819,456-byte symbols:
  `aaaf3bf8b73afaa1b9b008f6166e6a562d6221c30e4edda5799734cc45a81c0d`.

The unchanged finite public Boost suite ran 506 cases for each source in cached
and fresh VM modes: four runs, zero declared-field mismatches. Complete cached/
fresh receipts repeat for each candidate. All 15 logged harvest-entry cases
also finish successfully with identical observed CPI instructions, events,
return data, transaction bytes and nonexecutable-account snapshots.
Entry logs alone are not a proof of successful CPI completion.

Important disclosed differences and limits:
- Each run retains 148 application-log and 389 complete-log gaps against original.
- Between 647 and 649, declared fields, application logs and original observations
  are unchanged; 362 complete-log cases differ in consumed-compute or nested
  remaining-budget numbers. Those real differences are not normalized away.
- Both modes disable transaction history; cached mode restores tracked state,
  while fresh mode creates a new VM. Executable accounts are not snapshotted.
- Signers are deterministic synthetic fixtures, not real wallets; signature
  checking is the existing harness assertion, not an independent replay proof.
- The public 647 optional-u64 short-tail bug remains: 123 differences in 264 signed
  probes, including 91 differing errors and 32 original successes rejected.
  This separate decoder gap is not repaired or tested by the Boost suite.
- Whole captured ELF and meaningful original ELF equality remain false.

This packet deliberately contains no ELF, IR, object/archive, runtime/build
receipt, signed transaction, captured account data or encoded payload. Local
measurement prose is not downloadable evidence. The exact source and pure
tests are supplied for independent review; publication does not merge, deploy
or declare full reconstruction complete.
