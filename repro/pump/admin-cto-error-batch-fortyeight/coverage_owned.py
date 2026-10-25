from pathlib import Path
import sys,json,re
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));import coverage_admin as a
CODES=[6084,6090,6089,6077,6078]
def code(error,n):return n in a.codes(error)or bool(re.search(r'(?:InstructionErrorCustom|Custom)\('+str(n)+r'\)',str(error)))
def run():
 d=a.load(P/'differential/admin_cto.json.gz');assert not d['mismatches'];f=[p for p in(P/'surfpool/admin_cto').glob('pump-*-transactions.json')if 'signed_transactions'in a.load(p)];assert len(f)==1;s=a.load(f[0]);assert not s['mismatches']
 return {'new_fixtures':0,'new_probes':0,'codes':{str(n):{'differential':[r['case']['name']for r in d['cases']if code(r['original']['error'],n)],'surfpool':[r['case']['name']for r in s['original']if code(r['error'],n)]}for n in CODES},'inherited_limits':a.run()}
if __name__=='__main__':(P/'batch-coverage-review.json').write_text(json.dumps(run(),indent=2)+'\n')
