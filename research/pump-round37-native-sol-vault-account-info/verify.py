"""Portable finite body/data and source/build evidence check. No compiler/VM/network fallback."""
from pathlib import Path
import hashlib,importlib.util,json,struct,sys,tarfile,tempfile
if not __debug__:raise RuntimeError('Assertions required')
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def check_scope(m,a,b,inventory):
 sa,sb=m.sections(a),m.sections(b);af={r['start']:r for r in inventory['windows']};bf={r['start']:r for r in m.functions(b)}
 # Select by the complete new match, then require all actually routed callees.
 raw=m.body(a,sa,849168,576);norm,oa=m.normalize(raw,849168,sa)
 matches=[r for r in bf.values()if r['bytes']==576 and m.normalize(m.body(b,sb,r['start'],576),r['start'],sb)[0]==norm]
 assert len(matches)==1;root=matches[0]['start'];rb=m.body(b,sb,root,576);nb,ob=m.normalize(rb,root,sb);assert nb==norm
 assert struct.unpack_from('<BBhi',rb,312)==(7,8,0,488)
 calls=[]
 for x,y in zip([o for o in oa if o['kind']=='direct-call'],[o for o in ob if o['kind']=='direct-call']):
  assert x['offset']==y['offset'];ar,br=af[x['target']],bf[y['target']];assert ar['bytes']==br['bytes'];assert m.normalize(m.body(a,sa,x['target'],ar['bytes']),x['target'],sa)[0]==m.normalize(m.body(b,sb,y['target'],br['bytes']),y['target'],sb)[0];calls.append((x['offset'],ar['bytes']))
 assert len(calls)==7
 def read(im,ss,addr,n):
  hits=[v for k,v in ss.items()if k in ['.text','.rodata','.data.rel.ro']and v['addr']<=addr and addr+n<=v['addr']+v['size']];assert len(hits)==1;v=hits[0];off=addr-v['addr']+v['offset'];return im[off:off+n]
 refs=[]
 for x,y,n in zip([o for o in oa if o['kind']=='elf-pointer'],[o for o in ob if o['kind']=='elf-pointer'],[32,13,18]):
  assert x['offset']==y['offset'];assert read(a,sa,x['value'],n)==read(b,sb,y['value'],n);refs.append((x['offset'],n))
 assert len(refs)==3
 return root,calls,refs

def main():
 seal=json.loads((P/'manifest.json').read_text());assert set(seal)=={'README.md','capture-map.json','captures.tar.xz','verify.py'}
 for n,h in seal.items():assert sha((P/n).read_bytes())==h
 mapping=json.loads((P/'capture-map.json').read_text())
 with tempfile.TemporaryDirectory()as td:
  D=Path(td)
  with tarfile.open(P/'captures.tar.xz','r:xz')as tf:
   members=tf.getmembers();assert len(members)==len(mapping)and {m.name for m in members}==set(mapping)
   for member in members:
    assert member.isfile()and not Path(member.name).is_absolute()and '..'not in Path(member.name).parts
    raw=tf.extractfile(member).read();r=mapping[member.name];assert len(raw)==r['bytes']and sha(raw)==r['sha256'];p=D/member.name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(raw)
  def inputs(root):return {str(p.relative_to(root)):sha(p.read_bytes())for p in root.rglob('*')if p.is_file()}
  old,new=inputs(D/'parent-source'),inputs(D/'source');assert len(old)==len(new)==58 and old.keys()==new.keys()
  changed=[n for n in old if old[n]!=new[n]];assert changed==['programs/pump/src/mayhem_virtual_params.rs']
  n=changed[0];before=(D/'parent-source'/n).read_bytes();after=(D/'source'/n).read_bytes();assert after==before.replace(b"pub sol_vault_authority: UncheckedAccount<'info>",b"pub sol_vault_authority: AccountInfo<'info>")
  for n in old:assert (D/'parent-source'/n).read_bytes().count(b'\n')==(D/'source'/n).read_bytes().count(b'\n')
  for label in ['owned-info','repeat']:
   result=json.loads((D/'builds'/label/'result.json').read_text());launch=json.loads((D/'builds'/label/'launch.json').read_text())
   assert result['exit_code']==0 and result['root_invocations']==1 and all(result[k]for k in ['primary_unchanged','source_unchanged','sdk_unchanged'])
   assert launch['workspace_inputs']==new and launch['primary_source_inputs']==inputs(D/'primary')and len(launch['sdk_inputs'])==2775
   assert sha((D/'builds'/label/'build.log').read_bytes())==result['build_log_sha256']
   for kind in ['candidate','unstripped']:
    raw=(D/'builds'/label/(kind+'.so')).read_bytes();assert sha(raw)==result[kind+'_sha256']and raw==(D/'builds/owned-info'/(kind+'.so')).read_bytes()
  assert sha((D/'parent-unstripped.so').read_bytes())=='5c37cc917586413274aa87cbc8498e77386f15e9ae2a5666e390204c75e06963'
  spec=importlib.util.spec_from_file_location('iv',D/'analysis/inventory.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
  current=m.inventory(D/'builds/owned-info/unstripped.so');parent=m.inventory(D/'parent-unstripped.so');stored=json.loads((D/'inventory.json').read_text());assert all(stored[k]==v for k,v in current.items())
  matched=lambda j:{r['start']for r in j['windows']if r['candidates']}
  rawset=lambda j:{r['start']for r in j['windows']if any(c['raw_sha256']==r['raw_sha256']for c in r['candidates'])}
  assert matched(current)-matched(parent)=={849168}and matched(parent)<=matched(current)and rawset(current)==rawset(parent)
  assert (current['injective_normalized'],current['membership_normalized'],current['injective_raw'])==(756,756,131)
  a=(D/'analysis/reference/original.so').read_bytes();b=(D/'builds/owned-info/unstripped.so').read_bytes();root,calls,refs=check_scope(m,a,b,current)
  # Four actual in-memory changes exercise scalar/callee/data obligations.
  sb=m.sections(b)
  def file_offset(addr):
   hits=[v for k,v in sb.items()if k in ['.text','.rodata','.data.rel.ro']and v['addr']<=addr<v['addr']+v['size']];assert len(hits)==1;v=hits[0];return addr-v['addr']+v['offset']
  ops=m.normalize(m.body(b,sb,root,576),root,sb)[1];callee=next(o['target']for o in ops if o.get('offset')==64);literal=next(o['value']for o in ops if o.get('offset')==424)
  tests=[]
  for name,addr in [('field_offset',root+312+4),('actual_call_target',root+64+4),('callee_instruction',callee),('counted_account_name',literal)]:
   z=bytearray(b);z[file_offset(addr)]^=1
   try:check_scope(m,a,bytes(z),current);rejected=False
   except (AssertionError,KeyError,StopIteration,struct.error):rejected=True
   assert rejected;tests.append(name)
  result=dict(normalized=756,membership=756,raw=131,gain=[849168],old_sets_held=True,complete_repeat_equal=True,root_bytes=576,immediate_calls=7,bounded_data_bytes=63,mutations_rejected=tests,fresh_vm_pairs=0,scope=__doc__+' Seven same-offset direct callees and three finite data arguments only; no parser/drop/recursive/indirect/runtime/business-body/whole identity theorem.')
  print(json.dumps(result,sort_keys=True));return result
if __name__=='__main__':main()
