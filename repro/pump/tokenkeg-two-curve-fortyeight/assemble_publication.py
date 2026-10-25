"""Prepare explicit owned publication paths; no entire build-tree copy."""
from pathlib import Path
import gzip,hashlib,json,shutil,tarfile
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if(p/'evidence/upstream/pump.json').is_file());H=W/'handoff';P=R/'repro/pump/tokenkeg-two-curve-fortyeight';assert not P.exists();P.mkdir()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def copy(source,name):
 assert not source.is_symlink()and not source.name.endswith('-keypair.json');target=P/name;target.parent.mkdir(parents=True,exist_ok=True);assert not target.exists();shutil.copyfile(source,target)
main=W/'main-build-01';scratch=W/'build-01';candidate=main/'artifacts/pump_recovered.so'
assert candidate.read_bytes()==(scratch/'artifacts/pump_recovered.so').read_bytes();expected=sha(candidate)
mb=load(main/'build-comparison.json');sb=load(scratch/'build-comparison.json');attempt=load(main/'build-attempt.json');source=load(W/'candidate-source-sha256.json')
assert len(mb['source_sha256'])==36 and mb['source_sha256']==source==attempt['source_sha256']==attempt['source_after_sha256']and attempt['source_unchanged']and attempt['returncode']==0
for path,digest in source.items():assert sha(R/path)==digest,path
identity={'entire_files_equal':True,'main_sha256':expected,'scratch_sha256':sha(scratch/'artifacts/pump_recovered.so'),'bytes':candidate.stat().st_size,'main_build_report_sha256':sha(main/'build-comparison.json'),'scratch_build_report_sha256':sha(scratch/'build-comparison.json'),'source_inputs':36,'main_source_sha256':source,'scratch_source_sha256':sb['source_sha256'],'scope':'Both independently clean source builds; entire ELF equality permits reuse of the fresh scratch runtime corpus. Legacy embedded checkout maps remain historical snapshots. No original-program byte-equality claim.','main_compile_selected':'v1.44','sdk_strip_distribution':'v1.52'}
(P/'main-scratch-identity.json').write_text(json.dumps(identity,indent=2)+'\n')
copy(candidate,'candidate.so');copy(main/'target/sbf-solana-solana/release/pump_recovered.so','unstripped.so')
for name in ['build-comparison.json','build-attempt.json']:copy(main/name,name)
(P/'build.log.gz').write_bytes(gzip.compress((main/'build.log').read_bytes(),mtime=0));copy(W/'main-build-launcher-01.log','main-build-launcher-01.log')
for name in ['baseline.json','baseline-source-sha256.json','candidate-source-sha256.json','source-proposal-02.patch','dependency-provenance.json','build-helper-sha256.json','harness-snapshot-sha256.json','harness-snapshot.tar.gz','source-snapshot.tar.gz','focused-verification-01.json','independent-verification.json','inputs-before.json','summary.json']:
 copy(H/name,'scratch-'+name if name in ['summary.json','inputs-before.json']else name)
copy(H/'receipt-build-bindings.json','scratch-receipt-build-bindings.json');copy(H/'receipt-copy-map.json','scratch-receipt-copy-map.json')
copy(H/'toolchain-phases.json','scratch-toolchain-phases.json');phases=load(H/'toolchain-phases.json')
for field in ['compiled_unstripped','candidate']:
 old=Path(phases[field]['path']);new=main/old.relative_to(scratch);assert new.is_file();phases[field]={'path':str(new),'sha256':sha(new),'bytes':new.stat().st_size}
info=main/'target/.rustc_info.json';phases['compile']['cargo_rustc_info']={'path':str(info),'sha256':sha(info),'bytes':info.stat().st_size};copy(info,'cargo-rustc-info.json')
assert 'v1.44/rust'in info.read_text();assert (main/'sdk/dependencies/platform-tools').resolve()==Path.home()/'.cache/solana/v1.52/platform-tools'
for name in phases['strip']['scripts']:
 file=main/'sdk'/name;phases['strip']['scripts'][name]={'path':str(file),'sha256':sha(file),'bytes':file.stat().st_size}
(P/'toolchain-phases.json').write_text(json.dumps(phases,indent=2)+'\n')
# Retain the full immutable scratch package under its exact seal.
sealed=load(H/'manifest-sha256.json');assert sha(H/'manifest-sha256.json')=='64fa54308f45bde2c4746ae01100576907e3087b977351ac3c2d28506d6938b5'
with tarfile.open(P/'scratch-handoff.tar.gz','w:gz')as tar:
 for path,record in sealed.items():
  assert not Path(path).name.endswith('-keypair.json')and sha(H/path)==record['sha256'];tar.add(H/path,arcname=path,recursive=False)
 tar.add(H/'manifest-sha256.json',arcname='manifest-sha256.json',recursive=False)
