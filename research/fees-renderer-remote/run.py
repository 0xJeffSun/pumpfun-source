#!/usr/bin/env python3
"""Reconstruct the interrupted Fees experiment and compare normal Cargo outputs.

Research only: no progress-table or maintained-selection changes are made.
"""
from pathlib import Path
from collections import Counter
from functools import lru_cache
import ast
import gzip
import hashlib
import importlib.util
import io
import json
import os
import re
import shutil
import subprocess
import sys
import tarfile
import time
import tomllib
import traceback
import urllib.request

REPO = Path(__file__).resolve().parents[2]
WORK = Path(os.environ.get("FEES_REMOTE_ROOT", "/tmp/fees-renderer-remote")).resolve()
EVIDENCE = WORK / "evidence"
SOURCE = WORK / "source-renderer"
VENDOR = WORK / "macro-vendor"
SDK = WORK / "sdk"
BASE_SHA = "aafecfeda4408193048bbd7df16afd6e95c493fc"
QUALIFIED_SHA = "252515f67ef86c07e3da8d4a4cc3ae2bcbd4728c"
SDK_SHA = "6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9"
ROOT_CALLBACKS = {
    "__fees_error_name": "recovered_fee_error_name",
    "__fees_error_into_error": "recovered_fee_error_into_error",
}

def require(ok, message):
    if not ok:
        raise RuntimeError(message)

def sha(data):
    return hashlib.sha256(data).hexdigest()

def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2) + "\n")

def download(url, path, expected=None):
    path.parent.mkdir(parents=True, exist_ok=True)
    digest = hashlib.sha256()
    request = urllib.request.Request(url, headers={"User-Agent": "fees-reproduction"})
    with urllib.request.urlopen(request, timeout=120) as response, path.open("wb") as output:
        while True:
            chunk = response.read(1024 * 1024)
            if not chunk:
                break
            digest.update(chunk)
            output.write(chunk)
    actual = digest.hexdigest()
    require(expected is None or actual == expected, "download digest: " + url)
    return {"url": url, "sha256": actual, "bytes": path.stat().st_size}

def restore_archive(path, destination):
    destination.mkdir(parents=True, exist_ok=True)
    with tarfile.open(path) as archive:
        for member in archive.getmembers():
            require(member.isfile() or member.isdir(), "unexpected source archive member")
            target = (destination / member.name).resolve()
            require(target.is_relative_to(destination.resolve()), "source archive traversal")
        archive.extractall(destination, filter="data")

def inputs(directory):
    return {p.relative_to(directory).as_posix(): sha(p.read_bytes())
            for p in sorted(directory.rglob("*")) if p.is_file()}

def prepare():
    EVIDENCE.mkdir(parents=True, exist_ok=True)
    prefix = ("https://raw.githubusercontent.com/shawkkkkk/pumpfun-source/"
              + BASE_SHA + "/research/fees-residual-current583-20261027/")
    records = []
    manifest_path = WORK / "baseline-manifest.json"
    records.append(download(prefix + "manifest.json", manifest_path))
    manifest = json.loads(manifest_path.read_text())
    for filename, directory in [("source-create.tar.gz", SOURCE),
                                ("macro-vendor.tar.gz", VENDOR)]:
        archive = WORK / filename
        records.append(download(prefix + filename, archive, manifest["files"][filename]))
        restore_archive(archive, directory)
    qualified = WORK / "qualified-symbols.so.gz"
    records.append(download(
        "https://raw.githubusercontent.com/shawkkkkk/pumpfun-source/"
        + QUALIFIED_SHA
        + "/research/fees-sweep-integration-20261027/builds/candidate/symbols.so.gz",
        qualified))
    require(sha(gzip.decompress(qualified.read_bytes()))
            == "c63bf0a47e0fba4a3845fde7c6f0056af1c592502432d7567e784eeb6de9dae3",
            "qualified source checkpoint artifact")
    sdk_archive = WORK / "platform-tools-v1.44.tar.bz2"
    records.append(download(
        "https://github.com/anza-xyz/platform-tools/releases/download/v1.44/"
        "platform-tools-linux-x86_64.tar.bz2", sdk_archive, SDK_SHA))
    SDK.mkdir()
    subprocess.run(["tar", "-xjf", str(sdk_archive), "-C", str(SDK)], check=True)
    require((SDK / "rust/bin/rustc").is_file(), "SDK archive layout")
    write_json(EVIDENCE / "downloads.json", records)

