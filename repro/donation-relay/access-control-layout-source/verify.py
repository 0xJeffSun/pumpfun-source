"""Source-only access-control recovery verification and safe materialization."""
from pathlib import Path
import argparse,difflib,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(b):return hashlib.sha256(b).hexdigest()
def read(n):return json.loads((HERE/n).read_bytes())
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def manifest():
 records=read('manifest.json');assert set(records)=={str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}
 for n,h in records.items():
  p=HERE/n;assert not p.is_symlink()and p.resolve().is_relative_to(HERE)and sha(p.read_bytes())==h;assert b'\0'not in p.read_bytes();p.read_text()
 for n,h in read('parents.json').items():assert sha((ROOT/n).read_bytes())==h

def sources():
 parent=module('access_parent',ROOT/'repro/donation-relay/donation-wrapper-source-proposal/verify.py');parent.manifest();baseline=parent.sources()['complete492'];after=dict(baseline);after['src/lib.rs']=(HERE/'overrides/lib.rs').read_bytes();assert [n for n in after if after[n]!=baseline[n]]==['src/lib.rs']
 patch=''.join(difflib.unified_diff(baseline['src/lib.rs'].decode().splitlines(True),after['src/lib.rs'].decode().splitlines(True),fromfile='a/src/lib.rs',tofile='b/src/lib.rs'))
 assert patch.encode()==(HERE/'source.patch').read_bytes()
 result={'baseline':baseline,'recovered':after};assert {k:{n:sha(v)for n,v in s.items()}for k,s in result.items()}==read('source-inputs.json');assert all(len(v)==60 for v in result.values())
 return result

def verify():
 manifest();sources();r=read('expected.json');b,c=r['reports']['baseline'],r['reports']['recovered'];assert b['summary']['original_normalized_match_windows']==c['summary']['original_normalized_match_windows']==492;assert b['summary']['original_raw_match_windows']==317 and c['summary']['original_raw_match_windows']==376;assert c['summary']['common_position_different_bytes']==9398 and not c['summary']['whole_file_equal'];assert r['transition']['normalized']==dict(gains=[],losses=[]) and not r['transition']['raw']['losses']and len(r['transition']['raw']['gains'])==59
 assert all(x['raw_equal']and x['same_address']and x['candidate_index']==x['ordinal']and x['all_callees_closed']and not x['indirect_calls']for x in c['block']);assert sum(x['direct_calls']for x in c['block'])==103;assert all(x['different']==0 for x in c['headers'].values());g=c['data_graph'];assert g['full_rodata_equal']and g['relocated_data_shape_equal']and g['relocated_pointer_count']==359 and g['exact_nonpointer_qwords']==507 and g['text_targets_with_indirect_calls']==5
 return r
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--materialize',type=Path);p.add_argument('--variant',choices=['baseline','recovered'],default='recovered');p.add_argument('--baseline-build',type=Path);p.add_argument('--recovered-build',type=Path);args=p.parse_args();expected=verify()
 if args.materialize:
  assert not args.materialize.exists();args.materialize.mkdir(parents=True)
  for n,raw in sources()[args.variant].items():f=args.materialize/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(raw)
 assert bool(args.baseline_build)==bool(args.recovered_build)
 if args.baseline_build:
  compare=module('access_optional_compare',HERE/'compare.py');assert compare.recompute(dict(baseline=args.baseline_build,recovered=args.recovered_build))==expected
 print('PASS: one ordinary Rust source change, 60 inputs; 492 normalized and 376 raw metadata matches; optional ELF comparison '+('performed'if args.baseline_build else 'not requested')+'; no compilation or runtime execution')
