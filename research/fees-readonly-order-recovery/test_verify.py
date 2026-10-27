"""Reject altered source, build, layout, runtime and readonly payload evidence."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,shutil,tempfile,unittest
HERE=Path(__file__).resolve().parent
SPEC=importlib.util.spec_from_file_location('readonly_verifier',HERE/'verify.py');V=importlib.util.module_from_spec(SPEC);SPEC.loader.exec_module(V)
class Tampering(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  # Every mutation is confined to a temporary copy of this packet. Authenticate
  # the unchanged parent once, then avoid rerunning its complete historical chain
  # for each child-packet negative test. The production verifier has no bypass.
  result=V.verify();assert result["readonly_differing_bytes"]==0
  cls.loader=staticmethod(V.module)
  def verified_parent(name,path):
   m=cls.loader(name,path)
   if Path(path)==V.PARENT/'verify.py':m.verify=lambda: None
   return m
  V.module=verified_parent
 @classmethod
 def tearDownClass(cls):V.module=cls.loader
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name)/'packet';shutil.copytree(HERE,self.root);self.original=V.HERE;V.HERE=self.root
 def tearDown(self):V.HERE=self.original;self.tmp.cleanup()
 def json(self,name,mutate):
  p=self.root/name;j=json.loads(p.read_bytes());mutate(j);p.write_text(json.dumps(j,indent=2)+'\n')
 def seal(self):
  j={str(p.relative_to(self.root)):hashlib.sha256(p.read_bytes()).hexdigest()for p in self.root.rglob('*')if p.is_file()and p.name!='manifest.json'};(self.root/'manifest.json').write_text(json.dumps(j,indent=2)+'\n')
 def rejects(self):
  with self.assertRaises((AssertionError,KeyError,ValueError)):V.verify()
 def test_manifest(self):
  self.json('manifest.json',lambda j:j.pop('source.patch'));self.rejects()
 def test_source(self):
  p=self.root/'overrides'/V.FILES[0];p.write_bytes(p.read_bytes().replace(b'pub enum FeeError',b'pub enum ChangedError'));self.seal();self.rejects()
 def test_build(self):
  self.json('builds/candidate/result.json',lambda j:j.update(source_unchanged=False));self.seal();self.rejects()
 def test_layout_bytes(self):
  p=self.root/'layout/ordered.ld';p.write_bytes(p.read_bytes().replace(b'.text : {',b'.text : { BYTE(0);',1));h=V.sha(p.read_bytes())
  for role in ['candidate','repeat']:self.json('builds/'+role+'/launch.json',lambda j:j['inputs'].update({'ordered.ld':h}))
  self.seal();self.rejects()
 def test_repeat(self):
  p=self.root/'builds/repeat/candidate.so.gz';b=bytearray(gzip.decompress(p.read_bytes()));b[-1]^=1;p.write_bytes(gzip.compress(b,mtime=0));self.seal();self.rejects()
 def test_readonly(self):
  for role in ['candidate','repeat']:
   hashes={}
   for kind in ['symbols','candidate']:
    p=self.root/('builds/'+role+'/'+kind+'.so.gz');b=bytearray(gzip.decompress(p.read_bytes()));i=b.index(b'Feature is currently deactivated');b[i]^=1;p.write_bytes(gzip.compress(b,mtime=0));hashes[kind+'_sha256']=V.sha(b)
   self.json('builds/'+role+'/result.json',lambda j:j.update(hashes))
  self.seal();self.rejects()
 def test_runtime(self):
  p=self.root/'runtime.json.gz';j=json.loads(gzip.decompress(p.read_bytes()));j['case_count']-=1;p.write_bytes(gzip.compress(json.dumps(j).encode(),mtime=0));self.seal();self.rejects()
if __name__=='__main__':unittest.main()
