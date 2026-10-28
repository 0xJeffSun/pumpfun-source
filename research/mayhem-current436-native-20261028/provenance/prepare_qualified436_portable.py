from pathlib import Path
import hashlib,json,shutil
W=Path(__file__).resolve().parent;P=W/'mayhem-qualified436-native';D=P/'controller-portable';shutil.copytree(P/'controller-current-paths',D)
read=lambda p:json.loads(p.read_bytes());save=lambda p,v:p.write_text(json.dumps(v,indent=2)+'\n',encoding='utf-8')
old=read(D/'historical-macro.json');deps=Path(old['path']).parent
save(D/'historical-macro.json',dict(macro=dict(path='anchor_attribute_program.dll',sha256=old['sha256']),host_dependencies={Path(n).relative_to(deps).as_posix():h for n,h in old['host_dependencies'].items()}))
text=(D/'build.py').read_text(encoding='utf-8')
a="        historical = read(HERE / 'historical-macro.json')\n"
b="        historical = read(HERE / 'historical-macro.json')\n        host_root = args.historical_macro_directory.resolve()\n        historical = dict(path=str(host_root / safe(historical['macro']['path'])), sha256=historical['macro']['sha256'], host_dependencies={str(host_root / safe(n)):h for n,h in historical['host_dependencies'].items()})\n"
assert text.count(a)==1;text=text.replace(a,b)
a="    parser.add_argument('--kit-version', default='10.0.26100.0')"
assert text.count(a)==1;text=text.replace(a,"    parser.add_argument('--historical-macro-directory', type=Path, required=True)\n"+a)
text=text.replace("scope='Fresh dependency and root build; native Windows compiler, Linux target libraries.'", "scope='Fresh target dependencies and root; reused historical host macro/dependencies; native Windows compiler, Linux target libraries.'")
(D/'build.py').write_text(text,encoding='utf-8',newline='\n')
save(P/'portable-controller-change.json',dict(parent='controller-current-paths',changes=['Replace absolute historical host paths by a caller-supplied directory while retaining every file hash.','Clarify launch scope; no compiler argument, source, metadata or linker-script change.'],files={n:hashlib.sha256((D/n).read_bytes()).hexdigest() for n in ['build.py','historical-macro.json']}))
print('Prepared portable directory lookup with',len(old['host_dependencies']),'unchanged historical host dependency pins')
