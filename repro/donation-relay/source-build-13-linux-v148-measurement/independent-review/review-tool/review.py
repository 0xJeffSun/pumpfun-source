"""FUTURE Relay13 packet review; no current pointer, build, network or target use."""
from pathlib import Path
import argparse,importlib.util,json,hashlib,struct
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
CONTROL='repro/donation-relay/source-build-12-linux-v148-measurement'
PARENT_SEAL='b54b728c16792c4b636275d0dfdd12e2c158ce38cff8d76fcc5b61fc3de93759'
CONTROL_SEAL='d576fc96411768fc659c0523d6d0633eba95de15ee87270f9e29cf8183f41e8a'
SCRIPT='445bc1298834758770c5d145d7dc75811a76627f963857b8e7a6bb3ae457bfbd'
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module

def transitions(before,after):
 assert len(before)==len(after)==492
 assert len({x['ordinal']for x in before})==len({x['ordinal']for x in after})==492
 out=[]
 for old,new in zip(before,after):
  assert (old['ordinal'],old['start'],old['end'],old['bytes'])==(new['ordinal'],new['start'],new['end'],new['bytes'])
  status=lambda row:'raw-body'if row['raw_candidate_indices']else'normalized-shape-only'if row['normalized_candidate_indices']else'no-complete-body-match'
  assert old['status']==status(old)and new['status']==status(new)
  out.append(dict(original_ordinal=old['ordinal'],original_start=old['start'],bytes=old['bytes'],linux12_status=status(old),linux13_status=status(new),linux12_raw_match=bool(old['raw_candidate_indices']),linux13_raw_match=bool(new['raw_candidate_indices']),linux12_normalized_match=bool(old['normalized_candidate_indices']),linux13_normalized_match=bool(new['normalized_candidate_indices'])))
 return out

def descriptor(elf,start):
 pc=start+584;raw=elf.b[pc:pc+16];assert raw[0]==0x18 and elf.relocations[pc]=={'type':8,'symbol':''};ptr=struct.unpack_from('<I',raw,4)[0]|struct.unpack_from('<I',raw,12)[0]<<32;assert 0<=ptr<=len(elf.b)-24;prefix=elf.b[ptr:ptr+24];address,n,line,column=struct.unpack('<QQII',prefix);offset=address>>32;assert 0<=offset<=len(elf.b)and n<=len(elf.b)-offset;path=elf.b[offset:offset+n]
 return dict(scratch_start=start,reference_pc=pc,reference_raw_hex=raw.hex(),descriptor_file_offset=ptr,prefix_hex=prefix.hex(),prefix_bytes=24,path_file_offset=offset,path_hex=path.hex(),path_bytes=n,path_utf8=path.decode(errors='backslashreplace'),line=line,column=column,full_object_extent_proven=False)

def inventory(path,expected,with_sha=False):
 assert H(path/'manifest.json')==expected;declared=J(path/'manifest.json');excluded={'manifest.json'}|({'manifest.sha256'}if with_sha else set());actual={str(p.relative_to(path)):H(p)for p in path.rglob('*')if p.is_file()and str(p.relative_to(path))not in excluded}
 for p in path.rglob('*'):assert not p.is_symlink()and p.name!='__pycache__'and p.suffix!='.pyc'
 assert actual==declared
 if with_sha:assert(path/'manifest.sha256').read_text().split()[0]==expected
 return declared

