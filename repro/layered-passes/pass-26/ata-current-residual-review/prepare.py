from pathlib import Path
import json,hashlib,gzip,shutil,datetime
R=Path.cwd();P=R/'work/ata307-existing-evidence-review';A=R/'repro/layered-passes/pass-23/ata-six-window-review';B=R/'repro/parallel-work/2026-10-24/results/ata_recipe/evidence';C=R/'repro/pump/ata-candidate-build-2'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p,d:p.write_text(json.dumps(d,indent=2)+'\n')
assert H(A/'manifest.json')=='85a1068cf3cb591f10f458120680ad52e7219665842339068074de5f9cf6ff1c'
for base in [A,B]:
 m=json.loads((base/'manifest.json').read_text())
 for rel,digest in m.items():
  assert not any(s in rel for s in ['private-security-review','security-followup','audit_coverage'])
  assert H(base/rel)==digest,rel
summarypath=R/'repro/layered-passes/pass-25/after-corrections/summary.json';rangespath=summarypath.with_name('all-byte-ranges.json.gz');summary=json.loads(summarypath.read_text())
assert H(rangespath)==summary['ranges_sha256']
ata=next(x for x in summary['programs'] if x['name']=='associated_token')
ranges=next(x for x in json.loads(gzip.decompress(rangespath.read_bytes()))['programs'] if x['name']=='associated_token')
for side in ['original','candidate']:
 assert H(R/ata[side+'_path'])==ata[side+'_sha256']
 assert (R/ata[side+'_path']).stat().st_size==105032
assert ata['candidate_sha256']=='ba8dd8a42ca7bff4b668c72e1b5614e9363b271924d520253f5724760ba2d65b'
assert ata['original_sha256']=='6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d'
assert H(C/'spl_associated_token_account.so')==H(C/'rebuilt.deployed.so')==ata['candidate_sha256']
positions=[n for start,end in ranges['common_extent_mismatch_ranges'] for n in range(start,end)]
diffs=json.loads((B/'byte-differences.json').read_text())
assert positions==[x['offset'] for x in diffs] and len(positions)==307 and len(ranges['common_extent_mismatch_ranges'])==126
assert sum(x['section']=='.text' for x in diffs)==304 and sum(x['section']=='.rel.dyn' for x in diffs)==3
rows=json.loads((A/'six-windows.json').read_text());assert [r['original_ordinal'] for r in rows]==[38,39,41,44,46,47]
assert sum(r['same_position_mismatch_count'] for r in rows)==304
changed=0;destchanged=0;outrows=[]
for row in rows:
 calls=[x for x in row['calls'] if x['original']['kind']=='internal-direct']
 cd=[x for x in calls if x['original']['raw']!=x['candidate']['raw']]
 changed+=len(cd);destchanged+=sum(x['original']['target']!=x['candidate']['target'] for x in calls)
 outrows.append({**{k:row[k] for k in ['original_ordinal','original_range','candidate_range','original_sha256','candidate_sha256','same_position_mismatch_count','historical_source_identity','semantic_hypothesis','role_proof','normalized_instruction_equal','address_mapped_instruction_mismatches']},'changed_internal_call_encodings':len(cd),'changed_calls':cd})
