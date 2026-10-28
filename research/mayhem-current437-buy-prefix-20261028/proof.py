"""Offline verifier for one bounded AMM Buy prefix; no compiler or target execution."""
from pathlib import Path,PurePosixPath
import base64,difflib,gzip,hashlib,importlib.util,json,re,subprocess,sys,tarfile,tempfile
if not __debug__:raise RuntimeError('Assertions required')
sha=lambda b:hashlib.sha256(b).hexdigest()
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def inventory(p):
 paths=list(p.rglob('*'));assert all(not f.is_symlink()and(f.is_file()or f.is_dir())for f in paths)
 return {str(f.relative_to(p)):sha(f.read_bytes())for f in paths if f.is_file()and f!=p/'manifest.json'}
def archive(p):
 files={}
 with tarfile.open(p)as t:
  for m in t:
   n=PurePosixPath(m.name);assert m.isfile()and not n.is_absolute()and'..'not in n.parts and str(n)==m.name and n.parts[:2]==('programs','mayhem')
   key=str(n.relative_to('programs/mayhem'));assert key not in files;files[key]=t.extractfile(m).read()
 assert len(files)==67
 return files
def fields(raw):
 text=raw.decode();a=text.index('SellEvent{',text.index('let native_balance='))+len('SellEvent{');z=text.index('};\n emit!(event)',a);s=text[a:z];out=[];start=depth=0
 for i,ch in enumerate(s):
  if ch in '({[':depth+=1
  elif ch in ')}]':depth-=1
  elif ch==','and depth==0:out.append(s[start:i]);start=i+1
 out.append(s[start:]);return[re.sub(r'\s+','',x)for x in out]
