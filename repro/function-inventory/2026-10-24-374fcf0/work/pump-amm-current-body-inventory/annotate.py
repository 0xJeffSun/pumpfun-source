#!/usr/bin/env python3
"""Bind current catalogs to reviewed source gaps and existing evidence only."""
from pathlib import Path
import hashlib,json,re,struct,subprocess
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
reports={n:json.loads((HERE/(n+'-bodies.json')).read_text())for n in ['pump','pump_amm']}
status=json.loads((ROOT/'repro/status.json').read_text())
revision=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
inputs={}
def bind(name):
 p=ROOT/name;inputs[name]={'sha256':sha(p),'bytes':p.stat().st_size};return name
source_maps={'pump':json.loads((ROOT/'repro/pump/native-curve-partial-fortyeight/source-sha256.json').read_text()),'pump_amm':json.loads((ROOT/'repro/pump_amm/pool-serialization-thirty-seven/build-comparison.json').read_text())['source_sha256']}
for program,report in reports.items():
 for tag in ['original','candidate','candidate_symbols']:bind(report[tag]['path'])
 for name,expected in source_maps[program].items():
  assert sha(ROOT/name)==expected,(name,'current source drift');bind(name)
for n in ['repro/status.json','evidence/upstream/pump.json','evidence/upstream/pump_amm.json','programs/pump/README.md','programs/pump-amm/README.md','audit/pump/HOLDER_NESTED_RECOVERY.md','audit/pump_amm/ADMIN_RECOVERY.md','work/pump-multi-hop-curve-static/REPORT.md','work/pump-multi-hop-curve-static/input-sha256.json','repro/pump/mayhem-virtual-params-static/README.md','work/pump-mayhem-virtual-params-recovery/extraction-result.json','work/pump-mayhem-virtual-params-recovery/findings.json','repro/pump_amm/create-config-static/summary.json','repro/pump_amm/create-config-serialization-static/summary.json','repro/pump_amm/create-config-static/original-evidence.json','repro/pump_amm/pool-serialization-thirty-seven/function-match.json','work/remaining-source-gaps-49e4-static/REPORT.md','work/remaining-source-gaps-49e4-static/inventory.json']:
 bind(n)

def original(program,at):return next(r for r in reports[program]['original_windows']if r['start']==at)
def candidate(program,at):return next(r for r in reports[program]['candidate_functions']if r['start']==at)
def ref(program,at):
 r=original(program,at);return {'catalog':program+'-bodies.json','json_pointer':'/original_windows/'+str(r['index']),'start':at,'start_hex':hex(at),'end':r['end'],'bytes':r['bytes'],'raw_sha256':r['raw_sha256'],'normalized_status':r['normalized_status'],'candidate_matches':r['candidate_matches']}
def insns(blob,start,size):
 return [{'address':at,'address_hex':hex(at),'offset':at-start,'bytes_hex':blob[at:at+8].hex(),'opcode':blob[at],'register_byte':blob[at+1],'offset_i16':struct.unpack_from('<h',blob,at+2)[0],'immediate_i32':struct.unpack_from('<i',blob,at+4)[0]}for at in range(start,start+size,8)]
