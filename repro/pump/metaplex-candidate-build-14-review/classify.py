"""Read-only exact residue classification; no target execution or byte rewriting."""
from pathlib import Path
import hashlib,json,struct
from elf_reader import Elf
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/dependencies/token_metadata/deployed.so').is_file())
H=lambda b:hashlib.sha256(b).hexdigest()
def analyze():
 O=Elf(ROOT/'evidence/dependencies/token_metadata/deployed.so');C=Elf(P/'build14/token_metadata.so');A=Elf(ROOT/'repro/pump/metaplex-candidate-build-11/token_metadata.so')
 assert C.b==A.b and O.entries==C.entries and len(O.entries)==1251
 windows=[dict(ordinal=i,start=a,end=b,equal=O.b[a:b]==C.b[a:b]) for i,(a,b) in enumerate(zip(O.entries,O.entries[1:]+[O.hi]))]
 assert [x['ordinal'] for x in windows if not x['equal']]==[346]
 assert all(O.secs[n][4:6]==C.secs[n][4:6] for n in O.secs)
 s,n=O.secs['.data.rel.ro'][4:6];records=json.loads((ROOT/'repro/pump/metaplex-candidate-build-11/raw-difference-classification.json').read_text())['different_source_locations'];covered=set()
 for r in records:
  at=s+r['offset'];op,ol,oline,ocol=struct.unpack_from('<QQII',O.b,at);cp,cl,cline,ccol=struct.unpack_from('<QQII',C.b,at)
  assert op==cp and ol==cl and O.b[op>>32:(op>>32)+ol].decode()==r['file']
  assert (oline,ocol,cline,ccol)==(r['original_line'],r['original_column'],r['candidate_line'],r['candidate_column'])
  covered.update(range(at+16,at+24))
 diff={i for i in range(s,s+n) if O.b[i]!=C.b[i]};assert len(diff)==30 and diff<=covered
 rel=dict(original_only=[dict(file_offset=k,**v) for k,v in O.relocations.items() if C.relocations.get(k)!=v],candidate14_only=[dict(file_offset=k,**v) for k,v in C.relocations.items() if O.relocations.get(k)!=v])
 assert len(O.relocations)==len(C.relocations)==2749
 return dict(scope='Raw saved-byte classification only; no address mapping or target execution',candidate14_raw_equal_candidate11=True,exact_function_windows=sum(x['equal'] for x in windows),total_function_windows=len(windows),windows=windows,all_text_differences_inside_utilize=all(236632<=i<241736 for i in range(O.lo,O.hi) if O.b[i]!=C.b[i]),relocation_count=2749,relocation_record_differences=rel,decoded_source_coordinate_records=records,data_differing_byte_positions=sorted(diff),source_coordinate_bytes=len(diff),section_extents_equal=True)
if __name__=='__main__':
 print(json.dumps(analyze(),indent=2))
