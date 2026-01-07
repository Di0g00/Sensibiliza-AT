document.addEventListener('readystatechange', function (event) {
  if (event.target.readyState === "complete") {

    var head = document.head || document.getElementsByTagName('head')[0];
    var children = head.children


    if (!!document.documentMode) { // IE

      var linkPreloadIdx = -1;

      for (var i = 0; i < children.length; i++) {
        var elem = children[i];
        if (elem.tagName === 'LINK' && elem.rel === 'prerender') {
          linkPreloadIdx = i;
        }
      }

      if (linkPreloadIdx !== -1) {
        for (var j = children.length - 1; j > linkPreloadIdx; j--) {
          var elem = children[j];

          if ((elem.tagName === 'LINK' && (elem.rel === 'stylesheet' || elem.rel === 'modulepreload'))
            || (elem.tagName === 'SCRIPT' && elem.type === 'module')) {
            head.removeChild(elem);
          }
        }
      }


    } else { // !IE

      var scriptIeRemoveTagsIdx = -1;

      for (var j = 0; j < children.length; j++) {
        var elem = children[j];

        if (elem.tagName === 'SCRIPT') {
          var src = elem.src.split('/autentica_static/js/');

          if (src.length > 1 && src[1] === 'ie-remove-tags.js') {
            scriptIeRemoveTagsIdx = j;
            break;
          }
        }
      }

      if (scriptIeRemoveTagsIdx !== -1) {

        for (var k = scriptIeRemoveTagsIdx + 1; k < children.length && children[k].rel !== 'prerender';) {
          head.removeChild(children[k]);
        }

      }

    }

  }
})
