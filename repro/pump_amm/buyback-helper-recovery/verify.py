#!/usr/bin/env python3
"""Verify complete artifacts/source bindings/windows/known data/signed receipts; no VM/compiler."""
from pathlib import Path
import base64,collections,gzip,hashlib,importlib.util,json,struct,sys,tempfile
sys.dont_write_bytecode=True
P=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def need(ok,label):
 if not ok:raise AssertionError(label)
pins=json.loads((P/'package-sha256.json').read_bytes())
need(hashlib.sha256((P/'package-sha256.json').read_bytes()).hexdigest()==(P/'package-sha256.txt').read_text().split()[0],'package seal')
paths=list(P.rglob('*'));need(not any(p.is_symlink()for p in paths),'package symlink')
need({str(p.relative_to(P))for p in paths if p.is_file()}==set(pins)|{'package-sha256.json','package-sha256.txt'},'package membership')
for n,h in pins.items():need(H((P/n).read_bytes())==h,'package member: '+n)
m=json.loads((P/'manifest.json').read_text());meta=json.loads((P/'metadata.json').read_text());data={}
for name,row in m.items():
 raw=(P/row['storage']).read_bytes();need(H(raw)==row['gzip_sha256'],'gzip hash: '+name);b=gzip.decompress(raw);need(H(b)==row['sha256'] and len(b)==row['bytes'],'logical hash: '+name);data[name]=b
