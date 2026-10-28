# mux.py VARFILE [BASEFILE] : build multiplexed create_pool variants into L/mux/src (clone of L/src)
# VARFILE defines VARS = [(name, fn(lines)->lines)], helpers put()/sub() available.
import sys,os,re,shutil,subprocess
L='/Users/shawwalters/amm100-run/lanes/mg-A-2'
BASE=sys.argv[2] if len(sys.argv)>2 else L+'/src/programs/pump-amm/src/instructions/create_pool.rs'
def ispad(s): return s.strip() in ('','//')
def put(lines,n,block,at=0):
    """place block so that block[at] lands on 1-based line n; consume pad lines around"""
    lines=list(lines); i=n-1
    # remove original line n (must be the anchor statement) -> replaced by block
    before=block[:at]; after=block[at+1:]
    # consume pads above
    for k in range(len(before)):
        j=i-1-k
        assert ispad(lines[j]), ('not pad above',n,j+1,lines[j])
    for k in range(len(after)):
        j=i+1+k
        assert ispad(lines[j]), ('not pad below',n,j+1,lines[j])
    lines[i-len(before):i+1+len(after)]=block
    return lines
def sub(lines,old,new,cnt=1):
    t='\n'.join(lines); assert t.count(old)==cnt,(old[:80],t.count(old)); return t.replace(old,new).split('\n')
ns={'put':put,'sub':sub,'ispad':ispad}
exec(open(sys.argv[1]).read(),ns)
VARS=ns['VARS']
base=open(BASE).read().split('\n')
# strip struct defs: CreatePool accounts struct and CreatePoolEvent struct -> blank lines; import them
def strip(lines):
    out=list(lines); i=0
    while i<len(out):
        l=out[i]
        if l.startswith('#[event_cpi]') or l.startswith('#[event]'):
            j=i
            while not out[j].startswith('}'): j+=1
            for k in range(i,j+1): out[k]=''
            i=j
        i+=1
    # import on line 17 (existing use line)
    assert out[16].startswith('use crate::'), out[16]
    out[16]=out[16]+' use super::create_pool::{CreatePool, CreatePoolEvent};'
    return out
M=L+'/mux'
if os.path.exists(M+'/src'): shutil.rmtree(M+'/src')
os.makedirs(M,exist_ok=True)
subprocess.run(['cp','-c','-R',L+'/src',M+'/src'],check=True)
if not os.path.exists(M+'/target'): subprocess.run(['cp','-c','-R',L+'/target',M+'/target'],check=True)
S=M+'/src/programs/pump-amm/src'
names='123456789abcdefghijklmnopqrstuvwxyz'
mods=[];arms=[]
call='create::execute(ctx,index,base_amount_in,quote_amount_in,coin_creator,is_mayhem_mode,is_cashback_coin.0,creator_fee_bps.0,can_edit_creator_fee.0,is_holder_reward.0)'
for k,(name,fn) in enumerate(VARS):
    c=names[k]; v=fn(list(base)); v=strip(v)
    open(f'{S}/instructions/create_poo{c}.rs','w').write('\n'.join(v))
    mods.append(f'pub mod create_poo{c};')
    arms.append(f'{1+k} => crate::instructions::create_poo{c}::'+call[len('create::'):]+',')
    print(f'create_poo{c} = {name}')
open(f'{S}/instructions/mod.rs','a').write('\n'+'\n'.join(mods)+'\n')
lib=open(f'{S}/lib.rs').read(); assert lib.count('{ '+call+' }')==1
lib=lib.replace('{ '+call+' }','{ match ctx.remaining_accounts.len() { '+' '.join(arms)+' _ => '+call+' } }')
open(f'{S}/lib.rs','w').write(lib)
open(M+'/names.txt','w').write('\n'.join(f'create_poo{names[k]} {n}' for k,(n,_) in enumerate(VARS))+'\n')
