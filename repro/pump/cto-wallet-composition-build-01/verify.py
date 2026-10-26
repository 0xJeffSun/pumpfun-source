"""Saved build/inventory checks only; never invokes archived build controllers."""
from pathlib import Path
import collections,gzip,hashlib,json,re,sqlite3,subprocess,sys
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in(P/'manifest.json',P/'manifest.sha256')}
for n,h in m.items():assert H(P/n)==h,n
for f in P.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'
plan=P/'plan';assert H(plan/'MANIFEST.json')=='f5d2ce6218e4f56eacda6693ee60dd377c9e4854c0a889989f149cc31fad9985'
for n,h in J(plan/'MANIFEST.json').items():assert H(plan/n)==h
assert H(plan/'source-proposal/manifest.json')=='4e72efa4fadf5bed345b24d78ce4e9362105d89f3eccf858357905c045bcaefd'
d=J(P/'controller-result.json');a=J(P/'build/build-attempt.json');b=J(P/'build/build-comparison.json');source=J(plan/'source-proposed.json')
assert len(source)==37 and d['state']=='requires-cache-review'and d['helper_exit']==d['build_sbf_aggregate_exit']==a['returncode']==0
assert d['source_after']==a['source_sha256']==a['source_after_sha256']==b['source_sha256']==source and d['source_unchanged']and a['source_unchanged']
for n,h in source.items():assert H(plan/'source'/n)==h
assert d['helpers_after']==J(plan/'future-plan.json')['helper_sha256']and d['tool_sdk_before']==d['tool_sdk_after']and d['private_cache_existing_unchanged']
assert d['compiler_child_exit']is d['strip_child_exit']is None
log=re.sub(r'\x1b\[[0-?]*[ -/]*[@-~]','',(P/'build/build.log').read_text());assert not [line for line in log.splitlines()if re.match(r'^\s*Error:',line)or re.search(r'Stack offset|stack frame|LLVM ERROR|panicked at',line,re.I)]
assert H(P/'analysis/candidate.so')=='d75d2872c4281183e170ce7d7795d186745e2428005ceb89aa3df95fe7cab9b1'and H(P/'analysis/unstripped.so')=='17ae5b6282abd1b42ac7ff52064db2ef337ae28348fc9c6af7143970836d7027'
extra=d['private_cache_additions'];assert set(extra)=={'.package-cache','.package-cache-mutate','.global-cache','registry/CACHEDIR.TAG'}
for n,h in extra.items():assert H(P/'generated-cache'/n)==h
for n in ['.package-cache','.package-cache-mutate']:assert(P/'generated-cache'/n).read_bytes()==b''
con=sqlite3.connect('file:'+str(P/'generated-cache/.global-cache')+'?mode=ro',uri=True);assert con.execute('PRAGMA integrity_check').fetchall()==[('ok',)]
tables={n:[list(row)for row in con.execute('SELECT * FROM "'+n+'"')]for n, in con.execute("SELECT name FROM sqlite_master WHERE type='table'")};assert tables==J(P/'cache-additions-review.json')['tables']and not tables['git_db']and not tables['git_checkout']
registry={x[0]:x[1]for x in tables['registry_index']};allowed=J(plan/'cache-allowlist.json')['files'];assert len(tables['registry_crate'])==len(tables['registry_src'])==477
for reg,name,size,t in tables['registry_crate']:assert allowed[f'registry/cache/{registry[reg]}/{name}']['bytes']==size
for reg,name,size,t in tables['registry_src']:assert any(n.startswith(f'registry/src/{registry[reg]}/{name}/')for n in allowed)
subprocess.run([sys.executable,'-B',str(P/'analysis/full_inventory.py'),'--check'],check=True,stdout=subprocess.DEVNULL)
ledger=json.loads(gzip.decompress((P/'analysis/full-before-after-inventory.json.gz').read_bytes()));trans=J(P/'analysis/all-original-transitions.json');rows=[]
for orig in ledger['before']['original_windows']:
 row={'original_start':orig['start'],'original_end':orig['end'],'original_raw_sha256':orig['raw_sha256']}
 for side in ['before','after']:
  pairs=[x for x in ledger[side]['pattern_comparisons']if x['original']==orig['start']];row[side]={'status':'raw'if any(x['raw_body_equal']for x in pairs)else'call-consistent'if any(x['call_consistent_fixed_point']for x in pairs)else'normalized'if pairs else'unmatched','normalized_pairs':len(pairs),'raw_pairs':sum(x['raw_body_equal']for x in pairs),'call_consistent_pairs':sum(x['call_consistent_fixed_point']for x in pairs)}
 rows.append(row)
