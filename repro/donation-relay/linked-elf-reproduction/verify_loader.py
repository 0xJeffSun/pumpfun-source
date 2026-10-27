"""Check the exact ELF's loader receipt; optionally replay all signed transactions."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def verify(execute=False):
 p=ROOT/'repro/donation-relay/offline-loader-allocation/verify.py';s=importlib.util.spec_from_file_location('exact_loader_parent',p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
 elf=gzip.decompress((HERE/'artifacts/candidate.so.gz').read_bytes());_,capacity,original=m.inputs();r=json.loads((HERE/'loader-receipt.json').read_bytes())
 assert elf==original[:len(elf)] and len(elf)==818280 and capacity==830448
 assert r['elf_sha256']==hashlib.sha256(elf).hexdigest() and r['elf_bytes']==len(elf)
 assert r['payload_sha256']==hashlib.sha256(original).hexdigest() and r['whole_original_payload_equal'] is True
 assert r['payload_bytes']==r['max_data_len']==capacity and r['programdata_account_bytes']==capacity+45 and r['allocated_zero_tail_bytes']==capacity-len(elf)
 assert r['payload_prefix_equal'] and r['program_executable'] and r['transactions']==len(r['receipts'])==912 and r['write_transactions']==910
 assert all(x['transaction_bytes']<=1232 for x in r['receipts'])
 if execute:assert m.execute(elf,capacity,original)==r
 return r
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--execute',action='store_true');a=p.parse_args();verify(a.execute);print('PASS: exact 830448-byte loader payload receipt; fresh execution='+str(a.execute)+'; ProgramData metadata/history not claimed identical')
