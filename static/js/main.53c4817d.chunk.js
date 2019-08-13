(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,n){e.exports=n(34)},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(15),o=n.n(r),i=n(19),l=n(5),u=n(7),s=n(16),m=n.n(s),v=(n(27),function(e){return c.a.createElement("div",{className:"input-hint"},c.a.createElement("input",{className:"form-control",type:"text",value:e.hint,readOnly:!0}),c.a.createElement("input",{onKeyDown:function(t){"Tab"===t.key&&e.onUseHint(t),"Enter"===t.key&&e.onEnter(t)},onChange:e.onChange,className:"form-control",type:"text",value:e.value}))}),f=(n(28),function(e){return c.a.createElement("div",{className:"quote app__content-quotes-item"},c.a.createElement("div",{className:"quote__title"},e.title),c.a.createElement("div",{className:"quote__list"},e.list.map(function(e,t){return c.a.createElement("div",{key:t,className:"quote__verse"},c.a.createElement("div",{className:"quote__verse-number"},e.index),c.a.createElement("div",{className:"quote__verse-text"},e.text))})),c.a.createElement("div",{className:"quote__actions"},c.a.createElement("button",{onClick:function(t){e.onRemove(t)},className:"btn btn-sm btn-danger"},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c")))}),d=n(17),b=n(18),p="https://bible-quotes-api2.herokuapp.com",E=new(function(){function e(){Object(d.a)(this,e)}return Object(b.a)(e,[{key:"getBooks",value:function(){return fetch("".concat(p,"/books")).then(function(e){return e.json()})}},{key:"getVerses",value:function(e){var t=e.bookAbbrev,n=e.topic,a=e.verseStart,c=e.verseEnd;return fetch("".concat(p,"/books/").concat(t,"/").concat(n,"/").concat(a,"-").concat(c)).then(function(e){return e.json()})}}]),e}()),h=(n(29),function(e){var t=Object(a.useState)([]),n=Object(u.a)(t,2),r=n[0],o=n[1],i=Object(a.useState)(!0),l=Object(u.a)(i,2),s=l[0],d=l[1],b=Object(a.useState)("\u041e\u0442 \u041c\u0430\u0442\u0444\u0435\u044f 5:2-3"),p=Object(u.a)(b,2),h=p[0],N=p[1],k=Object(a.useState)(h),_=Object(u.a)(k,2),g=_[0],j=_[1],O=Object(a.useMemo)(function(){return function(e){if(!e)return[];var t=e.split(";"),n=t.length-1;return""===t[n]&&delete t[n],t.map(function(e){var t=e.match(/^(\w+)\((\d+)\:(\d+)-(\d+)\)/);return null===t?null:{bookAbbrev:t[1],topic:t[2],verseStart:t[3],verseEnd:t[4]}})}(e.match.params.path)},[]),x=Object(a.useState)([]),w=Object(u.a)(x,2),y=w[0],S=w[1];function q(e){var t=e.match(/((\d?[\u0430-\u044f\u0410-\u042f]*\s)?[\u0430-\u044f\u0410-\u042f]+)\s+(\d+)\:(\d+)\-(\d+)/);return{bookName:t[1],topic:t[3],verseStart:t[4],verseEnd:t[5]}}var A=function(e){return r.filter(function(t){return t.name===e})[0].abbrev},C=function(e,t){return t.filter(function(t){return t.abbrev===e})[0].name},B=function(e){var t=e.bookName,n=e.topic,a=e.verseStart,c=e.verseEnd;return"".concat(t," ").concat(n,":").concat(a,"-").concat(c)},R=function(e){return E.getVerses(e.options).then(function(t){return new Promise(function(n,a){S(function(a){var c=H(a),r={title:e.title,prev:c,next:null,list:t.data};null!==c&&(c.next=r),d(!1);var o=a.concat(r);return n(o),o})})})},D=function(e){d(!0);var t=q(h),n={bookAbbrev:A(t.bookName),topic:t.topic,verseStart:t.verseStart,verseEnd:t.verseEnd};R({options:n,title:h}).then(function(e){J(e)})},P=0===y.length,U=function(e){var t=e.filter(function(e){return null===e.prev});return 1===t.length?t[0]:null},H=function(e){var t=e.filter(function(e){return null===e.next});return 1===t.length?t[0]:null},I=function(e,t,n){if(null===e)return[];for(var a=[],c=e,r=0;null!==c;r++)a.push(n(c,r)),c=c[t];return a},J=function(t){var n=I(U(t),"next",function(e,t){var n=q(e.title);return function(e){var t=e.bookAbbrev,n=e.topic,a=e.verseStart,c=e.verseEnd;return"".concat(t,"(").concat(n,":").concat(a,"-").concat(c,")")}(Object.assign({},q(e.title),{bookAbbrev:A(n.bookName)}))});e.history.push("/".concat(n.join(";")))};return Object(a.useEffect)(function(){E.getBooks().then(function(e){return new Promise(function(t,n){o(function(n){d(!1);var a=e.data.sort();return t(a),a})})}).then(function(e){!function(e,t){d(!0),e.reduce(function(e,n){return e.then(function(){return R({options:n,title:B(Object.assign({},n,{bookName:C(n.bookAbbrev,t)}))})})},Promise.resolve()).then(function(){d(!1)})}(O,e)})},[]),c.a.createElement("div",{className:"app"},c.a.createElement("div",{className:"app__header"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement(v,{hint:g,value:h,onUseHint:function(e){e.preventDefault(),N(g)},onEnter:D,onChange:function(e){!function(e){for(var t=new RegExp("^".concat(e)),n=e,a=0,c=r.length;a<c;a++)if(t.test(r[a].name)){n=r[a].name;break}j(n)}(e.target.value),N(e.target.value)}})),c.a.createElement("div",{className:"col-auto"},c.a.createElement("button",{className:"btn btn-primary",onClick:D},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"))))),c.a.createElement("div",{id:"content-for-image",className:"app__content"},c.a.createElement("div",{className:"app__content-empty ".concat(!P||s?"hidden":"")},c.a.createElement("div",null,"\u0412\u044b \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u0438\u043b\u0438 \u043d\u0438 \u043e\u0434\u043d\u043e\u0439 \u0446\u0438\u0442\u0430\u0442\u044b")),c.a.createElement("div",{className:"app__content-loading ".concat(s?"":"hidden")},c.a.createElement("div",null,"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 ...")),c.a.createElement("div",null,c.a.createElement("div",{className:"app__content-title ".concat(P||s?"hidden":"")},c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("h2",null,"\u0421\u0438\u043d\u043e\u0434\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u0435\u0440\u0435\u0432\u043e\u0434"))))),c.a.createElement("div",{className:"app__content-quotes ".concat(P||s?"hidden":"")},I(U(y),"next",function(e,t){return c.a.createElement(f,Object.assign({onRemove:function(t){return function(e){d(!0),S(function(t){null!==e.prev&&(e.prev.next=e.next),null!==e.next&&(e.next.prev=e.prev);var n=[].concat(t.slice(0,t.indexOf(e)),t.slice(t.indexOf(e)+1));return J(n),d(!1),n})}(e)},key:t},e))})))),c.a.createElement("div",{className:"app__footer"},c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("button",{className:"btn btn-success btn-block",onClick:function(){m()(document.getElementById("content-for-image")).then(function(e){var t=document.createElement("a");t.download="bible-quotes.png",t.href=e.toDataURL("image/png"),t.click()})}},"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043a\u0430\u043a \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"))))))});o.a.render(c.a.createElement(function(e){return c.a.createElement(i.a,null,c.a.createElement(l.a,{path:"/:path?",component:h}))},null),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.53c4817d.chunk.js.map