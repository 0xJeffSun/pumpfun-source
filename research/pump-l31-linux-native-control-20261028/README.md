# Native Linux SBPF control for Pump L31

Two fresh native Linux SDK v1.44 builds of the unchanged published L31 source reproduce identical stripped/unstripped images and all 990 normalized matches, with no normalized losses. Raw matches are 164 on this host versus 166 in the published macOS artifact; whole ELF equality remains false. This is a build/coverage control, not a new source frontier or a runtime qualification.

The builder can explicitly select the native SDK's sbpf-solana-solana target without replacing native tools or target libraries. Its default remains sbf-solana-solana. It rejects target/profile disagreement and an unsupported unprofiled SBPF dependency cache before staging. Receipts record the selected target/library hashes and verify those libraries remain unchanged. The first build predates those extra receipt fields; its exact builder revision is archived. Both builds use the same compiler inputs and produce identical images.

Native libraries equal the official v1.44 SBPF set. Complete compiled-source archives, both builder revisions, compiler receipts, ELF artifacts and independent normalization are retained. No original bytes enter compilation, linker ordering or output editing. Original window boundaries are analysis inputs only.
