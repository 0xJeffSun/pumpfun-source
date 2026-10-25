#!/usr/bin/env python3
"""Static review only. Never builds, executes binaries, or writes repository inputs."""
import json,hashlib,sys,shutil,re,collections
from pathlib import Path
sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent
ROOT=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source')
def sha(b): return hashlib.sha256(b).hexdigest()
def dump(p,x): p.write_text(json.dumps(x,indent=2)+'\n')
e=HERE/'evidence';e.mkdir(exist_ok=True)
paths=['work/pump-amm-current-body-inventory/'+p for p in ['pump_amm-bodies.json','amm-admin-diagnostic-differences.json','REPORT.md','elf_reader.py','source-bindings.json']]
paths+=['docs/COMPLETION.md','repro/status.json','evidence/original/pump_amm/deployed.so','repro/pump_amm/pool-serialization-thirty-seven/pump_amm_recovered.so']
paths+=['repro/pump_amm/create-config-static/'+p for p in ['original-evidence.json','STATIC_FINDINGS.md','summary.json','final-build/scalar-setter-negative-analysis.json','final-build/source-snapshot.tar.gz']]
paths+=['repro/pump_amm/create-config-serialization-static/'+p for p in ['summary.json','README.md','function-matches-exit.json.gz','source-snapshot.tar.gz']]
paths += [str(p.relative_to(ROOT)) for p in (ROOT/'programs/pump-amm/src').rglob('*.rs')]
paths += ['repro/pump_amm/create-config-static/extract_amm.py']
paths += [str(p.relative_to(ROOT)) for p in (ROOT/'repro/pump_amm/create-config-static/original-static').glob('*.asm')]
paths += [str(p.relative_to(ROOT)) for p in (ROOT/'audit/pump_amm').glob('*.md')]
manifest=[]
for p in paths:
 b=(ROOT/p).read_bytes(); dst=e/p;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(b);manifest.append({'path':p,'bytes':len(b),'sha256':sha(b)})
dump(HERE/'input-manifest.json',manifest)
sys.path.insert(0,str(e/'work/pump-amm-current-body-inventory'))
from elf_reader import Elf
cat=json.loads((e/paths[0]).read_text());orig=Elf(e/cat['original']['path']);cand=Elf(e/cat['candidate']['path'])
assert sha(orig.b)==cat['original']['sha256']; assert sha(cand.b)==cat['candidate']['sha256']
diags={r['original']['start']:r for r in json.loads((e/paths[1]).read_text())}
cc=json.loads((e/'repro/pump_amm/create-config-static/original-evidence.json').read_text())['excerpts']
ccmap={int(v['start'],16):(k,v) for k,v in cc.items()}
rows=[];near=[]
for r in cat['original_windows']:
 start,end=r['start'],r['end'];assert sha(orig.b[start:end])==r['raw_sha256']
 refs=[]
 for ref in r['data_references']:
  region=ref['target_region']
  if not region or region['section']=='.text':continue
  p=region['file_offset']; b=orig.b[p:p+192]; m=re.match(rb'[ -~]{5,}',b)
  if m:refs.append({'instruction_offset':ref['instruction_offset'],'target_address':ref['target_address'],'file_offset':p,'preview':m[0].decode(),'preview_bytes':len(m[0]),'sha256':sha(m[0]),'consumed_extent_proven':False})
 exact=bool(r['candidate_matches']);typ='matched-body-residual-closure' if exact else 'unresolved-source-or-compiler'
 reason='Body match is bounded; data and transitive calls require independent closure.' if exact else 'No complete current candidate body. Existing evidence cannot separate source, inlining/boundaries, dependency or compiler causes.'
 name=None;ev=[]
 if start in diags:
  typ='diagnostic-only-local-instruction-delta';name=diags[start]['name'];reason='Only two unmasked instructions differ: filename length and error line; calls and other data remain separate gaps.';ev=['work/pump-amm-current-body-inventory/amm-admin-diagnostic-differences.json']
 if start in ccmap and not exact:
  name,detail=ccmap[start];ev=['repro/pump_amm/create-config-static/original-evidence.json','repro/pump_amm/create-config-static/STATIC_FINDINGS.md']
  if name in ['lp_setter','protocol_setter','creator_setter']:
   typ='source-gap-with-historical-compiler-specialization';reason='Static create_config source exists only in historical scratch; scalar setter normalization still differs by 616 versus 608 bytes, with constant-specialization explanation. Not a proven compiler-only current mismatch.'
  else:
   typ='source-supported-historical-create-config';reason='Historical scratch supplies static attribution; no successful fixed-admin replay. Not current candidate equivalence or permission to synthesize authorization.'
  # Prior excerpt sha256 hashes assembly text, not executable bytes.
  if detail['bytes'] != r['bytes']:
   typ='historical-excerpt-boundary-disagreement';reason='Historical recipient_parser excerpt is 2184 bytes; current inferred window is 2096 bytes. Do not claim full-window identity from the earlier excerpt.'
 # Conservative near-shape diagnostic search; reports offsets, never promotes identity.
 if not exact:
  n=orig.normalized[start:end]
  for c in cat['candidate_functions']:
   if c['bytes']!=r['bytes'] or c['relocations']!=r['relocations']:continue
   z=cand.normalized[c['start']:c['end']];diff=[i for i in range(0,len(n),8) if n[i:i+8]!=z[i:i+8]]
   if len(diff)<=4:
    near.append({'original_index':r['index'],'original_start':start,'candidate_start':c['start'],'candidate_bytes':c['bytes'],'candidate_names':c['names'],'different_instruction_offsets':diff,'original_instructions':[orig.b[start+i:start+i+8].hex() for i in diff],'candidate_instructions':[cand.b[c['start']+i:c['start']+i+8].hex() for i in diff],'identity_proven':False})
 row={k:r[k] for k in ['index','start','end','bytes','raw_sha256','normalized_sha256','raw_status','normalized_status']}
 row.update({'original_range_hex':f'{start:#x}..{end:#x}','baseline_pointer':f'/original_windows/{r["index"]}','residual_body':not exact,'classification':typ,'attribution':name,'reason':reason,'evidence':ev,'data_gap':bool(r['data_references']),'relocated_data_reference_count':len(r['data_references']),'data_previews':refs,'unresolved_direct_call_targets':r['unresolved_direct_call_targets'],'indirect_call_count':len(r['indirect_calls']),'candidate_matches':r['candidate_matches'],'semantic_equivalence_proven':False})
 rows.append(row)
dump(HERE/'all-row-dispositions.json',rows);dump(HERE/'residual-rows.json',[r for r in rows if r['residual_body']]);dump(HERE/'near-shape-candidates.json',near)
print(json.dumps({'classes':dict(collections.Counter(r['classification'] for r in rows if r['residual_body'])),'near_pairs':len(near),'near_indices':len(set(r['original_index'] for r in near))},indent=2))
