#!/usr/bin/env python3
"""Check archive byte integrity and completed build bindings; execute no archived code."""
from pathlib import Path,PurePosixPath
from concurrent.futures import ThreadPoolExecutor
import argparse,gzip,hashlib,json
P=Path(__file__).resolve().parent

def digest_stream(f):
 h=hashlib.sha256();n=0
 while chunk:=f.read(1024*1024):h.update(chunk);n+=len(chunk)
 return h.hexdigest(),n

def hash_file(p):
 with p.open('rb')as f:return digest_stream(f)

def logical_bytes(row):
 p=P/row['stored_path'];return gzip.decompress(p.read_bytes())if row['codec']=='gzip'else p.read_bytes()

def verify(expected_seal):
 assert hash_file(P/'manifest.json')[0]==expected_seal
 m=json.loads((P/'manifest.json').read_text());rows=m['files'];paths=[r['stored_path']for r in rows];assert len(paths)==len(set(paths))
 assert set(paths)|{'manifest.json'}=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()}
 def one(row):
  rel=PurePosixPath(row['stored_path']);assert not rel.is_absolute()and'..'not in rel.parts
  p=P/rel;assert not p.is_symlink();assert hash_file(p)==(row['stored_sha256'],row['stored_bytes'])
  if row['codec']=='gzip':
   with gzip.open(p,'rb')as f:got=digest_stream(f)
  else:assert row['codec']=='identity';got=hash_file(p)
  assert got==(row['original_sha256'],row['original_bytes']),row['stored_path']
 with ThreadPoolExecutor(max_workers=6)as ex:list(ex.map(one,rows))
 source={row['original_path']:row for row in rows if row['original_path']is not None};index=json.loads((P/'index.json').read_text());checks=[]
 for root in index['roots']:
  for build in root['builds']:
   base='work/'+root['name']+'/'+build['directory']+'/';record=json.loads(logical_bytes(source[base+'build-comparison.json']));assert record['returncode']==0 and record['source_unchanged']and record['source_sha256']==record['source_after_sha256']
   assert source[base+'artifacts/pump_amm_recovered.so']['original_sha256']==record['comparison']['candidate_sha256']==build['candidate_sha256']
   assert source[base+'artifacts/unstripped.so']['original_sha256']==record['unstripped_sha256']==build['symbols_sha256']
   assert source[base+'build.log']['original_sha256']==record['build_log_sha256']
   local=0
   for name,digest in record['source_sha256'].items():
    if name in source:assert source[name]['original_sha256']==digest;local+=1
   checks.append({'experiment':root['name'],'build':build['directory'],'bound_source_inputs':local,'external_inputs_retained_as_build_hashes':len(record['source_sha256'])-local})
 total=sum(r['stored_bytes']for r in rows);assert total<250*1024**2
 return{'verified':True,'scope':'Archive integrity and recorded completed-build bindings only; no experimental result promoted.','experiments':len(index['roots']),'completed_builds':len(checks),'files':len(rows),'stored_bytes':total,'logical_bytes':sum(r['original_bytes']for r in rows),'build_checks':checks,'executes_build_or_runtime':False}
if __name__=='__main__':
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--expected-seal',required=True);a=ap.parse_args();print(json.dumps(verify(a.expected_seal),indent=2))
