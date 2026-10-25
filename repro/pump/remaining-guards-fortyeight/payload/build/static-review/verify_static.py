"""Static retained full windows only. Never executes a target or dependency runtime."""
from pathlib import Path
import sys,json,gzip,hashlib,struct
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;W=P.parent;A=W/'analysis';sys.path.insert(0,str(P/'method'))
from elf_reader import Elf
import metadata
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text());ins=lambda e,pc:struct.unpack_from('<BBhi',e.b,pc)
if '--check'in sys.argv:
 for n,h in J(P/'manifest.json').items():assert H(P/n)==h,n
for n,h in J(P/'input-bindings.json')['build_relative_paths'].items():assert H(W/n)==h,n
o=Elf(A/'static-inputs/original.so');b=Elf(A/'static-inputs/candidate.so');c=Elf(A/'candidate.so');s=Elf(A/'unstripped.so')
assert H(A/'candidate.so')=='71ec4d8a646eefc82ba177afbc3d08552deadd65cf2f80ec280862eb768d059c'
assert H(A/'unstripped.so')=='6edbf4dedf535dd0dec1199ab87a97d6d83b60fb2c1c3a5791feffc953a33cda'
assert H(A/'static-inputs/candidate.so')=='f2901021fde9354bf2d89098a3e8d8a425b60eda0faa856a2c8aef0d64e3f12f'
assert H(A/'static-inputs/original.so')=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]and c.relocations==s.relocations
before=J(W/'preflight.json')['source37'];after=J(W/'source-after.json');assert after==J(W/'source-before.json')and len(after)==37 and [n for n in before if before[n]!=after[n]]==['programs/pump/src/admin_cto.rs']
assert H(P/'source-before.rs')==before['programs/pump/src/admin_cto.rs']and H(P/'source-after.rs')==after['programs/pump/src/admin_cto.rs']
old=(P/'source-before.rs').read_text();new=(P/'source-after.rs').read_text();token='So11111111111111111111111111111111111111112';needle='||a.bonding_curve.quote_mint==anchor_lang::solana_program::pubkey!("'+token+'")';const='||a.bonding_curve.quote_mint==anchor_spl::token::spl_token::native_mint::ID';early='if wallet&&!a.current_creator.is_writable{return Err(err(6092));}let wallet_frozen';typed='if wallet&&!a.current_creator.is_writable{return Err(error!(PumpError::CtoCreatorAccountNotWritable));}let wallet_frozen';assert old.count(needle)==old.count(early)==1 and new==old.replace(needle,const).replace(early,typed) and new.count('return Err(err(6092));')==1
receipt=J(P/'pump25-corrective-build-runner-exit.json');assert receipt['returncode']==0 and receipt['actual_terminal_completion_observed'] and receipt['standalone_backend_gate_returncode']==0
assert H(P/'root-controller.stdout')==receipt['stdout_sha256'] and H(P/'root-controller.stderr')==receipt['stderr_sha256'] and H(P/'root-backend.stdout')==receipt['backend_gate_stdout_sha256']
for n in ['build-exit.json','controller-exit.json','inventory-exit.json']:assert J(W/n)['returncode']==0
assert J(W/'stack-backend-gate.json')=={'passed':True,'matches':[]}
def call(pc,target):assert c.calls[pc]==target,(pc,target)
def branch(pc,op,target):assert ins(c,pc)[0]==op and pc+8+8*ins(c,pc)[2]==target,(pc,target)
# Shared holder/nonholder target path and feeSome argument role unchanged.
assert ins(c,442632)==(0x7b,0x4a,-2552,0)and ins(c,443720)==(0x7b,0x6a,-2576,0)
assert ins(c,443024)==(0x57,1,0,1);branch(443032,0x15,443264);branch(443056,0x15,443720);branch(443272,0x55,443704)
call(443864,1454728);branch(443888,0x15,444664);assert ins(c,443904)==(0x57,1,0,1);branch(443912,0x55,443928);branch(443920,5,445992)
#6019 nonholder target -1888 vs findPDA -1920 first, namedsharingconfigkey second.
call(442928,1401680)
for pc,slot in [(442944,-1896),(442960,-1904),(442976,-1912),(442992,-1920)]:assert ins(c,pc)[2]==slot
assert ins(c,446000)==(7,1,0,-1888)and ins(c,446016)==(7,2,0,-1920);call(446032,1454728);branch(446056,0x15,446216)
assert ins(c,446064)==(0x79,0x71,168,0)and ins(c,446072)==(0x79,0x11,0,0);call(446184,1454728);branch(446208,0x55,443928)
#6091 sharedgate: feeNone bypasses quotechain, Some evaluates default, directconstantWSOL, Globalwhitelist.
assert ins(c,443944)==(0x79,0xa1,-2552,0);branch(443960,0x15,447176)
assert ins(c,444008)==(7,9,0,40);call(444048,1454728);branch(444072,0x15,444216)
assert ins(c,444088)==(0x18,2,0,1464640)and ins(c,444104)==(0xb7,3,0,32);call(444112,1454728);branch(444136,0x15,444216)
assert c.b[1464640:1464672]==o.b[1793224:1793256]==bytes.fromhex('069b8857feab8184fb687f634618c035dac439dc1aeb3b5598a0f00000000001')
assert ins(c,444144)==(0x79,0x76,8,0)and ins(c,444160)==(7,1,0,936);call(444184,1454728);branch(444208,0x55,446432)
quote_calls=[(pc,t)for pc,t in c.calls.items()if 443928<=pc<444216];assert quote_calls==[(444048,1454728),(444112,1454728),(444184,1454728)]
assert not any(c.b[pc]==0x8d for pc in range(443928,444216,8))
# Three plain ownedconstructor paths have exactname/messageordinal, comparedNone and naturalcoordinates.
owned=[]
for code,ordinal,literal,name,display,tag,linepc,line,codepc,convert,ret,target in [(6019,19,1465216,446248,446288,446320,446328,107,446352,446392,446424,445360),(6091,91,1465172,444248,444288,444320,444328,108,444352,444392,444424,445360),(6092,92,1465072,449120,449160,449192,449200,115,449224,449264,449288,447384)]:
 assert struct.unpack_from('<I',c.b,literal)[0]==ordinal
 call(name,1196224);call(display,45688);call(convert,1355424)
 assert ins(c,tag)==(0x72,10,-1680,2)and ins(c,linepc)==(0x62,10,-1736,line)and ins(c,codepc)==(0x62,10,-1608,code)
 branch(ret,5,target);assert not any(t==1356688 for pc,t in c.calls.items()if name<=pc<=ret)
 owned.append({'code':code,'ordinal':ordinal,'name_call':name,'message_call':display,'source_line':line,'converter_call':convert,'return_branch':ret,'return_target':target,'compared':'None','account_name_decorator':False})
