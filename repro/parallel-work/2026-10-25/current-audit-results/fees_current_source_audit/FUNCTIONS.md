# Current Fees function dispositions

All rows concern the candidate; unchanged means exact explicit source content, not original equivalence. Detailed prior reasoning is retained in functions.json as historical_review. D1-D7 supersede old donation-create review.

| Function | Handler | Current source | Disposition |
|---|---|---|---|
| buyback::initialize_buyback | False | pump-fees/src/buyback.rs:5-5 | unchanged explicit source; prior bounded review and obligations remain applicable |
| buyback::update_buyback_authority | False | pump-fees/src/buyback.rs:6-6 | unchanged explicit source; prior bounded review and obligations remain applicable |
| buyback::update_buyback_claim_rate_limit | False | pump-fees/src/buyback.rs:7-7 | unchanged explicit source; prior bounded review and obligations remain applicable |
| buyback::sweep_buyback | False | pump-fees/src/buyback.rs:8-21 | unchanged explicit source; prior bounded review and obligations remain applicable |
| donation::crank | False | pump-fees/src/donation.rs:11-43 | unchanged explicit source; prior bounded review and obligations remain applicable |
| donation::create | False | pump-fees/src/donation.rs:44-111 | superseded donation semantics: manually rereviewed D1-D7; historical pool-only/guard-order statements do not apply |
| lib::admin_cto_sharing_config | True | pump-fees/src/lib.rs:37-39 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::claim_social_fee_pda | True | pump-fees/src/lib.rs:42-44 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::claim_social_fee_pda_v2 | True | pump-fees/src/lib.rs:47-49 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::crank_donation_fee_pda | True | pump-fees/src/lib.rs:52-54 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::create_donation_fee_pda | True | pump-fees/src/lib.rs:57-59 | superseded donation semantics: manually rereviewed D1-D7; historical pool-only/guard-order statements do not apply |
| lib::create_fee_sharing_config | True | pump-fees/src/lib.rs:62-64 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::create_social_fee_pda | True | pump-fees/src/lib.rs:67-69 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::extend_fee_config | True | pump-fees/src/lib.rs:72-94 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::get_fees | True | pump-fees/src/lib.rs:97-101 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::get_fees_with_quote_mint | True | pump-fees/src/lib.rs:104-115 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::initialize_buyback | True | pump-fees/src/lib.rs:118-120 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::initialize_fee_config | True | pump-fees/src/lib.rs:123-134 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::initialize_fee_program_global | True | pump-fees/src/lib.rs:137-151 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::revoke_fee_sharing_authority | True | pump-fees/src/lib.rs:154-156 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::set_authority | True | pump-fees/src/lib.rs:159-167 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::set_claim_rate_limit | True | pump-fees/src/lib.rs:170-176 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::set_disable_flags | True | pump-fees/src/lib.rs:179-185 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::set_exotic_flat_fees | True | pump-fees/src/lib.rs:188-206 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::set_social_claim_authority | True | pump-fees/src/lib.rs:209-215 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::sweep_buyback | True | pump-fees/src/lib.rs:218-220 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::transfer_fee_sharing_authority | True | pump-fees/src/lib.rs:223-225 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::update_admin | True | pump-fees/src/lib.rs:228-233 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::update_buyback_authority | True | pump-fees/src/lib.rs:236-238 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::update_buyback_claim_rate_limit | True | pump-fees/src/lib.rs:241-243 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::update_fee_config | True | pump-fees/src/lib.rs:246-254 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::update_fee_shares | True | pump-fees/src/lib.rs:257-259 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::update_fee_shares_v2 | True | pump-fees/src/lib.rs:262-264 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::update_stable_fee_config | True | pump-fees/src/lib.rs:267-274 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::upsert_fee_tiers | True | pump-fees/src/lib.rs:277-282 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::upsert_stable_fee_tiers | True | pump-fees/src/lib.rs:285-290 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::withdraw | True | pump-fees/src/lib.rs:293-295 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::select_fee_tier | False | pump-fees/src/lib.rs:305-311 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::validate_fees | False | pump-fees/src/lib.rs:394-400 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::validate_tiers | False | pump-fees/src/lib.rs:401-407 | unchanged explicit source; prior bounded review and obligations remain applicable |
| lib::upsert_tiers | False | pump-fees/src/lib.rs:409-419 | unchanged explicit source; prior bounded review and obligations remain applicable |
| sharing::id | False | pump-fees/src/sharing.rs:9-9 | unchanged explicit source; prior bounded review and obligations remain applicable |
| sharing::id | False | pump-fees/src/sharing.rs:10-10 | unchanged explicit source; prior bounded review and obligations remain applicable |
| sharing::create_sharing | False | pump-fees/src/sharing.rs:11-35 | unchanged explicit source; prior bounded review and obligations remain applicable |
| sharing::call | False | pump-fees/src/sharing.rs:36-36 | unchanged explicit source; prior bounded review and obligations remain applicable |
| sharing_admin::admin_cto_sharing_config | False | pump-fees/src/sharing_admin.rs:6-16 | unchanged explicit source; prior bounded review and obligations remain applicable |
| sharing_update::update_fee_shares | False | pump-fees/src/sharing_update.rs:8-19 | unchanged explicit source; prior bounded review and obligations remain applicable |
| sharing_update::update_fee_shares_v2 | False | pump-fees/src/sharing_update.rs:20-36 | unchanged explicit source; prior bounded review and obligations remain applicable |
| sharing_update::authorize | False | pump-fees/src/sharing_update.rs:38-42 | unchanged explicit source; prior bounded review and obligations remain applicable |
| sharing_update::validate_remaining | False | pump-fees/src/sharing_update.rs:43-46 | unchanged explicit source; prior bounded review and obligations remain applicable |
| sharing_update::validate_shares | False | pump-fees/src/sharing_update.rs:47-52 | unchanged explicit source; prior bounded review and obligations remain applicable |
| sharing_update::call | False | pump-fees/src/sharing_update.rs:53-56 | unchanged explicit source; prior bounded review and obligations remain applicable |
| social::claim_v2 | False | pump-fees/src/social.rs:5-34 | unchanged explicit source; prior bounded review and obligations remain applicable |
| social::create_social | False | pump-fees/src/social.rs:36-45 | unchanged explicit source; prior bounded review and obligations remain applicable |
| social::claim | False | pump-fees/src/social.rs:45-57 | unchanged explicit source; prior bounded review and obligations remain applicable |
| social::token_amount | False | pump-fees/src/social.rs:91-97 | unchanged explicit source; prior bounded review and obligations remain applicable |
| types::deserialize_reader | False | pump-fees/src/types.rs:27-34 | unchanged explicit source; prior bounded review and obligations remain applicable |
| types::owner | False | pump-fees/src/types.rs:46-46 | unchanged explicit source; prior bounded review and obligations remain applicable |
| types::try_serialize | False | pump-fees/src/types.rs:51-56 | unchanged explicit source; prior bounded review and obligations remain applicable |
| types::try_deserialize | False | pump-fees/src/types.rs:59-63 | unchanged explicit source; prior bounded review and obligations remain applicable |
| types::try_deserialize_unchecked | False | pump-fees/src/types.rs:64-77 | unchanged explicit source; prior bounded review and obligations remain applicable |
| withdrawal::execute | False | pump-fees/src/withdrawal.rs:5-22 | unchanged explicit source; prior bounded review and obligations remain applicable |
