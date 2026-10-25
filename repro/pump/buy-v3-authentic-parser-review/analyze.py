"""Static scoped BuyV3 analysis. No target execution, network or dependencies."""
from pathlib import Path
import json,struct,gzip
from elf_reader import ELF,H
P=Path(__file__).resolve().parent
ROLES=[('wrapper',0x1286c8,0x128c28,'__global6buy_v3'),('parser',0x102578,0x105b78,'SellV3Bumps$GT$$GT$12try_accounts'),('body',0x147ba0,0x1489f8,'5trade3buy17'),('exit',0x107b38,0x107f78,'SellV3$u20$as$u20$anchor_lang..AccountsExit')]
def window(e,a,z,s=None):
 raw=e.at(a,z-a); assert raw is not None
 norm=bytearray(raw);calls=[];branches=[];data=[]
 for pc,op,reg,off,imm in e.instructions(a,z):
  rel=[r for r in e.reloc if pc<=r['offset']<pc+(16 if op==0x18 else 8)]
  if op in (0x85,0x8d):
   t=pc+8+8*imm if op==0x85 and reg==0x10 and not rel else None
   calls.append(dict(pc=pc,bytes=e.at(pc,8).hex(),target=t,relocations=rel,symbols=[x['name'] for x in s.syms if x['value']==t and x['size']] if s and t else [],kind='relative' if t is not None else 'relocation-or-indirect-unresolved'))
   if t is not None:norm[pc-a+4:pc-a+8]=bytes(4)
  elif op&7 in (5,6) and op!=0x95:branches.append(dict(pc=pc,bytes=e.at(pc,8).hex(),target=pc+8+8*off))
  if op==0x18:
   v=(imm&0xffffffff)|(struct.unpack('<I',e.at(pc+12,4))[0]<<32)
   bs=e.at(v,32)
   data.append(dict(pc=pc,value=v,relocations=rel,preview_hex=bs.hex() if bs else None,preview_ascii=''.join(chr(x) if 32<=x<127 else '.' for x in bs) if bs else None,extent='32-byte inspection preview, NOT inferred object extent',status='referent unresolved'))
 return dict(start=a,end=z,size=z-a,sha256=H(raw),normalized_sha256=H(norm),calls=calls,branches=branches,lddw=data)
def analyze():
 o=ELF(P/'evidence/original.so'); c=ELF(P/'evidence/current.so');s=ELF(P/'evidence/current-symbols.so');old=ELF(P/'evidence/previous.so')
 assert c.data(c.text)==s.data(s.text)
 prior=json.loads((P/'evidence/previous-windows.json').read_text());rows=[]
 for role,a,z,needle in ROLES:
  sy=[x for x in s.syms if needle in x['name'] and x['size']];assert len(sy)==1,(role,sy)
  sy=sy[0];l=sy['value'];h=l+sy['size'];ow=window(o,a,z);cw=window(c,l,h,s);p=next(x for x in prior if x['role']==role);pw=window(old,*p['candidate_range'])
  rows.append(dict(role=role,original=ow,current=cw,current_symbol=sy,raw_equal=o.at(a,z-a)==c.at(l,h-l),normalized_equal=ow['normalized_sha256']==cw['normalized_sha256'],previous_current_normalized_equal=pw['normalized_sha256']==cw['normalized_sha256'],actual_target_equivalence='unresolved: address resolution is not semantic correspondence',referenced_data_equivalence='unresolved',original_bounds='inferred, not historical symbols'))
 regs=json.loads((P/'evidence/regressions.json').read_text());assert len(regs)==117 and sum(x['original_error'] is None for x in regs)==105 and all(x['match'] for x in regs)
 receipt=json.loads(gzip.decompress((P/'evidence/v3_configured_fee.json.gz').read_bytes()))
 return dict(identities={k:dict(size=len(e.b),sha256=H(e.b)) for k,e in [('original',o),('current',c),('symbols',s),('previous',old)]},whole_file_equal=o.b==c.b,symbol_text_equal=True,normalization='only unrelocated signed-relative call immediates; no LDDW/relocation masking',roles=rows,saved_rows=dict(count=len(regs),successes=sum(x['original_error'] is None for x in regs),all_match=all(x['match'] for x in regs),receipt_top_level_keys=list(receipt) if isinstance(receipt,dict) else 'list'))
if __name__=='__main__':print(json.dumps(analyze(),indent=2))
