"""Verify the exact source composition, complete census, and final-image cases."""
from pathlib import Path
import argparse,base64,gzip,hashlib,io,json,re,sys,tarfile

if not __debug__:raise SystemExit('Verification requires assertions; run without -O.')
HERE=Path(__file__).resolve().parent
sha=lambda data:hashlib.sha256(data).hexdigest()
read=lambda name:json.loads(gzip.decompress((HERE/name).read_bytes())if name.endswith('.gz')else(HERE/name).read_bytes())

def apply_patch(files,patch):
    lines=patch.splitlines(keepends=True);i=0
    while i<len(lines):
        assert lines[i].startswith('--- a/');name=lines[i][6:].strip();i+=1
        assert lines[i]=='+++ b/'+name+'\n';i+=1
        old=files[name].decode().splitlines(keepends=True);new=[];cursor=0
        while i<len(lines)and not lines[i].startswith('--- a/'):
            match=re.fullmatch(r'@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@[^\n]*\n',lines[i]);assert match,lines[i]
            at=int(match[1])-1;assert at>=cursor;new+=old[cursor:at];i+=1;removed=[];added=[]
            while i<len(lines)and not lines[i].startswith(('@@','--- a/')):
                line=lines[i];assert line[0]in' +-';i+=1
                if line[0]in' -':removed.append(line[1:])
                if line[0]in' +':added.append(line[1:])
            assert len(removed)==int(match[2]or 1)and len(added)==int(match[4]or 1)
            assert old[at:at+len(removed)]==removed,(name,at)
            new+=added;cursor=at+len(removed)
        new+=old[cursor:];files[name]=''.join(new).encode()

