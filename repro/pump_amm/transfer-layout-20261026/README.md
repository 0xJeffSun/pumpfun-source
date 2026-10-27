# Transfer creator vault account layout trial

Changed only the two `coin_creator_vault_ata` fields from boxed to inline InterfaceAccount. The current 512-window baseline builds to candidate `edf552828f732a985bbbb12d340c5ca92af68801c4c494fe1c270310f4b86eac`, still 512/785 normalized and 113 raw, with zero gains and losses. Unpromoted; no runtime claim.

Original exits 0x97a68 and 0x9a518 are 400 bytes. Both access owner at context+128 and AccountInfo at+160. Boxed baseline has 392-byte exits with one pointer load, then owner+0/info+32. The inline trial restores the original 400-byte instruction shape but produces owner/info offsets152/184 (legacy) and168/200 (V2). Remaining instructions match under retained relocation/call normalization. Another context layout distinction remains unresolved.

source.patch, exit-evidence.json and delta.json preserve the bounded source experiment. results/ includes complete source snapshot, actual candidate and symbols, build records/log, measurement and hash manifest.

## Full supported context correction

`full-source.patch` additionally inlines the mint and owns coin_creator, coin_creator_vault_authority, and pump_creator_vault as AccountInfo in both contexts. Typed program fields are retained. Candidate `0a01e88142eb1886a236b24dbeb3f832cfe2a0c87ab4c2f8e7324b681942b45d` reaches **519/785 normalized, 115 raw: seven gains, zero losses** against the maintained512 baseline. New roots: drop bodies0x8bd8/0x8e60, both exits0x97a68/0x9a518, V2parser0x97bf8, and entry wrappers0xec230/0xec4c0.

The V2parser has71/71 matched immediate call destinations; both exits5/5. Legacy entry wrapper has3/5 and V2 wrapper4/5; unresolved immediate dependencies and masked data references remain in full-immediate-edges.json. This is not full byte or transitive/data identity. No runtime acceptance is claimed here. Full build artifacts, source and manifest are retained under full-results/.
