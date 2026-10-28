# Qualified437 parser account-name intervals

This packet adds **125 direct-call observations**, covering **43 distinct field names** and **774 previously uncovered `.rodata` bytes** relative to the published current437 data-coverage inventory. O0124 contributes 46 sites, O0134 40 and O0136 39. The union rises from 1,724 to 2,498 of 18,396 `.rodata` bytes. `coverage-delta.json` is separate; the inventory remains unchanged. This delta does not incorporate the separately published error-name or error-message deltas and must be unioned, not summed, with other work.

The selected parser pairs are O0124 (BuyPumpSwap, original 287608, candidate 225344), O0134 (BuyV2, 378584 / 312264) and O0136 (SellV2, 400192 / 333872). Their existing selected-data relation is recomputed before these checks. Each selected original and candidate site has a relocated pointer loaded into r3, an immediate length in r4, and a direct call immediately afterwards. The matched call target is an active pair whose candidate symbol is `anchor_lang::error::Error::with_account_name`. Branches into the interior of that sequence are excluded. Both lengths and the bytes at those explicit lengths are compared; source fields provide a semantic cross-check. No length comes from NUL bytes or adjacent pointers. Each interval is bounded by `.rodata` and has no relocations.

The archived `anchor-syn` generator maps non-init account parse failures through `with_account_name` using the field identifier, and the archived Anchor error source declares that helper. The observations also include calls from constraint handling: the proof establishes their direct counted arguments and checks the name occurs as a field in the corresponding archived struct, but does not claim a one-to-one mapping from each instruction to a particular source statement. It does not establish reachability, complete parser behavior, allocator behavior, or whole-ELF equality. Other references, including calls with different setup or branches into the sequence, remain uncredited. No formatter piece-arrays are analyzed.

`observations.json.gz` records each owner, name, both pointers, lengths, instruction offsets and call targets. `inputs.json` pins the prior proof dependencies, source archive, image inputs and baseline inventory. `manifest.json` inventories this packet. No relocation-record coverage or full allocation extent is claimed.

Run from the repository root:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-account-names-20261028/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-account-names-20261028/test_verify.py
```

Mutation controls change each selected candidate payload, pointer operand and length operand. Additional checks exercise full inspection, the byte immediately after a counted interval, packet integrity and report changes after resealing. The proof is static; no executable or mainnet transaction runs.
