#!/usr/bin/env python3
"""Reusable static-only comparison for a future accepted pair.
Example: python3 -B compare_pair.py ORIGINAL CANDIDATE OUTPUT_JSON
Does not inherit source attributions or ordinal matches from this publication.
"""
import json,sys
from pathlib import Path
from analyze import Elf,difference,dump

def compare(original,candidate):
 o,c=Elf(original),Elf(candidate)
 inventory={}
 for side,e,other in [('original',o,c),('candidate',c,o)]:
  inventory[side]=[dict(ordinal=i,**e.window(a,b,other)) for i,(a,b) in enumerate(zip(e.entries,e.entries[1:]+[e.hi]))]
 for side,other in [('original','candidate'),('candidate','original')]:
  for r in inventory[side]:
   r['raw_matching_other_ordinals']=[x['ordinal'] for x in inventory[other] if r['sha256']==x['sha256']]
   r['normalized_matching_other_ordinals']=[x['ordinal'] for x in inventory[other] if r['normalized_sha256']==x['normalized_sha256']]
 return dict(whole_file=difference(original,candidate),inventory=inventory,sections=dict(original=o.sections,candidate=c.sections),headers=dict(original=o.header,candidate=c.header),program_headers=dict(original=o.ph,candidate=c.ph),symbols=dict(original=o.symbols,candidate=c.symbols),relocations=dict(original=o.relocs,candidate=c.relocs),uncovered_text_ranges={side:[[e.lo,e.entries[0]]] if e.entries and e.lo<e.entries[0] else [[e.lo,e.hi]] if not e.entries else [] for side,e in [('original',o),('candidate',c)]},limits='Raw hashes and normalized hashes retain every candidate ambiguity. Same-position target/sample equality is only a diagnostic; no correspondence is inferred across shifted placements, no data extents or semantic equivalence are proved, and source provenance must be supplied anew.')
if __name__=='__main__':
 assert len(sys.argv)==4,'ORIGINAL CANDIDATE OUTPUT_JSON'
 Path(sys.argv[3]).write_text(dump(compare(Path(sys.argv[1]).read_bytes(),Path(sys.argv[2]).read_bytes())))
