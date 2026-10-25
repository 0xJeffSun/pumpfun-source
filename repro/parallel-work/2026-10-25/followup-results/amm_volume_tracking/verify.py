#!/usr/bin/env python3
"""Offline package consistency checks only; does not execute programs or harnesses."""
from pathlib import Path
import hashlib,json,struct,re,gzip
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def read(n):return (P/n).read_bytes()
def js(n):return json.loads(read(n))
def require(ok,message):
 if not ok:raise ValueError(message)
def main():
 manifest=js('SHA256SUMS.json')
 actual={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file() and x.name!='SHA256SUMS.json'}
 require(actual==set(manifest),'manifest file set')
 for n,h in manifest.items():require(H(read(n))==h,'hash '+n)
 for x in js('provenance.json'):
  b=read(x['path']);require(H(b)==x['sha256'] and len(b)==x['size'],'provenance '+x['path'])
  if 'git_blob' in x and not any(k in x for k in ['member','line_start']):require(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==x['git_blob'],'Git blob '+x['path'])
 r=js('result.json');b=read('inputs/evidence/original/pump_amm/deployed.so');require(H(b)==r['original_sha256'],'original')
 def ins(a):return struct.unpack_from('<BBhi',b,a)
 def target(a):return a+8+8*ins(a)[3]
 shoff=struct.unpack_from('<Q',b,40)[0];sz,n,ni=struct.unpack_from('<HHH',b,58)
 hs=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*sz) for i in range(n)];h=hs[ni];names=b[h[4]:h[4]+h[5]]
 sections={names[h[0]:].split(b'\0',1)[0].decode():h for h in hs};t=sections['.text'];h=sections['.rel.dyn']
 rel={struct.unpack_from('<QQ',b,i)[0]:struct.unpack_from('<QQ',b,i)[1]&0xffffffff for i in range(h[4],h[4]+h[5],16)}
 callers=[dict(site=a,target=target(a)) for a in range(t[4],t[4]+t[5],8) if b[a:a+2]==b'\x85\x10' and rel.get(a)!=10 and target(a)==0x6d408]
 require(callers==r['claim_update_direct_callers']==[dict(site=0x5a640,target=0x6d408)],'complete direct caller census')
 for w in r['windows']:
  lo,hi=w['byte_start'],w['byte_end_exclusive'];require(H(b[lo:hi])==w['sha256'],'window '+w['name'])
  for c in w['calls']:require(b[c['site']:c['site']+2]==b'\x85\x10' and target(c['site'])==c['target'],'call edge')
 idl=js('inputs/evidence/upstream/pump_amm.json')
 for name,a,branch,block,call,wrapper,bodycall,body in [('buy',0xdbf58,0xdbf68,0xdca88,0xdcad8,0xe7648,0xe78a0,0x376b0),('buy_exact_quote_in',0xdbf78,0xdbf88,0xdcaf8,0xdcb48,0xe7d88,0xe7fe0,0x3a5a0)]:
  ix=next(i for i in idl['instructions'] if i['name']==name)
  require(b[a]==0x18 and b[a+4:a+8]+b[a+12:a+16]==bytes(ix['discriminator']),'IDL dispatch')
  require(ins(branch)[0:2]==(0x1d,0x43) and branch+8+8*ins(branch)[2]==block,'dispatch branch')
  require(target(call)==wrapper and target(bodycall)==body,'wrapper body')
  require(not next(x for x in ix['accounts'] if x['name']=='global_volume_accumulator').get('writable',False),'readonly global IDL')
 # Verify all retained call and branch annotations against original bytes, not just report anchors.
 count=0
 for f in (P/'inputs').rglob('*.asm'):
  for line in f.read_text().splitlines():
   a=int(line.split(':',1)[0],16)
   m=re.search(r'; call (0x[0-9a-f]+)',line)
   if m:require(b[a]==0x85 and target(a)==int(m[1],16),'assembly call '+line);count+=1
   m=re.search(r'; branch (0x[0-9a-f]+)',line)
   if m:require(a+8+8*ins(a)[2]==int(m[1],16),'assembly branch '+line)
 for name,spill in [('buy_body.asm','0x580'),('exact_body.asm','0x668')]:
  s=read('inputs/repro/pump_amm/legacy-buy-thirty-five/recovery-evidence/'+name).decode()
  require(len(re.findall(r'\[r10 - '+spill+r'\]',s))==2,'bool spill references')
  require('; call 0x6d408' not in s,'no direct updater in buy')
 require(target(0x5a640)==0x6d408 and ins(0x5a638)==(0xb7,5,0,0),'claim zero volume argument')
 receipt=json.loads(gzip.decompress(read('inputs/repro/pump_amm/pool-serialization-thirty-seven/legacy_buy-differential.json.gz')))
 require(receipt['original_sha256']==r['original_sha256'] and receipt['candidate_sha256']==r['candidate_sha256'],'receipt identities')
 require(H(read('inputs/saved-current-buy-harness.py'))==receipt['script_sha256'],'saved harness identity')
 rows=js('saved-cases.json');active=0
 for x in rows:
  c=receipt['cases'][x['index']];require(c['case']==x['case'] and c['instruction']==x['instruction'] and c['diff']==x['diff'],'saved selection')
  for kind,z in x['accounts'].items():
   require(c['original']['before'].get(z['key'])==z['before'] and c['original']['after'][z['key']]==z['after'],'saved snapshot')
   require(c['candidate']['after'][z['key']]==z['after'],'candidate snapshot')
  if x['case']=='global-volume-times=(1234500000, 1234600000, 86400)':
   require(c['original']['error'] is None and c['candidate']['error'] is None,'active success')
   g=x['accounts']['GlobalVolumeAccumulator'];require(g['before']==g['after'],'unchanged global')
   require(x['user_counters']==[0,0,0,0] and x['nonzero_supply_buckets']==0,'active counter boundary');active+=1
 require(active==2 and len(rows)==30,'case count')
 print(json.dumps({'status':'PASS','files':len(manifest),'verified_call_annotations':count,'saved_cases':len(rows),'active_time_zero_supply_cases':active,'scope':'integrity, dispatch/call edges, bool spill use and saved-state projections; not exhaustive semantics/security'}))
if __name__=='__main__':main()
