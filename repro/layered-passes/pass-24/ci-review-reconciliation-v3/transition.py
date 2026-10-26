"""Pure exact endpoint transition policy; no checkout mutation or execution."""
OLD='python -B repro/layered-passes/pass-24/ci-review-reconciliation-v2/verify.py --repo .'
NEW='python -B repro/layered-passes/pass-24/ci-review-reconciliation-v3/verify.py --repo .'
def workflow_transition(before,after):
 assert before.count(OLD)==1 and NEW not in before
 assert after==before.replace(OLD,NEW),'Only one literal v2-to-v3 endpoint replacement allowed'
 return after
