# Separate legacy buy modes at compilation

Legacy buy and buy_exact_sol_in previously passed an extra runtime exact-mode flag to one shared source routine. The proposal makes that existing mode a const generic and updates the two callers. The original 1,768-byte instruction wrappers at 0x12a4e0 and 0x12abc8 pass no such runtime flag; both now match as normalized instruction windows. Native Linux research matches rise from 779 to 781 / 1,035, retaining all 779 earlier matches.

Both modes retain the same source expressions and branch conditions, with the exact-mode value bound at compilation. This is a source proposal, not proof of the original historical source form. Maintained source and checkpoint are unchanged. The original deployed ELF is still different; normalized matches mask call offsets and relocated pointers.

Fresh repeated builds produce identical stripped and unstripped artifacts. The bounded graph from both wrappers visits 152 matching pairs and 783 edges, with four open edges, including the still-unmatched buy bodies. Thus matching these wrappers does not establish matching handlers or complete runtime/data identity. Full sources, native outputs, compiler records, proposal patch and an independent verifier are retained.
