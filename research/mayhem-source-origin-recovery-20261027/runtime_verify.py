"""Verify saved signed records; never execute VM programs or capture harnesses."""
from pathlib import Path
import ast,base64,gzip,hashlib,importlib.util,json,lzma,random,re
sha=lambda b:hashlib.sha256(b).hexdigest()
EXTEND_HARNESS_HASHES={'mayhem_validate_extend.py': '0c967af0180999949487de35450183a50fcba41be3632af8f056fba61dae227d', 'mayhem_validate_admin.py': '02c8597c18e704472bcde86485e8784228020bb3e099ab805d4583269e0393db'}
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def require(ok,message):
 if not ok:raise ValueError(message)
def extend_cases(path):
 require(sha(path.read_bytes())==EXTEND_HARNESS_HASHES[path.name],'extension generator source differs');tree=ast.parse(path.read_bytes());nodes=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name=='cases'or isinstance(n,ast.Assign)and any(isinstance(x,ast.Name)and x.id=='TYPES'for x in n.targets)]
 require(len(nodes)==2,'extension case generator differs');namespace={'hashlib':hashlib,'random':random};exec(compile(ast.Module(body=nodes,type_ignores=[]),str(path),'exec'),namespace);require(namespace['TYPES']=={'GlobalParams':318,'FeeRecipient':74,'MayhemState':170},'extension type sizes differ');return namespace['cases']()
def check_extend(p,r,candidate):
 from solders.transaction import Transaction
 root=p/'runtime/extend';report=json.loads(gzip.decompress((root/'report.json.gz').read_bytes()));expected=extend_cases(root/'fixtures/mayhem_validate_extend.py');original=(r/'evidence/original/mayhem/deployed.so').read_bytes()
 require(report['schema']=='source-origin-extend-validation-v1','extension schema differs')
 require(report['case_count']==len(report['cases'])==len(expected)==301 and [x['case']for x in report['cases']]==expected,'extension complete cases differ')
 require(report['candidate_sha256']==sha(candidate)and report['original_sha256']==sha(original),'extension program hash differs')
 require(report['runner_sha256']==sha((root/'capture.py').read_bytes())=='80792e1badf15bbe4fa888c735807109d31bbc72642f3f5d41e0d44bf7f5b31e','extension runner hash differs')
 require(set(report['harness_sha256'])=={'scripts/mayhem_validate_extend.py','scripts/mayhem_validate_admin.py'},'extension harness set differs')
 for name,h in report['harness_sha256'].items():require(sha((root/'fixtures'/Path(name).name).read_bytes())==h==EXTEND_HARNESS_HASHES[Path(name).name],'extension harness hash differs')
 success=0;programs={'original':{'sha256':sha(original),'bytes':len(original),'executable':True},'candidate':{'sha256':sha(candidate),'bytes':len(candidate),'executable':True}}
 for row in report['cases']:
  a,b=row['original'],row['candidate'];require(set(a)==set(b)=={'error','accounts','events','inner_instructions','return_data','logs'},'extension result fields differ');require(not row['different_fields'],'extension reported mismatch')
  require({k:v for k,v in a.items()if k!='logs'}=={k:v for k,v in b.items()if k!='logs'},'extension effects differ')
  logs=lambda xs:[x for x in xs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]
  require(logs(a['logs'])==logs(b['logs']),'extension logs differ');require(row['original_transaction_base64']==row['candidate_transaction_base64'],'extension transactions differ')
  for label,data in [('original',original),('candidate',candidate)]:
   transaction=Transaction.from_bytes(base64.b64decode(row[label+'_transaction_base64'],validate=True));require(all(transaction.verify_with_results()),'extension signature differs');require(row[label+'_program']==programs[label],'extension executable identity differs')
  success+=a['error']is None
 require(success==84,'extension success count differs')
 return{'pairs':301,'signed_records':602,'original_successes':success,'effect_mismatches':0,'noncompute_log_mismatches':0}
def check(p,r,candidate,compare_saved=True):
 require(json.loads((p/'runtime/status.json').read_text())=={'state':'complete','candidate_sha256':sha(candidate),'trade_pairs':6636,'extend_pairs':301,'initializer_pairs':69,'qualified':True},'runtime complete scopes differ')
 require(json.loads((p/'runtime/inputs.json').read_text())['frozen']==json.loads((r/'research/mayhem-current-macro-call-closure-20261027/runtime/inputs.json').read_text())['frozen'],'trade/initializer generator inputs differ')
 compression=json.loads((p/'runtime/compression.json').read_text())
 require(set(compression)=={'trades/'+n.name for n in (p/'runtime/trades').glob('*.json.xz')}and len(compression)==14,'trade compression inventory differs')
 for name,receipt in compression.items():
  packed=(p/'runtime'/name).read_bytes();plain=lzma.decompress(packed)
  require(receipt=={'compressed_sha256':sha(packed),'captured_json_sha256':sha(plain),'decoded_json_sha256':sha(plain),'decoded_bytes':len(plain)},'lossless trade compression differs')
 base=module('origin_runtime_base',r/'research/mayhem-current-macro-call-closure-20261027/runtime_verifier.py').check(p,r,candidate)
 ext=check_extend(p,r,candidate)
 require(base['trade_pairs']==6636 and base['initializer_pairs']==69,'base scopes differ')
 result=compose(base,ext)
 if compare_saved:require(result==json.loads((p/'runtime/origin-verification.json').read_text()),'saved source-origin runtime report differs')
 return result

def compose(base,ext):
 require(base['trade_pairs']==6636 and base['initializer_pairs']==69 and ext['pairs']==301,'runtime scope counts differ')
 require(base['trade_signed_records']==13272 and base['initializer_signed_records']==168 and ext['signed_records']==602,'runtime signed counts differ')
 return {'qualified':True,'trades':{'pairs':base['trade_pairs'],'signed_records':base['trade_signed_records']},'initializer':{'pairs':base['initializer_pairs'],'signed_records':base['initializer_signed_records'],'original_successes':10},'extend':ext,'total_pairs':7006,'total_signed_records':14042,'scope':'Separate finite saved-VM scopes; signatures counted as records, not unique transactions. No new VM execution during verification.'}
