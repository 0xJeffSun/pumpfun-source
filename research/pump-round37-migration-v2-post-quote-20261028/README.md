# migrate_v2 post-completion quote funding

The original migrate_v2 adds real_quote_reserves and post_complete_quote_in before selecting native-SOL fee subtraction versus token quote funding. Restore this missing checked addition. A local error callback records the original post-transfer quote-balance subtraction at migrate_v2.rs:326; sum and fee subtraction use lines 309/313. The original callback bodies at 0x4bb40, 0x4bd48 and 0x4bf50 are checked independently. This recovers callback bodies and corrects funding behavior, not the entire migration handler.

The native-SOL and stable-token focused probe compares the original, candidate and retained prior control. Controls can overlap the existing migration corpus and are reported separately. All source/build/runtime artifacts are retained. Maintained Round37 checkpoint unchanged; no original executable bytes enter compilation or output editing. Whole original ELF identity remains false.

Verified Linux frontier: 795 / 1,035; all 794 previous matches retained. Fresh repeated ELF artifacts are identical. The existing 827-case migration-v2 suite and separate 40-case focused probe pass with zero diagnostic mismatches. The retained 794 control differs in 30 focused cases, including ten diagnostic differences. The three callback roots have a closed bounded direct-call graph of 25 matching pairs and 89 edges.
