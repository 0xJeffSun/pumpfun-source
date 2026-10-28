"""Normally signed exact-quote error-origin/rollback replay; no binary edits."""
from pathlib import Path
import argparse,gzip,hashlib,json,os,sys
P=Path(__file__).resolve().parent;R=P.parents[1]
sys.path.insert(0,str(R/'scripts'));os.chdir(R)
import pump_amm_legacy_buy_differential as h

CASES=[
 dict(name='division-zero',amount=1),
 dict(name='virtual-cancellation',amount=1,reserve=1,virtual=-1),
 dict(name='accrued-cancellation',amount=1,reserve=1,virtual=-1,accrued=1),
 dict(name='positive-denominator',amount=1,reserve=1),
 dict(name='zero-amount-before-math',amount=0),
 dict(name='zero-limit-before-math',amount=1,limit=0),
 dict(name='fees-before-math',amount=1,zero_fees=False),
 dict(name='negative-effective-before-math',amount=1,virtual=-1),
 dict(name='unfunded-accrual-before-math',amount=1,accrued=1),
 dict(name='zero-base-before-math',amount=1,base=0),
 dict(name='drain-base-downstream-rejection',amount=2),
 dict(name='positive-reserve-downstream-rejection',amount=2,reserve=1),
 dict(name='normal-fee-success-control',amount=100,reserve=100,zero_fees=False),
 dict(name='no-buyback-tail-drain',amount=2,remaining=False),
 dict(name='no-buyback-tail-positive',amount=2,reserve=1,remaining=False),
]

def run(out):
 out.mkdir(exist_ok=False,parents=True)
 images={'original':R/'evidence/original/pump_amm/deployed.so',
         'c651':R/'repro/pump_amm/optional-context-recovery-20261027/results/build/candidate.so'}
 for b in json.loads((P/'builds.json').read_bytes()):
  raw=gzip.decompress((P/'public'/b['label']/'candidate.so.gz').read_bytes())
  assert hashlib.sha256(raw).hexdigest()==b['candidate_sha256']
  dest=out/(b['label']+'.so');dest.write_bytes(raw);images[b['label']]=dest
 rows=[]
 for case in CASES:
  def setup(vm,metas):
   h.mutate(h.pool,245,case.get('virtual',0).to_bytes(16,'little',signed=True))(vm,metas)
   for off in [261,271,279]:h.mutate(h.pool,off,bytes(8))(vm,metas)
   h.mutate(h.pool,271,case.get('accrued',0).to_bytes(8,'little'))(vm,metas)
   h.mutate(h.vaultquote,64,case.get('reserve',0).to_bytes(8,'little'))(vm,metas)
   if 'base'in case:h.mutate(h.vaultbase,64,case['base'].to_bytes(8,'little'))(vm,metas)
   if case.get('zero_fees',True):h.custom_fee_table([(0,(0,0,0))])(vm,metas)
  results={label:h.legacy_buy(name='buy_exact_quote_in',amount=case['amount'],limit=case.get('limit',1),remaining=case.get('remaining',True),overrides=setup,candidate=image)for label,image in images.items()}
  rows.append(dict(case=case,results=results))
  print(case['name'],{k:[x for x in r['logs']if 'Error'in x]for k,r in results.items()},flush=True)
 with (out/'results.json.gz').open('xb')as f:f.write(gzip.compress((json.dumps(rows,sort_keys=True)+'\n').encode(),mtime=0))
 return rows

if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--output',type=Path,required=True);args=a.parse_args();run(args.output.resolve())
