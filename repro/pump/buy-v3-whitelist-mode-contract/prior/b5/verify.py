#!/usr/bin/env python3
"""Verify saved source/static evidence only; no target execution or compiler."""
from pathlib import Path,PurePosixPath
import argparse,gzip,hashlib,json,tarfile,tomllib
from analyze_closure import run
from make_proposal import compose
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def raw(n):
 p=PurePosixPath(n);assert not p.is_absolute()and '..'not in p.parts and not p.name.endswith('-keypair.json')and '__pycache__'not in p.parts and p.suffix!='.pyc';f=P/p;assert not f.is_symlink();return f.read_bytes()
def obj(n):return json.loads(raw(n))
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);args=ap.parse_args();m=obj('manifest.json');assert H(raw('manifest.json'))==raw('manifest.sha256').decode().split()[0]
 files={p.relative_to(P).as_posix()for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']};assert files==set(m)
 for n,v in m.items():b=raw(n);assert H(b)==v['sha256']and len(b)==v['bytes'],n
 bindings=obj('input-bindings.json')
 for row in bindings:
  b=raw(row['path']);assert H(b)==row['sha256']and len(b)==row['bytes']
  if args.repo:assert H((args.repo/row['source']).read_bytes())==row['sha256'],row['source']
 for namespace,prefix in [('composition','repro/pump/buy-v3-authentic-partial-composition/'),('parser','repro/pump/buy-v3-typed-parser-contract/'),('current','repro/pump/final-error-metadata-fortyeight/')]:
  mp='inputs/'+namespace+'/manifest.json';pm=obj(mp);assert H(raw(mp))==raw('inputs/'+namespace+'/manifest.sha256').decode().split()[0]
  for row in bindings:
   if row['source'].startswith(prefix):
    key=row['source'][len(prefix):]
    if key in ['manifest.json','manifest.sha256']:continue
    assert row['sha256']==pm[key]['sha256'],key
 lock=tomllib.loads(raw('inputs/current-source/programs/pump/Cargo.lock').decode());pkgs={x['name']:x for x in lock['package']}
 for row in obj('inputs/preparation-dependency-bindings.json'):
  assert pkgs[row['name']]['version']==row['version']and pkgs[row['name']]['checksum']==row['checksum']==H(raw(row['archive']))
  with tarfile.open(P/row['archive'])as t:
   for n in row['source_paths']:assert t.extractfile(n[len('dependencies/'):]).read()==raw(n)
 r=run();assert r==obj('closure-ledger.json')
 before,after,patch=compose()
 for n,s in after.items():assert raw('proposal/'+n).decode()==s,n
 assert raw('proposal/fee-mode-only.patch').decode()==patch
 assert after['buy_v3_body.rs'].count('buy_ordinary_fees(a,')==2
 assert 'buy_domain(a)?;'in after['buy_v3_body.rs']
 h=after['fee_mode.rs'];assert h.index('a.user.key() == a.global.whitelist_pda')<h.index('let info =')<h.index('let serialized_len')<h.index('fee_selection::ordinary_leg(')<h.index('drop(info)')
 assert h.index('!a.bonding_curve.complete')<h.index('!a.bonding_curve.is_cashback_coin')
 ledger=obj('inputs/composition/preservation-ledger.json');receipt=json.loads(gzip.decompress(raw('inputs/composition/evidence/v3_configured_fee.json.gz')));rows=[(i,x)for i,x in enumerate(receipt['cases'])if x['case']['operation']=='buy_v3'];assert len(rows)==ledger['count']==117
 for (i,row),saved in zip(rows,ledger['rows']):
  assert i==saved['index']and row['case']==saved['case']and row['match']is saved['match']is True
  assert row['original']['error']==saved['original_error']and H(json.dumps(row,sort_keys=True,separators=(',',':')).encode())==saved['saved_row_sha256']
  assert saved['base_mint_owner']=='TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
 assert sum(x['original']['error']is None for _,x in rows)==ledger['successes']==105 and ledger['failures']==12
 source=obj('current-source-sha256.json');assert len(source)==37 and source==obj('inputs/current/current-bindings.json')['groups']['source']
 if args.repo:
  for n,h in source.items():assert H((args.repo/n).read_bytes())==h,n
 result=obj('result.json');assert not any(result[k]for k in ['build_performed','runtime_performed','main_edited','integratable','preserves_all_saved_rows','full_original_equality','ordinary_selector_modified','optional_fill_modified','admission_fences_modified','alternate_mode_implemented','origin_metadata_exact'])
 print(json.dumps({'status':'PASS','payloads':len(m),'windows':len(r['windows']),'complete_immediate_callees':len(r['complete_immediate_callees']),'consumed_data':len(r['consumed_data']),'source_inputs':len(source),'proposal_files':len(after),'historical_rows':117,'successes':105,'failures':12,'builds':0,'new_transactions':0,'all_row_preservation_unproved':True},indent=2))
if __name__=='__main__':main()
