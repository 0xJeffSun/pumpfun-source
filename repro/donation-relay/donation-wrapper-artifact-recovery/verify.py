"""Verify independent wrapper builds, complete inventories and retained signed replay."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,tempfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]

def sha(raw):return hashlib.sha256(raw).hexdigest()
def read(path):
 raw=path.read_bytes();return json.loads(gzip.decompress(raw)if path.suffix=='.gz'else raw)
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def artifact(row):
 p=ROOT/row['path']if row['path'].startswith('repro/')else HERE/row['path'];raw=gzip.decompress(p.read_bytes());assert len(raw)==row['bytes']and sha(raw)==row['sha256'];return raw

def analyze(write=False):
 meta=read(HERE/'metadata.json');parser=module('wrapper_artifact_parser',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');compare=module('wrapper_artifact_compare',ROOT/'repro/donation-relay/donation-wrapper-source-proposal/compare.py')
 with tempfile.TemporaryDirectory(prefix='wrapper-artifact-')as t:
  temp=Path(t);dirs={}
  for label,descriptors in [('baseline',meta['baseline_artifacts']),('native490',meta['variants']['native490']['artifacts']),('complete492',meta['variants']['recovered']['artifacts'])]:
   d=temp/label;d.mkdir();dirs[label]=d
   for kind,name in [('candidate','candidate.so'),('symbols','symbols.so')]: (d/name).write_bytes(artifact(descriptors[kind]))
  results=compare.recompute(dirs);assert results==read(ROOT/'repro/donation-relay/donation-wrapper-source-proposal/expected.json')
  d=dirs['complete492'];(d/'original.so').write_bytes((ROOT/'evidence/dependencies/donation_relay/deployed.so').read_bytes());(d/'original-windows.json').write_bytes((ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json').read_bytes());(d/'unstripped.so').write_bytes((d/'symbols.so').read_bytes());analysis=parser.analyze(d)
 if write:
  out=HERE/'analysis/recovered';out.mkdir(parents=True,exist_ok=True)
  for name,value in analysis.items():
   raw=(json.dumps(value,sort_keys=True,indent=2)+'\n').encode();p=out/name
   if name not in ['comparison-summary.json','match-ledger.json','section-comparison.json','allocated-strip-identity.json']:
    if not name.endswith('.gz'):p=Path(str(p)+'.gz')
    p.write_bytes(gzip.compress(raw,mtime=0))
   else:p.write_bytes(raw)
 else:
  for name,value in analysis.items():
   p=HERE/'analysis/recovered'/name
   if not p.exists():p=Path(str(p)+'.gz')
   assert read(p)==value,(name,'saved analysis differs')
 return results,analysis

def verify():
 manifest=read(HERE/'manifest.json');assert set(manifest)=={str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts}
 for name,h in manifest.items():
  p=HERE/name;assert not p.is_symlink()and p.resolve().is_relative_to(HERE)and sha(p.read_bytes())==h,name
 for name,h in read(HERE/'parents.json').items():assert sha((ROOT/name).read_bytes())==h,name
 source=module('wrapper_artifact_source',ROOT/'repro/donation-relay/donation-wrapper-source-proposal/verify.py');source.manifest();sources=source.sources();meta=read(HERE/'metadata.json')
 for label,kind in [('native490','native490'),('complete492','recovered')]:
  p=HERE/'builds'/label;launch=read(p/'launch.json');result=read(p/'result.json');log=(p/'build.log').read_bytes()
  assert launch['inputs']=={n:sha(b)for n,b in sources[label].items()}and len(launch['inputs'])==60
  assert launch['rustc_sha256']=='89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d'
  assert result['exit_code']==0 and result['source_unchanged']and result['root_invocations']==1 and log.count(b'--crate-name donation_relay_source_proposal ')==1 and sha(log)==result['build_log_sha256']
  assert all(x in launch['command']for x in ['--offline','--locked','sbpf-solana-solana','--remap-path-prefix=src/=programs/contracts/src/'])
  for image in ['candidate','symbols']:assert result[image+'_sha256']==meta['variants'][kind]['artifacts'][image]['sha256']
 results,analysis=analyze();summary=analysis['comparison-summary.json'];assert summary['original_normalized_match_windows']==492 and summary['original_raw_match_windows']==317 and summary['unmatched_original_windows']==0 and not summary['whole_file_equal']
 runtime=read(HERE/'runtime.json.gz');assert runtime['runner_sha256']==sha((ROOT/'repro/donation-relay/settlement-artifact-recovery/replay_saved.py').read_bytes())and runtime['candidate_sha256']==summary['candidate_sha256']
 harness=ROOT/'repro/donation-relay/local-validation-proposal/harness_proposal.py';assert runtime['harness_sha256']==sha(harness.read_bytes())and runtime['token2022_sha256']==sha((ROOT/'evidence/dependencies/spl_token_2022/deployed.so').read_bytes())
 frozen={}
 for name,h in runtime['input_reports'].items():
  p=ROOT/name;assert sha(p.read_bytes())==h;relative=p.relative_to(ROOT/'repro/donation-relay/distribution-worker-source-recovery/settlement')
  for i,row in enumerate(read(p)['cases']):frozen[str(relative)+':'+str(i)]=row
 helper=module('wrapper_replay_verifier',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/verify.py');helper.EXPECTED['recovered']=summary['candidate_sha256'];assert helper.check_runtime(runtime,frozen,module('wrapper_replay_harness',harness))==dict(records=536,unique_fixtures=534,mismatches=0)
 print('PASS: independent 490/492 builds; 317 raw-local matches; 18 wrapper callees; all positional data checks; 536 replay records; whole ELF unequal')
if __name__=='__main__':verify()
