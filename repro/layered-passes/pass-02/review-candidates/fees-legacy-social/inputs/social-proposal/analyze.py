"""Read-only complete-window evidence for the shared social ATA admission helper."""
from pathlib import Path
import hashlib, json, struct
from elf_reader import Elf
P = Path(__file__).resolve().parent
sha = lambda b: hashlib.sha256(b).hexdigest()

def instructions(e, a, z):
    result=[];pc=a
    while pc<z:
        op,r,off,imm=struct.unpack_from('<BBhi',e.b,pc);n=16 if op==0x18 else 8
        row={'pc':pc,'offset':pc-a,'opcode':op,'dst':r&15,'src':r>>4,'offset_signed':off,'immediate_signed':imm,'raw_hex':e.b[pc:pc+n].hex()}
        if n==16:row['immediate_u64']=(imm&0xffffffff)|(struct.unpack_from('<I',e.b,pc+12)[0]<<32)
        if pc in e.calls:row.update(kind='direct_call',target=e.calls[pc])
        elif op==0x85:row.update(kind='external_call',relocation=e.relocations.get(pc))
        elif op==0x8d:row.update(kind='indirect_call')
        elif op==0x95:row.update(kind='exit')
        elif op&7 in (5,6):row.update(kind='branch',target=pc+8+8*off,conditional=(op&0xf0)!=0)
        else:row['kind']='operation'
        result.append(row);pc+=n
    assert pc==z
    return result

def window(e,a,z):
    return {'start':a,'end':z,'bytes':z-a,'raw_sha256':sha(e.b[a:z]),'normalized_sha256':sha(e.normalized[a:z]),'relocations':e.pattern(a,z-a),'instructions':instructions(e,a,z)}

