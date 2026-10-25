#!/usr/bin/env python3
"""Static complete-window/call/data closure, no executable changes or execution."""
from pathlib import Path
import gzip,hashlib,importlib.util,io,json,re,struct,tarfile
ROOT=Path(__file__).resolve().parent;P=ROOT/'inputs/accepted-pump';H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
SPECS=[('unsigned_divide_wrapper',0x1b4088,0x1b40d0,'__udivti3'),('unsigned_divide_remainder_core',0x1b40d0,0x1b5518,'_ZN17compiler_builtins3int19specialized_div_rem12u128_div_rem17h4cd8fee04a49c947E'),('logical_right_shift',0x1b5518,0x1b55c8,'__lshrti3'),('low_product',0x1b55c8,0x1b5728,'__multi3'),('left_shift',0x1b5948,0x1b59f0,'__ashlti3')]

def instructions(data,start,end):
    pc=start
    while pc<end:
        op,reg,off,imm=struct.unpack_from('<BBhi',data,pc);length=16 if op==0x18 else 8;assert pc+length<=end
        yield {'pc':pc,'offset':pc-start,'opcode':op,'dst':reg&15,'src':reg>>4,'displacement':off,'immediate':imm,'bytes':data[pc:pc+length].hex(),'length':length}
        pc+=length
    assert pc==end

def norm(data,start,end):
    result=bytearray(data[start:end])
    for i in instructions(data,start,end):
        if i['opcode']==0x85:
            assert i['src']==1;off=i['offset'];result[off+4:off+8]=b'\0'*4
    return bytes(result)