# A named candidate exit, identical discriminator and field-write sequence identify
# the original serializer already independently preserved in prior static evidence.
p=reports['pump'];ob=(ROOT/p['original']['path']).read_bytes();cb=(ROOT/p['candidate']['path']).read_bytes()
o=original('pump',0x5a28);c=candidate('pump',0x7110)
assert o['bytes']==1840 and c['bytes']==1976
assert any(cb[d['target_address']:d['target_address']+8]==bytes.fromhex('17b7f83760d8ac60')for d in c['data_references'])
assert any(ob[d['target_address']:d['target_address']+8]==bytes.fromhex('17b7f83760d8ac60')for d in o['data_references'])
assert struct.unpack_from('<i',cb,0x7868+4)[0]==3004
bonding={'scope':'Static serializer body difference, not a new runtime result or trade-fee analysis. No source edit yet.','original':ref('pump',0x5a28),'candidate':c,'source':'programs/pump/src/trade_types.rs:2','identity_evidence':['Named candidate Account::exit_with_expected_owner function with BondingCurve discriminator','Original discriminator matches and prior hash-bound curve-serialize window at work/pump-mayhem-virtual-params-recovery/extraction-result.json','Same account-exit prologue and twenty BpfWriter write_all calls in each body; the candidate source declares nineteen serialized fields plus its discriminator'],
'original_error_tail':{'callsite':0x6100,'callee':0x19bc58,'matched_candidate_callee':candidate('pump',0x13fb18)},'candidate_error_tail':{'error_code_load':0x7868,'error_code':3004,'callsite':0x7870,'callee':0x142cc8,'callee_name':candidate('pump',0x142cc8)['names'],'indirect_drop_present':True},
'original_instructions':insns(ob,o['start'],o['bytes']),'candidate_instructions':insns(cb,c['start'],c['bytes']),
'next_step':'An isolated explicit serializer preserving discriminator/field order with ordinary I/O-error propagation; no changes to trade or token-extension handlers. Build and complete body/callee/data comparison must precede any runtime claim.'}
(HERE/'pump-bondingcurve-exit-difference.json').write_text(json.dumps(bonding,indent=2)+'\n')
# Explain three existing strict-normalization misses without relaxing the matcher.
amm=reports['pump_amm'];ab=(ROOT/amm['original']['path']).read_bytes();bb=(ROOT/amm['candidate']['path']).read_bytes();diagnostics=[]
for name,oa,ca,at in [('toggle_mayhem_mode',0x1bb00,0xc5458,480),('toggle_cashback_enabled',0x1b510,0xc5708,480),('toggle_boost',0x1b7c0,0xc59b8,528)]:
 a=original('pump_amm',oa);b=candidate('pump_amm',ca);assert a['bytes']==b['bytes']and a['relocations']==b['relocations']
 ignored={r['offset']+d for r in a['relocations']for d in [0,8]}|{r['offset']for r in a['direct_calls']}
 differences=[off for off in range(0,a['bytes'],8)if ab[oa+off:oa+off+8]!=bb[ca+off:ca+off+8]and off not in ignored]
 assert differences==[at+40,at+48]
 data={}
 for label,blob,base in [('original',ab,oa),('candidate',bb,ca)]:
  pointer=struct.unpack_from('<I',blob,base+at+4)[0]|struct.unpack_from('<I',blob,base+at+12)[0]<<32
  line=struct.unpack_from('<i',blob,base+at+40+4)[0];length=struct.unpack_from('<i',blob,base+at+48+4)[0]
  data[label]={'source_path_pointer':pointer,'source_path_length':length,'source_path':blob[pointer:pointer+length].decode(),'line':line}
 diagnostics.append({'name':name,'original':ref('pump_amm',oa),'candidate_start':ca,'candidate_start_hex':hex(ca),'bytes':a['bytes'],'strict_raw_match':False,'strict_normalized_match':False,'remaining_different_instruction_offsets':differences,'proven_filename_line_data':data,'meaning':'These two instruction differences are error source line and filename length. This does not prove all other relocated data bytes or recursive calls equal. Do not add padding, flags or forged source locations to force identity.'})
(HERE/'amm-admin-diagnostic-differences.json').write_text(json.dumps(diagnostics,indent=2)+'\n')
idlrows={}
for program in ['pump','pump_amm']:
 idl=json.loads((ROOT/f'evidence/upstream/{program}.json').read_text());full=set(status[program]['implemented_handlers']);partial=status[program].get('partially_implemented_handlers',{})
 rows=[]
 for ix in idl['instructions']:
  name=ix['name'];classification='bounded-implemented'if name in full else'partial'if name in partial else'absent'
  row={'name':name,'discriminator_hex':bytes(ix['discriminator']).hex(),'status':classification,'accounts':ix['accounts'],'args':ix['args'],'source_limit':partial.get(name)}
  if program=='pump'and name in ['admin_update_token_incentives','claim_token_incentives']:row.update(assignment='stopped-excluded',original_body_mapping='not re-investigated by this inventory')
  elif program=='pump'and name=='set_mayhem_virtual_params':row.update(assignment='static-only genuine Mayhem PDA invocation unavailable',original_bodies=[ref(program,0x137fc0),ref(program,0x1255a8),ref(program,0xcd3d8)])
  elif program=='pump_amm'and name=='create_config':row.update(assignment='static-only fixed-admin positive replay unavailable',original_bodies=[ref(program,0x16d88),ref(program,0xe0bf8),ref(program,0x80fb8)])
  elif program=='pump'and name=='multi_hop_curve_swap':row.update(assignment='partial extension-free native route only',original_bodies=[ref(program,0x567d8),ref(program,0x5b3b0),ref(program,0x1295c0)])
  elif program=='pump'and name in ['sell_v3','buy_v3','buy_exact_quote_in_v3']:row.update(assignment='partial; unintegrated extension lane excluded from follow-up')
  elif program=='pump'and name=='create_v2':row.update(assignment='partial; stopped Mayhem initializer excluded; deeper ordinary-parent mapping requires distinct approval')
  elif program=='pump'and name=='sell_v2':row.update(assignment='existing bounded implementation; known stopped quote-transfer-fee mismatch remains')
  rows.append(row)
 idlrows[program]=rows
