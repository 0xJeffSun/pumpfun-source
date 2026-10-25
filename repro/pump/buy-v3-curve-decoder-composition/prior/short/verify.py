#!/usr/bin/env python3
"""Saved/static verification only; no compiler, VM, transaction or network."""
from pathlib import Path,PurePosixPath
import argparse,gzip,hashlib,json,tarfile,tomllib
from analyze_closure import run,VERSIONS,FIELDS
from make_fragment import SOURCE
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def raw(n):
 p=PurePosixPath(n);assert not p.is_absolute()and '..'not in p.parts and '__pycache__'not in p.parts and p.suffix!='.pyc'and not p.name.endswith('-keypair.json');f=P/p;assert not f.is_symlink();return f.read_bytes()
def obj(n):return json.loads(raw(n))
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);args=ap.parse_args();m=obj('manifest.json');assert H(raw('manifest.json'))==raw('manifest.sha256').decode().split()[0]
 actual={f.relative_to(P).as_posix()for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']};assert actual==set(m)
 for n,v in m.items():b=raw(n);assert H(b)==v['sha256']and len(b)==v['bytes'],n
 bindings=obj('input-bindings.json')
 for r in bindings:
  assert H(raw(r['path']))==r['sha256']and len(raw(r['path']))==r['bytes']
  if args.repo:assert H((args.repo/r['source']).read_bytes())==r['sha256'],r['source']
 for name,prefix in obj('upstream-origins.json').items():
  mp='inputs/'+name+'/manifest.json';pm=obj(mp);assert H(raw(mp))==raw('inputs/'+name+'/manifest.sha256').decode().split()[0]
  for r in bindings:
   if r['source'].startswith(prefix+'/'):
    key=r['source'][len(prefix)+1:]
    if key in['manifest.json','manifest.sha256']:continue
    v=pm[key];assert (v if isinstance(v,str)else v['sha256'])==r['sha256'],key
 lock=tomllib.loads(raw('inputs/current-source/programs/pump/Cargo.lock').decode());pkgs={(p['name'],p['version']):p for p in lock['package']}
 for d in obj('dependency-bindings.json'):
  assert H(raw(d['archive']))==d['checksum']==pkgs[(d['name'],d['version'])]['checksum']
  with tarfile.open(P/d['archive'])as t:
   for n in d['sources']:assert t.extractfile(n.removeprefix('dependencies/')).read()==raw(n)
 r=run();assert r==obj('closure-ledger.json');assert len(VERSIONS)==9 and len(FIELDS)==19
 assert raw('source/checked_curve_reader.rs').decode()==SOURCE
 assert SOURCE.index('*buf = &buf[8..]')<SOURCE.index('historical_len < 41')
 assert 'AccountDidNotDeserialize' not in SOURCE.split('fn decode_original_checked_curve')[1]
 ledger=obj('inputs/composition/preservation-ledger.json');saved=json.loads(gzip.decompress(raw('inputs/composition/evidence/v3_configured_fee.json.gz')));rows=[(i,x)for i,x in enumerate(saved['cases'])if x['case']['operation']=='buy_v3'];assert len(rows)==ledger['count']==117
 for (i,x),row in zip(rows,ledger['rows']):
  assert i==row['index']and x['case']==row['case']and x['match']is row['match']is True
  assert H(json.dumps(x,sort_keys=True,separators=(',',':')).encode())==row['saved_row_sha256']
  assert row['base_mint_owner']=='TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
 assert sum(x['original']['error']is None for _,x in rows)==105
 source=obj('current-source-sha256.json');assert len(source)==37 and source==obj('inputs/current/current-bindings.json')['groups']['source']
 if args.repo:
  for n,h in source.items():assert H((args.repo/n).read_bytes())==h,n
 assert 'a.bonding_curve.to_account_info().data_len()<166'in raw('inputs/composition/source/admission.rs').decode()
 out=obj('result.json');assert not any(out[k]for k in ['integratable','build_performed','runtime_performed','main_edited','size_fence_removed','unchecked_reader_claimed','full_original_equality'])
 print(json.dumps({'status':'PASS','payloads':len(m),'windows':len(r['windows']),'complete_direct_callees':len(r['complete_direct_callees']),'historical_versions':9,'minimum_total_bytes':49,'fields':19,'saved_rows':117,'saved_successes':105,'saved_failures':12,'source_inputs':37,'builds':0,'new_transactions':0,'size_fence_removed':False},indent=2))
if __name__=='__main__':main()
