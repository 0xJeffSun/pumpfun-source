"""Extract only authenticated pure fixture declarations; no VM harness loading.

The original inventory loader monkeypatches LiteSVM. This module instead compiles
an explicit AST allowlist from the unchanged authenticated harness. No old module
or verification result is patched; no VM/transaction execution code is loaded.
"""
import sys
if sys.version_info[:2]!=(3,12):
 raise RuntimeError('Relay13 pure reconstruction requires Python 3.12 and solders 0.27.1; the frozen AST gate does not admit this Python version.')
import ast,base64,gzip,hashlib,json
from pathlib import Path
from solders.instruction import AccountMeta,Instruction
from solders.keypair import Keypair
from solders.pubkey import Pubkey
from solders.rent import Rent
H=lambda b:hashlib.sha256(b).hexdigest()
POLICY=Path(__file__).resolve().parent/'pure-reconstruction-policy.json'
def witness(path,nodes):
 return dict(source_sha256=H(path.read_bytes()),selected_ast_sha256=H(ast.dump(ast.Module(body=nodes,type_ignores=[]),include_attributes=False).encode()),names=sorted({n.id for node in nodes for n in ast.walk(node)if isinstance(n,ast.Name)}),imports=sorted((n.module,tuple(x.name for x in n.names))for node in nodes for n in ast.walk(node)if isinstance(n,ast.ImportFrom)),source_spans=[dict(node=type(n).__name__,name=getattr(n,'name',None),line=n.lineno,end_line=n.end_lineno,source_sha256=H(ast.get_source_segment(path.read_text(),n).encode()))for n in nodes])
def gate(path,nodes,key):
 expected=json.loads(POLICY.read_text())[key];actual=json.loads(json.dumps(witness(path,nodes)));assert actual==expected,'pure source/AST/name/import closure changed'

FUNCTIONS={'key','pub','minimum','pd','ata','disc','account','mint_data','token_data','header','prepare'}
ASSIGNMENTS={'P','RELAY','TOKEN','ATA','WSOL','SYSTEM','IDL_SELECTOR','IDL_DISC','H','EXPECTED','DONATIONS','IDL_NAMES','CASES'}
def fixtures(proposal):
 path=proposal/'harness_proposal.py';source=path.read_bytes();assert H(source)=='fd6df62699bc5732fffca65d7e6b5c1c872746180563ca3e320f7dbe11f7cb1b'
 tree=ast.parse(source);nodes=[];functions=set();assignments=set()
 for node in tree.body:
  if isinstance(node,ast.FunctionDef)and node.name in FUNCTIONS:nodes.append(node);functions.add(node.name)
  elif isinstance(node,ast.Assign):
   names={n.id for target in node.targets for n in ast.walk(target)if isinstance(n,ast.Name)}
   if names and names<=ASSIGNMENTS:nodes.append(node);assignments|=names
 assert functions==FUNCTIONS and assignments==ASSIGNMENTS
 gate(path,nodes,'harness_pure_declarations')
 forbidden={'LiteSVM','Transaction','VersionedTransaction','execute','vm_for','run_one','send_transaction','simulate_transaction','new_signed_with_payer','sign','partial_sign'}
 for node in ast.walk(ast.Module(body=nodes,type_ignores=[])):
  assert not isinstance(node,(ast.Import,ast.ImportFrom,ast.Global,ast.Nonlocal))
  if isinstance(node,ast.Name):assert node.id not in forbidden
  if isinstance(node,ast.Attribute):assert node.attr not in forbidden
 namespace=dict(__file__=str(path),Path=Path,hashlib=hashlib,base64=base64,json=json,Pubkey=Pubkey,Rent=Rent,Instruction=Instruction,AccountMeta=AccountMeta,Keypair=Keypair)
 exec(compile(ast.Module(body=nodes,type_ignores=[]),str(path)+'[pure declarations only]','exec'),namespace)
 out=[]
 for case in namespace['CASES']:
  accounts,ix,available,fee,proof=namespace['prepare'](case,proposal)
  required={str(m.pubkey)for m in ix.accounts if m.is_signer}|{str(fee.pubkey())};assert required<={str(k.pubkey())for k in available};assert'RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc'not in required
  out.append(dict(case=case,program_id=str(ix.program_id),fee_payer=str(fee.pubkey()),required_test_owned_signers=sorted(required),fixture=proof))
 return out

def saved_messages(proposal):
 # Execute only the original pure saved decoder function, never load_harness.
 path=proposal/'inventory.py';tree=ast.parse(path.read_bytes());node=next(n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name=='saved_messages')
 gate(path,[node],'inventory_saved_messages')
 for n in ast.walk(node):
  if isinstance(n,ast.Import):raise AssertionError('unapproved import')
  if isinstance(n,ast.ImportFrom):assert n.module=='solders.transaction'and[n.name for n in n.names]==['Transaction','VersionedTransaction']and all(n.asname is None for n in n.names)
  if isinstance(n,ast.Name):assert n.id not in {'LiteSVM','load_harness','execute','prepare'}
  if isinstance(n,ast.Attribute):assert n.attr not in {'send_transaction','simulate_transaction','new_signed_with_payer','sign','partial_sign'}
 namespace=dict(P=proposal,H=H,json=json,gzip=gzip,base64=base64)
 exec(compile(ast.Module(body=[node],type_ignores=[]),str(path)+'[saved decoder only]','exec'),namespace)
 return namespace['saved_messages']()
