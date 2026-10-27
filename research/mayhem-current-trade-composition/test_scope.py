"""Actual in-memory mutations illustrating the limits of caller-only matching."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
from pathlib import Path
import collections,gzip,hashlib,importlib.util,json,struct,sys
P=Path(__file__).resolve().parent
ROOT=P.parents[1]
sys.dont_write_bytecode=True
def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def run():
    a=module('sell_scope_analysis',P/'analysis.py');wm=module('sell_scope_windows',P/'window_map.py');ref=module('sell_scope_calls',P/'quote_reference.py')
    original=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes();ow=wm.windows(original)
    image=gzip.decompress((P/'builds/proposed/symbols.so.gz').read_bytes());catalog=wm.windows(image)
    bound=a.entry_body(wm,ref,original,ow,image,catalog,'sell','legacy_sell_handler',127520);body=bound['candidate']
    calls=ref.calls(wm,image,body,catalog)
    def file_offset(address,size=1):
        s=next(s for s in wm.m.elf_layout(image)['sections'] if s['type']!=8 and s['address']<=address and address+size<=s['address']+s['size'])
        return s['offset']+address-s['address']
    def redirect(buf,pc,target):struct.pack_into('<i',buf,file_offset(pc+4,4),(target-pc-8)//8)
    other=a.entry_body(wm,ref,original,ow,image,catalog,'buy','legacy_buy_handler',113672)['candidate']
    mutant=bytearray(image);wrapper=bound['candidate_wrapper'];pc=wrapper['address']+bound['entry_call_offset'];redirect(mutant,pc,other['address']);changed=wm.windows(bytes(mutant))
    assert next(x for x in changed if x['address']==wrapper['address'])['signature']==wrapper['signature']
    try:a.entry_body(wm,ref,original,ow,bytes(mutant),changed,'sell','legacy_sell_handler',127520)
    except AssertionError:pass
    else:raise AssertionError('wrong entry target escaped')
    old=next(c for c in calls if c.get('signature')=='4ded9e2e313148cd8c463bb5a2c56fadff6b3a2e2821f83bef667750bd37044d')
    target=next(c for c in calls if c.get('bytes')==832)
    mutant=bytearray(image);redirect(mutant,body['address']+old['offset'],target['target']);changed=wm.windows(bytes(mutant));changed_body=next(x for x in changed if x['address']==body['address'])
    assert changed_body['signature']==body['signature']
    altered=ref.calls(wm,bytes(mutant),changed_body,changed)
    assert collections.Counter(map(ref.identity,altered))!=collections.Counter(map(ref.identity,calls))
    code=wm.m.instructions(image,body['address'],body['bytes']);literal=next(x for x in code if x['opcode']==0xb7 and x['immediate']==10000 and x['offset']<1000)
    mutant=bytearray(image);struct.pack_into('<i',mutant,file_offset(body['address']+literal['offset']+4,4),10001);changed=wm.windows(bytes(mutant));changed_body=next(x for x in changed if x['address']==body['address'])
    assert changed_body['raw_sha256']!=body['raw_sha256'] and changed_body['signature']!=body['signature']
    assert list(map(ref.identity,ref.calls(wm,bytes(mutant),changed_body,changed)))==list(map(ref.identity,calls))
    rodata=next(s for s in wm.m.elf_layout(image)['sections'] if s['name']=='.rodata');mutant=bytearray(image);mutant[rodata['offset']+rodata['size']-1]^=1
    changed_body=next(x for x in wm.windows(bytes(mutant)) if x['address']==body['address'])
    assert changed_body['raw_sha256']==body['raw_sha256'] and bytes(mutant)!=image
    source=module('trade_scope_source',P/'source_records.py');record=source.measure()['records']['candidate']['sell'][0]
    at=next(i for i,x in enumerate(code) if x['offset']==record['instruction_offset'])
    slot=code[at+1]['displacement']
    field=next(x for x in code[at+2:at+9] if x['opcode']==0x62 and x['destination']==10 and x['displacement']==slot+16)
    mutant=bytearray(image);struct.pack_into('<i',mutant,file_offset(body['address']+field['offset']+4,4),record['line']+1)
    try:source.measure(bytes(mutant))
    except AssertionError:pass
    else:raise AssertionError('changed valid Source line escaped')
    assert image==gzip.decompress((P/'builds/proposed/symbols.so.gz').read_bytes())
    return dict(changed_valid_source_line_rejected=True,wrong_entry_target_rejected_despite_unchanged_wrapper_signature=True,wrong_callee_detected_despite_unchanged_normalized_body=True,arithmetic_literal_changes_body_despite_identical_callee_sequence=True,outside_body_data_changes_whole_image_without_changing_body=True,reference_files_changed=False)
if __name__=='__main__':print(json.dumps(run(),sort_keys=True))
