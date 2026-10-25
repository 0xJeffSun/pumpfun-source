#!/usr/bin/env python3
"""Frozen BuyV3 body/call comparisons. Reads data only, no target execution."""
import json, struct
from pathlib import Path
from analyze import ELF,H,ranges

def focused(root):
 p=Path(root);o=ELF(p/'review/composition/prior/pump_buy_fee_selection_closure/evidence/original.so');c=ELF(p/'inputs/binary/candidate.so');s=ELF(p/'inputs/binary/unstripped.so')
 x=json.loads((p/'residual-ledger.json').read_text());rows=[]
 for name,a,z,j in [('wrapper',0x1286c8,0x128c28,276),('parser',0x102578,0x105b78,426),('body',0x147ba0,0x1489f8,375),('exit',0x107b38,0x107f78,427)]:
  cw=x['candidate_windows'][j];l,h=cw['start'],cw['end'];ob=o.at(a,z-a);cb=c.at(l,h-l)
  def norm(e,lo,hi):
   b=bytearray(e.at(lo,hi-lo));calls=[]
   for pc,op,reg,off,imm in e.instructions(lo,hi):
    if op==0x85:
     rel=[r for r in e.reloc if pc<=r['offset']<pc+8]
     encoded=pc+8+8*imm if reg==0x10 else None
     t=encoded if not rel else None
     calls.append(dict(pc=pc,target=t,encoded_target=encoded,bytes=e.at(pc,8).hex(),candidate_symbol_names=[r['name'] for r in s.syms if r['value']==t] if e is c else [],relocations=[r for r in e.reloc if pc<=r['offset']<pc+8]))
     if reg==0x10 and not rel:b[pc-lo+4:pc-lo+8]=bytes(4)
   return b,calls
  on,oc=norm(o,a,z);cn,cc=norm(c,l,h);n=min(len(ob),len(cb));dr=ranges(i for i in range(n) if ob[i]!=cb[i]);tail=[] if len(ob)==len(cb) else [[n,max(len(ob),len(cb))]]
  rows.append(dict(role=name,original_range=[a,z],candidate_range=[l,h],original_sha256=H(ob),candidate_sha256=H(cb),raw_body_equal_at_changed_placement=ob==cb,normalized_instruction_equal=on==cn,normalization='unrelocated signed direct-call immediates only',body_relative_mismatch_ranges=dr,body_relative_excess=tail,mismatch_count=sum(z-a for a,z in dr+tail),original_calls=oc,candidate_calls=cc,actual_call_target_equality='unresolved; different body sequences',referenced_data_equality='unresolved',original_boundary='frozen evidence inferred bounds; not historical symbol proof',candidate_symbol=cw['symbol'],source='inputs/current/trade.rs' if name!='wrapper' else 'inputs/current/lib.rs'))
 return rows

if __name__=="__main__":
 print(json.dumps(focused(Path(__file__).resolve().parent),indent=2))
