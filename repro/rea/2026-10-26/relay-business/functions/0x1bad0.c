// rea decompile_all
// name: inferred_window_103
// address: 0x1bad0
// body: available
// range: 0x1bad0-0x1bd6f inclusive
// non_contiguous: false
// provider: Ghidra 12.1.4 (ghidra)
// analysis_profile: 9cbacfa91f2916b9e68d7bdb64eea2f4d67c002ac915cf1aa7e0c4802ad792de
// limitations: Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.; The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.; The imported Program and temporary project are ephemeral and deleted on close. Annotation operations edit session database metadata; original executable bytes are never written.; Cancelling an active Ghidra request terminates its ephemeral database and discards session annotations. The selected target remains open; the next provider query imports the original artifact again.; Default-space addresses use lowercase 0x-prefixed hexadecimal; other address spaces use <percent-encoded-space>:0x<hex>.; macOS sessions require a matching executable Ghidra native decompiler; REA checks for it but does not build native components or change Gatekeeper quarantine state.; Ghidra analysis was seeded before auto-analysis from /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/rea/2026-10-26/relay-seeds.tsv (sha256 46478db8da45af2e0bdf3e5caaa9b787ba6255d9dd1f88067d9bc0a3fb08eea9: 492 function, 0 code, 0 label entries). Seeded functions, code and names are caller assertions, not Ghidra discoveries.; Seed outcome: 490 functions created, 2 already present, 0 failed; 0 code seeds decoded, 0 failed; 0 labels applied, 0 failed; 0 seeds outside initialized memory.; Pseudocode is Ghidra decompiler output, not original source and not text-equivalent to Hopper output.; External functions and functions without an analyzable body return null; other decompiler failures remain explicit.
// pseudocode: provider-specific; not original source


ulonglong inferred_window_103(undefined8 param_1,undefined8 param_2)

{
  int iVar1;
  longlong local_48;
  ulonglong local_40;
  undefined8 local_38;
  undefined1 local_30;
  undefined4 uStack_28;
  undefined3 uStack_24;
  undefined4 local_20;
  undefined3 uStack_1c;
  undefined8 local_19;
  undefined8 local_11;
  undefined8 local_9;
  undefined1 local_1;
  
  iVar1 = inferred_window_475(param_2,&DAT_ram_000b7d80,0x20);
  if (iVar1 == 0) {
    local_38 = 0xf0a09855;
    local_11 = 0x3beb1adc39c4da35;
    local_19 = 0xc01846637f68fb84;
    uStack_24 = 0x81abfe;
    uStack_28 = 0x57889b06;
    local_30 = 1;
  }
  else {
    iVar1 = inferred_window_475(param_2,&DAT_ram_000b7e00,0x20);
    if (iVar1 != 0) {
      inferred_window_115(&local_48,0x1d);
      if (local_48 != 2) {
        if (local_48 == 0) {
          local_40 = 0;
        }
        else {
          local_40 = 0;
        }
      }
      goto LAB_ram_0001bba0;
    }
    local_38 = 0x5b3e5cd849dfc919;
    local_11 = 0xfa90ad4a26bbc68a;
    local_19 = 0x1ee976a4047caab8;
    uStack_24 = 0xe65fde;
    uStack_28 = 0x9ffc0d83;
    local_30 = 0x5e;
  }
  local_1 = local_30;
  local_9 = local_38;
  local_20 = uStack_28;
  uStack_1c = uStack_24;
  iVar1 = inferred_window_475(&local_20,param_1,0x20);
  local_40 = 1;
  if (iVar1 != 0) {
    local_40 = 0;
  }
LAB_ram_0001bba0:
  return local_40 & 1;
}

