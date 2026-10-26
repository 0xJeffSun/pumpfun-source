"""Recompute saved ELF ledgers with the unchanged sealed method; stdlib only."""
from pathlib import Path
import argparse,gzip,hashlib,json
from compare import P,OLD,NEW,MAC,H,run,transitions,summary,table
J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve()
manifest=J(P/'manifest.json');actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'};assert actual==set(manifest)
for n,row in manifest.items():b=(P/n).read_bytes();assert len(b)==row['bytes'] and H(b)==row['sha256'],n
for n,row in J(P/'input-references.json').items():b=(R/n).read_bytes();assert len(b)==row['bytes'] and H(b)==row['sha256'],n
assert (P/'reference-build12-analyze.py').read_bytes()==(R/MAC/'reference-build12-analyze.py').read_bytes()
assert H((P/'reference-build12-analyze.py').read_bytes())=='095fc2d63be0fe4233bdf4e5946cac8d03d9b1747fd39147eea9a98c12dda175'
assert H((R/OLD/'candidate.so').read_bytes())=='e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244'
assert H((R/OLD/'unstripped.so').read_bytes())=='2df866f5a9a629199ba856861fa3bf9ed03e8f1a265eadc5c5a990589d547596'
assert H((R/NEW/'build-01/candidate.so').read_bytes())=='506b11353f8eb15d079794656eaf6c10d1a8da2c50d2e90cbdbe949a3ecdd0fb'
s=J(P/'source-equality.json');assert len(s)==23 and s==J(R/OLD/'source-map.json')==J(R/NEW/'source-map.json')
for n,h in s.items():assert H((R/OLD/'source'/n).read_bytes())==H((R/NEW/'source'/n).read_bytes())==h
before=run(R,'prior-v144');after=run(R,'actual-linux-v148')
for label,d in [('prior-v144',before),('actual-linux-v148',after)]:
 for n,v in d.items():
  stored=P/label/(n if n.endswith('.gz')else n+'.gz');assert json.loads(gzip.decompress(stored.read_bytes()))==v,(label,n)
  if label=='actual-linux-v148':
   b=(R/NEW/'full-ledger'/n).read_bytes();assert json.loads(gzip.decompress(b)if n.endswith('.gz')else b)==v,n
assert before['original-function-ledger.json']==after['original-function-ledger.json']
rows=transitions(before,after);assert json.loads(gzip.decompress((P/'transitions.json.gz').read_bytes()))==rows
assert(P/'transition-table.tsv').read_text()==table(rows);assert J(P/'comparison-summary.json')==summary(before,after,rows)
assert len(rows)==492 and {r['ordinal']for r in rows}==set(range(492))
assert sum(r['normalized_transition']=='gained'for r in rows)==103 and not any(r['normalized_transition']=='lost'for r in rows)
assert sum(r['raw_transition']=='gained'for r in rows)==25 and not any(r['raw_transition']=='lost'for r in rows)
assert before['comparison-summary.json']['original_normalized_match_windows']==122 and after['comparison-summary.json']['original_normalized_match_windows']==225
print('PASS: exact same method recomputed both complete saved artifacts, all23 source inputs equal, all492 status/raw/normalized rows and full calls/data/negative ledgers retained; no build/runtime')
