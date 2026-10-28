(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,105928,171762,e=>{var r=e.i(732486),n=e.i(689391);n.z.label`
  && {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    text-align: left;
    border-radius: 0.5rem;
    border: 1px solid var(--privy-color-foreground-4);
    width: 100%;
  }
`;let i=n.z.div`
  display: inline-block;
  vertical-align: middle;
`,t=n.z.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`,s=n.z.input.attrs({type:"checkbox"})`
  border: 0;
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`,a=n.z.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  transition: all 150ms;
  cursor: pointer;
  border-color: ${e=>e.color};
  border-radius: 3px;
  background: ${e=>e.checked?e.color:"var(--privy-color-background)"};

  && {
    /* This is necessary to override css reset for border width */
    border-width: 1px;
  }

  ${s}:focus + & {
    box-shadow: 0 0 0 1px ${e=>e.color};
  }

  ${t} {
    visibility: ${e=>e.checked?"visible":"hidden"};
  }
`;e.s(["C",0,({className:e,checked:n,color:o="var(--privy-color-accent)",...l})=>(0,r.jsx)("label",{children:(0,r.jsxs)(i,{className:e,children:[(0,r.jsx)(s,{checked:n,...l}),(0,r.jsx)(a,{color:o,checked:n,children:(0,r.jsx)(t,{viewBox:"0 0 24 24",children:(0,r.jsx)("polyline",{points:"20 6 9 17 4 12"})})})]})})],105928);var o=e.i(352386);let l=o.forwardRef(function({title:e,titleId:r,...n},i){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":r},n),e?o.createElement("title",{id:r},e):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"}))});e.s(["f",0,l],171762)},91488,e=>{var r=e.i(732486),n=e.i(332835);let i=(0,e.i(78048).f)("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]);var t=e.i(465120),s=e.i(689391),a=e.i(933185),o=e.i(616800),l=e.i(565530),c=e.i(636447),d=e.i(385937),h=e.i(839094),x=e.i(335341);e.i(352386),e.i(252494),e.i(785373),e.i(768820),e.i(535391);let u=({error:e,allowlistConfig:s,onRetry:a,onCaptchaReset:c,onBack:u})=>{let p=((e,s)=>{if(e instanceof d.R)return{title:"Transaction failed",detail:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{children:e.message}),(0,r.jsxs)("span",{children:[" ","Check the"," ",(0,r.jsx)(m,{href:e.relayLink,target:"_blank",children:"refund status"}),"."]})]}),ctaText:"Try again",icon:n.f};if(e instanceof l.P)switch(e.privyErrorCode){case l.a.CLIENT_REQUEST_TIMEOUT:return{title:"Timed out",detail:e.message,ctaText:"Try again",icon:n.f};case l.a.INSUFFICIENT_BALANCE:return{title:"Insufficient balance",detail:e.message,ctaText:"Try again",icon:n.f};case l.a.TRANSACTION_FAILURE:return{title:"Transaction failure",detail:e.message,ctaText:"Try again",icon:n.f};default:return{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:n.f}}if(e instanceof o.P&&"twilio_verification_failed"===e.type)return{title:"Something went wrong",detail:e.message,ctaText:"Try again",icon:i};if(!(e instanceof l.b))return e instanceof l.c&&e.status&&[400,422].includes(e.status)?{title:"Something went wrong",detail:e.message,ctaText:"Try again",icon:n.f}:{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:n.f};switch(e.privyErrorCode){case l.a.INVALID_CAPTCHA:return{title:"Something went wrong",detail:"Please try again.",ctaText:"Try again",icon:n.f};case l.a.DISALLOWED_LOGIN_METHOD:return{title:"Not allowed",detail:e.message,ctaText:"Try another method",icon:n.f};case l.a.ALLOWLIST_REJECTED:return{title:s.errorTitle||"You don't have access to this app",detail:s.errorDetail||"Have you been invited?",ctaText:s.errorCtaText||"Try another account",icon:t.f};case l.a.CAPTCHA_FAILURE:return{title:"Something went wrong",detail:"You did not pass CAPTCHA. Please try again.",ctaText:"Try again",icon:null};case l.a.CAPTCHA_TIMEOUT:return{title:"Something went wrong",detail:"Something went wrong! Please try again later.",ctaText:"Try again",icon:null};case l.a.LINKED_TO_ANOTHER_USER:return{title:"Authentication failed",detail:"This account has already been linked to another user.",ctaText:"Try again",icon:n.f};case l.a.NOT_SUPPORTED:return{title:"This region is not supported",detail:"SMS authentication from this region is not available",ctaText:"Try another method",icon:n.f};case l.a.TOO_MANY_REQUESTS:return{title:"Request failed",detail:"Too many attempts.",ctaText:"Try again later",icon:n.f};default:return{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:n.f}}})(e,s);return(0,r.jsx)(x.S,{title:p.title,subtitle:p.detail,icon:p.icon,onBack:u,iconVariant:"error",primaryCta:{label:p.ctaText,onClick:()=>{if(e instanceof l.b&&(e.privyErrorCode===l.a.INVALID_CAPTCHA&&c?.(),e.privyErrorCode===l.a.ALLOWLIST_REJECTED)){let e=(0,h.t)(s.errorCtaLink);if(e)return void window.open(e,"_blank","noopener,noreferrer")}a?.()},variant:"error"},watermark:!0})},p={component:()=>{let{navigate:e,data:n,lastScreen:i,currentScreen:t}=(0,c.u)(),s=(0,a.a)(),{reset:l}=(0,o.a)(),d=n?.errorModalData?.previousScreen||(i===t?void 0:i);return(0,r.jsx)(u,{error:n?.errorModalData?.error||Error(),allowlistConfig:s.allowlistConfig,onRetry:()=>{e(d||"LandingScreen",!1)},onCaptchaReset:l})}},m=s.z.a`
  color: var(--privy-color-accent) !important;
  font-weight: 600;
`;e.s(["ErrorScreen",0,p,"ErrorScreenView",0,u,"default",0,p],91488)},727472,e=>{var r=e.i(689391);let n=r.z.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: auto;
  gap: 16px;
  flex-grow: 100;
`,i=r.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`,t=r.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,s=(0,r.z)(i)`
  padding: 20px 0;
`,a=(0,r.z)(i)`
  gap: 16px;
`,o=r.z.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,l=r.z.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;r.z.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;let c=r.z.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  gap: 8px;
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
  background: var(--privy-color-background-2);
  border-radius: var(--privy-border-radius-md);
  && h4 {
    color: var(--privy-color-foreground-3);
    font-size: 14px;
    text-decoration: underline;
    font-weight: 500;
  }
  && p {
    color: var(--privy-color-foreground-3);
    font-size: 14px;
  }
`,d=r.z.div`
  height: 16px;
`,h=r.z.div`
  height: 12px;
`;r.z.div`
  position: relative;
`;let x=r.z.div`
  height: ${e=>e.height??"12"}px;
`;r.z.div`
  background-color: var(--privy-color-accent);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-color: white;
  border-width: 2px !important;
`,e.s(["B",0,n,"C",0,s,"F",0,o,"H",0,t,"R",0,h,"S",0,c,"a",0,l,"b",0,d,"c",0,a,"d",0,x,"e",0,i])},949894,e=>{var r=e.i(689391);let n=r.q`
  from, to {
    background: var(--privy-color-foreground-4);
    color: var(--privy-color-foreground-4);
  }

  50% {
    background: var(--privy-color-foreground-accent);
    color: var(--privy-color-foreground-accent);
  }
`,i=r.m`
  ${e=>e.$isLoading?r.m`
          width: 35%;
          animation: ${n} 2s linear infinite;
          border-radius: var(--privy-border-radius-sm);
        `:""}
`;e.s(["L",0,i])},205212,e=>{var r=e.i(689391);let n=r.z.span`
  margin-top: 4px;
  color: var(--privy-color-foreground);
  text-align: center;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */

  && a {
    color: var(--privy-color-accent);
  }
`;e.s(["S",0,n])},850876,e=>{var r=e.i(689391);let n=r.z.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem; /* 166.667% */
  text-align: center;
`;e.s(["T",0,n])},494982,e=>{var r=e.i(732486),n=e.i(352386);let i=n.forwardRef(function({title:e,titleId:r,...i},t){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":r},i),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"}))}),t=n.forwardRef(function({title:e,titleId:r,...i},t){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":r},i),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"}))});var s=e.i(84410),s=s,a=e.i(689391),o=e.i(42799),l=e.i(995040),c=e.i(25047),d=e.i(635164);let h=(0,a.z)(d.L)`
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: var(--privy-color-accent);
  svg {
    fill: var(--privy-color-accent);
  }
`;var x=e.i(39174),u=e.i(294882),p=e.i(744894),m=e.i(205212),j=e.i(850876),g=e.i(950268),f=e.i(440527),y=e.i(933185),v=e.i(315430),w=e.i(949894),b=e.i(858042),k=e.i(691416),T=e.i(105928),L=e.i(746549),A=e.i(446356),R=e.i(171762);let S=n.forwardRef(function({title:e,titleId:r,...i},t){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":r},i),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"}))});var C=e.i(924568),I=e.i(256260),E=e.i(748117),V=({iconUrl:e,value:n,symbol:i,usdValue:t,nftName:s,nftCount:a,decimals:o,$isLoading:l})=>{if(l)return(0,r.jsx)(z,{$isLoading:l});let c=n&&t&&o?function(e,r,n){let i=parseFloat(e),t=parseFloat(n);if(0===i||0===t||Number.isNaN(i)||Number.isNaN(t))return e;let s=Math.ceil(-Math.log10(.01/(t/i))),a=Math.pow(10,s=Math.max(s=Math.min(s,r),1)),o=+(Math.floor(i*a)/a).toFixed(s).replace(/\.?0+$/,"");return Intl.NumberFormat(void 0,{maximumFractionDigits:r}).format(o)}(n,o,t):n;return(0,r.jsxs)("div",{children:[(0,r.jsxs)(z,{$isLoading:l,children:[e&&(0,r.jsx)(O,{src:e,alt:"Token icon"}),a&&a>1?a+"x":void 0," ",s,c," ",i]}),t&&(0,r.jsxs)(M,{$isLoading:l,children:["$",t]})]})};let z=a.z.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.375rem;
  word-break: break-all;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  /**
   * @NOTE This is a code smell anti-pattern for styling components.
   * We are mixing JSX definitions with styled-components CSS definitions.
   * This is not ideal and should be refactored in the future to separate concerns.
   * This is also hard to read, as it makes it difficult to understand the structure
   * of the component and its styles by viewing the JSX.
   */

  ${w.L}
`,M=a.z.span`
  color: var(--privy-color-foreground-2);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  word-break: break-all;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  ${w.L}
`,O=a.z.img`
  height: 14px;
  width: 14px;
  margin-right: 4px;
  object-fit: contain;
`,N=e=>{let{chain:n,transactionDetails:i,isTokenContractInfoLoading:t,symbol:s}=e,{action:a,functionName:o}=i;return(0,r.jsx)(k.B,{children:(0,r.jsxs)(x.a,{children:["transaction"!==a&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Action"}),(0,r.jsx)(d.V,{children:o})]}),"mint"===o&&"args"in i&&i.args.filter(e=>e).map((e,i)=>(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:`Param ${i}`}),(0,r.jsx)(d.V,{children:"string"==typeof e&&(0,b.f)(e)?(0,r.jsx)(g.A,{address:e,url:n?.blockExplorers?.default?.url,showCopyIcon:!1}):e?.toString()})]},i)),"setApprovalForAll"===o&&i.operator&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Operator"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:i.operator,url:n?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),"setApprovalForAll"===o&&void 0!==i.approved&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Set approval to"}),(0,r.jsx)(d.V,{children:i.approved?"true":"false"})]}),"transfer"===o||"transferWithMemo"===o||"transferFrom"===o||"safeTransferFrom"===o||"approve"===o?(0,r.jsxs)(r.Fragment,{children:["formattedAmount"in i&&i.formattedAmount&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Amount"}),(0,r.jsxs)(d.V,{$isLoading:t,children:[i.formattedAmount," ",s]})]}),"tokenId"in i&&i.tokenId&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token ID"}),(0,r.jsx)(d.V,{children:i.tokenId.toString()})]})]}):null,"safeBatchTransferFrom"===o&&(0,r.jsxs)(r.Fragment,{children:["amounts"in i&&i.amounts&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Amounts"}),(0,r.jsx)(d.V,{children:i.amounts.join(", ")})]}),"tokenIds"in i&&i.tokenIds&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token IDs"}),(0,r.jsx)(d.V,{children:i.tokenIds.join(", ")})]})]}),"approve"===o&&i.spender&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Spender"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:i.spender,url:n?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),("transferFrom"===o||"safeTransferFrom"===o||"safeBatchTransferFrom"===o)&&i.transferFrom&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Transferring from"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:i.transferFrom,url:n?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),("transferFrom"===o||"safeTransferFrom"===o||"safeBatchTransferFrom"===o)&&i.transferTo&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Transferring to"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:i.transferTo,url:n?.blockExplorers?.default?.url,showCopyIcon:!1})})]})]})})},$=({variant:e,setPreventMaliciousTransaction:n,colorScheme:i="light",preventMaliciousTransaction:t})=>"warn"===e?(0,r.jsx)(F,{children:(0,r.jsxs)(A.W,{theme:i,children:[(0,r.jsx)("span",{style:{fontWeight:"500"},children:"Warning: Suspicious transaction"}),(0,r.jsx)("br",{}),"This has been flagged as a potentially deceptive request. Approving could put your assets or funds at risk."]})}):"error"===e?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(F,{children:[(0,r.jsx)(L.E,{theme:i,children:(0,r.jsxs)("div",{children:[(0,r.jsx)("strong",{children:"This is a malicious transaction"}),(0,r.jsx)("br",{}),"This transaction transfers tokens to a known malicious address. Proceeding may result in the loss of valuable assets."]})}),(0,r.jsxs)(D,{children:[(0,r.jsx)(T.C,{color:"var(--privy-color-error)",checked:!t,readOnly:!0,onClick:()=>n(!t)}),(0,r.jsx)("span",{children:"I understand and want to proceed anyways."})]})]})}):null,F=a.z.div`
  margin-top: 1.5rem;
`,D=a.z.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
`,P=({transactionIndex:e,maxIndex:r})=>"number"!=typeof e||0===r?"":` (${e+1} / ${r+1})`,_=(0,a.z)(f.W)`
  ${e=>e.$useSmallMargins?"margin-top: 0.5rem;":"margin-top: 2rem;"}
