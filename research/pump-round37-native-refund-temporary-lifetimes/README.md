# Native Round37 refund temporary lifetimes

This isolates the ordinary refund form in upstream PR425 (0392d3fd25fe1e383346e3f9a6686250fff52529) onto the exact safe PR420 source. It adds no synthetic layout or source-coordinate placement. Only the two existing refund helper expressions change; all 58 inputs, physical newlines, lib.rs, namespaces and generated references are checked. A local Rust adapter extends the temporary mint key and bump-array borrows through the actual transfer call.

Two official Linux SDK1.44 SBPF root builds reproduce BOTH complete outputs: deployment 07224bc5f9216a7c140950928e6361203946dcc245e68679b042649008acccbd, symbols 2db696ec2d2ccf44ec703a2df2d3de004e45b71397299b7a6fd9486c69c5fe83. Dependencies were restored from 254 Cargo.lock-verified archives and freshly compiled in the earlier negative inline-bump control; these two root builds use that warm cache. All 2,775 SDK file byte checks and all source checks hold. The simpler inline-bump control retains756 but does not match either refund body.

758/1035 injective and membership normalized matches,131raw; exactly300808 and353880 gained and all old sets held. Both complete384byte roots route their actual +336 calls to the equal complete1256byte transfer helper. Their counted14byte pool-authority literals agree. Four actual scalar/call/callee/literal mutations must reject. The default verifier is self-contained stdlib only; optimized Python rejects.

Static only: ZERO fresh VM cases, no reused runtime receipts. The earlier private finite audit belongs to the older PR420 artifact and is not runtime or all-value evidence for this candidate. No signer/PDA/account-validation/CPI/recursive/runtime/whole identity proof. Selected sources, checkpoints, frozen scripts/workflows and ledgers remain unchanged; whole core0/4.

Run python -B verify.py. All captured bytes are losslessly archived and hash-bound. Original ELF is comparison input only, never compiler/linker input or rewritten output.
