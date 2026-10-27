"""Falsify attribution, signed input, state parity and persistent lineage."""
import base64,copy,json
import verify

def rejected(fn,label):
 try:fn()
 except (ValueError,AssertionError):return label
 raise AssertionError('accepted '+label)
def main():
 label=verify.LABELS[0];d=verify.P/'receipts/lifecycle'
 report=verify.read(d/(label+'.json.gz'));rows=verify.rows(d/(label+'-observed.jsonl.gz'));n=len(report['cases'][0]['original']['steps'])
 candidate=report['candidate_sha256'];a=rows[0];b=rows[n];checks=[]
 bad=copy.deepcopy(b);raw=bytearray(base64.b64decode(bad['transaction_base64']));raw[1]^=1;bad['transaction_base64']=base64.b64encode(raw).decode()
 checks.append(rejected(lambda:verify.pair(a,bad,candidate),'corrupted signature'))
 bad=copy.deepcopy(b);bad['fees_sha256']=verify.ORIGINAL
 checks.append(rejected(lambda:verify.pair(a,bad,candidate),'wrong loaded candidate'))
 bad=copy.deepcopy(b);bad['after'][verify.ids()[1]]['lamports']+=1
 checks.append(rejected(lambda:verify.pair(a,bad,candidate),'changed final account'))
 # Mutate BOTH sides consistently, so pairwise equality alone cannot catch a reset.
 bad_rows=copy.deepcopy(rows);donation=verify.ids()[1]
 for i in [1,n+1]:bad_rows[i]['before'][donation]['lamports']+=1
 checks.append(rejected(lambda:verify.verify_lifecycle(report,bad_rows,candidate),'matching off-ledger state reset'))
 # Missing whitelist must reject; preserve pairwise equality while suppressing it.
 bad_rows=copy.deepcopy(rows);bad_report=copy.deepcopy(report)
 pos=sum(2*len(c['original']['steps'])for c in report['cases'][:3]);size=len(report['cases'][3]['original']['steps'])
 for side,offset in [('original',0),('candidate',size)]:
  bad_rows[pos+offset+2]['error']=None;bad_report['cases'][3][side]['steps'][2]['result']['error']=None
 checks.append(rejected(lambda:verify.verify_lifecycle(bad_report,bad_rows,candidate),'lost expected rejection'))
 print(json.dumps(dict(rejected=checks),indent=2))
if __name__=='__main__':main()
