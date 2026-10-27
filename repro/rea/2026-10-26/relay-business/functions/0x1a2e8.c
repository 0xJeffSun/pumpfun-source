// rea decompile_all
// name: inferred_window_100
// address: 0x1a2e8
// body: available
// range: 0x1a2e8-0x1b7b7 inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x1abe8 to syscall:0xb6fc1a11 abort (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; Ghidra Listing reports a terminal call at 0x1b7b0 to 0xaee40 inferred_window_406 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_100(longlong *param_1,longlong param_2,longlong *param_3,undefined8 param_4,
                        ulonglong param_5)

{
  undefined1 uVar1;
  undefined1 uVar2;
  undefined1 uVar3;
  undefined1 uVar4;
  undefined1 uVar5;
  longlong lVar6;
  undefined8 uVar7;
  undefined8 uVar8;
  bool bVar9;
  longlong lVar10;
  longlong lVar11;
  longlong lVar12;
  ushort *puVar13;
  longlong *plVar14;
  undefined8 *puVar15;
  ulonglong uVar16;
  longlong lVar17;
  undefined8 uVar18;
  longlong *plVar19;
  undefined8 *puVar20;
  longlong *plVar21;
  ulonglong uVar22;
  undefined8 uVar23;
  longlong *plVar24;
  longlong lVar25;
  longlong *plVar26;
  longlong lVar27;
  ulonglong uVar28;
  longlong local_2d0;
  longlong local_2c8;
  longlong local_2c0;
  longlong local_2b8;
  longlong local_2b0;
  longlong local_2a8;
  longlong local_2a0;
  longlong local_298;
  longlong local_290;
  longlong local_288;
  undefined8 local_280;
  undefined8 local_278;
  longlong local_270;
  longlong local_268;
  longlong local_260;
  longlong local_258;
  longlong local_250;
  undefined8 local_248;
  undefined8 local_240;
  undefined8 local_238;
  undefined8 local_230;
  undefined8 local_228;
  undefined8 local_220;
  undefined8 local_218;
  undefined8 local_210;
  undefined8 local_208;
  char **local_200;
  undefined8 local_1f8;
  char *local_1f0;
  undefined8 local_1e8;
  longlong *local_1e0;
  undefined8 local_1d8;
  undefined8 *local_1d0;
  undefined8 local_1c8;
  undefined8 *local_1c0;
  undefined8 local_1b8;
  undefined1 *local_1b0;
  undefined8 local_1a8;
  undefined1 local_199;
  longlong local_198;
  longlong local_190;
  longlong local_188;
  undefined8 local_180;
  char *local_178;
  undefined8 local_170;
  longlong *local_168;
  longlong *local_160;
  undefined8 local_158;
  undefined8 local_150;
  char *local_148;
  undefined8 local_140;
  longlong *local_138;
  longlong *local_130;
  undefined8 local_128;
  undefined8 local_120;
  undefined1 local_118;
  undefined1 local_117;
  undefined1 local_116;
  longlong local_110;
  longlong *local_108;
  longlong *local_100;
  longlong local_f8;
  longlong local_f0;
  undefined4 local_e8;
  undefined8 local_e0;
  longlong *local_d8;
  longlong *local_d0;
  undefined8 local_c8;
  undefined8 local_c0;
  undefined1 local_b8;
  undefined1 local_b7;
  undefined1 local_b6;
  char ***local_a8;
  undefined8 local_a0;
  longlong local_90;
  ulonglong local_88;
  char ***local_80;
  undefined8 local_78;
  char **local_70;
  undefined *local_68;
  undefined8 local_60;
  undefined8 local_58;
  undefined8 local_50;
  undefined1 local_48;
  undefined1 auStack_30 [48];
  
  bVar9 = *(ulonglong *)(param_2 + 0x1c8) < *(ulonglong *)(param_2 + 0x48);
  if (*(ulonglong *)(param_2 + 0x1d0) != *(ulonglong *)(param_2 + 0x50)) {
    bVar9 = *(ulonglong *)(param_2 + 0x1d0) < *(ulonglong *)(param_2 + 0x50);
  }
  if (!bVar9) {
    inferred_window_114(&local_230,&DAT_ram_000b838c);
    local_1e0 = (longlong *)0x0;
    local_1e8 = 1;
    local_1f0 = (char *)0x0;
    local_68 = &DAT_ram_000bcab8;
    local_70 = &local_1f0;
    local_58 = CONCAT71(local_58._1_7_,3);
    local_60 = 0x20;
    local_80 = (char ***)0x0;
    local_90 = 0;
    lVar6 = inferred_window_116(&DAT_ram_000b838c,&local_90);
    if (lVar6 != 0) goto LAB_ram_0001b768;
    local_138 = local_1e0;
    local_140 = local_1e8;
    local_148 = local_1f0;
    local_160 = (longlong *)local_230;
    local_158 = local_228;
    local_150 = local_220;
    local_178 = 
    "programs/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
    ;
    local_e8 = 0x178c;
    local_130 = (longlong *)CONCAT71(local_130._1_7_,2);
    local_168 = (longlong *)CONCAT44(local_168._4_4_,0x6e);
    local_170 = 0x56;
    local_180 = 0;
    inferred_window_284(&local_260,&local_180);
    goto LAB_ram_0001a868;
  }
  uVar16 = param_3[5];
  lVar6 = param_3[4];
  lVar10 = param_3[2];
  lVar11 = param_3[1];
  lVar12 = *param_3;
  uVar28 = 0;
  if (uVar16 == 0) {
LAB_ram_0001a660:
    inferred_window_114(&local_230,&DAT_ram_000b8370);
    local_1e0 = (longlong *)0x0;
    local_1e8 = 1;
    local_1f0 = (char *)0x0;
    local_68 = &DAT_ram_000bcab8;
    local_70 = &local_1f0;
    local_58 = CONCAT71(local_58._1_7_,3);
    local_60 = 0x20;
    local_80 = (char ***)0x0;
    local_90 = 0;
    lVar17 = inferred_window_116(&DAT_ram_000b8370,&local_90);
    if (lVar17 != 0) {
LAB_ram_0001b768:
                    /* WARNING: Subroutine does not return */
      inferred_window_406("a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/slice/sort/stable/quicksort.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/slice.rsError/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/collections/btree/navigate.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/raw_vec.rsMaxSeedLengthExceededInvalidSeedsIllegalOwnerTryFromIntErrorUnexpected variant index: CustomInvalidArgumentInvalidInstructionDataInvalidAccountDataAccountDataTooSmallInsufficientFundsIncorrectProgramIdMissingRequiredSignatureAccountAlreadyInitializedUninitializedAccountNotEnoughAccountKeysAccountBorrowFailedBorshIoErrorAccountNotRentExemptUnsupportedSysvarMaxAccountsDataAllocationsExceededInvalidReallocMaxInstructionTraceLengthExceededBuiltinProgramsMustConsumeComputeUnitsInvalidAccountOwnerArithmeticOverflowImmutableIncorrectAuthority/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/iter/traits/iterator.rs"
                          ,0x37,&local_250,&DAT_ram_000bcae8,&DAT_ram_000bcb08);
    }
    local_138 = local_1e0;
    local_140 = local_1e8;
    local_148 = local_1f0;
    local_160 = (longlong *)local_230;
    local_158 = local_228;
    local_150 = local_220;
    local_178 = 
    "programs/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
    ;
    local_e8 = 0x1786;
    local_130 = (longlong *)CONCAT71(local_130._1_7_,2);
    local_168 = (longlong *)CONCAT44(local_168._4_4_,0xcc);
    local_170 = 0x26;
    local_180 = 0;
    inferred_window_284(&local_280,&local_180);
    inferred_window_004(&local_290,local_280,local_278,uVar28);
    local_258 = local_288;
    local_260 = local_290;
LAB_ram_0001a840:
    if (local_260 != 2) goto LAB_ram_0001a868;
  }
  else {
    puVar13 = (ushort *)(lVar6 + 0x20);
    lVar17 = uVar16 * 0x24;
    do {
      uVar22 = (uVar28 & 0xffffffff) + (ulonglong)*puVar13;
      if ((uVar22 & 0xffffffff) != uVar22) {
        inferred_window_115(&local_270,8);
        local_258 = local_268;
        local_260 = local_270;
        goto LAB_ram_0001a840;
      }
      uVar28 = uVar28 + *puVar13;
      puVar13 = puVar13 + 0x12;
      lVar17 = lVar17 + -0x24;
    } while (lVar17 != 0);
    if ((uVar28 & 0xffffffff) != 10000) goto LAB_ram_0001a660;
  }
  if (param_5 < uVar16) {
    inferred_window_115(&local_2d0,0x1e);
    local_258 = local_2c8;
    local_260 = local_2d0;
LAB_ram_0001a868:
    param_1[1] = local_260;
    *param_1 = -0x8000000000000000;
    param_1[2] = local_258;
    return;
  }
  local_238 = *(undefined8 *)(param_2 + 0x1a0);
  local_240 = *(undefined8 *)(param_2 + 0x198);
  local_248 = *(undefined8 *)(param_2 + 400);
  local_250 = *(longlong *)(param_2 + 0x188);
  local_218 = *(undefined8 *)(param_2 + 0x1c0);
  local_220 = *(undefined8 *)(param_2 + 0x1b8);
  local_228 = *(undefined8 *)(param_2 + 0x1b0);
  local_230 = *(undefined8 *)(param_2 + 0x1a8);
  local_210 = *(undefined8 *)(param_2 + 0x1c8);
  local_208 = *(undefined8 *)(param_2 + 0x1d0);
  local_199 = *(undefined1 *)(param_2 + 0x1e0);
  local_200 = &local_1f0;
  local_1b0 = &local_199;
  local_1c0 = &local_210;
  local_1d0 = &local_230;
  local_1e0 = &local_250;
  local_1f0 = 
  "distribution_v1programs/contracts/src/instructions/v1/relayer_only/distribute/distribute_non_swap_output_mint.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/just_swap.rsprograms/contracts/src/instructions/v1/relayer_only/distribute/swap_then_distribute.rsprograms/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rsprograms/contracts/src/tools/checks.rsprograms/contracts/src/tools/distribution/shared.rsprograms/contracts/src/tools/donate/shared.rsprograms/contracts/src/tools/fair_distribution.rsInvalid adminInvalid ownerInvalid config idInvalid bumpInvalid debouncer PDA addressInvalid PDA addressInvalid mintInvalid stateArithmetic overflowInvalid message lengthThe account is already initializedEpoch already closedInvalid balanceInvalid token account stateInvalid token account ownerSigner is not the relayerTransfer fee extension not supportedFair distribution errorInvalid bpsInvalid instruction dataInvalid instruction data lengthInput amount mismatchBps sum does not equal ten thousandOutput amount must be greater than zeroInvalid token account mintInvalid token account programDebouncer not ready to distributeInvalid epochEpoch not closed - cannot distributeInvalid token programInsufficient remaining accountsMint not safe for donationMint whitelist account invalidSwap receipt does not match this distributionprograms/contracts/src/events/v1/donation_epoch_closed.rscalled `Result::unwrap()` on an `Err` valueprograms/contracts/src/events/v1/donation_epoch_just_swapped.rsprograms/contracts/src/events/v1/donation_epoch_processed.rsprograms/contracts/src/events/v1/donation_made.rsprograms/contracts/src/instructions/v1/public_api/donate/donate.rsfrom_token_accountmint_whitelistassociated_token_programtoken_programsystem_programevent_authorityprogram"
  ;
  local_1f8 = 5;
  local_1a8 = 1;
  local_1b8 = 0x10;
  local_1c8 = 0x20;
  local_1d8 = 0x20;
  local_1e8 = 0xf;
  puVar20 = (undefined8 *)**(longlong **)(param_2 + 0x180);
  local_168 = (longlong *)puVar20[3];
  local_170 = puVar20[2];
  local_178 = (char *)puVar20[1];
  local_180 = *puVar20;
  local_90 = lVar12;
  local_88 = lVar11;
  local_80 = (char ***)lVar10;
  inferred_window_091(&local_198,param_2 + 0x60,&local_180,param_2 + 0x1e8);
  lVar10 = local_190;
  if (local_198 != 2) {
    param_1[2] = local_190;
    param_1[1] = local_198;
    *param_1 = -0x8000000000000000;
    return;
  }
  puVar20 = *(undefined8 **)(param_2 + 0x2e0);
  plVar26 = (longlong *)puVar20[1];
  lVar11 = *plVar26;
  uVar23 = *puVar20;
  *plVar26 = lVar11 + 1;
  if (lVar11 + 1 != 0) {
    plVar14 = (longlong *)puVar20[2];
    lVar11 = *plVar14;
    *plVar14 = lVar11 + 1;
    if (lVar11 + 1 != 0) {
      lVar11 = *(longlong *)(param_2 + 0xf8);
      puVar15 = *(undefined8 **)(lVar11 + 0x58);
      plVar21 = (longlong *)puVar15[1];
      lVar12 = *plVar21;
      uVar1 = *(undefined1 *)((longlong)puVar20 + 0x2a);
      uVar2 = *(undefined1 *)((longlong)puVar20 + 0x29);
      uVar3 = *(undefined1 *)(puVar20 + 5);
      uVar7 = puVar20[4];
      uVar18 = puVar20[3];
      uVar8 = *puVar15;
      *plVar21 = lVar12 + 1;
      if (lVar12 + 1 != 0) {
        plVar24 = (longlong *)puVar15[2];
        lVar12 = *plVar24;
        *plVar24 = lVar12 + 1;
        if (lVar12 + 1 != 0) {
          plVar19 = *(longlong **)(param_2 + 0x100);
          local_108 = (longlong *)plVar19[1];
          lVar12 = *local_108;
          local_116 = *(undefined1 *)((longlong)puVar15 + 0x2a);
          local_117 = *(undefined1 *)((longlong)puVar15 + 0x29);
          local_118 = *(undefined1 *)(puVar15 + 5);
          local_120 = puVar15[4];
          local_128 = puVar15[3];
          local_110 = *plVar19;
          *local_108 = lVar12 + 1;
          if (lVar12 + 1 != 0) {
            local_100 = (longlong *)plVar19[2];
            lVar12 = *local_100;
            *local_100 = lVar12 + 1;
            if (lVar12 + 1 != 0) {
              puVar20 = *(undefined8 **)(param_2 + 0x180);
              local_d8 = (longlong *)puVar20[1];
              lVar17 = *local_d8;
              uVar4 = *(undefined1 *)((longlong)plVar19 + 0x2a);
              uVar5 = *(undefined1 *)((longlong)plVar19 + 0x29);
              lVar12 = plVar19[5];
              local_f0 = plVar19[4];
              local_f8 = plVar19[3];
              local_e0 = *puVar20;
              *local_d8 = lVar17 + 1;
              if (lVar17 + 1 != 0) {
                local_d0 = (longlong *)puVar20[2];
                lVar17 = *local_d0;
                *local_d0 = lVar17 + 1;
                if (lVar17 + 1 != 0) {
                  local_c8 = puVar20[3];
                  local_c0 = puVar20[4];
                  local_b8 = *(undefined1 *)(puVar20 + 5);
                  local_b7 = *(undefined1 *)((longlong)puVar20 + 0x29);
                  local_b6 = *(undefined1 *)((longlong)puVar20 + 0x2a);
                  local_e8 = CONCAT31(CONCAT21(CONCAT11(local_e8._3_1_,uVar4),uVar5),(char)lVar12);
                  local_148 = (char *)CONCAT71(CONCAT61(CONCAT51(local_148._3_5_,uVar1),uVar2),uVar3
                                              );
                  puVar20 = (undefined8 *)*plVar19;
                  local_68 = (undefined *)*puVar20;
                  local_60 = puVar20[1];
                  local_58 = puVar20[2];
                  local_50 = puVar20[3];
                  local_48 = *(undefined1 *)(lVar11 + 0x30);
                  local_70 = (char **)local_190;
                  local_80 = &local_200;
                  local_78 = 1;
                  local_180 = param_4;
                  local_178 = (char *)uVar16;
                  local_170 = uVar23;
                  local_168 = plVar26;
                  local_160 = plVar14;
                  local_158 = uVar18;
                  local_150 = uVar7;
                  local_140 = uVar8;
                  local_138 = plVar21;
                  local_130 = plVar24;
                  local_90 = lVar6;
                  local_88 = uVar16;
                  inferred_window_108(&local_198,&local_180,&local_90);
                  if (local_198 == -0x8000000000000000) {
                    param_1[2] = local_188;
                    param_1[1] = local_190;
                    *param_1 = -0x8000000000000000;
                    return;
                  }
                  inferred_window_021(&local_2a0,param_2 + 0x208);
                  local_258 = local_298;
                  local_260 = local_2a0;
                  if (local_2a0 == 2) {
                    inferred_window_040(&local_180,*(undefined8 *)(param_2 + 0x208));
                    inferred_window_040(&local_150,
                                        *(undefined8 *)(*(longlong *)(param_2 + 0xf0) + 0x58));
                    uVar23 = *(undefined8 *)(param_2 + 0x180);
                    inferred_window_040(&local_120);
                    uVar7 = *(undefined8 *)(param_2 + 0x108);
                    inferred_window_040(&local_f0);
                    inferred_window_040(&local_c0,*(undefined8 *)(param_2 + 0x110));
                    inferred_window_109(&local_2b0,&local_180,*(undefined8 *)(param_2 + 0x250),
                                        &local_200,1);
                    local_258 = local_2a8;
                    local_260 = local_2b0;
                    if (local_2b0 == 2) {
                      inferred_window_040(&local_168,*(undefined8 *)(param_2 + 0x100));
                      inferred_window_040(&local_90,*(undefined8 *)(param_2 + 0x2e0));
                      inferred_window_040(&local_60,uVar7);
                      inferred_window_040(auStack_30,uVar23);
                      inferred_window_473(&local_138,&local_90,0x90);
                      local_a8 = &local_200;
                      local_a0 = 1;
                      local_170 = 0;
                      local_178 = (char *)0x8;
                      local_180 = 0;
                      inferred_window_229(&local_2c0,&local_180);
                      local_258 = local_2b8;
                      local_260 = local_2c0;
                      if (local_2c0 == 2) {
                        param_1[6] = *(longlong *)(param_2 + 0x1a0);
                        param_1[5] = *(longlong *)(param_2 + 0x198);
                        param_1[4] = *(longlong *)(param_2 + 400);
                        param_1[3] = *(longlong *)(param_2 + 0x188);
                        param_1[7] = *(longlong *)(param_2 + 0x1a8);
                        param_1[8] = *(longlong *)(param_2 + 0x1b0);
                        param_1[9] = *(longlong *)(param_2 + 0x1b8);
                        param_1[10] = *(longlong *)(param_2 + 0x1c0);
                        lVar12 = *(longlong *)(param_2 + 0x1d0);
                        lVar17 = *(longlong *)(param_2 + 0x1c8);
                        plVar26 = (longlong *)**(longlong **)(*(longlong *)(param_2 + 0xf8) + 0x58);
                        lVar25 = plVar26[3];
                        lVar27 = plVar26[2];
                        lVar6 = plVar26[1];
                        lVar11 = *plVar26;
                        *param_1 = local_198;
                        param_1[0xe] = lVar11;
                        param_1[0xf] = lVar6;
                        param_1[0x10] = lVar27;
                        param_1[1] = local_190;
                        param_1[2] = local_188;
                        param_1[0xd] = lVar10;
                        param_1[0xb] = lVar17;
                        param_1[0xc] = lVar12;
                        param_1[0x11] = lVar25;
                        *(undefined1 *)(param_1 + 0x12) = 2;
                        return;
                      }
                    }
                  }
                  goto LAB_ram_0001a868;
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

