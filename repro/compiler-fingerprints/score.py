#!/usr/bin/env python3
"""Compare extracted source locations against the hash-pinned official sources."""
from pathlib import Path
import json,hashlib
ROOT=Path(__file__).resolve().parent
locs=json.loads((ROOT/'panic-locations.json').read_text());manifest=json.loads((ROOT/'official-source-files.json').read_text())
result={}
for name,paths in locs.items():
 baseline='v1.52' if name=='mayhem' else 'v1.43'
 fingerprints=sorted({(p['path'].split('/rust/')[-1],r['line'],r['column'],r['filename_includes_trailing_nul']) for p in paths for r in p['records']})
 result[name]={'assumed_reference_family':baseline,'comparison_method':'Exact source-line equality with an assumed reference family, plus independently captured filename-NUL representation. Line differences alone are not proof of incompatible code generation.','unique_locations':len(fingerprints),'fingerprints':[],'candidates':{}}
 for path,line,column,nul in fingerprints:
  s=(ROOT/'remote'/baseline/path).read_text().splitlines()[line-1]
  result[name]['fingerprints'].append({'path':path,'line':line,'column':column,'source_line':s,'source_at_column':s[column-1:column+40],'trailing_nul':nul})
 for version,files in manifest.items():
  matches=[];failures=[]
  for fp in result[name]['fingerprints']:
   p=ROOT/'remote'/version/fp['path']
   s=p.read_text().splitlines() if p.exists() else []
   line=s[fp['line']-1] if len(s)>=fp['line'] else None
   entry={'path':fp['path'],'line':fp['line'],'column':fp['column']}
   if line==fp['source_line']:matches.append(entry)
   else:failures.append({**entry,'actual_line':line})
  location=(ROOT/'remote'/version/'library/core/src/panic/location.rs').read_text()
  nul_matches=('file_bytes_with_nul:' in location)==(name=='mayhem')
  result[name]['candidates'][version]={'line_matches':len(matches),'line_failures':failures,'location_filename_nul_matches':nul_matches,'matches_assumed_reference_source_family':len(matches)==len(fingerprints) and nul_matches}
 print(name,'unique locations',len(fingerprints),'matches',[v for v,c in result[name]['candidates'].items() if c['matches_assumed_reference_source_family']])
 for fp in result[name]['fingerprints']:print(f"  {fp['path']}:{fp['line']}:{fp['column']} {fp['source_at_column']}")
(ROOT/'candidate-scores.json').write_text(json.dumps(result,indent=2)+'\n')
