from pathlib import Path
import json,sys,re
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));import coverage_admin as a
def classify(rows):
 out={'cases':len(rows),'mayhem_flag_inputs':[],'actual6088':[]}
 for row in rows:
  raw=a.curve(row);case=row['case'];name=case.get('name',case.get('id','unknown'))
  if raw is not None and len(raw)>81 and raw[81]:out['mayhem_flag_inputs'].append(name)
  if 6088 in a.codes(row.get('error')) or re.search(r'(?:InstructionErrorCustom|Custom)\(6088\)',str(row.get('error'))):out['actual6088'].append(name)
 return out
def run():
 d=a.load(P/'differential/admin_cto.json.gz');assert not d['mismatches']
 paths=list((P/'surfpool/admin_cto').glob('pump-*-transactions.json'));vs=[a.load(p)for p in paths];vs=[v for v in vs if 'signed_transactions'in v];assert len(vs)==1;s=vs[0];assert not s['mismatches']
 return {'scope':'Saved inputs/results only; no new fixture/probe/target execution. No coverage implied for other guards.','differential':classify([dict(r['original'],case=r['case'])for r in d['cases']]),'surfpool':classify(s['original']),'inherited_coverage':a.run()}
if __name__=='__main__':(P/'owned-coverage-review.json').write_text(json.dumps(run(),indent=2)+'\n')
