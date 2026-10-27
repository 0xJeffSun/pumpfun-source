"""Bounded raw instruction decoding with no account context, signed local inputs."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json
from solders.litesvm import LiteSVM
from solders.keypair import Keypair
from solders.pubkey import Pubkey
from solders.instruction import Instruction
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata
ROOT=Path(__file__).resolve().parents[3]
s=importlib.util.spec_from_file_location('direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d)
PROGRAM=Pubkey.from_string('pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA');payer=Keypair.from_seed(bytes([187])*32)
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists()
 binaries=[ROOT/'evidence/original/pump_amm/deployed.so',a.candidate];vms=[]
 for binary in binaries:
  vm=LiteSVM().with_transaction_history(0);vm.add_program_from_file(PROGRAM,binary);vm.airdrop(payer.pubkey(),10**12);vms.append(vm)
 idl=json.loads((ROOT/'evidence/upstream/pump_amm.json').read_text());cases=[]
 lengths=[0,1,7,8,15,16,31,32,63,64,127,128,255,256,511,512]
 for ix in idl['instructions']:
  disc=bytes(ix['discriminator']);payloads={bytes(n)for n in lengths}|{bytes([255])*n for n in lengths}|{bytes([2])*n for n in [1,8,16,32]}
  for payload in sorted(payloads,key=lambda x:(len(x),x)):cases.append((ix['name'],disc+payload))
 known={bytes(x['discriminator'])for x in idl['instructions']}
 for n in range(8):cases.append(('short-dispatch',bytes(n)))
 for value in [0,2,127,255]:
  disc=bytes([value])*8
  if disc not in known:cases.append(('unknown-discriminator',disc))
 rows=[]
 for name,data in cases:
  assert vms[0].latest_blockhash()==vms[1].latest_blockhash();tx=Transaction.new_signed_with_payer([Instruction(PROGRAM,data,[])],payer.pubkey(),[payer],vms[0].latest_blockhash());assert all(tx.verify_with_results());values=[]
  for vm in vms:
   before=vm.get_account(payer.pubkey()).lamports;r=vm.send_transaction(tx);failed=isinstance(r,FailedTransactionMetadata);meta=r.meta()if failed else r
   values.append({'error':str(r.err())if failed else None,'logs':meta.logs(),'return_data':str(meta.return_data()),'before_lamports':before,'after_lamports':vm.get_account(payer.pubkey()).lamports})
  left,right=map(d.clean,values);fields=[k for k in left if left[k]!=right[k]];rows.append({'instruction':name,'data_hex':data.hex(),'original':values[0],'candidate':values[1],'transaction_base64':base64.b64encode(bytes(tx)).decode(),'mismatched_fields':fields})
 sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();report={'scope':__doc__,'producer_sha256':sha(Path(__file__)),'original_sha256':sha(binaries[0]),'candidate_sha256':sha(binaries[1]),'case_count':len(rows),'mismatch_count':sum(bool(x['mismatched_fields'])for x in rows),'cases':rows};a.output.write_bytes(gzip.compress((json.dumps(report,separators=(',',':'))+'\n').encode(),mtime=0));print(json.dumps({'cases':len(rows),'mismatches':report['mismatch_count'],'failures':[{'instruction':x['instruction'],'data_hex':x['data_hex'][:80],'fields':x['mismatched_fields']}for x in rows if x['mismatched_fields']][:15]}))
if __name__=='__main__':main()
