#!/usr/bin/env python3
"""Complete BondingCurve exit, direct-target and discriminator comparison only."""
from pathlib import Path
import argparse,hashlib,json,sys,struct
sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent;ROOT=next(p for p in HERE.parents if(p/'evidence/original/pump/deployed.so').is_file())
parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
o=Elf(ROOT/'evidence/original/pump/deployed.so');c=Elf(HERE/'candidate.so');s=Elf(HERE/'unstripped.so')
assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]and c.pattern(c.lo,c.hi-c.lo)==s.pattern(s.lo,s.hi-s.lo)
ranges={}
for index,start in enumerate(o.entries):
 end=o.entries[index+1]if index+1<len(o.entries)else o.hi
 ranges.setdefault((end-start,sha(o.normalized[start:end])),[]).append(start)
funcs={}
for f in s.funcs:funcs.setdefault((f['start'],f['size']),set()).add(f['name'])
rows=[]
for(start,size),names in sorted(funcs.items()):
 hits=[at for at in ranges.get((size,sha(c.normalized[start:start+size])),[])if o.pattern(at,size)==c.pattern(start,size)]
 rows.append({'start':start,'start_hex':hex(start),'bytes':size,'names':sorted(names),'raw_sha256':sha(c.b[start:start+size]),'normalized_sha256':sha(c.normalized[start:start+size]),'original_matches':hits})
by_start={r['start']:r for r in rows}
selected=[r for r in rows if 0x5a28 in r['original_matches']]
assert len(selected)==1,[(r['start'],r['names'])for r in selected]
r=selected[0];assert r['bytes']==1840 and any('exit_with_expected_owner'in n for n in r['names'])
checks=[]
for call in c.callsites(r['start'],r['bytes']):
 original_target=o.calls.get(0x5a28+call['offset']);target=by_start.get(call['target'])
 checks.append({'offset':call['offset'],'candidate_target':call['target'],'original_target':original_target,'candidate_names':target['names']if target else[],'original_body_matches':target['original_matches']if target else[],'full_target_body_matches':target is not None and original_target in target['original_matches']})
assert len(checks)==25 and all(x['full_target_body_matches']for x in checks)
relocs=c.pattern(r['start'],r['bytes']);assert relocs==[{'offset':248,'type':8,'symbol':''}]
data={};disc=bytes.fromhex('17b7f83760d8ac60')
for label,elf,start in [('original',o,0x5a28),('candidate',c,r['start'])]:
 at=start+248;ptr=struct.unpack_from('<I',elf.b,at+4)[0]|struct.unpack_from('<I',elf.b,at+12)[0]<<32
 assert elf.b[ptr:ptr+8]==disc
 data[label]={'instruction':at,'pointer':ptr,'consumed_bytes_hex':disc.hex(),'bytes':8}
report={'scope':'Static complete inferred-entry-bounded body match plus all 25 direct target bodies and exact consumed discriminator bytes. Only actual relocation and internal-call immediates normalized in memory. No executable edits, transitive rodata proof or new runtime claim.','original':o.identity(),'candidate':c.identity(),'symbols':s.identity(),'original_body':{'start':0x5a28,'end':0x6158,'bytes':1840,'raw_sha256':sha(o.b[0x5a28:0x6158]),'normalized_sha256':sha(o.normalized[0x5a28:0x6158])},'candidate_body':r,'raw_body_equal':o.b[0x5a28:0x6158]==c.b[r['start']:r['start']+r['bytes']],'normalized_body_equal':True,'direct_target_checks':checks,'all_25_direct_target_bodies_match':True,'discriminator':data,'full_byte_equality':o.b==c.b,'all_function_summary':{'candidate_ranges':len(rows),'any_bounded_match':sum(bool(x['original_matches'])for x in rows)},'macro_logic_preserved':{'anchor_lang':'0.31.1','anchor_attribute_account':'0.31.2','deserializer_owner_discriminator_logic':'unchanged explicit traits; current isolated route build; runtime and main identity not claimed'}}
if args.check:assert report==json.loads((HERE/'function-match.json').read_text()),'Saved body evidence differs from current ELF/symbol recomputation'
else:(HERE/'function-match.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:report[k]for k in ['candidate','candidate_body','raw_body_equal','normalized_body_equal','all_25_direct_target_bodies_match','full_byte_equality','all_function_summary']},indent=2))
