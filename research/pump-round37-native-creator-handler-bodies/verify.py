"""Static refund-wrapper qualification; no compiler, VM or network fallback."""
from pathlib import Path
import hashlib,importlib.util,json,os,stat,struct,sys,tarfile,tempfile
from unittest.mock import patch
if not __debug__:raise RuntimeError('Assertions required')
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
ENVELOPE=frozenset({'manifest.json','README.md','capture-map.json','captures.tar.xz','verify.py'})
class PacketInventoryError(ValueError):pass

def verify_files(root):
 # Validate every path before reading even the root manifest. This flat packet
 # permits exactly five regular files, and no directories or links.
 if stat.S_ISLNK(root.lstat().st_mode) or not root.is_dir():
  raise PacketInventoryError('packet root must be a real directory')
 paths=list(root.rglob('*'))
 for p in paths:
  mode=p.lstat().st_mode
  if not stat.S_ISREG(mode):
   raise PacketInventoryError('non-regular packet entry: '+str(p.relative_to(root)))
 if {str(p.relative_to(root))for p in paths}!=ENVELOPE:
  raise PacketInventoryError('packet inventory must contain exactly the five declared files')
 seal=json.loads((root/'manifest.json').read_text())
 assert set(seal)==ENVELOPE-{'manifest.json'}
 for n,h in seal.items():assert sha((root/n).read_bytes())==h
 return seal

def inventory_negative_controls():
 tests=[]
 with tempfile.TemporaryDirectory()as td:
  top=Path(td)
  def check(label,mutate):
   root=top/label;root.mkdir()
   for n in ENVELOPE-{'manifest.json'}:(root/n).write_bytes(b'fixture')
   (root/'manifest.json').write_text(json.dumps({n:sha(b'fixture')for n in ENVELOPE-{'manifest.json'}}))
   mutate(root)
   # Any attempted content read is an uncaught failure, including reads of
   # manifest links and FIFOs. Rejection must happen at the path preflight.
   with patch.object(Path,'read_bytes',side_effect=AssertionError('read before inventory rejection')),patch.object(Path,'read_text',side_effect=AssertionError('read before inventory rejection')):
    try:verify_files(root)
    except PacketInventoryError:tests.append(label)
    else:raise AssertionError('invalid inventory accepted: '+label)
  check('extra_file',lambda r:(r/'extra.txt').write_bytes(b'extra'))
  def nested(r):
   (r/'nested').mkdir();(r/'nested/manifest.json').write_bytes(b'{}')
  check('nested_manifest',nested)
  def directory(r,name):
   (r/name).unlink();(r/name).mkdir()
  check('root_manifest_directory',lambda r:directory(r,'manifest.json'))
  check('payload_directory',lambda r:directory(r,'README.md'))
  outside=top/'outside';outside.write_bytes(b'external bytes must not be read')
  def link(r,name):
   (r/name).unlink();(r/name).symlink_to(outside)
  check('root_manifest_symlink',lambda r:link(r,'manifest.json'))
  check('payload_symlink',lambda r:link(r,'README.md'))
  def fifo(r,name):
   (r/name).unlink();os.mkfifo(r/name)
  check('root_manifest_fifo',lambda r:fifo(r,'manifest.json'))
  check('payload_fifo',lambda r:fifo(r,'README.md'))
 return tests

def scope(m,a,b):
 sa,sb=m.sections(a),m.sections(b);bf={r['start']:r for r in m.functions(b)};af={233408:6136,239544:3552};rows=[]
 def read(im,ss,ptr,n):
  v=next(v for v in ss.values()if v['addr']>0 and v['addr']<=ptr and ptr+n<=v['addr']+v['size']);off=v['offset']+ptr-v['addr'];return im[off:off+n]
 def loc(im,ss,ptr):
  rel=ss['.rel.dyn'];rr={struct.unpack_from('<QQ',im,k)[0]:struct.unpack_from('<QQ',im,k)[1]for k in range(rel['offset'],rel['offset']+rel['size'],16)};assert rr[ptr]==8
  p,n,line,col=struct.unpack('<QQII',read(im,ss,ptr,24));assert p&0xffffffff==0 and 0<n<128;return(read(im,ss,p>>32,n).decode(),n,line,col)
 for orig,n,needle,calln,panic,oldsource,newsource in [(233408,6136,'11set_creator3set17',18,680,('programs/pump/src/creator/set_creator.rs',40,63,31),('programs/pump/src/set_creator.rs',32,21,313)),(239544,3552,'11set_creator4sync17',11,320,('programs/pump/src/creator/set_metaplex_creator.rs',49,43,31),('programs/pump/src/set_creator.rs',32,22,245))]:
  r=next(r for r in bf.values()if any(needle in s for s in r['symbols']));assert r['bytes']==n;ar=m.body(a,sa,orig,n);br=m.body(b,sb,r['start'],n);an,ao=m.normalize(ar,orig,sa);bn,bo=m.normalize(br,r['start'],sb);assert an==bn
  ac=[x for x in ao if x['kind']=='direct-call'];bc=[x for x in bo if x['kind']=='direct-call'];assert len(ac)==len(bc)==calln
  original_inventory=ORIGINAL_WINDOWS
  for u,v in zip(ac,bc):
   assert u['offset']==v['offset'];x=original_inventory[u['target']];y=bf[v['target']];assert x['bytes']==y['bytes'];assert m.normalize(m.body(a,sa,x['start'],x['bytes']),x['start'],sa)[0]==m.normalize(m.body(b,sb,y['start'],y['bytes']),y['start'],sb)[0]
  refs=[]
  for im,ss,raw,ops,expected in [(a,sa,ar,ao,oldsource),(b,sb,br,bo,newsource)]:
   ref=next(o for o in ops if o['kind']=='elf-pointer'and panic-48<=o['offset']<panic and raw[o['offset']+1]&15==3);assert loc(im,ss,ref['value'])==expected;refs.append(ref['value'])
  assert oldsource!=newsource
  rows.append(dict(original=orig,candidate=r['start'],bytes=n,calls=calln,panic=panic,source_pointer=refs[1],source_equal=False))
 return rows

