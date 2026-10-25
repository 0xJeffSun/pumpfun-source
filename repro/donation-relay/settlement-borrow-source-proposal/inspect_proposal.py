"""Reproducible text/dataflow and raw-call checks, not a Rust typecheck."""
import hashlib,json,re,struct
from pathlib import Path
H=lambda b:hashlib.sha256(b).hexdigest()
def function(text,name):
 m=re.search(r'\bfn '+re.escape(name)+r'(?:<[^\n]*?>)?\(',text);assert m,name
 i=text.index('{',m.start());level=1;j=i+1
 while level:
  level+=(text[j]=='{')-(text[j]=='}');j+=1
 return text[m.start():j]
def inspect(p):
 base=(p/'base-source/src/handlers.rs').read_text();new=(p/'source/src/handlers.rs').read_text()
 rows=[]
 for name in ['distribution108','distribute_body','distribute_after_just_swapping_v1','distribute_non_swap_output_mint_v1','observed_swap','just_swap_v1','swap_then_distribute_v1']:
  a=function(base,name);b=function(new,name);normalized=b.replace("s:&Settlement<'_>,",'s:&Settlement,')
  for field in ['s.program','s.authority','s.relayer','o.program','o.authority','o.relayer','c.input.relayer']:normalized=normalized.replace('*'+field,field)
  assert a==normalized,name
  rows.append(dict(function=name,before_sha256=H(a.encode()),after_sha256=H(b.encode()),equal_after_only_reference_dereference_adaptation=True,new_call_or_guard=False))
 frames=(p/'source/src/frames.rs').read_text();bindings=[]
 for frame in ['After','NonSwap','Just','Combined']:
  start=frames.index('impl '+{'After':'After','NonSwap':'NonSwap','Just':'Just','Combined':'Combined'}[frame]+'Frame<Account> for '+frame+' {')
  end=frames.find('\nimpl ',start+1);piece=frames[start:end if end!=-1 else len(frames)]
  calls=re.findall(r'settlement\(([^\n]*?)\)',piece)
  for call in calls:
   args=call.split(',');assert len(args)==5 and all(x.startswith('&self.') for x in args)
   bindings.append(dict(frame=frame,source=args[0],mint=args[1],program=args[2],authority=args[3],relayer=args[4],lifetime='borrow of the owning admitted frame; no live AccountInfo data/lamport borrow acquired'))
 assert len(bindings)==6
 old=json.loads((p/'build03/remaining-stack-errors.json').read_text());nd=json.loads((p/'n09/dispatch.json').read_text());w=json.loads((p/'build03/original-function-ledger.json').read_text());binary=(p/'build03/original.so').read_bytes();corrections=[]
 for name,wrong,body,adapter,parser,exit_ in [('just_swap_v1',186,99,202,150,153),('swap_then_distribute_v1',187,100,203,154,155)]:
  row=next(x for x in nd if x['name']==name);n=row['wrapper_ordinal'];o=w[n]
  oldrow=next(x for x in old if x['method']=='wrap_'+name);assert oldrow['original_wrapper_ordinal']==wrong
  assert H(binary[o['start']:o['end']])==o['raw_sha256']==row['direct_callee_sha256']
  pc=row['constant_pc'];op,reg,off,lo=struct.unpack_from('<BBhI',binary,pc);hi=struct.unpack_from('<I',binary,pc+12)[0]
  assert op==0x18 and (lo+(hi<<32)).to_bytes(8,'little').hex()==row['discriminator']
  pc=row['comparison_pc'];raw=binary[pc:pc+8];assert raw.hex()==row['raw_comparison']
  op,reg,off,imm=struct.unpack('<BBhi',raw);assert off==row['branch_displacement'] and pc+8+off*8==row['branch_target']
  pc=row['dispatch_call_pc'];op,reg,off,imm=struct.unpack_from('<BBhi',binary,pc);assert op==0x85 and reg>>4==1 and pc+8+imm*8==o['start']
  required=[w[x]['start'] for x in [parser,adapter,exit_]];assert all(t in [x['target'] for x in o['direct_calls']] for t in required)
  assert w[body]['start'] in [x['target'] for x in w[adapter]['direct_calls']]
  corrections.append(dict(name=name,old_incorrect_wrapper_ordinal=wrong,old_incorrect_role='after distribution' if wrong==186 else 'non-swap distribution',correct_wrapper_ordinal=n,correct_start=o['start'],correct_end=o['end'],correct_sha256=o['raw_sha256'],correct_min_direct_r10_offset=min(x['offset'] for x in o['direct_r10_accesses']),discriminator=row['discriminator'],discriminator_constant_pc=row['constant_pc'],dispatch_call_pc=row['dispatch_call_pc'],parser_ordinal=parser,adapter_ordinal=adapter,body_ordinal=body,exit_ordinal=exit_,unchanged=['actual candidate code/hash','actual candidate diagnostics','all raw/normalized match ledgers','reported original minimum r10 -4088']))
 evidence=[]
 for n in [91,97,98,99,100,108,109,146,147,148,149,150,153,154,155,169,184,185,186,187,200,201,202,203]:
  r=w[n];b=binary[r['start']:r['end']];assert H(b)==r['raw_sha256'];evidence.append(dict(ordinal=n,start=r['start'],end=r['end'],sha256=H(b),direct_calls=r['direct_calls'],data_references=r['data_references']))
 return {'effect-preservation.json':rows,'borrow-bindings.json':bindings,'build03-attribution-correction.json':corrections,'original-role-windows.json':evidence}
if __name__=='__main__':
 p=Path(__file__).resolve().parent
 for n,x in inspect(p).items():(p/n).write_text(json.dumps(x,indent=2,sort_keys=True)+'\n')
