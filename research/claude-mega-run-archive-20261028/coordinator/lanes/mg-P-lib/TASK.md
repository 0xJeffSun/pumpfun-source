# Lane mg-P-lib
Read first: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/RULES.md` (shared rules + purpose), `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/BASES.md` (current bases; re-read at every checkpoint),
then the contract rules file below. MR rules and BASES.md override older frontier/base numbers in contract files.
Progress file: `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/lanes/mg-P-lib/PROGRESS.md` (create it now; keep it current; a restarted lane resumes from it).
Contract rules: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/LANE-RULES.md` (tools `harness/fastbuild.py`, `score.py`, `win.py`, `coords.py`, `triage.py`;
runtime-validity gate; line-neutral editing on the layout base; delivery format). Shared insights:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/shared/INSIGHTS-R5.md` (read it first; append `[mg-P-lib] 0xADDR: ...` lines). Earlier rounds' notes:
`/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lane-triage/`, `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/*/PROGRESS.md`.

Work dir: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-lib/` (src/, work/). Build: `python3 /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness/fastbuild.py --src /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-lib/src
--work /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-lib/work` (identity recipe, shared 6-slot pool `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/locks`).
Start point: delivery `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/r5-libinst-06` (cumulative: L12 + that round-5 lane's gains). `cp -c -R /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/r5-libinst-06/src /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-lib/src`; score with `--baseline /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/r5-libinst-06/score.json` (gains/losses relative to your start).
Windows (9):
  - 0x60ee0  1128 B  equal-len; nearest _<alloc::vec::Vec<T> as borsh::de::BorshDeserialize>::deserialize_read (139 slots)
  - 0x63cf0  1640 B  equal-len; nearest _<std::io::error::ErrorKind as core::fmt::Debug>::fmt (200 slots)
  - 0x806c8  1840 B  equal-len; nearest anchor_lang::accounts::account::Account<T>::exit_with_expected_owner (225 slots)
  - 0x80df8  2120 B  equal-len; nearest _<alloc::vec::Vec<T> as borsh::de::BorshDeserialize>::deserialize_read (257 slots)
  - 0x93050  2120 B  equal-len; nearest _<alloc::vec::Vec<T> as borsh::de::BorshDeserialize>::deserialize_read (264 slots)
  - 0x940c0  2120 B  equal-len; nearest _<alloc::vec::Vec<T> as borsh::de::BorshDeserialize>::deserialize_read (264 slots)
  - 0x9b148  744 B  equal-len; nearest _<pump_recovered::quote_control::state::QuoteControl as anchor_lang::A (87 slots)
  - 0x9b430  624 B  equal-len; nearest solana_borsh::v1::get_instance_packed_len (75 slots)
  - 0x17c850  664 B  equal-len; nearest _<anchor_lang::accounts::sysvar::Sysvar<T> as anchor_lang::Accounts<B> (83 slots)
Prior work on these windows: `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/r5-libinst/PROGRESS.md` (library instantiations: borsh Vec deserializers, ErrorKind Debug, exit_with_expected_owner, Sysvar try_accounts). Read those PROGRESS.md files before building anything.
Deliver: on every net gain (gains>0, losses==[], raw_losses==[], runtime_valid true) write `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/mg-P-lib-NN/` in
the LANE-RULES delivery format (cumulative; `base_round: "r5-libinst-06"`, base_unstripped_sha256 of your start;
`synthetic_layout` true if your tree carries synthetic layout, which deliveries r5-z00-03 and r5-z02-02 already do), and
append the WIN line to `/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log`. Window lanes never commit or push; mg-P-int composes deliveries.
Rebase: when BASES.md lists L13 (lane mg-P-int), port your diff onto `/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L13/pump` when convenient and continue there.
Peer insight still applies per window only: the data-first error-path rule in LANE-RULES.md.
