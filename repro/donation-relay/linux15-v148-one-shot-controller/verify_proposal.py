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
    verify(P/'history/461e-v2a','461e157f97bb9179bfb7b885f68710dc47121d14fc8306a07b5e70ac3502709d')
    verify(P/'history/fees-v2a-static-review','1b1eb4d8f0727bcfa74fbbc40a69cc8fbe23cc9e57b98b8dfe8ecede98353691')
    verify(P/'history/1f711-v2','1f711ca6b543bfd1576b5a1880087d86d83a16d8ac2bd5fb0c3099c2e43d6743')
    assert J(P/'history/1f711-verifier-exit1/runner-exit.json')['returncode']==1
    assert H(P/'history/461e-v2a/controller.py')==H(P/'history/1f711-v2/controller.py')
    verify(P/'history/b0d696-v1','b0d696c0cc03cf348636ec2dbcb45f846d98b6bad712f301f47f9a0beac363aa')
    verify(P/'history/fees-static-review-5f0e','5f0ed146035cea1f65352671759a945524e508a8a7723f41365114adfed6aa80')
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
    assert J(P/'authority.schema.json')['properties']['controller_sha256']['const']==H(P/'controller.py')
    assert J(P/'authority.template.NOT_GRANTED.json')['controller_sha256']==H(P/'controller.py')
    assert H(P/'workflow.proposed.yml')==H(P/'history/b0d696-v1/workflow.proposed.yml')
    cases=J(P/'static-helper-cases.json');assert cases['status']=='PASS_STATIC_HELPER_CASES' and cases['case_count']==27
    assert J(P/'static-helper-cases-runner-exit.json')['returncode']==0 and J(P/'static-helper-cases-runner-exit.json')['stderr_bytes']==0
    current=ast.parse(c);prior=ast.parse((P/'history/b0d696-v1/controller.py').read_text())
    defs=lambda t:{n.name:ast.dump(n,include_attributes=False) for n in t.body if isinstance(n,(ast.FunctionDef,ast.ClassDef))}
    before_defs,after_defs=defs(prior),defs(current)
    assert {n for n in before_defs if before_defs[n]!=after_defs.get(n)}=={'reject_overrides','acquire','registry_guard','verbose_units','execute','main'}
    assert not any(isinstance(n,ast.keyword) and n.arg in ['HOME','home','CODEX_HOME'] for n in ast.walk(current))
    gitcases=J(P/'git-static-helper-cases.json');assert gitcases['case_count']==36 and gitcases['Git_processes']==0
    for receipt in ['static-helper-cases-runner-exit.json','git-static-helper-cases-runner-exit.json']:
        r=J(P/receipt);assert r['returncode']==0 and r['stderr_bytes']==0 and r['controller_sha256']==H(P/'controller.py')
    previous=defs(ast.parse((P/'history/461e-v2a/controller.py').read_text()));nowdefs=defs(current)
    assert {n for n in previous if previous[n]!=nowdefs.get(n)}=={'execute'}
    gitlists=[n for n in ast.walk(current) if isinstance(n,ast.List) and n.elts and isinstance(n.elts[0],ast.Constant) and n.elts[0].value=='/usr/bin/git'];assert len(gitlists)==1
    for n in ast.walk(current):
        if isinstance(n,ast.Call) and isinstance(n.func,ast.Name) and n.func.id=='canonical_registry_source':assert len(n.args)==3
    print(json.dumps(dict(status='STATIC_PROPOSAL_VERIFIED_UNEXECUTED',manifest_sha256=a.expected_manifest_sha256,files=len(m),source_inputs=23,registry_archives=232,registry_source_members=7607,compiler_records=61,legacy_records=25,workflow_changes_applied=0,new_builds=0,new_target_executions=0,network_requests=0,controller_invocations=0,adapter_invocations=0)))
if __name__=='__main__':main()
