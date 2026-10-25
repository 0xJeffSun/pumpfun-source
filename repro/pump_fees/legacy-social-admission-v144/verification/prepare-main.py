from pathlib import Path
import difflib,hashlib,io,json,shutil,tarfile
R=Path.cwd();S=R/'work/fees-legacy-social-build/handoff';W=R/'work/fees-legacy-social-main';W.mkdir(exist_ok=False)
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def save(n,x):(W/n).write_text(json.dumps(x,indent=2,sort_keys=True)+'\n')
old=json.loads((R/'repro/pump_fees/donation-borrow-v144/source-sha256.json').read_text());new=json.loads((S/'inputs/corrected-source-sha256.json').read_text())
assert len(old)==len(new)==26 and set(old)==set(new)
assert all(H(R/n)==h for n,h in old.items()),'Main baseline drift'
changed=[n for n in old if old[n]!=new[n]]
assert set(changed)=={'programs/pump-fees/src/donation.rs','programs/pump-fees/src/sharing_update.rs','programs/pump-fees/src/social.rs','programs/pump-fees/src/instructions/fee_sharing/mod.rs'},changed
save('main-baseline-source-sha256.json',old);save('scratch-source-sha256.json',new)
before={n:(R/n).read_bytes()for n in old}
for n in changed:shutil.copyfile(S/'source'/n,R/n)
p=R/'programs/pump-fees/README.md';text=p.read_text()
text=text.replace('repro/pump_fees/donation-borrow-v144/README.md','repro/pump_fees/legacy-social-admission-v144/README.md',1)
text=text.replace('770,016 bytes, SHA-256\n`5cf8d567934188d1307d2f9f3d2220ede52f6978e389064b08897441fbdd7d49`','773,808 bytes, SHA-256\n`8ff12f9c580baa51631a1802d5dc0a936e837f5de4fc1b88b71fd57bd2a7450b`',1)
text=text.replace('tested donation-borrow scratch build','tested legacy-quote/social-admission scratch build',1)
text=text.replace("The focused run's complete successful report and log are retained; its numeric\nprocess exit code was not separately persisted and is not reconstructed.","All eleven fresh scratch jobs have retained numeric zero exits, complete reports\nand logs. Main-source acceptance carries those receipts only by whole executable\nand symbol identity; target transactions are not repeated for the main build.")
text=text.replace('The fresh inventory preserves all 585 original inferred windows and 546 candidate\nsymbol windows. Original status remains 437 mapped patterns, 145 unattributed and\nthree call conflicts.','The fresh inventory preserves all 585 original inferred windows and 547 candidate\nsymbol windows. Original status is 439 mapped patterns, 143 unattributed and\nthree call conflicts. The candidate has 440 consistent normalized call patterns,\n105 unmatched windows and two call conflicts; 100 windows are raw-identical.\nCompared with the accepted predicate/ownership scratch, two original drop-routine\nwindows gain matches. Whole-file equality remains false.')
needle='`BuybackVault`, `SocialFeePda`, `DonationFeePda`, `FeeProgramGlobal` and'
insert='''The two sharing AMM predicates now preserve the original conjunction, and the
donation quote helper borrows its AccountInfo argument. Legacy `update_fee_shares`
first checks the curve quote bytes at 83..115 when the allocation is at least 115
bytes; short allocations are admitted by this helper. A nonzero quote returns
UnsupportedQuoteMint before the already-updated version error. The fresh machine
code confirms the borrow release and temporary drops before this error branch.
The helper is inlined; the complete legacy handler still differs from the original.
Remaining-account preprocessing and V2 payout reconstruction remain incomplete.

Social token claims use a shared admission helper for both associated accounts.
It checks the canonical address, System-owned creation permission, exact supplied
token-program owner and decoded mint. Recipient creation uses the ordinary
idempotent associated-token instruction with six AccountInfos; the source-side
call disallows creation. Fresh bytes confirm both flags and instruction opcode 1.
All 17 original immediate helper target windows have normalized matches called by
the new helper, and the six-AccountInfo drop body is raw-identical. Complete
helper/handler equality and unrestricted descendant/data closure remain unresolved.
No new fixtures or token-extension conclusions are added by this checkpoint.

The [prior donation-borrow checkpoint](../../repro/pump_fees/donation-borrow-v144/README.md)
retains its 770,016-byte `5cf8d567…` ELF and source-specific results unchanged.

'''
assert needle in text;text=text.replace(needle,insert+needle,1)
text=text.replace('The current donation-business checkpoint above carries freshly executed scratch receipts','The current legacy-quote/social-admission checkpoint above carries freshly executed scratch receipts')
p.write_text(text)
final={n:H(R/n)for n in old};assert all(final[n]==new[n]for n in new if n!='programs/pump-fees/README.md')
save('source-sha256.json',final);save('documentation-sha256.json',{'programs/pump-fees/README.md':final['programs/pump-fees/README.md']})
patch=''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True),(R/n).read_text().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in old if before[n]!=(R/n).read_bytes())
(W/'main-promotion.patch').write_text(patch)
for n in ['tools-before.json','build-helper-sha256.json','build-helper-snapshot.tar.gz','sbf-sdk-snapshot.tar.gz','cache-integrity.json','dependency-before.json','registry-index-sha256.json']:
 shutil.copyfile(S/'inputs'/n,W/n)
helpers=json.loads((W/'build-helper-sha256.json').read_text());assert all(H(R/n)==h for n,h in helpers.items())
with tarfile.open(W/'source-snapshot.tar.gz','w:gz')as t:
 for n in final:
  b=(R/n).read_bytes();i=tarfile.TarInfo(n);i.size=len(b);i.mtime=0;i.mode=0o644;t.addfile(i,io.BytesIO(b))
save('promotion-preflight.json',{'passed':True,'baseline_candidate':'5cf8d567934188d1307d2f9f3d2220ede52f6978e389064b08897441fbdd7d49','scratch_manifest_sha256':H(S/'manifest-sha256.json'),'changed_rust_paths':changed,'changed_readme':'programs/pump-fees/README.md','source_inputs':26,'source_sha256':final,'scratch_source_sha256':new})
print(json.dumps({'passed':True,'source_inputs':len(final),'changed':changed,'readme':final['programs/pump-fees/README.md']}))
