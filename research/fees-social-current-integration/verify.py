"""Verify the exact social overlay and fresh402-candidate evidence."""
from pathlib import Path
import gzip,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1];sha=lambda b:hashlib.sha256(b).hexdigest()
def load(p):return json.loads(p.read_text())
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def receipt(label,name,e):
 p=ROOT/e['control_receipts'][name]if label=='control'and name!='strict'else HERE/f'receipts/{label}-{name}.json.gz'
 return json.loads(gzip.decompress(p.read_bytes()))
def strict_cases():
 rows=[]
 for flags in (0,1,2,3,255):
  for existing in (False,True):
   for user in ('','a'*20,'a'*21,'é'*10,'é'*11):
    for version in ((0,1,2,255)if existing else(0,)):rows.append(dict(flags=flags,existing=existing,user=user,version=version))
 for flags in (0,1,2,3):
  for version in (0,1,2,255):
   for user,n in [('a'*21,20),('é'*11,20)]:rows.append(dict(flags=flags,existing=True,version=version,user=user,patches=[(10,n.to_bytes(4,'little').hex())],state_length=179))
 return json.loads(json.dumps(rows))
def strict(r,negative):
 assert len(r['cases'])==157 and [x['case']for x in r['cases']]==strict_cases();bad=[i for i,x in enumerate(r['cases'])if x['original']!=x['candidate']];assert r['mismatches']==bad and all(x['match']==(x['original']==x['candidate'])for x in r['cases']);assert len(bad)==(117 if negative else 0);assert sum(x['original']['error']!=x['candidate']['error']for x in r['cases'])==(12 if negative else 0)
