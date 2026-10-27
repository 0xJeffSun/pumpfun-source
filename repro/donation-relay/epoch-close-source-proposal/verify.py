#!/usr/bin/env python3
"""Source-only materialization and optional comparison of local compiler outputs.

No compiler, target VM, network operation or runtime receipt is used here.
Default verification/materialization never reads a program ELF.
"""
import argparse,difflib,hashlib,importlib.util,json,tempfile
from pathlib import Path,PurePosixPath
HERE=Path(__file__).resolve().parent
ROOT=next(p for p in HERE.parents if(p/'.git').exists())
PARENT='repro/donation-relay/security-metadata-source-recovery'
PARSER='repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py'
WINDOWS='repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json'
ORIGINAL='evidence/dependencies/donation_relay/deployed.so'
def sha(raw):return hashlib.sha256(raw).hexdigest()
def read(path):return json.loads(path.read_bytes())
def module(name,path):
 spec=importlib.util.spec_from_file_location(name,path);result=importlib.util.module_from_spec(spec);spec.loader.exec_module(result);return result

def safe_name(name):
 path=PurePosixPath(name);assert name and name!='.'and not path.is_absolute()and '..'not in path.parts and str(path)==name;return path

def safe_file(root,name):
 path=root
 for part in safe_name(name).parts:path=path/part;assert not path.is_symlink()
 assert path.resolve().is_relative_to(root.resolve());return path

def check_manifest():
 expected=read(HERE/'manifest.json');actual={str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts};assert actual==set(expected)
 for name,digest in expected.items():assert sha(safe_file(HERE,name).read_bytes())==digest,name

def check_parents():
 for group in read(HERE/'parent-inputs.json').values():
  for name,digest in group.items():assert sha(safe_file(ROOT,name).read_bytes())==digest,name

def validate_sources(baseline,recovered):
 expected=read(HERE/'source-inputs.json');recipe=read(HERE/'recipe.json');assert len(baseline)==len(recovered)==56 and set(baseline)==set(recovered)
 for label,source in [('baseline',baseline),('recovered',recovered)]:
  for name in source:safe_name(name)
  assert{name:sha(data)for name,data in source.items()}==expected[label]
 changed=sorted(n for n in baseline if baseline[n]!=recovered[n]);assert changed==recipe['changed_files']
 patch=''
 for name in changed:patch+=''.join(difflib.unified_diff(baseline[name].decode().splitlines(keepends=True),recovered[name].decode().splitlines(keepends=True),fromfile='a/'+name,tofile='b/'+name))
 assert patch.encode()==(HERE/'source.patch').read_bytes();return changed

def sources():
 check_parents();parent=module('followup_public_source_parent',ROOT/PARENT/'verify.py');public,_=parent.sources();expected=read(HERE/'source-inputs.json');assert{n:sha(b)for n,b in public.items()}==expected['public_482']
 recipe=read(HERE/'recipe.json');baseline=dict(public)
 for target,path in recipe['baseline_overrides'].items():assert target in baseline;baseline[target]=safe_file(HERE,path).read_bytes()
 recovered=dict(baseline)
 for target,path in recipe['recovered_overrides'].items():assert target in recovered;recovered[target]=safe_file(HERE,path).read_bytes()
 validate_sources(baseline,recovered);return baseline,recovered

def materialize(destination,source):
 assert not destination.exists()and not destination.is_symlink();destination.mkdir(parents=True)
 for name,data in source.items():
  path=safe_file(destination,name);path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(data)
 assert{str(p.relative_to(destination)):sha(p.read_bytes())for p in destination.rglob('*')if p.is_file()}=={n:sha(b)for n,b in source.items()}

