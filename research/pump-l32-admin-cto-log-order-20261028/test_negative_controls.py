#!/usr/bin/env python3
from pathlib import Path
import base64,copy,gzip,hashlib,json,tempfile,unittest
from solders.transaction import VersionedTransaction
P=Path(__file__).resolve().parent;IDX=270;MSG='Program log: No creator fee to collect';ATA='Program log: CreateIdempotent'
def req(x,m='rejected'):
 if not x:raise RuntimeError(m)
def load():return json.loads(gzip.decompress((P/'runtime/candidate-admin.json.gz').read_bytes()))
def validate(d):
 req(d['candidate_sha256']=='6779af6d57bbd4427b643e554fbf98a8d2a607b3d5167e4c655963ce0b5379e2','hash');req(d['original_sha256']=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d','original')
 r=d['cases'][IDX];req(r['case']['name']=='amm-funds-False-0','identity');a,b=r['original'],r['candidate'];req(a['transaction_base64']==b['transaction_base64'],'tx')
 raw=base64.b64decode(a['transaction_base64']);v=VersionedTransaction.from_bytes(raw).verify_with_results();req(v and all(v),'signature')
 for k in ('error','before','after','events','inner','return'):req(a[k]==b[k],k)
 req(a['logs']==b['logs'],'logs');req(a['logs'].index(ATA)<a['logs'].index(MSG),'order')
def tree(root,manifest):
 req(all(not x.is_symlink() for x in root.rglob('*')),'symlink');actual={str(x.relative_to(root)):hashlib.sha256(x.read_bytes()).hexdigest()for x in root.rglob('*')if x.is_file()};req(actual==manifest,'manifest')
class T(unittest.TestCase):
 def bad(self,d):
  with self.assertRaises((RuntimeError,ValueError,Exception)):validate(d)
 def test_01_candidate_hash(self):d=load();d['candidate_sha256']='0'*64;self.bad(d)
 def test_02_original_hash(self):d=load();d['original_sha256']='0'*64;self.bad(d)
 def test_03_transaction(self):d=load();d['cases'][IDX]['candidate']['transaction_base64']='AA==';self.bad(d)
 def test_04_order(self):d=load();L=d['cases'][IDX]['candidate']['logs'];L.insert(L.index(ATA),L.pop(L.index(MSG)));self.bad(d)
 def test_05_removed_message(self):d=load();d['cases'][IDX]['candidate']['logs'].remove(MSG);self.bad(d)
 def test_06_inserted_message(self):d=load();d['cases'][IDX]['candidate']['logs'].append(MSG);self.bad(d)
 def test_07_identity(self):d=load();d['cases'][IDX]['case']['name']='changed';self.bad(d)
 def test_08_cpi(self):d=load();d['cases'][IDX]['candidate']['inner'].append([]);self.bad(d)
 def test_09_event(self):d=load();d['cases'][IDX]['candidate']['events'].append('changed');self.bad(d)
 def test_10_balance(self):d=load();d['cases'][IDX]['candidate']['after']['transaction_payer']['lamports']+=1;self.bad(d)
 def test_11_source_patch(self):
  source=(P/'source.patch').read_bytes();expected=hashlib.sha256(source).hexdigest()
  def check(blob):req(hashlib.sha256(blob).hexdigest()==expected,'source patch')
  with self.assertRaises(RuntimeError):check(source+b'x')
 def test_12_extra_and_symlink(self):
  with tempfile.TemporaryDirectory()as q:
   r=Path(q);(r/'a').write_text('a');m={'a':hashlib.sha256(b'a').hexdigest()};(r/'x').write_text('x')
   with self.assertRaises(RuntimeError):tree(r,m)
   (r/'x').unlink();(r/'l').symlink_to('a')
   with self.assertRaises(RuntimeError):tree(r,m)
if __name__=='__main__':unittest.main(verbosity=2)
