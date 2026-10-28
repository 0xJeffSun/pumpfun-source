#!/usr/bin/env python3
"""Verify the archived native Linux build control without a compiler or network."""
from pathlib import Path
import collections,gzip,hashlib,io,json,sys,tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if (p/'evidence/original/pump/deployed.so').is_file())
sys.path.insert(0,str(P/'support'))
from pump_compare_function_bytes import normalize,body
from pump_quote_control_function_match import sections
from elf_functions import elf_functions
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda p:gzip.decompress(p.read_bytes()) if p.suffix=='.gz' else p.read_bytes()
manifest=json.loads((P/'MANIFEST.json').read_text())
assert set(manifest)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file() and p.name!='MANIFEST.json' and '__pycache__'not in p.parts}
for path,digest in manifest.items():assert sha((P/path).read_bytes())==digest,path
original=(R/'evidence/original/pump/deployed.so').read_bytes();os_=sections(original)
assert sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
windows=json.loads((P/'windows.json').read_text());assert len(windows)==1035
for x,y in zip(windows,windows[1:]):assert x['start']+x['bytes']==y['start']
assert windows[0]['start']==os_['.text']['addr']
assert windows[-1]['start']+windows[-1]['bytes']==os_['.text']['addr']+os_['.text']['size']
images=[]
for label in ['first','repeat']:
 d=P/label;r=json.loads(read(d/'build-attempt.json.gz'));report=json.loads((d/'build-comparison.json').read_text())
 candidate=read(d/'candidate.so.gz');symbols=read(d/'unstripped.so.gz');images.append((candidate,symbols))
 assert all(report[k]==value for k,value in r.items())
 r=report
 assert r['returncode']==0 and r['source_unchanged']
 assert sha(candidate)==r['comparison']['candidate_sha256'] and sha(symbols)==r['unstripped_sha256']
 assert sha((d/'builder.py').read_bytes())==r['builder_sha256']
 assert sha(read(d/'build.log.gz'))==r['build_log_sha256']
 assert not r['comparison']['full_byte_equality']
 with tarfile.open(fileobj=io.BytesIO((d/'compiled-source.tar.gz').read_bytes()),mode='r:gz')as archive:
  tree={m.name:sha(archive.extractfile(m).read())for m in archive.getmembers()if m.isfile()}
 # Receipt paths are repository-relative; the archived cwd was the staged workspace.
 suffix='/source/';expected={p.split(suffix,1)[1]:h for p,h in r['source_sha256'].items()}
 assert tree==expected,(label,'compiled source binding')
 cs=sections(symbols);ix=collections.defaultdict(list)
 for start,n,name in elf_functions(symbols):
  raw=body(symbols,cs,start,n);norm,_=normalize(raw,start,cs);ix[(n,norm)].append(raw)
 matched=raw_count=0
 for w in windows:
  raw=body(original,os_,w['start'],w['bytes']);norm,_=normalize(raw,w['start'],os_);hits=ix.get((w['bytes'],norm),[])
  assert bool(hits)==w['matched'],(label,hex(w['start']))
  matched+=bool(hits);raw_count+=raw in hits
 assert (matched,raw_count)==(990,164)
 if label=='repeat':
  assert r['target']=='sbpf-solana-solana' and r['target_libraries_unchanged']
  official=json.loads((P/'official-sbpf-libraries.json').read_text())['target_libraries']
  assert {k:v['sha256']for k,v in r['target_libraries_sha256'].items()}==official
 print(label,': 990/1035 normalized; 164 raw; source and compiler receipts bound')
assert images[0]==images[1]
print('Repeat ELFs identical; whole ELF equality to original false; no runtime qualification claimed.')
