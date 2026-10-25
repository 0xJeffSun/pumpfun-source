"""Saved bytes only: exact touched construction, tuple, helpers and ledger checks."""
from pathlib import Path
import sys,json,gzip,hashlib,struct,importlib.util
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;W=P.parent;A=W/'analysis';sys.path.insert(0,str(P/'method'))
from elf_reader import Elf
spec=importlib.util.spec_from_file_location('selected_metadata',P/'method/metadata.py');meta=importlib.util.module_from_spec(spec);spec.loader.exec_module(meta)
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
manifest=J(P/'manifest.json')
assert set(manifest)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in manifest.items():assert H(P/n)==h,n
for n,h in J(P/'input-bindings.json')['build_relative_paths'].items():assert H(W/n)==h,n
baseline=J(W/'preflight.json')['source37'];proposed=J(W/'source-before.json')
assert [n for n in baseline if baseline[n]!=proposed[n]]==['programs/pump/src/admin_cto.rs']
o=Elf(A/'static-inputs/original.so');c=Elf(A/'candidate.so');s=Elf(A/'unstripped.so');b=Elf(A/'static-inputs/candidate.so');bs=Elf(A/'static-inputs/symbols.so')
assert H(A/'candidate.so')=='e9494060904aad25f465efd93af9dd0bb09a5ded9f321747c789cbf0310bc6c5'
assert H(A/'unstripped.so')=='04641cb62e11e7abfc1db824374861a88fb067484b5c6c271ed0e6283b975a37'
assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]and c.relocations==s.relocations
assert J(W/'source-before.json')==J(W/'source-after.json')and len(J(W/'source-after.json'))==37
assert J(W/'build-exit.json')['returncode']==J(W/'controller-exit.json')['returncode']==0
assert J(W/'stack-backend-gate.json')=={'passed':True,'matches':[]}
def ins(e,pc):return struct.unpack_from('<BBhi',e.b,pc)
def call(pc,t):assert c.calls[pc]==t,(pc,t)
def raw(pc,v):assert c.b[pc:pc+len(bytes.fromhex(v))].hex()==v,pc
for pc,t in [(443896,1454688),(444856,1196184),(445000,1223584),(445968,1355384),(446120,1356648),(453792,1401640),(453992,1454688),(454560,1365344),(454600,45200),(454704,1355384),(454912,1356648)]:call(pc,t)
assert ins(c,443920)==(0x15,0,112,0) # zero target ->444824 name/message construction
assert ins(c,445016)==(0x15,0,94,0) # successful formatting ->445776 construction
assert ins(c,454016)==(0x55,0,63,0) # mismatch ->454528 framework error
assert ins(c,445896)==(0x62,10,-1608,6030)
assert ins(c,454664)==(0x62,10,-1608,2006)
# The complete source aggregate carries natural filename and line; never historical coordinates.
assert c.b[1467000:1467016]==b'src/admin_cto.rs'
assert ins(c,445912)==(0x62,10,-1736,107)and ins(c,454640)==(0x62,10,-1736,118)
#6030 target source words -1888,-1880,-1872,-1864 ->tuple[-1760..-1729]; last32 zero.
for load,src,store,dst in [(446040,-1888,446048,-1760),(446024,-1880,446032,-1752),(446008,-1872,446016,-1744),(445992,-1864,446000,-1736)]:
 assert ins(c,load)==(0x79,0xa1,src,0)and ins(c,store)==(0x7b,0x1a,dst,0)
for pc,dst in [(446056,-1728),(446064,-1720),(446072,-1712),(446080,-1704)]:assert ins(c,pc)==(0x7a,10,dst,0)
#2006 actual context-account at+96 dereference; key words copiedfirst; derivedPDA saved -48..-24 copiedlast.
raw(454728,'7961600000000000');raw(454736,'7911000000000000')
for pc,off in [(454744,0),(454752,8),(454760,16),(454768,24)]:assert ins(c,pc)[2]==off
for pc,off in [(454872,-1760),(454864,-1752),(454856,-1744),(454848,-1736)]:assert ins(c,pc)[2]==off
for load,src,store,dst in [(454776,-48,454784,-1728),(454792,-40,454800,-1720),(454808,-32,454816,-1712),(454824,-24,454832,-1704)]:assert ins(c,load)==(0x79,0xa6,src,0)and ins(c,store)==(0x7b,0x6a,dst,0)
assert ins(c,446144)==(5,0,-79,0)and ins(c,454936)==(5,0,-984,0)
# Full converters/decorator equality at instruction+relocation pattern; allocator recursion/data remain bounded.
pairs=[]
for label,oa,ca,size in [('AnchorError_box',1686320,1355384,136),('with_pubkeys',1687992,1356648,520),('PumpError_name',1405824,1196184,26896),('PumpError_Display',1433224,1223584,3616),('ErrorCode_name',1697584,1365344,3056),('ErrorCode_Display',1701232,1368992,2552),('find_program_address',1736376,1401640,312),('memcmp',1783416,1454688,64)]:
 assert o.normalized[oa:oa+size]==c.normalized[ca:ca+size],label
 assert o.pattern(oa,size)==c.pattern(ca,size),label
 pairs.append({'role':label,'original':[oa,oa+size],'candidate':[ca,ca+size],'full_normalized_and_relocation_pattern_equal':True,'raw_equal':o.b[oa:oa+size]==c.b[ca:ca+size]})
