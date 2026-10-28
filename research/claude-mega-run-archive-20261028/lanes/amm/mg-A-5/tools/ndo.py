import sys,re,difflib,subprocess
# ndo.py ORIGWIN OBJFILE SYMBOL [ctx] : diff orig window vs function in .o via objdump
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
T='/Users/shawwalters/amm100-run/lanes/mg-A-5/tools/dis.py'
def norm(i):
    i=re.sub(r'\s+',' ',i.strip())
    i=re.sub(r'lddw (r\d), 0x[0-9a-f]+','lddw \\1, IMM',i)
    i=re.sub(r'lddw (r\d), -?0x[0-9a-f]+','lddw \\1, IMM',i) if 'lddw' in i and 'IMM' not in i and False else i
    i=re.sub(r'^call .*','call',i)
    i=re.sub(r'(j[a-z]+ .*?)[+-]0x[0-9a-f]+ <.*>','\\1 J',i)
    i=re.sub(r'^ja .*','ja J',i)
    return i
def orig(a):
    out=subprocess.run(['python3','-I',T,'orig',a],capture_output=True,text=True).stdout.splitlines()
    return [norm(re.match(r'\s*[0-9a-f]+ (.*)',l).group(1)) for l in out if re.match(r'\s*[0-9a-f]+ ',l)]
def obj(o,sym):
    RE='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-readelf'
    st=subprocess.run([RE,'-sW',o],capture_output=True,text=True).stdout.splitlines()
    for l in st:
        f=l.split()
        if len(f)>=8 and sym in f[7] and f[3]=='FUNC':
            a=int(f[1],16);z=a+int(f[2]);break
    out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',o],capture_output=True,text=True).stdout.splitlines()
    res=[]
    for l in out:
        m=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
        if m: res.append(norm(m.group(2)))
    return res
A=orig(sys.argv[1]);B=obj(sys.argv[2],sys.argv[3])
n=int(sys.argv[4]) if len(sys.argv)>4 else 2
d=list(difflib.unified_diff(A,B,'orig','cand',n=n,lineterm=''))
print('orig',len(A),'cand',len(B),'changed',sum(1 for l in d if l[:1] in '+-' and l[:3] not in('---','+++')))
for l in d[2:]:print(l)