def run():
    o=Elf(P/'inputs/original.so');c=Elf(P/'inputs/candidate.so');s=Elf(P/'inputs/symbols.so')
    assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi] and c.relocations==s.relocations
    syms={f['start']:f for f in s.funcs}
    ends={a:(o.entries[i+1] if i+1<len(o.entries) else o.hi) for i,a in enumerate(o.entries)}
    def fone(needle):
        fs=[f for f in s.funcs if needle in f['name']];assert len(fs)==1,(needle,fs);return fs[0]
    wrapper=fone('__global23claim_social_fee_pda_v2');body=fone('19pump_fees_candidate23claim_social_fee_pda_v2')
    parser=fone('ClaimSocialFeePdaV2Bumps$GT$$GT$12try_accounts');exitf=fone('ClaimSocialFeePdaV2$u20$as$u20$anchor_lang..AccountsExit')
    pairs=[]
    for oa,oz,f in [(647968,650064,wrapper),(395656,405560,parser),(405560,406120,exitf)]:
        ca,cz=f['start'],f['start']+f['size']
        assert oz-oa==cz-ca and o.normalized[oa:oz]==c.normalized[ca:cz] and o.pattern(oa,oz-oa)==c.pattern(ca,cz-ca)
        edges=[]
        for pc,ot in o.calls.items():
            if oa<=pc<oz:
                cc=ca+pc-oa;ct=c.calls[cc];assert ot in ends and ct in syms
                of,cf=ends[ot],syms[ct]
                equal=(of-ot==cf['size'] and o.normalized[ot:of]==c.normalized[ct:ct+cf['size']])
                edges.append({'offset':pc-oa,'original_pc':pc,'original_target':ot,'candidate_pc':cc,'candidate_target':ct,'candidate_name':cf['name'],'target_normalized_equal':equal})
        pairs.append({'original':window(o,oa,oz),'candidate':window(c,ca,cz),'candidate_symbol':f['name'],'full_normalized_equal':True,'full_raw_equal':o.b[oa:oz]==c.b[ca:cz],'direct_edges':edges})
    assert o.calls[648656]==137280 and c.calls[wrapper['start']+688]==body['start']
    ha,hz=243184,249264
    hwin=window(o,ha,hz)
    targets=[]
    for t in sorted({v for pc,v in o.calls.items() if ha<=pc<hz}):
        z=ends[t];matches=[]
        for f in s.funcs:
            a=f['start'];n=f['size']
            if n==z-t and o.normalized[t:z]==c.normalized[a:a+n] and o.pattern(t,n)==c.pattern(a,n):
                matches.append({'symbol':f['name'],'window':window(c,a,a+n),'raw_equal':o.b[t:z]==c.b[a:a+n]})
        targets.append({'original':window(o,t,z),'candidate_matches':matches})
    allcallers=[{'pc':pc,'target':t} for pc,t in o.calls.items() if t==ha]
    assert allcallers==[{'pc':138936,'target':ha},{'pc':141000,'target':ha}]
    # Literal extents are the sizes actually consumed, not nearest-string guesses.
    specs=[(800416,32,'system_program_id'),(802404,4,'ConstraintSeeds_ErrorCode_2006'),(802340,4,'AccountNotInitialized_ErrorCode_3012'),(802428,4,'AccountTypeNotSupported_FeeError_29'),(802348,4,'InvalidMint_FeeError_30'),(804029,54,'historical_error_source_filename'),(800893,55,'formatter_failure_message'),(821240,40,'String_formatter_vtable'),(821288,32,'fmt_Error_debug_vtable'),(821320,24,'formatter_panic_location')]
    objects=[]
    for a,n,role in specs:
        data=o.b[a:a+n];refs=[]
        for row in hwin['instructions']:
            if row['opcode']==0x18 and row['immediate_u64']==a:refs.append(row['pc'])
        objects.append({'address':a,'bytes':n,'role':role,'raw_hex':data.hex(),'sha256':sha(data),'helper_lddw_users':refs,'embedded_relocations':[{'offset':p-a,**r,'target':struct.unpack_from('<Q',o.b,p)[0]>>32} for p,r in o.relocations.items() if a<=p<a+n]})
    desc=o.b[821320:821344];path=struct.unpack_from('<Q',desc)[0]>>32;n=struct.unpack_from('<Q',desc,8)[0]
    objects.append({'address':path,'bytes':n,'role':'historical_formatter_panic_filename','raw_hex':o.b[path:path+n].hex(),'sha256':sha(o.b[path:path+n]),'helper_lddw_users':[],'embedded_relocations':[]})
    assert bytes.fromhex(objects[0]['raw_hex'])==bytes(32)
    assert [struct.unpack_from('<I',o.b,a)[0] for a in (802404,802340,802428,802348)]==[2006,3012,29,30]
    assert o.b[804029:804083]==b'programs/pump-fees/src/instructions/fee_sharing/mod.rs'
    assert o.calls[246360]==700528 and struct.unpack_from('<i',o.b,700536+4)[0]==1
    # Caller immediate flags and output tag are machine instructions, not annotations.
    assert struct.unpack_from('<BBhi',o.b,17358*8)==(0x7a,10,-4072,0)
    assert struct.unpack_from('<BBhi',o.b,17616*8)==(0x7a,10,-4072,1)
    assert struct.unpack_from('<BBhi',o.b,17369*8)==(0x15,1,1,2)
    assert struct.unpack_from('<BBhi',o.b,17628*8)==(0x15,1,1,2)
    # Unmatched six-AccountInfo drop is six identical refcount blocks, final exit.
    drop=instructions(o,40472,41248)
    assert len(drop)==97 and drop[-1]['opcode']==0x95
    for i in range(6):
        a=40472+128*i
        assert struct.unpack_from('<BBhi',o.b,a)==(0x79,0x12,16+48*i,0)
        assert struct.unpack_from('<BBhi',o.b,a+8)==(0x79,0x13 if i<5 else 0x11,8+48*i,0)
    out={'identities':{'original':{'sha256':sha(o.b),'bytes':len(o.b)},'candidate':{'sha256':sha(c.b),'bytes':len(c.b)},'symbols':{'sha256':sha(s.b),'bytes':len(s.b)}},'wrapper_parser_exit_pairs':pairs,'original_handler':window(o,137280,147944),'candidate_handler':window(c,body['start'],body['start']+body['size']),'original_helper':hwin,'helper_all_direct_callers':allcallers,'helper_direct_targets':targets,'bounded_data':objects,'six_account_info_drop_proof':{'start':40472,'end':41248,'blocks':6,'stride':48,'instructions_per_block':16,'calls':0,'interpretation':'Six contiguous AccountInfos; each releases lamports then data Rc, with strong-count decrement and conditional weak-count decrement.'},'post_admission_error_drop':window(o,41456,41560),'counts':{'helper_bytes':hz-ha,'helper_instructions':len(hwin['instructions']),'helper_direct_calls':sum(i['kind']=='direct_call' for i in hwin['instructions']),'helper_unique_direct_targets':len(targets),'matched_direct_targets':sum(bool(x['candidate_matches']) for x in targets),'helper_external_calls':sum(i['kind']=='external_call' for i in hwin['instructions']),'helper_indirect_calls':sum(i['kind']=='indirect_call' for i in hwin['instructions']),'data_objects':len(objects)},'limits':['Original helper name and exact historical Rust syntax unknown.','Normalization proves bounded instruction pattern only; it is not all-input or full transitive equivalence.','Proposal is source-only: no candidate build or new transactions were run.','Native claim ordering and other handler residuals remain outside this helper task.']}
    return out

if __name__=='__main__':
    print(json.dumps(run(),indent=2,sort_keys=True))
