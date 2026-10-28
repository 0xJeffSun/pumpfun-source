#!/usr/bin/env python3
"""V3 = V1 + fee payment through private helper pay_migration_fee(a,&a.pool_authority,native,fee) (mx1 variant b: llc 8896 B, 0.9470, 72 diffslots). UNBUILT."""
import sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-mig/tools')
from gen import make_variant
import mx1
E, HB = mx1.V['b']
if __name__ == '__main__':
    print(make_variant(sys.argv[1] if len(sys.argv) > 1 else 'V3', E, tail=HB))
