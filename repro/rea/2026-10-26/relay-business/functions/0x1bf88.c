// rea decompile_all
// name: inferred_window_105
// address: 0x1bf88
// body: available
// range: 0x1bf88-0x1c2ff inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x1c2f8 to 0xaee40 inferred_window_406 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_105(undefined8 *param_1,longlong *param_2)

{
  int iVar1;
  longlong lVar2;
  undefined8 *puVar3;
  undefined8 uVar4;
  undefined *puVar5;
  undefined8 local_158;
  undefined *local_150;
  undefined8 local_148;
  undefined8 local_140;
  undefined8 local_138;
  undefined8 local_130;
  undefined8 local_128;
  undefined8 local_120;
  undefined8 local_118;
  char *local_110;
  undefined8 local_108;
  undefined8 local_100;
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
  
  puVar3 = (undefined8 *)*param_2;
  local_120 = puVar3[3];
  local_128 = puVar3[2];
  local_130 = puVar3[1];
  local_138 = *puVar3;
  puVar5 = &DAT_ram_000b7d00;
  iVar1 = inferred_window_475(&local_138,&DAT_ram_000b7d00,0x20);
  uVar4 = 2;
  if (iVar1 != 0) {
    inferred_window_114(&local_78,&DAT_ram_000b8390);
    local_50 = 0;
    local_58 = 1;
    local_60 = 0;
    local_20 = &DAT_ram_000bcab8;
    local_28 = &local_60;
    local_10 = 3;
    local_18 = 0x20;
    local_38 = 0;
    local_48[0] = 0;
    lVar2 = inferred_window_116(&DAT_ram_000b8390,local_48);
    if (lVar2 != 0) {
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
    local_80 = 0x177f;
    local_c8 = 2;
    local_100 = CONCAT44(local_100._4_4_,0x50);
    local_108 = 0x26;
    local_118 = 0;
    inferred_window_284(&local_148,&local_118);
    local_100 = local_120;
    local_108 = local_128;
    local_110 = (char *)local_130;
    local_118 = local_138;
    local_f8 = 0x694a70111093c06;
    local_f0 = 0x53a780f350073d54;
    local_e8 = 0x63865abf06259216;
    local_e0 = 0xed3a4eb8621e7c8f;
    inferred_window_287(&local_158,local_148,local_140,&local_118);
    uVar4 = local_158;
    puVar5 = local_150;
  }
  param_1[1] = puVar5;
  *param_1 = uVar4;
  return;
}

