#!/usr/bin/env python3
"""Exercise the maintained producer's actual fail-closed AST under -O."""

import ast
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
LEGACY_PRODUCER = ROOT / "scripts/pump_amm_cashback_differential.py"
PRODUCER = Path(__file__).resolve().parent / "produce_cashback_receipt.py"


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def main():
    legacy_tree = ast.parse(LEGACY_PRODUCER.read_text(encoding="utf-8"),
                            filename=str(LEGACY_PRODUCER))
    legacy_asserts = [node for node in ast.walk(legacy_tree) if isinstance(node, ast.Assert)]
    legacy_diffs = []
    for node in ast.walk(legacy_tree):
        if isinstance(node, ast.Assign):
            if any(isinstance(target, ast.Name) and target.id == "diff" for target in node.targets):
                legacy_diffs.append(node.value)
    require(len(legacy_asserts) == 2, "legacy signature and mismatch assertions")
    require(len(legacy_diffs) == 1, "legacy outcome-difference expression")
    legacy_gate = ast.fix_missing_locations(ast.Module(body=[legacy_asserts[-1]], type_ignores=[]))
    exec(compile(legacy_gate, str(LEGACY_PRODUCER), "exec", optimize=2),
         {"d": {"mismatches": [7]}})
    legacy_expression = ast.fix_missing_locations(ast.Expression(legacy_diffs[0]))
    legacy_compared = eval(compile(legacy_expression, str(LEGACY_PRODUCER), "eval", optimize=2),
                           {"x": {"logs": ["original"]}, "y": {"logs": ["candidate"]}})
    require(legacy_compared == [], "legacy ordered-log exclusion")

    tree = ast.parse(PRODUCER.read_text(encoding="utf-8"), filename=str(PRODUCER))
    require(not any(isinstance(node, ast.Assert) for node in ast.walk(tree)),
            "producer must not rely on assertions")

    gates = []
    diffs = []
    for node in ast.walk(tree):
        if isinstance(node, ast.If) and isinstance(node.test, ast.Subscript):
            if isinstance(node.test.value, ast.Name) and node.test.value.id == "d":
                gates.append(node)
        if isinstance(node, ast.Assign):
            if any(isinstance(target, ast.Name) and target.id == "diff" for target in node.targets):
                diffs.append(node.value)
    require(len(gates) == 1, "single explicit mismatch gate")
    require(len(diffs) == 1, "single outcome-difference expression")

    gate_module = ast.fix_missing_locations(ast.Module(body=[gates[0]], type_ignores=[]))
    rejected = 0
    try:
        exec(compile(gate_module, str(PRODUCER), "exec", optimize=2), {"d": {"mismatches": [7]}})
    except SystemExit:
        rejected += 1
    require(rejected == 1, "optimized mismatch gate")

    expression = ast.fix_missing_locations(ast.Expression(diffs[0]))
    namespace = {"x": {"logs": ["original"]}, "y": {"logs": ["candidate"]}}
    compared = eval(compile(expression, str(PRODUCER), "eval", optimize=2), namespace)
    require(compared == ["logs"], "ordered logs must participate in comparison")
    print(json.dumps({
        "assert_nodes": 0,
        "legacy_optimized_gate_bypassed": True,
        "legacy_ordered_logs_ignored": True,
        "optimized_mismatch_rejected": True,
        "ordered_logs_compared": True,
    }, sort_keys=True))


if __name__ == "__main__":
    main()
