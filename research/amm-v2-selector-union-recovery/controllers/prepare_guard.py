from pathlib import Path
import shutil,subprocess,json
K=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-union');R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source')
shutil.copytree(K/'source-unioncandidate',K/'source-guard')
p=K/'source-guard/programs/pump-amm/src/state/volume_accumulator.rs';s=p.read_text();old='            require!(current_timestamp<=self.end_time,PumpAmmError::SupplyUpdateForFinishedRange);';new='            if current_timestamp>=self.start_time {require!(current_timestamp<=self.end_time,PumpAmmError::SupplyUpdateForFinishedRange);}'
assert s.count(old)==1;p.write_bytes(s.replace(old,new).encode())
print('Imported maintained H11 guard at existing line 171; selector unchanged',flush=True)
