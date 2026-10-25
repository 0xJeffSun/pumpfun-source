from probe import *
def decode(s,name):
 data=base64.b64decode(s.split(': ')[1]);off=8;out={};fields=next(t for t in IDL['types']if t['name']==name)['type']['fields']
 for f in fields+[{'name':'quote_transfer_fee','type':'u64'}]:
  name,ty=f['name'],f['type']
  if ty=='pubkey':out[name]=str(Pubkey.from_bytes(data[off:off+32]));off+=32
  elif ty=='bool':out[name]=bool(data[off]);off+=1
  elif ty=='string':n=int.from_bytes(data[off:off+4],'little');off+=4;out[name]=data[off:off+n].decode();off+=n
  else:n=int(ty[1:])//8;out[name]=int.from_bytes(data[off:off+n],'little',signed=ty[0]=='i');off+=n
 return out
if __name__=='__main__':
 for row in json.load(open('work/pump-amm-multi-hop/observations-02.json')):
  if row['case']not in ['(False, 1000000000)','(True, 1000000000)']:continue
  r=row['result'];print(row['case']);tx=Transaction.from_bytes(base64.b64decode(r['transaction_base64']));keys=tx.message.account_keys
  for ii in r['inner'][0]:
   i=ii['instruction'];data=bytes(i['data'][1:]);prog=keys[i['programIdIndex']]
   print('CPI',str(prog),[str(keys[k])for k in i['accounts'][1:]],data.hex()if prog!=PROGRAM else'event')
  for e in r['events']:print(json.dumps(decode(e,'BuyEvent'if row['case'].startswith('(False')else'SellEvent'),indent=2))
