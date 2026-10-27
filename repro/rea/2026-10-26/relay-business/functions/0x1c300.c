// rea decompile_all
// name: inferred_window_106
// address: 0x1c300
// body: available
// range: 0x1c300-0x1d06f inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x1c530 to 0xae8e8 inferred_window_398 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; Ghidra Listing reports a terminal call at 0x1d068 to 0xb25e8 inferred_window_439 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_106(undefined8 *param_1,longlong param_2)

{
  char *pcVar1;
  longlong lVar2;
  int iVar3;
  longlong *plVar4;
  ulonglong uVar5;
  ulonglong uVar6;
  undefined8 *puVar7;
  longlong lVar8;
  ulonglong uVar9;
  undefined8 local_b0;
  undefined8 local_a8;
  longlong local_a0;
  char *local_98;
  longlong local_90;
  longlong local_88;
  int local_6c;
  longlong local_48;
  ulonglong local_40;
  longlong local_38;
  undefined8 *local_30;
  undefined4 local_20;
  undefined4 uStack_1c;
  undefined4 local_18;
  undefined4 uStack_14;
  undefined4 local_10;
  undefined4 uStack_c;
  undefined4 local_8;
  undefined4 uStack_4;
  
  lVar8 = *(longlong *)(param_2 + 0x10);
  if (0x7ffffffffffffffe < *(ulonglong *)(lVar8 + 0x10)) {
                    /* WARNING: Subroutine does not return */
    inferred_window_398(&DAT_ram_000bcd40);
  }
  *(ulonglong *)(lVar8 + 0x10) = *(ulonglong *)(lVar8 + 0x10) + 1;
  inferred_window_033(&local_a0,*(undefined8 *)(lVar8 + 0x18),*(undefined8 *)(lVar8 + 0x20));
  lVar2 = local_90;
  pcVar1 = local_98;
  if ((int)local_a0 == 2) {
    uStack_c = (undefined4)local_88;
    local_8 = (undefined4)((ulonglong)local_88 >> 0x20);
    uStack_14 = (undefined4)local_90;
    local_10 = (undefined4)((ulonglong)local_90 >> 0x20);
    uStack_1c = SUB84(local_98,0);
    local_18 = (undefined4)((ulonglong)local_98 >> 0x20);
    local_90 = local_88;
    local_98 = (char *)lVar2;
    local_a0 = (longlong)pcVar1;
    inferred_window_285(&local_b0,&local_a0);
    param_1[1] = local_a8;
    *param_1 = local_b0;
  }
  else if ((int)local_a0 == 0 && local_6c == 0) {
    plVar4 = *(longlong **)(param_2 + 0x18);
    local_88 = plVar4[3];
    local_90 = plVar4[2];
    local_98 = (char *)plVar4[1];
    local_a0 = *plVar4;
    iVar3 = inferred_window_475(&local_a0,&DAT_ram_000b7e00,0x20);
    if (iVar3 == 0) {
      if (local_40 == 0) goto LAB_ram_0001c888;
      uVar6 = 0;
LAB_ram_0001c548:
      inferred_window_238(&local_20,uVar6);
      uVar9 = CONCAT44(uStack_c,local_10);
      if (uVar9 <= local_40) {
        uVar5 = CONCAT44(uStack_14,local_18);
        uVar6 = CONCAT44(uStack_1c,local_20);
        if (uVar5 < uVar6) {
LAB_ram_0001d028:
          inferred_window_440(uVar6,uVar5,&DAT_ram_000bca60);
        }
        else if (uVar5 <= local_40) {
          inferred_window_241(&local_a0,local_48 + uVar6,uVar5 - uVar6);
          if ((local_a0 == -0x7fffffffffffffe6) &&
             (uVar6 = (ulonglong)local_98 & 0xffff, uVar6 < 0x1c)) {
            if ((1L << uVar6 & 0x7fd5658U) != 0) {
              if (uVar5 <= uVar9) goto LAB_ram_0001c678;
              goto LAB_ram_0001c650;
            }
            if (((1L << uVar6 & 0x802a9a4U) == 0) && (uVar6 == 1)) {
              if (uVar5 <= uVar9) goto LAB_ram_0001c720;
              goto LAB_ram_0001c6f8;
            }
          }
          goto LAB_ram_0001c888;
        }
LAB_ram_0001d048:
                    /* WARNING: Subroutine does not return */
        inferred_window_439(uVar5,local_40,&DAT_ram_000bca60);
      }
LAB_ram_0001c888:
      do {
        do {
          if (local_40 != 0) {
            uVar6 = 0;
            while( true ) {
              inferred_window_238(&local_20,uVar6);
              uVar9 = CONCAT44(uStack_c,local_10);
              if (local_40 < uVar9) break;
              uVar5 = CONCAT44(uStack_14,local_18);
              uVar6 = CONCAT44(uStack_1c,local_20);
              if (uVar5 < uVar6) goto LAB_ram_0001d028;
              if (local_40 < uVar5) goto LAB_ram_0001d048;
              inferred_window_241(&local_a0,local_48 + uVar6,uVar5 - uVar6);
              if ((local_a0 != -0x7fffffffffffffe6) ||
                 (uVar6 = (ulonglong)local_98 & 0xffff, 0x1b < uVar6)) break;
              if ((1L << uVar6 & 0x7fd165aU) == 0) {
                if (((1L << uVar6 & 0x802a9a4U) == 0) && (uVar6 == 0xe)) {
                  if (uVar9 < uVar5) goto LAB_ram_0001c6f8;
                  if (uVar9 - uVar5 == 2) {
                    uVar5 = uVar9 + *(ushort *)(local_48 + uVar5);
                    uVar6 = 0xffffffffffffffff;
                    if (uVar9 <= uVar5) {
                      uVar6 = uVar5;
                    }
                    if ((uVar6 <= local_40) && (uVar6 - uVar9 == 0x40)) {
                      puVar7 = (undefined8 *)(local_48 + uVar9);
                      local_8 = (undefined4)puVar7[3];
                      uStack_4 = (undefined4)((ulonglong)puVar7[3] >> 0x20);
                      local_10 = (undefined4)puVar7[2];
                      uStack_c = (undefined4)((ulonglong)puVar7[2] >> 0x20);
                      local_18 = (undefined4)puVar7[1];
                      uStack_14 = (undefined4)((ulonglong)puVar7[1] >> 0x20);
                      local_20 = (undefined4)*puVar7;
                      uStack_1c = (undefined4)((ulonglong)*puVar7 >> 0x20);
                      inferred_window_252(&local_a0,&local_20);
                      if ((char)local_a0 != '\0') goto LAB_ram_0001c868;
                      local_8 = (undefined4)puVar7[7];
                      uStack_4 = (undefined4)((ulonglong)puVar7[7] >> 0x20);
                      local_10 = (undefined4)puVar7[6];
                      uStack_c = (undefined4)((ulonglong)puVar7[6] >> 0x20);
                      local_18 = (undefined4)puVar7[5];
                      uStack_14 = (undefined4)((ulonglong)puVar7[5] >> 0x20);
                      local_20 = (undefined4)puVar7[4];
                      uStack_1c = (undefined4)((ulonglong)puVar7[4] >> 0x20);
                      inferred_window_252(&local_a0,&local_20);
                      if ((char)local_a0 == '\x01') goto LAB_ram_0001c868;
                    }
                  }
                }
                break;
              }
              if (uVar9 < uVar5) goto LAB_ram_0001c650;
              if (uVar9 - uVar5 != 2) break;
              uVar5 = uVar9 + *(ushort *)(local_48 + uVar5);
              uVar6 = 0xffffffffffffffff;
              if (uVar9 <= uVar5) {
                uVar6 = uVar5;
              }
              if (local_40 <= uVar6) break;
            }
          }
          if (local_40 == 0) {
LAB_ram_0001ce38:
            inferred_window_032(&local_38,local_48,local_40);
            if (local_38 == -0x7fffffffffffffe6) {
              local_8 = (undefined4)local_30[3];
              uStack_4 = (undefined4)((ulonglong)local_30[3] >> 0x20);
              local_10 = (undefined4)local_30[2];
              uStack_c = (undefined4)((ulonglong)local_30[2] >> 0x20);
              local_18 = (undefined4)local_30[1];
              uStack_14 = (undefined4)((ulonglong)local_30[1] >> 0x20);
              local_20 = (undefined4)*local_30;
              uStack_1c = (undefined4)((ulonglong)*local_30 >> 0x20);
              inferred_window_252(&local_a0,&local_20);
              if ((char)local_a0 != '\0') goto LAB_ram_0001cff8;
            }
            inferred_window_031(&local_a0,local_48,local_40);
            if (((local_a0 == -0x7fffffffffffffe6) && (*local_98 != '\x01')) ||
               (inferred_window_030(&local_a0,local_48,local_40), local_a0 == -0x7fffffffffffffe6))
            goto LAB_ram_0001cff8;
            goto LAB_ram_0001cfe0;
          }
          uVar6 = 0;
          while( true ) {
            inferred_window_238(&local_20,uVar6);
            uVar9 = CONCAT44(uStack_c,local_10);
            if (local_40 < uVar9) goto LAB_ram_0001ce38;
            uVar5 = CONCAT44(uStack_14,local_18);
            uVar6 = CONCAT44(uStack_1c,local_20);
            if (uVar5 < uVar6) goto LAB_ram_0001d028;
            if (local_40 < uVar5) goto LAB_ram_0001d048;
            inferred_window_241(&local_a0,local_48 + uVar6,uVar5 - uVar6);
            if ((local_a0 != -0x7fffffffffffffe6) ||
               (uVar6 = (ulonglong)local_98 & 0xffff, 0x1b < uVar6)) goto LAB_ram_0001ce38;
            if ((1L << uVar6 & 0x7fd465aU) == 0) {
              if (((1L << uVar6 & 0x802a9a4U) != 0) || (uVar6 != 0xc)) goto LAB_ram_0001ce38;
              if (uVar9 < uVar5) goto LAB_ram_0001c6f8;
              if (uVar9 - uVar5 != 2) goto LAB_ram_0001ce38;
              uVar5 = uVar9 + *(ushort *)(local_48 + uVar5);
              uVar6 = 0xffffffffffffffff;
              if (uVar9 <= uVar5) {
                uVar6 = uVar5;
              }
              if ((local_40 < uVar6) || (uVar6 - uVar9 != 0x20)) goto LAB_ram_0001ce38;
              goto LAB_ram_0001c868;
            }
            if (uVar9 < uVar5) break;
            if (uVar9 - uVar5 != 2) goto LAB_ram_0001ce38;
            uVar5 = uVar9 + *(ushort *)(local_48 + uVar5);
            uVar6 = 0xffffffffffffffff;
            if (uVar9 <= uVar5) {
              uVar6 = uVar5;
            }
            if (local_40 <= uVar6) goto LAB_ram_0001ce38;
          }
LAB_ram_0001c650:
          inferred_window_440(uVar5,uVar9,&DAT_ram_000bca78);
LAB_ram_0001c678:
        } while (uVar9 - uVar5 != 2);
        uVar5 = uVar9 + *(ushort *)(local_48 + uVar5);
        uVar6 = 0xffffffffffffffff;
        if (uVar9 <= uVar5) {
          uVar6 = uVar5;
        }
      } while (local_40 <= uVar6);
      goto LAB_ram_0001c548;
    }
LAB_ram_0001cfe0:
    *param_1 = 2;
    *(undefined1 *)(param_1 + 1) = 1;
  }
  else {
LAB_ram_0001cff8:
    *param_1 = 2;
    *(undefined1 *)(param_1 + 1) = 0;
  }
LAB_ram_0001d008:
  *(longlong *)(lVar8 + 0x10) = *(longlong *)(lVar8 + 0x10) + -1;
  return;
LAB_ram_0001c6f8:
  inferred_window_440(uVar5,uVar9,&DAT_ram_000bca30);
LAB_ram_0001c720:
  if (uVar9 - uVar5 == 2) {
    uVar5 = uVar9 + *(ushort *)(local_48 + uVar5);
    uVar6 = 0xffffffffffffffff;
    if (uVar9 <= uVar5) {
      uVar6 = uVar5;
    }
    if ((uVar6 <= local_40) && (uVar6 - uVar9 == 0x6c)) {
      puVar7 = (undefined8 *)(local_48 + uVar9);
      local_8 = (undefined4)puVar7[3];
      uStack_4 = (undefined4)((ulonglong)puVar7[3] >> 0x20);
      local_10 = (undefined4)puVar7[2];
      uStack_c = (undefined4)((ulonglong)puVar7[2] >> 0x20);
      local_18 = (undefined4)puVar7[1];
      uStack_14 = (undefined4)((ulonglong)puVar7[1] >> 0x20);
      local_20 = (undefined4)*puVar7;
      uStack_1c = (undefined4)((ulonglong)*puVar7 >> 0x20);
      inferred_window_252(&local_a0,&local_20);
      if (((char)local_a0 != '\0') ||
         (*(short *)(puVar7 + 0xb) != 0 || *(short *)((longlong)puVar7 + 0x6a) != 0)) {
LAB_ram_0001c868:
        *param_1 = 2;
        *(undefined1 *)(param_1 + 1) = 0;
        goto LAB_ram_0001d008;
      }
    }
  }
  goto LAB_ram_0001c888;
}