`,H=(0,a.z)(x.a)`
  margin-top: 0.5rem;
  border: 1px solid var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-sm);
  padding: 0.5rem;
`,B="There was an error preparing your transaction. Your transaction request will likely fail.",U=a.z.div`
  display: flex;
  width: 100%;
  justify-content: center;
  max-height: 40px;

  > img {
    object-fit: contain;
    border-radius: var(--privy-border-radius-sm);
  }
`,W=a.z.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`,q=a.z.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,J=e=>e?.code===I.$.COMPLIANCE_BLOCKED,G=()=>(0,r.jsxs)(X,{children:[(0,r.jsx)(ee,{}),(0,r.jsx)(Z,{})]}),K=a.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,Q=a.z.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.25rem; /* 111.111% */
  text-align: center;
  margin: 10px;
`,Y=a.z.span`
  margin-top: 4px;
  margin-bottom: 10px;
  color: var(--privy-color-foreground-3);
  text-align: center;

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.008px;
`,X=a.z.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`,Z=(0,a.z)(C.f)`
  position: absolute;
  width: 35px;
  height: 35px;
  color: var(--privy-color-error);
`,ee=a.z.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--privy-color-error);
  opacity: 0.1;
`,er=(0,a.z)(l.P)`
  && {
    margin-top: 24px;
  }
  transition:
    color 350ms ease,
    background-color 350ms ease;