assert c.b[1467048:1467064]==b'src/admin_cto.rs'
# Earlywalletdomain and evaluationorder remains currentowner-before-executable; keynonzero/ownerSystem/nonexec/readonly.
call(448944,1454728);branch(448976,0x15,452872)
assert ins(c,448984)==(0x79,0x78,64,0)and ins(c,448992)==(0x79,0x81,24,0);call(449024,1454728);branch(449048,0x55,452872)
assert c.b[1464384:1464416]==bytes(32)and ins(c,449056)==(0x71,0x81,42,0);branch(449064,0x55,452872)
assert ins(c,449072)==(0x71,0x81,41,0);branch(449080,0x55,452552)
# ExistingcurveAccountInfo twoRc cleanup occurs before returning newearlyowned92, unchanged fromf290.
for pc in range(447384,447528,8):
 oldpc=pc+56;op,r,off,im=ins(c,pc);bop,br,boff,bim=ins(b,oldpc);assert(op,r,im)==(bop,br,bim)
 if op&7 in(5,6)and op not in(0x85,0x95):
  target=pc+8+off*8;oldtarget=oldpc+8+boff*8;assert oldtarget-target==(88 if target==445360 else 56)
 else:assert off==boff
assert not any(pc in c.calls for pc in range(447384,447528,8));branch(447520,5,445360)
# Exactly one late numeric6092 remains with same borrowedheaderreload/ProgramErrorconverter.
assert ins(c,456608)==(0x79,0x72,64,0)and ins(c,456616)==(0x71,0x21,41,0);branch(456624,0x55,456728)
assert ins(c,456656)==(0x62,10,-1752,6092);call(456696,1355560);branch(456720,5,447384)
assert [(pc,off)for pc in range(441928,469784,8)for op,r,off,im in [ins(c,pc)]if op==0x62 and im==6092]==[(449224,-1608),(456656,-1752)]
#6030 tuple targetfirst/zerosecond and2006 actualkeyfirst/derivedPDAsecond preserved.
assert ins(c,445736)==(0x62,10,-1608,6030)and ins(c,445752)==(0x62,10,-1736,107);call(445808,1355424);call(445960,1356688)
for load,slot,store,dst in [(445880,-1888,445888,-1760),(445864,-1880,445872,-1752),(445848,-1872,445856,-1744),(445832,-1864,445840,-1736)]:assert ins(c,load)==(0x79,0xa1,slot,0)and ins(c,store)==(0x7b,0x1a,dst,0)
for pc,dst in [(445896,-1728),(445904,-1720),(445912,-1712),(445920,-1704)]:assert ins(c,pc)==(0x7a,10,dst,0)
assert ins(c,454832)==(0x62,10,-1608,2006)and ins(c,454808)==(0x62,10,-1736,118);call(454872,1355424);call(455072,1356688)
assert ins(c,454896)==(0x79,0x71,96,0)and ins(c,454904)==(0x79,0x11,0,0)
for pc,off in [(454912,0),(454920,8),(454928,16),(454936,24)]:assert ins(c,pc)[2]==off
for load,slot,store,dst in [(454944,-48,454952,-1728),(454960,-40,454968,-1720),(454976,-32,454984,-1712),(454992,-24,455000,-1704)]:assert ins(c,load)==(0x79,0xa7,slot,0)and ins(c,store)==(0x7b,0x7a,dst,0)
for pc,dst in [(455032,-1760),(455024,-1752),(455016,-1744),(455008,-1736)]:assert ins(c,pc)[2]==dst
pairs=[]
for role,oa,ca,size in [('AnchorError_from',1686320,1355424,136),('with_pubkeys',1687992,1356688,520),('PumpError_name',1405824,1196224,26896),('PumpError_Display',1433224,1223624,3616),('memcmp',1783416,1454728,64),('find_program_address',1736376,1401680,312)]:
 assert o.normalized[oa:oa+size]==c.normalized[ca:ca+size]and o.pattern(oa,size)==c.pattern(ca,size),role
 pairs.append({'role':role,'original':[oa,oa+size],'candidate':[ca,ca+size],'full_normalized_and_relocation_pattern_equal':True})
