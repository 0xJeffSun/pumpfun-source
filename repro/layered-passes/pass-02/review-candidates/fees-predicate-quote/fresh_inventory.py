from pathlib import Path
import importlib.util,json,shutil
W=Path(__file__).resolve().parent
for n in ['candidate.so','symbols.so']:shutil.copyfile(W/n,W/'reference'/n)
spec=importlib.util.spec_from_file_location('fresh',W/'reference/inspect_candidate.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
for n,v in m.run().items():(W/n).write_text(json.dumps(v,indent=2)+'\n')
print('Fresh complete inventory and donation caller proof saved')
