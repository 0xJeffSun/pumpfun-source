"""Actual in-memory corruptions against the byte and saved-record checks."""
import copy,gzip,importlib.util,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('verify_composition',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
def rejects(fn):
 try:fn()
 except (AssertionError,KeyError,ValueError,BaseException)as e:return type(e).__name__
 raise AssertionError('corruption was admitted')
a=gzip.decompress(v.read('reference/original.so.gz'));b=gzip.decompress(v.read('builds/combined/unstripped.so.gz'));inv=v.js('inventory.json');claims=v.js('claims.json');source=v.unpack('source.tar.gz');base=v.unpack('baseline-source.tar.gz');roots=v.check_roots(a,b,inv);ss=v.M.sections(b);text=ss['.text'];addr=lambda x:x-text['addr']+text['offset'];root=roots[1];off=addr(root['candidate_start']);out={}
# Mutate an actual arithmetic immediate and an actual branch displacement.
for label,field,match in [('scalar',4,lambda op:op in [0x07,0x17,0x27,0x37,0x47,0x57,0x67,0x77,0xb7]),('branch',2,lambda op:op&7==5 and op not in [0x85,0x95])]:
 raw=v.M.body(b,ss,root['candidate_start'],root['bytes']);i=0
 while i<len(raw):
  op=raw[i]
  if match(op):break
  i+=16 if op==0x18 else 8
 assert i<len(raw);mut=bytearray(b);mut[off+i+field]^=1;out[label]=dict(offset=i,result=rejects(lambda:v.check_roots(a,bytes(mut),inv)))
# A direct-call immediate is normalized, so only actual target binding rejects this.
e=root['immediate_edges'][0];wrong=next(f['start']for f in v.M.functions(b)if f['bytes']!=e['bytes']and f['start']!=e['candidate_target']);mut=bytearray(b);site=root['candidate_start']+e['offset'];struct.pack_into('<i',mut,addr(site)+4,(wrong-site-8)//8);out['wrong_callee']=rejects(lambda:v.check_roots(a,bytes(mut),inv))
mutsource=dict(source);n='programs/pump/src/lib.rs';mutsource[n]=mutsource[n]+b'\n';out['source']=rejects(lambda:v.source_check(mutsource,base,claims))
binding=json.loads(gzip.decompress(v.read('sdk-archive-binding.json.gz')));sdk=v.js('builds/combined/launch.json')['sdk_inputs'];binding['resolved_inputs'][next(iter(sdk))]='0'*64;out['sdk_binding']=rejects(lambda:v.check_sdk(binding,sdk))
records=v.unpack('runtime/records.tar.gz');inputs=v.unpack('runtime/inputs.tar.gz')
mutrecords=dict(records);j=json.loads(records['authority-observer.json']);j['records'][0]['signature']='false-signature';mutrecords['authority-observer.json']=json.dumps(j).encode();out['signature']=rejects(lambda:v.check_runtime(mutrecords,inputs,claims))
mutrecords=dict(records);j=json.loads(gzip.decompress(records['authority.json.gz']));j['cases'][0]['candidate']['data_hex']='corrupt';mutrecords['authority.json.gz']=gzip.compress(json.dumps(j).encode());out['saved_comparison']=rejects(lambda:v.check_runtime(mutrecords,inputs,claims))
# Referenced data is outside this bounded code proof. Whole-file hashes still change.
r=ss['.rodata'];mut=bytearray(b);mut[r['offset']]^=1;assert v.sha(mut)!=v.sha(b);assert v.check_roots(a,bytes(mut),inv)==roots;out['outside_code_positive']=True
print(json.dumps(out,sort_keys=True))
