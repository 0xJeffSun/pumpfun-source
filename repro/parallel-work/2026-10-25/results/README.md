# Third parallel recovery and source-review pass

All ten independent CLI tasks completed against published checkpoint517d77d. Root independently ran every unchanged verifier from copied directories. The four source reviews enumerate included source across all four programs, with112 Accounts contexts and422 function declarations/dispositions (including explicitly excluded boundary rows). They retain25 candidate-source observations requiring further evidence. These are preliminary candidate reviews, not confirmed vulnerabilities in captured originals or a completed security audit. Public source and evidence alone were used; previously private audit records remain excluded.

| Package | Concrete result and remaining limit |
| --- | --- |
| [audit_pump](audit_pump/REPORT.md) | 56 instruction slots,187 function dispositions,38 contexts; five candidate concerns.52 included handlers, three stopped slots and one missing non-stopped implementation remain distinguished. |
| [audit_amm](audit_amm/REPORT.md) | 37 implemented handlers,112 functions,29 contexts; nine candidate observations. Missing create_config and external guarantees remain unresolved. |
| [audit_fees](audit_fees/REPORT.md) | 31 handlers,62 functions,30 contexts; five candidate observations. This is the01f inline candidate before later account module placement. |
| [audit_mayhem](audit_mayhem/REPORT.md) | 24 non-excluded handlers,61 functions,15 contexts; six bounded observations. Initializer and dependency expansion remain incomplete. |
| [pump_partial_predicate](pump_partial_predicate/REPORT.md) | Reserve/mode mapping and downstream register tracing; ordinary legacy SOL predicate and full partial-fill effects remain unclosed. |
| [pump_create_nested](pump_create_nested/REPORT.md) | Variable-width ancestor traversal and reverse pricing flow; decoded types, migration predicate and arithmetic still lack complete proof. |
| [pump_route_depth](pump_route_depth/REPORT.md) | Original loop structurally permits greater depth; zero-flag middle legs still invoke fee selection. Full deeper-route implementation remains unproved. |
| [mayhem_error_abi](mayhem_error_abi/REPORT.md) | Four proven non-initializer constructor callsites across two withdrawal paths; ABI/optimizer attribution remains unresolved. |
| [relay_error_codec](relay_error_codec/REPORT.md) | Normal-path parser errors, caller metadata and outward codes3001–3003; total failure/cleanup ABI and source identity remain unclosed. |
| [relay_math_closure](relay_math_closure/REPORT.md) | Concrete callback contexts, decoded operand offsets, low-quotient behavior and error propagation; complete relay source and all-call closure remain absent. |

No program source patch, build, runtime case, signature change or broadcast was performed by these ten workers. Their source reviews concern the frozen candidate implementations and explicitly preserve authorization/policy/reachability and original-byte uncertainties. No speculative security correction is integrated. Parent reviews can use the concrete source/byte obligations to guide further reconstruction, without relabeling them as accepted fixes or finished audit work.

Each subdirectory preserves its original seal and portable `verify.py`. These verifiers establish reproducible bytes, source spans and bounded calculations; they do not prove every manual interpretation. The outer manifest records all files without modifying the inner packages. CLI telemetry is excluded.
