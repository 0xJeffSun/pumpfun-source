# Bounded AMM research archive

This archive preserves six completed research work areas after publication of `10533cd3`. It is historical evidence, not a selected source/build checkpoint and not a promotion of any candidate.

| Work area | Preserved purpose |
| --- | --- |
| `amm-deposit-event-borrow-20261027` | Deposit event borrowing experiment and 44/680-case receipts. |
| `amm-event-borrow-sweep-20261027` | All-event borrowing experiment and its full saved runtime corpus. |
| `amm-deposit-borrow-captures-20261027` | Deposit event captures and LP-supply read experiment with signed probes. |
| `amm-workspace-current-20261027` | Natural workspace-layout build experiment and full saved runtime corpus. |
| `amm-structural-composite-20261027` | Combined structural candidate, full corpus and focused receipts. |
| `amm-event-abi-recovery-20261027` | Eight completed event ABI/evaluation-order builds, negative hypotheses, signed probes, and the raw-identical Pool method result. |

Source trees, Cargo manifests/locks, builder/analysis scripts, completed build records and logs, candidate and unstripped ELF artifacts, measurements, patches, recorded assessments, and completed signed receipts are retained. Existing summaries are preserved as historical claims with their original limitations. Passing runtime probes do not establish full ELF equality, and normalized matches do not establish relocation/data closure. This archive does not upgrade any old claim.

`manifest.json` maps each original workspace path to a stored path, codec, exact logical SHA-256/size, and stored SHA-256/size. Large report JSON is gzip-compressed with timestamp zero; source JSON remains directly usable. Compressed copies end in `.repro.gz`; pre-existing gzip receipts retain their original bytes. Decompress according to the manifest to reconstruct original file contents. Original manifest files are retained as evidence, not substituted for this archive's manifest.

`omissions.json` lists every omitted path encountered: the two live target caches and an incomplete fingerprint-removal record. The latter came from an attempt to remove an already-absent root fingerprint; its later successful build/source evidence remains included. No Cargo home, SDK, target cache, compiled dependency cache, or other external environment was copied. The small, previously frozen registry-input proof under the event ABI work area is retained because it binds source provenance; it is not a live Cargo home. References in historical commands to repository tools or SDK caches remain references, not a claim that those environments are packaged here.

Run `python -B verify.py --expected-seal SEAL` to check every stored and decompressed byte hash, the exact archive file set, successful build records, candidate/symbol/log bindings, and source inputs that are present in these six work areas. External dependency/SDK inputs remain identified by their recorded hashes. The verifier executes no archived scripts, compiler, ELF, VM, or network request.
