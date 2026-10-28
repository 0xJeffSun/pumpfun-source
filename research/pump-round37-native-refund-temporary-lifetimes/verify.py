"""Static refund-wrapper qualification; no compiler, VM or network fallback."""
from pathlib import Path
import hashlib,importlib.util,json,struct,sys,tarfile,tempfile
if not __debug__:raise RuntimeError('Assertions required')
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def scope(m,a,b):
 sa,sb=m.sections(a),m.sections(b);bf={r['start']:r for r in m.functions(b)};rows=[]
 for original,part in [(300808,'7migrate21refund_pool_authority'),(353880,'10migrate_v221refund_pool_authority')]:
  hits=[r for r in bf.values()if any(part in n for n in r['symbols'])];assert len(hits)==1;r=hits[0];assert r['bytes']==384
  ar=m.body(a,sa,original,384);br=m.body(b,sb,r['start'],384);an,ao=m.normalize(ar,original,sa);bn,bo=m.normalize(br,r['start'],sb);assert an==bn
  ac=[o for o in ao if o['kind']=='direct-call'];bc=[o for o in bo if o['kind']=='direct-call'];assert len(ac)==len(bc)==1 and ac[0]['offset']==bc[0]['offset']==336
  assert ac[0]['target']==575344;callee=bf[bc[0]['target']];assert callee['bytes']==1256
  assert m.normalize(m.body(a,sa,575344,1256),575344,sa)[0]==m.normalize(m.body(b,sb,callee['start'],1256),callee['start'],sb)[0]
  def literal(im,ss,raw,ops):
   refs=[o for o in ops if o['kind']=='elf-pointer'];assert len(refs)==1 and refs[0]['offset']==112
   assert struct.unpack_from('<BBhi',raw,216)==(0x7a,10,-80,14)
   ptr=refs[0]['value'];v=ss['.rodata'];assert v['addr']<=ptr and ptr+14<=v['addr']+v['size'];off=ptr-v['addr']+v['offset'];return im[off:off+14],ptr
  av,_=literal(a,sa,ar,ao);bv,ptr=literal(b,sb,br,bo);assert av==bv==b'pool-authority'
  rows.append(dict(original=original,candidate=r['start'],callee=callee['start'],literal=ptr))
 return rows

