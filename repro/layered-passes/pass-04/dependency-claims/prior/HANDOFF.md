# Dependency recipe handoff

**No evidence-backed next build for either ATA or Metaplex. No source/recipe proposal.**

* ATA: rechecked 307 raw differences; candidates 2=4, 3=5; all five retained failures preserved. Candidate-5 archive symbols identify the surviving helper pair in its unstripped ELF. That pair equals best candidate 2, and stripping preserves all seven allocated sections: no support for a strip-only correction. Original object/metadata/upload linkage is still missing.
* Metaplex: rechecked 1,509 common-extent differences; raw candidate also lacks 86,543 captured zero bytes. All 1,251 window hashes checked; 1,250 raw matches. All 29 diagnostic tuples decoded across nine files; conversion changes a column as well as lines. No unique natural declaration/source arrangement follows. Utilize's 51 actual direct destinations match bodies, but call order and text remain unequal.
* Request original artifact-linked source/lock/unit graph, compiler/link/strip trace and intermediates before selecting a build. Existing release/audit metadata and candidate manifests do not authenticate those missing inputs.

Full reasoning, hypotheses, contradictions and acquisition criteria: `REPORT.md`. Exact raw/archive evidence: `evidence.json`. Payload allowlist and ownership: `ownedmap.json`; hashes: `manifest.json` and `manifest.sha256`. Offline check: `python3 -B verify.py`.

No main writes, builds, downloads, runtime probes, new fixtures, git mutations or excluded-lane work. Static integrity success does not change whole-binary identity or completion counts.