def source_check(p):
 a=archive(p/'parent/source.tar.gz');b=archive(p/'first/source.tar.gz');changed=sorted(n for n in a if a[n]!=b[n]);assert changed==['src/instructions/buy_pump_swap.rs']
 patch=''.join(''.join(difflib.unified_diff(a[n].decode().splitlines(True),b[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in changed);assert(p/'source.patch').read_text()==patch
 before,after=fields(a[changed[0]]),fields(b[changed[0]]);assert sorted(before)==sorted(after)and len(before)==len(after)==25
 def outside_initializer(raw):
  text=raw.decode();start=text.index('SellEvent{',text.index('let native_balance='))+len('SellEvent{');end=text.index('};\n emit!(event)',start)
  return text[:start],text[end:]
 assert outside_initializer(a[changed[0]])==outside_initializer(b[changed[0]])
 keys=[f.split(':',1)[0]for f in after];assert keys.index('sol_amount')==keys.index('global_quote_deployed')+1
 assert len(a[changed[0]].splitlines())==len(b[changed[0]].splitlines())
 assert json.loads((p/'source-delta.json').read_bytes())==dict(changed=changed,parent={n:sha(v)for n,v in a.items()},first={n:sha(v)for n,v in b.items()})
 return a,b
def signature(encoded):
 from solders.transaction import Transaction
 tx=Transaction.from_bytes(base64.b64decode(encoded,validate=True));assert all(tx.verify_with_results());return len(tx.signatures)
def prefix(reader,audit,original,candidate):
 o=reader.Elf(original);c=reader.Elf(candidate);cw=audit.windows(c);a=o.window(85600,95336);b=audit.named(c,cw,'buy_pump_swap7handler');left=o.norm(a['start'],a['end'])[0];right=c.norm(b['start'],b['end'])[0]
 assert len(left)==len(right)==9736 and left[:7200]==right[:7200] and left[7200:7208]!=right[7200:7208]
 assert a['normalization_pattern']==b['normalization_pattern']and audit.key(a)!=audit.key(b)
 return o,c,a,b,cw
def check(p,root):
 assert inventory(p)==json.loads((p/'manifest.json').read_bytes())
 external=json.loads((p/'external-inputs.json').read_bytes())
 for n,h in external.items():assert sha((root/n).read_bytes())==h,n
 for n,source in [('reader.py','helpers/reader.py'),('analysis.py','analysis.py'),('cfg.py','cfg.py')]:assert sha((p/'helpers'/n).read_bytes())==external['research/mayhem-amm-sell-cfg-recovery-20261027/'+source]
 reader=module('prefix_reader',p/'helpers/reader.py');audit=module('prefix_audit',p/'helpers/analysis.py');cfg=module('prefix_cfg',p/'helpers/cfg.py');progress=module('prefix_progress',root/'research/mayhem-amm-sell-cfg-recovery-20261027/helpers/progress.py');closure=module('prefix_closure',root/'research/mayhem-current434-code-reference-closure-20261027/proof.py');images=module('prefix_images',root/'research/mayhem-current-macro-call-closure-20261027/verify.py')
 parent,first=source_check(p)
 for role,src in [('parent',parent),('first',first),('repeat',first)]:
  d=p/role;launch=json.loads((d/'launch.json').read_bytes());result=json.loads((d/'result.json').read_bytes());assert launch['source_inputs']=={n:sha(v)for n,v in src.items()}
  assert launch['controller_sha256']==sha((p/'controllers/build_qualified_root.py').read_bytes())and result['returncode']==0 and result['source_unchanged']and result['archives_unchanged']
  for name in ['candidate.so','symbols.so']:assert sha((d/name).read_bytes())==result[name.replace('.so','')+'_sha256']
  with tempfile.TemporaryDirectory()as td:images.verify_image_pair(reader,reader.Elf(d/'symbols.so'),(d/'candidate.so').read_bytes(),Path(td)/'candidate.so')
 for name in ['candidate.so','symbols.so']:assert(p/'first'/name).read_bytes()==(p/'repeat'/name).read_bytes()
 original=root/'evidence/original/mayhem/deployed.so';v=progress.compare(original.read_bytes(),(p/'parent/symbols.so').read_bytes(),(p/'first/symbols.so').read_bytes());assert(v['matches'],v['raw_matches'],v['positive_direct_edges_after'],v['positive_Source_records_after'])==(437,141,4525,499)
 assert v==json.loads((p/'diagnostics/qualified-amm437-buy-sol-after-globals-01-preservation.json').read_bytes())
 q=closure.inspect(original.read_bytes(),(p/'first/symbols.so').read_bytes());assert q==json.loads((p/'diagnostics/qualified-amm437-buy-sol-after-globals-01-closure.json').read_bytes())and q['summary']['direct_and_code_reference_closed_windows']==431
 o,c,a,b,cw=prefix(reader,audit,original,p/'first/symbols.so');ow={r['start']:o.window(r['start'],r['end'])for r in json.loads((root/'research/mayhem-provider-sharing/audit.json').read_bytes())['rows']}
 assert len(a['direct'])==len(b['direct'])==96 and [x['offset']for x in a['direct']]==[x['offset']for x in b['direct']]
 assert[audit.key(ow[x['target']])for x in a['direct']]==[audit.key(cw[x['target']])for x in b['direct']]and audit.sources(o,a)==audit.sources(c,b)
 g=audit.cfg_report(cfg,o,c,a,b);assert len(g['original_blocks'])==len(g['candidate_blocks'])==115 and not g['topology_conflicts']
 rawcases=json.loads((p/'runtime/cases.json').read_bytes())['cases'];assert len(rawcases)==9
 launch=json.loads((p/'runtime/launch.json').read_bytes());assert launch['candidate_sha256']==sha((p/'first/candidate.so').read_bytes()) and launch['controller_sha256']==sha((p/'controllers/run_runtime437_prefix7200.py').read_bytes())
 assert sha((p/'runtime/cases.json').read_bytes())in launch['input_hashes'].values()
 pairs=signatures=success=0
 with tempfile.TemporaryDirectory()as td:
  for instruction in ['buy_pump_swap','sell_pump_swap']:
   for family in ['native','token']:
    name=instruction+'-'+family;path=p/'runtime'/(name+'.json');j=json.loads(path.read_bytes());assert j['candidate_sha256']==sha((p/'first/candidate.so').read_bytes())and j['case_count']==9 and not j['mismatches']
    expected=[dict(row,instruction=instruction,token_quote=family=='token',quote_token22=False)for row in rawcases]
    for row in expected:row.setdefault('tokens',10**11 if instruction=='buy_pump_swap'else 10**9)
    assert [r['case']for r in j['cases']]==expected
    subprocess.run([sys.executable,'-B',str(root/'scripts/verify_mayhem_pump_swap.py'),'--candidate',str(p/'first/candidate.so'),'--receipts',str(path),'--output',str(Path(td)/(name+'.json'))],check=True,stdout=subprocess.DEVNULL)
    for row in j['cases']:
     x,y=row['original'],row['candidate'];assert x['transaction_base64']==y['transaction_base64']
     for record,digest in [(x,j['original_sha256']),(y,j['candidate_sha256'])]:
      signatures+=signature(record['transaction_base64'])
      for phase in ['before','after']:
       acc=record[phase]['MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'];assert acc['executable']and acc['data_sha256']==digest
     logs=lambda r:[line for line in r['metadata']['logs']if not re.search(r' consumed \d+ of \d+ compute units',line)]
     assert logs(x)==logs(y);pairs+=1;success+=x['error']is None
 assert(pairs,signatures,success)==(36,144,7)
 return dict(normalized_windows=437,raw_windows=141,closed_windows=431,Buy_exact_normalized_prefix_bytes=7200,Buy_complete_body_equal=False,runtime_pairs=pairs,signed_records=72,signature_fields=signatures,successful_original_pairs=success,whole_ELF_equal=False)
