// rea decompile_all
// name: inferred_window_092
// address: 0x11238
// body: available
// range: 0x11238-0x12ab7 inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x11368 to syscall:0xb6fc1a11 abort (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_092(undefined8 *param_1,longlong param_2,longlong *param_3,undefined1 param_4,
                        undefined1 param_5)

{
  undefined1 uVar1;
  undefined1 uVar2;
  undefined1 uVar3;
  undefined1 uVar4;
  undefined1 uVar5;
  undefined1 uVar6;
  undefined1 uVar7;
  undefined1 uVar8;
  undefined1 uVar9;
  longlong lVar10;
  undefined8 *puVar11;
  longlong lVar12;
  longlong lVar13;
  longlong *plVar14;
  longlong lVar15;
  longlong *plVar16;
  longlong lVar17;
  longlong *plVar18;
  longlong *plVar19;
  longlong lVar20;
  longlong *plVar21;
  undefined8 *puVar22;
  longlong *plVar23;
  undefined8 uVar24;
  undefined8 uVar25;
  undefined8 uVar26;
  undefined8 uVar27;
  longlong lVar28;
  undefined8 uVar29;
  undefined8 *puVar30;
  undefined8 uVar31;
  undefined8 uVar32;
  longlong *plVar33;
  longlong *plVar34;
  undefined8 uVar35;
  longlong *plVar36;
  longlong *plVar37;
  longlong *plVar38;
  longlong *plVar39;
  undefined8 uVar40;
  undefined8 uVar41;
  longlong local_1e0;
  undefined8 local_1d8;
  longlong local_1d0;
  undefined8 local_1c8;
  longlong local_1c0;
  undefined8 local_1b8;
  longlong local_1b0;
  longlong local_1a8;
  longlong local_1a0;
  longlong local_198;
  longlong local_190;
  longlong local_188;
  longlong local_180;
  longlong local_178;
  longlong local_170;
  longlong local_168;
  longlong local_160;
  longlong local_158;
  longlong local_150;
  undefined8 local_148;
  undefined8 local_140;
  undefined8 local_138;
  undefined1 auStack_130 [24];
  longlong local_118;
  longlong local_110;
  longlong local_108;
  longlong local_100;
  longlong local_f8;
  undefined2 local_f0;
  undefined1 local_ee;
  undefined1 local_ed;
  longlong local_e8;
  longlong local_e0;
  longlong *local_d8;
  longlong local_d0;
  longlong *local_c8;
  longlong *local_c0;
  longlong *local_b8;
  longlong local_b0;
  undefined8 local_a8;
  undefined8 local_a0;
  longlong *local_98;
  longlong *local_90;
  longlong *local_88;
  undefined8 local_80;
  undefined8 local_78;
  longlong local_70;
  longlong *local_68;
  longlong *local_60;
  longlong *local_58;
  longlong local_50;
  longlong local_48;
  undefined8 local_40;
  longlong *local_38;
  longlong *local_30;
  longlong *local_28;
  undefined8 local_20;
  undefined8 local_18;
  undefined8 local_10;
  undefined8 local_8;
  
  lVar12 = param_3[3];
  local_198 = param_3[7];
  local_1a0 = param_3[6];
  local_1a8 = param_3[5];
  local_1b0 = param_3[4];
  lVar20 = param_3[0xc];
  local_180 = param_3[2];
  local_188 = param_3[1];
  local_190 = *param_3;
  local_178 = param_3[8];
  local_170 = param_3[9];
  local_168 = param_3[10];
  local_160 = param_3[0xb];
  plVar33 = *(longlong **)(param_2 + 0x310);
  plVar38 = (longlong *)plVar33[1];
  lVar13 = *plVar38;
  lVar10 = *plVar33;
  *plVar38 = lVar13 + 1;
  if (lVar13 + 1 != 0) {
    plVar14 = (longlong *)plVar33[2];
    lVar13 = *plVar14;
    *plVar14 = lVar13 + 1;
    if (lVar13 + 1 != 0) {
      puVar11 = *(undefined8 **)(param_2 + 0x2f8);
      plVar37 = (longlong *)puVar11[1];
      lVar15 = *plVar37;
      uVar1 = *(undefined1 *)((longlong)plVar33 + 0x2a);
      uVar2 = *(undefined1 *)((longlong)plVar33 + 0x29);
      lVar13 = plVar33[5];
      lVar28 = plVar33[4];
      plVar33 = (longlong *)plVar33[3];
      uVar29 = *puVar11;
      *plVar37 = lVar15 + 1;
      if (lVar15 + 1 != 0) {
        plVar16 = (longlong *)puVar11[2];
        lVar15 = *plVar16;
        *plVar16 = lVar15 + 1;
        if (lVar15 + 1 != 0) {
          plVar39 = *(longlong **)(param_2 + 0x120);
          plVar34 = (longlong *)plVar39[1];
          lVar17 = *plVar34;
          uVar3 = *(undefined1 *)((longlong)puVar11 + 0x2a);
          uVar4 = *(undefined1 *)((longlong)puVar11 + 0x29);
          uVar5 = *(undefined1 *)(puVar11 + 5);
          uVar27 = puVar11[4];
          plVar21 = (longlong *)puVar11[3];
          lVar15 = *plVar39;
          *plVar34 = lVar17 + 1;
          if (lVar17 + 1 != 0) {
            plVar18 = (longlong *)plVar39[2];
            lVar17 = *plVar18;
            *plVar18 = lVar17 + 1;
            if (lVar17 + 1 != 0) {
              local_58 = (longlong *)plVar39[3];
              local_50 = plVar39[4];
              local_48 = CONCAT71(CONCAT61(CONCAT51(local_48._3_5_,
                                                    *(undefined1 *)((longlong)plVar39 + 0x2a)),
                                           *(undefined1 *)((longlong)plVar39 + 0x29)),
                                  (char)plVar39[5]);
              local_78 = CONCAT71(CONCAT61(CONCAT51(local_78._3_5_,uVar3),uVar4),uVar5);
              local_a8 = CONCAT71(CONCAT61(CONCAT51(local_a8._3_5_,uVar1),uVar2),(char)lVar13);
              local_38 = (longlong *)0x0;
              local_40 = 8;
              local_d8 = (longlong *)0x0;
              local_e0 = 8;
              local_e8 = 0;
              local_d0 = lVar10;
              local_c8 = plVar38;
              local_c0 = plVar14;
              local_b8 = plVar33;
              local_b0 = lVar28;
              local_a0 = uVar29;
              local_98 = plVar37;
              local_90 = plVar16;
              local_88 = plVar21;
              local_80 = uVar27;
              local_70 = lVar15;
              local_68 = plVar34;
              local_60 = plVar18;
              inferred_window_294(&local_1c0,&local_e8,lVar12);
              if (local_1c0 != 2) {
LAB_ram_00012a80:
                param_1[2] = local_1b8;
                param_1[1] = local_1c0;
                *param_1 = 0x8000000000000000;
                return;
              }
              puVar11 = *(undefined8 **)(param_2 + 0x308);
              plVar33 = (longlong *)puVar11[1];
              lVar10 = *plVar33;
              uVar29 = *puVar11;
              *plVar33 = lVar10 + 1;
              if (lVar10 + 1 != 0) {
                plVar38 = (longlong *)puVar11[2];
                lVar10 = *plVar38;
                *plVar38 = lVar10 + 1;
                if (lVar10 + 1 != 0) {
                  plVar14 = (longlong *)plVar39[1];
                  lVar10 = *plVar14;
                  lVar13 = *plVar39;
                  uVar1 = *(undefined1 *)((longlong)puVar11 + 0x2a);
                  uVar2 = *(undefined1 *)((longlong)puVar11 + 0x29);
                  uVar3 = *(undefined1 *)(puVar11 + 5);
                  uVar27 = puVar11[4];
                  plVar37 = (longlong *)puVar11[3];
                  *plVar14 = lVar10 + 1;
                  if (lVar10 + 1 != 0) {
                    plVar16 = (longlong *)plVar39[2];
                    lVar10 = *plVar16;
                    *plVar16 = lVar10 + 1;
                    if (lVar10 + 1 != 0) {
                      local_b8 = (longlong *)plVar39[3];
                      local_b0 = plVar39[4];
                      local_a8 = CONCAT71(CONCAT61(CONCAT51(local_a8._3_5_,
                                                            *(undefined1 *)
                                                             ((longlong)plVar39 + 0x2a)),
                                                   *(undefined1 *)((longlong)plVar39 + 0x29)),
                                          (char)plVar39[5]);
                      local_78 = CONCAT71(CONCAT61(CONCAT51(local_78._3_5_,uVar1),uVar2),uVar3);
                      local_68 = (longlong *)0x0;
                      local_70 = 8;
                      local_d8 = (longlong *)0x0;
                      local_e0 = 8;
                      local_e8 = 0;
                      local_d0 = lVar13;
                      local_c8 = plVar14;
                      local_c0 = plVar16;
                      local_a0 = uVar29;
                      local_98 = plVar33;
                      local_90 = plVar38;
                      local_88 = plVar37;
                      local_80 = uVar27;
                      inferred_window_230(&local_1d0,&local_e8);
                      local_1b8 = local_1c8;
                      local_1c0 = local_1d0;
                      if (local_1d0 != 2) goto LAB_ram_00012a80;
                      puVar30 = *(undefined8 **)(param_2 + 0x48);
                      plVar38 = (longlong *)puVar30[1];
                      lVar10 = *plVar38;
                      plVar33 = (longlong *)*puVar30;
                      *plVar38 = lVar10 + 1;
                      if (lVar10 + 1 != 0) {
                        plVar14 = (longlong *)puVar30[2];
                        lVar10 = *plVar14;
                        *plVar14 = lVar10 + 1;
                        if (lVar10 + 1 != 0) {
                          puVar22 = *(undefined8 **)(*(longlong *)(param_2 + 0x2f0) + 0x58);
                          plVar16 = (longlong *)puVar22[1];
                          lVar10 = *plVar16;
                          uVar1 = *(undefined1 *)((longlong)puVar30 + 0x2a);
                          uVar2 = *(undefined1 *)((longlong)puVar30 + 0x29);
                          uVar3 = *(undefined1 *)(puVar30 + 5);
                          uVar29 = puVar30[4];
                          lVar13 = puVar30[3];
                          plVar37 = (longlong *)*puVar22;
                          *plVar16 = lVar10 + 1;
                          if (lVar10 + 1 != 0) {
                            plVar21 = (longlong *)puVar22[2];
                            lVar10 = *plVar21;
                            *plVar21 = lVar10 + 1;
                            if (lVar10 + 1 != 0) {
                              plVar34 = (longlong *)plVar39[1];
                              lVar10 = *plVar34;
                              plVar18 = (longlong *)*plVar39;
                              uVar4 = *(undefined1 *)((longlong)puVar22 + 0x2a);
                              uVar5 = *(undefined1 *)((longlong)puVar22 + 0x29);
                              uVar6 = *(undefined1 *)(puVar22 + 5);
                              uVar31 = puVar22[4];
                              uVar27 = puVar22[3];
                              *plVar34 = lVar10 + 1;
                              if (lVar10 + 1 != 0) {
                                plVar36 = (longlong *)plVar39[2];
                                lVar10 = *plVar36;
                                *plVar36 = lVar10 + 1;
                                if (lVar10 + 1 != 0) {
                                  plVar23 = (longlong *)puVar11[1];
                                  lVar28 = *plVar23;
                                  uVar32 = *puVar11;
                                  uVar7 = *(undefined1 *)((longlong)plVar39 + 0x2a);
                                  uVar8 = *(undefined1 *)((longlong)plVar39 + 0x29);
                                  lVar10 = plVar39[5];
                                  lVar15 = plVar39[4];
                                  lVar17 = plVar39[3];
                                  *plVar23 = lVar28 + 1;
                                  if (lVar28 + 1 != 0) {
                                    plVar39 = (longlong *)puVar11[2];
                                    lVar28 = *plVar39;
                                    *plVar39 = lVar28 + 1;
                                    if (lVar28 + 1 != 0) {
                                      plVar19 = (longlong *)(param_2 + 0x2f8);
                                      local_e0 = param_2 + 0x238;
                                      local_e8 = param_2 + 0x290;
                                      local_20 = puVar11[3];
                                      local_18 = puVar11[4];
                                      local_40 = CONCAT71(CONCAT61(CONCAT51(local_40._3_5_,uVar7),
                                                                   uVar8),(char)lVar10);
                                      local_70 = CONCAT71(CONCAT61(CONCAT51(local_70._3_5_,uVar4),
                                                                   uVar5),uVar6);
                                      local_a0 = CONCAT71(CONCAT61(CONCAT51(local_a0._3_5_,uVar1),
                                                                   uVar2),uVar3);
                                      local_10 = CONCAT71(CONCAT61(CONCAT51(local_10._3_5_,
                                                                            *(undefined1 *)
                                                                             ((longlong)puVar11 +
                                                                             0x2a)),
                                                                   *(undefined1 *)
                                                                    ((longlong)puVar11 + 0x29)),
                                                          *(undefined1 *)(puVar11 + 5));
                                      local_d8 = plVar19;
                                      local_d0 = param_2;
                                      local_c8 = plVar33;
                                      local_c0 = plVar38;
                                      local_b8 = plVar14;
                                      local_b0 = lVar13;
                                      local_a8 = uVar29;
                                      local_98 = plVar37;
                                      local_90 = plVar16;
                                      local_88 = plVar21;
                                      local_80 = uVar27;
                                      local_78 = uVar31;
                                      local_68 = plVar18;
                                      local_60 = plVar34;
                                      local_58 = plVar36;
                                      local_50 = lVar17;
                                      local_48 = lVar15;
                                      local_38 = (longlong *)uVar32;
                                      local_30 = plVar23;
                                      local_28 = plVar39;
                                      inferred_window_389(auStack_130,&local_190);
                                      local_100 = local_198;
                                      local_108 = local_1a0;
                                      local_110 = local_1a8;
                                      local_118 = local_1b0;
                                      local_f8 = lVar12;
                                      local_f0 = (short)lVar20;
                                      local_ee = param_4;
                                      local_ed = param_5;
                                      inferred_window_112(&local_158,&local_e8,auStack_130);
                                      local_1b8 = local_148;
                                      local_1c0 = local_150;
                                      if (local_158 != 0) goto LAB_ram_00012a80;
                                      puVar11 = *(undefined8 **)(param_2 + 0x308);
                                      plVar33 = (longlong *)puVar11[1];
                                      lVar20 = *plVar33;
                                      uVar29 = *puVar11;
                                      *plVar33 = lVar20 + 1;
                                      if (lVar20 + 1 != 0) {
                                        plVar38 = (longlong *)puVar11[2];
                                        lVar20 = *plVar38;
                                        *plVar38 = lVar20 + 1;
                                        if (lVar20 + 1 != 0) {
                                          puVar30 = *(undefined8 **)(param_2 + 0x120);
                                          plVar14 = (longlong *)puVar30[1];
                                          lVar20 = *plVar14;
                                          uVar1 = *(undefined1 *)((longlong)puVar11 + 0x2a);
                                          uVar2 = *(undefined1 *)((longlong)puVar11 + 0x29);
                                          uVar3 = *(undefined1 *)(puVar11 + 5);
                                          uVar32 = puVar11[4];
                                          uVar31 = puVar11[3];
                                          uVar27 = *puVar30;
                                          *plVar14 = lVar20 + 1;
                                          if (lVar20 + 1 != 0) {
                                            plVar37 = (longlong *)puVar30[2];
                                            lVar20 = *plVar37;
                                            *plVar37 = lVar20 + 1;
                                            if (lVar20 + 1 != 0) {
                                              puVar11 = (undefined8 *)*plVar19;
                                              plVar16 = (longlong *)puVar11[1];
                                              lVar20 = *plVar16;
                                              uVar4 = *(undefined1 *)((longlong)puVar30 + 0x2a);
                                              uVar5 = *(undefined1 *)((longlong)puVar30 + 0x29);
                                              uVar6 = *(undefined1 *)(puVar30 + 5);
                                              uVar40 = puVar30[4];
                                              uVar24 = puVar30[3];
                                              uVar41 = *puVar11;
                                              *plVar16 = lVar20 + 1;
                                              if (lVar20 + 1 != 0) {
                                                plVar21 = (longlong *)puVar11[2];
                                                lVar20 = *plVar21;
                                                *plVar21 = lVar20 + 1;
                                                if (lVar20 + 1 != 0) {
                                                  puVar30 = (undefined8 *)*plVar19;
                                                  plVar34 = (longlong *)puVar30[1];
                                                  lVar20 = *plVar34;
                                                  uVar7 = *(undefined1 *)((longlong)puVar11 + 0x2a);
                                                  uVar8 = *(undefined1 *)((longlong)puVar11 + 0x29);
                                                  uVar9 = *(undefined1 *)(puVar11 + 5);
                                                  uVar25 = puVar11[4];
                                                  uVar26 = puVar11[3];
                                                  uVar35 = *puVar30;
                                                  *plVar34 = lVar20 + 1;
                                                  if (lVar20 + 1 != 0) {
                                                    plVar39 = (longlong *)puVar30[2];
                                                    lVar20 = *plVar39;
                                                    *plVar39 = lVar20 + 1;
                                                    if (lVar20 + 1 != 0) {
                                                      local_28 = (longlong *)puVar30[3];
                                                      local_20 = puVar30[4];
                                                      local_18 = CONCAT71(CONCAT61(CONCAT51(local_18
                                                  ._3_5_,*(undefined1 *)((longlong)puVar30 + 0x2a)),
                                                  *(undefined1 *)((longlong)puVar30 + 0x29)),
                                                  *(undefined1 *)(puVar30 + 5));
                                                  local_48 = CONCAT71(CONCAT61(CONCAT51(local_48.
                                                  _3_5_,uVar7),uVar8),uVar9);
                                                  local_78 = CONCAT71(CONCAT61(CONCAT51(local_78.
                                                  _3_5_,uVar4),uVar5),uVar6);
                                                  local_a8 = CONCAT71(CONCAT61(CONCAT51(local_a8.
                                                  _3_5_,uVar1),uVar2),uVar3);
                                                  local_8 = 0;
                                                  local_10 = 8;
                                                  local_d8 = (longlong *)0x0;
                                                  local_e0 = 8;
                                                  local_e8 = 0;
                                                  local_d0 = uVar29;
                                                  local_c8 = plVar33;
                                                  local_c0 = plVar38;
                                                  local_b8 = (longlong *)uVar31;
                                                  local_b0 = uVar32;
                                                  local_a0 = uVar27;
                                                  local_98 = plVar14;
                                                  local_90 = plVar37;
                                                  local_88 = (longlong *)uVar24;
                                                  local_80 = uVar40;
                                                  local_70 = uVar41;
                                                  local_68 = plVar16;
                                                  local_60 = plVar21;
                                                  local_58 = (longlong *)uVar26;
                                                  local_50 = uVar25;
                                                  local_40 = uVar35;
                                                  local_38 = plVar34;
                                                  local_30 = plVar39;
                                                  inferred_window_229(&local_1e0,&local_e8);
                                                  local_1b8 = local_1d8;
                                                  local_1c0 = local_1e0;
                                                  if (local_1e0 == 2) {
                                                    puVar11 = (undefined8 *)
                                                              **(longlong **)
                                                                (*(longlong *)(param_2 + 0x2f0) +
                                                                0x58);
                                                    local_b0 = *puVar11;
                                                    local_a8 = puVar11[1];
                                                    local_a0 = puVar11[2];
                                                    local_98 = (longlong *)puVar11[3];
                                                    local_e8 = local_190;
                                                    local_e0 = local_188;
                                                    local_d8 = (longlong *)local_180;
                                                    local_d0 = local_1b0;
                                                    local_c8 = (longlong *)local_1a8;
                                                    local_c0 = (longlong *)local_1a0;
                                                    local_b8 = (longlong *)local_198;
                                                    param_1[0x12] = local_160;
                                                    param_1[0x11] = local_168;
                                                    param_1[0x10] = local_170;
                                                    param_1[0xf] = local_178;
                                                    inferred_window_473(param_1,&local_e8,0x58);
                                                    param_1[0xe] = local_138;
                                                    param_1[0xd] = local_140;
                                                    param_1[0xc] = local_148;
                                                    param_1[0xb] = local_150;
                                                    *(undefined1 *)(param_1 + 0x13) = 0;
                                                    return;
                                                  }
                                                  goto LAB_ram_00012a80;
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
            }
          }
        }
      }
    }
  }
                    /* WARNING: Subroutine does not return */
  abort();
}

