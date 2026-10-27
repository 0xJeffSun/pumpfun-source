"""Recheck static attribution, saved builds, body preservation and signed replay."""
from pathlib import Path
import sys,hashlib,gzip,json,tempfile,importlib.util,base64,re,struct
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def load(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def main():
 pins=load(P/'manifest.json');actual={p.relative_to(P).as_posix():sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts};assert pins==actual
 for name,h in load(P/'inputs.json').items():assert sha((R/name).read_bytes())==h,name
 assert module('attribution',P/'analyze.py').generate()==load(P/'attribution.json')
 m=module('elf_attribution',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');o=m.Elf(R/'evidence/original/mayhem/deployed.so');prior=load(R/'repro/mayhem/global-params-layout-recovery/prior-inventory.json.gz');admitted={r['id']for r in load(R/'research/mayhem-sell-origin-recovery/functions.json')['rows']if r['scope']=='examined'};analyses=load(P/'body-analysis.json');hashes={}
 baseline={p.relative_to(R/'research/mayhem-sell-origin-recovery/sources/recovered').as_posix().removesuffix('.gz'):raw(p)for p in(R/'research/mayhem-sell-origin-recovery/sources/recovered').rglob('*.gz')}
 for label,expected_size in [('amm-buy-helper-clean',1128),('amm-buy-branches-clean',1104)]:
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json');sources={p.relative_to(P/f'sources/{label}').as_posix().removesuffix('.gz'):raw(p)for p in(P/f'sources/{label}').rglob('*.gz')}
  assert len(sources)==15 and {n:sha(b)for n,b in sources.items()}==launch['source_inputs'];assert {n for n in sources if sources[n]!=baseline[n]}=={'src/state.rs','src/instructions/buy_pump_swap.rs'}
  assert result['returncode']==0 and result['root_invocations']==1 and result['source_unchanged']
  for n in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{n}.gz'))==result[n+'_sha256']
  b=raw(P/f'artifacts/{label}/candidate.so.gz');s=raw(P/f'artifacts/{label}/symbols.so.gz');assert sha(b)==result['candidate_sha256']and sha(s)==result['symbols_sha256'];hashes[label]=sha(b)
  with tempfile.TemporaryDirectory()as td:
   f=Path(td)/'symbols.so';f.write_bytes(s);c=m.Elf(f);ranges={(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi};windows=[c.window(*ab)for ab in ranges];patterns={(w['end']-w['start'],w['normalized_sha256'],str(w['normalization_pattern']))for w in windows};matches=[]
   for row in prior['original_rows']:
    if row['id']not in admitted:continue
    w=o.window(row['start'],row['end'])
    if(w['end']-w['start'],w['normalized_sha256'],str(w['normalization_pattern']))in patterns:matches.append(row['id'])
   report=analyses[label];assert report['matched']==matches and len(matches)==188
   assert sum(row['raw_sha256']in{w['raw_sha256']for w in windows}for row in prior['original_rows'])==report['all_row_raw']==58
   helper=[s for s in c.symbols if s['info']&15==2 and 'buy_quote'in s['name']];assert len(helper)==1 and helper[0]['size']==report['helper_bytes']==expected_size
   assert len(c.window(helper[0]['value'],helper[0]['value']+expected_size)['direct'])==report['helper_calls']==10
   assert expected_size!=1256 and not report['helper_normalized_equal']
 from solders.transaction import Transaction
 from solders.pubkey import Pubkey
 may='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
 summaries=[]
 for p in sorted((P/'runtime').glob('*.json.gz')):
  d=load(p);label='amm-buy-helper-clean'if p.name=='amm-buy-helper-runtime.json.gz'else'amm-buy-branches-clean';assert d['candidate_sha256']==hashes[label]and d['original_sha256']==sha(o.b);assert d['case_count']==len(d['cases'])==419 and not d['mismatches']
  for name,h in d['harness_sha256'].items():assert sha((R/name).read_bytes())==h
  exact_logs=0;successes=0
  for row in d['cases']:
   a,b=row['original'],row['candidate'];assert not row['different_fields'];assert a['transaction_base64']==b['transaction_base64']and a['error']==b['error']
   for result in [a,b]:
    tx=Transaction.from_bytes(base64.b64decode(result['transaction_base64']));assert all(tx.verify_with_results())
    for phase in ['before','after']:
     for account in result[phase].values():
      if account is not None and not account['executable']:assert sha(base64.b64decode(account['data_base64']))==account['data_sha256']
   # Program executable bytes deliberately differ. Every other snapshot is compared.
   for phase in ['before','after']:
    assert {k:v for k,v in a[phase].items()if k!=may}=={k:v for k,v in b[phase].items()if k!=may}
   for field in ['inner_instructions','return_data']:assert a['metadata'][field]==b['metadata'][field]
   events=lambda x:[s for s in x['metadata']['logs']if s.startswith('Program data: ')]
   assert events(a)==events(b)
   norm=lambda x:[s for s in x if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)]
   exact_logs+=norm(a['metadata']['logs'])==norm(b['metadata']['logs']);successes+=a['error']is None
  summaries.append(dict(receipt=p.name,cases=419,signed_transactions=838,successful_original_cases=successes,equal_logs_after_compute_only=exact_logs))
 assert len(summaries)==4
 result=dict(static_handlers=6,retained_normalized=188,retained_all_row_raw=58,new_complete_body_matches=0,replays=summaries,compiler_executed=False,runtime_executed=False)
 assert load(P/'verification.json')==result
 print(json.dumps(result,indent=2))
if __name__=='__main__':main()
