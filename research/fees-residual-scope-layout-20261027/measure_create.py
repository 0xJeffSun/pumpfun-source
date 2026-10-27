exec(open('/workspace/fees-recovery/measure.py').read().split('original=')[0])
from collections import Counter
original=(R/'evidence/original/pump_fees/deployed.so').read_bytes();candidate=Path(sys.argv[1]).read_bytes();ow,cw=[w.windows(x)for x in [original,candidate]];target=next(r for r in cw if r['name']and'19pump_fees_candidate23create_donation_fee_pda'in r['name']);aa,ap=normalize(original,163920,13800);bb,bp=normalize(candidate,target['address'],target['bytes']);a=[r[1]for r in aa];b=[r[1]for r in bb];report=dict(candidate_bytes=target['bytes'],candidate_instructions=target['instructions'],normalized_exact=a==b and ap==bp,same_offset_rows=sum(x==y for x,y in zip(a,b)),aligned_rows=sum(x.size for x in difflib.SequenceMatcher(None,a,b,autojunk=False).get_matching_blocks()),normalized_original_windows=sum(r['signature']in{v['signature']for v in cw}for r in ow),candidate_windows=len(cw))
cs=[]
for image,rows,start,size in [(original,ow,163920,13800),(candidate,cw,target['address'],target['bytes'])]:
 mapping={r['address']:r for r in rows};rels=dict(w.m.relocations(image));calls=Counter()
 for row in w.m.instructions(image,start,size):
  if'call_target'in row and rels.get(start+row['offset'],0)&0xffffffff!=10:calls[mapping[row['call_target']]['signature']]+=1
 cs.append(calls)
report.update(missing_direct_targets=dict(cs[0]-cs[1]),extra_direct_targets=dict(cs[1]-cs[0]));Path(sys.argv[2]).write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
