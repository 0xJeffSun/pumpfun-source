# Coherent owned-error path for IDL header serialization

This source-only patch closes the entire admitted IDL **header serialization failure** path, from BpfWriter I/O failure through owned3004 construction, account-name decoration, logging and consuming SDK lowering. It does not replace unrelated IDL validation/body errors. No compiler or runtime has been invoked, and main source is untouched.

The patch reuses the already-reviewed `generated_exit::exit_error::Error`, `account_did_not_serialize()` and BpfWriter. Their modules become crate-visible; no implementation, declaration, dependency or ABI attribute changes. IDL's existing Cause gains an Owned variant so only the proved header boundary transfers to the existing owned implementation. This avoids inventing a dynamic framework enum or pretending all IDL error origins have been reconstructed.

## Producer, guard and propagation

The original ordinary header exit19 [15904,16672) checks type owner and closed state before mutable borrow. Its three field operations call shared writer281 at16128,16352,16424. Short writes preserve the copied prefix. Its I/O destructor path precedes owned framework factory297 at16584. The original direct header serializer216 is invoked from Create171 without the ordinary exit owner/closed gates. All complete bodies, actual direct calls and data references are retained in `header-evidence/`; current unified `write_header` is candidate132 [325928,326416), not falsely called a whole-function match to either original.

The new `write_header` uses the same writer in discriminator8, authority32, length4 order. Its inner closure returns `io::Result`; the outer `map_err` first drops that error, then calls the existing owned3004 factory. The surrounding `exit_header` still owns the live mutable RefMut until `write_header` returns. Thus construction remains before borrow release. Create's direct mutable guard likewise remains alive through the call. No upfront capacity check, tail clearing, new borrow, owner gate or data reload is introduced.

The returned IdlError envelope has Owned cause and None account/keys/values/origin. Ordinary exit's existing `named` call consumes the owned error via `with_account_name(name)`, after the inner guard has gone out of scope. It keeps outer metadata None so no duplicate log decoration is generated. Direct Create failure remains unnamed. The header failure is returned immediately through the existing `?`/tail paths; no IDL caller subsequently applies keys, numeric values or source metadata to this variant.

## Owned constructor, decoration, logging and destruction

`owned-evidence/` retains full original297 [665312,665904), its dynamic name/Display callees, current specialized3004 producer83, and complete direct closures. The current source creates the22-byte owned name, formats the31-byte message and boxes the160-byte AnchorError with code3004 and no origin/compared values. The original dynamic producer's code3004 path has the same field roles and operation order; different code generation/selector breadth remains unequal.

The reused account decorator replaces origin with an owned AccountName on either variant. Original ordinary header19's wrapper decorates after borrow release; the earlier reviewed complete generated-exit wrappers provide both owned variant branches. The patch's header path is always AnchorError; no unsupported ProgramError manufacture is added.

`Failure::Idl` still owns the envelope. Reporting matches its borrowed Cause; Owned delegates once to Error::log, reaching the existing AnchorError logger and its account/no-origin templates. The unchanged outer `values(e.values)` sees None. Lowering consumes Owned via the existing `From<Error> for ProgramError`; original290 extracts custom code and destroys owned name/message/origin/compared data and box. Current copied natural conversion provides those ownership operations. The patch does not separately recreate strings or report twice.

The new variant's envelope has no custom Drop and no additional allocation. Its owned error moves unchanged from producer to named wrapper to Failure, is borrowed for reporting, and is consumed at lowering. Header bytes and field writes do not depend on the error envelope representation. Rust type correctness remains a future build gate, not asserted from static review.

## Scope and remaining gaps

All existing Framework and Program IDL errors retain their prior behavior, including validation errors, keys/values and known origin gaps. Their end-to-end owned conversion is **not** claimed fixed. In particular program borrow failures and code2506 comparisons remain prior adapters. Making this branch-specific rather than whole-IDL ownership replacement is necessary because those original producer/origin paths are not yet fully proven. The new header Owned variant is not assigned any of those metadata fields by current callers.

Whole original/header/formatting equivalence is unproved. Original windows are entry-bounded rather than historical symbols; indirect formatter and arbitrary data extents remain open. No claimed bytes are normalized on disk. The dynamic original factory has many unrelated callers; this patch does not generalize them. Existing ordinary12 coverage does not exercise every short-header/borrow/formatter failure. Any later build should use the unchanged pinned recipe, compare entire new ledgers and full header/writer/owned-error/borrow/drop closure, then only the existing authorized regression corpus. No new probe is proposed.
