(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,387556,e=>{var t=e.i(352386);let i=t.forwardRef(function({title:e,titleId:i,...r},n){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":i},r),e?t.createElement("title",{id:i},e):null,t.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"}))});e.s(["f",0,i])},839326,e=>{var t=e.i(352386);let i=t.forwardRef(function({title:e,titleId:i,...r},n){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":i},r),e?t.createElement("title",{id:i},e):null,t.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"}))});e.s(["f",0,i])},467793,e=>{var t=e.i(732486),i=e.i(352386);let r=i.forwardRef(function({title:e,titleId:t,...r},n){return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":t},r),e?i.createElement("title",{id:t},e):null,i.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"}))});var n=e.i(659226),o=e.i(768820),a=e.i(689391),l=e.i(995040),s=e.i(164923),c=e.i(583503),d=e.i(25047),h=e.i(594022),u=e.i(305869),p=e.i(933185),g=e.i(439614),m=e.i(461687),v=e.i(809845),f=e.i(565530),w=e.i(748117),y=e.i(480705),b=e.i(315430),x=e.i(786847),C=e.i(612269);let k={phantom:{mobile:{native:"phantom://",universal:"https://phantom.app/ul/"}},solflare:{mobile:{native:void 0,universal:"https://solflare.com/ul/v1/"}},metamask:{image_url:{sm:m.M,md:m.M}},"okx-wallet":{mobile:{native:"okex://main",universal:"okex://main"}},"okx-wallet-1":{mobile:{native:"okxwallet://main",universal:"okxwallet://main"}}};class z{static normalize(e){return e.replace(/[-_]wallet$/,"").replace(/[-_]extension$/,"").toLowerCase()}isEth(e){return e.chains.some(e=>e.includes("eip155:"))}isSol(e){return e.chains.some(e=>e.includes("solana:"))}inAllowList(e,t){if(!this.normalizedAllowList||0===this.normalizedAllowList.length||"listing"===t&&this.includeWalletConnect)return!0;let i=z.normalize(e);return this.normalizedAllowList.some(e=>i===z.normalize(e))}inDenyList(e,t){return"listing"===t&&"rabby"===e||"agw"===z.normalize(e)}chainMatches(e){return"ethereum-only"===this.chainFilter?"ethereum"===e:"solana-only"!==this.chainFilter||"solana"===e}getAllowListKey(e,t,i,r){let n=z.normalize(e);for(let e of this.normalizedAllowList||[])if(n===z.normalize(e))return e;if("connector"===t){if(("injected"===i||"solana_adapter"===i)&&"ethereum"===r&&this.detectedEth)return"detected_ethereum_wallets";if(("injected"===i||"solana_adapter"===i)&&"solana"===r&&this.detectedSol)return"detected_solana_wallets"}if("listing"===t&&this.includeWalletConnect)return"wallet_connect"}connectorOk(e){return!!("null"!==e.connectorType&&"walletconnect_solana"!==e.walletBranding.id&&this.chainMatches(e.chainType)&&(this.inAllowList(e.walletClientType,"connector")||("injected"===e.connectorType||"solana_adapter"===e.connectorType)&&("ethereum"===e.chainType&&this.detectedEth||"solana"===e.chainType&&this.detectedSol)))}listingOk(e){if(e.slug.includes("coinbase"))return!1;if("ethereum-only"===this.chainFilter){if(!this.isEth(e))return!1}else if("solana-only"===this.chainFilter&&!this.isSol(e))return!1;return!(!this.inAllowList(e.slug,"listing")||this.inDenyList(e.slug,"listing"))}getWallets(e,t){let i=new Map,r=e=>{let t=i.get(e.id);if(t){t.chainType!==e.chainType&&(t.chainType="multi");let i=new Set(t.chains);e.chains.forEach(e=>i.add(e)),t.chains=Array.from(i),!t.icon&&e.icon&&(t.icon=e.icon),!t.url&&e.url&&(t.url=e.url),!t.listing&&e.listing&&(t.listing=e.listing),!t.allowListKey&&e.allowListKey&&(t.allowListKey=e.allowListKey)}else i.set(e.id,e)};e.filter(e=>this.connectorOk(e)).forEach(e=>{let t=z.normalize(e.walletClientType);r({id:t,label:e.walletBranding?.name??t,source:"connector",connector:e,chainType:e.chainType,icon:e.walletBranding?.icon,url:void 0,chains:["ethereum"===e.chainType?"eip155":"solana"],allowListKey:this.getAllowListKey(e.walletClientType,"connector",e.connectorType,e.chainType)})});let n=e.find(e=>"wallet_connect_v2"===e.connectorType),o=e.find(e=>"walletconnect_solana"===e.walletBranding.id);t.filter(e=>this.listingOk(e)).forEach(t=>{let i=[...t.chains].filter(e=>e.includes("eip155:")||e.includes("solana:"));if(e.some(e=>z.normalize(e.walletClientType)===z.normalize(t.slug)&&"ethereum"===e.chainType&&"null"!==e.connectorType)||n||t.mobile.native||t.mobile.universal||m.m[t.slug]?.chainTypes.includes("ethereum")||(i=i.filter(e=>!e.includes("eip155:"))),e.some(e=>z.normalize(e.walletClientType)===z.normalize(t.slug)&&"solana"===e.chainType&&"null"!==e.connectorType)||o||t.mobile.native||t.mobile.universal||m.m[t.slug]?.chainTypes.includes("solana")||(i=i.filter(e=>!e.includes("solana:"))),!i.length)return;let a=z.normalize(t.slug),l=k[t.slug],s=l?.image_url?.sm||t.image_url?.sm;i.some(e=>e.includes("eip155:"))&&r({id:a,label:t.name||a,source:"listing",listing:t,chainType:"ethereum",icon:s,url:t.homepage,chains:i,allowListKey:this.getAllowListKey(t.slug,"listing")}),i.some(e=>e.includes("solana:"))&&r({id:a,label:t.name||a,source:"listing",listing:t,chainType:"solana",icon:s,url:t.homepage,chains:i,allowListKey:this.getAllowListKey(t.slug,"listing")})}),this.includeWalletConnectQr&&n&&r({id:"wallet_connect_qr",label:"WalletConnect",source:"connector",connector:n,chainType:"ethereum",icon:v.a,url:void 0,chains:["eip155"],allowListKey:"wallet_connect_qr"}),this.includeWalletConnectQrSolana&&o&&r({id:"wallet_connect_qr_solana",label:"WalletConnect",source:"connector",connector:o,chainType:"solana",icon:v.a,url:void 0,chains:["solana"],allowListKey:"wallet_connect_qr_solana"});let a=Array.from(i.values());a.forEach(e=>{let t=k[e.listing?.slug||e.id];t?.image_url?.sm&&(e.icon=t.image_url.sm)});let l=new Map;return this.normalizedAllowList?.forEach((e,t)=>{l.set(z.normalize(e),t)}),{wallets:a.slice().sort((e,t)=>{if(e.allowListKey&&t.allowListKey){let i=this.normalizedAllowList?.findIndex(t=>z.normalize(t)===z.normalize(e.allowListKey))??-1,r=this.normalizedAllowList?.findIndex(e=>z.normalize(e)===z.normalize(t.allowListKey))??-1;if(i!==r&&i>=0&&r>=0)return i-r}if(e.allowListKey&&!t.allowListKey)return -1;if(!e.allowListKey&&t.allowListKey)return 1;let i=z.normalize(e.id),r=z.normalize(t.id);"binance-defi"===i?i="binance":"universalprofiles"===i?i="universal_profile":"cryptocom-defi"===i?i="cryptocom":"bitkeep"===i&&(i="bitget_wallet"),"binance-defi"===r?r="binance":"universalprofiles"===r?r="universal_profile":"cryptocom-defi"===r?r="cryptocom":"bitkeep"===r&&(r="bitget_wallet");let n=l.has(i),o=l.has(r);return n&&o?l.get(i)-l.get(r):n?-1:o?1:"connector"===e.source&&"listing"===t.source?-1:"listing"===e.source&&"connector"===t.source?1:e.label.toLowerCase().localeCompare(t.label.toLowerCase())}),walletCount:a.length}}constructor(e,t){if(this.chainFilter=e,t&&t.length>0){if(this.normalizedAllowList=t.map(String),this.normalizedAllowList.includes("binance")){let e=this.normalizedAllowList.indexOf("binance");this.normalizedAllowList.splice(e+1,0,"binance-defi-wallet")}if(this.normalizedAllowList.includes("bitget_wallet")){let e=this.normalizedAllowList.indexOf("bitget_wallet");this.normalizedAllowList.splice(e+1,0,"bitkeep")}}this.detectedEth=this.normalizedAllowList?.includes("detected_ethereum_wallets")??!1,this.detectedSol=this.normalizedAllowList?.includes("detected_solana_wallets")??!1,this.includeWalletConnect=this.normalizedAllowList?.includes("wallet_connect")??!1,this.includeWalletConnectQr=this.normalizedAllowList?.includes("wallet_connect_qr")??!1,this.includeWalletConnectQrSolana=this.normalizedAllowList?.includes("wallet_connect_qr_solana")??!1}}var j=e=>(0,t.jsxs)("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",...e,children:[(0,t.jsx)("path",{d:"m0 0h32v32h-32z",fill:"#5469d4"}),(0,t.jsx)("path",{d:"m15.997 5.333-.143.486v14.106l.143.143 6.548-3.87z",fill:"#c2ccf4"}),(0,t.jsx)("path",{d:"m15.996 5.333-6.548 10.865 6.548 3.87z",fill:"#fff"}),(0,t.jsx)("path",{d:"m15.997 21.306-.08.098v5.025l.08.236 6.552-9.227z",fill:"#c2ccf4"}),(0,t.jsx)("path",{d:"m15.996 26.665v-5.36l-6.548-3.867z",fill:"#fff"}),(0,t.jsx)("path",{d:"m15.995 20.07 6.548-3.87-6.548-2.976v6.847z",fill:"#8698e8"}),(0,t.jsx)("path",{d:"m9.448 16.2 6.548 3.87v-6.846z",fill:"#c2ccf4"})]}),S=e=>(0,t.jsxs)("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",...e,children:[(0,t.jsxs)("linearGradient",{id:"a",gradientUnits:"userSpaceOnUse",x1:"7.233",x2:"24.766",y1:"24.766",y2:"7.234",children:[(0,t.jsx)("stop",{offset:"0",stopColor:"#9945ff"}),(0,t.jsx)("stop",{offset:".2",stopColor:"#7962e7"}),(0,t.jsx)("stop",{offset:"1",stopColor:"#00d18c"})]}),(0,t.jsx)("path",{d:"m0 0h32v32h-32z",fill:"#10111a"}),(0,t.jsx)("path",{clipRule:"evenodd",d:"m9.873 20.41a.645.645 0 0 1 .476-.21l14.662.012a.323.323 0 0 1 .238.54l-3.123 3.438a.643.643 0 0 1 -.475.21l-14.662-.012a.323.323 0 0 1 -.238-.54zm15.376-2.862a.322.322 0 0 1 -.238.54l-14.662.012a.642.642 0 0 1 -.476-.21l-3.122-3.44a.323.323 0 0 1 .238-.54l14.662-.012a.644.644 0 0 1 .475.21zm-15.376-9.738a.644.644 0 0 1 .476-.21l14.662.012a.322.322 0 0 1 .238.54l-3.123 3.438a.643.643 0 0 1 -.475.21l-14.662-.012a.323.323 0 0 1 -.238-.54z",fill:"url(#a)",fillRule:"evenodd"})]});function T({enabled:e=!0,walletList:t,walletChainType:r}){let n=(0,p.a)(),{connectors:o}=(0,w.u)(),{listings:a,loading:l}=(0,m.u)(e),s=r??n.appearance.walletChainType,c=t??n.appearance?.walletList,d=(0,i.useMemo)(()=>new z(s,c),[s,c]),{wallets:h,walletCount:u}=(0,i.useMemo)(()=>d.getWallets(o,a),[d,o,a]),[g,v]=(0,i.useState)(""),f=(0,i.useMemo)(()=>g?h.filter(e=>e.label.toLowerCase().includes(g.toLowerCase())):h,[g,h]),[y,b]=(0,i.useState)();return{selected:y,setSelected:b,search:g,setSearch:v,loadingListings:l,wallets:f,walletCount:u}}let V=e=>!e||"string"!=typeof e&&(e instanceof m.j||e instanceof m.S),D=({index:e,style:i,data:r,recent:n})=>{let o=r.wallets[e],{walletChainType:a,handleWalletClick:l}=r,{t:s}=(0,g.u)(),c={...i,boxSizing:"border-box"};return o?(0,t.jsxs)(L,{style:c,onClick:()=>l(o),children:[o.icon&&(o.connector&&!V(o.connector)?(0,t.jsx)(x.b,{children:"string"==typeof o.icon?(0,t.jsx)(x.W,{src:o.icon}):(0,t.jsx)(o.icon,{style:{width:"32px",height:"32px"}})}):"string"==typeof o.icon?(0,t.jsx)(x.W,{src:o.icon}):(0,t.jsx)(o.icon,{style:{width:"32px",height:"32px"}})),(0,t.jsx)(E,{children:o.label}),n?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(x.C,{children:s("connectWallet.lastUsed")}),(0,t.jsx)($,{children:(0,t.jsxs)(t.Fragment,{children:["ethereum-only"===a&&(0,t.jsx)(j,{}),"solana-only"===a&&(0,t.jsx)(S,{})]})})]}):(0,t.jsx)($,{children:"ethereum-only"!==a&&"solana-only"!==a&&(0,t.jsxs)(t.Fragment,{children:[o.chains?.some(e=>e.startsWith("eip155"))&&(0,t.jsx)(j,{}),o.chains?.some(e=>e.startsWith("solana"))&&(0,t.jsx)(S,{})]})})]}):null},W=a.z.div`
  position: sticky;
  /* Offset by negative margin to account for focus outline */
  margin-top: -3px;
  padding-top: 3px;
  top: -3px;
  z-index: 1;
  background: var(--privy-color-background);
  padding-bottom: calc(var(--screen-space) / 2);
`,F=a.z.div`
  display: flex;
  flex-direction: column;
  gap: ${5}px;
`,L=a.z.button`
  && {
    gap: 0.5rem;
    align-items: center;
    display: flex;
    position: relative;
    text-align: left;
    font-weight: 500;
    transition: background 200ms ease-in;
    width: calc(100% - 4px);
    border-radius: var(--privy-border-radius-md);
    padding: 0.75em;
    border: 1px solid var(--privy-color-foreground-4);
    justify-content: space-between;
  }

  &:hover {
    background: var(--privy-color-background-2);
  }
`,$=a.z.span`
  display: flex;
  align-items: center;
  justify-content: end;
  position: relative;

  & > svg {
    border-radius: var(--privy-border-radius-full);
    stroke-width: 2.5;
    width: 100%;
    max-height: 1rem;
    max-width: 1rem;
    flex-shrink: 0;
  }

  & > svg:not(:last-child) {
    border-radius: var(--privy-border-radius-full);
    margin-right: -0.375rem;
  }
`,M=a.z.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`,E=a.z.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--privy-color-foreground);
  font-weight: 400;
  flex: 1;
`,A=(0,a.z)(s.C)`
  && {
    margin: 0.5rem auto 0;
  }
`,_=a.z.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--privy-color-foreground-3);
`;e.s(["W",0,z,"a",0,D,"i",0,({className:e,customDescription:a,connectOnly:s,preSelectedWalletId:P,hideHeader:U,...O})=>{let I=(0,p.a)(),{t:B}=(0,g.u)(),{connectors:R}=(0,w.u)(),N=O.walletChainType||I.appearance.walletChainType,Z=O.walletList||I.appearance?.walletList,{onBack:q,onClose:K,app:H}=O,{selected:Q,setSelected:Y,qrUrl:G,setQrUrl:J,connecting:X,uiState:ee,errorCode:et,wallets:ei,walletCount:er,handleConnect:en,handleBack:eo,showSearchBar:ea,isInitialConnectView:el,title:es,search:ec,setSearch:ed}=function({onConnect:e,onBack:t,onClose:r,onConnectError:n,walletList:a,walletChainType:l,app:s}){let c=(0,p.a)(),{connectors:d}=(0,w.u)(),{t:h}=(0,g.u)(),{wallets:u,walletCount:y,search:x,setSearch:C,selected:k,setSelected:z}=T({enabled:(0,m.s)(a??[]),walletList:a,walletChainType:l}),[j,S]=(0,i.useState)(),[V,D]=(0,i.useState)(),[W,F]=(0,i.useState)(),[L,$]=(0,i.useState)(),M=!k&&!W&&!L,E=M&&(y>6||x.length>0),A=d.find(e=>"wallet_connect_v2"===e.connectorType),_=(0,i.useCallback)(async(t,i)=>{if(!t)return;let r=i?.name??"Wallet";if(L?.connector!==t||"loading"!==j){if(S("loading"),"string"==typeof t)return v.c.debug("Connecting wallet via deeplink",{wallet:r,url:t.length>80?`${t.slice(0,80)}...`:t}),$({connector:t,name:r,icon:i?.icon,id:i?.id,url:i?.url}),void window.open(t,"_blank");v.c.debug("Connecting wallet via connector",{wallet:r,connectorType:t.connectorType}),$({connector:t,name:i?.name??t.walletBranding.name??"Wallet",icon:i?.icon??t.walletBranding.icon,id:i?.id,url:i?.url});try{let i=await t.connect({showPrompt:!0});if(!i)return v.c.warn("Wallet connection returned null",{wallet:r,connectorType:t.connectorType}),S("error"),D(void 0),void n?.(new f.e("Unable to connect wallet"));v.c.debug("Wallet connection successful",{wallet:r,connectorType:t.connectorType}),(0,m.i)(i)&&await (0,b.e)(i,c),S("success"),D(void 0),(0,b.s)({address:i.address,client:i.walletClientType,appId:c.id}),setTimeout(()=>{e({connector:t,wallet:i})},p.Q)}catch(i){if(i?.message?.includes("already pending for origin")||i?.message?.includes("wallet_requestPermissions"))return void v.c.debug("Connection request already pending, maintaining loading state",{wallet:r});let e=i instanceof Error?i.message:String(i?.message||"Unknown error");v.c.error("Wallet connection failed",i,{wallet:r,connectorType:t.connectorType,errorCode:i?.privyErrorCode}),S("error"),D(i?.privyErrorCode),n?.(i instanceof Error?i:new f.e(e||"Unable to connect wallet"))}}else v.c.debug("Duplicate connection attempt prevented",{wallet:r})},[c.id,e,L,j]),P=(0,i.useCallback)(()=>W?(S(void 0),D(void 0),$(void 0),void F(void 0)):L?(S(void 0),D(void 0),void $(void 0)):k?(S(void 0),D(void 0),$(void 0),void z(void 0)):"error"===j||"loading"===j?(S(void 0),D(void 0),void $(void 0)):void t?.(),[W,L,k,j,t]),U=(0,i.useMemo)(()=>L?.connector===A&&W&&o.isMobile&&L?.name?h("connectWallet.goToWallet",{walletName:L.name}):L?.connector===A&&W&&L?.name?h("connectWallet.scanToConnect",{walletName:L.name}):W&&L?.name?h(o.isMobile?"connectWallet.goToWallet":"connectWallet.scanToConnect",{walletName:L.name}):"string"==typeof L?.connector?h("connectWallet.openOrInstall",{walletName:L.name}):k&&!L?h("connectWallet.selectNetwork"):L?null:h("connectWallet.selectYourWallet"),[L,W,k,A,h]);return{selected:k,setSelected:z,qrUrl:W,setQrUrl:F,connecting:L,uiState:j,errorCode:V,search:x,setSearch:C,wallets:u,walletCount:y,wc:A,isInitialConnectView:M,showSearchBar:E,title:U,handleConnect:_,handleBack:P,onClose:r,onConnect:e,app:s}}({...O,walletList:Z,walletChainType:N}),eh=R.find(e=>"wallet_connect_v2"===e.connectorType),eu=R.find(e=>"walletconnect_solana"===e.walletBranding.id),ep=(0,i.useRef)(null),eg=(0,n.f)({count:ei.length,getScrollElement:()=>ep.current,estimateSize:()=>56,overscan:6,gap:5}),em=(0,i.useCallback)(async e=>{let t,i="solana-only"!==N&&e.chains?.some(e=>e.startsWith("eip155")),r="ethereum-only"!==N&&e.chains?.some(e=>e.startsWith("solana")),n=(t=e.id,m.m[t]||m.m[`${t}_wallet`]),a=t=>{let i=z.normalize(e.id);return R.find(e=>z.normalize(e.walletClientType)===i&&e.chainType===t&&"wallet_connect_v2"!==e.connectorType&&!("ethereum"===e.chainType&&e instanceof m.j||"solana"===e.chainType&&e instanceof m.S))},l=i?a("ethereum"):void 0,c=r?a("solana"):void 0;if(n&&(0,m.l)({isMobile:o.isMobile,walletConfig:n})&&!l&&!c)return v.c.debug("Using install flow for wallets that do not support WalletConnect.",{wallet:e.id}),void await en(n.installLink,{name:e.label,icon:e.icon,id:e.id,url:e.url});let d=async()=>{if(!eh||!e.listing)return!1;let t=k[e.listing.slug]?{...e.listing,...k[e.listing.slug]}:e.listing;return eh.setWalletEntry(t,J),await eh.resetConnection(e.id),await en(eh,{name:e.label,icon:e.icon,id:e.id,url:e.url}),!0},h=async()=>!!eu&&!!e.listing&&(await eu.disconnect(),eu.wallet.setWalletEntry(e.listing,J),await new Promise(e=>setTimeout(e,100)),await en(eu,{name:e.label,icon:e.icon,id:e.id,url:e.url}),!0),u=async t=>{let i=(e=>{if(n)return n.getMobileRedirect({isSolana:e,connectOnly:!!s,useUniversalLink:!1})})(t);return!!i&&(await en(i,{name:e.label,icon:e.icon,id:e.id,url:e.url}),!0)};if(i&&r)Y(e);else{if(i&&!r){if(l&&!V(l))return v.c.debug("Attempting injected EVM connection",{wallet:e.id,connectorType:l.connectorType}),void await en(l,{name:e.label,icon:e.icon,id:e.id,url:e.url});if(o.isMobile&&n){if(await u(!1)||await d())return}else if(await d()||await u(!1))return}if(r&&!i){if(c&&!V(c))return v.c.debug("Attempting injected Solana connection",{wallet:e.id,connectorType:c.connectorType}),void await en(c,{name:e.label,icon:e.icon,id:e.id,url:e.url});if(o.isMobile){if(await u(!0)||await h())return}else if(await h()||await u(!0))return}if(!V(e.connector)){if(v.c.debug("Using fallback direct connector",{wallet:e.id,connectorType:e.connector?.connectorType}),eh&&"wallet_connect_v2"===e.connector?.connectorType)if(await eh.resetConnection(e.id),"wallet_connect_qr"!==e.id&&e.listing){let t=k[e.listing.slug]?{...e.listing,...k[e.listing.slug]}:e.listing;eh.setWalletEntry(t,J)}else eh.setWalletEntry({id:"wallet_connect_qr",name:"WalletConnect",rdns:"",slug:"wallet-connect",homepage:"",chains:["eip155"],mobile:{native:"",universal:void 0}},J);return eu&&"walletconnect_solana"===e.connector?.walletBranding.id&&(await eu.disconnect(),"wallet_connect_qr_solana"!==e.id&&e.listing?eu.wallet.setWalletEntry(e.listing,J):eu.wallet.setWalletEntry({id:"wallet_connect_solana_qr",name:"WalletConnect",rdns:"",slug:"wallet-connect-solana",homepage:"",chains:["solana"],mobile:{native:"",universal:void 0}},J),await new Promise(e=>setTimeout(e,100))),void await en(e.connector,{name:e.label,icon:e.icon,id:e.id,url:e.url})}e.url?await en(e.url,{name:e.label,icon:e.icon,id:e.id,url:e.url}):v.c.warn("No available connection method for wallet",{wallet:e.id})}},[eh,eu,en,Y,J,N,s,R]);return(0,i.useEffect)(()=>{if(!P)return;let e=ei.find(({id:e})=>e===P);e&&em(e).catch(console.error)},[P]),(0,t.jsxs)(C.S,{className:e,children:[(0,t.jsx)(C.S.Header,{icon:U&&el?void 0:X&&!G||G&&o.isMobile&&X?.icon?X.icon:X?void 0:y.W,iconVariant:X&&!G||G&&o.isMobile?"loading":void 0,iconLoadingStatus:X&&!G||G&&o.isMobile?{success:"success"===ee,fail:"error"===ee}:void 0,title:U&&el?void 0:X&&!G?B("connectWallet.waitingForWallet",{walletName:X.name}):G&&o.isMobile?B("connectWallet.waitingForWallet",{walletName:X?.name??"connection"}):es,subtitle:U&&el?void 0:X&&!G&&"string"==typeof X.connector?B("connectWallet.installAndConnect",{walletName:X.name}):X&&!G&&"string"!=typeof X.connector?"error"===ee?et===f.a.NO_SOLANA_ACCOUNTS?`The connected wallet has no Solana accounts. Please add a Solana account in ${X.name} and try again.`:B("connectWallet.tryConnectingAgain"):B("coinbase_wallet"===X.connector.connectorType?"coinbaseWallet.connectingSubtitle":"connectionStatus.connectOneWallet"):el?a??(H?B("connectWallet.connectToAccount",{appName:H.name}):null):null,showBack:!!q||!el,showClose:!0,onBack:q||eo,onClose:K}),(0,t.jsxs)(C.S.Body,{ref:ep,$colorScheme:I.appearance.palette.colorScheme,style:{marginBottom:G?"0.5rem":void 0},children:[ea&&(0,t.jsx)(W,{children:(0,t.jsxs)(u.E,{style:{background:"transparent"},children:[(0,t.jsx)(b.m,{children:(0,t.jsx)(r,{})}),(0,t.jsx)("input",{className:"login-method-button",type:"text",placeholder:B("connectWallet.searchPlaceholder",{count:String(er)}),onChange:e=>ed(e.target.value),value:ec})]})}),G&&o.isMobile&&"loading"===ee&&(0,t.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:[(0,t.jsx)(l.B,{variant:"primary",onClick:()=>window.open(G.universal??G.native,"_blank"),style:{width:"100%"},children:B("connectWallet.openInApp")}),(0,t.jsx)(A,{value:G.universal??G.native,iconOnly:!0,children:"Copy link"})]}),G&&!o.isMobile&&"loading"===ee&&(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:(0,t.jsx)(A,{value:G.universal??G.native,iconOnly:!0,children:B("connectWallet.copyLink")})}),G&&!o.isMobile&&(0,t.jsx)(h.Q,{size:280,url:G.universal??G.native,squareLogoElement:X?.icon?"string"==typeof X.icon?e=>(0,t.jsx)("svg",{...e,children:(0,t.jsx)("image",{href:X.icon,height:e.height,width:e.width})}):X.icon:v.d}),G&&!o.isMobile&&X?.url&&("binance"===X.id||"binanceus"===X.id||"binance-defi"===X.id||"robinhood"===X.id)&&(0,t.jsxs)(_,{children:[(0,t.jsxs)("span",{children:["Don't have ",X.name,"? "]}),(0,t.jsx)(c.L,{href:X.url,target:"_blank",size:"sm",children:"Download here"})]}),(0,t.jsxs)(F,{children:[X&&!G&&"string"==typeof X.connector&&(0,t.jsxs)(L,{onClick:()=>window.open(X.connector,"_blank"),children:[X.icon&&("string"==typeof X.icon?(0,t.jsx)(x.W,{src:X.icon}):(0,t.jsx)(X.icon,{})),(0,t.jsx)(E,{children:X.name})]}),Q?.chains.some(e=>e.startsWith("eip155"))&&!X&&(0,t.jsxs)(L,{onClick:()=>em({...Q,chains:Q.chains.filter(e=>e.startsWith("eip155"))}),children:[Q.icon&&("string"==typeof Q.icon?(0,t.jsx)(x.W,{src:Q.icon}):(0,t.jsx)(Q.icon,{})),(0,t.jsx)(E,{children:Q.label}),(0,t.jsx)($,{children:(0,t.jsx)(j,{})})]}),Q?.chains.some(e=>e.startsWith("solana"))&&!X&&(0,t.jsxs)(L,{onClick:()=>em({...Q,chains:Q.chains.filter(e=>e.startsWith("solana"))}),children:[Q.icon&&("string"==typeof Q.icon?(0,t.jsx)(x.W,{src:Q.icon}):(0,t.jsx)(Q.icon,{})),(0,t.jsx)(E,{children:Q.label}),(0,t.jsx)($,{children:(0,t.jsx)(S,{})})]}),el&&(0,t.jsxs)(t.Fragment,{children:[!(er>0)&&(0,t.jsx)(M,{children:B("connectWallet.noWalletsFound")}),er>0&&!G&&(0,t.jsx)("div",{style:{maxHeight:56*Math.min(ei.length,5)+5,width:"100%"},children:(0,t.jsx)("div",{style:{height:`${eg.getTotalSize()}px`,width:"100%",position:"relative"},children:eg.getVirtualItems().map(e=>(0,t.jsx)(D,{index:e.index,style:{position:"absolute",top:0,left:0,height:`${e.size}px`,transform:`translateY(${e.start}px)`},data:{wallets:ei,walletChainType:N,handleWalletClick:em}},e.key))})})]})]})]}),(0,t.jsxs)(C.S.Footer,{children:[X&&!G&&"string"!=typeof X.connector&&"error"===ee&&(0,t.jsx)(C.S.Actions,{children:(0,t.jsx)(l.B,{style:{width:"100%",alignItems:"center"},variant:"error",onClick:()=>en(X.connector,{name:X.name,icon:X.icon,id:X.id,url:X.url}),children:B("connectWallet.retry")})}),!!(H&&H.legal.privacyPolicyUrl&&H.legal.termsAndConditionsUrl)&&(0,t.jsx)(d.T,{app:H,alwaysShowImplicitConsent:!0}),(0,t.jsx)(C.S.Watermark,{})]})]})},"u",0,T],467793)},164923,e=>{var t=e.i(732486),i=e.i(653327),r=e.i(574695),n=e.i(352386),o=e.i(689391);let a=o.z.button`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;

  && {
    color: var(--privy-color-foreground);
    font-weight: 500;
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`,l=o.z.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--privy-color-foreground-2);
`,s=(0,o.z)(i.f)`
  color: var(--privy-color-icon-success);
  flex-shrink: 0;
`,c=(0,o.z)(r.f)`
  color: var(--privy-color-icon-muted);
  flex-shrink: 0;
`;e.s(["C",0,function({children:e,iconOnly:i,value:r,hideCopyIcon:o,onCopy:d,iconSize:h=14,...u}){let[p,g]=(0,n.useState)(!1);return(0,t.jsxs)(a,{...u,onClick:()=>{navigator.clipboard.writeText(r||("string"==typeof e?e:"")).then(()=>d?.()).catch(console.error),g(!0),setTimeout(()=>g(!1),1500)},children:[e," ",p?(0,t.jsxs)(l,{children:[(0,t.jsx)(s,{size:h})," ",!i&&"Copied"]}):!o&&(0,t.jsx)(c,{size:h})]})},"a",0,({value:e,includeChildren:i,children:r,...o})=>{let[d,h]=(0,n.useState)(!1),u=()=>{navigator.clipboard.writeText(e).catch(console.error),h(!0),setTimeout(()=>h(!1),1500)};return(0,t.jsxs)(t.Fragment,{children:[i?(0,t.jsx)(a,{...o,onClick:u,children:r}):(0,t.jsx)(t.Fragment,{children:r}),(0,t.jsx)(a,{...o,onClick:u,children:d?(0,t.jsx)(l,{children:(0,t.jsx)(s,{})}):(0,t.jsx)(c,{})})]})}])},305869,e=>{var t=e.i(689391),i=e.i(294882);let r=t.z.label`
  display: block;
  position: relative;
  width: 100%;
  height: 56px;

  && > :first-child {
    position: absolute;
    left: 0.75em;
    top: 50%;
    transform: translate(0, -50%);
  }

  && > input {
    font-size: 16px;
    line-height: 24px;
    color: var(--privy-color-foreground);

    padding: 12px 88px 12px 52px;
    flex-grow: 1;
    background: var(--privy-color-background);
    border: 1px solid
      ${({$error:e})=>e?"var(--privy-color-error) !important":"var(--privy-color-foreground-4)"};
    border-radius: var(--privy-border-radius-md);
    width: 100%;
    height: 100%;

    /* Tablet and Up */
    @media (min-width: 441px) {
      font-size: 14px;
      padding-right: 78px;
    }

    :focus {
      outline: none;
      border-color: ${({$error:e})=>e?"var(--privy-color-error) !important":"var(--privy-color-accent-light)"};
      box-shadow: ${({$error:e})=>e?"none":"0 0 0 1px var(--privy-color-accent-light)"};
    }

    :autofill,
    :-webkit-autofill {
      background: var(--privy-color-background);
    }

    && > input::placeholder {
      color: var(--privy-color-foreground-3);
    }
    &:disabled {
      opacity: 0.4; /* Make it visually appear disabled */
      cursor: not-allowed; /* Change cursor to not-allowed */
    }
    &:disabled,
    &:disabled:hover,
    &:disabled > span {
      color: var(--privy-color-foreground-3); /* Change text color to grey */
    }
  }

  && > button:last-child {
    right: 0;
    line-height: 24px;
    padding: 16px 17px;
    /* matches the border radius of the input only on the right side where we touch the radius */
    border-radius: 0 var(--privy-border-radius-md) var(--privy-border-radius-md) 0;

    :focus {
      outline: none;
    }
    &:disabled {
      opacity: 0.4; /* Make it visually appear disabled */
      cursor: not-allowed; /* Change cursor to not-allowed */
    }
    &:disabled,
    &:disabled:hover,
    &:disabled > span {
      color: var(--privy-color-foreground-3); /* Change text color to grey */
    }
  }
`,n=(0,t.z)(r)`
  background-color: var(--privy-color-background);
  transition: background-color 200ms ease;
`,o=(0,t.z)(r)`
  && > input {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    padding-right: ${e=>e.$stacked?"16px":"88px"};

    border: 1px solid
      ${({$error:e})=>e?"var(--privy-color-error) !important":"var(--privy-color-foreground-4)"};

    && > input::placeholder {
      color: var(--privy-color-foreground-3);
    }
  }

  && > :last-child {
    right: 16px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }

  && > button:last-child {
    right: 0;
    line-height: 24px;
    padding: 16px 17px;

    :focus {
      outline: none;
    }
  }
`,a=t.z.div`
  width: 100%;

  /* Add styling for the ErrorMessage within EmailInput */
  && > ${i.E} {
    display: block;
    text-align: left;
    padding-left: var(--privy-border-radius-md);
    padding-bottom: 5px;
  }
`;e.s(["E",0,n,"I",0,a,"a",0,o])},294882,e=>{var t=e.i(689391);let i=t.z.span`
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */

  color: var(--privy-color-error);
`;e.s(["E",0,i])},583503,e=>{var t=e.i(732486),i=e.i(689391);let r=i.z.a`
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
      color: ${({$variant:e,$disabled:t})=>"underlined"===e?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))"};
      text-decoration: ${({$disabled:e})=>e?"none":"underline"};
      text-underline-offset: 4px;
    }

    &:active {
      color: ${({$variant:e,$disabled:t})=>t?"underlined"===e?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))":"var(--privy-color-foreground)"};
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
`;e.s(["L",0,({size:e="md",variant:i="navigation",disabled:n=!1,as:o,children:a,onClick:l,...s})=>(0,t.jsx)(r,{as:o,$size:e,$variant:i,$disabled:n,onClick:e=>{n?e.preventDefault():l?.(e)},...s,children:a})])},25047,e=>{var t=e.i(732486),i=e.i(689391),r=e.i(933185);function n(e){return(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 460 40",...e,children:(0,t.jsx)("g",{fill:e.color||"var(--privy-color-foreground)",children:(0,t.jsx)("path",{d:"M0 15.4v15.38h4.64V19.96h3.58c2.47 0 3.63-.01 3.77-.02 1-.08 1.49-.15 2.18-.3a9.45 9.45 0 0 0 4.6-2.37c1.66-1.57 2.64-3.87 2.81-6.56.02-.3.02-1.19 0-1.49-.1-1.77-.56-3.35-1.36-4.72A8.84 8.84 0 0 0 15.14.57c-.93-.3-1.75-.43-3.09-.54C11.9.02 10.2 0 5.93 0H0ZM10.85 4c1.85.05 3.1.45 4.16 1.3.22.17.54.49.69.68a5.97 5.97 0 0 1 1.19 3.13c.04.35.04 1.36 0 1.71-.08.68-.23 1.3-.44 1.85a4.8 4.8 0 0 1-1.09 1.68A5.63 5.63 0 0 1 12 15.92c-.6.08-.4.08-4.01.09H4.64V3.98h2.9c1.6 0 3.08 0 3.31.02ZM187.65 5.71v5.72h-.27l-.09-.14a15.9 15.9 0 0 0-1.21-1.73c-.43-.5-1-.95-1.7-1.36-.54-.3-1.05-.5-1.73-.63a8.98 8.98 0 0 0-1.7-.17 8.84 8.84 0 0 0-7.8 4.03 12.95 12.95 0 0 0-2.03 6.39c-.07.98-.06 2.15.02 3.13.2 2.47.87 4.53 2.02 6.25a8.98 8.98 0 0 0 10.22 3.65 6.5 6.5 0 0 0 2.8-1.93c.41-.51.84-1.1 1.1-1.55l.1-.17h.37v3.58h4.38V0h-4.48Zm-5.24 5.54c1.3.14 2.3.6 3.17 1.48.9.9 1.5 2.09 1.85 3.64.36 1.6.39 3.72.06 5.43a8.13 8.13 0 0 1-1.54 3.62 5.1 5.1 0 0 1-3.93 1.96 6.13 6.13 0 0 1-2.32-.31 5.87 5.87 0 0 1-3.33-3.5c-.39-1-.62-2.05-.72-3.32-.03-.32-.04-1.35-.02-1.73.08-1.56.4-2.91.96-4.05a6.2 6.2 0 0 1 1.06-1.58 5.08 5.08 0 0 1 3.6-1.66c.25-.02.9 0 1.16.02ZM210.07 15.39l.01 15.38h4.38l.01-3.57h.37l.09.15c.24.44.84 1.26 1.21 1.7a6.79 6.79 0 0 0 2.57 1.75 9.3 9.3 0 0 0 6.86-.49 9.28 9.28 0 0 0 4.05-4.07A13.05 13.05 0 0 0 231 21.6c.21-1.73.18-3.7-.09-5.32a13.03 13.03 0 0 0-1.5-4.3 9.1 9.1 0 0 0-3.75-3.63 9.15 9.15 0 0 0-4.43-.96 7.46 7.46 0 0 0-2.8.5A7.07 7.07 0 0 0 216 9.7c-.4.52-.82 1.12-1.1 1.59l-.07.14h-.27V0h-4.5Zm11.13-4.14c1.07.1 1.94.44 2.7 1.04a6.1 6.1 0 0 1 1.64 1.98c.43.84.78 2 .94 3.11.15 1.16.16 2.4.02 3.54a9.34 9.34 0 0 1-1.39 4.03 5.33 5.33 0 0 1-2.69 2.15c-.9.3-2.04.38-3.06.2a5.14 5.14 0 0 1-3.45-2.37 6.03 6.03 0 0 1-.45-.8c-.5-1.03-.8-2.2-.92-3.58-.04-.49-.06-.89-.05-1.53.01-.76.05-1.23.13-1.85.38-2.53 1.47-4.38 3.15-5.31a5.46 5.46 0 0 1 2.3-.63 10 10 0 0 1 1.13.02ZM69.05 2.17l-.01 2.77V7.7h-3.36v3.6h3.36v6.8l.01 7.15c.06 1.4.4 2.44 1.1 3.37a5.8 5.8 0 0 0 2.97 2.07c.91.3 1.83.42 2.9.38a8.71 8.71 0 0 0 2.66-.48l-.8-3.7-.38.06a4.96 4.96 0 0 1-2.43-.06c-.33-.1-.56-.25-.8-.49-.4-.41-.6-.88-.7-1.67-.02-.2-.02-.62-.03-6.82v-6.6h4.73V7.7h-4.73V2.16h-4.49ZM133.34 2.17V7.7h-3.39v3.6h3.38v6.9l.01 7.17a5.66 5.66 0 0 0 2.36 4.49c.85.6 2.03 1.03 3.26 1.17.85.1 2.03.05 2.81-.1.3-.06.75-.18 1-.26l.2-.06v-.05l-.81-3.67-.37.06a4.99 4.99 0 0 1-1.8.09c-.85-.13-1.32-.4-1.7-.97a2.63 2.63 0 0 1-.39-1.04c-.06-.4-.06 0-.06-7.1V11.3h4.7V7.7h-4.7l-.01-2.77V2.16h-4.49ZM293.41 2.36a14.56 14.56 0 0 0-13.7 16.07 14.59 14.59 0 0 0 21.86 11.08 14.5 14.5 0 0 0 7.11-14.07 14.61 14.61 0 0 0-6.53-10.73 14.49 14.49 0 0 0-8.74-2.35ZM350.8 2.36a10.17 10.17 0 0 0-7.56 4.2c-.16.2-.45.63-.58.83l-.05.1h-.47l-.01-4.36h-7.36v36.4h7.82V27.27h.49l.05.07a11.3 11.3 0 0 0 7.49 4.15 10.52 10.52 0 0 0 9.38-4.1c1.66-2.1 2.73-4.9 3.07-8.06.1-.87.13-1.4.13-2.37 0-.8 0-1.1-.07-1.76a15.95 15.95 0 0 0-3.23-8.72 12.8 12.8 0 0 0-1.85-1.84 10.49 10.49 0 0 0-7.26-2.28Zm-.94 6.05c1.27.15 2.33.65 3.2 1.5.98.96 1.67 2.31 2.03 4 .34 1.57.38 3.68.12 5.39a9.78 9.78 0 0 1-1.04 3.25c-.14.25-.44.69-.6.89a5.35 5.35 0 0 1-4.31 2.07 5.25 5.25 0 0 1-4.41-1.9 7.35 7.35 0 0 1-1.26-2.32 14.09 14.09 0 0 1-.62-4.83c.05-1.98.38-3.53 1.02-4.85a5.63 5.63 0 0 1 2.5-2.65c.66-.34 1.3-.5 2.14-.58.18-.02 1.04 0 1.23.03ZM363.63 3.1l-.01 3.2v3.16h1.43c1.26.01 1.44.02 1.54.04.42.09.66.28.79.62.08.23.08.08.08 2.96a911.57 911.57 0 0 1 .03 10.18v7.54h7.82v-7.4l.01-7.83c.03-.94.11-1.63.27-2.28.46-1.9 1.54-2.93 3.35-3.23.52-.08.2-.08 5-.08h4.4V3.08h-3.1c-3.48 0-3.91.01-4.67.1-1.83.2-3.04.79-3.96 1.88-.5.6-.9 1.32-1.26 2.26l-.06.17h-.46V3.09h-5.6c-4.46 0-5.6 0-5.6.02ZM390.8 16.95V30.8h3.87l3.86-.01V3.09h-7.73ZM400.6 3.1l-.01.4v.38l4.66 13.4 4.69 13.47.02.05h10.3l.03-.05 4.67-13.45 4.67-13.4V3.1h-7.43l-6.7 19.26h-.5l-3.28-9.5-3.31-9.64-.05-.12h-3.88l-3.88.01ZM430.98 3.1c-.01 0-.02.19-.02.4v.39l5.08 14.59c2.8 8.02 5.08 14.6 5.08 14.61.01.02-.22.02-4.8.02h-4.82v6.42h4.95c5.09 0 5.23 0 5.87-.06 3.15-.28 5.29-1.63 6.63-4.15.28-.55.44-.95.87-2.16L459 6.78l1-2.89v-.8h-7.43l-6.69 19.26h-.5l-3.27-9.46-3.31-9.64-.06-.16h-3.88l-3.88.01ZM36.57 7.36c-1.36.1-2.6.6-3.62 1.45a5.65 5.65 0 0 0-1.67 2.42l-.05.13H31V7.7h-4.35v23.08h4.5v-7.3c0-8 0-7.34.08-7.82a4.89 4.89 0 0 1 2.06-3.18c.83-.58 1.74-.89 2.87-.98a11.87 11.87 0 0 1 2.8.25H39v-4.3l-.21-.02c-.61-.07-1.74-.1-2.22-.07ZM51.08 7.41c-2.33.12-4.3.84-5.95 2.16a9.89 9.89 0 0 0-2.03 2.2 12.5 12.5 0 0 0-2 5.78 18.04 18.04 0 0 0 0 3.65 12.13 12.13 0 0 0 2.26 6.05 9.74 9.74 0 0 0 5 3.52c2.11.64 4.7.64 6.8 0a9.78 9.78 0 0 0 4.88-3.37c1.38-1.78 2.19-4 2.4-6.58.13-1.46.06-3.06-.18-4.42a11.24 11.24 0 0 0-3.58-6.6 10 10 0 0 0-5.75-2.35c-.56-.06-1.31-.07-1.85-.04Zm1.42 3.78c.88.1 1.62.34 2.28.75a6.13 6.13 0 0 1 1.99 2.15 10.31 10.31 0 0 1 1.2 5c.02 1.23-.12 2.44-.42 3.51a7.14 7.14 0 0 1-1.81 3.32c-.61.6-1.2.98-1.95 1.24a6 6 0 0 1-2 .3 5.7 5.7 0 0 1-2.72-.6 5 5 0 0 1-1.28-.94A7.1 7.1 0 0 1 46 22.73c-.57-1.99-.6-4.46-.08-6.5a7.24 7.24 0 0 1 2.03-3.67 5.13 5.13 0 0 1 3.35-1.4 11 11 0 0 1 1.2.03ZM92.05 7.4c-.96.06-1.56.15-2.3.33a9.62 9.62 0 0 0-6.09 4.66 13.5 13.5 0 0 0-1.71 7c0 .83 0 1.04.06 1.6.16 1.77.58 3.32 1.29 4.7A9.72 9.72 0 0 0 90.28 31c1.84.37 4.08.32 5.85-.13a9.07 9.07 0 0 0 5.02-3.1A7.64 7.64 0 0 0 102.5 25l-2.11-.39-2.11-.38-.08.13a4.72 4.72 0 0 1-2.35 2.55 6.3 6.3 0 0 1-2.23.58c-.29.03-1.13.03-1.44 0a6.35 6.35 0 0 1-3.02-1.04 5.93 5.93 0 0 1-2.02-2.43 8.44 8.44 0 0 1-.72-3.18v-.26h16.38v-.81c0-1.83-.06-2.76-.25-3.87-.2-1.22-.53-2.24-1.05-3.28a8.9 8.9 0 0 0-2.66-3.26 10.1 10.1 0 0 0-5.34-1.94 18.3 18.3 0 0 0-1.46-.03Zm1.3 3.75c1.2.13 2.19.55 3.05 1.3a5.8 5.8 0 0 1 1.78 2.96c.13.51.21 1.17.21 1.66v.15H86.43v-.12c.08-.97.3-1.78.72-2.61.5-1 1.2-1.8 2.14-2.42a5.32 5.32 0 0 1 2.9-.95c.2-.01.97 0 1.17.03ZM116.79 7.41c-2 .1-3.73.65-5.22 1.65a10.7 10.7 0 0 0-4.25 6.06 16.1 16.1 0 0 0-.5 5.8c.2 2.17.84 4.13 1.88 5.76.58.9 1.32 1.73 2.15 2.4a9.37 9.37 0 0 0 3.6 1.8 12.06 12.06 0 0 0 3.92.34 10.2 10.2 0 0 0 3.84-.95 8.31 8.31 0 0 0 4.76-6.75l.01-.04h-4.37l-.05.16a4.87 4.87 0 0 1-4.24 3.75c-.59.07-1.32.06-1.93-.05a5.47 5.47 0 0 1-3.5-2.27c-.56-.75-1-1.73-1.26-2.79a13.8 13.8 0 0 1-.16-5.24 7.77 7.77 0 0 1 2.1-4.3 5.48 5.48 0 0 1 2.15-1.3 6.4 6.4 0 0 1 3.89.1c.59.21 1.03.5 1.5.96a5.32 5.32 0 0 1 1.46 2.5l.04.15h4.37v-.06a8.22 8.22 0 0 0-5.31-6.94 10.98 10.98 0 0 0-4.88-.74ZM156.2 7.41a9.87 9.87 0 0 0-6 2.29 11.02 11.02 0 0 0-3.41 5.43c-.52 1.78-.68 3.9-.48 5.97.17 1.8.63 3.38 1.37 4.8a9.68 9.68 0 0 0 5.91 4.86c1.65.48 3.63.61 5.53.36 3.72-.49 6.55-2.62 7.56-5.69.12-.39.13-.42.1-.43-.02 0-4.13-.75-4.19-.75-.03 0-.04 0-.1.16-.18.42-.45.9-.72 1.22-.16.2-.49.53-.7.7-.67.54-1.5.9-2.43 1.08-.48.08-.83.11-1.41.11-.64 0-1.07-.04-1.6-.15a5.76 5.76 0 0 1-3.93-2.83 8 8 0 0 1-.99-3.79v-.16h16.38v-1.11l-.02-1.43c-.1-2.25-.53-4-1.35-5.59a9.24 9.24 0 0 0-6.18-4.75c-1.04-.26-2.2-.36-3.33-.3Zm1.45 3.74a5.35 5.35 0 0 1 3.66 1.94 6.1 6.1 0 0 1 1.38 4.01v.12h-11.97v-.06c0-.02 0-.14.02-.25a6.6 6.6 0 0 1 2.15-4.32 5.73 5.73 0 0 1 3.5-1.46c.25-.02 1 0 1.26.02ZM233.58 7.82l8.37 23.22a49.22 49.22 0 0 1-.67 1.9 5.36 5.36 0 0 1-1.14 1.8c-.41.4-.82.58-1.48.69-.27.04-1.03.03-1.35 0a8.05 8.05 0 0 1-1.1-.23l-1.08 3.67c0 .02.32.14.66.22.83.21 1.57.29 2.56.28.56-.01.8-.03 1.24-.1 2.71-.4 4.66-2.09 5.86-5.08l9.64-26.44c0-.02-4.82-.06-4.83-.05l-2.93 8.96-2.91 8.94h-.24l-.22-.65-2.91-8.95-2.7-8.3H233.53ZM293.05 35.8c-1.18.04-1.93.09-2.8.16-2.52.24-4.53.69-5.43 1.23-.7.41-.76.86-.2 1.28.88.66 3.29 1.19 6.36 1.4a48.55 48.55 0 0 0 5.75.05c3.47-.19 6.24-.78 7.11-1.5.22-.19.3-.34.3-.53 0-.1 0-.12-.04-.22-.35-.69-2.32-1.3-5.25-1.63a41.09 41.09 0 0 0-5.8-.24Zm0 0"})})})}let o=i.z.span`
  margin-top: 16px;
  font-size: 13px;
  text-align: center;
  color: var(--privy-color-foreground-3);
  display: block;

  && > a {
    color: var(--privy-color-accent);
  }
`,a=i.z.a`
  && {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,l=i.z.div`
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
`;e.s(["B",0,({className:e})=>{let{appearance:i}=(0,r.a)();return(0,t.jsx)(l,{className:e,children:i.footerLogo??(0,t.jsx)(a,{href:"https://privy.io/?utm_source=module&utm_medium=module&utm_campaign=registration_module",target:"_blank",rel:"noopener noreferrer",id:"protected-by-privy",children:(0,t.jsx)(n,{color:"currentColor",height:13,width:150})})})},"M",0,l,"T",0,function({app:{legal:{privacyPolicyUrl:e,termsAndConditionsUrl:i,requireUsersAcceptTerms:r}},alwaysShowImplicitConsent:n}){let a=!(!e||!i);return(!r||n)&&(i||e)?(0,t.jsxs)(o,{children:["By logging in I agree to the"," ",i&&(0,t.jsx)("a",{href:i,target:"_blank",children:a?"Terms":"Terms of Service"}),a&&" & ",e&&(0,t.jsx)("a",{href:e,target:"_blank",children:"Privacy Policy"})]}):(0,t.jsx)(o,{})}])},995040,e=>{var t=e.i(732486),i=e.i(689391),r=e.i(541021),n=e.i(387556),o=e.i(839326),a=e.i(352386);let l=a.forwardRef(function({title:e,titleId:t,...i},r){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":t},i),e?a.createElement("title",{id:t},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18 18 6M6 6l12 12"}))});var s=e.i(933185),c=e.i(748117);let d=i.z.button`
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
`,h=({children:e,loading:i,disabled:n,success:o,size:a="lg",loadingText:l="Loading...",as:s,onClick:c,...d})=>{let h="a"===s,u=!(!i&&!n);return(0,t.jsx)(p,{as:s,disabled:h?void 0:u,"aria-disabled":h?u:void 0,$success:o,$size:a,onClick:e=>{h&&u?e.preventDefault():c?.(e)},...d,children:i?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.B,{}),l?(0,t.jsx)("span",{style:{marginLeft:"8px"},children:l}):null]}):e})},u=(0,i.z)(d)`
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
`,p=(0,i.z)(d)`
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
  ${e=>e.disabled&&i.m`
      &&&,
      &&&:hover,
      &&&:active {
        background-color: var(--privy-color-background-2);
        border: 1px solid var(--privy-color-border-default);
        color: var(--privy-color-foreground-disabled);
        cursor: not-allowed;
      }
    `}
`,g=({children:e,loading:i,disabled:n,size:o="lg",loadingText:a="Loading...",as:l,onClick:s,...c})=>{let d="a"===l,h=!(!i&&!n);return(0,t.jsx)(v,{as:l,disabled:d?void 0:h,"aria-disabled":d?h:void 0,$size:o,onClick:e=>{d&&h?e.preventDefault():s?.(e)},...c,children:i?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.B,{}),a?(0,t.jsx)("span",{style:{marginLeft:"8px"},children:a}):null]}):e})},m=({children:e,loading:i,disabled:n,size:o="lg",loadingText:a="Loading...",as:l,onClick:s,...c})=>{let d="a"===l,h=!(!i&&!n);return(0,t.jsx)(f,{as:l,disabled:d?void 0:h,"aria-disabled":d?h:void 0,$size:o,onClick:e=>{d&&h?e.preventDefault():s?.(e)},...c,children:i?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.B,{}),a?(0,t.jsx)("span",{style:{marginLeft:"8px"},children:a}):null]}):e})},v=(0,i.z)(d)`
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
  ${e=>e.disabled&&i.m`
      &&&,
      &&&:hover,
      &&&:active {
        border-color: var(--privy-color-border-default);
        background-color: var(--privy-color-background-2);
        color: var(--privy-color-foreground-disabled);
        cursor: not-allowed;
      }
    `}
`,f=(0,i.z)(d)`
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
  ${e=>e.disabled&&i.m`
      &&&,
      &&&:hover,
      &&&:active {
        border-color: var(--privy-color-border-default);
        background-color: var(--privy-color-background-2);
        color: var(--privy-color-foreground-disabled);
        cursor: not-allowed;
      }
    `}
`,w=i.z.button`
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

    ${e=>e.invisible&&i.m`
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
`;i.z.div`
  /* Set to match height of SoftCtaButton to avoid reflow if conditionally rendered */
  height: 44px;
