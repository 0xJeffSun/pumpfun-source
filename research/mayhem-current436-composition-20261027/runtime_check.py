"""Independently check retained signed 436-composition records; no VM execution."""
from pathlib import Path
import ast,base64,copy,gzip,hashlib,importlib.util,json,lzma,re,shutil,sys,tempfile
D=Path(__file__).resolve().parent;R=D.parents[1];A=D;P=R/'research/mayhem-source-origin-recovery-20261027';C=gzip.decompress((D/'builds/first/candidate.so.gz').read_bytes());sha=lambda b:hashlib.sha256(b).hexdigest()

def mod(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
read=lambda p:json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else lzma.decompress(p.read_bytes())if p.suffix=='.xz'else p.read_bytes())
MAY='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e';original=(R/'evidence/original/mayhem/deployed.so').read_bytes();base=gzip.decompress((D/'builds/control/candidate.so.gz').read_bytes());binaries={'original':sha(original),'control':sha(base),'candidate':sha(C)}

def initialization():
 with tempfile.TemporaryDirectory(prefix='composition-init-check-')as directory:
  view=Path(directory);(view/'builds/first').mkdir(parents=True);(view/'builds/first/candidate.so.gz').write_bytes(gzip.compress(C,mtime=0));(view/'runtime').mkdir()
  shutil.copytree(P/'runtime/frozen',view/'runtime/frozen');(view/'runtime/first').mkdir()
  for n in ['rejections.json.gz','pump-cpi.json.gz']:shutil.copyfile(D/'runtime/initializer'/n,view/'runtime/first'/n)
  shutil.copyfile(P/'runtime/producer.py',view/'runtime/producer.py')
  return mod('init434check',P/'runtime/initializer_check.py').verify(R,view,True,sha(C),'first')

def sweep_and_target():
 sys.path.insert(0,str(R/'research/mayhem-sweep-failure-recovery'))
 check=mod('sweep436check',D/'runtime/sweep_check.py');runner=sha((R/'research/mayhem-sweep-failure-recovery/replay_sweeps.py').read_bytes())
 suites=[check.check(read(D/f'runtime/sweeps/{name}.json.gz'),name,binaries,runner)for name in ['sweeps','rates']]
 target=read(D/'runtime/target-rates/attested.json.gz');plain=read(D/'runtime/target-rates/differential.json.gz');assert target['candidate_sha256']==binaries['candidate']and target['control_sha256']==binaries['control']and target['original_sha256']==binaries['original'];driver=D/'runtime/target-driver.py';assert target['driver_sha256']==sha(driver.read_bytes())and target['controller_sha256']==sha((D/'controllers/run_target_rates.py').read_bytes())and target['recorder_sha256']==runner
 tree=ast.parse(driver.read_bytes());wanted=[]
 for node in tree.body:
  if isinstance(node,ast.Assign)and any(isinstance(x,ast.Name)and x.id in ['I64','rows']for x in node.targets):wanted.append(node)
  if isinstance(node,ast.FunctionDef)and node.name=='opaque':wanted.append(node)
  if isinstance(node,ast.For)and isinstance(node.target,ast.Name)and node.target.id=='native':wanted.append(node)
 ns={};exec(compile(ast.Module(body=wanted,type_ignores=[]),str(driver),'exec'),ns);cases=ns['rows'];assert len(cases)==856 and target['cases']==cases and [x['case']for x in plain['cases']]==cases
 assert not plain['mismatches']and not plain['log_differences_modulo_cu']and not plain['candidate_vs_parent_differences']
 assert set(target['records'])==set(binaries.values())
 def record(row,digest,case):
  assert row['case']==case
  tx=check.attest(row['receipt'],digest,case)
  keys=tx.message.account_keys;ix=tx.message.instructions[0]
  assert row['receipt']['before'][str(keys[ix.accounts[1]])]['data'][166:174]==list(case['global_value'].to_bytes(8,'little'))
  opaque=bytes.fromhex(case['opaque'])
  for offset in range(9,len(ix.accounts),2):
   account=row['receipt']['before'][str(keys[ix.accounts[offset]])];assert bytes(account['data'][10:42])==opaque
  return tx
 signed=0
 for i,case in enumerate(cases):
  rows=[target['records'][binaries[name]][i]for name in ['original','control','candidate']]
  for row,name in zip(rows,['original','control','candidate']):record(row,binaries[name],case);signed+=1
  assert rows[0]['receipt']['transaction_hex']==rows[1]['receipt']['transaction_hex']==rows[2]['receipt']['transaction_hex']
  for row in rows[1:]:
   assert row['result']==rows[0]['result']or all(row['result'][k]==rows[0]['result'][k]for k in ['error','accounts','events','inner','return_data'])
   assert check.logs(row['result'])==check.logs(rows[0]['result'])
   for phase in ['before','after']:assert {k:v for k,v in row['receipt'][phase].items()if k!=MAY}=={k:v for k,v in rows[0]['receipt'][phase].items()if k!=MAY}
 assert signed==2568
 # Actual-byte counterexamples, separate from saved equal/pass fields.
 source=target['records'][binaries['candidate']][0];case=cases[0];bad=[]
 def rejects(name,change):
  x=copy.deepcopy(source);change(x)
  try:record(x,binaries['candidate'],case)
  except(AssertionError,ValueError):bad.append(name);return
  raise AssertionError('corruption accepted:'+name)
 def sig(x):
  data=bytearray.fromhex(x['receipt']['transaction_hex']);data[1]^=1;x['receipt']['transaction_hex']=data.hex()
 rejects('signature',sig);rejects('executed-program',lambda x:x['receipt']['before'][MAY].update(data_sha256='0'*64));rejects('case',lambda x:x['case'].update(global_value=0))
 assert len(bad)==3
 return dict(suites=suites,targeted=dict(cases=856,signed_records=signed,original_outcomes=plain['original_outcomes'],corruptions_rejected=bad))

def trade_family(name,report):
 q=mod('trade436check',P/'runtime/trade_check.py')
 item=q.check_trade_receipts(name,report,C,R);assert item['exact_noncompute_logs']==q.EXPECTED[name]
 for row in report['cases']:
  for side,digest in [('original',binaries['original']),('candidate',binaries['candidate'])]:
   for phase in ['before','after']:assert row[side][phase][MAY]['executable']and row[side][phase][MAY]['data_sha256']==digest
 return item

def trades():
 q=mod('trade436expected',P/'runtime/trade_check.py')
 return [trade_family(name,read(D/f'runtime/trades/{name}.json.xz'))for name in q.EXPECTED]

def verify(packet,root,candidate):
 assert Path(packet).resolve()==D and Path(root).resolve()==R and candidate==C
 result=dict(initializer=initialization(),sweeps=sweep_and_target(),trades=trades())
 assert result==read(D/'runtime/verification.json')
 return result
