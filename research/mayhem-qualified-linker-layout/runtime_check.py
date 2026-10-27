"""Check new signed runtime records against both original and fixed baseline."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,re
P=Path(__file__).resolve().parent
raw=lambda p:gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
load=lambda p:json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify(root,candidate):
 root=Path(root);base=root/'research/mayhem-trade-source-origins';admit=module('layout_runtime_admission',root/'research/mayhem-accounting-extend-recovery/verify.py');summaries=[];differences=[]
 trim=lambda r:[x for x in r['metadata']['logs']if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]
 for name in admit.EXPECTED:
  report=load(P/f'runtime/{name}.json.gz');summaries.append(admit.check_trade_receipts(name,report,candidate,root));prior=load(base/f'runtime/{name}.json.gz');bad=[]
  for a,b in zip(prior['cases'],report['cases']):
   assert a['case']==b['case']and a['original']['transaction_base64']==b['original']['transaction_base64']and trim(a['original'])==trim(b['original'])
   assert trim(a['candidate'])==trim(b['candidate'])
   if trim(b['original'])!=trim(b['candidate']):bad.append(b['case']['name'])
  differences.append(dict(family=name,remaining=bad))
 assert sum(x['cases']for x in summaries)==6636 and sum(x['signed_transaction_records']for x in summaries)==13272
 assert sum(len(x['remaining'])for x in differences)==7
 extension=admit.check_receipts(load(P/'runtime/extend.json.gz'),candidate)
 assert extension['cases']==301 and extension['signed_transaction_records']==602
 return dict(trade_cases=6636,trade_signed_records=13272,extend_cases=301,extend_signed_records=602,total_comparisons=6937,total_signed_records=13874,remaining_trade_diagnostic_cases=7,trade_summaries=summaries,trade_diagnostics=differences,extension=extension,scope='Fresh local signed records; not unique transaction counts, exhaustive semantics, or live deployment.')
