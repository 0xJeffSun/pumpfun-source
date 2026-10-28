# seqo.py (orig ADDR | OBJ.o SYM | SO NAME) -> sequence of (idx, error code / line imms, supported_mint calls) to compare block layout
import sys,re,subprocess,types
from pathlib import Path
D=Path(__file__).resolve().parent
if sys.argv[1]=='orig':
    out=subprocess.run(['python3','-I',str(D/'ow.py'),'orig',sys.argv[2],'1','99999'],capture_output=True,text=True).stdout
elif sys.argv[1].endswith('.o'):
    out=subprocess.run(['python3','-I',str(D/'owo.py'),sys.argv[1],sys.argv[2],'1','99999'],capture_output=True,text=True).stdout
else:
    out=subprocess.run(['python3','-I',str(D/'ow.py'),sys.argv[1],sys.argv[2],'1','99999'],capture_output=True,text=True).stdout
seq=[]
for l in out.splitlines():
    p=l.split(None,2)
    if len(p)<3: continue
    i,ins=p[0],p[2]
    m=re.match(r'stw \[r10 - 0x(\w+)\], (0x\w+)',ins)
    if m and int(m.group(2),16)>=6000: seq.append(f'{i}:E{int(m.group(2),16)}')
    elif m and int(m.group(2),16)<1000 and int(m.group(2),16)>100: seq.append(f'{i}:L{int(m.group(2),16)}')
print(' '.join(seq))
