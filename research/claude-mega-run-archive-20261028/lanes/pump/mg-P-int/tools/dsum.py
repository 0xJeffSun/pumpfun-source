import json,sys
from pathlib import Path
W=Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work')
for name in sys.argv[1:]:
    d=json.loads((W/'deliveries'/name/'delivery.json').read_text())
    g=d.get('gains',[]); 
    print(f"{name}: n={d.get('normalized')} raw={d.get('raw')} gains={len(g)} {' '.join(g) if isinstance(g,list) else g} losses={d.get('losses')} rl={d.get('raw_losses')} rg={d.get('raw_gains')} rv={d.get('runtime_valid')} syn={d.get('synthetic_layout')} base={str(d.get('base_round'))} bsha={str(d.get('base_unstripped_sha256'))[:10]}")
    print('   files:', ','.join(d.get('files_changed',[]))[:300])
    print('   summary:', str(d.get('summary'))[:600])
