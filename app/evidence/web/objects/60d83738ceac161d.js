(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,387556,e=>{var r=e.i(352386);let a=r.forwardRef(function({title:e,titleId:a,...o},i){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":a},o),e?r.createElement("title",{id:a},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"}))});e.s(["f",0,a])},839326,e=>{var r=e.i(352386);let a=r.forwardRef(function({title:e,titleId:a,...o},i){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":a},o),e?r.createElement("title",{id:a},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"}))});e.s(["f",0,a])},91656,e=>{var r=e.i(732486),a=e.i(352386),o=e.i(768820),i=e.i(689391),t=e.i(827432),n=e.i(616800),l=e.i(583503),c=e.i(933185),s=e.i(439614),d=e.i(809845),u=e.i(520417),p=e.i(389238),g=e.i(565530),v=e.i(461687),h=e.i(748117),b=e.i(636447),m=e.i(203793),y=e.i(432250),w=e.i(857366),f=e.i(335341),x=e.i(336291);e.i(785373),e.i(535391),e.i(252494);let C=e=>{let r=localStorage.getItem("-walletlink:https://www.walletlink.org:Addresses")?.split(" ").filter(e=>(0,u.f)(e,{strict:!0})).map(e=>(0,p.A)(e));return!!r?.length&&!!e?.linkedAccounts.filter(e=>"wallet"==e.type&&r.includes(e.address)).length},k=new Set(["phantom"]),S=e=>e&&k.has(e.toLowerCase())?"transaction":"offchain-message",V=e=>e?.privyErrorCode===g.a.LINKED_TO_ANOTHER_USER?d.C.ERROR_USER_EXISTS:e instanceof d.P&&!e.details.default?e.details:e instanceof d.b?d.C.ERROR_TIMED_OUT:e?.privyErrorCode===g.a.CANNOT_LINK_MORE_OF_TYPE?d.C.ERROR_USER_LIMIT_REACHED:d.C.ERROR_WALLET_CONNECTION,T=({walletLogo:e,title:a,subtitle:o,signSuccess:i,errorMessage:t,connectSuccess:n,separateConnectAndSign:c,signing:u,walletConnectRedirectUri:p,walletConnectFallbackUniversalUri:g,hasTabbedAway:v,showCoinbaseWalletResetCta:h,numRetries:b,onBack:m,onSign:y,onRetry:w,onCoinbaseReset:x,onDifferentWallet:C})=>{let{t:k}=(0,s.u)(),S=h?{label:"Use a different wallet",onClick:x,disabled:i}:t===d.C.ERROR_USER_EXISTS&&m?{label:"Use a different wallet",onClick:C}:n&&!i&&c?{label:u?"Signing":"Sign with your wallet",onClick:y,disabled:u}:!i&&t?.retryable&&b<2?{label:"Retry",onClick:w,disabled:!1}:i||t?void 0:{label:k("connectionStatus.connecting"),onClick:()=>{},disabled:!0};return(0,r.jsx)(f.S,{title:a,subtitle:o,icon:e,iconVariant:"loading",iconLoadingStatus:{success:i,fail:!!t},primaryCta:S,onBack:m,watermark:!0,children:!n&&p&&!v&&(0,r.jsxs)(j,{children:[k("connectionStatus.stillHere")," ",(0,r.jsx)(l.L,{href:p,target:"_blank",variant:"underlined",size:"sm",children:k("connectionStatus.tryConnectingAgain")}),g&&(0,r.jsxs)(r.Fragment,{children:[" ",k("connectionStatus.or")," ",(0,r.jsx)(l.L,{href:g,target:"_blank",variant:"underlined",size:"sm",children:k("connectionStatus.useDifferentLink")})]})]})})},D={component:()=>{var e,i;let l,u,[p,f]=(0,a.useState)(!1),[k,D]=(0,a.useState)(!1),[j,z]=(0,a.useState)(void 0),{authenticated:F,logout:E}=(0,c.u)(),{navigate:U,navigateBack:R,lastScreen:W,currentScreen:L,setModalData:$,data:A}=(0,b.u)(),P=(0,c.a)(),{t:_}=(0,s.u)(),{getAuthFlow:M,walletConnectionStatus:N,closePrivyModal:I,initLoginWithWallet:B,loginWithWallet:O,updateWallets:Z,createAnalyticsEvent:H}=(0,h.u)(),{walletConnectors:Y}=(0,c.u)(),[q,K]=(0,a.useState)(0),{user:X}=(0,c.u)(),[G]=(0,a.useState)(X?.linkedAccounts.length||0),[Q,J]=(0,a.useState)(""),[ee,er]=(0,a.useState)(""),[ea,eo]=(0,a.useState)(!1),{hasTabbedAway:ei}=function(){let[e,r]=(0,a.useState)(!1),o=(0,a.useCallback)(()=>{document.hidden&&r(!0)},[]);return(0,a.useEffect)(()=>(document.addEventListener("visibilitychange",o),()=>document.removeEventListener("visibilitychange",o)),[o]),{hasTabbedAway:e,reset:()=>r(!1)}}(),{enabled:et,token:en}=(0,n.a)(),el=(0,v.k)(N?.connector?.walletClientType||"unknown"),ec=o.isMobile&&"wallet_connect_v2"===N?.connector?.connectorType||o.isMobile&&"coinbase_wallet"===N?.connector?.connectorType||o.isMobile&&"base_account"===N?.connector?.connectorType||o.isMobile&&"injected"===N?.connector?.connectorType&&"phantom"===N?.connector?.walletClientType||o.isMobile&&"solana_adapter"===N?.connector?.connectorType&&"mobile_wallet_adapter"===N.connector.walletClientType,es="connected"===N?.status,ed="switching_to_supported_chain"===N?.status;(0,a.useEffect)(()=>{let e=M(),r=e instanceof t.S||e instanceof n.S?e:void 0;es&&"solana"===N.connector?.chainType&&(0,y.g)(w.a)&&void 0===A?.login?.isSigningInWithLedgerSolana?U("ConnectLedgerScreen",!1):(es&&!r&&(!et||en||F?B(N.connectedWallet,en,A?.login?.disableSignup,A?.login?.isSigningInWithLedgerSolana?S(N.connector?.walletClientType):"plain").then(()=>{eo(!0)}):($({captchaModalData:{callback:e=>B(N.connectedWallet,e,A?.login?.disableSignup,A?.login?.isSigningInWithLedgerSolana?S(N.connector?.walletClientType):"plain").then(()=>{eo(!0)}),userIntentRequired:!1,onSuccessNavigateTo:"ConnectionStatusScreen",onErrorNavigateTo:"ErrorScreen"}}),U("CaptchaScreen",!1))),r instanceof n.S&&A?.login?.isSigningInWithLedgerSolana&&(r.messageType=S(r.meta.walletClientType)),r&&ec&&es&&!r.preparedMessage?r.buildMessage():r&&!ec&&es&&(k||(async()=>{D(!0),z(void 0);try{"wallet_connect_v2"===N?.connector?.connectorType&&"metamask"===N?.connector?.walletClientType&&await (0,x.a)(2500),await ep()}catch(e){console.warn("Auto-prompted signature failed",e)}finally{D(!1)}})()))},[q,es,ea]),(0,a.useEffect)(()=>{if(X&&p){let e=c.Q-500;if(P?.legal.requireUsersAcceptTerms&&!X.hasAcceptedTerms){let r=setTimeout(()=>{U("AffirmativeConsentScreen")},e);return()=>clearTimeout(r)}if((0,m.s)(X,P.embeddedWallets)){let r=setTimeout(()=>{$({createWallet:{onSuccess:()=>{},onFailure:e=>{console.error(e),H({eventName:"embedded_wallet_creation_failure_logout",payload:{error:e,screen:"ConnectionStatusScreen"}}),E()},callAuthOnSuccessOnClose:!0}}),U("EmbeddedWalletOnAccountCreateScreen")},e);return()=>clearTimeout(r)}Z();let r=setTimeout(()=>I({shouldCallAuthOnSuccess:!0,isSuccess:!0}),c.Q);return()=>clearTimeout(r)}},[X,p]);let eu=e=>{if(e?.privyErrorCode!==g.a.ALLOWLIST_REJECTED){if(e?.privyErrorCode===g.a.USER_LIMIT_REACHED)return console.error(new g.j(e).toString()),void U("UserLimitReachedScreen");if(e?.privyErrorCode!==g.a.USER_DOES_NOT_EXIST)return e?.privyErrorCode===g.a.ACCOUNT_TRANSFER_REQUIRED&&e.data?.data?.nonce?($({accountTransfer:{nonce:e.data?.data?.nonce,account:M()?.meta.address,displayName:e.data?.data?.account?.displayName,externalWalletMetadata:{walletClientType:M()?.meta.walletClientType,chainId:M()?.meta.chainId,connectorType:M()?.meta.connectorType},linkMethod:M()instanceof t.S?"siwe":"siws",embeddedWalletAddress:e.data?.data?.otherUser?.embeddedWalletAddress}}),void U("LinkConflictScreen")):void z(V(e));U("AccountNotFoundScreen")}else U("AllowlistRejectionScreen")};async function ep(){try{await O(),f(!0)}catch(e){eu(e)}finally{D(!1)}}(0,a.useEffect)(()=>{N?.connectError&&eu(N?.connectError)},[N]),e=()=>{let e="wallet_connect_v2"===eg&&N?.connector instanceof t.W?N.connector.redirectUri:void 0;e&&J(e);let r="wallet_connect_v2"===eg&&N?.connector instanceof t.W?N.connector.fallbackUniversalRedirectUri:void 0;r&&er(r)},i=N?.connector instanceof t.W&&!Q?500:null,l=(0,a.useRef)(()=>{}),(0,a.useEffect)(()=>{l.current=e}),(0,a.useEffect)(()=>{if(null!==i){let e=setInterval(()=>l.current(),i||0);return()=>clearInterval(e)}},[i]);let eg=N?.connector?.connectorType||"injected",ev=N?.connector?.walletClientType||"unknown",eh=el?.metadata?.shortName||el?.name||N?.connector?.walletBranding.name||"Browser Extension",eb=el?.image_url?.md||N?.connector?.walletBranding.icon||(e=>(0,r.jsx)(t.B,{...e})),em="Browser Extension"===eh?eh.toLowerCase():eh;u=p?_("connectionStatus.successfullyConnected",{walletName:em}):j?_("connectionStatus.errorTitle",{errorMessage:j.message}):ed?"Switching networks":es?k&&ec?"Signing":"Sign to verify":`Waiting for ${em}`;let ey=_("connectionStatus.checkOtherWindows");p?ey=G===(X?.linkedAccounts.length||0)?"Wallet was already linked.":"coinbase_wallet"===eg?_("coinbaseWallet.successSubtitle"):"You're good to go!":q>=2&&j?ey="Unable to connect wallet":j?ey=j.detail:ed?ey="Switch your wallet to the requested network.":es&&ec?ey="Sign the message in your wallet to verify it belongs to you.":"metamask"===ev&&o.isMobile?ey="Click continue to open and connect MetaMask.":"metamask"===ev?ey="For the best experience, connect only one wallet at a time.":"wallet_connect"===eg?ey="Open your mobile wallet app to continue":"coinbase_wallet"===eg?ey=_(C(X)?"coinbaseWallet.connectingSubtitleReset":"coinbaseWallet.connectingSubtitle"):A?.login?.isSigningInWithLedgerSolana&&(ey="Ledger requires a transaction to verify your identity. You'll sign a transaction that performs no onchain action.");let ew=Y?.walletConnectors?.find(e=>"coinbase_wallet"===e.walletClientType),ef="coinbase_wallet"===ev&&(C(X)||j===d.C.ERROR_USER_EXISTS);return(0,r.jsx)(T,{walletLogo:eb,title:u,subtitle:ey,signSuccess:p,errorMessage:j,connectSuccess:es,separateConnectAndSign:ec,signing:k,walletConnectRedirectUri:Q,walletConnectFallbackUniversalUri:ee,hasTabbedAway:ei,showCoinbaseWalletResetCta:ef,numRetries:q,onBack:W&&L!==W?R:void 0,onSign:()=>{D(!0),ep()},onRetry:()=>{K(q+1),z(void 0),es?(D(!0),ep()):N?.connectRetry()},onCoinbaseReset:()=>{ew&&ew?.disconnect()},onDifferentWallet:R})}},j=i.z.p`
  text-align: center;
  color: var(--privy-color-foreground-2);
  font-size: 14px;
  line-height: 22px;
  margin: 16px 0;
`;e.s(["ConnectionStatusScreen",0,D,"ConnectionStatusView",0,T,"default",0,D,"getErrorDetails",0,V])},583503,e=>{var r=e.i(732486),a=e.i(689391);let o=a.z.a`
  && {
    color: ${({$variant:e})=>"underlined"===e?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))"};
    font-weight: 400;
    text-decoration: ${({$variant:e})=>"underlined"===e?"underline":"var(--privy-link-navigation-decoration, none)"};
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
    opacity: ${({$disabled:e})=>e?.5:1};

    font-size: ${({$size:e})=>{switch(e){case"xs":return"12px";case"sm":return"14px";default:return"16px"}}};

    line-height: ${({$size:e})=>{switch(e){case"xs":return"18px";case"sm":return"22px";default:return"24px"}}};

    transition:
      color 200ms ease,
      text-decoration-color 200ms ease,
      opacity 200ms ease;

    &:hover {
      color: ${({$variant:e,$disabled:r})=>"underlined"===e?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))"};
      text-decoration: ${({$disabled:e})=>e?"none":"underline"};
      text-underline-offset: 4px;
    }

    &:active {
      color: ${({$variant:e,$disabled:r})=>r?"underlined"===e?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))":"var(--privy-color-foreground)"};
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--privy-shadow-focus-ring);
      border-radius: 2px;
    }
  }
`;e.s(["L",0,({size:e="md",variant:a="navigation",disabled:i=!1,as:t,children:n,onClick:l,...c})=>(0,r.jsx)(o,{as:t,$size:e,$variant:a,$disabled:i,onClick:e=>{i?e.preventDefault():l?.(e)},...c,children:n})])},25047,e=>{var r=e.i(732486),a=e.i(689391),o=e.i(933185);function i(e){return(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 460 40",...e,children:(0,r.jsx)("g",{fill:e.color||"var(--privy-color-foreground)",children:(0,r.jsx)("path",{d:"M0 15.4v15.38h4.64V19.96h3.58c2.47 0 3.63-.01 3.77-.02 1-.08 1.49-.15 2.18-.3a9.45 9.45 0 0 0 4.6-2.37c1.66-1.57 2.64-3.87 2.81-6.56.02-.3.02-1.19 0-1.49-.1-1.77-.56-3.35-1.36-4.72A8.84 8.84 0 0 0 15.14.57c-.93-.3-1.75-.43-3.09-.54C11.9.02 10.2 0 5.93 0H0ZM10.85 4c1.85.05 3.1.45 4.16 1.3.22.17.54.49.69.68a5.97 5.97 0 0 1 1.19 3.13c.04.35.04 1.36 0 1.71-.08.68-.23 1.3-.44 1.85a4.8 4.8 0 0 1-1.09 1.68A5.63 5.63 0 0 1 12 15.92c-.6.08-.4.08-4.01.09H4.64V3.98h2.9c1.6 0 3.08 0 3.31.02ZM187.65 5.71v5.72h-.27l-.09-.14a15.9 15.9 0 0 0-1.21-1.73c-.43-.5-1-.95-1.7-1.36-.54-.3-1.05-.5-1.73-.63a8.98 8.98 0 0 0-1.7-.17 8.84 8.84 0 0 0-7.8 4.03 12.95 12.95 0 0 0-2.03 6.39c-.07.98-.06 2.15.02 3.13.2 2.47.87 4.53 2.02 6.25a8.98 8.98 0 0 0 10.22 3.65 6.5 6.5 0 0 0 2.8-1.93c.41-.51.84-1.1 1.1-1.55l.1-.17h.37v3.58h4.38V0h-4.48Zm-5.24 5.54c1.3.14 2.3.6 3.17 1.48.9.9 1.5 2.09 1.85 3.64.36 1.6.39 3.72.06 5.43a8.13 8.13 0 0 1-1.54 3.62 5.1 5.1 0 0 1-3.93 1.96 6.13 6.13 0 0 1-2.32-.31 5.87 5.87 0 0 1-3.33-3.5c-.39-1-.62-2.05-.72-3.32-.03-.32-.04-1.35-.02-1.73.08-1.56.4-2.91.96-4.05a6.2 6.2 0 0 1 1.06-1.58 5.08 5.08 0 0 1 3.6-1.66c.25-.02.9 0 1.16.02ZM210.07 15.39l.01 15.38h4.38l.01-3.57h.37l.09.15c.24.44.84 1.26 1.21 1.7a6.79 6.79 0 0 0 2.57 1.75 9.3 9.3 0 0 0 6.86-.49 9.28 9.28 0 0 0 4.05-4.07A13.05 13.05 0 0 0 231 21.6c.21-1.73.18-3.7-.09-5.32a13.03 13.03 0 0 0-1.5-4.3 9.1 9.1 0 0 0-3.75-3.63 9.15 9.15 0 0 0-4.43-.96 7.46 7.46 0 0 0-2.8.5A7.07 7.07 0 0 0 216 9.7c-.4.52-.82 1.12-1.1 1.59l-.07.14h-.27V0h-4.5Zm11.13-4.14c1.07.1 1.94.44 2.7 1.04a6.1 6.1 0 0 1 1.64 1.98c.43.84.78 2 .94 3.11.15 1.16.16 2.4.02 3.54a9.34 9.34 0 0 1-1.39 4.03 5.33 5.33 0 0 1-2.69 2.15c-.9.3-2.04.38-3.06.2a5.14 5.14 0 0 1-3.45-2.37 6.03 6.03 0 0 1-.45-.8c-.5-1.03-.8-2.2-.92-3.58-.04-.49-.06-.89-.05-1.53.01-.76.05-1.23.13-1.85.38-2.53 1.47-4.38 3.15-5.31a5.46 5.46 0 0 1 2.3-.63 10 10 0 0 1 1.13.02ZM69.05 2.17l-.01 2.77V7.7h-3.36v3.6h3.36v6.8l.01 7.15c.06 1.4.4 2.44 1.1 3.37a5.8 5.8 0 0 0 2.97 2.07c.91.3 1.83.42 2.9.38a8.71 8.71 0 0 0 2.66-.48l-.8-3.7-.38.06a4.96 4.96 0 0 1-2.43-.06c-.33-.1-.56-.25-.8-.49-.4-.41-.6-.88-.7-1.67-.02-.2-.02-.62-.03-6.82v-6.6h4.73V7.7h-4.73V2.16h-4.49ZM133.34 2.17V7.7h-3.39v3.6h3.38v6.9l.01 7.17a5.66 5.66 0 0 0 2.36 4.49c.85.6 2.03 1.03 3.26 1.17.85.1 2.03.05 2.81-.1.3-.06.75-.18 1-.26l.2-.06v-.05l-.81-3.67-.37.06a4.99 4.99 0 0 1-1.8.09c-.85-.13-1.32-.4-1.7-.97a2.63 2.63 0 0 1-.39-1.04c-.06-.4-.06 0-.06-7.1V11.3h4.7V7.7h-4.7l-.01-2.77V2.16h-4.49ZM293.41 2.36a14.56 14.56 0 0 0-13.7 16.07 14.59 14.59 0 0 0 21.86 11.08 14.5 14.5 0 0 0 7.11-14.07 14.61 14.61 0 0 0-6.53-10.73 14.49 14.49 0 0 0-8.74-2.35ZM350.8 2.36a10.17 10.17 0 0 0-7.56 4.2c-.16.2-.45.63-.58.83l-.05.1h-.47l-.01-4.36h-7.36v36.4h7.82V27.27h.49l.05.07a11.3 11.3 0 0 0 7.49 4.15 10.52 10.52 0 0 0 9.38-4.1c1.66-2.1 2.73-4.9 3.07-8.06.1-.87.13-1.4.13-2.37 0-.8 0-1.1-.07-1.76a15.95 15.95 0 0 0-3.23-8.72 12.8 12.8 0 0 0-1.85-1.84 10.49 10.49 0 0 0-7.26-2.28Zm-.94 6.05c1.27.15 2.33.65 3.2 1.5.98.96 1.67 2.31 2.03 4 .34 1.57.38 3.68.12 5.39a9.78 9.78 0 0 1-1.04 3.25c-.14.25-.44.69-.6.89a5.35 5.35 0 0 1-4.31 2.07 5.25 5.25 0 0 1-4.41-1.9 7.35 7.35 0 0 1-1.26-2.32 14.09 14.09 0 0 1-.62-4.83c.05-1.98.38-3.53 1.02-4.85a5.63 5.63 0 0 1 2.5-2.65c.66-.34 1.3-.5 2.14-.58.18-.02 1.04 0 1.23.03ZM363.63 3.1l-.01 3.2v3.16h1.43c1.26.01 1.44.02 1.54.04.42.09.66.28.79.62.08.23.08.08.08 2.96a911.57 911.57 0 0 1 .03 10.18v7.54h7.82v-7.4l.01-7.83c.03-.94.11-1.63.27-2.28.46-1.9 1.54-2.93 3.35-3.23.52-.08.2-.08 5-.08h4.4V3.08h-3.1c-3.48 0-3.91.01-4.67.1-1.83.2-3.04.79-3.96 1.88-.5.6-.9 1.32-1.26 2.26l-.06.17h-.46V3.09h-5.6c-4.46 0-5.6 0-5.6.02ZM390.8 16.95V30.8h3.87l3.86-.01V3.09h-7.73ZM400.6 3.1l-.01.4v.38l4.66 13.4 4.69 13.47.02.05h10.3l.03-.05 4.67-13.45 4.67-13.4V3.1h-7.43l-6.7 19.26h-.5l-3.28-9.5-3.31-9.64-.05-.12h-3.88l-3.88.01ZM430.98 3.1c-.01 0-.02.19-.02.4v.39l5.08 14.59c2.8 8.02 5.08 14.6 5.08 14.61.01.02-.22.02-4.8.02h-4.82v6.42h4.95c5.09 0 5.23 0 5.87-.06 3.15-.28 5.29-1.63 6.63-4.15.28-.55.44-.95.87-2.16L459 6.78l1-2.89v-.8h-7.43l-6.69 19.26h-.5l-3.27-9.46-3.31-9.64-.06-.16h-3.88l-3.88.01ZM36.57 7.36c-1.36.1-2.6.6-3.62 1.45a5.65 5.65 0 0 0-1.67 2.42l-.05.13H31V7.7h-4.35v23.08h4.5v-7.3c0-8 0-7.34.08-7.82a4.89 4.89 0 0 1 2.06-3.18c.83-.58 1.74-.89 2.87-.98a11.87 11.87 0 0 1 2.8.25H39v-4.3l-.21-.02c-.61-.07-1.74-.1-2.22-.07ZM51.08 7.41c-2.33.12-4.3.84-5.95 2.16a9.89 9.89 0 0 0-2.03 2.2 12.5 12.5 0 0 0-2 5.78 18.04 18.04 0 0 0 0 3.65 12.13 12.13 0 0 0 2.26 6.05 9.74 9.74 0 0 0 5 3.52c2.11.64 4.7.64 6.8 0a9.78 9.78 0 0 0 4.88-3.37c1.38-1.78 2.19-4 2.4-6.58.13-1.46.06-3.06-.18-4.42a11.24 11.24 0 0 0-3.58-6.6 10 10 0 0 0-5.75-2.35c-.56-.06-1.31-.07-1.85-.04Zm1.42 3.78c.88.1 1.62.34 2.28.75a6.13 6.13 0 0 1 1.99 2.15 10.31 10.31 0 0 1 1.2 5c.02 1.23-.12 2.44-.42 3.51a7.14 7.14 0 0 1-1.81 3.32c-.61.6-1.2.98-1.95 1.24a6 6 0 0 1-2 .3 5.7 5.7 0 0 1-2.72-.6 5 5 0 0 1-1.28-.94A7.1 7.1 0 0 1 46 22.73c-.57-1.99-.6-4.46-.08-6.5a7.24 7.24 0 0 1 2.03-3.67 5.13 5.13 0 0 1 3.35-1.4 11 11 0 0 1 1.2.03ZM92.05 7.4c-.96.06-1.56.15-2.3.33a9.62 9.62 0 0 0-6.09 4.66 13.5 13.5 0 0 0-1.71 7c0 .83 0 1.04.06 1.6.16 1.77.58 3.32 1.29 4.7A9.72 9.72 0 0 0 90.28 31c1.84.37 4.08.32 5.85-.13a9.07 9.07 0 0 0 5.02-3.1A7.64 7.64 0 0 0 102.5 25l-2.11-.39-2.11-.38-.08.13a4.72 4.72 0 0 1-2.35 2.55 6.3 6.3 0 0 1-2.23.58c-.29.03-1.13.03-1.44 0a6.35 6.35 0 0 1-3.02-1.04 5.93 5.93 0 0 1-2.02-2.43 8.44 8.44 0 0 1-.72-3.18v-.26h16.38v-.81c0-1.83-.06-2.76-.25-3.87-.2-1.22-.53-2.24-1.05-3.28a8.9 8.9 0 0 0-2.66-3.26 10.1 10.1 0 0 0-5.34-1.94 18.3 18.3 0 0 0-1.46-.03Zm1.3 3.75c1.2.13 2.19.55 3.05 1.3a5.8 5.8 0 0 1 1.78 2.96c.13.51.21 1.17.21 1.66v.15H86.43v-.12c.08-.97.3-1.78.72-2.61.5-1 1.2-1.8 2.14-2.42a5.32 5.32 0 0 1 2.9-.95c.2-.01.97 0 1.17.03ZM116.79 7.41c-2 .1-3.73.65-5.22 1.65a10.7 10.7 0 0 0-4.25 6.06 16.1 16.1 0 0 0-.5 5.8c.2 2.17.84 4.13 1.88 5.76.58.9 1.32 1.73 2.15 2.4a9.37 9.37 0 0 0 3.6 1.8 12.06 12.06 0 0 0 3.92.34 10.2 10.2 0 0 0 3.84-.95 8.31 8.31 0 0 0 4.76-6.75l.01-.04h-4.37l-.05.16a4.87 4.87 0 0 1-4.24 3.75c-.59.07-1.32.06-1.93-.05a5.47 5.47 0 0 1-3.5-2.27c-.56-.75-1-1.73-1.26-2.79a13.8 13.8 0 0 1-.16-5.24 7.77 7.77 0 0 1 2.1-4.3 5.48 5.48 0 0 1 2.15-1.3 6.4 6.4 0 0 1 3.89.1c.59.21 1.03.5 1.5.96a5.32 5.32 0 0 1 1.46 2.5l.04.15h4.37v-.06a8.22 8.22 0 0 0-5.31-6.94 10.98 10.98 0 0 0-4.88-.74ZM156.2 7.41a9.87 9.87 0 0 0-6 2.29 11.02 11.02 0 0 0-3.41 5.43c-.52 1.78-.68 3.9-.48 5.97.17 1.8.63 3.38 1.37 4.8a9.68 9.68 0 0 0 5.91 4.86c1.65.48 3.63.61 5.53.36 3.72-.49 6.55-2.62 7.56-5.69.12-.39.13-.42.1-.43-.02 0-4.13-.75-4.19-.75-.03 0-.04 0-.1.16-.18.42-.45.9-.72 1.22-.16.2-.49.53-.7.7-.67.54-1.5.9-2.43 1.08-.48.08-.83.11-1.41.11-.64 0-1.07-.04-1.6-.15a5.76 5.76 0 0 1-3.93-2.83 8 8 0 0 1-.99-3.79v-.16h16.38v-1.11l-.02-1.43c-.1-2.25-.53-4-1.35-5.59a9.24 9.24 0 0 0-6.18-4.75c-1.04-.26-2.2-.36-3.33-.3Zm1.45 3.74a5.35 5.35 0 0 1 3.66 1.94 6.1 6.1 0 0 1 1.38 4.01v.12h-11.97v-.06c0-.02 0-.14.02-.25a6.6 6.6 0 0 1 2.15-4.32 5.73 5.73 0 0 1 3.5-1.46c.25-.02 1 0 1.26.02ZM233.58 7.82l8.37 23.22a49.22 49.22 0 0 1-.67 1.9 5.36 5.36 0 0 1-1.14 1.8c-.41.4-.82.58-1.48.69-.27.04-1.03.03-1.35 0a8.05 8.05 0 0 1-1.1-.23l-1.08 3.67c0 .02.32.14.66.22.83.21 1.57.29 2.56.28.56-.01.8-.03 1.24-.1 2.71-.4 4.66-2.09 5.86-5.08l9.64-26.44c0-.02-4.82-.06-4.83-.05l-2.93 8.96-2.91 8.94h-.24l-.22-.65-2.91-8.95-2.7-8.3H233.53ZM293.05 35.8c-1.18.04-1.93.09-2.8.16-2.52.24-4.53.69-5.43 1.23-.7.41-.76.86-.2 1.28.88.66 3.29 1.19 6.36 1.4a48.55 48.55 0 0 0 5.75.05c3.47-.19 6.24-.78 7.11-1.5.22-.19.3-.34.3-.53 0-.1 0-.12-.04-.22-.35-.69-2.32-1.3-5.25-1.63a41.09 41.09 0 0 0-5.8-.24Zm0 0"})})})}let t=a.z.span`
  margin-top: 16px;
  font-size: 13px;
  text-align: center;
  color: var(--privy-color-foreground-3);
  display: block;

  && > a {
    color: var(--privy-color-accent);
  }
`,n=a.z.a`
  && {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,l=a.z.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 12px;
  gap: 8px;

  font-size: 13px;

  && a {
    padding: 0.5rem 0;

    &:hover {
      text-decoration: none;
    }
  }

  @media all and (display-mode: standalone) {
    padding-bottom: 30px;
  }
`;e.s(["B",0,({className:e})=>{let{appearance:a}=(0,o.a)();return(0,r.jsx)(l,{className:e,children:a.footerLogo??(0,r.jsx)(n,{href:"https://privy.io/?utm_source=module&utm_medium=module&utm_campaign=registration_module",target:"_blank",rel:"noopener noreferrer",id:"protected-by-privy",children:(0,r.jsx)(i,{color:"currentColor",height:13,width:150})})})},"M",0,l,"T",0,function({app:{legal:{privacyPolicyUrl:e,termsAndConditionsUrl:a,requireUsersAcceptTerms:o}},alwaysShowImplicitConsent:i}){let n=!(!e||!a);return(!o||i)&&(a||e)?(0,r.jsxs)(t,{children:["By logging in I agree to the"," ",a&&(0,r.jsx)("a",{href:a,target:"_blank",children:n?"Terms":"Terms of Service"}),n&&" & ",e&&(0,r.jsx)("a",{href:e,target:"_blank",children:"Privacy Policy"})]}):(0,r.jsx)(t,{})}])},995040,e=>{var r=e.i(732486),a=e.i(689391),o=e.i(541021),i=e.i(387556),t=e.i(839326),n=e.i(352386);let l=n.forwardRef(function({title:e,titleId:r,...a},o){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:o,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18 18 6M6 6l12 12"}))});var c=e.i(933185),s=e.i(748117);let d=a.z.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  user-select: none;

  & {
    width: auto;
    cursor: pointer;
    border-radius: ${({$size:e})=>"sm"===e?"6px":"var(--privy-border-radius-sm)"};

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.016px;
  }

  && {
    height: ${({$size:e})=>"sm"===e?"28px":"48px"};
    padding: 0 ${({$size:e})=>"sm"===e?"10px":"16px"};
  }
`,u=({children:e,loading:a,disabled:i,success:t,size:n="lg",loadingText:l="Loading...",as:c,onClick:s,...d})=>{let u="a"===c,p=!(!a&&!i);return(0,r.jsx)(g,{as:c,disabled:u?void 0:p,"aria-disabled":u?p:void 0,$success:t,$size:n,onClick:e=>{u&&p?e.preventDefault():s?.(e)},...d,children:a?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.B,{}),l?(0,r.jsx)("span",{style:{marginLeft:"8px"},children:l}):null]}):e})},p=(0,a.z)(d)`
  position: relative;

  && {
    background-color: var(--privy-color-accent);
    color: var(--privy-color-foreground-accent);

    transition: background-color 200ms ease;
  }

  &:hover {
    background-color: var(--privy-color-accent-dark);
  }

  &:active {
    background-color: var(--privy-color-accent-dark);
  }

  &:disabled,
  &:hover:disabled,
  &:active:disabled {
    cursor: not-allowed;
    color: var(--privy-color-foreground-disabled);
    background-color: var(--privy-color-accent-dark);
  }
`,g=(0,a.z)(d)`
  position: relative;

  && {
    background-color: ${e=>e.$warn?"var(--privy-color-error-dark)":"var(--privy-color-accent)"};
    color: var(--privy-color-foreground-accent);

    transition: background-color 200ms ease;
  }

  &:hover {
    background-color: ${e=>e.$warn?"var(--privy-color-error-dark)":"var(--privy-color-accent-dark)"};
  }

  &:active {
    background-color: ${e=>e.$warn?"var(--privy-color-error-dark)":"var(--privy-color-accent-dark)"};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--privy-shadow-focus-ring);
  }

  &:disabled {
    background-color: var(--privy-color-background-2);
    border: 1px solid var(--privy-color-border-default);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  &:hover:disabled,
  &:active:disabled {
    background-color: var(--privy-color-background-2);
    border: 1px solid var(--privy-color-border-default);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  /* Emulate disabled look for anchors via the prop */
  ${e=>e.disabled&&a.m`
      &&&,
      &&&:hover,
      &&&:active {
        background-color: var(--privy-color-background-2);
        border: 1px solid var(--privy-color-border-default);
        color: var(--privy-color-foreground-disabled);
        cursor: not-allowed;
      }
    `}
`,v=({children:e,loading:a,disabled:i,size:t="lg",loadingText:n="Loading...",as:l,onClick:c,...s})=>{let d="a"===l,u=!(!a&&!i);return(0,r.jsx)(b,{as:l,disabled:d?void 0:u,"aria-disabled":d?u:void 0,$size:t,onClick:e=>{d&&u?e.preventDefault():c?.(e)},...s,children:a?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.B,{}),n?(0,r.jsx)("span",{style:{marginLeft:"8px"},children:n}):null]}):e})},h=({children:e,loading:a,disabled:i,size:t="lg",loadingText:n="Loading...",as:l,onClick:c,...s})=>{let d="a"===l,u=!(!a&&!i);return(0,r.jsx)(m,{as:l,disabled:d?void 0:u,"aria-disabled":d?u:void 0,$size:t,onClick:e=>{d&&u?e.preventDefault():c?.(e)},...s,children:a?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.B,{}),n?(0,r.jsx)("span",{style:{marginLeft:"8px"},children:n}):null]}):e})},b=(0,a.z)(d)`
  && {
    border-width: 1px;
    border-style: solid;
    border-color: ${e=>e.$warn?"var(--privy-color-border-error)":"var(--privy-color-accent)"};
    background-color: var(--privy-color-background);
    color: ${e=>e.$warn?"var(--privy-color-error-dark)":"var(--privy-color-accent)"};
    transition:
      border-color 200ms ease,
      color 200ms ease,
      background-color 200ms ease;
  }

  &:hover {
    border-color: ${e=>e.$warn?"var(--privy-color-border-error)":"var(--privy-color-border-interactive-hover)"};
    background-color: ${e=>e.$warn?"var(--privy-color-error-light)":"var(--privy-color-info-bg-hover)"};
    color: ${e=>e.$warn?"var(--privy-color-error-dark)":"var(--privy-color-accent)"};
  }

  &:active {
    border-color: ${e=>e.$warn?"var(--privy-color-border-error)":"var(--privy-color-border-interactive)"};
    background-color: ${e=>e.$warn?"var(--privy-color-error-bg-hover)":"var(--privy-color-info-bg)"};
    color: ${e=>e.$warn?"var(--privy-color-error-dark)":"var(--privy-color-accent)"};
  }

  &:disabled {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-background-2);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  &:hover:disabled,
  &:active:disabled {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-background-2);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  /* Anchor disabled look (prop-driven) */
  ${e=>e.disabled&&a.m`
      &&&,
      &&&:hover,
      &&&:active {
        border-color: var(--privy-color-border-default);
        background-color: var(--privy-color-background-2);
        color: var(--privy-color-foreground-disabled);
        cursor: not-allowed;
      }
    `}
`,m=(0,a.z)(d)`
  && {
    border-width: 1px;
    border-style: solid;
    border-color: var(--privy-color-border-default);
    background-color: transparent;
    color: var(--privy-color-foreground-2);

    transition:
      border-color 200ms ease,
      color 200ms ease,
      background-color 200ms ease;
  }

  &:hover {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-info-bg-hover);
    color: var(--privy-color-foreground-2);
  }

  &:active {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-info-bg);
    color: var(--privy-color-foreground-2);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--privy-shadow-focus-ring);
  }

  &:disabled {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-background-2);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  &:hover:disabled,
  &:active:disabled {
    border-color: var(--privy-color-border-default);
    background-color: var(--privy-color-background-2);
    color: var(--privy-color-foreground-disabled);
    cursor: not-allowed;
  }

  /* Anchor disabled look (prop-driven) */
  ${e=>e.disabled&&a.m`
      &&&,
      &&&:hover,
      &&&:active {
        border-color: var(--privy-color-border-default);
        background-color: var(--privy-color-background-2);
        color: var(--privy-color-foreground-disabled);
        cursor: not-allowed;
      }
    `}
`,y=a.z.button`
  && {
    padding: 12px 16px;
    font-weight: 500;
    text-align: center;
    color: var(--privy-color-foreground-accent);
    background-color: var(--privy-color-accent);
    border-radius: var(--privy-border-radius-sm);
    min-width: 144px;
    opacity: ${e=>e.invisible?"0":"1"};
    transition:
      opacity 200ms ease,
      background-color 200ms ease,
      color 200ms ease;
    user-select: none;

    ${e=>e.invisible&&a.m`
        pointer-events: none;
      `}

    &:hover {
      background-color: var(--privy-color-accent-dark);
    }
    &:active {
      background-color: var(--privy-color-accent-dark);
    }

    &:hover:disabled,
    &:active:disabled {
      background-color: var(--privy-color-background-2);
      color: var(--privy-color-foreground-disabled);
      cursor: not-allowed;
    }
  }
`;a.z.div`
  /* Set to match height of SoftCtaButton to avoid reflow if conditionally rendered */
  height: 44px;
`;let w=a.z.button`
  && {
    color: var(--privy-color-accent);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    cursor: pointer;
    border-radius: 0 var(--privy-border-radius-mdlg) var(--privy-border-radius-mdlg) 0;
    border: none;
    transition: color 200ms ease;

    /* Tablet and Up */
    @media (min-width: 441px) {
      font-size: 14px;
    }

    :hover {
      color: var(--privy-color-accent-dark);
    }

    && > :first-child {
      opacity: ${e=>+!e.$isSubmitting};
    }

    && > :last-child {
      position: absolute;
      display: flex;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);

      /** Will map to the opposite of first span */
      opacity: ${e=>+!!e.$isSubmitting};
    }

    :disabled,
    :hover:disabled {
      color: var(--privy-color-foreground-disabled);
      cursor: not-allowed;
    }
  }
`,f=({backFn:e,disabled:a=!1,"aria-label":o})=>(0,r.jsx)("div",{children:(0,r.jsx)(k,{type:"button","aria-label":o,disabled:a,onClick:a?void 0:e,children:(0,r.jsx)(i.f,{height:"16px",width:"16px",strokeWidth:2})})}),x=({infoFn:e})=>(0,r.jsx)("div",{children:(0,r.jsx)(S,{"aria-label":"info",onClick:e,children:(0,r.jsx)(t.f,{height:"22px",width:"22px",strokeWidth:2})})}),C=e=>(0,r.jsx)("div",{children:(0,r.jsx)(k,{type:"button","aria-label":e["aria-label"]??"close modal",onClick:e.onClose,children:(0,r.jsx)(l,{height:"16px",width:"16px",strokeWidth:2})})}),k=a.z.button`
  && {
    cursor: pointer;
    display: flex;
    opacity: 0.6;

    background-color: var(--privy-color-background-2);
    border-radius: var(--privy-border-radius-full);
    padding: 4px;

    > svg {
      margin: auto;
      color: var(--privy-color-foreground);
    }

    :hover {
      opacity: 1;
    }

    :disabled {
      cursor: default;
      opacity: 0.3;
    }

    :disabled:hover {
      opacity: 0.3;
    }
  }
`,S=(0,a.z)(k)`
  && {
    background-color: transparent;
  }
`,V=a.z.div`
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    color: var(--privy-color-foreground);
  }
`,T=a.z.div`
  flex: 1;
  align-items: center;
  display: flex;
  gap: 8px;
`,D=a.z.div`
  display: flex;
  justify-content: flex-end;
`,j=a.z.div`
  color: var(--privy-color-foreground);

  font-kerning: none;
  font-feature-settings: 'calt' off;
  /* text-xl/font-semiBold */
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem; /* 160% */

  text-align: left;

  margin-left: 0.5rem;
`,z=a.z.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--privy-color-foreground);
`;e.s(["B",0,({variant:e="primary",size:a="lg",children:o,success:i,...t})=>{switch(e){case"secondary":return(0,r.jsx)(v,{size:a,...t,children:o});case"error":return(0,r.jsx)(v,{$warn:!0,size:a,...t,children:o});case"muted":return(0,r.jsx)(h,{size:a,...t,children:o});default:return(0,r.jsx)(u,{size:a,success:i,...t,children:o})}},"E",0,({children:e,onClick:a,disabled:i,isSubmitting:t,...n})=>(0,r.jsxs)(w,{$isSubmitting:t,onClick:a,disabled:i,...n,children:[(0,r.jsx)("span",{children:e}),(0,r.jsx)("span",{children:(0,r.jsx)(o.B,{})})]}),"M",0,({backFn:e,infoFn:a,onClose:o,title:i,eyebrow:t,closeable:n=!0,className:l})=>{let{closePrivyModal:d}=(0,s.u)(),u=(0,c.a)();return(0,r.jsxs)(V,{className:l,children:[(0,r.jsxs)(T,{children:[e&&(0,r.jsx)(f,{backFn:e}),t&&(0,r.jsx)(z,{children:t}),!t&&i&&(0,r.jsx)(j,{id:"privy-dialog-title",children:i}),(0,r.jsx)("div",{style:{height:24}}),a&&(0,r.jsx)(x,{infoFn:a})]}),(0,r.jsx)(D,{children:!u.render.standalone&&n&&(0,r.jsx)(C,{onClose:o||(()=>d())})})]})},"P",0,u,"S",0,v,"b",0,({children:e,loading:a,disabled:i,...t})=>(0,r.jsx)(p,{disabled:i,...t,children:a?(0,r.jsx)(o.B,{color:"var(--privy-color-foreground-accent)"}):e}),"c",0,y,"d",0,h],995040)},612269,e=>{var r=e.i(732486),a=e.i(352386),o=e.i(689391),i=e.i(541021),t=e.i(25047),n=e.i(995040),l=e.i(226439);let c=o.z.div`
  /* spacing tokens */
  --screen-space: 16px; /* base 1x = 16 */
  --screen-space-lg: calc(var(--screen-space) * 1.5); /* 24px */

  position: relative;
  overflow: hidden;
  margin: 0 calc(-1 * var(--screen-space)); /* extends over modal padding */
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,s=o.z.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) * 1.5);
  width: 100%;
  background: var(--privy-color-background);
  padding: 0 var(--screen-space-lg) var(--screen-space);
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,d=o.z.div`
  position: relative;
  display: flex;
  flex-direction: column;
`,u=(0,o.z)(n.M)`
  margin: 0 -8px;
`,p=o.z.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  /* Enable scrolling */
  overflow-y: auto;

  /* Hide scrollbar but keep functionality when scrollable */
  /* Add padding for focus outline space, offset with negative margin */
  padding: 3px;
  margin: -3px;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-gutter: stable both-edges;
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* Gradient effect for scroll indication */
  ${({$colorScheme:e})=>"light"===e?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;":"dark"===e?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;":void 0}

  background-repeat: no-repeat;
  background-size:
    100% 32px,
    100% 16px;
  background-attachment: local, scroll;
