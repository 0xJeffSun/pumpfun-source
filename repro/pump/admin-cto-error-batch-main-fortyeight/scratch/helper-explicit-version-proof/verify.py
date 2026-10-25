from pathlib import Path
import ast,argparse,json,hashlib,copy
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path);args=a.parse_args()
old=ast.parse((P/'before.py').read_text());new=ast.parse((P/'after.py').read_text());removed=[]
for node in list(new.body):
 if isinstance(node,ast.Assign)and len(node.targets)==1 and ast.unparse(node.targets[0])=='a.tools_version':removed.append(node);new.body.remove(node)
assert len(removed)==1
assert ast.dump(removed[0],include_attributes=False)==ast.dump(ast.parse("a.tools_version=a.tools_version or {'pump':'v1.43','pump_amm':'v1.43','pump_fees':'v1.43','mayhem':'v1.52'}[a.program]").body[0],include_attributes=False)
def normalize(tree,is_old):
 found=0
 for node in ast.walk(tree):
  if isinstance(node,ast.Call)and isinstance(node.func,ast.Attribute)and node.func.attr=='add_argument'and node.args and isinstance(node.args[0],ast.Constant)and node.args[0].value=='--tools-version':
   found+=1;kw={x.arg:x.value for x in node.keywords};assert isinstance(kw['default'],ast.Constant)and kw['default'].value==('v1.52'if is_old else None)
   if not is_old:assert isinstance(kw['help'],ast.Constant)
   node.keywords=[x for x in node.keywords if x.arg not in ['default','help']]
 assert found==1
 return ast.dump(tree,include_attributes=False)
assert normalize(old,True)==normalize(new,False),'Non-default executable helper logic changed'
assert H(P/'reference-manifest.json')=='8377e097b9f6d06bf45f3261237f9e6f3513b9ff0f2581c4bc045b4dd91229c3'
assert H(P/'before.py')==json.loads((P/'reference-manifest.json').read_text())['helpers/scripts/build_partial_candidate.py']
assert H(P/'after.py')=='e0eccab6f54fee2996039beb53075d9a7b3f411706a90634a44420dec7b173c1'
if args.repo:assert H(args.repo/'scripts/build_partial_candidate.py')==H(P/'after.py')
print(json.dumps({'status':'PASS','old_sha256':H(P/'before.py'),'current_sha256':H(P/'after.py'),'equivalence_scope':'Only invocations with explicit nonempty --tools-version. The added or-expression is identity for v1.44/v1.52; remaining executable AST is identical. Omitted-version behavior differs and historical compiler choice is not established.','explicit_versions':['v1.44','v1.52'],'target_executions':0}))
