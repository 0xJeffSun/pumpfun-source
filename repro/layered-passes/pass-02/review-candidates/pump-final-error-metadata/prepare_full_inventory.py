from pathlib import Path
import difflib,hashlib,json
W=Path('work/pump-final-error-metadata-build');p=Path('repro/layered-passes/pass-01/results/pump/source-tools/analyze.py');s=p.read_text();(W/'layer01_analyze_original.py').write_text(s)
a=s.index('def analyze(root=HERE):');b=s.index(' assert c.b[c.lo:c.hi]',a)
s=s[:a]+"def analyze_images(o,c,sym):\n"+s[b:]
a=s.index(" status=json.loads(");b=s.index(" result={",a);s=s[:a]+s[b:]
s=s.replace("'revision':'c1ffdd0667608d4755227e68aab9f27a7e9a0d37','scope':'accepted Pump568546 only; no target execution'", "'scope':'Fresh source-bound metadata build static inventory; symbol ownership triage only; excluded bodies remain opaque'")
s=s.replace("'source_bindings':source,",'').replace("'handler_dispositions':obligations,'partial_obligations':status['partially_implemented_handlers'],",'')
s=s[:s.index("if __name__=='__main__':")]
(W/'layer_inventory.py').write_text(s);(W/'layer_inventory.adapter.patch').write_text(''.join(difflib.unified_diff(p.read_text().splitlines(True),s.splitlines(True),fromfile='published/source-tools/analyze.py',tofile='static/layer_inventory.py')))
(W/'layer_inventory_adapter.json').write_text(json.dumps({'original_tool_path':str(p),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'scope':'Only image-loading API and historical source/status fields removed. Full binary window/section/relocation/call-fixed-point matching algorithm unchanged; no semantic exploration of excluded routines.'},indent=2)+'\n')
