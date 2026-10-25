from pathlib import Path
import sys,json,hashlib
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'analysis/method'));from elf_reader import Elf
import inventory_method as m
J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert J(P/'build-exit.json')['returncode']==0 and J(P/'build-acceptance.json')['passed'];C=Elf(P/'candidate.so');S=Elf(P/'symbols.so');O=Elf(P/'analysis/method/inputs/original.so')
a=m.catalogue(P/'candidate.so',P/'symbols.so');b=J(P/'analysis/before-inventory.json');(P/'analysis/full-function-inventory.json').write_text(json.dumps(a,indent=2)+'\n');(P/'analysis/before-after.json').write_text(json.dumps({'before':b['summary'],'after':a['summary'],'same_method':True,'original_windows_equal':all(x['start']==y['start']and x['end']==y['end']and x['raw_sha256']==y['raw_sha256']for x,y in zip(a['original_rows'],b['original_rows'],strict=True))},indent=2)+'\n')
selected={}
for original in [552776,571320,560200,556488,572392]:
 row=next(x for x in a['original_rows']if x['start']==original);selected[str(original)]=row
app=next(x for x in S.funcs if '19pump_fees_candidate25create_fee_sharing_config'in x['name']);(P/'analysis/helper-correspondence.json').write_text(json.dumps({'scope':'Complete original windows and every current match retained; full recursive equivalence is not claimed.','candidate_sha256':H(P/'candidate.so'),'application':app,'original_rows':selected},indent=2)+'\n');print(json.dumps({'candidate_sha256':H(P/'candidate.so'),'summary':a['summary'],'application':app},indent=2))
