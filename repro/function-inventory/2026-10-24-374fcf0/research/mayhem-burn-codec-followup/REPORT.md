# Mayhem burn-state codec: no supported source correction

The complete original MayhemState serializer and current burn-path serialization agree on the discriminator, field order, widths, state-relative memory offsets, and write-error number. The unchecked decoder's relevant cursor/length/tag checks also agree. This bounded review does not justify changing the current state fields, replacing the derived codec, adding `noinline`, or adjusting source locations.

The remaining concrete fidelity boundary is the framework error-return convention. The original passes an error code in `r1` and receives a pair in `r0/r1`; the current build passes an output-buffer pointer in `r1` and the error code in `r2`, then reloads the result. This is an observed code-generation difference. Whether compiler ABI or a dependency/type representation caused it requires separate provenance investigation.

## Binding and scope

Original SHA: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.

Current main24 SHA: `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b`.

The saved current unstripped ELF has identical text bytes. The current state.rs, burn.rs, Cargo.toml and Cargo.lock copies are checked against the accepted build report, which records platform tools v1.52. The selected account macro is Anchor 1.0.0 from that build's cargo cache. No compiler was invoked.

Fourteen bounded raw assembly ranges are included. They cover the existing burn exit, state serializer/decoder, three relevant helpers, and error construction. The stopped initializer is excluded, and no initializer graph was followed. All original range identities are refreshed against original bytes; historical candidate addresses and counts are not reused.

## Serialization evidence

Original burn exit 241592–244328 calls the standalone state serializer 427504–428280 (776 bytes) at byte 242528, passing state data at context+0x160. Current burn exit 177152–180496 calls generic account exit 22056–23344 (1288 bytes) at byte 177224, passing the account at context+0x158. That generic function contains the current serialization, with state data eight bytes after its account pointer.

Both perform ten ordered writes totaling 106 bytes. `analysis.json` binds every signed call operand, the immediate write length, and each scalar load. The direct Pubkey source is also retained.

| Serialized offset | Width | Current field label | State memory offset |
| --- | ---: | --- | --- |
| 0 | 8 | discriminator `b1fdbf7dcb16866b` | constant |
| 8 | 8 | field_8 | 0x40 |
| 16 | 8 | end_timestamp | 0x48 |
| 24 | 32 | mint | 0x00 |
| 56 | 16 | field_56 | 0x20 |
| 72 | 16 | field_72 | 0x30 |
| 88 | 1 | flag_88 | 0x61 |
| 89 | 8 | field_89 | 0x50 |
| 97 | 1 | status | 0x60 |
| 98 | 8 | burned_amount | 0x58 |

The labels come from current source. The 128-bit signedness and historical names are not proved by these widths. The candidate's account-relative offsets are the state offsets plus eight, consistently across all fields.

Both write paths discard the underlying IO error and construct error 3004, matching the existing account macro. The BpfWriter write_all bodies at candidate 518176 and original 620336 have a complete 280-byte normalized match and the same relocation pattern. Their actual 28-byte failure message also matches. This is a body match, not a proof of every descendant or data object.

## Decoder evidence

Original unchecked decoder 429280–430840 is 1560 bytes; candidate 160144–161696 is 1552 bytes. Both take the complete account buffer, require at least eight bytes for the discriminator slice, read the same fields, validate bool values 0/1, position the enum cursor at whole-account byte 97, and require the final eight-byte burned amount. Both construct error 3003 for failed field decoding. Eight raw instruction checkpoints and the actual enum calls are retained.

MayhemStatus decoder candidate 161696/original 427120 is a complete normalized 384-byte match. The EOF conversion helper candidate 564392/original 665904 likewise matches over 416 bytes. Together with BpfWriter, these are three directly relevant complete helper-body matches; their full transitive closure remains open.

The checked wrappers still differ (candidate 1048 bytes, original 1000), including error-return handling, branches and diagnostic metadata. The full unchecked CFG and all error paths are not claimed equivalent merely from the checkpoints.

## Error-return boundary

The serialization failure call at original 428248 passes 3004 in `r1` to original error constructor 632296–632880. The candidate call at 23240 supplies a return pointer and 3004 in `r2` to 530416–531008. The unchecked decoder independently exhibits the same pair-versus-buffer difference for 3003. Full caller windows and both complete error-constructor bodies are saved.

The original error constructor is 584 bytes and current is 592 bytes. Their differing calling conventions explain several local register, stack and control-flow differences without establishing why the convention changed. No semantics-preserving source rewrite is uniquely implied by this observation. Framework/type provenance and retained compiler evidence should be inspected before considering any build hypothesis; no toolchain enumeration or compiler variants are justified by this report.

## Verification

`python3 -B verify.py` checks the file seal, 12 frozen inputs, current source/build bindings, all 14 raw assembly ranges, ordered writes, exact field-load offsets, discriminator/error literals, decoder checkpoints, raw call targets, and three normalized helper-body matches. It uses only the saved package and Python standard library, performs no builds or runtime probes, and preserves the conclusion that no source correction has been established.
