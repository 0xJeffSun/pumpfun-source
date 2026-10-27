from pathlib import Path
import hashlib,importlib.util,json
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-init-needed';D=P/'panic-candidate';D.mkdir(exist_ok=True)
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
Q=W/'mayhem-historical-framework/publication';s=importlib.util.spec_from_file_location('panic_helpers',Q/'context_helpers.py');q=importlib.util.module_from_spec(s);s.loader.exec_module(q)
current=q.layer.Elf(W/'mayhem-historical-root-compat/current-native-control/symbols.so');historical=q.layer.Elf(P/'build-02-after/symbols.so');original=q.layer.Elf(P/'original.so')
def body(e):
    syms=[s for s in e.symbols if s['table']=='.symtab' and s['name']=='custom_panic'];assert len(syms)==1;r=syms[0];return r,e.b[r['value']:r['value']+r['size']]
cs,cb=body(current);hs,hb=body(historical);o=next(r for r in q.read(W/'mayhem-whole-parser/publication/reference/prior-inventory.json.gz')['original_rows'] if r['id']=='O0199');ob=original.b[o['start']:o['end']]
sources=[]
for label,root in [('old',W/'mayhem-historical-borsh/locked-vendor/solana-define-syscall-3.0.0'),('current',W/'mayhem-native-build/vendor/solana-define-syscall-4.0.1')]:
    b=(root/'src/definitions.rs').read_bytes();ck=json.loads((root/'.cargo-checksum.json').read_bytes());assert ck['files']['src/definitions.rs']==ident(b)['sha256'];(D/(label+'-definitions.rs')).write_bytes(b);(D/(label+'-checksum.json')).write_bytes((root/'.cargo-checksum.json').read_bytes())
    line=next(l for l in b.decode().splitlines() if 'fn sol_panic_(' in l);sources.append(dict(label=label,source_root=str(root),definition=line,file=ident(b),package_sha256=ck['package']))
result=dict(current_symbol=cs,historical_symbol=hs,original_window=o,original_body=ident(ob),current_body=ident(cb),historical_body=ident(hb),current_equals_original=cb==ob,historical_prefix_equals_original=hb[:len(ob)]==ob,historical_suffix_hex=hb[len(ob):].hex(),sources=sources,scope='Static candidate only. The historical body has one additional exit instruction. sol_panic_ returns unit in3.0.0 and never in4.0.1. No modified-source build or runtime test has isolated this difference; no recovery or unique original source attribution claimed.',target_executions=0)
(D/'comparison.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8');print(json.dumps({k:result[k] for k in ('current_equals_original','historical_prefix_equals_original','historical_suffix_hex')}))