`,g=o.z.div`
  display: flex;
  flex-direction: column;
  gap: var(--screen-space-lg);
  margin-top: 1.5rem;
`,v=o.z.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--screen-space);
`,h=o.z.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,b=o.z.h3`
  && {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: var(--privy-color-foreground);
    margin: 0;
  }
`,m=o.z.p`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: var(--privy-color-foreground);
  }
`,y=o.z.div`
  background: ${({$variant:e})=>{switch(e){case"success":return"var(--privy-color-success-bg)";case"warning":return"var(--privy-color-warn)";case"error":return"var(--privy-color-error-bg)";case"loading":case"logo":return"transparent";default:return"var(--privy-color-background-2)"}}};

  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`,w=o.z.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    max-height: 90px;
    max-width: 180px;
  }
`,f=o.z.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 82px;

  > div {
    position: relative;
  }

  > div > :first-child {
    position: relative;
  }

  > div > :last-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`,x=({children:e,...a})=>(0,r.jsx)(c,{children:(0,r.jsx)(s,{...a,children:e})}),C=o.z.div`
  position: absolute;
  top: 0;
  left: calc(-1 * var(--screen-space-lg));
  width: calc(100% + calc(var(--screen-space-lg) * 2));
  height: 4px;
  background: var(--privy-color-background-2);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  overflow: hidden;
`,k=(0,o.z)(t.B)`
  padding: 0;
  && a {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,S=o.z.div`
  height: 100%;
  width: ${({pct:e})=>e}%;
  background: var(--privy-color-foreground-3);
  border-radius: 2px;
  transition: width 300ms ease-in-out;
