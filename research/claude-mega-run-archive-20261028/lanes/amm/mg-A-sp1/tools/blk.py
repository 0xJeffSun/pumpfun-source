# blk.py orig ADDR | cand SO NAME  [--sig]: basic-block skeleton (calls, imm consts, terminators); --sig prints only signatures
# blk.py cmp SO ADDR NAME : difflib of orig vs cand block signatures (compact)
import sys,subprocess,re,difflib
from pathlib import Path
D=str(Path(__file__).parent/'dis.py')
PT='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/'
def get(args):
    if args[0]=='cand' and args[1].endswith('.o'):
        o,sub=args[1],args[2]
        secs=subprocess.run([PT+'llvm-readelf','-SW',o],capture_output=True,text=True).stdout
        sec=[m.group(1) for m in re.finditer(r'\]\s+(\.text\.\S+)',secs) if sub in m.group(1)][0]
        out=subprocess.run([PT+'llvm-objdump','-d','--no-show-raw-insn','-j',sec,o],capture_output=True,text=True).stdout.splitlines()
        ins=[];pend=None
        for l in out:
            m=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
            if m: ins.append([int(m.group(1),16),m.group(2).strip()]); continue
            r=re.search(r'R_BPF_64_32\s+(\S+)',l)
            if r and ins and ins[-1][1].startswith('call'): ins[-1][1]='call <'+r.group(1)+'>'
        return [tuple(x) for x in ins]
    out=subprocess.run(['python3','-I',D]+args,capture_output=True,text=True).stdout.splitlines()
    ins=[]
    for l in out:
        m=re.match(r'\s*([0-9a-f]+) (.*)',l)
        if m: ins.append((int(m.group(1),16),m.group(2).strip()))
    return ins
def blocks(ins):
    offs=[o for o,_ in ins]; idx={o:i for i,o in enumerate(offs)}
    starts={0}
    for i,(o,t) in enumerate(ins):
        m=re.match(r'(j\w+) .*?([+-]0x[0-9a-f]+)',t) or re.match(r'(ja) ([+-]0x[0-9a-f]+)',t)
        if t.startswith('j'):
            m=re.search(r'([+-]0x[0-9a-f]+)',t)
            if m:
                # target in instruction slots: o + 8 + imm*8 (lddw is 16 bytes, offsets are byte offsets)
                tgt=o+8+int(m.group(1),16)*8
                starts.add(tgt)
            if i+1<len(ins): starts.add(ins[i+1][0])
        if t.startswith('exit') and i+1<len(ins): starts.add(ins[i+1][0])
    st=sorted(s for s in starts if s in idx)
    res=[]
    for k,s in enumerate(st):
        e=st[k+1] if k+1<len(st) else ins[-1][0]+8
        body=[(o,t) for o,t in ins if s<=o<e]
        calls=[];consts=[]
        for o,t in body:
            if t.startswith('call'):
                n=re.search(r'<(.*)>',t); n=n.group(1) if n else t[5:]
                n=re.sub(r'^_ZN','',n); n=re.sub(r'17h[0-9a-f]{16}E?$','',n)
                parts=re.findall(r'\d+([A-Za-z_$][\w$.]*)',n) or [n]
                calls.append(parts[-1][:28] if parts else n[:28])
            m=re.match(r'st[wdh]?w? \[r10 - 0x[0-9a-f]+\], (0x[0-9a-f]+|\d+)$',t)
            if m:
                v=int(m.group(1),0)
                if 6000<=v<6200 or 0x10<v<0x100: consts.append(v)
        last=body[-1][1]
        term=last.split()[0] if last.split()[0].startswith(('j','exit')) else 'ft'
        tgt=''
        if term.startswith('j'):
            m=re.search(r'([+-]0x[0-9a-f]+)',last); tgt=body[-1][0]+8+int(m.group(1),16)*8 if m else ''
        res.append(dict(s=s,n=len(body),calls=calls,consts=consts,term=term,tgt=tgt))
    return res
NOCALL=any(a.endswith('.o') for a in sys.argv)
def sig(b): return f"{b['term']}|{('c%d'%len(b['calls'])) if NOCALL else ','.join(b['calls'])}|{','.join(map(str,b['consts']))}"
if sys.argv[1]=='cmp':
    so,addr,name=sys.argv[2:5]
    A=blocks(get(['orig',addr])); B=blocks(get(['cand',so,name]))
    sa=[sig(b) for b in A]; sb=[sig(b) for b in B]
    print('orig blocks',len(A),'cand blocks',len(B))
    for tag,i1,i2,j1,j2 in difflib.SequenceMatcher(None,sa,sb,autojunk=False).get_opcodes():
        if tag=='equal': continue
        print(tag,f'o[{i1}:{i2}] c[{j1}:{j2}]')
        for b in A[i1:i2][:8]: print('  -',hex(b['s']),b['n'],sig(b)[:150])
        for b in B[j1:j2][:8]: print('  +',hex(b['s']),b['n'],sig(b)[:150])
else:
    ins=get(sys.argv[1:4] if sys.argv[1]=='cand' else sys.argv[1:3])
    for k,b in enumerate(blocks(ins)):
        print(k,hex(b['s']),b['n'],sig(b)[:160],('->'+hex(b['tgt'])) if b['tgt']!='' else '')
