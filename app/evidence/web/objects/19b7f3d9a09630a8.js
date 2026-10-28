(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,918048,e=>{var i=e.i(732486),t=e.i(636447),r=e.i(995040);e.s(["t",0,function({title:e}){let{currentScreen:n,navigateBack:o,navigate:a,data:d,setModalData:l}=(0,t.u)();return(0,i.jsx)(r.M,{title:e,backFn:"ManualTransferScreen"===n?o:n===d?.funding?.methodScreen?d.funding.comingFromSendTransactionScreen?()=>a("SendTransactionScreen"):void 0:d?.funding?.methodScreen?()=>{let e=d.funding;e.usingDefaultFundingMethod&&(e.usingDefaultFundingMethod=!1),l({funding:e,solanaFundingData:d?.solanaFundingData}),a(e.methodScreen)}:void 0})}])},722060,e=>{var i=e.i(732486),t=e.i(352386),r=e.i(995040),n=e.i(727472),o=e.i(25047),a=e.i(918048),d=e.i(226439),l=e.i(850876),c=e.i(636447),s=e.i(525856),u=e.i(625761),p=e.i(813693);e.i(252494),e.i(785373);let f={component:()=>{let{data:e,setModalData:f}=(0,c.u)(),g=e?.funding,x="solana"===g.chainType,h=(0,t.useRef)(null),{tokenPrice:v}=(0,s.u)(x?"solana":g.chain.id),m=x?void 0:g,y=!(!m?.erc20Address||m?.erc20ContractInfo),b=x?g.isUSDC?"USDC":"SOL":g.erc20Address?g.erc20ContractInfo?.symbol:g.chain.nativeCurrency.symbol||"ETH",z=parseFloat(g.amount),S=!isNaN(z)&&z>0,k=v?(0,u.c)(g.amount,v):void 0;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.t,{}),(0,i.jsx)(l.T,{children:"Confirm or edit amount"}),(0,i.jsxs)(n.F,{style:{marginTop:"32px"},children:[(0,i.jsx)(p.F,{children:y?(0,i.jsx)(d.N,{size:"50px"}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(p.a,{onClick:()=>h.current?.focus(),children:[(0,i.jsx)(p.g,{ref:h,value:g.amount,onChange:i=>{let t=i.target.value;/^[0-9.]*$/.test(t)&&t.split(".").length-1<=1&&f({...e,funding:{...g,amount:t},solanaFundingData:e?.solanaFundingData?{...e.solanaFundingData,amount:t}:void 0})}}),(0,i.jsx)(p.c,{children:b})]}),!m?.erc20Address&&!(x&&g.isUSDC)&&(0,i.jsx)(p.d,{children:k&&S?`${k} USD`:""})]})}),(0,i.jsx)(r.b,{style:{marginTop:"1rem"},disabled:!S,onClick:g.onContinueWithExternalWallet,children:"Continue"})]}),(0,i.jsx)(o.B,{})]})}};e.s(["FundingAmountEditScreen",0,f,"default",0,f])},727472,e=>{var i=e.i(689391);let t=i.z.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: auto;
  gap: 16px;
  flex-grow: 100;
`,r=i.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`,n=i.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,o=(0,i.z)(r)`
  padding: 20px 0;
`,a=(0,i.z)(r)`
  gap: 16px;
`,d=i.z.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,l=i.z.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;i.z.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;let c=i.z.div`
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
`,s=i.z.div`
  height: 16px;
`,u=i.z.div`
  height: 12px;
`;i.z.div`
  position: relative;
`;let p=i.z.div`
  height: ${e=>e.height??"12"}px;
`;i.z.div`
  background-color: var(--privy-color-accent);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-color: white;
  border-width: 2px !important;
`,e.s(["B",0,t,"C",0,o,"F",0,d,"H",0,n,"R",0,u,"S",0,c,"a",0,l,"b",0,s,"c",0,a,"d",0,p,"e",0,r])},850876,e=>{var i=e.i(689391);let t=i.z.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem; /* 166.667% */
  text-align: center;
`;e.s(["T",0,t])},625761,e=>{var i=e.i(156732),t=e.i(748117),r=e.i(336291);let n=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2}),o=(e,t=6,r=!1)=>{let n=parseFloat((0,i.f)(e)).toFixed(t).replace(/0+$/,"").replace(/\.$/,"");return r?n:`${"0"===n?"<0.001":n}`};e.s(["a",0,(e,t)=>{let r,o=(r=t*parseFloat((0,i.f)(e)),n.format(r));return"$0.00"===o?"<$0.01":o},"b",0,(e,i)=>{let{chains:n}=(0,t.u)(),o=`https://etherscan.io/address/${i}`,a=`${(0,r.n)(e,n)}/address/${i}`;try{new URL(a)}catch{return o}return a},"c",0,(e,i)=>{let t,r=(t=i*parseFloat(e),n.format(t));return"$0.00"!==r?r:"<$0.01"},"g",0,(e,i,t=6,r=!1)=>`${o(e,t,r)} ${i}`,"p",0,o,"s",0,e=>e.reduce((e,i)=>e+i,0n)])},813693,e=>{var i=e.i(689391),t=e.i(995040),r=e.i(794193);let n=i.z.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
  padding-bottom: 24px;
`,o=i.z.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    border-radius: var(--privy-border-radius-sm);
  }
`,a=i.z.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`,d=i.z.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 0 16px;
  border-width: 1px !important;
  border-radius: 12px;
  cursor: text;

  &:focus-within {
    border-color: var(--privy-color-accent);
  }
`;i.z.div`
  font-size: 42px !important;
`;let l=i.z.input`
  background-color: var(--privy-color-background);
  width: 100%;

  &:focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  && {
    font-size: 26px;
  }
`,c=(0,i.z)(l)`
  && {
    font-size: 42px;
  }
`;i.z.button`
  cursor: pointer;
  padding-left: 4px;
`;let s=i.z.div`
  font-size: 18px;
`,u=i.z.div`
  font-size: 12px;
  color: var(--privy-color-foreground-3);
  /* we need this container to maintain a static height if there's no content */
  height: 20px;
`;i.z.div`
  display: flex;
  flex-direction: row;
  line-height: 22px;
  font-size: 16px;
  text-align: center;
  svg {
    margin: auto;
  }
`,(0,i.z)(r.LinkButton)`
  margin-top: 16px;
`;let p=i.q`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;(0,i.z)(t.c)`
  border-radius: var(--privy-border-radius-md) !important;
  animation: ${p} 0.3s ease-in-out;
`;let f=i.z.a`
  && {
    color: var(--privy-color-accent);
  }

  cursor: pointer;
`;e.s(["F",0,a,"I",0,o,"a",0,d,"b",0,l,"c",0,s,"d",0,u,"e",0,n,"f",0,f,"g",0,c])},852104,e=>{var i=e.i(352386),t=e.i(748117);e.s(["u",0,({enabled:e=!0}={})=>{let{showFiatPrices:r,getUsdPriceForSol:n}=(0,t.u)(),[o,a]=(0,i.useState)(!0),[d,l]=(0,i.useState)(void 0),[c,s]=(0,i.useState)(void 0);return(0,i.useEffect)(()=>{(async()=>{if(r&&e)try{a(!0);let e=await n();e?s(e):l(Error("Unable to fetch SOL price"))}catch(e){l(e)}finally{a(!1)}else a(!1)})()},[]),{solPrice:c,isSolPriceLoading:o,solPriceError:d}}])},525856,e=>{var i=e.i(352386),t=e.i(178061),r=e.i(933185),n=e.i(748117),o=e.i(852104);e.s(["u",0,function(e){let{tokenPrice:a,isTokenPriceLoading:d,tokenPriceError:l}=(e=>{let{showFiatPrices:o,getUsdTokenPrice:a,chains:d}=(0,n.u)(),[l,c]=(0,i.useState)(!0),[s,u]=(0,i.useState)(void 0),[p,f]=(0,i.useState)(void 0);return(0,i.useEffect)(()=>{e||=r.U;let i=(0,t.i)(d).find(i=>i.id===Number(e));(async()=>{if(o){if(!i)return c(!1),void u(Error(`Unable to fetch token price on chain id ${e}`));try{c(!0);let e=await a(i);e?f(e):u(Error(`Unable to fetch token price on chain id ${i.id}`))}catch(e){u(e)}finally{c(!1)}}else c(!1)})()},[e]),{tokenPrice:p,isTokenPriceLoading:l,tokenPriceError:s}})("solana"===e?-1:e),{solPrice:c,isSolPriceLoading:s,solPriceError:u}=(0,o.u)({enabled:"solana"===e});return"solana"===e?{tokenPrice:c,isTokenPriceLoading:s,tokenPriceError:u}:{tokenPrice:a,isTokenPriceLoading:d,tokenPriceError:l}}])}])})();