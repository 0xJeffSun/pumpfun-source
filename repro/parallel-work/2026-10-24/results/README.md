# Preserved parallel research results

This bundle contains eight completed workers' public static evidence. Every copied verifier passes without building or executing a Solana program. Reports, byte analyses and source claims are preserved unchanged. These results add no implemented handler, runtime case, historical source identity or whole-program equivalence claim.

| Lane | Result |
| --- | --- |
| [Pump event](pump_event/evidence/REPORT.md) | Legacy zero stores and event serialization are supported; historical field meaning remains unresolved. |
| [Pump partial paths](pump_partials/evidence/REPORT.md) | Accepted-source account/branch/gap map and exact pointers into existing saved cases. |
| [AMM functions](amm_functions/evidence/REPORT.md) | Disposition of all 785 baseline original windows, including 319 residual windows and unresolved calls/data. |
| [Fees functions](fees_functions/evidence/REPORT.md) | Refreshed 548 candidate/585 original row inventory for candidate `e501ca2c…`, with bounded source leads. |
| [Mayhem ABI](mayhem_abi/evidence/REPORT.md) | Existing body/ABI/source evidence; initializer and mixed-entry bodies remain excluded. |
| [ATA recipe](ata_recipe/evidence/REPORT.md) | Retained ordering/call correspondence and missing historical build inputs. |
| [Metaplex Utilize](metaplex_utilize/evidence/REPORT.md) | Preserved full-body/branch/data analysis; no newly justified source correction or runtime coverage. |
| [Donation relay](donation_relay/evidence/REPORT.md) | Complete inferred-window disposition and bounded codec/register models; attributable source and a source-built candidate remain absent. |

Each lane retains its own baseline and candidate hashes. An inferred window is not an independently identified source function, and a normalized match is not complete semantic equivalence. The differing range, handler and case denominators must not be combined into a source-completion percentage. Audit coverage remains incomplete and is outside this public evidence bundle.

Worker orchestration logs, prompts, completion messages, process records and Python bytecode caches are omitted. Historical build logs and metadata remain only where explicitly bound as research inputs. Each lane's `evidence/` directory contains the published analytical payload; `evidence-manifest.json` seals every copied evidence file. `packaging.json` records original payload hashes and any packaging-only correction.

Two original manifests accidentally included mutable orchestration files. Pump event's `SHA256SUMS.json` and Metaplex's `manifest-sha256.json` are preserved under their respective `packaging-history/` directories as failed packaging history. Their corrected copies seal only the evidence payload; `manifest.diff` records every change. Completion files excluded from the original Metaplex manifest also caused its former file-set check to fail. Separating the evidence fixes that packaging boundary without changing its verifier or analysis. **All eight worker verifiers are byte-identical to the originals; no verifier adaptation was needed.**

Run `python3 -B verify.py --audit` from any directory. It verifies the outer seal, exact evidence file sets, original payload bindings, both manifest corrections and every copied worker verifier. The audit mode restricts file opens to this bundle and the Python runtime. Proposed Rust fragments and saved harnesses remain data; the verifier does not compile or execute them. `owned-files.json` lists the exact repository-relative publication paths.
