from pathlib import Path
import json,urllib.request
P=Path(__file__).resolve().parent/'allocation-query';rows=json.loads((P/'response.json').read_bytes())['result'];requests=[dict(jsonrpc='2.0',id=i,method='getTransaction',params=[r['signature'],{'encoding':'json','commitment':'finalized','maxSupportedTransactionVersion':0}])for i,r in enumerate(rows)];(P/'transaction-requests.json').write_text(json.dumps(requests,indent=2)+'\n');req=urllib.request.Request('https://api.mainnet-beta.solana.com',data=json.dumps(requests).encode(),headers={'Content-Type':'application/json'})
try:
 with urllib.request.urlopen(req,timeout=25)as f:raw=f.read()
 (P/'transactions.json').write_bytes(raw);responses=json.loads(raw)
 if isinstance(responses,dict):print(responses)
 else:print([{'id':r['id'],'slot':(r.get('result')or{}).get('slot'),'error':r.get('error'),'available':bool(r.get('result'))}for r in responses])
except Exception as e:(P/'transactions-failure.json').write_text(json.dumps({'type':type(e).__name__,'message':str(e)},indent=2)+'\n');print(type(e).__name__,str(e))
