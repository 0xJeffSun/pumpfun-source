#!/usr/bin/env python3
"""Python3 stdlib only. Static integrity/range/receipt verifier, no Solana execution.
Usage: python3 verify.py [optional-main-repository-root]
"""
import collections,gzip,hashlib,json,pathlib,sys,re
HERE=pathlib.Path(__file__).resolve().parent
h=lambda b:hashlib.sha256(b).hexdigest()
def load(p):return json.loads((HERE/p).read_bytes())
manifest=load('input-manifest.json'); r=load('result.json'); idx=load('case-index.json')
for p,m in manifest.items():
 b=(HERE/m['snapshot']).read_bytes()
 assert len(b)==m['bytes'] and h(b)==m['sha256'],p
 if len(sys.argv)>1:assert (pathlib.Path(sys.argv[1])/p).read_bytes()==b,('live input drift',p)
raw={p:(HERE/m['snapshot']).read_bytes() for p,m in manifest.items()}
refs=0
def walk(x):
 global refs
 if isinstance(x,dict):
  if {'path','line_start','line_end','byte_start','byte_end_exclusive','sha256'}<=x.keys():
   b=raw[x['path']];ls=b.splitlines(keepends=True);a=x['line_start'];z=x['line_end'];s=b''.join(ls[a-1:z])
   assert 1<=a<=z<=len(ls)
   assert sum(map(len,ls[:a-1]))==x['byte_start'] and sum(map(len,ls[:z]))==x['byte_end_exclusive']
   assert b[x['byte_start']:x['byte_end_exclusive']]==s and h(s)==x['sha256'];refs+=1
  for v in x.values():walk(v)
 elif isinstance(x,list):
  for v in x:walk(v)
walk(r)
P='repro/pump/bonding-curve-serializer-fortyeight/'
sm=json.loads(raw[P+'source-sha256.json'])
for p,d in r['source_binding'].items():assert sm[p]==d==h(raw[p]),p
binding=json.loads(raw[P+'receipt-build-bindings.json']); receipts={}
for s in r['receipt_summaries']:
 p=s['path'];b=raw[p];d=json.loads(gzip.decompress(b));receipts[p]=d
 assert h(b)==s['sha256'] and d['candidate_sha256']==r['candidate_sha256']
 assert len(d['cases'])==s['case_count'] and not d['mismatches']
 assert sum(c['original']['error'] is None for c in d['cases'])==s['original_successes']
 matches=[x for x in binding if x['receipt_sha256']==h(b)]
 assert matches and all(x['executed_candidate_sha256']==r['candidate_sha256'] for x in matches)
seen=set()
labels={'sell_v3':'SellV3','buy_v3':'BuyV3','buy_exact_quote_in_v3':'BuyExactQuoteInV3','create_v2':'CreateV2'}
for x in idx:
 key=(x['receipt'],x['json_pointer']);assert key not in seen;seen.add(key)
 i=int(x['json_pointer'].removeprefix('/cases/'));c=receipts[x['receipt']]['cases'][i]
 assert h(json.dumps(c,sort_keys=True,separators=(',',':')).encode())==x['case_canonical_sha256']
 assert c['case']==x['case'] and c['original']['error']==x['original_error'] and c['candidate']['error']==x['candidate_error']
 assert x['original_error']==x['candidate_error']
 assert all(c[k] is True for k in ['match'] if k in c)
 assert all(not c[k] for k in ['diff','different_fields'] if k in c)
 # Early argument/parser failures can precede handler logging; where present check expected instruction.
 logs=c['original']['logs'];instruction_logs=[l for l in logs if any(l.endswith('Instruction: '+v) for v in labels.values())]
 assert all(l.endswith('Instruction: '+labels[x['function']]) for l in instruction_logs)
assert len(idx)==sum(s['case_count'] for s in r['receipt_summaries'])
idl=json.loads(raw['evidence/upstream/pump.json'])
for f,x in r['functions'].items():
 ins=idl['instructions'][int(x['idl_json_pointer'].split('/')[-1])];assert ins['name']==f
 assert ins['args']==x['idl_args'] and ins['discriminator']==x['discriminator']
 fixed=[a for a in x['accounts'] if isinstance(a['index'],int)]
 assert [a['idl'] for a in fixed]==ins['accounts']
 assert all(g['status'] in r['status_definitions'] and not g['semantic_equivalence_proven'] for g in x['gaps'])
 assert {(v['receipt'],v['json_pointer']) for v in x['retained_evidence_case_pointers']}=={(v['receipt'],v['json_pointer']) for v in idx if v['function']==f}
# Recompute explicit source decision/error sites in declared direct/helper spans.
pat=re.compile(r'\b(?:if|else|match|while|for|return)\b|require(?:_keys_eq|_eq|_neq|_keys_neq)?!|\?|&&|\|\||checked_[a-z_]+|saturating_[a-z_]+')
for f,x in r['functions'].items():
 expected=[]
 for span in x['source_segments']:
  ls=raw[span['path']].decode().splitlines()
  for n in range(span['line_start'],span['line_end']+1):
   matches=list(pat.finditer(ls[n-1].split('//',1)[0]))
   if matches:expected.append((span['path'],n,[{'text':m.group(),'column_1_based':m.start()+1} for m in matches]))
 assert expected==[(v['source_range']['path'],v['source_range']['line_start'],v['tokens']) for v in x['source_decision_sites']]
for q in load('priority-evidence.json'):
 expected=[{'receipt':v['receipt'],'json_pointer':v['json_pointer'],'function':v['function'],'case':v['case'],'original_error':v['original_error']} for v in idx if v['function'] in q['functions'] and any(k in v['case'] for k in q['any_explicit_case_keys'])]
 assert expected==q['matches']
assert not r['whole_byte_goal_complete'] and r['builds']==r['new_runtime_cases']==0
if len(sys.argv)>1:assert h((pathlib.Path(sys.argv[1])/P/'candidate.so').read_bytes())==r['candidate_sha256']
# Optional publication artifact seal, excludes itself and evolving CLI log files.
seal=HERE/'artifact-sha256.json'
if seal.exists():
 for p,d in json.loads(seal.read_bytes()).items():assert h((HERE/p).read_bytes())==d,('artifact drift',p)
print(json.dumps({'verified':True,'input_files':len(manifest),'source_ranges':refs,'functions':len(r['functions']),'gap_rows':sum(len(x['gaps']) for x in r['functions'].values()),'account_rows':sum(len(x['accounts']) for x in r['functions'].values()),'saved_case_rows':len(idx),'new_runtime_executions':0,'signature_reverification':False,'semantic_equivalence':False},indent=2))
