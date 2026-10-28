# Pump legacy sell: recover the cashback call boundary

The actual legacy `sell` handler now matches all **8,488 original bytes under the unchanged official relocation normalization**, recovering selected window `0x152888`. A fresh native L38 build advances **1018 → 1019 / 1035 normalized**, retains **166 raw** matches, and has **zero normalized or raw losses**. Whole-ELF identity remains false.

The source borrows the cashback mint key and uses a real inline wrapper to evaluate the remaining accounts first, the mint key second, and the user/system accounts afterward. The used inner helper preserves the existing validation and payment operations. Borrowing the key alone recovered the original flag spills and event tail but left 13 load-order instructions different; the actual wrapper closes those 13 instructions. This is a source reconstruction, not a claim to know the historical spelling.

The complete compiled workspace is in `source/`; `source.patch` changes only `programs/pump/src/lib.rs` and `sell.rs` relative to the verified L38 primary source from [#527](https://github.com/lalalune/pumpfun-source/pull/527), head `c48c33e7c4efd7c1b7a1c038323e4911b631fb20`. The workspace transformation is the same as the native control. Inherited synthetic `layout-pad` Source positioning is retained and disclosed. No output patching, embedded original bytes, dummy match bodies, padding changes, dependency edits, or mask changes are used.

The packet also composes the checked accumulator constructor selection independently identified in [#539](https://github.com/lalalune/pumpfun-source/pull/539). Credit for that source correction belongs to that contribution. `constructor-edges.json` independently verifies the actual unmasked helper → Account constructor → checked decoder edge. The checked decoder is 728 bytes and equals the original; the L38 control instead calls the 1,664-byte unchecked payload decoder. Constructor normalization masks that distinction, so constructor-body equality alone is insufficient.

The real Anchor sell dispatcher calls the recovered handler. All **55 outgoing direct call edges** are resolved; **54 corresponding callee bodies match**. The exception is the actual cashback helper at original `0x6cd78`: its emitted body is still **8,816 versus 8,544 bytes**, and remains unmatched. This packet does not claim complete transitive callee identity.

The final candidate passes **182 signed captured-loader paired cases**: legacy sell 115, configured fees 28, legacy buy cashback boundaries 14, and targeted sell accumulator constructor cases 25. There are zero state/error/event/CPI/return mismatches, zero diagnostic mismatches, and zero ordered-log mismatches after excluding compute-consumption lines. Constructor cases cover valid token paths, truncated accounts, owner/discriminator/bool failures, zero-user repair, and cashback/lamport overflow. Surrounding validation already checks or writes the discriminator; runtime parity alone does not identify the checked constructor. Full 44-suite composition remains with the coordinator.

The fresh confirmation explicitly cleans and rebuilds **both** `pump-recovered` and `pump-token-ext`, using native Linux SDK v1.44, `sbpf-solana-solana`, the unchanged physical-source wrapper, locked offline dependencies, and `-Zremap-cwd-prefix=`. `build-record.json` binds the exact command/environment, before/after source hashes, tools, target standard libraries, and reused external dependency hashes. `compiler-commands.json` contains both actual compiler invocations. The recorded session controller uses absolute workspace paths and must be adapted when replayed elsewhere.

- Unstripped SHA256: `a0710d8725e3f8892543470d4ad2f0158220b0009a75be255032909a2ff82c2d`.
- Stripped SHA256: `f42d35455125088848eba99b6420b6adfb1925254708a837bdb1b22892f087b1`.

```sh
python3 research/pump-legacy-sell-boundary-20261028/verify.py
```

This is an independently reviewable research packet. Maintained program source and global README counts are untouched.
