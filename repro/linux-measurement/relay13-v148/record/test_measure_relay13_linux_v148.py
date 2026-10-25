"""Synthetic guards plus one saved-byte control; no network/tool/compiler/target process."""
import copy,importlib.util,io,json,os,subprocess,sys,tarfile,tempfile,unittest
from pathlib import Path
from unittest.mock import patch
P=Path(__file__).resolve().parent;s=importlib.util.spec_from_file_location('proposal',P/'measure_relay13_linux_v148.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
import argparse
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);REPO=a.parse_args().repo.resolve();sys.argv=[sys.argv[0]]
class Tests(unittest.TestCase):
 def test_readonly_plan(self):
  with tempfile.TemporaryDirectory()as d,patch.object(m.urllib.request,'urlopen',side_effect=AssertionError('network')),patch.object(m.subprocess,'run',side_effect=AssertionError('process')):
   out=Path(d)/'absent'
   if(REPO/m.LINUX12).exists():
    p=m.plan(REPO,out);self.assertEqual(len(p['frozen_source']),23);self.assertFalse(p['same_full_recipe_claimed']);self.assertEqual(p['program_build_attempt_limit'],1)
   else:
    with self.assertRaises(FileNotFoundError):m.plan(REPO,out)
   self.assertFalse(out.exists())
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
   matched=[x for x in report['driftsort']if x['original608_instruction_relocation_match']];self.assertEqual(len(matched),1);self.assertTrue(matched[0]['descriptor_pointer_flow']['checked_to_external_custom_panic']);self.assertTrue(matched[0]['named_multiply_edge']['checked']);self.assertEqual([x['body_offset']for x in matched[0]['actual_three_edge_closure']],[160,560,600]);self.assertFalse(matched[0]['bounded_descriptor_prefix']['full_object_extent_proven'])
 def test_publication_only_exact_files_even_inside_approved_directories(self):
  with tempfile.TemporaryDirectory()as d:
   r=Path(d);src=r/'source/src/lib.rs';src.parent.mkdir(parents=True);src.write_text('frozen');m.write(r/'source-map.json',{'src/lib.rs':m.H(b'frozen')})
   for n in ['source/.cargo/credentials.toml','build-01/target/secret','full-ledger/secret.json','receipts/credentials.json']:(r/n).parent.mkdir(parents=True,exist_ok=True);(r/n).write_text('private')
   p=m.publish(r);names=m.files(p);self.assertIn('source/src/lib.rs',names);self.assertFalse(any('secret'in n or 'credentials'in n for n in names))
 def test_truncated_acquisition_retains_measured_receipt(self):
  with tempfile.TemporaryDirectory()as d:
   pin=copy.deepcopy(m.ASSETS['compiler']);pin['size']=3
   asset={**pin,'browser_download_url':'https://github.com/anza-xyz/platform-tools/releases/download/'+pin['tag']+'/'+pin['name']};release={'id':pin['release_id'],'assets':[asset]};out=Path(d)/'asset'
   with patch.object(m.urllib.request,'urlopen',side_effect=[io.BytesIO(json.dumps(release).encode()),io.BytesIO(b'ab')]):
    with self.assertRaises(AssertionError):m.fetch_asset(pin,out)
   r=m.J(out/'acquisition.json');self.assertEqual(r['status'],'SIZE_MISMATCH');self.assertEqual((r['bytes'],r['expected_bytes']),(2,3));self.assertEqual(r['measured_sha256'],m.H(b'ab'));self.assertEqual(r['archive_path'],str(out/pin['name']));self.assertFalse(r['publisher_digest_verified'])
 def test_digest_mismatch_retains_expected_and_observed(self):
  with tempfile.TemporaryDirectory()as d:
   pin=copy.deepcopy(m.ASSETS['strip']);pin['size']=3;pin['digest']='sha256:'+'0'*64
   asset={**pin,'browser_download_url':'https://github.com/anza-xyz/platform-tools/releases/download/'+pin['tag']+'/'+pin['name']};release={'id':pin['release_id'],'assets':[asset]};out=Path(d)/'asset'
   with patch.object(m.urllib.request,'urlopen',side_effect=[io.BytesIO(json.dumps(release).encode()),io.BytesIO(b'abc')]):
    with self.assertRaises(AssertionError):m.fetch_asset(pin,out)
   r=m.J(out/'acquisition.json');self.assertEqual(r['status'],'DIGEST_MISMATCH');self.assertEqual(r['bytes'],3);self.assertEqual(r['measured_sha256'],m.H(b'abc'));self.assertEqual(r['expected_publisher_digest'],pin['digest']);self.assertFalse(r['publisher_digest_verified'])
 def test_partial_download_error_retains_measured_prefix(self):
  class Interrupted(io.BytesIO):
   def __init__(self):super().__init__(b'ab');self.calls=0
   def read(self,*a):
    self.calls+=1
    if self.calls>1:raise OSError('synthetic disconnect')
    return super().read(*a)
  with tempfile.TemporaryDirectory()as d:
   pin=copy.deepcopy(m.ASSETS['compiler']);pin['size']=3
   asset={**pin,'browser_download_url':'https://github.com/anza-xyz/platform-tools/releases/download/'+pin['tag']+'/'+pin['name']};release={'id':pin['release_id'],'assets':[asset]};out=Path(d)/'asset'
   with patch.object(m.urllib.request,'urlopen',side_effect=[io.BytesIO(json.dumps(release).encode()),Interrupted()]):
    with self.assertRaises(OSError):m.fetch_asset(pin,out)
   r=m.J(out/'acquisition.json');self.assertEqual(r['status'],'DOWNLOAD_FAILED');self.assertEqual(r['bytes'],2);self.assertEqual(r['measured_sha256'],m.H(b'ab'));self.assertIn('synthetic disconnect',r['download_error'])
 def call_closure_control(self):
  root=REPO/m.MAC;elf=m.load(root/'match_helpers.py','call_closure_elf');c=elf.Elf(root/'build-01/candidate.so');o=elf.Elf(REPO/'evidence/dependencies/donation_relay/deployed.so');u=elf.Elf(root/'build-01/unstripped.so')
  ledger={n:m.J(root/'full-ledger'/n)for n in ['original-function-ledger.json','candidate-function-ledger.json','match-witnesses.json']}
  return ledger,c,o,u
 def test_all_three_actual_callees_consumed(self):
  ledger,c,o,u=self.call_closure_control();r=m.assert_scratch_call_closure(ledger,c,o,u,10224);self.assertEqual([x['body_offset']for x in r],[160,560,600]);middle=r[1];self.assertEqual(middle['original_target'],36800);self.assertEqual(middle['complete_bytes'],5360);self.assertEqual(len(middle['child_direct_calls']),7)
 def test_reject_wrong_actual560_target_without_editing_ELF(self):
  import types
  ledger,c,o,u=self.call_closure_control();fake=types.SimpleNamespace(**vars(c));fake.calls={**c.calls,10224+560:c.calls[10224+600]};fake.pattern=c.pattern
  with self.assertRaises(AssertionError):m.assert_scratch_call_closure(ledger,fake,o,u,10224)
 def test_reject_unclosed560_witness(self):
  ledger,c,o,u=self.call_closure_control();ledger=copy.deepcopy(ledger);parent=next(r for r in ledger['match-witnesses.json']if r['original_ordinal']==59 and r['candidate_index']==47);next(e for e in parent['direct_calls']if e['original']['offset']==560)['recursive_call_shape_closed']=False
  with self.assertRaises(AssertionError):m.assert_scratch_call_closure(ledger,c,o,u,10224)
 def test_reject560_child_body_mismatch_without_editing_ELF(self):
  import types
  ledger,c,o,u=self.call_closure_control();child=c.calls[10224+560];fake=types.SimpleNamespace(**vars(c));fake.pattern=c.pattern;raw=bytearray(c.normalized);raw[child]^=1;fake.normalized=bytes(raw)
  with self.assertRaises(AssertionError):m.assert_scratch_call_closure(ledger,fake,o,u,10224)
 def test_workflow_manual_only(self):
  s=(P/'measure-relay13-linux-v148.yml').read_text();self.assertIn('on:\n  workflow_dispatch:\n',s);self.assertNotIn('pull_request:',s);self.assertNotIn('push:',s);self.assertIn('runs-on: ubuntu-24.04',s);self.assertIn('persist-credentials: false',s);self.assertNotIn('secrets.',s);self.assertEqual(s.count('--execute'),1);self.assertIn('/publication/',s)
