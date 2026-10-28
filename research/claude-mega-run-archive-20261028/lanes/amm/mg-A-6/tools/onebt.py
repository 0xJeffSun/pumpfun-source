# onebt.py 'TAIL CODE' : replace the accumulator line in trade.rs buy_transfers (from trade.base.rs) with TAIL (\n allowed)
import sys
L='/Users/shawwalters/amm100-run/lanes/mg-A-6'
s=open(L+'/trade.base.rs').read()
old='    if a.user_volume_accumulator.user == Pubkey::default() { a.user_volume_accumulator.user.as_mut().copy_from_slice(a.user.key.as_ref()); }\n'
assert old in s
s=s.replace(old,sys.argv[1].replace('\\n','\n')+'\n')
open(L+'/src/programs/pump-amm/src/trade.rs','w').write(s)
