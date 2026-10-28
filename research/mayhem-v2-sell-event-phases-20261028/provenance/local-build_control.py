from pathlib import Path
import importlib.util,sys
D=Path(__file__).resolve().parent;W=D.parent
s=importlib.util.spec_from_file_location('v2_native_build',W/'mayhem-amm-lifetimes/build_control.py');b=importlib.util.module_from_spec(s);s.loader.exec_module(b);b.L=D
def run(label,overrides=None,source=None):return b.run(label,b.prepare(label,source or D/'source-current439',overrides))
if __name__=='__main__':run(sys.argv[1])