assert ins(c,1355400)[3]==160 and ins(c,1355480)[3]==160 and ins(c,1355504)==(0x7a,6,0,0)
assert ins(c,1357080)==(0x72,9,0,1)and ins(c,1357120)[3]==64
selectors=[]
for label,oa,ca,value,mode in [('6030_name',1436840,1227200,30,'debug'),('6030_message',1433224,1223584,30,'display'),('2006_message',1701232,1368992,2006,'display')]:
 x=meta.format_selector(o,oa,value,mode);y=meta.format_selector(c,ca,value,mode);assert x['text']==y['text'];selectors.append({'role':label,'original':x,'candidate':y})
assert struct.unpack_from('<I',c.b,1465124)[0]==30 and struct.unpack_from('<I',c.b,1465260)[0]==2006
# Entire candidate parser remains normalized/pattern-equal to historical baseline; wrapper/app stay distinct fullwindows.
def symbol(e,needle):
 rows=[f for f in e.funcs if needle in f['name']];assert len(rows)==1;return rows[0]
x=symbol(bs,'admin_cto..AdminCto$u20$as$u20$anchor_lang..Accounts');y=symbol(s,'admin_cto..AdminCto$u20$as$u20$anchor_lang..Accounts');assert x['size']==y['size']==21088
assert b.normalized[x['start']:x['start']+x['size']]==c.normalized[y['start']:y['start']+y['size']]
assert b.pattern(x['start'],x['size'])==c.pattern(y['start'],y['size'])
# Named parser failure annotation binds the successful preserved account slot.
assert c.b[1469824:1469844]==b'holder_creator_vault'
assert ins(c,947984)==(0x79,0xa1,-3712,0)and ins(c,948000)==(0x15,1,238,0)
assert ins(c,949992)[3]==20 and c.calls[950000]==4176
assert ins(c,957360)==(0x79,0xa1,-3712,0)and ins(c,957368)==(0x7b,0x16,96,0)
assert c.b[1467605:1467619]==b'holder-rewards'and c.b[1467863:1467876]==b'creator-vault'
assert c.b[1470095:1470127]==o.b[1800671:1800703] # Pump program ID data
call(442944,1401640)
assert not any(t==4176 for pc,t in c.calls.items()if 454528<=pc<=454936)
ledger=json.loads(gzip.decompress((A/'full-before-after-inventory.json.gz').read_bytes()))
for key in ['before','after']:assert ledger[key]['summary']['original_windows']==1035 and ledger[key]['summary']['candidate_symbol_windows']==780
result={'passed':True,'candidate':H(A/'candidate.so'),'symbols':H(A/'unstripped.so'),'source37_unchanged_during_build':True,'construction_sites':2,'selectors':selectors,'full_helper_pairs':pairs,'6030_tuple':['target','default'],'2006_tuple':['actual_holder_creator_vault','derived_creator_vault_PDA'],'candidate_source':{'file':'src/admin_cto.rs','lines':[107,118],'historical_source_lines':[307,648],'diagnostic_identity':False},'baseline_parser_full_normalized_pattern_equal':True,'ledgers':{k:ledger[k]['summary']for k in ['before','after']},'runtime_executions':0,'semantic_acceptance':False,'whole_original_identity':False}
windows={'original_app':meta.window(o,141840,169240),'candidate_app':meta.window(c,441928,469744),'original_wrapper':meta.window(o,1235456,1237664),'candidate_wrapper':meta.window(c,1120568,1122696),'original_parser':meta.window(o,746872,770312),'candidate_parser':meta.window(c,936472,957560)}
for pair in pairs:
 for side,e in [('original',o),('candidate',c)]:
  a,z=pair[side];windows[side+'_'+pair['role']]=meta.window(e,a,z)
payload=(json.dumps(windows,separators=(',',':'))+'\n').encode()
if '--check'in sys.argv:assert gzip.decompress((P/'complete-admitted-windows.json.gz').read_bytes())==payload
else:(P/'complete-admitted-windows.json.gz').write_bytes(gzip.compress(payload,mtime=0))
if '--check'in sys.argv:assert J(P/'static-result.json')==result
else:(P/'static-result.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:result[k]for k in ['passed','candidate','symbols','construction_sites','runtime_executions','whole_original_identity']}))
