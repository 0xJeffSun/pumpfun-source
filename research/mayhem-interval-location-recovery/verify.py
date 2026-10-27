"""Verify the literal data-only correction and saved signed Sell evidence; no VM."""
from pathlib import Path
import hashlib,gzip,json,struct,subprocess,sys,tempfile
P=Path(__file__).resolve().parent;R=P.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def verify():
 pins=json.loads((P/'manifest.json').read_text());paths=list(P.rglob('*'));assert not any(p.is_symlink()for p in paths)
 assert {str(p.relative_to(P))for p in paths if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}==set(pins)
 for n,h in pins.items():assert sha((P/n).read_bytes())==h,n
 for n,h in json.loads((P/'inputs.json').read_text()).items():assert sha((R/n).read_bytes())==h,n
 parent=R/'repro/mayhem/global-params-layout-recovery';maps=json.loads((P/'source-inputs.json').read_text());assert maps['before']==json.loads((parent/'source-inputs.json').read_text())['recovered']
 before=raw(parent/'sources/recovered/src/state.rs.gz').splitlines(keepends=True);after=raw(P/'overrides/src/state.rs.gz').splitlines(keepends=True);assert len(before)==len(after)and after[:561]==before[:561]and after[562:]==before[562:]and after[561]==b'     '+before[561]
 assert maps['after']==dict(maps['before'],**{'src/state.rs':sha(b''.join(after))})
 outputs={}
 for label in ['baseline','corrected','repeat']:
  launch=json.loads((P/f'builds/{label}/launch.json').read_text());result=json.loads((P/f'builds/{label}/result.json').read_text());assert launch['source_inputs']==maps['before'if label=='baseline'else'after']
  assert result['root_invocations']==1 and result['returncode']==0 and result['source_unchanged']
  for n in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{n}.gz'))==result[n+'_sha256']
  outputs[label]=[raw(P/f'artifacts/{label}/{n}.so.gz')for n in ['candidate','symbols']]
  assert all(sha(b)==result[n+'_sha256']for n,b in zip(['candidate','symbols'],outputs[label]))
 a,b=outputs['baseline'][0],outputs['corrected'][0];assert outputs['corrected']==outputs['repeat']
 assert sha(a)=='9be9d40f1c8995915d55c29abf42cf6bd1c07a1f386054ed89c2156a1ecd5460'and sha(b)=='a76f8c094fe39f83d221b0d553a11aaa4327bc3663bbb7259270ea06b0f18e7e'
 assert len(a)==len(b)==625136 and [i for i in range(len(a))if a[i]!=b[i]]==[578012]and(a[578012],b[578012])==(27,32)
 shoff=struct.unpack_from('<Q',b,40)[0];size,count,strings=struct.unpack_from('<HHH',b,58)
 sections=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*size)for i in range(count)];names=sections[strings];table=b[names[4]:names[4]+names[5]]
 text=next(x for x in sections if table[x[0]:].split(b'\0',1)[0]==b'.text');assert a[text[4]:text[4]+text[5]]==b[text[4]:text[4]+text[5]]and not text[4]<=578012<text[4]+text[5]
 original=(R/'evidence/original/mayhem/deployed.so').read_bytes()
 def location(data,at):
  ptr,n,line,col=struct.unpack_from('<QQII',data,at);return data[ptr>>32:(ptr>>32)+n],line,col
 assert location(b,577992)==location(original,727304)==(b'programs/mayhem-program/src/state.rs\0',562,32)
 receipt=json.loads(raw(P/'runtime/sell.json.gz'));assert receipt['case_count']==396 and receipt['signed_transactions']==792 and not receipt['mismatches']and receipt['candidate_sha256']==sha(b)
 assert receipt['normalized_log_differences']==['retained10001','retained65535','quote_extreme_1_0_1']
 row=next(r for r in receipt['cases']if r['case']['name']=='interval_overflow');assert row['original']['metadata']['logs'][-1]==row['candidate']['metadata']['logs'][-1]
 with tempfile.TemporaryDirectory()as td:
  t=Path(td);(t/'candidate.so').write_bytes(b)
  subprocess.run([sys.executable,'-B',str(R/'scripts/verify_mayhem_sell.py'),'--receipts',str(P/'runtime/sell.json.gz'),'--candidate',str(t/'candidate.so'),'--output',str(t/'verified.json')],check=True,capture_output=True)
  v=json.loads((t/'verified.json').read_text());assert v['verified_signed_transactions']==792 and v['successful_cases']==134 and v['rejection_cases']==262 and not v['mismatches']
 print('PASS: one corrected Location byte;identical code;two matching builds;396 cases/792 signatures;three known log differences remain')
if __name__=='__main__':verify()