def main():
 seal=json.loads((P/'manifest.json').read_text());assert set(seal)=={'README.md','capture-map.json','captures.tar.xz','verify.py'}
 for n,h in seal.items():assert sha((P/n).read_bytes())==h
 mapping=json.loads((P/'capture-map.json').read_text())
 with tempfile.TemporaryDirectory()as td:
  D=Path(td)
  with tarfile.open(P/'captures.tar.xz','r:xz')as tf:
   members=tf.getmembers();assert len(members)==len(mapping)and {x.name for x in members}==set(mapping)
   for x in members:
    assert x.isfile()and not Path(x.name).is_absolute()and '..'not in Path(x.name).parts
    raw=tf.extractfile(x).read();assert len(raw)==mapping[x.name]['bytes']and sha(raw)==mapping[x.name]['sha256'];p=D/x.name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(raw)
  def inputs(root):return {str(p.relative_to(root)):sha(p.read_bytes())for p in root.rglob('*')if p.is_file()}
  old,new=inputs(D/'parent-source'),inputs(D/'source');assert len(old)==len(new)==58 and old.keys()==new.keys()
  changed=sorted(n for n in old if old[n]!=new[n]);assert changed==['programs/pump/src/migrate.rs','programs/pump/src/migrate_v2.rs']
  for n,mint in [(changed[0],'mint'),(changed[1],'base_mint')]:
   before=(D/'parent-source'/n).read_bytes();after=(D/'source'/n).read_bytes()
   x=(f' let mint=a.{mint}.key();let bump=[bump];let signer_seeds:&[&[&[u8]];1]=&[&[b"pool-authority",mint.as_ref(),&bump]];\n crate::migrate::transfer_native(a.system_program.as_ref(),&a.pool_authority,destination,amount,signer_seeds)').encode()
   y=(f' let transfer=|signer_seeds:&[&[&[u8]];1]|crate::migrate::transfer_native(a.system_program.as_ref(),&a.pool_authority,destination,amount,signer_seeds);\n transfer(&[&[b"pool-authority",a.{mint}.key().as_ref(),&[bump]]])').encode();assert before.count(x)==1 and after==before.replace(x,y)
  for n in old:assert (D/'parent-source'/n).read_bytes().count(b'\n')==(D/'source'/n).read_bytes().count(b'\n')
  for label in ['temporary-lifetime','repeat']:
   r=json.loads((D/'builds'/label/'result.json').read_text());launch=json.loads((D/'builds'/label/'launch.json').read_text());assert r['exit_code']==0 and r['root_invocations']==1 and all(r[k]for k in ['primary_unchanged','source_unchanged','sdk_unchanged'])
   assert launch['workspace_inputs']==new and launch['primary_source_inputs']==inputs(D/'primary')and len(launch['sdk_inputs'])==2775
   assert sha((D/'builds'/label/'build.log').read_bytes())==r['build_log_sha256']
   for kind in ['candidate','unstripped']:
    raw=(D/'builds'/label/(kind+'.so')).read_bytes();assert sha(raw)==r[kind+'_sha256']and raw==(D/'builds/temporary-lifetime'/(kind+'.so')).read_bytes()
  assert sha((D/'parent-unstripped.so').read_bytes())=='cc07ebe25c8698fa2037535e94be444639a150e6e6b608ad75a0062b88c02c8d'
  spec=importlib.util.spec_from_file_location('iv',D/'analysis/inventory.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
  current=m.inventory(D/'builds/temporary-lifetime/unstripped.so');parent=m.inventory(D/'parent-unstripped.so');stored=json.loads((D/'inventory.json').read_text());assert stored==current
  match=lambda j:{r['start']for r in j['windows']if r['candidates']};rawset=lambda j:{r['start']for r in j['windows']if any(c['raw_sha256']==r['raw_sha256']for c in r['candidates'])}
  assert match(current)-match(parent)=={300808,353880}and match(parent)<=match(current)and rawset(current)==rawset(parent)
  assert (current['injective_normalized'],current['membership_normalized'],current['injective_raw'])==(758,758,131)
  a=(D/'analysis/reference/original.so').read_bytes();b=(D/'builds/temporary-lifetime/unstripped.so').read_bytes();rows=scope(m,a,b);sb=m.sections(b);tests=[]
  def at(addr):
   hits=[v for k,v in sb.items()if k in ['.text','.rodata','.data.rel.ro']and v['addr']<=addr<v['addr']+v['size']];assert len(hits)==1;v=hits[0];return v['offset']+addr-v['addr']
  q=rows[0]
  for label,addr in [('seed_scalar',q['candidate']+216+4),('call_target',q['candidate']+336+4),('callee_instruction',q['callee']),('counted_literal',q['literal'])]:
   z=bytearray(b);z[at(addr)]^=1
   try:scope(m,a,bytes(z));reject=False
   except (AssertionError,KeyError,struct.error):reject=True
   assert reject;tests.append(label)
  print(json.dumps(dict(normalized=758,membership=758,raw=131,gains=[300808,353880],old_sets_held=True,complete_repeat_equal=True,roots=2,root_bytes=384,actual_direct_calls=2,direct_callee_bytes=1256,counted_literal_bytes=14,mutations_rejected=tests,fresh_vm_pairs=0,scope=__doc__+' Direct callee and literal only; no recursive/CPI/account-validation/runtime/whole theorem. Upstream PR425 ordinary temporary-lifetime form isolated from synthetic layout composite.')))
if __name__=='__main__':main()
