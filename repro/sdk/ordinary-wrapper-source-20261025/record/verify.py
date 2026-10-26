"""Pure archive/source/recipe integrity replay. No JavaScript execution, RPC or target use."""
from pathlib import Path
import json,hashlib
from analyze import analyze
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f!=P/'manifest.json'}
for n,r in m.items():
 f=P/n;assert not f.is_symlink();b=f.read_bytes();assert H(b)==r['sha256']and len(b)==r['bytes']
assert analyze()==J(P/'analysis.json')
ref=J(P/'prior-reference.json');assert ref['still_unexpanded_other_object_sites']==17
for row in ref['files'].values():
 f=Path(row['path']);assert H(f.read_bytes())==row['sha256']and f.stat().st_size==row['bytes']
d=J(P/'analysis.json');assert len(d['excerpts'])==34 and len(d['symbolic_remaining_cases'])==8 and len(d['files'])==6
assert not d['runtime_compatibility_closed']and not d['historical_dependency_graph_closed']and d['new_javascript_execution']==d['rpc_network_target_original_contract_reads']==0
print(json.dumps({'status':'PASS_STATIC_ORDINARY_SWAP_FAMILY','archives':2,'source_files':6,'exact_family_excerpts':34,'per_package_excerpt_count':17,'byte_equal_excerpt_pairs':16,'fee_recipient_pair_structurally_different':True,'symbolic_remaining_cases':8,'other_unexpanded_object_sites':17,'javascript_rpc_target_executions':0,'runtime_compatibility_closed':False},indent=2))