assert changed==25 and destchanged==18
J(P/'current-P25-ATA-summary.json',ata);J(P/'current-P25-ATA-ranges.json',ranges);J(P/'prior-admitted-byte-differences.json',diffs);J(P/'six-window-metadata.json',outrows)
release=json.loads((R/'repro/pump/ata-release-v1.1.0.json').read_text());asset=next(x for x in release['assets'] if x['name']=='spl_associated_token_account.so')
image=json.loads((C/'image-inspect.json').read_text())[0]
J(P/'chronology-constraint.json',{'release_tag':release['tag_name'],'release_asset_name':asset['name'],'release_asset_id':asset['id'],'asset_created_at_retained':asset['created_at'],'asset_updated_at_retained':asset['updated_at'],'asset_digest_retained':asset['digest'],'candidate_image_created_at_retained':image['Created'],'candidate_image_id':image['Id'],'candidate_image_repo_digests':image['RepoDigests'],'candidate_image_created_after_asset':image['Created']>asset['created_at'],'implication':'Retained metadata does not attribute the post2024 candidate container image as the original2022 upload environment; this does not identify the codegen cause or rule out reproduction in a later environment.'})
copy={
 'candidate2-comparison.json':C/'comparison.json','candidate2-tool-versions.json':C/'tool-versions.json','candidate2-source-manifest.json':C/'source-manifest.json','candidate2-image-inspect.json':C/'image-inspect.json','candidate2-build.log':C/'build.log','candidate2-hosted-run.json':C/'hosted-run.json',
 'prior-six-window-REPORT.md':A/'REPORT.md','prior-sdk-REPORT.md':A/'official/REPORT.md','prior-sdk-assessment.json':A/'official/assessment.json','prior-sdk-asset-assessment.json':A/'official/asset-assessment.json',
 'prior-provenance-REPORT.md':R/'repro/pump/dependency-exactness/ata-provenance-followup/REPORT.md','prior-full-evidence-REPORT.md':B/'REPORT.md','prior-full-evidence-result.json':B/'result.json','prior-provenance-matrix.json':B/'provenance-matrix.json',
 'release-attribution.json':R/'repro/pump/ata-release-attribution.json','release-v1.1.0.json':R/'repro/pump/ata-release-v1.1.0.json',
 'source/anchor-v0242-lib.rs':A/'source-evidence/anchor-v0242-lib.rs','source/spl-ci_rust-version.sh':A/'source-evidence/spl-ci_rust-version.sh','source/spl-ci_cargo-test-bpf.sh':A/'source-evidence/spl-ci_cargo-test-bpf.sh','source/spl-token-workflow.yml':A/'source-evidence/spl-.github_workflows_pull-request-token.yml','source/solana-v1.10.33-install.sh':A/'official/solana-1.10.33-install.sh',
 'prior-best-source-checks.json':R/'repro/pump/dependency-exactness/ata-provenance-followup/best-source-checks.json','prior-best-source-actions.json':R/'repro/pump/dependency-exactness/ata-provenance-followup/best-source-actions.json',
}
refs=[]
for name,src in copy.items():
 dst=P/'retained'/name;dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst);refs.append({'copy':str(dst.relative_to(P)),'repository_path':str(src.relative_to(R)),'sha256':H(src),'bytes':src.stat().st_size})
J(P/'input-references.json',{'retained_copies':refs,'source_manifests_checked':[{'path':str(x/'manifest.json'),'sha256':H(x/'manifest.json'),'payloads':len(json.loads((x/'manifest.json').read_text()))} for x in [A,B]],'P25_after_summary':{'path':str(summarypath.relative_to(R)),'sha256':H(summarypath)},'P25_after_ranges':{'path':str(rangespath.relative_to(R)),'sha256':H(rangespath)},'full_ELF_hashes_only':{side:{'path':ata[side+'_path'],'sha256':ata[side+'_sha256'],'bytes':105032} for side in ['original','candidate']},'new_ELF_function_or_data_decode':False,'prior_canonical_manifest_sha256':'85a1068cf3cb591f10f458120680ad52e7219665842339068074de5f9cf6ff1c'})
J(P/'preparation-result.json',{'result':'PASS','P25_positions_equal_prior307_offsets':True,'mismatch_ranges':126,'text_positions':304,'relocation_positions':3,'affected_windows':6,'changed_call_encodings':changed,'changed_numeric_destinations':destchanged,'new_build':False,'new_runtime':False,'new_original_admission':False,'source_correction':None,'new_recipe_justified':False})
print('PASS: known P23 manifest/full retained ATA evidence hashes, actual selected ELF hashes only, P25 positions exactly equal prior307 offsets, six-window metadata and provenance constraints. No new decode/build/runtime/network.')
