"""Reject counterexamples that a mere TypeId-presence scan would accept."""
import gzip,json
import proof,verify
from elf import sections

def patch(image,address,raw):
 sec=next(s for s in sections(image)if s['type']!=8 and s['address']<=address and address+len(raw)<=s['address']+s['size'])
 offset=sec['offset']+address-sec['address'];out=bytearray(image);out[offset:offset+len(raw)]=raw
 return bytes(out)
def rejected(fn,label):
 try:fn()
 except (ValueError,AssertionError,StopIteration,KeyError):return label
 raise AssertionError('accepted '+label)
def main():
 original=(verify.R/'evidence/original/pump/deployed.so').read_bytes()
 image=gzip.decompress((verify.P/'public/builds/round36-identity/unstripped.so.gz').read_bytes())
 baseline=proof.compare(original,image);first=baseline['vtables'][0]['candidate'];second=baseline['vtables'][1]['candidate'];checks=[]
 # All five correct thunk bodies remain; only a vtable method pointer is wrong.
 bad=patch(image,first['base'],(first['thunk']<<32).to_bytes(8,'little'))
 checks.append(rejected(lambda:proof.compare(original,bad),'changed vtable drop target with all TypeIds intact'))
 # A producer now loads a different existing Error vtable; masking LDDW still matches.
 use=first['code_users'][0];target=second['base'];raw=bytearray(proof.w.m.at_address(image,use['pc'],16));raw[4:8]=(target&0xffffffff).to_bytes(4,'little');raw[12:16]=(target>>32).to_bytes(4,'little')
 bad=patch(image,use['pc'],raw)
 checks.append(rejected(lambda:proof.compare(original,bad),'wrong actual producer vtable with TypeIds intact'))
 # Change only an internal call displacement, which normalized bodies mask.
 edge=baseline['direct_edges'][0];pc=edge['candidate_parent']+edge['offset'];delta=(first['thunk']-pc-8)//8
 bad=patch(image,pc+4,delta.to_bytes(4,'little',signed=True))
 checks.append(rejected(lambda:proof.compare(original,bad),'wrong transitive direct callee with parent shape intact'))
 bad=patch(image,first['thunk']+4,b'\0\0\0\0')
 checks.append(rejected(lambda:proof.compare(original,bad),'changed complete TypeId result'))
 # Core panic_fmt must actually refer to its payload vtable, not just contain a thunk.
 core=gzip.decompress((verify.P/'native/sbpf-solana-solana/core-member.o.gz').read_bytes())
 ss=sections(core);chain=verify.core_chain(core)
 rel=next(s for s in ss if s['type']in (4,9)and s['info']==chain['vtable_section'])
 bad=bytearray(core);bad[rel['offset']+rel['entry_size']:rel['offset']+rel['entry_size']+8]=(16).to_bytes(8,'little')
 checks.append(rejected(lambda:verify.core_chain(bytes(bad)),'misplaced core payload TypeId relocation'))
 print(json.dumps(dict(rejected=checks),indent=2))
if __name__=='__main__':main()
