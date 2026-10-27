# Checked-in source verification in shallow checkouts

The archived `donation-wrapper-source-proposal` package records immutable
revision/path/SHA-256 provenance for its public compiler inputs. Its original
materializer uses `git show REV:PATH`. A depth-one CI checkout can contain the
correct checked-in path while lacking `REV`; that lookup fails before the linked
ELF verifier can check its source hashes. This failure was reproduced in a small
local depth-one Git fixture, without fetching repository history.

`source_checkout.py` reconstructs the same three 60-input variants directly from
those checked-in paths. It first authenticates the **unchanged original source
package manifest**, checks every manifest member and exact membership, and then
checks every baseline SHA-256, complete variant map and reversible source patch.
The recorded revisions remain immutable provenance. Missing or changed files
fail: there is no Git/network fallback, path search, alternate source set or
silently accepted current source. Absolute/traversal paths and symlinks are
rejected, including symlinked ancestors. The loader invokes no subprocess and
reads no compiler output or runtime/build receipt.

Only the linked verifier uses this additional loader. The archived wrapper
package and its historical verification-code pins remain unchanged. The linked
package manifest and its canonical-selection/status dependants explicitly bind
this reviewed verifier change; program source hashes, original/candidate bytes,
linker recipe, recorded builds and runtime evidence are unchanged.

Run the source-only regression independently of Git history and target artifacts:

```sh
python3 -I -B repro/donation-relay/linked-elf-reproduction/test_source_checkout.py
```

The ten tests include a real depth-one clone of a tiny locally generated fixture,
an export without `.git` or subprocess access, exact full source maps, corrupted
and missing source, a changed manifest, unsafe paths and symlinks. They do not
execute a compiler, SBF program or VM. Full linked/portable verification remains a
separate existing CI step; passing these tests alone is not fresh runtime proof.
