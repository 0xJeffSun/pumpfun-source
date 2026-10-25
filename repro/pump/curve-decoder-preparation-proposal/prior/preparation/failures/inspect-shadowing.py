from pathlib import Path
import sys,json
sys.path.insert(0,str(Path(__file__).resolve().parent))
from elf_reader import Elf
from decoder import window
W=Path(__file__).resolve().parent;e=Elf(W/'inputs/evidence/original.so')
rows=[]
for a,z in [(0x3cd50,0x3d250),(0x3d250,0x3dd78),(0x147bc8,0x147c70)]:
 r=window(e,a,z);rows.append(r);print(hex(a),hex(z))
 for x in r['instructions']:
  if x.get('kind')=='direct_call':
   t=x['target'];end=e.entries[e.entries.index(t)+1];print(hex(x['pc']),hex(t),hex(end),'size',end-t)
(W/'initial-windows.json').write_text(json.dumps(rows,indent=2)+'\n')
