"""Resolve published archive/member selectors to this fresh Cargo file cohort.

Only literal artifact basenames change. Section selectors and their order are
preserved. Every rewritten archive/member must exist uniquely in actual inputs.
"""
from pathlib import Path
import hashlib,importlib.util,json,re,subprocess
D=Path(__file__).resolve().parent;W=D.parent
sha=lambda b:hashlib.sha256(b).hexdigest()
script=(D/'upstream/builds/ordered.ld').read_text(encoding='utf-8');inv=json.loads((D/'build-01-shipped-linker/link/invocation.json').read_text())
paths=[Path(x['path']) for x in inv['inputs']];retained={x['path']:D/'build-01-shipped-linker/link'/x['retained'] for x in inv['inputs'] if x['retained']};archives=[p for p in paths if p.suffix=='.rlib'];ar=W/'mayhem-native-build/sdk/llvm/bin/llvm-ar.exe';cache={};bindings=[];translated=script
selectors=sorted(set(re.findall(r'^\s*([^\s]+)\(',script,re.M)))
for selector in selectors:
 if selector=='*':continue
 if '.rlib:' not in selector:
  found=[p for p in paths if p.name==selector.lstrip('*')];assert len(found)==1,(selector,found);actual=retained.get(str(found[0]),found[0]);bindings.append(dict(original=selector,translated=selector,kind='object',path=str(found[0]),retained_path=str(actual),sha256=sha(actual.read_bytes())));continue
 archive,member=selector.lstrip('*').split(':',1);match=re.fullmatch(r'lib(.+)-([0-9a-f]{16})\.rlib',archive);assert match,archive;crate,old=match.groups();found=[]
 for p in archives:
  m=re.fullmatch(r'lib'+re.escape(crate)+r'-([0-9a-f]{16})\.rlib',p.name)
  if not m:continue
  candidate=member.replace(crate+'-'+old+'.',crate+'-'+m[1]+'.',1)
  if p not in cache:cache[p]=subprocess.run([str(ar),'t',str(p)],capture_output=True,check=True).stdout.decode().splitlines()
  if cache[p].count(candidate)==1:found.append((p,candidate))
 assert len(found)==1,(selector,[(str(p),n)for p,n in found])
 p,n=found[0];new='*'+p.name+':'+n;data=subprocess.run([str(ar),'p',str(p),n],capture_output=True,check=True).stdout
 bindings.append(dict(original=selector,translated=new,kind='archive-member',path=str(p),archive_sha256=sha(p.read_bytes()),member=n,member_bytes=len(data),member_sha256=sha(data),matches=1));translated=translated.replace(selector+'(',new+'(')
assert [x.split('(',1)[1] for x in script.splitlines() if '(' in x]==[x.split('(',1)[1] for x in translated.splitlines() if '(' in x]
source=(D/'upstream/builds/ordered.ld').read_bytes();assert source.decode()==script
record=dict(original_script_sha256=sha(source),translated_script_sha256=sha(translated.encode()),archive_tool_sha256=sha(ar.read_bytes()),bindings=bindings,changed_selectors=sum(x['original']!=x['translated'] for x in bindings),scope='Literal Cargo artifact basename adaptation. No section name/order, source, compiler option or output-byte changes.')
(D/'selector-map.json').write_text(json.dumps(record,indent=2)+'\n',encoding='utf-8');(D/'ordered-native.ld').write_bytes(translated.encode())
s=importlib.util.spec_from_file_location('native441_selector_build',W/'mayhem-amm-lifetimes/build_control.py');b=importlib.util.module_from_spec(s);s.loader.exec_module(b);b.L=D
label='02-native-selectors';controller=b.prepare(label,D/'source');(controller/'ordered-native.ld').write_bytes(translated.encode());b.run(label,controller)
import gzip
for local,remote in [('symbols.so','symbols.so.gz'),('candidate-v154-strip.so','candidate.so.gz')]:
 a=(D/('build-'+label)/local).read_bytes();z=gzip.decompress((D/'upstream/builds'/remote).read_bytes());print(local,'archived_raw_equal',a==z,'bytes',len(a),flush=True)
