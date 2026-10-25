#!/usr/bin/env python3
"""Compare relocation-backed Rust source locations in pinned Pump ELFs."""
import hashlib
import gzip
import sys
from collections import Counter
import json
import re
import struct
from pathlib import Path
from elftools.elf.elffile import ELFFile

ROOT = next(p for p in Path(__file__).resolve().parents if (p / 'evidence/original/pump/deployed.so').is_file())
FOLDER = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / 'scripts'))
from build_source_manifest import source_manifest  # noqa: E402
TARGET = ROOT / 'evidence/original/pump/deployed.so'
BASE = ROOT / 'repro/pump/pr5-517-integration/candidate.so'
TRIAL = FOLDER / 'candidate.so'
WRAPPER = FOLDER / 'pump_rustc_source_path_wrapper.sh'
BASE_BUILD = ROOT / 'repro/pump/pr5-517-integration/build-a-build-comparison.json'
TRIAL_BUILD = FOLDER / 'build-comparison.json'
OUT = FOLDER / 'analysis.json'
sha = lambda b: hashlib.sha256(b).hexdigest()

def elf(path):
    with path.open('rb') as stream:
        f=ELFFile(stream)
        sections={name:f.get_section_by_name(name) for name in ('.text','.rodata','.data.rel.ro','.rel.dyn','.dynamic')}
        assert all(sections.values())
        raw=path.read_bytes()
        relocations={entry['r_offset'] for entry in sections['.rel.dyn'].iter_relocations()}
        layout={name:{'offset':s['sh_offset'],'size':s['sh_size'],'address':s['sh_addr']}
                for name,s in sections.items()}
        extent=max([f.header['e_shoff']+f.header['e_shentsize']*f.header['e_shnum']]
                   +[s['sh_offset']+s['sh_size'] for s in f.iter_sections() if s['sh_type']!='SHT_NOBITS'])
        return {'raw':raw,'sections':{name:s.data() for name,s in sections.items()},
                'layout':layout,'relocations':relocations,'extent':extent}

def offsets(blob, encoded):
    found=[];at=0
    while (at:=blob.find(encoded,at))!=-1:
        found.append(at);at+=1
    return found

def locations(e, names):
    ro=e['sections']['.rodata'];data=e['sections']['.data.rel.ro']
    roaddr=e['layout']['.rodata']['address'];dataaddr=e['layout']['.data.rel.ro']['address']
    rows=[]
    for name in sorted(names):
        encoded=name.encode('ascii')
        for at in offsets(ro,encoded):
            virtual=roaddr+at;pointer=(virtual<<32).to_bytes(8,'little')
            for i in offsets(data,pointer):
                address=dataaddr+i
                if address not in e['relocations'] or i+24>len(data):continue
                length=struct.unpack_from('<Q',data,i+8)[0]
                has_nul=length==len(encoded)+1 and ro[at+len(encoded):at+len(encoded)+1]==b'\0'
                if length!=len(encoded) and not has_nul:continue
                line,column=struct.unpack_from('<II',data,i+16)
                assert 0<line<100000 and 0<column<10000
                rows.append({'source_path':name,'line':line,'column':column,
                             'stored_path_length':length,'trailing_nul_included':has_nul,
                             'record_address':hex(address)})
    return sorted(rows,key=lambda x:(x['source_path'],x['line'],x['column'],x['record_address']))

def normalized_bpf(data):
    out=bytearray(data);i=0
    while i+8<=len(out):
        op=out[i]
        if op in (0x18,0x85):out[i+4:i+8]=bytes(4)
        if op==0x18 and i+16<=len(out):out[i+12:i+16]=bytes(4);i+=16
        else:i+=8
    return out

def triples(rows,prefix):
    return {(r['source_path'].removeprefix(prefix),r['line'],r['column']) for r in rows}

