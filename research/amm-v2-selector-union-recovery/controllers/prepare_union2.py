exec(open('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-contribution-review/amm-v2-union-20261028/setup.py').read().split('K.mkdir')[0])
import io
git=['git','-c','safe.directory='+str(R),'-C',str(R)]
packet='research/claude-amm-union2-20261028/'
blob=subprocess.check_output(git+['show','upstream/pr430:'+packet+'sources/candidate.tar.gz'])
ref=subprocess.check_output(git+['rev-parse','upstream/pr430'],text=True).strip()
(K/'upstream-union2.tar.gz').write_bytes(blob)
expected=json.loads(subprocess.check_output(git+['show','upstream/pr430:'+packet+'builds/a/result.json']))
(K/'upstream-union2.json').write_text(json.dumps({'revision':ref,'source_sha256':hashlib.sha256(blob).hexdigest(),'expected':expected},indent=2)+'\n')
src=K/'source-unionbaseline'
if src.exists():
 assert not list(src.iterdir());src.rename(K/'failed-empty-source-unionbaseline')
 (K/'unionbaseline').rename(K/'failed-missing-source-unionbaseline')
src.mkdir()
with tarfile.open(fileobj=io.BytesIO(blob)) as t:
 for m in t.getmembers():assert not Path(m.name).is_absolute() and '..' not in Path(m.name).parts and (m.isfile() or m.isdir())
 t.extractall(src)
shutil.copytree(src,K/'source-unioncandidate')
p=Path('programs/pump-amm/src/curve/fees.rs');old=(src/p).read_text();win=(J/'source-apply-match'/p).read_text()
assert old==(K/'source-baseline'/p).read_text(),'upstream modified selector input'
prefix=old.split('pub fn select_and_apply_v2(')[0];tail='fn select_v2_fees('+win.split('fn select_v2_fees(',1)[1];new=prefix+tail
assert new.splitlines()[183].strip()=='require!(fee_config_len >= 2512, PumpAmmError::FeeConfigTooShort);'
(K/'source-unioncandidate'/p).write_bytes(new.encode());print('759 source prepared',ref,flush=True)
