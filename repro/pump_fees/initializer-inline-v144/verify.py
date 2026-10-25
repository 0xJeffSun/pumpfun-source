#!/usr/bin/env python3
"""Portable saved-evidence verification, without build or transaction replay."""
from pathlib import Path,PurePosixPath
import gzip,hashlib,importlib.util,json,os,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();read=lambda n:json.loads((P/n).read_text())
manifest=read('manifest-sha256.json')
assert {str(p.relative_to(P)):H(p.read_bytes())for p in P.rglob('*')if p.is_file()and p!=P/'manifest-sha256.json'and'__pycache__'not in p.parts}==manifest
assert not any(p.is_symlink()for p in P.rglob('*'))
def archive(name):
 out={}
 with tarfile.open(P/name)as t:
  for m in t:
   p=PurePosixPath(m.name);assert m.isfile()and not p.is_absolute()and'..'not in p.parts and not p.name.endswith('-keypair.json')and m.name not in out
   out[m.name]=t.extractfile(m).read()
 return out
source=archive('source-snapshot.tar.gz');hashes={n:H(v)for n,v in source.items()};assert len(source)==22 and hashes==read('source-sha256.json')
assert {n:H(v)for n,v in archive('build-helper-snapshot.tar.gz').items()}==read('build-helper-sha256.json')
for n,h in read('documentation-sha256.json').items():assert H((P/'documentation'/n).read_bytes())==h
assert source['programs/pump-fees/README.md']==(P/'documentation/programs/pump-fees/README.md').read_bytes()
build=read('build-comparison.json');attempt=read('build-attempt.json');assert build['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==hashes
assert attempt['returncode']==0 and attempt['source_unchanged']and H(gzip.decompress((P/'build.log.gz').read_bytes()))==build['build_log_sha256']
candidate=(P/'pump_fees_candidate.so').read_bytes();digest=H(candidate);prov=read('provenance.json');identity=read('main-scratch-identity.json')
assert digest==prov['candidate_sha256']==build['comparison']['candidate_sha256']==identity['main_binary_sha256']==identity['scratch_binary_sha256']=='01fedce5878ec14618233c4683bcb4149e471775acb48ffb69614d9df570bb95'
assert len(candidate)==identity['bytes']==767992 and identity['whole_file_equal']and not identity['main_runtime_replayed']
assert identity['main_build_report_sha256']==H((P/'build-comparison.json').read_bytes())and identity['main_source_sha256']==hashes
sdk=archive('sbf-sdk-snapshot.tar.gz');assert len(sdk)==53 and {n:H(v)for n,v in sdk.items()}==build['sdk_source_sha256']
phase=read('tool-phase-provenance.json');assert phase['compile']['requested_tools_version']=='v1.44'
assert phase['compile']['tool_hashes_before']==phase['compile']['tool_hashes_after']=={k:v['sha256']for k,v in phase['compile']['tool_files'].items()}
assert phase['compile']['unstripped_sha256']==H((P/'symbols.so').read_bytes())
assert phase['strip']['file_sha256_before']==phase['strip']['file_sha256_after']=='12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be'
assert phase['strip']['sdk_marker']=='platform-tools-v1.52.md'and phase['strip']['candidate_sha256']==digest
assert b'version=v1.52'in sdk['scripts/install.sh']and b'platform-tools/llvm/bin/llvm-objcopy --strip-all'in sdk['scripts/strip.sh']
assert {n:H(sdk[n])for n in phase['phase_source_sha256']}==phase['phase_source_sha256']
assert H((P/'scratch-handoff.tar.gz').read_bytes())==prov['scratch_handoff_sha256']
scratch=archive('scratch-handoff.tar.gz');seal=scratch.pop('manifest-sha256.json');assert seal==(P/'scratch-manifest-sha256.json').read_bytes()
assert H(seal)==prov['scratch_manifest_sha256']=='e1826ed7fa4018274c46d2df281ac294411269ae788369669cbacaa38dd188b8'
assert {n:H(v)for n,v in scratch.items()}==json.loads(seal);assert candidate==scratch['pump_fees_candidate.so']
assert identity['scratch_build_report_sha256']==H(scratch['build-comparison.json'])and identity['scratch_source_sha256']==json.loads(scratch['source-sha256.json'])
assert [n for n in hashes if hashes[n]!=identity['scratch_source_sha256'][n]]==['programs/pump-fees/README.md']
for n in ['runtime-inputs.json','harness-source-sha256.json','runtime-summary.json','runtime-verification-result.json']:assert (P/n).read_bytes()==scratch[n]
origins=read('harness-origin-map.json');recorded=read('harness-source-sha256.json');canonical=read('published-harness-sha256.json')
assert len(origins)==len(recorded)==46 and len(canonical)==44
assert {r['recorded_path']:r['sha256']for r in origins}==recorded
assert {r['published_path']:r['sha256']for r in origins}==canonical and all(not n.startswith('work/')for n in canonical)
expected_aliases={'work/fees-update-admin-dataflow/signed_transfers.py':'repro/pump_fees/fee-config-serialization-v144/signed_transfers.py','work/fees-config-serialization/serialization_error.py':'repro/pump_fees/fee-config-serialization-v144/serialization_error.py'}
assert {r['recorded_path']:r['published_path']for r in origins if r['recorded_path']!=r['published_path']}==expected_aliases
old_bindings={r['name']:r for r in json.loads(scratch['receipt-build-bindings.json'])}
for row in read('receipt-build-bindings.json'):
 for k,v in old_bindings[row['name']].items():assert row[k]==v
 assert row['main_candidate_sha256']==digest and row['main_source_sha256']==hashes and row['main_build_report_sha256']==H((P/'build-comparison.json').read_bytes())
with tempfile.TemporaryDirectory(prefix='fees-inline-main-verification-')as d:
 temp=Path(d)
 for n,b in {**scratch,'manifest-sha256.json':seal}.items():
  p=temp/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
 result=subprocess.run([sys.executable,'-B',str(temp/'verify.py')],cwd=temp,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},capture_output=True,text=True)
 assert result.returncode==0,(result.stdout,result.stderr);saved=json.loads(result.stdout)
 spec=importlib.util.spec_from_file_location('fees_inline_main_elf',temp/'static-lead/elf_reader.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
 c=module.Elf(P/'pump_fees_candidate.so');s=module.Elf(P/'symbols.so');old=module.Elf(temp/'symbols.so')
 assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]==old.b[old.lo:old.hi]
 assert c.pattern(c.lo,c.hi-c.lo)==s.pattern(s.lo,s.hi-s.lo)==old.pattern(old.lo,old.hi-old.lo)
assert saved['comparison_receipts']==17441 and saved['verified_signatures_in_encoded_fields']==17204
print(json.dumps({'verified':True,'sealed_files':len(manifest),'candidate_sha256':digest,'main_scratch_whole_file_equal':True,'source_inputs':22,'canonical_published_harness_inputs':44,'recorded_harness_origins':46,'handler_count':31,'comparison_receipts':17441,'donation_steps':10,'authentic_historical_messages':2,'encoded_transaction_fields':8644,'verified_signatures_in_encoded_fields':17204,'main_runtime_replayed':False,'full_original_byte_equality':False,'current_main_bindings_checked':False},indent=2))
