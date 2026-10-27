// rea decompile_all
// name: inferred_window_112
// address: 0x20040
// body: available
// range: 0x20040-0x22847 inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; Ghidra Listing reports a terminal call at 0x20190 to syscall:0xb6fc1a11 abort (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; Ghidra Listing reports a terminal call at 0x21f28 to 0xaee40 inferred_window_406 (external=false, thunk=false, hasNoReturn=true); fallthrough is excluded by Ghidra's flow model. This records Ghidra's FunctionManager flag, not an independent verification that the callee cannot return.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


void inferred_window_112(undefined8 *param_1,longlong *param_2,longlong param_3)

{
  undefined2 uVar1;
  undefined1 uVar2;
  undefined1 uVar3;
  undefined1 uVar4;
  undefined1 uVar5;
  undefined1 uVar6;
  undefined1 uVar7;
  undefined1 uVar8;
  undefined1 uVar9;
  int iVar10;
  longlong *plVar11;
  longlong *plVar12;
  undefined8 uVar13;
  longlong *plVar14;
  longlong *plVar15;
  longlong *plVar16;
  longlong lVar17;
  longlong *plVar18;
  longlong *plVar19;
  longlong lVar20;
  longlong lVar21;
  longlong lVar22;
  longlong lVar23;
  undefined8 uVar24;
  ulonglong uVar25;
  ulonglong uVar26;
  longlong lVar27;
  longlong lVar28;
  longlong *plVar29;
  longlong *plVar30;
  longlong lVar31;
  longlong lVar32;
  longlong lVar33;
  longlong lVar34;
  longlong *plVar35;
  undefined8 *puVar36;
  longlong lVar37;
  longlong *plVar38;
  longlong lVar39;
  longlong *local_390;
  longlong *local_388;
  longlong *local_380;
  longlong *local_378;
  longlong *local_370;
  longlong *local_368;
  ulonglong local_360;
  longlong local_358;
  longlong *local_350;
  longlong *local_348;
  longlong *local_340;
  longlong *local_338;
  longlong *local_330;
  longlong *local_328;
  undefined8 local_320;
  undefined8 local_318;
  longlong *local_310;
  longlong *local_308;
  longlong *local_300;
  longlong *local_2f8;
  undefined8 local_2f0;
  undefined8 local_2e8;
  longlong *local_2e0;
  longlong *local_2d8;
  longlong *local_2d0;
  longlong *local_2c8;
  longlong *local_2c0;
  longlong *local_2b8;
  longlong *local_2b0;
  longlong *local_2a8;
  longlong *local_2a0;
  longlong *local_298;
  longlong *local_290;
  longlong *local_288;
  longlong *local_280;
  longlong *local_278;
  ulonglong local_270;
  longlong *local_268;
  undefined8 local_260;
  undefined8 local_258;
  undefined8 local_250;
  undefined8 local_248;
  longlong *local_240;
  longlong *local_238;
  ulonglong local_230;
  longlong *local_228;
  undefined8 local_220;
  undefined8 local_218;
  undefined8 local_210;
  undefined8 local_208;
  longlong *local_200;
  longlong *local_1f8;
  ulonglong local_1f0;
  longlong *local_1e8;
  longlong *local_1e0;
  longlong *local_1d8;
  longlong *local_1d0;
  longlong local_1c8;
  longlong *local_1c0;
  longlong *local_1b8;
  ulonglong local_1b0;
  longlong *local_1a8;
  longlong *local_1a0;
  longlong *local_198;
  longlong *local_190;
  longlong *local_188;
  longlong local_180;
  longlong local_178;
  undefined1 local_170;
  undefined1 local_16f;
  undefined1 local_16e;
  longlong local_168;
  longlong *local_160;
  longlong *local_158;
  longlong local_150;
  longlong local_148;
  undefined1 local_140;
  undefined1 local_13f;
  undefined1 local_13e;
  longlong local_138;
  longlong *local_130;
  longlong *local_128;
  longlong local_120;
  longlong local_118;
  undefined1 local_110;
  undefined1 local_10f;
  undefined1 local_10e;
  undefined1 auStack_108 [48];
  undefined8 local_d8;
  undefined8 local_d0;
  longlong *local_c8;
  longlong *local_c0;
  longlong *local_b8;
  undefined8 *local_b0;
  longlong local_a8;
  undefined1 local_a0;
  undefined1 local_9f;
  undefined1 local_9e;
  longlong *local_98;
  longlong *local_90;
  ulonglong local_88;
  longlong local_80;
  longlong *local_78;
  longlong *local_70;
  ulonglong local_68;
  longlong *local_60;
  longlong *local_58;
  longlong *local_50;
  undefined8 local_48 [2];
  undefined8 local_38;
  longlong **local_28;
  undefined *local_20;
  undefined8 local_18;
  undefined1 local_10;
  undefined1 uStack_1;
  
  local_280 = (longlong *)param_2[10];
  local_268 = (longlong *)local_280[3];
  local_270 = local_280[2];
  local_278 = (longlong *)local_280[1];
  local_280 = (longlong *)*local_280;
  inferred_window_104(&local_290,local_278,*(undefined8 *)(param_3 + 0x10));
  plVar12 = local_290;
  plVar14 = local_288;
  if (local_290 == (longlong *)0x2) {
    uVar1 = *(undefined2 *)(param_3 + 0x40);
    inferred_window_107(&local_2a0,uVar1);
    plVar12 = local_2a0;
    plVar14 = local_298;
    if (local_2a0 == (longlong *)0x2) {
      plVar35 = (longlong *)param_2[0xb];
      lVar21 = *plVar35;
      lVar37 = *(longlong *)(param_2[3] + 0x10);
      lVar39 = *(longlong *)(param_2[3] + 8);
      plVar12 = (longlong *)param_2[10];
      *plVar35 = lVar21 + 1;
      if (lVar21 + 1 == 0) goto LAB_ram_00020190;
      plVar11 = (longlong *)param_2[0xc];
      lVar21 = *plVar11;
      *plVar11 = lVar21 + 1;
      if (lVar21 + 1 == 0) goto LAB_ram_00020190;
      puVar36 = (undefined8 *)param_2[0xd];
      local_a8 = param_2[0xe];
      local_a0 = (undefined1)param_2[0xf];
      local_9f = *(undefined1 *)((longlong)param_2 + 0x79);
      local_9e = *(undefined1 *)((longlong)param_2 + 0x7a);
      local_80 = plVar12[3];
      local_88 = plVar12[2];
      local_90 = (longlong *)plVar12[1];
      local_98 = (longlong *)*plVar12;
      local_1c8 = puVar36[3];
      local_1d0 = (longlong *)puVar36[2];
      local_1d8 = (longlong *)puVar36[1];
      local_1e0 = (longlong *)*puVar36;
      local_c8 = plVar12;
      local_c0 = plVar35;
      local_b8 = plVar11;
      local_b0 = puVar36;
      iVar10 = inferred_window_475(&local_1e0,&DAT_ram_000b7d80,0x20);
      if (iVar10 == 0) {
LAB_ram_00020410:
        iVar10 = inferred_window_475(&local_98,&DAT_ram_000b7e20,0x20);
        plVar12 = (longlong *)0x2;
        plVar14 = plVar35;
        if ((iVar10 != 0) &&
           (iVar10 = inferred_window_475(&local_98,&DAT_ram_000b7ca0,0x20), iVar10 != 0)) {
          lVar37 = lVar37 << 5;
          do {
            if (lVar37 == 0) {
              inferred_window_106(&local_1e0,&local_c8);
              plVar12 = local_1e0;
              plVar14 = local_1d8;
              if (local_1e0 == (longlong *)0x2) {
                if ((char)local_1d8 != '\0') {
                  lVar21 = *plVar35;
                  *plVar35 = lVar21 + -1;
                  if (lVar21 + -1 == 0) {
                    inferred_window_065(&local_c0);
                  }
                  lVar21 = *plVar11;
                  *plVar11 = lVar21 + -1;
                  if (lVar21 + -1 == 0) {
                    inferred_window_065(&local_b8);
                  }
                  goto LAB_ram_000205d0;
                }
                inferred_window_114(&local_78,&DAT_ram_000b83c0);
                local_50 = (longlong *)0x0;
                local_58 = (longlong *)0x1;
                local_60 = (longlong *)0x0;
                local_20 = &DAT_ram_000bcab8;
                local_28 = &local_60;
                local_10 = 3;
                local_18 = 0x20;
                local_38 = 0;
                local_48[0] = 0;
                lVar21 = inferred_window_116(&DAT_ram_000b83c0,local_48);
                if (lVar21 != 0) goto LAB_ram_00021ee0;
                local_198 = local_50;
                local_1a0 = local_58;
                local_1a8 = local_60;
                local_1c0 = local_78;
                local_1b8 = local_70;
                local_1b0 = local_68;
                local_1d8 = (longlong *)0xb8621;
                local_148 = CONCAT44(local_148._4_4_,0x178f);
                local_190 = (longlong *)CONCAT71(local_190._1_7_,2);
                local_1c8 = CONCAT44(local_1c8._4_4_,0xb8);
                local_1d0 = (longlong *)0x26;
                local_1e0 = (longlong *)0x0;
                inferred_window_284(&local_2c0,&local_1e0);
                plVar12 = local_2c0;
                plVar14 = local_2b8;
              }
              break;
            }
            iVar10 = inferred_window_475(lVar39,&local_98,0x20);
            lVar37 = lVar37 + -0x20;
            lVar39 = lVar39 + 0x20;
          } while (iVar10 != 0);
        }
      }
      else {
        local_1c8 = puVar36[3];
        local_1d0 = (longlong *)puVar36[2];
        local_1d8 = (longlong *)puVar36[1];
        local_1e0 = (longlong *)*puVar36;
        iVar10 = inferred_window_475(&local_1e0,&DAT_ram_000b7e00,0x20);
        if (iVar10 == 0) goto LAB_ram_00020410;
        inferred_window_115(&local_2b0,0x1d);
        plVar12 = local_2b0;
        plVar14 = local_2a8;
      }
      lVar21 = *plVar35;
      *plVar35 = lVar21 + -1;
      if (lVar21 + -1 == 0) {
        inferred_window_065(&local_c0);
      }
      lVar21 = *plVar11;
      *plVar11 = lVar21 + -1;
      if (lVar21 + -1 == 0) {
        inferred_window_065(&local_b8);
      }
      if (plVar12 == (longlong *)0x2) {
LAB_ram_000205d0:
        lVar21 = *param_2;
        if (*(char *)(lVar21 + 0x59) == '\0') {
          uVar2 = *(undefined1 *)(param_3 + 0x42);
          local_248 = *(undefined8 *)(param_3 + 0x30);
          local_250 = *(undefined8 *)(param_3 + 0x28);
          local_258 = *(undefined8 *)(param_3 + 0x20);
          local_260 = *(undefined8 *)(param_3 + 0x18);
          local_240 = local_280;
          local_238 = local_278;
          local_230 = local_270;
          local_228 = local_268;
          inferred_window_473(lVar21 + 8,&local_260,0x40);
          *(undefined1 *)(lVar21 + 0x58) = uVar2;
          *(undefined8 *)(lVar21 + 0x50) = 0;
          *(undefined8 *)(lVar21 + 0x48) = 0;
          *(undefined1 *)(lVar21 + 0x59) = 1;
        }
        lVar21 = param_2[1];
        if (*(char *)(lVar21 + 0x51) == '\0') {
          uVar2 = *(undefined1 *)(param_3 + 0x43);
          local_208 = *(undefined8 *)(param_3 + 0x30);
          local_210 = *(undefined8 *)(param_3 + 0x28);
          local_218 = *(undefined8 *)(param_3 + 0x20);
          local_220 = *(undefined8 *)(param_3 + 0x18);
          local_200 = local_280;
          local_1f8 = local_278;
          local_1f0 = local_270;
          local_1e8 = local_268;
          inferred_window_473(lVar21 + 8,&local_220,0x40);
          *(undefined1 *)(lVar21 + 0x50) = uVar2;
          *(undefined1 *)(lVar21 + 0x51) = 1;
          *(undefined8 *)(lVar21 + 0x48) = 0;
        }
        lVar21 = *param_2;
        if (((((((((*(char *)(param_3 + 0x18) == *(char *)(lVar21 + 8)) &&
                  (*(char *)(param_3 + 0x19) == *(char *)(lVar21 + 9))) &&
                 (*(char *)(param_3 + 0x1a) == *(char *)(lVar21 + 10))) &&
                ((*(char *)(param_3 + 0x1b) == *(char *)(lVar21 + 0xb) &&
                 (*(char *)(param_3 + 0x1c) == *(char *)(lVar21 + 0xc))))) &&
               ((*(char *)(param_3 + 0x1d) == *(char *)(lVar21 + 0xd) &&
                ((*(char *)(param_3 + 0x1e) == *(char *)(lVar21 + 0xe) &&
                 (*(char *)(param_3 + 0x1f) == *(char *)(lVar21 + 0xf))))))) &&
              ((*(char *)(param_3 + 0x20) == *(char *)(lVar21 + 0x10) &&
               ((((*(char *)(param_3 + 0x21) == *(char *)(lVar21 + 0x11) &&
                  (*(char *)(param_3 + 0x22) == *(char *)(lVar21 + 0x12))) &&
                 (*(char *)(param_3 + 0x23) == *(char *)(lVar21 + 0x13))) &&
                (((*(char *)(param_3 + 0x24) == *(char *)(lVar21 + 0x14) &&
                  (*(char *)(param_3 + 0x25) == *(char *)(lVar21 + 0x15))) &&
                 ((*(char *)(param_3 + 0x26) == *(char *)(lVar21 + 0x16) &&
                  ((*(char *)(param_3 + 0x27) == *(char *)(lVar21 + 0x17) &&
                   (*(char *)(param_3 + 0x28) == *(char *)(lVar21 + 0x18))))))))))))) &&
             (*(char *)(param_3 + 0x29) == *(char *)(lVar21 + 0x19))) &&
            (((*(char *)(param_3 + 0x2a) == *(char *)(lVar21 + 0x1a) &&
              (*(char *)(param_3 + 0x2b) == *(char *)(lVar21 + 0x1b))) &&
             (*(char *)(param_3 + 0x2c) == *(char *)(lVar21 + 0x1c))))) &&
           (((*(char *)(param_3 + 0x2d) == *(char *)(lVar21 + 0x1d) &&
             (*(char *)(param_3 + 0x2e) == *(char *)(lVar21 + 0x1e))) &&
            ((((*(char *)(param_3 + 0x2f) == *(char *)(lVar21 + 0x1f) &&
               ((*(char *)(param_3 + 0x30) == *(char *)(lVar21 + 0x20) &&
                (*(char *)(param_3 + 0x31) == *(char *)(lVar21 + 0x21))))) &&
              (*(char *)(param_3 + 0x32) == *(char *)(lVar21 + 0x22))) &&
             ((((*(char *)(param_3 + 0x33) == *(char *)(lVar21 + 0x23) &&
                (*(char *)(param_3 + 0x34) == *(char *)(lVar21 + 0x24))) &&
               (*(char *)(param_3 + 0x35) == *(char *)(lVar21 + 0x25))) &&
              ((*(char *)(param_3 + 0x36) == *(char *)(lVar21 + 0x26) &&
               (*(char *)(param_3 + 0x37) == *(char *)(lVar21 + 0x27))))))))))) {
          lVar37 = param_2[1];
          if (((((*(char *)(param_3 + 0x18) == *(char *)(lVar37 + 8)) &&
                (*(char *)(param_3 + 0x19) == *(char *)(lVar37 + 9))) &&
               ((*(char *)(param_3 + 0x1a) == *(char *)(lVar37 + 10) &&
                (((*(char *)(param_3 + 0x1b) == *(char *)(lVar37 + 0xb) &&
                  (*(char *)(param_3 + 0x1c) == *(char *)(lVar37 + 0xc))) &&
                 (*(char *)(param_3 + 0x1d) == *(char *)(lVar37 + 0xd))))))) &&
              (((*(char *)(param_3 + 0x1e) == *(char *)(lVar37 + 0xe) &&
                (*(char *)(param_3 + 0x1f) == *(char *)(lVar37 + 0xf))) &&
               (((*(char *)(param_3 + 0x20) == *(char *)(lVar37 + 0x10) &&
                 (((*(char *)(param_3 + 0x21) == *(char *)(lVar37 + 0x11) &&
                   (*(char *)(param_3 + 0x22) == *(char *)(lVar37 + 0x12))) &&
                  ((*(char *)(param_3 + 0x23) == *(char *)(lVar37 + 0x13) &&
                   (((*(char *)(param_3 + 0x24) == *(char *)(lVar37 + 0x14) &&
                     (*(char *)(param_3 + 0x25) == *(char *)(lVar37 + 0x15))) &&
                    (*(char *)(param_3 + 0x26) == *(char *)(lVar37 + 0x16))))))))) &&
                (((*(char *)(param_3 + 0x27) == *(char *)(lVar37 + 0x17) &&
                  (*(char *)(param_3 + 0x28) == *(char *)(lVar37 + 0x18))) &&
                 (*(char *)(param_3 + 0x29) == *(char *)(lVar37 + 0x19))))))))) &&
             (((((*(char *)(param_3 + 0x2a) == *(char *)(lVar37 + 0x1a) &&
                 (*(char *)(param_3 + 0x2b) == *(char *)(lVar37 + 0x1b))) &&
                ((*(char *)(param_3 + 0x2c) == *(char *)(lVar37 + 0x1c) &&
                 (((((*(char *)(param_3 + 0x2d) == *(char *)(lVar37 + 0x1d) &&
                     (*(char *)(param_3 + 0x2e) == *(char *)(lVar37 + 0x1e))) &&
                    (*(char *)(param_3 + 0x2f) == *(char *)(lVar37 + 0x1f))) &&
                   ((*(char *)(param_3 + 0x30) == *(char *)(lVar37 + 0x20) &&
                    (*(char *)(param_3 + 0x31) == *(char *)(lVar37 + 0x21))))) &&
                  (*(char *)(param_3 + 0x32) == *(char *)(lVar37 + 0x22))))))) &&
               ((*(char *)(param_3 + 0x33) == *(char *)(lVar37 + 0x23) &&
                (*(char *)(param_3 + 0x34) == *(char *)(lVar37 + 0x24))))) &&
              ((*(char *)(param_3 + 0x35) == *(char *)(lVar37 + 0x25) &&
               ((*(char *)(param_3 + 0x36) == *(char *)(lVar37 + 0x26) &&
                (*(char *)(param_3 + 0x37) == *(char *)(lVar37 + 0x27))))))))) {
            iVar10 = inferred_window_475(lVar37 + 0x28,&local_280,0x20);
            if (iVar10 == 0) {
              if (*(char *)(lVar37 + 0x51) == '\0') {
                inferred_window_114(&local_98,&DAT_ram_000b837c);
                local_b8 = (longlong *)0x0;
                local_c0 = (longlong *)0x1;
                local_c8 = (longlong *)0x0;
                local_20 = &DAT_ram_000bcab8;
                local_28 = &local_c8;
                local_10 = 3;
                local_18 = 0x20;
                local_38 = 0;
                local_48[0] = 0;
                lVar21 = inferred_window_116(&DAT_ram_000b837c,local_48);
                if (lVar21 != 0) goto LAB_ram_00021ee0;
                local_198 = local_b8;
                local_1a0 = local_c0;
                local_1a8 = local_c8;
                local_1c0 = local_98;
                local_1b8 = local_90;
                local_1b0 = local_88;
                local_1d8 = (longlong *)0xb867a;
                local_148 = CONCAT44(local_148._4_4_,0x1777);
                local_190 = (longlong *)CONCAT71(local_190._1_7_,2);
                local_1c8 = CONCAT44(local_1c8._4_4_,0x7b);
                local_1d0 = (longlong *)0x2d;
                local_1e0 = (longlong *)0x0;
                inferred_window_284(&local_310,&local_1e0);
                plVar12 = local_310;
                plVar14 = local_308;
              }
              else {
                iVar10 = inferred_window_475(lVar21 + 0x28,&local_280,0x20);
                if (iVar10 == 0) {
                  if (*(char *)(lVar21 + 0x59) == '\0') {
                    inferred_window_114(&local_98,&DAT_ram_000b837c);
                    local_b8 = (longlong *)0x0;
                    local_c0 = (longlong *)0x1;
                    local_c8 = (longlong *)0x0;
                    local_20 = &DAT_ram_000bcab8;
                    local_28 = &local_c8;
                    local_10 = 3;
                    local_18 = 0x20;
                    local_38 = 0;
                    local_48[0] = 0;
                    lVar21 = inferred_window_116(&DAT_ram_000b837c,local_48);
                    if (lVar21 != 0) goto LAB_ram_00021ee0;
                    local_198 = local_b8;
                    local_1a0 = local_c0;
                    local_1a8 = local_c8;
                    local_1c0 = local_98;
                    local_1b8 = local_90;
                    local_1b0 = local_88;
                    local_1d8 = (longlong *)0xb867a;
                    local_148 = CONCAT44(local_148._4_4_,0x1777);
                    local_190 = (longlong *)CONCAT71(local_190._1_7_,2);
                    local_1c8 = CONCAT44(local_1c8._4_4_,0x84);
                    local_1d0 = (longlong *)0x2d;
                    local_1e0 = (longlong *)0x0;
                    inferred_window_284(&local_340,&local_1e0);
                    plVar12 = local_340;
                    plVar14 = local_338;
                  }
                  else {
                    inferred_window_110(&local_1e0);
                    plVar35 = local_1a0;
                    plVar12 = local_1e0;
                    plVar14 = local_1d8;
                    if ((int)local_158 != 2) {
                      inferred_window_111(&local_1e0,param_2 + 10);
                      plVar12 = local_1d8;
                      plVar14 = local_1d0;
                      if ((int)local_1e0 != 2) {
                        plVar12 = (longlong *)param_2[0x17];
                        lVar21 = *plVar12;
                        uVar25 = local_1b0 & 0xff;
                        lVar37 = param_2[0x16];
                        *plVar12 = lVar21 + 1;
                        if (lVar21 + 1 == 0) {
LAB_ram_00020190:
                    /* WARNING: Subroutine does not return */
                          abort();
                        }
                        plVar14 = (longlong *)param_2[0x18];
                        lVar21 = *plVar14;
                        *plVar14 = lVar21 + 1;
                        if (lVar21 + 1 == 0) goto LAB_ram_00020190;
                        plVar11 = (longlong *)param_2[0x11];
                        lVar39 = *plVar11;
                        plVar29 = (longlong *)param_2[0x10];
                        uVar2 = *(undefined1 *)((longlong)param_2 + 0xda);
                        uVar3 = *(undefined1 *)((longlong)param_2 + 0xd9);
                        lVar21 = param_2[0x1b];
                        plVar30 = (longlong *)param_2[0x1a];
                        uVar26 = param_2[0x19];
                        *plVar11 = lVar39 + 1;
                        if (lVar39 + 1 == 0) goto LAB_ram_00020190;
                        plVar15 = (longlong *)param_2[0x12];
                        lVar39 = *plVar15;
                        *plVar15 = lVar39 + 1;
                        if (lVar39 + 1 == 0) goto LAB_ram_00020190;
                        plVar16 = (longlong *)param_2[0xb];
                        lVar17 = *plVar16;
                        lVar31 = param_2[10];
                        uVar4 = *(undefined1 *)((longlong)param_2 + 0xaa);
                        uVar5 = *(undefined1 *)((longlong)param_2 + 0xa9);
                        lVar39 = param_2[0x15];
                        lVar32 = param_2[0x14];
                        lVar27 = param_2[0x13];
                        *plVar16 = lVar17 + 1;
                        if (lVar17 + 1 == 0) goto LAB_ram_00020190;
                        plVar18 = (longlong *)param_2[0xc];
                        lVar17 = *plVar18;
                        *plVar18 = lVar17 + 1;
                        if (lVar17 + 1 == 0) goto LAB_ram_00020190;
                        plVar19 = (longlong *)param_2[5];
                        lVar20 = *plVar19;
                        lVar33 = param_2[4];
                        uVar6 = *(undefined1 *)((longlong)param_2 + 0x7a);
                        uVar7 = *(undefined1 *)((longlong)param_2 + 0x79);
                        lVar17 = param_2[0xf];
                        lVar34 = param_2[0xe];
                        lVar28 = param_2[0xd];
                        *plVar19 = lVar20 + 1;
                        if (lVar20 + 1 == 0) goto LAB_ram_00020190;
                        plVar38 = (longlong *)param_2[6];
                        lVar20 = *plVar38;
                        *plVar38 = lVar20 + 1;
                        if (lVar20 + 1 == 0) goto LAB_ram_00020190;
                        lVar22 = param_2[7];
                        lVar23 = param_2[8];
                        lVar20 = param_2[9];
                        uVar8 = *(undefined1 *)((longlong)param_2 + 0x49);
                        uVar9 = *(undefined1 *)((longlong)param_2 + 0x4a);
                        inferred_window_040(auStack_108,*(undefined8 *)param_2[2]);
                        local_1a0 = (longlong *)
                                    CONCAT71(CONCAT61(CONCAT51(local_1a0._3_5_,uVar2),uVar3),
                                             (char)lVar21);
                        local_d0 = 0;
                        local_d8 = 8;
                        local_1d0 = (longlong *)0x0;
                        local_1d8 = (longlong *)&DAT_ram_00000008;
                        local_1e0 = (longlong *)0x0;
                        local_1c8 = lVar37;
                        local_1c0 = plVar12;
                        local_1b8 = plVar14;
                        local_1b0 = uVar26;
                        local_1a8 = plVar30;
                        local_198 = plVar29;
                        local_190 = plVar11;
                        local_188 = plVar15;
                        local_180 = lVar27;
                        local_178 = lVar32;
                        local_170 = (char)lVar39;
                        local_16f = uVar5;
                        local_16e = uVar4;
                        local_168 = lVar31;
                        local_160 = plVar16;
                        local_158 = plVar18;
                        local_150 = lVar28;
                        local_148 = lVar34;
                        local_140 = (char)lVar17;
                        local_13f = uVar7;
                        local_13e = uVar6;
                        local_138 = lVar33;
                        local_130 = plVar19;
                        local_128 = plVar38;
                        local_120 = lVar22;
                        local_118 = lVar23;
                        local_110 = (char)lVar20;
                        local_10f = uVar8;
                        local_10e = uVar9;
                        inferred_window_226(&local_350,&local_1e0,*(undefined8 *)(param_3 + 0x38),
                                            uVar25);
                        plVar12 = local_350;
                        plVar14 = local_348;
                        if (local_350 == (longlong *)0x2) {
                          inferred_window_110(&local_1e0,param_2 + 4);
                          plVar12 = local_1e0;
                          plVar14 = local_1d8;
                          if ((int)local_158 != 2) {
                            if (local_1a0 < plVar35) {
                              inferred_window_115(&local_390,8);
                              plVar12 = local_390;
                              plVar14 = local_388;
                            }
                            else {
                              lVar21 = (longlong)local_1a0 - (longlong)plVar35;
                              inferred_window_490(&local_360,lVar21,0,uVar1,0);
                              if (local_358 == 0) {
                                uVar25 = *(ulonglong *)(param_2[1] + 0x48);
                                if (uVar25 + lVar21 < uVar25) {
                                  inferred_window_115(&local_370,8);
                                  plVar12 = local_370;
                                  plVar14 = local_368;
                                  if (local_370 != (longlong *)0x2) goto LAB_ram_00020c68;
                                }
                                else {
                                  *(ulonglong *)(param_2[1] + 0x48) = uVar25 + lVar21;
                                }
                                uVar24 = *(undefined8 *)(*param_2 + 0x50);
                                uVar13 = *(undefined8 *)(*param_2 + 0x48);
                                param_1[4] = local_360 / 10000;
                                param_1[1] = uVar13;
                                param_1[2] = uVar24;
                                param_1[3] = lVar21;
                                uVar13 = 0;
                                goto LAB_ram_00020c80;
                              }
                              inferred_window_115(&local_380,8);
                              plVar12 = local_380;
                              plVar14 = local_378;
                            }
                          }
                        }
                      }
                    }
                  }
                }
                else {
                  inferred_window_114(&local_98,&DAT_ram_000b83b8);
                  local_b8 = (longlong *)0x0;
                  local_c0 = (longlong *)0x1;
                  local_c8 = (longlong *)0x0;
                  local_20 = &DAT_ram_000bcab8;
                  local_28 = &local_c8;
                  local_10 = 3;
                  local_18 = 0x20;
                  local_38 = 0;
                  local_48[0] = 0;
                  lVar21 = inferred_window_116(&DAT_ram_000b83b8,local_48);
                  if (lVar21 != 0) goto LAB_ram_00021ee0;
                  local_198 = local_b8;
                  local_1a0 = local_c0;
                  local_1a8 = local_c8;
                  local_1c0 = local_98;
                  local_1b8 = local_90;
                  local_1b0 = local_88;
                  local_1d8 = (longlong *)0xb867a;
                  local_148 = CONCAT44(local_148._4_4_,0x1776);
                  local_190 = (longlong *)CONCAT71(local_190._1_7_,2);
                  local_1c8 = CONCAT44(local_1c8._4_4_,0x7f);
                  local_1d0 = (longlong *)0x2d;
                  local_1e0 = (longlong *)0x0;
                  inferred_window_284(&local_320,&local_1e0);
                  lVar21 = *param_2;
                  local_1c8 = *(longlong *)(lVar21 + 0x40);
                  local_1d0 = *(longlong **)(lVar21 + 0x38);
                  local_1d8 = *(longlong **)(lVar21 + 0x30);
                  local_1e0 = *(longlong **)(lVar21 + 0x28);
                  local_1c0 = local_280;
                  local_1b8 = local_278;
                  local_1b0 = local_270;
                  local_1a8 = local_268;
                  inferred_window_287(&local_330,local_320,local_318,&local_1e0);
                  plVar12 = local_330;
                  plVar14 = local_328;
                }
              }
            }
            else {
              inferred_window_114(&local_98,&DAT_ram_000b83b8);
              local_b8 = (longlong *)0x0;
              local_c0 = (longlong *)0x1;
              local_c8 = (longlong *)0x0;
              local_20 = &DAT_ram_000bcab8;
              local_28 = &local_c8;
              local_10 = 3;
              local_18 = 0x20;
              local_38 = 0;
              local_48[0] = 0;
              lVar21 = inferred_window_116(&DAT_ram_000b83b8,local_48);
              if (lVar21 != 0) goto LAB_ram_00021ee0;
              local_198 = local_b8;
              local_1a0 = local_c0;
              local_1a8 = local_c8;
              local_1c0 = local_98;
              local_1b8 = local_90;
              local_1b0 = local_88;
              local_1d8 = (longlong *)0xb867a;
              local_148 = CONCAT44(local_148._4_4_,0x1776);
              local_190 = (longlong *)CONCAT71(local_190._1_7_,2);
              local_1c8 = CONCAT44(local_1c8._4_4_,0x76);
              local_1d0 = (longlong *)0x2d;
              local_1e0 = (longlong *)0x0;
              inferred_window_284(&local_2f0,&local_1e0);
              lVar21 = param_2[1];
              local_1c8 = *(longlong *)(lVar21 + 0x40);
              local_1d0 = *(longlong **)(lVar21 + 0x38);
              local_1d8 = *(longlong **)(lVar21 + 0x30);
              local_1e0 = *(longlong **)(lVar21 + 0x28);
              local_1c0 = local_280;
              local_1b8 = local_278;
              local_1b0 = local_270;
              local_1a8 = local_268;
              inferred_window_287(&local_300,local_2f0,local_2e8,&local_1e0);
              plVar12 = local_300;
              plVar14 = local_2f8;
            }
          }
          else {
            inferred_window_114(&local_98,&DAT_ram_000b83ac);
            local_b8 = (longlong *)0x0;
            local_c0 = (longlong *)0x1;
            local_c8 = (longlong *)0x0;
            local_20 = &DAT_ram_000bcab8;
            local_28 = &local_c8;
            local_10 = 3;
            local_18 = 0x20;
            local_38 = 0;
            local_48[0] = 0;
            lVar21 = inferred_window_116(&DAT_ram_000b83ac,local_48);
            if (lVar21 != 0) goto LAB_ram_00021ee0;
            local_198 = local_b8;
            local_1a0 = local_c0;
            local_1a8 = local_c8;
            local_1c0 = local_98;
            local_1b8 = local_90;
            local_1b0 = local_88;
            local_1d8 = (longlong *)0xb867a;
            local_148 = CONCAT44(local_148._4_4_,0x1772);
            local_190 = (longlong *)CONCAT71(local_190._1_7_,2);
            local_1c8 = CONCAT44(local_1c8._4_4_,0x6e);
            local_1d0 = (longlong *)0x2d;
            local_1e0 = (longlong *)0x0;
            inferred_window_284(&local_2e0,&local_1e0);
            plVar12 = local_2e0;
            plVar14 = local_2d8;
          }
        }
        else {
          inferred_window_114(&local_98,&DAT_ram_000b83ac);
          local_b8 = (longlong *)0x0;
          local_c0 = (longlong *)0x1;
          local_c8 = (longlong *)0x0;
          local_20 = &DAT_ram_000bcab8;
          local_28 = &local_c8;
          local_10 = 3;
          local_18 = 0x20;
          local_38 = 0;
          local_48[0] = 0;
          lVar21 = inferred_window_116(&DAT_ram_000b83ac,local_48);
          if (lVar21 != 0) {
LAB_ram_00021ee0:
                    /* WARNING: Subroutine does not return */
            inferred_window_406("a Display implementation returned an error unexpectedly/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/slice/sort/stable/quicksort.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/slice.rsError/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/collections/btree/navigate.rs/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/raw_vec.rsMaxSeedLengthExceededInvalidSeedsIllegalOwnerTryFromIntErrorUnexpected variant index: CustomInvalidArgumentInvalidInstructionDataInvalidAccountDataAccountDataTooSmallInsufficientFundsIncorrectProgramIdMissingRequiredSignatureAccountAlreadyInitializedUninitializedAccountNotEnoughAccountKeysAccountBorrowFailedBorshIoErrorAccountNotRentExemptUnsupportedSysvarMaxAccountsDataAllocationsExceededInvalidReallocMaxInstructionTraceLengthExceededBuiltinProgramsMustConsumeComputeUnitsInvalidAccountOwnerArithmeticOverflowImmutableIncorrectAuthority/home/runner/work/platform-tools/platform-tools/out/rust/library/core/src/iter/traits/iterator.rs"
                                ,0x37,&uStack_1,&DAT_ram_000bcae8,&DAT_ram_000bcb08);
          }
          local_198 = local_b8;
          local_1a0 = local_c0;
          local_1a8 = local_c8;
          local_1c0 = local_98;
          local_1b8 = local_90;
          local_1b0 = local_88;
          local_1d8 = (longlong *)0xb867a;
          local_148 = CONCAT44(local_148._4_4_,0x1772);
          local_190 = (longlong *)CONCAT71(local_190._1_7_,2);
          local_1c8 = CONCAT44(local_1c8._4_4_,0x66);
          local_1d0 = (longlong *)0x2d;
          local_1e0 = (longlong *)0x0;
          inferred_window_284(&local_2d0,&local_1e0);
          plVar12 = local_2d0;
          plVar14 = local_2c8;
        }
      }
    }
  }
LAB_ram_00020c68:
  param_1[2] = plVar14;
  param_1[1] = plVar12;
  uVar13 = 1;
LAB_ram_00020c80:
  *param_1 = uVar13;
  inferred_window_051(param_2);
  return;
}

