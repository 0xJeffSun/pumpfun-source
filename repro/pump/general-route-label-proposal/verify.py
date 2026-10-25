#!/usr/bin/env python3
from pathlib import Path
import argparse,difflib,hashlib,json,re,struct
P=Path(__file__).resolve().parent;sha=lambda b:hashlib.sha256(b).hexdigest();load=lambda n:json.loads((P/n).read_text())
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args();m=load('manifest-sha256.json');actual={str(q.relative_to(P))for q in P.rglob('*')if q.is_file()and q.name!='manifest-sha256.json'};assert actual==set(m)
for name,d in m.items():b=(P/name).read_bytes();assert sha(b)==d['sha256']and len(b)==d['bytes'],name
proposal=load('proposal.json');before=(P/'before.rs').read_text();after=(P/'proposed.rs').read_text();expected=before
for old,new in proposal['replacements'].items():
 assert len(re.findall(r'\b'+old+r'\b',before))==proposal['occurrence_counts'][old]
 expected=re.sub(r'\b'+old+r'\b',new,expected)
assert expected==after and sha(after.encode())==proposal['proposed_sha256']and sha(before.encode())==proposal['before_sha256']
assert (P/'source.patch').read_text()==''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump/src/multi_hop_curve.rs',tofile='b/programs/pump/src/multi_hop_curve.rs'))
prior=load('prior-hop-parser-comparison.json');assert prior['bytes']==proposal['parser_bytes']==3512
windows=load('prior-route-windows.json');old_seal=load('prior-build-manifest.json')
assert sha((P/'prior-route-windows.json').read_bytes())==old_seal['static/route-windows.json']['sha256']
ow=next(x['analysis']for x in windows['original_admitted_windows']if x['analysis']['start']==proposal['original_parser_start'])
cw=next(x['analysis']for x in windows['candidate_route_windows']if x['start']==proposal['candidate_parser_start'])
for label,w in [('original',ow),('candidate',cw)]:
 b=(P/(label+'-hop.bin')).read_bytes();assert b.hex()==w['raw_hex']and sha(b)==w['raw_sha256']and len(b)==w['bytes']==3512
assert len(cw['direct_calls'])==33 and all(row['normalized_complete_target_matches']for row in prior['calls'])
for row in load('label-evidence.json'):
 for label,start in [('original',proposal['original_parser_start']),('candidate',proposal['candidate_parser_start'])]:
  b=(P/(label+'-hop.bin')).read_bytes();d=row[label];off=row['offset'];assert len(b)==3512 and b[off:off+24].hex()==d['instructions_hex'];assert b[off]==0x18
  ptr=struct.unpack_from('<I',b,off+4)[0]|struct.unpack_from('<I',b,off+12)[0]<<32
  assert ptr==d['pointer']and start+off==d['instruction_offset']and struct.unpack_from('<i',b,off+20)[0]==d['length']
  assert bytes.fromhex(d['literal_hex'])==row[label+'_label'].encode()and len(bytes.fromhex(d['literal_hex']))==d['length']
  prior_row=next(x for x in prior['data']if x['offset']==off);assert prior_row[label]['target']==ptr and prior_row[label]['preview_hex'].startswith(d['literal_hex'])
macro=load('macro-provenance.json');assert macro['name']=='anchor-syn'and macro['version']=='0.31.2'
for name in ['try_accounts.rs','constraints.rs']:
 digest=sha((P/'macro'/name).read_bytes());assert all(t['source_files_sha256']['src/codegen/accounts/'+name]==digest for t in macro['source_trees_observed'])
assert 'let name = f.ident.to_string();'in(P/'macro/try_accounts.rs').read_text()and '.with_account_name(#name)'in(P/'macro/try_accounts.rs').read_text()
assert 'let account_name = account_name.to_string();'in(P/'macro/constraints.rs').read_text()
if a.repo:
 for path,d in load('inputs.json').items():assert sha((a.repo/path).read_bytes())==d['sha256'],path
 for label,path,start in [('original','evidence/original/pump/deployed.so',proposal['original_parser_start']),('candidate','work/pump-general-route-recovery/run-01/build-01/artifacts/pump_recovered.so',proposal['candidate_parser_start'])]:
  b=(a.repo/path).read_bytes();assert b[start:start+3512]==(P/(label+'-hop.bin')).read_bytes()
  for row in load('label-evidence.json'):
   d=row[label];assert b[d['pointer']:d['pointer']+d['length']].hex()==d['literal_hex']
print(json.dumps(dict(pass_=True,payloads=len(m),source_paths=1,label_sites=4,proposed_sha256=proposal['proposed_sha256'],builds=0,runtime_executions=0)))
