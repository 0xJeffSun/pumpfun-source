#!/usr/bin/env python3
"""Surfpool runner harness. All *_surfpool.py are pump_* -> pump candidate."""
import os, sys, glob, json, gzip, subprocess, time, pathlib, concurrent.futures as cf

REPO = "/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source"
SCRATCH = "/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/5536bcf9-de4c-4b36-b7ea-df650cc87c74/scratchpad/B-surf"
os.makedirs(SCRATCH, exist_ok=True)
CAND = "repro/pump/tokenkeg-two-curve-fortyeight/candidate.so"
SURF = "work/localnet/surfpool"
TIMEOUT = 480

def parse_output_file(path):
    try:
        raw = pathlib.Path(path).read_bytes()
    except Exception as e:
        return None, None, f"no-output:{e}"
    if raw[:2] == b"\x1f\x8b":
        try: raw = gzip.decompress(raw)
        except Exception as e: return None, None, f"gzip-fail:{e}"
    try: rep = json.loads(raw)
    except Exception as e: return None, None, f"json-fail:{e}"
    cc = rep.get("case_count")
    if cc is None and isinstance(rep.get("cases"), list): cc = len(rep["cases"])
    mm = rep.get("mismatches")
    mmc = len(mm) if isinstance(mm, list) else (mm if isinstance(mm, int) else rep.get("mismatch_count"))
    sample = mm[:3] if isinstance(mm, list) else None
    return cc, mmc, sample

def classify(rc, stdout, stderr, cc, mmc):
    s = stderr + "\n" + stdout
    if "surfpool 1.6.1" in s and ("AssertionError" in s and "version" in s.lower()):
        return "SKIPPED", "surfpool unavailable: version != 1.6.1"
    if "No such file" in s and "surfpool" in s.lower():
        return "SKIPPED", "surfpool unavailable: binary missing"
    if "Unhandled original error" in s:
        line = [l for l in stderr.splitlines() if "Unhandled original error" in l]
        return "ERROR", "harness expected_error map incomplete: " + (line[-1].strip() if line else "Unhandled original error")
    if rc == 0 and cc is not None:
        return ("MISMATCH" if mmc else "PASS"), ""
    if mmc and mmc > 0:
        return "MISMATCH", ""
    # other failure
    tail = stderr.strip().splitlines()[-1] if stderr.strip() else f"rc={rc}"
    return "ERROR", f"rc={rc}: {tail}"

def run_one(script):
    name = script[:-3]
    outdir = os.path.join(SCRATCH, name)
    os.makedirs(outdir, exist_ok=True)
    outfile = os.path.join(outdir, "report.out")
    argv = ["python3", os.path.join("scripts", script), "--candidate", CAND, "--surfpool", SURF, "--output", outfile]
    env = dict(os.environ, PYTHONPATH="scripts")
    t0 = time.time()
    try:
        p = subprocess.run(argv, cwd=REPO, env=env, capture_output=True, text=True, timeout=TIMEOUT)
        rc, out, err = p.returncode, p.stdout, p.stderr
    except subprocess.TimeoutExpired as e:
        dur = time.time()-t0
        return name, {"program":"pump","script":script,"case_count":None,"mismatches":None,
                      "status":"TIMEOUT","note":f">{TIMEOUT}s","duration_s":round(dur,1),
                      "stderr_tail":"","stdout_tail":""}
    dur = time.time()-t0
    cc, mmc, sample = parse_output_file(outfile)
    status, note = classify(rc, out, err, cc, mmc)
    if dur > 300 and status != "TIMEOUT":
        note = (note+" [SLOW]").strip()
    return name, {"program":"pump","script":script,"case_count":cc,"mismatches":mmc,
                  "status":status,"note":note,"duration_s":round(dur,1),"rc":rc,
                  "mismatch_sample":sample,"stdout_tail":out[-600:],"stderr_tail":err[-1200:]}

def main():
    scripts = sorted(os.path.basename(p) for p in glob.glob(os.path.join(REPO,"scripts","*_surfpool.py")))
    print(f"surfpool runners: {len(scripts)}", flush=True)
    results = {}
    with cf.ThreadPoolExecutor(max_workers=2) as ex:
        futs = {ex.submit(run_one, s): s for s in scripts}
        done=0
        for fut in cf.as_completed(futs):
            name, res = fut.result()
            results[name]=res; done+=1
            print(f"[{done}/{len(scripts)}] {name}: cc={res['case_count']} mm={res['mismatches']} {res['status']} ({res['duration_s']}s) {res['note']}", flush=True)
    with open(os.path.join(SCRATCH,"results_surf_raw.json"),"w") as f:
        json.dump(results,f,indent=2)
    print("DONE", flush=True)

if __name__=="__main__":
    main()