def transform():
    root_manifest = SOURCE / "Cargo.toml"
    text = root_manifest.read_text()
    text, count = re.subn(r'path\s*=\s*"[^"]*used-public"', 
                         'path = "' + VENDOR.as_posix() + '"', text)
    require(count == 1, "macro vendor override")
    require(text.count('"pump-fees-math"]') == 1, "workspace member list")
    text = text.replace('"pump-fees-math"]',
                        '"pump-fees-math", "fees-error-types", "fees-error-renderer"]')
    root_manifest.write_text(text)

    library = SOURCE / "programs/pump-fees/src/lib.rs"
    text = library.read_text()
    start = text.index("pub enum FeeError {")
    end = text.index("\n} }; }", start) + 2
    enum = text[start:end]
    variants = re.findall(
        r'#\[msg\(("(?:\\.|[^"\\])*")\)\]\s*(\w+)\s*=\s*(\d+)', enum)
    require(len(variants) == 37, "all FeeError variants")
    require(text.count("crate::define_fee_errors!();") == 1, "error re-export")
    text = text.replace("crate::define_fee_errors!();",
                        "pub use fees_error_types::FeeError;", 1)
    names = ",".join('FeeError::' + name + '=>"' + name + '".to_string()'
                     for message, name, number in variants)
    text += ("\npub fn recovered_fee_error_name(error:&FeeError)->String {match error {"
             + names + "}}\n")
    text += """
pub fn recovered_fee_error_into_error(error_code:FeeError)->anchor_lang::error::Error {
 anchor_lang::error::Error::from(anchor_lang::error::AnchorError {
  error_name:error_code.name(), error_code_number:error_code.into(),
  error_msg:error_code.to_string(), error_origin:None, compared_values:None
 })
}
"""
    library.write_text(text)

    types = SOURCE / "fees-error-types"
    (types / "src").mkdir(parents=True)
    (types / "Cargo.toml").write_text(
        '[package]\nname="fees-error-types"\nversion="0.1.0"\nedition="2021"\n'
        '[dependencies]\nanchor-lang="0.31.1"\n')
    clean_enum = re.sub(r'\s*#\[msg\((?:"(?:\\.|[^"\\])*")\)\]', "", enum)
    display = ",".join("Self::" + name + "=>write!(fmt, " + message + ")"
                       for message, name, number in variants)
    types_code = "#[derive(Debug,Clone,Copy)]\n#[repr(u32)]\n" + clean_enum + "\n"
    types_code += """
extern "Rust" {
 #[link_name="__fees_error_name"] fn host_error_name(error:&FeeError)->String;
 #[link_name="__fees_error_into_error"]
 fn host_error_into_error(error:FeeError)->anchor_lang::error::Error;
}
impl FeeError {
 #[inline(always)] pub fn name(&self)->String {unsafe {host_error_name(self)}}
}
impl From<FeeError> for u32 {
 #[inline(always)] fn from(e:FeeError)->u32 {e as u32+anchor_lang::error::ERROR_CODE_OFFSET}
}
impl From<FeeError> for anchor_lang::error::Error {
 #[inline(always)] fn from(error_code:FeeError)->anchor_lang::error::Error {
  unsafe {host_error_into_error(error_code)}
 }
}
"""
    types_code += ("impl std::fmt::Display for FeeError {"
                   "fn fmt(&self,fmt:&mut std::fmt::Formatter)->std::fmt::Result {match self {"
                   + display + "}}}\n")
    types_code += """
pub static CLAIM_RATE_MESSAGE:[u8;25]=*b"Claim rate limit exceeded";
#[inline(always)] pub fn claim_rate_message()->&'static str {
 unsafe {std::str::from_utf8_unchecked(&CLAIM_RATE_MESSAGE)}
}
"""
    (types / "src/lib.rs").write_text(types_code)

    renderer = SOURCE / "fees-error-renderer"
    (renderer / "src").mkdir(parents=True)
    (renderer / "Cargo.toml").write_text(
        '[package]\nname="fees-error-renderer"\nversion="0.1.0"\nedition="2021"\n'
        '[dependencies]\nfees-error-types={path="../fees-error-types"}\n')
    (renderer / "src/lib.rs").write_text(
        "#[inline(always)]\npub fn render_pool_error()->String {"
        "fees_error_types::FeeError::InvalidPool.to_string()}\n")
    manifest = SOURCE / "programs/pump-fees/Cargo.toml"
    text = manifest.read_text()
    require(text.count("[dependencies]") == 1, "program dependency list")
    manifest.write_text(text.replace(
        "[dependencies]",
        '[dependencies]\nfees-error-types={path="../../fees-error-types"}\n'
        'fees-error-renderer={path="../../fees-error-renderer"}', 1))
    create = SOURCE / "programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs"
    text = create.read_text()
    require(text.count("FeeError::InvalidPool.to_string()") == 1, "two-site pool macro")
    create.write_text(text.replace("FeeError::InvalidPool.to_string()",
                                   "fees_error_renderer::render_pool_error()"))
    social = SOURCE / "programs/pump-fees/src/social.rs"
    text = social.read_text()
    require(text.count('msg!("Claim rate limit exceeded")') == 2, "shared social message")
    social.write_text(text.replace('msg!("Claim rate limit exceeded")',
                                   "msg!(fees_error_types::claim_rate_message())"))

