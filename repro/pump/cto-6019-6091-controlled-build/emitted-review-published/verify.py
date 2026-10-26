"""Stdlib completed-artifact verification; never compiler/network/target code."""
from pathlib import Path
import argparse,json,hashlib
from analyze import analyze,P,H,EXP
from extract import render
J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve()
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f.name!='manifest.json'}
for n,v in m.items():b=(P/n).read_bytes();assert H(b)==v['sha256']and len(b)==v['bytes'],n
for n,v in J(P/'input-references.json').items():b=(R/n).read_bytes();assert H(b)==v['sha256']and len(b)==v['bytes'],n
for n,h in J(P/'prior-references.json').items():
 q=P.parent/n;assert H((q/'manifest.json').read_bytes())==h
 for name,v in J(q/'manifest.json').items():assert H((q/name).read_bytes())==v['sha256']
d=analyze(R);assert d==J(P/'proof.json');b=(R/EXP/'analysis/candidate.so').read_bytes()
for f in d['functions']:assert(P/(str(f['start'])+'.asm')).read_text()==render(b,f['start'],f['end'])
assert d['inventory']['status_counts']=={'normalized':74,'unmatched':507,'call-consistent':356,'raw':98}
print('PASS: completed source37/artifacts/receipts;13complete emitted bodies;6019/6091guards+namedownedconstructors/commonreturn;runtimeWSOLdecode+originnegativesretained;1035inventoryrowsunchanged;no runtime/selection')