for ba,ca,size in [(936456,936512,21088),(1120552,1120608,2128)]:assert b.normalized[ba:ba+size]==c.normalized[ca:ca+size]and b.pattern(ba,size)==c.pattern(ca,size)
errors=[]
for code in [6019,6091,6092,6030]:
 n=metadata.format_selector(c,1227240,code-6000,'debug');m=metadata.format_selector(c,1223624,code-6000,'display');assert n['text']==metadata.format_selector(o,1436840,code-6000,'debug')['text']and m['text']==metadata.format_selector(o,1433224,code-6000,'display')['text'];errors.append({'code':code,'name':n,'message':m})
windows={}
for label,e,a,z in [('original_app',o,141840,169240),('f290_app',b,441928,469728),('corrective_app',c,441928,469784),('original_parser',o,746872,770312),('f290_parser',b,936456,957544),('corrective_parser',c,936512,957600),('original_wrapper',o,1235456,1237664),('corrective_wrapper',c,1120608,1122736),('curveAccountInfo_cleanup',c,447384,447528)]:windows[label]=metadata.window(e,a,z)
for pair in pairs:
 for side,e in [('original',o),('candidate',c)]:a,z=pair[side];windows[side+'_'+pair['role']]=metadata.window(e,a,z)
result={'passed':True,'candidate':H(A/'candidate.so'),'symbols':H(A/'unstripped.so'),'WSOL_guard':'direct32byteconstant equaloriginal;only3memcmpcalls;no runtimebase58','owned_plain_errors':owned,'late6092_numeric_only':True,'preserved_compared_pubkeys':[6030,2006],'parser_wrapper_full_normalized_and_relocation_equal_to_f290':True,'source_account_types_and_order_unchanged':True,'helpers':pairs,'errors':errors,'whole_original_identity':False,'runtime_executions':0,'coverage_note':'no newruntime; prior6030application1, application2006zero; targeted6019/6091/6092casecoverage notyetmeasured for thiscandidate','limits':['originalownedheader/currentborrowedheader remain different','original executablebeforeowner/current ownerbeforeexecutable unchanged','immutableheaderdomain assumption retained;transitive CPIheaderretention notproven','later parserconstraintfailurecleanup remainsunresolved;fiveacquisitionfailureprefixes separatelyproved','f290runtimebase58history and unused95b6control preserved; noflag/layout trial']}
payload=(json.dumps(windows,separators=(',',':'))+'\n').encode()
if '--check'in sys.argv:assert J(P/'result.json')==result and gzip.decompress((P/'full-admitted-windows.json.gz').read_bytes())==payload
else:(P/'result.json').write_text(json.dumps(result,indent=2)+'\n');(P/'full-admitted-windows.json.gz').write_bytes(gzip.compress(payload,mtime=0))
print(json.dumps({k:result[k]for k in ['passed','candidate','symbols','WSOL_guard','late6092_numeric_only','runtime_executions']}))
