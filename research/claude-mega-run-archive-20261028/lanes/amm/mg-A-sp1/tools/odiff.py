# odiff.py OBJ.o ORIGADDR SYMSUB [ctx] [max] : normalized diff of orig window vs function in a -function-sections object
import sys,re,subprocess,difflib
PT='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/'
T='/Users/shawwalters/amm100-run/lanes/mg-A-sp1/tools/dis.py'
def norm(i):
    i=re.sub(r'\s+',' ',i.strip()); i=re.sub(r' <[^>]*>','',i)
    i=re.sub(r'lddw (r\d+), -?0x[0-9a-f]+',r'lddw \1, X',i); i=re.sub(r'^call.*','call X',i)
    return i
o,addr,sub=sys.argv[1],sys.argv[2],sys.argv[3]
ctx=int(sys.argv[4]) if len(sys.argv)>4 else 0; mx=int(sys.argv[5]) if len(sys.argv)>5 else 40
secs=subprocess.run([PT+'llvm-readelf','-SW',o],capture_output=True,text=True).stdout
names=[m.group(1) for m in re.finditer(r'\]\s+(\.text\.\S+)',secs) if sub in m.group(1)]
if not names: print('no section for',sub); sys.exit(1)
sec=names[0]
out=subprocess.run([PT+'llvm-objdump','-d','--no-show-raw-insn','-j',sec,o],capture_output=True,text=True).stdout
B=[norm(m.group(2)) for m in (re.match(r'\s*([0-9a-f]+):\s+(.*)',l) for l in out.splitlines()) if m]
oo=subprocess.run(['python3','-I',T,'orig',addr],capture_output=True,text=True).stdout.splitlines()
A=[norm(re.match(r'\s*[0-9a-f]+ (.*)',l).group(1)) for l in oo if re.match(r'\s*[0-9a-f]+ ',l)]
d=[l for l in difflib.unified_diff(A,B,'o','c',n=ctx,lineterm='')][2:]
print(f'orig {len(A)} cand {len(B)} -{sum(1 for l in d if l[:1]=="-")} +{sum(1 for l in d if l[:1]=="+")} {sec[6:70]}')
for l in d[:mx]: print(l)
