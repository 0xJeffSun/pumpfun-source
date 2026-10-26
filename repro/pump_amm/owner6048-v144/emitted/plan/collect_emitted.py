"""UNEXECUTED saved-only bounded collector. No compiler, VM or source mutation."""
from pathlib import Path
import argparse,json,hashlib,gzip,struct,importlib.util,sys,shutil,traceback
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
def tree(root,seal=None):
 assert not root.is_symlink();h=H(root/'manifest.json');assert h==(root/'manifest.sha256').read_text().split()[0]
 if seal:assert h==seal
 m=J(root/'manifest.json');m=m.get('files',m);assert set(m)=={str(p.relative_to(root))for p in root.rglob('*')if p.is_file()and p not in[root/'manifest.json',root/'manifest.sha256']}
 for p in root.rglob('*'):assert not p.is_symlink()and p.suffix!='.pyc'
 for n,v in m.items():assert H(root/n)==(v if isinstance(v,str)else v['sha256'])
def plan(seal):
 tree(P,seal);assert H(P/'reviewed-build-manifest.json')=='e3c3a9d36f0626091c428a943265d3e56f988722d77605e999c7b143e1cd7890';tree(P/'source-proof','32825564c9164b980185c4b85d62fc4f4d66ec5ca296a5076621c1301dcde141');assert len(J(P/'proposed-source30.json'))==30;return {'status':'PASS_UNEXECUTED_REVIEW_CONTROLS','new_candidate_inspected':False,'new_original_callee_bodies':0,'compiler_VM_runs':0}
def safe(root,rel):
 assert not Path(rel).is_absolute()and'..'not in Path(rel).parts;p=root/rel
 for f in[p,*p.parents]:
  if f==root.parent:break
  assert not f.is_symlink(),f
 return p

def actual_gates(B,runner,stdout,stderr):
 observed=J(runner);assert observed['returncode']==0 and observed['actual_terminal_completion_observed']is True;assert H(stdout)==observed['stdout_sha256']and H(stderr)==observed['stderr_sha256']
 assert J(B/'controller-launch.json')['plan_sha256']=='e3c3a9d36f0626091c428a943265d3e56f988722d77605e999c7b143e1cd7890';exit=J(B/'controller-exit.json');assert exit['returncode']==exit['build_helper_returncode']==0 and exit['runtime_executions']==0
 source=J(P/'proposed-source30.json');assert all(H(safe(B/'source',n))==h for n,h in source.items());report=J(B/'build-01/build-comparison.json');attempt=J(B/'build-01/build-attempt.json');assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source and attempt['returncode']==0 and attempt['source_unchanged'];assert report['selected_toolchain']=='v1.44';assert H(B/'build-01/build.log')==report['build_log_sha256']==attempt['build_log_sha256']
 launch=J(B/'build-launch.json');cmd=launch['command'];assert cmd[cmd.index('--tools-version')+1]=='v1.44'and cmd[cmd.index('--extra-input')+1]==str(B/'source/programs/pump-amm/vendor/solana-pubkey')and launch['build_attempts']==1 and launch['source30']==source
 gates=J(B/'independent-after-gates.json');assert len(gates)==8 and all(v['returncode']==0 for v in gates.values());assert gates['source30']['observed']==source;assert gates['tools']['observed']==J(P/'tools.json')['tools'];assert gates['SDK53']['observed']==J(P/'tools.json')['sdk_source'];assert J(B/'full-tool-caches-after.json')==J(P/'full-tool-cache-snapshots.json')
 frozen=J(P/'reviewed-build-manifest.json');assert gates['private_registry']['observed']=={n.removeprefix('registry/'):h for n,h in frozen.items()if n.startswith('registry/')};assert gates['helpers']['observed']=={n.removeprefix('source/scripts/'):h for n,h in frozen.items()if n.startswith('source/scripts/')}
 assert J(B/'dependency-integrity-before.json')==J(B/'dependency-integrity-after.json')==J(P/'accepted-dependency-integrity.json');assert gates['dependencies']['observed']==J(B/'dependency-integrity-after.json')
 fp=J(B/'actual-root-fingerprint.json');base=J(P/'accepted-root-fingerprint.json')
 for n in ['rustflags','features','profile','compile_kind','rustc']:assert fp[n]==base[n],n
 check=load(P/'backend_gate.py','backend').check([B/'build.stdout',B/'build.stderr',B/'build-01/build.log']);saved=J(B/'backend-diagnostics.json');assert check==saved and check['diagnostic_gate_passed']and check['backend_error_count']==0
 # Candidate bytes are only read after all actual terminal/backend/source gates above.
 assert H(B/'candidate.so')==report['comparison']['candidate_sha256'];assert H(B/'source/evidence/original/pump_amm/deployed.so')=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
 return {'root_runner':observed,'controller_exit':exit,'source30':source,'candidate_sha256':H(B/'candidate.so'),'symbols_sha256':H(B/'unstripped.so'),'backend':saved,'runtime_executions':0}

