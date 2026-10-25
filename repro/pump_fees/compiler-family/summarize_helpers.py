#!/usr/bin/env python3
from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parent
matches=json.loads((ROOT/'linked-helper-matches.json').read_text());comparisons=json.loads((ROOT/'independent-comparisons.json').read_text());original=(next(p for p in ROOT.parents if (p/'evidence/original/pump_fees/deployed.so').is_file())/'evidence/original/pump_fees/deployed.so').read_bytes()
selectors={'panic_fmt':'9panicking9panic_fmt','panic_bounds_check':'9panicking18panic_bounds_check','core_fmt_write':'3fmt5write','unicode_is_printable':'9printable12is_printable','fmt_u64':'3imp7fmt_u64','integer_entry':'__multi3','integer_inner':'3int3mul3Mul3mul'}
summary={'scope':'Controlled static comparison; original and output executable bytes never rewritten. v1.44 is preferred among tested v1.43/v1.44/v1.45/v1.46, not uniquely attributed. v1.46.1 was not built; original profile/LTO/sysroot customization remain unknown.','original':comparisons['original'],'helpers':{},'builds':{},'stock_stdlib_optimization':json.loads((ROOT/'stdlib-optimization-source.json').read_text())}
for build,data in matches['builds'].items():
 folder=ROOT/build;report=json.loads((folder/'build-comparison.json').read_text());attempt=json.loads((folder/'build-attempt.json').read_text());binary=(folder/'pump_fees_candidate.so').read_bytes();release=report['selected_toolchain'];prov_path=ROOT/(release+'-toolchain-provenance.json')
 if release=='v1.44':prov_path=ROOT/'v144-toolchain-provenance.json'
 provenance=json.loads(prov_path.read_text()) if prov_path.exists() else {'note':'Pre-existing v1.43 local cache; release archive not acquired in this experiment.'}
 summary['builds'][build]={'release':release,'binary':comparisons['builds'][build]['candidate'],'rustc_version':report['rustc_version'],'rustc_sha256':report['rustc_sha256'],'build_log_sha256':report['build_log_sha256'],'source_unchanged':attempt['source_unchanged'],'returncode':attempt['returncode'],'source_sha256':report['source_sha256'],'command':report['command'],'additional_environment':json.loads((ROOT/'run-notes.json').read_text())['additional_build_environment'],'distribution':provenance,'diagnostic_counts':data['summary'],'selected_helpers':{}}
 for label,needle in selectors.items():
  fs=[f for f in data['functions'] if any(needle in n for n in f['names'])]
  if not fs:continue
  assert len(fs)==1,(build,label,len(fs));f=fs[0]
  summary['builds'][build]['selected_helpers'][label]=f
  for m in f['matches']:
   if m['inferred_function_entry'] and m['next_entry_equals_window_end'] and m['mapped_helper_calls_consistent']:
    key=str(m['original_start'])
    summary['helpers'].setdefault(key,{'original_start':m['original_start'],'bytes':f['bytes'],'raw_sha256':m['original_raw_sha256'],'next_inferred_entry':m['next_inferred_entry'],'matched_by':[]})['matched_by'].append({'build':build,'helper':label,'raw_exact':m['raw_byte_equality']})
  if label in ['integer_entry','integer_inner'] and f['bytes']==352:
   raw=binary[f['candidate_start']:f['candidate_start']+352];ref=original[799040:799392]
   f['integer_reference_offset']=799040;f['instruction_differences_to_captured_352_byte_multiply']=[{'function_relative_offset':i,'captured_instruction_hex':ref[i:i+8].hex(),'candidate_instruction_hex':raw[i:i+8].hex()} for i in range(0,352,8) if ref[i:i+8]!=raw[i:i+8]]
sources=[x['source_sha256'] for x in summary['builds'].values()];summary['source_and_lock_hashes_identical_across_builds']=all(s==sources[0] for s in sources)
(ROOT/'selected-helper-evidence.json').write_text(json.dumps(summary,indent=2)+'\n')
print('Frozen source+lock identical:',summary['source_and_lock_hashes_identical_across_builds'])
for k,v in summary['builds'].items():print(k,v['binary']['sha256'],v['rustc_sha256'],v['distribution'].get('asset_sha256'))