def main():
    manifest_path=FOLDER/'manifest-sha256.json'
    manifest=json.loads(manifest_path.read_text()) if manifest_path.exists() else None
    actual={p.name:sha(p.read_bytes()) for p in FOLDER.iterdir()
            if p.is_file() and p.name not in
            ('manifest-sha256.json','README.md','snapshot_verify.py')}
    assert manifest is None or actual==manifest
    invocation=json.loads((FOLDER/'invocation.json').read_text())
    assert invocation['wrapper_sha256']==sha(WRAPPER.read_bytes())
    assert invocation['source_commit']=='6ed6bf75871e6c337f870f4ea557e1d96ff46e23'
    assert invocation['wrapper_scope']=='Only --crate-name pump_recovered receives --remap-path-prefix=src=programs/pump/src'
    base_build=json.loads(BASE_BUILD.read_text());trial_build=json.loads(TRIAL_BUILD.read_text())
    assert base_build['source_sha256']==trial_build['source_sha256']
    assert base_build['rustc_sha256']==trial_build['rustc_sha256']
    assert base_build['sdk_source_sha256']==trial_build['sdk_source_sha256']
    assert source_manifest(ROOT / 'programs/pump', ROOT / 'programs/pump', ROOT,
                           cwd=ROOT)==trial_build['source_sha256']
    attempt=json.loads((FOLDER / 'build-attempt.json').read_text())
    assert attempt['returncode']==0 and attempt['source_unchanged']
    assert attempt['source_sha256']==trial_build['source_sha256']
    assert sha(gzip.decompress((FOLDER / 'build.log.gz').read_bytes()))==trial_build['build_log_sha256']
    assert trial_build['selected_toolchain']=='v1.44'
    own={name.removeprefix('programs/pump/') for name in base_build['source_sha256']
         if name.startswith('programs/pump/src/') and name.endswith('.rs')}
    target,base,trial=map(elf,(TARGET,BASE,TRIAL))
    assert sha(base['raw'])==base_build['comparison']['candidate_sha256']
    assert sha(trial['raw'])==trial_build['comparison']['candidate_sha256']
    assert sha(target['raw'])==base_build['comparison']['original_sha256']==trial_build['comparison']['original_sha256']
    target_names={m.group().decode() for m in re.finditer(
        rb'programs/pump/src/[A-Za-z0-9_./-]{1,120}?\.rs',target['sections']['.rodata'])}
    base_rows=locations(base,own)
    trial_rows=locations(trial,{'programs/pump/'+name for name in own})
    target_rows=locations(target,target_names)
    base_lib=locations(base,{'src/lib.rs'})
    trial_unremapped_lib=locations(trial,{'src/lib.rs'})
    trial_remapped_lib=[r for r in trial_rows if r['source_path']=='programs/pump/src/lib.rs']
    moved=Counter((r['line'],r['column']) for r in base_lib)-Counter(
        (r['line'],r['column']) for r in trial_unremapped_lib)
    assert moved==Counter((r['line'],r['column']) for r in trial_remapped_lib)
    base_pump_rows=[r for r in base_rows if r['source_path']!='src/lib.rs' or
                    moved[(r['line'],r['column'])]>0]
    assert len(target_rows)==54 and len(base_rows)==127
    assert len(base_pump_rows)==len(trial_rows)==91
    assert len(trial_unremapped_lib)==36 and len(trial_remapped_lib)==4
    program_lines=[i for i,line in enumerate((ROOT/'programs/pump/src/lib.rs').read_text().splitlines(),1) if line.strip()=='#[program]']
    assert len(program_lines)==1
    assert any(r['line']==program_lines[0] and r['column']==1 for r in trial_remapped_lib)
    base_triples=triples(base_pump_rows,'src/')
    trial_triples=triples(trial_rows,'programs/pump/src/')
    target_triples=triples(target_rows,'programs/pump/src/')
    assert base_triples==trial_triples
    common=sorted({p for p,_,_ in target_triples}&{p for p,_,_ in trial_triples})
    overlaps=sorted(target_triples&trial_triples)
    sections={}
    for key,e in [('target',target),('base',base),('remapped',trial)]:
        sections[key]={'elf_extent':e['extent'],'file_bytes':len(e['raw']),
                       'sha256':sha(e['raw']),'sections':e['layout'],
                       'relocation_count':len(e['relocations'])}
    a=base['sections']['.text'];b=trial['sections']['.text']
    result={'scope':'Offline controlled Pump-crate-only Rust path remap; same 37 compiler-input source hashes and v1.44 rustc. Relocation-backed 24-byte source records only; no historical-flag inference or whole-binary identity.',
            'base_commit':'8384638f022e5eeef07d7ef31fd3506dbc0cf7ab',
            'source_input_count':len(base_build['source_sha256']),
            'source_sha256':base_build['source_sha256'],
            'rustc_sha256':trial_build['rustc_sha256'],
            'wrapper_sha256':sha(WRAPPER.read_bytes()),
            'build_comparison_sha256':{'base':sha(BASE_BUILD.read_bytes()),'remapped':sha(TRIAL_BUILD.read_bytes())},
            'binary':sections,
            'section_deltas':{'remapped_minus_base':{name:trial['layout'][name]['size']-base['layout'][name]['size'] for name in base['layout']}, 'remapped_minus_target':{name:trial['layout'][name]['size']-target['layout'][name]['size'] for name in target['layout']}, 'elf_extent_remapped_minus_target':trial['extent']-target['extent'],'relocations_remapped_minus_target':len(trial['relocations'])-len(target['relocations'])},
            'text_base_vs_remap':{'same_size':len(a)==len(b),
                                  'raw_different_positions':sum(x!=y for x,y in zip(a,b)),
                                  'bpf_immediate_normalized_different_positions':sum(x!=y for x,y in zip(normalized_bpf(a),normalized_bpf(b)))},
            'locations':{'target':target_rows,'base_source_shaped':base_rows,'base_pump_attributed':base_pump_rows,'remapped':trial_rows,
                         'counts':{'target_pump':len(target_rows),'base_source_shaped':len(base_rows),'base_pump_attributed':len(base_pump_rows),'remapped_pump':len(trial_rows),'unremapped_generic_src_lib':len(trial_unremapped_lib)},
                         'moved_lib_records':[list(x) for x in sorted(moved.elements())],
                         'parser_control':{'known_program_attribute_line':program_lines[0], 'remapped_lib_location_matches':True},
                         'common_paths_with_records':common,
                         'path_line_column_overlap':{'base_normalized':len(base_triples&target_triples),'remapped':len(overlaps)},
                         'overlapping_records':[list(x) for x in overlaps],
                         'base_and_remapped_relative_line_column_equal':base_triples==trial_triples,
                         'remapped_common_path_records_matching_length_no_nul':all(
                             r['stored_path_length']==len(r['source_path'].encode()) and not r['trailing_nul_included']
                             for r in trial_rows if r['source_path'].removeprefix('programs/pump/src/') in common)},
            'whole_programdata_equal':trial['raw']==target['raw']}
    if OUT.exists(): assert result==json.loads(OUT.read_text())
    else: OUT.write_text(json.dumps(result,indent=2)+"\n")
    print(json.dumps({'base_sha256':sections['base']['sha256'],'remapped_sha256':sections['remapped']['sha256'],
                      'target_sha256':sections['target']['sha256'],'location_counts':result['locations']['counts'],
                      'common_paths':common,'overlap':len(overlaps),'text_base_vs_remap':result['text_base_vs_remap'],
                      'whole_programdata_equal':result['whole_programdata_equal']},indent=2))

if __name__=='__main__':main()
