#!/usr/bin/env python3
"""Portable immutable-package verifier. Reads data; never executes ELF or compiler."""
from pathlib import Path
import sys,json,hashlib
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
m=json.loads((P/'manifest.json').read_text())
assert sha((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().strip(), 'manifest seal'
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name not in ('manifest.json','manifest.sha256')}
assert actual==set(m['files']), ('unexpected or missing files',actual^set(m['files']))
for f,h in m['files'].items():assert sha((P/f).read_bytes())==h, 'changed file: '+f
prov=json.loads((P/'provenance.json').read_text());g=json.loads((P/'git-proof.json').read_text())
obj={}
for oid,kind in g['objects'].items():
 b=(P/'git-objects'/oid).read_bytes();assert hashlib.sha1(kind.encode()+b' '+str(len(b)).encode()+b'\0'+b).hexdigest()==oid;obj[oid]=b
assert g['commit']==prov['revision']==m['revision']=='c1ffdd0667608d4755227e68aab9f27a7e9a0d37'
assert obj[g['commit']].splitlines()[0]==('tree '+g['root_tree']).encode()
def tree(oid):
 b=obj[oid];out={};i=0
 while i<len(b):
  j=b.index(b'\0',i);mode,name=b[i:j].split(b' ',1);out[name.decode()]=b[j+1:j+21].hex();i=j+21
 return out
for f in prov['files']:
 b=(P/f['path']).read_bytes();assert sha(b)==f['sha256'] and len(b)==f['bytes']
 oid=g['root_tree']
 for part in f['repository_path'].split('/'):oid=tree(oid)[part]
 assert oid==f['git_blob']==hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
assert (P/'elf_reader.py').read_bytes()==(P/'inputs/repro/pump/nested-ancestry-fortyeight/elf_reader.py').read_bytes()
from analyze import analyze
fresh=analyze();saved=json.loads((P/'residual-ledger.json').read_text());assert fresh==saved,'static ledger not reproducible'
assert all(x['matches_build_binding'] and x['package_matches_current'] for x in fresh['source_bindings'])
from details import build
assert build()==json.loads((P/'details.json').read_text()),'details not reproducible'
result=json.loads((P/'result.json').read_text());assert result['summary']==fresh['summary'];assert result['whole_file_equal']==fresh['whole_file_equal']==False
print(json.dumps({'status':'PASS','revision':prov['revision'],'input_files':len(prov['files']),'sealed_files':len(m['files']),'recomputed':['full byte comparison','all windows/calls/branches/relocations','near hypotheses','data witnesses','source bindings','Git membership','invalidation closure'],'whole_file_equal':False},sort_keys=True))
