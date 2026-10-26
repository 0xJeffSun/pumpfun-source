"""Execute only extracted terminal classification/attestation AST with fake inputs.
No module import, run(), native subprocess, source mutation or target execution.
"""
from pathlib import Path
import argparse,ast,copy,json,traceback,types,unittest
A=argparse.ArgumentParser();A.add_argument('--controller',type=Path,required=True);args,rest=A.parse_known_args();tree=ast.parse(args.controller.read_text());run=next(n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name=='run');outer=next(n for n in run.body if isinstance(n,ast.Try));terminal=outer.body[-1];assert isinstance(terminal,ast.Assign)
def block(nodes):return compile(ast.fix_missing_locations(ast.Module(body=copy.deepcopy(nodes),type_ignores=[])),str(args.controller),'exec')
class Policy(unittest.TestCase):
 def evaluate(self,helper=0,aggregate=0,backend=False,stack=False,add=False,badsource=False,badhelper=False,badcache=False,badtools=False):
  refs={'source':'s'};plan={'helper_sha256':{'scripts/helper':'h'}};cache={'files':{'registry/crate':{'sha256':'c'}}};result={'backend_error_lines':['Error: bad']if backend else[],'stack_llvm_diagnostics':['Stack offset']if stack else[],'build_sbf_aggregate_exit':aggregate}
  def h(p):
   n=str(p)
   if n=='repo/source':return 'bad'if badsource else's'
   if n=='repo/scripts/helper':return 'bad'if badhelper else'h'
   if n=='cargo/registry/crate':return 'bad'if badcache else'c'
   raise AssertionError(n)
  d=dict(result=result,child=types.SimpleNamespace(returncode=helper),repo=Path('repo'),cargo=Path('cargo'),PROPOSAL=Path('proposal'),J=lambda p:refs,H=h,plan=plan,cache=cache,attest=lambda:{'tools':'changed'}if badtools else{'tools':'pinned'},pins={'tools':'pinned'},source_hashes=lambda p:{'registry/crate':'c',**({'new':'x'}if add else{})},traceback=traceback)
  exec(block([terminal]),d);exec(block([outer.finalbody[0]]),d);return result
 def test_success(self):self.assertEqual(self.evaluate()['state'],'build-finished')
 def test_helper_failure(self):self.assertEqual(self.evaluate(helper=1)['state'],'failed')
 def test_missing_aggregate(self):self.assertEqual(self.evaluate(aggregate=None)['state'],'failed')
 def test_aggregate_failure(self):self.assertEqual(self.evaluate(aggregate=1)['state'],'failed')
 def test_backend_error(self):self.assertEqual(self.evaluate(backend=True)['state'],'failed')
 def test_stack_error(self):self.assertEqual(self.evaluate(stack=True)['state'],'failed')
 def test_source_failure(self):self.assertEqual(self.evaluate(badsource=True)['state'],'failed')
 def test_helper_attestation(self):self.assertEqual(self.evaluate(badhelper=True)['state'],'failed')
 def test_tool_attestation(self):self.assertEqual(self.evaluate(badtools=True)['state'],'failed')
 def test_cache_mutation(self):self.assertEqual(self.evaluate(badcache=True)['state'],'failed')
 def test_cache_additions(self):self.assertEqual(self.evaluate(add=True)['state'],'requires-cache-review')
 def test_failure_precedes_additions(self):
  for kw in [{'helper':1},{'aggregate':1},{'aggregate':None},{'backend':True},{'stack':True}]:
   with self.subTest(kw=kw):self.assertEqual(self.evaluate(add=True,**kw)['state'],'failed')
 def test_attestation_failure_precedes_additions(self):
  for kw in [{'badsource':True},{'badhelper':True},{'badcache':True},{'badtools':True}]:
   with self.subTest(kw=kw):self.assertEqual(self.evaluate(add=True,**kw)['state'],'failed')
if __name__=='__main__':unittest.main(argv=['test_terminal_policy.py']+rest)
