if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
"""Read actual filename/line stores at bounded CPI Source records; no rewriting."""
from pathlib import Path
import gzip,hashlib,importlib.util,json
p=Path(__file__).resolve().parent;r=p.parents[1]
def measure(candidate_override=None):
    s=importlib.util.spec_from_file_location('source_cpi_windows',p/'window_map.py');wm=importlib.util.module_from_spec(s);s.loader.exec_module(wm)
    obs=json.loads(gzip.decompress((p/'observations.json.gz').read_bytes()))['proposed']['handlers']
    images={'original':(r/'evidence/original/mayhem/deployed.so').read_bytes(),'candidate':gzip.decompress((p/'builds/proposed/symbols.so.gz').read_bytes()) if candidate_override is None else candidate_override};found={}
    for side,image in images.items():
     reloc=dict(wm.m.relocations(image));found[side]={}
     for name in ['sell','sell_v2','buy_v2','buy']:
      body=obs[name][side];code=wm.m.instructions(image,body['address'],body['bytes']);records=[]
      for i,ins in enumerate(code):
       if ins['opcode']!=0x18 or reloc.get(body['address']+ins['offset'],0)&0xffffffff!=8:continue
       address=ins['lddw_value']
       try:prefix=wm.m.at_address(image,address,len(b'programs/mayhem-program/src/instructions/'))
       except StopIteration:continue
       if not prefix.startswith(b'programs/mayhem-program/src/instructions/'):continue
       tail=code[i+1:i+9]
       if not tail or tail[0]['opcode']!=0x7b or tail[0]['destination']!=10 or tail[0]['source']!=ins['destination']:continue
       slot=tail[0]['displacement'];lengths=[x['immediate'] for x in tail[1:] if x['opcode']==0x7a and x['destination']==10 and x['displacement']==slot+8];lines=[x['immediate'] for x in tail[1:] if x['opcode']==0x62 and x['destination']==10 and x['displacement']==slot+16]
       if len(lengths)!=len(lines) or len(lines)!=1:continue
       text=wm.m.at_address(image,address,lengths[0]).decode();assert text.endswith('.rs')
       records.append(dict(instruction_offset=ins['offset'],filename=text,filename_bytes=lengths[0],line=lines[0]))
      found[side][name]=records
    assert all(len(found[side][name])==1 for side in images for name in obs), 'all four known bounded records must be found'
    for name in ['sell','sell_v2','buy']:
     assert all(found['original'][name][0][key]==found['candidate'][name][0][key] for key in ['filename','filename_bytes','line'])
    assert (found['original']['buy_v2'][0]['filename_bytes'],found['original']['buy_v2'][0]['line'])==(61,376)
    assert (found['candidate']['buy_v2'][0]['filename_bytes'],found['candidate']['buy_v2'][0]['line'])==(50,101)
    return dict(input_sha256={k:hashlib.sha256(v).hexdigest() for k,v in images.items()},records=found,scope='Bounded relocation-routed filename/length/line stores only; no tag/variant/full-structure/panic/callback execution or source-identity claim.')
