"""Pure current inventory/load-command summarization; no binary execution or reads."""
from pathlib import Path
import json,collections,os,hashlib
P=Path(__file__).resolve().parent
def analyze():
 j=json.loads((P/'inventory.json').read_text());root=Path(j['root']);entries=j['entries'];regular={n:r for n,r in entries.items()if r['type']=='regular'}
 groups={}
 for name,row in regular.items():
  group=name.split('/')[0];g=groups.setdefault(group,{'regular_files':0,'bytes':0});g['regular_files']+=1;g['bytes']+=row['bytes']
 targets={}
 for name,row in regular.items():
  parts=name.split('/')
  if parts[:3]==['rust','lib','rustlib']and len(parts)>4:
   g=targets.setdefault(parts[3],{'regular_files':0,'bytes':0,'rlibs':0,'static_archives':0,'dylibs':0});g['regular_files']+=1;g['bytes']+=row['bytes'];g['rlibs']+=name.endswith('.rlib');g['static_archives']+=name.endswith('.a');g['dylibs']+=name.endswith('.dylib')
 def record_resolution(path):
  path=Path(os.path.normpath(str(path)))
  if not path.is_relative_to(root):
   if str(path).startswith(('/usr/lib/','/System/Library/')):return {'candidate':str(path),'status':'system_dyld_shared_cache_or_system_resolution_unobserved'}
   return {'candidate':str(path),'status':'external_path_not_hashed_or_load_observed'}
  rel=str(path.relative_to(root));row=entries.get(rel)
  if row is None:return {'candidate':str(path),'status':'not_in_recorded_tree'}
  if row['type']=='regular':return {'candidate':str(path),'relative':rel,'status':'resolved_in_tree_regular','sha256':row['sha256'],'bytes':row['bytes']}
  if row['type']=='symlink':
   resolved=record_resolution(row['resolved_target']);return {'candidate':str(path),'relative':rel,'status':'recorded_symlink','target':row['target'],'resolved':resolved}
  return {'candidate':str(path),'relative':rel,'status':'recorded_'+row['type']}
 tools={}
 paths=sorted({r['path']for r in j['seven_prior_tool_pins'].values()})
 for binary in paths:
  calls={r['argv'][1]:r for r in j['otool_commands']if r['argv'][2]==binary};assert set(calls)=={'-L','-l'}
  raw_l=(P/calls['-l']['stdout_file']).read_text();lines=raw_l.splitlines();rpaths=[]
  for at,line in enumerate(lines):
   if line.strip()=='cmd LC_RPATH':
    matches=[x.strip()[5:].split(' (offset ',1)[0]for x in lines[at+1:at+4]if x.strip().startswith('path ')];assert len(matches)==1;rpaths+=matches
  rpaths=list(dict.fromkeys(rpaths));libraries=[]
  for line in(P/calls['-L']['stdout_file']).read_text().splitlines():
   if not line.startswith('\t'):continue
   name=line.strip().split(' (compatibility version ',1)[0];candidates=[]
   def expand(s):
    for prefix in['@loader_path','@executable_path']:
     if s==prefix or s.startswith(prefix+'/'):return str(Path(binary).parent)+s[len(prefix):]
    return s
   if name.startswith('@rpath/'):
    for rpath in rpaths:candidates.append(record_resolution(Path(expand(rpath))/name[len('@rpath/'):]))
   elif name.startswith(('@loader_path/','@executable_path/')):candidates.append(record_resolution(expand(name)))
   elif name.startswith('/'):candidates.append(record_resolution(name))
   else:candidates.append({'candidate':name,'status':'relative_or_unknown_loader_reference_unresolved'})
   libraries.append({'name':name,'declared_load_command':line.strip(),'resolution_candidates':candidates})
  tools[binary]={'rpaths':rpaths,'libraries':libraries}
 unique_paths={r['path']for r in j['seven_prior_tool_pins'].values()};in_tree={str(Path(n).relative_to(root))for n in unique_paths if Path(n).is_relative_to(root)}
 return {'scope':'CURRENT after-the-fact file identity plus declared selected Mach-O direct-load metadata only','counts':{'tree_entries':len(entries),'regular_files':len(regular),'regular_bytes':sum(r['bytes']for r in regular.values()),'directories':sum(r['type']=='directory'for r in entries.values()),'symlinks':sum(r['type']=='symlink'for r in entries.values()),'external_symlink_references':sum(r['type']=='symlink'and not r['resolved_inside_tree']for r in entries.values()),'prior_tool_pin_entries':7,'unique_pinned_binary_paths':len(unique_paths),'prior_in_tree_binary_paths':len(in_tree),'regular_files_beyond_prior_in_tree_pins':len(regular)-len(in_tree),'rlib_files':sum(n.endswith('.rlib')for n in regular),'static_archive_files':sum(n.endswith('.a')for n in regular),'regular_dylib_files':sum(n.endswith('.dylib')for n in regular)},'by_top_component':groups,'rustlib_targets_and_sources':targets,'regular_dylibs':{n:{'sha256':r['sha256'],'bytes':r['bytes']}for n,r in regular.items()if n.endswith('.dylib')},'selected_macho_metadata':tools,'prior53_sdk_source_files_are_outside_this_tree':True,'full_tree_current_identity_established':True,'actual_build_before_after_full_tree_identity_established':False,'actual_loaded_dependency_set_established':False,'historical_provenance_established':False,'complete_sysroot_or_dependency_use_established':False,'compiler_or_selected_binary_execution':0,'network_requests':0}
if __name__=='__main__':
 d=analyze();(P/'analysis.json').write_text(json.dumps(d,indent=2)+'\n');print(json.dumps(d['counts'],indent=2))