def check_analysis(baseline,recovered):
 expected=read(HERE/'expected.json');recipe=read(HERE/'recipe.json');summary=recovered['comparison-summary.json'];previous=baseline['comparison-summary.json']
 for label,result in [('baseline',previous),('recovered',summary)]:
  for kind,key in [('candidate','candidate_sha256'),('symbols','unstripped_sha256')]:assert result[key]==expected[label+'_'+kind+'_sha256']
  assert result['original_sha256']==expected['original_sha256']and result['original_inferred_windows']==492
  assert result['original_normalized_match_windows']==expected[label+'_normalized_windows']and result['original_raw_match_windows']==expected[label+'_raw_windows']
  assert not result['whole_file_equal']
 before={r['ordinal']for r in baseline['match-ledger.json']if r['normalized_candidate_indices']};after={r['ordinal']for r in recovered['match-ledger.json']if r['normalized_candidate_indices']};ordinal=recipe['gained_ordinal'];assert after-before=={ordinal}and not before-after
 original=recovered['original-function-ledger.json'][ordinal];selected=[f for f in recovered['candidate-function-ledger.json']if any(recipe['function_name_fragment']in n for n in f['names'])];assert len(selected)==1;candidate=selected[0]
 assert original['bytes']==candidate['bytes']==expected['function_bytes'];assert original['normalized_sha256']==candidate['normalized_sha256']==expected['function_normalized_sha256']
 witness=next(w for w in recovered['match-witnesses.json']if w['original_ordinal']==ordinal and w['candidate_index']==candidate['index']);assert not witness['raw_body']
 calls=witness['direct_calls'];matched=sum(c['normalized_body_pair']for c in calls);assert len(calls)==expected['direct_call_sites']and matched==expected['matched_direct_callee_sites']
 return{'normalized_windows':summary['original_normalized_match_windows'],'raw_windows':summary['original_raw_match_windows'],'gained':[ordinal],'lost':[],'function_bytes':original['bytes'],'direct_call_sites':len(calls),'matched_direct_callee_sites':matched,'whole_file_equal':False,'common_position_different_bytes':summary['common_position_different_bytes'],'original_only_tail':summary['original_only_tail'],'scope':'Complete normalized local instruction window; not semantic/data/indirect closure or runtime verification.'}

def compare(paths):
 check_parents();expected=read(HERE/'expected.json');original=(ROOT/ORIGINAL).read_bytes();assert sha(original)==expected['original_sha256'];analyzer=module('followup_pinned_elf_parser',ROOT/PARSER);results={}
 with tempfile.TemporaryDirectory(prefix='relay-local-comparison-')as temp:
  directory=Path(temp);(directory/'original.so').write_bytes(original);(directory/'original-windows.json').write_bytes((ROOT/WINDOWS).read_bytes())
  for label in ['baseline','recovered']:
   for kind,name in [('candidate','candidate.so'),('symbols','unstripped.so')]:
    raw=paths[label+'_'+kind].read_bytes();assert sha(raw)==expected[label+'_'+kind+'_sha256'];(directory/name).write_bytes(raw)
   results[label]=analyzer.analyze(directory)
 return check_analysis(results['baseline'],results['recovered'])

def main():
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--materialize',type=Path);parser.add_argument('--variant',choices=['baseline','recovered'],default='recovered')
 for name in ['baseline-candidate','baseline-symbols','recovered-candidate','recovered-symbols']:parser.add_argument('--'+name,type=Path)
 args=parser.parse_args();check_manifest();baseline,recovered=sources();source={'baseline':baseline,'recovered':recovered}[args.variant]
 if args.materialize:materialize(args.materialize,source)
 paths={name:getattr(args,name)for name in ['baseline_candidate','baseline_symbols','recovered_candidate','recovered_symbols']};assert all(paths.values())or not any(paths.values()),'Supply all four local ELF paths'
 result={'source_verified':True,'source_file_count':56,'changed_files':read(HERE/'recipe.json')['changed_files'],'compiler_executed':False,'runtime_verified':False,'elf_comparison':'not requested'}
 if all(paths.values()):result['elf_comparison']=compare(paths)
 print(json.dumps(result,sort_keys=True))
if __name__=='__main__':main()
