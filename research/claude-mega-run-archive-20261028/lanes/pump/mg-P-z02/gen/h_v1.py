import os
B = open(os.path.dirname(os.path.abspath(__file__)) + '/h5_body.txt').read().replace('pub fn execute<', 'pub fn execute_{S}<')
def R(t, a, b):
    assert t.count(a) == 1, a; return t.replace(a, b)
# B: recipient=&accounts[0] before `if native`; [1] after the Option check
b = R(B, "  if native {\n   crate::migrate::transfer_native(a.system_program.as_ref(),&a.holder_rewards,&accounts[0],*amount,&[seeds])?;",
         "  let recipient=&accounts[0];\n  if native {\n   crate::migrate::transfer_native(a.system_program.as_ref(),&a.holder_rewards,recipient,*amount,&[seeds])?;")
b = R(b, "let recipient=&accounts[0];let recipient_token_account=&accounts[1];", "let recipient_token_account=&accounts[1];")
# C: B + amount deref bound at loop top
c = b.replace('*amount', 'amount')
c = R(c, "  let recipient=&accounts[0];\n", "  let recipient=&accounts[0];let amount=*amount;\n")
# D: B with both indexes before if (h3-like) but [1] only in token branch via get? -> keep [1] before Option
d = R(b, "let recipient_token_account=&accounts[1];", "")
d = R(d, "   let source=a.holder_rewards_token_account", "   let recipient_token_account=&accounts[1];\n   let source=a.holder_rewards_token_account")
VARIANTS = {'b': b, 'c': c, 'd': d}
