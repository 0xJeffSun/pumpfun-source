"""Verify retained metadata correlation only. No ELF decoder, build, runtime or network."""
from pathlib import Path
import json,hashlib,datetime
P=Path(__file__).resolve().parent
L=lambda n:json.loads((P/n).read_text())
H=lambda b:hashlib.sha256(b).hexdigest()
m=L('manifest.json');seal=H((P/'manifest.json').read_bytes());assert (P/'manifest.sha256').read_text()==seal+'  manifest.json\n'
assert set(m['files'])=={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f not in [P/'manifest.json',P/'manifest.sha256']}
for n,x in m['files'].items():
 b=(P/n).read_bytes();assert H(b)==x['sha256'] and len(b)==x['bytes'],n
for x in L('input-references.json')['retained_copies']:
 b=(P/x['copy']).read_bytes();assert H(b)==x['sha256'] and len(b)==x['bytes']
summary=L('current-P25-ATA-summary.json');r=L('current-P25-ATA-ranges.json');diff=L('prior-admitted-byte-differences.json')
assert summary['candidate_sha256']==r['candidate_sha256']=='ba8dd8a42ca7bff4b668c72e1b5614e9363b271924d520253f5724760ba2d65b'
assert summary['original_sha256']==r['original_sha256']=='6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d'
assert summary['original_bytes']==summary['candidate_bytes']==105032
positions=[n for a,b in r['common_extent_mismatch_ranges'] for n in range(a,b)]
assert positions==[x['offset'] for x in diff] and len(positions)==307 and len(r['common_extent_mismatch_ranges'])==126
assert sum(x['section']=='.text' for x in diff)==304 and sum(x['section']=='.rel.dyn' for x in diff)==3
rows=L('six-window-metadata.json');assert [x['original_ordinal'] for x in rows]==[38,39,41,44,46,47]
assert [x['same_position_mismatch_count'] for x in rows]==[181,101,9,2,5,6]
assert [x['changed_internal_call_encodings'] for x in rows]==[4,3,7,2,4,5]
calls=L('complete-admitted-call-metadata.json');changed=dest=0
for group in calls:
 for c in group['calls']:
  if c['original']['kind']=='internal-direct':
   changed+=c['original']['raw']!=c['candidate']['raw'];dest+=c['original']['target']!=c['candidate']['target']
assert changed==25 and dest==18
rel=L('relocation-cross-index-metadata.json');assert [x['index'] for x in rel['changed_ordered_records']]==[247,248]
assert [(x['original_index'],x['candidate_index']) for x in rel['mapped_correspondence_across_indices']]==[(247,249),(248,250),(249,247),(250,248)]
comparison=L('retained/candidate2-comparison.json');assert comparison['onchain_recipe'] is None and comparison['zero_padding_bytes']==0
assert comparison['candidate_sha256']==summary['candidate_sha256'] and comparison['full_byte_equality'] is False
source=L('retained/candidate2-source-manifest.json');assert source['Cargo.lock']=='3c8f402f40488908503e9cc088388c1f95848d79da5141b5cb1a14006d74428b'
tools=L('retained/candidate2-tool-versions.json');asset=L('retained/prior-sdk-asset-assessment.json');assert '/v1.27/bpf-tools/' in tools['selected_rustc_resolved']
assert tools['selected_rustc_sha256']==asset['downloaded_rustc_sha256']=='1f070433db37406c128936f1b5baa734a7d4f4c94c6db31d07b890a649ed7a39'
assert 'version=v1.27' in (P/'retained/source/solana-v1.10.33-install.sh').read_text()
assert 'releases/1.10.33/' in (P/'retained/candidate2-build.log').read_text()
chron=L('chronology-constraint.json');assert chron['candidate_image_created_at_retained']>chron['asset_created_at_retained']
assert chron['candidate_image_created_at_retained']==L('retained/candidate2-image-inspect.json')[0]['Created']
assert [x['differing_bytes'] for x in L('retained/prior-full-evidence-result.json')['candidates']]==[1199,307,1506,307,1506]
plan=L('PLAN.NOT_EXECUTABLE.json');assert plan['source_patch'] is None and plan['compiler_command'] is None and plan['runtime_command'] is None
assert plan['new_original_function_admission'] is None and plan['new_original_data_admission'] is None
print(json.dumps({'result':'PASS','scope':'Existing admitted metadata and retained source/build records only; no fresh ELF decode','positions_unchanged':307,'ranges':126,'text_positions':304,'relocation_positions':3,'affected_windows':6,'changed_call_encodings':25,'new_recipe_justified':False,'source_patch':None,'new_builds':0,'new_runtime':0,'whole_byte_identity':False},indent=2))
