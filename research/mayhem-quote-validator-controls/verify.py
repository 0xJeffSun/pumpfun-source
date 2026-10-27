"""Check retained Mayhem source/build controls; never invokes compiler or target VM."""
from pathlib import Path
import gzip,json,hashlib,importlib.util,tempfile
P=Path(__file__).resolve().parent;R=P.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def verify():
 manifest=json.loads((P/'manifest.json').read_text());paths=list(P.rglob('*'))
 assert not any(p.is_symlink()for p in paths)
 assert {str(p.relative_to(P))for p in paths if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}==set(manifest)
 for n,h in manifest.items():assert sha((P/n).read_bytes())==h,n
 for n,h in json.loads((P/'inputs.json').read_text()).items():assert sha((R/n).read_bytes())==h,n
 parent=R/'repro/mayhem/global-params-layout-recovery';prior=json.loads(raw(parent/'prior-inventory.json.gz'));source=json.loads((parent/'source-inputs.json').read_text())['recovered']
 spec=importlib.util.spec_from_file_location('qcontrol',parent/'tools/layer01.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);o=m.Elf(R/'evidence/original/mayhem/deployed.so')
 expected=json.loads((P/'analysis.json').read_text());base_matches=None
 for label,row in expected.items():
  if label=='transition':continue
  result=json.loads((P/'builds'/label/'result.json').read_text());launch=json.loads((P/'builds'/label/'launch.json').read_text());mapping={str(p.relative_to(P/'sources'/label)).removesuffix('.gz'):sha(raw(p))for p in(P/'sources'/label).rglob('*.gz')}
  assert len(mapping)==15 and mapping==launch['source_inputs']and result['root_invocations']==1 and result['returncode']==0 and result['source_unchanged']
  changed={k for k in mapping if mapping[k]!=source[k]};assert changed==(set()if label=='baseline-clean'else{'src/state.rs','src/instructions/sell.rs'})
  for n in ['stdout','stderr']:assert sha(raw(P/'builds'/label/(n+'.gz')))==result[n+'_sha256']
  for n in ['candidate','symbols']:assert sha(raw(P/'artifacts'/label/(n+'.so.gz')))==result[n+'_sha256']
  if label=='baseline-clean':assert result['candidate_sha256']=='9be9d40f1c8995915d55c29abf42cf6bd1c07a1f386054ed89c2156a1ecd5460'and result['symbols_sha256']=='1fc36019bec29a194822354bb38d29cdf2b11de2756e13d8b78ef578693fd338'
  with tempfile.TemporaryDirectory()as tmp:
   path=Path(tmp)/'symbols.so';path.write_bytes(raw(P/'artifacts'/label/'symbols.so.gz'));c=m.Elf(path);assert c.lo<c.hi
   ranges={(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi}
   windows=[c.window(*ab)for ab in ranges];patterns={(w['end']-w['start'],w['normalized_sha256'],str(w['normalization_pattern']))for w in windows};matches=set()
   for original in prior['original_rows']:
    if original['id']not in row['matches']:continue
    w=o.window(original['start'],original['end'])
    if(w['end']-w['start'],w['normalized_sha256'],str(w['normalization_pattern']))in patterns:matches.add(original['id'])
   assert matches=={k for k,v in row['matches'].items()if v}and len(matches)==188
   assert len({x['id']for x in prior['original_rows']if x['raw_sha256']in{w['raw_sha256']for w in windows}})==row['all_row_raw']==58
   if base_matches is None:base_matches=matches
   else:assert matches==base_matches and 'O0095'not in matches
 print('PASS: exact baseline; seven real root-build controls;188 existing matches and58 raw retained;O0095 still unmatched;no target execution claimed')
if __name__=='__main__':verify()
