from pathlib import Path
import json,urllib.request,urllib.error,time
P=Path(__file__).resolve().parent/'allocation-query';P.mkdir(exist_ok=True)
endpoint='https://api.mainnet-beta.solana.com';method='getSignaturesForAddress';params=['5QH8Ay11KgpRMyECYofHwAr6SzfFEGkbtPoM6eXv8V7B',{'limit':100,'commitment':'finalized'}]
body=json.dumps({'jsonrpc':'2.0','id':1,'method':method,'params':params}).encode();(P/'request.json').write_bytes(body)
request=urllib.request.Request(endpoint,data=body,headers={'Content-Type':'application/json'})
try:
 with urllib.request.urlopen(request,timeout=20)as r:raw=r.read();status=r.status
 (P/'response.json').write_bytes(raw);d=json.loads(raw);print({'http_status':status,'error':d.get('error'),'signatures':len(d.get('result',[])),'slots':[v['slot']for v in d.get('result',[])]})
except Exception as e:
 (P/'failure.json').write_text(json.dumps({'endpoint':endpoint,'type':type(e).__name__,'message':str(e)},indent=2)+'\n');print(type(e).__name__,str(e))
