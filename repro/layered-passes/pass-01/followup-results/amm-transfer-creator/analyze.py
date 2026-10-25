#!/usr/bin/env python3
"""Static-only receipt, instruction and call reconciliation. Never imports a runner."""
from pathlib import Path
import ast,base64,gzip,hashlib,json,struct,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P/'layer01'))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p):
 b=(P/p).read_bytes();return json.loads(gzip.decompress(b) if str(p).endswith('.gz') else b)
def generate():
 B='inputs/repro/pump_amm/update-event-borrow-v144/'
 D=read('layer01/analysis/residual-ledger.json')
 orig=Elf(P/'layer01/inputs/evidence/original/pump_amm/deployed.so');cand=Elf(P/'layer01/inputs/repro/pump_amm/update-event-borrow-v144/candidate.so')
 report=read(B+'transfer_creator-differential.json.gz');saved=read(B+'scratch/runtime-01/transfer_creator.json.gz');assert report==saved
 hashes={'original':sha(orig.b),'candidate':sha(cand.b)}
 assert report['original_sha256']==hashes['original'] and report['candidate_sha256']==hashes['candidate']
 assert report['script_sha256']==sha((P/'inputs/scripts/pump_amm_transfer_creator_differential.py').read_bytes())
 tx=read(B+'scratch/runtime-01/transfer_creator-transactions.json.gz');assert tx['script_sha256']==report['script_sha256']
 assert len(tx['transactions'])==534==tx['transaction_count']
 result=[];dest='B2C6i1B8CjbGw1uwtc2cHjWqjm7xGLmKVBHHSonFUSLT'
 for i,r in enumerate(report['cases']):
  x,y=r['original'],r['candidate'];fields=sorted(set(x)|set(y));diff=[k for k in fields if x.get(k)!=y.get(k) or (k in x)!=(k in y)]
  assert diff==r['diff'];bindings=[]
  for j,side in enumerate(['original','candidate']):
   t=tx['transactions'][2*i+j];raw=base64.b64decode(t['transaction_base64']);assert sha(raw)==t['transaction_sha256'];assert t['amm_program_sha256']==hashes[side]
   bindings.append({'sequence':t['sequence'],'transaction_sha256':sha(raw),'amm_program_sha256':t['amm_program_sha256'],'recorded_signature_verification':t['all_signatures_verified'],'signature_reverified_here':False,'loaded_programs':t['loaded_programs']})
  row={'index':i,'instruction':r['instruction'],'case':r['case'],'fields':{k:{'equal':k not in diff}for k in fields},'diff':diff,'receipt_pointer':f'/cases/{i}','transaction_bindings':bindings,'identical_transaction_bytes':bindings[0]['transaction_sha256']==bindings[1]['transaction_sha256'],'original_destination_poststate':x['states'].get(dest),'candidate_destination_poststate':y['states'].get(dest),'original_inner_instruction_count':sum(len(z) for z in x['inner']),'candidate_inner_instruction_count':sum(len(z) for z in y['inner'])}
  if r['case'].startswith('rent-edge='):row['declared_setup']=dict(zip(['destination_lamports','vault_token_amount','authority_lamports'],ast.literal_eval(r['case'].split('=',1)[1])))
  if r['case'].startswith('destination-data-rent='):row['declared_setup']=dict(zip(['destination_data_len','vault_token_amount'],ast.literal_eval(r['case'].split('=',1)[1])));row['declared_setup'].update(destination_lamports=0,destination_owner='AMM program')
  result.append(row)
 assert len(result)==267 and not report['mismatches']
 rows={side:{r['start']:r for r in D[side]}for side in hashes}
 roots={'original':[0x26da8,0x28dd0,0xec230,0xec4c0],'candidate':[r['start']for r in D['candidate']if any('transfer_creator' in n for n in r['names'])]}
 closures={}
 for side,e in [('original',orig),('candidate',cand)]:
  todo=list(roots[side]);seen=set();missing=[]
  while todo:
   a=todo.pop()
   if a in seen:continue
   seen.add(a);r=rows[side].get(a)
   if r is None:missing.append(a);continue
   todo.extend(x['target']for x in r['direct_calls'])
  output=[]
  for a in sorted(seen):
   if a not in rows[side]:continue
   r=rows[side][a];assert sha(e.b[a:r['end']])==r['raw_sha256'];ins=[];at=a
   while at<r['end']:
    op,reg,off,imm=struct.unpack_from('<BBhi',e.b,at);n=16 if op==0x18 else 8
    item={'address':at,'offset':at-a,'bytes':e.b[at:at+n].hex(),'opcode':op,'dst':reg&15,'src':reg>>4,'offset_operand':off,'signed_imm':imm}
    if at in e.relocations:item['relocation']=e.relocations[at]
    if at in e.calls:
     target=e.calls[at];assert target==at+8+imm*8;item['actual_direct_target']=target
    if op==0x18:item['wide_immediate']=struct.unpack_from('<I',e.b,at+4)[0]|struct.unpack_from('<I',e.b,at+12)[0]<<32
    ins.append(item);at+=n
   output.append({'ledger_row':r,'instructions':ins})
  closures[side]={'roots':roots[side],'missing_targets':missing,'windows':output,'boundary_caveat':'Original windows inferred, candidate ranges symbol-derived; all branch feasibility, indirect calls and consumed data extents remain unresolved unless separately evidenced.'}
 # Actual calls to known CPI/helpers: preserve ALL original matching options.
 helpers=[]
 for side in ['original','candidate']:
  for a in roots[side]:
   r=rows[side][a]
   for c in r['direct_calls']:
    target=rows[side].get(c['target']);helpers.append({'side':side,'root':a,'call':c,'target_window':target,'normalization_is_not_data_equality':True})
 runtime=read(B+'scratch/runtime-01/summary.json');assert runtime['case_count']==17462 and runtime['mismatches']==[]
 return {'receipt-ledger.json':result,'focused-entire-call-closure.json':closures,'direct-target-ledger.json':helpers,'summary.json':{'whole_original_equal':orig.b==cand.b,'hashes':hashes,'sizes':{'original':len(orig.b),'candidate':len(cand.b)},'saved_case_count':len(result),'saved_mismatch_count':sum(bool(x['diff']) for x in result),'rent_edge_rows':sum(x['case'].startswith('rent-edge=')for x in result),'destination_data_rows':sum(x['case'].startswith('destination-data-rent=')for x in result),'accepted_total':runtime['case_count'],'saved_copies_equal':True,'external_8_of_267_report_provided':False,'external_cause':'unresolved: no receipt, binary hash or runner supplied','closure_window_counts':{s:len(x['windows'])for s,x in closures.items()},'complete_residual_ledger':'layer01/analysis/residual-ledger.json','original_rows':len(D['original']),'candidate_rows':len(D['candidate']),'candidate_inferred_rows':len(D['candidate_inferred']),'pending_patch':'proposal/destination-rent.patch','runtime_executed':False}}
def main():
 out=Path(sys.argv[1])if len(sys.argv)>1 else P/'analysis';out.mkdir(parents=True,exist_ok=True)
 for name,data in generate().items():(out/name).write_text(json.dumps(data,sort_keys=True,indent=2)+'\n')
 print((out/'summary.json').read_text())
if __name__=='__main__':main()
