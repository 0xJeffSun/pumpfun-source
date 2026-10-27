"""Offline verification of current-source historical macro controls; no builds or VM execution."""
from pathlib import Path
from collections import Counter
import difflib,gzip,hashlib,importlib.util,json,shlex,sys,tempfile,tomllib
if not __debug__: raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent; ROOT=P.parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(path):
 b=Path(path).read_bytes();return gzip.decompress(b)if str(path).endswith('.gz')else b
def read(path):return json.loads(raw(path))
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify():
 paths=list(P.rglob('*'));assert not any(p.is_symlink()for p in paths),'packet symlink'
 assert all(p.is_file()or p.is_dir()for p in paths),'packet special file'
 actual={p.relative_to(P).as_posix():sha(p.read_bytes())for p in paths if p.is_file()and p!=P/'manifest.json'}
 assert actual==read(P/'manifest.json'),'packet manifest'
 for name,digest in read(P/'external-inputs.json').items():assert sha((ROOT/name).read_bytes())==digest,('external input',name)
 summary=read(P/'summary.json')
 assert summary['program_source_files']==67 and summary['normalized']==429 and summary['raw']==139 and summary['unmatched']==12
 assert summary['fresh_target_executions']==0 and summary['original_source_authenticated'] is False and summary['whole_original_equal'] is False and summary['new_complete_body_matches']==0
 assert sha(raw(P/'layout/ordered.ld'))=='35d793e8766685441ce6202fd3c999b7962474f23e543819f0ecfcead50b1ca4','qualified layout changed'
 parent=ROOT/'research/mayhem-historical-macro-context'
 sources={p.relative_to(P/'sources').as_posix()[:-3]:raw(p)for p in (P/'sources').rglob('*.gz')}
 assert len(sources)==67
 enabled_launch=read(P/'program/enabled/launch.json');assert {n:sha(b)for n,b in sources.items()}==enabled_launch['source_inputs']
 old=read(P/'program/baseline/launch.json')['source_inputs'];assert set(old)==set(sources)
 changes={n for n,b in sources.items()if sha(b)!=old[n]};assert changes=={'curve-accounts/src/interface_definition.rs','curve-accounts/idls/pump.json'}
 source=sources['curve-accounts/src/interface_definition.rs'];assert source.count(b'historical_anchor_program::declare_program!(pump);')==1
 assert sha(source.replace(b'historical_anchor_program::declare_program!(pump);',b'declare_program!(pump);'))==old['curve-accounts/src/interface_definition.rs']
 assert sources['curve-accounts/idls/pump.json']==raw(parent/'direct/old-historical-create/source/curve-accounts/idls/pump.json.gz')
 before=read(parent/'source-tree.json');historical={r['path']:raw(parent/('historical/'+r['path']+'.gz'))for r in before['files']};assert len(historical)==121
 native_counts={}
 for role in ('enabled','gated'):
  d=P/'host'/role;launch=read(d/'launch.json');result=read(d/'result.json');original=dict(historical)
  original['Cargo.toml']=raw(d/'Cargo.toml.gz');original['Cargo.lock']=raw(d/'Cargo.lock.gz')
  assert original['Cargo.lock']==raw(parent/'host/host-build-03/Cargo.lock.gz')
  if role=='gated':
   name='lang/attribute/program/src/declare_program/mods/utils.rs';b=original[name];needle=b'        /// Program utilities.\n        pub mod utils {';assert b.count(needle)==1
   b=b.replace(needle,b'        /// Program utilities.\n        #[cfg(not(target_os = "solana"))]\n        pub mod utils {');assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()=='4fb84b0879c07819886ba419fee5b6434436555d';original[name]=b
  assert {n:sha(b)for n,b in original.items()}==launch['source_inputs'],'host source binding'
  manifest=tomllib.loads(original['Cargo.toml'].decode());ref=tomllib.loads(raw(parent/'host/host-build-03/Cargo.toml.gz').decode())
  for doc in (manifest,ref):
   for v in doc['patch']['crates-io'].values():v['path']=v['path'].replace('\\','/').rsplit('/',1)[-1]
  assert manifest==ref
  assert result['returncode']==0 and result['source_unchanged']
  macro=raw(d/'macro.dylib.gz');assert sha(macro)==result['outputs']['target/release/libanchor_attribute_program.dylib']
  assert macro[:4]==bytes.fromhex('cffaedfe')
  command=launch['command'];assert '--offline'in command and '--locked'in command and 'anchor-attribute-program'in command
  log=raw(d/'stderr.gz').decode();commands=[shlex.split(line.split('Running `',1)[1].rsplit('`',1)[0])for line in log.splitlines()if 'Running `'in line]
  crates=[a[a.index('--crate-name')+1]for a in commands if '--crate-name'in a]
  assert all(crates.count(n)==1 for n in ('anchor_attribute_program','anchor_syn','anchor_lang_idl','anchor_lang_idl_spec'))
  native_counts[role]=len(crates)
 q=module('macro_current_objects',parent/'context_helpers.py')
 base=q.text_sections(q.objects(raw(P/'curves/baseline.rlib.gz')));positive=q.text_sections(q.objects(raw(P/'curves/enabled.rlib.gz')));negative=q.text_sections(q.objects(raw(P/'curves/gated.rlib.gz')))
 finish=next(n for n in base if 'finish_grow'in n);assert len(base[finish])==312 and len(positive[finish])==328
 assert set(base)<=set(positive)and set(base)<=set(negative)
 assert [n for n in base if base[n]!=positive[n]]==[finish]
 assert all(base[n]==negative[n]for n in base)
 outputs={role:raw(P/'program'/role/'candidate.so.gz')for role in ('baseline','unqualified','enabled','repeat','gated')}
 symbols={role:raw(P/'program'/role/'symbols.so.gz')for role in outputs}
 assert sha(outputs['enabled'])==sha(outputs['repeat'])=='ed5b4020ca2659b427739a384bc7c014e2b192f81cce60d7d9b770d4978f0232'
 assert symbols['enabled']==symbols['repeat']and sha(symbols['enabled'])=='281c2f67a587bd913fd7f84a4faf3f9e2e9543890a9a2fb8d61ca1d7d5e938ba'
 assert sha(outputs['gated'])=='f4f6a36829043aac0a49f1604b84cdf3650c88d3acee49ef6bf1e5f32a63e583'
 for role in ('enabled','repeat'):
  record=read(P/'program'/role/'result.json');assert record['returncode']==0 and record['candidate_sha256']==sha(outputs[role])and record['symbols_sha256']==sha(symbols[role])
  launch=read(P/'program'/role/'launch.json');assert launch['source_inputs']==enabled_launch['source_inputs']and launch['ordered_script_sha256']==sha(raw(P/'layout/ordered.ld'))
 for role in ('enabled','gated'):
  records=read(P/'curves'/f'{role}-builds.json');assert len(records)==2
  assert all(r['returncode']==0 and r['source_unchanged']and r['source_inputs']==enabled_launch['source_inputs']for r in records)
  for record in records:
   assert '--target'in record['command']and record['command'][record['command'].index('--target')+1]=='sbpf-solana-solana'
  assert records[0]['macro_sha256']==sha(raw(P/'host'/role/'macro.dylib.gz'))
 progress=module('macro_current_progress',ROOT/'research/mayhem-trade-origins-validator/progress.py')
 result=progress.compare((ROOT/'evidence/original/mayhem/deployed.so').read_bytes(),symbols['gated'],symbols['enabled'])
 assert result['matches']==429 and result['raw_matches']==139 and result['body_losses']==[]
 assert result['positive_direct_edges_after']==4289 and result['positive_Source_records_after']==446
 assert read(P/'analysis/composition-check.json')['symbol_section_payload_changes']==['.symtab','.strtab']
 reader=module('macro_control_reader',ROOT/'research/mayhem-trade-origins-validator/reader.py')
 with tempfile.TemporaryDirectory()as td:
  td=Path(td);op=td/'original.so';op.write_bytes((ROOT/'evidence/original/mayhem/deployed.so').read_bytes());original=reader.Elf(op)
  controls=list((P/'controls/builds').iterdir());assert len(controls)==9
  for control in controls:
   image=raw(control/'symbols.so.gz');cp=td/'candidate.so';cp.write_bytes(image);elf=reader.Elf(cp);record=read(control/'result.json');assert record['returncode']==0 and record['source_unchanged']and record['tools_unchanged']and record['target_libraries_unchanged']
   assert record['symbols_sha256']==sha(image)and record['candidate_sha256']==sha(raw(control/'candidate.so.gz'))
   score=read(control/'score.json');is_init=control.name.startswith('fast-init');name='state10initialize17'if is_init else'10sell_quote17';sym=[s for s in elf.symbols if name in s['name']];assert len(sym)==1
   start,end=(534840,535800)if is_init else(186552,187672);a=original.norm(start,end)[0];b=elf.norm(sym[0]['value'],sym[0]['value']+sym[0]['size'])[0];aa=[a[i:i+8]for i in range(0,len(a),8)];bb=[b[i:i+8]for i in range(0,len(b),8)]
   assert a!=b and sym[0]['size']==score['bytes']
   assert sum(x==y for x,y in zip(aa,bb))==score['ordered_equal_slots'if is_init else'same_position_slots']
   assert sum(x.size for x in difflib.SequenceMatcher(a=aa,b=bb,autojunk=False).get_matching_blocks())==score['sequence_matching_slots'if is_init else 'aligned_slots']
   base_name='initializer'if is_init else'quote';files={f.relative_to(P/'controls/bases'/base_name).as_posix()[:-3]:raw(f)for f in (P/'controls/bases'/base_name).rglob('*.gz')};files['src/state.rs']=raw(control/'state.rs.gz');assert len(files)==67
   assert {n:sha(b)for n,b in files.items()}==read(control/'launch.json')['source_inputs']
 return {'source_files':67,'host_compiler_commands':native_counts,'normalized':429,'raw':139,'unmatched':12,'enabled_repeat_equal':True,'gated_parent_equal':True,'negative_controls':9,'fresh_target_executions':0,'original_source_authenticated':False,'whole_original_equal':False}

if __name__=='__main__':print(json.dumps(verify(),indent=2))
