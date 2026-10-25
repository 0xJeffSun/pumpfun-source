from pathlib import Path
import sys,json,gzip,hashlib,struct
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'reference/analysis-method'))
from elf_reader import Elf
from window_tools import instructions,comparison,extent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def run():
 c=Elf(W/'candidate.so');s=Elf(W/'symbols.so');o=Elf(W/'reference/analysis-method/inputs/original.so')
 p=json.load(gzip.open(W/'legacy-static-proof.json.gz','rt'))
 def ins(pc):return instructions(c,pc,16 if c.b[pc]==24 else 8)[0]
 def witness(a,b):return instructions(c,a,b-a)
 def edge(pc,expected):assert c.calls[pc]==expected;return ins(pc)
 proofs={
  'quote_short_length_branch':witness(540264,540304),
  'quote_data_offsets_and_borrow_release':witness(540400,540600),
  'quote_temporary_accountinfo_drop_before_version':witness(540600,540752),
  'quote_then_version_branch':witness(541016,541040),
  'authority_key_comparison':witness(541456,541608),
  'authority_revoked_direct_error':witness(542280,542368),
  'amm_four_reserve_owner_guard':witness(548040,548208),
  'amm_guard_skip_owning_cleanup':witness(548248,548272),
  'payout_first_allocations':witness(548280,548872),
  'payout_early_serialization_call':witness(555584,555632),
  'pump_cpi_call':witness(558960,559000),
  'final_checked_sum_direct_error':witness(560968,561008),
  'final_event_and_clock':witness(561064,561200),
 }
 assert ins(540280)['immediate_signed']==115 and ins(540280)['opcode']==165
 assert ins(542336)['immediate_signed']==9;edge(542344,609544)
 assert ins(542328)['immediate_signed']==-1376
 assert [ins(q)['offset_signed'] for q in [548040,548056,548072,548088]]==[424,408,416,400]
 edge(548264,38504);edge(551224,361656);edge(555600,23616);edge(558976,348008)
 errors=[q for q in instructions(c,539952,24880) if q['opcode'] in [0x62,0x7a] and 6000<=q['immediate_signed']<=6035]
 assert {q['immediate_signed'] for q in errors}>={6031,6024,6016,6018,6013,6020,6033,6010,6011,6017,6014,6012}
 pairs={}
 for name in ['pump_cpi','pump_metas','pump_infos','amm_metas','amm_infos','sharing_exit','event']:
  a=p['roots']['original'][name];b=p['roots']['candidate'][name];oc=o.callsites(a['start'],a['size']);cc=c.callsites(b['start'],b['size']);assert [x['offset']for x in oc]==[x['offset']for x in cc]
  rows=[]
  for x,y in zip(oc,cc):
   sizes={f['size']for f in s.funcs if f['start']==y['target']};m=next(iter(sizes)) if len(sizes)==1 else extent(c,y['target']);n=extent(o,x['target'])
   rows.append({'offset':x['offset'],'original':x['target'],'candidate':y['target'],'original_size_inferred':n,'candidate_size':m,'raw_equal':o.b[x['target']:x['target']+n]==c.b[y['target']:y['target']+m],'normalized_equal':n==m and o.normalized[x['target']:x['target']+n]==c.normalized[y['target']:y['target']+m],'relocation_pattern_equal':o.pattern(x['target'],n)==c.pattern(y['target'],m)})
  pairs[name]=rows
 # Genuine generated AMM call targets and immediate data prefix; whole body comparison remains false.
 a=p['roots']['original']['amm_cpi'];b=p['roots']['candidate']['amm_cpi'];common=0
 for off in range(0,min(a['size'],b['size']),8):
  if o.normalized[a['start']+off:a['start']+off+8]!=c.normalized[b['start']+off:b['start']+off+8]:break
  common+=8
 return {'candidate_sha256':H(W/'candidate.so'),'original_sha256':H(W/'reference/analysis-method/inputs/original.so'),'witnesses':proofs,'immediate_error_stores':errors,'matching_root_direct_target_pairs':pairs,'generated_amm_normalized_common_prefix_bytes':common,'limits':['Local instruction/dataflow witnesses retain full enclosing roots in legacy-static-proof; they are not a full formal CFG equivalence proof.','Signed call operands and actual target bodies retained. Target comparisons that are false are not waived.','No claim that original source helper partition survives compilation; eight source helpers inline into candidate handler.','The generic AMM typed-account drop helper is reached from both skipped-adapter and generated-CPI cleanup paths; whole AMM CPI body remains different.']}
if __name__=='__main__':
 r=run();(W/'legacy-control-witnesses.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'status':'PASS','direct_target_pairs':sum(map(len,r['matching_root_direct_target_pairs'].values())),'different_target_pairs':sum(not(x['normalized_equal'] and x['relocation_pattern_equal'])for rows in r['matching_root_direct_target_pairs'].values()for x in rows),'amm_normalized_prefix':r['generated_amm_normalized_common_prefix_bytes']}))
