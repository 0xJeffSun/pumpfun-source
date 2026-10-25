"""Static saved-input inspection; --derive writes only the analysis JSON."""
from pathlib import Path
import json,gzip,hashlib,sys
W=Path(__file__).resolve().parent
def generate():
 rows=[]
 for name in ['buy','quote','v3_configured_fee']:
  f=W/'differential'/(name+'.json.gz')
  if not f.exists():continue
  raw=f.read_bytes();j=json.loads(gzip.decompress(raw)if raw[:2]==bytes([31,139])else raw)
  cases=[x.get('case',x)for x in j['cases']]
  both=[x for x in cases if x.get('mutation')=='complete' and 82 in x.get('flags',[])]
  rows.append({'suite':name,'case_count':len(cases),'explicit_double_flag_cases':len(both),'receipt_sha256':hashlib.sha256(raw).hexdigest()})
 fixtures=[];curve_key='DVtP3csJxif14jEnZv82vcK3mevC4MNEApbksz5hNF4Q'
 for name in ['exact_quote','v3_configured_fee']:
  f=W/'surfpool'/name/'fixtures.json'
  if not f.exists():f=W/'coverage-fixtures'/(name+'.json')
  if not f.exists():continue
  raw=f.read_bytes();j=json.loads(raw);both=[]
  for row in j:
   curve=bytes.fromhex(row['accounts'][curve_key]['data']);assert len(curve)==166
   if curve[48] and curve[82]:both.append(row['case'])
  fixtures.append({'suite':name,'cases':len(j),'complete_and_cashback_cases':len(both),'fixture_sha256':hashlib.sha256(raw).hexdigest()})
 return {'source_encoding':'166-byte retained fixture: complete at48, cashback at82. Mayhem mode is a separate flag.','differential_case_inspection':rows,'surfpool_fixture_inspection':fixtures,'targeted_double_flag_coverage_established':False,'claim':'The inspected unchanged direct V3 cases do not combine complete and cashback. Passing preservation results do not establish targeted runtime coverage of the new precedence. No fixture was added or modified.'}
if __name__=='__main__':
 value=generate()
 if '--derive'in sys.argv:(W/'coverage-review.json').write_text(json.dumps(value,indent=2)+'\n')
 else:assert json.loads((W/'coverage-review.json').read_text())==value
 print('PASS saved-input coverage inspection; no runtime execution')
