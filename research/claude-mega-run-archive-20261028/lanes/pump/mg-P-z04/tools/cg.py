import sys,json,subprocess,re,bisect
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
inv=json.load(open(W+'/base/L20/inventory.json'))['windows']
starts=sorted(int(k) for k in inv)
def name(a):
    v=inv.get(str(a))
    if v and v['symbols']:
        s=subprocess.run(['c++filt'],input=v['symbols'][0],capture_output=True,text=True).stdout.strip()
        return s
    return '?'
def owner(a):
    i=bisect.bisect_right(starts,a)-1
    return starts[i]
txt=subprocess.run([OD,'-d','--no-show-raw-insn',W+'/base/original.so'],capture_output=True,text=True).stdout
calls=[]
for line in txt.splitlines():
    m=re.match(r'\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+|-?\d+)$',line.strip()) or re.match(r'\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+)',line)
    if m:
        pc=int(m.group(1),16); imm=int(m.group(2),16) if 'x' in m.group(2) else int(m.group(2))
        if imm>=0x80000000: imm-=1<<32
        calls.append((pc, pc+8+imm*8))
import pickle
pickle.dump(calls,open(W+'/lanes/mg-P-z04/tools/calls.pkl','wb'))
