// rea decompile_all
// name: inferred_window_091
// address: 0x106f8
// body: available
// range: 0x106f8-0x11237 inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x11020 to 0xaee40 inferred_window_406 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_091(ulonglong *param_1,longlong *param_2,undefined8 param_3,longlong param_4,
                        longlong param_5)

{
  ulonglong uVar1;
  ulonglong uVar2;
  undefined8 *puVar3;
  undefined1 *puVar4;
  longlong lVar5;
  longlong lVar6;
  longlong lVar7;
  ulonglong local_198;
  ulonglong local_190;
  ulonglong local_188;
  ulonglong local_180;
  ulonglong local_178;
  ulonglong local_170;
  ulonglong local_168;
  ulonglong local_160;
  ulonglong local_158;
  ulonglong local_150;
  ulonglong local_148;
  ulonglong local_140;
  ulonglong local_138;
  ulonglong local_130;
  undefined8 local_128;
  char *local_120;
  undefined8 local_118;
  undefined8 local_110;
  undefined8 *local_108;
  undefined *local_100;
  undefined8 local_f8;
  undefined8 local_f0;
  undefined8 local_e8;
  undefined8 local_e0;
  undefined1 local_d8;
  undefined4 local_90;
  undefined8 local_88;
  undefined8 local_80;
  undefined8 local_78;
  undefined8 local_70;
  undefined8 *local_68;
  undefined *local_60;
  undefined8 local_58;
  undefined1 local_50;
  longlong local_48;
  longlong local_40;
  undefined8 local_38;
  undefined8 local_30;
  undefined8 local_28;
  undefined8 local_20;
  undefined8 local_18;
  undefined8 local_10;
  undefined1 uStack_1;
  
  uVar1 = *(ulonglong *)(param_4 + 0x68);
  lVar7 = *(longlong *)(param_5 + -0x1000);
  uVar2 = *(ulonglong *)(lVar7 + 0x68);
  puVar3 = (undefined8 *)*param_2;
  local_110 = puVar3[3];
  local_118 = puVar3[2];
  local_120 = (char *)puVar3[1];
  local_128 = *puVar3;
  inferred_window_090(&local_138,&local_128,param_3,*(undefined8 *)(param_5 + -0xff8));
  if (local_138 == 2) {
    lVar6 = *(longlong *)(param_5 + -0xfd0);
    inferred_window_021(&local_148,param_4 + 0x20);
    local_138 = local_148;
    local_130 = local_140;
    if ((local_148 == 2) &&
       (inferred_window_021(&local_158,lVar7 + 0x20), local_138 = local_158, local_130 = local_150,
       local_158 == 2)) {
      if (uVar1 < *(ulonglong *)(param_4 + 0x68)) {
        inferred_window_115(&local_198,8);
        local_178 = local_198;
        local_170 = local_190;
      }
      else {
        lVar5 = uVar1 - *(ulonglong *)(param_4 + 0x68);
        if (lVar5 != lVar6) {
          inferred_window_114(&local_38,&DAT_ram_000b83e0);
          local_10 = 0;
          local_18 = 1;
          local_20 = 0;
          local_60 = &DAT_ram_000bcab8;
          local_68 = &local_20;
          local_50 = 3;
          local_58 = 0x20;
          local_78 = 0;
          local_88 = 0;
          lVar7 = inferred_window_116(&DAT_ram_000b83e0,&local_88);
          if (lVar7 == 0) {
            local_e0 = local_10;
            local_e8 = local_18;
            local_f0 = local_20;
            local_108 = (undefined8 *)local_38;
            local_100 = (undefined *)local_30;
            local_f8 = local_28;
            local_120 = 
            "programs/contracts/src/cpi/jupiter.rsprograms/contracts/src/instructions/v1/relayer_only/close_donation_epoch.rsdebouncer_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_after_just_swapping.rsdistribution_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
            ;
            local_90 = 0x1785;
            local_d8 = 2;
            local_110 = CONCAT44(local_110._4_4_,0x5c);
            local_118 = 0x25;
            local_128 = 0;
            inferred_window_284(&local_168,&local_128);
            local_48 = lVar5;
            local_40 = lVar6;
            if ((local_168 & 1) == 0) {
              local_78 = 0;
              local_80 = 1;
              local_88 = 0;
              local_100 = &DAT_ram_000bcab8;
              local_108 = &local_88;
              local_f0 = CONCAT71(local_f0._1_7_,3);
              local_f8 = 0x20;
              local_118 = 0;
              local_128 = 0;
              lVar7 = inferred_window_465(&local_48,&local_128);
              if (lVar7 == 0) {
                local_28 = local_78;
                local_30 = local_80;
                local_38 = local_88;
                local_10 = 0;
                local_18 = 1;
                local_20 = 0;
                local_100 = &DAT_ram_000bcab8;
                local_108 = &local_20;
                local_f0 = CONCAT71(local_f0._1_7_,3);
                local_f8 = 0x20;
                local_118 = 0;
                local_128 = 0;
                lVar7 = inferred_window_465(&local_40,&local_128);
                if (lVar7 == 0) {
                  local_60 = (undefined *)local_10;
                  local_68 = (undefined8 *)local_18;
                  local_70 = local_20;
                  local_88 = local_38;
                  local_80 = local_30;
                  local_78 = local_28;
                  inferred_window_473((longlong)&local_128 + 7,&local_88,0x30);
                  lVar7 = 0x51;
                  puVar4 = (undefined1 *)(local_160 + 0x50);
LAB_ram_000111d0:
                  *puVar4 = 0;
                  inferred_window_473(local_160 + lVar7,&local_128,0x37);
                  param_1[1] = local_160;
                  *param_1 = local_168;
                  return;
                }
              }
            }
            else {
              local_78 = 0;
              local_80 = 1;
              local_88 = 0;
              local_100 = &DAT_ram_000bcab8;
              local_108 = &local_88;
              local_f0 = CONCAT71(local_f0._1_7_,3);
              local_f8 = 0x20;
              local_118 = 0;
              local_128 = 0;
              lVar7 = inferred_window_465(&local_48,&local_128);
              if (lVar7 == 0) {
                local_28 = local_78;
                local_30 = local_80;
                local_38 = local_88;
                local_10 = 0;
                local_18 = 1;
                local_20 = 0;
                local_100 = &DAT_ram_000bcab8;
                local_108 = &local_20;
                local_f0 = CONCAT71(local_f0._1_7_,3);
                local_f8 = 0x20;
                local_118 = 0;
                local_128 = 0;
                lVar7 = inferred_window_465(&local_40,&local_128);
                if (lVar7 == 0) {
                  local_60 = (undefined *)local_10;
                  local_68 = (undefined8 *)local_18;
                  local_70 = local_20;
                  local_88 = local_38;
                  local_80 = local_30;
                  local_78 = local_28;
                  inferred_window_473((longlong)&local_128 + 7,&local_88,0x30);
                  lVar7 = 0x39;
                  puVar4 = (undefined1 *)(local_160 + 0x38);
                  goto LAB_ram_000111d0;
                }
              }
            }
          }
LAB_ram_00010fd8:
                    /* WARNING: Subroutine does not return */
          inferred_window_406("a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/slice/sort/stable/quicksort.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/slice.rsError/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/collections/btree/navigate.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/raw_vec.rsMaxSeedLengthExceededInvalidSeedsIllegalOwnerTryFromIntErrorUnexpected variant index: CustomInvalidArgumentInvalidInstructionDataInvalidAccountDataAccountDataTooSmallInsufficientFundsIncorrectProgramIdMissingRequiredSignatureAccountAlreadyInitializedUninitializedAccountNotEnoughAccountKeysAccountBorrowFailedBorshIoErrorAccountNotRentExemptUnsupportedSysvarMaxAccountsDataAllocationsExceededInvalidReallocMaxInstructionTraceLengthExceededBuiltinProgramsMustConsumeComputeUnitsInvalidAccountOwnerArithmeticOverflowImmutableIncorrectAuthority/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/iter/traits/iterator.rs"
                              ,0x37,&uStack_1,&DAT_ram_000bcae8,&DAT_ram_000bcb08);
        }
        uVar1 = *(ulonglong *)(lVar7 + 0x68);
        if (uVar1 < uVar2) {
          inferred_window_115(&local_188,8);
          local_178 = local_188;
          local_170 = local_180;
        }
        else {
          if (uVar1 != uVar2) {
            param_1[1] = uVar1 - uVar2;
            *param_1 = 2;
            return;
          }
          inferred_window_114(&local_38,&DAT_ram_000b83bc);
          local_10 = 0;
          local_18 = 1;
          local_20 = 0;
          local_60 = &DAT_ram_000bcab8;
          local_68 = &local_20;
          local_50 = 3;
          local_58 = 0x20;
          local_78 = 0;
          local_88 = 0;
          lVar7 = inferred_window_116(&DAT_ram_000b83bc,&local_88);
          if (lVar7 != 0) goto LAB_ram_00010fd8;
          local_e0 = local_10;
          local_e8 = local_18;
          local_f0 = local_20;
          local_108 = (undefined8 *)local_38;
          local_100 = (undefined *)local_30;
          local_f8 = local_28;
          local_120 = 
          "programs/contracts/src/cpi/jupiter.rsprograms/contracts/src/instructions/v1/relayer_only/close_donation_epoch.rsdebouncer_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_after_just_swapping.rsdistribution_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
          ;
          local_90 = 0x1787;
          local_d8 = 2;
          local_110 = CONCAT44(local_110._4_4_,0x67);
          local_118 = 0x25;
          local_128 = 0;
          inferred_window_284(&local_178,&local_128);
        }
      }
      param_1[1] = local_170;
      *param_1 = local_178;
      return;
    }
  }
  *param_1 = local_138;
  param_1[1] = local_130;
  return;
}

