#!/usr/bin/env python3
"""Read-only static evidence verifier; never executes SBF, builds, or probes."""
from pathlib import Path
import hashlib,json,re,struct,subprocess,sys
R=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p): return (R/p).read_bytes()
def obj(p): return json.loads(read(p))
def need(v,s):
 if not v: raise SystemExit('FAIL: '+s)
m=obj('manifest-sha256.json')
need(set(m)=={str(p.relative_to(R)) for p in R.rglob('*') if p.is_file() and p!=R/'manifest-sha256.json'},'sealed file set')
for p,h in m.items():need(sha(read(p))==h,p)
for p in obj('provenance.json'):
 if 'copy' not in p:continue # full assembly provenance recorded; only bounded excerpts are copied
 b=read(p['copy']);need(len(b)==p['size'] and sha(b)==p['sha256'],'full source '+p['path'])
 need(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==p['git_blob'],'Git blob '+p['path'])
for prior in obj('prior-packages.json'):
 need(sha(read(prior['copy']+'/manifest-sha256.json'))==prior['seal_sha256'],'prior seal '+prior['name'])
 q=subprocess.run([sys.executable,str(R/prior['copy']/'verify.py')],capture_output=True,text=True)
 need(q.returncode==0,'prior verifier '+prior['name']+': '+q.stderr+q.stdout)
b=read('inputs/pump_create_nested/inputs/original-pump.so');ins={};rows=0
for w in obj('windows.json'):
 data=read(w['copy']);need(sha(data)==w['sha256'],'window text hash')
 need(sha(b[w['start']:w['end_exclusive']])==w['binary_sha256'],'window byte hash')
 ls=data.decode().splitlines();need(len(ls)==w['line_end']-w['line_start']+1,'line span')
 cursor=w['start']
 for l in ls:
  x=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)',l);need(x is not None,'assembly syntax')
  a=int(x[1],16);v=bytes.fromhex(x[2]);need(a==cursor and b[a:a+len(v)]==v,'instruction bytes/range '+hex(a));ins[a]=v;cursor+=len(v);rows+=1
 need(cursor==w['end_exclusive'],'window end')
for e in obj('call-edges.json'):
 a=e['site'];v=ins[a];need(v.hex()==e['bytes'] and v[:2]==b'\x85\x10','call opcode')
 need(a+8+struct.unpack_from('<i',v,4)[0]*8==e['target'],'call edge')
# All non-call branches in the complete pricing caller windows stay within that window.
for w in obj('windows.json'):
 if w['name'] not in ['initial','final','constant-product','variant','fold','migration-sub-error','migration-add-error']:continue
 for a,v in ins.items():
  if not w['start']<=a<w['end_exclusive']:continue
  if v[0]&7==5 and v[0] not in [0x85,0x95]:
   t=a+8+struct.unpack_from('<h',v,2)[0]*8
   need(w['start']<=t<w['end_exclusive'] and t in ins,'pricing branch closure '+hex(a))
res=obj('result.json');idl=obj('inputs/pump_nested_types/inputs/pump-idl.json')
fs=next(t for t in idl['types'] if t['name']=='Global')['type']['fields']
def size(t):
 if isinstance(t,dict):return size(t['array'][0])*t['array'][1]
 return {'bool':1,'u8':1,'u64':8,'pubkey':32}[t]
o=8;offsets={}
for f in fs:offsets[f['name']]=o;o+=size(f['type'])
def operands(a,op,dst,src,off):
 v=ins[a];need(v[0]==op and v[1]==dst+(src<<4) and struct.unpack_from('<h',v,2)[0]==off,'dataflow '+hex(a))
for f in res['global_fields']:
 need(offsets[f['field']]==f['serialized'],'Global serialized identity')
 # initial VT stays in r4; all others load into r3. Fee cursor comes from r2.
 if f['field']=='initial_virtual_token_reserves':operands(f['load'],0x79,4,1,f['serialized']);src=4
 elif f['field']=='pool_migration_fee':operands(f['load'],0x79,3,2,0);src=3
 else:operands(f['load'],0x79,3,1,f['serialized']);src=3
 operands(f['save'],0x7b,10,src,f['stack'])
 operands(f['reload'],0x79,1,10,f['stack']);operands(f['store'],0x7b,6,1,f['decoded'])
need(b[0x15fdf8+4:0x15fdf8+8]+b[0x15fdf8+12:0x15fdf8+16]==bytes(next(t['discriminator'] for t in idl['accounts'] if t['name']=='Global')),'Global discriminator')
for e in res['numeric_error_sites']:
 v=ins[e['site']];need(v[0]==0x62 and struct.unpack_from('<i',v,4)[0]==e['code'],'numeric error')
 need(any(x['code']==e['code'] and x['name']==res['errors'][str(e['code'])] for x in idl['errors']),'IDL error identity')
# Prove short Pool route: exact instructions ensure no pointer copy/escape or tail load.
expected={0x62aa0:'bf40000000000000',0x62aa8:'bf37000000000000',0x62ab0:'7926080000000000',0x62ab8:'7925000000000000',0x62ac0:'5505080000000000',0x62ac8:'7924180000000000',0x62ad0:'7923100000000000',0x62ad8:'7b7a00f000000000',0x62ae0:'7b0a08f000000000',0x62ae8:'bfa5000000000000',0x62af0:'bf62000000000000',0x62af8:'85100000cefeffff',0x62b00:'05001e0000000000',0x62bf8:'9500000000000000'}
for a,h in expected.items():need(ins[a].hex()==h,'Pool route '+hex(a))
need(0x62b00+8+struct.unpack_from('<h',ins[0x62b00],2)[0]*8==0x62bf8,'Pool direct return')
need(0x62af8+8+struct.unpack_from('<i',ins[0x62af8],4)[0]*8==0x62170,'Pool scalar callee')
frame_reads=[]
for a,v in ins.items():
 if 0x62170<=a<0x62aa0 and v[0] in [0x61,0x69,0x71,0x79] and v[1]>>4==5:frame_reads.append((a,struct.unpack_from('<h',v,2)[0]))
need(frame_reads==[(0x622b0,-0xff8),(0x622b8,-0x1000)],'CP reads only amount pair via caller frame')
need(res['variants']['pool']['inactive_word_offsets']==[32,40,48],'inactive tail ledger')
print(json.dumps({'status':'PASS','sealed_files':len(m),'assembly_rows_checked':rows,'direct_edges_checked':len(obj('call-edges.json')),'prior_packages_verified':2,'Global_field_bindings_checked':4,'pool_inactive_tail_bytes':[32,56],'scope':'static integrity and selected dataflow; division invariant and complete handler semantics remain unclosed'},indent=2))
