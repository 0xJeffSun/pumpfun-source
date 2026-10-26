# AMM owner6048: actual emitted caller proof

The actual one-line `require_keys_neq!` to `require!` build removes the unsupported compared-key decoration. New handler781856..787992 rejects the same creator.owner32 before amount/zero; its entire error6048 record retains comparedNone and truthful `src/collect.rs:20`. The owned conversion result returns untouched. This is bounded emitted evidence, pending root review. AMM selected6dc621 is unchanged. No runtime authorization, VM, compiler, active-source, path/layout, current-status or fixture change occurred in this packet.

The collector had already completed with actual numeric exit0. Its original exit/stdout/stderr were inspected before work; it was not retried. Root build terminal0, child0, backend error count0 and all8 after-gates0 are retained. Candidate09bee0dfd751dc6ae0240bbac262933c6bda6e0c94aa643f82c57f2956c3a117; symbolsf6e504317ba774325c0ba682e2529c7f18d1ae645a0d7aa239de557729dd0cb4. Exactly30 source inputs match the reviewed proposal. Existing sourceproof328, buildplane3c and collectorplaned27 are retained unchanged.

`python3 -B verify.py` checks packet bytes, exact plan/sourceproof seals, actual build/terminal/backend/source/tool/cache/SDK/helper/dependency/fingerprint records, complete new handler/wrapper instruction witnesses, actual argument aliases and encoded branches. It regenerates both full inventories with the exact pre-existing method. No archived compiler/controller/runtime command is invoked. Historical absolute paths are preserved as receipt labels; they are not followed as live dependencies. Tool/cache/registry observations are historical records, not claims about the host at verification time.

## Owner, amount and zero precedence

At entry, r7 is handler Context pointer.781872 loads accounts into r8;781880 loads the UncheckedAccount pointer at accounts+16 into r6;781888 loads ownerpointer at that AccountInfo+24.781896 loads exact FEE_OWNER32 at1104728 and781912 gives length32.781920 invokes the actual memcmp1094168.781928/781936 normalize its return to32bits.781944 branches to782224 only when nonzero. Equal owners enter the error arm at781952.

The paired creator key is loaded from the SAME AccountInfo at782304, then its four u64 words are copied782312..782368 into stack[-592..-561]. This key is the32byte creator signer seed and event creator. This ties the compared owner to the creator without inferring historical parser layout.

Only the non-equal edge782224 loads vault object at accounts+32 and amount at object+104 (782232), saving it at-704.782248 branches to positive path782304 when amount is nonzero. Zero falls782256→782280: exact30bytes `No coin creator fee to collect`, then r2=2 at782288 and goto787944. This route contains no transfer, Clock, serialization, event log or event CPI. The branch polarity differs from6dc because blocks were rearranged; failure precedence is unchanged.

## Complete error6048 ownership and return

781952..781984 passes output&stack[-552] and actual enum object1105804 to PumpAmmError::name859984. The observed enum object is exactly4bytes30000000, equal to6dc's1106036; current source declares the variant=48. This is an observation of emitted bytes, never a fabricated enum ABI/compiler input. The Display call782128 uses that same enum object with formatter&stack[-224]. Its owned output triple is initialized at-104/-96/-88. Formatting failure782136 does not enter the record construction: it takes the distinct782144..782216 unwrap_failed arm1069408.

Successful formatting jumps785224. The complete785224..785416 construction is compared instruction by instruction to the accepted6dc pre-decoration record785176..785368. It moves both complete owned String triples, Source fields and compared field; only the genuine source pointer relocation and converter call displacement differ. The record base is frame-504, passed in r2; output pair addressframe-656 is passed in r1. The observed stores relative to that base are:

| Field | Actual stores | Meaning |
| --- | --- | --- |
| Origin variant |785376: u64[base+0]=0|Source variant, same as prior record|
| Filename |785320/785336 pointer1108100;785368 length14|exact `src/collect.rs`|
| Source line |785360: u32[base+24]=20|truthful current line20|
| Name triple |785272..785312→base+32/+40/+48|complete name ownership from-552/-544/-536|
| Message triple |785224..785264→base+56/+64/+72|complete formatting ownership from-104/-96/-88|
| Compared field |785352: u8[base+80]=2|same comparedNone construction as sourceproof328 and6dc pre-decoration record|
| Error number |785344: u32[base+152]=6048|owned CreatorVaultMigratedToSharingConfig|

785416 calls From<AnchorError>1002024. Its complete ledger row matches6dc1002256 and sourceproof328's normalized original converter metadata. No original converter body was newly decoded. The pinned anchor-lang0.31.1 archive/checksum/source retained in sourceproof328 identifies the exact `AnchorError`/`ErrorOrigin`/`ComparedValues` API and the natural `require!` construction. No manual ABI or guessed None encoding was supplied to the compiler.

After conversion, the COMPLETE sequence is785424 loadr1=[frame-648],785432 loadr2=[frame-656],785440 goto787944. Common return reloads the original output address fromframe-664, writes r1 atout+8 and r2 atout+0, then exits787968. There is no intervening call, compared-value decoration, owner reload or FEE_OWNER materialization. This is positive record/store/ABI/return evidence, not an inference merely from the absence of a with_pubkeys symbol. Baseline6dc's subsequent owner/FEE_OWNER copies and with_pubkeys call785600 are absent from this arm.

Original admitted error6048 still has its genuine75byte original filename/line68 and direct converter144432→return146968. The source path/line mismatch remains explicit. Original semantic inspection remains exactly142984..147008 and960744..961392. No new original parser/helper/data extent was opened.

## Positive path and actual arguments

