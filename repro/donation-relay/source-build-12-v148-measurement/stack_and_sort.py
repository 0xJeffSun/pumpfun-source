"""Complete emitted driftsort/scratch and direct-frame evidence; no target execution."""
from pathlib import Path
import json,gzip,hashlib,struct
from match_helpers import ROOT,REPO,Elf
H=lambda b:hashlib.sha256(b).hexdigest()
def analyze(ledger):
 e=Elf(ROOT/'build-01/candidate.so');u=Elf(ROOT/'build-01/unstripped.so');o=Elf(REPO/'evidence/dependencies/donation_relay/deployed.so');prior=Elf(REPO/'repro/donation-relay/source-build-12-v147-measurement/build-01/candidate.so')
 logpath=ROOT/'build-01/build.log';log=logpath.read_bytes()if logpath.exists()else gzip.decompress((ROOT/'build-01/build.log.gz').read_bytes());errors=[l for l in log.decode().splitlines()if l.startswith('Error:')];frames=[];sort=[]
 for f in ledger['candidate-function-ledger.json']:
  bad=[x for x in f['direct_r10_accesses']if x['offset']<-4096 or x['offset']>=0]
  if bad:frames.append({'start':f['start'],'bytes':f['bytes'],'names':f['names'],'direct_out_of_frame_accesses':bad})
  if not any('driftsort_main'in n for n in f['names']):continue
  st=f['start'];size=f['bytes'];bounded=st in e.entries and next((x for x in e.entries if x>st),None)==st+size;assert any(s['start']==st and s['size']==size for s in u.funcs);assert e.b[st:st+size]==u.b[st:st+size]
  rows=[]
  for at in range(st,st+size,8):
   op,reg,off,imm=struct.unpack_from('<BBhi',e.b,at)
   if imm in [2048,4096,85,86,170,171]or off in[-2064,-4112]:rows.append({'file_offset':at,'body_offset':at-st,'raw':e.b[at:at+8].hex(),'opcode':op,'dst':reg&15,'src':reg>>4,'offset':off,'immediate':imm})
  matched=size==608 and e.normalized[st:st+size]==o.normalized[36192:36800]and e.pattern(st,size)==o.pattern(36192,size)
  sort.append({'start':st,'end':st+size,'bytes':size,'names':f['names'],'entry_and_next_entry_bounded':bounded,'raw_sha256':H(e.b[st:st+size]),'minimum_direct_r10_offset':min([x['offset']for x in f['direct_r10_accesses']],default=0),'scratch_operands':rows,'original_608_normalized_and_relocation_match':matched,'original_start':36192 if matched else None,'raw_equal_original':e.b[st:st+size]==o.b[36192:36800]if matched else False,'actual_internal_calls':e.callsites(st,size),'original_internal_calls':o.callsites(36192,608)if matched else []})
 positives=[x for x in sort if x['original_608_normalized_and_relocation_match']]
 # The v147 control is retained exactly, including its original scratch mismatch.
 differences=[]
 for off in range(0,608,8):
  a=struct.unpack_from('<BBhi',o.b,36192+off);b=struct.unpack_from('<BBhi',prior.b,10224+off)
  if o.normalized[36192+off:36192+off+8]!=prior.normalized[10224+off:10224+off+8]:differences.append({'offset':off,'original':list(a),'v147':list(b)})
 helpers=json.loads((ROOT/'helper-results.json').read_text())['builds']['source12_v148']['functions'];closed=json.loads((ROOT/'closed-discriminators.json').read_text())
 for f in positives:
  st=f['start'];operands=[]
  for d in differences:
   off=d['offset'];original=struct.unpack_from('<BBhi',o.b,36192+off);candidate=struct.unpack_from('<BBhi',e.b,st+off);assert original==candidate
   operands.append({'offset':off,'original':list(original),'candidate':list(candidate),'v147':d['v147'],'candidate_raw':e.b[st+off:st+off+8].hex()})
  f['all_six_restored_operands']=operands
  row=next(x for x in helpers if x['candidate_start']==st);m=next(x for x in row['matches']if x['original_start']==36192);assert m['inferred_function_entry']and m['next_entry_equals_window_end']and m['mapped_helper_calls_consistent'];f['generic_mapped_callees']=m['mapped_helper_call_checks']
  wrapper=closed['multiply']['wrapper'];assert e.calls[st+160]==wrapper['candidate_start']and o.calls[36192+160]==closed['multiply']['surviving_target']==752688
  f['named_multiply_edge']={'offset':160,'candidate':wrapper['candidate_start'],'original':752688,'complete_named_wrapper_and_raw352_callee_checked':True}
  f['bounded_data_prefix_comparisons']=m['bounded_data_prefix_comparisons'];f['data_limit']='Relocated diagnostic pointer remains normalized only; differing prefix and unproved complete object/indirect/panic closure are retained.'
 return {'scope':'Backend diagnostics and complete linked function/direct-r10 observations only; no execution or general stack-safety claim','build_log_sha256':H(log),'backend_diagnostic_lines':errors,'direct_out_of_frame_functions':frames,'driftsort_functions':sort,'original608_matches':len(positives),'v147_same608_nonrelocation_differences':differences,'runtime_executions':0,'execution_readiness_established':False,'universal_fault_claimed':False}
if __name__=='__main__':
 from full_ledger import analyze as full
 r=analyze(full());(ROOT/'stack-sort-evidence.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'backend_errors':len(r['backend_diagnostic_lines']),'direct_out_of_frame_functions':len(r['direct_out_of_frame_functions']),'original608_matches':r['original608_matches'],'v147_scratch_differences':len(r['v147_same608_nonrelocation_differences'])}))
