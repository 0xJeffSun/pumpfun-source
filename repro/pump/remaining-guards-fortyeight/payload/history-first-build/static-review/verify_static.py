"""Full retained windows and bounded emitted guards; no target execution."""
from pathlib import Path
import sys,json,gzip,hashlib,struct
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;W=P.parent;A=W/'analysis';sys.path.insert(0,str(P/'method'))
from elf_reader import Elf
import metadata
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text());ins=lambda e,pc:struct.unpack_from('<BBhi',e.b,pc)
if '--check' in sys.argv:
 for n,h in J(P/'manifest.json').items():assert H(P/n)==h,n
for n,h in J(P/'input-bindings.json')['build_relative_paths'].items():assert H(W/n)==h,n
o=Elf(A/'static-inputs/original.so');b=Elf(A/'static-inputs/candidate.so');c=Elf(A/'candidate.so');s=Elf(A/'unstripped.so')
assert H(A/'candidate.so')=='f2901021fde9354bf2d89098a3e8d8a425b60eda0faa856a2c8aef0d64e3f12f'
assert H(A/'unstripped.so')=='750456180883c72cc7e94692b75503043357f35222aebad6d67049af8ee2ed99'
assert H(A/'static-inputs/candidate.so')=='e9494060904aad25f465efd93af9dd0bb09a5ded9f321747c789cbf0310bc6c5'
assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi] and c.relocations==s.relocations
assert J(W/'source-before.json')==J(W/'source-after.json') and len(J(W/'source-after.json'))==37
before=J(W/'preflight.json')['source37'];after=J(W/'source-after.json');assert [n for n in before if before[n]!=after[n]]==['programs/pump/src/admin_cto.rs'];assert H(P/'source-before.rs')==before['programs/pump/src/admin_cto.rs'] and H(P/'source-after.rs')==after['programs/pump/src/admin_cto.rs']
for n in ['build-exit.json','controller-exit.json','inventory-exit.json']:assert J(W/n)['returncode']==0
assert J(W/'stack-backend-gate.json')=={'passed':True,'matches':[]}
def call(pc,target):assert c.calls[pc]==target,(pc,target)
def raw(pc,x):assert c.b[pc:pc+len(bytes.fromhex(x))]==bytes.fromhex(x),pc
# Source argument provenance: incomingr4 feeOption discriminant, normalized holder saved before target test.
assert ins(c,442632)==(0x7b,0x4a,-2552,0) and ins(c,443720)==(0x7b,0x6a,-2576,0)
assert ins(c,443024)==(0x57,1,0,1) and ins(c,443032)==(0x15,1,28,0)
assert ins(c,443056)==(0x15,2,82,0) and ins(c,443272)==(0x55,1,53,0)
# Both holder and nonholder target routes reach zero check first, holder skips6019; nonholder comparesholder PDA then sharing key.
call(443864,1454672);assert ins(c,443888)==(0x15,0,107,0)
assert ins(c,443904)==(0x57,1,0,1) and ins(c,443912)==(0x55,1,1,0) and ins(c,443920)==(5,0,269,0)
assert ins(c,446088)==(7,1,0,-1888) and ins(c,446104)==(7,2,0,-1920);call(446120,1454672)
assert ins(c,446144)==(0x15,0,19,0)
assert ins(c,446152)==(0x79,0x71,168,0) and ins(c,446160)==(0x79,0x11,0,0)
call(446272,1454672);assert ins(c,446296)==(0x55,0,-297,0)
# The saved holderPDA originates find_program_address and is copied to -1920..-1896.
call(442928,1401624)
for pc,slot in [(442944,-1896),(442960,-1904),(442976,-1912),(442992,-1920)]:assert ins(c,pc)[2]==slot
assert c.b[1467597:1467611]==b'holder-rewards'
# shared feeSome gate; None skips allquote comparisons. default->WSOL->whitelist exact order.
assert ins(c,443952)==(0x79,0xa1,-2552,0) and ins(c,443960)==(0x15,1,408,0)
assert ins(c,444000)==(7,9,0,40);call(444040,1454672);assert ins(c,444064)==(0x15,0,306,0)
call(444120,1401320);call(444152,1454672);assert ins(c,444176)==(0x15,0,292,0)
assert ins(c,444208)==(7,1,0,936) and ins(c,444224)==(7,2,0,40);call(444240,1454672);assert ins(c,444264)==(0x15,0,281,0)
assert c.b[1467953:1467996]==b'So11111111111111111111111111111111111111112'
v=0
for ch in c.b[1467953:1467996].decode():v=v*58+'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'.index(ch)
assert v.to_bytes(32,'big')==o.b[1793224:1793256]
call(1401320,1414920);call(1414944,1410632);call(1414976,1410112)
# Plain owned6019/6091: correct variant, name/ToString, comparedNone, sourceNone account name, return without decorator.
for code,ordinal,literal,name,to_string,tag,linepc,line,codepc,convert,ret in [(6019,19,1465156,446336,446376,446408,446416,107,446440,446480,446512),(6091,91,1465112,446552,446592,446624,446632,108,446656,446696,446728)]:
 assert struct.unpack_from('<I',c.b,literal)[0]==ordinal
 call(name,1196168);call(to_string,45688);call(convert,1355368)
 assert ins(c,tag)==(0x72,10,-1680,2) and ins(c,linepc)==(0x62,10,-1736,line) and ins(c,codepc)==(0x62,10,-1608,code)
 assert ins(c,ret)[0]==5 and ret+8+8*ins(c,ret)[2]==445448
 assert not any(t==1356632 for pc,t in c.calls.items() if name<=pc<=ret)
