from pathlib import Path
import gzip,importlib.util
D=Path(__file__).resolve().parent;W=D.parent
s=importlib.util.spec_from_file_location('dyn_builder',W/'mayhem-amm-lifetimes/build_control.py');b=importlib.util.module_from_spec(s);s.loader.exec_module(b);b.L=D
label='02-rebound-layout';name='vendor/anchor-lang/src/lib.rs'
after=gzip.decompress((D/'controller-01-anchor-module-order/sources'/(name+'.gz')).read_bytes())
C=b.prepare(label,W/'mayhem-current441-native/source',{name:after})
(C/'ordered-native.ld').write_bytes((D/'ordered-module.ld').read_bytes())
b.run(label,C)