`,en=a.z.span`
  width: 100%;
  text-align: left;
  font-size: 0.825rem;
  color: var(--privy-color-foreground);
  padding: 4px;
`,ei=a.z.div`
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`,et=a.z.text`
  position: relative;
  width: 100%;
  padding: 5px;
  font-size: 0.8rem;
  color: var(--privy-color-foreground-3);
  text-align: left;
  overflow-wrap: break-word;
`,es=a.z.span`
  position: relative;
  width: 100%;
  background-color: var(--privy-color-background-2);
  padding: 8px 12px;
  border-radius: 10px;
  margin-top: 5px;
  font-size: 14px;
  color: var(--privy-color-foreground-3);
  text-align: left;
  overflow-wrap: break-word;
  ${e=>e.$clickable&&"cursor: pointer;\n  transition: background-color 0.3s;\n  padding-right: 45px;\n\n  &:hover {\n    background-color: var(--privy-color-foreground-4);\n  }"}
`,ea=(0,a.z)(S)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,eo=(0,a.z)(R.f)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,el=({clicked:e})=>(0,r.jsx)(e?eo:ea,{});e.s(["S",0,({img:e,submitError:a,prepareError:o,onClose:p,action:f,title:w,subtitle:b,to:k,tokenAddress:T,network:L,missingFunds:A,fee:R,from:S,cta:C,disabled:I,chain:E,isSubmitting:z,isPreparing:M,isTokenPriceLoading:O,isTokenContractInfoLoading:F,isSponsored:D,symbol:H,balance:J,onClick:G,transactionDetails:K,transactionIndex:Q,maxIndex:Y,onBack:X,chainName:Z,validation:ee,hasScanDetails:er,setIsScanDetailsOpen:en,preventMaliciousTransaction:ei,setPreventMaliciousTransaction:et,tokensSent:es,tokensReceived:ea,isScanning:eo,isCancellable:el,functionName:ec})=>{let{showTransactionDetails:ed,setShowTransactionDetails:eh,hasMoreDetails:ex,isErc20Ish:eu}=(e=>{let[r,i]=(0,n.useState)(!1),t=!0,s=!1;return(!e||e.isErc20Ish||"transaction"===e.action)&&(t=!1),t&&(s=Object.entries(e||{}).some(([e,r])=>r&&!["action","isErc20Ish","isNFTIsh"].includes(e))),{showTransactionDetails:r,setShowTransactionDetails:i,hasMoreDetails:t&&s,isErc20Ish:e?.isErc20Ish}})(K),ep=(0,y.a)(),em=eu&&F||M||O||eo;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.M,{onClose:p,backFn:X}),e&&(0,r.jsx)(U,{children:e}),(0,r.jsxs)(j.T,{style:{marginTop:e?"1.5rem":0},children:[w,(0,r.jsx)(P,{maxIndex:Y,transactionIndex:Q})]}),(0,r.jsx)(m.S,{children:b}),(0,r.jsxs)(x.a,{style:{marginTop:"2rem"},children:[(!!es[0]||em)&&(0,r.jsxs)(x.R,{children:[ea.length>0?(0,r.jsx)(d.L,{children:"Send"}):(0,r.jsx)(d.L,{children:"approve"===f?"Approval amount":"Amount"}),(0,r.jsx)("div",{className:"flex flex-col",children:es.map((e,n)=>(0,r.jsx)(V,{iconUrl:e.iconUrl,value:"setApprovalForAll"===ec?"All":e.value,usdValue:e.usdValue,symbol:e.symbol,nftName:e.nftName,nftCount:e.nftCount,decimals:e.decimals},n))})]}),ea.length>0&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Receive"}),(0,r.jsx)("div",{className:"flex flex-col",children:ea.map((e,n)=>(0,r.jsx)(V,{iconUrl:e.iconUrl,value:e.value,usdValue:e.usdValue,symbol:e.symbol,nftName:e.nftName,nftCount:e.nftCount,decimals:e.decimals},n))})]}),K&&"spender"in K&&K?.spender?(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Spender"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:K.spender,url:E?.blockExplorers?.default?.url})})]}):null,k&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"To"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:k,url:E?.blockExplorers?.default?.url,showCopyIcon:!0})})]}),T&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token address"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:T,url:E?.blockExplorers?.default?.url})})]}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Network"}),(0,r.jsx)(d.V,{children:L})]}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Estimated fee"}),(0,r.jsx)(d.V,{$isLoading:M||O||void 0===D,children:D?(0,r.jsxs)(W,{children:[(0,r.jsxs)(q,{children:["Sponsored by ",ep.name]}),(0,r.jsx)(i,{height:16,width:16})]}):R})]}),ex&&!er&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(x.R,{className:"cursor-pointer",onClick:()=>eh(!ed),children:(0,r.jsxs)(d.a,{className:"flex items-center gap-x-1",children:["Details"," ",(0,r.jsx)(s.f,{style:{width:"0.75rem",marginLeft:"0.25rem",transform:ed?"rotate(180deg)":void 0}})]})}),ed&&K&&(0,r.jsx)(N,{action:f,chain:E,transactionDetails:K,isTokenContractInfoLoading:F,symbol:H})]}),er&&(0,r.jsx)(x.R,{children:(0,r.jsxs)(h,{onClick:()=>en(!0),children:[(0,r.jsx)("span",{className:"text-color-primary",children:"Details"}),(0,r.jsx)(t,{height:"14px",width:"14px",strokeWidth:"2"})]})})]}),(0,r.jsx)(v.G,{}),a?(0,r.jsx)(u.E,{style:{marginTop:"2rem"},children:a.message}):o&&0===Q?(0,r.jsx)(u.E,{style:{marginTop:"2rem"},children:o.shortMessage??B}):null,(0,r.jsx)($,{variant:ee,preventMaliciousTransaction:ei,setPreventMaliciousTransaction:et}),(0,r.jsx)(_,{$useSmallMargins:!(!o&&!a&&"warn"!==ee&&"error"!==ee),address:S,balance:J,errMsg:M||o||a||!A?void 0:`Add funds on ${E?.name??Z} to complete transaction.`}),(0,r.jsx)(l.P,{style:{marginTop:"1rem"},loading:z,disabled:I||M,onClick:G,children:C}),el&&(0,r.jsx)(l.E,{style:{marginTop:"1rem"},onClick:p,isSubmitting:!1,children:"Not now"}),(0,r.jsx)(c.B,{})]})},"T",0,({transactionError:e,chainId:i,onClose:t,onRetry:s,chainType:a,transactionHash:o})=>{let{chains:d}=(0,E.u)(),[h,x]=(0,n.useState)(!1),{errorCode:u,errorMessage:p}=((e,r)=>{if("ethereum"===r)return J(e)?{errorCode:"Transaction blocked",errorMessage:e.message}:{errorCode:e.details??e.message,errorMessage:e.shortMessage};let n=e.txSignature,i=e?.transactionMessage||"Something went wrong.";if(Array.isArray(e.logs)){let r=e.logs.find(e=>/insufficient (lamports|funds)/gi.test(e));r&&(i=r)}return{transactionHash:n,errorMessage:i}})(e,a),m=J(e),j=(({chains:e,chainId:r,chainType:n,transactionHash:i})=>{var t;return"ethereum"===n?e.find(e=>e.id===r)?.blockExplorers?.default.url??"https://etherscan.io":(t=i||"",`https://explorer.solana.com/tx/${t}?chain=${r}`)})({chains:d,chainId:i,chainType:a,transactionHash:o});return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.M,{onClose:t}),(0,r.jsxs)(K,{children:[(0,r.jsx)(G,{}),(0,r.jsx)(Q,{children:u}),(0,r.jsx)(Y,{children:m?"This transaction cannot be completed.":"Please try again."}),(0,r.jsxs)(ei,{children:[(0,r.jsx)(en,{children:"Error message"}),(0,r.jsx)(es,{$clickable:!1,children:p})]}),o&&(0,r.jsxs)(ei,{children:[(0,r.jsx)(en,{children:"Transaction hash"}),(0,r.jsxs)(et,{children:["Copy this hash to view details about the transaction on a"," ",(0,r.jsx)("u",{children:(0,r.jsx)("a",{href:j,children:"block explorer"})}),"."]}),(0,r.jsxs)(es,{$clickable:!0,onClick:async()=>{await navigator.clipboard.writeText(o),x(!0)},children:[o,(0,r.jsx)(el,{clicked:h})]})]}),!m&&(0,r.jsx)(er,{onClick:()=>s({resetNonce:!!o}),children:"Retry transaction"})]}),(0,r.jsx)(c.M,{})]})},"a",0,({img:e,title:t,subtitle:a,cta:f,instructions:w,network:b,blockExplorerUrl:k,isMissingFunds:T,submitError:L,parseError:A,total:R,swap:S,transactingWalletAddress:C,fee:I,balance:E,disabled:V,isSubmitting:z,isPreparing:M,isTokenPriceLoading:O,onClick:N,onClose:$,onBack:F,isSponsored:D})=>{let P=M||O,[J,G]=(0,n.useState)(!1),K=(0,y.a)();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.M,{onClose:$,backFn:F}),e&&(0,r.jsx)(U,{children:e}),(0,r.jsx)(j.T,{style:{marginTop:e?"1.5rem":0},children:t}),(0,r.jsx)(m.S,{children:a}),(0,r.jsxs)(x.a,{style:{marginTop:"2rem",marginBottom:".5rem"},children:[(R||P)&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Amount"}),(0,r.jsx)(d.V,{$isLoading:P,children:R})]}),S&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Swap"}),(0,r.jsx)(d.V,{children:S})]}),b&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Network"}),(0,r.jsx)(d.V,{children:b})]}),(I||P||void 0!==D)&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Estimated fee"}),(0,r.jsx)(d.V,{$isLoading:P,children:D&&!P?(0,r.jsxs)(W,{children:[(0,r.jsxs)(q,{children:["Sponsored by ",K.name]}),(0,r.jsx)(i,{height:16,width:16})]}):I})]})]}),(0,r.jsx)(x.R,{children:(0,r.jsxs)(h,{onClick:()=>G(e=>!e),children:[(0,r.jsx)("span",{children:"Advanced"}),(0,r.jsx)(s.f,{height:"16px",width:"16px",strokeWidth:"2",style:{transition:"all 300ms",transform:J?"rotate(180deg)":void 0}})]})}),J&&(0,r.jsx)(r.Fragment,{children:w.map((e,n)=>"sol-transfer"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(x.R,{children:(0,r.jsxs)(p.L,{children:["Transfer ",e.withSeed?"with seed":""]})}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Amount"}),(0,r.jsxs)(d.V,{children:[(0,o.e)({amount:e.value,decimals:e.token.decimals})," ",e.token.symbol]})]}),!!e.toAccount&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Destination"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.toAccount,url:k})})]})]},n):"spl-transfer"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(x.R,{children:(0,r.jsxs)(p.L,{children:["Transfer ",e.token.symbol]})}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Amount"}),(0,r.jsx)(d.V,{children:e.value.toString()})]}),!!e.fromAta&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Source"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.fromAta,url:k})})]}),!!e.toAta&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Destination"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.toAta,url:k})})]}),!!e.token.address&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.token.address,url:k})})]})]},n):"ata-creation"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(x.R,{children:(0,r.jsx)(p.L,{children:"Create token account"})}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Program ID"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.program,url:k})})]}),!!e.owner&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Owner"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.owner,url:k})})]})]},n):"create-account"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(x.R,{children:(0,r.jsxs)(p.L,{children:["Create account ",e.withSeed?"with seed":""]})}),!!e.account&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Account"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.account,url:k})})]}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Amount"}),(0,r.jsxs)(d.V,{children:[(0,o.e)({amount:e.value,decimals:9})," SOL"]})]})]},n):"spl-init-account"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(x.R,{children:(0,r.jsx)(p.L,{children:"Initialize token account"})}),!!e.account&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Account"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.account,url:k})})]}),!!e.mint&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Mint"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.mint,url:k})})]}),!!e.owner&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Owner"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.owner,url:k})})]})]},n):"spl-close-account"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(x.R,{children:(0,r.jsx)(p.L,{children:"Close token account"})}),!!e.source&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Source"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.source,url:k})})]}),!!e.destination&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Destination"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.destination,url:k})})]}),!!e.owner&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Owner"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.owner,url:k})})]})]},n):"spl-sync-native"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(x.R,{children:(0,r.jsx)(p.L,{children:"Sync native"})}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Program ID"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.program,url:k})})]})]},n):"raydium-swap-base-input"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(x.R,{children:(0,r.jsxs)(p.L,{children:["Raydium swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Amount in"}),(0,r.jsx)(d.V,{children:e.amountIn.toString()})]}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Minimum amount out"}),(0,r.jsx)(d.V,{children:e.minimumAmountOut.toString()})]}),e.mintIn&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token in"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.mintIn,url:k})})]}),e.mintOut&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token out"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.mintOut,url:k})})]})]},n):"raydium-swap-base-output"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(x.R,{children:(0,r.jsxs)(p.L,{children:["Raydium swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Max amount in"}),(0,r.jsx)(d.V,{children:e.maxAmountIn.toString()})]}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Amount out"}),(0,r.jsx)(d.V,{children:e.amountOut.toString()})]}),e.mintIn&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token in"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.mintIn,url:k})})]}),e.mintOut&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token out"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.mintOut,url:k})})]})]},n):"jupiter-swap-shared-accounts-route"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(x.R,{children:(0,r.jsxs)(p.L,{children:["Jupiter swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"In amount"}),(0,r.jsx)(d.V,{children:e.inAmount.toString()})]}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Quoted out amount"}),(0,r.jsx)(d.V,{children:e.quotedOutAmount.toString()})]}),e.mintIn&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token in"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.mintIn,url:k})})]}),e.mintOut&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token out"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.mintOut,url:k})})]})]},n):"jupiter-swap-exact-out-route"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(x.R,{children:(0,r.jsxs)(p.L,{children:["Jupiter swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Quoted in amount"}),(0,r.jsx)(d.V,{children:e.quotedInAmount.toString()})]}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Amount out"}),(0,r.jsx)(d.V,{children:e.outAmount.toString()})]}),e.mintIn&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token in"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.mintIn,url:k})})]}),e.mintOut&&(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Token out"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.mintOut,url:k})})]})]},n):(0,r.jsxs)(H,{children:[(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Program ID"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(g.A,{address:e.program,url:k})})]}),(0,r.jsxs)(x.R,{children:[(0,r.jsx)(d.L,{children:"Data"}),(0,r.jsx)(d.V,{children:e.discriminator})]})]},n))}),(0,r.jsx)(v.G,{}),L?(0,r.jsx)(u.E,{style:{marginTop:"2rem"},children:L.message}):A?(0,r.jsx)(u.E,{style:{marginTop:"2rem"},children:B}):null,(0,r.jsx)(_,{$useSmallMargins:!(!A&&!L),title:"",address:C,balance:E,errMsg:M||A||L||!T?void 0:"Add funds on Solana to complete transaction."}),(0,r.jsx)(l.P,{style:{marginTop:"1rem"},loading:z,disabled:V||M,onClick:N,children:f}),(0,r.jsx)(c.B,{})]})}],494982)},385937,e=>{var r=e.i(352386),n=e.i(565530);let i="0x0000000000000000000000000000000000000000",t="https://api.relay.link",s="https://api.testnets.relay.link",a=async({input:e,isTestnet:r})=>{let n=await fetch((r?s:t)+"/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await n.json();if(!(n.ok||"string"==typeof i.message&&i.message.startsWith("Invalid address")))throw console.error("Relay error:",i),Error(i.message??"Error fetching quote from relay");return i};async function o({transactionHash:e,isTestnet:r}){let n=await fetch((r?s:t)+"/requests/v2?hash="+e),i=await n.json();if(!n.ok){if("message"in i&&"string"==typeof i.message)throw Error(i.message);throw Error("Error fetching request from relay")}return i.requests.at(0)?.status??"pending"}class l extends n.P{constructor(e,r){super("We were unable to complete the bridging transaction. Funds will be refunded on your wallet.",void 0,n.a.TRANSACTION_FAILURE),this.relayLink=r?`https://testnets.relay.link/transaction/${e}`:`https://relay.link/transaction/${e}`}}e.s(["R",0,l,"a",0,e=>{let r=e.steps[0]?.items?.[0];if(r)return{from:r.data.from,to:r.data.to,value:Number(r.data.value),chainId:Number(r.data.chainId),data:r.data.data}},"b",0,"11111111111111111111111111111111","c",0,0x2f3fb341,"d",0,e=>e.steps.flatMap(e=>e.items?.filter(e=>"incomplete"===e.status)??[]).map(e=>({from:e.data.from,to:e.data.to,value:Number(e.data.value),chainId:Number(e.data.chainId),data:e.data.data})),"e",0,"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v","g",0,a,"t",0,({appId:e,originCurrency:r,destinationCurrency:n,...t})=>({tradeType:"EXPECTED_OUTPUT",originCurrency:r??i,destinationCurrency:n??i,referrer:`privy|${e}`,...t}),"u",0,function({transactionHash:e,isTestnet:n,bridgingStatus:i,setBridgingStatus:t,onSuccess:s,onFailure:a}){(0,r.useEffect)(()=>{if(e&&i){if(["delayed","waiting","pending"].includes(i)){let r=setInterval(async()=>{try{let r=await o({transactionHash:e,isTestnet:n});t(r)}catch(e){console.error(e)}},1e3);return()=>clearInterval(r)}"success"===i?s({transactionHash:e}):["refund","failure"].includes(i)&&a({error:new l(e,n)})}},[i,e,n])}])},839094,e=>{let r=new Set(["https:","mailto:"]);e.s(["t",0,function(e){if(!e)return null;try{if(r.has(new URL(e).protocol))return e}catch{}return null}])},465120,e=>{let r=(0,e.i(78048).f)("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);e.s(["f",0,r],465120)},332835,e=>{let r=(0,e.i(78048).f)("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);e.s(["f",0,r],332835)}])})();