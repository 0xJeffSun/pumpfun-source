"""Freeze one source-only hypothesis; no shared edits, compiler or target runtime."""
import difflib,hashlib,json,struct
from pathlib import Path
R=Path.cwd();W=R/'work/metaplex-unified-guard-review';P=R/'repro/pump/metaplex-candidate-build-12-review'
H=lambda b:hashlib.sha256(b).hexdigest()
s=(P/'utilize12.rs').read_text();from_guard='    if number_of_uses == 0 || number_of_uses > metadata_uses.total {';guard='''    if number_of_uses == 0
        || number_of_uses > metadata_uses.total
        || number_of_uses > metadata_uses.remaining
    {''';assert s.count(from_guard)==1;s=s.replace(from_guard,guard)
receipt=json.loads((R/'repro/pump/metaplex-candidate-build-11/patch-source-inputs.json').read_text());expected=receipt['patched']['programs/token-metadata/program/src/processor/uses/utilize.rs'];assert H(s.encode())==expected
old='''    let remaining_uses = metadata_uses
        .remaining
        .checked_sub(number_of_uses)
        .ok_or(MetadataError::NotEnoughUses)?;'''
new='    let remaining_uses = metadata_uses.remaining - number_of_uses;';assert s.count(old)==1;t=s.replace(old,new)
(W/'utilize11.rs').write_text(s);(W/'utilize-proposed.rs').write_text(t)
a=s.index(guard);z=s.index('    if approved_authority_is_using {',a)
(W/'reviewed.fragment.rs').write_text(t[a:t.index('    if approved_authority_is_using {',a)])
(W/'single-change.patch').write_text(''.join(difflib.unified_diff(s.splitlines(True),t.splitlines(True),fromfile='accepted11/utilize.rs',tofile='hypothesis/utilize.rs')))
raw=(R/'evidence/dependencies/token_metadata/deployed.so').read_bytes();assert H(raw)=='31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011'
pcs=[238800,238808,238816,238824,238832,238840,238856,238864,238872,238880,238888,238896,238904,238912,238920,238928,238936,238944]
anchors=[]
for a in pcs:
 b=raw[a:a+8];op,reg,off,imm=struct.unpack('<BBhi',b);v={'file_offset':a,'raw':b.hex(),'opcode':op,'dst':reg&15,'src':reg>>4,'displacement':off,'immediate':imm}
 if op==0x18:v['raw']=raw[a:a+16].hex()
 if op in(0x15,0x2d,0x3d,0x05):v['branch_target_file_offset']=a+8+off*8
 if op==0x85:v['direct_call_target_file_offset']=a+8+imm*8
 anchors.append(v)
inputs=[P/'REPORT.md',P/'complete-body-decode.json',P/'metadata-error.rs',P/'result.json',P/'manifest.json',R/'repro/pump/metaplex-candidate-build-11/patch-source-inputs.json',R/'repro/pump/metaplex-candidate-build-11/source.patch']
out={'scope':'single source-only hypothesis; not compiled, integrated or accepted','accepted11_utilize_sha256':expected,'proposed_utilize_sha256':H(t.encode()),'original_sha256':H(raw),'original_utilize_body':{'file_start':236632,'file_end':241736,'sha256':H(raw[236632:241736])},'guard_and_cleanup_anchors':anchors,'error_conversion_source':{'path':str((P/'metadata-error.rs').relative_to(R)),'sha256':H((P/'metadata-error.rs').read_bytes()),'from':'ProgramError::Custom(e as u32)','NotEnoughUses_code':86},'external_inputs':{str(p.relative_to(R)):H(p.read_bytes()) for p in inputs},'all_u64_proof':'Guard false iff n!=0 and n<=total and n<=remaining. Thus 1<=n<=remaining<=2^64-1; subtraction remains in [0,2^64-2]. checked_sub is Some(remaining-n) and cannot take its error edge; replacing only that expression preserves ordered guard failure and subsequent effects.','new_builds':0,'new_runtime_executions':0,'native_layout_or_historical_source_identity':False}
(W/'evidence.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'single_change':True,'accepted11_source_sha256':expected,'proposal_sha256':out['proposed_utilize_sha256'],'original_body_sha256':out['original_utilize_body']['sha256']}))