`instruction-correspondence.json` binds681 actual baseline/new instructions and all operands. The five explicit baseline→new ranges are781856..781952+0,781952..781984+272,781984..784904+320,785632..785680-3376 and785680..788224-232. The only permitted changes are the two explicitly inverted owner/amount branches, exact mapped branch targets,34 injective private spill aliases(old<=-680→old+16), same external symbols, same full normalized callee bodies, and caller-consumed bounded data. All derived-frame-pointer argument arithmetic and all other register/memory operands agree exactly. This is not a new generic normalization rule.

The actual creator-vault signer slices are constructed from literal13bytes at1108074, copied creator32 atframe-592, and bump1 atframe-553. The pointer/length slots frame-552/-544,frame-536/-528,frame-520/-512 hold13/32/1. Bump comes fromContext+32. The signer-slice list atframe-224 is supplied to the CpiContext. Full account cloning, key/owner/data/lamports/flags stores and all Rc increments between782488 and784456 have the same operand dataflow as6dc under those private spill aliases. Source account declarations/types/order are byte-identical within source30.

| Boundary | Actual call and arguments | Outcome edge |
| --- | --- | --- |
| Transfer |784536→943224; r1=&frame-608 result, r2=&frame-504 complete CpiContext, r3=amount fromframe-704, r4=quote_mint.decimals fromquote_mint object+48|784568: tag!=2→787944 directly|
| Clock |784592→1018024; r1=&frame-504|784608 nonzero tag→785448; ProgramError conversion785528→return785552|
| Event log |785904→1017072; one slice(pointer,120) atframe-104/-96, r2=1|before event-CPI construction/invoke|
| Instruction |787264→1044224; r1=&frame-504, r2=programID32 at1109197, r3=event-prefix+payload pointer, r4=128, r5=&accountsVec atframe-104|same construction operands and normalized helper row|
| Event invoke |787576→1017128; r1=&frame-128 result, r2=&frame-504 instruction, r3=&oneAccountInfo, r4=1, r5=frame plus extra signer descriptor atframe-4096/-4088|787608 success→787624; error→787760 conversion787792|

Mint/from/to/authority/program roles derive from unchanged source account declarations and the full unchanged account/CpiContext construction operands. Parser or recursively called transfer semantics are not re-proved from names. The transfer, Clock, log, instruction, invoke and ProgramError converter full normalized ledger bodies match6dc. Those metadata correspondences are not transitive original CPI/data equivalence.

Successful Clock unix_timestamp is loaded784680 fromframe-464. Event stores785624..785848 serialize discriminator0x593adaeaeec2f5e8 at+0, timestamp+8, creator32+16, amountu64+48, vault32+56 and destination32+88, total120bytes. Event-CPI construction repeats this field order786376..786616. Prefix0x1d9acb512ea545e4 is stored786824; loop786840..786904 copies exactly120bytes to+8, yielding128bytes. Event log785904 precedes invoke787576. Event signer seed17bytes at1107041 is consumed with the actual length17 store787480. Current-only32byte programID consumption is bound to the pinned `Instruction::new_with_bytes(Pubkey,...)` source signature; no original programID data extent was added.

Both event-invoke outcomes perform local Rc cleanup. Success decrements temporary lamportsRc at787640 and dataRc at787704, with weak-count decrements on zero, then r2=2→787944. Error preserves converted pairr1/r2 while decrementing both AccountInfo temporary owners at787848/787904 and weak counts on zero before the same return. Transfer/Clock failures return before event temporaries exist. Rc overflow abort782568 and allocator/formatting failure calls remain separate explicit edges; metadata correspondence does not turn them into successful paths or prove machine stack safety.

## Wrapper and remaining context metadata

Wrapper638912..639976 still logs exact34byte instruction, parser639072→575584, parser-error639104→639944, handler639344→781856. Handler success tag2 branches639360→639376 and exit639416→582288. Handler error goes639368→639680, retains its pairfromframe-328/-320 and skips exit. Both arms decrement the parsed account Rc owners before returning pair639952/639960. Parser failure remains a separate direct return with no fabricated parsed context.

All19 other collected context-role rows—including collect parser/exit/wrapper, Claim/Sync/init/close metadata—have exactly matching full normalized body hashes. Their declaration source bytes remain unchanged in the30input gate. `context-data-deltas.json` retains every one of155 changed pointer operands: all move exactly-232. This relocation is measured, not discarded. Some functions also move-232 in text. No referenced-data-content or recursive semantic equality is inferred for those155 generic metadata operands. The seven actually consumed current literal ranges are separately bound in `consumed-current-data.json`; no speculative64byte preview is called consumed data.

## Inventories, limits and next gate

Before/after inventory generation reproduces every JSON/TSV exactly. Original785 windows; candidate661 symbol windows/676alias rows;488 normalized original matches,93raw matches and297unmatched remain unchanged. Candidate bytes fall1200616→1200384 and handler6368→6136. Whole differing positions INCREASE9957873→9958512(+639); whole equality remains false. The old focus descriptor is inapplicable to the new candidate and remains labeled historical.

No fixture/probe or runtime-control binding was created. Existing coverage remains8paired collectcases/16outcomes/oneuniqueTX/signature; strict dynamic owner6048 compared-key/log assertionsZERO. Original dynamic parser-versus-handler error location is unproved because raw logs were discarded. Successful future corpus runs cannot replace this emitted proof. Existing runtime template5f5b remains unbound; only root's full review of this actual packet can authorize a later binding.

No compiler/runtime verifier acceptance, stack-safety, complete original recursive equivalence, byte identity, security completion, active candidate adoption or current canonical-main build claim follows from this packet. No model/account usage block was observed.