(HERE/'instruction-inventory.json').write_text(json.dumps(idlrows,indent=2)+'\n')
priorities=[
{'priority':1,'program':'pump','gap':'BondingCurve serializer error conversion','kind':'concrete source-fidelity mismatch','original':ref('pump',0x5a28),'candidate_start':0x7110,'candidate_bytes':1976,'evidence':'pump-bondingcurve-exit-difference.json','inputs':['programs/pump/src/trade_types.rs', 'BondingCurve discriminator 17b7f83760d8ac60 and fixed field layout', 'writable account buffer and I/O error path'],'limits':'No new runtime mismatch claimed. Excludes trade-fee and extension implementations. Root has authorized a separate isolated follow-up after this inventory is sealed.'},
{'priority':2,'program':'pump','gap':'Native legacy-token multi-curve/endpoint-flag route extension','kind':'partial body reconstruction opportunity requiring scoped approval','original_bodies':[ref('pump',0x567d8),ref('pump',0x5b3b0)],'candidate_start':0x18960,'candidate_bytes':23704,'evidence':['work/pump-multi-hop-curve-static/REPORT.md','repro/pump/native-curve-partial-fortyeight/README.md'],'inputs':['13 fixed IDL accounts, including genuine captured-AMM signer PDA', '5 remaining accounts per curve hop', 'amount_in:u64 and hop_fees:Vec<u8>', 'ordinary native, legacy Tokenkeg layouts only'],'limits':'Current 56 cases establish only one curve and flag 3. More than one curve and mixed flags are not accepted behavior yet. Any future task must preserve genuine caller signing and exclude token extensions, v3/unintegrated work, Mayhem, holder and nested quote branches.'},
{'priority':3,'program':'pump','gap':'TradeEvent final u64 source meaning','kind':'semantic source-name/dataflow provenance only','original':ref('pump',0x1624b0),'candidate_start':0xea260,'candidate_bytes':5432,'evidence':['programs/pump/src/trade_types.rs','evidence/upstream/pump.json'],'inputs':['Existing ordinary legacy-trade constructor and saved event bytes only'],'limits':'Serializer already matches normalized body and direct target pairs. Captured IDL lacks the extra final field; current source calls it unparsed_trailing_field. Do not guess a historical name or infer an invariant from zero-valued bounded fixtures. No new trade/fee probes proposed.'},
{'priority':4,'program':'pump_amm','gap':'Error source filename/line provenance in three toggles','kind':'explained normalization miss, no behavior change proposed','evidence':'amm-admin-diagnostic-differences.json','original_bodies':[ref('pump_amm',0x1bb00),ref('pump_amm',0x1b510),ref('pump_amm',0x1b7c0)],'limits':'Original path lengths/lines differ from src/lib.rs source. Preserve strict mismatch; do not force identity with padding, remapping or source-location substitutions.'}
]
(HERE/'prioritized-gaps.json').write_text(json.dumps(priorities,indent=2)+'\n')
(HERE/'source-bindings.json').write_text(json.dumps({'head_observed':revision,'source_maps':source_maps,'status_candidate_bindings':{n:status[n]['candidate_artifact']for n in reports},'source_edits':False,'builds':0,'runtime_probes':0},indent=2)+'\n')
(HERE/'input-manifest.json').write_text(json.dumps(inputs,indent=2)+'\n')
print(json.dumps({'bound_files':len(inputs),'head':revision,'pump_inputs':len(source_maps['pump']),'amm_inputs':len(source_maps['pump_amm']),'priorities':len(priorities)},indent=2))
