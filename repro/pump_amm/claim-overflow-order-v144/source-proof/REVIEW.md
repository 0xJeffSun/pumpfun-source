# AMM claim handler: post-transfer overflow ordering

The minimal source-only proposal in `proposal.patch` computes the new claimed total before clearing unclaimed rewards. It leaves the three accepted context declarations, reward algorithm, token transfer, event fields and other source unchanged. This is an ordering correction supported by complete original/current handler windows, not a claim to close the entire4168-versus6784-byte mismatch. No build, target execution, main edit, artificial source location or compiler variation occurred.

## Concrete original evidence

Original Claim handler is the admitted window0x5a570..0x5b5b8 (4168 bytes). Current is symbol-named0xb1a80..0xb3500 (6784 bytes). The corrected parser/wrapper/exit and initializer-closure ledger rows remain preserved separately in `context-preservation.json`. Original window boundaries are admitted inferred boundaries, not asserted historical symbols.

After the original token CPI call0x5a950→0x727b8 and success/error cleanup,0x5a9e0 loads unclaimed rewards from context+0x2b8 and0x5a9e8 loads total claimed from+0x2c0. The addition at0x5a9f8 is tested for unsigned wrap at0x5aa10. Its failure path loads the original location object at0x5aa28 and calls the overflow panic at0x5aa38→0x112680. That branch does not clear unclaimed rewards. The successful edge is0x5aa20→0x5ab00; only then are timestamp, flags and total updated, followed by the first unclaimed clear at0x5ab68.

Current source instead begins the update sequence with `u.total_unclaimed_tokens=0;u.total_claimed_tokens+=amount`. The compiled candidate computes the addition at0xb2520, but clears context+0x2b8 at0xb2540 before the overflow branch0xb2558. Its panic helper0x1094b8 is an ordinary add-overflow panic. Thus the unclaimed clear occurs on an addition-overflow path in the current implementation and not in the original implementation.

The proposed local `let total_claimed_tokens=u.total_claimed_tokens+amount;` evaluates the existing checked `+` before any accumulator assignment, then uses the computed total in the existing assignment sequence. It neither changes overflow arithmetic/error class nor introduces checked_add/expect text or diagnostic coordinates. Successful state values stay the same. Runtime transaction rollback means no persisted-account difference is claimed for this panic; the supported difference is execution/mutation order inside the failing handler. Any compiled ordering must be verified after an authorized build.

## Broader trace and unresolved evidence

| Phase | Original evidence | Current source/candidate | Assessment |
|---|---|---|---|
| Clock/user identity |Clock0x5a598; four user-key stores0x5a5e0..0x5a5f8|Clock0xb1aa0; four stores0xb1af0..0xb1b08|Same high-level ordering; full handler bodies differ.|
| Reward update |0x5a640→0x6d408; g data context+0x2f8, u data+0x298, timestamp, amount0|Inline reset/conversions/day/reward block|Original separate1816-byte function retained. Only one admitted direct caller, so function extraction alone is not justified as a source correction.|
| Day/reward arithmetic |Updater checks signed timestamps/period; converts with `SVM is 64-bit`; divides previous/today; checks end day then bounds; uses u128 multiply/divide; truncation6024 and checked unclaimed addition|Current equivalent constructs retained|No new differing arithmetic result proven. Exact source method identity and broad helper equivalence remain unresolved.|
| Zero-volume global update |Original updater reads/writes today's global volume and user volume using amount0, with overflow checks before stores|Current reads today's global bucket, updates timestamp/needs_claim without adding0|Original source takes mutable global state; amount is provably0 at this call. A broad reusable helper or irrelevant add0 writes are not proposed merely to change compilation.|
| No rewards |0x5a670 branches to0x5aa40; exact18-byte message at0x11ce15|Current `No tokens to claim` early success|No correction identified.|
| Token CPI |Original0x5a950→0x727b8,2400-byte helper; signed seed and mint/token account roles visible in handler|Current0xe5b80,2192-byte anchor_spl token2022::transfer_checked|Both complete immediate helper bodies retained. Exact ownership/error/preparation differences remain unresolved; no helper substitution proposed.|
| Post-CPI state |Overflow precedes all accumulator writes|Unclaimed cleared before overflow branch|Narrow proposed correction.|
| Event/log/self-CPI |Original constructs112-byte event, log-data helper0x106a80, Instruction::new_with_bytes0x10db50 and invoke_signed0x106ab8; allocator/error/drop paths retained|Current same event source with emitted clone/log/self-CPI and separate generated closure|Source fields remain untouched; complete event serializer and data closure equality not claimed.|

The original reset clears has_total_claimed and total_claimed only when last_update<start and now<start. Its reward branch checks previous<today, previous<=end_day, global SOL bucket>0 and user SOL volume>0 before reward arithmetic. Reward conversion overflow returns the retained6024 error, while u64 addition overflow panics with `Unexpected overflow`. The current source has these same broad semantic constructs. This table does not assert every error object/diagnostic byte, dynamic branch feasibility, allocation lifetime or call ABI matches.

Original post-transfer has_total_claimed is calculated from the new total rather than spelled constant true. Because amount>0 here and overflow has been rejected, successful new total cannot be0; changing that expression is not necessary for semantics and is intentionally excluded. Timestamp and flag store ordering also differs, but no additional failing operation between those successful stores is proved. The patch does not reshape that sequence.

## Retained evidence and verification

`original.asm`, `candidate.asm`, `updater-original.asm` and per-side directories retain complete handlers and all immediate target windows, including CPI and allocator helpers. `rows.json` retains their complete call, branch, relocation and wide-immediate ledger records. Those data references preserve uncertainty: unbounded pointed-to extents are not promoted into equality claims. `bindings.json` binds the original ELF, tested candidate/symbol ELF, full latest ledger and exact accepted source.

`python3 -B work/amm-claim-handler-next/verify.py --repo .` checks the package seal, optional live evidence bindings, instruction/branch witnesses, constructor-context preservation and exact one-update-sequence source diff. This performs no build or target execution. The proposal requires root review before any isolated build.
