"""Independent static bindings and bounded return-path checks; no ELF execution."""
from pathlib import Path
import hashlib, json, re, struct, tarfile
from elf_reader import Elf

W=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())

def run():
    O=Elf(W/'inputs/original.so');C=Elf(W/'inputs/current-candidate.so');S=Elf(W/'inputs/current-symbols.so')
    assert H(O.b)=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
    assert H(C.b)=='8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e'
    assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]
    provenance=J(W/'business-evidence/provenance.json')
    for r in provenance['ranges']:
        assert O.b[r['start']:r['end_exclusive']]==(W/'business-evidence'/r['file']).read_bytes()
    for r in J(W/'business-evidence/inputs/handler-data.json'):
        a,n=r['target'],r['preview_length']
        s=next(s for s in O.raw if s[1]!=8 and s[3]<=a and a+n<=s[3]+s[5])
        at=s[4]+a-s[3]
        assert O.b[at:at+n].hex()==r['preview_hex']
    slots=[]
    for line in (W/'business-evidence/inputs/approved/original-handler.asm').read_text().splitlines():
        m=re.match(r'\s*(\d+):\s+((?:[0-9a-f]{2} ){7}[0-9a-f]{2}(?: [0-9a-f]{2})*)\t',line)
        if m:
            at=int(m.group(1))*8;b=bytes.fromhex(m.group(2));assert O.b[at:at+len(b)]==b
            slots.extend(range(at,at+len(b),8))
    assert slots==list(range(163920,177720,8))
    def ins(pc):
        b=O.b[pc:pc+8];op,regs,off,imm=struct.unpack('<BBhi',b)
        r=dict(pc=pc,raw_hex=b.hex(),opcode=op,dst=regs&15,src=regs>>4,offset_signed=off,immediate_signed=imm)
        if pc in O.calls:r['direct_target']=pc+8+imm*8
        elif op&7==5 and op not in (0x85,0x95):r['branch_target']=pc+8+off*8
        return r
    assert ins(175744)['direct_target']==752592
    assert ins(175760)['branch_target']==176280
    assert ins(175784)['immediate_signed']==8
    assert ins(175792)['direct_target']==289880
    assert ins(175848)['branch_target']==164104
    path=list(range(175768,175856,8))+list(range(164104,164128,8))
    after=list(range(175800,175856,8))+list(range(164104,164128,8))
    assert not any(pc in O.calls or O.relocations.get(pc,{}).get('type')==10 for pc in after)
    expected={175800:'79a9b0fb00000000',175808:'79a8a8fb00000000',175816:'79a288fa00000000',
              175824:'7921000000000000',175832:'07010000ffffffff',175840:'7b12000000000000',
              175848:'050043fa00000000',164104:'7b96080000000000',164112:'7b86000000000000',164120:'9500000000000000'}
    for pc,b in expected.items():assert ins(pc)['raw_hex']==b
    funcs=[f for f in S.funcs if 'From$LT$pump_fees_candidate..FeeError$GT$' in f['name'] and '4from17h' in f['name']]
    assert len(funcs)==1 and funcs[0]['start']==553368 and funcs[0]['size']==504
    a=funcs[0]['start'];o=289880;n=504
    assert C.normalized[a:a+n]==O.normalized[o:o+n] and C.pattern(a,n)==O.pattern(o,n)
    with tarfile.open(W/'inputs/current-inventory.tar.gz') as t:
        catalog=json.load(t.extractfile('catalog.json'))
    original=next(r for r in catalog['original_rows'] if r['start']==o)
    match=next(r for r in original['candidate_matches'] if r['candidate_start']==a)
    assert match['all_direct_bodies_supported'] and match['unique_calls_consistent']
    source=(W/'proposal/source/programs/pump-fees/src/donation.rs').read_text()
    correction=(W/'correction/donation.rs').read_text()
    old='.map_err(|_| error!(FeeError::InvalidPool))?';new='.map_err(|_| FeeError::InvalidPool)?'
    assert source.count(old)==1 and correction==source.replace(old,new)
    lib=(W/'proposal/source/programs/pump-fees/src/lib.rs').read_text();assert 'InvalidPool = 8,' in lib
    syn=(W/'proposal/dependencies/anchor-syn-0.31.2/src/codegen/error.rs').read_text()
    assert 'impl From<#enum_name> for anchor_lang::error::Error' in syn
    assert 'error_origin: None,' in syn and 'compared_values: None' in syn
    error_macro=(W/'inputs/anchor-attribute-error-lib.rs').read_text()
    assert 'create_error(error_code, true, None)' in error_macro
    assert 'Some(anchor_lang::error::ErrorOrigin::Source' in error_macro
    assert 'filename: file!(),' in error_macro and 'line: line!()' in error_macro
    api=(W/'proposal/dependencies/anchor-lang-0.31.1/src/lib.rs').read_text()
    assert 'pub type Result<T> = std::result::Result<T, error::Error>;' in api
    assert 'self.as_ref().clone()' in api
    borrow_pcs=[164864,164872,164888,164944,164952,164968,165200,177184,177192,177200,177208,
                177448,177456,176232,176240,176248,176256,176264]
    assert ins(177456)['branch_target']==176232 and ins(176264)['branch_target']==167160
    return dict(original_sha256=H(O.b),current_candidate_sha256=H(C.b),current_symbols_sha256=H(S.b),
                complete_original_handler_asm_slots=len(slots),original_ranges_rebound=len(provenance['ranges']),
                original_data_previews_rebound=49,preview_extent_claimed=False,
                pool_derivation_call=ins(175744),pool_derivation_success_branch=ins(175760),
                pool_error_return_path=[ins(pc) for pc in path],
                no_calls_or_error_payload_mutation_after_conversion=True,
                returned_words='r9/r8 loaded from conversion result; preserved through borrow-count decrement; stored at caller output +8/+0; exit',
                conversion=dict(original_start=o,candidate_start=a,bytes=n,candidate_symbol=funcs[0]['name'],
                                original_raw_sha256=H(O.b[o:o+n]),candidate_raw_sha256=H(C.b[a:a+n]),
                                normalized_equal=True,relocation_pattern_equal=True,all_immediate_targets_supported=True,
                                complete_allocation_and_data_closure_proven=False),
                borrow_scope_anchors=[ins(pc) for pc in borrow_pcs],
                correction=dict(old=old,new=new,scope='one expression atop frozen source proposal',
                                original_proposed_donation_sha256=H(source.encode()),corrected_donation_sha256=H(correction.encode()),
                                type_basis='map_err returns FeeError; ? converts through locked generated From<FeeError> for anchor_lang::error::Error'),
                inventory_baseline=dict(candidate_sha256=catalog['inputs']['candidate']['sha256'],summary=catalog['summary'],
                                        suitable_for_same_method_full_window_comparison=True,
                                        historical_function_identity_or_semantic_completeness=False),
                recommendation='One isolated unchanged-recipe build is justified after parent accepts the separate one-expression error correction.',
                builds=0,runtime_cases=0,new_fixtures=0,main_source_changes=0)

if __name__=='__main__':
    (W/'review-evidence.json').write_text(json.dumps(run(),indent=2)+'\n')
