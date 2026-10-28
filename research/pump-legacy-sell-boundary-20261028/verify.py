#!/usr/bin/env python3
from pathlib import Path
import json,gzip,hashlib,runpy,sys
p=Path(__file__).resolve().parent;root=p.parents[1];sha=lambda b:hashlib.sha256(b).hexdigest();read=lambda f:json.loads(gzip.decompress(f.read_bytes()) if f.suffix=='.gz' else f.read_bytes())
record=read(p/'build-record.json');assert record['returncode']==0 and record['source_unchanged'];assert record['source_sha256']==record['source_after_sha256']==read(p/'source-sha256.json')
for f,h in record['source_sha256'].items():assert sha((p/'source'/f).read_bytes())==h,f
assert sha((p/'unstripped.so').read_bytes())==record['unstripped_sha256'];assert sha((p/'candidate.so').read_bytes())==record['candidate_sha256'];assert len(read(p/'compiler-commands.json'))==2
inventory=read(p/'inventory.json.gz');control=read(p/'control/inventory.json.gz');assert inventory['candidate_sha256']==record['unstripped_sha256'];assert inventory['counts']['normalized']==1019 and inventory['counts']['raw']==166;assert control['counts']['normalized']==1018 and control['counts']['raw']==166;assert inventory['normalized_gains']==['0x152888'] and not inventory['normalized_losses'];assert not inventory['raw_gains'] and not inventory['raw_losses']
sys.path.insert(0,str(root/'scripts'));from pump_compare_function_bytes import normalize,body
from pump_quote_control_function_match import sections
m=runpy.run_path(str(root/'research/claude-pump-integration-20261027/r37-layout-33/verify.py'));original=(root/'evidence/original/pump/deployed.so').read_bytes();candidate=(p/'unstripped.so').read_bytes();assert sha(original)==inventory['original_sha256'];st,size,name=next(t for t in m['elf_functions'](candidate) if 'pump_recovered4sell17' in t[2]);assert size==8488;assert normalize(body(original,sections(original),0x152888,size),0x152888,sections(original))[0]==normalize(body(candidate,sections(candidate),st,size),st,sections(candidate))[0]
calls=read(p/'callmap.json');assert calls['candidate_sha256']==record['unstripped_sha256'] and calls['official_normalized_body_equal'] and calls['used_by_anchor_dispatch'];assert len(calls['outgoing_calls'])==55;bad=[c for c in calls['outgoing_calls'] if not c['matching_candidate_symbols']];assert len(bad)==1 and bad[0]['original_target']=='0x6cd78'
edges=read(p/'constructor-edges.json')['reports'];assert not edges[0]['decoder_normalized_equal_original'];assert edges[1]['elf_sha256']==record['unstripped_sha256'] and edges[1]['decoder_normalized_equal_original']
counts={}
for name,n in [('constructor',25),('legacy-sell',115),('configured-fee',28),('legacy-cashback',14)]:
 d=read(p/'runtime'/f'{name}.json.gz');assert d['candidate_sha256']==record['unstripped_sha256'];assert d['case_count']==n and not d['mismatches'];counts[name]=n
checks=read(p/'runtime/audit.json');assert not checks['mismatches'] and not checks['exact_ordered_log_mismatches_excluding_compute'];assert checks['case_counts']==counts
print('Verified: 1019/1035 normalized, 166 raw, +0x152888, zero losses; actual caller, 54/55 exact callees, checked decoder edge, 182 signed paired runtime cases.')
