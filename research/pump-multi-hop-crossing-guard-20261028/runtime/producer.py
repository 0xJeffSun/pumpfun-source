from pathlib import Path
import importlib.util,sys,json,struct,gzip,hashlib
ROOT=Path('/workspace/pumpfun-source-latest');BASE=Path(__file__).resolve().parent
p=ROOT/'repro/pump/native-curve-partial-fortyeight/harness/pump_multi_hop_curve_differential.py';spec=importlib.util.spec_from_file_location('partial_curve',p);partial=importlib.util.module_from_spec(spec);spec.loader.exec_module(partial);h=partial.h
idl=json.loads((ROOT/'evidence/upstream/pump.json').read_text());fields=next(x for x in idl['types']if x['name']=='Global')['type']['fields'];sizes={'bool':1,'u8':1,'u64':8,'pubkey':32};offsets={};at=8
for field in fields:
 offsets[field['name']]=at;t=field['type'];at+=sizes[t] if isinstance(t,str)else sizes[t['array'][0]]*t['array'][1]
print('whitelist serialized offset',offsets['whitelist_pda'],flush=True)
def mutate(whitelisted,real_tokens=10**6):
 def m(vm,metas):
  key=h.PUMP_GLOBAL;account=vm.vm.get_account(key);d=bytearray(account.data);off=offsets['whitelist_pda'];d[off:off+32]=bytes(h.PAYER.pubkey())if whitelisted else bytes(32);vm.vm.set_account(key,h.Account(account.lamports,bytes(d),account.owner))
  key=h.CURVE;account=vm.vm.get_account(key);d=bytearray(account.data);d[8:48]=struct.pack('<QQQQQ',10**15,10**9,real_tokens,10**9,10**15);vm.vm.set_account(key,h.Account(max(account.lamports,10**12),bytes(d),account.owner))
 return m
rows=[];programs=[('original',None),('baseline',BASE/'baseline/candidate.so')]
if len(sys.argv)>1:programs.append(('fixed',BASE/sys.argv[1]/'candidate.so'))
for whitelisted,real_tokens in [(w,r) for w in [False,True] for r in [10**6,10**15]]:
 for amount in [10**8,10**9]:
  row={'whitelisted':whitelisted,'real_tokens':real_tokens,'amount':amount,'results':{}}
  for label,elf in programs:
   try:r=partial.invoke(False,amount,elf,mutate(whitelisted,real_tokens),1)
   except Exception as e:print(label,type(e).__name__,str(e),flush=True);raise
   row['results'][label]=r;print(whitelisted,real_tokens,amount,label,r['error'],len(r['events']),r['logs'][-4:],flush=True)
  for label,_ in programs[1:]:row[label+'_mismatches']=partial.compare(row['results']['original'],row['results'][label])
  rows.append(row)
out=BASE/'whitelist-runtime';out.mkdir(exist_ok=True)
(out/'cases.json.gz').write_bytes(gzip.compress(json.dumps({'cases':rows,'global_offsets':offsets,'fixture_sha256':hashlib.sha256(p.read_bytes()).hexdigest()},sort_keys=True).encode(),mtime=0))
print([(r['whitelisted'],r['amount'],{k:v for k,v in r.items()if k.endswith('_mismatches')})for r in rows])
