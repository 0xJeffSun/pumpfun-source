import re,itertools,subprocess,os,difflib,sys
sys.argv=['x','u11.ll','GlobalVolumeAccumulator30update_user_volume_accumulator','0x6d408']
exec(open('irs2.py').read().split("txt=open(src).read()")[0])
txt=open('u11.ll').read();sub=sys.argv[2];i=txt.index('define')
while sub not in txt[i:txt.index('\n',i)]: i=txt.index('\ndefine',i)+1
j=txt.index('\n}\n',i);head,body,tail=txt[:i],txt[i:j],txt[j:]
body=re.sub(r'%(\d+)\b',r'%v\1',body)
m1=re.search(r'(  %_0\.sroa\.4\.0 = phi ptr )(.*)\n',body);m2=re.search(r'(  %_0\.sroa\.0\.0 = phi i64 )(.*)\n',body)
def split(s): return re.findall(r'\[ [^\]]+ \]',s)
a=split(m1.group(2));b=split(m2.group(2));n=len(a);res=[]
tmp='pp%d'%os.getpid()
for perm in itertools.permutations(range(n)):
    nb=body.replace(m1.group(0),m1.group(1)+', '.join(a[k] for k in perm)+'\n').replace(m2.group(0),m2.group(1)+', '.join(b[k] for k in perm)+'\n')
    open(tmp+'.ll','w').write(head+nb+tail)
    subprocess.run([PT+'/llvm/bin/llc','-O3','-filetype=obj','-relocation-model=pic','-function-sections','-mattr=+store-imm,+jmp-ext',tmp+'.ll','-o',tmp+'.o'],capture_output=True)
    B=dis(tmp+'.o',fsub=sub)
    d=sum(1 for l in difflib.unified_diff(A,B,n=0,lineterm='') if l[:1] in '+-' and not l.startswith(('+++','---')))
    res.append((d,perm))
res.sort();print(res[:5]);os.remove(tmp+'.ll');os.remove(tmp+'.o')
