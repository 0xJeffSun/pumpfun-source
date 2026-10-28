# irlib.py: helpers for fast single-function IR experiments
import re,subprocess,difflib,os,tempfile
PT=os.path.expanduser('~/.cache/solana/v1.44/platform-tools/llvm/bin/')
PT52=os.path.expanduser('~/.cache/solana/v1.52/platform-tools/llvm/bin/')
DIS=os.path.join(os.path.dirname(__file__),'dis.py')
def norm(i):
    i=re.sub(r'\s+',' ',i.strip()); i=re.sub(r' <[^>]*>','',i)
    i=re.sub(r'lddw (r\d+), -?0x[0-9a-f]+',r'lddw \1, X',i); i=re.sub(r'^call.*','call X',i)
    return i
_oc={}
def orig(addr):
    if addr in _oc: return _oc[addr]
    oo=subprocess.run(['python3','-I',DIS,'orig',addr],capture_output=True,text=True).stdout.splitlines()
    A=[norm(re.match(r'\s*[0-9a-f]+ (.*)',l).group(1)) for l in oo if re.match(r'\s*[0-9a-f]+ ',l)]
    _oc[addr]=A; return A
def objfn(o,sub):
    secs=subprocess.run([PT52+'llvm-readelf','-SW',o],capture_output=True,text=True).stdout
    names=[m.group(1) for m in re.finditer(r'\]\s+(\.text\.\S+)',secs) if sub in m.group(1)]
    if not names: return None
    out=subprocess.run([PT52+'llvm-objdump','-d','--no-show-raw-insn','-j',names[0],o],capture_output=True,text=True).stdout
    return [norm(m.group(2)) for m in (re.match(r'\s*([0-9a-f]+):\s+(.*)',l) for l in out.splitlines()) if m]
def score(A,B):
    sm=difflib.SequenceMatcher(None,A,B,autojunk=False)
    return sum(max(i2-i1,j2-j1) for t,i1,i2,j1,j2 in sm.get_opcodes() if t!='equal')
def ndiff(A,B):
    d=[l for l in difflib.unified_diff(A,B,'o','c',n=0,lineterm='')][2:]
    return sum(1 for l in d if l[:1]=='-'),sum(1 for l in d if l[:1]=='+'),d
class Mod:
    """module text split into: pre + fn + post; fn split into header, first-block text, blocks"""
    def __init__(self,text,sub):
        m=re.search(r'(?m)^define [^\n]*'+re.escape(sub)+r'[^\n]*\{\n',text)
        st=m.start(); en=text.index('\n}\n',st)
        self.pre=text[:st]; self.post=text[en:]
        f=text[st:en]
        f=re.sub(r'%(\d+)\b',r'%v\1',f); f=re.sub(r'(?m)^(\d+):',r'v\1:',f)
        he=f.index('\n',f.index('{'))+1
        self.head=f[:he]; body=f[he:]
        parts=re.split(r'(?m)^(?=[\w.$"-]+:)',body)
        self.first=parts[0]
        self.blocks=[b.rstrip('\n')+'\n' for b in parts[1:]]
        self.names=[b.split(':',1)[0] for b in self.blocks]
    def text(self,order=None,blocks=None):
        bl=blocks if blocks is not None else self.blocks
        if order is None: order=range(len(bl))
        return self.pre+self.head+self.first+'\n'.join(bl[i] for i in order)+self.post
def llc(text,tag='x',d='/tmp'):
    p=os.path.join(d,tag+'.ll'); o=os.path.join(d,tag+'.o')
    open(p,'w').write(text)
    r=subprocess.run([PT+'llc','-O3','-filetype=obj','-relocation-model=pic','-function-sections','-mattr=+store-imm,+jmp-ext',p,'-o',o],capture_output=True,text=True)
    if r.returncode: return None,r.stderr[:500]
    return o,r.stderr
