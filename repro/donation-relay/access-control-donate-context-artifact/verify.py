"""Recheck actual builds, static layout gain, repeatability and saved signed replay."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,tempfile
HERE=Path(__file__).resolve().parent;ROOT=next(p for p in HERE.parents if (p/'.git').exists())
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):
 raw=p.read_bytes();return json.loads(gzip.decompress(raw)if p.suffix=='.gz'else raw)
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify():
 manifest=read(HERE/'manifest.json');assert set(manifest)=={str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}
 for n,h in manifest.items():p=HERE/n;assert not p.is_symlink()and sha(p.read_bytes())==h
 for n,h in read(HERE/'parents.json').items():assert sha((ROOT/n).read_bytes())==h
 source=module('access_artifact_source',ROOT/'repro/donation-relay/access-control-donate-context-source/verify.py');expected=source.verify();sources=source.sources();meta=read(HERE/'metadata.json')
 with tempfile.TemporaryDirectory()as tmp:
  builds={}
  for label in ['baseline','recovered','repeat']:
   b=HERE/'builds'/label;launch=read(b/'launch.json') if label=='baseline' else None;result=read(b/'result.json');log=(b/'build.log').read_bytes();src=sources['baseline'if label=='baseline'else'recovered']
   inputs=launch['inputs'] if launch else read(b/'source-inputs.json');command=launch['command'] if launch else read(b/'command.json')
   assert inputs=={n:sha(v)for n,v in src.items()}and len(src)==60
   if launch:assert launch['rustc_sha256']=='89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d'and launch['fresh_target']is False and launch['source_mtimes_refreshed']
   assert result['fresh_target']is False and result['dependency_cache_reused_from_verified_baseline']
   assert result['exit_code']==0 and result['source_unchanged']and result['root_invocations']==1 and log.count(b'--crate-name donation_relay_source_proposal ')==1 and sha(log)==result['build_log_sha256']
   assert all(x in command for x in ['--locked','--offline','sbpf-solana-solana','--remap-path-prefix=src/=programs/contracts/src/'])
   path=Path(tmp)/label;path.mkdir()
   for kind,name in [('candidate','candidate.so'),('symbols','unstripped.so')]:
    row=meta[label][kind];raw=gzip.decompress((ROOT/row['path']).read_bytes());assert sha(raw)==row['sha256']==result['candidate_sha256' if kind=='candidate' else 'unstripped_sha256']and len(raw)==row['bytes'];(path/name).write_bytes(raw)
   builds[label]=path
  assert meta['recovered']==meta['repeat']
  compare=module('access_artifact_compare',ROOT/'repro/donation-relay/access-control-donate-context-source/compare.py');assert compare.recompute({k:builds[k]for k in ['baseline','recovered']})==expected
  parser=module('access_inventory_parser',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');inventory=parser.analyze(compare.View(builds['recovered']))
  for name in ['comparison-summary.json','match-ledger.json']:assert inventory[name]==read(HERE/'analysis/recovered'/(name+'.gz'))
 runtime=read(HERE/'runtime.json.gz');assert runtime['candidate_sha256']==meta['recovered']['candidate']['sha256'];runner=ROOT/'repro/donation-relay/settlement-artifact-recovery/replay_saved.py';h=ROOT/'repro/donation-relay/local-validation-proposal/harness_proposal.py'
 assert runtime['runner_sha256']==sha(runner.read_bytes())and runtime['harness_sha256']==sha(h.read_bytes())and runtime['token2022_sha256']==sha((ROOT/'evidence/dependencies/spl_token_2022/deployed.so').read_bytes())
 frozen={}
 for n,hsh in runtime['input_reports'].items():
  p=ROOT/n;assert sha(p.read_bytes())==hsh;relative=p.relative_to(ROOT/'repro/donation-relay/distribution-worker-source-recovery/settlement')
  for i,row in enumerate(read(p)['cases']):frozen[str(relative)+':'+str(i)]=row
 helper=module('access_replay_verifier',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/verify.py');helper.EXPECTED['recovered']=meta['recovered']['candidate']['sha256'];assert helper.check_runtime(runtime,frozen,module('access_runtime_harness',h))==dict(records=536,unique_fixtures=534,mismatches=0)
 print('PASS: three real root builds; recovered and repeat artifacts identical; 492 normalized,379 raw; exact runtime block and headers; 536 replay records; whole identity remains false')
if __name__=='__main__':verify()
