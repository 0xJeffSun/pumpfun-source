// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r,
    o =
      (((t = {}).COIN_PAGE_LINE_CHART = "coinPageLineChart"),
      (t.RETURNING_SIGN_IN = "returningSignIn"),
      (t.HOME_FEED_QUICK_BUY_V2 = "homeFeedQuickBuyV3"),
      (t.HOME_TOP_BOUNTIES_BANNER = "homeTopBountiesBannerV2"),
      (t.PROFILE_QUICK_TRADE = "profileQuickTradeV2"),
      (t.BOUNTY_COMMENTS = "bountyComments"),
      (t.BOUNTY_PERCENTAGE_FEES = "bountyPercentageFees"),
      (t.WEB_HERMES_NOTIFICATIONS = "webHermesNotifications"),
      (t.WEB_VOICE_CHAT = "webVoiceChatV2"),
      (t.WEB_USER_VOICE_ROOMS = "webUserVoiceRooms"),
      (t.WEB_EVENT_DEBUGGER = "webEventDebugger"),
      (t.MOONPAY_ONRAMP = "webBuyCryptoMoonpay"),
      (t.WEB_DEPOSIT_EVM_NETWORKS = "webDepositEvmNetworks"),
      (t.USER_VIDEOS = "userVideos"),
      (t.WEB_DUMMY_DEVICE = "webDummyDeviceV2"),
      (t.WEB_DECK_DRAG_V2 = "webDeckDragV2"),
      (t.WEB_DECK_AUTO_FILL = "webDeckAutoFill"),
      (t.WEB_SAFE_MODE = "webSafeMode"),
      (t.WEB_TRADE_SPOT_REFRESH = "webTradeSpotRefresh"),
      (t.WEB_NATIVE_CONVERT = "webNativeConvert"),
      (t.WEB_EVM_WITHDRAW_GAS_TOPUP = "webEvmWithdrawGasTopup"),
      (t.X_FEATURES = "xFeaturesEnabled"),
      (t.BOUNTY_PUMP_FOLLOWER_GATE = "bountyPumpFollowerGate"),
      (t.WEB_DIRECT_MESSAGES = "webDirectMessages"),
      (t.NATS_PER_USER_AUTH = "natsPerUserAuth"),
      (t.WEB_SQUADS = "webSquads"),
      (t.WEB_COIN_TERMINAL_FRAME = "webCoinTerminalFrame"),
      (t.WEB_BLOCKCHAIN_LIMIT_ORDERS = "webBlockchainLimitOrders"),
      (t.WEB_PROFILE_REFERRALS_TAB = "webProfileReferralsTab"),
      (t.WEB_REFERRAL_CODE_ONBOARDING = "webReferralCodeOnboarding"),
      (t.REFERRAL_FEES_SWAP_LANE = "ramAndCacheImprovementsForSwaps"),
      (t.REFERRAL_FEES_BRIDGE_LANE = "bridgeConnectionPoolWarmup"),
      (t.WEB_WALLET_ADAPTER_DEPRECATION_NOTICE =
        "webWalletAdapterDeprecationNotice"),
      (t.WEB_WALLET_ADAPTER_CUTOVER = "webWalletAdapterCutover"),
      (t.WEB_V1_TRANSACTIONS = "webV1Transactions"),
      (t.WEB_PRIVY_WALLET_MIGRATION = "webPrivyWalletMigration"),
      (t.WEB_SETTINGS_HUB = "webSettingsHub"),
      (t.WEB_COIN_CHART_TABLES = "webCoinChartTables"),
      (t.WEB_INSTANT_COIN_CHART = "webInstantCoinChart"),
      (t.WEB_COIN_CHART_INSTANT_PREVIEW = "webCoinChartInstantPreview"),
      (t.WEB_COIN_FLOATING_TRADE = "webCoinFloatingTrade"),
      (t.WEB_PROFILE_ACHIEVEMENTS = "webProfileAchievements"),
      (t.WEB_AVATAR_DECORATIONS = "webAvatarDecorations"),
      (t.WEB_PROFILE_PORTFOLIO_CHART = "webProfilePortfolioChart"),
      (t.WEB_PROFILE_PORTFOLIO_CHART_ALL_PERIOD =
        "webProfilePortfolioChartAllPeriod"),
      (t.WEB_LIVE_PLAYER_QUICK_TRADE = "webLivePlayerQuickTrade"),
      (t.WEB_ACHIEVEMENT_AVATAR_CHIPS = "webAchievementAvatarChips"),
      (t.WEB_LIVE_CARD_QUICK_TRADE = "webLiveCardQuickTrade"),
      (t.WEB_REWARDS_PAGE = "webRewardsPage"),
      (t.WEB_MODERATION_LEGACY_PAGES_RETIRED =
        "webModerationLegacyPagesRetired"),
      (t.WEB_MAYHEM_MULTIPLAYER = "webMayhemMultiplayer"),
      (t.WEB_HOLDER_REWARDS_ASCENDING_FLOOR = "webHolderRewardsAscendingFloor"),
      (t.WEB_HOLDER_REWARDS_MARKET_CAP_SORT = "webHolderRewardsMarketCapSort"),
      (t.WEB_TWO_FACTOR_AUTH = "webTwoFactorAuth"),
      (t.UAPI_STREAM_HEADER = "uapiStreamHeader"),
      (t.UAPI_STREAM_TAPE = "uapiStreamTape"),
      (t.UAPI_STREAM_CHART = "uapiStreamChart"),
      (t.UAPI_STREAM_LISTS = "uapiStreamLists"),
      (t.UAPI_STREAM_HOLDERS = "uapiStreamHolders"),
      (t.UAPI_STREAM_BOARDS = "uapiStreamBoards"),
      (t.WEB_TRENDING_BOARD = "webTrendingBoard"),
      (t.WEB_BOARD_FACES_EMBEDDED = "webBoardFacesEmbedded"),
      (t.WEB_COIN_YOURS_TAB = "webCoinYoursTab"),
      (t.WEB_SEARCH_MIXED_RESULTS = "webSearchMixedResults"),
      (t.WEB_PROFILE_LEADERBOARD_RANK = "webProfileLeaderboardRank"),
      (t.WEB_PERPS = "webPerps"),
      (t.WEB_PERPS_PRESIGN_ENTRY = "webPerpsPresignEntry"),
      (t.WEB_PERPS_OPTIMISTIC_POSITION = "webPerpsOptimisticPosition"),
      (t.WEB_PERPS_CALLOUT_FEED = "webPerpsCalloutFeed"),
      (t.WEB_PERPS_CALLOUT_COMPOSE = "webPerpsCalloutCompose"),
      (t.WEB_PERPS_CLOSE_ON_FILL = "webPerpsCloseOnFill"),
      (t.WEB_PERPS_PAYOUT_FAST_SIGN = "webPerpsPayoutFastSign"),
      (t.WEB_PERPS_PAYOUT_BUILD_FIRST = "webPerpsPayoutBuildFirst"),
      (t.WEB_PERPS_PRESIGN_CLOSE = "webPerpsPresignClose"),
      (t.WEB_PERPS_PRESIGN_OPEN = "webPerpsPresignOpen"),
      (t.WEB_PERPS_BRIDGE_RAIL = "webPerpsBridgeRail"),
      (t.WEB_PERPS_MARGIN_TOP_UP = "webPerpsMarginTopUp"),
      (t.WEB_PERPS_CLOSE_PAYOUT_ASSET = "webPerpsClosePayoutAsset"),
      (t.WEB_PERPS_VENUE_SWITCH = "webPerpsVenueSwitch"),
      (t.WEB_MEGAETH_CHAIN = "webMegaethChain"),
      (t.BRIDGE_STOCK_REGION_ROUTING = "bridgeStockRegionRouting"),
      (t.WEB_XLAYER_CHAIN = "webXlayerChain"),
      (t.WEB_POLYGON_CHAIN = "webPolygonChain"),
      (t.WEB_ARBITRUM_CHAIN = "webArbitrumChain"),
      (t.WEB_TON_CHAIN = "webTonChain"),
      (t.WEB_NEAR_CHAIN = "webNearChain"),
      (t.WEB_STARKNET_CHAIN = "webStarknetChain"),
      (t.PORTFOLIO_LIVE_REPRICE = "portfolioLiveReprice"),
      (t.WEB_PACKS = "webPacks"),
      (t.WEB_PHYGITALS_MIGRATION = "webPhygitalsMigration"),
      (t.WEB_EXPLORE_SOCIAL_TERMINAL = "webExploreSocialTerminal"),
      (t.SQUAD_CUP_INTERVAL = "squadCupInterval"),
      t),
    n =
      (((r = {}).BLOCKCHAIN_COIN_SCAM_BLACKLIST_MINTS =
        "blockchainCoinScamBlacklistMints"),
      (r.BLOCKCHAIN_COIN_WARNING_BYPASS_MINTS =
        "blockchainCoinWarningBypassMints"),
      r);
  let a = {
      coinPageLineChart: {
        kind: "rollout",
        owner: "luke-baton",
        created: "2026-04-27",
      },
      returningSignIn: {
        kind: "experiment",
        owner: "nick-baton",
        created: "2026-06-15",
        contextKind: "device",
      },
      homeFeedQuickBuyV3: {
        kind: "experiment",
        owner: "hilary-baton",
        created: "2026-07-08",
        contextKind: "device",
      },
      homeTopBountiesBannerV2: {
        kind: "experiment",
        owner: "hilary-baton",
        created: "2026-07-08",
        contextKind: "device",
      },
      profileQuickTradeV2: {
        kind: "experiment",
        owner: "hilary-baton",
        created: "2026-07-08",
        contextKind: "device",
      },
      bountyComments: {
        kind: "rollout",
        owner: "luke-baton",
        created: "2026-06-25",
      },
      bountyPercentageFees: {
        kind: "rollout",
        owner: "hilary-baton",
        created: "2026-07-05",
        expires: "2026-11-15",
      },
      webHermesNotifications: {
        kind: "rollout",
        owner: "luke-baton",
        created: "2026-06-25",
      },
      webVoiceChatV2: {
        kind: "experiment",
        owner: "hilary-baton",
        created: "2026-07-08",
        contextKind: "device",
      },
      webUserVoiceRooms: {
        kind: "rollout",
        owner: "hilary-baton",
        created: "2026-07-09",
      },
      webEventDebugger: {
        kind: "ops",
        owner: "luke-baton",
        created: "2026-07-03",
      },
      webBuyCryptoMoonpay: {
        kind: "rollout",
        owner: "luke-baton",
        created: "2026-05-08",
      },
      webDepositEvmNetworks: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-21",
        expires: "2026-12-02",
        exit: {
          signal:
            "hujoe-baton: owner sign-off once Privy sessions are offered every EVM network mobile lists in the deposit dialog, a test deposit on an EVM row lands in the account's in-app wallet, and Datadog RUM service:frontend shows no error naming DepositNetworkPicker (frontend PR feat/deposit-evm-networks; declares no series)",
          claim: "manual",
          window: "3d",
          basis:
            "feat/deposit-evm-networks records no baseline: manual web deposits are a small cohort beside MoonPay, so 3d of the team's own deposits is provisional until InteractDepositNetwork volume names a series and sizes the window from it.",
        },
      },
      userVideos: {
        kind: "rollout",
        owner: "luke-baton",
        created: "2026-07-09",
      },
      webDummyDeviceV2: {
        kind: "experiment",
        owner: "panru1i",
        created: "2026-07-06",
        contextKind: "device",
      },
      webDeckDragV2: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-21",
      },
      webDeckAutoFill: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-06",
      },
      webSafeMode: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-30",
      },
      webTradeSpotRefresh: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-30",
      },
      webNativeConvert: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-21",
        expires: "2026-12-02",
        exit: {
          signal:
            "Datadog logs service:frontend (swap_success_web OR swap_error_web) @direction:sell @source_element:CONVERT: the success share per @lane at or above mobile's PROFILE_NATIVE_CONVERT_TRADE_MODAL share on the same lane",
          claim: "parity",
          window: "3d",
          basis:
            "Mobile settled 3,411 of 3,481 native converts on the seven chains in 7 days (2026-10-14..21, 98%, 96% on Ethereum to 100% on Ink); web converts are a slice of the profile's EVM sessions, so 3d collects a comparable handful; resize once the web series fills.",
        },
      },
      webEvmWithdrawGasTopup: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-21",
        expires: "2026-12-04",
        exit: {
          signal:
            "Datadog logs service:frontend evm_gas_swap_success vs evm_gas_swap_error (mobile's names, keyed by @evm_chain): errors under 15% of top-ups once the series has 20 runs (frontend PR feat/withdraw-gas-topup)",
          claim: "manual",
          window: "3d",
          basis:
            "Mobile's 7 days to 2026-10-21: 203 evm_gas_swap_success to 25 evm_gas_swap_error (11%), mostly unsignable delivery wallets, signing failures and dust amounts; web withdraws are fewer, so 3d is provisional until the web series fills.",
        },
      },
      xFeaturesEnabled: {
        kind: "kill-switch",
        owner: "lukes-baton",
        created: "2026-08-13",
      },
      bountyPumpFollowerGate: {
        kind: "kill-switch",
        owner: "lukes-baton",
        created: "2026-08-17",
      },
      webDirectMessages: {
        kind: "rollout",
        owner: "lukes-baton",
        created: "2026-08-27",
      },
      natsPerUserAuth: {
        kind: "rollout",
        owner: "naveen-baton",
        created: "2026-09-28",
      },
      webSquads: {
        kind: "rollout",
        owner: "lukes-baton",
        created: "2026-08-27",
      },
      webCoinTerminalFrame: {
        kind: "rollout",
        owner: "lukes-baton",
        created: "2026-09-09",
      },
      webBlockchainLimitOrders: {
        kind: "rollout",
        owner: "lukes-baton",
        created: "2026-09-01",
      },
      webProfileReferralsTab: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-22",
      },
      webReferralCodeOnboarding: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-29",
      },
      ramAndCacheImprovementsForSwaps: {
        kind: "rollout",
        owner: "drew-baton",
        created: "2026-10-13",
        expires: "2026-12-31",
        exit: {
          signal:
            "drew-baton retires the referral-fee lane keys once the lane has served true with no targeting (both keys have since 2026-10-16); web's read then resolves to always-on",
          claim: "manual",
          window: "3d",
          basis:
            "Mobile's lane rollout owns the keys; web only mirrors its gate for the vault surfaces on /referrals, so the exit is the lane's: three days of GET /fees/referral/:wallet answering 200 for prod wallets after the keys are retired, then useReferralFeeLaneEnabled returns true and both keys leave the registry together",
        },
      },
      bridgeConnectionPoolWarmup: {
        kind: "rollout",
        owner: "drew-baton",
        created: "2026-10-13",
        expires: "2026-12-31",
        exit: {
          signal:
            "drew-baton retires the referral-fee lane keys once the lane has served true with no targeting (both keys have since 2026-10-16); web's read then resolves to always-on",
          claim: "manual",
          window: "3d",
          basis:
            "The bridge half of the same lane rollout, read by web only as the other arm of useReferralFeeLaneEnabled; it exits with REFERRAL_FEES_SWAP_LANE",
        },
      },
      webWalletAdapterDeprecationNotice: {
        kind: "rollout",
        owner: "lukes-baton",
        created: "2026-09-09",
      },
      webWalletAdapterCutover: {
        kind: "rollout",
        owner: "lukes-baton",
        created: "2026-09-09",
      },
      webV1Transactions: {
        kind: "rollout",
        owner: "sushant-baton",
        created: "2026-09-26",
      },
      webPrivyWalletMigration: {
        kind: "rollout",
        owner: "lukes-baton",
        created: "2026-10-02",
      },
      webSettingsHub: {
        kind: "rollout",
        owner: "lukes-baton",
        created: "2026-09-10",
      },
      webCoinChartTables: {
        kind: "rollout",
        owner: "lukes-baton",
        created: "2026-09-10",
      },
      webInstantCoinChart: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-14",
      },
      webCoinChartInstantPreview: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-08",
      },
      webCoinFloatingTrade: {
        kind: "rollout",
        owner: "lukes-baton",
        created: "2026-09-09",
      },
      webProfileAchievements: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-21",
      },
      webAvatarDecorations: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-30",
      },
      webProfilePortfolioChart: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-21",
      },
      webProfilePortfolioChartAllPeriod: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-14",
      },
      webLivePlayerQuickTrade: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-22",
      },
      webAchievementAvatarChips: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-21",
      },
      webLiveCardQuickTrade: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-22",
      },
      webRewardsPage: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-22",
      },
      webModerationLegacyPagesRetired: {
        kind: "rollout",
        owner: "rafe-baton",
        created: "2026-09-23",
      },
      webMayhemMultiplayer: {
        kind: "rollout",
        owner: "shrihari-baton",
        created: "2026-09-17",
      },
      webHolderRewardsAscendingFloor: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-01",
      },
      webHolderRewardsMarketCapSort: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-01",
      },
      webTwoFactorAuth: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-09",
        expires: "2026-12-31",
        exit: {
          signal:
            "hujoe-baton sign-off once the two-factor verification matrix in mobile's docs/auth/two-factor-web-handoff.md is green on pump.fun, privy-wallet.pump.fun and token.pump.fun and the card has served the public cohort; RUM action privy-mfa-enrollment (feature:auth) by operation is the running count of enrollments and removals",
          claim: "manual",
          window: "3d",
          basis:
            "Release flag, no metric to beat: ON only shows the card and Privy enforces verification for every enrolled account whatever the flag says. 3 days = one full weekday cycle of enrollments after the public flip with RUM feature:auth operation:privy-sign-in-stopped flat against the week before, then the key is retired with the card always on",
        },
      },
      uapiStreamHeader: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-09-30",
      },
      uapiStreamTape: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-09-30",
      },
      uapiStreamChart: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-09-30",
        expires: "2026-12-15",
        exit: {
          signal:
            "Datadog RUM service:frontend @action.name:live_feed_stalled per coin-page session, the stream cohort (uapiStreamChart ON) against the NATS cohort, with @action.name:chart_truncated and the chart reconcile mismatch count as the guard rails",
          claim: "parity",
          window: "2h",
          basis:
            "vendor-live-stream wave D5 part 2: a 2 h soak on the harness-web-verify segment once cc trade_serve streams vendor-served coins (cc #4156, flag coinCommunitiesTradeApiVendorStream ON); the NATS leg's stall rate over the preceding 7 d is the baseline the stream cohort must not exceed, then the ramp and FE-2 deletes the NATS legs and the three uapiStream* coin-page flags",
        },
      },
      uapiStreamLists: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-09-30",
      },
      uapiStreamHolders: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-09-30",
      },
      uapiStreamBoards: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-09-30",
      },
      webTrendingBoard: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-25",
      },
      webBoardFacesEmbedded: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-21",
        exit: {
          signal:
            "hujoe-baton: advanced-indexer-aws #855 is deployed to prod and signed-in deck Trending rows carry `fh` from the board read, with advanced_indexer_aws.movers.followed_holders_unhonored flat",
          claim: "manual",
          window: "7d",
          basis:
            "one week of the web's signed-in board polls carrying the opt-in at full weight before the read resolves to ON and the side read + fill stay as the fallback only",
        },
      },
      webCoinYoursTab: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-21",
        exit: {
          signal:
            "hujoe-baton: the Yours tab is ON for every signed-in viewer in production with client-server's GET /user-trades/{id} error rate and p95 flat against the week before",
          claim: "manual",
          window: "7d",
          basis:
            "one week of every signed-in coin page view reading the viewer's own history at full weight before the key resolves to ON and the gate is deleted",
        },
      },
      webSearchMixedResults: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-02",
      },
      webNearChain: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-10-15",
        expires: "2027-01-15",
        exit: {
          signal:
            "trevor-baton: the NEAR cutover ladder (near-wave S10, uapiNear* Cards -> Trades + Holders -> Positions -> Bookmarks -> Callouts) is verified on prod and the flag serves true with no targeting",
          claim: "manual",
          window: "3d",
          basis:
            "R16 step 10 holds each rung 24 h; 3d is the post-cutover watch (R17) before the read resolves to the shipped value and the flag is removed.",
        },
      },
      webStarknetChain: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-10-22",
        expires: "2027-01-22",
        exit: {
          signal:
            "trevor-baton: the Starknet cutover ladder (starknet-wave SK-S10, uapiStarknet* Cards -> Trades + Holders -> Positions -> Bookmarks -> Callouts) is verified on prod and the flag serves true with no targeting",
          claim: "manual",
          window: "3d",
          basis:
            "SK-R16 step 10 holds each rung 24 h; 3d is the post-cutover watch before the read resolves to the shipped value and the flag is removed.",
        },
      },
      webProfileLeaderboardRank: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-02",
      },
      webPerps: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-07",
      },
      webPerpsOptimisticPosition: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-17",
        expires: "2026-11-28",
        exit: {
          signal:
            "Datadog logs service:frontend perp_position_optimistic: @outcome:confirmed on at least 95% of rows with @confirmed_after_ms under 15000, the rest @outcome:expired (frontend PR feat/perps-optimistic-position)",
          claim: "manual",
          window: "3d",
          basis:
            "Mobile's series confirms its rows 2.5–3.5 s after the fill; web opens are few and sampled at 20%, so 3d collects a comparable handful; resize once the web series fills.",
        },
      },
      webPerpsPresignEntry: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-17",
        expires: "2026-11-28",
        exit: {
          signal:
            "Datadog logs service:frontend perp_flow_result @flow:open: @entry_presigned:true runs' avg @total_ms at or under mobile's presigned lane (4.2 s) with @entry_fallback on under 10% of them (frontend #11117)",
          claim: "parity",
          window: "3d",
          basis:
            "Mobile beta's perp_flow_result over 7 days: 17 presigned USDC opens at 4.2 s avg against 49 poll-then-build at 7.4 s; web opens ship at 20% session sampling and number a few a day, so 3d collects a comparable handful; resize once the web series fills.",
        },
      },
      webPerpsCalloutFeed: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-19",
        expires: "2026-11-30",
        exit: {
          signal:
            "hujoe-baton: owner sign-off once the Callouts tab on /perps/[coin] serves the market's thesis rows with their side pills for the team wallets and Datadog RUM service:frontend shows no error naming PerpMarketCallouts (frontend PR feat/perps-market-callout-feed; declares no series)",
          claim: "manual",
          window: "3d",
          basis:
            "A new tab on a page every viewer already sees: three days of the team's own use before widening, as the perps retrofit flags of 10-17 did.",
        },
      },
      webPerpsMarginTopUp: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-17",
        expires: "2026-11-28",
        exit: {
          signal:
            "Datadog logs service:frontend perp_flow_result @flow:margin_top_up: @margin_top_up:added or a server skip (nothing_to_add) on at least 95% of runs, failures under 5% (frontend PR feat/perps-margin-top-up)",
          claim: "manual",
          window: "3d",
          basis:
            "Mobile's margin_top_up series lands in ~1.5 s per run; web opens are few and sampled at 20%, so 3d collects a comparable handful; resize once the web series fills.",
        },
      },
      webPerpsCalloutCompose: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-21",
        expires: "2026-12-02",
        exit: {
          signal:
            "hujoe-baton: owner sign-off once a team wallet posts a perp callout from /perps/[coin] that lands on the tab and its callout page, with no create refusal in Datadog RUM service:frontend naming PerpCalloutComposerDialog (frontend PR feat/perps-callout-composer; declares no series)",
          claim: "manual",
          window: "3d",
          basis:
            "A write path on a page every viewer already sees: three days of the team's own posts before widening, as the perps Callouts tab flag did.",
        },
      },
      webPerpsCloseOnFill: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-27",
        expires: "2026-12-08",
        exit: {
          signal:
            "hujoe-baton: owner sign-off once team closes confirm on the fill with the payout snackbar landing after, and Datadog RUM service:frontend shows no rise in perp_flow_result close_payout outcome:error against the flag-off week (frontend PR feat/perps-close-on-fill; declares no series)",
          claim: "manual",
          window: "7d",
          basis:
            "Mobile ran the same cut (mobile #23655) at 100% from 10-16 with the close UI going from ~6.5 s to the ~1.6 s fill; a week of web closes at 20% RUM sampling is the comparable handful.",
        },
      },
      webPerpsPayoutFastSign: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-27",
        expires: "2026-12-08",
        exit: {
          signal:
            "Datadog logs service:frontend perp_flow_result @flow:(close_payout OR withdraw) @payout_fast_sign:true runs' avg @time_to_sign_ms under the flag-off runs' with no rise in @outcome:error (frontend branch feat/perps-payout-fast-sign-build-first)",
          claim: "parity",
          window: "3d",
          basis:
            "Mobile's perpsPayoutFastSign has served 100% since 10-20 on its Privy-embedded sessions, each signature a 130-170 ms round trip; web payouts number a few a day at 20% RUM sampling, so 3d collects a comparable handful.",
        },
      },
      webPerpsPayoutBuildFirst: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-27",
        expires: "2026-12-08",
        exit: {
          signal:
            "Datadog logs service:frontend perp_flow_result @flow:close_payout: runs with @payout_build_first_wait_ms set show a lower avg @time_to_build_ms than the flag-off runs with no rise in @outcome:error (frontend branch feat/perps-payout-fast-sign-build-first)",
          claim: "parity",
          window: "3d",
          basis:
            "Mobile measured its payout build leaving 75-163 ms behind the fill's screen work on six closes (10-16 to 10-20) and has served the lane at 100% since; web closes number a few a day, so 3d collects a comparable handful.",
        },
      },
      webPerpsPresignClose: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-27",
        expires: "2026-12-08",
        exit: {
          signal:
            "Datadog logs service:frontend perp_flow_result @flow:close @presign:(hit OR inflight_hit) runs' avg @total_ms under the @presign:disabled runs' with @presign_fallback on under 10% of them and no rise in @outcome:error (frontend branch feat/perps-presign-close)",
          claim: "parity",
          window: "3d",
          basis:
            "Mobile's perpsPresignClose has served 100% since 10-16, taking the build (~0.6 s) and the prompt off the Max close; web closes number a few a day at 20% RUM sampling, so 3d collects a comparable handful.",
        },
      },
      webPerpsPresignOpen: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-27",
        expires: "2026-12-08",
        exit: {
          signal:
            "Datadog logs service:frontend perp_flow_result @flow:open @presign:(hit OR inflight_hit) runs' avg @total_ms under the @presign:disabled runs' with @outcome:error no higher (frontend branch feat/perps-presign-open)",
          claim: "parity",
          window: "3d",
          basis:
            "Mobile's perpsPresignOpen has served 100% since 10-19, taking the build and every prompt off the tap; web opens number a few a day at 20% RUM sampling, so 3d collects a comparable handful.",
        },
      },
      webPerpsBridgeRail: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-27",
        expires: "2026-12-08",
        exit: {
          signal:
            "Datadog logs service:frontend perp_flow_result @flow:(withdraw OR close_payout) @rail:bridge runs' @outcome:ok share and avg @total_ms at parity with the @rail:relay runs' over the window, with @rail_fallback_reason set on under 10% of the @rail_requested:bridge runs (frontend branch feat/perps-bridge-rail-payout)",
          claim: "parity",
          window: "3d",
          basis:
            "Mobile's perpsBridgeRail serves a 25% rollout of its payouts in production (one signature instead of two, a transient send resent on the same intent); web payouts number a few a day at 20% RUM sampling, so 3d collects a comparable handful.",
        },
      },
      webPerpsClosePayoutAsset: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-21",
        expires: "2026-12-02",
        exit: {
          signal:
            "Datadog logs service:frontend perp_flow_result @flow:close @outcome:ok with @denomination_out:sol on real closes and no rise in withdraw_after_close_failed vs the USDC baseline (frontend PR feat/perps-close-payout-asset)",
          claim: "manual",
          window: "7d",
          basis:
            "Web closes are few and sampled at 20%; mobile's SOL payouts have run since its perps launch, so a week of web runs is enough to compare the two legs.",
        },
      },
      webPerpsVenueSwitch: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-21",
        expires: "2026-12-02",
        exit: {
          signal:
            "Datadog RUM action perps_venue_switch (direction spot_to_perp / perp_to_spot) seen on real sessions for a week with no rise in coin-page or perp-page errors (frontend PR feat/perps-venue-switch)",
          claim: "manual",
          window: "7d",
          basis:
            "Mobile ships the same chip under perpsDiscovery; a week of web sessions is enough to see it used and to compare error rates.",
        },
      },
      webMegaethChain: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-10-08",
      },
      bridgeStockRegionRouting: {
        kind: "rollout",
        owner: "drew-baton",
        created: "2026-10-15",
        expires: "2027-01-15",
        exit: {
          signal:
            "drew-baton: owner sign-off once production serves the flag ON to every viewer on web and mobile, which share the key (frontend #10908, mobile #23563; declares no series)",
          claim: "manual",
          window: "3d",
          basis:
            "#10908 records no baseline: restricted-region Robinhood (4663) stock trades are a small EU/EEA cohort, so 3d is provisional until the owner sizes the window from the daily count of internal-bridge 403 bridge_region_restricted answers to web.",
        },
      },
      webXlayerChain: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-10-12",
      },
      webPolygonChain: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-10-16",
        expires: "2026-11-27",
        exit: {
          signal:
            "trevor-baton: owner sign-off once eip155:137 rows render on the web rosters and coin page with the flag on (polygon-wave FE-1; declares no series)",
          claim: "manual",
          window: "1d",
          basis:
            "polygon-wave FE-1 records no baseline: the flag is dark until the Polygon wave's serving units roll; 1d is provisional until the owner names a series and sizes the window from it.",
        },
      },
      webArbitrumChain: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-10-26",
        expires: "2026-12-07",
        exit: {
          signal:
            "trevor-baton: owner sign-off once eip155:42161 rows render on the web rosters and coin page with the flag on (arbitrum-wave FE-1; declares no series)",
          claim: "manual",
          window: "1d",
          basis:
            "arbitrum-wave FE-1 records no baseline: the flag is dark until the Arbitrum wave's serving units roll; do not flip before @pump-fun/schemas >= 6.255.0 lands on web (REVIEW.md EVM, case #1739): at 6.223.0 the coin page can neither quote nor label 42161 while Privy registers it; 1d is provisional until the owner names a series and sizes the window from it.",
        },
      },
      webTonChain: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-10-16",
        expires: "2026-11-27",
        exit: {
          signal:
            "trevor-baton: owner sign-off once ton:-239 rows render on the web rosters and coin page with the flag on (frontend #11044, ton-ready FE-1; declares no series)",
          claim: "manual",
          window: "1d",
          basis:
            "#11044 records no baseline: the flag is dark until the TON ready wave's serving units roll; 1d is provisional until the owner names a series and sizes the window from it.",
        },
      },
      portfolioLiveReprice: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-10-15",
        expires: "2026-11-26",
        exit: {
          signal:
            "trevor-baton: owner sign-off on the profile card and topbar totals (frontend #11008 declares no series)",
          claim: "manual",
          window: "1d",
          basis:
            "#11008 records no baseline; 1d is provisional until the owner names a series and sizes the window from it.",
        },
      },
      webPacks: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-19",
        expires: "2026-12-18",
        exit: {
          signal:
            "hujoe-baton: owner sign-off once production serves the flag ON to every viewer with the whole Packs port live (frontend #11162 -> #11164 -> the storefront, opening, binder + market and turbo PRs; declares no series)",
          claim: "manual",
          window: "3d",
          basis:
            "The port ships dark behind this one flag across five stacked PRs and has no web baseline; 3d is provisional until the storefront's RUM views and the cc-* proxy's error rate give a series to size the window from.",
        },
      },
      webPhygitalsMigration: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-10-23",
        expires: "2027-01-23",
        exit: {
          signal:
            "hujoe-baton: owner sign-off once production serves the flag ON to every Packs viewer and mobile's phygitalsMigration has shipped the same way (the two read one coin-communities catalog)",
          claim: "manual",
          window: "3d",
          basis:
            "The lane ships dark inside webPacks with no web baseline; 3d is provisional until the catalog hub's RUM views and the packs-* proxy's error rate give a series to size the window from.",
        },
      },
      blockchainCoinScamBlacklistMints: {
        kind: "ops",
        owner: "hujoe-baton",
        created: "2026-09-29",
      },
      blockchainCoinWarningBypassMints: {
        kind: "ops",
        owner: "hujoe-baton",
        created: "2026-09-29",
      },
      candlesShadowReadPercent: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-10-12",
      },
      webExploreSocialTerminal: {
        kind: "rollout",
        owner: "hujoe-baton",
        created: "2026-09-23",
        expires: "2026-12-15",
        exit: {
          signal:
            "hujoe-baton: owner sign-off on the social-terminal explore page (the chain #10185 -> #10983 ships behind the flag; production fallthrough is TRUE for internal review only, OFF before the devnet -> main ship)",
          claim: "manual",
          window: "1d",
          basis:
            "No series yet: OFF renders the legacy explore toolbar and table byte for byte; 1d is provisional until the ship names a RUM series (explore views, lens presses) and sizes the window from it.",
        },
      },
      squadCupInterval: {
        kind: "rollout",
        owner: "trevor-baton",
        created: "2026-10-26",
        expires: "2027-01-26",
        exit: {
          signal:
            "trevor-baton: owner sign-off that the squad profile's Cup interval (positions, header score, members as scored) matches the competition's served figures on web and mobile, and the flag serves true with no targeting",
          claim: "manual",
          window: "3d",
          basis:
            "No series yet: OFF renders the squad profile without a Cup stop and issues no competition read; the rollout starts on individual wallet targets, and 3d is the post-fallthrough watch before the read resolves to the shipped value and the flag is removed.",
        },
      },
    },
    i = new Set(Object.values(o).filter((e) => "experiment" === a[e].kind));
  e.s(["D", () => o, "K", () => n, "C", 0, (e) => i.has(e)]);
};
