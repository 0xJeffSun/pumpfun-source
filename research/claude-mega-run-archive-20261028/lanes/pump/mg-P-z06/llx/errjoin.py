import re,subprocess,sys,itertools
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06'
s=open(L+'/llx/ce.ll').read()
m=re.search(r'\ndefine [^\n]*control_entry[^\n]*\{', s); st=m.start(); en=s.index('\n}\n',st); f=s[st:en]
B145='"_ZN14pump_recovered13quote_control5state13control_entry28_$u7b$$u7b$closure$u7d$$u7d$17h868bc0d6a99bab61E.exit"'
B146='"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString$GT$9to_string17hcb7c86d6991c7b4dE.exit"'
B158='"_ZN14pump_recovered13quote_control5state13control_entry28_$u7b$$u7b$closure$u7d$$u7d$17h7f5f0c63f02e0c64E.exit"'
P={'145':(B145,'%_41.0','%_41.1','%12','%13'),'146':(B146,'%_10.0','%_10.1','%28','%29'),'sp':('%bb21','%30','%_58.1','%33','%34'),'158':(B158,'%_63.0','%_63.1','%47','%48')}
def build(order, storeorder, tag, subset=('145','146','sp','158')):
    g=f
    for k in subset:
        b,v0,v1,g0,g1=P[k]
        old=(f'  {g0} = getelementptr inbounds i8, ptr %_0, i64 8\n  store i64 {v0}, ptr {g0}, align 8\n'
             f'  {g1} = getelementptr inbounds i8, ptr %_0, i64 16\n  store ptr {v1}, ptr {g1}, align 8\n  br label %bb10')
        assert old in g,(k)
        g=g.replace(old,'  br label %errjoin',1)
    # bb10 phi: replace entries
    ph=re.search(r'  %\.sink = phi i64 (.*)\n',g)
    ents=re.findall(r'\[ (\d+), (%"[^"]+"|%[\w.]+) \]',ph.group(1))
    names={P[k][0] if P[k][0].startswith('%') else '%'+P[k][0] for k in subset}
    ne=[e for e in ents if e[1] not in names]+[('1','%errjoin')]
    g=g.replace(ph.group(0),'  %.sink = phi i64 '+', '.join(f'[ {a}, {b} ]' for a,b in ne)+'\n',1)
    g=re.sub(r'(\nbb10:[^\n]*)', r'\1', g)
    pv0=', '.join(f'[ {P[k][1]}, {P[k][0] if P[k][0].startswith("%") else "%"+P[k][0]} ]' for k in order)
    pv1=', '.join(f'[ {P[k][2]}, {P[k][0] if P[k][0].startswith("%") else "%"+P[k][0]} ]' for k in order)
    st0='  %ej.g0 = getelementptr inbounds i8, ptr %_0, i64 8\n  store i64 %ej.v0, ptr %ej.g0, align 8\n'
    st1='  %ej.g1 = getelementptr inbounds i8, ptr %_0, i64 16\n  store ptr %ej.v1, ptr %ej.g1, align 8\n'
    blk='\nerrjoin:\n  %ej.v0 = phi i64 '+pv0+'\n  %ej.v1 = phi ptr '+pv1+'\n'+(st0+st1 if storeorder==0 else st1+st0)+'  br label %bb10\n'
    # insert errjoin before bb10 block
    i=g.index('\nbb10:')
    g=g[:i]+'\n'+blk+g[i:]
    open(L+f'/llx/{tag}.ll','w').write(s[:st]+g+s[en:])
    r=subprocess.run(['/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc','-O3','-march=sbf','-mattr=+store-imm,+jmp-ext','-function-sections','-filetype=obj',L+f'/llx/{tag}.ll','-o',L+f'/llx/{tag}.o'],capture_output=True,text=True)
    if r.returncode: return 'FAIL '+r.stderr[:300]
    return subprocess.run(['python3','-B',L+'/../plainbody/tools/sacmp.py',L+f'/llx/{tag}.o','0x6a1e0','control_entry'],capture_output=True,text=True).stdout.strip()
if __name__=='__main__':
    for so in (0,1):
        print('so',so, build(('145','146','sp','158'),so,f'ej{so}'))
    for sub in itertools.combinations(('145','146','sp','158'),3):
        print(sub, build(sub,0,'ejs',sub))
