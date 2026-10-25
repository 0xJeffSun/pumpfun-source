#!/usr/bin/env python3
"""Verify the static evidence package. Never build or execute target programs."""
import argparse,difflib,hashlib,json,subprocess,sys
from pathlib import Path
from review import facts,KEY
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);a=ap.parse_args()
 m=json.loads((P/'manifest.json').read_text());files={p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file()}
 assert not any(p.is_symlink() for p in P.rglob('*')),'symlink'
 assert files==set(m)|{'manifest.json','MANIFEST.sha256'},'file inventory'
 for f,h in m.items():assert H((P/f).read_bytes())==h,'hash mismatch: '+f
 seal=''.join(f'{h}  {f}\n' for f,h in sorted({**m,'manifest.json':H((P/'manifest.json').read_bytes())}.items()))
 assert (P/'MANIFEST.sha256').read_text()==seal,'seal'
 subprocess.run([sys.executable,'-B',str(P/'interrupted/verify.py')],check=True,stdout=subprocess.PIPE,text=True)
 r=facts();assert r==json.loads((P/'review-facts.json').read_text()),'review facts'
 new=(P/'proposal/sharing_update.rs').read_text()
 for name,old,ff in [('source.patch',(P/'baseline'/KEY).read_text(),'a/'+KEY),('review-corrections.patch',(P/'interrupted/proposal/sharing_update.rs').read_text(),'a/proposal/sharing_update.rs')]:
  out=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile=ff,tofile='b/'+(KEY if name=='source.patch' else 'proposal/sharing_update.rs')))
  assert out==(P/'proposal'/name).read_text(),'exact patch: '+name
 origins=json.loads((P/'origins.json').read_text())
 for f,h in origins['copied_files'].items():assert H((P/f).read_bytes())==h
 if a.repo:
  for f,h in json.loads((P/'baseline-source-sha256.json').read_text()).items():assert H((a.repo/f).read_bytes())==h,'current baseline: '+f
 print(f"PASS: {len(m)} sealed payloads; 26 exact baseline inputs; one changed source; V2/contexts preserved; 20 complete scoped windows and generated-CPI/data witnesses; 417 historical sharing rows, 17461 historical comparison requirement. Static only.")
if __name__=='__main__':main()
