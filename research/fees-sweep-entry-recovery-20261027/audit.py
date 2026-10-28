exec(open('/workspace/fees-recovery/measure.py').read().split('original=')[0])
from collections import Counter
original=(R/'evidence/original/pump_fees/deployed.so').read_bytes();parent=Path('/workspace/fees-recovery/accepted-symbols.so').read_bytes();candidate=Path(sys.argv[1]).read_bytes()
ow,pw,cw=[w.windows(x)for x in [original,parent,candidate]]
pairs=w.compare(ow,cw);pkeys={r['signature']for r in pw};ckeys={r['signature']for r in cw}
fs=[w.m.functions(x)for x in [parent,candidate]];names=[{r['name']:r for r in f}for f in fs]
report=dict(original_windows=len(ow),candidate_windows=len(cw),unique_normalized_pairs=len(pairs['unique_pairs']),normalized_original_windows=sum(r['signature']in ckeys for r in ow),raw_matches=sum(r['raw_sha256']in{v['raw_sha256']for v in cw}for r in ow),ambiguous_groups=len(pairs['ambiguous']),lost_original=[r['address']for r in ow if r['signature']in pkeys and r['signature']not in ckeys],unmatched_original=[dict(address=r['address'],bytes=r['bytes'])for r in pairs['unmatched_original']],parent_symbol_count=len(names[0]),candidate_symbol_count=len(names[1]),common_symbol_names=len(names[0].keys()&names[1].keys()),rodata_equal=w.m.section_data(original,'.rodata')==w.m.section_data(candidate,'.rodata'),whole_elf_equal=original==candidate)
Path(sys.argv[2]).write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
