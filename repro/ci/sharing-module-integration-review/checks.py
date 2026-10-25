#!/usr/bin/env python3
"""Independent source, saved-byte, signature and central integration checks; no execution."""
from pathlib import Path
import base64,collections,gzip,hashlib,io,json,re,struct,tarfile
from solders.transaction import VersionedTransaction
ROOT=Path(__file__).resolve().parent;R=ROOT/'inputs';P=R/'repro/pump_fees/sharing-module-v144'
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
def unpack(data):
    result={}
    with tarfile.open(fileobj=io.BytesIO(data)) as t:
        for m in t:
            assert m.isfile() and not Path(m.name).is_absolute() and '..' not in Path(m.name).parts and m.name not in result
            result[m.name]=t.extractfile(m).read()
    return result
class Binary:
    def __init__(self,data):
        self.b=data;off=struct.unpack_from('<Q',data,40)[0];size,num,names=struct.unpack_from('<HHH',data,58)
        rows=[struct.unpack_from('<IIQQQQIIQQ',data,off+i*size)for i in range(num)];n=rows[names];strings=data[n[4]:n[4]+n[5]]
        self.sections={strings[x[0]:].split(b'\0',1)[0].decode():x for x in rows};self.reloc={};syms={}
        s=self.sections['.dynsym'];strs=rows[s[6]];strings=data[strs[4]:strs[4]+strs[5]]
        for i,at in enumerate(range(s[4],s[4]+s[5],24)):
            name=struct.unpack_from('<I',data,at)[0];syms[i]=strings[name:].split(b'\0',1)[0].decode()
        s=self.sections['.rel.dyn']
        for at in range(s[4],s[4]+s[5],16):
            address,info=struct.unpack_from('<QQ',data,at);self.reloc[address]=(info&0xffffffff,syms.get(info>>32,''))
        assert self.sections['.text'][3]==self.sections['.text'][4]
    def pattern(self,start,n):return [(p-start,*v)for p,v in sorted(self.reloc.items())if start<=p<start+n]
    def normalized(self,start,n):
        result=bytearray(self.b[start:start+n]);i=0
        while i<n:
            at=start+i;op=self.b[at];rel=self.reloc.get(at)
            if op==0x85 and (self.b[at+1]==0x10 or rel and rel[0]==10):result[i+4:i+8]=b'\0'*4
            if op==0x18:
                assert i+16<=n
                if rel and rel[0]==8:result[i+4:i+8]=b'\0'*4;result[i+12:i+16]=b'\0'*4
                i+=16
            else:i+=8
        return bytes(result)
    def pointer(self,pc):return struct.unpack_from('<I',self.b,pc+4)[0]|struct.unpack_from('<I',self.b,pc+12)[0]<<32
    def target(self,pc):
        assert self.b[pc:pc+2]==b'\x85\x10' and self.reloc.get(pc,(None,))[0]!=10
        return pc+8+struct.unpack_from('<i',self.b,pc+4)[0]*8

def transactions(value):
    if isinstance(value,dict):
        if isinstance(value.get('transaction_base64'),str):yield value['transaction_base64']
        for key,child in value.items():
            if key!='transaction_base64':yield from transactions(child)
    elif isinstance(value,list):
        for child in value:yield from transactions(child)

