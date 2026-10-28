# gcv.py HELPER.rs : write global_config.rs = base with HELPER text inserted before the final '}' of the last impl block
import sys
L='/Users/shawwalters/amm100-run/lanes/mg-A-sp1'
s=open(L+'/global_config.base.rs').read().rstrip('\n')
assert s.endswith('}')
h=open(sys.argv[1]).read().rstrip('\n') if len(sys.argv)>1 and sys.argv[1]!='-' else ''
s=s[:-1]+(h+'\n' if h else '')+'}\n'
open(L+'/src/programs/pump-amm/src/state/global_config.rs','w').write(s)
