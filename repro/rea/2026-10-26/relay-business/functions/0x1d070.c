// rea decompile_all
// name: inferred_window_107
// address: 0x1d070
// body: available
// range: 0x1d070-0x1d28f inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x1d288 to 0xaee40 inferred_window_406 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_107(undefined8 *param_1,ushort param_2,undefined8 param_3)

{
  longlong lVar1;
  undefined8 uVar2;
  undefined8 local_128;
  undefined8 local_120;
  undefined8 local_118;
  char *local_110;
  undefined8 local_108;
  undefined4 local_100;
  undefined8 local_f8;
  undefined8 local_f0;
  undefined8 local_e8;
  undefined8 local_e0;
  undefined8 local_d8;
  undefined8 local_d0;
  undefined1 local_c8;
  undefined4 local_80;
  undefined8 local_78;
  undefined8 local_70;
  undefined8 local_68;
  undefined8 local_60;
  undefined8 local_58;
  undefined8 local_50;
  undefined8 local_48 [2];
  undefined8 local_38;
  undefined8 *local_28;
  undefined *local_20;
  undefined8 local_18;
  undefined1 local_10;
  undefined1 uStack_1;
  
  uVar2 = 2;
  if (10000 < param_2) {
    inferred_window_114(&local_78,&DAT_ram_000b83a4);
    local_50 = 0;
    local_58 = 1;
    local_60 = 0;
    local_20 = &DAT_ram_000bcab8;
    local_28 = &local_60;
    local_10 = 3;
    local_18 = 0x20;
    local_38 = 0;
    local_48[0] = 0;
    lVar1 = inferred_window_116(&DAT_ram_000b83a4,local_48);
    if (lVar1 != 0) {
                    /* WARNING: Subroutine does not return */
      inferred_window_406("a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/slice/sort/stable/quicksort.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/slice.rsError/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/collections/btree/navigate.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/raw_vec.rsMaxSeedLengthExceededInvalidSeedsIllegalOwnerTryFromIntErrorUnexpected variant index: CustomInvalidArgumentInvalidInstructionDataInvalidAccountDataAccountDataTooSmallInsufficientFundsIncorrectProgramIdMissingRequiredSignatureAccountAlreadyInitializedUninitializedAccountNotEnoughAccountKeysAccountBorrowFailedBorshIoErrorAccountNotRentExemptUnsupportedSysvarMaxAccountsDataAllocationsExceededInvalidReallocMaxInstructionTraceLengthExceededBuiltinProgramsMustConsumeComputeUnitsInvalidAccountOwnerArithmeticOverflowImmutableIncorrectAuthority/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/iter/traits/iterator.rs"
                          ,0x37,&uStack_1,&DAT_ram_000bcae8,&DAT_ram_000bcb08);
    }
    local_d0 = local_50;
    local_d8 = local_58;
    local_e0 = local_60;
    local_f8 = local_78;
    local_f0 = local_70;
    local_e8 = local_68;
    local_110 = 
    "programs/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
    ;
    local_80 = 0x1782;
    local_c8 = 2;
    local_100 = 0xc0;
    local_108 = 0x26;
    local_118 = 0;
    inferred_window_284(&local_128,&local_118);
    uVar2 = local_128;
    param_3 = local_120;
  }
  param_1[1] = param_3;
  *param_1 = uVar2;
  return;
}

