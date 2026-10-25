# Fees update-admin call and data closure

The accepted direct-body matches do not yet extend to a complete transitive call/data proof. A bounded closure from the update-admin dispatcher reaches one unmatched FeeConfig decoding wrapper, and several otherwise matching framework bodies reference different source-location records. These are concrete fidelity gaps; this review establishes no new runtime mismatch and prescribes no source or compiler change.

The current README-provenance candidate is the unchanged 769,000-byte ELF with SHA-256 `a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa`. The captured original is SHA-256 `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`. The snapshot freezes both ELFs, the matching unstripped symbol source, accepted match records, ELF reader, source archive and all 22 current source/workspace/IDL inputs. No source, executable, initializer or runtime fixture was changed or executed.

The closure follows direct calls four edges deep from candidate 373808 / original 634776, stopping at unmatched bodies. Every recorded edge is decoded from the raw signed 32-bit call operand using `pc + 8 + immediate * 8`. Of 59 visited function pairs, 58 have identical complete entry-bounded normalized bodies and relocation patterns; 16 are raw-byte identical. Three unnamed eight-byte thunks are genuine matching bodies, not missing-source failures. The record retains 175 call edges, including 13 outgoing edges from seven depth-boundary bodies. Eleven external syscall sites, eight indirect-call sites and four relocated code pointers remain separate boundaries.

The unmatched path is:

| Step | Candidate → original | Evidence |
| --- | --- | --- |
| Update-admin dispatcher | 373808 → 634776 | Accepted matching body; call at relative offset 160 |
| Update-admin parser | 124104 → 326272 | Accepted matching body; call at relative offset 128 |
| Account parser adapter | 58504 → 71256 | Matching body; call at relative offset 184 |
| `Account<FeeConfig>::try_from` | 30000 → 36072 | **1,144 versus 1,248 bytes; unmatched** |

The two relocation patterns in the unmatched wrapper are equal, but its complete normalized body is not. Original raw-call operands lead through a different checked-decoder handoff: original instructions at `0x90e0` and `0x90f0` subtract eight from the slice length and add eight to its pointer before calling 257264 at `0x9120`. Candidate stores the full account-data slice and calls its named `FeeConfig::try_deserialize_unchecked` at 78104 from `0x7900`; frozen `types.rs:58–76` skips the discriminator within that unchecked method. Original also retains separate short-buffer/discriminator error-conversion paths where candidate shares a guard/error path. `wrapper-dataflow.json` and both raw dumps preserve these observations. The caller slice contract is a grounded next source-review target; changing it safely requires understanding the unmatched decoder, which this bounded matching closure deliberately does not traverse.

The matched bodies contain 241 data-target relocations and four code-pointer relocations. Sixteen direct pointer/length call-argument spans compare equal, including account names, the dispatcher instruction log, FeeConfig discriminator and a zero Pubkey. Additional explicit schema checks confirm both 32-byte program-id literals, the ten-byte `fee_config` seed, the 17-byte `__event_authority` seed and the parser's one-record static seed array after decoding its actual pointer relocation. These checks do not treat adjacent unrelated bytes as part of a literal.

Ninety-two pointer/length record pairs were decoded. Five reference sites reach four distinct source-location record pairs whose content differs:

- `Error::with_account_name`, Anchor `From<ErrorCode>` and Fees `From<FeeError>` reach compiler-library locations with candidate `/Users/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs` versus original `/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs`. The stored lengths are 85 and 84; both line/column pairs are 2559/14. The discrepancy is actual referenced data, despite matching normalized instruction bodies.
- Matching `Pubkey::create_program_address` code reaches `src/lib.rs` line 134/column 18 in candidate versus line 131/column 18 in original.
- Matching `Pubkey::find_program_address` code reaches `src/lib.rs` line 802/column 32 in candidate versus line 612/column 32 in original.

The latter records identify a source-coordinate fidelity difference at those call sites, not a uniquely determined dependency version or runtime error. No padding, path substitution, compiler variant or other attempt to hide these bytes is justified by this report.

The remaining 133 data references have unresolved object extents. Matching pointer/length prefixes do not prove whole vtables, format-argument arrays, panic paths, transitive function pointers or arbitrary rodata. External and indirect calls, the depth boundary, and the unmatched decoder wrapper prevent a complete semantic/identity claim. There is no newly proved business-logic correction in this review.

`closure.json` contains every visited body, raw call edge and relocation target. `root-data-checks.json` records the bounded literal checks. `input-sha256.json` and `manifest-sha256.json` seal the inputs and resulting diagnostic files. Run `PYTHONDONTWRITEBYTECODE=1 python3 work/fees-update-admin-closure/verify.py` to verify saved bytes and the static calculations without executing program instructions.
