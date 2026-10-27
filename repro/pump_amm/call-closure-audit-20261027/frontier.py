#!/usr/bin/env python3
"""Rank unresolved actual-call target pairs; metadata labels are conservative heuristics."""
from pathlib import Path
import collections,gzip,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
HERE=Path(__file__).resolve().parent;BASE=ROOT/'repro/pump_amm/diagnostic-parity-20261027/results'
def analyze(result,candidate,symbols,measurement):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols);m=json.loads(gzip.decompress(measurement.read_bytes()));windows={r['start']:r for r in m['rows']};names=collections.defaultdict(list);sizes=collections.defaultdict(set)
 for f in s.funcs:names[f['start']].append(f['name']);sizes[f['start']].add(f['size'])
 grouped=collections.defaultdict(list)
 for r in result['unmatched_direct_boundaries']:grouped[(r['original_target'],r['candidate_target'])].append(r)
 output=[]
 for (ot,ct),refs in grouped.items():
  original=windows.get(ot);osize=original['end']-ot if original else None;csizes=sorted(sizes[ct]);diff=None;nearpaths=[];same_pattern=False;classification='unresolved target shape';reason='No equal-size target symbol with the original window size.'
  if osize in sizes[ct]:
   same_pattern=o.pattern(ot,osize)==c.pattern(ct,osize)
   diff=[i for i in range(0,osize,8)if o.normalized[ot+i:ot+i+8]!=c.normalized[ct+i:ct+i+8]]
   plausible=bool(diff)and same_pattern
   for off in diff:
    a,b=o.normalized[ot+off:ot+off+8],c.normalized[ct+off:ct+off+8]
    small_fields=a[:4]==b[:4]and a[0]in (0x62,0x7a)and all(0<=struct.unpack_from('<i',v,4)[0]<6000 for v in [a,b])
    path_near=False
    for at,rel in o.relocations.items():
     if rel['type']!=8 or not ot<=at<ot+osize or abs(at-(ot+off))>80 or o.b[at]!=0x18:continue
     ca=ct+at-ot
     if c.b[ca]!=0x18:continue
     def pointer(e,p):return struct.unpack_from('<I',e.b,p+4)[0]|(struct.unpack_from('<I',e.b,p+12)[0]<<32)
     x,y=pointer(o,at),pointer(c,ca)
     atext=o.b[x:x+90];btext=c.b[y:y+90]
     if (atext.startswith(b'programs/pump-amm/src/')or atext.startswith(b'/home/runner/'))and(btext.startswith(b'src/')or btext.startswith(b'/home/runner/')):
      path_near=True;nearpaths.append({'offset':at-ot,'original_prefix':atext.decode('utf8','backslashreplace'),'candidate_prefix':btext.decode('utf8','backslashreplace')})
    plausible&=small_fields and path_near
   if plausible:
    classification='likely source metadata only';reason='Equal-sized same-relocation-shape bodies differ only in small immediate stack stores near paired source-path literals. This is a heuristic, not semantic proof.'
   else:
    classification='substantive instruction or layout difference';reason='Equal-size bodies differ outside the narrowly recognized source-metadata store pattern; the difference can still be compiler/layout rather than behavior.'
  if original and original['matches']:
   classification='alternate body alias mismatch';reason='The original target already matches another candidate symbol, but this candidate caller invokes a different target. This commonly rejects a false caller alias; it is not automatically a program defect.'
  output.append({'original_target':ot,'original_bytes':osize,'candidate_target':ct,'candidate_bytes':csizes,'candidate_symbol_names':sorted(set(names[ct])),'incoming_original_windows':len({r['original']for r in refs}),'incoming_caller_pairs':len({(r['original'],r['candidate'])for r in refs}),'incoming_call_sites':len(refs),'original_target_has_other_body_match':bool(original and original['matches']),'equal_relocation_shape':same_pattern,'different_instruction_offsets':diff,'classification':classification,'classification_reason':reason,'nearby_source_paths':list({json.dumps(v,sort_keys=True):v for v in nearpaths}.values()),'callers':refs})
 output.sort(key=lambda r:(r['original_target_has_other_body_match'],-r['incoming_original_windows'],-r['incoming_caller_pairs'],-r['incoming_call_sites'],r['original_target'],r['candidate_target']))
 return {'candidate_sha256':result['candidate_sha256'],'scope':'Ranks actual target-pair failures from all initial body-match pairs. Counts may include false candidate aliases. Prioritize targets with no other body match; inspect caller identity before treating a frontier edge as a behavioral defect. Metadata classification is heuristic and never changes accepted pairs.','rows':output}
if __name__=='__main__':
 r=analyze(json.loads((HERE/'results.json').read_text()),BASE/'build/candidate.so',BASE/'build/unstripped.so',BASE/'measurement.json.gz');p=HERE/'frontier.json';assert not p.exists();p.write_text(json.dumps(r,indent=2)+'\n')
 for x in r['rows'][:15]:print(hex(x['original_target']),x['original_bytes'],hex(x['candidate_target']),x['incoming_original_windows'],x['classification'],x['candidate_symbol_names'][:1])
