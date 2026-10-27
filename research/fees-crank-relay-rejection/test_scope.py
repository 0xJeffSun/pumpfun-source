"""Adversarial checks separate instruction bodies, CALL bindings and data."""
from pathlib import Path
import gzip,importlib.util,struct
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('relay_scope',P/'analyze.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
def patch(image,address,raw):
 section=next(s for s in m.wm.m.elf_layout(image)['sections']if s['address']<=address<s['address']+s['size']);out=bytearray(image);offset=section['offset']+address-section['address'];out[offset:offset+len(raw)]=raw;return bytes(out)
def main():
 b=gzip.decompress((P/'artifacts/origins-symbols.so.gz').read_bytes());windows=m.wm.windows(b);index={x['address']:x for x in windows};f=next(x for x in windows if'CrankDonationFeePda$u20$as$u20$anchor_lang..Accounts$LT$'in(x['name']or'')and'12try_accounts'in x['name']);ins={x['offset']:x for x in m.wm.m.instructions(b,f['address'],f['bytes'])}
 # A scalar error code is outside every relocation/CALL mask.
 scalar=patch(b,f['address']+9432+4,struct.pack('<i',2012));changed=next(x for x in m.wm.windows(scalar)if x['address']==f['address']);assert changed['signature']!=f['signature']and m.relay_contract(scalar,changed)['address_error']==2012
 # The relocation mask cannot certify the bytes of its relay ID.
 address=ins[8648]['lddw_value'];first=m.wm.m.at_address(b,address,1);data=patch(b,address,bytes([first[0]^1]));assert m.wm.m.section_data(data,'.text')==m.wm.m.section_data(b,'.text');changed=next(x for x in m.wm.windows(data)if x['address']==f['address']);assert changed['signature']==f['signature']and m.relay_contract(data,changed)['relay_id']!=m.relay_contract(b,f)['relay_id']
 # A locally normalized body also masks retargeted CALL immediates.
 target=next(x['address']for x in windows if x['name']=='memcpy');call_address=f['address']+8672;mutated=patch(b,call_address+4,struct.pack('<i',(target-call_address-8)//8));changed=next(x for x in m.wm.windows(mutated)if x['address']==f['address']);assert changed['signature']==f['signature'];before=m.calls(b,f,index)[8672];after=m.calls(mutated,changed,{x['address']:x for x in m.wm.windows(mutated)})[8672];assert before['signature']!=after['signature']
 print('PASS: scalar mutation changes structural body; relay data and CALL retarget mutations preserve normalized body but fail separate contracts (3 tests)')
if __name__=='__main__':main()
