from pathlib import Path
import json,gzip,struct,hashlib,sys,shutil
R=Path.cwd();W=R/'work/amm-scalar-next-review';P=R/'repro/pump_amm/formatter-restoration-v144';sys.path.insert(0,str(P/'static-tool'));from elf_reader import Elf
O=Elf(R/'evidence/original/pump_amm/deployed.so');C=Elf(P/'candidate.so');S=Elf(P/'unstripped.so');L=json.load(gzip.open(P/'inventory/after/residual-ledger.json.gz'));om={r['start']:r for r in L['original']};cm={r['start']:r for r in L['candidate']};H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert H(P/'candidate.so')=='d3dacf1bd54e0b7b825557d01adfe158bc229753fb4b945618c5eabf2bdb1bab'
I=lambda e,a:struct.unpack_from('<BBhi',e.b,a)
pairs=[]
for a,b in [(0x61630,0xf758),(0x61898,0xf9b8),(0x61b00,0xfc18)]:
 assert om[a]['bytes']==616 and cm[b]['bytes']==608
 assert O.calls[a+568]==0x1840 and C.calls[b+560]==0x1308
 assert I(O,a+552)==(0xb7,4,0,1000) and I(O,a+560)==(0xbf,0x75,0,0)
 assert I(C,b+552)==(0xbf,0x74,0,0)
 assert O.normalized[a+576:a+616]==C.normalized[b+568:b+608]
 diffs=[i for i in range(0,552,8)if O.normalized[a+i:a+i+8]!=C.normalized[b+i:b+i+8]];assert diffs==[40,456,464]
 pairs.append({'original':om[a],'candidate':cm[b],'prefix_differences':diffs,'original_call_actual':0x1840,'candidate_call_actual':0x1308})
a=0x1840;b=0x1308;diffs=[i for i in range(0,1336,8)if O.normalized[a+i:a+i+8]!=C.normalized[b+i:b+i+8]];assert diffs==[24,32,40,48]
assert I(O,a+24)==(0x7b,0x5a,-288,0) and I(O,a+32)==(0x7b,0x4a,-296,0)
assert I(C,b+24)==(0x7b,0x4a,-288,0) and I(C,b+48)==(0x7a,0x0a,-296,1000)
assert O.pattern(a,1336)==C.pattern(b,1336)
assert O.normalized[a:a+1336]==C.normalized[0xdd0:0xdd0+1336]
callrows=[]
for old,new in zip(om[a]['direct_calls'],cm[b]['direct_calls']):
 assert old['offset']==new['offset'];u=om[old['target']];v=cm[new['target']];assert u['bytes']==v['bytes'] and u['normalized_sha256']==v['normalized_sha256'];callrows.append({'offset':old['offset'],'original_target':old['target'],'candidate_target':new['target'],'bytes':u['bytes'],'candidate_names':v['names'],'normalized_equal':True})
assert len(callrows)==8
incoming=lambda rows,t:[{'caller_start':r['start'],'caller_names':r.get('names',[]),'call':c}for r in rows for c in r['direct_calls']if c['target']==t]
graph={'original_generic':incoming(L['original'],a),'current_scalar_specialized':incoming(L['candidate'],b),'current_generic':incoming(L['candidate'],0xdd0)};assert [len(v)for v in graph.values()]==[24,3,6]
source=P/'source/programs/pump-amm/src/state/global_config.rs';text=source.read_text();assert text.count('require_gte!(1000u64, fee, PumpAmmError::FeeBasisPointsExceedsMaximum);')==3
selected={'candidate_sha256':H(P/'candidate.so'),'scalar_pairs':pairs,'actual_helper_original':om[a],'actual_helper_candidate':cm[b],'generic_matching_candidate':cm[0xdd0],'actual_target_pairs':callrows,'incoming_calls':graph,'helper_differences':diffs,'source_sha256':H(source),'disposition':'No compared-value/order/ownership source correction proved; only ABI specialization and diagnostic differences.'}
(W/'evidence.json').write_text(json.dumps(selected,indent=2)+'\n')
for n,p in [('global_config.rs',source),('anchor-with-values.rs',R/'repro/pump_amm/scalar-actual-helper-review/inputs/anchor/anchor-lang-0.31.1/src/error.rs'),('anchor-require-gte.rs',R/'repro/pump_amm/scalar-actual-helper-review/inputs/anchor/anchor-lang-0.31.1/src/lib.rs')]:shutil.copy2(p,W/n)
print(json.dumps({'pass':True,'actual_specialized_target':hex(b),'generic_target':hex(0xdd0),'scalar_pairs':3,'actual_helper_targets_matched':8,'incoming_call_counts':{k:len(v)for k,v in graph.items()},'source_patch_justified':False}))
