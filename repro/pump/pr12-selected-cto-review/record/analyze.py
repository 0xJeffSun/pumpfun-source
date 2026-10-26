"""Bounded selected-CTO saved-byte analysis; never execute target or build."""
from pathlib import Path
import hashlib,importlib.util,json,re,struct
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
s=importlib.util.spec_from_file_location('sealed_reference',P/'reference-elf-method.py');method=importlib.util.module_from_spec(s);s.loader.exec_module(method)
STARTS=[441928,1120608,936512,1196224,1223624,1355424,1355560,45688,1454728]
def norm(b,refs):
 b=bytearray(b);sites={x['offset']:x for x in refs};i=0
 while i<len(b):
  op,reg,off,imm=struct.unpack_from('<BBhi',b,i)
  if op==133 and reg>>4==1 and sites.get(i,{}).get('type')!=10:b[i+4:i+8]=bytes(4)
  if op==24:
   if i in sites:b[i+4:i+8]=bytes(4);b[i+12:i+16]=bytes(4)
   i+=16
  else:i+=8
 return bytes(b)
def analyze():
 b=(P/'git-inputs/main/candidate.so').read_bytes();u=(P/'git-inputs/main/unstripped.so').read_bytes();e=method.Elf(b);sym=method.Elf(u);I=lambda pc:struct.unpack_from('<BBhi',b,pc);L=lambda pc:struct.unpack_from('<I',b,pc+4)[0]|struct.unpack_from('<I',b,pc+12)[0]<<32
 assert H(b)=='71ec4d8a646eefc82ba177afbc3d08552deadd65cf2f80ec280862eb768d059c'and H(u)=='6edbf4dedf535dd0dec1199ab87a97d6d83b60fb2c1c3a5791feffc953a33cda'
 assert e.section_bytes(e.by_name['.text'])==sym.section_bytes(sym.by_name['.text'])
 fs=[]
 for start in STARTS:
  f=next(f for f in sym.symbols if f['start']==start and f['type']==2 and f['size']);row=e.function(start,f['size'],[f['name']]);row['raw_hex']=b[start:start+f['size']].hex();row['relocation_pattern']=[dict(offset=at-start,type=r['type'],symbol=r['symbol'])for at,r in sorted(e.relocations.items())if start<=at<start+f['size']];fs.append(row)
 by={x['start']:x for x in fs};calls=lambda lo,hi:[(x['pc'],x['target'])for x in by[441928]['direct_calls']if lo<=x['pc']<hi]
 assert calls(443968,444216)==[(444048,1454728),(444112,1454728),(444184,1454728)]
 first=J(P.parent/'cto6019-6091-emitted-review/proof.json');key=bytes.fromhex(first['wsol_runtime_decode']['decoded_data_hex']);assert b[L(444088):L(444088)+32]==key
 assert I(444104)==(183,3,0,32)and I(444160)==(7,1,0,936)and I(444008)==(7,9,0,40)
 for pc,t in[(443888,444664),(443920,445992),(446056,446216),(446208,443928),(443960,447176),(444072,444216),(444136,444216),(444208,446432),(444424,445360),(446424,445360),(449288,447384),(456720,447384),(447488,445360),(447520,445360)]:assert pc+8+I(pc)[2]*8==t
 assert calls(445992,446216)==[(446032,1454728),(446184,1454728)]
 assert I(446000)==(7,1,0,-1888)and I(446016)==(7,2,0,-1920)and I(446064)==(121,113,168,0)and I(446072)==(121,17,0,0)
 # Current named shared-slot packing is the same bounded body with+56 placement.
 assert I(941104)==(123,26,-3784,0)and I(957256)==(121,161,-3784,0)and I(957264)==(123,22,168,0)
 ctors=[]
 for code,start,selectorpc,codepc,compared,linepc,convert,tail,line in[(6091,444216,444232,444352,444320,444328,444392,444424,108),(6019,446216,446232,446352,446320,446328,446392,446424,107),(6092,449088,449104,449224,449192,449200,449264,449288,115)]:
  enum=code-6000;assert struct.unpack_from('<I',b,L(selectorpc))[0]==enum and I(codepc)==(98,10,-1608,code)and I(compared)==(114,10,-1680,2)and I(linepc)==(98,10,-1736,line)
  assert calls(start,tail+8)==[(start+32,1196224),(start+72,45688),(convert,1355424)]
  pathpc=start+80;path=L(pathpc);assert b[path:path+16]==b'src/admin_cto.rs';assert I(start+120)==(122,10,-1744,16)and I(start+128)==(122,10,-1760,0)
  ctors.append(dict(code=code,enum=enum,start=start,code_pc=codepc,owned_call=convert,tail=tail,source_path_start=path,source_path='src/admin_cto.rs',source_line=line,compared_values='None'))
 assert I(449024)[0]==133 and I(449056)==(113,129,42,0)and I(449072)==(113,129,41,0)
 for pc,t in[(449048,452872),(449064,452872),(449080,452552)]:assert pc+8+I(pc)[2]*8==t
 assert I(456656)==(98,10,-1752,6092)and I(456696)[0]==133 and 456696+8+I(456696)[3]*8==1355560
 # Complete same named helper bodies preserve enum selection/name/Display logic.
 helperpairs=[]
 for old,new in[(936456,936512),(1120552,1120608),(1196168,1196224),(1223568,1223624),(1355368,1355424),(45688,45688),(1454672,1454728)]:
  oldf=next(f for f in first['functions']if f['start']==old);newf=by[new];assert len(bytes.fromhex(oldf['raw_hex']))==newf['bytes']and oldf['relocations']==newf['relocation_pattern'];assert norm(bytes.fromhex(oldf['raw_hex']),oldf['relocations'])==norm(bytes.fromhex(newf['raw_hex']),newf['relocation_pattern']);assert [(x['offset'],x['target']+(56 if x['target']>=469728 else 0))for x in oldf['calls']]==[(x['offset'],x['target'])for x in newf['direct_calls']];helperpairs.append([old,new])
 names={6019:'InvalidCreator',6091:'CreatorFeeNotConfigurableForQuote'}
 # Newly required92name's entire28bytes are written at the selected fast arm.
 n=bytearray(28)
 for pc,off in[(1213960,16),(1213984,8),(1214008,0)]:n[off:off+8]=L(pc).to_bytes(8,'little')
 n[24:28]=I(1214040)[3].to_bytes(4,'little');assert n==b'CtoCreatorAccountNotWritable';names[6092]=n.decode()
 messages=[]
 for code,at in[(6019,1496256),(6091,1497120),(6092,1497136)]:
  ptr,length=struct.unpack_from('<QQ',b,at);at0=ptr>>32;text=b[at0:at0+length].decode();messages.append(dict(code=code,descriptor=at,descriptor_hex=b[at:at+16].hex(),start=at0,bytes=length,text=text))
 assert messages[0]['text']=='Invalid creator pubkey'and messages[1]['bytes']==87 and messages[2]['text']=='current_creator must be passed writable so the outgoing creator can be paid'
 source=P/'git-inputs/main/source';attempt=J(P/'git-inputs/main/build-attempt.json');report=J(P/'git-inputs/main/build-comparison.json');identity=J(P/'git-inputs/main/controls/identity.json');source37=report['source_sha256'];assert len(source37)==37 and source37==attempt['source_sha256']==attempt['source_after_sha256']==identity['source37'];assert attempt['returncode']==0 and attempt['source_unchanged']and identity['whole_candidate_equal']and identity['whole_symbols_equal']
 assert report['build_log_sha256']==H((P/'git-inputs/main/build.log').read_bytes())
 assert J(P/'git-inputs/main/controls/build-exit.json')['returncode']==0
 assert J(P/'git-inputs/main/controls/stack-backend-gate.json')=={'passed':True,'matches':[]}
 assert report['selected_toolchain']=='v1.44'and '--locked'in attempt['command']and '--offline'in attempt['command']
 integration=J(P/'git-inputs/integration.json');assert integration['candidate_sha256']==H(b)and integration['symbols_sha256']==H(u)and integration['source_inputs']==37
 for path,h in source37.items():assert H((source/path).read_bytes())==h
 s=(source/'programs/pump/src/admin_cto.rs').read_text();assert s.count('return Err(err(6092));')==1 and s.count('error!(PumpError::CtoCreatorAccountNotWritable)')==1
 assert 'target==holder_key||target==a.sharing_config.key()'in s and 'a.bonding_curve.quote_mint==anchor_spl::token::spl_token::native_mint::ID'in s
 assert 'let wallet=old!=Pubkey::default()&&a.current_creator.owner==&anchor_lang::system_program::ID&&!a.current_creator.executable;'in s
 oldsources={n.removeprefix('work/cto6019-6091-experiment/repo/'):v['sha256']for n,v in J(P.parent/'cto6019-6091-emitted-review/input-references.json').items()if n.startswith('work/cto6019-6091-experiment/repo/')};assert len(oldsources)==37 and [n for n in source37 if source37[n]!=oldsources[n]]==['programs/pump/src/admin_cto.rs']
 return dict(commit='67608d457c096cebf73f1685f78f2f0ab9f9bdb0',candidate_sha256=H(b),symbols_sha256=H(u),candidate_bytes=len(b),symbols_bytes=len(u),functions=fs,constructor_names={str(k):v for k,v in names.items()},messages=messages,constructors=ctors,same_helper_normalized_pairs=helperpairs,wsol_constant=dict(load=444088,start=L(444088),bytes=32,hex=key.hex(),guard_calls=[list(x)for x in calls(443968,444216)],extra_runtime_conversion_on_this_guard=False),late6092=dict(code_pc=456656,program_error_converter=1355560,call_pc=456696,still_numeric=True),source37=source37,provenance=dict(requested_tools_version=report['selected_toolchain'],recorded_rustc_hash=report['rustc_sha256'],recorded_rustc_version=report['rustc_version'],recorded_cargo_driver_version=report['cargo_build_sbf_version'],aggregate_build_exit=attempt['returncode'],inner_compiler_strip_exit='unobserved',fresh_builds=0,fresh_runtime=0),limits=['Original admitted proofs reused; no new originalcode collection','Current wallet eligibility and owner-before-executable differ from original','Late6092 numeric remains; natural Source origins differ','Full callee/data/cleanup/security/original identity not established','No new runtime or newly claimed disjunct coverage'])
if __name__=='__main__':
 d=analyze();(P/'proof.json').write_text(json.dumps(d,indent=2)+'\n')
