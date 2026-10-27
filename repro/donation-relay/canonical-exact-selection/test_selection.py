"""Independent negative controls for the final pinned selection document.

Copies only bound files plus the explicit old/new sources and metadata. No build,
VM, RPC, original packet mutation, or canonical checkout mutation is performed.
"""
from pathlib import Path
import copy,gzip,hashlib,importlib.util,json,shutil,tempfile,unittest
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
spec=importlib.util.spec_from_file_location('selection_under_test',HERE/'selection_gate.py')
gate=importlib.util.module_from_spec(spec);spec.loader.exec_module(gate)
def digest(b):return hashlib.sha256(b).hexdigest()
class SelectionControls(unittest.TestCase):
 def setUp(self):
  self.document=json.loads((HERE/'transition.json').read_bytes())
  self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name)
  t=self.document;names=set(t['bindings'])
  for stage in ['old','new']:
   src=t[stage]['source'];names.update(src['root']+'/'+n for n in src['files']);names.update(src['extra_inputs'])
  names.update([t['old']['current_snapshot'],t['current']['path'],t['new']['selection']['path']])
  names.update(t['new']['configuration'])
  for name in sorted(names):
   source=ROOT/name;target=self.root/name;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,target)
 def tearDown(self):self.tmp.cleanup()
 def verify(self):return gate._verify_document(self.root,self.document)
 def write_json(self,name,value):
  p=self.root/name;p.write_text(json.dumps(value,indent=2,sort_keys=True)+'\n')
  if name in self.document['bindings']:self.document['bindings'][name]=digest(p.read_bytes())
  return digest(p.read_bytes())
 def update_metadata(self):
  t=self.document;c=t['current'];c['after_sha256']=self.write_json(c['path'],c['after'])
  s=t['new']['selection'];s['value']['selected_metadata_sha256']=c['after_sha256'];s['sha256']=self.write_json(s['path'],s['value'])
 def replace_blob(self,row,raw):
  p=self.root/row['path'];p.write_bytes(gzip.compress(raw,mtime=0)if row['encoding']=='gzip'else raw)
  row['sha256']=digest(raw);row['bytes']=len(raw)
  if row['path']in self.document['bindings']:self.document['bindings'][row['path']]=digest(p.read_bytes())
 def test_legitimate_baseline(self):
  r=self.verify();self.assertTrue(r['all492_raw']);self.assertTrue(r['selected_payload_literal_checked']);self.assertFalse(r['fresh_loader_executed'])
 def test_extra_source(self):
  (self.root/'programs/donation-relay/src/extra_unreviewed.rs').write_text('pub fn unreviewed() {}\n')
  with self.assertRaises(AssertionError):self.verify()
 def test_changed_rust_source(self):
  p=self.root/'programs/donation-relay/src/lib.rs';p.write_bytes(p.read_bytes()+b'\n// changed source\n')
  with self.assertRaises(AssertionError):self.verify()
 def test_changed_actual_call_opcode_with_outer_hashes_repinned(self):
  t=self.document;row=t['new']['candidate'];raw=bytearray(gate.blob(self.root,row))
  parser=gate.module(self.root,t['parser'],'selection_negative_parser');elf=parser.Elf(raw);text=elf.by_name['.text']
  call=next(i for i in range(text['offset'],text['offset']+text['size'],8)if raw[i]==0x85 and raw[i+1]>>4==1)
  raw[call]=0x95 # Replace a real direct CALL opcode with EXIT; preserve file size.
  self.replace_blob(row,bytes(raw))
  t['current']['after']['candidate_sha256']=row['sha256'];t['new']['selection']['value']['selected_candidate_sha256']=row['sha256'];self.update_metadata()
  # Re-pin ordinary outer receipts too: literal comparison must still reject.
  receipt_name=t['new']['loader_receipt'];receipt=gate.read(self.root,receipt_name);receipt['elf_sha256']=row['sha256'];self.write_json(receipt_name,receipt)
  build_name=t['new']['build_receipts'][1];build=gate.read(self.root,build_name);build['artifacts']['candidate.so']['sha256']=row['sha256'];self.write_json(build_name,build)
  with self.assertRaises(AssertionError):self.verify()
 def test_wrong_current_pointer_with_metadata_repinned(self):
  self.document['current']['after']['candidate_artifact']='repro/wrong-candidate.so';self.update_metadata()
  with self.assertRaises(AssertionError):self.verify()
 def test_missing_payload(self):
  self.document['new']['payload']=None
  with self.assertRaises(AssertionError):self.verify()
 def test_altered_payload_with_hashes_repinned(self):
  row=self.document['new']['payload'];raw=bytearray(gate.blob(self.root,row));raw[-1]^=1;self.replace_blob(row,bytes(raw))
  with self.assertRaises(AssertionError):self.verify()
class RecordedMountControls(unittest.TestCase):
 def setUp(self):
  spec=importlib.util.spec_from_file_location('selection_mount_checks',HERE/'verify_selection.py');self.module=importlib.util.module_from_spec(spec);spec.loader.exec_module(self.module)
  self.launch=json.loads((HERE/'build/launch.json').read_bytes())
 def test_recorded_checkout_is_not_current_checkout(self):
  self.assertTrue(self.module.recorded_mounts(self.launch).endswith('/pumpfun-source'))
 def test_portable_checkout_locator(self):
  create=self.launch['create'];root=self.module.recorded_mounts(self.launch)
  self.launch['create']=[x.replace(root,'/another/review-checkout')if isinstance(x,str)else x for x in create]
  self.assertEqual(self.module.recorded_mounts(self.launch),'/another/review-checkout')
 def test_writable_source_rejected(self):
  self.launch['create']=[x.replace(':/source:ro',':/source:rw')for x in self.launch['create']]
  with self.assertRaises(AssertionError):self.module.recorded_mounts(self.launch)
 def test_unrelated_configuration_rejected(self):
  self.launch['create']=[('/unrelated/config:/config:ro'if x.endswith(':/config:ro')else x)for x in self.launch['create']]
  with self.assertRaises(AssertionError):self.module.recorded_mounts(self.launch)

class CriticalCodeControls(unittest.TestCase):
 def test_resealed_changed_critical_code_rejected(self):
  spec=importlib.util.spec_from_file_location('critical_selection_check',HERE/'verify_selection.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
  with tempfile.TemporaryDirectory()as t:
   d=Path(t)/'packet';shutil.copytree(HERE,d);m.HERE=d;m.authenticate()
   p=d/'common.py';p.write_bytes(p.read_bytes()+b'\n# changed critical code\n')
   manifest=json.loads((d/'manifest.json').read_bytes());manifest['files']['common.py']={'sha256':digest(p.read_bytes()),'bytes':p.stat().st_size};(d/'manifest.json').write_text(json.dumps(manifest));(d/'manifest.sha256').write_text(digest((d/'manifest.json').read_bytes()))
   with self.assertRaises(AssertionError):m.authenticate()

if __name__=='__main__':unittest.main()