assert c.b[1466992:1467008]==b'src/admin_cto.rs'
# Previous6030 compared(target,zero) preserved.
assert ins(c,445824)==(0x62,10,-1608,6030) and ins(c,445840)==(0x62,10,-1736,107)
call(445896,1355368);call(446048,1356632)
for load,src,store,dst in [(445968,-1888,445976,-1760),(445952,-1880,445960,-1752),(445936,-1872,445944,-1744),(445920,-1864,445928,-1736)]:assert ins(c,load)==(0x79,0xa1,src,0) and ins(c,store)==(0x7b,0x1a,dst,0)
for pc,dst in [(445984,-1728),(445992,-1720),(446000,-1712),(446008,-1704)]:assert ins(c,pc)==(0x7a,10,dst,0)
# Previous2006 actual holder account key first,derived PDA second; natural coordinates unchanged.
assert ins(c,454776)==(0x62,10,-1608,2006) and ins(c,454752)==(0x62,10,-1736,118)
call(454816,1355368);call(455016,1356632)
assert ins(c,454840)==(0x79,0x71,96,0) and ins(c,454848)==(0x79,0x11,0,0)
for pc,off in [(454856,0),(454864,8),(454872,16),(454880,24)]:assert ins(c,pc)[2]==off
for load,slot,store,dst in [(454888,-48,454896,-1728),(454904,-40,454912,-1720),(454920,-32,454928,-1712),(454936,-24,454944,-1704)]:assert ins(c,load)==(0x79,0xa7,slot,0) and ins(c,store)==(0x7b,0x7a,dst,0)
for pc,dst in [(454976,-1760),(454968,-1752),(454960,-1744),(454952,-1736)]:assert ins(c,pc)[2]==dst
# Both6092 sites remain numericProgramError with same borrowed header role; no claim fulloriginal ownership restoration.
assert ins(c,449040)==(0x79,0x78,64,0) and ins(c,449128)==(0x71,0x81,41,0)
assert ins(c,456552)==(0x79,0x72,64,0) and ins(c,456560)==(0x71,0x21,41,0)
assert ins(c,449168)[3]==ins(c,456600)[3]==6092;call(449208,1355504);call(456640,1355504)
# Complete unchanged parser/wrapper and enum/converter/decorator helpers under same normalization+relocation method.
pairs=[]
for role,oa,ca,size in [('AnchorError_from',1686320,1355368,136),('with_pubkeys',1687992,1356632,520),('PumpError_name',1405824,1196168,26896),('PumpError_Display',1433224,1223568,3616),('memcmp',1783416,1454672,64),('find_program_address',1736376,1401624,312)]:
 assert o.normalized[oa:oa+size]==c.normalized[ca:ca+size] and o.pattern(oa,size)==c.pattern(ca,size),role
 pairs.append({'role':role,'original':[oa,oa+size],'candidate':[ca,ca+size],'full_normalized_and_relocation_pattern_equal':True})
for ba,ca,size in [(936472,936456,21088),(1120568,1120552,2128)]:assert b.normalized[ba:ba+size]==c.normalized[ca:ca+size] and b.pattern(ba,size)==c.pattern(ca,size)
errors=[]
for code in [6019,6091,6092,6030]:
 name=metadata.format_selector(c,1227184,code-6000,'debug');message=metadata.format_selector(c,1223568,code-6000,'display');assert name['text']==metadata.format_selector(o,1436840,code-6000,'debug')['text'] and message['text']==metadata.format_selector(o,1433224,code-6000,'display')['text'];errors.append({'code':code,'name':name,'message':message})
windows={}
for label,e,a,z in [('original_app',o,141840,169240),('before_app',b,441928,469744),('after_app',c,441928,469728),('original_parser',o,746872,770312),('before_parser',b,936472,957560),('after_parser',c,936456,957544),('original_wrapper',o,1235456,1237664),('after_wrapper',c,1120552,1122680),('pubkey_from_str_const',c,1401320,1401336),('decode_32_const',c,1414920,1415072),('decode_const',c,1410632,1414920),('unwrap_const',c,1410112,1410632)]:windows[label]=metadata.window(e,a,z)
for pair in pairs:
 for side,e in [('original',o),('candidate',c)]:a,z=pair[side];windows[side+'_'+pair['role']]=metadata.window(e,a,z)
result={'passed':True,'candidate':H(A/'candidate.so'),'symbols':H(A/'unstripped.so'),'6019':'nonholder target vs holderPDA first,sharing_config second; owned plainInvalidCreator','6091':'both holder/nonholder join same feeSome gate; default then decodedWSOL thenwhitelist; ownedplain91','preserved':[6030,2006,6092],'whole_original_identity':False,'runtime_executions':0,'helpers':pairs,'errors':errors,'limits':['WSOL macro emitted from_str_const/decode_const rather than directliteral; fixedvalue independently validated,not recursive allcallee equivalence','current borrowedUncheckedAccount and repeated6092 remain unresolved as separatelysealed01bd/8278','sourcecoordinates107/108/118 are natural current coordinates,not original312/326/etc']}
payload=(json.dumps(windows,separators=(',',':'))+'\n').encode()
if '--check'in sys.argv:assert J(P/'result.json')==result and gzip.decompress((P/'full-admitted-windows.json.gz').read_bytes())==payload
else:(P/'result.json').write_text(json.dumps(result,indent=2)+'\n');(P/'full-admitted-windows.json.gz').write_bytes(gzip.compress(payload,mtime=0))
print(json.dumps({k:result[k]for k in ['passed','candidate','symbols','preserved','runtime_executions']}))
