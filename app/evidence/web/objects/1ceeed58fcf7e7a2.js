(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,[915389,659355,t=>{t.i(24727);var e=t.i(641449),i=t.i(165520);t.i(428531);var a=t.i(772072),s=t.i(896343),r=t.i(299055),o=t.i(664216),n=t.i(940697);let l=n.m`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var c=function(t,e,i,a){var s,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,a);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let h=class extends e.f{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&r.f.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&r.f.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&r.f.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&r.f.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&r.f.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&r.f.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&r.f.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&r.f.getSpacingStyles(this.margin,3)};
    `,i.c`<slot></slot>`}};h.styles=[s.e,l],c([(0,a.f)()],h.prototype,"flexDirection",void 0),c([(0,a.f)()],h.prototype,"flexWrap",void 0),c([(0,a.f)()],h.prototype,"flexBasis",void 0),c([(0,a.f)()],h.prototype,"flexGrow",void 0),c([(0,a.f)()],h.prototype,"flexShrink",void 0),c([(0,a.f)()],h.prototype,"alignItems",void 0),c([(0,a.f)()],h.prototype,"justifyContent",void 0),c([(0,a.f)()],h.prototype,"columnGap",void 0),c([(0,a.f)()],h.prototype,"rowGap",void 0),c([(0,a.f)()],h.prototype,"gap",void 0),c([(0,a.f)()],h.prototype,"padding",void 0),c([(0,a.f)()],h.prototype,"margin",void 0),h=c([(0,o.f)("wui-flex")],h),t.s([],659355),t.s([],915389)},192523,t=>{t.i(135618),t.s([])},192234,972853,372288,198060,182384,135618,t=>{t.i(24727);var e=t.i(641449),i=t.i(165520);t.i(428531);var a=t.i(772072);let{I:s}=i.e,r={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},o=t=>(...e)=>({_$litDirective$:t,values:e});class n{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}t.s(["C",0,n,"x",0,r,"l",0,o],972853);let l=(t,e)=>{let i=t._$AN;if(void 0===i)return!1;for(let t of i)t._$AO?.(e,!1),l(t,e);return!0},c=t=>{let e,i;do{if(void 0===(e=t._$AM))break;(i=e._$AN).delete(t),t=e}while(0===i?.size)},h=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),p(e)}};function u(t){void 0!==this._$AN?(c(this),this._$AM=t,h(this)):this._$AM=t}function m(t,e=!1,i=0){let a=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(e)if(Array.isArray(a))for(let t=i;t<a.length;t++)l(a[t],!1),c(a[t]);else null!=a&&(l(a,!1),c(a));else l(this,t)}let p=t=>{t.type==r.CHILD&&(t._$AP??=m,t._$AQ??=u)};class d extends n{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),h(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(l(this,t),c(this))}setValue(t){if(void 0===this._$Ct.strings)this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}t.s(["f",0,d],372288);class v{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}}class g{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(t=>this.Z=t)}resume(){this.Z?.(),this.Y=this.Z=void 0}}let f=t=>null!==t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then,w=o(class extends d{constructor(){super(...arguments),this._$Cwt=0x3fffffff,this._$Cbt=[],this._$CK=new v(this),this._$CX=new g}render(...t){return t.find(t=>!f(t))??i.r}update(t,e){let a=this._$Cbt,s=a.length;this._$Cbt=e;let r=this._$CK,o=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<e.length&&!(t>this._$Cwt);t++){let i=e[t];if(!f(i))return this._$Cwt=t,i;t<s&&i===a[t]||(this._$Cwt=0x3fffffff,s=0,Promise.resolve(i).then(async t=>{for(;o.get();)await o.get();let e=r.deref();if(void 0!==e){let a=e._$Cbt.indexOf(i);a>-1&&a<e._$Cwt&&(e._$Cwt=a,e.setValue(t))}}))}return i.r}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}),y=new class{constructor(){this.cache=new Map}set(t,e){this.cache.set(t,e)}get(t){return this.cache.get(t)}has(t){return this.cache.has(t)}delete(t){this.cache.delete(t)}clear(){this.cache.clear()}};var b=t.i(896343),k=t.i(664216),j=t.i(940697);let x=j.m`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;var $=function(t,e,i,a){var s,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,a);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let S={add:async()=>(await t.A(475526)).addSvg,allWallets:async()=>(await t.A(929280)).allWalletsSvg,arrowBottomCircle:async()=>(await t.A(526966)).arrowBottomCircleSvg,appStore:async()=>(await t.A(19486)).appStoreSvg,apple:async()=>(await t.A(575589)).appleSvg,arrowBottom:async()=>(await t.A(445993)).arrowBottomSvg,arrowLeft:async()=>(await t.A(314114)).arrowLeftSvg,arrowRight:async()=>(await t.A(25271)).arrowRightSvg,arrowTop:async()=>(await t.A(927243)).arrowTopSvg,bank:async()=>(await t.A(778581)).bankSvg,browser:async()=>(await t.A(896969)).browserSvg,card:async()=>(await t.A(422940)).cardSvg,checkmark:async()=>(await t.A(562500)).checkmarkSvg,checkmarkBold:async()=>(await t.A(653515)).checkmarkBoldSvg,chevronBottom:async()=>(await t.A(224739)).chevronBottomSvg,chevronLeft:async()=>(await t.A(429711)).chevronLeftSvg,chevronRight:async()=>(await t.A(358792)).chevronRightSvg,chevronTop:async()=>(await t.A(220195)).chevronTopSvg,chromeStore:async()=>(await t.A(806067)).chromeStoreSvg,clock:async()=>(await t.A(380255)).clockSvg,close:async()=>(await t.A(509337)).closeSvg,compass:async()=>(await t.A(281209)).compassSvg,coinPlaceholder:async()=>(await t.A(522586)).coinPlaceholderSvg,copy:async()=>(await t.A(290258)).copySvg,cursor:async()=>(await t.A(381797)).cursorSvg,cursorTransparent:async()=>(await t.A(533709)).cursorTransparentSvg,desktop:async()=>(await t.A(230450)).desktopSvg,disconnect:async()=>(await t.A(320869)).disconnectSvg,discord:async()=>(await t.A(82916)).discordSvg,etherscan:async()=>(await t.A(920060)).etherscanSvg,extension:async()=>(await t.A(550092)).extensionSvg,externalLink:async()=>(await t.A(125015)).externalLinkSvg,facebook:async()=>(await t.A(355075)).facebookSvg,farcaster:async()=>(await t.A(889278)).farcasterSvg,filters:async()=>(await t.A(65712)).filtersSvg,github:async()=>(await t.A(827633)).githubSvg,google:async()=>(await t.A(988453)).googleSvg,helpCircle:async()=>(await t.A(640625)).helpCircleSvg,image:async()=>(await t.A(565869)).imageSvg,id:async()=>(await t.A(633091)).idSvg,infoCircle:async()=>(await t.A(827708)).infoCircleSvg,lightbulb:async()=>(await t.A(262225)).lightbulbSvg,mail:async()=>(await t.A(825753)).mailSvg,mobile:async()=>(await t.A(481843)).mobileSvg,more:async()=>(await t.A(763235)).moreSvg,networkPlaceholder:async()=>(await t.A(303634)).networkPlaceholderSvg,nftPlaceholder:async()=>(await t.A(323685)).nftPlaceholderSvg,off:async()=>(await t.A(103148)).offSvg,playStore:async()=>(await t.A(491909)).playStoreSvg,plus:async()=>(await t.A(16188)).plusSvg,qrCode:async()=>(await t.A(371367)).qrCodeIcon,recycleHorizontal:async()=>(await t.A(6460)).recycleHorizontalSvg,refresh:async()=>(await t.A(460513)).refreshSvg,search:async()=>(await t.A(789209)).searchSvg,send:async()=>(await t.A(158009)).sendSvg,swapHorizontal:async()=>(await t.A(531978)).swapHorizontalSvg,swapHorizontalMedium:async()=>(await t.A(600500)).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await t.A(515968)).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await t.A(295215)).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await t.A(480784)).swapVerticalSvg,telegram:async()=>(await t.A(122651)).telegramSvg,threeDots:async()=>(await t.A(341838)).threeDotsSvg,twitch:async()=>(await t.A(935076)).twitchSvg,twitter:async()=>(await t.A(658143)).xSvg,twitterIcon:async()=>(await t.A(863026)).twitterIconSvg,verify:async()=>(await t.A(795819)).verifySvg,verifyFilled:async()=>(await t.A(866877)).verifyFilledSvg,wallet:async()=>(await t.A(383241)).walletSvg,walletConnect:async()=>(await t.A(864550)).walletConnectSvg,walletConnectLightBrown:async()=>(await t.A(864550)).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await t.A(864550)).walletConnectBrownSvg,walletPlaceholder:async()=>(await t.A(615978)).walletPlaceholderSvg,warningCircle:async()=>(await t.A(791349)).warningCircleSvg,x:async()=>(await t.A(658143)).xSvg,info:async()=>(await t.A(425647)).infoSvg,exclamationTriangle:async()=>(await t.A(628773)).exclamationTriangleSvg,reown:async()=>(await t.A(578666)).reownSvg};async function A(t){if(y.has(t))return y.get(t);let e=(S[t]??S.copy)();return y.set(t,e),e}let P=class extends e.f{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`
      --local-color: var(--wui-color-${this.color});
      --local-width: var(--wui-icon-size-${this.size});
      --local-aspect-ratio: ${this.aspectRatio}
    `,i.c`${w(A(this.name),i.c`<div class="fallback"></div>`)}`}};P.styles=[b.e,b.G,x],$([(0,a.f)()],P.prototype,"size",void 0),$([(0,a.f)()],P.prototype,"name",void 0),$([(0,a.f)()],P.prototype,"color",void 0),$([(0,a.f)()],P.prototype,"aspectRatio",void 0),P=$([(0,k.f)("wui-icon")],P),t.s([],192234);var z=e;let _=o(class extends n{constructor(t){if(super(t),t.type!==r.ATTRIBUTE||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t))),e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}let a=t.element.classList;for(let t of this.st)t in e||(a.remove(t),this.st.delete(t));for(let t in e){let i=!!e[t];i===this.st.has(t)||this.nt?.has(t)||(i?(a.add(t),this.st.add(t)):(a.remove(t),this.st.delete(t)))}return i.r}});t.s(["f",0,_],198060),t.s([],182384);let C=j.m`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;var T=function(t,e,i,a){var s,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,a);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let R=class extends z.f{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){let t={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,i.c`<slot class=${_(t)}></slot>`}};R.styles=[b.e,C],T([(0,a.f)()],R.prototype,"variant",void 0),T([(0,a.f)()],R.prototype,"color",void 0),T([(0,a.f)()],R.prototype,"align",void 0),T([(0,a.f)()],R.prototype,"lineClamp",void 0),R=T([(0,k.f)("wui-text")],R),t.s([],135618)},307060,t=>{t.i(24727);var e=t.i(641449),i=t.i(165520);t.i(428531);var a=t.i(772072),s=t.i(896343),r=t.i(664216),o=t.i(940697);let n=o.m`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;var l=function(t,e,i,a){var s,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,a);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let c=class extends e.f{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,i.c`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};c.styles=[s.e,s.G,n],l([(0,a.f)()],c.prototype,"src",void 0),l([(0,a.f)()],c.prototype,"alt",void 0),l([(0,a.f)()],c.prototype,"size",void 0),c=l([(0,r.f)("wui-image")],c),t.s([],307060)},381921,820841,t=>{t.i(24727);var e=t.i(641449),i=t.i(165520);t.i(428531);var a=t.i(772072),s=t.i(896343),r=t.i(664216),o=t.i(940697);let n=o.m`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`;var l=function(t,e,i,a){var s,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,a);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let c=class extends e.f{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText=`--local-color: ${"inherit"===this.color?"inherit":`var(--wui-color-${this.color})`}`,this.dataset.size=this.size,i.c`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};c.styles=[s.e,n],l([(0,a.f)()],c.prototype,"color",void 0),l([(0,a.f)()],c.prototype,"size",void 0),c=l([(0,r.f)("wui-loading-spinner")],c),t.s([],381921),t.i(192234),t.s([],820841)},809090,t=>{t.i(24727);var e=t.i(641449),i=t.i(165520);t.i(428531);var a=t.i(772072);t.i(192234);var s=t.i(896343),r=t.i(664216),o=t.i(940697);let n=o.m`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`;var l=function(t,e,i,a){var s,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,a);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let c=class extends e.f{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){let t=this.iconSize||this.size,e="lg"===this.size,a="xl"===this.size,s="gray"===this.background,r="opaque"===this.background,o="accent-100"===this.backgroundColor&&r||"success-100"===this.backgroundColor&&r||"error-100"===this.backgroundColor&&r||"inverse-100"===this.backgroundColor&&r,n=`var(--wui-color-${this.backgroundColor})`;return o?n=`var(--wui-icon-box-bg-${this.backgroundColor})`:s&&(n=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${n};
       --local-bg-mix: ${o||s?"100%":e?"12%":"16%"};
       --local-border-radius: var(--wui-border-radius-${e?"xxs":a?"s":"3xl"});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,i.c` <wui-icon color=${this.iconColor} size=${t} name=${this.icon}></wui-icon> `}};c.styles=[s.e,s.j,n],l([(0,a.f)()],c.prototype,"size",void 0),l([(0,a.f)()],c.prototype,"backgroundColor",void 0),l([(0,a.f)()],c.prototype,"iconColor",void 0),l([(0,a.f)()],c.prototype,"iconSize",void 0),l([(0,a.f)()],c.prototype,"background",void 0),l([(0,a.f)({type:Boolean})],c.prototype,"border",void 0),l([(0,a.f)()],c.prototype,"borderColor",void 0),l([(0,a.f)()],c.prototype,"icon",void 0),c=l([(0,r.f)("wui-icon-box")],c),t.s([],809090)},625427,t=>{t.i(24727);var e=t.i(641449),i=t.i(165520);t.i(428531);var a=t.i(772072);t.i(135618);var s=t.i(896343),r=t.i(664216),o=t.i(940697);let n=o.m`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`;var l=function(t,e,i,a){var s,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,a);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let c=class extends e.f{constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;let t="md"===this.size?"mini-700":"micro-700";return i.c`
      <wui-text data-variant=${this.variant} variant=${t} color="inherit">
        <slot></slot>
      </wui-text>
    `}};c.styles=[s.e,n],l([(0,a.f)()],c.prototype,"variant",void 0),l([(0,a.f)()],c.prototype,"size",void 0),c=l([(0,r.f)("wui-tag")],c),t.s([],625427)},299055,t=>{t.s(["f",0,{getSpacingStyles:(t,e)=>Array.isArray(t)?t[e]?`var(--wui-spacing-${t[e]})`:void 0:"string"==typeof t?`var(--wui-spacing-${t})`:void 0,getFormattedDate:t=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t),getHostName(t){try{return new URL(t).hostname}catch(t){return""}},getTruncateString:({string:t,charsStart:e,charsEnd:i,truncate:a})=>t.length<=e+i?t:"end"===a?`${t.substring(0,e)}...`:"start"===a?`...${t.substring(t.length-i)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(i))}`,generateAvatarColors(t){let e=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),i=this.hexToRgb(e),a=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),s=100-3*Number(a?.replace("px","")),r=`${s}% ${s}% at 65% 40%`,o=[];for(let t=0;t<5;t+=1){let e=this.tintColor(i,.15*t);o.push(`rgb(${e[0]}, ${e[1]}, ${e[2]})`)}return`
    --local-color-1: ${o[0]};
    --local-color-2: ${o[1]};
    --local-color-3: ${o[2]};
    --local-color-4: ${o[3]};
    --local-color-5: ${o[4]};
    --local-radial-circle: ${r}
   `},hexToRgb(t){let e=parseInt(t,16);return[e>>16&255,e>>8&255,255&e]},tintColor(t,e){let[i,a,s]=t;return[Math.round(i+(255-i)*e),Math.round(a+(255-a)*e),Math.round(s+(255-s)*e)]},isNumber:t=>/^[0-9]+$/u.test(t),getColorTheme:t=>t?t:"u">typeof window&&window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)")?.matches?"dark":"light":"dark",splitBalance(t){let e=t.split(".");return 2===e.length?[e[0],e[1]]:["0","00"]},roundNumber:(t,e,i)=>t.toString().length>=e?Number(t).toFixed(i):t,formatNumberToLocalString:(t,e=2)=>void 0===t?"0.00":"number"==typeof t?t.toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e}):parseFloat(t).toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e})}])},664216,t=>{t.s(["f",0,function(t){return function(e){return"function"==typeof e?(customElements.get(t)||customElements.define(t,e),e):function(t,e){let{kind:i,elements:a}=e;return{kind:i,elements:a,finisher(e){customElements.get(t)||customElements.define(t,e)}}}(t,e)}}])},745759,(t,e,i)=>{var a={single_source_shortest_paths:function(t,e,i){var s,r,o,n,l,c,h,u={},m={};m[e]=0;var p=a.PriorityQueue.make();for(p.push(e,0);!p.empty();)for(o in r=(s=p.pop()).value,n=s.cost,l=t[r]||{})l.hasOwnProperty(o)&&(c=n+l[o],h=m[o],(void 0===m[o]||h>c)&&(m[o]=c,p.push(o,c),u[o]=r));if(void 0!==i&&void 0===m[i])throw Error(["Could not find a path from ",e," to ",i,"."].join(""));return u},extract_shortest_path_from_predecessor_list:function(t,e){for(var i=[],a=e;a;)i.push(a),t[a],a=t[a];return i.reverse(),i},find_path:function(t,e,i){var s=a.single_source_shortest_paths(t,e,i);return a.extract_shortest_path_from_predecessor_list(s,i)},PriorityQueue:{make:function(t){var e,i=a.PriorityQueue,s={};for(e in t=t||{},i)i.hasOwnProperty(e)&&(s[e]=i[e]);return s.queue=[],s.sorter=t.sorter||i.default_sorter,s},default_sorter:function(t,e){return t.cost-e.cost},push:function(t,e){this.queue.push({value:t,cost:e}),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};e.exports=a},428531,772072,601908,t=>{var e=t.i(289795);let i={attribute:!0,type:String,converter:e.s,reflect:!1,hasChanged:e.e};function a(t){return(e,a)=>{let s;return"object"==typeof a?((t=i,e,a)=>{let{kind:s,metadata:r}=a,o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(a.name,t),"accessor"===s){let{name:i}=a;return{set(a){let s=e.get.call(this);e.set.call(this,a),this.requestUpdate(i,s,t,!0,a)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===s){let{name:i}=a;return function(a){let s=this[i];e.call(this,a),this.requestUpdate(i,s,t,!0,a)}}throw Error("Unsupported decorator location: "+s)})(t,e,a):(s=e.hasOwnProperty(a),e.constructor.createProperty(a,t),s?Object.getOwnPropertyDescriptor(e,a):void 0)}}t.s(["f",0,a],772072),t.s(["f",0,function(t){return a({...t,state:!0,attribute:!1})}],601908),t.s([],428531)},372412,628850,t=>{var e=t.i(165520);t.s(["f",0,t=>t??e.i],628850),t.s([],372412)}],475526,t=>{t.v(e=>Promise.all(["static/immutable/chunks/347ckoub57hki.js"].map(e=>t.l(e))).then(()=>e(600591)))},929280,t=>{t.v(e=>Promise.all(["static/immutable/chunks/210w5esjg5ed7.js"].map(e=>t.l(e))).then(()=>e(856785)))},19486,t=>{t.v(e=>Promise.all(["static/immutable/chunks/166hg2v9ydtcd.js"].map(e=>t.l(e))).then(()=>e(392399)))},575589,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1zr4brtftlqm5.js"].map(e=>t.l(e))).then(()=>e(666731)))},526966,t=>{t.v(e=>Promise.all(["static/immutable/chunks/32zbruktou8f8.js"].map(e=>t.l(e))).then(()=>e(741939)))},445993,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0cey_60k-b1ou.js"].map(e=>t.l(e))).then(()=>e(89298)))},314114,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3itj95q1afens.js"].map(e=>t.l(e))).then(()=>e(451844)))},25271,t=>{t.v(e=>Promise.all(["static/immutable/chunks/2t80pxis35aus.js"].map(e=>t.l(e))).then(()=>e(313018)))},927243,t=>{t.v(e=>Promise.all(["static/immutable/chunks/15iu5edwsp7d8.js"].map(e=>t.l(e))).then(()=>e(753954)))},778581,t=>{t.v(e=>Promise.all(["static/immutable/chunks/16mcrunz22jj9.js"].map(e=>t.l(e))).then(()=>e(387202)))},896969,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0y3k94u7kvkb8.js"].map(e=>t.l(e))).then(()=>e(647476)))},422940,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3uzicqvp760f-.js"].map(e=>t.l(e))).then(()=>e(284947)))},653515,t=>{t.v(e=>Promise.all(["static/immutable/chunks/2whyj50zc2wuv.js"].map(e=>t.l(e))).then(()=>e(670487)))},562500,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3vl3hms2tzpeb.js"].map(e=>t.l(e))).then(()=>e(300644)))},224739,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1bvgxl77__wep.js"].map(e=>t.l(e))).then(()=>e(606803)))},429711,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0wsv7pjpf4ntg.js"].map(e=>t.l(e))).then(()=>e(946931)))},358792,t=>{t.v(e=>Promise.all(["static/immutable/chunks/2egphv-dyyr1a.js"].map(e=>t.l(e))).then(()=>e(588619)))},220195,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3ss2prp18dax5.js"].map(e=>t.l(e))).then(()=>e(693548)))},806067,t=>{t.v(e=>Promise.all(["static/immutable/chunks/2b_zd0l31gqy6.js"].map(e=>t.l(e))).then(()=>e(915025)))},380255,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3w48f6lmqxbp1.js"].map(e=>t.l(e))).then(()=>e(389556)))},509337,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3v-1q_eh-tz7t.js"].map(e=>t.l(e))).then(()=>e(679962)))},522586,t=>{t.v(e=>Promise.all(["static/immutable/chunks/38mnl8r6zk256.js"].map(e=>t.l(e))).then(()=>e(596607)))},281209,t=>{t.v(e=>Promise.all(["static/immutable/chunks/09z0wilnc3ttt.js"].map(e=>t.l(e))).then(()=>e(482365)))},290258,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0m2cxqjw91svj.js"].map(e=>t.l(e))).then(()=>e(272291)))},533709,t=>{t.v(e=>Promise.all(["static/immutable/chunks/10ykelwo8vg5y.js"].map(e=>t.l(e))).then(()=>e(162984)))},381797,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1c7cen8x3unyp.js"].map(e=>t.l(e))).then(()=>e(736446)))},230450,t=>{t.v(e=>Promise.all(["static/immutable/chunks/34s_8wri_zjug.js"].map(e=>t.l(e))).then(()=>e(908639)))},320869,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3tod0hd4zk_z_.js"].map(e=>t.l(e))).then(()=>e(321530)))},82916,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0twe206ezxq40.js"].map(e=>t.l(e))).then(()=>e(709866)))},920060,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0acdj_cvvmlbi.js"].map(e=>t.l(e))).then(()=>e(199468)))},628773,t=>{t.v(e=>Promise.all(["static/immutable/chunks/2c0bqsfy7jmxq.js"].map(e=>t.l(e))).then(()=>e(582606)))},550092,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0ymq1_1co4-3d.js"].map(e=>t.l(e))).then(()=>e(739635)))},125015,t=>{t.v(e=>Promise.all(["static/immutable/chunks/00yeww-peb5u-.js"].map(e=>t.l(e))).then(()=>e(627278)))},355075,t=>{t.v(e=>Promise.all(["static/immutable/chunks/09j68rof1il_j.js"].map(e=>t.l(e))).then(()=>e(731870)))},889278,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1tog1oj4bo3hb.js"].map(e=>t.l(e))).then(()=>e(283315)))},65712,t=>{t.v(e=>Promise.all(["static/immutable/chunks/42pjec307o0x8.js"].map(e=>t.l(e))).then(()=>e(604246)))},827633,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1bkjuj--2xgxx.js"].map(e=>t.l(e))).then(()=>e(766761)))},988453,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0hxpa5ugaovty.js"].map(e=>t.l(e))).then(()=>e(243375)))},640625,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0ct34r8qqamju.js"].map(e=>t.l(e))).then(()=>e(543488)))},633091,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3lkbz6k2xsg2k.js"].map(e=>t.l(e))).then(()=>e(570824)))},565869,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0y_5axoa_2ekn.js"].map(e=>t.l(e))).then(()=>e(612088)))},827708,t=>{t.v(e=>Promise.all(["static/immutable/chunks/21818qd07q527.js"].map(e=>t.l(e))).then(()=>e(842676)))},425647,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0g_4pkdrnbq7q.js"].map(e=>t.l(e))).then(()=>e(662246)))},262225,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0nko5pdukt6r9.js"].map(e=>t.l(e))).then(()=>e(267125)))},825753,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0ft6wowojwq_r.js"].map(e=>t.l(e))).then(()=>e(523609)))},481843,t=>{t.v(e=>Promise.all(["static/immutable/chunks/402xz5zkk268s.js"].map(e=>t.l(e))).then(()=>e(819344)))},763235,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3mfzwtryy45_s.js"].map(e=>t.l(e))).then(()=>e(727566)))},303634,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1zx18cefnvzdv.js"].map(e=>t.l(e))).then(()=>e(486401)))},323685,t=>{t.v(e=>Promise.all(["static/immutable/chunks/430ulwddew2bu.js"].map(e=>t.l(e))).then(()=>e(852288)))},103148,t=>{t.v(e=>Promise.all(["static/immutable/chunks/08i1k_1ei9gbc.js"].map(e=>t.l(e))).then(()=>e(664499)))},491909,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3a-k87ocoil90.js"].map(e=>t.l(e))).then(()=>e(807559)))},16188,t=>{t.v(e=>Promise.all(["static/immutable/chunks/02_h4hb5ssp4j.js"].map(e=>t.l(e))).then(()=>e(457046)))},371367,t=>{t.v(e=>Promise.all(["static/immutable/chunks/19ugk8tpmmaz2.js"].map(e=>t.l(e))).then(()=>e(860782)))},6460,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3ohw-79pzla8s.js"].map(e=>t.l(e))).then(()=>e(262144)))},460513,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1ux0xg_d8t4sv.js"].map(e=>t.l(e))).then(()=>e(354294)))},578666,t=>{t.v(e=>Promise.all(["static/immutable/chunks/2uwp3tpxxwks4.js"].map(e=>t.l(e))).then(()=>e(409043)))},789209,t=>{t.v(e=>Promise.all(["static/immutable/chunks/2q1793vv93o60.js"].map(e=>t.l(e))).then(()=>e(819640)))},158009,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1_hkik2hnng7k.js"].map(e=>t.l(e))).then(()=>e(861517)))},531978,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3htr8a6b-a9wg.js"].map(e=>t.l(e))).then(()=>e(942295)))},515968,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1ovsh_adho1l2.js"].map(e=>t.l(e))).then(()=>e(653215)))},600500,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0711qagwf69sq.js"].map(e=>t.l(e))).then(()=>e(949885)))},295215,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3ev5jmf2xb1vf.js"].map(e=>t.l(e))).then(()=>e(823935)))},480784,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0f0-uzxdudmwz.js"].map(e=>t.l(e))).then(()=>e(209228)))},122651,t=>{t.v(e=>Promise.all(["static/immutable/chunks/04kozhb1_9ur_.js"].map(e=>t.l(e))).then(()=>e(299097)))},341838,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0l_15mu-x14io.js"].map(e=>t.l(e))).then(()=>e(783537)))},935076,t=>{t.v(e=>Promise.all(["static/immutable/chunks/10iqyvcck7zwd.js"].map(e=>t.l(e))).then(()=>e(525861)))},863026,t=>{t.v(e=>Promise.all(["static/immutable/chunks/04xagrk7nntj7.js"].map(e=>t.l(e))).then(()=>e(272964)))},866877,t=>{t.v(e=>Promise.all(["static/immutable/chunks/0wf4w16panth3.js"].map(e=>t.l(e))).then(()=>e(603880)))},795819,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1kb97jm0shehv.js"].map(e=>t.l(e))).then(()=>e(436712)))},615978,t=>{t.v(e=>Promise.all(["static/immutable/chunks/22fd9btujyd30.js"].map(e=>t.l(e))).then(()=>e(881706)))},383241,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1k_0cpuwh1nzw.js"].map(e=>t.l(e))).then(()=>e(664104)))},864550,t=>{t.v(e=>Promise.all(["static/immutable/chunks/1e1rtezrusfy-.js"].map(e=>t.l(e))).then(()=>e(193454)))},791349,t=>{t.v(e=>Promise.all(["static/immutable/chunks/3dva-ga-4mhfq.js"].map(e=>t.l(e))).then(()=>e(172145)))},658143,t=>{t.v(e=>Promise.all(["static/immutable/chunks/19_9dgs4_3x3j.js"].map(e=>t.l(e))).then(()=>e(649768)))}]);