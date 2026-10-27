"""Read-only compiler launch guard that accounts for reclaimable file cache."""
import json, subprocess, time
GIB=1024**3

def assess(current, limit, stats):
    required=('anon','inactive_file','file_dirty','file_writeback')
    if current<0 or limit<=0 or any(k not in stats or stats[k]<0 for k in required):
        raise ValueError('Missing or invalid cgroup memory counters')
    reclaimable=max(0,stats['inactive_file']-stats['file_dirty']-stats['file_writeback'])
    if reclaimable>current:raise ValueError('Inconsistent cgroup memory counters')
    pressure=current-reclaimable
    allowed=(pressure<3*GIB and stats['anon']<5*GIB//2) if limit>=6*GIB else current<3*GIB
    return {'allowed':allowed,'current':current,'limit':limit,'anon':stats['anon'],'clean_inactive_file_estimate':reclaimable,'pressure_estimate':pressure,'policy':'6GiB: pressure<3GiB and anon<2.5GiB; smaller: current<3GiB','one_heavy_compiler_per_lane_required':True}

def snapshot():
    for attempt in range(3):
        raw=subprocess.check_output(['podman','exec','codex-fees-next-d99d','sh','-c','cat /sys/fs/cgroup/memory.current /sys/fs/cgroup/memory.max /sys/fs/cgroup/memory.stat'],text=True)
        lines=raw.splitlines()
        try:
            current,limit=map(int,lines[:2]);stats={k:int(v)for k,v in (x.split()for x in lines[2:])};return assess(current,limit,stats)
        except (ValueError,TypeError):
            if attempt==2:raise
            time.sleep(.1)
    raise RuntimeError('No cgroup snapshot')

if __name__=='__main__':
    result=snapshot();print(json.dumps(result));raise SystemExit(0 if result['allowed']else 1)
