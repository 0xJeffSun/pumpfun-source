"""Freeze the new exact two-command current CI companion once."""
from pathlib import Path
import json
from bindings import gather
P=Path(__file__).resolve().parent
assert not(P/'bindings.json').exists(),'Freeze once; preserve existing evidence'
d,before,after=gather();(P/'before-workflow.yml').write_text(before);(P/'after-workflow.yml').write_text(after);(P/'bindings.json').write_text(json.dumps(d,indent=2,sort_keys=True)+'\n');print(json.dumps({'frozen':True,'direct_files':len(d['bound_files']),'packages':len(d['immutable_packages']),'incoming':[len(d['incoming595']),len(d['incoming126'])],'compiled':sum(d['counts'].values()),'archives':len(d['archives']),'removed':len(d['removed'])}))
