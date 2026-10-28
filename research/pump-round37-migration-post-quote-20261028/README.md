# Legacy migration post-completion quote funding

The original migration performs checked addition of real quote reserves and post_complete_quote_in before checked subtraction of the migration fee. The recovered handler omitted that post-completion balance. The fix restores the two operations and their original Overflow source coordinates, migrate.rs:280 and 282. The corresponding original 520-byte error callbacks at 0x410b0 and 0x412b8 now both match after normalization. Moving the subtraction error alone displaced the old match; that trial was rejected.

The research frontier is 794 / 1,035, retaining every prior 793 match. Fresh repeated builds produce identical stripped/unstripped artifacts. A separate 20-case probe checks zero/nonzero post-completion quote balances, funded/unfunded accounts, boost controls and overflow boundaries against the actual original. All candidate cases pass; the previous 793 candidate differs in 14 cases, including three diagnostic differences. These are bounded controls and can overlap other suites.

The existing 228-case migration suite is recorded separately. Full sources, build inputs, callback direct-call graph, source proposal and runtime receipts are archived. The maintained Round37 checkpoint is unchanged. No original executable bytes enter compilation or output editing. Whole original ELF equality remains false.
