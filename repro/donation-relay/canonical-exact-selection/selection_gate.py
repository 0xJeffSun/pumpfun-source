"""Strict Relay-only successor gate. No build, network, or VM unless explicitly requested."""
from pathlib import Path,PurePosixPath
import argparse,gzip,hashlib,importlib.util,json,tempfile

def sha(b):return hashlib.sha256(b).hexdigest()
def safe(root,name):
 p=PurePosixPath(name);assert name and str(p)==name and not p.is_absolute() and '..'not in p.parts and '\\'not in name,name
 root=Path(root).resolve();f=root/name
 for q in [f,*f.parents]:
  if q==root.parent:break
  assert not q.is_symlink(),name
 assert f.is_file(),name
 return f

def read(root,name):return json.loads(safe(root,name).read_bytes())
def module(root,name,tag):
 p=safe(root,name);s=importlib.util.spec_from_file_location(tag,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def blob(root,row):
 assert set(row)=={'path','sha256','bytes','encoding'}
 b=safe(root,row['path']).read_bytes()
 assert row['encoding']in ['raw','gzip']
 if row['encoding']=='gzip':b=gzip.decompress(b)
 assert len(b)==row['bytes'] and sha(b)==row['sha256'],row['path']
 return b

def source(root,record,scanner):
 folder=root/record['root'];assert folder.is_dir() and not any(p.is_symlink()for p in folder.rglob('*'))
 names=record['files'];extras=[root/x for x in record['extra_inputs']]
 actual=scanner.source_manifest(folder,folder,root,extra_inputs=extras,cwd=root)
 expected={record['root']+'/'+n:h for n,h in names.items()}
 assert set(actual)==set(expected),('source names',sorted(set(actual)^set(expected)))
 assert actual==expected,'source hashes'
 return actual

def _verify_document(root,t,execute_loader=False):
 root=Path(root).resolve()
 assert set(t)=={'schema','base_commit','bindings','scanner','parser','old','current','new'}
 assert t['schema']=='RELAY_CANONICAL_SUCCESSOR_V1'
 for name,h in t['bindings'].items():assert sha(safe(root,name).read_bytes())==h,name
 assert t['scanner']in t['bindings'] and t['parser']in t['bindings']
 scanner=module(root,t['scanner'],'selection_scanner');old=t['old'];new=t['new']
 assert old['source']['root']!=new['source']['root'] and new['source']['root']=='programs/donation-relay'
 assert len(source(root,old['source'],scanner))==23
 assert len(source(root,new['source'],scanner))==60
 old_current=read(root,old['current_snapshot']);assert sha(safe(root,old['current_snapshot']).read_bytes())==t['current']['before_sha256']
 assert old_current==old['current_value']
 current=read(root,t['current']['path']);assert t['current']['path']=='repro/donation-relay/current.json'
 assert sha(safe(root,t['current']['path']).read_bytes())==t['current']['after_sha256'] and current==t['current']['after']
 selected=read(root,new['selection']['path']);assert sha(safe(root,new['selection']['path']).read_bytes())==new['selection']['sha256'] and selected==new['selection']['value']
 assert new['selection']['path']=='programs/donation-relay/source-selected.json'
 assert selected['source_inputs']==new['source']['files'] and selected['selected_metadata_sha256']==t['current']['after_sha256']
 assert selected['selected_candidate_sha256']==new['candidate']['sha256']
 assert current['canonical_source']==new['source']['root'] and current['candidate_artifact']==new['candidate']['path'] and current['candidate_sha256']==new['candidate']['sha256']
 assert current['symbols_artifact']==new['symbols']['path'] and current['symbols_sha256']==new['symbols']['sha256']
 assert current['original_normalized_match_windows']==current['original_raw_match_windows']==492 and current['unmatched_original_windows']==0
 assert current['meaningful_elf_equal'] is True and current['loader_payload_equal'] is True
 assert current['compiler_file_equals_capture'] is False
 # Never equate archived-build evidence with a new canonical-path compilation.
 assert current['canonical_main_build_performed']==new['canonical_build_performed']
 assert selected['fresh_build_from_this_path']==new['canonical_build_performed']
 assert new['canonical_build_performed'] is False or new.get('canonical_build_receipt') in t['bindings']
 for name,row in new['configuration'].items():
  f=safe(root,name);assert sha(f.read_bytes())==row['sha256'] and bool(f.stat().st_mode&0o111)==row['executable']
 assert len(new['configuration'])==2
 original=blob(root,new['original']);candidate=blob(root,new['candidate']);symbols=blob(root,new['symbols'])
 assert len(candidate)==818280 and len(original)==830448 and candidate==original[:len(candidate)]
 assert new['candidate']['path'] in t['bindings'] and new['symbols']['path']in t['bindings']
 assert new['original']['path']in t['bindings']
 parser=module(root,t['parser'],'selection_parser')
 class V:
  def __init__(self,p):self.p=p
  def __truediv__(self,n):return self.p/n
 with tempfile.TemporaryDirectory() as temp:
  p=Path(temp)
  for name,b in [('original.so',original),('candidate.so',candidate),('unstripped.so',symbols),('original-windows.json',safe(root,new['windows']).read_bytes())]:(p/name).write_bytes(b)
  measured=parser.analyze(V(p))
 summary=measured['comparison-summary.json'];assert summary['original_raw_match_windows']==summary['original_normalized_match_windows']==492 and summary['common_position_different_bytes']==0
 receipt=read(root,new['loader_receipt']);assert new['loader_receipt']in t['bindings']
 assert receipt['elf_sha256']==sha(candidate) and receipt['payload_sha256']==sha(original)
 assert receipt['whole_original_payload_equal'] is True and receipt['payload_prefix_equal'] is True
 assert receipt['payload_bytes']==receipt['max_data_len']==len(original) and receipt['transactions']==912
 payload_fresh=False;payload_literal=False
 assert new['payload'] is not None,'Canonical promotion requires a selected payload file; receipt alone is insufficient'
 assert new['payload']['path']in t['bindings']
 payload=blob(root,new['payload']);assert payload==original;payload_literal=True
 if execute_loader:
  assert new['loader_runner'] in t['bindings']
  runner=module(root,new['loader_runner'],'selection_loader')
  # execute() obtains real VM ProgramData and tests payload == original internally.
  assert runner.execute(candidate,len(original),original)==receipt
  payload_fresh=True;payload_literal=True
 assert all(name in t['bindings'] for name in new['build_receipts']) and len(new['build_receipts'])>=3
 launch=read(root,new['build_receipts'][0]);build=read(root,new['build_receipts'][1])
 assert launch['source_inputs']==new['source']['files']
 assert launch['config_inputs']=={Path(n).name:r['sha256']for n,r in new['configuration'].items()}
 assert build['exit_code']==0 and build['root_invocations']==1 and build['source_unchanged'] and build['registry_unchanged']
 assert build['build_log_sha256']==sha(safe(root,new['build_receipts'][2]).read_bytes())
 assert build['artifacts']['candidate.so']['sha256']==sha(candidate) and build['artifacts']['symbols.so']['sha256']==sha(symbols)
 return {'verified':True,'historical_source23_verified':True,'canonical_source60_verified':True,'all492_raw':True,'meaningful_elf_literal_equal':True,'recorded_loader_payload_equal':True,'selected_payload_literal_checked':payload_literal,'fresh_loader_executed':payload_fresh,'canonical_build_performed':new['canonical_build_performed'],'non_relay_scope':'not checked here; parent successor guard must preserve it'}

def verify(root,transition_path,expected_transition_sha256,execute_loader=False):
    """Public API: caller pins the exact reviewed transition seal."""
    lexical_root=Path(root).absolute();root=lexical_root.resolve();transition_path=Path(transition_path)
    if not transition_path.is_absolute():relative=str(transition_path)
    else:
        try:relative=str(transition_path.relative_to(lexical_root))
        except ValueError:relative=str(transition_path.relative_to(root))
    raw=safe(root,relative).read_bytes()
    assert len(expected_transition_sha256)==64 and sha(raw)==expected_transition_sha256,'transition seal'
    return _verify_document(root,json.loads(raw),execute_loader)

def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--repo',type=Path,required=True);p.add_argument('--transition',type=Path,required=True);p.add_argument('--expected-transition-sha256',required=True);p.add_argument('--execute-loader',action='store_true');a=p.parse_args();print(json.dumps(verify(a.repo,a.transition,a.expected_transition_sha256,a.execute_loader),indent=2))
if __name__=='__main__':main()
