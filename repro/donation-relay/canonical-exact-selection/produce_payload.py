"""Execute the real offline loader and save its ProgramData payload.
Derived from the sealed allocation verifier; only addition saves VM-produced bytes.
No target bytes are used in the loader instruction construction.
"""
from pathlib import Path
import struct,hashlib,json,argparse
def execute(elf,CAPACITY,original,output):
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
    Path(output).write_bytes(payload)
    assert len(data)==45+CAPACITY
    assert payload[:len(elf)]==elf
    assert len(payload[len(elf):])==CAPACITY-len(elf) and not any(payload[len(elf):])
    assert vm.get_account(program.pubkey()).executable
    report={'scope':'Offline local LiteSVM only; no RPC or network accounts. Payload allocated by real upgradeable loader transactions, never zero-padded by this script.','solders_version':solders.__version__,'elf_bytes':len(elf),'elf_sha256':hashlib.sha256(elf).hexdigest(),'max_data_len':CAPACITY,'programdata_account_bytes':len(data),'payload_bytes':len(payload),'payload_sha256':hashlib.sha256(payload).hexdigest(),'payload_prefix_equal':payload[:len(elf)]==elf,'allocated_zero_tail_bytes':len(payload)-len(elf),'allocation_state_tag':struct.unpack_from('<I',data)[0],'deploy_slot':struct.unpack_from('<Q',data,4)[0],'program_executable':True,'transactions':len(receipts),'write_transactions':sum(x['label'].startswith('write-')for x in receipts),'deployment_logs':result.logs(),'deployment_compute_units':result.compute_units_consumed(),'whole_original_payload_equal':payload==original,'receipts':receipts}
    return report

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--elf',type=Path,required=True);p.add_argument('--output',type=Path,required=True);p.add_argument('--receipt',type=Path,required=True);p.add_argument('--original',type=Path,required=True);a=p.parse_args()
 result=execute(a.elf.read_bytes(),830448,a.original.read_bytes(),a.output)
 assert result['whole_original_payload_equal'] is True
 a.receipt.write_text(json.dumps(result,indent=2)+'\n')
 print('PASS: 912 signed offline transactions; VM-produced payload equals all captured bytes')
