from pathlib import Path
import json,hashlib,struct,sys,re
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'method'));from elf_reader import Elf
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();O=Elf(P/'inputs/original.so')
assert O.calls[190064]==579040 and O.calls[579296]==592712 and O.calls[579608]==591584 and O.calls[581384]==724336
assert O.b[579228:579232]+O.b[579236:579240]==bytes([208,8,159,4,74,175,16,58])
meta=(P/'evidence/original-592712.asm').read_text();assert [(int(a),int(v))for a,v in re.findall(r'u16\[r1\+(\d+)\] = (\d+)',meta)]==[(32,256),(66,0),(100,0),(134,0)]
a=json.loads((P/'baseline/pump_amm.json').read_text());b=json.loads((P/'proposal/pump_amm.json').read_text());x=next(i for i in a['instructions']if i['name']=='migrate_pool_coin_creator');assert x==next(i for i in b['instructions']if i['name']=='migrate_pool_coin_creator');assert [(i['name'],i.get('signer',False),i.get('writable',False))for i in x['accounts']]==[('pool',False,True),('sharing_config',False,False),('event_authority',False,False),('program',False,False)]
s=(P/'third-layer/sharing.rs').read_text();t=(P/'proposal/sharing.rs').read_text();old=next(l for l in s.splitlines()if'vec![208,8,159,4,74,175,16,58]'in l);start=t.index('   crate::pump_amm::cpi::migrate_pool_coin_creator(');end=t.index('   ))?;',start)+len('   ))?;');assert t==s.replace(old,t[start:end]);assert 'new_with_signer'not in t[start:end]and t[start:end].count('.to_account_info()')==5
assert struct.unpack('<BBhi',O.b[190088:190096])==(0x15,3,-423,2)
for n,h in json.loads((P/'manifest.json').read_text()).items():assert H(P/n)==h,n
print(json.dumps({'passed':True,'fourth_only_source_change':1,'fourth_idl_changes':0,'combined_layers':2,'builds':0,'target_executions':0,'recursive_callee_proof':False}))
