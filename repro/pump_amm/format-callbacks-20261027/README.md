# Concrete formatter callbacks and alternate table limits

This follow-up uses the same frozen `fe3c755` candidate as the vtable audit and
does not rerun or weaken its completed checks.

A bounded symbolic interpreter reads the straight-line constructors for two
actual `core::fmt::write` invocations. It tracks registers and typed stack stores
only until the call, rejecting unsupported instructions.

| Constructor | Initial callback descriptor | Generic callback site |
| --- | --- | --- |
| ProgramError IO-error display | One argument, prefix `IO Error: `, unformatted options, callback at original `0x1094b8` | `fmt::write + 232` |
| Account-data hexadecimal debug | One argument, empty prefix, formatted options selecting index zero, callback at original `0x1185c0` | `fmt::write + 480` |

The candidate constructors produce the same descriptors, and the actual
callback targets match complete original bodies and their internal direct-call
closure. This gives concrete initial targets for both formerly unresolved
callback sites. It does **not** resolve every instantiation of those sites or
prove arbitrary intervening callbacks cannot mutate escaped state. No global
indirect-call coverage count is increased by this conditional result.

For three alternate String tables (`0x1203f8`, `0x120608`, `0x121620` in this
candidate), the drop target is 48 bytes rather than the original return-only
body. The verifier checks every instruction: a readable String header is
inspected, and a nonzero-capacity branch calls the actual `__rust_dealloc`, whose
entire body is a single return. Both paths have no memory stores, logging or
syscalls. This establishes the same drop-side effects **for a readable 16-byte
String header**, not byte identity. Invalid pointers and other table methods
remain outside that result.

The fourth alternate table at `0x121820` is a concrete identity counterexample:
its `PadAdapter::write_str` and `write_char` bodies are 1,288 and 224 bytes,
whereas the original String targets are 168 and 688 bytes. Matching header
size/alignment cannot establish table identity. This rejects that candidate
alias; it does not identify a deployed AMM behavior defect.

`results.json` preserves the constructors, actual target addresses, body sizes
and limits. `verify.py` authenticates the local artifacts and prerequisite
report identities and recomputes this follow-up without repeating the earlier
full audits. No maintained source or executable is changed.