def make_wrappers():
    compiler = WORK / "renderer-rustc.py"
    compiler.write_text("""#!/usr/bin/env python3
import sys,subprocess,os,json
from pathlib import Path
args=sys.argv[1:]; original=list(args)
if '--crate-name' in args and args[args.index('--crate-name')+1]=='fees_error_renderer':
 args += ['-Zinline-mir=yes','-Zinline-mir-hint-threshold=1000','-Zinline-mir-threshold=500']
 Path(os.environ['FEES_RENDERER_LOG']).write_text(json.dumps(dict(original=original,effective=args),indent=2)+'\\n')
sys.exit(subprocess.run(args).returncode)
""")
    compiler.chmod(0o755)
    linker = WORK / "renderer-link.py"
    linker.write_text("""#!/usr/bin/env python3
from pathlib import Path
from elftools.elf.elffile import ELFFile
import sys,os,json,subprocess,hashlib
args=sys.argv[1:]; aliases=json.loads(os.environ['FEES_CALLBACKS']); hits={}
for arg in args:
 p=Path(arg)
 if p.suffix=='.o' and p.is_file():
  with p.open('rb') as f:
   sy=ELFFile(f).get_section_by_name('.symtab')
   if sy:
    for symbol in sy.iter_symbols():
     if symbol['st_info']['type']!='STT_FUNC' or symbol['st_shndx']=='SHN_UNDEF': continue
     for alias,name in aliases.items():
      if name in symbol.name:
       if alias in hits: raise ValueError('duplicate callback '+alias)
       hits[alias]=dict(name=symbol.name,bytes=symbol['st_size'],object_sha256=hashlib.sha256(p.read_bytes()).hexdigest())
if set(hits)!=set(aliases): raise ValueError('missing callback')
out=Path(os.environ['FEES_LINK_LOG']); count=0; sdk_script=None
for i,arg in enumerate(args):
 if i and args[i-1] in ['-T','--script']:
  text=Path(arg).read_text(); sdk_script=hashlib.sha256(text.encode()).hexdigest()
  script=out.with_suffix('.ld')
  script.write_text(text+''.join('\\nPROVIDE_HIDDEN('+a+' = '+hits[a]['name']+');\\n' for a in aliases))
  args[i]=str(script);count+=1
if count!=1:raise ValueError('SDK linker script count')
out.write_text(json.dumps(dict(callbacks=hits,args=args,sdk_script_sha256=sdk_script),indent=2)+'\\n')
sys.exit(subprocess.run([os.environ['FEES_REAL_LINKER'],*args]).returncode)
""")
    linker.chmod(0o755)
    return compiler, linker