`;let y=i.z.button`
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
`,b=({backFn:e,disabled:i=!1,"aria-label":r})=>(0,t.jsx)("div",{children:(0,t.jsx)(k,{type:"button","aria-label":r,disabled:i,onClick:i?void 0:e,children:(0,t.jsx)(n.f,{height:"16px",width:"16px",strokeWidth:2})})}),x=({infoFn:e})=>(0,t.jsx)("div",{children:(0,t.jsx)(z,{"aria-label":"info",onClick:e,children:(0,t.jsx)(o.f,{height:"22px",width:"22px",strokeWidth:2})})}),C=e=>(0,t.jsx)("div",{children:(0,t.jsx)(k,{type:"button","aria-label":e["aria-label"]??"close modal",onClick:e.onClose,children:(0,t.jsx)(l,{height:"16px",width:"16px",strokeWidth:2})})}),k=i.z.button`
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
`,z=(0,i.z)(k)`
  && {
    background-color: transparent;
  }
`,j=i.z.div`
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
`,S=i.z.div`
  flex: 1;
  align-items: center;
  display: flex;
  gap: 8px;
`,T=i.z.div`
  display: flex;
  justify-content: flex-end;
`,V=i.z.div`
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
`,D=i.z.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--privy-color-foreground);
`;e.s(["B",0,({variant:e="primary",size:i="lg",children:r,success:n,...o})=>{switch(e){case"secondary":return(0,t.jsx)(g,{size:i,...o,children:r});case"error":return(0,t.jsx)(g,{$warn:!0,size:i,...o,children:r});case"muted":return(0,t.jsx)(m,{size:i,...o,children:r});default:return(0,t.jsx)(h,{size:i,success:n,...o,children:r})}},"E",0,({children:e,onClick:i,disabled:n,isSubmitting:o,...a})=>(0,t.jsxs)(y,{$isSubmitting:o,onClick:i,disabled:n,...a,children:[(0,t.jsx)("span",{children:e}),(0,t.jsx)("span",{children:(0,t.jsx)(r.B,{})})]}),"M",0,({backFn:e,infoFn:i,onClose:r,title:n,eyebrow:o,closeable:a=!0,className:l})=>{let{closePrivyModal:d}=(0,c.u)(),h=(0,s.a)();return(0,t.jsxs)(j,{className:l,children:[(0,t.jsxs)(S,{children:[e&&(0,t.jsx)(b,{backFn:e}),o&&(0,t.jsx)(D,{children:o}),!o&&n&&(0,t.jsx)(V,{id:"privy-dialog-title",children:n}),(0,t.jsx)("div",{style:{height:24}}),i&&(0,t.jsx)(x,{infoFn:i})]}),(0,t.jsx)(T,{children:!h.render.standalone&&a&&(0,t.jsx)(C,{onClose:r||(()=>d())})})]})},"P",0,h,"S",0,g,"b",0,({children:e,loading:i,disabled:n,...o})=>(0,t.jsx)(u,{disabled:n,...o,children:i?(0,t.jsx)(r.B,{color:"var(--privy-color-foreground-accent)"}):e}),"c",0,w,"d",0,m],995040)},594022,e=>{var t=e.i(732486),i=e.i(698870),r=e.i(352386),n=e.i(689391),o=e.i(933185),a=e.i(336291);let l=e=>(0,t.jsx)("svg",{viewBox:"0 0 50 50",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:(0,t.jsx)("rect",{width:"50",height:"50",fill:"black",rx:10,ry:10})}),s=(e,t,i,r,n)=>{for(let o=t;o<t+r;o++)for(let t=i;t<i+n;t++){let i=e?.[t];i&&i[o]&&(i[o]=0)}return e},c=({x:e,y:i,cellSize:r,bgColor:n,fgColor:o})=>(0,t.jsx)(t.Fragment,{children:[0,1,2].map(a=>(0,t.jsx)("circle",{r:r*(7-2*a)/2,cx:e+7*r/2,cy:i+7*r/2,fill:a%2!=0?n:o},`finder-${e}-${i}-${a}`))}),d=({cellSize:e,matrixSize:i,bgColor:r,fgColor:n})=>(0,t.jsx)(t.Fragment,{children:[[0,0],[(i-7)*e,0],[0,(i-7)*e]].map(([i,o])=>(0,t.jsx)(c,{x:i,y:o,cellSize:e,bgColor:r,fgColor:n},`finder-${i}-${o}`))}),h=({matrix:e,cellSize:i,color:n})=>(0,t.jsx)(t.Fragment,{children:e.map((e,o)=>e.map((e,a)=>e?(0,t.jsx)("rect",{height:i-.4,width:i-.4,x:o*i+.1*i,y:a*i+.1*i,rx:.5*i,ry:.5*i,fill:n},`cell-${o}-${a}`):(0,t.jsx)(r.default.Fragment,{},`circle-${o}-${a}`)))}),u=({cellSize:e,matrixSize:i,element:r,sizePercentage:n,bgColor:o})=>{if(!r)return(0,t.jsx)(t.Fragment,{});let a=i*(n||.14),l=Math.floor(i/2-a/2),s=Math.floor(i/2+a/2);(s-l)%2!=i%2&&(s+=1);let c=(s-l)*e,d=c-.2*c,h=l*e;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("rect",{x:l*e,y:l*e,width:c,height:c,fill:o}),(0,t.jsx)(r,{x:h+.1*c,y:h+.1*c,height:d,width:d})]})},p=e=>{var r,n;let o,l,c=e.outputSize,p=(r=e.url,n=e.errorCorrectionLevel,o=i.default.create(r,{errorCorrectionLevel:n}).modules,l=s(l=(0,a.l)(Array.from(o.data),o.size),0,0,7,7),l=s(l,l.length-7,0,7,7),s(l,0,l.length-7,7,7)),g=c/p.length,m=(0,a.m)(2*g,{min:.025*c,max:.036*c});return(0,t.jsxs)("svg",{height:e.outputSize,width:e.outputSize,viewBox:`0 0 ${e.outputSize} ${e.outputSize}`,style:{height:"100%",width:"100%",padding:`${m}px`},children:[(0,t.jsx)(h,{matrix:p,cellSize:g,color:e.fgColor}),(0,t.jsx)(d,{cellSize:g,matrixSize:p.length,fgColor:e.fgColor,bgColor:e.bgColor}),(0,t.jsx)(u,{cellSize:g,element:e.logo?.element,bgColor:e.bgColor,matrixSize:p.length})]})},g=n.z.div.attrs({className:"ph-no-capture"})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${e=>`${e.$size}px`};
  width: ${e=>`${e.$size}px`};
  margin: auto;
  background-color: ${e=>e.$bgColor};

  && {
    border-width: 2px;
    border-color: ${e=>e.$borderColor};
    border-radius: var(--privy-border-radius-md);
  }
