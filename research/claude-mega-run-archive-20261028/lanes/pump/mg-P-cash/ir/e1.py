import subprocess, sys
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-cash'
mod=L+'/ir/m1c.ll'; fn='cashback7claim_c17'
s=open(mod).read()
import re
for n in (54,55,56,57,58):
    s=re.sub(r'%'+str(n)+r'\b','%ev'+str(n),s)
A='  %_140 = load ptr, ptr %_26, align 8, !nonnull !2, !align !468, !noundef !2\n'
B_start=s.index('  %ev54 = getelementptr inbounds i8, ptr %a, i64 88\n')
B_end=s.index('\n', s.index('  %_50 = load i64, ptr %ev54', B_start))+1
B=s[B_start:B_end]
st=[]
for k in ('%ev55 = getelementptr inbounds i8, ptr %event, i64 32','%ev56 = getelementptr inbounds i8, ptr %event, i64 40','%ev57 = getelementptr inbounds i8, ptr %event, i64 48','%ev58 = getelementptr inbounds i8, ptr %event, i64 56'):
    i=s.index('  '+k); j=s.index('\n', s.index('\n',i)+1)+1; st.append(s[i:j])
def variant(name, reorder_load, reverse):
    t=s
    if reorder_load:
        t=t.replace(B,'',1); t=t.replace(A, B+A,1)
    if reverse:
        blk=''.join(st); t=t.replace(blk, ''.join(reversed(st)),1)
    p=L+f'/llx/{name}.ll'; open(p,'w').write(t)
    subprocess.run(['bash',L+'/tools/llf.sh',p,name,'0x76a28',fn])
variant('e1a',True,False); variant('e1b',False,True); variant('e1c',True,True)
