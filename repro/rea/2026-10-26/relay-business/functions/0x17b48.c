// rea decompile_all
// name: inferred_window_098
// address: 0x17b48
// body: available
// range: 0x17b48-0x19187 inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x19180 to 0xaee40 inferred_window_406 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_098(longlong *param_1,longlong param_2,longlong param_3,longlong param_4,
                        ulonglong param_5)

{
  int iVar1;
  longlong lVar2;
  bool bVar3;
  longlong *plVar4;
  undefined8 *puVar5;
  ushort *puVar6;
  longlong lVar7;
  longlong lVar8;
  ulonglong uVar9;
  longlong lVar10;
  longlong lVar11;
  longlong lVar12;
  longlong *plVar13;
  ulonglong uVar14;
  ulonglong uVar15;
  longlong local_2e0;
  longlong local_2d8;
  longlong local_2d0;
  longlong local_2c8;
  longlong local_2c0;
  longlong local_2b8;
  longlong local_2b0;
  longlong local_2a8;
  longlong local_2a0;
  longlong local_298;
  undefined8 local_290;
  undefined8 local_288;
  longlong local_280;
  longlong local_278;
  longlong local_270;
  longlong local_268;
  undefined8 local_260;
  undefined8 local_258;
  longlong local_250;
  longlong local_248;
  undefined8 local_240;
  undefined8 local_238;
  longlong local_230;
  longlong local_228;
  longlong local_220;
  longlong local_218;
  longlong local_210;
  undefined8 local_208;
  undefined8 local_200;
  undefined8 local_1f8;
  longlong local_1f0;
  undefined8 local_1e8;
  undefined8 local_1e0;
  undefined8 local_1d8;
  undefined8 local_1d0;
  undefined8 local_1c8;
  char **local_1c0;
  undefined8 local_1b8;
  char *local_1b0;
  undefined8 local_1a8;
  longlong *local_1a0;
  undefined8 local_198;
  longlong *local_190;
  undefined8 local_188;
  undefined8 *local_180;
  undefined8 local_178;
  undefined1 *local_170;
  undefined8 local_168;
  undefined1 local_159;
  longlong local_158;
  longlong local_150;
  longlong local_148;
  longlong local_140;
  ulonglong local_138;
  char ***local_130;
  undefined8 local_128;
  char **local_120;
  undefined *local_118;
  undefined8 local_110;
  undefined8 local_108;
  undefined8 local_100;
  undefined1 local_f8;
  longlong local_f0;
  char *local_e8;
  longlong local_e0;
  longlong local_d8;
  longlong local_d0;
  undefined8 local_c8;
  undefined8 local_c0;
  char *local_b8;
  undefined8 local_b0;
  undefined8 local_a8;
  undefined1 local_a0;
  undefined1 auStack_90 [16];
  undefined1 auStack_80 [32];
  undefined1 auStack_60 [8];
  undefined4 local_58;
  undefined1 auStack_50 [32];
  undefined1 auStack_30 [48];
  
  bVar3 = *(ulonglong *)(param_2 + 0x188) < *(ulonglong *)(param_2 + 0x48);
  if (*(ulonglong *)(param_2 + 400) != *(ulonglong *)(param_2 + 0x50)) {
    bVar3 = *(ulonglong *)(param_2 + 400) < *(ulonglong *)(param_2 + 0x50);
  }
  if (bVar3) {
    if (*(char *)(param_2 + 0x1a1) == '\0') {
      inferred_window_114(&local_1f0,&DAT_ram_000b837c);
      local_1a0 = (longlong *)0x0;
      local_1a8 = 1;
      local_1b0 = (char *)0x0;
      local_118 = &DAT_ram_000bcab8;
      local_120 = &local_1b0;
      local_108 = CONCAT71(local_108._1_7_,3);
      local_110 = 0x20;
      local_130 = (char ***)0x0;
      local_140 = 0;
      lVar2 = inferred_window_116(&DAT_ram_000b837c,&local_140);
      if (lVar2 != 0) goto LAB_ram_00019138;
      local_a8 = local_1a0;
      local_b0 = local_1a8;
      local_b8 = local_1b0;
      local_d0 = local_1f0;
      local_c8 = local_1e8;
      local_c0 = local_1e0;
      local_e8 = 
      "programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
      ;
      local_58 = 0x1777;
      local_a0 = 2;
      local_d8 = CONCAT44(local_d8._4_4_,0x58);
      local_e0 = 0x61;
      local_f0 = 0;
      inferred_window_284(&local_230,&local_f0);
      local_220 = local_230;
      local_218 = local_228;
    }
    else {
      uVar15 = *(ulonglong *)(param_3 + 0x10);
      lVar12 = *(longlong *)(param_3 + 8);
      lVar2 = *(longlong *)(param_2 + 0xc0);
      plVar13 = (longlong *)**(undefined8 **)(lVar2 + 0x58);
      local_d8 = plVar13[3];
      local_e0 = plVar13[2];
      local_e8 = (char *)plVar13[1];
      local_f0 = *plVar13;
      plVar4 = (longlong *)(param_2 + 0x168);
      iVar1 = inferred_window_475(plVar4,&local_f0,0x20);
      if (iVar1 == 0) {
        local_d8 = plVar13[3];
        local_e0 = plVar13[2];
        local_e8 = (char *)plVar13[1];
        local_f0 = *plVar13;
        iVar1 = inferred_window_475((longlong *)(param_2 + 0x110),&local_f0,0x20);
        if (iVar1 == 0) {
          uVar14 = 0;
          if (uVar15 == 0) {
LAB_ram_00018678:
            inferred_window_114(&local_1f0,&DAT_ram_000b8370);
            local_1a0 = (longlong *)0x0;
            local_1a8 = 1;
            local_1b0 = (char *)0x0;
            local_118 = &DAT_ram_000bcab8;
            local_120 = &local_1b0;
            local_108 = CONCAT71(local_108._1_7_,3);
            local_110 = 0x20;
            local_130 = (char ***)0x0;
            local_140 = 0;
            lVar2 = inferred_window_116(&DAT_ram_000b8370,&local_140);
            if (lVar2 != 0) goto LAB_ram_00019138;
            local_a8 = local_1a0;
            local_b0 = local_1a8;
            local_b8 = local_1b0;
            local_d0 = local_1f0;
            local_c8 = local_1e8;
            local_c0 = local_1e0;
            local_e8 = 
            "programs/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
            ;
            local_58 = 0x1786;
            local_a0 = 2;
            local_d8 = CONCAT44(local_d8._4_4_,0xcc);
            local_e0 = 0x26;
            local_f0 = 0;
            inferred_window_284(&local_290,&local_f0);
            inferred_window_004(&local_2a0,local_290,local_288,uVar14);
LAB_ram_00018840:
            if (local_2a0 != 2) goto LAB_ram_000190d0;
          }
          else {
            puVar6 = (ushort *)(lVar12 + 0x20);
            lVar2 = uVar15 * 0x24;
            do {
              uVar9 = (uVar14 & 0xffffffff) + (ulonglong)*puVar6;
              if ((uVar9 & 0xffffffff) != uVar9) {
                inferred_window_115(&local_280,8);
                local_298 = local_278;
                local_2a0 = local_280;
                goto LAB_ram_00018840;
              }
              uVar14 = uVar14 + *puVar6;
              puVar6 = puVar6 + 0x12;
              lVar2 = lVar2 + -0x24;
            } while (lVar2 != 0);
            if ((uVar14 & 0xffffffff) != 10000) goto LAB_ram_00018678;
          }
          uVar14 = *(ulonglong *)(param_2 + 0x198);
          if (*(ulonglong *)(param_2 + 0x210) < uVar14) {
            inferred_window_114(&local_1f0,&DAT_ram_000b8384,param_2,param_5,lVar12);
            local_1a0 = (longlong *)0x0;
            local_1a8 = 1;
            local_1b0 = (char *)0x0;
            local_118 = &DAT_ram_000bcab8;
            local_120 = &local_1b0;
            local_108 = CONCAT71(local_108._1_7_,3);
            local_110 = 0x20;
            local_130 = (char ***)0x0;
            local_140 = 0;
            lVar2 = inferred_window_116(&DAT_ram_000b8384,&local_140);
            if (lVar2 != 0) {
LAB_ram_00019138:
                    /* WARNING: Subroutine does not return */
              inferred_window_406("a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/slice/sort/stable/quicksort.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/slice.rsError/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/collections/btree/navigate.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/raw_vec.rsMaxSeedLengthExceededInvalidSeedsIllegalOwnerTryFromIntErrorUnexpected variant index: CustomInvalidArgumentInvalidInstructionDataInvalidAccountDataAccountDataTooSmallInsufficientFundsIncorrectProgramIdMissingRequiredSignatureAccountAlreadyInitializedUninitializedAccountNotEnoughAccountKeysAccountBorrowFailedBorshIoErrorAccountNotRentExemptUnsupportedSysvarMaxAccountsDataAllocationsExceededInvalidReallocMaxInstructionTraceLengthExceededBuiltinProgramsMustConsumeComputeUnitsInvalidAccountOwnerArithmeticOverflowImmutableIncorrectAuthority/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/iter/traits/iterator.rs"
                                  ,0x37,&local_210,&DAT_ram_000bcae8,&DAT_ram_000bcb08);
            }
            local_a8 = local_1a0;
            local_b0 = local_1a8;
            local_b8 = local_1b0;
            local_d0 = local_1f0;
            local_c8 = local_1e8;
            local_c0 = local_1e0;
            local_e8 = 
            "programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
            ;
            local_58 = 0x177c;
            local_a0 = 2;
            local_d8 = CONCAT44(local_d8._4_4_,0x6f);
            local_e0 = 0x61;
            local_f0 = 0;
            inferred_window_284(&local_2e0,&local_f0);
            local_220 = local_2e0;
            local_218 = local_2d8;
          }
          else {
            if (uVar15 <= param_5) {
              local_1f8 = *(undefined8 *)(param_2 + 0x160);
              local_200 = *(undefined8 *)(param_2 + 0x158);
              local_208 = *(undefined8 *)(param_2 + 0x150);
              local_210 = *(longlong *)(param_2 + 0x148);
              local_1d8 = *(undefined8 *)(param_2 + 0x180);
              local_1e0 = *(undefined8 *)(param_2 + 0x178);
              local_1e8 = *(undefined8 *)(param_2 + 0x170);
              local_1f0 = *plVar4;
              local_1d0 = *(undefined8 *)(param_2 + 0x188);
              local_1c8 = *(undefined8 *)(param_2 + 400);
              local_159 = *(undefined1 *)(param_2 + 0x1a0);
              local_1c0 = &local_1b0;
              local_170 = &local_159;
              local_180 = &local_1d0;
              local_190 = &local_1f0;
              local_1a0 = &local_210;
              local_1b0 = 
              "distribution_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
              ;
              local_1b8 = 5;
              local_168 = 1;
              local_178 = 0x10;
              local_188 = 0x20;
              local_198 = 0x20;
              local_1a8 = 0xf;
              inferred_window_040(&local_e0,*(undefined8 *)(param_2 + 0x1c8));
              lVar2 = *(longlong *)(param_2 + 0xc0);
              inferred_window_040(&local_b0,*(undefined8 *)(lVar2 + 0x58));
              plVar13 = *(longlong **)(param_2 + 0xd0);
              inferred_window_040(auStack_80,plVar13);
              inferred_window_040(auStack_50,*(undefined8 *)(param_2 + 0x140));
              puVar5 = (undefined8 *)*plVar13;
              local_118 = (undefined *)*puVar5;
              local_110 = puVar5[1];
              local_108 = puVar5[2];
              local_100 = puVar5[3];
              local_f8 = *(undefined1 *)(lVar2 + 0x30);
              local_130 = &local_1c0;
              local_128 = 1;
              local_140 = lVar12;
              local_138 = uVar15;
              local_120 = (char **)uVar14;
              local_f0 = param_4;
              local_e8 = (char *)uVar15;
              inferred_window_108(&local_158,&local_f0,&local_140);
              if (local_158 != -0x8000000000000000) {
                inferred_window_021(&local_2b0,param_2 + 0x1c8);
                local_298 = local_2a8;
                local_2a0 = local_2b0;
                if (local_2b0 == 2) {
                  inferred_window_040(&local_f0,*(undefined8 *)(param_2 + 0x1c8));
                  lVar2 = *(longlong *)(param_2 + 0xc0);
                  inferred_window_040(&local_c0,*(undefined8 *)(lVar2 + 0x58));
                  inferred_window_040(auStack_90,*(undefined8 *)(param_2 + 0x140));
                  inferred_window_040(auStack_60,*(undefined8 *)(param_2 + 200));
                  inferred_window_040(auStack_30,*(undefined8 *)(param_2 + 0xd0));
                  inferred_window_109(&local_2c0,&local_f0,*(undefined8 *)(param_2 + 0x210),
                                      &local_1c0,1);
                  local_298 = local_2b8;
                  local_2a0 = local_2c0;
                  if (local_2c0 == 2) {
                    param_1[6] = *(longlong *)(param_2 + 0x160);
                    param_1[5] = *(longlong *)(param_2 + 0x158);
                    param_1[4] = *(longlong *)(param_2 + 0x150);
                    param_1[3] = *(longlong *)(param_2 + 0x148);
                    param_1[7] = *plVar4;
                    param_1[8] = *(longlong *)(param_2 + 0x170);
                    param_1[9] = *(longlong *)(param_2 + 0x178);
                    param_1[10] = *(longlong *)(param_2 + 0x180);
                    lVar12 = *(longlong *)(param_2 + 400);
                    lVar7 = *(longlong *)(param_2 + 0x188);
                    plVar4 = (longlong *)**(longlong **)(lVar2 + 0x58);
                    lVar10 = plVar4[3];
                    lVar11 = plVar4[2];
                    lVar2 = plVar4[1];
                    lVar8 = *plVar4;
                    *param_1 = local_158;
                    param_1[0xe] = lVar8;
                    param_1[0xf] = lVar2;
                    param_1[0x10] = lVar11;
                    param_1[1] = local_150;
                    param_1[2] = local_148;
                    param_1[0xd] = uVar14;
                    param_1[0xb] = lVar7;
                    param_1[0xc] = lVar12;
                    param_1[0x11] = lVar10;
                    *(undefined1 *)(param_1 + 0x12) = 2;
                    return;
                  }
                }
LAB_ram_000190d0:
                param_1[1] = local_2a0;
                *param_1 = -0x8000000000000000;
                param_1[2] = local_298;
                return;
              }
              param_1[2] = local_148;
              param_1[1] = local_150;
              goto LAB_ram_00018280;
            }
            inferred_window_115(&local_2d0,0x1e);
            local_220 = local_2d0;
            local_218 = local_2c8;
          }
        }
        else {
          inferred_window_114(&local_1f0,&DAT_ram_000b83b8);
          local_1a0 = (longlong *)0x0;
          local_1a8 = 1;
          local_1b0 = (char *)0x0;
          local_118 = &DAT_ram_000bcab8;
          local_120 = &local_1b0;
          local_108 = CONCAT71(local_108._1_7_,3);
          local_110 = 0x20;
          local_130 = (char ***)0x0;
          local_140 = 0;
          lVar12 = inferred_window_116(&DAT_ram_000b83b8,&local_140);
          if (lVar12 != 0) goto LAB_ram_00019138;
          local_a8 = local_1a0;
          local_b0 = local_1a8;
          local_b8 = local_1b0;
          local_d0 = local_1f0;
          local_c8 = local_1e8;
          local_c0 = local_1e0;
          local_e8 = 
          "programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
          ;
          local_58 = 0x1776;
          local_a0 = 2;
          local_d8 = CONCAT44(local_d8._4_4_,99);
          local_e0 = 0x61;
          local_f0 = 0;
          inferred_window_284(&local_260,&local_f0);
          local_d8 = *(undefined8 *)(param_2 + 0x128);
          local_e0 = *(longlong *)(param_2 + 0x120);
          local_e8 = *(char **)(param_2 + 0x118);
          local_f0 = *(longlong *)(param_2 + 0x110);
          puVar5 = (undefined8 *)**(longlong **)(lVar2 + 0x58);
          local_b8 = (char *)puVar5[3];
          local_c0 = puVar5[2];
          local_c8 = puVar5[1];
          local_d0 = *puVar5;
          inferred_window_287(&local_270,local_260,local_258,&local_f0);
          local_220 = local_270;
          local_218 = local_268;
        }
      }
      else {
        inferred_window_114(&local_1f0,&DAT_ram_000b83b8);
        local_1a0 = (longlong *)0x0;
        local_1a8 = 1;
        local_1b0 = (char *)0x0;
        local_118 = &DAT_ram_000bcab8;
        local_120 = &local_1b0;
        local_108 = CONCAT71(local_108._1_7_,3);
        local_110 = 0x20;
        local_130 = (char ***)0x0;
        local_140 = 0;
        lVar12 = inferred_window_116(&DAT_ram_000b83b8,&local_140);
        if (lVar12 != 0) goto LAB_ram_00019138;
        local_a8 = local_1a0;
        local_b0 = local_1a8;
        local_b8 = local_1b0;
        local_d0 = local_1f0;
        local_c8 = local_1e8;
        local_c0 = local_1e0;
        local_e8 = 
        "programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
        ;
        local_58 = 0x1776;
        local_a0 = 2;
        local_d8 = CONCAT44(local_d8._4_4_,0x5e);
        local_e0 = 0x61;
        local_f0 = 0;
        inferred_window_284(&local_240,&local_f0);
        local_d8 = *(undefined8 *)(param_2 + 0x180);
        local_e0 = *(longlong *)(param_2 + 0x178);
        local_e8 = *(char **)(param_2 + 0x170);
        local_f0 = *plVar4;
        puVar5 = (undefined8 *)**(longlong **)(lVar2 + 0x58);
        local_b8 = (char *)puVar5[3];
        local_c0 = puVar5[2];
        local_c8 = puVar5[1];
        local_d0 = *puVar5;
        inferred_window_287(&local_250,local_240,local_238,&local_f0);
        local_220 = local_250;
        local_218 = local_248;
      }
    }
  }
  else {
    inferred_window_114(&local_1f0,&DAT_ram_000b838c);
    local_1a0 = (longlong *)0x0;
    local_1a8 = 1;
    local_1b0 = (char *)0x0;
    local_118 = &DAT_ram_000bcab8;
    local_120 = &local_1b0;
    local_108 = CONCAT71(local_108._1_7_,3);
    local_110 = 0x20;
    local_130 = (char ***)0x0;
    local_140 = 0;
    lVar2 = inferred_window_116(&DAT_ram_000b838c,&local_140);
    if (lVar2 != 0) goto LAB_ram_00019138;
    local_a8 = local_1a0;
    local_b0 = local_1a8;
    local_b8 = local_1b0;
    local_d0 = local_1f0;
    local_c8 = local_1e8;
    local_c0 = local_1e0;
    local_e8 = 
    "programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
    ;
    local_58 = 0x178c;
    local_a0 = 2;
    local_d8 = CONCAT44(local_d8._4_4_,0x53);
    local_e0 = 0x61;
    local_f0 = 0;
    inferred_window_284(&local_220,&local_f0);
  }
  param_1[2] = local_218;
  param_1[1] = local_220;
LAB_ram_00018280:
  *param_1 = -0x8000000000000000;
  return;
}

