#!/usr/bin/env python3
"""Behavioral differential regression harness. Read-only on candidates/source.
Runs every scripts/*_differential.py against its mapped candidate, parses
case_count + mismatches robustly (plain JSON or gzip output files, stdout fallback)."""
import os, sys, glob, json, gzip, subprocess, time, pathlib, concurrent.futures as cf

REPO = "/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source"
SCRATCH = "/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/5536bcf9-de4c-4b36-b7ea-df650cc87c74/scratchpad/B-diff"
os.makedirs(SCRATCH, exist_ok=True)

CAND = {
    "pump_fees": "repro/pump_fees/donation-event-account-v144/pump_fees_candidate.so",
    "pump_amm":  "repro/pump_amm/create-config-shared-methods-v144/candidate.so",
    "mayhem":    "repro/mayhem/twentyfour/mayhem_recovered.so",
    "pump":      "repro/pump/tokenkeg-two-curve-fortyeight/candidate.so",
}

def program_for(name):
    if name.startswith("fees_"): return "pump_fees"
    if name.startswith("pump_amm_"): return "pump_amm"
    if name.startswith("mayhem_"): return "mayhem"
    if name.startswith("pump_"): return "pump"
    return None

# Special extra-arg matrix (label suffix -> extra argv list)
SPECIAL = {
    "pump_amm_incentives_differential": [
        ("[sync]", ["--family", "sync"]),
        ("[admin]", ["--family", "admin"]),
        ("[claim]", ["--family", "claim"]),
    ],
    "pump_amm_resize_differential": [("", ["--creator"])],
    "mayhem_buy_differential": [("", ["--cases", "repro/mayhem/twenty/buy-cases.json"])],
    "mayhem_buy_v2_differential": [
        ("[native]", ["--cases", "repro/mayhem/twentytwo/buy-v2-cases.json", "--family", "native"]),
        ("[token]", ["--cases", "repro/mayhem/twentytwo/buy-v2-cases.json", "--family", "token"]),
        ("[token22]", ["--cases", "repro/mayhem/twentytwo/buy-v2-cases.json", "--family", "token22"]),
    ],
    "mayhem_sell_v2_differential": [
        ("[native]", ["--cases", "repro/mayhem/twentyone/sell-v2-cases.json", "--family", "native"]),
        ("[token]", ["--cases", "repro/mayhem/twentyone/sell-v2-cases.json", "--family", "token"]),
        ("[token22]", ["--cases", "repro/mayhem/twentyone/sell-v2-cases.json", "--family", "token22"]),
    ],
    "mayhem_pump_swap_differential": [
        ("[buy-native]", ["--cases", "repro/mayhem/twentyfour/buy-pump-swap-cases.json", "--instruction", "buy_pump_swap", "--family", "native"]),
        ("[buy-token]", ["--cases", "repro/mayhem/twentyfour/buy-pump-swap-cases.json", "--instruction", "buy_pump_swap", "--family", "token"]),
        ("[buy-token22]", ["--cases", "repro/mayhem/twentyfour/buy-pump-swap-cases.json", "--instruction", "buy_pump_swap", "--family", "token22"]),
        ("[sell-native]", ["--cases", "repro/mayhem/twentyfour/sell-pump-swap-cases.json", "--instruction", "sell_pump_swap", "--family", "native"]),
        ("[sell-token]", ["--cases", "repro/mayhem/twentyfour/sell-pump-swap-cases.json", "--instruction", "sell_pump_swap", "--family", "token"]),
        ("[sell-token22]", ["--cases", "repro/mayhem/twentyfour/sell-pump-swap-cases.json", "--instruction", "sell_pump_swap", "--family", "token22"]),
    ],
}

TIMEOUT = 330  # seconds per invocation

def parse_output_file(path):
    """Return (case_count, mismatch_count, note) from a runner output file."""
    try:
        raw = pathlib.Path(path).read_bytes()
    except Exception as e:
        return None, None, f"no-output-file:{e}"
    if raw[:2] == b"\x1f\x8b":
        try:
            raw = gzip.decompress(raw)
        except Exception as e:
            return None, None, f"gzip-fail:{e}"
    try:
        rep = json.loads(raw)
    except Exception as e:
        return None, None, f"json-parse-fail:{e}"
    cc = rep.get("case_count")
    if cc is None and isinstance(rep.get("cases"), list):
        cc = len(rep["cases"])
    mm = rep.get("mismatches")
    if isinstance(mm, list):
        mmc = len(mm)
    elif isinstance(mm, int):
        mmc = mm
    elif rep.get("mismatch_count") is not None:
        mmc = rep["mismatch_count"]
    else:
        mmc = None
    # capture first few mismatch entries if present as list of objects/indices
    sample = mm[:3] if isinstance(mm, list) else None
    return cc, mmc, sample

