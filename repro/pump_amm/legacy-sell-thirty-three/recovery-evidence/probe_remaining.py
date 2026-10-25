from differential import *
rows=[]
owner=Pubkey.from_bytes(base64.b64decode(f['accounts']['buyback_fee_recipient']['data_base64'])[32:64])
for seedkey in [base,pool]:
 p2=Pubkey.find_program_address([b'pool-v2',bytes(seedkey)],PROGRAM)[0]
 for tail in [[p2],[p2,buyback],[p2,owner,buyback],[owner,buyback,p2],[p2,buyback,owner]]:
  def ov(h,m,tail=tail):
   del m[21:]
   for k in tail:
    if h.vm.get_account(k) is None:h.vm.set_account(k,Account(10**9,b'',Pubkey.default()))
    m.append(AccountMeta(k,False,True))
  r=legacy(overrides=ov);rows.append({'seedkey':str(seedkey),'tail':list(map(str,tail)),'result':r});print(str(seedkey),list(map(str,tail)),r['error'],r['logs'][-5:])
pathlib.Path('work/pump-amm-legacy-sell/observations-02.json').write_text(json.dumps(rows,indent=2))
