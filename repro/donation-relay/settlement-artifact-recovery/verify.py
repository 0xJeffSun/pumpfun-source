"""Recompute source/build bindings, settlement bodies and retained signed replay."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,tomllib
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(path):
 raw=path.read_bytes();return json.loads(gzip.decompress(raw)if path.suffix=='.gz'else raw)
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
 manifest=read(HERE/'manifest.json');assert set(manifest)=={str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}
 for name,digest in manifest.items():
  p=HERE/name;assert not p.is_symlink()and p.resolve().is_relative_to(HERE)and sha(p.read_bytes())==digest,name
 for name,digest in read(HERE/'parents.json').items():assert sha((ROOT/name).read_bytes())==digest,name
 meta=read(HERE/'metadata.json');proposal=module('settlement_source_parent',ROOT/'repro/donation-relay/settlement-bodies-source-proposal/verify.py');proposal.manifest();sources=proposal.sources();maps={label:{name:sha(data)for name,data in source.items()}for label,source in sources.items()};assert all(len(x)==60 for x in maps.values())
 sdk=read(HERE/'builds/sdk-check.json');assert sdk==dict(sdk_files=2873,archive_bytes=516334851,archive_sha256='a9d3157f937d5f6faf4321a35a8035e0f827114a663b0150db492e893ec27597',all_match=True)
 registry=read(HERE/'builds/registry-check.json');locked={p['name']+'-'+p['version']:p['checksum']for p in tomllib.loads(sources['recovered']['Cargo.lock'].decode())['package']if p.get('source','').startswith('registry+')};assert len(locked)==registry['packages']==253 and {r['name']:r['checksum']for r in registry['rows']}==locked and sum(r['files']for r in registry['rows'])==registry['files']==7968 and registry['all_match']
 container=read(HERE/'builds/container.json');assert [(m['Destination'],m['RW'])for m in container['Mounts']]==[('/sdk',False),('/work',True),('/cargo/registry',False)]
 environment=read(HERE/'builds/cached-environment.json');assert '--network'in environment['create_command']and environment['create_command'][environment['create_command'].index('--network')+1]=='none'
 for label in ['baseline','recovered']:
  launch=read(HERE/f'builds/{label}/launch.json');result=read(HERE/f'builds/{label}/result.json');log=(HERE/f'builds/{label}/build.log').read_bytes();assert launch['inputs']==maps[label]and launch['fresh_target']and launch['rustc_sha256']=='89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d'
  assert result['exit_code']==0 and result['source_unchanged']and result['root_invocations']==1 and log.count(b'--crate-name donation_relay_source_proposal ')==1 and sha(log)==result['build_log_sha256']
  cmd=launch['command'];assert '--locked'in cmd and '--offline'in cmd and 'sbpf-solana-solana'in cmd and '--remap-path-prefix=src/=programs/contracts/src/'in cmd
  artifacts=meta['baseline_artifacts']if label=='baseline'else meta['variants']['recovered']['artifacts']
  for kind,desc in artifacts.items():
   raw=gzip.decompress((HERE/desc['path']).read_bytes());assert sha(raw)==desc['sha256']==result[kind+'_sha256']and len(raw)==desc['bytes']
  assert artifacts['candidate']['bytes']==result['candidate_bytes']
 analysis=module('settlement_artifact_analysis',HERE/'analyze.py').analyze()
 for label,files in analysis.items():
  for name,value in files.items():
   p=HERE/'analysis'/label/name
   if not p.exists():p=Path(str(p)+'.gz')
   assert read(p)==value,(label,name)
 before,after=analysis['baseline'],analysis['recovered'];b=before['comparison-summary.json'];a=after['comparison-summary.json'];expected=read(ROOT/'repro/donation-relay/settlement-bodies-source-proposal/expected.json');assert b==expected['baseline']['summary']and a==expected['recovered']['summary']
 cov=lambda r:{x['ordinal']for x in r['match-ledger.json']if x['normalized_candidate_indices']};assert cov(after)-cov(before)=={97,98,100}and not cov(before)-cov(after)
 assert a['original_normalized_match_windows']==488 and a['original_raw_match_windows']==142 and not a['whole_file_equal'];assert [x['ordinal']for x in after['match-ledger.json']if not x['normalized_candidate_indices']]==[92,93,94,95]
 for ordinal,count in [(97,36),(98,38),(100,25)]:
  pair=next(x for x in after['match-witnesses.json']if x['original_ordinal']==ordinal and x['candidate_index']==ordinal);assert len(pair['direct_calls'])==count and all(x['normalized_body_pair']and x['recursive_call_shape_closed']for x in pair['direct_calls'])and not pair['indirect_calls']and not pair['raw_body']
 graph=module('settlement_source_compare',ROOT/'repro/donation-relay/settlement-bodies-source-proposal/compare.py');parser=module('settlement_parser',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');original=(ROOT/'evidence/dependencies/donation_relay/deployed.so').read_bytes();symbols=gzip.decompress((HERE/meta['variants']['recovered']['artifacts']['symbols']['path']).read_bytes());g=graph.data_graph(parser,after,original,symbols);rows=g.pop('rows');g['complete_rows_sha256']=sha((json.dumps(rows,sort_keys=True,indent=2)+'\n').encode());assert g==expected['data_graph']
 runtime=read(HERE/'fresh-runtime.json.gz');assert runtime['runner_sha256']==sha((HERE/'replay_saved.py').read_bytes())and runtime['candidate_sha256']==a['candidate_sha256'];h=ROOT/'repro/donation-relay/local-validation-proposal/harness_proposal.py';assert runtime['harness_sha256']==sha(h.read_bytes())and runtime['token2022_sha256']==sha((ROOT/'evidence/dependencies/spl_token_2022/deployed.so').read_bytes())
 frozen={}
 for name,digest in runtime['input_reports'].items():
  path=ROOT/name;assert sha(path.read_bytes())==digest
  rel=path.relative_to(ROOT/'repro/donation-relay/distribution-worker-source-recovery/settlement')
  for i,row in enumerate(read(path)['cases']):frozen[str(rel)+':'+str(i)]=row
 helper=module('settlement_replay_check',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/verify.py');helper.EXPECTED['recovered']=a['candidate_sha256'];r=helper.check_runtime(runtime,frozen,module('settlement_harness',h));assert r==dict(records=536,unique_fixtures=534,mismatches=0)
 print('PASS: independent 485/488 builds; 99 settlement callees; exact rodata and positional data checks; 536 replay records; 4 unmatched windows')
if __name__=='__main__':main()