def normalized_name(n):return n.rsplit('17h',1)[0]if'17h'in n else n
def role_rows(ledger):
 rows=ledger['candidate'];tokens=['CollectCoinCreatorFee','ClaimTokenIncentives','SyncUserVolumeAccumulator','InitUserVolumeAccumulator','CloseUserVolumeAccumulator','collect_coin_creator_fee','claim_token_incentives','sync_user_volume_accumulator','init_user_volume_accumulator','close_user_volume_accumulator'];return[f for f in rows if any(t in' '.join(f['names'])for t in tokens)]
def instructions(elf,start,end):
 out=[];pc=start
 while pc<end:
  op,regs,off,imm=struct.unpack('<BBhi',elf.at(pc,8));n=16 if op==24 else 8;row={'pc':pc,'opcode':op,'dst':regs&15,'src':regs>>4,'offset':off,'immediate':imm,'bytes':n,'raw_hex':elf.at(pc,n).hex()}
  if n==16:row['wide_immediate']=struct.unpack('<I',elf.at(pc+4,4))[0]|struct.unpack('<I',elf.at(pc+12,4))[0]<<32
  if op==0x95:edges=[]
  elif op==0x05:edges=[pc+8+off*8]
  elif op in[0x85,0x8d]:edges=[pc+n]if pc+n<end else[]
  elif op&7 in[5,6]:edges=[pc+8+off*8]+([pc+n]if pc+n<end else[])
  else:edges=[pc+n]if pc+n<end else[]
  row['local_encoded_successors']=edges;out.append(row);pc+=n
 return out