def environment():
    env = os.environ.copy()
    env.update({
        "RUSTC_BOOTSTRAP": "1", "RUSTC": str(SDK / "rust/bin/rustc"),
        "PATH": str(SDK / "rust/bin") + ":" + os.environ["PATH"],
        "CC": str(SDK / "llvm/bin/clang"), "AR": str(SDK / "llvm/bin/llvm-ar"),
        "CARGO_HOME": str(WORK / "cargo-home"),
        "CARGO_TARGET_DIR": str(WORK / "target"), "RUSTFLAGS": "-Zremap-cwd-prefix=",
    })
    return env

def cargo_base():
    return [str(SDK / "rust/bin/cargo"), "rustc", "--verbose", "--manifest-path",
            str(SOURCE / "programs/pump-fees/Cargo.toml"), "--release",
            "--target", "sbpf-solana-solana", "--locked", "--offline",
            "--jobs", "2", "--lib", "--",
            "--remap-path-prefix=" + str(SOURCE / "programs/pump-fees/src/../../../pump-fees-math") + "/=pump-fees-math/",
            "--remap-path-prefix=" + str(SOURCE / "pump-fees-math") + "/=pump-fees-math/",
            "--remap-path-prefix=programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/"]

def build(label, compiler, linker=None):
    dest = EVIDENCE / label
    dest.mkdir()
    before, vendor = inputs(SOURCE), inputs(VENDOR)
    env = environment()
    env.update({"RUSTC_WRAPPER": str(compiler),
                "FEES_RENDERER_LOG": str(dest / "renderer-compiler.json"),
                "FEES_CALLBACKS": json.dumps(ROOT_CALLBACKS),
                "FEES_LINK_LOG": str(dest / "linker.json"),
                "FEES_REAL_LINKER": str(SDK / "rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld")})
    command = cargo_base() + ["-C", "link-arg=-Map=" + str(dest / "link.map")]
    if linker:
        command += ["-C", "linker=" + str(linker)]
    write_json(dest / "launch.json", {
        "command": command, "cwd": str(SOURCE), "source_inputs": before,
        "vendor_inputs": vendor, "compiler_wrapper_sha256": sha(compiler.read_bytes()),
        "linker_wrapper_sha256": sha(linker.read_bytes()) if linker else None,
    })
    start = time.monotonic()
    with (dest / "build.log").open("wb") as log:
        proc = subprocess.run(command, cwd=SOURCE, env=env, stdout=log, stderr=subprocess.STDOUT)
    result = {"returncode": proc.returncode, "seconds": time.monotonic()-start,
              "source_unchanged": before == inputs(SOURCE), "vendor_unchanged": vendor == inputs(VENDOR)}
    write_json(dest / "result.json", result)
    require(proc.returncode == 0, "Cargo build failed: " + label)
    require(result["source_unchanged"] and result["vendor_unchanged"], "build input mutation")
    image = (WORK / "target/sbpf-solana-solana/release/pump_fees_candidate.so").read_bytes()
    (dest / "symbols.so").write_bytes(image)
    subprocess.run([str(SDK / "llvm/bin/llvm-objcopy"), "--strip-all",
                    str(dest / "symbols.so"), str(dest / "candidate.so")], check=True)
    result.update(symbols_sha256=sha(image), candidate_sha256=sha((dest / "candidate.so").read_bytes()))
    write_json(dest / "result.json", result)
    with tarfile.open(dest / "source.tar.gz", "w:gz") as archive:
        for path in sorted(SOURCE.rglob("*")):
            if path.is_file():
                archive.add(path, arcname=path.relative_to(SOURCE))
    return dest