def analyze():
    for row in J(ROOT/'input-provenance.json')['files']:
        b=(ROOT/row['saved']).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes']
    manifest=(P/'manifest-sha256.json').read_bytes();assert H(manifest)=='2d2eb099792b2d5585199b6c352f8b21213888ab72ff6be0cb79686efa268072'
    for file in P.iterdir():
        if file.name=='manifest-sha256.json':continue
        b=file.read_bytes();assert J(P/'manifest-sha256.json')[file.name]=={'sha256':H(b),'bytes':len(b)}
    spec=importlib.util.spec_from_file_location('accepted_pump_elf',P/'elf_reader.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
    C,S,O=m.Elf(P/'candidate.so'),m.Elf(P/'unstripped.so'),m.Elf(ROOT/'inputs/original-pump.so')
    assert H(C.b)=='5c1c1c2d1cd2c334b3e054b6a8fb5ac0638d80d13495c1c18d935ad20bfd62bb'and H(S.b)=='18ab8e54cfab532c615bc716013511f15c5e686d5829a9576b327f0b071aa679'and H(O.b)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
    assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]and C.pattern(C.lo,C.hi-C.lo)==S.pattern(S.lo,S.hi-S.lo)
    chosen={};rows=[];edges=[];residual=[]
    for label,start,end,name in SPECS:
        size=end-start;matches={(f['start'],f['size'],f['name'])for f in S.funcs if f['size']==size and norm(C.b,f['start'],f['start']+size)==norm(O.b,start,end)}
        assert len(matches)==1;at,n,actual=next(iter(matches));assert actual==name
        index=O.entries.index(start);assert (O.entries[index+1]if index+1<len(O.entries)else O.hi)==end
        assert not O.pattern(start,size)and not C.pattern(at,size)
        a,b=O.b[start:end],C.b[at:at+size];differing=[{'offset':i,'original':x,'candidate':y}for i,(x,y)in enumerate(zip(a,b))if x!=y];allowed=set();calls=[];constants=[];branches=[];loads=[];stores=[];ins=list(instructions(O.b,start,end));other=list(instructions(C.b,at,at+size));assert len(ins)==len(other)
        for i,j in zip(ins,other):
            pc=i['pc'];off=i['offset'];op=i['opcode'];assert op!=0x8d
            if op==0x85:
                assert i['src']==j['src']==1
                ot=pc+8+i['immediate']*8;ct=j['pc']+8+j['immediate']*8
                row={'offset':off,'original_pc':pc,'candidate_pc':j['pc'],'original_signed_operand':i['immediate'],'candidate_signed_operand':j['immediate'],'original_target':ot,'candidate_target':ct}
                calls.append(row);edges.append({'body':label,**row});allowed.update(range(off+4,off+8))
            elif op&7 in (5,6)and op!=0x95:
                target=pc+8+i['displacement']*8;ct=j['pc']+8+j['displacement']*8;assert start<=target<end and at<=ct<at+size and target-start==ct-at
                branches.append({'offset':off,'target_offset':target-start,'original_target':target,'candidate_target':ct})
            if op==0x18:
                value=(i['immediate']&0xffffffff)|(struct.unpack_from('<I',O.b,pc+12)[0]<<32)
                assert O.b[pc:pc+16]==C.b[j['pc']:j['pc']+16]
                constants.append({'offset':off,'value':value,'hex':hex(value),'relocated':False})
            if op&7==1:loads.append({'offset':off,'base_register':i['src'],'stack_displacement':i['displacement'],'destination_register':i['dst'],'opcode':op});assert i['src']==10
            if op&7 in (2,3):stores.append({'offset':off,'base_register':i['dst'],'displacement':i['displacement'],'opcode':op})
        assert all(x['offset']in allowed for x in differing)
        row={'label':label,'symbol_name_in_accepted_candidate':name,'original_start':start,'original_end':end,'candidate_start':at,'candidate_end':at+size,'bytes':size,'candidate_symbol_full_extent':True,'original_inferred_entry_extent':True,'unique_complete_candidate_match':True,'original_raw_sha256':H(a),'candidate_raw_sha256':H(b),'raw_equal':a==b,'normalized_sha256':H(norm(O.b,start,end)),'normalized_equal':norm(O.b,start,end)==norm(C.b,at,at+size),'normalization':'Only signed internal-call immediates are zeroed in memory; no relocations occur in these bodies.','raw_byte_differences':differing,'remaining_unexplained_byte_differences':[],'relocations_original':[],'relocations_candidate':[],'indirect_calls':[],'direct_calls':calls,'local_branches':branches,'inline_64_bit_constants':constants,'loads':loads,'stores':stores,'all_loads_from_stack_register_r10':True}
        rows.append(row);chosen[start]=(at,label);residual.extend({'body':label,**x}for x in differing)
    for edge in edges:
        target=chosen[edge['original_target']];assert edge['candidate_target']==target[0];edge['target_label']=target[1]
    assert len(edges)==12 and sum(r['bytes']for r in rows)==5960
    # Source/build provenance is inspected separately from the machine-code result.
    phases=J(P/'toolchain-phases.json');build=J(P/'build-comparison.json');source_map=J(P/'source-harness-sha256.json')['source']
    with tarfile.open(P/'source-snapshot.tar.gz')as tar:
        source={x.name:tar.extractfile(x).read()for x in tar if x.isfile()}
    assert {n:H(b)for n,b in source.items()}==source_map==build['source_sha256']
    assert H(gzip.decompress((P/'build.log.gz').read_bytes()))==build['build_log_sha256']
    assert phases['compiled_unstripped']['sha256']==H(S.b)and phases['candidate']['sha256']==H(C.b)and phases['compile']['selected_version']=='v1.44'and phases['strip']['actual_distribution']=='v1.52'
    dependencies=J(P/'dependency-provenance.json');assert H(source['programs/pump/Cargo.lock'])==dependencies['lock_sha256']
    assert not any('compiler' in p['name']and'builtin'in p['name']for p in dependencies['packages'])
    retained=J(ROOT/'inputs/retained-toolchain-hashes.json')['files'];rlib='rust/lib/rustlib/sbf-solana-solana/lib/libcompiler_builtins-cafa861a42daca7c.rlib'
    for n in ['rust/bin/rustc','rust/bin/cargo','llvm/bin/ld.lld']:assert retained[n]['sha256']==phases['compile']['tools'][n]['sha256']
    source_evidence={'source_input_count':len(source_map),'cargo_locked_dependency_count':len(dependencies['packages']),'compiler_builtins_in_program_lock_inventory':False,'selected_compiler_phase':'v1.44','recorded_strip_phase':'v1.52','compiler_builtins_rlib_record':{'path':rlib,**retained[rlib]},'runtime_archive_payload_inspected':False,'runtime_rust_source_payload_inspected':False,'runtime_source_version_uniquely_identified':False,'runtime_source_build_link_closed':False,'bounded_missing_prerequisite':'Authentic source plus build association for selected libcompiler_builtins-cafa861a42daca7c.rlib, or separate manual proof over these exact matched machine bodies. No version guess or new build is justified.','provenance_limit':'Retained toolchain inventory binds a candidate runtime archive hash; its contents/source were not within the allowed tracked inputs. Exact symbol/body identity does not identify a unique historical compiler or source revision.'}
    return {'original_sha256':H(O.b),'candidate_sha256':H(C.b),'symbols_sha256':H(S.b),'original_bytes':len(O.b),'candidate_bytes':len(C.b),'text_binding_symbols_to_candidate':True,'complete_bodies':rows,'complete_call_closure':edges,'total_body_bytes':5960,'raw_equal_bodies':sum(r['raw_equal']for r in rows),'normalized_equal_bodies':len(rows),'direct_call_sites':len(edges),'all_callees_inside_matched_set':True,'relocation_count':0,'indirect_call_count':0,'static_data_pointer_reads':0,'all_memory_loads_use_stack_base_register':True,'inline_64bit_immediate_count':sum(len(r['inline_64_bit_constants'])for r in rows),'complete_raw_residual_ledger':residual,'unexplained_residual_bytes':0,'source_provenance':source_evidence,'mathematical_all_input_division_proof_supplied':False,'full_original_program_equality':O.b==C.b,'new_builds':0,'new_runtime_probes':0}
if __name__=='__main__':print(json.dumps(analyze(),indent=2))
