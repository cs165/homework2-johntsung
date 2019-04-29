const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};
//the messenge could have endline.
const MATCH_LIST_ENDLINE={
  'there\n': 'their\n',
  'their\n': 'there\n',
  'they\'re\n': 'there\n',
  'There\n': 'Their\n',
  'Their\n': 'There\n',
  'They\'re\n': 'There\n',
  'THERE\n': 'THEIR\n',
  'THEIR\n': 'THERE\n',
  'THEY\'RE\n': 'THERE\n'
};


function transformTextNodes(node){
  if(node.nodeType===Node.TEXT_NODE){
    const checkSpace = node.textContent.trim();
    if(checkSpace !== ""){
      var theword = node.textContent.split(' ');

      for(var i=0;i<theword.length;i++){
        if(MATCH_LIST[theword[i]] !== undefined){
          console.log(theword[i]+' change to '+MATCH_LIST[theword[i]]);
          theword[i] = MATCH_LIST[theword[i]];
        }
        else if(MATCH_LIST_ENDLINE[theword[i]] !== undefined){
          console.log(theword[i]+' change to '+MATCH_LIST_ENDLINE[theword[i]]);
          theword[i] = MATCH_LIST_ENDLINE[theword[i]];
        }
        // split the word
        if(theword[i] !== "\n"){
          theword[i] = theword[i]+' ';
        }

      }
      node.textContent = theword.join('');
    }
  }
  for(const child of node.childNodes){
		transformTextNodes(child);
	}
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
console.log('Extension updated');
