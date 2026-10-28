# mg-P-z00-03: L15 port of mg-P-z00-02 (+0x1db88 update_metadata_authority, +0x1c880 mint_supply) -> 974/1035, raw 165

Same create_v2.rs change as mg-P-z00-02 (see its README), applied as a patch onto base L15's create_v2.rs
(clean apply: L15 only changed walk's root_seed call/definition, lines 417/452-459, untouched by this change).
Scored against base/L15/inventory.json: gains 0x1c880 0x1db88, no losses, raw 165, runtime_valid, no stack warnings.
