#!/usr/bin/env python3
"""IDL layout derivation plus explicitly inspected raw-opcode witnesses."""
import json,hashlib
from pathlib import Path
W=Path(__file__).resolve().parent
# Binary observations are deliberately separate from IDL-derived field names.
FACTS={
 'DebouncerV1':{'wrapper':[505216,506304],'body':[506304,507440],'discriminator_pc':505256,'success_call_pc':506064,'witnesses':[506328,506336,506344,506360,506376,506392,506400,506424,506432,506704,506712,506760,506768,506848]},
 'DistributionV1':{'wrapper':[507440,508560],'body':[508560,509800],'discriminator_pc':507480,'success_call_pc':508304,'witnesses':[508584,508592,508600,508616,508632,508648,508656,508680,508688,508960,508968,509024,509032,509040,509048,509152,509168,509184]},
 'EpochTrackerV1':{'wrapper':[509800,510920],'body':[510920,512088],'discriminator_pc':509840,'success_call_pc':510664,'witnesses':[510944,510952,510960,510976,510992,511008,511016,511040,511048,511320,511328,511376,511384,511464,511480]},
 'MintWhitelistV1':{'wrapper':[512088,513224],'body':[513224,513680],'discriminator_pc':512128,'success_call_pc':512968,'witnesses':[513248,513256,513272,513280,513296,513344,60344,60352,60408,60504,60512,60528],'limit':'IDL-shaped borrowed vector sketch; original allocation/growth semantics not translated.'},
 'SwapReceiptV1':{'wrapper':[513680,514800],'body':[514800,515416],'discriminator_pc':513720,'success_call_pc':514544,'witnesses':[514824,514840,514848,514856,514872,514912,514920,515168]},
}
def derive():
 b=(W/'inputs/deployed.so').read_bytes();idl=json.loads((W/'inputs/idl.json').read_text());types={t['name']:t['type'] for t in idl['types']};ins={x['pc']:x for x in json.loads((W/'instructions.json').read_text())};rows=[]
 def size(t):
  if isinstance(t,str):return {'u8':1,'u16':2,'u32':4,'u64':8,'u128':16,'pubkey':32}.get(t)
  if 'array' in t:
   n=size(t['array'][0]);return n*t['array'][1] if n is not None else None
  if 'defined' in t:
   x=types[t['defined']['name']]
   if x['kind']=='enum' and all('fields' not in v for v in x['variants']):return 1
   if x['kind']=='struct':
    s=[size(f['type']) for f in x['fields']];return sum(s) if all(n is not None for n in s) else None
  return None
 def layout(fields,offset):
  out=[]
  for f in fields:
   n=size(f['type']);out.append({'name':f['name'],'type':f['type'],'offset':offset,'fixed_size':n})
   offset=offset+n if offset is not None and n is not None else None
  return out,offset
 for a in idl['accounts']:
  name=a['name'];fact=FACTS[name];fields,end=layout(types[name]['fields'],8)
  # Verify that the designated success call actually enters the adjacent decoder.
  call=ins[fact['success_call_pc']];assert call['opcode']==133 and call['pc']+8+call['immediate']*8==fact['body'][0],(name,call)
  assert ins[fact['discriminator_pc']]['u64']==int.from_bytes(bytes(a['discriminator']),'little')
  rows.append({'name':name,'idl_pointer':'/types/'+str(next(i for i,t in enumerate(idl['types']) if t['name']==name)),'discriminator':a['discriminator'],'fields':fields,'fixed_encoded_size':end,'variable_size_formula':'13 + 32*n (u32 count at offset 9)' if name=='MintWhitelistV1' else None,'binary':{**fact,'wrapper_sha256':hashlib.sha256(b[slice(*fact['wrapper'])]).hexdigest(),'body_sha256':hashlib.sha256(b[slice(*fact['body'])]).hexdigest(),'witness_instructions':[ins[p] for p in fact['witnesses']]},'confidence':'fixed wire roles corroborated by static decoder and IDL' if end else 'IDL wire model with binary prefix/count/element-width corroboration'})
 return {'accounts':rows,'idl_only_instruction_layouts':[{'name':i['name'],'fields':layout(i['args'],8)[0],'fixed_encoded_size':layout(i['args'],8)[1]} for i in idl['instructions']],'idl_only_type_layouts':[{'name':t['name'],'fields':layout(t['type']['fields'],0)[0],'fixed_size':size({'defined':{'name':t['name']}})} for t in idl['types'] if t['type']['kind']=='struct'],'pure_fragment':{'range':[629280,629312],'sha256':hashlib.sha256(b[629280:629312]).hexdigest(),'instructions':[ins[p] for p in range(629280,629312,8)],'meaning':'r0 = 357 if r1 == 355 else r1; domain name/type unresolved'}}
if __name__=='__main__':(W/'codecs.json').write_text(json.dumps(derive(),indent=2)+'\n')
