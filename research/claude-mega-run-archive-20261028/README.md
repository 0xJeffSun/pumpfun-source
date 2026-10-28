# Claude mega-run archive (snapshot 2026-10-28 04:08 PDT; last lane event 03:58)

Work-in-progress snapshot of every Claude conversation and sub-agent active on this project in the
two hours before 04:00 PDT on 2026-10-28. It was collected so that work living only on local disk
is on GitHub, even where incomplete. Nothing here changes `programs/`; it is a research archive
in a new root, and no existing packet is modified.

Sources (all local, read-only copies):

| Dir | From | What |
| --- | --- | --- |
| `coordinator/` | `mega-run/` | LEDGER, RULES, BASES, LANES(-B), MECHANISMS, EVENTS.log, `state/`, every lane's TASK.md / PROGRESS.md |
| `pump/L30-to-L31.patch` | `claude-pump-work/base/L30 -> L31` | Pump L31 composite (990/1035, raw 166; BASE 03:54), not yet in a PR (#435 = L30) |
| `pump/deliveries/mg-P-*` | `claude-pump-work/deliveries` | every mega-run Pump delivery incl. full `src/` tree (deduplicated: repeated files are listed in MANIFEST `dups`) |
| `binaries/` | delivery, `WIN*`, `BEST*`/`best*` dirs | result `.so` builds (candidate + unstripped), gzip -n; MANIFEST `binaries` gives each original path, size and sha1 |
| `pump/shared/` | `claude-pump-work/shared` | LANE-RULES.md, INSIGHTS-R5.md |
| `pump/mg-P-int-untracked/` | mg-P-int worktree | untracked `test-mig-c30` packet |
| `amm/union-758-to-760.patch` | `amm100-run/lanes/mg-union` | AMM union-760 (765/785 Linux source-only; BASE 03:57), not yet in a PR (#434 = union-758) |
| `amm/wins/` | `amm100-run/shared/wins` | every mg-A-* win patch + json (incl. mg-A-sp1-02, mg-A-res1-03 not yet composed) |
| `mayhem/FINDINGS.md` | `claude-mayhem-work/r436` | Mayhem findings (Mayhem is 441/441 normalized + raw, PR #432) |
| `lanes/<contract>/<lane>/` | each lane work dir | lane notes, tools, scorer output, IR experiments, BEST / BEST-partial trees and novel `.rs` variants |

Lane filter: text files <= 1 MB (`.ld` <= 5 MB, `.md .json .py .sh .patch .diff .txt .toml .rs .log .csv .yaml`); json > 300 KB,
log > 200 KB, toml > 20 KB, intermediate experiment `.so` builds (~2 GB unique, rebuildable from the stored source + recipes), build dirs (`target*`, `work*` build output kept only if text),
virtualenvs, decompiler dumps and git worktrees are skipped. `.rs` files whose content already exists in a Pump
base/delivery or AMM union base are skipped. Identical files are stored once; `MANIFEST.json` lists every stored
file's sha1, the source dir of each subtree, and each duplicate path -> stored copy.

Sessions covered: coordinator 30698782 (mega run, ~50 sub-agents), fleet B 3ce6d947 (7 sub-agents), previous
coordinator 38f6d223. Two Hyperliquid research chats in the same project wrote analysis scripts and downloaded third-party binaries into their session scratchpad; that scratchpad is now empty (verified 04:08), so nothing from them survives on disk. Their findings exist only in those transcripts.

Status at snapshot: Mayhem 441/441 (done, merged). Pump L31 990/1035 source-only. AMM union-760 765/785 Linux.
EVENTS.log shows no lane activity after 03:58; this snapshot was re-collected at 04:08.
