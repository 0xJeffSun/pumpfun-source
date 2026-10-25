from probe import *
rows=[]
def test(label,**kw):
 r=legacy_buy(**kw);rows.append({'case':label,'result':r});print(label,r['error'],len(r['inner'][0]),[l for l in r['logs'] if 'Error' in l or 'panicked' in l])
def active(h,m):mutate(GLOBAL_VOLUME,8,struct.pack('<qqq',1234500000,1234600000,86400))(h,m)
def cash_buy(ata=False):
 def ov(h,m):
  mutate(pool,244,b'\1')(h,m)
  if ata:m.insert(23,AccountMeta(uvata,False,True))
 return ov
for n in ['buy','buy_exact_quote_in']:
 for count in range(4):
  def trim(h,m,count=count):del m[23+count:]
  test(str((n,'tail',count)),name=n,limit=10**12 if n=='buy' else 1,overrides=trim)
 for track in [b'',b'\0',b'\1']:
  for ata in [False,True]:test(str((n,'cash',track.hex(),ata)),name=n,limit=10**12 if n=='buy' else 1,track=track,overrides=combine(cash_buy(ata),active))
 for track in [b'',b'\0',b'\1']:test(str((n,'active',track.hex())),name=n,limit=10**12 if n=='buy' else 1,track=track,overrides=active)
pathlib.Path('work/pump-amm-legacy-buy/observations-02.json').write_text(json.dumps(rows,indent=2))