`;e.s(["Q",0,e=>{let{appearance:i}=(0,o.a)(),r=e.bgColor||"#FFFFFF",n=e.fgColor||"#000000",a=e.size||160,s="dark"===i.palette.colorScheme?r:n;return(0,t.jsx)(g,{$size:a,$bgColor:r,$fgColor:n,$borderColor:s,children:(0,t.jsx)(p,{url:e.url,logo:e.hideLogo?void 0:{element:e.squareLogoElement??l},outputSize:a,bgColor:r,fgColor:n,errorCorrectionLevel:e.errorCorrectionLevel||"Q"})})}])},612269,e=>{var t=e.i(732486),i=e.i(352386),r=e.i(689391),n=e.i(541021),o=e.i(25047),a=e.i(995040),l=e.i(226439);let s=r.z.div`
  /* spacing tokens */
  --screen-space: 16px; /* base 1x = 16 */
  --screen-space-lg: calc(var(--screen-space) * 1.5); /* 24px */

  position: relative;
  overflow: hidden;
  margin: 0 calc(-1 * var(--screen-space)); /* extends over modal padding */
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,c=r.z.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) * 1.5);
  width: 100%;
  background: var(--privy-color-background);
  padding: 0 var(--screen-space-lg) var(--screen-space);
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,d=r.z.div`
  position: relative;
  display: flex;
  flex-direction: column;
`,h=(0,r.z)(a.M)`
  margin: 0 -8px;
`,u=r.z.div`
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
`,p=r.z.div`
  display: flex;
  flex-direction: column;
  gap: var(--screen-space-lg);
  margin-top: 1.5rem;
`,g=r.z.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--screen-space);
`,m=r.z.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,v=r.z.h3`
  && {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: var(--privy-color-foreground);
    margin: 0;
  }
