"""Portable saved-byte caller proof. No compiler, VM, network or active writes."""
from pathlib import Path
import argparse,json,gzip,hashlib,struct,importlib.util,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def tree(root,seal=None):
 assert not root.is_symlink();h=H(root/'manifest.json');assert h==(root/'manifest.sha256').read_text().split()[0]
 if seal:assert h==seal
 m=J(root/'manifest.json');assert set(m)=={str(p.relative_to(root))for p in root.rglob('*')if p.is_file()and p not in[root/'manifest.json',root/'manifest.sha256']}
 for p in root.rglob('*'):assert not p.is_symlink()and p.suffix!='.pyc'
 for n,v in m.items():assert H(root/n)==(v if isinstance(v,str)else v['sha256']),n
def verify():
 tree(P);Q=P/'plan';C=P/'collection';B=P/'build-records'
 tree(Q,'ed27d3f8b6a9646fd048c1c042446fd3fa6f5cdd41307d6b16cff3f99a898b30')
 sourceproof=load(Q/'source-proof/verify.py','owner_source_proof');sourceproof.verify()
 source=J(Q/'proposed-source30.json');assert len(source)==30
 for n,h in source.items():assert H(B/'source'/n)==h
 runner=J(C/'root-observed/amm26-owner-error-build-runner-exit.json')
 assert runner['returncode']==0 and runner['actual_terminal_completion_observed']is True
 for stream in ['stdout','stderr']:assert H(C/'root-observed'/('amm26-owner-error-build.'+stream))==runner[stream+'_sha256']
 launch=J(B/'controller-launch.json');assert launch['plan_sha256']=='e3c3a9d36f0626091c428a943265d3e56f988722d77605e999c7b143e1cd7890'and launch['attempt_limit']==1 and launch['runtime_authorized']is False
 exit=J(B/'controller-exit.json');assert exit['returncode']==exit['build_helper_returncode']==0 and exit['runtime_executions']==0
 attempt=J(B/'build-01/build-attempt.json');report=J(B/'build-01/build-comparison.json');assert attempt['source_sha256']==attempt['source_after_sha256']==report['source_sha256']==source and attempt['source_unchanged']and attempt['returncode']==0
 assert report['selected_toolchain']==attempt['selected_toolchain']=='v1.44'and H(B/'build-01/build.log')==report['build_log_sha256']==attempt['build_log_sha256']
 command=J(B/'build-launch.json');assert command['build_attempts']==1 and command['source30']==source and command['command'][command['command'].index('--tools-version')+1]=='v1.44'
 gates=J(B/'independent-after-gates.json');assert len(gates)==8 and all(v['returncode']==0 for v in gates.values());assert gates['source30']['observed']==source
 assert gates['tools']['observed']==J(Q/'tools.json')['tools']and gates['SDK53']['observed']==J(Q/'tools.json')['sdk_source']and J(B/'full-tool-caches-after.json')==J(Q/'full-tool-cache-snapshots.json')
 frozen=J(Q/'reviewed-build-manifest.json');assert gates['private_registry']['observed']=={n.removeprefix('registry/'):h for n,h in frozen.items()if n.startswith('registry/')};assert gates['helpers']['observed']=={n.removeprefix('source/scripts/'):h for n,h in frozen.items()if n.startswith('source/scripts/')}
 assert J(B/'dependency-integrity-before.json')==J(B/'dependency-integrity-after.json')==J(Q/'accepted-dependency-integrity.json')==gates['dependencies']['observed']
 fp=J(B/'actual-root-fingerprint.json');base=J(Q/'accepted-root-fingerprint.json')
 for n in ['rustflags','features','profile','compile_kind','rustc']:assert fp[n]==base[n]
 backend=load(Q/'backend_gate.py','backend');actual=backend.check([B/'build.stdout',B/'build.stderr',B/'build-01/build.log']);saved=J(B/'backend-diagnostics.json')
 # Absolute input labels remain historical provenance; bytes and all other fields are rechecked.
 assert len(actual['logs'])==len(saved['logs'])==3
 for x,y in zip(actual['logs'],saved['logs']):assert {k:v for k,v in x.items()if k!='input'}=={k:v for k,v in y.items()if k!='input'}
 assert {k:v for k,v in actual.items()if k!='logs'}=={k:v for k,v in saved.items()if k!='logs'}and actual['diagnostic_gate_passed']and actual['backend_error_count']==0
 assert H(C/'candidate.so')==report['comparison']['candidate_sha256']=='09bee0dfd751dc6ae0240bbac262933c6bda6e0c94aa643f82c57f2956c3a117'
 assert H(C/'unstripped.so')=='f6e504317ba774325c0ba682e2529c7f18d1ae645a0d7aa239de557729dd0cb4'
 elf=load(Q/'source-proof/reviewed-scope/method/analyze.py','bounded_elf');dis=load(Q/'source-proof/reviewed-scope/method/disasm.py','bounded_disasm');collector=load(Q/'collect_emitted.py','collector')
 a=elf.Elf((Q/'baseline-inputs/unstripped.so').read_bytes());b=elf.Elf((C/'unstripped.so').read_bytes())
 before=J(C/'inventories/before/analysis/residual-ledger.json.gz');after=J(C/'inventories/after/analysis/residual-ledger.json.gz');am={x['start']:x for x in before['candidate']};bm={x['start']:x for x in after['candidate']}
 for role,start,end in [('handler',781856,787992),('wrapper',638912,639976)]:
  row=bm[start];assert row['end']==end and row==J(C/'bounded'/f'{role}-candidate-row.json')
  assert dis.render(b,start,end)==(C/'bounded'/f'{role}-candidate.asm').read_text()
  assert collector.instructions(b,start,end)==J(C/'bounded'/f'{role}-candidate-instructions.json')
  assert dis.render(a,start,am[start]['end'])==(C/'bounded'/f'{role}-baseline.asm').read_text()
 def ins(e,pc):return struct.unpack('<BBhi',e.at(pc,8))
 def ck(pc,x):assert ins(b,pc)==tuple(x),(pc,ins(b,pc),x)
 def call(pc,target):
  op,regs,off,imm=ins(b,pc);assert op==133 and regs==16 and pc+8+imm*8==target
 def branch(pc,op,target,imm=0):
  v=ins(b,pc);assert v[0]==op and v[3]==imm and pc+8+v[2]*8==target
 # Exact member/key alias, owner32 gate and success/error branch polarity.
 for pc,x in [(781856,[191,39,0,0]),(781872,[121,120,8,0]),(781880,[121,134,16,0]),(781888,[121,97,24,0]),(781912,[183,3,0,32]),(781928,[103,0,0,32]),(781936,[119,0,0,32])]:ck(pc,x)
 call(781920,1094168);branch(781944,85,782224);ck(782232,[121,17,104,0]);branch(782248,85,782304)
 # Equal-owner complete name -> formatting -> complete record -> owned conversion.
 call(781984,859984);call(782128,882424);branch(782136,21,785224);call(782216,1069408)
 for pc,x in [(781952,[191,161,0,0]),(781960,[7,1,0,-552]),(782096,[191,162,0,0]),(782104,[7,2,0,-224]),(785344,[98,10,-352,6048]),(785352,[114,10,-424,2]),(785360,[98,10,-480,20]),(785368,[122,10,-488,14]),(785376,[122,10,-504,0]),(785392,[7,1,0,-656]),(785408,[7,2,0,-504]),(785424,[121,161,-648,0]),(785432,[121,162,-656,0])]:ck(pc,x)
 call(785416,1002024);branch(785440,5,787944)
 # The ENTIRE pre-conversion record construction (not only tag6048/None) agrees
 # with the accepted pre-decoration record: same two owned String triples,
 # Source field stores, compared field and source-record pointer ABI.
 for old in collector.instructions(a,785176,785376):
  pc=old['pc'];newpc=pc+48;u=ins(a,pc);v=ins(b,newpc)
  if u[0]==24:
   assert pc==785272 and collector.instructions(b,newpc,newpc+16)[0]['wide_immediate']==1108100 and a.at(1108362,14)==b.at(1108100,14)
  elif u[0]==133:
   assert pc==785368 and u[:3]==v[:3]and am[pc+8+u[3]*8]['normalized_sha256']==bm[newpc+8+v[3]*8]['normalized_sha256']
  else:assert a.at(pc,8)==b.at(newpc,8),(pc,newpc)
 # Name and Display receive the SAME observed four-byte enum object. No assumed
 # Rust enum layout or manually fabricated error code is used as compiler input.
 assert b.at(1105804,4)==a.at(1106036,4)==bytes.fromhex('30000000')
 for pc,x in [(787944,[121,163,-664,0]),(787952,[123,19,8,0]),(787960,[123,35,0,0]),(787968,[149,0,0,0])]:ck(pc,x)
 # No call/store/owner reload after conversion: exactly this complete return sequence.
 assert [r['pc']for r in collector.instructions(b,785424,785448)]==[785424,785432,785440]
 # Exact data consumption is tied to the actual caller operands and lengths.
 refs=[(781896,1104728,32,1104960,'owner32'),(782256,1108114,30,1108332,'no_fee_log30'),(785320,1108100,14,1108362,'source14'),(782440,1108074,13,1108306,'seed13'),(787432,1107041,17,1107273,'event_seed17'),(787240,1109197,32,1109429,'instruction_program_id32'),(638944,1109877,34,1110109,'instruction_log34')]
 consumed=[]
 for pc,address,n,old,role in refs:
  row=collector.instructions(b,pc,pc+16)[0];assert row['wide_immediate']==address and b.at(address,n)==a.at(old,n);consumed.append({'pc':pc,'address':address,'bytes':n,'role':role,'hex':b.at(address,n).hex()})
 assert b.at(1104728,32).hex()=='0c35ffa9055a8e568da8f7bc075615274cf1c92ca41f40009c516aa414c27c70'
 assert b.at(1108100,14)==b'src/collect.rs'and b.at(1108114,30)==b'No coin creator fee to collect'
 ck(782272,[183,2,0,30]);ck(782288,[183,2,0,2]);branch(782296,5,787944)
 ck(782464,[122,10,-512,1]);ck(782472,[122,10,-528,32]);ck(782480,[122,10,-544,13]);ck(787480,[122,10,-32,17]);ck(638960,[183,2,0,34])
 assert 'pub fn new_with_bytes(program_id: Pubkey, data: &[u8], accounts: Vec<AccountMeta>) -> Self' in(P/'api-source/solana-instruction-2.3.3.rs').read_text()
 # Current-vs-baseline caller correspondence. This is deliberately narrower than
 # general normalization: exact instruction/argument operands, explicit frame aliases,
 # branch target mapping, actual callee full-body hash and bounded data equality.
 spans=[(781856,781952,0),(781952,781984,272),(781984,784904,320),(785632,785680,-3376),(785680,788224,-232)]
 def mapped(pc):return next((pc+d for lo,hi,d in spans if lo<=pc<hi),None)
 stack_alias={};witness=[]
 for lo,hi,shift in spans:
  for old in collector.instructions(a,lo,hi):
   pc=old['pc'];new=collector.instructions(b,pc+shift,pc+shift+old['bytes'])[0];u=ins(a,pc);v=ins(b,pc+shift);kind='exact'
   if pc in[781944,781976]:
    assert u[0]==21 and v[0]==85 and u[1]==v[1]and u[3]==v[3]==0;kind='explicit_inverted_branch_block_order'
   elif u[0]==133:
    assert u[:3]==v[:3];ta=a.relocations.get(pc);tb=b.relocations.get(pc+shift)
    if ta or tb:assert ta and tb and ta['type']==tb['type']==10 and ta['symbol']==tb['symbol'];kind='same_external_symbol'
    else:
     x=am[pc+8+u[3]*8];y=bm[pc+shift+8+v[3]*8];assert x['names']==y['names']and x['normalized_sha256']==y['normalized_sha256'];kind='same_callee_full_normalized_body_metadata'
   elif u[0]==24:
    assert u[:3]==v[:3]
    if old['wide_immediate']!=new['wide_immediate']:
     assert any(old['wide_immediate']==prior and new['wide_immediate']==addr for _,addr,_,prior,_ in refs);kind='consumer_bounded_data_equal'
    else:assert old['raw_hex']==new['raw_hex']
   elif u[0]&7 in[5,6]and u[0]!=149:
    assert u[:2]==v[:2]and u[3]==v[3]and mapped(pc+8+u[2]*8)==pc+shift+8+v[2]*8;kind='mapped_encoded_branch'
   elif u!=v:
    assert u[0]in[121,123]and u[0]==v[0]and u[1]==v[1]and u[3]==v[3]and u[2]<=-680 and v[2]==u[2]+16
    assert(u[0]==121 and u[1]>>4==10)or(u[0]==123 and u[1]&15==10)
    stack_alias[u[2]]=v[2];kind='explicit_private_spill_slot_alias_plus16'
   else:assert old['raw_hex']==new['raw_hex']
   witness.append({'baseline_pc':pc,'candidate_pc':pc+shift,'baseline_raw_hex':old['raw_hex'],'candidate_raw_hex':new['raw_hex'],'rule':kind})
 assert len(set(stack_alias.values()))==len(stack_alias)
 # Changed private spill cells have no derived-pointer arithmetic changes: every
 # frame-relative pointer argument in these regions is instruction-identical.
 # Calls are opaque ABI boundaries; metadata equality is not recursive equivalence.
 assert witness==J(P/'instruction-correspondence.json')and consumed==J(P/'consumed-current-data.json')
 # Actual CPI argument boundary and all terminal error/success edges.
 call(784536,943224);ck(784496,[7,1,0,-608]);ck(784512,[7,2,0,-504]);ck(784520,[121,166,-704,0]);ck(784528,[191,99,0,0]);ck(784480,[113,20,48,0]);branch(784568,85,787944,2)
 call(784592,1018024);branch(784608,85,785448);call(785528,1002160);branch(785552,5,787944)
 call(785904,1017072);ck(785864,[122,10,-96,120]);ck(785896,[183,2,0,1]);ck(786632,[183,4,0,128]);ck(786896,[21,1,1,120]);call(787264,1044224);ck(787256,[183,4,0,128]);call(787576,1017128);call(787792,1002160)
 for pc,x in [(787640,[123,24,0,0]),(787704,[123,25,0,0]),(787848,[123,84,0,0]),(787904,[123,67,0,0])]:ck(pc,x)
 # Complete wrapper call/exit/drop context; parser-error is separate.
 call(639072,575584);branch(639104,21,639944,2);call(639344,781856);branch(639360,21,639376,2);branch(639368,5,639680);call(639416,582288)
 ck(639680,[121,169,-320,0]);ck(639952,[123,145,8,0]);ck(639960,[123,129,0,0])
 assert not[c for c in bm[781856]['direct_calls']if'with_pubkeys'in' '.join(bm[c['target']]['names'])]
 roles=collector.role_rows(after);stored=J(C/'context-role-metadata.json');assert len(roles)==len(stored)==20
 context_deltas=[]
 for f,r in zip(roles,stored):
  assert f==r['after'];options=[q for q in before['candidate']if{collector.normalized_name(n)for n in f['names']}&{collector.normalized_name(n)for n in q['names']}];assert options==r['before_options']
  if f['start']!=781856:
   assert len(options)==1 and options[0]['normalized_sha256']==f['normalized_sha256'];prior=options[0];refs=[]
   assert len(prior['wide_immediates'])==len(f['wide_immediates'])
   for u,v in zip(prior['wide_immediates'],f['wide_immediates']):
    assert u['offset']==v['offset']
    if u['value']!=v['value']:
     assert v['value']-u['value']==-232
     refs.append({'offset':u['offset'],'baseline':u['value'],'candidate':v['value'],'delta':v['value']-u['value'],'baseline_metadata':u,'candidate_metadata':v,'consumption_or_referenced_data_equality_claimed':False})
   context_deltas.append({'baseline_start':prior['start'],'candidate_start':f['start'],'names':f['names'],'body_shift':f['start']-prior['start'],'normalized_equal':True,'changed_pointer_operands':refs})
 assert context_deltas==J(P/'context-data-deltas.json')
 # Regenerate ALL saved inventories with byte-exact existing method; no new
 # original semantic decoding. Temporary output is removed by its own verifier.
 inv=load(Q/'recompute_inventories.py','inventory_check').verify(C);assert inv==J(C/'independent-full-inventory-verification.json')
 return {'status':'PASS_BOUNDED_EMITTED_OWNER6048_PROOF','candidate_sha256':H(C/'candidate.so'),'symbols_sha256':H(C/'unstripped.so'),'source30':30,'exact_instruction_correspondences':len(witness),'explicit_spill_aliases':len(stack_alias),'unchanged_context_role_rows':19,'compared_values':'None','source_origin':'src/collect.rs:20','whole_byte_equal':False,'unmatched_original_windows':297,'new_original_callee_decodes':0,'compiler_VM_runs':0,'runtime_authorized':False,'dynamic_owner6048_compared_assertions':0,'model_usage_block_observed':False,'historical_gate_records_rechecked':True,'current_host_tool_or_registry_state_claimed':False}
if __name__=='__main__':
 argparse.ArgumentParser().parse_args();print(json.dumps(verify(),indent=2))