def collect(B,D,gates):
 # Read complete fresh ledgers, never transfer old candidate addresses.
 before=J(B/'inventory/before/analysis/residual-ledger.json.gz');after=J(B/'inventory/after/analysis/residual-ledger.json.gz');D.mkdir();save(D/'actual-build-gates.json',gates);(D/'root-observed').mkdir();(D/'bounded').mkdir()
 shutil.copyfile(B/'candidate.so',D/'candidate.so');shutil.copyfile(B/'unstripped.so',D/'unstripped.so')
 for side in['before','after']:shutil.copytree(B/'inventory'/side,D/'inventories'/side)
 verified=load(P/'recompute_inventories.py','saved_inventory_checker').verify(D);save(D/'independent-full-inventory-verification.json',verified)
 roles=[]
 for name in['handler','wrapper']:
  found=[f for f in after['candidate']if any('24collect_coin_creator_fee17h'in n and (('__private'in n)==(name=='wrapper'))for n in f['names'])];assert len(found)==1,(name,[(f['start'],f['names'])for f in found]);roles.append((name,found[0]))
 mapping=[]
 for f in role_rows(after):
  names={normalized_name(n)for n in f['names']};old=[r for r in before['candidate']if names&{normalized_name(n)for n in r['names']}];mapping.append({'after':f,'before_options':old,'normalized_body_equal_to_before_option':any(r['normalized_sha256']==f['normalized_sha256']for r in old),'referenced_data_equality_or_recursive_equivalence_claimed':False})
 save(D/'context-role-metadata.json',mapping)
 method=P/'source-proof/reviewed-scope/method';a=load(method/'analyze.py','generic_elf');dis=load(method/'disasm.py','bounded_disasm');current=a.Elf((B/'unstripped.so').read_bytes());original=a.Elf((P/'source-proof/reviewed-scope/inputs/original.so').read_bytes());baseline=a.Elf((P/'baseline-inputs/unstripped.so').read_bytes());cm={f['start']:f for f in after['candidate']};bm={f['start']:f for f in before['candidate']};target_tables=[]
 for name,f in roles:
  ins=instructions(current,f['start'],f['end']);(D/'bounded'/f'{name}-candidate.asm').write_text(dis.render(current,f['start'],f['end']));save(D/'bounded'/f'{name}-candidate-instructions.json',ins);save(D/'bounded'/f'{name}-candidate-row.json',f)
  calls=[]
  for c in f['direct_calls']:
   target=cm.get(c['target']);matches=[]
   if target:
    names={normalized_name(n)for n in target['names']};matches=[{'start':t['start'],'end':t['end'],'names':t['names'],'normalized_equal':t['normalized_sha256']==target['normalized_sha256']}for t in before['candidate']if names&{normalized_name(n)for n in t['names']}]
   calls.append({'call':c,'actual_target_row':target,'before_role_options':matches,'new_target_body_decoded':False})
  target_tables.append({'role':name,'calls':calls,'immediate6048_instructions':[x for x in ins if x.get('immediate')==6048],'with_pubkeys_calls':[r for r in calls if r['actual_target_row']and'Error12with_pubkeys'in' '.join(r['actual_target_row']['names'])],'semantic_acceptance_pending':True})
  old=next((r for r in before['candidate']if any(normalized_name(n)in{normalized_name(t)for t in f['names']}for n in r['names'])),None)
  if old:(D/'bounded'/f'{name}-baseline.asm').write_text(dis.render(baseline,old['start'],old['end']))
 save(D/'actual-call-role-tables.json',target_tables)
 for start,end in[[142984,147008],[960744,961392]]:(D/'bounded'/f'original-{start}.asm').write_text(dis.render(original,start,end))
 # No speculative data-head reads. Discover only already-known literal byte ranges,
 # then link actual body LDDW operands. Consumption remains to be proved by review.
 literals={r['hex']:r for r in J(P/'source-proof/consumed-data.json')if r['side']=='candidate'};references=[]
 for hexdata,old in literals.items():
  needle=bytes.fromhex(hexdata)
  for section in current.sections:
   if not(section['flags']&2)or section['flags']&4 or section['type']==8:continue
   data=current.section_bytes(section);at=0
   while True:
    at=data.find(needle,at)
    if at<0:break
    address=section['address']+at
    for role,f in roles:
     for ins in instructions(current,f['start'],f['end']):
      if ins.get('wide_immediate')==address:references.append({'role':role,'pc':ins['pc'],'address':address,'bytes':len(needle),'hex':hexdata,'matched_known_before_extent':old,'consuming_operand_proof_pending':True})
    at+=1
 save(D/'known-literal-reference-candidates.json',references);save(D/'collection-result.json',{'status':'COLLECTED_FOR_BOUNDED_EMITTED_REVIEW','candidate_sha256':gates['candidate_sha256'],'symbols_sha256':gates['symbols_sha256'],'new_original_body_windows_only':[[142984,147008],[960744,961392]],'new_original_callee_bodies':0,'candidate_collect_handler_and_wrapper_only':[(n,f['start'],f['end'])for n,f in roles],'semantic_acceptance_pending':True,'VM_compiler_runs':0})

def main():
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--collect',action='store_true');a.add_argument('--build-root',type=Path);a.add_argument('--runner-exit',type=Path);a.add_argument('--runner-stdout',type=Path);a.add_argument('--runner-stderr',type=Path);a.add_argument('--output',type=Path);x=a.parse_args();status=plan(x.reviewed_plan_sha256)
 if not x.collect:print(json.dumps(status,indent=2));return
 assert all([x.build_root,x.runner_exit,x.runner_stdout,x.runner_stderr,x.output]);B=x.build_root.absolute();D=x.output.absolute()
 for p in[D,*D.parents]:assert not p.is_symlink()
 D.relative_to(P.parent);assert '..'not in D.parts;assert not D.exists()and D!=P and P not in D.parents and B not in D.parents;gates=actual_gates(B,x.runner_exit,x.runner_stdout,x.runner_stderr)
 try:
  collect(B,D,gates)
  for p in[x.runner_exit,x.runner_stdout,x.runner_stderr]:shutil.copyfile(p,D/'root-observed'/p.name)
  save(D/'collector-exit.json',{'returncode':0,'new_target_executions':0,'semantic_acceptance_pending':True})
 except BaseException:
  if D.exists():(D/'collector-failure.txt').write_text(traceback.format_exc());save(D/'collector-exit.json',{'returncode':1,'new_target_executions':0,'semantic_acceptance_pending':True})
  raise
 print('COLLECTED_REQUIRES_BOUNDED_REVIEW_NOT_ACCEPTANCE')
if __name__=='__main__':main()
