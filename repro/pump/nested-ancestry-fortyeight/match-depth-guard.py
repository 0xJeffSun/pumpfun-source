"""Fresh symbol/call/data evidence; never runs or modifies an ELF."""
from pathlib import Path
import argparse,bisect,hashlib,json,re,struct,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if(p/'evidence/original/pump/deployed.so').is_file())
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
ap=argparse.ArgumentParser();ap.add_argument('--check',action='store_true');args=ap.parse_args()
o=Elf(R/'evidence/original/pump/deployed.so');c=Elf(W/'candidate.so');s=Elf(W/'unstripped.so')
assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]and c.pattern(c.lo,c.hi-c.lo)==s.pattern(s.lo,s.hi-s.lo)
walk=next(f for f in s.funcs if 'nested_create4walk17'in f['name'])
assert (walk['start'],walk['size'])==(0x5d168,11432)
symbol={f['start']:f for f in s.funcs}
ranges=[(a,o.entries[i+1]if i+1<len(o.entries)else o.hi)for i,a in enumerate(o.entries)]
def matches(start,size):return [a for a,b in ranges if b-a==size and o.normalized[a:b]==c.normalized[start:start+size]and o.pattern(a,size)==c.pattern(start,size)]
calls=[]
for row in c.callsites(walk['start'],walk['size']):
    f=symbol.get(row['target']);calls.append({**row,'site':walk['start']+row['offset'],'symbol':f,'complete_original_body_matches':matches(f['start'],f['size'])if f else []})
# This compiler's disassembly instruction labels are decimal instruction indices.
# Rebind every raw row to absolute byte address=index*8, ignoring printed label names.
raw=b'';at=walk['start']
for line in (W/'fresh-walk.asm').read_text().splitlines():
    m=re.match(r'\s*(\d+):\s*((?:[0-9a-f]{2} ){7,15}[0-9a-f]{2})\s',line)
    if not m:continue
    data=bytes.fromhex(m[2]);assert int(m[1])*8==at;at+=len(data);raw+=data
assert at==walk['start']+walk['size']and raw==c.b[walk['start']:at]
ins=lambda index:struct.unpack_from('<BBhi',c.b,index*8)
facts={47744:(0x71,0xa2,-672,0),47745:(7,2,0,1),47747:(0x57,1,0,255),47748:(0x5d,0x21,67,0),47750:(0x71,0x17,0x430,0),47752:(0xa5,7,1,5),47753:(0xb7,7,0,5),47758:(0xad,0x17,1,0),47868:(0x62,0x0a,-512,6105),47880:(0x55,6,139,0),47905:(0x47,7,0,48),47906:(0x57,7,0,255),47918:(0x79,0xa9,-1248,0),47935:(0x57,1,0,255),47958:(0x57,9,0,255),47985:(7,1,0,80)}
for index,want in facts.items():assert ins(index)==want,(index,ins(index),want)
selected={}
for name,index,original in [('anchor_error_from',47877,0x19bb30),('left_string_push',47910,0xd5d0),('right_string_push',47962,0xd5d0)]:
    row=next(x for x in calls if x['site']==index*8);assert original in row['complete_original_body_matches'],(name,row)
    selected[name]=row
actual_with_values=[x for x in calls if x['symbol']and 'Error11with_values'in x['symbol']['name']]
assert not actual_with_values
data=[]
for index,length,label in [(47762,4,'depth enum105'),(47865,20,'candidate source coordinate')]:
    at=index*8;ptr=struct.unpack_from('<I',c.b,at+4)[0]|struct.unpack_from('<I',c.b,at+12)[0]<<32
    data.append({'instruction':at,'pointer':ptr,'bytes':length,'hex':c.b[ptr:ptr+length].hex(),'label':label})
assert bytes.fromhex(data[0]['hex'])==struct.pack('<I',105)
assert bytes.fromhex(data[1]['hex'])==b'src/nested_create.rs'
report={'scope':'Fresh complete walk bytes/calls plus exact observed guard and inlined diagnostic dataflow. No full walk/original-body equality claim or executable modification.',
    'candidate_sha256':sha(c.b),'symbols_sha256':sha(s.b),'original_sha256':sha(o.b),
    'candidate_walk':{**walk,'raw_sha256':sha(raw),'normalized_sha256':sha(c.normalized[walk['start']:walk['start']+walk['size']]),'complete_original_body_matches':matches(walk['start'],walk['size'])},
    'prior_failed_walk_bytes':9600,'current_walk_bytes':11432,
    'actual_direct_calls':calls,'actual_standalone_with_values_calls':actual_with_values,
    'inlined_values_explanation':'The same compile recipe inlines u8 decoration into walk. Cap is known<=5 and becomes one ASCII digit at47905..47910; checked depth is retrieved at47918 and rendered asu8 at47934..47962. Left String triple is copied before right at47963..47974; compared_values starts atbox+80. Actual From<AnchorError> and both String::push targets have complete original matches. The unused global with_values symbols are not substitutes for actual calls.',
    'instruction_facts':[{'index':i,'address':i*8,'decoded':list(v),'bytes_hex':c.b[i*8:i*8+8].hex()}for i,v in facts.items()],
    'actual_error_targets':selected,'consumed_data':data,'full_byte_equality':o.b==c.b}
if args.check:assert report==json.loads((W/'depth-guard-match.json').read_text())
else:(W/'depth-guard-match.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'candidate':sha(c.b),'walk_bytes':walk['size'],'standalone_with_values_calls':len(actual_with_values),'actual_matched_error_targets':len(selected),'full_original_equality':o.b==c.b}))
