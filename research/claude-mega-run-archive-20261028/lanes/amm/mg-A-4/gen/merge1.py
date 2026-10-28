# merge1.py BASE733_FILE COLLECTC_FILE OUT : collect-C file with 733 amm_hop (closure lines 579..718 kept), tail compressed
import sys
b=open(sys.argv[1]).read().split('\n'); c=open(sys.argv[2]).read().split('\n')
B=lambda n:b[n-1]; Cl=lambda n:c[n-1]
assert Cl(417).startswith('#[inline(never)]') and Cl(418).startswith('fn amm_hop'), (Cl(417),Cl(418))
assert B(485).startswith('#[inline(never)]') and B(486).startswith('fn amm_hop')
assert Cl(766).startswith('/// Pool vault holding'), Cl(766)
# amm_hop text in 733: 485..972 ; header 485..498
head=b[484:498]            # 733 lines 485..498 -> new 417..430
pad=['']*68                # new 431..498
mid=b[498:719]             # 733 lines 499..719 keep numbers
tail=[x for x in b[719:972] if x.strip() and not x.strip().startswith('//')]   # 733 720..972
budget=765-720+1
tot=sum(len(x.strip())+1 for x in tail); per=tot/budget+1
lines=[];cur=''
for x in tail:
    s=x.strip()
    cur=(cur+' '+s) if cur else s
    if len(cur)>=per*0.97 and len(lines)<budget-1:
        lines.append('    '+cur);cur=''
if cur: lines.append('    '+cur)
assert len(lines)<=budget,(len(lines),budget)
lines+=['']*(budget-len(lines))
new=c[:416]+head+pad+mid+lines+c[765:]
assert new[578].count('error!')==1 and new[717].count('error!')==1, (new[578],new[717])
for n in (579,586,636,671,718): assert 'error!(PumpAmmError::Overflow)' in new[n-1], (n,new[n-1])
assert new[765].startswith('/// Pool vault'), new[765]
open(sys.argv[3],'w').write('\n'.join(new))
print('ok', len(new), 'tail lines', len(lines), 'max len', max(len(x) for x in lines))