def check():
    prior_seal=(ROOT/'baseline-amm-review-manifest.json').read_bytes();assert H(prior_seal)=='14bdf64c42f310369c75c43b3283d48ecac9dd423a159f535682e1a6e9d392f0'
    for name in ['repro/status.json','repro/completion.json','.github/workflows/verify.yml']:assert H((ROOT/'baseline-central'/name).read_bytes())==json.loads(prior_seal)['central/'+name]
    owned=J(ROOT/'owned-file-sha256.json');assert len(owned)==60 and H((ROOT/'owned-file-sha256.json').read_bytes())=='74ad2980968c459626a91e8091c520ea330fda30431c82b0f1a6fe5f21db3e18'
    for name,digest in owned.items():assert H((R/name).read_bytes())==digest
    checked=J(ROOT/'checked-inputs.json');assert {str(p.relative_to(R)):H(p.read_bytes())for p in R.rglob('*')if p.is_file()and'__pycache__'not in p.parts}=={n:v['sha256']for n,v in checked.items()}
    scratch=unpack((P/'scratch-handoff.tar.gz').read_bytes());old=unpack(scratch['baseline-source-snapshot.tar.gz']);new=unpack((P/'source-snapshot.tar.gz').read_bytes());scratch_source=unpack(scratch['source-snapshot.tar.gz'])
    assert len(old)==23 and len(new)==len(scratch_source)==26
    path='programs/pump-fees/src/donation.rs';declarations=re.findall(rb'#\[account\]\npub struct SharingConfig \{[^}]*\}',old[path]);assert len(declarations)==1;declaration=declarations[0]
    expected=dict(old);expected[path]=old[path].replace(b'use crate::types::{FeeProgramGlobal, Shareholder};',b'use crate::types::FeeProgramGlobal;').replace(declaration,b'pub use crate::instructions::fee_sharing::create_fee_sharing_config::SharingConfig;')
    expected['programs/pump-fees/src/lib.rs']=old['programs/pump-fees/src/lib.rs'].replace(b'mod state;\n',b'mod state;\nmod instructions;\n')
    expected['programs/pump-fees/src/instructions/mod.rs']=b'pub mod fee_sharing;\n'
    expected['programs/pump-fees/src/instructions/fee_sharing/mod.rs']=b'pub mod create_fee_sharing_config;\n'
    moved='programs/pump-fees/src/instructions/fee_sharing/create_fee_sharing_config.rs';expected[moved]=b'use anchor_lang::prelude::*;\nuse crate::donation::ConfigStatus;\nuse crate::types::Shareholder;\n\n'+declaration+b'\n'
    assert expected==scratch_source;expected['programs/pump-fees/README.md']=new['programs/pump-fees/README.md'];assert expected==new
    changes=sorted(n for n in set(old)|set(scratch_source)if old.get(n)!=scratch_source.get(n));assert len(changes)==5
    assert [n for n in new if new[n]!=scratch_source[n]]==['programs/pump-fees/README.md']
    assert new['Cargo.lock']==old['Cargo.lock'] and new['programs/pump-fees/src/contexts.rs']==old['programs/pump-fees/src/contexts.rs'] and new['programs/pump-fees/src/state.rs']==old['programs/pump-fees/src/state.rs']
    candidate=(P/'pump_fees_candidate.so').read_bytes();original=(R/'evidence/original/pump_fees/deployed.so').read_bytes();digest=H(candidate)
    assert candidate==scratch['pump_fees_candidate.so'] and digest=='8cce74a5191b286eaa10af59c02c9ee16d3853be214c5e9b1132e50bba15ef87' and len(candidate)==768104 and candidate!=original
    C,O=Binary(candidate),Binary(original)
    def window(row):
        c,o,n=row['candidate_start'],row['original_start'],row['bytes'];assert H(candidate[c:c+n])==row['candidate_raw_sha256'] and H(original[o:o+n])==row['original_raw_sha256']
        assert (candidate[c:c+n]==original[o:o+n])==row['raw_equal']
        cn,on=C.normalized(c,n),O.normalized(o,n);assert (cn==on)==row['normalized_equal']
        assert (C.pattern(c,n)==O.pattern(o,n))==row['relocation_pattern_equal']
        slots=[i for i in range(0,n,8)if cn[i:i+8]!=on[i:i+8]]
        if 'different_slots'in row:assert slots==row['different_slots']
        if 'normalized_different_slots'in row:assert slots==row['normalized_different_slots']
        assert row['original_entry_bounded'];return slots
    codec=J(P/'candidate-codecs.json');rows=codec['full_codecs'];assert len(rows)==5;unique=set();call_count=0;lines=[]
    for row in rows:
        assert window(row)==[528];c,o=row['candidate_start'],row['original_start'];line=struct.unpack_from('<i',candidate,c+532)[0];oline=struct.unpack_from('<i',original,o+532)[0]
        expected_name=moved if row['type']=='SharingConfig' else 'programs/pump-fees/src/state.rs'
        for lit in row['literal_spans']:
            off=lit['instruction_offset'];cp,op=C.pointer(c+off),O.pointer(o+off)
            cn=struct.unpack_from('<i',candidate,c+540)[0]if off==488 else len(row['type']);on=struct.unpack_from('<i',original,o+540)[0]if off==488 else len(row['type'])
            assert candidate[cp:cp+cn]==original[op:op+on]==bytes.fromhex(lit['candidate_hex'])==bytes.fromhex(lit['original_hex'])
            assert candidate[cp:cp+cn].decode()==(expected_name if off==488 else row['type'])
        lines.append({'type':row['type'],'natural_line':line,'original_line':oline})
        for call in row['calls']:
            off=call['call_offset'];assert C.target(c+off)==call['candidate_start']and O.target(o+off)==call['original_start'];assert window(call)==[]
            unique.add((call['candidate_start'],call['original_start'],call['bytes']));call_count+=1
    assert call_count==35 and len(unique)==11 and sum(r['bytes']for r in rows)==3672
    closure=J(P/'sharing-closure-proof.json');closure_sites=0;closure_targets=set();limits=[]
    for key,n in [('checked_codec',744),('unchecked_codec',1472),('account_try_from_caller',1024)]:
        row=closure[key];assert row['bytes']==n;assert window(row)==([528]if key=='checked_codec'else[])
        for call in row['direct_calls']:
            assert C.target(call['candidate_call_pc'])==call['candidate_target']and O.target(call['original_call_pc'])==call['original_target']
            result=window(call['target_window_comparison']);assert result in ([],[528]);closure_sites+=1
            closure_targets.add((call['candidate_target'],call['original_target']))
            if result:limits.append({'caller':key,'offset':call['offset'],'difference_slots':result})
    assert closure_sites==23
    assert closure['diagnostic_lines']=={'candidate':5,'original':37,'proposal_natural_attribute_line':5}
    assert bytes(closure['discriminator']['idl_bytes'])==hashlib.sha256(b'account:SharingConfig').digest()[:8]
    pointers=closure['relocated_pointer_inventory'];assert sum(not r['unresolved_payload_closure']for r in pointers)==4
    for r in pointers:
        row=closure[{'checked':'checked_codec','unchecked':'unchecked_codec','account_try_from':'account_try_from_caller'}[r['window']]];b=C if r['side']=='candidate'else O
        assert b.pointer(row[r['side']+'_start']+r['offset'])==r['target']
        assert r['literal_extent_proven_above']==(r['window']=='checked'and r['offset']in [488,624])
    incoming=closure['incoming_direct_callers'];assert [r['window_bytes']for r in incoming['candidate']]==[1024,10576]and [r['window_bytes']for r in incoming['original']]==[1024,13800]
    retained=J(P/'retained-static-gate.json');assert len(retained['bodies'])==10 and retained['all_retained_gates_passed']
    for row in retained['bodies'].values():assert window(row)==[]
    for key,calls in retained['direct_calls'].items():
        body=retained['bodies'][key]
        for call in calls:
            assert C.target(body['candidate_start']+call['call_offset'])==call['candidate_start'] and O.target(body['original_start']+call['call_offset'])==call['original_start']
            assert window(call)==[]
    for key,literals in retained['literals'].items():
        body=retained['bodies'][key]
        for lit in literals:
            cp=C.pointer(body['candidate_start']+lit['offset']);op=O.pointer(body['original_start']+lit['offset']);n=lit['bytes']
            assert cp==lit['candidate_target'] and op==lit['original_target'] and candidate[cp:cp+n]==original[op:op+n] and H(candidate[cp:cp+n])==lit['sha256']
    assert sum(map(len,retained['direct_calls'].values()))==26 and sum(map(len,retained['literals'].values()))==5
    status=J(R/'repro/status.json');baseline=J(ROOT/'baseline-central/repro/status.json');fee=status['pump_fees'];assert fee==J(P/'status-proposal.json')
    assert {k:v for k,v in status.items()if k!='pump_fees'}=={k:v for k,v in baseline.items()if k!='pump_fees'}
    assert fee['candidate_sha256']==digest and len(fee['implemented_handlers'])==31 and fee['implemented_handlers']==baseline['pump_fees']['implemented_handlers']
    assert len(fee['validation_reports'])==9 and len(fee['signed_sequence_reports'])==1;reports={};signature_fields={}
    for name in fee['validation_reports']+fee['signed_sequence_reports']:
        leaf=Path(name).name;raw=(P/leaf).read_bytes();assert raw==scratch[leaf];d=json.loads(gzip.decompress(raw));reports[leaf]=d
        assert d['candidate_sha256']==digest and d['original_sha256']==H(original)and not d['mismatches']
        counts={'encoded_transaction_fields':0,'verified_signatures':0}
        for encoded in transactions(d):
            rawtx=base64.b64decode(encoded,validate=True);tx=VersionedTransaction.from_bytes(rawtx);assert bytes(tx)==rawtx and all(tx.verify_with_results())
            counts['encoded_transaction_fields']+=1;counts['verified_signatures']+=len(tx.signatures)
        signature_fields[leaf.removesuffix('.json.gz')]=counts
    runtime=J(P/'runtime-verification-result.json');assert signature_fields==runtime['signature_fields_by_report']
    assert sum(x['encoded_transaction_fields']for x in signature_fields.values())==8644 and sum(x['verified_signatures']for x in signature_fields.values())==17204
    assert sum(reports[Path(n).name]['case_count']for n in fee['validation_reports'])==17441 and len(reports['donation-sequence.json.gz']['steps'])==10
    assert len(reports['differential.json.gz']['suites'])==18 and reports['differential.json.gz']['case_count']==17331 and runtime['repeat_input_comparisons']==69 and runtime['new_unique_cases']==0
    for row in reports['codec-rejections.json.gz']['cases']:assert [s for s in row['original']['logs']if 'AnchorError'in s]==[s for s in row['candidate']['logs']if 'AnchorError'in s]
    program=re.search(rb'declare_id!\("([^"]+)"\)',new['programs/pump-fees/src/lib.rs']).group(1).decode();hist=[];receipt=reports['initializer-history.json.gz']
    for i in [80,81]:
        name=f'transactions/admin-success-{i}.json';capture=(P/name).read_bytes();assert capture==scratch['runtime/repro/pump_fees/initializer-history/'+name]
        data=json.loads(capture)['response']['result'];raw=base64.b64decode(data['transaction'][0]);tx=VersionedTransaction.from_bytes(raw);assert tx.verify_with_results()==[True]
        messages=[bytes(inst.data)for inst in tx.message.instructions if str(tx.message.account_keys[inst.program_id_index])==program]
        assert len(messages)==1 and messages[0][:8]==hashlib.sha256(b'global:initialize_fee_config').digest()[:8]
        row=next(r for r in receipt['cases']if r['index']==i)
        for side in ['original','candidate']:assert row[side]['raw_transaction_sha256']==H(raw)and row[side]['signed_message_and_signature_unchanged']and row[side]['sigverify_runtime_enabled']
        hist.append({'index':i,'instruction':'initialize_fee_config','discriminator_hex':messages[0][:8].hex(),'raw_transaction_sha256':H(raw),'verified_signatures':len(tx.signatures)})
    assert receipt['freshness_control']['blockhash_freshness_check']and'BlockhashNotFound'in receipt['freshness_control']['error']
    comp=J(R/'repro/completion.json');basecomp=J(ROOT/'baseline-central/repro/completion.json');rows=comp['instructions'];assert len(rows)==len({(r['program'],r['instruction'])for r in rows})==150
    assert dict(collections.Counter(r['status']for r in rows))==comp['counts']==basecomp['counts']=={'bounded_implementation':140,'partial':5,'unrecovered':5}
    prior={(r['program'],r['instruction']):r for r in basecomp['instructions']};artifact=fee['candidate_artifact']
    assert sum(r['program']=='pump_fees'for r in rows)==31
    for row in rows:
        before=prior[(row['program'],row['instruction'])]
        if row['program']=='pump_fees':assert row=={**before,'candidate_artifact':artifact}
        else:assert row==before
    validation=comp['current_validation'];assert validation['core_differential_comparisons']==sum(x['differential_comparisons']for x in validation['programs'].values())==53735
    for name,row in validation['programs'].items():
        if name=='pump_fees':assert row=={**basecomp['current_validation']['programs'][name],'candidate_artifact':artifact,'candidate_sha256':digest,'comparison_report':fee['comparison_report']}
        else:assert row==basecomp['current_validation']['programs'][name]
    oldflow=(ROOT/'baseline-central/.github/workflows/verify.yml').read_text();newflow=(R/'.github/workflows/verify.yml').read_text();assert newflow==oldflow.replace('repro/pump_fees/state-module-v144','repro/pump_fees/sharing-module-v144')and newflow.count('--candidate '+artifact)==10
    before=(ROOT/'baseline-central/scripts/verify_current_bindings.py').read_text();after=(R/'scripts/verify_current_bindings.py').read_text();assert after==before.replace('repro/pump_fees/state-module-v144/pump_fees_candidate.so',artifact)
    return {'candidate_sha256':digest,'candidate_bytes':len(candidate),'compiler_inputs':26,'source_rust_changed_paths':changes,'declaration_byte_preserved':True,'whole_main_scratch_identity':True,'main_vs_scratch_only_readme_difference':True,'codec_count':5,'codec_bytes':3672,'codec_direct_call_sites':35,'codec_unique_targets':11,'natural_lines':lines,'sharing_closure_body_bytes':[744,1472,1024],'sharing_closure_call_sites':23,'sharing_closure_unique_targets':len(closure_targets),'sharing_closure_remaining_line_mismatches':limits,'unresolved_pointer_objects_retained':sum(r['unresolved_payload_closure']for r in pointers),'larger_donation_caller_proven_equivalent':False,'retained_full_bodies':10,'retained_calls':26,'retained_literals':5,'comparison_receipts':17441,'donation_steps':10,'encoded_transaction_fields':8644,'verified_signatures':17204,'authentic_fee_config_history':hist,'current_handlers':31,'completion_rows':150,'handler_counts':comp['counts'],'all_program_receipts':53735,'ci_candidate_commands':10,'other_program_status_and_completion_unchanged':True,'new_builds':0,'new_runtime_replays':0,'full_original_byte_equality':False,'findings':[]}
if __name__=='__main__':print(json.dumps(check(),indent=2,sort_keys=True))
