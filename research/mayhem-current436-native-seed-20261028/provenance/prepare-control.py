from pathlib import Path
import gzip,hashlib,json,re,shlex,shutil
W=Path(__file__).resolve().parent;P=W/'mayhem-qualified436-native';D=W/'mayhem-allocator-provider';C=D/'controller';shutil.copytree(P/'controller-final',C)
sha=lambda b:hashlib.sha256(b).hexdigest()
line=(D/'upstream-stake-command.txt').read_text().strip();assert line.startswith('Running `') and line.endswith('`');command=shlex.split(line[len('Running `'):-1]);assert command[command.index('--crate-name')+1]=='solana_stake_interface' and 'codegen-units=2' in command
seed=[a.removeprefix('metadata=') for a in command if a.startswith('metadata=')];assert seed==['ac89a8a18de78c4a']
mp=C/'metadata-map.tsv';before=mp.read_bytes();rows=before.decode().splitlines();hits=[i for i,x in enumerate(rows) if x.split('\t')[2]=='solana_stake_interface'];assert len(hits)==1;i=hits[0];parts=rows[i].split('\t');assert parts==['f40a94ce996608ed','96cf2e8d7313c997','solana_stake_interface'];old=parts.copy();parts[1]=seed[0];rows[i]='\t'.join(parts);after=('\n'.join(rows)+'\n').encode();mp.write_bytes(after)
builder=C/'build.py';b=builder.read_bytes();assert b.count(sha(before).encode())==1;builder.write_bytes(b.replace(sha(before).encode(),sha(after).encode()))
(D/'seed-control.json').write_text(json.dumps(dict(upstream_revision='5fd637a13395c2d1de8a63457ab117adcadd7613',upstream_command=command,upstream_log_path='research/mayhem-provider-sharing/builds/recovered/stderr.gz',metadata_row_before=old,metadata_row_after=parts,source_files_changed=0,codegen_units_before_after=[2,2],change='One target compiler metadata seed; builder map-hash pin updated. No other compiler flags, source files, linker selectors or output bytes altered.'),indent=2)+'\n',encoding='utf-8')
print('Prepared single metadata-seed control from exact recorded compiler command')
