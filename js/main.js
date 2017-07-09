let elms = document.getElementsByClassName("example");
let flms = [];
let codeLoadCnt = 0;

Array.prototype.forEach.call(elms, (elm, i)=> {
  let h = elm.clientWidth, w = elm.clientHeight;

  let iframe = createElement(document, "iframe", {scrolling:"no"}, "");
  elm.appendChild(iframe);
  var interval = setInterval(function() {
    var frame = iframe.contentWindow;
    var doc = iframe.contentDocument || iframe.contentWindow.document;
    if(doc.readyState == "complete") {
      clearInterval(interval);
      buildIframeContents(elm, frame, doc, i);
    }
    flms.push(frame);
  }, 100);
});

function buildIframeContents(elm, frame, doc, i) {
  let scriptPath = "js/examples/" + elm.getAttribute("data-embed") + ".js";
  frame.__parent = window;
  frame.__autorun = (i == 0);

  let css = createElement(doc, "link", {href: "css/example.css", rel: "stylesheet"}, "");
  doc.head.appendChild(css);
  appendScript(doc, "js/examples/lib.js")
    .then(()=>{appendScript(doc, scriptPath)
    .then(()=>{appendScript(doc, "js/examples/p5setup.js")
    .then(()=>{appendScript(doc, "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js")
  }) });

  if (i != 0) {
      createExampleFooter(elm, frame, scriptPath);
    }
  });
}

function createExampleFooter(elm, frame, scriptPath) {
  let exampleFooter = createElement(document, "p", {class: "example-footer"}, "");
  let buttonContainer = createElement(document, "div", {class: "button-container"}, "");
  let note = createElement(document, "span", {class: "note"}, "Click the example to run");

  let open = createElement(document, "a", {href: "", class: "button"}, "Show sample code");
  let edit = createElement(document, "a", {href: elm.getAttribute("data-edit"), class: "button", target:"_blank"}, "Edit in Codepen");
  exampleFooter.appendChild(note);
  buttonContainer.appendChild(open);
  buttonContainer.appendChild(edit);
  exampleFooter.appendChild(buttonContainer);
  elm.parentNode.insertBefore(exampleFooter, elm.nextElementSibling);

  let xhr = new XMLHttpRequest();
  xhr.open('GET', scriptPath);
  xhr.onload = ()=> {
    let script = xhr.responseText;
    let re = /\/\*\* (.+) \*\*\//g;
    let match = script.match(re);
    if (match) {
      Array.prototype.forEach.call(match, (s)=>{
      let func = frame[s.split(" ")[1]];
        if (func) {
          script = script.replace(s, func.toString());
        } else {
          console.log("failed replacing comment with code: " + s);
        }
      });
    }

    let text = document.createTextNode(script);
    let code = createElement(document, "code", {}, text);
    let pre = createElement(document, "pre", {class: "javascript"}, code);
    let codeBlock = createElement(document, "div", {class: "code-block hidden"}, pre);

    elm.parentNode.insertBefore(codeBlock, exampleFooter.nextElementSibling);

    open.addEventListener("click", (evt)=>{
      evt.preventDefault();
      if (codeBlock.classList.contains("hidden")) {
          open.innerHTML = "Hide sample code";
        codeBlock.classList.remove("hidden");
      } else {
        open.innerHTML = "Show sample code";
        codeBlock.classList.add("hidden");
      }
    });
    if (--codeLoadCnt == 0) {
      hljs.initHighlightingOnLoad();
    }
  }
  codeLoadCnt ++; xhr.send();
}

function appendScript(doc, path) {
  return new Promise((resolve, reject)=>{
      let script = createElement(doc, "script", {src: path}, "");
      script.onload = ()=>{resolve();};
      doc.head.appendChild(script);
  });
};

function focusExample(flm) {
  for (let i = 0; i < flms.length; i ++) {
    flms[i].stop();
  }
  flm.start();
}

function createElement(doc, tag, attr, content) {
  let elm = doc.createElement(tag);
  Object.keys(attr).forEach(function(key) {
    elm.setAttribute(key, attr[key]);
    var value = this[key];
  });
  if (typeof content == 'string') {
    elm.innerHTML = content;
  } else {
    elm.appendChild(content);
  }
  return elm;
}
