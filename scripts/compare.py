#!/usr/bin/env python3
"""Compare a separately built artifact, including allocation padding; never copies code."""
import argparse,hashlib,json,pathlib,sys
from analyze import elf_layout

def digest(b): return hashlib.sha256(b).hexdigest()
def compare(original,candidate):
    first=next((i for i,(a,b) in enumerate(zip(original,candidate)) if a!=b),None)
    if first is None and len(original)!=len(candidate): first=min(len(original),len(candidate))
    return {'original_bytes':len(original),'candidate_bytes':len(candidate),'original_sha256':digest(original),'candidate_sha256':digest(candidate),'full_byte_equality':original==candidate,'first_difference':first,'different_positions_in_shared_length':sum(a!=b for a,b in zip(original,candidate)),'length_difference':len(candidate)-len(original)}
def main():
    ap=argparse.ArgumentParser(); ap.add_argument('program'); ap.add_argument('candidate',type=pathlib.Path); ap.add_argument('--pad-zero-to-allocation',action='store_true'); ap.add_argument('--require-raw-equality',action='store_true',help='exit successfully only if the unmodified candidate input equals the complete capture'); ap.add_argument('--output',type=pathlib.Path,required=True); args=ap.parse_args()
    root=pathlib.Path(__file__).resolve().parents[1]
    if args.program not in json.loads((root/'repro/programs.json').read_text()): ap.error('unknown program')
    original=(root/f'evidence/original/{args.program}/deployed.so').read_bytes(); candidate=args.candidate.read_bytes()
    if args.output.exists(): ap.error('output already exists')
    input_comparison=compare(original,candidate)
    before=input_comparison['candidate_sha256']
    input_bytes=len(candidate)
    if args.pad_zero_to_allocation:
        layout=elf_layout(original)
        if not layout['trailing_all_zero']: ap.error('captured allocation suffix is nonzero')
        if len(candidate)>len(original): ap.error('candidate exceeds allocation')
        elf_layout(candidate)
        candidate+=bytes(len(original)-len(candidate))
    result=compare(original,candidate) if args.pad_zero_to_allocation else dict(input_comparison); result.update({'candidate_input_sha256':before,'candidate_input_comparison':input_comparison,'comparison_scope':'zero_padded_allocation_image' if args.pad_zero_to_allocation else 'unmodified_candidate_input','padding_bytes_added':len(candidate)-input_bytes,'require_raw_equality':args.require_raw_equality,'zero_padding_requested':args.pad_zero_to_allocation,'source_provenance_verified':False,'note':'Byte equality alone does not prove compilation from source. Original bytes must never be inputs to compilation/linking. When padding is requested, top-level equality describes the allocation image; candidate_input_comparison always describes the unmodified input.'})
    args.output.mkdir(parents=True)
    (args.output/'comparison.json').write_text(json.dumps(result,indent=2)+'\n')
    if args.pad_zero_to_allocation: (args.output/'candidate.deployed.so').write_bytes(candidate)
    accepted=input_comparison['full_byte_equality'] if args.require_raw_equality else result['full_byte_equality']
    print(json.dumps(result,indent=2)); return 0 if accepted else 1
if __name__=='__main__': sys.exit(main())
