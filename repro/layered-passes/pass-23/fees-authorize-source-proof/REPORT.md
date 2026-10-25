# Exact sharing authorization correction — source only

Replace only current require_keys_eq(selectedcreator,payer,NotAuthorized) with plain require(payer==global.admin_set_creator_authority || creator==payer,NotAuthorized). Exact patch/proposal.rs preserve allotherbytes. The baseline26map is actual accepted fourth-CPI main source, withcandidate6a1f3f and rootREADME, not an unbuilt third/fourth mix.

The copied sealed original-proof/e9da packet closes fullGlobal3976Bdecoder, every preceding serializedfield and helpers through adminbytes418..450→decoded352→context776; completeauth8rowtruth table and fullcallerdumps preserved. Original caller comparespayer againstadmin then selectedcreator, only after requiredpoolvalidation ongraduatedpath. Nonzero sharingversion returns first. Admin doesnot bypassmissingpool/InvalidPool/parsererrors. Selectedcreator remains poolcoincreator orcurvecreator and continues todrive state/event; this correction changes authorization only.

## Plain6016 ownership, no guessed pubkey payload

Fulloriginal6016 paths construct ownedname/message/source thenbox709232 (nongraduated179048/179120,graduated185760/185800), followed by resultreturn; no compared-key setter or keypairpayload appears. Originalsourceorigin is explicit302/307 dependingbranch; thosehistoricalcoordinates arenot copied into source. ComparedValues storage in fulloriginalconstruction is empty; no Left/Right key formatting is initiated for this plaincondition. Source-bearing error construction is preserved by require!, not replaced with fieldlessenumconversion.

Current require_keys_eq macro explicitlycalls `error!(...).with_pubkeys((value1,value2))`; copied exactAnchor0.31.1 macros/error definitions show require! onlyreturns `error!(...)` onfalse and never invokeswith_pubkeys. Therefore plain require! restores both adminalternative and no-comparedkeys ownership, using existingnaturalAPI. No syntheticAnchorError layout, rawdiscriminant or fakecoordinate is added. Fulloriginalerrorbox andcallerbodies live in original-proof; candidatebuildwouldneed emittedconfirmation, not claimed here.

No source/build/runtime/Git mutation. BUILD-PLAN.md isunexecuted andawaitsrootreview. Existing finite17461 tests, evenifrerunlater, are not exhaustiveauthorization proof; noauthorityprobe/newfixture proposed. RecursiveCPI/downstream/allocator andwholeELFidentityremain unresolved. Run python3 -B verify.py for exactsubstitution, orderingdominance, macrobehavior andcopiedoriginalproof.
