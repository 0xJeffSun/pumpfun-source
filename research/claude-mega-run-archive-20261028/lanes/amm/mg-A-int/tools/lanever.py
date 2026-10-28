"""lanever.py PATCH : write each file of (patch base + PATCH) to mg-A-int/tmp/lanever/<rel>, report vs mg-union/src."""
import re,subprocess,shutil,sys
from pathlib import Path

DEFAULT_BASE = __import__('pathlib').Path.home()/'amm100-run/lanes/mg-union/u744/src'
def split_path(old, new):
    """-> (base_root, rel) for headers like /abs/<base>/programs/..., programs/..., a/instructions/... (rel to pump-amm/src)."""
    import re as _re
    from pathlib import Path as _P
    m = _re.search(r'(?:^|/src/)((?:programs|crates)/\S+)$', new) or _re.search(r'(?:^|/src/)((?:programs|crates)/\S+)$', old)
    if m: rel = m.group(1)
    else:
        q = new if new != '/dev/null' else old
        q = _re.sub(r'^[ab]/', '', q); rel = 'programs/pump-amm/src/' + q
    b = _re.match(r'^(/\S+?)/(?:programs|crates)/', old)
    return (_P(b.group(1)) if b else DEFAULT_BASE), rel
txt=Path(sys.argv[1]).read_text(); T=Path.home()/'amm100-run/lanes/mg-A-int/tmp/lanever'; shutil.rmtree(T,ignore_errors=True)
U=Path.home()/'amm100-run/lanes/mg-union/src'
for sec in [s for s in re.split(r'(?m)^(?=diff -r)',txt) if s.startswith('diff -r')]:
    old=re.search(r'^--- (\S+)',sec,re.M).group(1); new=re.search(r'^\+\+\+ (\S+)',sec,re.M).group(1)
    base,rel=split_path(old,new)
    w=T/rel; w.parent.mkdir(parents=True,exist_ok=True); shutil.copyfile(base/rel,w)
    body='\n'.join(l for l in sec.split('\n') if not l.startswith('diff -r'))
    body=re.sub(r'(?m)^--- \S+','--- a',body,count=1); body=re.sub(r'(?m)^\+\+\+ \S+','+++ b',body,count=1)
    r=subprocess.run(['patch','--forward','-s','-o',str(w)+'.new',str(w)],input=body,text=True,capture_output=True,cwd=str(T))
    a=Path(str(w)+'.new').read_text(); u=(U/rel).read_text() if (U/rel).exists() else None
    print(rel,'rc',r.returncode,'| union==lane',a==u,'| create_idempotent',a.count('create_idempotent'),'| base',base.parent.name+'/'+base.name)
