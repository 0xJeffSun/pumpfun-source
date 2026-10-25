#!/usr/bin/env python3
"""Inspect historical signed bytes and RPC metadata; never execute a transaction."""
from pathlib import Path
import base64,hashlib,json,struct
from solders.transaction import VersionedTransaction
from solders.pubkey import Pubkey
ROOT=Path(__file__).resolve().parent
FEES=Pubkey.from_string('pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ'); ADMIN=Pubkey.from_string('8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8'); SYSTEM=Pubkey.default()
def b58(s):
 alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';n=0
 for c in s:n=n*58+alphabet.index(c)
 return b'\0'*(len(s)-len(s.lstrip('1')))+n.to_bytes((n.bit_length()+7)//8,'big')
out={'scope':'Read-only analysis. Signatures cryptographically verified; transactions NOT executed. Historical RPC metadata is from the August 2025 deployment, not proof of behavior of the later captured October 2026 executable.','transactions':[]}
for index in [81,80]:
 path=ROOT/f'transactions/admin-success-{index}.json';capture=json.loads(path.read_text());r=capture['response']['result'];raw=base64.b64decode(r['transaction'][0]);tx=VersionedTransaction.from_bytes(raw);m=tx.message;keys=list(m.account_keys)
 assert len(tx.signatures)==1 and tx.verify_with_results()==[True] and keys[0]==ADMIN
 assert len(m.instructions)==1 and not m.address_table_lookups
 ix=m.instructions[0];assert keys[ix.program_id_index]==FEES and bytes(ix.data)==bytes.fromhex('3ea214857941911b')
 accounts=[keys[i] for i in ix.accounts];assert len(accounts)==6 and accounts[0]==ADMIN and accounts[2]==SYSTEM and accounts[5]==FEES
 config,bump=Pubkey.find_program_address([b'fee_config',bytes(accounts[3])],FEES);event_authority,event_bump=Pubkey.find_program_address([b'__event_authority'],FEES)
 assert config==accounts[1] and event_authority==accounts[4]
 inners=r['meta']['innerInstructions'];assert len(inners)==1 and inners[0]['index']==0 and len(inners[0]['instructions'])==2
 create,event=inners[0]['instructions'];assert keys[create['programIdIndex']]==SYSTEM and [keys[i] for i in create['accounts']]==[ADMIN,config]
 data=b58(create['data']);tag,lamports,space=struct.unpack_from('<IQQ',data);owner=Pubkey.from_bytes(data[20:52]);assert len(data)==52 and tag==0 and space==2512 and owner==FEES and lamports==18374400
 assert keys[event['programIdIndex']]==FEES and [keys[i] for i in event['accounts']]==[event_authority]
 eventdata=b58(event['data']);assert eventdata[:8]==bytes.fromhex('e445a52e51cb9a1d') and eventdata[8:16]==bytes.fromhex('598af4e60a38e27e') and len(eventdata)==88
 stamp=struct.unpack_from('<q',eventdata,16)[0];event_admin=Pubkey.from_bytes(eventdata[24:56]);event_config=Pubkey.from_bytes(eventdata[56:88]);assert event_admin==ADMIN and event_config==config and stamp==r['blockTime']
 logdata=[base64.b64decode(l.removeprefix('Program data: ')) for l in r['meta']['logMessages'] if l.startswith('Program data: ')];assert logdata==[eventdata[8:]]
 assert r['meta']['err'] is None and r['meta']['preBalances'][1]==0 and r['meta']['postBalances'][1]==lamports
 assert r['meta']['preBalances'][0]-r['meta']['postBalances'][0]==lamports+r['meta']['fee']
 out['transactions'].append({'rpc_capture_file':str(path.relative_to(ROOT)),'rpc_capture_sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'signature':str(tx.signatures[0]),'signature_verification':tx.verify_with_results(),'raw_transaction_sha256':hashlib.sha256(raw).hexdigest(),'raw_transaction_bytes':len(raw),'slot':r['slot'],'timestamp':stamp,'recent_blockhash':str(m.recent_blockhash),'message_version':r['version'],'required_signer':str(ADMIN),'config_program_id':str(accounts[3]),'fee_config':str(config),'fee_config_bump':bump,'event_authority':str(event_authority),'event_authority_bump':event_bump,'initializer_data_hex':bytes(ix.data).hex(),'system_create_account':{'lamports':lamports,'space':space,'owner':str(owner),'raw_data_hex':data.hex()},'event_log_data_hex':eventdata[8:].hex(),'event_cpi_data_hex':eventdata.hex(),'admin_pre_lamports':r['meta']['preBalances'][0],'admin_post_lamports':r['meta']['postBalances'][0],'transaction_fee':r['meta']['fee'],'fee_config_pre_lamports':r['meta']['preBalances'][1],'fee_config_post_lamports':r['meta']['postBalances'][1],'address_lookup_tables':[],'all_message_accounts':[str(k) for k in keys]})
(ROOT/'historical-init-evidence.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({'genuine_signed_initializers':len(out['transactions']),'signatures_verified':True,'executed_transactions':0,'allocation_bytes':2512,'namespace_bumps':{r['config_program_id']:r['fee_config_bump'] for r in out['transactions']}},indent=2))
