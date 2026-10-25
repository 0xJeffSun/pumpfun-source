#!/usr/bin/env python3
"""Portable complete static ledger/proposal verifier. No compiler, VM or network."""
import argparse,difflib,gzip,hashlib,importlib.util,json,tarfile
from pathlib import Path
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def load(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify(repo=None):
 manifest=json.loads((P/'manifest.json').read_text());files={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and str(f.relative_to(P))!='manifest.json'};assert files==set(manifest['files'])
 for n,h in manifest['files'].items():assert H((P/n).read_bytes())==h,n
 refs=json.loads((P/'input-provenance.json').read_text())
 for src,x in refs.items():
  assert H((P/x['copy']).read_bytes())==x['sha256']
  if repo is not None:assert H((repo/src).read_bytes())==x['sha256'],src
 original_seal=json.loads((P/'baseline/manifest.json').read_text())['files'];assert H((P/'baseline/manifest.json').read_bytes())=='c2377cfab442a00405243e8a85c8ce49f549f4facfa8b8a6e6a4fdddeec024f9'
 for f in (P/'baseline').iterdir():
  if f.name!='manifest.json':assert H(f.read_bytes())==original_seal[f.name]
 for f in (P/'source-before').rglob('*'):
  if f.is_file():assert H(f.read_bytes())==original_seal['source/'+str(f.relative_to(P/'source-before'))]
 prior=json.loads((P/'preliminary-nibble-only-manifest.json').read_text())
 with tarfile.open(P/'preliminary-nibble-only.tar.gz') as t:
  members=t.getmembers();assert all(m.isfile() for m in members) and set(m.name for m in members)==set(prior)
  for member in members:assert H(t.extractfile(member).read())==prior[member.name]
 old=load('historical_analysis',P/'baseline/analyze.py')
 for n,value in old.analyze(P/'baseline').items():
  raw=(P/'baseline'/n).read_bytes();actual=json.loads(gzip.decompress(raw) if n.endswith('.gz') else raw);assert value==actual,'historical algorithm: '+n
 a=(P/'baseline/analyze.py').read_text();b=(P/'analyze_relocation_first.py').read_text();assert ''.join(difflib.unified_diff(a.splitlines(True),b.splitlines(True),fromfile='a/baseline/analyze.py',tofile='b/analyze_relocation_first.py'))==(P/'analysis-classification.patch').read_text()
 assert b==a.replace("if regs>>4==1:\n     calls.append", "if rel and rel['type']==10:\n     external.append(dict(offset=i,pc=pc,immediate=imm,relocation=rel))\n    elif regs>>4==1:\n     calls.append")
 for n,value in load('full_ledger',P/'derive.py').derive().items():assert value==json.loads((P/n).read_text()),n
 delta=load('delta',P/'derive_classification_delta.py').derive();assert delta==json.loads((P/'classification-delta.json').read_text())
 assert len(delta['classification_changes'])==146 and len(delta['removed_normalized_pairs'])==58 and not delta['added_normalized_pairs'];assert delta['original_windows_losing_all_normalized_counterparts']==[409,412]
 assert delta['historical_summary']['original_raw_match_windows']==delta['corrected_summary']['original_raw_match_windows']==29
 assert delta['historical_summary']['original_normalized_match_windows']==112 and delta['corrected_summary']['original_normalized_match_windows']==110
 assert load('serializer_evidence',P/'derive_serializer.py').derive()==json.loads((P/'serializer-proof.json').read_text())
 source_map=json.loads((P/'source-proposal-sha256.json').read_text());assert len(source_map)==21;changed=[];patch=[]
 for n,h in source_map.items():
  f=P/'source-proposal'/n;before=P/'source-before'/n;assert H(f.read_bytes())==h
  if before.read_bytes()!=f.read_bytes():changed.append(n);patch.extend(difflib.unified_diff(before.read_text().splitlines(True),f.read_text().splitlines(True),fromfile='a/'+n,tofile='b/'+n))
 assert changed==['src/generated_exit.rs'];assert ''.join(patch)==(P/'source-proposal.patch').read_text()
 source=(P/'source-proposal/src/generated_exit.rs').read_text();assert source.count('Cursor::new(data)')==4 and source.count('writer.write_all(')==23
 assert 'if *pid!=RELAY || closed(rt,a) {return Ok(());}' in source
 assert 'write(data).map_err(|error| {drop(error);write_error()})' in source
 assert 'FnOnce(&mut [u8])->std::io::Result<()>' in source
 for old_call in ['||codec::tracker_bytes','||codec::debouncer_bytes','||codec::distribution_bytes','||codec::receipt_bytes']:assert old_call not in source
 assert H((P/'inputs/ordinary12-manifest.json').read_bytes())=='4b93a06a55bfe345df5338ded1486995e1a6580734f6426c70729a37d32834d6'
 assert H((P/'inputs/rejection01-manifest.json').read_bytes())=='0899cf316904bb232c59d3b757ce7f309b27cf4f1ba844fa83b7be52f1d13fe2'
 for prefix,result_name in [('ordinary12','ordinary12-result.json'),('rejection01','rejection01-result.json')]:assert H((P/'inputs'/result_name).read_bytes())==json.loads((P/'inputs'/f'{prefix}-manifest.json').read_text())['files']['verification-result.json']
 return {'verified':True,'payloads':len(files),'original_functions':492,'candidate_functions':282,'reclassified_call_sites':146,'historical_raw_matches':29,'historical_normalized_matches':112,'corrected_raw_matches':29,'corrected_normalized_matches':110,'original_unmatched_corrected':382,'external_symbol_conflicting_pairs':13,'changed_source_files':1,'source_proposal_compiled':False,'new_runtime_or_build_executions':0}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args();print(json.dumps(verify(a.repo),indent=2))
