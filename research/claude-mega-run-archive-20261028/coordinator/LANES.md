# Lane registry (coordinator: Claude session 30698782; mega run launched 01:41 PDT 2026-10-28)

The app caps concurrent sub-agents at 20 (CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS). All lanes hit the account session limit at
~01:40 and were resumed at ~01:54 after the account upgrade. Agent ids are for coordinator SendMessage relays.

## Running (20, as of ~03:30)
| Lane | Contract | Role / windows | agent id |
| --- | --- | --- | --- |
| mg-M-int | Mayhem | integrator / PRs (#423 merged: 439) | abc02245fafc7dfc3 |
| mg-P-int | Pump | integrator / PRs (#425 = L15 972; newest L22 980) | a0dcf90b26b0b298a |
| mg-A-int | AMM | integrator / PRs (#426 = union-750 755; newest union-752 757) | a2036d07744194633 |
| mg-M-raw2 | Mayhem | whole-ELF data side (.rodata/.data.rel.ro/dynamic, lddw targets) | a56f927725720bdb6 |
| mg-A-raw | AMM | whole-ELF layout prep (Linux; ordered.ld recipe from mg-M-raw) | a82172b3cfee241bf |
| mg-A-sp5 | AMM | 0xf28b8 (block order) 0x6db20 0x6d408 (RA) from mg-A-7 | a04b21c2c04bcd543 |
| mg-P-hop | Pump | 0x5b3b0 multi-hop hop body rebuild from extracted call list | a9362914a0821e8d5 |
| mg-P-z00b | Pump | 0x14910 admit (RA only, .69) 0x1ac28 initialize_metadata (frame) | a7ea31de65b23822b |
| mg-P-z08b | Pump | 0x138b20 create (frame layout) 0x13b9b8 buy_v2 | ac11c7325f06a4204 |
| mg-P-raw | Pump | whole-ELF layout prep (ordered.ld recipe from mg-M-raw; raw-ready matched windows) | af4bf6fea7eda1bc9 |
| mg-P-res2 | Pump | near-miss 2nd try 0x3cd50 0x298b0 0x3fb70 0x2bf18 (+0x152888 0x14a8a8 after deps) | a0322d53299dba455 |
| mg-A-res1 | AMM | near-miss 0x23e40 (1 insn) 0x24fd8 0x2ba60 0x50f00 | a7d19ff7128896e52 |
| mg-A-mh2 | AMM | multi-hop bodies 0x3dbc0 0x40a08 0x45940 (from mg-A-4 best-v1x) | a7c9f8013f74ec67d |
| mg-P-z04 | Pump | 5 windows | a0864ac71706df0dc |
| mg-A-sp1 | AMM | second pass 0x4c750 (exact length, RA) 0x56710 0x53350 0x54a20 | a369227ba2a05517f |
| mg-P-z06b | Pump | sweep handler rebuild 0x6cd78 0x72810 (missing zero-amount msg!) + 0x6fef8 0x75308 | aaf2de0c68f82f74a |
| mg-A-sp2 | AMM | second pass 0x3a5a0 0x351a8 0x16128 (23/24) 0x14920 (RA) | abc170c720194c667 |
| mg-P-z10b | Pump | legacy trade rewrites 0x14c038 0x14f4e0 (decoded CFG from z10) | a8b167b86a1d5541a |
| mg-A-sp3 | AMM | srf out-of-lining chain 0x19138 0xc5d0 0x2288 + 0x14088 | a41503f1bbb75c34d |
| mg-P-z07b | Pump | claim_v2 0x77940 + update_schedule 0x7c720 rebuilds, 0x7bfd8 | a66549a4302954e36 |

## Fleet B (finished ~03:54)
Second coordinator session "Mega run fleet B" (local_7c8eebf5-8cf2-40d0-a723-ec5f331c16a2) ran 7 lanes: closed Pump +0x76a28
(mg-P-cash) and AMM +0x26da8 +0x28dd0 (mg-A-sp4). 6 of 7 lanes stopped after safety checks halted a step (v3a, cto2, big,
v3b, mig, A-sp4); their untried next steps are held for a user decision (MR/LANES-B.md). Best near-misses held there: AMM
0x2e720 masked 436 -> 6 (mg-A-sp4 best-partial-src), Pump 0x49888 .758 built / .947 IR (mg-P-mig BEST-V1, v/V3), Pump
0x857a8 via mg-P-v3b best-h2 (net 0 while 0x163bf0 inlines).

## Finished (results are in each lane's PROGRESS.md and BEST/BEST-partial dirs)
- mg-P-z05: +0x62aa0 +0x58f58 +0x5a260; 0x5b3b0 -> mg-P-hop; 0x567d8 partial .349 parked for mg-P-z04 (v/hd_sl_fa).
- mg-A-7: +0x74b80 +0xf2ed0 +0xf31d8 (also raw); partials 0x6d408 0x6db20 0xf28b8 -> mg-A-sp5.
- mg-P-z00: +0x1db88 +0x1c880; partials 0x14910 .69, 0x1ac28 (-> z00b); 0x173d8 depends on the buy_exact_quote_in handler (fleet B mg-P-v3b); 0x18678 walk and 0x1e7c0 need full rewrites (decoded in its PROGRESS.md).
- mg-P-z08: +0x1367c0 +0x89258 +0x8bbd0 (in L29; 0x8bbd0 also corrects multi-hop event fields to the original's values); 0x138b20/0x13b9b8 -> mg-P-z08b; 0xcd3d8 parked after a safety block.
- mg-P-sp1: no deliveries; 0x17c850 IR-exact (source plateau .559); lead: 0x80df8 single inline decision (clo.sh); flagged L24 0x80df8 regression (.157 vs c80 .66).
- **mg-M-raw: Mayhem 441/441 RAW (WIN-r441a -> parent-441), whole ELF equal except 30 B dynsym order; finished ~03:33; diagnosis: sol_log_data vs sol_memcpy_ dynsym order (anchor_lang names memcpy first); mg-M-raw2 on the last 30 B.**
- mg-M-o84c: O0084 partial c4 (4 masked, 49 insns) -> closed via o83c's composition; finished ~03:28.
- **mg-M-o83c: Mayhem 441/441 normalized (O0083 + O0084), raw 223, no losses, clean rebuild byte-identical; mega/mg-M-o83c/BEST.**
- mg-M-o83a, mg-M-o83b: O0083 partial 19 reg-masked / 168 slots (identical builds), mega/mg-M-o83{a,b}/BEST-partial.
- mg-M-o84b: O0084 partial r3 = 7 masked, mega/mg-M-o84b/BEST-partial. mg-M-o84a: stopped by a safety check, no builds.
- mg-A-1: 0 wins; partials 0x14920 (RA), 0x16128 (23/24), 0x14088 (66/71), 0x19138 (#[cold] lever); snap/s3-partial.
- mg-A-2: 0 wins; partials 0x23e40 (1 insn, -> mg-A-res1), 0x24fd8 19, 0x2ba60 53, 0x26da8 203, 0x28dd0 432, 0x2e720 436.
- mg-A-4: +0x44ab0 +0x40100 +0x40308 +0x452e0 +0xb92c8 (in union-750); big bodies -> mg-A-mh2.
- mg-A-6: +0x51d08 +0x50598 (in union-751); partials 0x53350 0x54a20 0x56710 0x50f00 (-> res1) at best-u751-src.
- mg-P-lib: +0x806c8 +0x60ee0 +0x93050 +0x940c0 +0x63cf0; partials 0x80df8 .66, 0x17c850 .55, 0x9b148/0x9b430 .56.
- mg-P-z01: +0x2d920; partials 0x298b0 .905, 0x2bf18 .89 (-> res1); 0x22a10 needs a rebuild (-> mg-P-cto).
- mg-P-z02: +0x3b8d8; partials 0x2fa60 .38, 0x34558 .60. mg-P-z07: +0x7e490 +0x7f010; partial 0x76a28 .87 (-> res1).
- mg-A-5: +0x49b50 (in union-752); partial 0x4c750 exact length, entry RA residual (-> mg-A-sp1).
- mg-P-z03: +0x45fa0; partials 0x3cd50 .9937 and 0x3fb70 .867 (-> res1), 0x3e550 .39 (with z08), 0x49888 (needs z04's migrate_v2 helper split).
- mg-P-z06: +0x6a1e0 +0x6a8a8; partials 0x6fef8 .793, 0x75308 .612; 0x6cd78/0x72810 need rebuilds (-> mg-P-z06b).
- mg-A-3: +0x376b0 (in union-753); partials 0x3a5a0 (gen/ex1.rs), 0x351a8 (gen/cb_v6.rs) (-> mg-A-sp2).
- mg-P-z10: +0x1557e8 +0x17bc48 (both raw-equal too); 0x14c038/0x14f4e0 -> mg-P-z10b; 0x152888 needs z06b's 0x6cd78, 0x14a8a8 needs z08's 0x8bbd0.
- mg-P-cto: no win; admin_cto passes 363/363 differential (logs not compared); the original emits 4 msg! lines ours omits; needs a from-scratch rebuild (decode in its PROGRESS.md, tools/orig_c.txt).
- mg-P-res1: 0 wins; root causes: 0x3cd50 (undef Ok(()) payload phi blocks the extractvalue fold), 0x298b0 (BPI zero heuristic on one branch), 0x2bf18 (llc cannot reproduce the loop fn), 0x3fb70 (pervasive RA + tail merge), 0x76a28 (base handler 1160 B vs 3864 B: needs z07's reconstruction), 0x857a8 (coordinate-only -> mg-P-int layout pass).
- mg-P-z09: ended early after a safety check stopped one analysis step; no deliveries; IR loop in lanes/mg-P-z09.

## Not reassigned after safety stops
Lanes that a safety check stopped while they read long deployed-program listings are not restarted on the same windows:
O0084 first lane (closed later anyway), the z09 set's first lane, 0xcd3d8 (z08), 0x22a10 admin_cto (fleet B mg-P-cto2, twice;
the user decided in fleet B not to reassign it), 0x83c00 and 0x857a8 (fleet B mg-P-v3a), 0x144508 sell_v2 (partial .4285 at WP/lanes/mg-P-big/v/s1) and 0x13f630
(fleet B mg-P-big). New lanes work from scorer/diff
summaries and avoid from-scratch rewrites driven by the listing.

## Queue (start when a slot frees)
1. second-pass AMM: A-2 leftovers 0x26da8 0x28dd0 0x2e720
2. Pump z03's 0x49888 migrate_v2::execute once z04 lands the migrate_v2 helpers; 0x76a28 claim_cashback reconstruction (1160 B vs 3864 B)
(admin_cto rebuild and the z09 window set moved to fleet B)
