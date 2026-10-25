from pathlib import Path
import json,gzip,hashlib
W=Path(__file__).resolve().parent
old=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_amm/update-event-borrow-v144/transfer_creator-differential.json.gz')
a=json.loads(gzip.decompress(old.read_bytes()));b=json.loads((W/'runtime-01/transfer_creator.json').read_text());assert len(a['cases'])==len(b['cases'])==267
rows=[]
for i,(x,y)in enumerate(zip(a['cases'],b['cases'])):
 assert (x['instruction'],x['case'])==(y['instruction'],y['case'])
 assert not y['diff'] and y['original']==y['candidate']
 rows.append({'index':i,'instruction':y['instruction'],'case':y['case'],'compared_fields':sorted(y['original']),'match':True,'destination_data_rent':y['case'].startswith('destination-data-rent=')})
assert sum(r['destination_data_rent']for r in rows)==24
(W/'transfer-summary.json').write_text(json.dumps({'case_count':267,'same_accepted_case_identities':True,'destination_data_rows':24,'rent_edge_rows':sum(r['case'].startswith('rent-edge=')for r in rows),'rows':rows,'limits':['The unchanged destination-data-rent cases initialize zero lamports; they do not prove live nonempty account behavior.','External 8/267 claim remains unverified.','Suite retains error, states, inner and events; ordinary logs, compute and full execution traces are not part of this equality contract.']},indent=2)+'\n')
