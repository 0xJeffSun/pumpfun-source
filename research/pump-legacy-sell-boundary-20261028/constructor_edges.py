from pathlib import Path
import sys,runpy,csv,json,hashlib
root=Path(__file__).resolve().parents[2];sys.path.insert(0,str(root/'scripts'))
from pump_compare_function_bytes import normalize,body
from pump_quote_control_function_match import sections
m=runpy.run_path(str(root/'research/claude-pump-integration-20261027/r37-layout-33/verify.py'))
windows={int(r['original_start']):int(r['bytes']) for r in csv.DictReader(open(root/'repro/reconstruction-status-2026-10-26/functions.tsv'),delimiter='\t') if r['program']=='pump' and r['variant']=='selected'}
sha=lambda b:hashlib.sha256(b).hexdigest()
def elf(path):
 b=path.read_bytes();ss=sections(b);fs=m['elf_functions'](b);by={a:(l,n) for a,l,n in fs}
 def fun(st):
  size,symbol=by.get(st,(windows.get(st),''));assert size,(hex(st),path)
  n,calls=normalize(body(b,ss,st,size),st,ss)
  return {'start':st,'bytes':size,'symbol':symbol,'normalized_sha256':sha(n),'calls':[{**x,'symbol':by.get(x['target'],(0,''))[1]} for x in calls if x['kind']=='direct-call']}
 return b,fs,fun
original,_,of=elf(root/'evidence/original/pump/deployed.so')
reports=[]
for label,file in [('control',sys.argv[1]),('candidate',sys.argv[2])]:
 b,fs,cf=elf(Path(file));st,_,_=next(t for t in fs if ('16process_cashback17' in t[2] or '22process_cashback_inner17' in t[2]));helper=cf(st)
 c=next(c for c in helper['calls'] if 'Account$LT$T$GT$' in c['symbol'] and ('8try_from17' in c['symbol'] or '18try_from_unchecked17' in c['symbol']));ctor=cf(c['target']);oc=next(c for c in of(0x6cd78)['calls'] if c['offset']==0x1910);orig_ctor=of(oc['target']);dc=next(c for c in ctor['calls'] if c['offset']==0x290);decoder=cf(dc['target']);odc=next(c for c in orig_ctor['calls'] if c['offset']==0x290);orig_decoder=of(odc['target'])
 reports.append({'label':label,'elf_sha256':sha(b),'helper':{k:v for k,v in helper.items() if k!='calls'},'helper_constructor_call':c,'constructor':{k:v for k,v in ctor.items() if k!='calls'},'constructor_normalized_equal_original':ctor['normalized_sha256']==orig_ctor['normalized_sha256'],'constructor_decoder_call':dc,'decoder':{k:v for k,v in decoder.items() if k!='calls'},'decoder_normalized_equal_original':decoder['bytes']==orig_decoder['bytes'] and decoder['normalized_sha256']==orig_decoder['normalized_sha256'],'original_helper_constructor_call':oc,'original_constructor':orig_ctor,'original_decoder':orig_decoder})
assert not reports[0]['decoder_normalized_equal_original']
assert reports[1]['constructor_normalized_equal_original'] and reports[1]['decoder_normalized_equal_original']
assert '15try_deserialize17' in reports[1]['decoder']['symbol']
result={'original_sha256':sha(original),'scope':'Actual unmasked helper→Account constructor→checked decoder edges; constructor body normalization masks this semantic difference. This does not claim the whole helper is exact.','reports':reports}
Path(sys.argv[3]).write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps([{k:v for k,v in r.items() if k in ('label','helper_constructor_call','constructor_decoder_call','constructor_normalized_equal_original','decoder_normalized_equal_original')} for r in reports],indent=2))
