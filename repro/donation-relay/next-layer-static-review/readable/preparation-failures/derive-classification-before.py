import importlib.util,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent
def load(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def derive():
 old=load('old_analyzer',P/'baseline/analyze.py');new=load('new_analyzer',P/'analyze_relocation_first.py');a=old.analyze(P/'baseline');b=new.analyze(P/'baseline')
 changes=[]
 for side,file,binary in [('original','original-function-ledger.json','original.so'),('candidate','candidate-function-ledger.json','unstripped.so')]:
  elf=new.Elf((P/'baseline'/binary).read_bytes())
  for before,after in zip(a[file],b[file]):
   prior={x['pc']:x for x in before['direct_calls']}
   for call in after['external_calls']:
    if call['pc'] in prior:
     rel=call['relocation'];changes.append({'side':side,'function':after.get('ordinal',after.get('index')),'pc':call['pc'],'instruction_hex':elf.at(call['pc'],8).hex(),'before':{'classification':'direct','claimed_target':prior[call['pc']]['target']},'after':{'classification':'external','symbol':rel['symbol'],'relocation_type':rel['type']},'relocation_record_offset':rel['record_offset'],'relocation_record_hex':elf.b[rel['record_offset']:rel['record_offset']+16].hex()})
 def pairs(values):return {(w['original_ordinal'],w['candidate_index']) for w in values['match-witnesses.json']}
 ap,bp=pairs(a),pairs(b)
 def closed(values):return {(w['original_ordinal'],w['candidate_index']) for w in values['match-witnesses.json'] if w['recursive_call_shape_closed']}
 af,bf=closed(a),closed(b)
 return {'patch':'analysis-classification.patch','classification_changes':changes,'historical_summary':a['comparison-summary.json'],'corrected_summary':b['comparison-summary.json'],'removed_normalized_pairs':sorted(ap-bp),'added_normalized_pairs':sorted(bp-ap),'removed_recursive_call_shape_pairs':sorted(af-bf),'added_recursive_call_shape_pairs':sorted(bf-af),'original_windows_losing_all_normalized_counterparts':[x['ordinal'] for x,y in zip(a['match-ledger.json'],b['match-ledger.json']) if x['normalized_candidate_indices'] and not y['normalized_candidate_indices']],'source_or_executable_change':False,'explanation':'Type10 relocation is an external symbol even when source nibble is1. Historical normalization erased its -1 immediate as if a relative call. The corrected view retains that immediate and records the actual symbol; symbol mismatches remain explicitly separate from instruction shapes.'}
if __name__=='__main__':(P/'classification-delta.json').write_text(json.dumps(derive(),indent=2,sort_keys=True)+'\n')
