exec(open('/workspace/fees-recovery/measure.py').read().split('original=')[0])
from collections import Counter,defaultdict
def blocks(image,start,size,windows):
 rows=w.m.instructions(image,start,size);by={x['offset']:x for x in rows};starts={0};mapping={x['address']:x for x in windows};rel=dict(w.m.relocations(image));dyn=w.dynamic_symbols(image)
 for row in rows:
  op=row['opcode'];offset=row['offset'];n=offset+len(bytes.fromhex(row['raw']))
  if op&7 in (5,6) and op!=0x85:
   if op!=0x95:starts.add(offset+8+row['displacement']*8)
   if n<size:starts.add(n)
 starts=sorted(x for x in starts if x in by);result=[]
 for begin,end in zip(starts,starts[1:]+[size]):
  body=[x for x in rows if begin<=x['offset']<end];tokens=[];calls=[]
  for row in body:
   info=rel.get(start+row['offset'],0);op=row['opcode']
   if op==0x85:
    target=('import',dyn[info>>32]['name']) if info&0xffffffff==10 else ('call',mapping[row['call_target']]['signature']);tokens.append(target);calls.append(target)
   elif op&7 not in (5,6):tokens.append(op)
  last=body[-1];successors=[];n=last['offset']+len(bytes.fromhex(last['raw']))
  if last['opcode']!=0x95:
   if last['opcode']&7 in (5,6) and last['opcode']!=0x85:successors.append(last['offset']+8+last['displacement']*8)
   if last['opcode']!=5 and n<size:successors.append(n)
  result.append(dict(start=begin,end=end,instructions=len(body),tokens=tokens,calls=calls,successors=successors,rows=body))
 return result
if __name__=='__main__':
 image=Path(sys.argv[1]).read_bytes();which=sys.argv[2];needle={'create':'19pump_fees_candidate23create_donation_fee_pda','crank':'19pump_fees_candidate22crank_donation_fee_pda'}[which]
 original=(R/'evidence/original/pump_fees/deployed.so').read_bytes();ow,cw=[w.windows(x)for x in[original,image]];target=next(x for x in cw if x['name'] and needle in x['name']);oa=163920 if which=='create' else 147944;of=next(x for x in ow if x['address']==oa)
 aa=blocks(original,oa,of['bytes'],ow);bb=blocks(image,target['address'],target['bytes'],cw)
 key=lambda b:json.dumps(b['tokens']);ac,bc=[Counter(key(b)for b in rows)for rows in[aa,bb]]
 report=dict(original_blocks=len(aa),candidate_blocks=len(bb),matched_opcode_call_block_multiplicities=sum((ac&bc).values()),original=aa,candidate=bb)
 Path(sys.argv[3]).write_text(json.dumps(report,indent=2)+'\n');print({k:v for k,v in report.items()if k not in['original','candidate']})
 for label,rows,other in [('original',aa,bc),('candidate',bb,ac)]:
  print(label,'unmatched')
  for b in rows:
   if not other[key(b)]:print(b['start'],b['instructions'],b['calls'])
