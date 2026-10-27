// rea decompile_all
// name: inferred_window_099
// address: 0x19188
// body: available
// range: 0x19188-0x1a2e7 inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x1a2e0 to 0xaee40 inferred_window_406 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_099(longlong *param_1,longlong param_2,undefined8 *param_3,undefined8 param_4,
                        longlong param_5)

{
  int iVar1;
  longlong lVar2;
  bool bVar3;
  undefined8 uVar4;
  undefined8 uVar5;
  undefined8 uVar6;
  undefined8 uVar7;
  undefined8 *puVar8;
  longlong *plVar9;
  undefined8 uVar10;
  undefined8 *puVar11;
  ulonglong uVar12;
  longlong lVar13;
  ulonglong uVar14;
  longlong local_258;
  longlong local_250;
  undefined8 local_248;
  undefined8 local_240;
  longlong local_238;
  longlong local_230;
  longlong local_228;
  longlong local_220;
  longlong local_218;
  longlong local_210;
  undefined8 local_208;
  undefined8 local_200;
  longlong local_1f8;
  longlong local_1f0;
  longlong local_1e8;
  longlong local_1e0;
  undefined8 local_1d8;
  undefined8 local_1d0;
  undefined8 local_1c8;
  undefined8 local_1c0;
  undefined8 local_1b8;
  undefined8 local_1b0;
  undefined8 local_1a8;
  undefined8 local_1a0;
  ulonglong local_198;
  ulonglong local_190;
  char **local_188;
  undefined8 local_180;
  char *local_178;
  undefined8 local_170;
  undefined8 *local_168;
  undefined8 local_160;
  undefined8 *local_158;
  undefined *local_150;
  ulonglong *local_148;
  undefined8 local_140;
  undefined1 *local_138;
  undefined8 local_130;
  undefined1 local_121;
  longlong local_120;
  longlong local_118;
  undefined8 local_110;
  undefined8 local_108;
  undefined8 local_100;
  undefined8 local_f8;
  char *local_f0;
  undefined8 local_e8;
  undefined8 local_e0;
  undefined8 local_d8;
  undefined8 local_d0;
  undefined8 local_c8;
  undefined8 local_c0;
  undefined8 local_b8;
  undefined8 local_b0;
  undefined1 local_a8;
  undefined1 auStack_98 [48];
  undefined1 auStack_68 [8];
  undefined4 local_60;
  undefined1 auStack_38 [55];
  undefined1 uStack_1;
  
  uVar14 = *(ulonglong *)(param_2 + 0x200);
  uVar12 = *(ulonglong *)(param_2 + 0x208);
  bVar3 = uVar14 < *(ulonglong *)(param_2 + 0x48);
  if (uVar12 != *(ulonglong *)(param_2 + 0x50)) {
    bVar3 = uVar12 < *(ulonglong *)(param_2 + 0x50);
  }
  if (bVar3) {
    if (*(char *)(param_2 + 0x219) == '\0') {
      inferred_window_114(&local_1d8,&DAT_ram_000b837c);
      local_1a8 = 0;
      local_1b0 = 1;
      local_1b8 = 0;
      local_150 = &DAT_ram_000bcab8;
      local_158 = &local_1b8;
      local_140 = CONCAT71(local_140._1_7_,3);
      local_148 = (ulonglong *)0x20;
      local_168 = (undefined8 *)0x0;
      local_178 = (char *)0x0;
      lVar2 = inferred_window_116(&DAT_ram_000b837c,&local_178);
      if (lVar2 != 0) goto LAB_ram_0001a298;
      local_b0 = local_1a8;
      local_b8 = local_1b0;
      local_c0 = local_1b8;
      local_d8 = local_1d8;
      local_d0 = local_1d0;
      local_c8 = local_1c8;
      local_f0 = 
      "programs/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
      ;
      local_60 = 0x1777;
      local_a8 = 2;
      local_e0 = CONCAT44(local_e0._4_4_,0x73);
      local_e8 = 0x4b;
      local_f8 = 0;
      inferred_window_284(&local_1f8,&local_f8);
      local_1e0 = local_1f0;
      local_1e8 = local_1f8;
    }
    else {
      uVar4 = param_3[2];
      uVar5 = param_3[1];
      uVar6 = *param_3;
      uVar7 = *(undefined8 *)(param_5 + -0xff8);
      puVar11 = (undefined8 *)(param_2 + 0x1e0);
      iVar1 = inferred_window_475((undefined8 *)(param_2 + 0x188),puVar11,0x20);
      if (iVar1 == 0) {
        iVar1 = inferred_window_475(puVar11,&DAT_ram_000b7e60,0x20);
        if (iVar1 != 0) {
          local_1c0 = *(undefined8 *)(param_2 + 0x1d8);
          local_1c8 = *(undefined8 *)(param_2 + 0x1d0);
          local_1d0 = *(undefined8 *)(param_2 + 0x1c8);
          local_1d8 = *(undefined8 *)(param_2 + 0x1c0);
          local_1a0 = *(undefined8 *)(param_2 + 0x1f8);
          local_1a8 = *(undefined8 *)(param_2 + 0x1f0);
          local_1b0 = *(undefined8 *)(param_2 + 0x1e8);
          local_1b8 = *puVar11;
          local_121 = *(undefined1 *)(param_2 + 0x218);
          local_188 = &local_178;
          local_138 = &local_121;
          local_148 = &local_198;
          local_158 = &local_1b8;
          local_168 = &local_1d8;
          local_178 = 
          "distribution_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
          ;
          local_180 = 5;
          local_130 = 1;
          local_140 = 0x10;
          local_150 = (undefined *)0x20;
          local_160 = 0x20;
          local_170 = 0xf;
          puVar8 = (undefined8 *)**(longlong **)(param_2 + 0x1b8);
          local_e0 = puVar8[3];
          local_e8 = puVar8[2];
          local_f0 = (char *)puVar8[1];
          local_f8 = *puVar8;
          local_198 = uVar14;
          local_190 = uVar12;
          local_110 = uVar6;
          local_108 = uVar5;
          local_100 = uVar4;
          inferred_window_091(&local_120,param_2 + 0x60,&local_f8,param_2 + 0x220);
          lVar2 = local_118;
          if (local_120 == 2) {
            puVar8 = (undefined8 *)**(longlong **)(param_2 + 0x1b8);
            uVar5 = puVar8[3];
            uVar6 = puVar8[2];
            uVar10 = puVar8[1];
            uVar4 = *puVar8;
            *(longlong *)(param_2 + 0x118) = local_118;
            *(char *)(param_2 + 0x120) = (char)uVar7;
            *(undefined8 *)(param_2 + 0xf8) = uVar4;
            *(undefined8 *)(param_2 + 0x100) = uVar10;
            *(undefined8 *)(param_2 + 0x108) = uVar6;
            *(undefined8 *)(param_2 + 0x110) = uVar5;
            inferred_window_021(&local_228,param_2 + 0x240);
            local_120 = local_228;
            lVar2 = local_220;
            if (local_228 == 2) {
              inferred_window_040(&local_f8,*(undefined8 *)(param_2 + 0x240));
              inferred_window_040(&local_c8,*(undefined8 *)(*(longlong *)(param_2 + 0x128) + 0x58));
              plVar9 = *(longlong **)(param_2 + 0x1b8);
              inferred_window_040(auStack_98);
              inferred_window_040(auStack_68,*(undefined8 *)(param_2 + 0x140));
              inferred_window_040(auStack_38,*(undefined8 *)(param_2 + 0x148));
              inferred_window_109(&local_238,&local_f8,*(undefined8 *)(param_2 + 0x288),&local_188,1
                                 );
              local_120 = local_238;
              lVar2 = local_230;
              if (local_238 == 2) {
                local_e0 = *(undefined8 *)(param_2 + 0x1d8);
                local_e8 = *(undefined8 *)(param_2 + 0x1d0);
                local_f0 = *(char **)(param_2 + 0x1c8);
                local_f8 = *(undefined8 *)(param_2 + 0x1c0);
                local_d8 = *puVar11;
                local_d0 = *(undefined8 *)(param_2 + 0x1e8);
                local_c8 = *(undefined8 *)(param_2 + 0x1f0);
                local_c0 = *(undefined8 *)(param_2 + 0x1f8);
                plVar9 = (longlong *)*plVar9;
                lVar2 = *(longlong *)(param_2 + 0x200);
                lVar13 = *(longlong *)(param_2 + 0x208);
                param_1[0xd] = plVar9[3];
                param_1[0xc] = plVar9[2];
                param_1[0xb] = plVar9[1];
                param_1[10] = *plVar9;
                plVar9 = (longlong *)**(longlong **)(param_2 + 0xf0);
                param_1[0x11] = plVar9[3];
                param_1[0x10] = plVar9[2];
                param_1[0xf] = plVar9[1];
                param_1[0xe] = *plVar9;
                plVar9 = (longlong *)**(longlong **)(param_2 + 0x318);
                param_1[0x15] = plVar9[3];
                param_1[0x14] = plVar9[2];
                param_1[0x13] = plVar9[1];
                param_1[0x12] = *plVar9;
                plVar9 = (longlong *)**(longlong **)(*(longlong *)(param_2 + 0x130) + 0x58);
                param_1[0x1a] = plVar9[3];
                param_1[0x19] = plVar9[2];
                param_1[0x18] = plVar9[1];
                param_1[0x17] = *plVar9;
                inferred_window_473(param_1,&local_f8,0x40);
                param_1[9] = lVar13;
                param_1[8] = lVar2;
                param_1[0x16] = local_118;
                *(undefined1 *)(param_1 + 0x1b) = 3;
                return;
              }
            }
          }
          param_1[1] = lVar2;
          *param_1 = local_120;
          *(undefined1 *)(param_1 + 0x1b) = 4;
          return;
        }
        inferred_window_114(&local_1d8,&DAT_ram_000b83b8);
        local_1a8 = 0;
        local_1b0 = 1;
        local_1b8 = 0;
        local_150 = &DAT_ram_000bcab8;
        local_158 = &local_1b8;
        local_140 = CONCAT71(local_140._1_7_,3);
        local_148 = (ulonglong *)0x20;
        local_168 = (undefined8 *)0x0;
        local_178 = (char *)0x0;
        lVar2 = inferred_window_116(&DAT_ram_000b83b8,&local_178);
        if (lVar2 != 0) goto LAB_ram_0001a298;
        local_b0 = local_1a8;
        local_b8 = local_1b0;
        local_c0 = local_1b8;
        local_d8 = local_1d8;
        local_d0 = local_1d0;
        local_c8 = local_1c8;
        local_f0 = 
        "programs/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
        ;
        local_60 = 0x1776;
        local_a8 = 2;
        local_e0 = CONCAT44(local_e0._4_4_,0x7e);
        local_e8 = 0x4b;
        local_f8 = 0;
        inferred_window_284(&local_248,&local_f8);
        local_e0 = *(undefined8 *)(param_2 + 0x1f8);
        local_e8 = *(undefined8 *)(param_2 + 0x1f0);
        local_f0 = *(char **)(param_2 + 0x1e8);
        local_f8 = *puVar11;
        local_d8 = 0x3aaddbbef37afac6;
        local_d0 = 0x3174c9ab6af3653d;
        local_c8 = 0xe4e0f6d2c2e4bbb1;
        local_c0 = 0x615d2f450302a67c;
        inferred_window_287(&local_258,local_248,local_240,&local_f8);
        local_1e0 = local_250;
        local_1e8 = local_258;
      }
      else {
        inferred_window_114(&local_1d8,&DAT_ram_000b83b8);
        local_1a8 = 0;
        local_1b0 = 1;
        local_1b8 = 0;
        local_150 = &DAT_ram_000bcab8;
        local_158 = &local_1b8;
        local_140 = CONCAT71(local_140._1_7_,3);
        local_148 = (ulonglong *)0x20;
        local_168 = (undefined8 *)0x0;
        local_178 = (char *)0x0;
        lVar2 = inferred_window_116(&DAT_ram_000b83b8,&local_178);
        if (lVar2 != 0) {
LAB_ram_0001a298:
                    /* WARNING: Subroutine does not return */
          inferred_window_406("a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/slice/sort/stable/quicksort.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/slice.rsError/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/collections/btree/navigate.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/raw_vec.rsMaxSeedLengthExceededInvalidSeedsIllegalOwnerTryFromIntErrorUnexpected variant index: CustomInvalidArgumentInvalidInstructionDataInvalidAccountDataAccountDataTooSmallInsufficientFundsIncorrectProgramIdMissingRequiredSignatureAccountAlreadyInitializedUninitializedAccountNotEnoughAccountKeysAccountBorrowFailedBorshIoErrorAccountNotRentExemptUnsupportedSysvarMaxAccountsDataAllocationsExceededInvalidReallocMaxInstructionTraceLengthExceededBuiltinProgramsMustConsumeComputeUnitsInvalidAccountOwnerArithmeticOverflowImmutableIncorrectAuthority/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/iter/traits/iterator.rs"
                              ,0x37,&uStack_1,&DAT_ram_000bcae8,&DAT_ram_000bcb08);
        }
        local_b0 = local_1a8;
        local_b8 = local_1b0;
        local_c0 = local_1b8;
        local_d8 = local_1d8;
        local_d0 = local_1d0;
        local_c8 = local_1c8;
        local_f0 = 
        "programs/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
        ;
        local_60 = 0x1776;
        local_a8 = 2;
        local_e0 = CONCAT44(local_e0._4_4_,0x78);
        local_e8 = 0x4b;
        local_f8 = 0;
        inferred_window_284(&local_208,&local_f8);
        local_e0 = *(undefined8 *)(param_2 + 0x1a0);
        local_e8 = *(undefined8 *)(param_2 + 0x198);
        local_f0 = *(char **)(param_2 + 400);
        local_f8 = *(undefined8 *)(param_2 + 0x188);
        local_d8 = *puVar11;
        local_d0 = *(undefined8 *)(param_2 + 0x1e8);
        local_c8 = *(undefined8 *)(param_2 + 0x1f0);
        local_c0 = *(undefined8 *)(param_2 + 0x1f8);
        inferred_window_287(&local_218,local_208,local_200,&local_f8);
        local_1e0 = local_210;
        local_1e8 = local_218;
      }
    }
  }
  else {
    inferred_window_114(&local_1d8,&DAT_ram_000b838c);
    local_1a8 = 0;
    local_1b0 = 1;
    local_1b8 = 0;
    local_150 = &DAT_ram_000bcab8;
    local_158 = &local_1b8;
    local_140 = CONCAT71(local_140._1_7_,3);
    local_148 = (ulonglong *)0x20;
    local_168 = (undefined8 *)0x0;
    local_178 = (char *)0x0;
    lVar2 = inferred_window_116(&DAT_ram_000b838c,&local_178);
    if (lVar2 != 0) goto LAB_ram_0001a298;
    local_b0 = local_1a8;
    local_b8 = local_1b0;
    local_c0 = local_1b8;
    local_d8 = local_1d8;
    local_d0 = local_1d0;
    local_c8 = local_1c8;
    local_f0 = 
    "programs/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
    ;
    local_60 = 0x178c;
    local_a8 = 2;
    local_e0 = CONCAT44(local_e0._4_4_,0x6e);
    local_e8 = 0x4b;
    local_f8 = 0;
    inferred_window_284(&local_1e8,&local_f8);
  }
  *param_1 = local_1e8;
  param_1[1] = local_1e0;
  *(undefined1 *)(param_1 + 0x1b) = 4;
  return;
}

