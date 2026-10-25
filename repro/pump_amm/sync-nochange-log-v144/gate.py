from pathlib import Path
import json,hashlib,struct,sys,re
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'static-tool'));from elf_reader import Elf
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
O=Elf(W/'source/evidence/original/pump_amm/deployed.so');C=Elf(W/'candidate.so');S=Elf(W/'unstripped.so');f=next(f for f in S.funcs if 'write_as_base58' in f['name']);debug=next(f for f in S.funcs if 'bs58..encode..Error$u20$as$u20$core..fmt..Debug' in f['name']);utf=next(f for f in S.funcs if 'core..str..error..Utf8Error$u20$as$u20$core..fmt..Debug' in f['name'])
assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi] and C.pattern(C.lo,C.hi-C.lo)==S.pattern(S.lo,S.hi-S.lo)
assert f['size']==1520 and debug['size']==48 and utf['size']==216
for a,g in [(0x10e380,f),(0x10de40,debug),(0x10de70,utf)]:assert O.normalized[a:a+g['size']]==C.normalized[g['start']:g['start']+g['size']] and O.pattern(a,g['size'])==C.pattern(g['start'],g['size'])
om=dict(zip(O.entries,O.entries[1:]+[O.hi]));sm={g['start']:g for g in S.funcs};calls=[]
for old in O.callsites(0x10e380,1520):
 a=old['target'];n=om[a]-a;p=f['start']+old['offset'];b=C.calls[p];g=sm[b]
 assert n==g['size'] and O.normalized[a:a+n]==C.normalized[b:b+n] and O.pattern(a,n)==C.pattern(b,n)
 calls.append({'offset':old['offset'],'original_call':0x10e380+old['offset'],'candidate_call':p,'original_target':a,'candidate_target':b,'bytes':n,'candidate_name':g['name'],'complete_normalized_equal':True})
def ptr(e,a):return struct.unpack_from('<I',e.b,a+4)[0]|struct.unpack_from('<I',e.b,a+12)[0]<<32
data=[]
for off in [120,736,760,776,1040,1280,1312,1352,1384,1456,1480,1496]:
 a=0x10e380+off;b=f['start']+off
 if O.b[a]!=0x18:continue
 old=ptr(O,a);new=ptr(C,b);data.append({'offset':off,'original_pointer':old,'candidate_pointer':new,'extent_status':'unresolved except separately decoded known operands'})
assert O.b[0x120c0b:0x120c0b+14]==b'BufferTooSmall'
alpha=b'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';oldalpha=ptr(O,0x10e380+120);newalpha=ptr(C,f['start']+120);assert O.b[oldalpha:oldalpha+186]==C.b[newalpha:newalpha+186] and O.b[oldalpha+128:oldalpha+186]==alpha
for e,base,d in [(O,0x10e380,0x10de40),(C,f['start'],debug['start'])]:
 vt=ptr(e,base+760);assert struct.unpack_from('<QQ',e.b,vt+8)==(0,1);assert struct.unpack_from('<II',e.b,vt+24)[1]==d
locations=[]
for e,base,label in [(O,0x10e380,'original'),(C,f['start'],'candidate')]:
 for off in [776,1496]:
  a=ptr(e,base+off);p=struct.unpack_from('<II',e.b,a)[1];n=struct.unpack_from('<Q',e.b,a+8)[0];line,col=struct.unpack_from('<II',e.b,a+16);locations.append({'side':label,'offset':off,'path':e.b[p:p+n].decode(),'line':line,'column':col})
source=J(W/'proposed-source-sha256.json');attempt=J(W/'build-01/build-attempt.json');assert attempt['returncode']==0 and attempt['source_unchanged'] and attempt['source_sha256']==attempt['source_after_sha256']==source
for n,h in source.items():assert H(W/'source'/n)==h,n
assert J(W/'tools-before.json')['tools']==J(W/'tools-after.json')['tools'];assert J(W/'dependency-integrity-before.json')==J(W/'dependency-integrity-after.json')
assert J(W/'lock-delta.json')['all_other_package_records_unchanged']
stack=[line for line in(W/'build-01/build.log').read_text().splitlines()if re.search(r'stack (offset|frame|size)|exceed.*stack|LLVM ERROR|error:',line,re.I)];assert not stack,stack
result={'pass':True,'candidate_sha256':H(W/'candidate.so'),'symbols_sha256':H(W/'unstripped.so'),'renderer':f,'debug':debug,'utf8_debug':utf,'all_three_complete_normalized_bodies_match':True,'renderer_calls':calls,'renderer_data_references':data,'exact_alphabet_bytes':186,'source_locations':locations,'limitations':['Normalized code and immediate-target identity do not establish full recursive data identity.','Truthful source paths/lines differ.','No whole-original ELF equality or historical package-version identity.']}
(W/'renderer-static.json').write_text(json.dumps(result,indent=2)+'\n');(W/'runtime-gate.json').write_text(json.dumps({'pass':True,'returncode':0,'source_input_files':len(source),'vendor_included_explicitly':True,'backend_stack_failures':[],'renderer_proof_sha256':H(W/'renderer-static.json'),'candidate_sha256':H(W/'candidate.so')},indent=2)+'\n')
print(json.dumps({'pass':True,'renderer_bytes':f['size'],'direct_targets':len(calls),'source_input_files':len(source),'source_locations':locations}))
