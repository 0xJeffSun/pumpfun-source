"""Pure exact V3-to-V4 workflow endpoint transition; no root mutation."""
OLD='python -B repro/layered-passes/pass-24/ci-review-reconciliation-v3/verify.py --repo .'
NEW='python -B repro/layered-passes/pass-24/ci-review-reconciliation-v4/verify.py --repo .'
def workflow_transition(before,after):
 assert before.count(OLD)==1 and NEW not in before
 assert after==before.replace(OLD,NEW),'Only one literal v3-to-v4 endpoint replacement allowed'
 return after
