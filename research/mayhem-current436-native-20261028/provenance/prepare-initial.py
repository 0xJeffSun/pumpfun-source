"""Prepare exact current source with an explicit retained native recipe control."""
from pathlib import Path
import difflib,gzip,hashlib,json,shutil
W=Path(__file__).resolve().parent;P=W/'mayhem-qualified436-native';BASE=W/'mayhem-current-cpi-order-control/publication/controller';D=P/'controller';D.mkdir(exist_ok=False)
sha=lambda b:hashlib.sha256(b).hexdigest()
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf-8')
names=['build.py','wrapper.rs','metadata-map.tsv','path-map.tsv','linker.rs','ordered-native.ld','default.ld','sdk-components.json.gz','target-components.json','vendor-inputs.json','host-tools.json']
for n in names:shutil.copyfile(BASE/n,D/n)
S=P/'source/programs/mayhem';pins=json.loads((P/'upstream/composed-inputs.json').read_bytes());rows=[]
for n,h in sorted(pins.items()):
    b=(S/n).read_bytes();assert sha(b)==h;f=D/'sources'/(n+'.gz');f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(gzip.compress(b,mtime=0));rows.append(dict(path=n,bytes=len(b),sha256=h))
save(D/'source-inputs.json',dict(source_files=rows))
macro=W/'mayhem-whole-parser/host-build-03/target/release/anchor_attribute_program.dll';macro_hash='f27a8319f76f19654145bac61c5076745fd667e3167221f38e904d1024616551';assert sha(macro.read_bytes())==macro_hash
host_deps=macro.parent/'deps';hostpins={str(p):sha(p.read_bytes()) for p in sorted(host_deps.iterdir()) if p.suffix in ('.dll','.rlib','.rmeta')};assert hostpins
wrapper=(D/'wrapper.rs').read_text(encoding='utf-8');before=wrapper
old='''        let matched: Vec<Vec<&str>> = map.lines().map(|line| line.split('\\t').collect()).filter(|parts: &Vec<&str>| parts.len() == 3 && parts[0] == old && parts[2] == crate_name).collect();'''
new='''        let mut matched: Vec<Vec<&str>> = map.lines().map(|line| line.split('\\t').collect()).filter(|parts: &Vec<&str>| parts.len() == 3 && parts[0] == old && parts[2] == crate_name).collect();
        // The current Cargo.toml adds anchor-lang path flags. For its four
        // affected units, retain the prior native control's unique seed.
        // The actual before/after arguments remain in every compiler receipt.
        if matched.is_empty() && ["anchor_lang", "anchor_spl", "curve_accounts", "mayhem_recovered"].contains(&crate_name) {
            matched = map.lines().map(|line| line.split('\\t').collect()).filter(|parts: &Vec<&str>| parts.len() == 3 && parts[2] == crate_name).collect();
        }'''
assert wrapper.count(old)==1;wrapper=wrapper.replace(old,new)
anchor='    let path = PathBuf::from(env::var_os("MAYHEM_WRAPPER_RECORDS").expect("records"));'
addition='''    if is_target && is_compile {
        let crate_name = command.windows(2).find(|w| w[0] == "--crate-name").unwrap()[1].to_str().unwrap().to_owned();
        if crate_name == "curve_accounts" {
            command.push(OsString::from("--extern"));
            command.push(OsString::from(format!("historical_anchor_program={}", env::var("MAYHEM_HISTORICAL_MACRO").unwrap())));
        }
        if crate_name == "curve_accounts" || crate_name == "mayhem_recovered" {
            command.push(OsString::from("-L"));
            command.push(OsString::from(format!("dependency={}", env::var("MAYHEM_HISTORICAL_DEPS").unwrap())));
        }
    }
'''
assert wrapper.count(anchor)==1;wrapper=wrapper.replace(anchor,addition+anchor);(D/'wrapper.rs').write_text(wrapper,encoding='utf-8',newline='\n')
save(D/'historical-macro.json',dict(path=str(macro),sha256=macro_hash,host_dependencies=hostpins,host_build_receipts=str(W/'mayhem-whole-parser/host-build-03'),scope='Reused previously compiled complete historical program macro; new target dependencies will be compiled from an empty target directory.'))
builder=(D/'build.py').read_text(encoding='utf-8');build_before=builder;anchor='        env.update(extra)'
addition='''        historical = read(HERE / 'historical-macro.json')
        require(sha(Path(historical['path'])) == historical['sha256'], 'historical macro differs')
        require(all(sha(Path(n)) == h for n, h in historical['host_dependencies'].items()), 'historical host dependencies differ')
        extra.update(MAYHEM_HISTORICAL_MACRO=historical['path'], MAYHEM_HISTORICAL_DEPS=str(Path(historical['path']).parent / 'deps'))
'''
assert builder.count(anchor)==1;builder=builder.replace(anchor,addition+anchor)
anchor="        result['status'] = 'SUCCEEDED'"
addition="        require(sha(Path(historical['path'])) == historical['sha256'] and all(sha(Path(n)) == h for n, h in historical['host_dependencies'].items()), 'historical macro/dependencies changed')\n        result['historical_macro_dependencies_unchanged'] = True\n"
assert builder.count(anchor)==1;builder=builder.replace(anchor,addition+anchor);(D/'build.py').write_text(builder,encoding='utf-8',newline='\n')
patch=''.join(difflib.unified_diff(before.splitlines(True),wrapper.splitlines(True),fromfile='parent/wrapper.rs',tofile='controller/wrapper.rs'))+''.join(difflib.unified_diff(build_before.splitlines(True),builder.splitlines(True),fromfile='parent/build.py',tofile='controller/build.py'))
(P/'controller.patch').write_text(patch,encoding='utf-8',newline='\n')
save(P/'controller-provenance.json',dict(parent_files={n:sha((BASE/n).read_bytes()) for n in names},controller_files={p.name:sha(p.read_bytes()) for p in D.iterdir() if p.is_file()},source_revision='18131c169d26d10fb0899bf42d981da2cb47aa45',source_files=67,scope='Exact qualified436 program sources with retained prior native metadata/path/link-order control plus explicit complete historical macro. This is NOT an assertion of the same upstream root metadata or linker recipe; measure output before interpreting. No target execution or original compiler input.'))
print('Prepared current67sourceinputs, explicit historical macro, and fresh-native control recipe')
