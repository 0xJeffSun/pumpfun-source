from pathlib import Path
import tarfile,json,hashlib,re
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');J=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-selector');J.mkdir(exist_ok=True);result=[]
for p in (R/'research/amm-parallel-work-20261027').rglob('*.tar.gz'):
 names=[];variants={}
 with tarfile.open(p) as tf:
  for m in tf:
   if 'fee-rate-loads' in m.name:names.append(m.name)
   if not m.isfile() or not m.name.endswith('.rs') or m.size>350000:continue
   b=tf.extractfile(m).read();s=b.decode(errors='replace')
   if 'creator_fee_configurable' not in s or 'NORMAL_QUOTE' not in s:continue
   regions=[]
   for key in ['let canonical =','let quote =','let creator_fee_bps =']:
    for match in re.finditer(re.escape(key),s):regions.append(s[max(0,match.start()-50):match.start()+500])
   if regions:
    h=hashlib.sha256(('\n'.join(regions)).encode()).hexdigest();variants.setdefault(h,{'paths':[],'regions':regions})['paths'].append(m.name)
 result.append({'archive':str(p.relative_to(R)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'rate_load_names':names,'variants':variants})
 print(p.name,'rate_load_names',len(names),'unique relevant source variants',len(variants),flush=True)
(J/'prior-compressed.json').write_text(json.dumps(result,indent=2)+'\n')
for item in result:
 for v in item['variants'].values():print(v['paths'][0],*v['regions'][:4],sep='\n')
