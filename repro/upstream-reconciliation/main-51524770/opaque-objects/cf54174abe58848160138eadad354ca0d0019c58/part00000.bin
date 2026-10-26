"""Independent saved CTO6019 review; no build, VM, network or source changes."""
from pathlib import Path
import argparse,gzip,hashlib,json,struct,subprocess,sys
sys.dont_write_bytecode=True
SEAL='e22c4568aa73e1e7b173f2d39d3168a400107f5ab1e02504a17c4f7785ba3b46'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def review(repo,packet):
 repo=Path(repo).resolve();packet=Path(packet).resolve();assert H(packet/'manifest.json')==SEAL;m=J(packet/'manifest.json');assert set(m)=={str(f.relative_to(packet))for f in packet.rglob('*')if f.is_file()and f!=packet/'manifest.json'}
 for n,v in m.items():assert not(packet/n).is_symlink()and H(packet/n)==v['sha256']and(packet/n).stat().st_size==v['bytes']
 # Preserve the original packet's complete render/input/prior/patch assertions.
 child=subprocess.run([sys.executable,'-B',str(packet/'verify.py'),'--repo',str(repo)],capture_output=True,text=True);assert child.returncode==0,(child.stdout,child.stderr)
 original=repo/'repro/layered-passes/pass-24/pump-compared-errors-source-proof/original.so';raw=original.read_bytes();I=lambda pc:struct.unpack_from('<BBhi',raw,pc);pc_call=lambda pc:pc+8+I(pc)[3]*8;pc_branch=lambda pc:pc+8+I(pc)[2]*8
 # Parser success r1 AccountInfo pointer and a distinct missing-account error transport.
 assert I(746896)==(0xbf,0x16,0,0);assert I(751776)==(0x79,0x71,0,0)and I(751784)==(0x7b,0x1a,-3984,0);assert I(751792)==(7,1,0,48)
 assert I(751512)==(0x7b,0x1a,-3984,0)and pc_branch(751608)==753392
 assert raw[1799323:1799337]==b'sharing_config';assert pc_call(751584)==10544
 assert I(770016)==(0x79,0xa1,-3984,0)and I(770024)==(0x7b,0x16,144,0)
 assert I(767240)==(0x79,0xa1,-3984,0)and I(767248)==(0x79,0x17,0,0);assert pc_call(767360)==1783416 and pc_call(767480)==10544
 # Successful aggregate bulk copy preserves +144; first16 bytes copied separately.
 assert pc_call(1236568)==746872 and I(1236528)==(7,1,0,-528)
 assert I(1236624)==(7,1,0,-920)and I(1236640)==(7,2,0,-512)and I(1236648)==(0xb7,3,0,386);assert pc_call(1236656)==1783312
 assert I(1236712)==(0x7b,0x9a,-928,0)and I(1236720)==(0x7b,0x7a,-936,0);assert -512==-528+16 and -920==-936+16 and 16<=144 and 144+8<=16+386
 assert I(1236800)==(7,1,0,-936)and I(1236808)==(0x7b,0x1a,-520,0)and I(1236896)==(7,2,0,-528);assert pc_call(1236928)==141840
 assert I(141880)==(0x79,0x28,8,0)and I(142480)==(0x7b,0x8a,-2264,0)and I(143184)==(0x79,0xa6,-2264,0);assert I(143192)==(0x79,0x62,144,0)and I(143200)==(0x79,0x22,0,0)
 for load,source,store,dest in[(143208,24,143216,-1112),(143224,16,143232,-1120),(143240,8,143248,-1128),(143256,0,143264,-1136)]:assert I(load)[2]==source and I(store)[2]==dest
 # The first comparison operand comes from actual PDA helper output, not a constant key.
 assert raw[1796286:1796300]==b'holder-rewards';assert I(142024)==(0x7a,10,-1096,14)and I(142016)==(0x7a,10,-1080,32)and I(142064)==(0xb7,3,0,2);assert pc_call(142088)==1736376
 assert I(141888)==(0x79,0x81,16,0)and I(141896)==(0x79,0x11,0,0)
 assert I(142072)[0]==0x18 and struct.unpack_from('<I',raw,142076)[0]==1800671
 for at,offset in[(143280,-1280),(143296,-1288),(143312,-1296),(143328,-1304)]:assert I(at)[2]==offset
 # Source Option<bool> None is false; Some(new) flow is distinct from holder branch.
 assert I(143400)==(0x57,8,0,1);assert pc_branch(143664)==143680 and pc_branch(143672)==144136;assert I(143688)==(0x57,1,0,1);assert pc_branch(143704)==144920
 # All three memcmp lengths are32; zero6030 precedes the two equal6019 branches.
 assert [pc_call(pc)for pc in[145112,145184,145256]]==[1783416]*3
 assert [pc_branch(pc)for pc in[145136,145208,145280]]==[146744,146536,146536]
 assert I(145104)==I(145176)==I(145248)==(0xb7,3,0,32)
 assert I(145152)==I(145224)==(7,1,0,-1208)and I(145168)==(7,2,0,-1304)and I(145240)==(7,2,0,-1136)
 # Named Source312 +38-byte path and None compared-values, owned AnchorError box.
 assert raw[1796300:1796338]==b'programs/pump/src/creator/admin_cto.rs';assert struct.unpack_from('<I',raw,1793592)[0]==19
 assert I(146640)==(0x72,10,-640,2)and I(146648)==(0x62,10,-696,312)and I(146656)==(0x7a,10,-704,38)and I(146664)==(0x7a,10,-720,0)and I(146672)==(0x62,10,-568,6019)
 assert [pc_call(pc)for pc in range(146536,146744,8)if I(pc)[0]==0x85]==[1405824,43320,1686320];assert pc_call(43464)==1433224
 # Ordinal19 is bound by literal selector and the actual decision-tree branches.
 for pc,op,reg,imm,target in[(1405856,0x65,2,54,1406040),(1405864,0x65,2,26,1406384),(1405872,0x65,2,12,1407064),(1407064,0x65,2,19,1408200),(1407072,0x65,2,15,1410304),(1410304,0x65,2,17,1412560),(1412560,0x15,2,18,1420296),(1433232,0x65,1,54,1433312),(1433240,0x65,1,26,1433448),(1433248,0x65,1,12,1433680),(1433680,0x65,1,19,1434024),(1433688,0x65,1,15,1436656),(1436656,0x65,1,17,1436696),(1436696,0x15,1,18,1436672)]:assert I(pc)[0]==op and I(pc)[1]==reg and I(pc)[3]==imm and pc_branch(pc)==target
 lddw=lambda pc:struct.unpack_from('<I',raw,pc+4)[0]|struct.unpack_from('<I',raw,pc+12)[0]<<32
 assert lddw(1431048)==8245937404401304420 and lddw(1431072)==4856122212424773193
 name=bytearray(14);name[6:14]=struct.pack('<Q',lddw(1431048));name[:8]=struct.pack('<Q',lddw(1431072));assert name==b'InvalidCreator';assert I(1431864)==(0xb7,7,0,14)
 assert lddw(1436704)==1827456;ptr,length=struct.unpack_from('<QQ',raw,1827456);assert length==22 and raw[ptr>>32:(ptr>>32)+length]==b'Invalid creator pubkey'
 assert I(1686336)==(0xb7,1,0,160)and I(1686344)==(0xb7,2,0,8)and pc_call(1686424)==1783312 and I(1686440)==(0x7a,6,0,0);assert pc_branch(146736)==164472 and I(164496)==(0x95,0,0,0)
 proposal=J(packet/'proposal.json');assert proposal['applied']is False;assert proposal['before']=='if !holder && target==a.sharing_config.key(){return Err(err(6019));}';assert proposal['after']=='if !holder && (target==holder_key || target==a.sharing_config.key()){return Err(error!(PumpError::InvalidCreator));}'
 return dict(status='INDEPENDENT_STATIC_REVIEW_PASS',packet_manifest_sha256=SEAL,complete_saved_bodies=11,successful_account_slot=144,temporary_error_slot_distinguished=True,holder_pda_actual_derivation=True,nonholder_some_predicate_order=['zero→6030','holder PDA equality→6019','sharing_config AccountInfo.key equality→6019'],error_name='InvalidCreator',error_message='Invalid creator pubkey',original_source=dict(path='programs/pump/src/creator/admin_cto.rs',path_bytes=38,line=312),compared_values='None',owned_anchor_error_bytes=160,with_pubkeys_on_6019=False,proposal_unapplied=True,proposed_source_after_sha256=proposal['source_after_sha256'],peer_verifier=dict(returncode=child.returncode,stdout=child.stdout,stderr=child.stderr),new_builds=0,new_target_executions=0,candidate_identity_claimed=False)
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--packet',type=Path,required=True);a=p.parse_args();print(json.dumps(review(a.repo,a.packet),indent=2))
