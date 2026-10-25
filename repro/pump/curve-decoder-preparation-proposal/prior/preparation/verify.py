#!/usr/bin/env python3
"""Pure saved/static verification; no target execution, compiler, signing or network."""
from pathlib import Path,PurePosixPath
import argparse,gzip,hashlib,json,tarfile,tomllib
from analyze_closure import run
from make_proposal import compose
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def raw(n):
 p=PurePosixPath(n);assert not p.is_absolute()and '..'not in p.parts and not p.name.endswith('-keypair.json');f=P/p;assert not f.is_symlink();return f.read_bytes()
def obj(n):return json.loads(raw(n))
def main():
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path);args=a.parse_args();m=obj('manifest.json');assert H(raw('manifest.json'))==raw('manifest.sha256').decode().split()[0]
 files={p.relative_to(P).as_posix()for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']};assert files==set(m)
 for n,v in m.items():b=raw(n);assert len(b)==v['bytes']and H(b)==v['sha256'],n
 pm=obj('inputs/manifest.json');assert H(raw('inputs/manifest.json'))==raw('inputs/manifest.sha256').decode().split()[0]
 for row in obj('parent-input-bindings.json'):
  v=pm[row['parent_path']];assert v['sha256']==row['sha256']==H(raw(row['path']))and v['size']==row['bytes']==len(raw(row['path']))
 lock=tomllib.loads(raw('inputs/current-Cargo.lock').decode());pkgs={x['name']:x for x in lock['package']}
 for row in obj('dependency-bindings.json'):
  assert pkgs[row['name']]['version']==row['version']and pkgs[row['name']]['checksum']==row['checksum']==H(raw(row['archive']))
  with tarfile.open(P/row['archive'])as t:
   for n in row['source_paths']:assert t.extractfile(n[len('dependencies/'):]).read()==raw(n)
 assert run()==obj('closure-ledger.json')
 before,after,patch=compose();assert raw('proposal/admission.rs').decode()==after and raw('proposal/preparation-only.patch').decode()==patch
 assert 'a.bonding_curve.to_account_info().data_len()<166' in before and 'a.bonding_curve.to_account_info().data_len()<166'in after
 assert before[:before.index('fn buy_prepare_curve')]==after[:after.index('fn buy_prepare_curve')]
 assert before[before.index('fn buy_membership'):]==after[after.index('fn buy_membership'):]
 assert after.index('buy_fund_curve_rent(a, current_size.max(166))?')<after.index('if current_size < 166')<after.index('realloc(166, false)?')
 assert 'try_deserialize'not in after[after.index('fn buy_prepare_curve'):after.index('fn buy_membership')]
 ledger=obj('inputs/preservation-ledger.json');receipt=json.loads(gzip.decompress(raw('inputs/evidence/v3_configured_fee.json.gz')));rows=[(i,r)for i,r in enumerate(receipt['cases'])if r['case']['operation']=='buy_v3'];assert len(rows)==ledger['count']==117 and ledger['successes']==105 and ledger['failures']==12
 for (index,row),saved in zip(rows,ledger['rows']):
  assert index==saved['index']and row['case']==saved['case']and row['match']is saved['match']is True
  assert row['original']['error']==saved['original_error']and H(json.dumps(row,sort_keys=True,separators=(',',':')).encode())==saved['saved_row_sha256']
  assert saved['base_mint_owner']=='TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
  key=saved['volume_key'];assert row['original']['accounts'][key]==row['candidate']['accounts'][key]
 assert sum(row['original']['error']is None for _,row in rows)==105
 result=obj('result.json');assert not any(result[k]for k in ['build_performed','runtime_performed','main_edited','integratable','preserves_all_saved_rows','full_original_equality'])
 if args.repo:
  for n,h in obj('current-source-sha256.json').items():assert H((args.repo/n).read_bytes())==h,n
 print(json.dumps({'status':'PASS','payloads':len(m),'raw_windows':4,'complete_direct_callee_windows':15,'locked_archives':4,'saved_rows':117,'saved_successes':105,'saved_failures':12,'proposal_files':1,'all_row_preservation_unproved':True,'builds':0,'transactions':0,'main_edited':False},indent=2))
if __name__=='__main__':main()
