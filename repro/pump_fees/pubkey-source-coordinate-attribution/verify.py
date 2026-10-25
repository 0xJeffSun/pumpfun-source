#!/usr/bin/env python3
"""Verify archived Pubkey source attribution against reference ELF bytes, read-only."""
from pathlib import Path, PurePosixPath
import argparse, hashlib, io, json, struct, tarfile

PACKAGE=Path(__file__).resolve().parent
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--repo',type=Path,help='Repository with the captured original and published candidate')
parser.add_argument('--original',type=Path,help='Explicit captured Fees ELF; overrides repository reference')
parser.add_argument('--candidate',type=Path,help='Explicit published Fees candidate; overrides repository reference')
args=parser.parse_args()
sha=lambda data:hashlib.sha256(data).hexdigest()
read=lambda path:json.loads(path.read_text())
manifest=read(PACKAGE/'manifest-sha256.json')
assert set(manifest)=={p.name for p in PACKAGE.iterdir()if p.is_file()and p.name!='manifest-sha256.json'}
for path,digest in manifest.items():assert sha((PACKAGE/path).read_bytes())==digest,path
provenance=read(PACKAGE/'provenance.json')
archive_bytes=(PACKAGE/'research-evidence.tar.gz').read_bytes()
assert sha(archive_bytes)==provenance['research_archive_sha256']
with tarfile.open(fileobj=io.BytesIO(archive_bytes),mode='r:gz')as archive:
    members=archive.getmembers()
    assert all(m.isfile()and not PurePosixPath(m.name).is_absolute()and '..'not in PurePosixPath(m.name).parts for m in members)
    assert len({m.name for m in members})==len(members)
    files={m.name:archive.extractfile(m).read()for m in members}
assert sha(files['manifest-sha256.json'])==provenance['research_manifest_sha256']
historical=json.loads(files['manifest-sha256.json'])
assert len(historical)==provenance['research_sealed_files']==32
assert set(files)==set(historical)|{'manifest-sha256.json'}
for path,digest in historical.items():assert sha(files[path])==digest,path
report=json.loads(files['attribution.json'])
assert not report['unique_historical_version_proven']and not report['historical_dependency_graph_proven']
assert not report['build_recipe_proposed']
for crate in report['crates']:
    name='solana-pubkey-'+crate['version'];prefix='inputs/'+name
    data=files[prefix+'.crate'];index=json.loads(files[prefix+'/registry-index-record.json'])
    assert len(data)==crate['archive_bytes']
    assert sha(data)==crate['archive_sha256']==index['cksum']
    assert index['name']=='solana-pubkey'and index['vers']==crate['version']
    with tarfile.open(fileobj=io.BytesIO(data))as archive:
        names=[m.name for m in archive.getmembers()];assert len(names)==len(set(names))
        for path,entry in crate['files'].items():
            source=archive.extractfile(name+'/'+path).read()
            assert source==files[prefix+'/'+path]and sha(source)==entry['sha256']
    vcs=json.loads(files[prefix+'/.cargo_vcs_info.json'])
    assert vcs['git']['sha1']==crate['declared_vcs_commit']and vcs['path_in_vcs']==crate['declared_path_in_vcs']
for row in report['coordinate_checks']:
    for version,expected in row['source_coordinates'].items():
        lines=files['inputs/solana-pubkey-'+version+'/src/lib.rs'].decode().splitlines()
        text=lines[expected['line']-1]
        assert text==expected['text']and text.index('panic!')+1==expected['column']
for row in report['identical_source_blocks']:
    texts=[]
    for version,positions in row['lines'].items():
        lines=files['inputs/solana-pubkey-'+version+'/src/lib.rs'].decode().splitlines()
        text='\n'.join(lines[positions['first']-1:positions['last']]);text=text[text.index(row['declaration']):]
        assert sha(text.encode())==row['text_sha256'];texts.append(text)
    assert len(texts)==2 and texts[0]==texts[1]
repo=args.repo.resolve()if args.repo else next((p for p in PACKAGE.parents if(p/'evidence/original/pump_fees/deployed.so').is_file()),None)
paths={}
for role,explicit in [('original',args.original),('candidate',args.candidate)]:
    paths[role]=explicit.resolve()if explicit else(repo/report[role+'_path']if repo else None)
    assert paths[role]is not None,'Pass --repo or both --original and --candidate outside a repository'
elfs={role:path.read_bytes()for role,path in paths.items()}
for role,data in elfs.items():
    assert sha(data)==report[role+'_sha256']==provenance[role]['sha256']
    assert len(data)==provenance[role]['bytes']
prior=json.loads(files['inputs/prior-closure.json'])
for row in report['matching_helper_nodes']:
    assert row in prior['nodes']
    normalized=[]
    for role,data in elfs.items():
        start=row[role];size=row[role+'_bytes'];raw=data[start:start+size]
        assert raw==files[f'inputs/{role}-{start}.bin']and sha(raw)==row[role+'_raw_sha256']
        relocs={r['offset']:r for r in row[role+'_relocations']};normal=bytearray(raw)
        for offset in range(0,size,8):
            if raw[offset]==0x85 and raw[offset+1]==0x10 and relocs.get(offset,{}).get('type')!=10:
                normal[offset+4:offset+8]=bytes(4)
            if offset in relocs:
                typ=relocs[offset]['type']
                if typ==8 and raw[offset]==0x18:
                    normal[offset+4:offset+8]=bytes(4);normal[offset+12:offset+16]=bytes(4)
                elif typ==10 and raw[offset]==0x85:normal[offset+4:offset+8]=bytes(4)
        normalized.append(bytes(normal))
    assert normalized[0]==normalized[1]and row['candidate_relocations']==row['original_relocations']
for row in report['helper_relocation_evidence']:
    assert row in prior['relocation_targets']
    for role,data in elfs.items():
        record=row[role+'_record'];at=record['address'];pointer,length=struct.unpack_from('<QQ',data,at)
        assert pointer>>32==record['decoded_pointer']and length==record['length']
        assert sha(data[pointer>>32:(pointer>>32)+length])==record['pointee_sha256']
        if record['kind']=='source_location_record':
            assert struct.unpack_from('<II',data,at+16)==(record['line'],record['column'])
            assert data[at:at+24]==files[f'inputs/{role}-location-{at}.bin']
assert elfs['original']!=elfs['candidate']
print(json.dumps({'package_payload_files':len(manifest),'preserved_research_files':len(historical),
                  'cached_public_crate_archives':2,'exact_coordinate_pairs':2,'identical_source_blocks':4,
                  'complete_normalized_helper_windows':2,'source_candidate':'solana-pubkey 2.2.1 or a source-equivalent revision',
                  'unique_historical_version_proven':False,'full_byte_equality':False,
                  'downloads':0,'builds':0,'runtime_tests':0},indent=2))
