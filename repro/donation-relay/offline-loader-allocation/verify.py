"""Offline only. Default verifies static bindings; --execute runs a fresh local VM."""
from pathlib import Path
import argparse,gzip,hashlib,json,struct
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):return json.loads(p.read_bytes())
def inputs():
    meta=read(ROOT/'repro/donation-relay/access-control-layout-artifact/metadata.json')['recovered']['candidate']
    elf=gzip.decompress((ROOT/meta['path']).read_bytes())
    assert len(elf)==meta['bytes'] and sha(elf)==meta['sha256']
    provenance=read(ROOT/'repro/donation-relay/allocation-provenance/report.json')
    capacity=provenance['initial_capacity']+sum(provenance['extensions'])
    assert capacity==provenance['derived_capacity']==provenance['captured_capacity']
    assert len(elf)==provenance['meaningful_elf_extent'] and capacity>=len(elf)
    original=(ROOT/'evidence/dependencies/donation_relay/deployed.so').read_bytes()
    assert len(original)==capacity
    return elf,capacity,original

def execute(elf,CAPACITY,original):
    import solders
    from solders.litesvm import LiteSVM
    from solders.pubkey import Pubkey
    from solders.keypair import Keypair
    from solders.transaction import Transaction
    from solders.instruction import Instruction,AccountMeta
    from solders.system_program import create_account
    from solders.compute_budget import set_compute_unit_limit
    from solders.sysvar import RENT,CLOCK
    from solders.transaction_metadata import FailedTransactionMetadata
    loader=Pubkey.from_string('BPFLoaderUpgradeab1e11111111111111111111111');system=Pubkey.default()
    # Fixed synthetic secrets for repeatable local addresses, never funded on any network.
    payer=Keypair.from_seed(bytes([31])*32);buffer=Keypair.from_seed(bytes([32])*32);program=Keypair.from_seed(bytes([33])*32)
    pdata,_=Pubkey.find_program_address([bytes(program.pubkey())],loader)
    vm=LiteSVM().with_sigverify(True).with_blockhash_check(True).with_transaction_history(0)
    vm.airdrop(payer.pubkey(),10**12)
    receipts=[]
    def send(label,ixs,signers):
     tx=Transaction.new_signed_with_payer(ixs,payer.pubkey(),signers,vm.latest_blockhash());raw=bytes(tx);assert len(raw)<=1232,(label,len(raw))
     result=vm.send_transaction(tx)
     if isinstance(result,FailedTransactionMetadata):
      raise RuntimeError((label,result))
     receipts.append({'label':label,'transaction_bytes':len(raw),'signature':str(tx.signatures[0]),'compute_units':result.compute_units_consumed()})
     return result
    meta=lambda k,s=False,w=False:AccountMeta(k,s,w)
    
    send('create-and-initialize-buffer',[create_account(dict(from_pubkey=payer.pubkey(),to_pubkey=buffer.pubkey(),lamports=vm.minimum_balance_for_rent_exemption(37+len(elf)),space=37+len(elf),owner=loader)),Instruction(loader,struct.pack('<I',0),[meta(buffer.pubkey(),w=True),meta(payer.pubkey())])],[payer,buffer])
    for offset in range(0,len(elf),900):
     chunk=elf[offset:offset+900]
     send('write-'+str(offset),[Instruction(loader,struct.pack('<IIQ',1,offset,len(chunk))+chunk,[meta(buffer.pubkey(),w=True),meta(payer.pubkey(),s=True)])],[payer])
    buf=vm.get_account(buffer.pubkey());assert bytes(buf.data)[37:]==elf
    result=send('create-program-and-deploy',[set_compute_unit_limit(1400000),create_account(dict(from_pubkey=payer.pubkey(),to_pubkey=program.pubkey(),lamports=vm.minimum_balance_for_rent_exemption(36),space=36,owner=loader)),Instruction(loader,struct.pack('<IQ',2,CAPACITY),[meta(payer.pubkey(),s=True,w=True),meta(pdata,w=True),meta(program.pubkey(),w=True),meta(buffer.pubkey(),w=True),meta(RENT),meta(CLOCK),meta(system),meta(payer.pubkey(),s=True)])],[payer,program])
    account=vm.get_account(pdata);data=bytes(account.data);payload=data[45:]
    assert len(data)==45+CAPACITY
    assert payload[:len(elf)]==elf
    assert len(payload[len(elf):])==CAPACITY-len(elf) and not any(payload[len(elf):])
    assert vm.get_account(program.pubkey()).executable
    report={'scope':'Offline local LiteSVM only; no RPC or network accounts. Payload allocated by real upgradeable loader transactions, never zero-padded by this script.','solders_version':solders.__version__,'elf_bytes':len(elf),'elf_sha256':hashlib.sha256(elf).hexdigest(),'max_data_len':CAPACITY,'programdata_account_bytes':len(data),'payload_bytes':len(payload),'payload_sha256':hashlib.sha256(payload).hexdigest(),'payload_prefix_equal':payload[:len(elf)]==elf,'allocated_zero_tail_bytes':len(payload)-len(elf),'allocation_state_tag':struct.unpack_from('<I',data)[0],'deploy_slot':struct.unpack_from('<Q',data,4)[0],'program_executable':True,'transactions':len(receipts),'write_transactions':sum(x['label'].startswith('write-')for x in receipts),'deployment_logs':result.logs(),'deployment_compute_units':result.compute_units_consumed(),'whole_original_payload_equal':payload==original,'receipts':receipts}
    return report

def verify_static():
    manifest=read(HERE/'manifest.json')
    prefix=HERE.relative_to(ROOT)
    listed={n for n in manifest['bindings'] if Path(n).is_relative_to(prefix)}
    actual={str(p.relative_to(ROOT)) for p in HERE.rglob('*') if p.is_file() and p.name!='manifest.json' and '__pycache__' not in p.parts}
    assert listed==actual,'Packet membership changed'
    for name,digest in manifest['bindings'].items():
        assert sha((ROOT/name).read_bytes())==digest,name
    elf,capacity,original=inputs()
    report=read(HERE/'receipt.json')
    assert report['elf_sha256']==sha(elf) and report['elf_bytes']==len(elf)
    assert report['max_data_len']==report['payload_bytes']==capacity
    assert report['programdata_account_bytes']==capacity+45
    assert report['allocated_zero_tail_bytes']==capacity-len(elf)
    assert report['whole_original_payload_equal'] is False and elf!=original[:len(elf)]
    assert report['payload_prefix_equal'] and report['program_executable']
    assert report['transactions']==len(report['receipts'])==report['write_transactions']+2
    assert report['write_transactions']==(len(elf)+899)//900
    assert all(x['transaction_bytes']<=1232 for x in report['receipts'])
    return elf,capacity,original

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--execute',action='store_true',help='Run signed transactions in a fresh local LiteSVM; no RPC')
    args=parser.parse_args()
    values=verify_static()
    if args.execute:
        actual=execute(*values)
        expected=read(HERE/'receipt.json')
        assert actual==expected,'Fresh execution differs from frozen receipt'
    print(json.dumps({'static_bindings_verified':True,'fresh_vm_executed':args.execute,'recorded_transactions':read(HERE/'receipt.json')['transactions'],'whole_file_equal':False,'network_rpc_used':False},indent=2))
if __name__=='__main__':main()
