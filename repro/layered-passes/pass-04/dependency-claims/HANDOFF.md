Static reconciliation complete. No accepted source correction, new recipe, build, runtime case, or identity gain.

- Corroborated: Metaplex 1,509 raw differences; ATA 307.
- Stronger local Metaplex result: all 580 non-unconditional-jump instructions correspond in labeled control flow after following unconditional jumps and reversing the one complementary comparison. Actual direct targets agree; referenced diagnostic data do not.
- Guard removal preserves the local source-level arithmetic/error contract, but historical spelling and the predicted 1,479-byte closure remain unproved. Preserve the external proposal only as a hypothesis.
- ATA custom_panic is [23032,23312); zero changed text bytes lie inside it. Changes belong to two moved helper windows and four caller windows.
- Captured Solana v1.10.33 SDK selects bpf-tools v1.27. Metaplex host Rust 1.69 is not the recorded target compiler, which is 1.68.0-dev.
- Preserve failures, diagnostic mismatches, original/candidate binaries, missing provenance and finite-test limitations. Main source remains untouched.

Read REPORT.md; raw full decodes/CFG relation are in facts.json. Run `python3 -B verify.py`. Exact input-map.json, ownedmap.json and manifest.json/manifest.sha256 accompany the verifier. Prior seals are unchanged; the old sealed pycache payload is explicitly omitted. Export only this publication, its explicit-file archive and the external verification receipt, never the parent worker directory.
