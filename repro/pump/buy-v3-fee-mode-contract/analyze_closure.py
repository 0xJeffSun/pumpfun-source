"""Static original-byte/call/data contracts only; no ELF execution or writes."""
from pathlib import Path
import bisect,hashlib,json,struct
from elf_reader import Elf
from decoder import window
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def run():
 e=Elf(P/'inputs/composition/evidence/original.so');c=Elf(P/'inputs/current/candidate.so');s=Elf(P/'inputs/current/unstripped.so')
 assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi] and c.relocations==s.relocations
 specs=[('fee_wrapper',0x7fde8,0x801f8),('mode',0x7e0b0,0x7e490),('threshold',0xa08f8,0xa0bf0),('fee_box_reader',0x3cc8,0x3e38),('fee_account_reader',0x133e0,0x134a8),('borrowed_selector',0x89ec8,0x8a530),('parser_early_decode',0x102ff8,0x103040),('parser_stored_bump',0x1051f0,0x105318),('body_preparation_then_mode',0x147bc8,0x147c70),('body_first_fee',0x1482e0,0x148340),('residual_second_fee',0x82fd0,0x83020)]
 rows=[];targets=set()
 for role,a,z in specs:
  r=window(e,a,z);r['role']=role;rows.append(r)
  targets.update(i['target']for i in r['instructions']if i.get('kind')=='direct_call')
 callees=[]
 for t in sorted(targets):
  z=e.entries[e.entries.index(t)+1];r=window(e,t,z);matches=[]
  for f in s.funcs:
   a=f['start'];n=f['size']
   if n==z-t and e.normalized[t:z]==c.normalized[a:a+n] and e.pattern(t,n)==c.pattern(a,n):matches.append({'name':f['name'],'start':a,'bytes':n,'raw_equal':e.b[t:z]==c.b[a:a+n]})
  r['current_pattern_matches']=matches;r['scope']='Full immediate target retained. Pattern match is name-attribution evidence only, not transitive semantic closure.';callees.append(r)
 def ins(pc,op,reg,off,imm):assert e.b[pc:pc+8]==struct.pack('<BBhi',op,reg,off,imm),hex(pc)
 def call(pc,t):assert e.calls[pc]==t,hex(pc)
 for p,t in [(0x7fe80,0x1b3678),(0x7fff8,0x1a2a68),(0x80028,0xa08f8),(0x80180,0x89ec8),(0x103010,0x3cc8),(0x3ce0,0x133e0),(0x147c08,0x3cd50),(0x147c50,0x7e0b0),(0x148308,0x7fde8),(0x82ff0,0x7fde8),(0xa0978,0x1b55c8),(0xa09b0,0x1b4088)]:call(p,t)
 for i in [(0x7fe98,0x15,0,74,0),(0x7fea8,0x79,0x93,96,0),(0x7feb0,0x79,0x32,136,0),(0x80040,0x15,2,27,0),(0xa0900,0x79,0x27,64,0),(0xa0908,0x15,7,26,0),(0xa0910,0x07,3,0,40),(0xa0918,0x71,0x21,154,0),(0xa0920,0x15,1,2,0),(0xa0930,0x07,3,0,96),(0xa0940,0x79,0x24,72,0),(0x1051f8,0x71,0x11,128,0),(0x147c48,0xb7,4,0,0),(0x147c28,0x71,0x13,163,0),(0x147c30,0x71,0x12,161,0),(0x7e0c0,0x55,2,29,0),(0x7e0d0,0x55,4,116,0),(0x7e0e0,0x15,3,114,0),(0x7e338,0x62,10,-128,6005),(0x7e418,0x62,10,-128,6094)]:ins(*i)
 for p,off in [(0x800f0,32),(0x800f8,24),(0x80100,16),(0x80108,8),(0x80110,0)]:ins(p,0x7a,6,off,0)
 # All actual direct callers are enumerated by opcode/relocation scan. Other
 # bodies are never opened or semantically interpreted here.
 callers={}
 for role,t in [('fee_wrapper',0x7fde8),('mode',0x7e0b0),('threshold',0xa08f8),('fee_box_reader',0x3cc8),('borrowed_selector',0x89ec8)]:
  callers[role]=[{'pc':p,'target':t,'owner_start':e.entries[bisect.bisect_right(e.entries,p)-1],'owner_end':e.entries[bisect.bisect_right(e.entries,p)],'semantics':'Only BuyV3 and its already identified residual-fee call are in scope; all other callers remain opaque.'}for p,u in e.calls.items()if u==t]
 data=[]
 for site,n,role in [(0x7e0f8,4,'cashback error ordinal'),(0x7e1c0,4,'complete error ordinal'),(0x7e320,29,'complete source path'),(0x7e400,29,'cashback source path'),(0xa09f0,4,'threshold divide-by-zero ordinal'),(0xa0b50,24,'threshold source path'),(0x105218,32,'PDA program-id seed'),(0x105230,10,'PDA string seed')]:
  assert e.b[site]==0x18,hex(site);ptr=struct.unpack_from('<I',e.b,site+4)[0]|struct.unpack_from('<I',e.b,site+12)[0]<<32;b=e.b[ptr:ptr+n];data.append({'site':site,'pointer':ptr,'length':n,'role':role,'hex':b.hex(),'sha256':H(b),'utf8':b.decode('utf8',errors='replace')})
 return {'original':{'sha256':H(e.b),'bytes':len(e.b)},'current_candidate':{'sha256':H(c.b),'bytes':len(c.b)},'current_symbols':{'sha256':H(s.b),'bytes':len(s.b)},'windows':rows,'complete_immediate_callees':callees,'actual_direct_callers':callers,'consumed_data':data,'excluded_boundary':{'branch':0xa0920,'mode_byte_relative_to_curve_value':154,'nonzero_alternate_pointer_relative_to_curve_value':96,'ordinary_mint_value_offset':40,'decision':'No alternate-mode source implementation; retained enclosing Mayhem fence. No token extension data, initializer, incentives or sell semantics investigated.'}}
if __name__=='__main__':
 r=run();(P/'closure-ledger.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'windows':len(r['windows']),'callees':len(r['complete_immediate_callees']),'data':r['consumed_data']},indent=2))
