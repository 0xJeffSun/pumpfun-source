# ndo.py ORIGWIN OBJFILE SYMSUBSTR [ctx|-s] : normalized diff orig window vs function in .o (function-sections ok)
# -s : shape mode (abstract regs/stack offsets) ; prints header 'orig N cand M changed K'
import sys,re,difflib,subprocess
P='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/'
T='/Users/shawwalters/amm100-run/lanes/mg-A-3/tools/dis2.py'
def norm(i):
    i=re.sub(r'\s+',' ',i.strip())
    i=re.sub(r'lddw (r\d), (0x[0-9a-f]+|RELOC)','lddw \\1, IMM',i)
    i=re.sub(r'^call .*','call',i)
    i=re.sub(r' *<[^>]*>$','',i)
    i=re.sub(r'^(j[a-z]+ .*?)[+-]0x[0-9a-f]+$','\\1 J',i)
    i=re.sub(r'^ja .*','ja J',i)
    return i
def shape(i):
    i=re.sub(r'r\d+','R',i); i=re.sub(r'^add64 R, -0x[0-9a-f]+$','add64 R, -S',i); i=re.sub(r'\[R - 0x[0-9a-f]+\]','[S]',i)
    return i
def orig(a):
    out=subprocess.run(['python3','-I',T,'orig',a],capture_output=True,text=True).stdout.splitlines()
    return [norm(re.match(r'\s*[0-9a-f]+ (.*)',l).group(1)) for l in out if re.match(r'\s*[0-9a-f]+ ',l)]
def obj(o,sub):
    st=subprocess.run([P+'llvm-readelf','-sW',o],capture_output=True,text=True).stdout.splitlines()
    names=[f[7] for f in (l.split() for l in st) if len(f)>=8 and f[3]=='FUNC' and sub in f[7]]
    if not names: print('NOSYM'); sys.exit(1)
    out=subprocess.run([P+'llvm-objdump','-d','--no-show-raw-insn','-j','.text.'+names[0],o],capture_output=True,text=True).stdout.splitlines()
    res=[]
    for l in out:
        m=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
        if m: res.append(norm(m.group(2)))
    return res
A=orig(sys.argv[1]);B=obj(sys.argv[2],sys.argv[3])
mode=sys.argv[4] if len(sys.argv)>4 else '2'
if mode in('-s','-ss'): A=[shape(x) for x in A];B=[shape(x) for x in B];n=0
else: n=int(mode)
sm=difflib.SequenceMatcher(None,A,B,autojunk=False)
sd=sum(max(i2-i1,j2-j1) for t,i1,i2,j1,j2 in sm.get_opcodes() if t!='equal')
if mode=='-ss':
    print('orig',len(A),'cand',len(B),'shape_diff',sd)
    if len(sys.argv)>5:
        for t,i1,i2,j1,j2 in sm.get_opcodes():
            if t!='equal': print(f'{t} o{i1}-{i2} c{j1}-{j2}: '+' ; '.join(A[i1:min(i2,i1+4)])+' || '+' ; '.join(B[j1:min(j2,j1+4)]))
    sys.exit(0)
d=list(difflib.unified_diff(A,B,'orig','cand',n=n,lineterm=''))
print('orig',len(A),'cand',len(B),'sd',sd,'changed',sum(1 for l in d if l[:1] in '+-' and l[:3] not in('---','+++')))
if len(sys.argv)>5:
    for l in d[2:]:print(l)
