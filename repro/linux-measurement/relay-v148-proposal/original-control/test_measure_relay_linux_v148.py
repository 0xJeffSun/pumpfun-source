"""Synthetic guards plus one saved-byte control; no network/tool/compiler/target process."""
import copy,importlib.util,io,json,os,subprocess,sys,tarfile,tempfile,unittest
from pathlib import Path
from unittest.mock import patch
P=Path(__file__).resolve().parent;s=importlib.util.spec_from_file_location('proposal',P/'measure_relay_linux_v148.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
REPO=next(r for r in P.parents if(r/'repro/donation-relay/source-build-12-idl-discriminator-owned').is_dir())
class Tests(unittest.TestCase):
 def test_readonly_plan(self):
  with tempfile.TemporaryDirectory()as d,patch.object(m.urllib.request,'urlopen',side_effect=AssertionError('network')),patch.object(m.subprocess,'run',side_effect=AssertionError('process')):
   out=Path(d)/'absent';p=m.plan(REPO,out);self.assertFalse(out.exists());self.assertEqual(len(p['frozen_source']),23);self.assertFalse(p['same_full_recipe_claimed']);self.assertEqual(p['program_build_attempt_limit'],1)
 def test_existing_output_rejected_without_removal(self):
  with tempfile.TemporaryDirectory()as d:
   f=Path(d)/'keep';f.write_text('evidence')
   with self.assertRaises(AssertionError):m.plan(REPO,Path(d))
   self.assertEqual(f.read_text(),'evidence')
 def test_asset_metadata_exact(self):
  for key,pin in m.ASSETS.items():
   release=json.loads((P/(pin['tag']+'-release.json')).read_text());self.assertEqual(m.selected_asset(release,pin)['id'],pin['id'])
   for field in ['id','name','size','digest']:
    bad=copy.deepcopy(pin);bad[field]='wrong'
    with self.assertRaises((AssertionError,StopIteration)):m.selected_asset(release,bad)
 def test_strip_has_publisher_hash_compiler_does_not(self):
  self.assertIsNone(m.ASSETS['compiler']['digest']);self.assertTrue(m.ASSETS['strip']['digest'].startswith('sha256:8b3861e9'))
 def test_environment_does_not_inherit_secrets_or_overrides(self):
  with patch.dict(os.environ,{'SECRET_SENTINEL':'hidden','RUSTFLAGS':'bad','CARGO_HOME':'bad','GITHUB_TOKEN':'hidden'}):
   e=m.environment(Path('/private/compiler'),Path('/private/work'));self.assertNotIn('GITHUB_TOKEN',e);self.assertNotIn('SECRET_SENTINEL',e);self.assertNotIn('RUSTFLAGS',e);self.assertEqual(e['CARGO_HOME'],'/private/work/cargo-home');self.assertEqual(e['CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS'],'-Zremap-cwd-prefix=')
 def test_diagnostic_not_a_zero_exit_acceptance(self):
  self.assertEqual(len(m.diagnostics(b'Error: Function sort Stack offset of 4104 exceeded max offset of 4096\nFinished release [optimized]\n')),1)
  self.assertEqual(m.diagnostics(b'Running `rustc --cfg Error:`\n'),[]);self.assertEqual(len(m.diagnostics(b'\x1b[31mError:\x1b[0m example\n')),1)
 def test_extraction_rejects_escape(self):
  with tempfile.TemporaryDirectory()as d:
   a=Path(d)/'bad.tar.bz2'
   with tarfile.open(a,'w:bz2')as z:
    t=tarfile.TarInfo('../escape');t.size=1;z.addfile(t,io.BytesIO(b'x'))
   with self.assertRaises(AssertionError):m.extract_verified(a,Path(d)/'tools')
   self.assertFalse((Path(d).parent/'escape').exists())
 def test_member_hash_detects_mutation(self):
  with tempfile.TemporaryDirectory()as d:
   r=Path(d);(r/'tool').write_bytes(b'a');members={'tool':{'sha256':m.H(b'a'),'bytes':1}};self.assertEqual(m.member(r,'tool',members)['sha256'],m.H(b'a'));(r/'tool').write_bytes(b'b')
   with self.assertRaises(AssertionError):m.member(r,'tool',members)
 def test_run_once_records_failure_and_never_retries(self):
  with tempfile.TemporaryDirectory()as d:
   r=Path(d)
   with patch.object(m.subprocess,'run',return_value=subprocess.CompletedProcess(['synthetic'],101))as run:
    result=m.run_once('fetch',['synthetic'],{},r,r/'receipts');self.assertEqual(result['returncode'],101);self.assertEqual(run.call_count,1)
    with self.assertRaises(FileExistsError):m.run_once('fetch',['synthetic'],{},r,r/'receipts')
    self.assertEqual(run.call_count,1)
 def test_launch_failure_preserved(self):
  with tempfile.TemporaryDirectory()as d:
   r=Path(d)
   with patch.object(m.subprocess,'run',side_effect=FileNotFoundError('synthetic')):
    result=m.run_once('capability',['synthetic'],{},r,r/'receipts');self.assertIsNone(result['returncode']);self.assertFalse(result['process_started'])
 def build_scenario(self,compilecode,stripcode,diagnostic=False,source_change=False):
  d=tempfile.TemporaryDirectory();self.addCleanup(d.cleanup);r=Path(d.name);source=r/'source';source.mkdir();(source/'Cargo.toml').write_text('frozen');frozen=m.files(source);target=r/'target/sbf-solana-solana/release';target.mkdir(parents=True);(target/'donation_relay_source_proposal.so').write_bytes(b'ELF synthetic bytes');calls=[]
  def runner(label,cmd,env,cwd,receipts):
   calls.append(label);receipts.mkdir(exist_ok=True);(receipts/(label+'.log')).write_bytes(b'Error: Function synthetic\n'if diagnostic and label=='program-build'else b'')
   if source_change:(source/'Cargo.toml').write_text('changed')
   if label=='strip'and stripcode==0:Path(cmd[-1]).write_bytes(b'ELF stripped synthetic bytes')
   return {'returncode':compilecode if label=='program-build'else stripcode}
  invoke=lambda:m.compile_and_strip(Path('/not-invoked'),Path('/not-invoked-strip'),source,{'CARGO_TARGET_DIR':str(r/'target')},r,r,frozen,lambda:{'synthetic_auth':True},runner=runner)
  return r,calls,invoke
 def test_compile_failure_stops_before_strip(self):
  r,calls,run=self.build_scenario(101,0);s=run();self.assertEqual(calls,['program-build']);self.assertEqual(s['program_build_attempts'],1);self.assertFalse((r/'build-01/candidate.so').exists())
 def test_strip_failure_preserves_actual_code(self):
  r,calls,run=self.build_scenario(0,2);s=run();self.assertEqual(calls,['program-build','strip']);self.assertEqual(s['strip_returncode'],2);self.assertFalse((r/'build-01/candidate.so').exists())
 def test_zero_compile_with_diagnostics_stays_explicit(self):
  r,calls,run=self.build_scenario(0,0,diagnostic=True);s=run();self.assertEqual(calls,['program-build','strip']);self.assertEqual(len(s['backend_diagnostics']),1);self.assertEqual(s['compile_returncode'],0);self.assertTrue((r/'build-01/candidate.so').exists())
 def test_source_change_blocks_strip(self):
  r,calls,run=self.build_scenario(0,0,source_change=True)
  with self.assertRaises(AssertionError):run()
  self.assertEqual(calls,['program-build']);self.assertFalse(m.J(r/'build-state.json')['source_unchanged'])
 def test_publication_excludes_private_archives_cache_tools_targets(self):
  with tempfile.TemporaryDirectory()as d:
   r=Path(d)
   for n in ['compiler-tools/secret','strip-tools/secret','target/secret','cargo-home/credentials.toml','compiler-acquisition/archive.tar.bz2']:(r/n).parent.mkdir(parents=True,exist_ok=True);(r/n).write_text('private')
   m.write(r/'result.json',{'synthetic':True});p=m.publish(r);names=m.files(p);self.assertNotIn('cargo-home/credentials.toml',names);self.assertFalse(any('secret'in n or n.endswith('.tar.bz2')for n in names));self.assertEqual(set(names),{'result.json','measurement-script.py','manifest.json'})
 def test_compiled_log_flags_and_registry_link(self):
  env={'RUSTC':'/private/compiler/rust/bin/rustc','CARGO_HOME':'/private/work/cargo-home'}
  root="Running `/private/compiler/rust/bin/rustc --crate-name donation_relay_source_proposal -C opt-level=3 -C panic=abort -C codegen-units=1 -C overflow-checks=on --target sbf-solana-solana -Zremap-cwd-prefix=`"
  dep="Running `/private/compiler/rust/bin/rustc --crate-name dep /private/work/cargo-home/registry/src/index/dep-1.0/src/lib.rs`"
  registry={'packages':[{'package':'dep-1.0','verified_source_files':7}]};raw=(root+'\n'+dep).encode();j=m.compiled_log_links(raw,env,registry,True);self.assertTrue(j['root_flags_verified']);self.assertEqual(j['actual_compiled_source_files'],7)
  with self.assertRaises(AssertionError):m.compiled_log_links(raw.replace(b'opt-level=3',b'opt-level=2'),env,registry,True)
  with self.assertRaises(AssertionError):m.compiled_log_links(raw,env,{'packages':[]},True)
  self.assertFalse(m.compiled_log_links(b'MSRV error before rustc',env,registry,False)['root_flags_verified'])
 def test_download_enforces_publisher_digest(self):
  for valid in [True,False]:
   with tempfile.TemporaryDirectory()as d:
    pin=copy.deepcopy(m.ASSETS['strip']);pin['size']=3;pin['digest']='sha256:'+(m.H(b'abc')if valid else '0'*64)
    asset={**pin,'browser_download_url':'https://github.com/anza-xyz/platform-tools/releases/download/'+pin['tag']+'/'+pin['name']};release={'id':pin['release_id'],'assets':[asset]}
    with patch.object(m.urllib.request,'urlopen',side_effect=[io.BytesIO(json.dumps(release).encode()),io.BytesIO(b'abc')]):
     if valid:
      m.fetch_asset(pin,Path(d)/'asset');self.assertTrue(m.J(Path(d)/'asset/acquisition.json')['publisher_digest_verified'])
     else:
      with self.assertRaises(AssertionError):m.fetch_asset(pin,Path(d)/'asset')
 def test_saved_darwin_control_analysis_only(self):
  # Existing artifact bytes only: no Linux claim and no compiler/process execution.
  import shutil
  with tempfile.TemporaryDirectory()as d,patch.object(m.subprocess,'run',side_effect=AssertionError('process')),patch.object(m.urllib.request,'urlopen',side_effect=AssertionError('network')):
   r=Path(d);(r/'build-01').mkdir();control=REPO/m.MAC/'build-01'
   for n in ['candidate.so','unstripped.so']:shutil.copyfile(control/n,r/'build-01'/n)
   report=m.post_static(REPO,r);self.assertTrue(report['linux_versus_darwin']['raw_equal']);self.assertFalse(report['readiness_or_promotion']);self.assertEqual(report['runtime_executions'],0)
   matched=[x for x in report['driftsort']if x['original608_instruction_relocation_match']];self.assertEqual(len(matched),1);self.assertTrue(matched[0]['descriptor_pointer_flow']['checked_to_external_custom_panic']);self.assertTrue(matched[0]['named_multiply_edge']['checked']);self.assertFalse(matched[0]['bounded_descriptor_prefix']['full_object_extent_proven'])
 def test_publication_only_exact_files_even_inside_approved_directories(self):
  with tempfile.TemporaryDirectory()as d:
   r=Path(d);src=r/'source/src/lib.rs';src.parent.mkdir(parents=True);src.write_text('frozen');m.write(r/'source-map.json',{'src/lib.rs':m.H(b'frozen')})
   for n in ['source/.cargo/credentials.toml','build-01/target/secret','full-ledger/secret.json','receipts/credentials.json']:(r/n).parent.mkdir(parents=True,exist_ok=True);(r/n).write_text('private')
   p=m.publish(r);names=m.files(p);self.assertIn('source/src/lib.rs',names);self.assertFalse(any('secret'in n or 'credentials'in n for n in names))
 def test_workflow_manual_only(self):
  s=(P/'measure-relay-linux-v148.yml').read_text();self.assertIn('on:\n  workflow_dispatch:\n',s);self.assertNotIn('pull_request:',s);self.assertNotIn('push:',s);self.assertIn('runs-on: ubuntu-24.04',s);self.assertIn('persist-credentials: false',s);self.assertNotIn('secrets.',s);self.assertEqual(s.count('--execute'),1);self.assertIn('/publication/',s)
if __name__=='__main__':unittest.main(verbosity=2)
