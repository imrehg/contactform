/**
 * move single top selected element from selectObj1 to selectObj2
 */
/*
function swapIt(selectObj1, selectObj2)
{
  var selectItem = selectObj1.selectedIndex;
  //alert(selectItem);
  if (selectItem == -1) {
     alert("No data be selected");
     return;
  }
  var text = selectObj1.options[selectItem].text;
  var value = selectObj1.options[selectItem].value;
  //alert(selectObj1.options[selectItem].text);

  selectObj2.options[selectObj2.length] = new Option(text, value, false, true);
  selectObj1.options[selectItem] = null;
}
*/

/**
 * move all selected element from selectObj1 to selectObj2
 */
/*
function swapThem(selectObj1, selectObj2)  // multiple
{
  var selectItem = selectObj1.selectedIndex;
  //alert(selectItem);
  if (selectItem == -1) {
     alert("No data be selected");
     return;
  }

  var strTexts = "", strValues = "";
  var text, value;
  var count=0;
  var delArray = new Array();

  for (i=0; i < selectObj1.options.length; i++) {
	if (selectObj1.options[i].selected == true) {
	    text = selectObj1.options[i].text;
        value = selectObj1.options[i].value;
		strTexts += text;
        strValues += value;
        selectObj2.options[selectObj2.length] = new Option(text, value, false, true);
        delArray[count] = i;
        count++;
	}
  }
  for (i=0; i < delArray.length; i++) {
     //alert(selectObj1.options[delArray[i]-i].text);
     selectObj1.options[delArray[i]-i] = null;
     //alert(selectObj1.options.length);
  }
}
*/

/**
 * check is input valid data of [ &, <, >, ", ' ]
 */
function isValidInputData(objField, alertMsg)
{
   objField.value = trimString(objField.value);
   var str = objField.value;
   var i, ch, chCode;
   var isOk = true;
   for (i=0; i<str.length; i++) {
      //ch = str.charAt(i);
      chCode = str.charCodeAt(i);
      if (chCode > 126) {
         ok = false;
         break;
      }
      // [&]=038, [<]=060, [>]=062, ["]=034, [']=039
      if (chCode == 34 || chCode == 39 ||  chCode == 38 || chCode == 60 || chCode == 62) {
         ok = false;
         break;
      }
   }
   if (!ok) {
      if (alertMsg != "") {
          alert(alertMsg);
      }
      objField.focus();
   }
   return ok;
}


/**
 * get Option Selected Index
 */
function getOptionSelectIdx(optionField) // single selected
{
   return optionField.value;
   //return optionField.selectedIndex;

	/*
   alert("optionField.selectedIndex=" + optionField.selectedIndex);
   var selectedIdx = -1;
   for (var i=0; i<optionField.options.length; i++) {
         if (optionField.options[i].selected == true) {
             selectedIdx = i;
             break;
         }
   }
   alert("optionField.options.length=" + optionField.options.length + ", selectedIdx=" + selectedIdx);
   return selectedIdx;
   */

}


/**
 * get Radio Checked Index
 */
function getRadioCheckIdx(radioField)
{
   var checkedIdx = -1;

   if (radioField.length == null || radioField.length <= 1) {          // single item
       if (radioField.checked == true) {
           checkedIdx = 0;
       }
   }
   else {                                 // array item
       for (var i=0; i<radioField.length; i++) {
           if (radioField[i].checked == true) {
               checkedIdx = i;
               break;
           }
       }
   }
   return checkedIdx;
}


/**
 * is No Option Selected
 */
function noOptionSelected(optionField, alertMsg)
{
  if (getOptionSelectIdx(optionField) == -1) {
    if (alertMsg != "") {
      alert(alertMsg);
    }
    optionField.focus();
    return true;
  }
  return false;
}


/**
 * is No Radio Checked
 */
function noRadioChecked(radioField, alertMsg)
{
  if (getRadioCheckIdx(radioField) == -1) {
    if (alertMsg != "") {
      alert(alertMsg);
    }
    return true;
  }

  return false;
}


/**
 * is Empty
 */
function isEmpty(objField, alertMsg)
{
   objField.value = trimString(objField.value);
   if (objField.value == "") {
      if (alertMsg != "") {
          alert(alertMsg);
      }
      objField.focus();
      return true;
   }
   else {
      return false;
   }
}


/**
 * Mark Select All
 */
function markSelectAll(selectObj)
{
  for (i=0; i < selectObj.options.length; i++) {
	 selectObj.options[i].selected = true;
  }
}


/**
 * Trim String
 */
function trimString(str)
{
  if (str.length == 0) return str;
  while (str.charAt(0) == ' ') {
    str = str.substring(1);
  }
  while (str.charAt(str.length - 1) == ' ') {
    str = str.substring(0, str.length - 1);
  }
  return str;
}


/**
 * Check Email

function checkEmail(objField)
{
	if(isEmpty(objField, "Please input [Mail Address] !!!")){
		return true;
	}
	var email = objField.value;
	if(email.indexOf("@")==-1 || email.indexOf(",")!=-1 || email.substr(1,1)=="@" || email.substr(email.length-1,1)=="@")
	{
		alert("E-Mail format not correct!");
		objField.focus();
		return true;
	} else {
		return false;
	}
}
*/

/**
 * Check Email
 */
function checkEmail(objField)
{
   if(isEmpty(objField, "Please input [Mail Address] !!!")){
     return true;
   }
   var email = objField.value;
   var rege = /^([a-zA-Z0-9_\.\-\'])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9])+$/;
   if (!rege.test(email))
   {
      alert("E-Mail format not correct!");
      objField.focus();  
      return true;
   }else{
     return false;
   }
}


/**
 * Check Password
 */
function checkPW(objField)
{
  if(isEmpty(objField, "Please input [Password] !!!")){
    return true;
  }
  var password = objField.value;
  var i = 0;
  while (i < password.value.length)
  {
    var ch = password.value.substring(i++, i);
    if (!((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z") || ch == ' '))
    {
      alert("Please input character a-z & A-Z !");
      password.value = "";
      return true;
    }
  }
	return false;
}

//------------- Start Open Window Functions ----------//
// <a href="javascript:openImgWin('...');">picture</a>
function openImgWin(actionURL)
{
   var win = window.open(actionURL,"image_window","width=200,height=260,menubar=no, toolbar=no,scrollbars=yes,resizable=yes");
   win.focus();
}

function openFormWin(actionURL)
{
   var win = window.open(actionURL,"form_window","left=0, top=0, width=520, height=440, scrollbars=yes, resizable=yes, status=no, location=no");
   win.focus();
}

function openFormWin(actionURL, width, height)
{
   var win = window.open(actionURL,"form_window","left=0, top=0, width="+ width +", height="+ height +", scrollbars=yes, resizable=yes, status=no, location=no");
   win.focus();
}
// -------- End Open Window Functions -----------//