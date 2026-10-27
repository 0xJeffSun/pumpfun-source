# Main Pump loader-account fixture

The captured main program is owned by the upgradeable BPF loader. Its executable program account is 36 bytes and points to a 10,485,760-byte ProgramData account. Loading the extracted 10,485,715-byte payload with LiteSVM `add_program_from_file` instead creates a legacy-loader executable account whose data is the entire ELF allocation. That changes CPI account serialization cost.

`captured_loader.py` sets the captured 36-byte program data and ProgramData header directly, loads code through that upgradeable relationship, and preserves each source-built ELF prefix. Unused candidate allocation is zero-filled to the captured capacity. No original or compiled ELF file is modified. The synthetic program account uses rent-minimum lamports, while ProgramData keeps captured lamports. Only the main Pump loader setup changes; companion programs keep their existing fixture setup. The clock slot is advanced beyond captured deployment while fixture epoch/timestamps are retained.

Evidence:

- `metadata-only.json.gz`: a normally signed cashback transaction succeeds for both programs without any raw-loader preloading.
- `invalid-programdata-control.log`: a separate metadata-only control with zero ELF bytes is rejected by `set_account` with `invalid account data for instruction`. The successful test is therefore not explained by a stale, preloaded Pump executable.
- `route-cu.json.gz` and `route-cu-loader.json`: ordinary, first-curve completion, and dual completion all match in errors, account state, CPI trace and events at both the default 200,000 and explicit 600,000 compute limits. All 12 program loads use the captured owner and allocation. Instruction costs still differ; this is not a byte-identity claim.

These are local, synthetic-state tests against a captured deployment. They do not establish live-chain acceptance, historical toolchain identity, or full ELF equality. Earlier legacy-loader and equal-raw-allocation results remain retained, with their narrower fixture interpretation.
