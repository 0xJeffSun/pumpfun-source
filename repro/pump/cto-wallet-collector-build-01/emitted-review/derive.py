"""Review retained candidate-only analysis outputs; no original ELF reads or new bodies."""
from pathlib import Path
import collections,gzip,hashlib,json,struct,re
P=Path(__file__).resolve().parent;W=P.parent;R=W/'cto-wallet-collector-emitted-review';PLAN=W/'cto-wallet-collector-emitted-plan';E=Path('/Users/shawwalters/Documents/Codex/2026-10-25/go/work/cto-wallet-emitted-review');S=Path('/Users/shawwalters/Documents/Codex/2026-10-25/go/work/pr12-selected-cto-emitted-review')
J=lambda p:json.loads(p.read_text());H=lambda b:hashlib.sha256(b).hexdigest();G=lambda p:json.loads(gzip.decompress(p.read_bytes()))
def files(root):return{str(f.relative_to(root)):H(f.read_bytes())for f in root.rglob('*')if f.is_file()}
raw_before=files(R);plan_before=files(PLAN);assert H((PLAN/'manifest.json').read_bytes())=='aa5756b2edd1457235eabd979ce9ff8b5d11492ab887e7a4dd84a15aa0d7c14b'
for name,row in J(PLAN/'manifest.json').items():assert H((PLAN/name).read_bytes())==row['sha256']and(PLAN/name).stat().st_size==row['bytes']
runs=J(R/'launch-results.json');assert runs['root_review']=='PASS_CANDIDATE_ONLY_ANALYSIS_SCOPE'and len(runs['runs'])==4
for i,row in enumerate(runs['runs']):
 assert row['returncode']==0
 for kind in ['stdout','stderr']:assert H((R/f'run-{i}.{kind}').read_bytes())==row[kind+'_sha256']
inv={n:G(R/(n+'.json.gz'))for n in ['baseline-before','baseline-after','new-inventory']};proof=J(R/'candidate-bodies/proof.json');prior=J(E/'proof.json');selected=J(S/'proof.json')

for root,seal in [(E,'df2338c443a3ffdb174c1f3098f05c29e4c011bd954ab78b72302e7c5776920c'),(S,'21c5274869b01145be45deed8247717deb1d8427817bb1f4f890a545005b65e2')]:
 assert H((root/'manifest.json').read_bytes())==seal
 row=J(root/'manifest.json')['proof.json'];assert H((root/'proof.json').read_bytes())==row['sha256']and(root/'proof.json').stat().st_size==row['bytes']
assert len(proof['functions'])==23 and proof['collector_named_body_present']and len(proof['source37'])==37
assert proof['prior_function_names_absent_or_renamed']==['_ZN14pump_recovered9admin_cto16token_raw_amount17h<HASH>E']
assert proof['candidate_sha256']==inv['new-inventory']['candidate_sha256']=='6e0c9002d09e0cee6cc738b3a9e0983a8d0cd89374fa2cc7c41fa45910515b9e'
assert proof['symbols_sha256']==inv['new-inventory']['symbols_sha256']=='f09ac5696038d7ee9a2d28767b02cbae5b5504a56086d8baf4019f316b8a0c86'
for n,h in proof['source37'].items():assert H((W/'cto-wallet-collector-build-01/repo'/n).read_bytes())==h
# Both prior proof formats retain the same candidate-only functions under functions.
def chosen(p,needle):return next(f for f in p['functions']if any(needle in n for n in f['names']))
def seq(f,i):
 names={r['start']:r['names']for r in i['candidate_symbol_windows']}
 return [x.get('actual_named_callee',names.get(x['target'],[]))for x in f['direct_calls']]
comparisons=[]
for tag,old,metadata in [('71ec',selected,inv['baseline-before']),('d75',prior,inv['baseline-after'])]:
 for needle in ['12try_accounts','__global9admin_cto']:
  f=chosen(old,needle);g=chosen(proof,needle)
  a=seq(f,metadata);b=seq(g,inv['new-inventory'])
  assert f['bytes']==g['bytes']and f['normalized_sha256']==g['normalized_sha256']and a==b
  comparisons.append({'baseline':tag,'name':needle,'before_start':f['start'],'after_start':g['start'],'bytes':g['bytes'],'normalized_sha256':g['normalized_sha256'],'actual_named_callees_equal':True,'actual_named_callees':b,'direct_calls':len(b),'semantic_equivalence':None})
(P/'parser-wrapper-comparisons.json').write_text(json.dumps(comparisons,indent=2)+'\n')
# Strongest labels match prior inventory's raw > call-consistent > normalized > unmatched policy.
def statuses(i):
 ps=collections.defaultdict(list)
 for r in i['pattern_comparisons']:ps[r['original']].append(r)
 out={}
 for o in i['original_windows']:
  rs=ps[o['start']];raw=sum(r['raw_body_sha256_equal']for r in rs);calls=sum(r['call_consistent_fixed_point']for r in rs)
  out[o['start']]={'status':'raw'if raw else'call-consistent'if calls else'normalized'if rs else'unmatched','normalized_pairs':len(rs),'raw_pairs':raw,'call_consistent_pairs':calls,'original_end':o['end'],'original_raw_sha256':o['raw_sha256']}
 return out