`,f=r.z.p`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: var(--privy-color-foreground);
  }
`,w=r.z.div`
  background: ${({$variant:e})=>{switch(e){case"success":return"var(--privy-color-success-bg)";case"warning":return"var(--privy-color-warn)";case"error":return"var(--privy-color-error-bg)";case"loading":case"logo":return"transparent";default:return"var(--privy-color-background-2)"}}};

  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`,y=r.z.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    max-height: 90px;
    max-width: 180px;
  }
`,b=r.z.div`
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
`,x=({children:e,...i})=>(0,t.jsx)(s,{children:(0,t.jsx)(c,{...i,children:e})}),C=r.z.div`
  position: absolute;
  top: 0;
  left: calc(-1 * var(--screen-space-lg));
  width: calc(100% + calc(var(--screen-space-lg) * 2));
  height: 4px;
  background: var(--privy-color-background-2);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  overflow: hidden;
`,k=(0,r.z)(o.B)`
  padding: 0;
  && a {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,z=r.z.div`
  height: 100%;
  width: ${({pct:e})=>e}%;
  background: var(--privy-color-foreground-3);
  border-radius: 2px;
  transition: width 300ms ease-in-out;
`,j=({step:e})=>e?(0,t.jsx)(C,{children:(0,t.jsx)(z,{pct:Math.min(100,e.current/e.total*100)})}):null;x.Header=({title:e,subtitle:i,icon:r,iconVariant:n,iconLoadingStatus:o,showBack:a,onBack:l,showInfo:s,onInfo:c,showClose:u,onClose:p,step:w,headerTitle:y,eyebrow:b,...C})=>(0,t.jsxs)(d,{...C,children:[(0,t.jsx)(h,{backFn:a?l:void 0,infoFn:s?c:void 0,onClose:u?p:void 0,title:y,eyebrow:b,closeable:u}),(r||n||e||i)&&(0,t.jsxs)(g,{children:[r||n?(0,t.jsx)(x.Icon,{icon:r,variant:n,loadingStatus:o}):null,!(!e&&!i)&&(0,t.jsxs)(m,{children:[e&&(0,t.jsx)(v,{children:e}),i&&(0,t.jsx)(f,{children:i})]})]}),w&&(0,t.jsx)(j,{step:w})]}),(x.Body=i.default.forwardRef(({children:e,...i},r)=>(0,t.jsx)(u,{ref:r,...i,children:e}))).displayName="Screen.Body",x.Footer=({children:e,...i})=>(0,t.jsx)(p,{id:"privy-content-footer-container",...i,children:e}),x.Actions=({children:e,...i})=>(0,t.jsx)(S,{...i,children:e}),x.HelpText=({children:e,...i})=>(0,t.jsx)(T,{...i,children:e}),x.FooterText=({children:e,...i})=>(0,t.jsx)(V,{...i,children:e}),x.Watermark=()=>(0,t.jsx)(k,{}),x.Icon=({icon:e,variant:r="subtle",loadingStatus:o})=>"logo"===r&&e?(0,t.jsx)(y,"string"==typeof e?{children:(0,t.jsx)("img",{src:e,alt:""})}:i.default.isValidElement(e)?{children:e}:{children:i.default.createElement(e)}):"loading"===r?e?(0,t.jsx)(b,{children:(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,t.jsx)(n.C,{success:o?.success,fail:o?.fail}),"string"==typeof e?(0,t.jsx)("span",{style:{background:`url('${e}') 0 0 / contain`,height:"38px",width:"38px",borderRadius:"6px",margin:"auto",backgroundSize:"contain"}}):i.default.isValidElement(e)?i.default.cloneElement(e,{style:{width:"38px",height:"38px"}}):i.default.createElement(e,{style:{width:"38px",height:"38px"}})]})}):(0,t.jsx)(w,{$variant:r,children:(0,t.jsx)(l.N,{size:"64px"})}):(0,t.jsx)(w,{$variant:r,children:e&&("string"==typeof e?(0,t.jsx)("img",{src:e,alt:"",style:{width:"32px",height:"32px",borderRadius:"6px"}}):i.default.isValidElement(e)?e:i.default.createElement(e,{width:32,height:32,stroke:(()=>{switch(r){case"success":return"var(--privy-color-icon-success)";case"warning":return"var(--privy-color-icon-warning)";case"error":return"var(--privy-color-icon-error)";default:return"var(--privy-color-icon-muted)"}})(),strokeWidth:2}))});let S=r.z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) / 2);
`,T=r.z.div`
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
`,V=r.z.div`
  && {
    margin-top: -1rem;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 0.6875rem; /* 11px */
    line-height: 1rem; /* 16px */
  }
`;e.s(["S",0,x])},480705,e=>{var t=e.i(732486);e.s(["W",0,({...e})=>(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,t.jsx)("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),(0,t.jsx)("path",{d:"M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"}),(0,t.jsx)("path",{d:"M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21"})]})])},226439,e=>{var t=e.i(732486),i=e.i(689391);let r=i.z.div`
  --spinner-size: ${e=>e.$size?e.$size:"96px"};

  display: inline-flex;
  justify-content: center;
  align-items: center;

  @media all and (display-mode: standalone) {
    margin-bottom: 30px;
  }
`,n=i.z.div`
  position: relative;
  height: var(--spinner-size);
  width: var(--spinner-size);

  opacity: 1;
  animation: fadein 200ms ease;
`,o=i.z.div`
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
`,a=i.z.div`
  position: absolute;
  inset: 0;
  width: var(--spinner-size);
  height: var(--spinner-size);

  && {
    border: 4px solid var(--privy-color-border-default);
    border-radius: 50%;
  }
`,l=i.z.div`
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
`;e.s(["N",0,({size:e,centerIcon:i})=>(0,t.jsx)(r,{$size:e,children:(0,t.jsxs)(n,{children:[(0,t.jsx)(a,{}),(0,t.jsx)(l,{}),i?(0,t.jsx)(o,{children:i}):null]})})])},786847,e=>{var t=e.i(689391);t.z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,t.z.button`
  padding: 0.25rem;
  height: 30px;
  width: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--privy-border-radius-full);
  background: var(--privy-color-background-2);
`;let i=t.z.div`
  position: relative;
  display: inline-flex;
  align-items: center;

  &::after {
    content: ' ';
    border-radius: var(--privy-border-radius-full);
    height: 6px;
    width: 6px;
    background-color: var(--privy-color-icon-success);
    position: absolute;
    right: -3px;
    top: -3px;
  }
`,r=t.z.img`
  width: 32px;
  height: 32px;
  border-radius: 0.25rem;
  object-fit: contain;
`,n=t.z.span`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */
  border-radius: var(--privy-border-radius-sm);
  background-color: var(--privy-color-background-2);

  svg {
    width: 100%;
    max-width: 1rem;
    max-height: 1rem;
    stroke-width: 2;
  }
`,o=t.z.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 24rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-gutter: stable both-edges;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ${e=>"light"===e.$colorScheme?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;":"dark"===e.$colorScheme?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;":void 0}

  background-repeat: no-repeat;
  background-size:
    100% 32px,
    100% 16px;
  background-attachment: local, scroll;
`;e.s(["C",0,n,"S",0,o,"W",0,r,"b",0,i])},439614,e=>{var t=e.i(933185);let i={"connectionStatus.successfullyConnected":"Successfully connected with {walletName}","connectionStatus.errorTitle":"{errorMessage}","connectionStatus.connecting":"Connecting","connectionStatus.connectOneWallet":"For the best experience, connect only one wallet at a time.","connectionStatus.checkOtherWindows":"Don't see your wallet? Check your other browser windows.","connectionStatus.stillHere":"Still here?","connectionStatus.tryConnectingAgain":"Try connecting again","connectionStatus.or":"or","connectionStatus.useDifferentLink":"use this different link","coinbaseWallet.connectingSubtitle":"This connects Coinbase Wallet, not your Coinbase.com account.","coinbaseWallet.connectingSubtitleReset":"This connects Coinbase Wallet, not your Coinbase.com account. Not the right wallet? Reset your connection below.","coinbaseWallet.successSubtitle":"This Coinbase Wallet address is not your Coinbase.com deposit address.","connectWallet.connectYourWallet":"Connect a wallet","connectWallet.waitingForWallet":"Waiting for {walletName}","connectWallet.connectToAccount":"Connect a wallet to your {appName} account","connectWallet.installAndConnect":"To connect to {walletName}, install and open the app. Then confirm the connection when prompted.","connectWallet.tryConnectingAgain":"Please try connecting again.","connectWallet.openInApp":"Open in app","connectWallet.copyLink":"Copy link","connectWallet.retry":"Retry","connectWallet.searchPlaceholder":"Search through {count} wallets","connectWallet.noWalletsFound":"No wallets found. Try another search.","connectWallet.lastUsed":"Last used","connectWallet.selectYourWallet":"Select your wallet","connectWallet.selectNetwork":"Select network","connectWallet.goToWallet":"Go to {walletName} to continue","connectWallet.scanToConnect":"Scan code to connect to {walletName}","connectWallet.openOrInstall":"Open or install {walletName}","cardTransactionList.scrollRegionLabel":"Card transactions","cardTransactionList.noTransactionsFound":"No transactions found","cardTransactionList.tryAgain":"Try again","cardTransactionList.badgeCredit":"Credit","cardTransactionList.badgePending":"Pending","cardTransactionList.badgeDeclined":"Declined","cardTransactionList.badgeExpired":"Expired","cardTransactionList.badgeReversed":"Reversed","cardDetailsView.cardholderLabel":"Cardholder","cardDetailsView.validThruLabel":"Valid thru","cardDetailsView.showDetails":"Details","cardDetailsView.hideDetails":"Hide details","cardDetailsView.pin":"PIN","cardDetailsView.replace":"Replace","cardDetailsView.cancel":"Cancel","cardDetailsView.freezeTitle":"Freeze Card","cardDetailsView.freezeSubtitle":"Temporarily disable your card","cardDetailsView.addToWalletTitle":"Add to wallet","cardDetailsView.addToWalletSubtitle":"Add your card to {walletName}","cardDetailsView.freezeConfirmTitle":"Freeze this card?","cardDetailsView.freezeConfirmDescription":"This will instantly freeze the current card.","cardDetailsView.freezeConfirmCta":"Freeze card","cardDetailsView.unfreezeConfirmTitle":"Unfreeze this card?","cardDetailsView.unfreezeConfirmDescription":"This will instantly unfreeze the current card.","cardDetailsView.unfreezeConfirmCta":"Unfreeze card","cardDetailsView.cancelConfirmTitle":"Cancel this card?","cardDetailsView.cancelConfirmDescription":"This will instantly cancel the current card.","cardDetailsView.cancelConfirmCta":"Cancel card","cardDetailsView.replaceReasonTitle":"Why are you replacing your card?","cardDetailsView.replaceReasonCta":"Continue","cardDetailsView.replaceReasonLost":"Lost","cardDetailsView.replaceReasonStolen":"Stolen","cardDetailsView.replaceReasonExpired":"Expired","cardDetailsView.replaceWarnTitle":"Replace this card?","cardDetailsView.replaceWarnDescription":"This will instantly close the current card and issue a new one.","cardDetailsView.replaceWarnCta":"Replace","cardDetailsView.dialogDismiss":"Never mind","cardDetailsView.dialogBack":"Back","cardPinDialog.title":"PIN number","cardPinDialog.description":"Your PIN is used for in-person transactions and ATM withdrawals.","cardPinDialog.changePin":"Change PIN","cardPinDialog.close":"Close","cardPinDialog.cancel":"Cancel","cardPinDialog.save":"Save and close","cardPinDialog.placeholder":"••••","cardPinDialog.emptyError":"Add a new PIN or cancel to continue.","cardPinDialog.saveError":"Could not update this PIN. Please try again.","cardPinDialog.loadError":"Could not load this PIN. Please try again.","cardPinDialog.pinLabel":"PIN","cardDetailsReveal.cardNumberLabel":"Card number","cardDetailsReveal.expirationLabel":"Expiration","cardDetailsReveal.cvcLabel":"CVC","cardDetailsReveal.copyValue":"Copy {label}","cardDetailsReveal.error":"Card details could not be loaded. Please try again.","transactionDetailsView.summarySubheader":"Card payment to {merchantName}","transactionDetailsView.summarySubheaderFallback":"Card payment","transactionDetailsView.detailsHeader":"Details","transactionDetailsView.disputeCta":"Dispute transaction","transactionDetailsView.cardEndingIn":"Card ending in {last4}","transactionDetailsView.amountLabel":"Amount","transactionDetailsView.atmFeeLabel":"ATM Fee","transactionDetailsView.cashbackLabel":"Cashback","transactionDetailsView.statusLabel":"Status","transactionDetailsView.disputeLabel":"Dispute","transactionDetailsView.merchantLabel":"Merchant","transactionDetailsView.currencyLabel":"Currency","transactionDetailsView.fromLabel":"From","transactionDetailsView.dateLabel":"Date created","transactionDetailsView.statusPending":"Pending","transactionDetailsView.statusPosted":"Posted","transactionDetailsView.statusDeclined":"Declined","transactionDetailsView.statusExpired":"Expired","transactionDetailsView.statusReversed":"Reversed","transactionDetailsView.disputeNone":"None","transactionDetailsView.disputeExpired":"Dispute expired","transactionDetailsView.disputeLost":"Dispute lost","transactionDetailsView.disputeSubmitted":"Dispute submitted","transactionDetailsView.disputeUnsubmitted":"Dispute unsubmitted","transactionDetailsView.disputeWon":"Dispute won","transactionDetailsView.disputeDialogTitle":"Dispute this transaction","transactionDetailsView.disputeDialogBody":"To dispute this transaction, call the number below and our support team will help you.","transactionDetailsView.disputeDoneCta":"Done","cardSummaryView.walletHeading":"Wallet","cardSummaryView.cardHeading":"Your Card","cardSummaryView.transactionsHeading":"Transactions","cardSummaryView.unknownMerchant":"Unknown merchant","cardSummaryView.balanceUnavailable":"—","cardSummaryView.currentBalance":"Spending balance","cardSummaryView.cardTitle":"{brand} debit card","cardSummaryView.cardTitleFallback":"Debit card","cardSummaryView.cardLoadError":"Could not load this card.","cardSummaryView.transactionsLoadError":"Could not load transactions.","cardSummaryView.freezeError":"Could not update this card. Please try again.","cardSummaryView.cancelError":"Could not cancel this card. Please try again.","cardSummaryView.replaceError":"Could not replace this card. Please try again.","cardSummaryView.walletProvisioningError":"Could not load wallet options.","cardSummaryView.walletProvisioningSuccess":"Card added to wallet","cardSummaryView.cardCanceledBanner":"This card has been cancelled","cardSummaryView.cardFrozenBanner":"This card is frozen","cardSummaryView.sandboxBanner":"In sandbox mode using test funds","cardSummaryView.back":"Back","cardSummaryView.close":"Close","cardStatementDownload.buttonLabel":"Download statement","cardStatementDownload.tooltip":"Download a monthly PDF statement","cardStatementDownload.confirmTitle":"Download statement","cardStatementDownload.confirmDescription":"Are you sure you want to download your statement from {period}?","cardStatementDownload.confirmCta":"Download","cardStatementDownload.cancelCta":"Cancel","cardStatementDownload.error":"Could not download your statement. Please try again.","cardStatementDownload.notAvailable":"No statement is available for that period.","cardStatementDownload.empty":"Statements are available once the month ends.","signUpForCardView.sandboxBanner":"In sandbox mode using test funds","signUpForCardView.title":"Create {appName} card","signUpForCardView.titleFallback":"Create card","signUpForCardView.subtitle":"Complete a few quick steps to set up your {appName} card.","signUpForCardView.subtitleFallback":"Complete a few quick steps to set up your card.","signUpForCardView.checklistAgreements":"Review required agreements","signUpForCardView.checklistInformation":"Provide your information","signUpForCardView.checklistIdentity":"Verify your identity","signUpForCardView.getStartedCta":"Get started","signUpForCardView.workingCta":"Please wait…","signUpForCardView.termsPromptTitle":"Review card agreements","signUpForCardView.disclosurePromptTitle":"Accept electronic disclosures","signUpForCardView.disclosurePromptSubtitle":"Review and accept the {disclosureStatement} to receive and sign card documents electronically.","signUpForCardView.disclosureStatementLabel":"Electronic Disclosure Statement","signUpForCardView.acceptingDisclosureTitle":"Accepting disclosures","signUpForCardView.acceptingDisclosureSubtitle":"This will only take a moment.","signUpForCardView.bankTermsPromptProviders":"{appName} uses a wallet provided by Privy. {bank} issues the card, and Bridge manages the card program.","signUpForCardView.bankTermsPromptProvidersFallback":"This app uses a wallet provided by Privy. {bank} issues the card, and Bridge manages the card program.","signUpForCardView.bankTermsPromptAgreements":"By clicking Accept and continue, you agree to the {agreements}.","signUpForCardView.bankTermsAnd":"and","signUpForCardView.acceptingBankTermsTitle":"Accepting agreements","signUpForCardView.acceptingBankTermsSubtitle":"This will only take a moment.","signUpForCardView.providerTermsPromptTitle":"Review card program terms","signUpForCardView.providerTermsPromptSubtitle":"Open the card program terms to review and accept them.","signUpForCardView.acceptingProviderTermsTitle":"Review card program terms","signUpForCardView.acceptingProviderTermsSubtitle":"Finish reviewing the card program terms in the pop-up window to continue.","signUpForCardView.acceptAndContinueCta":"Accept and continue","signUpForCardView.kycPromptTitle":"Verify your identity","signUpForCardView.kycPromptSubtitle":"Open the verification flow to confirm your identity.","signUpForCardView.verifyIdentityCta":"Verify identity","signUpForCardView.verifyingIdentityTitle":"Verify your identity","signUpForCardView.verifyingIdentitySubtitle":"Finish verifying your identity in the pop-up window to continue.","signUpForCardView.pendingTitle":"Finishing up","signUpForCardView.pendingSubtitle":"We're getting your account ready. This can take a moment.","signUpForCardView.underReviewTitle":"Identity under review","signUpForCardView.underReviewSubtitle":"Your identity information is being reviewed. You can close this sign up and check back later to finish.","signUpForCardView.creatingCardTitle":"Creating your card","signUpForCardView.creatingCardSubtitle":"Hang tight while we finish creating your card.","signUpForCardView.approvePromptTitle":"Approve card spending","signUpForCardView.approvePromptSubtitle":"Sign a one-time approval to let your card spend from your selected {symbol} balance.","signUpForCardView.approvePromptWhat":"What this does:","signUpForCardView.approvePromptItemConnect":"Connects your card to your {symbol} balance","signUpForCardView.approvePromptItemPurchases":"Lets your card make purchases","signUpForCardView.approvePromptItemLimits":"Spending limits are managed separately","signUpForCardView.approveAndContinueCta":"Approve and continue","signUpForCardView.approveErrorTitle":"Spend approval failed","signUpForCardView.approveErrorSubtitle":"We couldn't approve card spending. Click below to try again.","signUpForCardView.readyTitle":"Your card is ready","signUpForCardView.readySubtitle":"Your card has been created and is ready to use.","signUpForCardView.continueCta":"Continue","signUpForCardView.doneCta":"Done","signUpForCardView.rejectedTitle":"We couldn't verify your identity","signUpForCardView.rejectedSubtitle":"Your card application could not be approved.","signUpForCardView.errorTitle":"Something went wrong","signUpForCardView.errorSubtitle":"We couldn't set up your card. Please try again.","signUpForCardView.tryAgainCta":"Try again"};e.s(["u",0,function(){let e=(0,t.a)();return{t:(t,r)=>{var n;let o;return n=e.intl.textLocalization,o=n?.[t]??i[t],r&&0!==Object.keys(r).length?o.replace(/\{(\w+)\}/g,(e,t)=>r[t]??e):o}}}])},659226,e=>{var t=e.i(352386),i=e.i(231332);function r(e,t,i){let r,n=i.initialDeps??[],o=!0;function a(){var a,l,s;let c,d;i.key&&(null==(a=i.debug)?void 0:a.call(i))&&(c=Date.now());let h=e();if(!(h.length!==n.length||h.some((e,t)=>n[t]!==e)))return r;if(n=h,i.key&&(null==(l=i.debug)?void 0:l.call(i))&&(d=Date.now()),r=t(...h),i.key&&(null==(s=i.debug)?void 0:s.call(i))){let e=Math.round((Date.now()-c)*100)/100,t=Math.round((Date.now()-d)*100)/100,r=t/16,n=(e,t)=>{for(e=String(e);e.length<t;)e=" "+e;return e};console.info(`%c⏱ ${n(t,5)} /${n(e,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*r,120))}deg 100% 31%);`,null==i?void 0:i.key)}return(null==i?void 0:i.onChange)&&!(o&&i.skipInitialOnChange)&&i.onChange(r),o=!1,r}return a.updateDeps=e=>{n=e},a}function n(e,t){if(void 0!==e)return e;throw Error(`Unexpected undefined${t?`: ${t}`:""}`)}let o=e=>{let{offsetWidth:t,offsetHeight:i}=e;return{width:t,height:i}},a=e=>e,l=e=>{let t=Math.max(e.startIndex-e.overscan,0),i=Math.min(e.endIndex+e.overscan,e.count-1),r=[];for(let e=t;e<=i;e++)r.push(e);return r},s=(e,t)=>{let i=e.scrollElement;if(!i)return;let r=e.targetWindow;if(!r)return;let n=e=>{let{width:i,height:r}=e;t({width:Math.round(i),height:Math.round(r)})};if(n(o(i)),!r.ResizeObserver)return()=>{};let a=new r.ResizeObserver(t=>{let r=()=>{let e=t[0];if(null==e?void 0:e.borderBoxSize){let t=e.borderBoxSize[0];if(t)return void n({width:t.inlineSize,height:t.blockSize})}n(o(i))};e.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(r):r()});return a.observe(i,{box:"border-box"}),()=>{a.unobserve(i)}},c={passive:!0},d="u"<typeof window||"onscrollend"in window,h=(e,t)=>{var i,r;let n,o=e.scrollElement;if(!o)return;let a=e.targetWindow;if(!a)return;let l=0,s=e.options.useScrollendEvent&&d?()=>void 0:(i=()=>{t(l,!1)},r=e.options.isScrollingResetDelay,function(...e){a.clearTimeout(n),n=a.setTimeout(()=>i.apply(this,e),r)}),h=i=>()=>{let{horizontal:r,isRtl:n}=e.options;l=r?o.scrollLeft*(n&&-1||1):o.scrollTop,s(),t(l,i)},u=h(!0),p=h(!1);p(),o.addEventListener("scroll",u,c);let g=e.options.useScrollendEvent&&d;return g&&o.addEventListener("scrollend",p,c),()=>{o.removeEventListener("scroll",u),g&&o.removeEventListener("scrollend",p)}},u=(e,t,i)=>{if(null==t?void 0:t.borderBoxSize){let e=t.borderBoxSize[0];if(e)return Math.round(e[i.options.horizontal?"inlineSize":"blockSize"])}return e[i.options.horizontal?"offsetWidth":"offsetHeight"]},p=(e,{adjustments:t=0,behavior:i},r)=>{var n,o;null==(o=null==(n=r.scrollElement)?void 0:n.scrollTo)||o.call(n,{[r.options.horizontal?"left":"top"]:e+t,behavior:i})};class g{constructor(e){let t,i;this.unsubs=[],this.scrollElement=null,this.targetWindow=null,this.isScrolling=!1,this.measurementsCache=[],this.itemSizeCache=new Map,this.laneAssignments=new Map,this.pendingMeasuredCacheIndexes=[],this.prevLanes=void 0,this.lanesChangedFlag=!1,this.lanesSettling=!1,this.scrollRect=null,this.scrollOffset=null,this.scrollDirection=null,this.scrollAdjustments=0,this.elementsCache=new Map,this.observer=(t=null,i=()=>t||(this.targetWindow&&this.targetWindow.ResizeObserver?t=new this.targetWindow.ResizeObserver(e=>{e.forEach(e=>{let t=()=>{this._measureElement(e.target,e)};this.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(t):t()})}):null),{disconnect:()=>{var e;null==(e=i())||e.disconnect(),t=null},observe:e=>{var t;return null==(t=i())?void 0:t.observe(e,{box:"border-box"})},unobserve:e=>{var t;return null==(t=i())?void 0:t.unobserve(e)}}),this.range=null,this.setOptions=e=>{Object.entries(e).forEach(([t,i])=>{void 0===i&&delete e[t]}),this.options={debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:a,rangeExtractor:l,onChange:()=>{},measureElement:u,initialRect:{width:0,height:0},scrollMargin:0,gap:0,indexAttribute:"data-index",initialMeasurementsCache:[],lanes:1,isScrollingResetDelay:150,enabled:!0,isRtl:!1,useScrollendEvent:!1,useAnimationFrameWithResizeObserver:!1,...e}},this.notify=e=>{var t,i;null==(i=(t=this.options).onChange)||i.call(t,this,e)},this.maybeNotify=r(()=>(this.calculateRange(),[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]),e=>{this.notify(e)},{key:!1,debug:()=>this.options.debug,initialDeps:[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]}),this.cleanup=()=>{this.unsubs.filter(Boolean).forEach(e=>e()),this.unsubs=[],this.observer.disconnect(),this.scrollElement=null,this.targetWindow=null},this._didMount=()=>()=>{this.cleanup()},this._willUpdate=()=>{var e;let t=this.options.enabled?this.options.getScrollElement():null;if(this.scrollElement!==t){if(this.cleanup(),!t)return void this.maybeNotify();this.scrollElement=t,this.scrollElement&&"ownerDocument"in this.scrollElement?this.targetWindow=this.scrollElement.ownerDocument.defaultView:this.targetWindow=(null==(e=this.scrollElement)?void 0:e.window)??null,this.elementsCache.forEach(e=>{this.observer.observe(e)}),this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0}),this.unsubs.push(this.options.observeElementRect(this,e=>{this.scrollRect=e,this.maybeNotify()})),this.unsubs.push(this.options.observeElementOffset(this,(e,t)=>{this.scrollAdjustments=0,this.scrollDirection=t?this.getScrollOffset()<e?"forward":"backward":null,this.scrollOffset=e,this.isScrolling=t,this.maybeNotify()}))}},this.getSize=()=>this.options.enabled?(this.scrollRect=this.scrollRect??this.options.initialRect,this.scrollRect[this.options.horizontal?"width":"height"]):(this.scrollRect=null,0),this.getScrollOffset=()=>this.options.enabled?(this.scrollOffset=this.scrollOffset??("function"==typeof this.options.initialOffset?this.options.initialOffset():this.options.initialOffset),this.scrollOffset):(this.scrollOffset=null,0),this.getFurthestMeasurement=(e,t)=>{let i=new Map,r=new Map;for(let n=t-1;n>=0;n--){let t=e[n];if(i.has(t.lane))continue;let o=r.get(t.lane);if(null==o||t.end>o.end?r.set(t.lane,t):t.end<o.end&&i.set(t.lane,!0),i.size===this.options.lanes)break}return r.size===this.options.lanes?Array.from(r.values()).sort((e,t)=>e.end===t.end?e.index-t.index:e.end-t.end)[0]:void 0},this.getMeasurementOptions=r(()=>[this.options.count,this.options.paddingStart,this.options.scrollMargin,this.options.getItemKey,this.options.enabled,this.options.lanes],(e,t,i,r,n,o)=>(void 0!==this.prevLanes&&this.prevLanes!==o&&(this.lanesChangedFlag=!0),this.prevLanes=o,this.pendingMeasuredCacheIndexes=[],{count:e,paddingStart:t,scrollMargin:i,getItemKey:r,enabled:n,lanes:o}),{key:!1,skipInitialOnChange:!0,onChange:()=>{this.notify(this.isScrolling)}}),this.getMeasurements=r(()=>[this.getMeasurementOptions(),this.itemSizeCache],({count:e,paddingStart:t,scrollMargin:i,getItemKey:r,enabled:n,lanes:o},a)=>{if(!n)return this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),[];if(this.laneAssignments.size>e)for(let t of this.laneAssignments.keys())t>=e&&this.laneAssignments.delete(t);this.lanesChangedFlag&&(this.lanesChangedFlag=!1,this.lanesSettling=!0,this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),this.pendingMeasuredCacheIndexes=[]),0===this.measurementsCache.length&&(this.measurementsCache=this.options.initialMeasurementsCache,this.measurementsCache.forEach(e=>{this.itemSizeCache.set(e.key,e.size)}));let l=this.lanesSettling?0:this.pendingMeasuredCacheIndexes.length>0?Math.min(...this.pendingMeasuredCacheIndexes):0;this.pendingMeasuredCacheIndexes=[],this.lanesSettling&&this.measurementsCache.length===e&&(this.lanesSettling=!1);let s=this.measurementsCache.slice(0,l),c=Array(o).fill(void 0);for(let e=0;e<l;e++){let t=s[e];t&&(c[t.lane]=e)}for(let n=l;n<e;n++){let e,o,l=r(n),d=this.laneAssignments.get(n);if(void 0!==d&&this.options.lanes>1){let r=c[e=d],n=void 0!==r?s[r]:void 0;o=n?n.end+this.options.gap:t+i}else{let r=1===this.options.lanes?s[n-1]:this.getFurthestMeasurement(s,n);o=r?r.end+this.options.gap:t+i,e=r?r.lane:n%this.options.lanes,this.options.lanes>1&&this.laneAssignments.set(n,e)}let h=a.get(l),u="number"==typeof h?h:this.options.estimateSize(n),p=o+u;s[n]={index:n,start:o,size:u,end:p,key:l,lane:e},c[e]=n}return this.measurementsCache=s,s},{key:!1,debug:()=>this.options.debug}),this.calculateRange=r(()=>[this.getMeasurements(),this.getSize(),this.getScrollOffset(),this.options.lanes],(e,t,i,r)=>this.range=e.length>0&&t>0?function({measurements:e,outerSize:t,scrollOffset:i,lanes:r}){let n=e.length-1;if(e.length<=r)return{startIndex:0,endIndex:n};let o=m(0,n,t=>e[t].start,i),a=o;if(1===r)for(;a<n&&e[a].end<i+t;)a++;else if(r>1){let l=Array(r).fill(0);for(;a<n&&l.some(e=>e<i+t);){let t=e[a];l[t.lane]=t.end,a++}let s=Array(r).fill(i+t);for(;o>=0&&s.some(e=>e>=i);){let t=e[o];s[t.lane]=t.start,o--}o=Math.max(0,o-o%r),a=Math.min(n,a+(r-1-a%r))}return{startIndex:o,endIndex:a}}({measurements:e,outerSize:t,scrollOffset:i,lanes:r}):null,{key:!1,debug:()=>this.options.debug}),this.getVirtualIndexes=r(()=>{let e=null,t=null,i=this.calculateRange();return i&&(e=i.startIndex,t=i.endIndex),this.maybeNotify.updateDeps([this.isScrolling,e,t]),[this.options.rangeExtractor,this.options.overscan,this.options.count,e,t]},(e,t,i,r,n)=>null===r||null===n?[]:e({startIndex:r,endIndex:n,overscan:t,count:i}),{key:!1,debug:()=>this.options.debug}),this.indexFromElement=e=>{let t=this.options.indexAttribute,i=e.getAttribute(t);return i?parseInt(i,10):(console.warn(`Missing attribute name '${t}={index}' on measured element.`),-1)},this._measureElement=(e,t)=>{let i=this.indexFromElement(e),r=this.measurementsCache[i];if(!r)return;let n=r.key,o=this.elementsCache.get(n);o!==e&&(o&&this.observer.unobserve(o),this.observer.observe(e),this.elementsCache.set(n,e)),e.isConnected&&this.resizeItem(i,this.options.measureElement(e,t,this))},this.resizeItem=(e,t)=>{let i=this.measurementsCache[e];if(!i)return;let r=t-(this.itemSizeCache.get(i.key)??i.size);0!==r&&((void 0!==this.shouldAdjustScrollPositionOnItemSizeChange?this.shouldAdjustScrollPositionOnItemSizeChange(i,r,this):i.start<this.getScrollOffset()+this.scrollAdjustments)&&this._scrollToOffset(this.getScrollOffset(),{adjustments:this.scrollAdjustments+=r,behavior:void 0}),this.pendingMeasuredCacheIndexes.push(i.index),this.itemSizeCache=new Map(this.itemSizeCache.set(i.key,t)),this.notify(!1))},this.measureElement=e=>{e?this._measureElement(e,void 0):this.elementsCache.forEach((e,t)=>{e.isConnected||(this.observer.unobserve(e),this.elementsCache.delete(t))})},this.getVirtualItems=r(()=>[this.getVirtualIndexes(),this.getMeasurements()],(e,t)=>{let i=[];for(let r=0,n=e.length;r<n;r++){let n=t[e[r]];i.push(n)}return i},{key:!1,debug:()=>this.options.debug}),this.getVirtualItemForOffset=e=>{let t=this.getMeasurements();if(0!==t.length)return n(t[m(0,t.length-1,e=>n(t[e]).start,e)])},this.getOffsetForAlignment=(e,t,i=0)=>{let r=this.getSize(),n=this.getScrollOffset();return"auto"===t&&(t=e>=n+r?"end":"start"),"center"===t?e+=(i-r)/2:"end"===t&&(e-=r),Math.max(Math.min(this.getTotalSize()+this.options.scrollMargin-r,e),0)},this.getOffsetForIndex=(e,t="auto")=>{e=Math.max(0,Math.min(e,this.options.count-1));let i=this.measurementsCache[e];if(!i)return;let r=this.getSize(),n=this.getScrollOffset();if("auto"===t)if(i.end>=n+r-this.options.scrollPaddingEnd)t="end";else{if(!(i.start<=n+this.options.scrollPaddingStart))return[n,t];t="start"}let o="end"===t?i.end+this.options.scrollPaddingEnd:i.start-this.options.scrollPaddingStart;return[this.getOffsetForAlignment(o,t,i.size),t]},this.isDynamicMode=()=>this.elementsCache.size>0,this.scrollToOffset=(e,{align:t="start",behavior:i}={})=>{"smooth"===i&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),this._scrollToOffset(this.getOffsetForAlignment(e,t),{adjustments:void 0,behavior:i})},this.scrollToIndex=(e,{align:t="auto",behavior:i}={})=>{"smooth"===i&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),e=Math.max(0,Math.min(e,this.options.count-1));let r=0,n=t=>{if(!this.targetWindow)return;let r=this.getOffsetForIndex(e,t);if(!r)return void console.warn("Failed to get offset for index:",e);let[n,a]=r;this._scrollToOffset(n,{adjustments:void 0,behavior:i}),this.targetWindow.requestAnimationFrame(()=>{let t=this.getScrollOffset(),i=this.getOffsetForIndex(e,a);i?1.01>Math.abs(i[0]-t)||o(a):console.warn("Failed to get offset for index:",e)})},o=t=>{this.targetWindow&&(++r<10?this.targetWindow.requestAnimationFrame(()=>n(t)):console.warn(`Failed to scroll to index ${e} after 10 attempts.`))};n(t)},this.scrollBy=(e,{behavior:t}={})=>{"smooth"===t&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),this._scrollToOffset(this.getScrollOffset()+e,{adjustments:void 0,behavior:t})},this.getTotalSize=()=>{var e;let t,i=this.getMeasurements();if(0===i.length)t=this.options.paddingStart;else if(1===this.options.lanes)t=(null==(e=i[i.length-1])?void 0:e.end)??0;else{let e=Array(this.options.lanes).fill(null),r=i.length-1;for(;r>=0&&e.some(e=>null===e);){let t=i[r];null===e[t.lane]&&(e[t.lane]=t.end),r--}t=Math.max(...e.filter(e=>null!==e))}return Math.max(t-this.options.scrollMargin+this.options.paddingEnd,0)},this._scrollToOffset=(e,{adjustments:t,behavior:i})=>{this.options.scrollToFn(e,{behavior:i,adjustments:t},this)},this.measure=()=>{this.itemSizeCache=new Map,this.laneAssignments=new Map,this.notify(!1)},this.setOptions(e)}}let m=(e,t,i,r)=>{for(;e<=t;){let n=(e+t)/2|0,o=i(n);if(o<r)e=n+1;else{if(!(o>r))return n;t=n-1}}return e>0?e-1:0},v="u">typeof document?t.useLayoutEffect:t.useEffect;e.s(["f",0,function(e){return function(e){let r=t.useReducer(()=>({}),{})[1],n={...e,onChange:(t,n)=>{var o;n?(0,i.flushSync)(r):r(),null==(o=e.onChange)||o.call(e,t,n)}},[o]=t.useState(()=>new g(n));return o.setOptions(n),v(()=>o._didMount(),[]),v(()=>o._willUpdate()),o}({observeElementRect:s,observeElementOffset:h,scrollToFn:p,...e})}],659226)},745759,(e,t,i)=>{var r={single_source_shortest_paths:function(e,t,i){var n,o,a,l,s,c,d,h={},u={};u[t]=0;var p=r.PriorityQueue.make();for(p.push(t,0);!p.empty();)for(a in o=(n=p.pop()).value,l=n.cost,s=e[o]||{})s.hasOwnProperty(a)&&(c=l+s[a],d=u[a],(void 0===u[a]||d>c)&&(u[a]=c,p.push(a,c),h[a]=o));if(void 0!==i&&void 0===u[i])throw Error(["Could not find a path from ",t," to ",i,"."].join(""));return h},extract_shortest_path_from_predecessor_list:function(e,t){for(var i=[],r=t;r;)i.push(r),e[r],r=e[r];return i.reverse(),i},find_path:function(e,t,i){var n=r.single_source_shortest_paths(e,t,i);return r.extract_shortest_path_from_predecessor_list(n,i)},PriorityQueue:{make:function(e){var t,i=r.PriorityQueue,n={};for(t in e=e||{},i)i.hasOwnProperty(t)&&(n[t]=i[t]);return n.queue=[],n.sorter=e.sorter||i.default_sorter,n},default_sorter:function(e,t){return e.cost-t.cost},push:function(e,t){this.queue.push({value:e,cost:t}),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=r},78048,e=>{var t=e.i(352386);let i=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},r=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim();var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let o=(0,t.forwardRef)(({color:e="currentColor",size:i=24,strokeWidth:o=2,absoluteStrokeWidth:a,className:l="",children:s,iconNode:c,...d},h)=>(0,t.createElement)("svg",{ref:h,...n,width:i,height:i,stroke:e,strokeWidth:a?24*Number(o)/Number(i):o,className:r("lucide",l),...!s&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(d)&&{"aria-hidden":"true"},...d},[...c.map(([e,i])=>(0,t.createElement)(e,i)),...Array.isArray(s)?s:[s]]));e.s(["f",0,(e,n)=>{let a=(0,t.forwardRef)(({className:a,...l},s)=>(0,t.createElement)(o,{ref:s,iconNode:n,className:r(`lucide-${i(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,a),...l}));return a.displayName=i(e),a}],78048)},653327,e=>{let t=(0,e.i(78048).f)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["f",0,t],653327)},574695,e=>{let t=(0,e.i(78048).f)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["f",0,t],574695)}])})();