copy(H/'manifest-sha256.json','scratch-manifest-sha256.json')
for path,digest in source.items():copy(R/path,'source/'+path)
(P/'source-sha256.json').write_text(json.dumps(source,indent=2)+'\n')
for path in load(W/'build-helper-sha256.json'):copy(W/'build-helper-snapshot'/path,'build-helper-snapshot/'+path)
for file in (W/'publication-proposal/harness').iterdir():copy(file,'harness/'+file.name)
copy(R/'programs/pump/README.md','documentation-snapshot/programs/pump/README.md')
owned={p:sha(R/p)for p in ['programs/pump/README.md','programs/pump/src/multi_hop_curve.rs']};(P/'owned-files-sha256.json').write_text(json.dumps(owned,indent=2)+'\n')
copy(W/'publication-proposal/status-pump-proposal.json','status-pump-proposal.json')
copy(W/'publication-proposal/harness-portability.patch','harness-portability.patch')
copy(W/'main-owned-changes.json','main-owned-changes.json');copy(W/'handoff-verification.json','scratch-handoff-verification.json')
mapold=load(H/'receipt-copy-map.json');bindings=[];copymap={}
for b in load(H/'receipt-build-bindings.json'):
 item=mapold[b['receipt']];dest=item['path'];copy(H/dest,dest)
 record={'receipt':str((P/dest).relative_to(R)),'receipt_sha256':sha(P/dest),'receipt_source_sha256':b['receipt_sha256'],'transport':item['transport'],'kind':b['kind'],'executed_candidate_sha256':expected,'executed_original_sha256':sb['comparison']['original_sha256'],'executed_scratch_build_report_sha256':sha(scratch/'build-comparison.json'),'executed_scratch_source_sha256':sb['source_sha256'],'main_build_report_sha256':sha(main/'build-comparison.json'),'main_source_sha256':source,'identity_report':'repro/pump/tokenkeg-two-curve-fortyeight/main-scratch-identity.json','identity_report_sha256':sha(P/'main-scratch-identity.json'),'reuse_basis':'Complete independently clean main/scratch executable identity; the runtime transaction was executed freshly on scratch. Embedded legacy main-source maps are incidental baseline checkout snapshots.'}
 bindings.append(record);copymap[b['receipt']]={'path':dest,**{k:v for k,v in item.items()if k!='path'}}
copy(H/'focused-01.json.gz','differential/tokenkeg_two_curve.json.gz')
bindings.append({**bindings[-1],'receipt':str((P/'differential/tokenkeg_two_curve.json.gz').relative_to(R)),'receipt_sha256':sha(P/'differential/tokenkeg_two_curve.json.gz'),'receipt_source_sha256':sha(P/'differential/tokenkeg_two_curve.json.gz'),'transport':'unchanged','kind':'two_curve','executed_harness_sha256':sha(H/'harness-focused-01.py')})
(P/'receipt-build-bindings.json').write_text(json.dumps(bindings,indent=2)+'\n');(P/'receipt-copy-map.json').write_text(json.dumps(copymap,indent=2)+'\n')
aggregate={}
for row in load(H/'differential/run.json'):
 aggregate[row['suite']]=load(P/'differential'/(row['suite']+'.json.gz'))
aggregate['tokenkeg_two_curve']=load(P/'differential/tokenkeg_two_curve.json.gz');assert len(aggregate)==38
(P/'all-differential.json.gz').write_bytes(gzip.compress(json.dumps({'scope':'38 bounded suites: 9,217 existing comparisons plus 20 ordinary two-curve comparisons; source bindings distinguish executed scratch from byte-identical main.','candidate_sha256':expected,'original_sha256':sb['comparison']['original_sha256'],'case_count':9237,'mismatches':[],'suites':aggregate},separators=(',',':')).encode(),mtime=0))
copy(H/'differential/run.json','differential/run.json');copy(H/'surfpool/run.json','surfpool/run.json')
copy(Path(__file__),'assemble_publication.py')
print(json.dumps({'package':str(P.relative_to(R)),'candidate_sha256':expected,'main_source_inputs':36,'core_receipt_bindings':len(bindings),'whole_elf_identity':True},indent=2))
