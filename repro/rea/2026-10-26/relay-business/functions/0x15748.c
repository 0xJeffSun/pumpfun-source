// rea decompile_all
// name: inferred_window_096
// address: 0x15748
// body: available
// range: 0x15748-0x166e7 inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x15b88 to syscall:0xb6fc1a11 abort (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; Ghidra Listing reports a terminal call at 0x166e0 to 0xaee40 inferred_window_406 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_096(longlong *param_1,longlong param_2,longlong param_3,undefined1 param_4)

{
  undefined1 uVar1;
  undefined1 uVar2;
  undefined1 uVar3;
  longlong lVar4;
  undefined8 *puVar5;
  longlong lVar6;
  undefined8 *puVar7;
  undefined8 *puVar8;
  longlong lVar9;
  longlong lVar10;
  undefined8 *puVar11;
  longlong local_210;
  longlong local_208;
  longlong local_200;
  longlong local_1f8;
  longlong local_1f0;
  longlong local_1e8;
  longlong local_1e0;
  longlong local_1d8;
  undefined1 local_1d0 [8];
  undefined8 local_1c8;
  undefined8 local_1c0;
  undefined8 local_1b8;
  undefined8 local_1b0;
  undefined8 local_1a8;
  undefined8 local_1a0;
  undefined8 local_198;
  undefined8 local_190;
  undefined8 local_188;
  undefined8 local_180;
  undefined8 local_178;
  char *local_170;
  undefined8 local_168;
  undefined8 local_160;
  longlong *local_158;
  longlong *local_150;
  undefined8 local_148;
  char **local_140;
  undefined8 local_138;
  undefined8 local_130;
  longlong *local_128;
  longlong *local_120;
  undefined8 local_118;
  undefined8 local_110;
  undefined1 local_108;
  undefined1 local_107;
  undefined1 local_106;
  undefined8 local_100;
  longlong *local_f8;
  longlong *local_f0;
  undefined8 local_e8;
  undefined8 local_e0;
  undefined1 local_d8;
  undefined1 local_d7;
  undefined1 local_d6;
  undefined8 local_d0;
  longlong *local_c8;
  longlong *local_c0;
  undefined8 local_b8;
  undefined8 local_b0;
  undefined1 local_a8;
  undefined1 local_a7;
  undefined1 local_a6;
  undefined8 local_a0;
  longlong *local_98;
  longlong *local_90;
  undefined8 local_88;
  undefined8 local_80;
  undefined1 local_78;
  undefined1 local_77;
  undefined1 local_76;
  char ***local_70;
  undefined8 local_68;
  char **local_60;
  undefined8 local_58;
  undefined8 local_50;
  char *local_48;
  undefined8 local_40;
  undefined8 *local_38;
  undefined8 local_30;
  char ***local_28;
  undefined *local_20;
  undefined1 *local_18;
  undefined8 local_10;
  undefined1 uStack_1;
  
  lVar10 = *(longlong *)(param_2 + 0x198);
  if (lVar10 == 0) {
    inferred_window_114(local_1d0,&DAT_ram_000b8384);
    local_50 = 0;
    local_58 = 1;
    local_60 = (char **)0x0;
    local_20 = &DAT_ram_000bcab8;
    local_28 = &local_60;
    local_10 = CONCAT71(local_10._1_7_,3);
    local_18 = (undefined1 *)0x20;
    local_38 = (undefined8 *)0x0;
    local_48 = (char *)0x0;
    lVar10 = inferred_window_116(&DAT_ram_000b8384,&local_48);
    if (lVar10 != 0) {
LAB_ram_00016698:
                    /* WARNING: Subroutine does not return */
      inferred_window_406("a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/slice/sort/stable/quicksort.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/slice.rsError/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/collections/btree/navigate.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/raw_vec.rsMaxSeedLengthExceededInvalidSeedsIllegalOwnerTryFromIntErrorUnexpected variant index: CustomInvalidArgumentInvalidInstructionDataInvalidAccountDataAccountDataTooSmallInsufficientFundsIncorrectProgramIdMissingRequiredSignatureAccountAlreadyInitializedUninitializedAccountNotEnoughAccountKeysAccountBorrowFailedBorshIoErrorAccountNotRentExemptUnsupportedSysvarMaxAccountsDataAllocationsExceededInvalidReallocMaxInstructionTraceLengthExceededBuiltinProgramsMustConsumeComputeUnitsInvalidAccountOwnerArithmeticOverflowImmutableIncorrectAuthority/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/iter/traits/iterator.rs"
                          ,0x37,&uStack_1,&DAT_ram_000bcae8,&DAT_ram_000bcb08);
    }
    local_130 = local_50;
    local_138 = local_58;
    local_140 = local_60;
    local_150 = (longlong *)local_1c8;
    local_148 = local_1c0;
    local_170 = 
    "programs/contracts/src/instructions/v1/relayer_only/close_donation_epoch.rsdebouncer_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_after_just_swapping.rsdistribution_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
    ;
    local_e0 = CONCAT44(local_e0._4_4_,0x177c);
    local_128 = (longlong *)CONCAT71(local_128._1_7_,2);
    local_160 = CONCAT44(local_160._4_4_,0x5b);
    local_168 = 0x4b;
    local_178 = 0;
    inferred_window_284(&local_210,&local_178);
  }
  else {
    lVar4 = *(longlong *)(param_2 + 0x50);
    lVar9 = *(longlong *)(param_2 + 0x48);
    if (lVar9 == *(longlong *)(param_3 + 0x20) && lVar4 == *(longlong *)(param_3 + 0x28)) {
      puVar11 = (undefined8 *)(param_2 + 0x158);
      local_1a0 = *(undefined8 *)(param_2 + 0x170);
      local_1a8 = *(undefined8 *)(param_2 + 0x168);
      local_1b0 = *(undefined8 *)(param_2 + 0x160);
      local_1b8 = *puVar11;
      local_198 = *(undefined8 *)(param_2 + 0x178);
      local_190 = *(undefined8 *)(param_2 + 0x180);
      local_188 = *(undefined8 *)(param_2 + 0x188);
      local_180 = *(undefined8 *)(param_2 + 400);
      inferred_window_473(param_2 + 0xf0,&local_1b8,0x40);
      *(longlong *)(param_2 + 0x138) = lVar4;
      *(longlong *)(param_2 + 0x130) = lVar9;
      *(undefined1 *)(param_2 + 0x148) = param_4;
      *(longlong *)(param_2 + 0x140) = lVar10;
      *(undefined1 *)(param_2 + 0x149) = 1;
      local_18 = local_1d0;
      local_1d0[0] = *(undefined1 *)(param_2 + 0x1a0);
      local_48 = 
      "debouncer_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_after_just_swapping.rsdistribution_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
      ;
      local_60 = &local_48;
      puVar5 = (undefined8 *)(param_2 + 0x178);
      local_10 = 1;
      local_20 = (undefined *)0x20;
      local_30 = 0x20;
      local_40 = 0xc;
      local_58 = 4;
      puVar8 = *(undefined8 **)(param_2 + 200);
      local_158 = (longlong *)puVar8[1];
      lVar6 = *local_158;
      local_160 = *puVar8;
      *local_158 = lVar6 + 1;
      local_38 = puVar11;
      local_28 = (char ***)puVar5;
      if (lVar6 + 1 != 0) {
        local_150 = (longlong *)puVar8[2];
        lVar6 = *local_150;
        *local_150 = lVar6 + 1;
        if (lVar6 + 1 != 0) {
          puVar7 = *(undefined8 **)(param_2 + 0x2a0);
          local_128 = (longlong *)puVar7[1];
          lVar6 = *local_128;
          uVar1 = *(undefined1 *)((longlong)puVar8 + 0x2a);
          uVar2 = *(undefined1 *)((longlong)puVar8 + 0x29);
          uVar3 = *(undefined1 *)(puVar8 + 5);
          local_140 = (char **)puVar8[4];
          local_148 = puVar8[3];
          local_130 = *puVar7;
          *local_128 = lVar6 + 1;
          if (lVar6 + 1 != 0) {
            local_120 = (longlong *)puVar7[2];
            lVar6 = *local_120;
            *local_120 = lVar6 + 1;
            if (lVar6 + 1 != 0) {
              puVar8 = *(undefined8 **)(*(longlong *)(param_2 + 0xc0) + 0x58);
              local_f8 = (longlong *)puVar8[1];
              lVar6 = *local_f8;
              local_106 = *(undefined1 *)((longlong)puVar7 + 0x2a);
              local_107 = *(undefined1 *)((longlong)puVar7 + 0x29);
              local_108 = *(undefined1 *)(puVar7 + 5);
              local_110 = puVar7[4];
              local_118 = puVar7[3];
              local_100 = *puVar8;
              *local_f8 = lVar6 + 1;
              if (lVar6 + 1 != 0) {
                local_f0 = (longlong *)puVar8[2];
                lVar6 = *local_f0;
                *local_f0 = lVar6 + 1;
                if (lVar6 + 1 != 0) {
                  puVar7 = *(undefined8 **)(param_2 + 0x1c8);
                  local_c8 = (longlong *)puVar7[1];
                  lVar6 = *local_c8;
                  local_d6 = *(undefined1 *)((longlong)puVar8 + 0x2a);
                  local_d7 = *(undefined1 *)((longlong)puVar8 + 0x29);
                  local_d8 = *(undefined1 *)(puVar8 + 5);
                  local_e0 = puVar8[4];
                  local_e8 = puVar8[3];
                  local_d0 = *puVar7;
                  *local_c8 = lVar6 + 1;
                  if (lVar6 + 1 != 0) {
                    local_c0 = (longlong *)puVar7[2];
                    lVar6 = *local_c0;
                    *local_c0 = lVar6 + 1;
                    if (lVar6 + 1 != 0) {
                      puVar8 = *(undefined8 **)(param_2 + 0x150);
                      local_98 = (longlong *)puVar8[1];
                      lVar6 = *local_98;
                      local_a6 = *(undefined1 *)((longlong)puVar7 + 0x2a);
                      local_a7 = *(undefined1 *)((longlong)puVar7 + 0x29);
                      local_a8 = *(undefined1 *)(puVar7 + 5);
                      local_b0 = puVar7[4];
                      local_b8 = puVar7[3];
                      local_a0 = *puVar8;
                      *local_98 = lVar6 + 1;
                      if (lVar6 + 1 != 0) {
                        local_90 = (longlong *)puVar8[2];
                        lVar6 = *local_90;
                        *local_90 = lVar6 + 1;
                        if (lVar6 + 1 != 0) {
                          local_88 = puVar8[3];
                          local_80 = puVar8[4];
                          local_78 = *(undefined1 *)(puVar8 + 5);
                          local_77 = *(undefined1 *)((longlong)puVar8 + 0x29);
                          local_76 = *(undefined1 *)((longlong)puVar8 + 0x2a);
                          local_70 = &local_60;
                          local_138 = CONCAT71(CONCAT61(CONCAT51(local_138._3_5_,uVar1),uVar2),uVar3
                                              );
                          local_68 = 1;
                          local_168 = 0;
                          local_170 = (char *)0x8;
                          local_178 = 0;
                          inferred_window_226(&local_1f0,&local_178,lVar10,
                                              *(undefined1 *)(*(longlong *)(param_2 + 0xc0) + 0x30))
                          ;
                          if (local_1f0 != 2) {
LAB_ram_00016678:
                            *param_1 = local_1f0;
                            param_1[1] = local_1e8;
                            *(undefined1 *)(param_1 + 0xb) = 4;
                            return;
                          }
                          *(undefined8 *)(param_2 + 0x198) = 0;
                          if ((*(ulonglong *)(param_2 + 0x48) & *(ulonglong *)(param_2 + 0x50)) ==
                              0xffffffffffffffff) {
                            inferred_window_115(&local_200,8);
                            local_1e8 = local_1f8;
                            local_1f0 = local_200;
                            if (local_200 != 2) goto LAB_ram_00016678;
                          }
                          else {
                            lVar6 = *(ulonglong *)(param_2 + 0x48) + 1;
                            *(longlong *)(param_2 + 0x48) = lVar6;
                            *(ulonglong *)(param_2 + 0x50) =
                                 *(ulonglong *)(param_2 + 0x50) + (ulonglong)(lVar6 == 0);
                          }
                          local_160 = *(undefined8 *)(param_2 + 0x170);
                          local_168 = *(undefined8 *)(param_2 + 0x168);
                          local_170 = *(char **)(param_2 + 0x160);
                          local_178 = *puVar11;
                          local_158 = (longlong *)*puVar5;
                          local_150 = *(longlong **)(param_2 + 0x180);
                          local_148 = *(undefined8 *)(param_2 + 0x188);
                          local_140 = *(char ***)(param_2 + 400);
                          inferred_window_473(param_1,&local_178,0x40);
                          param_1[9] = lVar4;
                          param_1[8] = lVar9;
                          param_1[10] = lVar10;
                          *(undefined1 *)(param_1 + 0xb) = 1;
                          return;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
                    /* WARNING: Subroutine does not return */
      abort();
    }
    inferred_window_114(local_1d0,&DAT_ram_000b83d0);
    local_50 = 0;
    local_58 = 1;
    local_60 = (char **)0x0;
    local_20 = &DAT_ram_000bcab8;
    local_28 = &local_60;
    local_10 = CONCAT71(local_10._1_7_,3);
    local_18 = (undefined1 *)0x20;
    local_38 = (undefined8 *)0x0;
    local_48 = (char *)0x0;
    lVar10 = inferred_window_116(&DAT_ram_000b83d0,&local_48);
    if (lVar10 != 0) goto LAB_ram_00016698;
    local_130 = local_50;
    local_138 = local_58;
    local_140 = local_60;
    local_150 = (longlong *)local_1c8;
    local_148 = local_1c0;
    local_170 = 
    "programs/contracts/src/instructions/v1/relayer_only/close_donation_epoch.rsdebouncer_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_after_just_swapping.rsdistribution_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
    ;
    local_e0 = CONCAT44(local_e0._4_4_,0x177b);
    local_128 = (longlong *)CONCAT71(local_128._1_7_,2);
    local_160 = CONCAT44(local_160._4_4_,0x5f);
    local_168 = 0x4b;
    local_178 = 0;
    inferred_window_284(&local_1e0,&local_178);
    local_210 = local_1e0;
    local_208 = local_1d8;
  }
  param_1[1] = local_208;
  *param_1 = local_210;
  *(undefined1 *)(param_1 + 0xb) = 4;
  return;
}

