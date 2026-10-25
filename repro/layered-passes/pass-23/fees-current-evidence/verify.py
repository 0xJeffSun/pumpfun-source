from pathlib import Path
import argparse,json,hashlib,gzip,tarfile
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--scratch',type=Path);a.add_argument('--repo',type=Path);args=a.parse_args();m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert H((P/n).read_bytes())==h,n
assert H((P/'scratch-manifest.json').read_bytes())=='52cd978029f67b8c79e738131fa2bec3251de8fdfc2a22270e1464b210125ba7';sm=J(P/'scratch-manifest.json')
for n,b in J(P/'bindings.json').items():
 raw=gzip.decompress((P/n).read_bytes())if b['gzip']else(P/n).read_bytes();assert H(raw)==b['raw_sha256']and H((P/n).read_bytes())==b['export_sha256'];assert sm[b['archive']]==b['archive_sha256']
 if args.scratch:
  arc=args.scratch/b['archive'];assert H(arc.read_bytes())==b['archive_sha256']
  with tarfile.open(arc)as z:assert z.extractfile(b['member']).read()==raw
count=0
for f in(P/'validation').glob('*.json.gz'):
 d=json.loads(gzip.decompress(f.read_bytes()));assert d['candidate_sha256']=='2387f8139a13918a5c9c523f140ecdd72db7243c8e2ed9cd7e1ff9d42ad6c8af'and not d.get('mismatches',[])
 if f.name=='donation-sequence.json.gz':assert len(d['steps'])==10 and all(x['match']for x in d['steps'])
 else:count+=d['case_count']
assert count==17461 and J(P/'coverage.json')['admin_match_cases']==[]
main=P/'main-reference';assert H((main/'manifest.json').read_bytes())=='4049a50a07bfb8a4c51b95776607e86abc3ca1588a8d29f7dfde769a5ed51135';mm=J(main/'manifest.json')
for n in['main/build-comparison.json','controls/identity.json']:assert H((main/n).read_bytes())==mm[n]
src=J(P/'source-sha256.json');ms=J(P/'main-source-sha256.json');assert len(src)==len(ms)==26 and[n for n in src if src[n]!=ms[n]]==['programs/pump-fees/README.md'];assert ms==J(main/'main/build-comparison.json')['source_sha256']
if args.repo:
 for n,h in ms.items():assert H((args.repo/n).read_bytes())==h,n
 report=J(main/'main/build-comparison.json');assert report['comparison']['original_sha256']=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
 candidate=args.repo/'repro/pump_fees/sharing-authorize-main-v144/main/candidate.so'
 assert H(candidate.read_bytes())=='2387f8139a13918a5c9c523f140ecdd72db7243c8e2ed9cd7e1ff9d42ad6c8af'
print(json.dumps({'passed':True,'reports':11,'comparisons':17461,'separate_steps':10,'admin_only_coverage':0,'new_VM_executions':0}))
