# Relay checked typed-borrow owned error: one-build static result

Reviewed planv2 cc2c3d92595496838f51d8f3ff244c5d585095179ab84533e48d19e3f9937ada preflight EXIT0; exactly one execute EXIT0 (session84347), compiler EXIT0, backend diagnostics empty. Candidate e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244; symbols2df866f5a9a629199ba856861fa3bf9ed03e8f1a265eadc5c5a990589d547596. Source23 stays exact frozen proposal5072; only src/idl.rs differs accepted Relay12. Cargo.lock/dependency archives, helper1ee5, requestedv1.44 compile/private SDK and actualv1.52 strip checks passed. Actual logs/exits/tool phases/extracted dependency files/source after retained. No retries, runtime, target harness, new fixtures or active current/source/Git edits.

## Emitted checked failure and ownership

Full typed326880..328920 branches on checked at327528. Checked borrow370560 called327568; success tag comparison327608 proceeds327624 to checked decoder324792. Failure327616 jumps328520. Converter inline allocation subtracts128 at328552, aligns8 at328632, uses allocationfailure handler380416 at328688. Actual returned3word ProgramError is stored to owned allocation+32/+40/+48 at328816/328808/328800; originNone/comparisonsNone328832/328824. Owned IdlCause/error fields are returned328840..328904. This failed-acquisition path has no borrow decrement. Only successful acquisition's decode paths decrement guard at327904..327920 or328248..328264.

Borrow helper370560..370704 is full normalized equal baseline: shared RefCell counter370584 compared toMAX-1 at370608; only success increments370632..370640, failure370688 returns ProgramError. This is actual ProgramError ownership conversion, not fabricated customcode or manual ABI source.

Full admit_write328920..332240 remains normalized equal baseline. It passes checked=true329352, calls typed329360, recognizes owned cause329472 and calls existing with_account_name67336 at329544 with actual idl bytes425601 and length3. Thus converter precedes name decoration. with_account_name67336..67992 and ProgramErrorWithOrigin logger67992..69608 remain full normalized equal baseline. Report349712..352040 and lower352040..353296 likewise remain normalized equal baseline, preserving existing owned logging/lowering/drop handling. Complete bodies and call/data rows retained; no new original opaque bodies decoded.

## Preserved and moved diagnostics

Unchecked=false separate branch327936 calls same borrow370560 at327960, then unchecked decoder323544 at328056; borrow failure328000 goes lightweight328696, bypassing128byte allocation. Unchecked decoder full1248B normalized equal baseline. Checked decoder2088B keeps3001/3002/3003 constructor roles and call order. Its one nonrelocation immediate difference is truthful source line115→123 at325720, caused by8 naturally inserted helper lines; file remains src/idl.rs. Source3004 serializer path is unchanged. No source-coordinate coercion/padding or assertion of original line36 equality. Complete source23, full old/new ledger and original retained body proof are included.

## Full inventory and limits

Original492/current330 windows;122 normalized original matches,33 raw matches,370 unmatched; no normalized match gain. Candidate473688 bytes vs original830448, whole_file_equal=false. Static targeted ownership restoration is supported by emitted branch/box/name evidence. This is not full original equivalence, complete compiler process attestation, recursive indirect/formatter/OOM closure or runtime acceptance. Runtime remains UNAUTHORIZED and zero. Borrow-conflict coverage is static only; any unchangedordinary12 requires separate authorization. Existing authority/source-origin/stopped/opaque exclusions remain.

Canonical Relay12 full payload rehashed after and matches originald12ad manifest; source/current points remain accepted Relay12. verify.py is portable saved-byte verification only (no compiler/VM), authenticates full raw function windows, exact instruction/call gates and source/dependency/control records. Build target/private generated keypairs intentionally excluded from packet and never opened/hashed.
