from pathlib import Path
import subprocess,tarfile,json
W=Path('/workspace/fees-recovery');p=W/'source-crank/programs/pump-fees/src/lib.rs'
base=p.read_text()
call='anchor_lang::solana_program::program::invoke(&ix,&infos)'
old='let native_result:Result<()>=try {'+call+'?;};'
assert base.count(old)==1
variants={}
for hint in ['likely','unlikely']:
    for predicate in ['is_ok','is_err']:
        condition='core::intrinsics::'+hint+'(native_raw.'+predicate+'())'
        good='Ok(())';bad='Err(anchor_lang::error::Error::from(native_raw.unwrap_err()))'
        yes,no=(good,bad) if predicate=='is_ok' else (bad,good)
        replacement='let native_raw='+call+'; let native_result:Result<()>=if '+condition+'{'+yes+'}else{'+no+'};'
        variants[hint+'-'+predicate]=base.replace(old,replacement)
try:
    for label,source in variants.items():
        name='crank583-branch-'+label;p.write_text(source)
        result=subprocess.run(['python3',str(W/'build_crank.py'),name],stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
        print(name,result.returncode,result.stdout.decode(),flush=True)
        dest=W/name
        with tarfile.open(dest/'source.tar.gz','w:gz') as archive:
            for item in sorted((W/'source-crank').rglob('*')):
                if item.is_file():archive.add(item,arcname=item.relative_to(W/'source-crank'))
        if result.returncode==0:
            subprocess.run(['python3',str(W/'measure_crank.py'),str(dest/'symbols.so'),str(dest/'measure.json')],check=True)
finally:p.write_text(base)
