from pathlib import Path
import json,hashlib,re,struct
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda n:json.loads((P/n).read_text())
def run():
 m=J('manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
 assert not any(f.is_symlink()or f.name=='__pycache__'or f.suffix=='.pyc'for f in P.rglob('*'))
 for n,h in m.items():assert H(P/n)==h
 o=(P/'original.so').read_bytes();c=(P/'candidate.so').read_bytes();assert len(o)==len(c)==105032
 assert H(P/'original.so')=='6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d';assert H(P/'candidate.so')=='ba8dd8a42ca7bff4b668c72e1b5614e9363b271924d520253f5724760ba2d65b'
 diff=[i for i,(a,b)in enumerate(zip(o,c))if a!=b];assert len(diff)==307 and sum(288<=i<92344 for i in diff)==304
 d=J('full-residual-ledger.json');rows=J('six-windows.json');assert [r['original_ordinal']for r in rows]==[38,39,41,44,46,47]
 for side,b in [('original',o),('candidate2',c)]:
  windows=d['inventories'][side]['windows'];assert len(windows)==159
  for r in windows:
   a,z=r['range'];assert hashlib.sha256(b[a:z]).hexdigest()==r['sha256']
 mapping=lambda a:a+352 if 28592<=a<29032 else a-440 if 29032<=a<29384 else a
 changed=0
 for r in rows:
  for side,b in [('original',o),('candidate',c)]:
   a,z=r[side+'_range'];ins=r['complete_bodies'][side];assert ins[0]['pc']==a and ins[-1]['pc']+len(bytes.fromhex(ins[-1]['raw']))==z
   for item in ins:assert b[item['pc']:item['pc']+len(bytes.fromhex(item['raw']))].hex()==item['raw']
  for call in r['calls']:
   if call['original']['kind']=='internal-direct':
    a=call['original'];b=call['candidate'];assert a['target']==a['pc']+8+struct.unpack_from('<i',o,a['pc']+4)[0]*8;assert b['target']==b['pc']+8+struct.unpack_from('<i',c,b['pc']+4)[0]*8;assert mapping(a['target'])==b['target'];changed+=a['raw']!=b['raw']
 assert changed==25
 installer=(P/'official/solana-1.10.33-install.sh').read_text();assert re.search(r'# Install Rust-BPF\s+version=v1\.27\s',installer)
 assert J('official/solana-tag.json')['object']['sha']=='fcb85858485170219eb80887837afd08940f816d'
 tools=J('tool-versions.json');assert '/v1.27/bpf-tools/'in tools['selected_rustc_resolved'];assert tools['selected_rustc_sha256']==J('official/asset-assessment.json')['downloaded_rustc_sha256']
 assert 'BPF SDK: /root/.local/share/solana/install/releases/1.10.33/'in(P/'build.log').read_text()
 return{'status':'PASS','six_windows':6,'full_original_candidate_windows':159,'differing_bytes':307,'changed_call_encodings':25,'source_patch':None,'authentic_original_recipe_recovered':False,'builds':0,'target_executions':0,'network_requests':0,'whole_byte_identity':False}
if __name__=='__main__':print(json.dumps(run(),indent=2))
