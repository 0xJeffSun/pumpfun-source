"""Stateful legacy exact-quote swaps across Token-2022 fee-schedule activation."""
from pathlib import Path
import argparse,gzip,hashlib,json,os,struct,sys
P=Path(__file__).resolve().parent;R=P.parents[1]
os.chdir(R);sys.path.insert(0,str(R/'scripts'))
import pump_amm_legacy_buy_differential as h
PROFILES=[dict(name='increase',old=[0,1000,10],new=[5,2000,100]),
          dict(name='decrease',old=[0,2000,100],new=[5,1000,10]),
          dict(name='activate-capped-100pct',old=[0,0,0],new=[5,123,10000]),
          dict(name='disable',old=[0,1000,100],new=[5,0,0])]
STEPS=[dict(name='before',epoch=4,limit=1),dict(name='activation-rejected',epoch=5,limit=2**64-1),
       dict(name='activation-retry',epoch=5,limit=1),dict(name='after',epoch=6,limit=1)]
HASHES={'original':'6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7',
        'c651':'97bd5553c199cd24fb2d07034c365527bee5b138bf5dd7a0aa3099186aad2643',
        'c726':'4e58c47139798d743c325c8ee9c3a98f4fd7cc4ceba2d6a5763e66899c4efd25'}

def context(vm,profile,label,step):
 vm._replay_context=dict(profile=profile['name'],artifact=label,step=step['name'])
 vm.set_clock(h.Clock(100+step['epoch'],1234567890,step['epoch'],step['epoch'],1234567890+step['epoch']))

def main(out):
 out.mkdir(exist_ok=False,parents=True)
 candidate=out/'c726.so';candidate.write_bytes(gzip.decompress((P/'public/candidate.so.gz').read_bytes()))
 paths={'original':R/'evidence/original/pump_amm/deployed.so','c651':R/'repro/pump_amm/optional-context-recovery-20261027/results/build/candidate.so','c726':candidate}
 for label,path in paths.items():assert hashlib.sha256(path.read_bytes()).hexdigest()==HASHES[label]
 results=[]
 for profile in PROFILES:
  for label,path in paths.items():
   active=[]
   def fresh(program):
    harness=h.Harness(program);harness.vm.with_transaction_history(64);active.append(harness);return harness
   h.acquire_harness=fresh
   def setup(harness,metas):
    h.adapt_sell_helper(h.legacy_transferfee(h.quote,0,0))(harness,metas)
    vm=harness.vm;a=vm.get_account(h.quote);d=bytearray(a.data)
    d[242:278]=struct.pack('<QQH',*profile['old'])+struct.pack('<QQH',*profile['new'])
    vm.set_account(h.quote,h.Account(a.lamports,bytes(d),a.owner));context(vm,profile,label,STEPS[0])
   first=h.legacy_buy(name='buy_exact_quote_in',amount=10**7,limit=1,overrides=setup,candidate=path)
   assert len(active)==1;vm=active[0].vm
   tx=h.Transaction.from_bytes(h.base64.b64decode(first['transaction_base64']));msg=tx.message;head=msg.header;ix=msg.instructions[0]
   signed=head.num_required_signatures;se=signed-head.num_readonly_signed_accounts;ue=len(msg.account_keys)-head.num_readonly_unsigned_accounts
   metas=[h.AccountMeta(msg.account_keys[i],i<signed,i<se or signed<=i<ue)for i in ix.accounts]
   results.append(dict(profile=profile['name'],artifact=label,step=STEPS[0]['name'],error=first['error']))
   for step in STEPS[1:]:
    context(vm,profile,label,step);vm.expire_blockhash()
    data=bytes(ix.data[:8])+struct.pack('<QQ',10**7,step['limit'])+bytes(ix.data[24:])
    tx=h.Transaction.new_signed_with_payer([h.Instruction(h.PROGRAM,data,metas)],h.PAYER.pubkey(),[h.PAYER],vm.latest_blockhash())
    result=vm.send_transaction(tx);failed=isinstance(result,h.FailedTransactionMetadata)
    results.append(dict(profile=profile['name'],artifact=label,step=step['name'],error=str(result.err())if failed else None))
   print(profile['name'],label,[r['error']for r in results[-4:]],flush=True)
 (out/'summary.json').write_text(json.dumps(results,indent=2)+'\n')

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--output',type=Path,required=True);args=parser.parse_args();main(args.output.resolve())
