import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/gen')
from lines import *; import sig, cq
name=sys.argv[1]; base=sys.argv[2] if len(sys.argv)>2 else L+'/src'
root=clone(name,base=base); print('sig',sig.apply(root)); cq.apply(root); print('ok',root)