def reader():
    spec = importlib.util.spec_from_file_location(
        "fees_remote_windows", REPO / "research/fees-composed-frontier188/window_map.py")
    w = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(w)
    w.m.elf_layout = lru_cache(maxsize=8)(w.m.elf_layout)
    w.m.relocations = lru_cache(maxsize=8)(w.m.relocations)
    return w

def measure(dest, w):
    original = (REPO / "evidence/original/pump_fees/deployed.so").read_bytes()
    candidate = (dest / "symbols.so").read_bytes()
    parent = gzip.decompress((WORK / "qualified-symbols.so.gz").read_bytes())
    ow, cw, pw = [w.windows(x) for x in [original, candidate, parent]]
    oc, cc, pc = [Counter(x["signature"] for x in rows) for rows in [ow, cw, pw]]
    wanted = oc & pc
    retained = sum((wanted & cc).values())
    matched = sum((oc & cc).values())
    target = next(x for x in cw if x["name"] and
                  "19pump_fees_candidate23create_donation_fee_pda" in x["name"])
    original_target = next(x for x in ow if x["address"] == 163920)
    def calls(image, windows, start, size):
        rel = dict(w.m.relocations(image))
        mapping = {x["address"]: x for x in windows}
        counts = Counter()
        for row in w.m.instructions(image, start, size):
            if "call_target" in row and rel.get(start+row["offset"], 0) & 0xffffffff != 10:
                counts[mapping[row["call_target"]]["signature"]] += 1
        return counts
    left = calls(original, ow, 163920, 13800)
    right = calls(candidate, cw, target["address"], target["bytes"])
    a = Counter(w.m.section_data(original, ".rodata"))
    b = Counter(w.m.section_data(candidate, ".rodata"))
    report = {
        "original_windows": len(ow), "candidate_windows": len(cw),
        "original_matched": matched, "prior_qualified_retained": retained,
        "prior_qualified_total": sum(wanted.values()),
        "create_bytes": target["bytes"], "create_instructions": target["instructions"],
        "create_original_instructions": original_target["instructions"],
        "create_full_normalized_equal": target["signature"] == original_target["signature"],
        "missing_direct_target_signatures": dict(left-right),
        "extra_direct_target_signatures": dict(right-left),
        "readonly_bytes": len(w.m.section_data(candidate, ".rodata")),
        "readonly_byte_bag_extra": dict(b-a), "readonly_byte_bag_missing": dict(a-b),
        "whole_elf_equal": candidate == original, "qualified_frontier_promoted": False,
    }
    write_json(dest / "measurement.json", report)
    print("REMOTE_RESULT_JSON " + json.dumps({"label": dest.name, **report}), flush=True)
    require(retained == sum(wanted.values()) == 583, "regression in qualified signatures")
    return report

def runtime(dest):
    runner = REPO / "scripts/fees_validate_all.py"
    tree = ast.parse(runner.read_text())
    loops = [n for n in ast.walk(tree) if isinstance(n, ast.For)
             and isinstance(n.target, ast.Tuple)
             and [getattr(e, "id", None) for e in n.target.elts] == ["name", "script"]]
    require(len(loops) == 1, "canonical runtime suites")
    suites = ast.literal_eval(loops[0].iter)
    require(len(suites) == 18, "18 canonical suites")
    total = 0
    for name, script in suites:
        output = dest / ("runtime-" + name + ".json")
        command = [sys.executable, "-B", str(REPO / "scripts" / script),
                   "--candidate", str(dest / "candidate.so"), "--output", str(output)]
        with (dest / ("runtime-" + name + ".log")).open("wb") as log:
            proc = subprocess.run(command, stdout=log, stderr=subprocess.STDOUT)
        require(proc.returncode == 0, "runtime failed: " + name)
        report = json.loads(output.read_text())
        require(not report.get("mismatches", report.get("failures", [])), "runtime mismatches")
        total += report.get("case_count", len(report.get("cases", [])))
        output.with_suffix(".json.gz").write_bytes(gzip.compress(output.read_bytes(), mtime=0))
        output.unlink()
    require(total == 17331, "canonical runtime total")
    write_json(dest / "runtime-summary.json", {"cases": total, "suites": 18, "mismatches": []})
    print("REMOTE_RUNTIME_JSON " + json.dumps({"cases": total, "suites": 18, "mismatches": []}), flush=True)

