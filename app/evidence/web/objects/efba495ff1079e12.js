(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,387556,e=>{var r=e.i(352386);let i=r.forwardRef(function({title:e,titleId:i,...o},n){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":i},o),e?r.createElement("title",{id:i},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"}))});e.s(["f",0,i])},924568,e=>{var r=e.i(352386);let i=r.forwardRef(function({title:e,titleId:i,...o},n){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":i},o),e?r.createElement("title",{id:i},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"}))});e.s(["f",0,i])},839326,e=>{var r=e.i(352386);let i=r.forwardRef(function({title:e,titleId:i,...o},n){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":i},o),e?r.createElement("title",{id:i},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"}))});e.s(["f",0,i])},950268,e=>{var r=e.i(732486),i=e.i(653327),o=e.i(574695),n=e.i(352386),t=e.i(689391),a=e.i(336291),s=e.i(995040);let l=t.z.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`,c=t.z.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,d=t.z.a`
  font-size: 14px;
  color: var(--privy-color-foreground);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;e.s(["A",0,({address:e,showCopyIcon:t,url:h,className:p})=>{let[x,u]=(0,n.useState)(!1);function g(r){r.stopPropagation(),navigator.clipboard.writeText(e).then(()=>u(!0)).catch(console.error)}return(0,n.useEffect)(()=>{if(x){let e=setTimeout(()=>u(!1),3e3);return()=>clearTimeout(e)}},[x]),(0,r.jsxs)(l,h?{children:[(0,r.jsx)(d,{title:e,className:p,href:`${h}/address/${e}`,target:"_blank",children:(0,a.c)(e)}),t&&(0,r.jsx)(s.S,{onClick:g,size:"sm",style:{gap:"0.375rem"},children:(0,r.jsxs)(r.Fragment,x?{children:["Copied",(0,r.jsx)(i.f,{size:16})]}:{children:["Copy",(0,r.jsx)(o.f,{size:16})]})})]}:{children:[(0,r.jsx)(c,{title:e,className:p,children:(0,a.c)(e)}),t&&(0,r.jsx)(s.S,{onClick:g,size:"sm",style:{gap:"0.375rem",fontSize:"14px"},children:(0,r.jsxs)(r.Fragment,x?{children:["Copied",(0,r.jsx)(i.f,{size:14})]}:{children:["Copy",(0,r.jsx)(o.f,{size:14})]})})]})}])},105928,171762,e=>{var r=e.i(732486),i=e.i(689391);i.z.label`
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
`;let o=i.z.div`
  display: inline-block;
  vertical-align: middle;
`,n=i.z.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`,t=i.z.input.attrs({type:"checkbox"})`
  border: 0;
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`,a=i.z.div`
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

  ${t}:focus + & {
    box-shadow: 0 0 0 1px ${e=>e.color};
  }

  ${n} {
    visibility: ${e=>e.checked?"visible":"hidden"};
  }
`;e.s(["C",0,({className:e,checked:i,color:s="var(--privy-color-accent)",...l})=>(0,r.jsx)("label",{children:(0,r.jsxs)(o,{className:e,children:[(0,r.jsx)(t,{checked:i,...l}),(0,r.jsx)(a,{color:s,checked:i,children:(0,r.jsx)(n,{viewBox:"0 0 24 24",children:(0,r.jsx)("polyline",{points:"20 6 9 17 4 12"})})})]})})],105928);var s=e.i(352386);let l=s.forwardRef(function({title:e,titleId:r,...i},o){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:o,"aria-labelledby":r},i),e?s.createElement("title",{id:r},e):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"}))});e.s(["f",0,l],171762)},746549,e=>{var r=e.i(732486),i=e.i(924568),o=e.i(689391);let n=o.z.div`
  display: flex;
  gap: 0.5rem;
  background-color: var(--privy-color-error-bg);
  border: 1px solid var(--privy-color-border-error);
  align-items: flex-start;
  padding: 0.75rem;
  border-radius: 0.5rem;
  overflow: clip;
  width: 100%;
`,t=o.z.div`
  color: ${e=>"dark"===e.$theme?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
  flex: 1;
  text-align: left;
  font-feature-settings:
    'calt' 0,
    'kern' 0;
`;e.s(["E",0,({children:e,theme:o,className:a})=>(0,r.jsxs)(n,{$theme:o,className:a,children:[(0,r.jsx)(i.f,{width:"16px",height:"16px",color:"var(--privy-color-icon-error)",strokeWidth:2,style:{flexShrink:0}}),(0,r.jsx)(t,{$theme:o,children:e})]})])},294882,e=>{var r=e.i(689391);let i=r.z.span`
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */

  color: var(--privy-color-error);
`;e.s(["E",0,i])},91488,e=>{var r=e.i(732486),i=e.i(332835);let o=(0,e.i(78048).f)("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]);var n=e.i(465120),t=e.i(689391),a=e.i(933185),s=e.i(616800),l=e.i(565530),c=e.i(636447),d=e.i(385937),h=e.i(839094),p=e.i(335341);e.i(352386),e.i(252494),e.i(785373),e.i(768820),e.i(535391);let x=({error:e,allowlistConfig:t,onRetry:a,onCaptchaReset:c,onBack:x})=>{let u=((e,t)=>{if(e instanceof d.R)return{title:"Transaction failed",detail:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{children:e.message}),(0,r.jsxs)("span",{children:[" ","Check the"," ",(0,r.jsx)(g,{href:e.relayLink,target:"_blank",children:"refund status"}),"."]})]}),ctaText:"Try again",icon:i.f};if(e instanceof l.P)switch(e.privyErrorCode){case l.a.CLIENT_REQUEST_TIMEOUT:return{title:"Timed out",detail:e.message,ctaText:"Try again",icon:i.f};case l.a.INSUFFICIENT_BALANCE:return{title:"Insufficient balance",detail:e.message,ctaText:"Try again",icon:i.f};case l.a.TRANSACTION_FAILURE:return{title:"Transaction failure",detail:e.message,ctaText:"Try again",icon:i.f};default:return{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:i.f}}if(e instanceof s.P&&"twilio_verification_failed"===e.type)return{title:"Something went wrong",detail:e.message,ctaText:"Try again",icon:o};if(!(e instanceof l.b))return e instanceof l.c&&e.status&&[400,422].includes(e.status)?{title:"Something went wrong",detail:e.message,ctaText:"Try again",icon:i.f}:{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:i.f};switch(e.privyErrorCode){case l.a.INVALID_CAPTCHA:return{title:"Something went wrong",detail:"Please try again.",ctaText:"Try again",icon:i.f};case l.a.DISALLOWED_LOGIN_METHOD:return{title:"Not allowed",detail:e.message,ctaText:"Try another method",icon:i.f};case l.a.ALLOWLIST_REJECTED:return{title:t.errorTitle||"You don't have access to this app",detail:t.errorDetail||"Have you been invited?",ctaText:t.errorCtaText||"Try another account",icon:n.f};case l.a.CAPTCHA_FAILURE:return{title:"Something went wrong",detail:"You did not pass CAPTCHA. Please try again.",ctaText:"Try again",icon:null};case l.a.CAPTCHA_TIMEOUT:return{title:"Something went wrong",detail:"Something went wrong! Please try again later.",ctaText:"Try again",icon:null};case l.a.LINKED_TO_ANOTHER_USER:return{title:"Authentication failed",detail:"This account has already been linked to another user.",ctaText:"Try again",icon:i.f};case l.a.NOT_SUPPORTED:return{title:"This region is not supported",detail:"SMS authentication from this region is not available",ctaText:"Try another method",icon:i.f};case l.a.TOO_MANY_REQUESTS:return{title:"Request failed",detail:"Too many attempts.",ctaText:"Try again later",icon:i.f};default:return{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:i.f}}})(e,t);return(0,r.jsx)(p.S,{title:u.title,subtitle:u.detail,icon:u.icon,onBack:x,iconVariant:"error",primaryCta:{label:u.ctaText,onClick:()=>{if(e instanceof l.b&&(e.privyErrorCode===l.a.INVALID_CAPTCHA&&c?.(),e.privyErrorCode===l.a.ALLOWLIST_REJECTED)){let e=(0,h.t)(t.errorCtaLink);if(e)return void window.open(e,"_blank","noopener,noreferrer")}a?.()},variant:"error"},watermark:!0})},u={component:()=>{let{navigate:e,data:i,lastScreen:o,currentScreen:n}=(0,c.u)(),t=(0,a.a)(),{reset:l}=(0,s.a)(),d=i?.errorModalData?.previousScreen||(o===n?void 0:o);return(0,r.jsx)(x,{error:i?.errorModalData?.error||Error(),allowlistConfig:t.allowlistConfig,onRetry:()=>{e(d||"LandingScreen",!1)},onCaptchaReset:l})}},g=t.z.a`
  color: var(--privy-color-accent) !important;
  font-weight: 600;
`;e.s(["ErrorScreen",0,u,"ErrorScreenView",0,x,"default",0,u],91488)},744894,e=>{var r=e.i(689391);let i=r.z.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */
`;e.s(["L",0,i])},727472,e=>{var r=e.i(689391);let i=r.z.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: auto;
  gap: 16px;
  flex-grow: 100;
`,o=r.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`,n=r.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,t=(0,r.z)(o)`
  padding: 20px 0;
`,a=(0,r.z)(o)`
  gap: 16px;
`,s=r.z.div`
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
`;let p=r.z.div`
  height: ${e=>e.height??"12"}px;
`;r.z.div`
  background-color: var(--privy-color-accent);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-color: white;
  border-width: 2px !important;
`,e.s(["B",0,i,"C",0,t,"F",0,s,"H",0,n,"R",0,h,"S",0,c,"a",0,l,"b",0,d,"c",0,a,"d",0,p,"e",0,o])},949894,e=>{var r=e.i(689391);let i=r.q`
  from, to {
    background: var(--privy-color-foreground-4);
    color: var(--privy-color-foreground-4);
  }

  50% {
    background: var(--privy-color-foreground-accent);
    color: var(--privy-color-foreground-accent);
  }
`,o=r.m`
  ${e=>e.$isLoading?r.m`
          width: 35%;
          animation: ${i} 2s linear infinite;
          border-radius: var(--privy-border-radius-sm);
        `:""}
`;e.s(["L",0,o])},25047,e=>{var r=e.i(732486),i=e.i(689391),o=e.i(933185);function n(e){return(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 460 40",...e,children:(0,r.jsx)("g",{fill:e.color||"var(--privy-color-foreground)",children:(0,r.jsx)("path",{d:"M0 15.4v15.38h4.64V19.96h3.58c2.47 0 3.63-.01 3.77-.02 1-.08 1.49-.15 2.18-.3a9.45 9.45 0 0 0 4.6-2.37c1.66-1.57 2.64-3.87 2.81-6.56.02-.3.02-1.19 0-1.49-.1-1.77-.56-3.35-1.36-4.72A8.84 8.84 0 0 0 15.14.57c-.93-.3-1.75-.43-3.09-.54C11.9.02 10.2 0 5.93 0H0ZM10.85 4c1.85.05 3.1.45 4.16 1.3.22.17.54.49.69.68a5.97 5.97 0 0 1 1.19 3.13c.04.35.04 1.36 0 1.71-.08.68-.23 1.3-.44 1.85a4.8 4.8 0 0 1-1.09 1.68A5.63 5.63 0 0 1 12 15.92c-.6.08-.4.08-4.01.09H4.64V3.98h2.9c1.6 0 3.08 0 3.31.02ZM187.65 5.71v5.72h-.27l-.09-.14a15.9 15.9 0 0 0-1.21-1.73c-.43-.5-1-.95-1.7-1.36-.54-.3-1.05-.5-1.73-.63a8.98 8.98 0 0 0-1.7-.17 8.84 8.84 0 0 0-7.8 4.03 12.95 12.95 0 0 0-2.03 6.39c-.07.98-.06 2.15.02 3.13.2 2.47.87 4.53 2.02 6.25a8.98 8.98 0 0 0 10.22 3.65 6.5 6.5 0 0 0 2.8-1.93c.41-.51.84-1.1 1.1-1.55l.1-.17h.37v3.58h4.38V0h-4.48Zm-5.24 5.54c1.3.14 2.3.6 3.17 1.48.9.9 1.5 2.09 1.85 3.64.36 1.6.39 3.72.06 5.43a8.13 8.13 0 0 1-1.54 3.62 5.1 5.1 0 0 1-3.93 1.96 6.13 6.13 0 0 1-2.32-.31 5.87 5.87 0 0 1-3.33-3.5c-.39-1-.62-2.05-.72-3.32-.03-.32-.04-1.35-.02-1.73.08-1.56.4-2.91.96-4.05a6.2 6.2 0 0 1 1.06-1.58 5.08 5.08 0 0 1 3.6-1.66c.25-.02.9 0 1.16.02ZM210.07 15.39l.01 15.38h4.38l.01-3.57h.37l.09.15c.24.44.84 1.26 1.21 1.7a6.79 6.79 0 0 0 2.57 1.75 9.3 9.3 0 0 0 6.86-.49 9.28 9.28 0 0 0 4.05-4.07A13.05 13.05 0 0 0 231 21.6c.21-1.73.18-3.7-.09-5.32a13.03 13.03 0 0 0-1.5-4.3 9.1 9.1 0 0 0-3.75-3.63 9.15 9.15 0 0 0-4.43-.96 7.46 7.46 0 0 0-2.8.5A7.07 7.07 0 0 0 216 9.7c-.4.52-.82 1.12-1.1 1.59l-.07.14h-.27V0h-4.5Zm11.13-4.14c1.07.1 1.94.44 2.7 1.04a6.1 6.1 0 0 1 1.64 1.98c.43.84.78 2 .94 3.11.15 1.16.16 2.4.02 3.54a9.34 9.34 0 0 1-1.39 4.03 5.33 5.33 0 0 1-2.69 2.15c-.9.3-2.04.38-3.06.2a5.14 5.14 0 0 1-3.45-2.37 6.03 6.03 0 0 1-.45-.8c-.5-1.03-.8-2.2-.92-3.58-.04-.49-.06-.89-.05-1.53.01-.76.05-1.23.13-1.85.38-2.53 1.47-4.38 3.15-5.31a5.46 5.46 0 0 1 2.3-.63 10 10 0 0 1 1.13.02ZM69.05 2.17l-.01 2.77V7.7h-3.36v3.6h3.36v6.8l.01 7.15c.06 1.4.4 2.44 1.1 3.37a5.8 5.8 0 0 0 2.97 2.07c.91.3 1.83.42 2.9.38a8.71 8.71 0 0 0 2.66-.48l-.8-3.7-.38.06a4.96 4.96 0 0 1-2.43-.06c-.33-.1-.56-.25-.8-.49-.4-.41-.6-.88-.7-1.67-.02-.2-.02-.62-.03-6.82v-6.6h4.73V7.7h-4.73V2.16h-4.49ZM133.34 2.17V7.7h-3.39v3.6h3.38v6.9l.01 7.17a5.66 5.66 0 0 0 2.36 4.49c.85.6 2.03 1.03 3.26 1.17.85.1 2.03.05 2.81-.1.3-.06.75-.18 1-.26l.2-.06v-.05l-.81-3.67-.37.06a4.99 4.99 0 0 1-1.8.09c-.85-.13-1.32-.4-1.7-.97a2.63 2.63 0 0 1-.39-1.04c-.06-.4-.06 0-.06-7.1V11.3h4.7V7.7h-4.7l-.01-2.77V2.16h-4.49ZM293.41 2.36a14.56 14.56 0 0 0-13.7 16.07 14.59 14.59 0 0 0 21.86 11.08 14.5 14.5 0 0 0 7.11-14.07 14.61 14.61 0 0 0-6.53-10.73 14.49 14.49 0 0 0-8.74-2.35ZM350.8 2.36a10.17 10.17 0 0 0-7.56 4.2c-.16.2-.45.63-.58.83l-.05.1h-.47l-.01-4.36h-7.36v36.4h7.82V27.27h.49l.05.07a11.3 11.3 0 0 0 7.49 4.15 10.52 10.52 0 0 0 9.38-4.1c1.66-2.1 2.73-4.9 3.07-8.06.1-.87.13-1.4.13-2.37 0-.8 0-1.1-.07-1.76a15.95 15.95 0 0 0-3.23-8.72 12.8 12.8 0 0 0-1.85-1.84 10.49 10.49 0 0 0-7.26-2.28Zm-.94 6.05c1.27.15 2.33.65 3.2 1.5.98.96 1.67 2.31 2.03 4 .34 1.57.38 3.68.12 5.39a9.78 9.78 0 0 1-1.04 3.25c-.14.25-.44.69-.6.89a5.35 5.35 0 0 1-4.31 2.07 5.25 5.25 0 0 1-4.41-1.9 7.35 7.35 0 0 1-1.26-2.32 14.09 14.09 0 0 1-.62-4.83c.05-1.98.38-3.53 1.02-4.85a5.63 5.63 0 0 1 2.5-2.65c.66-.34 1.3-.5 2.14-.58.18-.02 1.04 0 1.23.03ZM363.63 3.1l-.01 3.2v3.16h1.43c1.26.01 1.44.02 1.54.04.42.09.66.28.79.62.08.23.08.08.08 2.96a911.57 911.57 0 0 1 .03 10.18v7.54h7.82v-7.4l.01-7.83c.03-.94.11-1.63.27-2.28.46-1.9 1.54-2.93 3.35-3.23.52-.08.2-.08 5-.08h4.4V3.08h-3.1c-3.48 0-3.91.01-4.67.1-1.83.2-3.04.79-3.96 1.88-.5.6-.9 1.32-1.26 2.26l-.06.17h-.46V3.09h-5.6c-4.46 0-5.6 0-5.6.02ZM390.8 16.95V30.8h3.87l3.86-.01V3.09h-7.73ZM400.6 3.1l-.01.4v.38l4.66 13.4 4.69 13.47.02.05h10.3l.03-.05 4.67-13.45 4.67-13.4V3.1h-7.43l-6.7 19.26h-.5l-3.28-9.5-3.31-9.64-.05-.12h-3.88l-3.88.01ZM430.98 3.1c-.01 0-.02.19-.02.4v.39l5.08 14.59c2.8 8.02 5.08 14.6 5.08 14.61.01.02-.22.02-4.8.02h-4.82v6.42h4.95c5.09 0 5.23 0 5.87-.06 3.15-.28 5.29-1.63 6.63-4.15.28-.55.44-.95.87-2.16L459 6.78l1-2.89v-.8h-7.43l-6.69 19.26h-.5l-3.27-9.46-3.31-9.64-.06-.16h-3.88l-3.88.01ZM36.57 7.36c-1.36.1-2.6.6-3.62 1.45a5.65 5.65 0 0 0-1.67 2.42l-.05.13H31V7.7h-4.35v23.08h4.5v-7.3c0-8 0-7.34.08-7.82a4.89 4.89 0 0 1 2.06-3.18c.83-.58 1.74-.89 2.87-.98a11.87 11.87 0 0 1 2.8.25H39v-4.3l-.21-.02c-.61-.07-1.74-.1-2.22-.07ZM51.08 7.41c-2.33.12-4.3.84-5.95 2.16a9.89 9.89 0 0 0-2.03 2.2 12.5 12.5 0 0 0-2 5.78 18.04 18.04 0 0 0 0 3.65 12.13 12.13 0 0 0 2.26 6.05 9.74 9.74 0 0 0 5 3.52c2.11.64 4.7.64 6.8 0a9.78 9.78 0 0 0 4.88-3.37c1.38-1.78 2.19-4 2.4-6.58.13-1.46.06-3.06-.18-4.42a11.24 11.24 0 0 0-3.58-6.6 10 10 0 0 0-5.75-2.35c-.56-.06-1.31-.07-1.85-.04Zm1.42 3.78c.88.1 1.62.34 2.28.75a6.13 6.13 0 0 1 1.99 2.15 10.31 10.31 0 0 1 1.2 5c.02 1.23-.12 2.44-.42 3.51a7.14 7.14 0 0 1-1.81 3.32c-.61.6-1.2.98-1.95 1.24a6 6 0 0 1-2 .3 5.7 5.7 0 0 1-2.72-.6 5 5 0 0 1-1.28-.94A7.1 7.1 0 0 1 46 22.73c-.57-1.99-.6-4.46-.08-6.5a7.24 7.24 0 0 1 2.03-3.67 5.13 5.13 0 0 1 3.35-1.4 11 11 0 0 1 1.2.03ZM92.05 7.4c-.96.06-1.56.15-2.3.33a9.62 9.62 0 0 0-6.09 4.66 13.5 13.5 0 0 0-1.71 7c0 .83 0 1.04.06 1.6.16 1.77.58 3.32 1.29 4.7A9.72 9.72 0 0 0 90.28 31c1.84.37 4.08.32 5.85-.13a9.07 9.07 0 0 0 5.02-3.1A7.64 7.64 0 0 0 102.5 25l-2.11-.39-2.11-.38-.08.13a4.72 4.72 0 0 1-2.35 2.55 6.3 6.3 0 0 1-2.23.58c-.29.03-1.13.03-1.44 0a6.35 6.35 0 0 1-3.02-1.04 5.93 5.93 0 0 1-2.02-2.43 8.44 8.44 0 0 1-.72-3.18v-.26h16.38v-.81c0-1.83-.06-2.76-.25-3.87-.2-1.22-.53-2.24-1.05-3.28a8.9 8.9 0 0 0-2.66-3.26 10.1 10.1 0 0 0-5.34-1.94 18.3 18.3 0 0 0-1.46-.03Zm1.3 3.75c1.2.13 2.19.55 3.05 1.3a5.8 5.8 0 0 1 1.78 2.96c.13.51.21 1.17.21 1.66v.15H86.43v-.12c.08-.97.3-1.78.72-2.61.5-1 1.2-1.8 2.14-2.42a5.32 5.32 0 0 1 2.9-.95c.2-.01.97 0 1.17.03ZM116.79 7.41c-2 .1-3.73.65-5.22 1.65a10.7 10.7 0 0 0-4.25 6.06 16.1 16.1 0 0 0-.5 5.8c.2 2.17.84 4.13 1.88 5.76.58.9 1.32 1.73 2.15 2.4a9.37 9.37 0 0 0 3.6 1.8 12.06 12.06 0 0 0 3.92.34 10.2 10.2 0 0 0 3.84-.95 8.31 8.31 0 0 0 4.76-6.75l.01-.04h-4.37l-.05.16a4.87 4.87 0 0 1-4.24 3.75c-.59.07-1.32.06-1.93-.05a5.47 5.47 0 0 1-3.5-2.27c-.56-.75-1-1.73-1.26-2.79a13.8 13.8 0 0 1-.16-5.24 7.77 7.77 0 0 1 2.1-4.3 5.48 5.48 0 0 1 2.15-1.3 6.4 6.4 0 0 1 3.89.1c.59.21 1.03.5 1.5.96a5.32 5.32 0 0 1 1.46 2.5l.04.15h4.37v-.06a8.22 8.22 0 0 0-5.31-6.94 10.98 10.98 0 0 0-4.88-.74ZM156.2 7.41a9.87 9.87 0 0 0-6 2.29 11.02 11.02 0 0 0-3.41 5.43c-.52 1.78-.68 3.9-.48 5.97.17 1.8.63 3.38 1.37 4.8a9.68 9.68 0 0 0 5.91 4.86c1.65.48 3.63.61 5.53.36 3.72-.49 6.55-2.62 7.56-5.69.12-.39.13-.42.1-.43-.02 0-4.13-.75-4.19-.75-.03 0-.04 0-.1.16-.18.42-.45.9-.72 1.22-.16.2-.49.53-.7.7-.67.54-1.5.9-2.43 1.08-.48.08-.83.11-1.41.11-.64 0-1.07-.04-1.6-.15a5.76 5.76 0 0 1-3.93-2.83 8 8 0 0 1-.99-3.79v-.16h16.38v-1.11l-.02-1.43c-.1-2.25-.53-4-1.35-5.59a9.24 9.24 0 0 0-6.18-4.75c-1.04-.26-2.2-.36-3.33-.3Zm1.45 3.74a5.35 5.35 0 0 1 3.66 1.94 6.1 6.1 0 0 1 1.38 4.01v.12h-11.97v-.06c0-.02 0-.14.02-.25a6.6 6.6 0 0 1 2.15-4.32 5.73 5.73 0 0 1 3.5-1.46c.25-.02 1 0 1.26.02ZM233.58 7.82l8.37 23.22a49.22 49.22 0 0 1-.67 1.9 5.36 5.36 0 0 1-1.14 1.8c-.41.4-.82.58-1.48.69-.27.04-1.03.03-1.35 0a8.05 8.05 0 0 1-1.1-.23l-1.08 3.67c0 .02.32.14.66.22.83.21 1.57.29 2.56.28.56-.01.8-.03 1.24-.1 2.71-.4 4.66-2.09 5.86-5.08l9.64-26.44c0-.02-4.82-.06-4.83-.05l-2.93 8.96-2.91 8.94h-.24l-.22-.65-2.91-8.95-2.7-8.3H233.53ZM293.05 35.8c-1.18.04-1.93.09-2.8.16-2.52.24-4.53.69-5.43 1.23-.7.41-.76.86-.2 1.28.88.66 3.29 1.19 6.36 1.4a48.55 48.55 0 0 0 5.75.05c3.47-.19 6.24-.78 7.11-1.5.22-.19.3-.34.3-.53 0-.1 0-.12-.04-.22-.35-.69-2.32-1.3-5.25-1.63a41.09 41.09 0 0 0-5.8-.24Zm0 0"})})})}let t=i.z.span`
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
`,s=i.z.div`
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
`;e.s(["B",0,({className:e})=>{let{appearance:i}=(0,o.a)();return(0,r.jsx)(s,{className:e,children:i.footerLogo??(0,r.jsx)(a,{href:"https://privy.io/?utm_source=module&utm_medium=module&utm_campaign=registration_module",target:"_blank",rel:"noopener noreferrer",id:"protected-by-privy",children:(0,r.jsx)(n,{color:"currentColor",height:13,width:150})})})},"M",0,s,"T",0,function({app:{legal:{privacyPolicyUrl:e,termsAndConditionsUrl:i,requireUsersAcceptTerms:o}},alwaysShowImplicitConsent:n}){let a=!(!e||!i);return(!o||n)&&(i||e)?(0,r.jsxs)(t,{children:["By logging in I agree to the"," ",i&&(0,r.jsx)("a",{href:i,target:"_blank",children:a?"Terms":"Terms of Service"}),a&&" & ",e&&(0,r.jsx)("a",{href:e,target:"_blank",children:"Privacy Policy"})]}):(0,r.jsx)(t,{})}])},995040,e=>{var r=e.i(732486),i=e.i(689391),o=e.i(541021),n=e.i(387556),t=e.i(839326),a=e.i(352386);let s=a.forwardRef(function({title:e,titleId:r,...i},o){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:o,"aria-labelledby":r},i),e?a.createElement("title",{id:r},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18 18 6M6 6l12 12"}))});var l=e.i(933185),c=e.i(748117);let d=i.z.button`
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
`,h=({children:e,loading:i,disabled:n,success:t,size:a="lg",loadingText:s="Loading...",as:l,onClick:c,...d})=>{let h="a"===l,p=!(!i&&!n);return(0,r.jsx)(x,{as:l,disabled:h?void 0:p,"aria-disabled":h?p:void 0,$success:t,$size:a,onClick:e=>{h&&p?e.preventDefault():c?.(e)},...d,children:i?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.B,{}),s?(0,r.jsx)("span",{style:{marginLeft:"8px"},children:s}):null]}):e})},p=(0,i.z)(d)`
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
`,x=(0,i.z)(d)`
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
`,u=({children:e,loading:i,disabled:n,size:t="lg",loadingText:a="Loading...",as:s,onClick:l,...c})=>{let d="a"===s,h=!(!i&&!n);return(0,r.jsx)(v,{as:s,disabled:d?void 0:h,"aria-disabled":d?h:void 0,$size:t,onClick:e=>{d&&h?e.preventDefault():l?.(e)},...c,children:i?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.B,{}),a?(0,r.jsx)("span",{style:{marginLeft:"8px"},children:a}):null]}):e})},g=({children:e,loading:i,disabled:n,size:t="lg",loadingText:a="Loading...",as:s,onClick:l,...c})=>{let d="a"===s,h=!(!i&&!n);return(0,r.jsx)(m,{as:s,disabled:d?void 0:h,"aria-disabled":d?h:void 0,$size:t,onClick:e=>{d&&h?e.preventDefault():l?.(e)},...c,children:i?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.B,{}),a?(0,r.jsx)("span",{style:{marginLeft:"8px"},children:a}):null]}):e})},v=(0,i.z)(d)`
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
`,m=(0,i.z)(d)`
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
`,f=i.z.button`
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
`;let j=i.z.button`
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
`,y=({backFn:e,disabled:i=!1,"aria-label":o})=>(0,r.jsx)("div",{children:(0,r.jsx)(k,{type:"button","aria-label":o,disabled:i,onClick:i?void 0:e,children:(0,r.jsx)(n.f,{height:"16px",width:"16px",strokeWidth:2})})}),b=({infoFn:e})=>(0,r.jsx)("div",{children:(0,r.jsx)(z,{"aria-label":"info",onClick:e,children:(0,r.jsx)(t.f,{height:"22px",width:"22px",strokeWidth:2})})}),w=e=>(0,r.jsx)("div",{children:(0,r.jsx)(k,{type:"button","aria-label":e["aria-label"]??"close modal",onClick:e.onClose,children:(0,r.jsx)(s,{height:"16px",width:"16px",strokeWidth:2})})}),k=i.z.button`
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
`,T=i.z.div`
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
`,L=i.z.div`
  flex: 1;
  align-items: center;
  display: flex;
  gap: 8px;
`,C=i.z.div`
  display: flex;
  justify-content: flex-end;
`,A=i.z.div`
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
`,S=i.z.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--privy-color-foreground);
`;e.s(["B",0,({variant:e="primary",size:i="lg",children:o,success:n,...t})=>{switch(e){case"secondary":return(0,r.jsx)(u,{size:i,...t,children:o});case"error":return(0,r.jsx)(u,{$warn:!0,size:i,...t,children:o});case"muted":return(0,r.jsx)(g,{size:i,...t,children:o});default:return(0,r.jsx)(h,{size:i,success:n,...t,children:o})}},"E",0,({children:e,onClick:i,disabled:n,isSubmitting:t,...a})=>(0,r.jsxs)(j,{$isSubmitting:t,onClick:i,disabled:n,...a,children:[(0,r.jsx)("span",{children:e}),(0,r.jsx)("span",{children:(0,r.jsx)(o.B,{})})]}),"M",0,({backFn:e,infoFn:i,onClose:o,title:n,eyebrow:t,closeable:a=!0,className:s})=>{let{closePrivyModal:d}=(0,c.u)(),h=(0,l.a)();return(0,r.jsxs)(T,{className:s,children:[(0,r.jsxs)(L,{children:[e&&(0,r.jsx)(y,{backFn:e}),t&&(0,r.jsx)(S,{children:t}),!t&&n&&(0,r.jsx)(A,{id:"privy-dialog-title",children:n}),(0,r.jsx)("div",{style:{height:24}}),i&&(0,r.jsx)(b,{infoFn:i})]}),(0,r.jsx)(C,{children:!h.render.standalone&&a&&(0,r.jsx)(w,{onClose:o||(()=>d())})})]})},"P",0,h,"S",0,u,"b",0,({children:e,loading:i,disabled:n,...t})=>(0,r.jsx)(p,{disabled:n,...t,children:i?(0,r.jsx)(o.B,{color:"var(--privy-color-foreground-accent)"}):e}),"c",0,f,"d",0,g],995040)},612269,e=>{var r=e.i(732486),i=e.i(352386),o=e.i(689391),n=e.i(541021),t=e.i(25047),a=e.i(995040),s=e.i(226439);let l=o.z.div`
  /* spacing tokens */
  --screen-space: 16px; /* base 1x = 16 */
  --screen-space-lg: calc(var(--screen-space) * 1.5); /* 24px */

  position: relative;
  overflow: hidden;
  margin: 0 calc(-1 * var(--screen-space)); /* extends over modal padding */
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,c=o.z.div`
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
`,h=(0,o.z)(a.M)`
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
`,x=o.z.div`
  display: flex;
  flex-direction: column;
  gap: var(--screen-space-lg);
  margin-top: 1.5rem;
`,u=o.z.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--screen-space);
`,g=o.z.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,v=o.z.h3`
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
`,f=o.z.div`
  background: ${({$variant:e})=>{switch(e){case"success":return"var(--privy-color-success-bg)";case"warning":return"var(--privy-color-warn)";case"error":return"var(--privy-color-error-bg)";case"loading":case"logo":return"transparent";default:return"var(--privy-color-background-2)"}}};

  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`,j=o.z.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    max-height: 90px;
    max-width: 180px;
  }
`,y=o.z.div`
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
`,b=({children:e,...i})=>(0,r.jsx)(l,{children:(0,r.jsx)(c,{...i,children:e})}),w=o.z.div`
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
`,z=o.z.div`
  height: 100%;
  width: ${({pct:e})=>e}%;
  background: var(--privy-color-foreground-3);
  border-radius: 2px;
  transition: width 300ms ease-in-out;
`,T=({step:e})=>e?(0,r.jsx)(w,{children:(0,r.jsx)(z,{pct:Math.min(100,e.current/e.total*100)})}):null;b.Header=({title:e,subtitle:i,icon:o,iconVariant:n,iconLoadingStatus:t,showBack:a,onBack:s,showInfo:l,onInfo:c,showClose:p,onClose:x,step:f,headerTitle:j,eyebrow:y,...w})=>(0,r.jsxs)(d,{...w,children:[(0,r.jsx)(h,{backFn:a?s:void 0,infoFn:l?c:void 0,onClose:p?x:void 0,title:j,eyebrow:y,closeable:p}),(o||n||e||i)&&(0,r.jsxs)(u,{children:[o||n?(0,r.jsx)(b.Icon,{icon:o,variant:n,loadingStatus:t}):null,!(!e&&!i)&&(0,r.jsxs)(g,{children:[e&&(0,r.jsx)(v,{children:e}),i&&(0,r.jsx)(m,{children:i})]})]}),f&&(0,r.jsx)(T,{step:f})]}),(b.Body=i.default.forwardRef(({children:e,...i},o)=>(0,r.jsx)(p,{ref:o,...i,children:e}))).displayName="Screen.Body",b.Footer=({children:e,...i})=>(0,r.jsx)(x,{id:"privy-content-footer-container",...i,children:e}),b.Actions=({children:e,...i})=>(0,r.jsx)(L,{...i,children:e}),b.HelpText=({children:e,...i})=>(0,r.jsx)(C,{...i,children:e}),b.FooterText=({children:e,...i})=>(0,r.jsx)(A,{...i,children:e}),b.Watermark=()=>(0,r.jsx)(k,{}),b.Icon=({icon:e,variant:o="subtle",loadingStatus:t})=>"logo"===o&&e?(0,r.jsx)(j,"string"==typeof e?{children:(0,r.jsx)("img",{src:e,alt:""})}:i.default.isValidElement(e)?{children:e}:{children:i.default.createElement(e)}):"loading"===o?e?(0,r.jsx)(y,{children:(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,r.jsx)(n.C,{success:t?.success,fail:t?.fail}),"string"==typeof e?(0,r.jsx)("span",{style:{background:`url('${e}') 0 0 / contain`,height:"38px",width:"38px",borderRadius:"6px",margin:"auto",backgroundSize:"contain"}}):i.default.isValidElement(e)?i.default.cloneElement(e,{style:{width:"38px",height:"38px"}}):i.default.createElement(e,{style:{width:"38px",height:"38px"}})]})}):(0,r.jsx)(f,{$variant:o,children:(0,r.jsx)(s.N,{size:"64px"})}):(0,r.jsx)(f,{$variant:o,children:e&&("string"==typeof e?(0,r.jsx)("img",{src:e,alt:"",style:{width:"32px",height:"32px",borderRadius:"6px"}}):i.default.isValidElement(e)?e:i.default.createElement(e,{width:32,height:32,stroke:(()=>{switch(o){case"success":return"var(--privy-color-icon-success)";case"warning":return"var(--privy-color-icon-warning)";case"error":return"var(--privy-color-icon-error)";default:return"var(--privy-color-icon-muted)"}})(),strokeWidth:2}))});let L=o.z.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) / 2);
`,C=o.z.div`
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
`,A=o.z.div`
  && {
    margin-top: -1rem;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 0.6875rem; /* 11px */
    line-height: 1rem; /* 16px */
  }
`;e.s(["S",0,b])},335341,e=>{var r=e.i(732486),i=e.i(995040),o=e.i(612269);e.s(["S",0,({primaryCta:e,secondaryCta:n,helpText:t,footerText:a,watermark:s=!0,children:l,...c})=>{let d=e||n?(0,r.jsxs)(r.Fragment,{children:[e&&(()=>{let{label:o,...n}=e,t=n.variant||"primary";return(0,r.jsx)(i.B,{...n,variant:t,style:{width:"100%",...n.style},children:o})})(),n&&(()=>{let{label:e,...o}=n,t=o.variant||"secondary";return(0,r.jsx)(i.B,{...o,variant:t,style:{width:"100%",...o.style},children:e})})()]}):null;return(0,r.jsxs)(o.S,{id:c.id,className:c.className,children:[(0,r.jsx)(o.S.Header,{...c}),l?(0,r.jsx)(o.S.Body,{children:l}):null,t||d||s?(0,r.jsxs)(o.S.Footer,{children:[t?(0,r.jsx)(o.S.HelpText,{children:t}):null,d?(0,r.jsx)(o.S.Actions,{children:d}):null,s?(0,r.jsx)(o.S.Watermark,{}):null]}):null,a?(0,r.jsx)(o.S.FooterText,{children:a}):null]})}])},205212,e=>{var r=e.i(689391);let i=r.z.span`
  margin-top: 4px;
  color: var(--privy-color-foreground);
  text-align: center;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */

  && a {
    color: var(--privy-color-accent);
  }
`;e.s(["S",0,i])},850876,e=>{var r=e.i(689391);let i=r.z.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem; /* 166.667% */
  text-align: center;
`;e.s(["T",0,i])},494982,e=>{var r=e.i(732486),i=e.i(352386);let o=i.forwardRef(function({title:e,titleId:r,...o},n){return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},o),e?i.createElement("title",{id:r},e):null,i.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"}))}),n=i.forwardRef(function({title:e,titleId:r,...o},n){return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},o),e?i.createElement("title",{id:r},e):null,i.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"}))});var t=e.i(84410),t=t,a=e.i(689391),s=e.i(42799),l=e.i(995040),c=e.i(25047),d=e.i(635164);let h=(0,a.z)(d.L)`
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: var(--privy-color-accent);
  svg {
    fill: var(--privy-color-accent);
  }
`;var p=e.i(39174),x=e.i(294882),u=e.i(744894),g=e.i(205212),v=e.i(850876),m=e.i(950268),f=e.i(440527),j=e.i(933185),y=e.i(315430),b=e.i(949894),w=e.i(858042),k=e.i(691416),z=e.i(105928),T=e.i(746549),L=e.i(446356),C=e.i(171762);let A=i.forwardRef(function({title:e,titleId:r,...o},n){return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":r},o),e?i.createElement("title",{id:r},e):null,i.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"}))});var S=e.i(924568),$=e.i(256260),E=e.i(748117),R=({iconUrl:e,value:i,symbol:o,usdValue:n,nftName:t,nftCount:a,decimals:s,$isLoading:l})=>{if(l)return(0,r.jsx)(I,{$isLoading:l});let c=i&&n&&s?function(e,r,i){let o=parseFloat(e),n=parseFloat(i);if(0===o||0===n||Number.isNaN(o)||Number.isNaN(n))return e;let t=Math.ceil(-Math.log10(.01/(n/o))),a=Math.pow(10,t=Math.max(t=Math.min(t,r),1)),s=+(Math.floor(o*a)/a).toFixed(t).replace(/\.?0+$/,"");return Intl.NumberFormat(void 0,{maximumFractionDigits:r}).format(s)}(i,s,n):i;return(0,r.jsxs)("div",{children:[(0,r.jsxs)(I,{$isLoading:l,children:[e&&(0,r.jsx)(M,{src:e,alt:"Token icon"}),a&&a>1?a+"x":void 0," ",t,c," ",o]}),n&&(0,r.jsxs)(V,{$isLoading:l,children:["$",n]})]})};let I=a.z.span`
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

  ${b.L}
`,V=a.z.span`
  color: var(--privy-color-foreground-2);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  word-break: break-all;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  ${b.L}
`,M=a.z.img`
  height: 14px;
  width: 14px;
  margin-right: 4px;
  object-fit: contain;
`,N=e=>{let{chain:i,transactionDetails:o,isTokenContractInfoLoading:n,symbol:t}=e,{action:a,functionName:s}=o;return(0,r.jsx)(k.B,{children:(0,r.jsxs)(p.a,{children:["transaction"!==a&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Action"}),(0,r.jsx)(d.V,{children:s})]}),"mint"===s&&"args"in o&&o.args.filter(e=>e).map((e,o)=>(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:`Param ${o}`}),(0,r.jsx)(d.V,{children:"string"==typeof e&&(0,w.f)(e)?(0,r.jsx)(m.A,{address:e,url:i?.blockExplorers?.default?.url,showCopyIcon:!1}):e?.toString()})]},o)),"setApprovalForAll"===s&&o.operator&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Operator"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:o.operator,url:i?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),"setApprovalForAll"===s&&void 0!==o.approved&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Set approval to"}),(0,r.jsx)(d.V,{children:o.approved?"true":"false"})]}),"transfer"===s||"transferWithMemo"===s||"transferFrom"===s||"safeTransferFrom"===s||"approve"===s?(0,r.jsxs)(r.Fragment,{children:["formattedAmount"in o&&o.formattedAmount&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Amount"}),(0,r.jsxs)(d.V,{$isLoading:n,children:[o.formattedAmount," ",t]})]}),"tokenId"in o&&o.tokenId&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token ID"}),(0,r.jsx)(d.V,{children:o.tokenId.toString()})]})]}):null,"safeBatchTransferFrom"===s&&(0,r.jsxs)(r.Fragment,{children:["amounts"in o&&o.amounts&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Amounts"}),(0,r.jsx)(d.V,{children:o.amounts.join(", ")})]}),"tokenIds"in o&&o.tokenIds&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token IDs"}),(0,r.jsx)(d.V,{children:o.tokenIds.join(", ")})]})]}),"approve"===s&&o.spender&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Spender"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:o.spender,url:i?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),("transferFrom"===s||"safeTransferFrom"===s||"safeBatchTransferFrom"===s)&&o.transferFrom&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Transferring from"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:o.transferFrom,url:i?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),("transferFrom"===s||"safeTransferFrom"===s||"safeBatchTransferFrom"===s)&&o.transferTo&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Transferring to"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:o.transferTo,url:i?.blockExplorers?.default?.url,showCopyIcon:!1})})]})]})})},F=({variant:e,setPreventMaliciousTransaction:i,colorScheme:o="light",preventMaliciousTransaction:n})=>"warn"===e?(0,r.jsx)(O,{children:(0,r.jsxs)(L.W,{theme:o,children:[(0,r.jsx)("span",{style:{fontWeight:"500"},children:"Warning: Suspicious transaction"}),(0,r.jsx)("br",{}),"This has been flagged as a potentially deceptive request. Approving could put your assets or funds at risk."]})}):"error"===e?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(O,{children:[(0,r.jsx)(T.E,{theme:o,children:(0,r.jsxs)("div",{children:[(0,r.jsx)("strong",{children:"This is a malicious transaction"}),(0,r.jsx)("br",{}),"This transaction transfers tokens to a known malicious address. Proceeding may result in the loss of valuable assets."]})}),(0,r.jsxs)(B,{children:[(0,r.jsx)(z.C,{color:"var(--privy-color-error)",checked:!n,readOnly:!0,onClick:()=>i(!n)}),(0,r.jsx)("span",{children:"I understand and want to proceed anyways."})]})]})}):null,O=a.z.div`
  margin-top: 1.5rem;
`,B=a.z.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
`,P=({transactionIndex:e,maxIndex:r})=>"number"!=typeof e||0===r?"":` (${e+1} / ${r+1})`,D=(0,a.z)(f.W)`
  ${e=>e.$useSmallMargins?"margin-top: 0.5rem;":"margin-top: 2rem;"}
`,H=(0,a.z)(p.a)`
  margin-top: 0.5rem;
  border: 1px solid var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-sm);
  padding: 0.5rem;
`,W="There was an error preparing your transaction. Your transaction request will likely fail.",Z=a.z.div`
  display: flex;
  width: 100%;
  justify-content: center;
  max-height: 40px;

  > img {
    object-fit: contain;
    border-radius: var(--privy-border-radius-sm);
  }
`,_=a.z.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`,U=a.z.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,q=e=>e?.code===$.$.COMPLIANCE_BLOCKED,G=()=>(0,r.jsxs)(Y,{children:[(0,r.jsx)(ee,{}),(0,r.jsx)(X,{})]}),J=a.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,K=a.z.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.25rem; /* 111.111% */
  text-align: center;
  margin: 10px;
`,Q=a.z.span`
  margin-top: 4px;
  margin-bottom: 10px;
  color: var(--privy-color-foreground-3);
  text-align: center;

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.008px;
`,Y=a.z.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`,X=(0,a.z)(S.f)`
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
`,ei=a.z.span`
  width: 100%;
  text-align: left;
  font-size: 0.825rem;
  color: var(--privy-color-foreground);
  padding: 4px;
`,eo=a.z.div`
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`,en=a.z.text`
  position: relative;
  width: 100%;
  padding: 5px;
  font-size: 0.8rem;
  color: var(--privy-color-foreground-3);
  text-align: left;
  overflow-wrap: break-word;
`,et=a.z.span`
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
`,ea=(0,a.z)(A)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,es=(0,a.z)(C.f)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,el=({clicked:e})=>(0,r.jsx)(e?es:ea,{});e.s(["S",0,({img:e,submitError:a,prepareError:s,onClose:u,action:f,title:b,subtitle:w,to:k,tokenAddress:z,network:T,missingFunds:L,fee:C,from:A,cta:S,disabled:$,chain:E,isSubmitting:I,isPreparing:V,isTokenPriceLoading:M,isTokenContractInfoLoading:O,isSponsored:B,symbol:H,balance:q,onClick:G,transactionDetails:J,transactionIndex:K,maxIndex:Q,onBack:Y,chainName:X,validation:ee,hasScanDetails:er,setIsScanDetailsOpen:ei,preventMaliciousTransaction:eo,setPreventMaliciousTransaction:en,tokensSent:et,tokensReceived:ea,isScanning:es,isCancellable:el,functionName:ec})=>{let{showTransactionDetails:ed,setShowTransactionDetails:eh,hasMoreDetails:ep,isErc20Ish:ex}=(e=>{let[r,o]=(0,i.useState)(!1),n=!0,t=!1;return(!e||e.isErc20Ish||"transaction"===e.action)&&(n=!1),n&&(t=Object.entries(e||{}).some(([e,r])=>r&&!["action","isErc20Ish","isNFTIsh"].includes(e))),{showTransactionDetails:r,setShowTransactionDetails:o,hasMoreDetails:n&&t,isErc20Ish:e?.isErc20Ish}})(J),eu=(0,j.a)(),eg=ex&&O||V||M||es;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.M,{onClose:u,backFn:Y}),e&&(0,r.jsx)(Z,{children:e}),(0,r.jsxs)(v.T,{style:{marginTop:e?"1.5rem":0},children:[b,(0,r.jsx)(P,{maxIndex:Q,transactionIndex:K})]}),(0,r.jsx)(g.S,{children:w}),(0,r.jsxs)(p.a,{style:{marginTop:"2rem"},children:[(!!et[0]||eg)&&(0,r.jsxs)(p.R,{children:[ea.length>0?(0,r.jsx)(d.L,{children:"Send"}):(0,r.jsx)(d.L,{children:"approve"===f?"Approval amount":"Amount"}),(0,r.jsx)("div",{className:"flex flex-col",children:et.map((e,i)=>(0,r.jsx)(R,{iconUrl:e.iconUrl,value:"setApprovalForAll"===ec?"All":e.value,usdValue:e.usdValue,symbol:e.symbol,nftName:e.nftName,nftCount:e.nftCount,decimals:e.decimals},i))})]}),ea.length>0&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Receive"}),(0,r.jsx)("div",{className:"flex flex-col",children:ea.map((e,i)=>(0,r.jsx)(R,{iconUrl:e.iconUrl,value:e.value,usdValue:e.usdValue,symbol:e.symbol,nftName:e.nftName,nftCount:e.nftCount,decimals:e.decimals},i))})]}),J&&"spender"in J&&J?.spender?(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Spender"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:J.spender,url:E?.blockExplorers?.default?.url})})]}):null,k&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"To"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:k,url:E?.blockExplorers?.default?.url,showCopyIcon:!0})})]}),z&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token address"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:z,url:E?.blockExplorers?.default?.url})})]}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Network"}),(0,r.jsx)(d.V,{children:T})]}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Estimated fee"}),(0,r.jsx)(d.V,{$isLoading:V||M||void 0===B,children:B?(0,r.jsxs)(_,{children:[(0,r.jsxs)(U,{children:["Sponsored by ",eu.name]}),(0,r.jsx)(o,{height:16,width:16})]}):C})]}),ep&&!er&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(p.R,{className:"cursor-pointer",onClick:()=>eh(!ed),children:(0,r.jsxs)(d.a,{className:"flex items-center gap-x-1",children:["Details"," ",(0,r.jsx)(t.f,{style:{width:"0.75rem",marginLeft:"0.25rem",transform:ed?"rotate(180deg)":void 0}})]})}),ed&&J&&(0,r.jsx)(N,{action:f,chain:E,transactionDetails:J,isTokenContractInfoLoading:O,symbol:H})]}),er&&(0,r.jsx)(p.R,{children:(0,r.jsxs)(h,{onClick:()=>ei(!0),children:[(0,r.jsx)("span",{className:"text-color-primary",children:"Details"}),(0,r.jsx)(n,{height:"14px",width:"14px",strokeWidth:"2"})]})})]}),(0,r.jsx)(y.G,{}),a?(0,r.jsx)(x.E,{style:{marginTop:"2rem"},children:a.message}):s&&0===K?(0,r.jsx)(x.E,{style:{marginTop:"2rem"},children:s.shortMessage??W}):null,(0,r.jsx)(F,{variant:ee,preventMaliciousTransaction:eo,setPreventMaliciousTransaction:en}),(0,r.jsx)(D,{$useSmallMargins:!(!s&&!a&&"warn"!==ee&&"error"!==ee),address:A,balance:q,errMsg:V||s||a||!L?void 0:`Add funds on ${E?.name??X} to complete transaction.`}),(0,r.jsx)(l.P,{style:{marginTop:"1rem"},loading:I,disabled:$||V,onClick:G,children:S}),el&&(0,r.jsx)(l.E,{style:{marginTop:"1rem"},onClick:u,isSubmitting:!1,children:"Not now"}),(0,r.jsx)(c.B,{})]})},"T",0,({transactionError:e,chainId:o,onClose:n,onRetry:t,chainType:a,transactionHash:s})=>{let{chains:d}=(0,E.u)(),[h,p]=(0,i.useState)(!1),{errorCode:x,errorMessage:u}=((e,r)=>{if("ethereum"===r)return q(e)?{errorCode:"Transaction blocked",errorMessage:e.message}:{errorCode:e.details??e.message,errorMessage:e.shortMessage};let i=e.txSignature,o=e?.transactionMessage||"Something went wrong.";if(Array.isArray(e.logs)){let r=e.logs.find(e=>/insufficient (lamports|funds)/gi.test(e));r&&(o=r)}return{transactionHash:i,errorMessage:o}})(e,a),g=q(e),v=(({chains:e,chainId:r,chainType:i,transactionHash:o})=>{var n;return"ethereum"===i?e.find(e=>e.id===r)?.blockExplorers?.default.url??"https://etherscan.io":(n=o||"",`https://explorer.solana.com/tx/${n}?chain=${r}`)})({chains:d,chainId:o,chainType:a,transactionHash:s});return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.M,{onClose:n}),(0,r.jsxs)(J,{children:[(0,r.jsx)(G,{}),(0,r.jsx)(K,{children:x}),(0,r.jsx)(Q,{children:g?"This transaction cannot be completed.":"Please try again."}),(0,r.jsxs)(eo,{children:[(0,r.jsx)(ei,{children:"Error message"}),(0,r.jsx)(et,{$clickable:!1,children:u})]}),s&&(0,r.jsxs)(eo,{children:[(0,r.jsx)(ei,{children:"Transaction hash"}),(0,r.jsxs)(en,{children:["Copy this hash to view details about the transaction on a"," ",(0,r.jsx)("u",{children:(0,r.jsx)("a",{href:v,children:"block explorer"})}),"."]}),(0,r.jsxs)(et,{$clickable:!0,onClick:async()=>{await navigator.clipboard.writeText(s),p(!0)},children:[s,(0,r.jsx)(el,{clicked:h})]})]}),!g&&(0,r.jsx)(er,{onClick:()=>t({resetNonce:!!s}),children:"Retry transaction"})]}),(0,r.jsx)(c.M,{})]})},"a",0,({img:e,title:n,subtitle:a,cta:f,instructions:b,network:w,blockExplorerUrl:k,isMissingFunds:z,submitError:T,parseError:L,total:C,swap:A,transactingWalletAddress:S,fee:$,balance:E,disabled:R,isSubmitting:I,isPreparing:V,isTokenPriceLoading:M,onClick:N,onClose:F,onBack:O,isSponsored:B})=>{let P=V||M,[q,G]=(0,i.useState)(!1),J=(0,j.a)();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.M,{onClose:F,backFn:O}),e&&(0,r.jsx)(Z,{children:e}),(0,r.jsx)(v.T,{style:{marginTop:e?"1.5rem":0},children:n}),(0,r.jsx)(g.S,{children:a}),(0,r.jsxs)(p.a,{style:{marginTop:"2rem",marginBottom:".5rem"},children:[(C||P)&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Amount"}),(0,r.jsx)(d.V,{$isLoading:P,children:C})]}),A&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Swap"}),(0,r.jsx)(d.V,{children:A})]}),w&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Network"}),(0,r.jsx)(d.V,{children:w})]}),($||P||void 0!==B)&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Estimated fee"}),(0,r.jsx)(d.V,{$isLoading:P,children:B&&!P?(0,r.jsxs)(_,{children:[(0,r.jsxs)(U,{children:["Sponsored by ",J.name]}),(0,r.jsx)(o,{height:16,width:16})]}):$})]})]}),(0,r.jsx)(p.R,{children:(0,r.jsxs)(h,{onClick:()=>G(e=>!e),children:[(0,r.jsx)("span",{children:"Advanced"}),(0,r.jsx)(t.f,{height:"16px",width:"16px",strokeWidth:"2",style:{transition:"all 300ms",transform:q?"rotate(180deg)":void 0}})]})}),q&&(0,r.jsx)(r.Fragment,{children:b.map((e,i)=>"sol-transfer"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(p.R,{children:(0,r.jsxs)(u.L,{children:["Transfer ",e.withSeed?"with seed":""]})}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Amount"}),(0,r.jsxs)(d.V,{children:[(0,s.e)({amount:e.value,decimals:e.token.decimals})," ",e.token.symbol]})]}),!!e.toAccount&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Destination"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.toAccount,url:k})})]})]},i):"spl-transfer"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(p.R,{children:(0,r.jsxs)(u.L,{children:["Transfer ",e.token.symbol]})}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Amount"}),(0,r.jsx)(d.V,{children:e.value.toString()})]}),!!e.fromAta&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Source"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.fromAta,url:k})})]}),!!e.toAta&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Destination"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.toAta,url:k})})]}),!!e.token.address&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.token.address,url:k})})]})]},i):"ata-creation"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(p.R,{children:(0,r.jsx)(u.L,{children:"Create token account"})}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Program ID"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.program,url:k})})]}),!!e.owner&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Owner"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.owner,url:k})})]})]},i):"create-account"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(p.R,{children:(0,r.jsxs)(u.L,{children:["Create account ",e.withSeed?"with seed":""]})}),!!e.account&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Account"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.account,url:k})})]}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Amount"}),(0,r.jsxs)(d.V,{children:[(0,s.e)({amount:e.value,decimals:9})," SOL"]})]})]},i):"spl-init-account"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(p.R,{children:(0,r.jsx)(u.L,{children:"Initialize token account"})}),!!e.account&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Account"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.account,url:k})})]}),!!e.mint&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Mint"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.mint,url:k})})]}),!!e.owner&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Owner"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.owner,url:k})})]})]},i):"spl-close-account"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(p.R,{children:(0,r.jsx)(u.L,{children:"Close token account"})}),!!e.source&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Source"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.source,url:k})})]}),!!e.destination&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Destination"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.destination,url:k})})]}),!!e.owner&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Owner"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.owner,url:k})})]})]},i):"spl-sync-native"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(p.R,{children:(0,r.jsx)(u.L,{children:"Sync native"})}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Program ID"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.program,url:k})})]})]},i):"raydium-swap-base-input"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(p.R,{children:(0,r.jsxs)(u.L,{children:["Raydium swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Amount in"}),(0,r.jsx)(d.V,{children:e.amountIn.toString()})]}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Minimum amount out"}),(0,r.jsx)(d.V,{children:e.minimumAmountOut.toString()})]}),e.mintIn&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token in"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.mintIn,url:k})})]}),e.mintOut&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token out"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.mintOut,url:k})})]})]},i):"raydium-swap-base-output"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(p.R,{children:(0,r.jsxs)(u.L,{children:["Raydium swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Max amount in"}),(0,r.jsx)(d.V,{children:e.maxAmountIn.toString()})]}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Amount out"}),(0,r.jsx)(d.V,{children:e.amountOut.toString()})]}),e.mintIn&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token in"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.mintIn,url:k})})]}),e.mintOut&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token out"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.mintOut,url:k})})]})]},i):"jupiter-swap-shared-accounts-route"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(p.R,{children:(0,r.jsxs)(u.L,{children:["Jupiter swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"In amount"}),(0,r.jsx)(d.V,{children:e.inAmount.toString()})]}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Quoted out amount"}),(0,r.jsx)(d.V,{children:e.quotedOutAmount.toString()})]}),e.mintIn&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token in"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.mintIn,url:k})})]}),e.mintOut&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token out"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.mintOut,url:k})})]})]},i):"jupiter-swap-exact-out-route"===e.type?(0,r.jsxs)(H,{children:[(0,r.jsx)(p.R,{children:(0,r.jsxs)(u.L,{children:["Jupiter swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Quoted in amount"}),(0,r.jsx)(d.V,{children:e.quotedInAmount.toString()})]}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Amount out"}),(0,r.jsx)(d.V,{children:e.outAmount.toString()})]}),e.mintIn&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token in"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.mintIn,url:k})})]}),e.mintOut&&(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Token out"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.mintOut,url:k})})]})]},i):(0,r.jsxs)(H,{children:[(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Program ID"}),(0,r.jsx)(d.V,{children:(0,r.jsx)(m.A,{address:e.program,url:k})})]}),(0,r.jsxs)(p.R,{children:[(0,r.jsx)(d.L,{children:"Data"}),(0,r.jsx)(d.V,{children:e.discriminator})]})]},i))}),(0,r.jsx)(y.G,{}),T?(0,r.jsx)(x.E,{style:{marginTop:"2rem"},children:T.message}):L?(0,r.jsx)(x.E,{style:{marginTop:"2rem"},children:W}):null,(0,r.jsx)(D,{$useSmallMargins:!(!L&&!T),title:"",address:S,balance:E,errMsg:V||L||T||!z?void 0:"Add funds on Solana to complete transaction."}),(0,r.jsx)(l.P,{style:{marginTop:"1rem"},loading:I,disabled:R||V,onClick:N,children:f}),(0,r.jsx)(c.B,{})]})}],494982)},440527,e=>{var r=e.i(732486),i=e.i(653327),o=e.i(574695),n=e.i(352386),t=e.i(689391),a=e.i(995040),s=e.i(294882),l=e.i(744894),c=e.i(950268),d=e.i(691416);let h=(0,t.z)(d.B)`
  && {
    padding: 0.75rem;
    height: 56px;
  }
`,p=t.z.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,x=t.z.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`,u=t.z.div`
  font-size: 12px;
  line-height: 1rem;
  color: var(--privy-color-foreground-3);
`,g=(0,t.z)(l.L)`
  text-align: left;
  margin-bottom: 0.5rem;
`,v=(0,t.z)(s.E)`
  margin-top: 0.25rem;
`,m=(0,t.z)(a.S)`
  && {
    gap: 0.375rem;
    font-size: 14px;
  }
`;e.s(["W",0,({errMsg:e,balance:t,address:a,className:s,title:l,showCopyButton:d=!1})=>{let[f,j]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{if(f){let e=setTimeout(()=>j(!1),3e3);return()=>clearTimeout(e)}},[f]),(0,r.jsxs)("div",{children:[l&&(0,r.jsx)(g,{children:l}),(0,r.jsx)(h,{className:s,$state:e?"error":void 0,children:(0,r.jsxs)(p,{children:[(0,r.jsxs)(x,{children:[(0,r.jsx)(c.A,{address:a,showCopyIcon:!1}),void 0!==t&&(0,r.jsx)(u,{children:t})]}),d&&(0,r.jsx)(m,{onClick:function(e){e.stopPropagation(),navigator.clipboard.writeText(a).then(()=>j(!0)).catch(console.error)},size:"sm",children:(0,r.jsxs)(r.Fragment,f?{children:["Copied",(0,r.jsx)(i.f,{size:14})]}:{children:["Copy",(0,r.jsx)(o.f,{size:14})]})})]})}),e&&(0,r.jsx)(v,{children:e})]})}])},446356,e=>{var r=e.i(732486),i=e.i(91163),o=e.i(689391);let n=o.z.div`
  display: flex;
  gap: 0.5rem;
  background-color: var(--privy-color-warn-bg);
  border: 1px solid var(--privy-color-border-warning);
  align-items: flex-start;
  padding: 0.75rem;
  border-radius: 0.5rem;
  overflow: clip;
  width: 100%;
`,t=o.z.div`
  color: ${e=>"dark"===e.$theme?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
  flex: 1;
  text-align: left;
  font-feature-settings:
    'calt' 0,
    'kern' 0;
`;e.s(["W",0,({children:e,theme:o,className:a})=>(0,r.jsxs)(n,{$theme:o,className:a,children:[(0,r.jsx)(i.f,{width:"16px",height:"16px",color:"var(--privy-color-icon-warning)",strokeWidth:2,style:{flexShrink:0}}),(0,r.jsx)(t,{$theme:o,children:e})]})])},226439,e=>{var r=e.i(732486),i=e.i(689391);let o=i.z.div`
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
`,t=i.z.div`
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
`,s=i.z.div`
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
`;e.s(["N",0,({size:e,centerIcon:i})=>(0,r.jsx)(o,{$size:e,children:(0,r.jsxs)(n,{children:[(0,r.jsx)(a,{}),(0,r.jsx)(s,{}),i?(0,r.jsx)(t,{children:i}):null]})})])},385937,e=>{var r=e.i(352386),i=e.i(565530);let o="0x0000000000000000000000000000000000000000",n="https://api.relay.link",t="https://api.testnets.relay.link",a=async({input:e,isTestnet:r})=>{let i=await fetch((r?t:n)+"/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),o=await i.json();if(!(i.ok||"string"==typeof o.message&&o.message.startsWith("Invalid address")))throw console.error("Relay error:",o),Error(o.message??"Error fetching quote from relay");return o};async function s({transactionHash:e,isTestnet:r}){let i=await fetch((r?t:n)+"/requests/v2?hash="+e),o=await i.json();if(!i.ok){if("message"in o&&"string"==typeof o.message)throw Error(o.message);throw Error("Error fetching request from relay")}return o.requests.at(0)?.status??"pending"}class l extends i.P{constructor(e,r){super("We were unable to complete the bridging transaction. Funds will be refunded on your wallet.",void 0,i.a.TRANSACTION_FAILURE),this.relayLink=r?`https://testnets.relay.link/transaction/${e}`:`https://relay.link/transaction/${e}`}}e.s(["R",0,l,"a",0,e=>{let r=e.steps[0]?.items?.[0];if(r)return{from:r.data.from,to:r.data.to,value:Number(r.data.value),chainId:Number(r.data.chainId),data:r.data.data}},"b",0,"11111111111111111111111111111111","c",0,0x2f3fb341,"d",0,e=>e.steps.flatMap(e=>e.items?.filter(e=>"incomplete"===e.status)??[]).map(e=>({from:e.data.from,to:e.data.to,value:Number(e.data.value),chainId:Number(e.data.chainId),data:e.data.data})),"e",0,"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v","g",0,a,"t",0,({appId:e,originCurrency:r,destinationCurrency:i,...n})=>({tradeType:"EXPECTED_OUTPUT",originCurrency:r??o,destinationCurrency:i??o,referrer:`privy|${e}`,...n}),"u",0,function({transactionHash:e,isTestnet:i,bridgingStatus:o,setBridgingStatus:n,onSuccess:t,onFailure:a}){(0,r.useEffect)(()=>{if(e&&o){if(["delayed","waiting","pending"].includes(o)){let r=setInterval(async()=>{try{let r=await s({transactionHash:e,isTestnet:i});n(r)}catch(e){console.error(e)}},1e3);return()=>clearInterval(r)}"success"===o?t({transactionHash:e}):["refund","failure"].includes(o)&&a({error:new l(e,i)})}},[o,e,i])}])},839094,e=>{let r=new Set(["https:","mailto:"]);e.s(["t",0,function(e){if(!e)return null;try{if(r.has(new URL(e).protocol))return e}catch{}return null}])},691416,e=>{var r=e.i(689391);let i=r.m`
  && {
    border-width: 1px;
    padding: 0.5rem 1rem;
  }

  width: 100%;
  text-align: left;
  border: solid 1px var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-md);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${e=>"error"===e.$state?"\n        border-color: var(--privy-color-error);\n        background: var(--privy-color-error-bg);\n      ":""}
`,o=r.z.div`
  ${i}
`;e.s(["B",0,o,"a",0,i])},78048,e=>{var r=e.i(352386);let i=e=>{let r=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,i)=>i?i.toUpperCase():r.toLowerCase());return r.charAt(0).toUpperCase()+r.slice(1)},o=(...e)=>e.filter((e,r,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===r).join(" ").trim();var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let t=(0,r.forwardRef)(({color:e="currentColor",size:i=24,strokeWidth:t=2,absoluteStrokeWidth:a,className:s="",children:l,iconNode:c,...d},h)=>(0,r.createElement)("svg",{ref:h,...n,width:i,height:i,stroke:e,strokeWidth:a?24*Number(t)/Number(i):t,className:o("lucide",s),...!l&&!(e=>{for(let r in e)if(r.startsWith("aria-")||"role"===r||"title"===r)return!0})(d)&&{"aria-hidden":"true"},...d},[...c.map(([e,i])=>(0,r.createElement)(e,i)),...Array.isArray(l)?l:[l]]));e.s(["f",0,(e,n)=>{let a=(0,r.forwardRef)(({className:a,...s},l)=>(0,r.createElement)(t,{ref:l,iconNode:n,className:o(`lucide-${i(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,a),...s}));return a.displayName=i(e),a}],78048)},653327,e=>{let r=(0,e.i(78048).f)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["f",0,r],653327)},574695,e=>{let r=(0,e.i(78048).f)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["f",0,r],574695)},465120,e=>{let r=(0,e.i(78048).f)("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);e.s(["f",0,r],465120)},332835,e=>{let r=(0,e.i(78048).f)("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);e.s(["f",0,r],332835)}])})();