def verify(repo,signatures):
    manifest=read('MANIFEST.json')
    for name,digest in manifest.items():assert sha((HERE/name).read_bytes())==digest,name
    result=read('RESULT.json');record=read('build-record.json')
    assert record['returncode']==0 and record['source_unchanged']
    assert result['source_sha256']==record['source_sha256']==record['source_after_sha256']
    for name,digest in result['source_sha256'].items():assert sha((HERE/'source'/name).read_bytes())==digest,name
    assert sha((HERE/'candidate.so').read_bytes())==result['candidate_sha256']==record['candidate_sha256']
    assert sha((HERE/'unstripped.so').read_bytes())==result['unstripped_sha256']==record['unstripped_sha256']
    assert '--release'in record['clean_command']and'--offline'in record['clean_command']and'sbpf-solana-solana'in record['clean_command']
    assert 'pump-recovered'in record['clean_command']and'pump-token-ext'in record['clean_command']
    commands=read('compiler-commands.json');assert len(commands)==2
    log=gzip.decompress((HERE/'rebuild.log.gz').read_bytes()).decode()
    for name in ['pump_token_ext','pump_recovered']:
        assert sum('--crate-name'in c and c[c.index('--crate-name')+1]==name for c in commands)==1
        assert 'Compiling '+name.replace('_','-')+' 'in log
    files={}
    with tarfile.open(fileobj=io.BytesIO(gzip.decompress((HERE/'composition/L39-primary.tar.gz').read_bytes())),mode='r:')as archive:
        for member in archive.getmembers():
            assert member.isfile()and not Path(member.name).is_absolute()and'..'not in Path(member.name).parts
            assert member.name not in files;files[member.name]=archive.extractfile(member).read()
    pinned=read('composition/L39-MANIFEST.json');assert len(files)==65
    for name,data in files.items():assert sha(data)==pinned['source/programs/pump/'+name]
    workspace={ 'programs/pump/'+name:data for name,data in files.items()}
    workspace['Cargo.lock']=files['Cargo.lock']
    workspace['Cargo.toml']=b'[workspace]\nmembers = ["programs/pump"]\nresolver = "2"\n\n[profile.release]\npanic = "abort"\noverflow-checks = true\nlto = false\ncodegen-units = 1\n'
    workspace['programs/pump/Cargo.toml']=files['Cargo.toml'].split(b'[profile.release]')[0]
    for number in result['applied_pr_order']:
        patch=(HERE/f'composition/patches/{number}.patch').read_bytes()
        assert sha(patch)==result['patch_sha256'][str(number)]
        apply_patch(workspace,patch.decode())
    assert {name:sha(data)for name,data in workspace.items()}==result['source_sha256']
    assert sha((repo/'evidence/original/pump/deployed.so').read_bytes())==result['original_sha256']
    assert sha((repo/'repro/reconstruction-status-2026-10-26/functions.tsv').read_bytes())==result['selected_windows_tsv_sha256']
    sys.path.insert(0,str(HERE/'tools'));import census
    census.ROOT=repo
    computed=census.census(HERE/'unstripped.so');saved=read('inventory.json.gz')
    assert computed==saved and computed['counts']==result['counts']
    assert result['counts']['normalized']==1019 and result['counts']['raw']==183
    comparison=read('composition/membership-comparison.json')
    for parent in ['555','560']:
        control=read('composition/control-'+parent+'-inventory.json.gz')
        for key in ['normalized_matches','raw_match']:
            current={row['start']for row in computed['windows']if row[key]};previous={row['start']for row in control['windows']if row[key]}
            assert {'gains':[hex(v)for v in sorted(current-previous)],'losses':[hex(v)for v in sorted(previous-current)]}==comparison[parent][key]
            assert not comparison[parent][key]['losses']
    sections=census.sections
    stripped=(HERE/'candidate.so').read_bytes();symbols=(HERE/'unstripped.so').read_bytes()
    for name in ['.text','.rodata','.data.rel.ro','.data']:
        one=sections(stripped);two=sections(symbols)
        if name in one:
            assert name in two
            a,b=one[name],two[name];assert a['addr']==b['addr']and stripped[a['offset']:a['offset']+a['size']]==symbols[b['offset']:b['offset']+b['size']]
    total=transactions=signature_count=0
    if signatures:from solders.transaction import Transaction
    def walk(value):
        nonlocal transactions,signature_count
        if isinstance(value,dict):
            if 'transaction_base64'in value:
                raw=base64.b64decode(value['transaction_base64'],validate=True);assert raw
                transactions+=1
                if signatures:
                    tx=Transaction.from_bytes(raw);tx.verify();assert all(tx.verify_with_results());signature_count+=len(tx.signatures)
            for item in value.values():walk(item)
        elif isinstance(value,list):
            for item in value:walk(item)
    for name in ['v2-focused','sweep','v3sell','constructor','quote-program','multihop']:
        report=read('runtime/'+name+'.json.gz');assert not report.get('mismatches',report.get('candidate_mismatches',[]))
        assert result['candidate_sha256']==report.get('candidate_sha256',result['candidate_sha256'])
        if name=='v2-focused':assert result['candidate_sha256']in report['inputs_sha256'].values()
        total+=len(report['cases']);walk(report)
        for row in report['cases']:
            outcomes=row.get('results',row.get('outcomes',row));original=outcomes['original'];candidate=outcomes['candidate']
            fields=report.get('compared_fields',['error','accounts','events','inner','return_data'])
            if name=='v3sell':fields=['error','accounts','inner_instructions','event_payloads','return_data']
            if name=='sweep':
                fields=['error','before','after']
                for key in ['inner_instructions','return_data']:assert original['metadata'][key]==candidate['metadata'][key]
                events=lambda r:[line for line in r['logs']if line.startswith('Program data: ')]
                assert events(original)==events(candidate)
            for key in fields:assert original[key]==candidate[key],(name,key)
    assert total==205 and transactions==454
    if signatures:assert signature_count==454
    print(json.dumps({'counts':result['counts'],'paired_cases':total,'executed_transactions':transactions,'signatures_reverified':signature_count if signatures else 'use --signatures','whole_elf_equal':False},indent=2))

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--repo',type=Path,default=HERE.parents[1]);parser.add_argument('--signatures',action='store_true');args=parser.parse_args();verify(args.repo.resolve(),args.signatures)
