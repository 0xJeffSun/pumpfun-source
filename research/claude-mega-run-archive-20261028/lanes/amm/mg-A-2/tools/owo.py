# owo.py OBJ SYMSUB FROM TO -> print instrs of fn in .o by 1-based index
import sys,re,subprocess
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
t=subprocess.run([OBJ,'-t',sys.argv[1]],capture_output=True,text=True).stdout.splitlines()
s=[l.split()[-1] for l in t if ' F ' in l and sys.argv[2] in l.split()[-1]][0]
out=subprocess.run([OBJ,'-d','--no-show-raw-insn','-j','.text.'+s,sys.argv[1]],capture_output=True,text=True).stdout
i=0;f,z=int(sys.argv[3]),int(sys.argv[4])
for l in out.splitlines():
    m=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
    if m:
        i+=1
        if f<=i<=z: print(f'{i:5d} {int(m.group(1),16):5x} {re.sub(chr(92)+"s+"," ",m.group(2).strip())}')