`,V=({step:e})=>e?(0,r.jsx)(C,{children:(0,r.jsx)(S,{pct:Math.min(100,e.current/e.total*100)})}):null;x.Header=({title:e,subtitle:a,icon:o,iconVariant:i,iconLoadingStatus:t,showBack:n,onBack:l,showInfo:c,onInfo:s,showClose:p,onClose:g,step:y,headerTitle:w,eyebrow:f,...C})=>(0,r.jsxs)(d,{...C,children:[(0,r.jsx)(u,{backFn:n?l:void 0,infoFn:c?s:void 0,onClose:p?g:void 0,title:w,eyebrow:f,closeable:p}),(o||i||e||a)&&(0,r.jsxs)(v,{children:[o||i?(0,r.jsx)(x.Icon,{icon:o,variant:i,loadingStatus:t}):null,!(!e&&!a)&&(0,r.jsxs)(h,{children:[e&&(0,r.jsx)(b,{children:e}),a&&(0,r.jsx)(m,{children:a})]})]}),y&&(0,r.jsx)(V,{step:y})]}),(x.Body=a.default.forwardRef(({children:e,...a},o)=>(0,r.jsx)(p,{ref:o,...a,children:e}))).displayName="Screen.Body",x.Footer=({children:e,...a})=>(0,r.jsx)(g,{id:"privy-content-footer-container",...a,children:e}),x.Actions=({children:e,...a})=>(0,r.jsx)(T,{...a,children:e}),x.HelpText=({children:e,...a})=>(0,r.jsx)(D,{...a,children:e}),x.FooterText=({children:e,...a})=>(0,r.jsx)(j,{...a,children:e}),x.Watermark=()=>(0,r.jsx)(k,{}),x.Icon=({icon:e,variant:o="subtle",loadingStatus:t})=>"logo"===o&&e?(0,r.jsx)(w,"string"==typeof e?{children:(0,r.jsx)("img",{src:e,alt:""})}:a.default.isValidElement(e)?{children:e}:{children:a.default.createElement(e)}):"loading"===o?e?(0,r.jsx)(f,{children:(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,r.jsx)(i.C,{success:t?.success,fail:t?.fail}),"string"==typeof e?(0,r.jsx)("span",{style:{background:`url('${e}') 0 0 / contain`,height:"38px",width:"38px",borderRadius:"6px",margin:"auto",backgroundSize:"contain"}}):a.default.isValidElement(e)?a.default.cloneElement(e,{style:{width:"38px",height:"38px"}}):a.default.createElement(e,{style:{width:"38px",height:"38px"}})]})}):(0,r.jsx)(y,{$variant:o,children:(0,r.jsx)(l.N,{size:"64px"})}):(0,r.jsx)(y,{$variant:o,children:e&&("string"==typeof e?(0,r.jsx)("img",{src:e,alt:"",style:{width:"32px",height:"32px",borderRadius:"6px"}}):a.default.isValidElement(e)?e:a.default.createElement(e,{width:32,height:32,stroke:(()=>{switch(o){case"success":return"var(--privy-color-icon-success)";case"warning":return"var(--privy-color-icon-warning)";case"error":return"var(--privy-color-icon-error)";default:return"var(--privy-color-icon-muted)"}})(),strokeWidth:2}))});let T=o.z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) / 2);
`,D=o.z.div`
  && {
    margin: 0;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 13px;
    line-height: 20px;

    & a {
      text-decoration: underline;
    }
  }
`,j=o.z.div`
  && {
    margin-top: -1rem;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 0.6875rem; /* 11px */
    line-height: 1rem; /* 16px */
  }
`;e.s(["S",0,x])},335341,e=>{var r=e.i(732486),a=e.i(995040),o=e.i(612269);e.s(["S",0,({primaryCta:e,secondaryCta:i,helpText:t,footerText:n,watermark:l=!0,children:c,...s})=>{let d=e||i?(0,r.jsxs)(r.Fragment,{children:[e&&(()=>{let{label:o,...i}=e,t=i.variant||"primary";return(0,r.jsx)(a.B,{...i,variant:t,style:{width:"100%",...i.style},children:o})})(),i&&(()=>{let{label:e,...o}=i,t=o.variant||"secondary";return(0,r.jsx)(a.B,{...o,variant:t,style:{width:"100%",...o.style},children:e})})()]}):null;return(0,r.jsxs)(o.S,{id:s.id,className:s.className,children:[(0,r.jsx)(o.S.Header,{...s}),c?(0,r.jsx)(o.S.Body,{children:c}):null,t||d||l?(0,r.jsxs)(o.S.Footer,{children:[t?(0,r.jsx)(o.S.HelpText,{children:t}):null,d?(0,r.jsx)(o.S.Actions,{children:d}):null,l?(0,r.jsx)(o.S.Watermark,{}):null]}):null,n?(0,r.jsx)(o.S.FooterText,{children:n}):null]})}])},226439,e=>{var r=e.i(732486),a=e.i(689391);let o=a.z.div`
  --spinner-size: ${e=>e.$size?e.$size:"96px"};

  display: inline-flex;
  justify-content: center;
  align-items: center;

  @media all and (display-mode: standalone) {
    margin-bottom: 30px;
  }
`,i=a.z.div`
  position: relative;
  height: var(--spinner-size);
  width: var(--spinner-size);

  opacity: 1;
  animation: fadein 200ms ease;
`,t=a.z.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  svg,
  img {
    width: calc(var(--spinner-size) * 0.4);
    height: calc(var(--spinner-size) * 0.4);
    border-radius: var(--privy-border-radius-full);
  }
`,n=a.z.div`
  position: absolute;
  inset: 0;
  width: var(--spinner-size);
  height: var(--spinner-size);

  && {
    border: 4px solid var(--privy-color-border-default);
    border-radius: 50%;
  }
`,l=a.z.div`
  position: absolute;
  inset: 0;
  width: var(--spinner-size);
  height: var(--spinner-size);
  animation: spin 1200ms linear infinite;

  && {
    border: 4px solid;
    border-color: var(--privy-color-icon-subtle) transparent transparent transparent;
    border-radius: 50%;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;e.s(["N",0,({size:e,centerIcon:a})=>(0,r.jsx)(o,{$size:e,children:(0,r.jsxs)(i,{children:[(0,r.jsx)(n,{}),(0,r.jsx)(l,{}),a?(0,r.jsx)(t,{children:a}):null]})})])},203793,e=>{var r=e.i(616800);e.s(["s",0,(e,a)=>(0,r.s)(e,a.ethereum.createOnLogin)||(0,r.g)(e,a.solana.createOnLogin)])},439614,e=>{var r=e.i(933185);let a={"connectionStatus.successfullyConnected":"Successfully connected with {walletName}","connectionStatus.errorTitle":"{errorMessage}","connectionStatus.connecting":"Connecting","connectionStatus.connectOneWallet":"For the best experience, connect only one wallet at a time.","connectionStatus.checkOtherWindows":"Don't see your wallet? Check your other browser windows.","connectionStatus.stillHere":"Still here?","connectionStatus.tryConnectingAgain":"Try connecting again","connectionStatus.or":"or","connectionStatus.useDifferentLink":"use this different link","coinbaseWallet.connectingSubtitle":"This connects Coinbase Wallet, not your Coinbase.com account.","coinbaseWallet.connectingSubtitleReset":"This connects Coinbase Wallet, not your Coinbase.com account. Not the right wallet? Reset your connection below.","coinbaseWallet.successSubtitle":"This Coinbase Wallet address is not your Coinbase.com deposit address.","connectWallet.connectYourWallet":"Connect a wallet","connectWallet.waitingForWallet":"Waiting for {walletName}","connectWallet.connectToAccount":"Connect a wallet to your {appName} account","connectWallet.installAndConnect":"To connect to {walletName}, install and open the app. Then confirm the connection when prompted.","connectWallet.tryConnectingAgain":"Please try connecting again.","connectWallet.openInApp":"Open in app","connectWallet.copyLink":"Copy link","connectWallet.retry":"Retry","connectWallet.searchPlaceholder":"Search through {count} wallets","connectWallet.noWalletsFound":"No wallets found. Try another search.","connectWallet.lastUsed":"Last used","connectWallet.selectYourWallet":"Select your wallet","connectWallet.selectNetwork":"Select network","connectWallet.goToWallet":"Go to {walletName} to continue","connectWallet.scanToConnect":"Scan code to connect to {walletName}","connectWallet.openOrInstall":"Open or install {walletName}","cardTransactionList.scrollRegionLabel":"Card transactions","cardTransactionList.noTransactionsFound":"No transactions found","cardTransactionList.tryAgain":"Try again","cardTransactionList.badgeCredit":"Credit","cardTransactionList.badgePending":"Pending","cardTransactionList.badgeDeclined":"Declined","cardTransactionList.badgeExpired":"Expired","cardTransactionList.badgeReversed":"Reversed","cardDetailsView.cardholderLabel":"Cardholder","cardDetailsView.validThruLabel":"Valid thru","cardDetailsView.showDetails":"Details","cardDetailsView.hideDetails":"Hide details","cardDetailsView.pin":"PIN","cardDetailsView.replace":"Replace","cardDetailsView.cancel":"Cancel","cardDetailsView.freezeTitle":"Freeze Card","cardDetailsView.freezeSubtitle":"Temporarily disable your card","cardDetailsView.addToWalletTitle":"Add to wallet","cardDetailsView.addToWalletSubtitle":"Add your card to {walletName}","cardDetailsView.freezeConfirmTitle":"Freeze this card?","cardDetailsView.freezeConfirmDescription":"This will instantly freeze the current card.","cardDetailsView.freezeConfirmCta":"Freeze card","cardDetailsView.unfreezeConfirmTitle":"Unfreeze this card?","cardDetailsView.unfreezeConfirmDescription":"This will instantly unfreeze the current card.","cardDetailsView.unfreezeConfirmCta":"Unfreeze card","cardDetailsView.cancelConfirmTitle":"Cancel this card?","cardDetailsView.cancelConfirmDescription":"This will instantly cancel the current card.","cardDetailsView.cancelConfirmCta":"Cancel card","cardDetailsView.replaceReasonTitle":"Why are you replacing your card?","cardDetailsView.replaceReasonCta":"Continue","cardDetailsView.replaceReasonLost":"Lost","cardDetailsView.replaceReasonStolen":"Stolen","cardDetailsView.replaceReasonExpired":"Expired","cardDetailsView.replaceWarnTitle":"Replace this card?","cardDetailsView.replaceWarnDescription":"This will instantly close the current card and issue a new one.","cardDetailsView.replaceWarnCta":"Replace","cardDetailsView.dialogDismiss":"Never mind","cardDetailsView.dialogBack":"Back","cardPinDialog.title":"PIN number","cardPinDialog.description":"Your PIN is used for in-person transactions and ATM withdrawals.","cardPinDialog.changePin":"Change PIN","cardPinDialog.close":"Close","cardPinDialog.cancel":"Cancel","cardPinDialog.save":"Save and close","cardPinDialog.placeholder":"••••","cardPinDialog.emptyError":"Add a new PIN or cancel to continue.","cardPinDialog.saveError":"Could not update this PIN. Please try again.","cardPinDialog.loadError":"Could not load this PIN. Please try again.","cardPinDialog.pinLabel":"PIN","cardDetailsReveal.cardNumberLabel":"Card number","cardDetailsReveal.expirationLabel":"Expiration","cardDetailsReveal.cvcLabel":"CVC","cardDetailsReveal.copyValue":"Copy {label}","cardDetailsReveal.error":"Card details could not be loaded. Please try again.","transactionDetailsView.summarySubheader":"Card payment to {merchantName}","transactionDetailsView.summarySubheaderFallback":"Card payment","transactionDetailsView.detailsHeader":"Details","transactionDetailsView.disputeCta":"Dispute transaction","transactionDetailsView.cardEndingIn":"Card ending in {last4}","transactionDetailsView.amountLabel":"Amount","transactionDetailsView.atmFeeLabel":"ATM Fee","transactionDetailsView.cashbackLabel":"Cashback","transactionDetailsView.statusLabel":"Status","transactionDetailsView.disputeLabel":"Dispute","transactionDetailsView.merchantLabel":"Merchant","transactionDetailsView.currencyLabel":"Currency","transactionDetailsView.fromLabel":"From","transactionDetailsView.dateLabel":"Date created","transactionDetailsView.statusPending":"Pending","transactionDetailsView.statusPosted":"Posted","transactionDetailsView.statusDeclined":"Declined","transactionDetailsView.statusExpired":"Expired","transactionDetailsView.statusReversed":"Reversed","transactionDetailsView.disputeNone":"None","transactionDetailsView.disputeExpired":"Dispute expired","transactionDetailsView.disputeLost":"Dispute lost","transactionDetailsView.disputeSubmitted":"Dispute submitted","transactionDetailsView.disputeUnsubmitted":"Dispute unsubmitted","transactionDetailsView.disputeWon":"Dispute won","transactionDetailsView.disputeDialogTitle":"Dispute this transaction","transactionDetailsView.disputeDialogBody":"To dispute this transaction, call the number below and our support team will help you.","transactionDetailsView.disputeDoneCta":"Done","cardSummaryView.walletHeading":"Wallet","cardSummaryView.cardHeading":"Your Card","cardSummaryView.transactionsHeading":"Transactions","cardSummaryView.unknownMerchant":"Unknown merchant","cardSummaryView.balanceUnavailable":"—","cardSummaryView.currentBalance":"Spending balance","cardSummaryView.cardTitle":"{brand} debit card","cardSummaryView.cardTitleFallback":"Debit card","cardSummaryView.cardLoadError":"Could not load this card.","cardSummaryView.transactionsLoadError":"Could not load transactions.","cardSummaryView.freezeError":"Could not update this card. Please try again.","cardSummaryView.cancelError":"Could not cancel this card. Please try again.","cardSummaryView.replaceError":"Could not replace this card. Please try again.","cardSummaryView.walletProvisioningError":"Could not load wallet options.","cardSummaryView.walletProvisioningSuccess":"Card added to wallet","cardSummaryView.cardCanceledBanner":"This card has been cancelled","cardSummaryView.cardFrozenBanner":"This card is frozen","cardSummaryView.sandboxBanner":"In sandbox mode using test funds","cardSummaryView.back":"Back","cardSummaryView.close":"Close","cardStatementDownload.buttonLabel":"Download statement","cardStatementDownload.tooltip":"Download a monthly PDF statement","cardStatementDownload.confirmTitle":"Download statement","cardStatementDownload.confirmDescription":"Are you sure you want to download your statement from {period}?","cardStatementDownload.confirmCta":"Download","cardStatementDownload.cancelCta":"Cancel","cardStatementDownload.error":"Could not download your statement. Please try again.","cardStatementDownload.notAvailable":"No statement is available for that period.","cardStatementDownload.empty":"Statements are available once the month ends.","signUpForCardView.sandboxBanner":"In sandbox mode using test funds","signUpForCardView.title":"Create {appName} card","signUpForCardView.titleFallback":"Create card","signUpForCardView.subtitle":"Complete a few quick steps to set up your {appName} card.","signUpForCardView.subtitleFallback":"Complete a few quick steps to set up your card.","signUpForCardView.checklistAgreements":"Review required agreements","signUpForCardView.checklistInformation":"Provide your information","signUpForCardView.checklistIdentity":"Verify your identity","signUpForCardView.getStartedCta":"Get started","signUpForCardView.workingCta":"Please wait…","signUpForCardView.termsPromptTitle":"Review card agreements","signUpForCardView.disclosurePromptTitle":"Accept electronic disclosures","signUpForCardView.disclosurePromptSubtitle":"Review and accept the {disclosureStatement} to receive and sign card documents electronically.","signUpForCardView.disclosureStatementLabel":"Electronic Disclosure Statement","signUpForCardView.acceptingDisclosureTitle":"Accepting disclosures","signUpForCardView.acceptingDisclosureSubtitle":"This will only take a moment.","signUpForCardView.bankTermsPromptProviders":"{appName} uses a wallet provided by Privy. {bank} issues the card, and Bridge manages the card program.","signUpForCardView.bankTermsPromptProvidersFallback":"This app uses a wallet provided by Privy. {bank} issues the card, and Bridge manages the card program.","signUpForCardView.bankTermsPromptAgreements":"By clicking Accept and continue, you agree to the {agreements}.","signUpForCardView.bankTermsAnd":"and","signUpForCardView.acceptingBankTermsTitle":"Accepting agreements","signUpForCardView.acceptingBankTermsSubtitle":"This will only take a moment.","signUpForCardView.providerTermsPromptTitle":"Review card program terms","signUpForCardView.providerTermsPromptSubtitle":"Open the card program terms to review and accept them.","signUpForCardView.acceptingProviderTermsTitle":"Review card program terms","signUpForCardView.acceptingProviderTermsSubtitle":"Finish reviewing the card program terms in the pop-up window to continue.","signUpForCardView.acceptAndContinueCta":"Accept and continue","signUpForCardView.kycPromptTitle":"Verify your identity","signUpForCardView.kycPromptSubtitle":"Open the verification flow to confirm your identity.","signUpForCardView.verifyIdentityCta":"Verify identity","signUpForCardView.verifyingIdentityTitle":"Verify your identity","signUpForCardView.verifyingIdentitySubtitle":"Finish verifying your identity in the pop-up window to continue.","signUpForCardView.pendingTitle":"Finishing up","signUpForCardView.pendingSubtitle":"We're getting your account ready. This can take a moment.","signUpForCardView.underReviewTitle":"Identity under review","signUpForCardView.underReviewSubtitle":"Your identity information is being reviewed. You can close this sign up and check back later to finish.","signUpForCardView.creatingCardTitle":"Creating your card","signUpForCardView.creatingCardSubtitle":"Hang tight while we finish creating your card.","signUpForCardView.approvePromptTitle":"Approve card spending","signUpForCardView.approvePromptSubtitle":"Sign a one-time approval to let your card spend from your selected {symbol} balance.","signUpForCardView.approvePromptWhat":"What this does:","signUpForCardView.approvePromptItemConnect":"Connects your card to your {symbol} balance","signUpForCardView.approvePromptItemPurchases":"Lets your card make purchases","signUpForCardView.approvePromptItemLimits":"Spending limits are managed separately","signUpForCardView.approveAndContinueCta":"Approve and continue","signUpForCardView.approveErrorTitle":"Spend approval failed","signUpForCardView.approveErrorSubtitle":"We couldn't approve card spending. Click below to try again.","signUpForCardView.readyTitle":"Your card is ready","signUpForCardView.readySubtitle":"Your card has been created and is ready to use.","signUpForCardView.continueCta":"Continue","signUpForCardView.doneCta":"Done","signUpForCardView.rejectedTitle":"We couldn't verify your identity","signUpForCardView.rejectedSubtitle":"Your card application could not be approved.","signUpForCardView.errorTitle":"Something went wrong","signUpForCardView.errorSubtitle":"We couldn't set up your card. Please try again.","signUpForCardView.tryAgainCta":"Try again"};e.s(["u",0,function(){let e=(0,r.a)();return{t:(r,o)=>{var i;let t;return i=e.intl.textLocalization,t=i?.[r]??a[r],o&&0!==Object.keys(o).length?t.replace(/\{(\w+)\}/g,(e,r)=>o[r]??e):t}}}])}])})();