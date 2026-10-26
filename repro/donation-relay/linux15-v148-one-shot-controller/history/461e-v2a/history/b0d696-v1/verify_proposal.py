#!/usr/bin/env python3
"""Static receipt verifier only. Never imports/runs the proposed controller or adapter."""
from pathlib import Path
import argparse, ast, hashlib, json
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_bytes())
def verify(root,seal):
    assert H(root/'manifest.json')==seal
    assert (root/'manifest.sha256').read_text().split()[0]==seal
    m=J(root/'manifest.json')['files']
    assert set(m)=={p.relative_to(root).as_posix() for p in root.rglob('*') if p.is_file() and p.relative_to(root).as_posix() not in ['manifest.json','manifest.sha256']}
    for n,r in m.items():
        p=root/n
        assert p.is_file() and not p.is_symlink() and p.stat().st_size==r['bytes'] and H(p)==r['sha256'],n
    return m

def main():
    p=argparse.ArgumentParser();p.add_argument('--expected-manifest-sha256',required=True);a=p.parse_args()
    m=verify(P,a.expected_manifest_sha256)
    parent=P/'reviewed282c'; verify(parent,'282c29aaf0be4136f8d62b17012b7510cca929855d224ea02a94c77598e19192')
    for name in ['controller.py','verify_proposal.py','reviewed282c/candidate_ledger.UNRUN.py','reviewed282c/candidate_elf.py','reviewed282c/raw_numeric.py']:
        ast.parse((P/name).read_text(),filename=name)
    plan=J(parent/'seed/PLAN.NOT_EXECUTABLE.json')
    members={p.relative_to(parent/'source15').as_posix():H(p) for p in (parent/'source15').rglob('*') if p.is_file()}
    assert members==plan['frozen_source'] and len(members)==23
    r=J(parent/'seed/retained/registry232-approved-map.json')
    assert len(r)==232 and sum(len(x['files']) for x in r)==7607
    assert len(J(parent/'seed/retained/Linux13/download/extracted/compiler-tools.json'))==61
    assert len(J(parent/'seed/retained/Linux13/download/extracted/capability.json')['legacy_sysroot_files'])==25
    wf=(P/'workflow.proposed.yml').read_text()
    assert wf.count('actions/checkout@11d5960a326750d5838078e36cf38b85af677262')==2
    assert wf.count('actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02')==1
    assert wf.count('python3 -B "$GITHUB_WORKSPACE/control/$CONTROLLER_PATH/controller.py"')==1
    assert 'scripts/measure_relay13_linux_v148.py' not in wf
    assert J(P/'authority.template.NOT_GRANTED.json')['root_reviewed_execution_authorized'] is False
    c=(P/'controller.py').read_text()
    assert c.count("a.counts['program_compiles'] += 1")==1
    assert c.count("a.counts['fetches'] += 1")==1
    assert c.count("a.counts['strips'] += 1")==1
    assert c.count("a.counts['adapter_runs'] += 1")==1
    assert 'target_post_static' not in c and 'from candidate_elf' not in c
    assert c.index("write(a.pub / 'observed-run-binding.json', binding)")<c.index("a.gate('compiler-acquisition'")
    assert c.index("check(build_failure is None and not after_failures")<c.index("a.counts['strips'] += 1")
    assert J(P/'PLAN.json')['execution_authorized_by_this_packet'] is False
    print(json.dumps(dict(status='STATIC_PROPOSAL_VERIFIED_UNEXECUTED',manifest_sha256=a.expected_manifest_sha256,files=len(m),source_inputs=23,registry_archives=232,registry_source_members=7607,compiler_records=61,legacy_records=25,workflow_changes_applied=0,new_builds=0,new_target_executions=0,network_requests=0,controller_invocations=0,adapter_invocations=0)))
if __name__=='__main__':main()
