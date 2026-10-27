// rea decompile_all
// name: inferred_window_109
// address: 0x1f2d8
// body: available
// range: 0x1f2d8-0x1fdff inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x1f5b0 to syscall:0xb6fc1a11 abort (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_109(longlong *param_1,undefined8 *param_2,longlong param_3,undefined8 param_4,
                        longlong param_5)

{
  undefined1 uVar1;
  undefined1 uVar2;
  undefined1 uVar3;
  longlong lVar4;
  undefined8 uVar5;
  longlong *plVar6;
  undefined8 uVar7;
  undefined8 uVar8;
  longlong *plVar9;
  longlong local_258;
  longlong local_250;
  longlong local_248;
  longlong local_240;
  undefined1 auStack_238 [8];
  longlong *local_230;
  longlong *local_228 [4];
  undefined8 local_208;
  longlong *local_200;
  longlong *local_1f8;
  undefined8 local_1f0;
  undefined8 local_1e8;
  undefined1 auStack_1d8 [8];
  longlong *local_1d0;
  longlong *local_1c8 [4];
  undefined8 local_1a8;
  longlong *local_1a0;
  longlong *local_198;
  undefined8 local_190;
  undefined8 local_188;
  undefined8 local_178;
  undefined8 local_170;
  undefined8 local_168;
  undefined8 local_160;
  longlong *local_158;
  longlong *local_150;
  undefined8 local_148;
  undefined8 local_140;
  undefined1 auStack_130 [48];
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
  undefined8 local_a0;
  longlong local_98;
  undefined1 auStack_90 [48];
  undefined1 auStack_60 [48];
  undefined1 auStack_30 [48];
  
  inferred_window_473(auStack_238,param_2 + 6,0x30);
  inferred_window_473(&local_208,param_2 + 0xc,0x30);
  inferred_window_473(auStack_1d8,param_2 + 0x12,0x30);
  inferred_window_473(&local_1a8,param_2 + 0x18,0x30);
  if (param_3 != 0) {
    lVar4 = *local_1a0;
    *local_1a0 = lVar4 + 1;
    if ((lVar4 + 1 == 0) || (lVar4 = *local_198, *local_198 = lVar4 + 1, lVar4 + 1 == 0)) {
LAB_ram_0001f5b0:
                    /* WARNING: Subroutine does not return */
      abort();
    }
    plVar9 = (longlong *)param_2[1];
    lVar4 = *plVar9;
    uVar5 = *param_2;
    *plVar9 = lVar4 + 1;
    if (lVar4 + 1 == 0) goto LAB_ram_0001f5b0;
    plVar6 = (longlong *)param_2[2];
    lVar4 = *plVar6;
    *plVar6 = lVar4 + 1;
    if (lVar4 + 1 == 0) goto LAB_ram_0001f5b0;
    lVar4 = *local_200;
    uVar1 = *(undefined1 *)((longlong)param_2 + 0x2a);
    uVar2 = *(undefined1 *)((longlong)param_2 + 0x29);
    uVar3 = *(undefined1 *)(param_2 + 5);
    uVar8 = param_2[4];
    uVar7 = param_2[3];
    *local_200 = lVar4 + 1;
    if ((lVar4 + 1 == 0) || (lVar4 = *local_1f8, *local_1f8 = lVar4 + 1, lVar4 + 1 == 0))
    goto LAB_ram_0001f5b0;
    inferred_window_473(auStack_130,param_2 + 6,0x30);
    local_b0 = local_1e8;
    local_b8 = local_1f0;
    local_c0 = local_1f8;
    local_c8 = local_200;
    local_d0 = local_208;
    local_140 = local_188;
    local_148 = local_190;
    local_150 = local_198;
    local_158 = local_1a0;
    local_160 = local_1a8;
    local_168 = 0;
    local_170 = 8;
    local_178 = 0;
    local_100 = uVar5;
    local_f8 = plVar9;
    local_f0 = plVar6;
    local_e8 = uVar7;
    local_e0 = uVar8;
    local_d8 = uVar3;
    local_d7 = uVar2;
    local_d6 = uVar1;
    local_a0 = param_4;
    local_98 = param_5;
    inferred_window_227(&local_248,&local_178,param_3);
    if (local_248 != 2) {
      lVar4 = *local_1a0;
      *local_1a0 = lVar4 + -1;
      if (lVar4 + -1 == 0) {
        inferred_window_065(&local_1a0);
      }
      lVar4 = *local_198;
      *local_198 = lVar4 + -1;
      if (lVar4 + -1 == 0) {
        inferred_window_065(&local_198);
      }
      lVar4 = *local_1d0;
      *local_1d0 = lVar4 + -1;
      if (lVar4 + -1 == 0) {
        inferred_window_065(&local_1d0);
      }
      lVar4 = *local_1c8[0];
      *local_1c8[0] = lVar4 + -1;
      if (lVar4 + -1 == 0) {
        inferred_window_065(local_1c8);
      }
      lVar4 = *local_200;
      *local_200 = lVar4 + -1;
      if (lVar4 + -1 == 0) {
        inferred_window_065(&local_200);
      }
      lVar4 = *local_1f8;
      *local_1f8 = lVar4 + -1;
      if (lVar4 + -1 == 0) {
        inferred_window_065(&local_1f8);
      }
      lVar4 = *plVar9;
      *plVar9 = lVar4 + -1;
      if (lVar4 + -1 == 0) {
        inferred_window_065(param_2 + 1);
      }
      lVar4 = *plVar6;
      *plVar6 = lVar4 + -1;
      local_258 = local_248;
      local_250 = local_240;
      if (lVar4 + -1 == 0) {
        inferred_window_065(param_2 + 2);
      }
      goto LAB_ram_0001fd38;
    }
  }
  inferred_window_473(&local_160,param_2 + 0x18,0x30);
  inferred_window_473(auStack_60,param_2 + 0x12,0x30);
  inferred_window_473(auStack_30,param_2 + 0xc,0x30);
  inferred_window_473(auStack_90,param_2,0x30);
  inferred_window_473(auStack_130,auStack_90,0x90);
  local_168 = 0;
  local_170 = 8;
  local_178 = 0;
  local_a0 = param_4;
  local_98 = param_5;
  inferred_window_229(&local_258,&local_178);
  if (local_258 == 2) {
    if (param_3 == 0) {
      lVar4 = *local_230;
      *local_230 = lVar4 + -1;
      if (lVar4 + -1 == 0) {
        inferred_window_065(&local_230);
      }
      lVar4 = *local_228[0];
      *local_228[0] = lVar4 + -1;
      if (lVar4 + -1 == 0) {
        inferred_window_065(local_228);
      }
    }
    local_258 = 2;
    local_250 = param_5;
  }
  else if (param_3 == 0) {
    lVar4 = *local_230;
    *local_230 = lVar4 + -1;
    if (lVar4 + -1 == 0) {
      inferred_window_065(&local_230);
    }
    lVar4 = *local_228[0];
    *local_228[0] = lVar4 + -1;
    if (lVar4 + -1 == 0) {
      inferred_window_065(local_228);
    }
  }
LAB_ram_0001fd38:
  param_1[1] = local_250;
  *param_1 = local_258;
  return;
}

