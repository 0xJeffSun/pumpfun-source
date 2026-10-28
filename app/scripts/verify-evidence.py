import pathlib,json,hashlib,base64,tarfile
root=pathlib.Path(__file__).resolve().parents[1]
m=json.loads((root/'evidence/web/manifest.json').read_text())
records=m['records']
for name in ['api-probes.json','source-map-probes.json']:
 records += json.loads((root/'evidence'/name).read_text())
for r in records:
 if 'path' in r: assert hashlib.sha256((root/r['path']).read_bytes()).hexdigest()==r['sha256'],r['path']
meta=json.loads((root/'evidence/sdk/registry.json').read_text())
archive=root/'evidence/sdk/pump-sdk-4.3.1.tgz'
assert 'sha512-'+base64.b64encode(hashlib.sha512(archive.read_bytes()).digest()).decode()==meta['dist']['integrity']
with tarfile.open(archive) as tar:
 for member in tar.getmembers():
  if member.name.startswith('package/src/') and member.isfile():
   assert tar.extractfile(member).read()==(root/'packages/sdk'/member.name.removeprefix('package/')).read_bytes(), member.name
print(f"Verified {len(records)} captured objects, npm integrity, and unchanged SDK sources")
