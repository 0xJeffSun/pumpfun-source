# Sort composition and ordinary route contracts

All four CLI tasks completed, bringing completed independent CLI work to 41 tasks. Root reviewed the reports and ran every unchanged verifier from separate copied directories. These are static results, with no new program source, build, transaction, fixture or runtime coverage.

| Package | Result and remaining limit |
| --- | --- |
| [relay_sort_composition](relay_sort_composition/REPORT.md) | Composes leaves, eager scheduler, partition and general scheduler without circular imports or fresh-capacity assumptions. This is a manual conditional stable-permutation contract; allocator, memcpy, VM ABI/resource and handler-admission premises remain external. |
| [pump_route_wide](pump_route_wide/REPORT.md) | Complete unsigned arithmetic ledgers support multiplication and division on admitted positive-denominator caller domains, with fee/budget/product rounding and narrowing. Zero-divisor VM faults and serialized error construction remain separate. |
| [pump_route_accounts](pump_route_accounts/REPORT.md) | Five-account identities, wrapper/decoded offsets, conditional chain authorities, mint-supply threshold and creator-rate override mapped. FeeConfig decoding, quote-vault acceptance and complete transfer effects remain open. |
| [pump_route_settlement](pump_route_settlement/REPORT.md) | Tokenkeg adapter is locally identity; protocol-before-creator accrual, transfer flags, event object and return fields are grounded. Exact event wire, transitive transfers and native endpoint closure remain open. |

The arithmetic and local Tokenkeg adapter findings narrow earlier explicit obligations without rewriting prior reports. The sort composition supersedes only their internal composition gap; it does not identify historical source or authorize a replacement with different allocation/failure behavior. Existing partial route guards remain. Static source error-precedence differences are not promoted to proven runtime exploits.

All source/recovery counts remain unchanged, all four original binaries still differ, and security sign-off is incomplete. Inner seals remain intact. The outer manifest binds every file except itself; integrity verifiers do not machine-certify the handwritten proofs.
