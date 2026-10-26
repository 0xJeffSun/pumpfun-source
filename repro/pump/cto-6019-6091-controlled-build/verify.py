"""Pure saved-artifact checks; never run retained native controllers."""
from pathlib import Path
import argparse,gzip,hashlib,json,re,sqlite3,subprocess,sys
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in (P/'manifest.json',P/'manifest.sha256')}
for n,h in m.items():assert H(P/n)==h,n
for p in P.rglob('*'):assert not p.is_symlink()and p.name!='__pycache__'and p.suffix!='.pyc'
assert H(P/'original-proposal/MANIFEST.json')=='886910366f561a776c7ddb5c910481a576d4659d8bc2e7e61a608c592dbf9146'
a=J(P/'build/build-attempt.json');b=J(P/'build/build-comparison.json');d=J(P/'controller-result.json');s=J(P/'original-proposal/source-proposed.json')
assert a['returncode']==d['helper_exit']==d['build_sbf_aggregate_exit']==0 and d['state']=='requires-cache-review'
assert a['source_sha256']==a['source_after_sha256']==b['source_sha256']==d['source_after']==s and a['source_unchanged']and d['source_unchanged']
for n,h in s.items():assert H(P/'original-proposal/source'/n)==h
assert d['tool_sdk_before']==d['tool_sdk_after']and d['private_cache_existing_unchanged']and d['helpers_after']==J(P/'original-proposal/future-plan.json')['helper_sha256']
assert d['compiler_child_exit']is None and d['strip_child_exit']is None
raw=(P/'build/build.log').read_text();clean=re.sub(r'\x1b\[[0-?]*[ -/]*[@-~]','',raw)
assert not[line for line in clean.splitlines()if re.match(r'^\s*Error:',line)or re.search(r'Stack offset|stack frame|LLVM ERROR|panicked at',line,re.I)]
assert H(P/'analysis/candidate.so')=='f2901021fde9354bf2d89098a3e8d8a425b60eda0faa856a2c8aef0d64e3f12f'and H(P/'analysis/unstripped.so')=='750456180883c72cc7e94692b75503043357f35222aebad6d67049af8ee2ed99'
cache=P/'generated-cache';extra=d['private_cache_additions'];assert set(extra)=={'.package-cache','.package-cache-mutate','.global-cache','registry/CACHEDIR.TAG'}
for n,h in extra.items():assert H(cache/n)==h
for n in ['.package-cache','.package-cache-mutate']:assert(cache/n).read_bytes()==b''
assert(cache/'registry/CACHEDIR.TAG').read_text().startswith('Signature: 8a477f597d28d172789f06886806bc55\n')
con=sqlite3.connect('file:'+str(cache/'.global-cache')+'?mode=ro',uri=True);assert con.execute('PRAGMA integrity_check').fetchall()==[('ok',)]
tables={n:[list(r)for r in con.execute('SELECT * FROM "'+n+'"')]for n, in con.execute("SELECT name FROM sqlite_master WHERE type='table'")};assert tables==J(P/'cache-additions-review.json')['tables']and not tables['git_db']and not tables['git_checkout']
registry={row[0]:row[1]for row in tables['registry_index']};allowed=J(P/'original-proposal/cache-allowlist.json')['files'];assert len(tables['registry_crate'])==len(tables['registry_src'])==477
for reg,name,size,time in tables['registry_crate']:assert allowed[f'registry/cache/{registry[reg]}/{name}']['bytes']==size
for reg,name,size,time in tables['registry_src']:assert any(k.startswith(f'registry/src/{registry[reg]}/{name}/')for k in allowed)
subprocess.run([sys.executable,'-B',str(P/'analysis/full_inventory.py'),'--check'],check=True,stdout=subprocess.DEVNULL)
x=J(P/'analysis/all-original-transitions.json');assert len(x['all1035_original_rows'])==1035 and all(row['before']==row['after']for row in x['all1035_original_rows'])
ledger=json.loads(gzip.decompress((P/'analysis/full-before-after-inventory.json.gz').read_bytes()))
actual=[]
for orig in ledger['before']['original_windows']:
 row={'original_start':orig['start'],'original_end':orig['end'],'original_raw_sha256':orig['raw_sha256']}
 for side in ['before','after']:
  matches=[r for r in ledger[side]['pattern_comparisons']if r['original']==orig['start']]
  row[side]={'status':'raw'if any(r['raw_body_equal']for r in matches)else'call-consistent'if any(r['call_consistent_fixed_point']for r in matches)else'normalized'if matches else'unmatched','normalized_pairs':len(matches),'raw_pairs':sum(r['raw_body_equal']for r in matches),'call_consistent_pairs':sum(r['call_consistent_fixed_point']for r in matches)}
 actual.append(row)
assert x['all1035_original_rows']==actual
assert not x['whole_file_equal']
print('PASS: one unselected controlled build, authentic receipts, reviewed bookkeeping, unchanged complete1035-window inventory; whole identity unproved')
v=J(P/'emitted-review-relocations.json');old=P/'emitted-review-original';new=P/'emitted-review-published'
assert H(old/'manifest.json')==v['original_seal']=='28a3b17a779dd935eeead0c6a8a41e8ed7dc28d748d350b1f3e408f3bab8c662'and H(new/'manifest.json')==v['published_seal']
assert {str(f.relative_to(old))for f in old.rglob('*')if f.is_file()}=={str(f.relative_to(new))for f in new.rglob('*')if f.is_file()}
assert sorted(n for n in J(old/'manifest.json')if(old/n).read_bytes()!=(new/n).read_bytes())==sorted(['analyze.py','input-references.json','prior-references.json'])
code=(old/'analyze.py').read_text()
for a,b in v['code_replacements']:assert code.count(a)==1;code=code.replace(a,b)
assert(new/'analyze.py').read_text()==code
mapped={}
for name,row in J(old/'input-references.json').items():
 for a,b in v['input_prefixes']:
  if name.startswith(a):mapped[b+name[len(a):]]=row;break
 else:raise AssertionError(name)
assert J(new/'input-references.json')==mapped
assert J(new/'prior-references.json')=={v['prior_reference_keys'][k]:val for k,val in J(old/'prior-references.json').items()}
subprocess.run([sys.executable,'-B',str(new/'verify.py'),'--repo',str(P.parents[2])],check=True)
print('PASS: exact original emitted review retained; only declared path relocations in portable copy')
