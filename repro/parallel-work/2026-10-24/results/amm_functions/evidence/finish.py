#!/usr/bin/env python3
import json,struct,collections,hashlib
from pathlib import Path
H=Path(__file__).resolve().parent
load=lambda p:json.loads((H/p).read_text())
def dump(p,x):(H/p).write_text(json.dumps(x,indent=2)+'\n')
cat=load('evidence/work/pump-amm-current-body-inventory/pump_amm-bodies.json');rows=load('all-row-dispositions.json');near=load('near-shape-candidates.json')
ob=(H/'evidence'/cat['original']['path']).read_bytes();cb=(H/'evidence'/cat['candidate']['path']).read_bytes()
notes=[]
for ix in [142,143,144,325,326,370,373,395,397,451]:
 pairs=[n for n in near if n['original_index']==ix]; assert len(pairs)==1;n=pairs[0]
 r=cat['original_windows'][ix];c=next(c for c in cat['candidate_functions'] if c['start']==n['candidate_start'])
 off=n['different_instruction_offsets'];assert len(off)==2 and off[1]==off[0]+8
 record={'original_index':ix,'original_start':r['start'],'original_end':r['end'],'candidate_start':c['start'],'candidate_end':c['end'],'candidate_names':c['names'],'different_instruction_offsets':off,'scope':'Only local unmasked instruction deltas are diagnostic stores. No function identity, transitive data or recursive call equality claimed.'}
 for key,f,b in [('original',r,ob),('candidate',c,cb)]:
  a=f['start']+off[0];assert b[a]==0x62 and b[a+8]==0x7a
  line=struct.unpack_from('<I',b,a+4)[0];length=struct.unpack_from('<I',b,a+12)[0]
  candidates=[]
  for ref in f['data_references']:
   reg=ref['target_region']
   if reg and ref['instruction_offset']<off[0] and off[0]-ref['instruction_offset']<=64:
    p=reg['file_offset'];raw=b[p:p+length]
    if raw.endswith(b'.rs') and all(32<=v<127 for v in raw):candidates.append((ref,p,raw))
  assert len(candidates)==1,(ix,key,candidates)
  ref,p,raw=candidates[0]
  record[key]={'line':line,'filename_length':length,'filename':raw.decode(),'filename_file_range':[p,p+length],'filename_sha256':hashlib.sha256(raw).hexdigest(),'pointer_instruction_offset':ref['instruction_offset'],'raw_local_range':[f['start']+ref['instruction_offset'],a+16],'raw_local_hex':b[f['start']+ref['instruction_offset']:a+16].hex()}
 notes.append(record)
 rows[ix]['classification']='diagnostic-only-local-instruction-delta'
 rows[ix]['reason']='Exactly two unmasked instruction stores differ: source line and source filename length. Referenced filename bytes separately checked; other calls/data are unresolved.'
 rows[ix]['evidence']=['diagnostic-deltas.json']
 rows[ix]['attribution']=rows[ix]['attribution'] or 'candidate symbol is a comparison hypothesis only; see diagnostic-deltas.json'
by=collections.defaultdict(list)
for i,n in enumerate(near):by[n['original_index']].append(i)
for r in rows:
 r['near_shape_candidate_pointers']=[f'/near-shape-candidates.json/{i}' for i in by[r['index']]]
 if r['classification']=='unresolved-source-or-compiler':
  r['next_action']='Trace existing caller and exact data consumption before choosing a source change; no build proposal established.'
  if by[r['index']]:r['next_action']='Inspect retained near-shape alternatives and call/data relationships; similarity is not function attribution.'
 elif r['classification'].startswith('diagnostic'):r['next_action']='Retain mismatch; no padding, path remapping or fabricated source coordinates.'
 elif 'create-config' in r['classification']:r['next_action']='Review retained scratch source only; promotion requires authentic unchanged fixed-admin historical replay evidence.'
 else:r['next_action']='Retain bounded status and close data/call evidence independently; do not change accepted serializers.'
res=[r for r in rows if r['residual_body']]
dump('all-row-dispositions.json',rows);dump('residual-rows.json',res);dump('diagnostic-deltas.json',notes)
counts=dict(collections.Counter(r['classification'] for r in res))
result={'scope':'Exhaustive static disposition of baseline original AMM windows; no compilation/runtime probes','baseline_published_checkpoint':'8099031 (user supplied; artifact identities verified independently)','original':cat['original'],'candidate':cat['candidate'],'baseline_limit':'Pump/Fees inventory entries predate their new candidates; AMM 5a68db remains applicable. This report makes no refreshed Pump/Fees inventory claims.','original_window_count':len(rows),'residual_window_count':len(res),'residual_bytes':sum(r['bytes'] for r in res),'classification_counts':counts,'residual_with_data_gap':sum(r['data_gap'] for r in res),'residual_with_indirect_calls':sum(bool(r['indirect_call_count']) for r in res),'diagnostic_local_windows':len(notes),'newly_explained_diagnostic_windows':7,'near_shape_pairs':len(near),'near_shape_original_windows':len(set(n['original_index'] for n in near)),'near_shape_identity_proven':False,'new_implemented_handlers':0,'new_runtime_cases':0,'full_byte_equality':False,'builds_run':0,'main_edits':0,'proposals':['Preserve and review the existing create_config source/context/event/setter family as a static hypothesis; no positive replay evidence exists.','Prioritize source/module provenance for the ten locally explained diagnostic windows, without forcing file line numbers.','Resolve scalar-setter and with_values specialization as a connected source/compiler family using retained evidence, not compiler/flag search.','For remaining 300 unknown rows, trace caller and consumed data before proposing behavioral edits.'],'artifacts':['REPORT.md','RESIDUAL_ROWS.md','all-row-dispositions.json','residual-rows.json','diagnostic-deltas.json','near-shape-candidates.json','input-manifest.json','verify.py']}
dump('result.json',result)
lines=['# Exhaustive residual AMM row disposition','','All ranges are half-open original ELF virtual addresses and file offsets (equal for this .text). Hashes are raw bytes, not assembly text. D=data references; I=indirect calls; U=unmatched direct targets. Row identifiers point into the retained baseline JSON. No row below is a semantic proof.','','| Row | Range | Bytes | Classification | D/I/U | Raw SHA256 |','| --- | --- | ---: | --- | --- | --- |']
for r in res:lines.append(f"| {r['index']} | `{r['original_range_hex']}` | {r['bytes']} | {r['classification']} | {r['relocated_data_reference_count']}/{r['indirect_call_count']}/{len(r['unresolved_direct_call_targets'])} | `{r['raw_sha256']}` |")
(H/'RESIDUAL_ROWS.md').write_text('\n'.join(lines)+'\n')
print(json.dumps(result,indent=2))
