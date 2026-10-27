"""Verify retained finalized-RPC loader history and captured account capacity."""
from pathlib import Path
import hashlib,json,struct,tarfile,io
P=Path(__file__).resolve().parent;R=P.parents[2];ALPHABET='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';LOADER='BPFLoaderUpgradeab1e11111111111111111111111'
H=lambda b:hashlib.sha256(b).hexdigest()
def read(n):return json.loads((P/n).read_bytes())
def b58decode(s):
 n=0
 for c in s:n=n*58+ALPHABET.index(c)
 return b'\0'*(len(s)-len(s.lstrip('1')))+(n.to_bytes((n.bit_length()+7)//8,'big')if n else b'')
def derive():
 schema=read('source-provenance.json');raw=(P/schema['archive']).read_bytes();assert H(raw)==schema['package_archive_sha256']
 with tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz')as archive:assert H(archive.extractfile(schema['archive_member']).read())==schema['sha256']==H((P/'loader-instruction.rs').read_bytes())
 cap=json.loads((R/'evidence/dependencies/donation_relay/capture.json').read_bytes());program=cap['program'];pd=cap['programdata']
 req=read('rpc/request.json');assert req['method']=='getSignaturesForAddress'and req['params']==[pd,{'limit':100,'commitment':'finalized'}]
 signatures=read('rpc/response.json');assert signatures.get('error')is None;signatures=signatures['result'];assert len(signatures)==13<100 and all(s['err']is None for s in signatures)
 requests=read('rpc/transaction-requests.json');assert [r['id']for r in requests]==list(range(13))
 for r in requests:assert r['method']=='getTransaction'and r['params']==[signatures[r['id']]['signature'],{'encoding':'json','commitment':'finalized','maxSupportedTransactionVersion':0}]
 first=read('rpc/transactions.json');rows={r['id']:r for r in first if r.get('result')}
 failed={r['id']for r in first if not r.get('result')};assert failed=={6,7,8,9}and all(r['error']['code']==429 for r in first if r['id']in failed)
 for reqfile,responsefile in [('rpc/single-request-6.json','rpc/single-response-6.json'),('rpc/retry-requests-789.json','rpc/retry-responses-789.json')]:
  rq=read(reqfile);rq=rq if isinstance(rq,list)else[rq];resp=read(responsefile);resp=resp if isinstance(resp,list)else[resp];assert {r['id']for r in rq}=={r['id']for r in resp}
  for r in rq:assert r==requests[r['id']]
  for r in resp:assert r['id']not in rows and r.get('result');rows[r['id']]=r
 assert sorted(rows)==list(range(13))
 events=[];all_instructions=[]
 for i,row in sorted(rows.items(),key=lambda x:x[1]['result']['slot']):
  tx=row['result'];assert tx['slot']==signatures[i]['slot']and tx['transaction']['signatures'][0]==signatures[i]['signature']and tx['meta']['err']is None
  keys=tx['transaction']['message']['accountKeys'];loaded=tx['meta'].get('loadedAddresses',{});keys=keys+loaded.get('writable',[])+loaded.get('readonly',[])
  instructions=[('top',j,ins)for j,ins in enumerate(tx['transaction']['message']['instructions'])]
  for inner in tx['meta'].get('innerInstructions')or[]:instructions += [('inner',inner['index'],ins)for ins in inner['instructions']]
  for level,index,ins in instructions:
   if keys[ins['programIdIndex']]!=LOADER:continue
   data=b58decode(ins['data']);assert len(data)>=4;tag=struct.unpack_from('<I',data)[0];accounts=[keys[a]for a in ins['accounts']];record=dict(slot=tx['slot'],signature=signatures[i]['signature'],level=level,index=index,tag=tag,accounts=accounts,data_hex=data.hex());all_instructions.append(record)
   if pd not in accounts:continue
   assert level=='top'and tag in (2,3,4,6)
   if tag==2:
    assert len(data)==12 and accounts[1:3]==[pd,program];record.update(action='deploy',capacity=struct.unpack_from('<Q',data,4)[0])
   elif tag==6:
    assert len(data)==8 and accounts[:2]==[pd,program];record.update(action='extend',additional_bytes=struct.unpack_from('<I',data,4)[0])
   elif tag==3:
    assert len(data)==4 and accounts[:2]==[pd,program];record.update(action='upgrade')
   else:
    assert len(data)==4 and accounts[0]==pd and accounts[2]==cap['upgrade_authority'];record.update(action='set_authority')
   events.append(record)
 assert max(e['slot'] for e in events) <= min(cap['context_slots'])
 assert events[0]['action']=='deploy'and sum(e['action']=='deploy'for e in events)==1
 capacity=0;extensions=[];last_code_slot=None
 for e in events:
  if e['action']=='deploy':capacity=e['capacity'];last_code_slot=e['slot']
  elif e['action']=='extend':capacity+=e['additional_bytes'];extensions.append(e['additional_bytes'])
  elif e['action']=='upgrade':last_code_slot=e['slot']
 assert extensions==[33504,100000,100000,40000,10000]and capacity==830448 and last_code_slot==cap['last_deploy_slot']
 pdbytes=(R/'evidence/dependencies/donation_relay/programdata-account.bin').read_bytes();elf=(R/'evidence/dependencies/donation_relay/deployed.so').read_bytes();assert len(pdbytes)==capacity+45 and pdbytes[45:]==elf and H(pdbytes)==cap['programdata_sha256']and H(elf)==cap['payload_sha256'];assert struct.unpack_from('<I',pdbytes)[0]==3 and struct.unpack_from('<Q',pdbytes,4)[0]==last_code_slot and pdbytes[12]==1 and b58decode(cap['upgrade_authority'])==pdbytes[13:45]
 h=struct.unpack_from('<16sHHIQQQIHHHHHH',elf);extent=h[6]+h[11]*h[12];assert extent==818280 and not any(elf[extent:])
 return dict(provider='https://api.mainnet-beta.solana.com',commitment_requested='finalized',signature_rows=len(signatures),successful_transactions=len(rows),initial_capacity=events[0]['capacity'],extensions=extensions,derived_capacity=capacity,captured_capacity=len(elf),programdata_bytes=len(pdbytes),last_upgrade_slot=last_code_slot,meaningful_elf_extent=extent,unallocated_in_elf_tail_bytes=len(elf)-extent,tail_all_zero=True,events=events,all_loader_instructions=all_instructions,cryptographic_chain_proof=False,rust_build_identity_proven=False)
def main():
 manifest=read('manifest.json');assert set(manifest)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}
 for n,h in manifest.items():assert H((P/n).read_bytes())==h
 for n,h in read('parents.json').items():assert H((R/n).read_bytes())==h
 assert derive()==read('report.json');print('PASS: all 13 successful RPC transactions decoded; deploy plus five extensions exactly reconstruct 830448-byte captured capacity and 12168-byte zero tail; Rust byte identity remains open')
if __name__=='__main__':main()
