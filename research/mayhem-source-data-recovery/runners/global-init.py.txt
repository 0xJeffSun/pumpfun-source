from pathlib import Path
import sys,json,gzip,hashlib,base64
from solders.litesvm import LiteSVM
from solders.account import Account
from solders.pubkey import Pubkey
from solders.keypair import Keypair
from solders.instruction import Instruction,AccountMeta
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata
W=Path(__file__).resolve().parent;R=W.parents[1];MAY=Pubkey.from_string('MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e');SYS=Pubkey.default();GLOBAL=Pubkey.find_program_address([b'global-params'],MAY)[0];ADMIN=Keypair.from_seed(bytes([51])*32);PAYER=Keypair.from_seed(bytes([52])*32);WRONG=Keypair.from_seed(bytes([53])*32).pubkey();candidate=Path(sys.argv[1]);output=Path(sys.argv[2]);assert not output.exists();original=R/'evidence/original/mayhem/deployed.so';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def run(binary,case):
 vm=LiteSVM().with_sigverify(True).with_blockhash_check(True);vm.add_program_from_file(MAY,binary)
 for key in [PAYER.pubkey(),ADMIN.pubkey(),WRONG]:vm.set_account(key,Account(10**10,b'',SYS))
 if case=='prefunded':vm.set_account(GLOBAL,Account(1,b'',SYS))
 if case=='existing':vm.set_account(GLOBAL,Account(10**8,hashlib.sha256(b'account:GlobalParams').digest()[:8]+bytes(246),MAY))
 meta=[AccountMeta(ADMIN.pubkey(),case!='unsigned',case!='readonly'),AccountMeta(GLOBAL,False,True),AccountMeta(WRONG if case=='wrong-system' else SYS,False,False)]
 keys=[PAYER.pubkey(),ADMIN.pubkey(),GLOBAL,WRONG,SYS]
 def snap():
  d={}
  for key in keys:
   a=vm.get_account(key)
   if a and a.executable:continue
   d[str(key)]=None if a is None else dict(lamports=a.lamports,owner=str(a.owner),data=bytes(a.data).hex())
  return d
 tx=Transaction.new_signed_with_payer([Instruction(MAY,hashlib.sha256(b'global:initialize_global_params').digest()[:8],meta)],PAYER.pubkey(),[PAYER]+([ADMIN]if case!='unsigned'else[]),vm.latest_blockhash());assert all(tx.verify_with_results());before=snap();result=vm.send_transaction(tx);fail=isinstance(result,FailedTransactionMetadata);metadata=result.meta()if fail else result;raw=json.loads(metadata.to_json());logs=metadata.logs()
 return dict(before=before,after=snap(),error=str(result.err())if fail else None,transaction=base64.b64encode(bytes(tx)).decode(),logs=logs,anchor_errors=[x for x in logs if 'Error Code:'in x],events=[x for x in logs if x.startswith('Program data:')],inner=raw['inner_instructions'],returned=raw.get('return_data'))
rows=[]
for case in ['fresh','prefunded','existing','unsigned','readonly','wrong-system']:
 a,b=run(original,case),run(candidate,case);diff=[k for k in ['before','after','error','transaction','anchor_errors','events','inner','returned']if a[k]!=b[k]];rows.append(dict(case=case,original=a,candidate=b,differences=diff));print(case,a['error'],diff,flush=True)
r=dict(schema='accounts-global-init-v1',runner_sha256=sha(Path(__file__)),candidate_sha256=sha(candidate),original_sha256=sha(original),cases=rows,mismatches=[x['case']for x in rows if x['differences']]);output.write_bytes(gzip.compress(json.dumps(r).encode(),mtime=0));assert not r['mismatches']