assert len(rows)==1035 and rows==trans['all1035_original_rows']and not ledger['after']['whole_file_equal']
changed=[r for r in rows if r['before']!=r['after']];assert len(changed)==1 and changed[0]['original_start']==347576 and changed[0]['before']['status']=='unmatched'and changed[0]['after']['status']=='call-consistent'
print('PASS: one unselected wallet implementation build/source37/receipts/cachebookkeeping/full1035inventory; whole-original/runtime/ABI closure remains unproved')
v=J(P/'emitted-review-relocations.json');old=P/'emitted-review-original';new=P/'emitted-review-published'
assert H(old/'manifest.json')==v['original_seal']=='df2338c443a3ffdb174c1f3098f05c29e4c011bd954ab78b72302e7c5776920c'and H(new/'manifest.json')==v['published_seal']
assert {str(f.relative_to(old))for f in old.rglob('*')if f.is_file()}=={str(f.relative_to(new))for f in new.rglob('*')if f.is_file()}
assert sorted(n for n in J(old/'manifest.json')if(old/n).read_bytes()!=(new/n).read_bytes())==['analyze.py','input-references.json','verify.py']
for name,pairs in v['code_changes'].items():
 code=(old/name).read_text()
 for before,after in pairs:assert code.count(before)==1;code=code.replace(before,after)
 assert(new/name).read_text()==code
assert J(new/'input-references.json')=={v['input_reference_keys'][k]:val for k,val in J(old/'input-references.json').items()}
subprocess.run([sys.executable,'-B',str(new/'verify.py'),'--work-root',str(P)],check=True)
runtime=P/'preservation-results';exit=J(runtime/'exit.json');receipt=J(runtime/'receipt.json');sig=J(runtime/'independent-saved-signatures.json')
assert exit['passed']and exit['returncode']==0 and exit['inputs_unchanged']and exit['receipt_valid']and exit['case_count']==363
assert receipt['candidate_sha256']=='d75d2872c4281183e170ce7d7795d186745e2428005ceb89aa3df95fe7cab9b1'and receipt['case_count']==len(receipt['cases'])==363 and receipt['mismatches']==[]
assert H(runtime/'receipt.json')==exit['receipt_json_sha256']and H(runtime/'stdout.log')==exit['stdout_log_sha256']and H(runtime/'stderr.log')==exit['stderr_log_sha256']
for r in receipt['cases']:
 assert r['match']is True and all(r['original'][k]==r['candidate'][k]for k in ['error','before','after','events','inner','return'])
 for side in ['original','candidate']:assert r[side]['signatures_verified']is True and r[side]['pool_authority_top_level_signer']is False
assert sig['case_count']==363 and sig['transaction_count']==726 and sig['signature_fields']==1448 and len(sig['rows'])==726
print('PASS: exact emitted review/declaredpathderivative and unchanged363case preservation receipt; savedcrypto requires --python312 for fresh verification')
import argparse
parser=argparse.ArgumentParser();parser.add_argument('--python312',type=Path);args=parser.parse_args()
if args.python312:subprocess.run([str(args.python312),'-B',str(P/'verify_saved_signatures.py')],check=True)
