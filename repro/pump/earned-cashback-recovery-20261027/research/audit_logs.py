from pathlib import Path
import gzip,json,re,collections,argparse,hashlib
ROOT=Path(__file__).resolve().parents[2]
parser=argparse.ArgumentParser();parser.add_argument('--report',type=Path,default=ROOT/'repro/pump/shared-scheduler-20261027/full-regression.json.gz');parser.add_argument('--output',type=Path,default=ROOT/'work/pump-inline-investigation/log-audit.json');args=parser.parse_args()
p=args.report;report=json.loads(gzip.decompress(p.read_bytes()))
def logs(value):
 result=[]
 if isinstance(value,dict):
  for k,v in value.items():
   if 'log' in k.lower() and isinstance(v,list):result += [x for x in v if isinstance(x,str)]
 return result
def messages(xs):
 panic=[];anchor=[]
 for x in xs:
  if 'panicked at ' in x:
   panic.append(x.split('\n',1)[1] if '\n' in x else x)
  if 'AnchorError' in x:
   m=re.search(r'Error Code: (.*?)\. Error Number: (\d+)\. Error Message: (.*)',x)
   anchor.append(m.groups() if m else x)
 return {'panic':panic,'anchor':anchor}
rows=[];coverage=collections.Counter()
def walk(value,path):
 if isinstance(value,dict):
  if isinstance(value.get('original'),dict) and isinstance(value.get('candidate'),dict):
   a,b=logs(value['original']),logs(value['candidate'])
   if a or b:
    coverage[path.split('/')[0]]+=1;x,y=messages(a),messages(b)
    if x!=y:rows.append({'path':path,'case':value.get('case',value.get('name')),'original':x,'candidate':y,'original_logs':a,'candidate_logs':b})
  for k,v in value.items():
   if k not in ('original','candidate'):walk(v,path+'/'+k)
 elif isinstance(value,list):
  for i,v in enumerate(value):walk(v,path+'/'+str(i))
for name,suite in report['suites'].items():walk(suite,name)
out={'source_report_sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'script_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'scope':'Only cases with captured log fields; panic messages and Anchor name/number/message compared, source coordinates kept separately.','coverage':dict(coverage),'mismatches':rows};args.output.write_text(json.dumps(out,indent=2)+'\n')
print('log-bearing cases',sum(coverage.values()),'mismatches',len(rows));print('coverage',dict(coverage))
counts=collections.Counter(r['path'].split('/')[0] for r in rows);print('mismatches by suite',dict(counts))
for row in rows[:12]:print(row['path'],row['case'],row['original'],row['candidate'])
