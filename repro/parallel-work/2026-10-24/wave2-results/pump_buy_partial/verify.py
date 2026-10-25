#!/usr/bin/env python3
"""Static retained-evidence verifier. No harness import, builds or execution."""
from pathlib import Path
import json,hashlib,gzip,base64,struct,re,sys,collections
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads((P/p).read_text())
def derive():
 for e in J('inputs.json')+J('source-ranges.json'):
  assert H((P/e['path']).read_bytes())==e['sha256'],e['path']
 elf=(P/'evidence/original.so').read_bytes()
 assert H(elf)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
 # Resolve virtual addresses through ELF sections, never assume file offset identity.
 off=struct.unpack_from('<Q',elf,40)[0];size,num=struct.unpack_from('<HH',elf,58)
 sections=[struct.unpack_from('<IIQQQQIIQQ',elf,off+i*size) for i in range(num)]
 def raw(addr,n):
  s=next(s for s in sections if s[3]<=addr and addr+n<=s[3]+s[5] and s[1]!=8)
  return elf[s[4]+addr-s[3]:s[4]+addr-s[3]+n]
 ins={};window_hashes=[]
 for w in J('windows.json'):
  lo,hi=w['address_half_open'];pos=lo
  for line in (P/w['path']).read_text().splitlines():
   m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)',line);assert m
   addr=int(m[1],16); b=bytes.fromhex(m[2]);assert addr==pos and raw(addr,len(b))==b
   ins[addr]=b;pos+=len(b)
  assert pos==hi
  window_hashes.append(dict(address_half_open=[lo,hi],sha256=H(raw(lo,hi-lo))))
 sites=[0x128758,0x128768,0x128770,0x128930,0x147ce0,0x147cf0,0x147cf8,0x147d18,0x147e30,0x147e38,0x147e50,0x147e70,0x148270,0x148308,0x148418,0x148480,0x1485c8,0x148660,0x148698,0x1488c0,0x1489d8]
 control=[]
 for a in sites:
  b=ins[a];op,regs,delta,imm=struct.unpack('<BBhi',b)
  target=a+8+(imm if op==0x85 else delta)*8
  control.append(dict(address=hex(a),raw=b.hex(),target=hex(target),kind='call' if op==0x85 else 'branch'))
 matches=J('evidence/prior-filter.json')[0]['matches'];assert len(matches)==44
 receipts={n:json.loads(gzip.decompress((P/f'evidence/{n}.json.gz').read_bytes())) for n in ['buy','v3_configured_fee']}
 bindings=J('evidence/receipt-build-bindings.json')
 for n in receipts:
  b=next(b for b in bindings if b['receipt'].endswith('/'+n+'.json.gz'))
  assert H((P/f'evidence/{n}.json.gz').read_bytes())==b['receipt_sha256']
  assert b['executed_candidate_sha256']=='92575cd082bf76b332044a7d09371a9764db8b2cc40180bf1418f261945bbd6a'
 rows=[];excluded=[]
 for x in matches:
  n=Path(x['receipt']).name.removesuffix('.json.gz');i=int(x['json_pointer'].split('/')[-1]);r=receipts[n]['cases'][i];c=r['case'];assert c==x['case']
  if c.get('token_quote'):
   excluded.append(dict(receipt=n,pointer=x['json_pointer'],reason='explicit token quote, outside SOL scope'));continue
  assert r['match'] and not r.get('different_fields', []) and r['original']['error']==r['candidate']['error']
  out=dict(receipt=n,pointer=x['json_pointer'],case=c,row_sha256=H(json.dumps(r,sort_keys=True,separators=(',',':')).encode()),error=r['original']['error'])
  evs=r['original']['event_payloads'];out['event_count']=len(evs)
  if out['error'] is None:
   b=base64.b64decode(evs[0]);assert b[:8]==hashlib.sha256(b'event:TradeEvent').digest()[:8]
   offsets={'quote':40,'tokens':48,'virtual_quote':97,'virtual_tokens':105,'real_quote':113,'real_tokens':121,'protocol_bps':161,'protocol_fee':169,'creator_bps':209,'creator_fee':217}
   e={k:struct.unpack_from('<Q',b,v)[0] for k,v in offsets.items()};out['event_prefix']=e
   q=c['amount']*c['reserve_out']//(c['reserve_in']-c['amount'])+1
   assert e['quote']==q and e['tokens']==c['amount']
   assert e['virtual_quote']==c['reserve_out']+q and e['virtual_tokens']==c['reserve_in']-c['amount']
   assert e['protocol_fee']==(q*e['protocol_bps']+9999)//10000
   assert e['creator_fee']==(q*e['creator_bps']+9999)//10000
   if 'real_base' in c:assert e['real_tokens']==c['real_base']-c['amount']
   assert len(evs)==(2 if e['real_tokens']==0 else 1)
   if len(evs)==2:assert base64.b64decode(evs[1])[:8]==hashlib.sha256(b'event:CompleteEvent').digest()[:8]
   assert evs==r['candidate']['event_payloads']
  rows.append(out)
 assert len(rows)==38 and len(excluded)==6
 groups=[]
 for start in range(222,250,4):
  rr=[next(r for r in rows if r['receipt']=='buy' and r['pointer']==f'/cases/{i}') for i in range(start,start+4)]
  assert rr[0]['error']==rr[1]['error']==rr[2]['error']
  assert 'Custom(102)' in rr[3]['error']
  groups.append(dict(pointers=[r['pointer'] for r in rr],valid_error=rr[0]['error'],max_cost=rr[0]['case']['max_cost']))
 return dict(status='narrow_prerequisite_no_patch',implementation_checkpoint='8099031',source_changes=0,new_runtime_cases=0,selected=44,ordinary_SOL_rows=38,excluded_token_quote=excluded,successes=sum(r['error'] is None for r in rows),errors=dict(collections.Counter(str(r['error']) for r in rows)),rows=rows,trailing_groups=groups,original_windows=window_hashes,raw_control_sites=control,limitations=['No successful above-real-reserve row; no retained trailing=true plus above-real-reserve pair.','Raw register field offsets are not proven historical field names. Fee, residual and completion helper closure remains prerequisite.','Baseline inferred window bounds locate evidence, not recovered function identity.','No extension analysis, runtime or build; saved comparisons are bounded, whole ELF equality remains incomplete.'])
if __name__=='__main__':
 result=derive()
 if '--write' in sys.argv:(P/'result.json').write_text(json.dumps(result,indent=2,sort_keys=True)+'\n')
 else:
  assert result==J('result.json')
  for name,digest in J('manifest.json').items():assert H((P/name).read_bytes())==digest,name
  print(json.dumps(dict(verified=True,ordinary_SOL_rows=result['ordinary_SOL_rows'],successes=result['successes'],raw_windows=len(result['original_windows']),new_runtime_cases=0)))
