"""Passive replay, optionally rehash CURRENT explicit files; never run selected tools."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,re
from analyze import analyze
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def verify(seal,current=False):
 assert __debug__,'Use ordinary Python without -O'
 raw=(P/'manifest.json').read_bytes();assert H(raw)==seal==(P/'manifest.sha256').read_text().strip();m=json.loads(raw)
 assert not any(f.is_symlink()for f in P.rglob('*'))
 assert set(m)|{'manifest.json','manifest.sha256'}=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()}
 for n,r in m.items():
  path=PurePosixPath(n);assert not path.is_absolute()and'..'not in path.parts
  b=(P/n).read_bytes();assert H(b)==r['sha256']and len(b)==r['bytes'],n
 j=json.loads((P/'inventory.json').read_text());a=json.loads((P/'analysis.json').read_text());assert a==analyze()
 assert a['counts']=={'tree_entries':3308,'regular_files':2773,'regular_bytes':1286107104,'directories':523,'symlinks':12,'external_symlink_references':0,'prior_tool_pin_entries':7,'unique_pinned_binary_paths':6,'prior_in_tree_binary_paths':3,'regular_files_beyond_prior_in_tree_pins':2770,'rlib_files':151,'static_archive_files':10,'regular_dylib_files':4}
 for n,row in j['entries'].items():
  rel=PurePosixPath(n);assert not rel.is_absolute()and'..'not in rel.parts
  assert row['type']in['directory','regular','symlink'];assert re.fullmatch('0o[0-7]+',row['mode'])and int(row['mode'],8)<=0o7777
  if row['type']=='regular':assert re.fullmatch('[0-9a-f]{64}',row['sha256'])and row['bytes']>=0
  if row['type']=='symlink':assert row['followed']is False and row['resolved_inside_tree']is True
 plan_raw=(P/'build-plan-manifest-control.json').read_bytes();assert H(plan_raw)=='ff7a857b5394b57c61eebb19cf6265fa001b18b2d0f3db4936fd00c48cbb2fa0'
 available_raw=(P/'availability-control.json').read_bytes();assert H(available_raw)==json.loads(plan_raw)['availability.json']==j['availability_control_sha256'];available=json.loads(available_raw)
 assert len(available['tools'])==len(j['seven_prior_tool_pins'])==7 and len(available['sdk_source_sha256'])==53
 root=Path(j['root'])
 for name,row in j['seven_prior_tool_pins'].items():
  assert row['path']==available['tools'][name]['path']and row['sha256']==available['tools'][name]['sha256']
  if row['inside_v144_tree']:assert j['entries'][str(Path(row['path']).relative_to(root))]['sha256']==row['sha256']
 paths={row['path']for row in j['seven_prior_tool_pins'].values()};assert len(j['otool_commands'])==12
 assert {(x['argv'][1],x['argv'][2])for x in j['otool_commands']}=={(flag,path)for flag in['-L','-l']for path in paths}
 for row in j['otool_commands']:
  assert row['argv'][0]=='/usr/bin/otool'and row['returncode']==0
  assert row['input_sha256']==next(x['sha256']for x in j['seven_prior_tool_pins'].values()if x['path']==row['argv'][2])
  for key in['stdout','stderr']:assert H((P/row[key+'_file']).read_bytes())==row[key+'_sha256']
 assert H((P/'version.md.control').read_bytes())==j['entries']['version.md']['sha256']
 grid={}
 for n,r in j['entries'].items():
  stem=Path(n).name.split('-',1)[0]
  if r['type']=='regular'and n.endswith('.rlib')and stem in['libcore','liballoc','libstd','libcompiler_builtins','libpanic_abort']:grid.setdefault(stem,[]).append({'path':n,'sha256':r['sha256'],'bytes':r['bytes']})
 assert grid==json.loads((P/'selected-sysroot-library-identities.json').read_text())and all(len(rows)==len({r['sha256']for r in rows})==6 for rows in grid.values())
 assert j['compiler_or_selected_tool_executions']==j['network_requests']==j['external_symlink_trees_followed']==0
 assert not a['actual_build_before_after_full_tree_identity_established']and not a['historical_provenance_established']and not a['actual_loaded_dependency_set_established']
 if current:
  from inventory import entries,sha_regular,ROOT
  assert ROOT==root and entries(True)==j['entries'],'Current tree differs from recorded after-the-fact inventory'
  for row in j['seven_prior_tool_pins'].values():assert sha_regular(Path(row['path']))[0]==row['sha256']
 print('PASS: current-inventory artifact replay;2773 regular files/1,286,107,104 logical bytes;151rlibs/10static archives/4dylibs;12selected Mach-O metadata queries. Historical/build-time/loaded-set identity remains unproven.')
 if current:print('PASS: actual CURRENT explicit tree and7pin file hashes rechecked without selected-tool invocation.')
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--expected-seal',required=True);p.add_argument('--check-current-files',action='store_true');a=p.parse_args();verify(a.expected_seal,a.check_current_files)
