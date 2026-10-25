#!/usr/bin/env python3
"""Deterministic static analysis of frozen bytes/receipts; never imports a harness."""
from pathlib import Path
import json,gzip,hashlib,tarfile,sys,difflib,struct,re
W=Path(__file__).resolve().parent
sys.path.insert(0,str(W/'layer01'))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
def dump(x):return json.dumps(x,sort_keys=True,separators=(',',':'))+'\n'
def read(p):return json.loads((W/p).read_text())
def generate():
 L=W/'layer01'; B=W/'inputs/repro/pump_fees/donation-business-v144'
 cat=read('layer01/catalog.json'); ins=read('layer01/instructions.json')
 idx={s:{r['start']:r for r in cat[s+'_rows']} for s in ['original','candidate']}
 ii={s:{r['start']:r for r in ins[s]} for s in idx}
 elf={'original':Elf(L/'inputs/original.so'),'candidate':Elf(L/'inputs/current/pump_fees_candidate.so')}
 src=(W/'inputs/programs/pump-fees/src/sharing_update.rs').read_bytes()
 src_hashes=json.loads((B/'source-sha256.json').read_text())
 assert sha(src)==src_hashes['programs/pump-fees/src/sharing_update.rs']
 archive={}
 for filename in ['source-snapshot.tar.gz','harness-snapshot.tar.gz']:
  with tarfile.open(B/filename) as t:
   archive[filename]={m.name:t.extractfile(m).read() for m in t.getmembers() if m.isfile()}
 assert archive['source-snapshot.tar.gz']['programs/pump-fees/src/sharing_update.rs']==src
 harness=archive['harness-snapshot.tar.gz']['scripts/fees_sharing_update_differential.py']
 assert harness==(W/'inputs/scripts/fees_sharing_update_differential.py').read_bytes()
 assert harness==(W/'frozen-harness/fees_sharing_update_differential.py').read_bytes()
 hs=json.loads((B/'harness-source-sha256.json').read_text()); assert hs['scripts/fees_sharing_update_differential.py']==sha(harness)
 corpus=json.loads(gzip.decompress((B/'differential.json.gz').read_bytes()))
 suite=corpus['suites']['sharing_update']; focused=json.loads(gzip.decompress((B/'focused20.json.gz').read_bytes()))
 assert suite['candidate_sha256']==sha(elf['candidate'].b) and suite['original_sha256']==sha(elf['original'].b)
 assert corpus['candidate_sha256']==suite['candidate_sha256']==focused['candidate_sha256']
 checks=[];edges=[]
 fields=['error','before','after','events','inner','return']
 for n,r in enumerate(suite['cases']):
  eq={k:r['original'][k]==r['candidate'][k] for k in fields}; c=r['case'];m=c.get('account_mutations',{}).get('coin_creator_vault_ata')
  row=dict(index=n,name=c['name'],case_sha256=sha(dump(c).encode()),receipt_match=r['match'],recomputed_fields=eq,recomputed_match=all(eq.values()),original_error=r['original']['error'],candidate_error=r['candidate']['error'])
  checks.append(row)
  if 'edge-empty-amm-' in c['name']:
   edges.append(dict(**row,case=c,requested_ata=m,observed_before={s:r[s]['before']['coin_creator_vault_ata'] for s in ['original','candidate']},observed_curve_before={s:r[s]['before']['bonding_curve'] for s in ['original','candidate']},log_instructions={s:[l for l in r[s]['logs'] if 'Instruction:' in l] for s in ['original','candidate']}))
 assert len(checks)==417 and all(r['recomputed_match'] for r in checks)
 summary=json.loads((B/'runtime-summary.json').read_text())
 receipt=dict(comparison_fields=fields,excluded_from_comparison=['logs','compute units','transaction_base64','bootstrap_transaction_base64'],suite_cases=417,recomputed_mismatches=[],all_rows=checks,edge_rows=edges,base_comparison_receipts=summary['comparison_receipts'],focused_cases=focused['case_count'],accepted_receipts=summary['comparison_receipts']+focused['case_count'],donation_sequence_steps_separate=summary['donation_sequence_steps'],external_report={'provided':False,'claim':'4/417 empty-AMM graduated zero-lamport failures','status':'not reproduced by frozen receipts; external binary, harness, runtime and raw rows unavailable'},zero_lamport_observation='All six graduated zero-lamport edge rows have original/candidate before ATA null and error null. Requested owner is not observable in the saved input account snapshot.')
 assert receipt['accepted_receipts']==17461
 receipt['recorded_runtime_engine']=json.loads((B/'runtime-engine.json').read_text())
 binding=next(x for x in json.loads((B/'receipt-build-bindings.json').read_text()) if x['name']=='differential')
 assert binding['executed_candidate_sha256']==suite['candidate_sha256']
 assert binding['actual_source_sha256']['programs/pump-fees/src/sharing_update.rs']==sha(src)
 assert binding['report_sha256']==sha(gzip.decompress((B/'differential.json.gz').read_bytes()))
 focused_binding=json.loads((B/'focused-main-bindings.json').read_text())
 assert focused_binding['report_sha256']==sha((B/'focused20.json.gz').read_bytes())
 assert focused_binding['raw_report_sha256']==sha(gzip.decompress((B/'focused20.json.gz').read_bytes()))
 assert focused_binding['executed_source_sha256']['programs/pump-fees/src/sharing_update.rs']==sha(src)
 receipt['direct_receipt_build_and_source_bindings_verified']=True
 pair_specs=[('legacy wrapper',640672,380104),('v2 wrapper',641744,381120),('legacy context',484816,268392),('v2 context',502096,282280),('legacy body',193400,505792),('v2 body',211408,513432),('SharingConfig exit',19528,23616),('event data',500928,267224)]
 pairs=[]
 for label,o,c in pair_specs:
  a,b=idx['original'][o],idx['candidate'][c]
  pairs.append(dict(role=label,original=a,candidate=b,raw_body_equal=elf['original'].b[o:a['end']]==elf['candidate'].b[c:b['end']],normalized_body_equal=elf['original'].normalized[o:a['end']]==elf['candidate'].normalized[c:b['end']],relocation_pattern_equal=a['relocation_pattern']==b['relocation_pattern'],actual_call_target_equality='per-edge alternatives retained; no blanket equality',referenced_data_equality=None,semantic_equality=None,binding='wrapper literal and signed call operands for body/context/exit; event normalized pattern',positional_difference_count=sum(x!=y for x,y in zip(elf['original'].b[o:a['end']],elf['candidate'].b[c:b['end']]))+abs(a['bytes']-b['bytes'])))
 # Full transitive direct-call closure is inventory, not a behavioral proof.
 roots={'original':[p[1] for p in pair_specs]+[237464,240088,75880,231576,199072,204080,205768,43856,44632,582624,586976],'candidate':[p[2] for p in pair_specs]+[68696,70384,72040,75568]}
 closure={};cfg={};depmap={}
 for side in idx:
  pending=list(roots[side]);seen=set();missing=set()
  while pending:
   st=pending.pop()
   if st in seen:continue
   if st not in idx[side]:missing.add(st);continue
   seen.add(st);pending += [x['target'] for x in idx[side][st]['dependencies']['direct']]
  closure[side]={'roots':roots[side],'window_starts':sorted(seen),'unresolved_target_starts':sorted(missing),'windows':[idx[side][x] for x in sorted(seen)]}
  cfg[side]=[];depmap[side]=[]
  for st in sorted(seen):
   nodes=[]
   for i in ii[side][st]['instructions']:
    x=dict(i);pc=x['pc'];end=pc+x['size'];kind=x.get('kind')
    x['successors']=[] if kind=='exit' else [x['target']] if kind=='branch' and not x['conditional'] else [x['target'],end] if kind=='branch' else [end]
    x['feasibility']='unresolved; syntactic CFG only';nodes.append(x)
   cfg[side].append(dict(start=st,end=idx[side][st]['end'],instructions=nodes))
   for call in idx[side][st]['dependencies']['direct']:
    target=call['target'];tr=idx[side].get(target);opposite='candidate' if side=='original' else 'original'
    alternatives=[]
    if tr:
     raw=elf[side].b[target:tr['end']];norm=elf[side].normalized[target:tr['end']]
     for q in idx[opposite].values():
      if q['bytes']==tr['bytes'] and elf[opposite].normalized[q['start']:q['end']]==norm:
       alternatives.append(dict(start=q['start'],end=q['end'],raw_equal=elf[opposite].b[q['start']:q['end']]==raw,normalized_equal=True,relocation_pattern_equal=q['relocation_pattern']==tr['relocation_pattern']))
    depmap[side].append(dict(caller=st,call=call,target_alternatives=alternatives,status='ambiguous' if len(alternatives)>1 else 'bounded pattern support' if alternatives else 'unresolved',transitive_equal=None))
 # Key branch proof binds immutable source bytes, not assembler labels.
 slices=[]
 for side,start,end,meaning in [
 ('original',237464,237792,'legacy four-reserve/owner predicate and exits'),('original',239208,240088,'legacy clones, metas and call to AMM CPI builder'),('original',240088,240384,'v2 four-reserve/owner predicate and exits'),('original',241952,243184,'v2 clones, metas and call to AMM CPI builder'),('candidate',506624,506736,'legacy real-token/owner/lamports predicate'),('candidate',515392,515504,'v2 real-token/owner/lamports predicate'),('original',193400,194144,'legacy raw quote predicate before version test'),('original',75880,76384,'raw quote zero predicate with short data accepted'),('original',217472,217832,'v2 raw quote predicate and branch to payout path'),('original',231576,234096,'original remaining-account preprocessing, not equivalent to validate_remaining'),('original',43856,44632,'legacy context cleanup'),('original',44632,45408,'v2 context cleanup')]:
  selected=[i for w in ins[side] for i in w['instructions'] if start<=i['pc']<end]
  slices.append(dict(side=side,start=start,end=end,meaning=meaning,sha256=sha(elf[side].b[start:end]),instructions=selected))
 assert elf['original'].b[800416:800448]==bytes(32)==elf['candidate'].b[699400:699432]
 data=[dict(kind='system program key',original=[800416,800448],candidate=[699400,699432],raw_equal=True,sha256=sha(bytes(32)),extent_basis='memcmp argument 32 in both predicate paths')]
 for os,oe,cs,ce in [(640672,641744,380104,381120),(641744,642848,381120,382136)]:
  for side,st,en in [('original',os,oe),('candidate',cs,ce)]:
   for i in ii[side][st]['instructions']:
    if i['opcode']==24:
     at=i['immediate_u64'];blob=elf[side].b
     if at<len(blob) and blob[at:at+13]==b'Instruction: ':
      following=next((z for z in ii[side][st]['instructions'] if z['pc']==i['pc']+16),None)
      if following and following['opcode']==0xb7:
       length=following['immediate_signed'];data.append(dict(kind='wrapper log',side=side,pc=i['pc'],start=at,end=at+length,hex=blob[at:at+length].hex(),sha256=sha(blob[at:at+length]),extent_basis='adjacent length argument'))
 for pc,h in [(582808,'8b348655e4e56cf1'),(587160,'01214eb921432c5c')]:
  b=elf['original'].b;literal=b[pc+4:pc+8]+b[pc+12:pc+16];assert literal.hex()==h
  data.append(dict(kind='AMM instruction discriminator',side='original',pc=pc,hex=h,candidate_source_contains=list(bytes.fromhex(h)),extent_basis='eight-byte LDDW and eight-byte instruction payload',equality='literal only; CPI meta/runtime not proven'))
 source_text=src.decode();old='ctx.accounts.bonding_curve.real_token_reserves==0 && ctx.accounts.coin_creator_vault_ata.owner != &System::id() && ctx.accounts.coin_creator_vault_ata.lamports()!=0'
 new='ctx.accounts.bonding_curve.real_sol_reserves==0\n   && ctx.accounts.bonding_curve.virtual_sol_reserves==0\n   && ctx.accounts.bonding_curve.real_token_reserves==0\n   && ctx.accounts.bonding_curve.virtual_token_reserves==0\n   && ctx.accounts.coin_creator_vault_ata.owner != &System::id()'
 assert source_text.count(old)==2
 proposed=source_text.replace(old,new)
 patch=''.join(difflib.unified_diff(source_text.splitlines(True),proposed.splitlines(True),fromfile='a/programs/pump-fees/src/sharing_update.rs',tofile='b/programs/pump-fees/src/sharing_update.rs'))
 provenance=dict(baseline='c1ffdd0667608d4755227e68aab9f27a7e9a0d37',source_sha256=sha(src),harness_sha256=sha(harness),source_archive_member_equal=True,harness_archive_member_equal=True,source_manifest_equal=True,harness_manifest_equal=True,donation_source_unchanged=True,proposed_source_sha256=sha(proposed.encode()),proposal_status='uncompiled, unapplied to parent, unaccepted',source_lines=[dict(line=n,start=sum(len(x) for x in src.splitlines(True)[:n-1]),end=sum(len(x) for x in src.splitlines(True)[:n]),text=line.decode().rstrip()) for n,line in enumerate(src.splitlines(True),1)])
 residuals=[
 dict(id='SH-01',classification='concrete application-source gap',status='proposed only',finding='Both AMM gates test only real-token reserve; original tests all four reserves. Candidate also adds a lamport gate absent in complete original helper path.',original_windows=[237464,240088],candidate_windows=[505792,513432],proposal='pending-sharing.patch',acceptance=['root review of parser field mapping','root-owned pinned build','future authorized regression and targeted acceptance','whole ELF still unequal']),
 dict(id='SH-02',classification='concrete application-source gap',status='unresolved implementation',finding='Original legacy body calls raw quote-zero predicate before version rejection; accepted legacy body starts at version rejection. Original v2 calls predicate again after AMM helper and has split payout paths.',original_windows=[193400,75880,211408,204080,199072],candidate_windows=[505792,513432],proposal=None),
 dict(id='SH-03',classification='ambiguous/unattributed',status='not equivalent by evidence',finding='Original preprocessing helper 231576 inspects a curve flag at +72, derives addresses and may consume the last remaining account. Candidate validate_remaining is shareholder count/key only; full branch contract not closed.',original_windows=[231576],candidate_windows=[70384],proposal=None),
 dict(id='SH-04',classification='source organization/ownership',status='unresolved',finding='Contexts and wrappers differ; original separate cleanup targets and two-stage payout/state ownership differ. Normalized SharingConfig exit/event matches do not close wrappers.',original_windows=[484816,502096,640672,641744,43856,44632],proposal=None),
 dict(id='SH-05',classification='linked dependency/helper',status='unresolved',finding='CPI builders, vector allocation, cloning, framework conversion and indirect/syscall boundaries retain complete edge alternatives. No allocator failure proof.'),
 dict(id='SH-06',classification='diagnostic/data metadata',status='bounded data only',finding='System key, wrapper logs and AMM discriminators bounded; other strings, vtables, recursive pointers and source coordinates remain open.'),
 dict(id='SH-07',classification='toolchain/build provenance',status='open',finding='No historical build recipe or whole ELF equality. Source ownership and metadata cannot be repaired by fabricated lines or padding.'),
 dict(id='SH-08',classification='ambiguous/unattributed',status='external claim unverified',finding='417 frozen comparisons recompare equal; six zero-lamport edge rows have null ATA snapshots. External four raw failures and bindings not supplied.'),
 dict(id='SH-09',classification='explicitly stopped',status='excluded',finding='No Pump sell_v2/incentive, Mayhem initializer, v3 token-extension or Metaplex runtime work; donation pending borrowed-account change not integrated or edited.')]
 result=dict(status='static analysis complete; acceptance open',whole_original_equal=False,whole=read('layer01/raw-differences.json'),accepted_receipts=17461,sharing_receipts=417,recomputed_sharing_mismatches=0,proposal='pending-sharing.patch',accepted_source_changes=0,builds=0,target_executions=0,scope='Fees sharing only; donation boundary preserved',full_inventory='layer01/residual-ledger.json',all_original_windows=len(cat['original_rows']),all_candidate_windows=len(cat['candidate_rows']),limitations=['external report not available','inferred boundaries are not authenticated historical functions','all unresolved branches and indirect destinations retained','semantic equality and security conclusions open'])
 contexts=[]
 for role,o,c in [('UpdateFeeShares',484816,268392),('UpdateFeeSharesV2',502096,282280)]:
  text=source_text.split('pub struct '+role+"<'info>{",1)[1].split('\n}',1)[0]
  fields=[]
  for match in re.finditer(r'pub (\w+):([^,\n]+)',text):
   name=match.group(1);sites={}
   for side,st in [('original',o),('candidate',c)]:
    sites[side]=[i['pc'] for i in ii[side][st]['instructions'] if i['opcode']==24 and elf[side].b[i['immediate_u64']:i['immediate_u64']+len(name)]==name.encode()]
   fields.append(dict(name=name,source_type_fragment=match.group(2),literal_reference_sites=sites,acceptance_equivalence=None))
  contexts.append(dict(context=role,source=text,fields=fields,original_window=o,candidate_window=c,semantic_parser_equivalence=None))
 for row in edges:
  row['observed_curve_reserves']={}
  for side in ['original','candidate']:
   cb=bytes.fromhex(row['observed_curve_before'][side]['data'])
   row['observed_curve_reserves'][side]=dict(zip(['virtual_token','virtual_sol','real_token','real_sol'],struct.unpack_from('<QQQQ',cb,8)))
 return {'account-contexts.json':contexts,'residual-ledger.json':{'all_frozen_window_rows':read('layer01/residual-ledger.json'),'focused_residuals':residuals,'uncovered_intervals':read('layer01/coverage.json'),'all_branch_locations':'layer01/instructions.json','unresolved_branch_semantics':'preserved for every branch; no unknown promoted to equal'},'receipt-reconciliation.json':receipt,'sharing-pairs.json':pairs,'sharing-closure.json':closure,'sharing-cfg.json':cfg,'sharing-call-map.json':depmap,'predicate-evidence.json':slices,'bounded-sharing-data.json':data,'sharing-source-provenance.json':provenance,'sharing-residual-ledger.json':residuals,'result.json':result},patch,proposed
if __name__=='__main__':
 out,patch,source=generate()
 for n,x in out.items():(W/n).write_text(dump(x))
 (W/'pending-sharing.patch').write_text(patch)
 (W/'pending-sharing_update.rs').write_text(source)
 print(dump({'generated':len(out),'proposal':'uncompiled','sharing_rows':417,'whole_equal':False}),end='')
