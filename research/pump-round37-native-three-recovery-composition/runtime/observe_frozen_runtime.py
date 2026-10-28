"""Forward-only observer for unchanged frozen local VM scripts; never runs RPC."""
from pathlib import Path
import argparse,base64,hashlib,json,os,runpy,sys
import solders.litesvm as module
p=argparse.ArgumentParser();p.add_argument('--script',type=Path,required=True);p.add_argument('--observer-output',type=Path,required=True);p.add_argument('args',nargs=argparse.REMAINDER);a=p.parse_args();Original=module.LiteSVM;records=[]
sha=lambda b:hashlib.sha256(b).hexdigest()
class Observed(Original):
 def __init__(self,*args,**kw):
  super().__init__(*args,**kw);self._bound={};self._checks={'signature':'SDK default','blockhash':'SDK default'}
 def with_sigverify(self,value):
  assert value is True,'This new observer does not admit disabled VM signature checks';self._checks['signature']=True;return super().with_sigverify(value)
 def with_blockhash_check(self,value):
  assert value is True,'This new observer does not admit disabled VM blockhash checks';self._checks['blockhash']=True;return super().with_blockhash_check(value)
 def add_program_from_file(self,key,path):
  self._bound[str(key)]=dict(path=str(path),sha256=sha(Path(path).read_bytes()));return super().add_program_from_file(key,path)
 def add_program(self,key,data):
  self._bound[str(key)]=dict(sha256=sha(bytes(data)));return super().add_program(key,data)
 def send_transaction(self,tx):
  assert all(tx.verify_with_results())
  def snap():
   result={}
   from solders.pubkey import Pubkey
   for key in self._bound:
    account=self.get_account(Pubkey.from_string(key));assert account is not None
    result[key]=dict(sha256=sha(bytes(account.data)),executable=account.executable,owner=str(account.owner))
   return result
  before=snap();r=super().send_transaction(tx);after=snap();assert before==after
  assert all(before[k]['sha256']==v['sha256'] and before[k]['executable']for k,v in self._bound.items())
  records.append(dict(transaction_base64=base64.b64encode(bytes(tx)).decode(),signature=str(tx.signatures[0]),signature_verified=True,checks=dict(self._checks),programs=dict(self._bound),before=before,after=after));return r
module.LiteSVM=Observed
arguments=a.args[1:]if a.args[:1]==['--']else a.args
sys.path.insert(0,str(a.script.parent));sys.argv=[str(a.script)]+arguments
failure=None
try:runpy.run_path(str(a.script),run_name='__main__')
except BaseException as e:
 failure=repr(e);raise
finally:
 a.observer_output.write_text(json.dumps(dict(script=str(a.script),script_sha256=sha(a.script.read_bytes()),observer_sha256=sha(Path(__file__).read_bytes()),failure=failure,records=records,scope=__doc__),indent=2)+'\n')
