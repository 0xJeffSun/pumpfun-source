#!/usr/bin/env python3
"""Write a Utilize variant: replace the owned-uses guard block with a new block,
keeping the `metadata.uses` unwrap on line 85, column 39."""
import sys
from pathlib import Path
L = Path('/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bf960843-6806-451b-a211-62c8b228d301/scratchpad/lanes/deps-metaplex')
REL = 'programs/token-metadata/program/src/processor/uses/utilize.rs'
OLD = """    let mut metadata = Metadata::from_account_info(metadata_info)?;
    let usage = metadata.uses.clone().unwrap();
    let must_burn = usage.use_method == UseMethod::Burn;
    if number_of_uses == 0
        || number_of_uses > usage.total

    {
        return Err(MetadataError::NotEnoughUses.into());
    }
    let remaining_uses = usage
        .remaining
        .checked_sub(number_of_uses)
        .ok_or(MetadataError::NotEnoughUses)?;
    metadata.uses = Some(Uses {
        use_method: usage.use_method,
        total: usage.total,
        remaining: remaining_uses,
    });
"""
def make(name, block):
    base = (L / 'out/build/base-source' / REL).read_text()
    assert OLD in base
    src = base.replace(OLD, block)
    lines = src.split('\n')
    idx = next(i for i, l in enumerate(lines) if 'metadata.uses' in l and 'unwrap' in l)
    col = lines[idx].index('unwrap') + 1
    assert (idx + 1, col) == (85, 39), (name, idx + 1, col)
    out = L / 'out/variants' / name / REL
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(src)
    print(name, 'written')
if __name__ == '__main__':
    make(sys.argv[1], Path(sys.argv[2]).read_text())
