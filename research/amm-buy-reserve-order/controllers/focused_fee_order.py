from pathlib import Path
import sys,json,hashlib,os,struct,re,gzip
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');D=Path('/home/ahi200/pumpfun-work/20261028-amm-reserve-source');os.chdir(R);sys.path.insert(0,str(R/'scripts'));os.environ['PUMP_AMM_FRESH_VM']='1';import pump_amm_legacy_buy_differential as h
paths={'original':R/'evidence/original/pump_amm/deployed.so','baseline':D/'baseline726/candidate.so','candidate':D/'reserve-fee-order/candidate.so'};rows=[]
norm=lambda logs:[x for x in logs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]
def test(name,case,**kw):
 r={k:h.legacy_buy(name=name,candidate=p,**kw) for k,p in paths.items()};diff={k:[f for f in r['original'] if f!='logs' and r['original'][f]!=r[k][f]] for k in ['baseline','candidate']};same={k:norm(r['original']['logs'])==norm(r[k]['logs']) for k in ['baseline','candidate']};rows.append(dict(instruction=name,case=case,results=r,diffs=diff,log_equal=same));print(name,case,same,{k:[x for x in v['logs'] if 'AnchorError' in x] for k,v in r.items()},flush=True)
for name in ['buy','buy_exact_quote_in']:
 for case,virtual,protocol,creator in [('negative',-101,0,0),('unfunded',0,101,0),('fees-overflow',0,2**64-1,1),('virtual-overflow',2**127-1,1,0),('virtual-and-unfunded',2**127-1,101,0),('positive-virtual',10,0,0),('negative-virtual-valid',-50,0,0),('zero-virtual',0,0,0)]:
  def setup(vm,metas):
   h.mutate(h.pool,245,virtual.to_bytes(16,'little',signed=True))(vm,metas)
   for off,value in [(261,0),(271,protocol),(279,creator)]:h.mutate(h.pool,off,struct.pack('<Q',value))(vm,metas)
   h.mutate(h.vaultquote,64,struct.pack('<Q',100))(vm,metas)
  test(name,case,amount=100,limit=10**12 if name=='buy' else 1,overrides=setup)
 for case,modifier,kw in [('zero-first',lambda vm,m:None,{'amount':0}),('disabled-first',h.mutate(h.CONFIG_KEY,56,b'\x08'),{}),('recipient-first',h.meta_mutation(9,'substitute'),{})]:
  bad=h.mutate(h.pool,279,struct.pack('<Q',2**64-1));test(name,case,amount=kw.get('amount',100),limit=10**12 if name=='buy' else 1,overrides=h.combine(bad,modifier))
for label,bps in [('lp-overflow',(1000,0,0)),('protocol-overflow',(0,1000,0)),('creator-overflow',(0,0,1000))]:
 setup=h.combine(h.custom_fee_table([(0,bps)]),h.mutate(h.pool,245,bytes(16)),h.mutate(h.pool,271,bytes(16)),h.mutate(h.vaultbase,64,struct.pack('<Q',11)),h.mutate(h.vaultquote,64,struct.pack('<Q',(2**64-1)//10)))
 test('buy',label,amount=10,limit=2**64-1,overrides=setup)
report={'artifact_sha256':{k:hashlib.sha256(p.read_bytes()).hexdigest() for k,p in paths.items()},'case_count':len(rows),'fresh_vm':True,'cases':rows,'controller_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
with gzip.open(D/'final-focused.json.gz','wt') as f:json.dump(report,f,separators=(',',':'))
summary={'case_count':len(rows),'functional_mismatches':{k:[i for i,r in enumerate(rows) if r['diffs'][k]] for k in ['baseline','candidate']},'log_mismatches':{k:[i for i,r in enumerate(rows) if not r['log_equal'][k]] for k in ['baseline','candidate']}}
(D/'final-focused-summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary),flush=True)
