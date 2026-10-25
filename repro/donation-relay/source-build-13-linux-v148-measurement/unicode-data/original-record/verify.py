"""Standard-library verification of complete saved Unicode consumers/tables."""
from pathlib import Path
import argparse,hashlib,json
from analyze import analyze,P,H,MAC
J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve()
m=J(P/'manifest.json');assert {str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f.name!='manifest.json'}==set(m)
for n,v in m.items():b=(P/n).read_bytes();assert H(b)==v['sha256'] and len(b)==v['bytes'],n
for n,v in J(P/'input-references.json').items():b=(R/n).read_bytes();assert H(b)==v['sha256'] and len(b)==v['bytes'],n
prior=J(P/'prior-reference.json');q=P.parent/prior['folder'];assert H((q/'manifest.json').read_bytes())==prior['manifest_sha256']
for n,v in J(q/'manifest.json').items():assert H((q/n).read_bytes())==v['sha256'],n
assert H((P/'extent_links.py').read_bytes())=='2d15ad0d4757ac153fbe62af58b224bf0f7665f5f4cbe951f09253624f6bdc8d'
assert (P/'extent_links.py').read_bytes()==(R/'repro/donation-relay/source-build-12-v147-measurement/extent_links.py').read_bytes()
assert (P/'reference-build12-analyze.py').read_bytes()==(R/MAC/'reference-build12-analyze.py').read_bytes()
assert (P/'unicode-printable.rs').read_bytes()==(R/MAC/'primary-source/library_core_src_unicode_printable.rs').read_bytes()==(R/'repro/donation-relay/source-build-12-v147-measurement/primary-source/rust-library_core_src_unicode_printable.rs').read_bytes()
r=J(P/'owning-source-receipt.json');assert r in J(R/MAC/'primary-source/receipts.json') and r['sha256']==H((P/'unicode-printable.rs').read_bytes()) and r['commit']=='293a1b6c60a0b8d92593843c373539e21e3ba087'
d=analyze(R);assert d==J(P/'proof.json');assert J(P/'analysis-summary.json')=={k:d[k]for k in ['full_table_bytes','all_six_complete_tables_equal','layouts']}
for t in d['table_artifacts']:
 assert t['argument_extent_proof']['all_six_full_array_extents_passed']
 for x in t['tables']:
  b=(P/t['artifact']/(x['constant']+'.bin')).read_bytes();assert b.hex()==x['hex'] and H(b)==x['sha256'] and len(b)==x['bytes']
 assert d['layouts'][t['artifact']]['covered_span']==1449 and not any(x['bytes']for x in d['layouts'][t['artifact']]['gaps'])
print('PASS: original + actualLinux13 complete696/704 bodies/realcall, six full1449B tables, actual arguments/strides/endpoints, no gaps/overlaps, diagnostic descriptors/path and bounded callees; transitive panic remains open; no execution')
