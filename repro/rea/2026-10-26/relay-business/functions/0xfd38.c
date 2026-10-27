// rea decompile_all
// name: inferred_window_090
// address: 0xfd38
// body: available
// range: 0xfd38-0x106f7 inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0xfe90 to 0xade20 inferred_window_382 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; Ghidra Listing reports a terminal call at 0x100c8 to 0xade20 inferred_window_382 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; Ghidra Listing reports a terminal call at 0x10378 to syscall:0xb6fc1a11 abort (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void inferred_window_090(undefined8 *param_1,undefined8 *param_2,undefined8 param_3,
                        undefined8 *param_4,longlong param_5)

{
  undefined1 uVar1;
  undefined1 uVar2;
  int iVar3;
  undefined8 uVar4;
  longlong lVar5;
  undefined8 *puVar6;
  longlong lVar7;
  undefined8 uVar8;
  undefined8 uVar9;
  longlong *plVar10;
  ulonglong uVar11;
  undefined1 *puVar12;
  longlong lVar13;
  longlong *plVar14;
  ulonglong uVar15;
  ulonglong uVar16;
  undefined8 *puVar17;
  undefined8 *puVar18;
  undefined8 *unaff_R9;
  ulonglong local_d0;
  ulonglong local_b8;
  undefined8 local_a8;
  undefined8 local_a0;
  undefined8 *local_98;
  undefined8 local_90;
  undefined8 *local_88;
  ulonglong local_80;
  ulonglong local_78;
  ulonglong local_70;
  undefined8 local_68;
  undefined8 local_60;
  undefined8 local_58;
  undefined8 local_50;
  undefined8 local_48;
  undefined8 local_40;
  undefined8 local_38;
  longlong local_30;
  undefined8 local_28;
  undefined8 local_20;
  longlong local_18;
  undefined8 local_10;
  undefined8 local_8;
  
  uVar4 = 0;
  uVar16 = *(ulonglong *)(param_5 + -0x1000);
  if ((longlong)(uVar16 * 0x22) < 0) {
LAB_ram_0000fe78:
                    /* WARNING: Subroutine does not return */
    inferred_window_382(uVar4,uVar16 * 0x22,&DAT_ram_000bcd28);
  }
  lVar5 = *(longlong *)(param_5 + -0xff0);
  puVar6 = *(undefined8 **)(param_5 + -0xff8);
  local_b8 = 8;
  local_d0 = 1;
  if (uVar16 != 0) {
    uVar15 = 0x300008000;
    if (_DAT_ram_300000000 != 0) {
      uVar15 = _DAT_ram_300000000;
    }
    uVar11 = uVar15 + uVar16 * -0x22;
    uVar4 = 1;
    local_d0 = 0;
    if (uVar11 <= uVar15) {
      local_d0 = uVar11;
    }
    if (local_d0 < 0x300000008) goto LAB_ram_0000fe78;
    puVar12 = (undefined1 *)(local_d0 + 0x21);
    uVar15 = uVar16;
    puVar18 = param_4;
    _DAT_ram_300000000 = local_d0;
    do {
      uVar1 = *(undefined1 *)((longlong)puVar18 + 0x29);
      puVar17 = (undefined8 *)*puVar18;
      iVar3 = inferred_window_475(puVar17,param_3,0x20);
      uVar4 = puVar17[1];
      uVar8 = puVar17[2];
      uVar9 = puVar17[3];
      *(undefined8 *)(puVar12 + -0x21) = *puVar17;
      *puVar12 = uVar1;
      *(undefined8 *)(puVar12 + -9) = uVar9;
      *(undefined8 *)(puVar12 + -0x11) = uVar8;
      *(undefined8 *)(puVar12 + -0x19) = uVar4;
      puVar12[-1] = iVar3 == 0;
      puVar18 = puVar18 + 6;
      puVar12 = puVar12 + 0x22;
      uVar15 = uVar15 - 1;
    } while (uVar15 != 0);
    uVar4 = 0;
    if (0x2aaaaaaaaaaaaaa < uVar16) {
LAB_ram_000100b8:
                    /* WARNING: Subroutine does not return */
      inferred_window_382(uVar4,uVar16 * 0x30,&DAT_ram_000bcd28);
    }
    uVar15 = 0x300008000;
    if (_DAT_ram_300000000 != 0) {
      uVar15 = _DAT_ram_300000000;
    }
    uVar11 = uVar15 + uVar16 * -0x30;
    local_b8 = 0;
    if (uVar11 <= uVar15) {
      local_b8 = uVar11;
    }
    uVar4 = 8;
    if (local_b8 < 0x300000008) goto LAB_ram_000100b8;
    local_b8 = local_b8 & 0xfffffffffffffff8;
    lVar7 = 0;
    uVar15 = uVar16;
    _DAT_ram_300000000 = local_b8;
    do {
      plVar10 = (longlong *)((undefined8 *)((longlong)param_4 + lVar7))[1];
      lVar13 = *plVar10;
      uVar4 = *(undefined8 *)((longlong)param_4 + lVar7);
      *plVar10 = lVar13 + 1;
      if (lVar13 + 1 == 0) {
LAB_ram_00010378:
                    /* WARNING: Subroutine does not return */
        abort();
      }
      plVar14 = *(longlong **)((longlong)param_4 + lVar7 + 0x10);
      lVar13 = *plVar14;
      *plVar14 = lVar13 + 1;
      if (lVar13 + 1 == 0) goto LAB_ram_00010378;
      uVar8 = *(undefined8 *)((longlong)param_4 + lVar7 + 0x18);
      unaff_R9 = *(undefined8 **)((longlong)param_4 + lVar7 + 0x20);
      uVar1 = *(undefined1 *)((longlong)param_4 + lVar7 + 0x28);
      uVar2 = *(undefined1 *)((longlong)param_4 + lVar7 + 0x29);
      puVar18 = (undefined8 *)(local_b8 + lVar7);
      *(undefined1 *)((longlong)puVar18 + 0x2a) = *(undefined1 *)((longlong)param_4 + lVar7 + 0x2a);
      *(undefined1 *)((longlong)puVar18 + 0x29) = uVar2;
      *(undefined1 *)(puVar18 + 5) = uVar1;
      puVar18[4] = unaff_R9;
      puVar18[3] = uVar8;
      puVar18[2] = plVar14;
      puVar18[1] = plVar10;
      *puVar18 = uVar4;
      lVar7 = lVar7 + 0x30;
      uVar15 = uVar15 - 1;
    } while (uVar15 != 0);
  }
  local_38 = param_2[3];
  local_40 = param_2[2];
  local_48 = param_2[1];
  local_50 = *param_2;
  local_78 = local_d0;
  local_68 = *puVar6;
  local_60 = puVar6[1];
  local_58 = puVar6[2];
  local_80 = uVar16;
  local_70 = uVar16;
  if (lVar5 == 0) {
    inferred_window_299(&local_30,&local_80,local_b8,uVar16);
    if (local_30 == -0x7fffffffffffffe6) {
LAB_ram_00010448:
      local_a8 = 2;
      if (uVar16 != 0) {
        puVar6 = (undefined8 *)(local_b8 + 0x10);
        do {
          lVar5 = *(longlong *)puVar6[-1] + -1;
          *(longlong *)puVar6[-1] = lVar5;
          if (lVar5 == 0) {
            inferred_window_065(puVar6 + -1);
            unaff_R9 = puVar6;
          }
          lVar5 = *(longlong *)*puVar6 + -1;
          *(longlong *)*puVar6 = lVar5;
          if (lVar5 == 0) {
            inferred_window_065(puVar6);
            unaff_R9 = puVar6;
          }
          puVar6 = puVar6 + 6;
          uVar16 = uVar16 - 1;
        } while (uVar16 != 0);
      }
      goto LAB_ram_000106d8;
    }
    local_8 = local_20;
    local_10 = local_28;
    local_18 = local_30;
    inferred_window_285(&local_a0,&local_18);
    local_a8 = local_a0;
    unaff_R9 = local_98;
  }
  else {
    inferred_window_300(&local_30,&local_80,local_b8,uVar16);
    if (local_30 == -0x7fffffffffffffe6) goto LAB_ram_00010448;
    local_8 = local_20;
    local_10 = local_28;
    local_18 = local_30;
    inferred_window_285(&local_90,&local_18);
    local_a8 = local_90;
    unaff_R9 = local_88;
  }
  if (uVar16 != 0) {
    puVar6 = (undefined8 *)(local_b8 + 0x10);
    do {
      lVar5 = *(longlong *)puVar6[-1] + -1;
      *(longlong *)puVar6[-1] = lVar5;
      if (lVar5 == 0) {
        inferred_window_065(puVar6 + -1);
      }
      lVar5 = *(longlong *)*puVar6 + -1;
      *(longlong *)*puVar6 = lVar5;
      if (lVar5 == 0) {
        inferred_window_065(puVar6);
      }
      puVar6 = puVar6 + 6;
      uVar16 = uVar16 - 1;
    } while (uVar16 != 0);
  }
LAB_ram_000106d8:
  param_1[1] = unaff_R9;
  *param_1 = local_a8;
  return;
}

