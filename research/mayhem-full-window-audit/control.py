"""Authenticate the three recorded root-only MIR optimization controls."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,tempfile
P=Path(__file__).resolve().parent;R=P.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
def generate():
 spec=importlib.util.spec_from_file_location('control_elf',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);o=m.Elf(R/'evidence/original/mayhem/deployed.so');old=json.loads(gzip.decompress((R/'repro/mayhem/global-params-layout-recovery/prior-inventory.json.gz').read_bytes()));base=json.loads((R/'research/mayhem-amm-source-origins/builds/recovered/launch.json').read_bytes());rows=[]
 sig=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
 for level in [0,1,3]:
  p=P/f'controls/mir-{level}';launch=json.loads((p/'launch.json').read_bytes());result=json.loads((p/'result.json').read_bytes());assert launch['source_inputs']==base['source_inputs']and launch['checked_executables']==base['checked_executables'];assert launch['command'][-1]=='-Zmir-opt-level='+str(level);assert result['returncode']==0 and result['source_unchanged']and result['root_invocations']==1
  for n in ['stdout','stderr']:assert sha(gzip.decompress((p/(n+'.gz')).read_bytes()))==result[n+'_sha256']
  for n in ['candidate','symbols']:assert sha(gzip.decompress((p/(n+'.so.gz')).read_bytes()))==result[n+'_sha256']
  with tempfile.TemporaryDirectory()as td:
   q=Path(td)/'symbols.so';q.write_bytes(gzip.decompress((p/'symbols.so.gz').read_bytes()));c=m.Elf(q);ranges={(x['value'],x['value']+x['size'])for x in c.symbols if x['info']&15==2 and x['size']>=8 and c.lo<=x['value']<c.hi};shapes={sig(c.window(*ab))for ab in ranges};matched=[r['id']for r in old['original_rows']if sig(o.window(r['start'],r['end']))in shapes];helpers={}
   for name,a,b in [('record_amm_buy',181656,184200),('buy_quote',185296,186552)]:
    x=next(x for x in c.symbols if x['info']&15==2 and name in x['name']);w=c.window(x['value'],x['value']+x['size']);equal=sig(w)==sig(o.window(a,b));assert not equal;helpers[name]=dict(bytes=x['size'],calls=len(w['direct']),normalized_equal=equal)
   rows.append(dict(root_mir_opt_level=level,candidate_sha256=result['candidate_sha256'],candidate_bytes=result['candidate_bytes'],full_inventory_matched=len(matched),matched_ids=matched,helpers=helpers))
 return dict(scope='Same 16 source inputs, root-only optimization override, cached dependencies; no runtime or historical compiler identification claim.',controls=rows)
if __name__=='__main__':print(json.dumps(generate(),indent=2))
