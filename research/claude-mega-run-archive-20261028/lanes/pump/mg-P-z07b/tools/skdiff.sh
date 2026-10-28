#!/bin/bash
# skdiff.sh ORIG_START SO SYMREGEX : diff original vs candidate skeletons (addresses/targets stripped)
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07b
python3 -B $L/tools/skel.py orig $1 > /tmp/.sk_o_$$ 2>&1
python3 -B $L/tools/skel.py cand $2 "$3" > /tmp/.sk_c_$$ 2>&1
diff <(sed 's/^+0x[0-9a-f]* //; s/->+0x[0-9a-f]*/->X/g; s/goto +0x[0-9a-f]*/goto X/; s/L0x[0-9a-f]*/L/g' /tmp/.sk_o_$$) <(sed 's/^+0x[0-9a-f]* //; s/->+0x[0-9a-f]*/->X/g; s/goto +0x[0-9a-f]*/goto X/; s/L0x[0-9a-f]*/L/g' /tmp/.sk_c_$$)
rm -f /tmp/.sk_o_$$ /tmp/.sk_c_$$
