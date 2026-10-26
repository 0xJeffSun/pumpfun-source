# Current source applicability with portable Relay signature proof

The original pass24 source-applicability script remains byte-preserved. This current companion changes exactly one literal subprocess call: Relay13 selection is validated through the separately reviewed portable saved-byte/signature checker instead of comparing the current host's native library to the historical Darwin runtime. Every historical/source-delta assertion preceding that call remains identical.

The new checker validates actual current selection/source/artifact bindings, preserves the historical runtime-provenance records, retains unchanged ordinary structural/effect checks and independently re-verifies all50 encoded signatures using the pinned current verification engine. It constructs no VM or new transaction and does not claim that historical native bytes match the current host. New borrow-failure and application-2006 execution coverage remains zero.
