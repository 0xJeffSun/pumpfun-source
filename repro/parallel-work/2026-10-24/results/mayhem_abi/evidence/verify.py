#!/usr/bin/env python3
"""Portable, offline static verifier. No compilation, program execution or network."""
from pathlib import Path
import collections,hashlib,json,re,struct,sys,tarfile
P=Path(__file__).resolve().parent

def sha(b): return hashlib.sha256(b).hexdigest()
def read(n): return (P/n).read_bytes()
def js(n): return json.loads(read(n))
def ins(b,pc):
 op,reg,off,imm=struct.unpack('<BBhi',b[pc:pc+8])
 return dict(pc=pc,raw=b[pc:pc+8].hex(),opcode=op,dst=reg&15,src=reg>>4,offset=off,immediate=imm)
def compute():
 for x in js('inputs.json'):
  b=read(x['copy']); assert len(b)==x['bytes'] and sha(b)==x['sha256'],x['copy']
 inv=js('inputs/inventory.json'); abi=js('inputs/abi-analysis.json')
 c=read('inputs/candidate.so');o=read('inputs/original.so')
 for k,b in [('candidate',c),('original',o)]: assert sha(b)==inv['inputs'][k]['sha256']==abi[k+'_sha256']
 build=js('inputs/build-comparison.json'); bindings=js('inputs/field-inputs.json')
 assert sha(read('inputs/source-snapshot.tar.gz'))==bindings['references']['repro/mayhem/twentyfour/source-snapshot.tar.gz']
 with tarfile.open(P/'inputs/source-snapshot.tar.gz') as t:
  for name in ['lib']:
   src='programs/mayhem/src/'+name+'.rs'; b=read('inputs/'+name+'.rs')
   assert sha(b)==build['source_sha256'][src]==bindings['source_sha256'][src]
   members=[m for m in t.getmembers() if m.name.endswith(src)]
   assert len(members)==1 and t.extractfile(members[0]).read()==b
 for name in ['burn','buy','sell','buy_v2','sell_v2','buy_pump_swap','sell_pump_swap']:
  assert sha(read('inputs/'+name+'.rs'))==build['source_sha256']['programs/mayhem/src/instructions/'+name+'.rs']
 # Retain every baseline row; unknown original ranges are metadata only.
 candidates=[];calls=[]
 for r in inv['candidate_rows']:
  names=' '.join(r['names']); start=r['candidate_start']; end=r['candidate_end']
  excluded='initialize' in names.lower()
  mixed=start in [352816,399000]
  disposition=('excluded_initializer_metadata_only' if excluded else 'mixed_entry_metadata_only' if mixed else
   'bounded_pattern_only_transitive_code_data_open' if r['original_matches'] else
   'known_counterpart_body_differs' if r['known_unmatched_counterparts'] else 'unmatched_named_candidate')
  group=('initializer' if excluded else 'mixed_entry' if mixed else 'program' if 'mayhem_recovered' in names else
   'anchor' if 'anchor_' in names else 'solana_spl' if any(s in names for s in ['solana_','spl_']) else 'rust_other')
  row=dict(start=start,end=end,bytes=end-start,names=r['names'],group=group,disposition=disposition,
   baseline_status=r['status'],raw_sha256=r['candidate_raw_sha256'],
   original_pattern_starts=[m['original_start'] for m in r['original_matches']],
   raw_match_starts=[m['original_start'] for m in r['original_matches'] if m['raw_equal']],
   known_counterparts=r['known_unmatched_counterparts'],
   dependency_counts={k:len(v) for k,v in r['dependencies'].items()},
   next_step='Preserve exclusion' if excluded or mixed else 'Resolve real caller, complete target bodies and actual referenced data; no inferred identity from shape alone')
  candidates.append(row)
  if excluded or mixed: continue
  # Hash known candidate spans only; no original unknown window inspection.
  assert sha(c[start:end])==r['candidate_raw_sha256']
  for q in r['dependencies']['direct']:
   if q['target']!=530416: continue
   i=ins(c,q['pc']);assert i['raw']==q['raw_hex'] and i['opcode']==0x85 and i['src']==1
   assert q['pc']+8+8*i['immediate']==530416
   calls.append(dict(caller_start=start,caller_end=end,names=r['names'],call=i,target=530416,
     limit='Direct edge to known constructor; not an independently traced argument/error path.'))
 originals=[]
 for r in inv['original_rows']:
  row={k:v for k,v in r.items() if k in ['original_start','original_end','original_bytes','bounds','status','original_raw_sha256']}
  row['disposition']='excluded_metadata_only' if 'excluded' in r['status'] else 'pattern_metadata_only_closure_open' if r['candidate_matches'] else 'unattributed_metadata_only_identity_unknown'
  row['next_step']='No body analysis or graph traversal here. Attribution must originate from a permitted known non-initializer caller.'
  originals.append(row)
 assert len(candidates)==409 and len(originals)==441
 # Bounded raw byte checks from previously retained constructor and formatter evidence.
 rawranges=[]
 for kind,b,start,end in [('original',o,632296,632880),('candidate',c,530416,531008)]:
  rawranges.append(dict(kind=kind,start=start,end=end,sha256=sha(b[start:end]),raw_hex=b[start:end].hex()))
  stores=abi['payload_shape'][kind+'_stores'];ret=abi['payload_shape'][kind+'_return']
  for q in stores+ret: assert ins(b,q['pc'])==q
 assert [(q['opcode'],q['offset'],q['immediate']) for q in abi['payload_shape']['original_stores']]==[(q['opcode'],q['offset'],q['immediate']) for q in abi['payload_shape']['candidate_stores']]
 fmt=[]
 for f in abi['format_flag_accesses']:
  for kind,b in [('original',o),('candidate',c)]:
   for t in ['load','mask']:
    q=f[kind+'_'+t];assert ins(b,q['pc'])==q
  a=f['original_load'];b=f['candidate_load'];am=f['original_mask'];bm=f['candidate_mask']
  assert a['opcode']==0x71 and b['opcode']==0x61 and am['immediate']==128 and bm['immediate']==1<<23
  assert a['offset']*8+7==b['offset']*8+23==151
  assert a['dst']==b['dst']==am['dst']==bm['dst'] and a['src']==b['src']
  # All 256 values of the selected byte; other word bits cannot survive mask.
  assert all(bool(v&128)==bool((v<<16)&(1<<23)) for v in range(256))
  fmt.append(dict(original_range=[a['pc'],am['pc']+8],candidate_range=[b['pc'],bm['pc']+8],
   original_hex=o[a['pc']:am['pc']+8].hex(),candidate_hex=c[b['pc']:bm['pc']+8].hex(),absolute_bit=151,
   result='Equal zero/nonzero bit predicate, unequal numeric masked values when set; not full-function equivalence'))
 official=read('inputs/official-anchor-error-1.0.0.rs');selected=read('inputs/anchor-error-1.0.0.rs')
 assert selected==official
 prov=js('inputs/official-anchor-source-provenance.json')
 assert sha(official)==prov['files']['lang/src/error.rs']['sha256']
 assert b'pub enum Error {\n    AnchorError(Box<AnchorError>),\n    ProgramError(Box<ProgramErrorWithOrigin>),\n}' in official
 assert b'const ALTERNATE_FLAG: u32 = 1 << 23;' in read('inputs/platform-v1.52-fmt.rs')
 # Exact, bounded non-initializer source excerpts. No initializer body inspected.
 source_ranges=[];lines=read('inputs/lib.rs').decode().splitlines(keepends=True)
 for start,end,label in [(45,77,'withdrawals'),(127,167,'update_global_params'),(193,202,'reset_state'),(234,249,'GlobalParams')]:
  text=''.join(lines[start-1:end]);source_ranges.append(dict(path='inputs/lib.rs',start_line=start,end_line=end,label=label,text=text,sha256=sha(text.encode())))
 assert 'reset_middle[17..25]' in source_ranges[0]['text'] and 'reset_stable_suffix[8..16]' in source_ranges[0]['text']
 fields=[]
 for f in js('inputs/field-crosswalk.json')['global_params_arguments']:
  if f['argument'] not in ['field_0','field_1','field_3','field_6','field_8','field_10','field_15']: continue
  row={k:f[k] for k in ['argument','account_offset','serialized_width','candidate_storage']}
  n=f['argument'];row['reset_state']='preserved' if n=='field_10' else 'zeroed'
  row['disposition']='candidate_role_demonstrated' if n in ['field_8','field_15'] else 'unresolved_role_update_event_storage_only_in_reviewed_sources'
  row['role']=('Native withdrawal interval interpreted as signed i64; active only if interval and last timestamp are nonzero.' if n=='field_8' else 'Quote-token withdrawal interval interpreted as signed i64; active only if interval and last timestamp are nonzero.' if n=='field_15' else 'No behavioral role established.')
  row['evidence_lines']=([61,77] if n=='field_8' else [45,60] if n=='field_15' else [127,167])
  row['original_semantics_proven']=False;fields.append(row)
 crosswalk=js('inputs/field-crosswalk.json')
 refs=next(r for r in crosswalk['mayhem_state_fields'] if r['field']=='field_8')['trade_read_write_references']
 assert len(refs)==12 and all(re.search(r'\bfield_89\b',r['text']) and not re.search(r'\bfield_8\b',r['text']) for r in refs)
 crosswalk_issue=dict(field='MayhemState.field_8',affected_reference_count=len(refs),finding='All listed references use field_89, not field_8. Exact-token filtering is needed; field_8 role remains unresolved.')
 counts=dict(candidate_dispositions=dict(collections.Counter(r['disposition'] for r in candidates)),original_dispositions=dict(collections.Counter(r['disposition'] for r in originals)),candidate_groups=dict(collections.Counter(r['group'] for r in candidates)),direct_constructor_calls=len(calls),direct_constructor_callers=len({r['caller_start'] for r in calls}),formatter_predicates=len(fmt))
 return dict(schema=1,scope='Exhaustive disposition of retained inventory rows, not exhaustive historical function identification or semantic proof. Initializers and mixed entry bodies excluded; unknown original bodies not inspected.',checkpoint='8099031 user-supplied',candidate_sha256=sha(c),original_sha256=sha(o),baseline=inv['summary'],counts=counts,candidate_rows=candidates,original_rows=originals,known_handler_counterparts=inv['known_counterparts'],constructor_call_edges=calls,constructor_ranges=rawranges,formatter_predicates=fmt,source_ranges=source_ranges,seven_fields=fields,crosswalk_reference_issue=crosswalk_issue,official_anchor=dict(provenance=prov['files']['lang/src/error.rs'],selected_equals_retained_official=True,error_declaration_lines=[283,287],error_codegen_lines=[77,89],formatter_flag_line=315),new_builds=0,new_runtime_probes=0,source_changes=0,whole_byte_equal=False)

def main():
 result=compute()
 if '--write' in sys.argv:
  (P/'result.json').write_text(json.dumps(result,indent=2)+'\n')
  print(json.dumps(result['counts'],indent=2));return
 assert result==js('result.json'),'result.json differs from recomputed static result'
 if (P/'manifest.json').exists():
  for n,h in js('manifest.json').items():assert sha(read(n))==h,n
 print('PASS: input seals, 850 row dispositions, permitted candidate ranges/call operands, constructor stores, seven bit predicates, accepted source binding and field excerpts. No build or runtime.')
if __name__=='__main__':main()