def _added_provenance_tests():
 def selected_source_and_lock(self):
  selected=m.selected_source_inputs(REPO);baseline=m.J(REPO/m.OLD/'launcher/resolved-source-sha256.json');self.assertEqual(m.source_delta(baseline,selected),['src/idl.rs']);self.assertEqual(selected['Cargo.lock'],baseline['Cargo.lock'])
 def reject_extra_source_change(self):
  selected=m.selected_source_inputs(REPO);baseline=m.J(REPO/m.OLD/'launcher/resolved-source-sha256.json');selected['src/lib.rs']='0'*64
  with self.assertRaises(AssertionError):m.source_delta(baseline,selected)
 def complete_published_linux12_parent(self):
  r=m.linux12_parent(REPO);self.assertEqual(r['parent_payloads'],99);self.assertEqual(r['parent_manifest_sha256'],m.LINUX12_PARENT_SEAL)
 def actual_linux12_control(self):
  control=REPO/m.LINUX12 if(REPO/m.LINUX12).exists()else REPO/'work/relay-linux-v148-downloaded/extracted'
  r=m.linux12_control(control);self.assertEqual(r['candidate_sha256'],m.LINUX12_CANDIDATE_SHA);self.assertEqual(r['summary']['original_raw_match_windows'],58)
 def same_actual_control_tools_and_capability(self):
  c=REPO/m.LINUX12 if(REPO/m.LINUX12).exists()else REPO/'work/relay-linux-v148-downloaded/extracted';cap=m.J(c/'capability.json');ct=m.J(c/'compiler-tools.json');st=m.J(c/'strip-tools.json');self.assertTrue(m.control_conformance(cap,ct,st,copy.deepcopy(cap),copy.deepcopy(ct),copy.deepcopy(st))['selected_compiler_sysroot_and_strip_bytes_equal_control'])
 def reject_compiler_identity_drift(self):
  c=REPO/m.LINUX12 if(REPO/m.LINUX12).exists()else REPO/'work/relay-linux-v148-downloaded/extracted';cap=m.J(c/'capability.json');ct=m.J(c/'compiler-tools.json');st=m.J(c/'strip-tools.json');bad=copy.deepcopy(ct);next(iter(bad.values()))['sha256']='0'*64
  with self.assertRaises(AssertionError):m.control_conformance(cap,bad,st,cap,ct,st)
 def reject_stock_cfg_drift(self):
  c=REPO/m.LINUX12 if(REPO/m.LINUX12).exists()else REPO/'work/relay-linux-v148-downloaded/extracted';cap=m.J(c/'capability.json');ct=m.J(c/'compiler-tools.json');st=m.J(c/'strip-tools.json');bad=copy.deepcopy(cap);bad['cfg']+='target_feature="dynamic-frames"'
  with self.assertRaises(AssertionError):m.control_conformance(bad,ct,st,cap,ct,st)
 def measured_archive_mismatch_receipt(self):
  pin=copy.deepcopy(m.ASSETS['compiler']);pin['size']=3;release=copy.deepcopy(m.J(P/'v1.48-release.json'));asset=next(x for x in release['assets']if x['id']==pin['id']);asset['size']=3
  with tempfile.TemporaryDirectory()as d,patch.object(m.urllib.request,'urlopen',side_effect=[io.BytesIO(json.dumps(release).encode()),io.BytesIO(b'abc')]):
   out=Path(d)/'asset'
   with self.assertRaises(AssertionError):m.fetch_asset(pin,out)
   r=m.J(out/'acquisition.json');self.assertEqual(r['status'],'MEASURED_HASH_MISMATCH');self.assertEqual(r['measured_sha256'],m.H(b'abc'));self.assertEqual(r['expected_prior_measured_sha256'],m.MEASURED_COMPILER_ARCHIVE);self.assertFalse(r['prior_measured_hash_match'])
 for name,test in locals().copy().items():
  if callable(test):setattr(Tests,'test_v13_'+name,test)
_added_provenance_tests()
if __name__=='__main__':unittest.main(verbosity=2)
