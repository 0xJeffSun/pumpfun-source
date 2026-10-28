import sys,re,subprocess,collections
# slotmap.py <orig_start> <cand.so> <symregex> : map orig stack offsets -> cand offsets using difflib on opcode-normalized insns
W="/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work"
out=subprocess.run(['python3',W+'/harness/win.py','show',sys.argv[1],'--cand',sys.argv[2],'--sym',sys.argv[3],'--full'],capture_output=True,text=True).stdout
O=[];C=[]
for l in out.split('\n'):
    m=re.match(r'^(.)\s+(0x[0-9a-f]+)?\s+(0x[0-9a-f]+)?\s+(.*)$',l)
    if not m or not (l.startswith('  ') or l[0] in '-+'): continue
    p=l[:2]; rest=l[2:].split()
    if l.startswith('  0x') and len(rest)>=3 and rest[1].startswith('0x'):
        ins=' '.join(rest[2:]); O.append(ins); C.append(ins)
    elif l.startswith('- '): O.append(' '.join(rest[1:]))
    elif l.startswith('+ '): C.append(' '.join(rest[1:]))
norm=lambda s: re.sub(r'add64 r, -0x[0-9a-f]+','add64 r, -X',re.sub(r'r10 - 0x[0-9a-f]+','r10-X',re.sub(r'r\d','r',s)))
import difflib
sm=difflib.SequenceMatcher(None,[norm(x) for x in O],[norm(x) for x in C],autojunk=False)
mp=collections.defaultdict(collections.Counter)
for a,b,n in sm.get_matching_blocks():
    for k in range(n):
        x=re.findall(r'(?:r10 - |add64 r\d, -)(0x[0-9a-f]+)',O[a+k]); y=re.findall(r'(?:r10 - |add64 r\d, -)(0x[0-9a-f]+)',C[b+k])
        for u,v in zip(x,y): mp[int(u,16)][int(v,16)]+=1
print('opcode-ratio %.4f'%sm.ratio())
for u in sorted(mp): print(hex(u),' '.join(f'{hex(v)}x{c}' for v,c in mp[u].most_common()))
