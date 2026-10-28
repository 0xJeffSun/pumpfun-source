from pathlib import Path
import json,hashlib,datetime
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');P=R/'research/pump-feeconfig-decoder-recovery';SDK=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
pins=json.loads((P/'toolchain-pins.json').read_text());target=pins['target']
binaries={p:sha(SDK/p) for p in pins['sdk_binary_sha256']}
libraries={p:sha(SDK/'rust/lib/rustlib'/target/'lib'/p) for p in pins['target_library_sha256']}
assert binaries==pins['sdk_binary_sha256'] and libraries==pins['target_library_sha256']
assert len(libraries)==25 and sha(R/'scripts/pump_physical_source_wrapper.py')==pins['physical_wrapper_sha256']
home=Path('/home/ahi200/pumpfun-work/20261028-pump-curve-decoder/native-amm-cache/home')
assert not any(p.is_file() for p in home.rglob('*'))
result={'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Post-build identity check of the unchanged SDK/native wrapper and empty build HOME. This is not another compilation.','target':target,'sdk_binary_sha256':binaries,'target_library_sha256':libraries,'wrapper_sha256':sha(R/'scripts/pump_physical_source_wrapper.py'),'build_home_files':[]}
(P/'toolchain-check.json').write_text(json.dumps(result,indent=2)+'\n');print('SDK:6 tools,25 SBF libraries,wrapper and empty HOME authenticated')
