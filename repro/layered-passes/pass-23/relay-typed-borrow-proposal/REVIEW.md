# Relay12 checked typed-IDL borrow failure: source-only owned conversion

Propose exactly one boundary restoration in src/idl.rs: when checked=true, convert an actual ProgramError from rt.idl_data(info) into the existing owned ExitError before returning to Cursor::typed/named. Successful borrow/decode is untouched. Unchecked=false path, owner/uninitialized/framework errors, mutable borrow callers, Rent/realloc/CPI errors and all application/authority paths stay unchanged.

Baseline is accepted d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a, candidate6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e, symbolsaf100c573ed3d97304590328200c764d01f9a87980babbc1e4004ed9e25637cf. All23source inputs and full original492/current330 ledgers/residuals are preserved. Existing opaque dispositions and fixedauthorityprivilegedsuccess/source-origin/probe exclusions remain. No main/source/Git edit, build, target execution or new fixture occurred.

## Concrete ordinary caller

Already-admitted ordinary IDLWrite parser W213599904..602856 calls typed cursor62920..63104 at599944. Cursor decrements remaining/advances one AccountInfo and calls checked Account::try_from20392..21392 at63088. No authority condition is evaluated before this typed first field. Source Cursor::typed uses named(typed(rt,a,true),name); admit_write names first field"idl" then parses signer and constraints. This correction does not inspect or alter the authority-success path.

Original checked Account::try_from validates owner/uninitialized before immutable data borrow. It calls690000..690144 at20920. That helper reads the shared RefCell counter (690024), rejects >i64::MAX-1 at690048, and returns an AccountBorrowFailed ProgramError representation on failure. Success increments counter at690072..690080 and returns an owned guard-capability pointer/slice with success discriminator. Exact private enum words are evidence, not returned ABI constants or proposed source coordinates.

20392caller compares borrow success discriminator at20952..20968. Failure20976 goes21128: it transfers the actual3word ProgramError payload to a local aggregate, calls652528..652688 at21184, and returns the owned error pair21192..21232. No guard was acquired, so this branch has no borrow release/decrement. The success path alone calls checked decoder609848 at21048 and releases guard at21360..21376. The source proposal must not move conversion after decode or add a release to failed acquisition.

## Original converter and outer account ownership

652528..652688 allocates128bytes/align8 at652544..652560, handles allocationfailure, copies actual ProgramError fields+32/+40/+48, sets originNone at+0 and comparedvaluesNone at+56, returns outer Error tag1 and box at652640..652656. It does not fabricate a Custom code. ProgramError remains complete and will be lowered by the framework/SDK.

W213 observes the typed failure at599976 and enters600504. On ProgramError variant it takes600640→600984. It allocates the account name3bytes, writes"idl" at601032/601040, replaces origin with AccountName and owns the String triple at601064..601088, then transfers the same outer Error+box at601096..601120. Conversion therefore MUST precede account-name decoration. OriginNone is replaced, not a Source location inserted. No compared pubkeys/values apply to this borrow-acquisition failure.

Original Error::log652688..652752 dispatches tag1 to ProgramErrorWithOrigin::log653288..655256 at652736. Full logger body and direct calls retained; accountorigin formatting uses programerror Debug/Display/u64 role, not AnchorError name or invented framework code. The concrete destructor/vtable boundaries stay recorded. No exhaustive dynamic formatter/OOM closure is asserted.

## Current discrepancy and exact natural restoration

Current typed326880..328496 validates the same owner conditions, calls immutable borrow370136 at327544, branches on success327576. Failure327584→327936..328072 merely copies ProgramError into lightweight IdlError and sets wrapper metadata; it makes no128byte owned conversion. SolanaRuntime::idl_data uses try_borrow_data().map_err(program_error); program_error constructs Cause::Program with no account/keys/values/origin. Cursor::typed currently records a static accountname via named's lightweight arm. Error report349288..351616 logs this through the handwritten direct program formatter; lower351616..352872 returns the lightweight ProgramError. Eventual numeric/log content may agree, but ownership/allocation/error role differs before account naming.

The proposal adds private own_typed_borrow_failure(IdlError)->IdlError. It moves Cause::Program(program) into Cause::Owned(program.into()) using existing ExitError From<ProgramError>; other causes pass unchanged. Called only on rt.idl_data(info) when checked=true. The current owned converter source in exit_error.rs already allocates ProgramErrorWithOrigin128bytes/None origin/None comparisons and retains actual ProgramError. Type inference uses Cause::Owned(ExitError) to select the existing From implementation; no numeric tags/layout/unsafe casts are written.

named's existing Owned arm then calls with_account_name(name), moving the owned Error, allocating the truthful accountname and replacing origin. report then uses owned error.log(); lower uses owned into ProgramError. Existing full with_account_name67336..67992 and ProgramErrorWithOrigin::log67992..69608 plus report/lower are retained. None of their code is rewritten. Account name and numeric failure remain the same; this is owned conversion restoration, not changing which error is raised.

## Deliberately unresolved

Unchecked typed false path called from create-buffer remains lightweight; its original companion reader12984 must be separately proved if proposed later. Initial uninitialized3012/owner3007 branches remain lightweight and need their own constructor/comparedkey proof. Cursor::raw3005, signer/system constraints, other primitive borrows and mutable-borrow/realloc/syscall failures remain unchanged. Do not globally alter program_error, IdlRuntime or all error adapters. Historical full compiler/framework identity and whole original raw equality remain false/unknown. No fake source origin is introduced.

This packet statically supports a concrete one-file source proposal, not emitted acceptance. Root must review before authorizing any fixed build. Any later build must preserve23inputs except this exact patch, inspect actual128byte box conversion before accountname decoration, verify no failed-acquisition guard decrement, preserve3001/3002/3003/3004/current serializer order and full call/data/drop/log/lower ledgers. Runtime may only replay unchanged ordinary12 under separate authorization; borrow-conflict coverage is not claimed and no new fixture/probe is proposed.

Run python3 -B verify.py to authenticate checkpoint/source/full bodies and the exact argument/branch/converter/accountname/order bindings plus exact one-boundary diff. Static file reads only; no build/runtime.
