// rea decompile_all
// name: inferred_window_094
// address: 0x14338
// body: available
// range: 0x14338-0x14d3f inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x143f8 to syscall:0xb6fc1a11 abort (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_094(undefined8 *param_1,longlong param_2,longlong *param_3,undefined1 param_4,
                        undefined1 param_5)

{
  undefined1 uVar1;
  undefined1 uVar2;
  undefined1 uVar3;
  longlong lVar4;
  longlong lVar5;
  longlong lVar6;
  undefined8 *puVar7;
  undefined8 *puVar8;
  longlong local_168;
  longlong local_160;
  longlong local_158;
  longlong local_150;
  undefined8 local_148;
  undefined8 local_140;
  undefined8 local_138;
  undefined8 local_130;
  longlong local_128;
  longlong local_120;
  longlong local_118;
  longlong local_110;
  longlong local_108;
  longlong *local_100;
  longlong *local_f8;
  undefined8 local_f0;
  undefined8 local_e8;
  undefined8 local_e0;
  undefined8 local_d8;
  longlong *local_d0;
  longlong *local_c8;
  undefined8 local_c0;
  undefined8 local_b8;
  undefined1 local_b0;
  undefined1 local_af;
  undefined1 local_ae;
  undefined8 local_a8;
  longlong *local_a0;
  longlong *local_98;
  undefined8 local_90;
  undefined8 local_88;
  undefined1 local_80;
  undefined1 local_7f;
  undefined1 local_7e;
  undefined8 local_78;
  longlong *local_70;
  longlong *local_68;
  undefined8 local_60;
  undefined8 local_58;
  undefined1 local_50;
  undefined1 local_4f;
  undefined1 local_4e;
  undefined1 auStack_48 [24];
  longlong local_30;
  longlong local_28;
  longlong local_20;
  longlong local_18;
  longlong local_10;
  undefined2 local_8;
  undefined1 local_6;
  undefined1 local_5;
  
  lVar4 = param_3[0xc];
  lVar5 = param_3[3];
  local_158 = param_3[2];
  local_160 = param_3[1];
  local_168 = *param_3;
  puVar7 = *(undefined8 **)(param_2 + 0x48);
  local_100 = (longlong *)puVar7[1];
  lVar6 = *local_100;
  local_108 = *puVar7;
  *local_100 = lVar6 + 1;
  if (lVar6 + 1 != 0) {
    local_f8 = (longlong *)puVar7[2];
    lVar6 = *local_f8;
    *local_f8 = lVar6 + 1;
    if (lVar6 + 1 != 0) {
      puVar8 = *(undefined8 **)(*(longlong *)(param_2 + 0x2f0) + 0x58);
      local_d0 = (longlong *)puVar8[1];
      lVar6 = *local_d0;
      uVar1 = *(undefined1 *)((longlong)puVar7 + 0x2a);
      uVar2 = *(undefined1 *)((longlong)puVar7 + 0x29);
      uVar3 = *(undefined1 *)(puVar7 + 5);
      local_e8 = puVar7[4];
      local_f0 = puVar7[3];
      local_d8 = *puVar8;
      *local_d0 = lVar6 + 1;
      if (lVar6 + 1 != 0) {
        local_c8 = (longlong *)puVar8[2];
        lVar6 = *local_c8;
        *local_c8 = lVar6 + 1;
        if (lVar6 + 1 != 0) {
          puVar7 = *(undefined8 **)(param_2 + 0x120);
          local_a0 = (longlong *)puVar7[1];
          lVar6 = *local_a0;
          local_ae = *(undefined1 *)((longlong)puVar8 + 0x2a);
          local_af = *(undefined1 *)((longlong)puVar8 + 0x29);
          local_b0 = *(undefined1 *)(puVar8 + 5);
          local_b8 = puVar8[4];
          local_c0 = puVar8[3];
          local_a8 = *puVar7;
          *local_a0 = lVar6 + 1;
          if (lVar6 + 1 != 0) {
            local_98 = (longlong *)puVar7[2];
            lVar6 = *local_98;
            *local_98 = lVar6 + 1;
            if (lVar6 + 1 != 0) {
              puVar8 = *(undefined8 **)(param_2 + 0x308);
              local_70 = (longlong *)puVar8[1];
              lVar6 = *local_70;
              local_7e = *(undefined1 *)((longlong)puVar7 + 0x2a);
              local_7f = *(undefined1 *)((longlong)puVar7 + 0x29);
              local_80 = *(undefined1 *)(puVar7 + 5);
              local_88 = puVar7[4];
              local_90 = puVar7[3];
              local_78 = *puVar8;
              *local_70 = lVar6 + 1;
              if (lVar6 + 1 != 0) {
                local_68 = (longlong *)puVar8[2];
                lVar6 = *local_68;
                *local_68 = lVar6 + 1;
                if (lVar6 + 1 != 0) {
                  local_120 = param_2 + 0x238;
                  local_128 = param_2 + 0x290;
                  local_118 = param_2 + 0x2f8;
                  local_60 = puVar8[3];
                  local_58 = puVar8[4];
                  local_50 = *(undefined1 *)(puVar8 + 5);
                  local_4f = *(undefined1 *)((longlong)puVar8 + 0x29);
                  local_4e = *(undefined1 *)((longlong)puVar8 + 0x2a);
                  local_e0 = CONCAT71(CONCAT61(CONCAT51(local_e0._3_5_,uVar1),uVar2),uVar3);
                  local_110 = param_2;
                  inferred_window_389(auStack_48,&local_168);
                  local_18 = param_3[7];
                  local_20 = param_3[6];
                  local_28 = param_3[5];
                  local_30 = param_3[4];
                  local_10 = lVar5;
                  local_8 = (short)lVar4;
                  local_6 = param_4;
                  local_5 = param_5;
                  inferred_window_112(&local_150,&local_128,auStack_48);
                  if (local_150 == 0) {
                    puVar7 = (undefined8 *)**(longlong **)(*(longlong *)(param_2 + 0x2f0) + 0x58);
                    local_d8 = puVar7[3];
                    local_e0 = puVar7[2];
                    local_e8 = puVar7[1];
                    local_f0 = *puVar7;
                    local_118 = local_158;
                    local_120 = local_160;
                    local_128 = local_168;
                    local_f8 = (longlong *)param_3[7];
                    local_100 = (longlong *)param_3[6];
                    local_108 = param_3[5];
                    local_110 = param_3[4];
                    param_1[0x12] = param_3[0xb];
                    param_1[0x11] = param_3[10];
                    param_1[0x10] = param_3[9];
                    param_1[0xf] = param_3[8];
                    inferred_window_473(param_1,&local_128,0x58);
                    param_1[0xe] = local_130;
                    param_1[0xd] = local_138;
                    param_1[0xc] = local_140;
                    param_1[0xb] = local_148;
                    *(undefined1 *)(param_1 + 0x13) = 0;
                  }
                  else {
                    param_1[2] = local_140;
                    param_1[1] = local_148;
                    *param_1 = 0x8000000000000000;
                  }
                  return;
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

