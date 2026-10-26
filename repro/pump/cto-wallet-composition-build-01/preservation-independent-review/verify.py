from pathlib import Path
import json,hashlib,ast
from test_controller import run,PLAN
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
for n,v in J(P/'manifest.json').items():assert H(P/n)==v['sha256']and(P/n).stat().st_size==v['bytes']
pins=J(P/'pins.json');assert H(PLAN/'manifest.json')==pins['plan_manifest'];assert H(PLAN/'controller.py')==pins['controller']
for n,h in J(PLAN/'manifest.json').items():assert H(PLAN/n)==h
for n,h in J(PLAN/'inputs.json').items():assert H(PLAN/'repo'/n)==h
main=(PLAN/'repo/scripts/pump_admin_cto_differential.py').read_text();ast.parse(main)
for text in ['Transaction.new_signed_with_payer','assert all(tx.verify_with_results())','assert not any(m.is_signer and m.pubkey==POOL_AUTH','[\'error\',\'before\',\'after\',\'events\',\'inner\',\'return\']']:assert text in main
assert run()==J(P/'mock-results.json');print('PASS: frozen15input capsule/controller pins;12 mock-only controller success/failure paths;no VM/harness/native execution')
