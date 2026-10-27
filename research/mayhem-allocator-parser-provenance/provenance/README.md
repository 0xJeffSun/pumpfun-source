# Retained source attribution

`anchor-utils-before-gate.rs` is retained without source changes from Anchor
commit c1c9261ca4e2f9ce3232e4fd41e4f6ad8742fe3e. `anchor-1.0.0/` contains selected
unchanged files from the pinned published crate. These keep Anchor's Apache-2.0
license and notices; see `anchor-LICENSE` (Copyright 2020 Anchor Maintainers).

The generated parser copies in `direct/*/generated.rs.gz` and the appended blocks
in the direct/controller curve sources are modified adaptations: template event
placeholders are substituted with public IDL names, the module is named
`legacy_event_utils`, and explicit imports are supplied. One control adds the
historical Solana exclusion. These changes were made for this diagnostic by
startrack3r. The exact compiled source bytes are retained; this notice accompanies
the compressed evidence without changing those input bytes.

`public-pump.json` retains the official Pump IDL bytes, ownership and attribution
from the repository/path/revision in `public-idl-origin.json`. It is source
evidence, not a relicensed original Mayhem implementation. The earlier Mayhem
reconstruction and verification tools retain this repository's MIT license.
