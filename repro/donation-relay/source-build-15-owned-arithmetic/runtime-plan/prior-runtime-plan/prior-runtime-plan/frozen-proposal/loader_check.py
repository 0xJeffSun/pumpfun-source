#!/usr/bin/env python3
"""Authorized loader acceptance only. No transactions are constructed or sent."""
import hashlib,importlib.metadata,json,sys
from pathlib import Path
import solders
from solders.litesvm import LiteSVM
from solders.pubkey import Pubkey
P=Path(__file__).resolve().parent;R=P.parents[1]
PROGRAM=Pubkey.from_string('RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu')
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
paths={'original':R/'evidence/dependencies/donation_relay/deployed.so','candidate':R/'work/relay-source-build-04-handoff/candidate.so'}
expected={'original':'367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','candidate':'4954fdc437beed0f73e00d25f1df656ce7fdf0279f8f9bb8e70ca0bced4b53dd'}
root=Path(solders.__file__).parent
runtime={p.name:{'sha256':H(p),'bytes':p.stat().st_size} for p in sorted(root.iterdir()) if p.is_file() and (p.suffix in ('.py','.pyi','.so') or p.name.startswith('solders.'))}
results=[]
for name,path in paths.items():
 assert H(path)==expected[name]
 vm=LiteSVM().with_sigverify(True).with_blockhash_check(True).with_transaction_history(256)
 try:
  returned=vm.add_program_from_file(PROGRAM,path);a=vm.get_account(PROGRAM)
  assert a is not None and a.executable
  results.append({'artifact':name,'sha256':H(path),'accepted':True,'return':repr(returned),'account_owner':str(a.owner),'account_data_bytes':len(a.data),'account_data_sha256':hashlib.sha256(a.data).hexdigest(),'executable':a.executable,'latest_blockhash':str(vm.latest_blockhash())})
 except Exception as e:results.append({'artifact':name,'sha256':H(path),'accepted':False,'error_type':type(e).__name__,'error':str(e)})
report={'scope':'loader acceptance only; no transaction constructed, simulated or sent','python':sys.version,'solders_version':importlib.metadata.version('solders'),'runtime_files':runtime,'settings':{'sigverify':True,'blockhash_check':True,'transaction_history':256,'feature_overrides':False,'compute_budget_overrides':False},'results':results,'transactions':0}
(P/'loader-results.json').write_text(json.dumps(report,indent=2,sort_keys=True)+'\n');print(json.dumps({'results':results,'transactions':0}))
