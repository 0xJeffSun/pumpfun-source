import base64,json
from pathlib import Path
from solders.pubkey import Pubkey
fields=next(x for x in json.load(open('evidence/upstream/pump_amm.json'))['types'] if x['name']=='BuyEvent')['type']['fields']
def decode(s):
 data=base64.b64decode(s.split(': ')[1]);off=8;out={}
 for f in fields+[{'name':'quote_transfer_fee','type':'u64'}]:
  name,ty=f['name'],f['type']
  if ty=='pubkey':out[name]=str(Pubkey.from_bytes(data[off:off+32]));off+=32
  elif ty=='bool':out[name]=bool(data[off]);off+=1
  elif ty=='string':n=int.from_bytes(data[off:off+4],'little');off+=4;out[name]=data[off:off+n].decode();off+=n
  else:
   n=int(ty[1:])//8;out[name]=int.from_bytes(data[off:off+n],'little',signed=ty[0]=='i');off+=n
 return out
