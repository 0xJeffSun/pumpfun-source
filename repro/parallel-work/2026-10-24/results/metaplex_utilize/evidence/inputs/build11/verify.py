#!/usr/bin/env python3
"""Verify immutable saved evidence. Does not execute or rewrite either program."""
from pathlib import Path
import base64,gzip,hashlib,json,struct,sys,tarfile
P=Path(__file__).resolve().parent
R=next(x for x in P.parents if (x/'evidence/dependencies/token_metadata/deployed.so').is_file())
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda p:json.loads(p.read_text())
manifest=read(P/'manifest-sha256.json')
assert set(manifest)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name!='manifest-sha256.json' and '__pycache__' not in p.parts}
for n,h in manifest.items():assert sha((P/n).read_bytes())==h,n
for n,h in read(P/'harness-references.json').items():assert sha((R/n).read_bytes())==h,n
S=R/'repro/pump/metaplex-zero-use-source-recovery'
for n,h in read(S/'manifest-sha256.json').items():assert sha((S/n).read_bytes())==h,n
before=read(P/'upstream-source-manifest.json');after=read(P/'source-manifest.json');inputs=read(P/'patch-source-inputs.json')
assert inputs==read(S/'source-inputs.json')
changed={n for n,h in before.items() if after[n]!=h}
assert changed==set(inputs['patched'])==set(inputs['baseline']) and len(changed)==18
for n in changed:assert before[n]==inputs['baseline'][n] and after[n]==inputs['patched'][n]
with tarfile.open(S/'source-snapshot.tar.gz','r:gz') as t:
 files={x.name:t.extractfile(x).read() for x in t.getmembers() if x.isfile()}
assert {n:sha(b) for n,b in files.items()}==inputs['patched']
assert (P/'source.patch').read_bytes()==(S/'source.patch').read_bytes()
report=read(P/'comparison.json')
assert sha((P/'source-manifest.json').read_bytes())==report['source_manifest_sha256']
assert sha(gzip.decompress((P/'build.log.gz').read_bytes()))==report['build_log_sha256']
assert sha((P/'source.patch').read_bytes())==report['source_patch']['sha256']
original=(R/'evidence/dependencies/token_metadata/deployed.so').read_bytes();candidate=(P/'token_metadata.so').read_bytes();padded=(P/'rebuilt.deployed.so').read_bytes()
assert len(original)==793991 and len(candidate)==707448
assert sha(original)==report['original_sha256'] and sha(candidate)==report['candidate_input_sha256']
assert padded==candidate+bytes(86543) and sha(padded)==report['candidate_sha256']
assert original!=padded and report['full_byte_equality'] is False
sys.path.insert(0,str(R/'repro/pump_fees/framework-matching'));from elf_reader import Elf
O=Elf(R/'evidence/dependencies/token_metadata/deployed.so');C=Elf(P/'token_metadata.so')
assert O.entries==C.entries and len(O.entries)==1251
raw=[i for i,(a,b) in enumerate(zip(O.entries,O.entries[1:]+[O.hi])) if O.b[a:b]!=C.b[a:b]]
assert raw==[346]
oi={a:i for i,a in enumerate(O.entries)}
for i,(a,b) in enumerate(zip(O.entries,O.entries[1:]+[O.hi])):
 if i==346:continue
 assert O.pattern(a,b-a)==C.pattern(a,b-a)
 assert O.callsites(a,b-a)==C.callsites(a,b-a)
D=read(P/'root-diagnostics.json')
assert D['matching_windows_and_calls']==1250
assert len([1 for a,b in zip(original,padded) if a!=b])==1509
for s in D['sections']:
 o=O.secs[s['section']];c=C.secs[s['section']];ob=O.b[o[4]:o[4]+o[5]];cb=C.b[c[4]:c[4]+c[5]]
 assert o[4:6]==c[4:6] and (ob==cb)==s['raw_equal']
 assert sum(a!=b for a,b in zip(ob,cb))==s['differing_byte_positions']
L=read(P/'raw-difference-classification.json');a,n=O.secs['.data.rel.ro'][4:6];covered=set()
for r in L['different_source_locations']:
 pos=a+r['offset'];op,ol,oline,ocol=struct.unpack_from('<QQII',O.b,pos);cp,cl,cline,ccol=struct.unpack_from('<QQII',C.b,pos)
 assert op==cp and ol==cl and O.b[op>>32:(op>>32)+ol].decode()==r['file']
 assert (oline,ocol,cline,ccol)==(r['original_line'],r['original_column'],r['candidate_line'],r['candidate_column'])
 covered.update(range(pos+16,pos+24))
diffs={i for i in range(a,a+n) if O.b[i]!=C.b[i]}
assert len(diffs)==30 and diffs<=covered and len(L['different_source_locations'])==29
from solders.transaction import Transaction
cases=tx=0
for name in ['edition','uses','burn','context','validation']:
 d=json.loads(gzip.decompress((P/f'{name}-validation.json.gz').read_bytes()))
 assert d['original_sha256']==sha(original) and d['candidate_sha256']==sha(candidate) and not d['mismatches']
 assert d['case_count']==len(d['cases']);cases+=len(d['cases'])
 for c in d['cases']:
  for side in ['original','candidate']:
   Transaction.from_bytes(base64.b64decode(c[side]['transaction_base64'],validate=True)).verify();tx+=1
assert cases==135 and tx==270
print(json.dumps(dict(verified_package_files=len(manifest),source_changes=18,raw_equal_windows=1250,remaining_windows=[346],cases=cases,verified_signed_transactions=tx,full_byte_equality=False),indent=2))