def main():
 verify_files(P);inventory_tests=inventory_negative_controls();mapping=json.loads((P/'capture-map.json').read_text())
 with tempfile.TemporaryDirectory()as td:
  D=Path(td)
  with tarfile.open(P/'captures.tar.xz','r:xz')as tf:
   members=tf.getmembers();assert len(members)==len(mapping)and{x.name for x in members}==set(mapping)
   for x in members:
    assert x.isfile()and not Path(x.name).is_absolute()and'..'not in Path(x.name).parts
    raw=tf.extractfile(x).read();assert len(raw)==mapping[x.name]['bytes']and sha(raw)==mapping[x.name]['sha256'];p=D/x.name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(raw)
  def inputs(root):return{str(p.relative_to(root)):sha(p.read_bytes())for p in root.rglob('*')if p.is_file()}
  old,new=inputs(D/'parent-source'),inputs(D/'source');assert len(old)==len(new)==58 and old.keys()==new.keys();assert[n for n in old if old[n]!=new[n]]==['programs/pump/src/set_creator.rs']
  patch=(D/'upstream/source402.patch').read_text().splitlines();xs=[l[1:]for l in patch if l.startswith('-pub fn')];ys=[l[1:]for l in patch if l.startswith('+pub fn')];assert len(xs)==len(ys)==2;s=(D/'parent-source/programs/pump/src/set_creator.rs').read_text()
  for x,y in zip(xs,ys):assert s.count(x)==1;s=s.replace(x,y)
  assert s==(D/'source/programs/pump/src/set_creator.rs').read_text()
  for n in old:assert(D/'parent-source'/n).read_bytes().count(b'\n')==(D/'source'/n).read_bytes().count(b'\n')
  for label in ['creator-return','repeat']:
   r=json.loads((D/'builds'/label/'result.json').read_text());launch=json.loads((D/'builds'/label/'launch.json').read_text());assert r['exit_code']==0 and r['root_invocations']==1 and all(r[k]for k in ['primary_unchanged','source_unchanged','sdk_unchanged']);assert launch['workspace_inputs']==new and launch['primary_source_inputs']==inputs(D/'primary')and len(launch['sdk_inputs'])==2775
   assert sha((D/'builds'/label/'build.log').read_bytes())==r['build_log_sha256']
   for kind in ['candidate','unstripped']:
    raw=(D/'builds'/label/(kind+'.so')).read_bytes();assert sha(raw)==r[kind+'_sha256']and raw==(D/'builds/creator-return'/(kind+'.so')).read_bytes()
  spec=importlib.util.spec_from_file_location('iv',D/'analysis/inventory.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
  parent=m.inventory(D/'parent-unstripped.so');current=m.inventory(D/'builds/creator-return/unstripped.so');assert current==json.loads((D/'builds/creator-return/inventory.json').read_text());assert(parent['injective_normalized'],parent['membership_normalized'],parent['injective_raw'])==(758,758,131)
  match=lambda j:{r['start']for r in j['windows']if r['candidates']};rawset=lambda j:{r['start']for r in j['windows']if any(c['raw_sha256']==r['raw_sha256']for c in r['candidates'])}
  assert match(current)-match(parent)=={233408,239544}and match(parent)<=match(current)and rawset(parent)==rawset(current);assert(current['injective_normalized'],current['membership_normalized'],current['injective_raw'])==(760,760,131)
  global ORIGINAL_WINDOWS
  ORIGINAL_WINDOWS={r['start']:r for r in current['windows']};a=(D/'analysis/reference/original.so').read_bytes();b=(D/'builds/creator-return/unstripped.so').read_bytes();rows=scope(m,a,b);ss=m.sections(b);tests=[]
  def at(addr):
   v=next(v for k,v in ss.items()if k in ['.text','.rodata','.data.rel.ro']and v['addr']<=addr<v['addr']+v['size']);return v['offset']+addr-v['addr']
  q=rows[0];raw=m.body(b,ss,q['candidate'],q['bytes']);ops=m.normalize(raw,q['candidate'],ss)[1];call=next(o for o in ops if o['kind']=='direct-call')
  for label,addr in [('body_register',q['candidate']+1),('call_target',q['candidate']+call['offset']+4),('callee_instruction',call['target']+1),('source_line',q['source_pointer']+16)]:
   z=bytearray(b);z[at(addr)]^=1
   try:scope(m,a,bytes(z));rejected=False
   except(AssertionError,KeyError,ValueError,StopIteration,struct.error):rejected=True
   assert rejected;tests.append(label)
  print(json.dumps(dict(normalized=760,membership=760,raw=131,gains=[233408,239544],old_sets_held=True,complete_repeat_equal=True,roots=2,same_offset_direct_callees=29,source_records_unequal=2,mutations_rejected=tests,inventory_mutations_rejected=inventory_tests,fresh_vm_pairs=0,scope='Static instruction-body census. Source file/line/column remain unequal; no data/recursive/parser/runtime/whole proof. Credit PR402 ordinary source form, no layout layer adopted.')))
if __name__=='__main__':main()
