from probe_modes import *
if __name__=='__main__':
 for key in [base,quote]:
  for bps in [0,100,10000]:
   for amount in [10**9,10**12]:
    for writable in [False,True]:test('transferfee='+str((key,bps,amount,writable)),amount=amount,overrides=boost_transferfee(key,bps,writable=writable))
 for withheld in [0,1,100]:test('harvest='+str(withheld),amount=10**12,overrides=boost_transferfee(quote,100,withheld=withheld,writable=True))
 (pathlib.Path(__file__).parent/'observations-03.json').write_text(json.dumps(rows))
