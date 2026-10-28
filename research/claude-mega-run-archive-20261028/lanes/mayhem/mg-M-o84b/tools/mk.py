"""mkroot(name, edits, base): clone base root (APFS) and apply (relpath, old, new) edits; state.rs edits must be line-neutral."""
import os, shutil, subprocess
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b'
def mkroot(name, edits=(), base=L + '/roots/h4', line_neutral=('state.rs', 'instructions/pump_interface.rs')):
    dst = L + '/roots/' + name
    assert os.path.realpath(dst).startswith(L + '/roots/'), dst
    if os.path.exists(dst): shutil.rmtree(dst)
    subprocess.run(['cp', '-c', '-R', base, dst], check=True)
    src = dst + '/programs/mayhem/src/'
    for rel, old, new in edits:
        p = src + rel; s = open(p).read(); assert old in s, ('MISSING', rel, old[:100])
        if rel in line_neutral: assert old.count('\n') == new.count('\n'), ('line count', rel)
        s = s.replace(old, new, 1); open(p, 'w').write(s)
    return dst