def main():
 manifest=load(HERE/'manifest.json');assert set(manifest)=={str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}
 for n,h in manifest.items():assert sha((HERE/n).read_bytes())==h,n
 for n,h in load(HERE/'parents.json').items():assert sha((ROOT/n).read_bytes())==h,n
 e=load(HERE/'experiment.json');parentraw=(HERE/'parent-experiment.json').read_bytes();upraw=(HERE/'upstream-social-evidence.json').read_bytes();assert sha(parentraw)==e['parent_experiment_sha256']and sha(upraw)==e['upstream_evidence_sha256'];parent=json.loads(parentraw)['variants']['origins'];up=json.loads(upraw);base=e['variants']['control'];v=e['variants']['origins'];assert base['input_sha256']==parent['input_sha256']and e['control_build_reused']and e['control_runtime_reused']
 for kind in ['candidate','symbols']:assert all(base['files'][kind][k]==parent['files'][kind][k]for k in ['sha256','bytes'])
 assert {n for n,h in base['input_sha256'].items()if v['input_sha256'][n]!=h}==set(up['overrides'])and len(up['overrides'])==2
 for n in up['overrides']:assert v['input_sha256'][n]==up['inputs'][n]
 for label,row in e['variants'].items():
  assert len(row['input_sha256'])==36 and set(row['source_paths'])==set(row['input_sha256'])
  for n,h in row['input_sha256'].items():assert sha((ROOT/row['source_paths'][n]).read_bytes())==h,n
  for kind,d in row['files'].items():
   raw=gzip.decompress((HERE/d['path']).read_bytes());assert len(raw)==d['bytes']and sha(raw)==d['sha256']
 launch=load(HERE/'builds/origins-launch.json');result=load(HERE/'builds/origins-result.json');log=(HERE/'builds/origins-build.log').read_bytes();assert launch['input_sha256']==result['input_sha256']==v['input_sha256']and result['exit_code']==result['strip_exit_code']==0 and result['source_unchanged'];assert log.count(b'--crate-name pump_fees_candidate ')==1 and b'-Zremap-cwd-prefix='in log and b'Finished `release` profile'in log
 assert launch['rustc_sha256']=='c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97'and 'sbpf-solana-solana'in launch['command']and sum(x.startswith('--remap-path-prefix=')for x in launch['command'])==3
 assert e['strip_replay']['exit_code']==0 and e['strip_replay']['sha256']==v['files']['candidate']['sha256']
 par=ROOT/'research/fees-admin-sharing-context';check=module('social_parent_checks',par/'verify.py');harness=load(par/'harness-sha256.json');assert len(harness)==187 and set(harness)=={str(p.relative_to(ROOT))for p in (ROOT/'scripts').glob('*.py')}
 for n,h in harness.items():assert sha((ROOT/n).read_bytes())==h
 r=module('social_join_analysis',HERE/'analyze.py').analyze();assert r==json.loads(gzip.decompress((HERE/'analysis.json.gz').read_bytes()))and r['delta']==dict(added=[190104],lost=[])and r['raw_delta']==dict(added=[],lost=[])
 for label,count,left in [('control',401,37),('origins',402,36)]:
  row=r['variants'][label];assert len(row['unique_pairs'])==count and len(row['unmatched_original'])==left and row['candidate_windows']==588 and row['unique_raw_pairs']==64 and not row['equals_original_capture']and not row['equals_original_elf_extent']
 data=r['social_data'];assert data['original']==data['candidate']==dict(strings=['social_fee_pda already exists','CreateSocialFeePda is currently disabled','programs/pump-fees/src/instructions/fee_sharing/create_social_fee_pda.rs'],guard_line=67,path_bytes=72)
 d={x['original']['address']:x for x in r['details']};assert len([x for x in d[190104]['calls']if x['original']['kind']=='local'])==18 and all(x['equal']for x in d[190104]['calls'])and all(x['equal']for x in d[381352]['calls']);assert [(x['offset'],x['original']['target'])for x in d[642848]['calls']if not x['equal']]==[(1176,127776)]
 assert r['preserved_program_reader']['original']==r['preserved_program_reader']['candidate']and all(x['original']==x['candidate']for x in r['preserved_admin_literals'].values())
 assert len(r['preserved_slice_contract']['locations'])==4 and len(r['preserved_common_locations'])==2 and r['preserved_relay']['address_error']==3007 and r['preserved_decoder']['message_record']['message']=='failed to fill whole buffer'
 for label in ['control','origins']:
  candidate=e['variants'][label]['files']['candidate']['sha256'];original='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e';f=receipt(label,'full',e);assert f['candidate_sha256']==candidate and f['original_sha256']==original and f['case_count']==17331 and len(f['suites'])==18 and not f['mismatches'];assert all(s['candidate_sha256']==candidate and s['original_sha256']==original and not s.get('mismatches',s.get('failures',[]))for s in f['suites'].values())
  f=receipt(label,'flags',e);assert f['candidate_sha256']==candidate and f['original_sha256']==original and f['case_count']==len(f['cases'])==1542 and not f['failures']and not f['compute_differences']and all(x['original']==x['candidate']for x in f['cases']);assert {(x['cap'],x['pool'],x['flag_hex'])for x in f['cases']}=={(cap,pool,flag)for cap in (0,1000,2**128-1)for pool in (0,1)for flag in ['']+[bytes([b]).hex()for b in range(256)]}
  for name,count in [('precedence',24),('optional',32),('seeds',20),('logs',8),('mint',30)]:
   f=receipt(label,name,e);assert f['candidate_sha256']==candidate and f['original_sha256']==original and f['case_count']==len(f['cases'])==count and not f['mismatches']and all(x['match']and all(x['original'][k]==x['candidate'][k]for k in f['fields'])for x in f['cases'])
  f=receipt(label,'relay',e);assert f['candidate_sha256']==candidate and f['original_sha256']==original;check.check_relay(f)
  f=receipt(label,'strict',e);assert f['candidate_sha256']==candidate and f['original_sha256']==original;strict(f,label=='control')
 raw=module('social_raw',HERE/'raw_compare.py').compare();assert raw==load(HERE/'raw-comparisons.json')and all(not x['capture_equal']and not x['elf_extent_equal']for x in raw.values())
 print('PASS: exact merged social fix integrated;402unique/36unmatched;18local callees+imports;157strict cases vs117control mismatches; fresh regressions;whole0/4')
if __name__=='__main__':main()