new=statuses(inv['new-inventory']);result={}
for base in ['baseline-before','baseline-after']:
 old=statuses(inv[base]);assert set(old)==set(new)and len(old)==1035
 rows=[{'original_start':a,'before':old[a],'after':new[a]}for a in old];counts=collections.Counter((x['before']['status'],x['after']['status'])for x in rows)
 result[base]={'transitions':[{'before':a,'after':b,'count':n}for(a,b),n in sorted(counts.items())],'changed_strongest_rows':[x for x in rows if x['before']['status']!=x['after']['status']],'all1035_rows':rows,'summary_before':inv[base]['summary'],'summary_new':inv['new-inventory']['summary']}
assert result['baseline-before']['changed_strongest_rows']==[]
changed=result['baseline-after']['changed_strongest_rows'];assert len(changed)==1 and changed[0]['original_start']==347576 and changed[0]['before']['status']=='call-consistent'and changed[0]['after']['status']=='unmatched'
(P/'all1035-transitions.json').write_text(json.dumps(result,indent=2)+'\n')
functions={f['start']:f for f in proof['functions']};execute=functions[441928];helper=functions[469552]
def ins(f,pc):
 raw=bytes.fromhex(f['code_hex']);o=pc-f['start'];b=raw[o:o+8];assert len(b)==8;op,reg,off,imm=struct.unpack('<BBhi',b);v={'pc':pc,'raw_hex':b.hex(),'opcode':op,'register_byte':reg,'offset':off,'immediate':imm}
 if op==24:v['literal']=struct.unpack_from('<I',raw,o+4)[0]+(struct.unpack_from('<I',raw,o+12)[0]<<32)
 if op==133:v['target']=pc+8+imm*8
 elif op&7 in(5,6)and op not in(149,141):v['branch_target']=pc+8+off*8
 return v
expected={469640:469712,469656:470232,470392:470904,470856:473408,470984:473608,471288:474296,473296:474344,473800:474392,473944:474424,474232:474248}
for pc,target in expected.items():assert ins(helper,pc)['branch_target']==target
for pc,target in{457784:1290976,457880:469552,458000:1378784,458336:1268968,458504:1268968,459144:1377872}.items():assert ins(execute,pc)['target']==target
for pc,target in{448880:453120,448952:453120,457800:464288,457824:457840,457832:464432,457912:447384,457968:457984,457976:464432,459368:464496,464480:464496}.items():assert ins(execute,pc)['branch_target']==target
codes=[]
for off in range(0,execute['bytes'],8):
 v=ins(execute,execute['start']+off)
 if v['opcode']==98 and v['immediate']in[6019,6091,6092]:codes.append(v)
assert[(x['pc'],x['immediate'])for x in codes]==[(444352,6091),(446352,6019),(449112,6092)]
helper_branches=[]
for off in range(0,helper['bytes'],8):
 v=ins(helper,helper['start']+off)
 if 'branch_target'in v:helper_branches.append(v)
# These records cover complete saved body branches only, no callee body expansion.
(P/'candidate-cfg-anchors.json').write_text(json.dumps({'helper_all_branches':helper_branches,'helper_all_direct_calls':helper['direct_calls'],'helper_external_calls':helper['external_calls'],'helper_indirect_calls':helper['indirect_calls'],'constructor_stores':codes,'manual_expected_helper_branches':expected,'caller_anchors':[ins(execute,x)for x in [448744,448856,448872,448880,448896,448920,448952,448960,448968,449112,449152,456984,457008,457032,457096,457104,457112,457152,457224,457400,457416,457784,457800,457808,457824,457832,457840,457872,457880,457904,457912,457968,457976,458000,458016,458336,458400,458504,459144,459368,464432,464480]]},indent=2)+'\n')
# Candidate's own bounded literal extents, never original data.
cb=(W/'cto-wallet-collector-build-01/build-01/artifacts/pump_recovered.so').read_bytes();assert H(cb)==proof['candidate_sha256'];literals=[]
for kind,addr,n,text in [('fees',1468936,32,None),('native',1469448,32,None),('exec',1472740,60,'Creator account is executable, so it cannot receive lamports'),('zero',1472702,25,'No creator fee to collect'),('rent',1472825,60,'Creator account does not have enough rent-exemption lamports'),('origin_path',1471864,16,'src/admin_cto.rs')]:
 b=cb[addr:addr+n];assert len(b)==n
 if text is not None:assert b.decode()==text
 literals.append({'kind':kind,'address':addr,'bytes':n,'sha256':H(b),'hex':b.hex(),'text':text})

alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';value=0
for c in 'pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ':value=value*58+alphabet.index(c)
assert value.to_bytes(32,'big').hex()==literals[0]['hex']
assert literals[1]['hex']=='069b8857feab8184fb687f634618c035dac439dc1aeb3b5598a0f00000000001'
(P/'candidate-literals.json').write_text(json.dumps(literals,indent=2)+'\n')
assert files(R)==raw_before and files(PLAN)==plan_before
(P/'input-hashes.json').write_text(json.dumps({'raw_outputs':raw_before,'plan_seal':H((PLAN/'manifest.json').read_bytes()),'prior_d75_proof':H((E/'proof.json').read_bytes()),'prior71ec_proof':H((S/'proof.json').read_bytes()),'derived_scope':'Saved23candidate bodies and bounded owncandidate literals only; no original capture/new original body or callee decode'},indent=2)+'\n')
print('PASS: both parser/wrapper controls normalized+namedcallees; full1035transitions; bounded CFG/literals; inputs unchanged. Manual report remains distinct from semantic proof.')
