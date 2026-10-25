from pathlib import Path
import json,sys,gzip
P=Path(__file__).resolve().parent;B=P.parent
sys.path.insert(0,str(P/'method'));import inventory_method as m
new=m.catalogue(B/'candidate.so',B/'symbols.so');old=json.loads((P/'before-inventory.json').read_text())
(P/'full-function-inventory.json').write_text(json.dumps(new,indent=2)+'\n')
(P/'before-after.json').write_text(json.dumps(m.compare(new,old),indent=2)+'\n')
print(json.dumps(new['summary']))