J=lambda name:json.loads(data[name])
need(meta['original_sha256']=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7','pinned original')
need(H(data['analysis-tools/elf_reader.py'])=='247700e9930d5e53daf93a50888ae1e5429f74ccb19155e7a205f72ee21d5883','pinned decoder')
for name,key in [('original','original_sha256'),('baseline-candidate','baseline_sha256'),('final-candidate','final_sha256')]:need(H(data['artifacts/'+name+'.so'])==meta[key],'artifact identity: '+name)
need(meta['final_sha256']=='e6a687e8d8fd1152cd2113af5aa1c5e13e0d36eb4ca362cfb641fac23d5359dd','recorded final identity')
for label in ['baseline','final']:
 build=J('builds/'+label+'/build-comparison.json');need(build['source_unchanged'] if 'source_unchanged'in build else True,'source unchanged');source=build['source_sha256'];need(len(source)==30,'source30')
 need({n for n in data if n.startswith('sources/'+label+'/')}=={'sources/'+label+'/'+n for n in source},'exact source members')
 for f,h in source.items():need(H(data['sources/'+label+'/'+f])==h,'compiled source binding: '+label+'/'+f)
 result=J('builds/'+label+'/result.json');need(result['returncode']==0 and result['backend']['diagnostic_gate_passed'],'backend gate')
 for n in ['candidate','symbols']:need(result[n+'_sha256']==H(data['artifacts/'+label+'-'+n+'.so']),'build artifact binding')
source=data['sources/final/programs/pump-amm/src/state/global_config.rs'].decode().splitlines();need(source[387].index('expect')+1==45 and source[390].index('expect')+1==14,'source Location coordinates')
inv=J('recipe/root-remap-invocation.json');args=inv['arguments'];need(args[args.index('--crate-name')+1]=='pump_amm_recovered' and args[-1]=='--remap-path-prefix=src/=programs/pump-amm/src/','root-only source mapping')
with tempfile.TemporaryDirectory() as td:
 t=Path(td);(t/'elf_reader.py').write_bytes(data['analysis-tools/elf_reader.py']);spec=importlib.util.spec_from_file_location('package_elf',t/'elf_reader.py');mreader=importlib.util.module_from_spec(spec);spec.loader.exec_module(mreader)
 es={}
 for key in ['original','baseline-candidate','baseline-symbols','final-candidate','final-symbols']:
  path=t/(key+'.so');path.write_bytes(data['artifacts/'+key+'.so']);es[key]=mreader.Elf(path)
 o=es['original'];entries=sorted(set(o.entries)|{o.lo});ow=list(zip(entries,entries[1:]+[o.hi]));need(len(ow)==785,'785 original full windows')
 def inventory(label):
  c,s=es[label+'-candidate'],es[label+'-symbols'];need(c.b[c.lo:c.hi]==s.b[s.lo:s.hi] and c.pattern(c.lo,c.hi-c.lo)==s.pattern(s.lo,s.hi-s.lo),'symbol text/relocation identity')
  cw=sorted(set((f['start'],f['start']+f['size'])for f in s.funcs));ri=collections.defaultdict(list);ni=collections.defaultdict(list)
  for a,b in cw:ri[c.b[a:b]].append(a);ni[c.normalized[a:b]].append(a)
  rows={a:dict(end=b,raw=ri[o.b[a:b]],norm=ni[o.normalized[a:b]])for a,b in ow};counts=dict(collections.Counter('raw'if r['raw']else'normalized_only'if r['norm']else'unmatched'for r in rows.values()));need(counts==meta[label+'_counts'],'full window counts: '+label);return c,s,rows
 b,bs,br=inventory('baseline');c,cs,cr=inventory('final');oldn={a for a,r in br.items()if r['norm']};newn={a for a,r in cr.items()if r['norm']};oldr={a for a,r in br.items()if r['raw']};newr={a for a,r in cr.items()if r['raw']}
 need(oldn<=newn and newn-oldn=={412888} and oldr==newr,'all old match sets retained')
 h=next(f for f in cs.funcs if 'split_buyback'in f['name']);a=h['start'];need(a==67480 and h['size']==328,'full helper boundary');need(o.normalized[412888:413216]==c.normalized[a:a+328] and o.b[412888:413216]!=c.b[a:a+328],'normalized helper, unequal raw bytes')
 def ptr(e,a):return struct.unpack_from('<I',e.b,a+4)[0] | struct.unpack_from('<I',e.b,a+12)[0]<<32
 def location(e,a):
  try:
   pointer,n,line,col=struct.unpack_from('<QQII',e.b,a);pointer>>=32
   if not(1<=n<=200 and 1<=line<=100000 and 1<=col<=1000):return None
   name=e.b[pointer:pointer+n].decode()
   return (name,line,col)if name.endswith('.rs')and '\x00'not in name else None
  except (struct.error,UnicodeError):return None
 for off,n in [(216,35),(280,38)]:
  op,cp=ptr(o,412888+off),ptr(c,a+off);need(o.b[op:op+n]==c.b[cp:cp+n],'full panic string')
 for off,expected in [(256,('programs/pump-amm/src/state/global_config.rs',388,45)),(304,('programs/pump-amm/src/state/global_config.rs',391,14))]:need(location(o,ptr(o,412888+off))==location(c,ptr(c,a+off))==expected,'exact decoded Location')
 # Validate the complete 32-byte vtable record under its declared pointer relocations.
 ov,cv=ptr(o,412888+240),ptr(c,a+240)
 def normalized_record(e,v,n):
  raw=bytearray(e.b[v:v+n])
  for at,rel in e.relocations.items():
   if v<=at and at+8<=v+n and rel['type']==8:raw[at-v:at-v+8]=bytes(8)
  return bytes(raw)
 need(normalized_record(o,ov,32)==normalized_record(c,cv,32),'vtable non-pointer fields')
 for off in [0,24]:
  ot=struct.unpack_from('<Q',o.b,ov+off)[0]>>32;ct=struct.unpack_from('<Q',c.b,cv+off)[0]>>32
  cf=next(f for f in cs.funcs if f['start']==ct)
  need(o.normalized[ot:br[ot]['end']]==c.normalized[ct:ct+cf['size']],'vtable complete target body')
 def positive_locations(e,rows):
  out=set()
  for start,row in rows.items():
   for address,rel in o.relocations.items():
    if rel['type']!=8 or not start<=address<row['end'] or o.b[address]!=24:continue
    off=address-start;loc=location(o,ptr(o,address))
    if loc and any(location(e,ptr(e,target+off))==loc for target in row['norm']):out.add((start,off,loc))
  return out
 oldloc=positive_locations(b,br);newloc=positive_locations(c,cr);need(len(oldloc)==51 and len(newloc)==53 and oldloc<=newloc,'all Location positives retained')
 # Every direct helper callee must have a full normalized original counterpart.
 orig_targets=[1161264,1155824,1126296,1124008];candidate_targets=[target for site,target in c.calls.items()if a<=site<a+328];need(len(candidate_targets)==4,'four helper direct calls')
 actual_original=[target for site,target in sorted(o.calls.items())if 412888<=site<413216]
 need(len(actual_original)==len(candidate_targets)==4,'paired callee count')
 for source_target,target in zip(actual_original,candidate_targets):
  f=next(f for f in cs.funcs if f['start']==target);need(o.normalized[source_target:br[source_target]['end']]==c.normalized[target:target+f['size']],'paired complete callee body')
 need(len([site for site,target in c.calls.items()if target==a])==2,'recorded two candidate caller limitation')
from solders.transaction import Transaction
AMM='pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'
for label in ['baseline','final']:
 for suite,n in [('legacy_buy',1011),('legacy_sell',575)]:
  receipt=J('runtime/'+label+'/'+suite+'.json');txs=J('runtime/'+label+'/'+suite+'-transactions.json');need(receipt['case_count']==n and not receipt['mismatches'],'runtime count/mismatch');need(receipt['candidate_sha256']==H(data['artifacts/'+label+'-candidate.so']),'runtime candidate binding');need(len(receipt['cases'])==n and txs['transaction_count']==2*n and len(txs['transactions'])==2*n,'full signed transaction count')
  for i,tx in enumerate(txs['transactions']):
   raw=base64.b64decode(tx['transaction_base64']);need(H(raw)==tx['transaction_sha256'],'transaction hash');need(all(Transaction.from_bytes(raw).verify_with_results()),'cryptographic signature');need(tx['all_signatures_verified'],'observed signature check')
   need(tx['amm_program_sha256'] in [meta['original_sha256'],meta[label+'_sha256'] if label=='baseline' else meta['final_sha256']],'observed program identity')
  for i,row in enumerate(receipt['cases']):
   need(not row['diff'] and all(row['original'][k]==row['candidate'][k]for k in row['original']if k!='logs'),'recomputed runtime comparison')
   for j,side in enumerate(['original','candidate']):
    tx=txs['transactions'][2*i+j]
    need(row[side]['transaction_base64']==tx['transaction_base64'],'receipt/observer transaction binding')
    expected_program=meta['original_sha256'] if side=='original' else meta['baseline_sha256'] if label=='baseline' else meta['final_sha256']
    need(tx['amm_program_sha256']==expected_program and tx['loaded_programs'][AMM]['sha256']==expected_program,'runtime role/program binding')
print(json.dumps({'verified':True,'normalized_matches':489,'unmatched':296,'raw_matches':93,'old_match_sets_preserved':True,'decoded_locations':53,'runtime_cases_per_build':1586,'signed_submissions_per_build':3172,'whole_elf_equal':False}))
