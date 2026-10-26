# Collector v2 reproducible build

Rebuilds the existing **unselected** collector candidate from its exact 37-source
snapshot. Fresh builds reproduce both complete tested outputs:

| Output | Bytes | SHA-256 |
| --- | ---: | --- |
| Executable | 1,590,856 | `fdfdb5f27af9b8c22effd48ea523c06bd037ceedf49df0da8178cad19eed38f5` |
| Unstripped symbols | 2,174,728 | `1e088e9add0218ebf6745a7f7557a4dc55dc68e86ec97790584db7f169c14bc3` |

## Run

Requires Darwin ARM64, Python 3.12+, the recorded v1.52 platform-tools cache
(its stripper is hash-checked), and the SDK's Criterion v2.3.2 cache. Preparation
downloads authenticated v1.44 compiler tools, Agave 2.1.21 and Rustup 1.29.0,
installs host Cargo 1.94.0 privately, and fetches the unchanged locked dependency
graph. Existing global toolchain aliases are preserved. The SDK-required v1.44
cache link is created only when absent; an existing tree must match completely.

```sh
python3.12 repro/pump/collector-v2-reproduction/prepare.py --output work/collector-tools
python3.12 repro/pump/collector-v2-reproduction/reproduce.py \
  --prepared work/collector-tools --output work/collector-build
python3.12 -m unittest discover -s repro/pump/collector-v2-reproduction -p 'test_*.py'
```

`prepare.py --download-cache PATH --registry-cache PATH` can reuse authenticated
downloads and crate archives. Build output must be fresh and outside the prepared
tools. Compilation is offline and uses a fresh source copy, target and private
Rustup aliases. The recorded SDK's content is retained; executable modes come
from the matching official release. Captured original bytes are staged outside
the Rust inputs solely for the frozen helper's postcompile comparison. Tested
candidate bytes are never copied into the build workspace.

`reproduction.json` records the actual commands, exits, authenticated inputs and
whole-file equality. Failed attempts retain their logs and cannot become a pass.
Both output hashes, all source inputs, compiler files and links, SDK files and
locked crate sources are checked before acceptance.

## Validation and scope

[validation.json](validation.json) binds the actual clean builds and local test
results. The matching executable passed 9,269 existing differential comparisons
and 1,024 offline Surfpool comparisons. Counts include repeated inputs and retain
the harnesses' existing normalization and coverage limits. Their raw qualification
receipts remain local; this package publishes their hash inventory, not a portable
re-verification of unexported data. Build logs and compact reproduction receipts
are published here. Standard repository CI checks the unchanged selected state;
the commands above exercise this new recipe.

Active source, selected artifacts and status remain unchanged. This proves
reproduction of the tested collector candidate; original deployment byte identity
and historical build provenance remain unresolved. The original controller's
exit-2/cache review and the local preparation/permission failures remain preserved.