def run_one(label, program, candidate, script, extra):
    outdir = os.path.join(SCRATCH, label.replace("/", "_"))
    os.makedirs(outdir, exist_ok=True)
    outfile = os.path.join(outdir, "report.out")
    argv = [sys.executable, "-I", os.path.join("scripts", script), "--candidate", candidate, "--output", outfile] + extra
    # NOTE: -I not used because runners import sibling modules via PYTHONPATH=scripts; use plain.
    argv = [sys.executable, os.path.join("scripts", script), "--candidate", candidate, "--output", outfile] + extra
    env = dict(os.environ, PYTHONPATH="scripts")
    t0 = time.time()
    status = "PASS"
    note = ""
    try:
        p = subprocess.run(argv, cwd=REPO, env=env, capture_output=True, text=True, timeout=TIMEOUT)
        rc = p.returncode
        stdout, stderr = p.stdout, p.stderr
    except subprocess.TimeoutExpired as e:
        dur = time.time() - t0
        return label, {"program": program, "script": script, "extra": extra,
                       "case_count": None, "mismatches": None, "status": "TIMEOUT",
                       "note": f">{TIMEOUT}s", "duration_s": round(dur, 1),
                       "stdout_tail": (e.stdout or b"")[-800:].decode("utf-8","replace") if isinstance(e.stdout,bytes) else (e.stdout or "")[-800:],
                       "stderr_tail": (e.stderr or b"")[-800:].decode("utf-8","replace") if isinstance(e.stderr,bytes) else (e.stderr or "")[-800:]}
    dur = time.time() - t0
    cc, mmc, sample = parse_output_file(outfile)
    # stdout fallback for case_count/mismatches
    if cc is None:
        import re
        m = re.search(r'"case_count"\s*:\s*(\d+)', stdout)
        if m: cc = int(m.group(1))
        else:
            m = re.search(r'(\d+)\s+cases\s+(\d+)\s+mismatches', stdout)
            if m:
                cc = int(m.group(1)); mmc = int(m.group(2)) if mmc is None else mmc
    if rc != 0 and mmc not in (None, 0):
        status = "MISMATCH"
    elif rc != 0:
        # nonzero but no mismatches parsed -> error, unless it's the SystemExit(bool(mismatches)) convention
        if mmc == 0:
            status = "PASS"  # some exit nonzero spuriously; but 0 mismatches
        else:
            status = "ERROR"
            note = f"rc={rc}; " + (stderr.strip().splitlines()[-1] if stderr.strip() else "no stderr")
    else:
        status = "PASS"
    if mmc and mmc > 0:
        status = "MISMATCH"
    if cc is None and status == "PASS":
        status = "ERROR"
        note = f"could not parse case_count; rc={rc}; " + (stderr.strip().splitlines()[-1] if stderr.strip() else "")
    if dur > 300 and status != "TIMEOUT":
        note = (note + " ").strip() + " [SLOW]"
    res = {"program": program, "script": script, "extra": extra,
           "case_count": cc, "mismatches": mmc, "status": status,
           "note": note, "duration_s": round(dur, 1),
           "mismatch_sample": sample,
           "stdout_tail": stdout[-800:], "stderr_tail": stderr[-1200:], "rc": rc}
    return label, res

def main():
    scripts = sorted(glob.glob(os.path.join(REPO, "scripts", "*_differential.py")))
    jobs = []
    for sp in scripts:
        name = os.path.basename(sp)[:-3]  # strip .py
        script = os.path.basename(sp)
        prog = program_for(name)
        cand = CAND[prog]
        if name in SPECIAL:
            for suffix, extra in SPECIAL[name]:
                jobs.append((name + suffix, prog, cand, script, extra))
        else:
            jobs.append((name, prog, cand, script, []))
    print(f"total invocations: {len(jobs)}", flush=True)
    results = {}
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(run_one, *j): j[0] for j in jobs}
        done = 0
        for fut in cf.as_completed(futs):
            label, res = fut.result()
            results[label] = res
            done += 1
            print(f"[{done}/{len(jobs)}] {label}: cc={res['case_count']} mm={res['mismatches']} {res['status']} ({res['duration_s']}s) {res['note']}", flush=True)
    with open(os.path.join(SCRATCH, "results_raw.json"), "w") as f:
        json.dump(results, f, indent=2)
    print("DONE", flush=True)

if __name__ == "__main__":
    main()