def review(repo,packet):
 repo=Path(repo).resolve();packet=Path(packet).resolve();own=J(P/'MANIFEST.json')
 assert set(own['files'])=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f.name!='MANIFEST.json'}
 for n,h in own['files'].items():assert H(P/n)==h,n
 parent=repo/CONTROL;manifest=inventory(parent,PARENT_SEAL,True);assert len(manifest)==99;control=parent/'download/extracted';inventory(control,CONTROL_SEAL);assert H(control/'measurement-script.py')=='350695dc5eb5d8efdf7b37ec542cc6456b55d28ec4bd4ca2edc73856751b54de'
 base=load(P/'base_review.py','relay13_readonly_base');oldbase=load(P/'linux12-control-review.py','immutable_linux12_control_review');control_review=oldbase.review(repo,control);result=base.review(repo,packet)
 selected=repo/base.SELECTED;source13=J(selected/'source-map.json');source12=J(control/'source-map.json');assert len(source12)==len(source13)==23 and set(source12)==set(source13);assert sorted(n for n in source12 if source12[n]!=source13[n])==['src/idl.rs'];assert source13['Cargo.lock']==source12['Cargo.lock']and source13['Cargo.toml']==source12['Cargo.toml']
 out=dict(scope='Historical frozen Relay13 source and actual Linux12 control only; no dependency on current selection pointers',driver_sha256=SCRIPT,review_tool_manifest_sha256=H(P/'MANIFEST.json'),source_delta_from_control=['src/idl.rs'],linux12_parent_seal=PARENT_SEAL,linux12_packet_seal=CONTROL_SEAL,linux13_review=result,linux12_control_review=control_review,host_system_library_identity_proven=False,new_builds=0,new_target_executions=0,selection_or_readiness=False)
 expected_conf=dict(linux12_parent_manifest_sha256=PARENT_SEAL,linux12_publication_manifest_sha256=CONTROL_SEAL,selected_compiler_sysroot_and_strip_bytes_equal_control=True,stock_target_cfg_spec_equal_control=True,same232_registry_map=base.PINS['registry'],source_delta=['src/idl.rs'],host_system_library_identity_proved=False)
 if(packet/'receipts/program-build.json').is_file():assert(packet/'control-conformance.json').is_file(),'program build receipt without control conformance'
 if(packet/'control-conformance.json').is_file():
  assert J(packet/'control-conformance.json')==expected_conf
  for key in['compiler-tools.json','strip-tools.json']:assert J(packet/key)==J(control/key),key
  a,b=J(packet/'capability.json'),J(control/'capability.json');assert a['cfg']==b['cfg']and a['spec']==b['spec']and a['legacy_sysroot_files']==b['legacy_sysroot_files'];assert len(J(packet/'compiler-tools.json'))==61 and len(a['legacy_sysroot_files'])==25
  for label in['compiler','strip']:
   after,before=J(packet/label/'acquisition.json'),J(control/label/'acquisition.json');assert after['measured_sha256']==before['measured_sha256'];assert after['bytes']==before['bytes']
  out['control_conformance_recomputed']=dict(selected_tools=61,legacy_sysroot_files=25,compiler_strip_inventory_equal=True,cfg_spec_equal=True)
 if(packet/'static-comparison.json').is_file():
  # Both complete ledgers were independently regenerated by the two review calls.
  before=J(control/'full-ledger/match-ledger.json');after=J(packet/'full-ledger/match-ledger.json');rows=transitions(before,after);saved=J(packet/'static-comparison.json')['linux12_source_control'];assert rows==saved['original_window_transitions'];assert saved['parent_manifest_sha256']==PARENT_SEAL and saved['publication_manifest_sha256']==CONTROL_SEAL;assert saved['candidate_sha256']==H(control/'build-01/candidate.so');assert saved['source_delta']==['src/idl.rs']and saved['same_lock_profile_tool_archive_target_strip_role']and not saved['whole_host_system_library_identity_proved'];assert saved['linux12_summary']==control_review['static_recomputation']['summary']and saved['linux13_summary']==result['static_recomputation']['summary'];a=(packet/'build-01/candidate.so').read_bytes();b=(control/'build-01/candidate.so').read_bytes();assert saved['raw_equal']==(a==b)and saved['common_position_different_bytes']==sum(x!=y for x,y in zip(a,b));out['all_original_window_transitions']=rows;out['transition_rows']=492
  elf=load(repo/base.MAC/'match_helpers.py','relay13_descriptor_reader');o=elf.Elf(repo/'evidence/dependencies/donation_relay/deployed.so');c=elf.Elf(packet/'build-01/candidate.so');old=elf.Elf(control/'build-01/candidate.so');origin=descriptor(o,36192);control_start=control_review['static_recomputation']['scratch_rows'];control_desc=[descriptor(old,r['start'])for r in control_start if r['full_instruction_relocation_equal']];direct=[]
  for row in result['static_recomputation']['scratch_rows']:
   if not row['full_instruction_relocation_equal']:continue
   d=descriptor(c,row['start']);direct.append(dict(original=origin,linux13=d,original_linux13_field_equal={k:origin[k]==d[k]for k in['path_hex','path_bytes','line','column','prefix_hex']},linux12_descriptors=control_desc))
  out['direct_descriptor_comparisons']=direct
 else:out['transition_limit']='No complete post-analysis packet yet; no transition rows or descriptor result claimed.'
 return out
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--packet',type=Path,required=True);args=p.parse_args();print(json.dumps(review(args.repo,args.packet),indent=2))
