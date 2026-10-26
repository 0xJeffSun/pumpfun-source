"""Saved completed artifacts only; no compiler/VM/network/target execution."""
from pathlib import Path
import argparse,collections,gzip,hashlib,importlib.util,json,struct
from extract import render
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
EXP='repro/pump/cto-6019-6091-controlled-build';METHOD='repro/pump_fees/framework-matching/elf_reader.py'
STARTS=[441928,1120552,936456,1196168,1223568,1355368,45688,1401320,1401624,1454672,1414920,1410632,1410112]
def analyze(R):
 s=importlib.util.spec_from_file_location('saved_elf',R/METHOD);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
 c=m.Elf(R/EXP/'analysis/candidate.so');u=m.Elf(R/EXP/'analysis/unstripped.so');O=(R/'repro/layered-passes/pass-24/pump-compared-errors-source-proof/original.so').read_bytes();b=c.b;I=lambda pc:struct.unpack_from('<BBhi',b,pc);L=lambda pc:struct.unpack_from('<I',b,pc+4)[0]|struct.unpack_from('<I',b,pc+12)[0]<<32
 assert H(b)=='f2901021fde9354bf2d89098a3e8d8a425b60eda0faa856a2c8aef0d64e3f12f'and len(b)==1583888
 assert H(u.b)=='750456180883c72cc7e94692b75503043357f35222aebad6d67049af8ee2ed99'and len(u.b)==2165160
 assert b[c.lo:c.hi]==u.b[u.lo:u.hi]and c.pattern(c.lo,c.hi-c.lo)==u.pattern(u.lo,u.hi-u.lo)
 result=J(R/EXP/'controller-result.json');assert result['state']=='requires-cache-review'and result['helper_exit']==result['build_sbf_aggregate_exit']==0 and result['source_unchanged']and not result['backend_error_lines']and not result['stack_llvm_diagnostics']and result['private_cache_existing_unchanged'];assert result['tool_sdk_before']==result['tool_sdk_after'];assert result['compiler_child_exit']is result['strip_child_exit']is None
 fs=[]
 for start in STARTS:
  f=next(f for f in u.funcs if f['start']==start);end=start+f['size'];fs.append(dict(**f,end=end,raw_sha256=H(b[start:end]),raw_hex=b[start:end].hex(),relocations=c.pattern(start,f['size']),calls=c.callsites(start,f['size'])))
 for pc,target in [(443864,1454672),(446120,1454672),(446272,1454672),(446336,1196168),(446376,45688),(446480,1355368),(444040,1454672),(444120,1401320),(444152,1454672),(444240,1454672),(446552,1196168),(446592,45688),(446696,1355368),(1401320,1414920),(1414944,1410632),(1414976,1410112),(1121664,936456),(1121992,441928)]:assert c.calls[pc]==target
 for pc,target in [(443888,444752),(443920,446080),(446144,446304),(446296,443928),(443960,447232),(444064,446520),(444176,446520),(444264,446520),(446512,445448),(446728,445448)]:assert pc+8+I(pc)[2]*8==target
 assert I(446088)==(7,1,0,-1888)and I(446104)==(7,2,0,-1920)and I(446112)==(183,3,0,32)
 assert I(446152)==(121,113,168,0)and I(446160)==(121,17,0,0) # actualAccountInfo.key
 assert I(941048)==(123,26,-3784,0)and I(957200)==(121,161,-3784,0)and I(957208)==(123,22,168,0)
 assert b[L(940824):L(940824)+14]==b'sharing_config'
 assert I(444208)==(7,1,0,936)and I(444224)==(7,2,0,40)and I(444232)==(183,3,0,32)
 assert I(443952)==(121,161,-2552,0)and I(442632)==(123,74,-2552,0)
 assert I(446440)==(98,10,-1608,6019)and I(446656)==(98,10,-1608,6091)
 assert struct.unpack_from('<I',b,L(446320))[0]==19 and struct.unpack_from('<I',b,L(446536))[0]==91
 assert I(446408)==I(446624)==(114,10,-1680,2)
 assert I(446416)==(98,10,-1736,107)and I(446632)==(98,10,-1736,108)
 assert I(446424)==I(446640)==(122,10,-1744,16)and b[L(446384):L(446384)+16]==b'src/admin_cto.rs'
 assert I(446432)==I(446648)==(122,10,-1760,0)
 assert I(1355384)==(183,1,0,160)and I(1355392)==(183,2,0,8)and I(1355464)==(183,3,0,160)and I(1355488)==(122,6,0,0)
 # Constant enum selector branch paths and actual Display operand bindings.
 for pc,op,reg,imm,target in [(1196200,101,2,54,1196384),(1196208,101,2,26,1196728),(1196216,101,2,12,1197408),(1197408,101,2,19,1198544),(1197416,101,2,15,1200648),(1200648,101,2,17,1202904),(1202904,21,2,18,1210640),(1196384,101,2,82,1196560),(1196560,101,2,96,1197072),(1196568,101,2,89,1197760),(1197760,101,2,92,1199600),(1197776,21,2,91,1205840)]:
  ins=I(pc);assert ins[0]==op and ins[1]==reg and ins[3]==imm and pc+8+ins[2]*8==target
 assert L(1227048)==1496200 and L(1225968)==1497064
 assert c.callsites(446304,216)==[{'offset':32,'target':1196168},{'offset':72,'target':45688},{'offset':176,'target':1355368}]
 assert c.callsites(446520,216)==[{'offset':32,'target':1196168},{'offset':72,'target':45688},{'offset':176,'target':1355368}]
 # Decode full known Display records, not bounded previews.
 messages=[]
 for enum,at in[(19,1496200),(91,1497064)]:
  ptr,n=struct.unpack_from('<QQ',b,at);p=ptr>>32;msg=b[p:p+n];messages.append(dict(enum=enum,descriptor=at,descriptor_hex=b[at:at+16].hex(),start=p,bytes=n,hex=msg.hex(),text=msg.decode()))
 assert messages[0]['text']=='Invalid creator pubkey'and messages[1]['bytes']==87
 assert messages[1]['text']=='Creator fee is not configurable on a SOL or whitelisted quote; the fee schedule applies'
 # Full emitted name writes, no target execution or allocator emulation.
 name19=bytearray(14);name19[6:14]=L(1221392).to_bytes(8,'little');name19[:8]=L(1221416).to_bytes(8,'little');assert name19==b'InvalidCreator'
 name91=bytearray(33)
 for pc,off in[(1214624,24),(1214648,16),(1214672,8),(1214696,0)]:name91[off:off+8]=L(pc).to_bytes(8,'little')
 name91[32]=I(1214728)[3];assert name91==b'CreatorFeeNotConfigurableForQuote'
 # Host decode of literal data only verifies the represented bytes; it does not
 # assert execution equivalence/closure of the actual runtime decode implementation.
 literal=b[L(444096):L(444096)+43];alphabet=b'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';v=0
 for ch in literal:v=v*58+alphabet.index(ch)
 key=v.to_bytes(32,'big');assert key==O[1793224:1793256]
 inventory=json.loads(gzip.decompress((R/EXP/'analysis/full-before-after-inventory.json.gz').read_bytes()));trans=J(R/EXP/'analysis/all-original-transitions.json');assert len(trans['all1035_original_rows'])==1035 and all(r['before']==r['after']for r in trans['all1035_original_rows'])
 counts=dict(collections.Counter(r['after']['status']for r in trans['all1035_original_rows']))
 # Original6019/6091 source proofs remain external immutable controls.
 return dict(candidate_sha256=H(b),symbols_sha256=H(u.b),terminal_state=result['state'],native_helper_aggregate_exit=result['helper_exit'],direct_compiler_strip_child_status_unobserved=True,functions=fs,names=dict(error6019=name19.decode(),error6091=name91.decode()),messages=messages,origin=dict(candidate_path='src/admin_cto.rs',candidate_path_bytes=16,candidate_lines=[107,108],original_path='programs/pump/src/creator/admin_cto.rs',original_path_bytes=38,original_lines=[312,326],equal=False),wsol_runtime_decode=dict(literal=literal.decode(),decoded_data_hex=key.hex(),original_constant_offset=1793224,call=444120,callee=1401320,chain=[1401320,1414920,1410632],unwrap_error_edge=1414976,unwrap_function=1410112,limit='Complete emitted conversion chain retained; additional decode/panic work compared with original constant equality, no transitive identity claim'),global_compare=dict(candidate_global_box=936,candidate_curve_box=40,bytes=32,owning_original_field_proof='pump-error-static-deserializers/c7bee714'),inventory=dict(all_original_rows=1035,all_status_cardinalities_unchanged=True,status_counts=counts,before_summary=inventory['before']['summary'],after_summary=inventory['after']['summary']),scope='Emitted bounded guard/ownedconstructor review, not original fullbody/call/data/ABI/runtime identity;6092 unchanged and unresolved')
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);r=a.parse_args();d=analyze(r.repo.resolve());(P/'proof.json').write_text(json.dumps(d,indent=2)+'\n')
 for f in d['functions']:(P/(str(f['start'])+'.asm')).write_text(render((r.repo/EXP/'analysis/candidate.so').read_bytes(),f['start'],f['end']))