def main():
    require(not WORK.exists(), "use a fresh remote workspace")
    WORK.mkdir(parents=True)
    prepare()
    baseline_lock = tomllib.loads((SOURCE / "Cargo.lock").read_text())
    transform()
    compiler, linker = make_wrappers()
    env = environment()
    for command, filename in [
        ([str(SDK / "rust/bin/cargo"), "fetch"], "fetch.log"),
        ([str(SDK / "rust/bin/cargo"), "update", "--offline", "-p", "pump-fun-fees-candidate"], "lock-update.log"),
    ]:
        with (EVIDENCE / filename).open("wb") as log:
            subprocess.run(command, cwd=SOURCE, env=env, stdout=log, stderr=subprocess.STDOUT, check=True)
    def package_key(p):
        return (p["name"], p["version"], p.get("source", ""))
    before_packages = {package_key(p): p for p in baseline_lock["package"]}
    current_lock = tomllib.loads((SOURCE / "Cargo.lock").read_text())
    after_packages = {package_key(p): p for p in current_lock["package"]}
    new_names = {p["name"] for key, p in after_packages.items() if key not in before_packages}
    require(new_names == {"fees-error-types", "fees-error-renderer"}, "only two local packages added")
    for key, original_package in before_packages.items():
        require(key in after_packages, "locked package removed")
        actual = dict(after_packages[key])
        if key[0] == "pump-fun-fees-candidate":
            actual["dependencies"] = [x for x in actual["dependencies"]
                                      if x not in ["fees-error-types", "fees-error-renderer"]]
        require(actual == original_package, "locked dependency changed: " + key[0])
    write_json(EVIDENCE / "lock-audit.json", {"existing_packages_unchanged": True,
               "new_local_packages": sorted(new_names)})
    w = reader()
    baseline = build("alias-baseline", compiler, linker)
    baseline_report = measure(baseline, w)
    require(baseline_report["candidate_windows"] == 585, "no extra helper windows")
    links = json.loads((baseline / "linker.json").read_text())
    types = SOURCE / "fees-error-types/src/lib.rs"
    text = types.read_text()
    for alias in ROOT_CALLBACKS:
        require(text.count(alias) == 1, "callback link declaration")
        text = text.replace(alias, links["callbacks"][alias]["name"])
    types.write_text(text)
    direct = build("direct-symbols", compiler)
    report = measure(direct, w)
    # The alias edit must not change the callback definition names.
    function_names = {x["name"] for x in w.m.functions((direct / "symbols.so").read_bytes())}
    require(all(x["name"] in function_names for x in links["callbacks"].values()),
            "callback symbol stability")
    if report["create_full_normalized_equal"]:
        repeat = build("direct-repeat", compiler)
        require((repeat / "symbols.so").read_bytes() == (direct / "symbols.so").read_bytes(),
                "repeat symbols differ")
        require((repeat / "candidate.so").read_bytes() == (direct / "candidate.so").read_bytes(),
                "repeat stripped differ")
        measure(repeat, w)
        runtime(direct)
    shutil.copyfile(Path(__file__), EVIDENCE / "run.py")
    with tarfile.open(EVIDENCE / "macro-vendor.tar.gz", "w:gz") as archive:
        for path in sorted(VENDOR.rglob("*")):
            if path.is_file():
                archive.add(path, arcname=path.relative_to(VENDOR))
    write_json(EVIDENCE / "manifest.json", {
        p.relative_to(EVIDENCE).as_posix(): sha(p.read_bytes())
        for p in sorted(EVIDENCE.rglob("*")) if p.is_file()
    })

if __name__ == "__main__":
    try:
        main()
    except Exception:
        EVIDENCE.mkdir(parents=True, exist_ok=True)
        (EVIDENCE / "failure.txt").write_text(traceback.format_exc())
        raise
