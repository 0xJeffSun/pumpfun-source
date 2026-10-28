"""Helpers for O0084 event-tail variants on top of base-x02."""
F = 'src/instructions/pump_interface_v2.rs'
BASE = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/o84/base-x02/programs/mayhem/'
SRC = open(BASE + F).read()
_i = SRC.index(' let event=SellEvent{side:1,'); _j = SRC.index('\n', _i)
EVLINE = SRC[_i:_j]
_a = SRC.index(' let (sol_amount,sol_vault_balance,'); _b = SRC.index('\n };\n', _a) + 4
TUPLE = SRC[_a:_b]
FIELDS = EVLINE[len(' let event=SellEvent{'):-len('};')].split(',')
def ev(fields):
    return ' let event=SellEvent{' + ','.join(fields) + '};'
def move(fields, name, before):
    f = [x for x in fields if x.split(':')[0] != name]
    src = [x for x in fields if x.split(':')[0] == name][0]
    k = [i for i, x in enumerate(f) if x.split(':')[0] == before][0]
    return f[:k] + [src] + f[k:]
