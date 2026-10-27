# Independent Social winner verification

The immutable `next642/social578-seed19-explicit-tail-v2-symbols.so` independently reproduces the original Social claim_v2 normalized function signature, `0b84d1f0fe0249b415c5cb8659b46892066287d7b2ca63d26d08fcb32aa4c3be`. All1303 decoded rows cover the complete10664-byte function. All46 current source files match the saved native launch hashes.

Original capture SHA256: `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.
Winner symbols SHA256: `9ba3f2ba02dc9d534e932fe27c20832fc989fda2f7f01cce5531e7bb7008dd27`.
Winner stripped SHA256: `c12ffce7741a81b037f344578b42999c73cb4205e926c498a8edc26b121fa947`.

## Calls

There are56 direct calls, three imports, and zero indirect calls. All three import names match (`sol_log_` twice, `abort` once).54 direct callee signatures match. The two remaining direct callees, at Social offsets1656 and3720, both select the known ATA routine at original243184; its6072-byte candidate still differs from the6080-byte target. Therefore this proves the Social body, not recursive closure of all its callees.

## Direct data

All14 relocated direct data uses compare equal over their consumed extents, covering nine distinct original/candidate pointer pairs: four log strings, native-mint Pubkey, event discriminator byte ranges, two CPI program Pubkey uses, two `__event_authority` seed uses, and the `social-fee-pda` seed. Extents are taken from the decoded consumer lengths/ranges and the32-byte Pubkey ABI. There are no direct Source-location records in this function. Transitive callee data remains outside this check.

Raw reports are `independent-social-winner.json`, `independent-social-data.json`, and `independent-social-source-verification.json`. The checks are static and do not claim whole-ELF equality or runtime acceptance.
