// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = {
    COIN_PAGE: {
      MISC_BUTTON: { BUY: "Buy", LOG_IN: "Log in to trade", TRADE: "Trade" },
      NOTIFY_ME_BUTTON: { TITLE: "Notify me" },
    },
    CREATE_COIN_PAGE: {
      SECTION: {
        DETAIL: {
          BUTTON: { CREATE: "Create coin", LOGIN: "Login to create coin" },
          CREATE: {
            CHOOSE_HOW_MANY: "Choose how many",
            LOADING: "May take a few seconds to upload image data...",
            SWITCH_TO: "Switch to",
            TIP: "Tip: its optional but buying a small amount of coins helps protect your coin from snipers",
            YOU_WANT_TO_BUY: "you want to buy (optional)",
          },
          DESCRIPTION:
            "Choose carefully, these can't be changed once the coin is created",
          INPUT: {
            BANNER: {
              DESCRIPTION:
                "This will be shown on the coin page in addition to the coin image. Images or animated GIFs up to 4.5 MB; larger images are resized automatically, GIFs are not. 3:1 aspect ratio, 1500x500px recommended. You can only do this when creating the coin, and it cannot be changed later.",
              LABEL: "Upload banner",
            },
            DESCRIPTION: {
              LABEL: "Description",
              PLACEHOLDER: "Write a short description",
            },
            FILE_DROPZONE: {
              LOG_IN: "Log in",
              OR_DRAG_AND_DROP: "or drag and drop it here",
              REPLACE: "Replace",
              SELECT_FILE: "Select file",
              SELECT_VIDEO_OR_IMAGE: "Select video or image to upload",
              UPLOAD_FILE: "Upload file...",
            },
            FILE_INFO: {
              FILE: {
                BANNER:
                  "Image - max 4.5 MB (larger images are resized automatically, GIFs are not). '.jpg', '.png', '.webp' or '.gif'",
                IMAGE: "Image - max 15mb. '.jpg', '.gif' or '.png' recommended",
                LABEL: "File size and type",
                VIDEO: "Video - max 30mb. '.mp4' recommended",
              },
              RESOLUTION: {
                BANNER: "3:1 aspect ratio, 1500x500px recommended",
                IMAGE: "Image - min. 1000x1000px, 1:1 square recommended",
                LABEL: "Resolution and aspect ratio",
                VIDEO: "Video - 16:9 or 9:16, 1080p+ recommended",
              },
            },
            NAME: { LABEL: "Coin name", PLACEHOLDER: "Name your coin" },
            OPTIONAL: "(Optional)",
            TELEGRAM: { LABEL: "Telegram", PLACEHOLDER: "Add URL" },
            TICKER: {
              LABEL: "Ticker",
              PLACEHOLDER: "Add a coin ticker (e.g. DOGE)",
            },
            WEBSITE: { LABEL: "Website", PLACEHOLDER: "Add URL" },
            X: { LABEL: "X", PLACEHOLDER: "Add URL" },
          },
          LABEL: {
            BANNER: "Add banner",
            COIN_DATA:
              "Coin data (social links, banner, etc) can only be added now, and can't be changed or edited after creation",
            SOCIAL_LINKS: "Add social links",
          },
          PREVIEW: {
            DESCRIPTION: "A preview of how the coin will look like",
            TITLE: "Preview",
          },
          TITLE: "Coin details",
        },
      },
      TITLE: "Create new coin",
    },
    FOOTER: {
      BLOG: "Blog",
      CHARITY_COINS: "Charity coins",
      COPYRIGHT: "© Pump.fun",
      DMCA_POLICY: "DMCA policy",
      FEES: "Fees",
      GO_FUN_TERMS: "Go.fun terms",
      LIVESTREAM_POLICY: "Livestream policy",
      PRIVACY_POLICY: "Privacy policy",
      REVENUE: "Revenue",
      SECTION_LEGAL: "Legal",
      SECTION_RESOURCES: "Resources",
      TERMS_OF_SERVICE: "Terms of service",
      TOKENIZED_AGENT_DISCLAIMER: "Tokenized agent disclaimer",
      TRADEMARK_GUIDELINES: "Trademark guidelines",
      UPDATES: "Tech updates",
    },
    HOME_PAGE: {
      BANNER: {
        MOBILE_UPSELL: {
          BUTTON: "Download now",
          TITLE_BOTTOM: "Pump is faster on app. Download now",
          TITLE_TOP: "Pump is better on mobile. faster trades and more.",
        },
      },
      CAROUSEL: {
        TRENDING_V1: { TITLE: "Trending coins" },
        TRENDING_V2: {
          LOADING: "Trending coins are not available at the moment",
          TITLE: "Now trending",
        },
      },
      SEARCH_INPUT: {
        ARIA_LABEL: "Search for coins and users",
        NO_COIN_RESULTS: "No coins found",
        PLACEHOLDER: "Search for coins and users...",
        SEARCH: "Search",
        VIEW_ALL: "View all search results",
      },
      TABS: { EXPLORE: "Explore", WATCHLIST: "Watchlist" },
      TITLE: "[Start a new coin]",
    },
    LIVESTREAM_PAGE: { TITLE: "Livestreams" },
    NAV_BAR: {
      BUTTON: { CREATE: "Create", GO_LIVE: "Go live", LOG_IN: "Sign in" },
      STATUS: { SIGNED_IN: "Signed in" },
    },
    PROFILE_PAGE: {
      BALANCES: {
        AMOUNT: "Amount",
        COIN: "Coin",
        COINS: "Coins",
        INVESTED: "Invested",
        MCAP: "MC",
        PNL: "PnL",
        VALUE: "Value",
      },
      FOLLOW_BUTTON: {
        FOLLOW: "Follow",
        FOLLOWING: "Following",
        LOG_IN: "Log in to follow",
        UNFOLLOW: "Unfollow",
      },
      TABS: {
        CALLOUTS: "Callouts",
        COINS_CREATED: "Created coins",
        FOLLOWERS: "Followers",
        FOLLOWING: "Following",
      },
      TITLE_VIEW_ON_SOLSCAN: "Solscan",
    },
    SIDEBAR: {
      NAVIGATION: {
        BOARD: "Board",
        BOUNTIES: "GO",
        CREATE: "Create coin",
        CREATE_BOUNTY: "Post bounty",
        DMCA_POLICY: "DMCA policy",
        EXPLORE: "Explore",
        FEATURE_FLAGS: "Flags",
        FEED: "Feed",
        HELP_AND_SUPPORT: "Help & support",
        HOME: "Home",
        HOW_IT_WORKS: "How it works",
        LEADERBOARD: "Leaderboard",
        LIVESTREAM: "Live",
        LIVESTREAM_MOBILE: "Live",
        LIVESTREAM_POLICY: "Livestream policy",
        MAYHEM: "Mayhem",
        MORE: "More",
        PROFILE: "Profile",
        PUMP_TOKEN: "$PUMP",
        PUMP_SWAP: "PumpSwap",
        SUPPORT: "Support",
        TERMINAL: "Terminal",
        TOKENIZED_AGENT_DISCLAIMER: "Tokenized agent disclaimer",
        TRADEMARK_GUIDELINES: "Trademark guidelines",
      },
      NEW_BADGE: "New",
      QR_CODE: {
        BUTTON: "Learn more",
        CTA_BUTTON: "Try app",
        SUBTITLE: "Scan to download",
        TITLE: "Pump is faster on the app",
      },
    },
  };
  e.s(["f", 0, t]);
};
