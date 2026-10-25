from differential import *
from probe_cashback_validation import cash
rows=[]
def test(label,**kw):
 r=legacy(**kw);rows.append({'case':label,'result':r});print(label,r['error'],len(r['inner'][0]),[x for x in r['logs'] if 'Error' in x or 'panicked' in x])
def mayhem(h,m):
 mutate(pool,243,b'\1')(h,m)
 a=h.vm.get_account(CONFIG_KEY);d=bytearray(a.data);d[385:417]=bytes(PROTOCOL);h.vm.set_account(CONFIG_KEY,Account(a.lamports,bytes(d),a.owner))
for amount in [1,10**6,10**10]:test('mayhem='+str(amount),amount=amount,overrides=mayhem)
for amount in [1,10**6,10**10,10**15]:
 for q in [1,10**8,10**9]:
  for virtual in [-1,0,10**10]:test('cap='+str((amount,q,virtual)),amount=amount,overrides=combine(mutate(vaultquote,64,struct.pack('<Q',q)),mutate(pool,245,virtual.to_bytes(16,'little',signed=True)),mutate(pool,271,bytes(16))))
for source,dest in [(5,7),(6,8),(10,8),(17,8),(23,8)]:
 def alias(h,m,source=source,dest=dest):m[source]=m[dest]
 test('alias='+str((source,dest)),overrides=alias)
pathlib.Path('work/pump-amm-legacy-sell/observations-08.json').write_text(json.dumps(rows,indent=2))
