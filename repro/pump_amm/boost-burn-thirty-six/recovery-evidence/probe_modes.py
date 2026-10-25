from probe import *
fields={t['name']:t['type']['fields'] for t in IDL['types']if t['name']in ['BuyEvent','BoostBuyAndBurnEvent']}
def decode(s,name):
 data=base64.b64decode(s.split(': ')[1]);off=8;out={}
 for f in fields[name]+([{'name':'quote_transfer_fee','type':'u64'}]if name=='BuyEvent'else[]):
  name,ty=f['name'],f['type']
  if ty=='pubkey':out[name]=str(Pubkey.from_bytes(data[off:off+32]));off+=32
  elif ty=='bool':out[name]=bool(data[off]);off+=1
  elif ty=='string':n=int.from_bytes(data[off:off+4],'little');off+=4;out[name]=data[off:off+n].decode();off+=n
  else:n=int(ty[1:])//8;out[name]=int.from_bytes(data[off:off+n],'little',signed=ty[0]=='i');off+=n
 return out
rows=[]
def test(label,**kw):
 r=run(**kw);rows.append({'case':label,'result':r});out={'case':label,'error':r['error'],'events':[decode(s,n)for s,n in zip(r['events'],['BuyEvent','BoostBuyAndBurnEvent'])]};out['errorlog']=[s for s in r['logs'] if 'Error' in s or 'failed:' in s];print(json.dumps(out))
if __name__=='__main__':
 test('baseline')
 for idx in range(13):
  if idx!=1:test('substitute='+str(idx),overrides=meta_mutation(idx,'substitute'))
 for idx in [1,3,5,6,8]:test('readonly='+str(idx),overrides=meta_mutation(idx,'readonly'))
 for key in [vaultbase,vaultquote,BOOST_ATA]:
  for off,val in [(0,bytes(32)),(32,bytes(32)),(108,b'\2')]:test('token-field='+str((key,off)),overrides=mutate(key,off,val))
 for off,val in [(907,bytes(32)),(939,b'\0'),(56,b'\xff')]:test('config='+str(off),overrides=mutate(CONFIG_KEY,off,val))
 for off,val in [(243,b'\1'),(244,b'\1'),(270,b'\1'),(261,struct.pack('<Q',10000)),(271,bytes(16)),(11,bytes(32)),(8,b'\0')]:test('pool='+str(off),overrides=mutate(pool,off,val))
 for v in [-2**127,-10**13,-125882,-125881,0,1,10**9,2**64,2**127-1]:test('virtual='+str(v),overrides=mutate(pool,245,v.to_bytes(16,'little',signed=True)))
 for n in [0,1,1000,10**12,2**64-1]:test('supply='+str(n),overrides=mutate(base,36,struct.pack('<Q',n)))
 for n in [0,1,1000,10**12,2**64-1]:test('vault='+str(n),overrides=mutate(BOOST_ATA,64,struct.pack('<Q',n)))
 for n in [0,1,1000,10**12,2**64-1]:test('quote='+str(n),overrides=mutate(vaultquote,64,struct.pack('<Q',n)))
 (pathlib.Path(__file__).parent/'observations-02.json').write_text(json.dumps(rows))
