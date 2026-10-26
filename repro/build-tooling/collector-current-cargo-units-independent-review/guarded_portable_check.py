"""Audit-hook check: portable replay may read its own user files only."""
from pathlib import Path
import os,runpy,sys
root=Path(__file__).resolve().parent.parent/'collector-current-cargo-unit-witness'
seen=[]
def audit(event,args):
 if event!='open'or not isinstance(args[0],(str,bytes,os.PathLike)):return
 value=os.fsdecode(args[0]);path=Path(value)
 if not path.is_absolute():path=Path.cwd()/path
 normalized=Path(os.path.abspath(path))
 if str(normalized).startswith('/Users/shawwalters/'):
  if not normalized.is_relative_to(root):raise PermissionError('Portable checker attempted an external user path: '+str(normalized))
  seen.append(str(normalized.relative_to(root)))
sys.addaudithook(audit)
sys.argv=[str(root/'verify.py'),'--expected-seal','03ac2ad0eabbd58d97c034640357262572422a6044f04206303ffe586f5a5bb9']
runpy.run_path(str(root/'verify.py'),run_name='__main__')
print('GUARDED PASS: all',len(seen),'user-path opens remained inside the publication; recorded private roots were not opened.')
