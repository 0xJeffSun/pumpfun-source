from pathlib import Path
import json,hashlib,struct,shutil
R=Path.cwd(); P=R/'work/fees2387-base58-dependency-admitted'; Q=R/'work/fees2387-base58-dependency-plan'
J=lambda p,d:p.write_text(json.dumps(d,indent=2)+'\n')
(P/'admitted-plan').mkdir()
for f in Q.iterdir():
 if f.is_file():shutil.copyfile(f,P/'admitted-plan'/f.name)
D=json.loads((Q/'selected-existing-metadata.json').read_text())
for side,start,end in [('original',754592,754632),('candidate',739632,739672)]:
 shutil.copyfile(R/'work/fees2387-with-values-admitted'/f'{side}-{start}-{end}.bin',P/f'{side}-wrapper.already-admitted.bin')
 shutil.copyfile(Q/f'{side}-wrapper.already-admitted.asm',P/f'{side}-wrapper.already-admitted.asm')
branches={192:'Enter the first input-byte iteration.',208:'Continue input iterations until index reaches40 (32 bytes at stack[-56,-24)).',264:'Enter the leading-zero scan after all32 input bytes.',272:'Permit digit lengths below45; other route goes to slice failure.',280:'Transfer overlength route to slice failure preparation.',320:'Skip existing-digit arithmetic when digit length is zero.',440:'Leave existing-digit loop after its last digit.',448:'Repeat existing-digit carry propagation.',456:'If carry becomes zero, advance input byte.',472:'If a new digit would be appended at index44, enter unwrap-failure preparation.',568:'If prior carry was below58, appended digit exhausted it; advance input byte.',576:'Continue appending carry digits.',584:'Reject zero-extension write index above43 via bounds failure.',624:'All32 input bytes were leading zero; combine digit and zero counts.',672:'Select zero-prefix path when current input byte equals zero.',680:'A nonzero input byte ends the leading-zero scan.',704:'Combined digit/zero index44 enters unwrap-failure preparation.',712:'Continue extending zero digits.',800:'Only length below45 takes normal map setup; other route enters slice failure.',856:'Zero length skips table mapping/reversal and prepares zero-length conversion.',864:'Nonzero length enters table mapping.',920:'Tag-zero conversion result selects pointer/length forwarding.',928:'Nonzero conversion tag enters unwrap-failure preparation.',1032:'Digit values above57 enter bounds failure before table load.',1088:'All digits mapped; proceed to reversal setup.',1096:'Map the next digit.',1112:'Length1 skips reversal.',1232:'Reverse loop completes after floor(length/2) swaps.',1240:'Continue reverse loop.',1256:'Final length below45 proceeds to conversion; otherwise slice failure.'}
reports={}
for side,start in [('original',753072),('candidate',738112)]:
 ins=json.loads((P/f'{side}-instructions.json').read_text()); row=D[f'{side}-{start}']; byoff={x['offset']:x for x in ins}; b=[]; calls=[]
 for x in ins:
  raw=bytes.fromhex(x['raw_hex']); op=raw[0]
  if op&7==5 and op not in [0x85,0x95]:
   off=struct.unpack_from('<h',raw,2)[0]; target=x['pc']+8+8*off
   b.append({'pc':x['pc'],'offset':x['offset'],'raw_hex':x['raw_hex'],'instruction':x['text'],'target':target,'target_offset':target-start,'fallthrough':None if op==0x05 else x['pc']+8,'role':branches[x['offset']]})
  if op==0x85:
   delta=struct.unpack_from('<i',raw,4)[0]; target=x['pc']+8+8*delta
   meta=next(z for z in row['dependencies']['direct'] if z['pc']==x['pc'])
   assert target==meta['target']
   calls.append({'pc':x['pc'],'offset':x['offset'],'target':target,'metadata':meta,'fallthrough_pc':x['pc']+8,'fallthrough_at_window_end':x['pc']+8==row['end'],'callee_body_newly_decoded':False,'noreturn_proven_by_this_window':False})
 assert len(b)==30 and len(calls)==10
 reports[side]={'start':start,'end':start+1520,'instructions':len(ins),'instruction_slots':190,'branches':b,'direct_calls':calls,'exits':[x['pc'] for x in ins if bytes.fromhex(x['raw_hex'])[0]==0x95],'relocated_loads':row['dependencies']['relocated_targets']}
J(P/'complete-control-flow.json',reports)
O=json.loads((P/'original-instructions.json').read_text()); C=json.loads((P/'candidate-instructions.json').read_text()); diff=[]
for a,b in zip(O,C):
 assert a['offset']==b['offset']; x=bytes.fromhex(a['raw_hex']); y=bytes.fromhex(b['raw_hex']); assert len(x)==len(y)
 if x!=y:
  offsets=[i for i,(l,r) in enumerate(zip(x,y)) if l!=r]
  if x[0]==0x85:kind='direct_call_target_immediate'; allowed=range(4,8)
  else:assert x[0]==0x18 and len(x)==16;kind='relocated_lddw_immediate';allowed=list(range(4,8))+list(range(12,16))
  assert set(offsets)<=set(allowed)
  diff.append({'offset':a['offset'],'kind':kind,'original_raw_hex':x.hex(),'candidate_raw_hex':y.hex(),'differing_byte_offsets':offsets})
assert len(diff)==23
J(P/'complete-byte-difference-witness.json',{'scope':'Exact saved-body instruction comparison, not a new match or transitive equivalence claim','raw_equal':False,'different_instructions':23,'direct_call_immediates':10,'relocated_lddw_immediates':13,'all_other_instruction_bytes_identical':True,'rows':diff})
J(P/'data-consumers.json',{'data_bytes_read_or_extracted':False,'literal_values_opaque':True,'table_consumer':{'original_base_literal':815847,'candidate_base_literal':804569,'index_guard':{'original_pc':754104,'candidate_pc':739144,'max_inclusive':57},'load':{'original_pc':754136,'candidate_pc':739176,'width':1,'constant_offset':128},'minimal_possible_load_slice':{'original_start':815975,'original_end':816033,'candidate_start':804697,'candidate_end':804755,'bytes':58},'actual_alphabet_or_cross_image_data_equality_proved':False,'status':'consumer-proved potential58-byte slice only; requires separate root admission before reading'},'explicit_unwrap_pointer_length':{'original_pointer':816103,'candidate_pointer':804825,'length':43,'bytes_read':False},'other_relocation_extents':'opaque; no descriptor/vtable/string extent inferred'})
J(P/'outer-runner-exit.json',{'returncode':0,'basis':'Actual exec_command result for bounded collect.py invocation; both objdump child returns separately retained in capture.json','compiler_runtime_probe_fixture':False})
J(P/'inventory-summary.unchanged.json',json.loads((R/'repro/layered-passes/pass-23/fees-current-evidence/analysis/full-function-inventory.json').read_text())['summary'])
print('Prepared complete30-branch/10-call witness,23 instruction-difference rows and opaque data consumer limits; no new disassembly or data read.')
