#!/usr/bin/env python3
"""Portable offline verification; optional --repo rebinding reads frozen git blobs only."""
import argparse,hashlib,json,subprocess,sys
from pathlib import Path
P=Path(__file__).resolve().parent
sys.dont_write_bytecode=True
sys.path.insert(0,str(P))
from analyze import analyze
from decode import decode
sha=lambda b:hashlib.sha256(b).hexdigest()
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo');args=ap.parse_args()
 manifest=json.loads((P/'manifest-sha256.json').read_text())
 actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
 assert actual==set(manifest),'unexpected or missing sealed files'
 for name,h in manifest.items():
  p=P/name;assert not p.is_symlink() and p.resolve().is_relative_to(P);assert sha(p.read_bytes())==h,name
 provenance=json.loads((P/'provenance.json').read_text());cache={}
 for row in provenance:
  copied=(P/row['copy']).read_bytes();assert sha(copied)==row['sha256'] and len(copied)==row['size']
  if row['selection']['kind']=='whole':
   assert sha(copied)==row['source_sha256'];assert hashlib.sha1(b'blob '+str(len(copied)).encode()+b'\0'+copied).hexdigest()==row['git_blob']
  if args.repo:
   key=row['source']
   if key not in cache:cache[key]=subprocess.check_output(['git','-C',args.repo,'show',row['checkpoint']+':'+key])
   full=cache[key];assert sha(full)==row['source_sha256'] and len(full)==row['source_size'];assert hashlib.sha1(b'blob '+str(len(full)).encode()+b'\0'+full).hexdigest()==row['git_blob']
   sel=row['selection'];kind=sel['kind']
   if kind=='whole':assert copied==full
   elif kind=='bytes':assert copied==full[sel['start']:sel['end']]
   elif kind=='lines':assert copied==b''.join(full.splitlines(keepends=True)[sel['start']-1:sel['end_inclusive']])
   elif kind=='relocation_projection':
    for rel in json.loads(copied):assert full[rel['file_offset']:rel['file_offset']+16].hex()==rel['raw_hex']
   elif kind=='json_projection':
    source=json.loads(full);selected=json.loads(copied)
    if row['copy'].endswith('dispatch.json'):
     source=source['mayhem'];assert selected['basis']==source['basis'] and selected['binary_sha256']==source['binary_sha256']
     for k,v in selected['instructions'].items():assert v==source['instructions'][k]
    elif row['copy'].endswith('state-role-windows.json'):
     for v in selected:assert v in source
    else:
     for k,v in selected.items():
      if k=='candidate_rows':
       for item in v:assert item in source[k]
      else:assert v==source[k]
 expected=analyze();assert expected==json.loads((P/'result.json').read_text()),'analysis differs'
 for row in json.loads((P/'windows.json').read_text()):
  raw=(P/row['path']).read_bytes();assert sha(raw)==row['sha256']
  if row['kind']=='code':assert decode(raw,row['start'])==(P/'windows'/f"{row['label']}.asm").read_text()
 print(json.dumps({'status':'PASS','sealed_files':len(manifest),'git_rebinding':bool(args.repo),'identified_constructor_calls':4,'static_selector_paths':4,'builds':0,'runtime_probes':0,'scope':'artifact integrity and bounded static witnesses; not exhaustive semantics/security'},indent=2))
if __name__=='__main__':main()
