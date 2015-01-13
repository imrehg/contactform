var isIE=navigator.userAgent.indexOf("MSIE")>0;;
var isFirefox=navigator.userAgent.indexOf("Firefox")>0;

function check_mail(email_address) {
  //==========Check Other Char==========
      var i = 0;
      while (i < email_address.length) {
          var ch = email_address.substring(i++, i);
          if (!(ch == "-" || ch == "_" || ch == "." || (ch >= "0" && ch <= "9") ||
          (ch >= "@" && ch <= "Z") || (ch >= "a" && ch <= "z"))) {
              return(false);
          }
      }
      //==========Check Mail Format==========
      pos = email_address.indexOf("@");
      var chname = email_address.substring(0, pos);
      var chhost = email_address.substring(pos + 1, email_address.length);
      if (chname.length == 0  ||
      chhost.length == (chhost.lastIndexOf(".") + 1) ||
      chhost.indexOf("@") != -1 || chhost.indexOf(".") <= 0) {
          return(false);
      } else {
          pos = chhost.indexOf(".");
          while (chhost.indexOf(".", pos+1) != -1) {
              if ((pos+1) == chhost.indexOf(".", pos+1)) {
                  return(false);
              }
              pos = chhost.indexOf(".", pos+1);
          }
      }
      return(true);
  }
  
  var country = "";
  
  function showCity() {
      country = document.getElementsByName("countryId")[0].value;
      var length = (country.indexOf('/'));
      country = country.substring(0,length);
      if(country=='1') {
         if(isIE)
         {
            showCityInfo.style.display = "list-item";
         }else{
            showCityInfo.style.display = "table-row";
         }
      } else {
          showCityInfo.style.display = "none";
      }
  }
   //2010-11-25 alter by VintageYu start
  function checkData() {  
      var f = document.form1;
  
      if(noRadioChecked(f.contactId," Please select [ I need to contact a: ].")){return;}
      if(noRadioChecked(f.howToGetThisWebsite," Please select [ How to get this website? ].")){
    	  return;
    	}else{
    		if($('input[name=howToGetThisWebsite]:radio:checked').val()=='374'){
    			if(isEmpty(f.howToGetThisWebsiteOther,"Please input [How to get this website?] other.")){return;}
    		}
    	}
      if(isEmpty(f.firstName,"Please input [First Name].")){return;} 
      if(isEmpty(f.lastName,"Please input [Last Name].")){return;} 
      if(isEmpty(f.companyName, "Please input [Company Name].")){  return;}
  //2010-11-26 add by VintageYu start
      if(isEmpty(f.webSite, "Please input [Company WebSite].")){  return;}
      //2010-11-26 add by VintageYu end
      //2011-02-18 add by VintageYu start
      if(isEmpty(f.tel,"Please input [Tel].")){ return;}
/*       if(isNaN(f.tel.value)){
         alert("Please input [Tel] with correct format.");
            f.tel.focus();
            return;
      } */
      //2011-02-18 add by VintageYu end
     
      if(isEmpty(f.email, "Please input [Email].")){  return;}else{if(checkEmail(f.email)){f.email.focus();return;}}                
      if(noOptionSelected(f.countryId, "Please select [Country].")){  return;}
  
      //2009-11-30 add by Pazzinixu start
      if("1" == document.getElementById("hidStateExistFlg").value) {
      if(isEmpty(f.stateId, "Please select [State].")) {
        return;
      }
    }
    //2009-11-30 add by Pazzinixu start
    
      if(f.contactId[0].checked){
      }
  
      //2009-11-30 change by Pazzinixu start
      if("-1" == f.mb.value) {
        if(isEmpty(f.txtInProductModel, "Please select/input [Interested Product Model].")) {return;}
      } else {
        f.txtInProductModel.value = "";
      }
    
      
      var appType = f.AppType;
      var checkedAppType = "";
      for(var i=0;i < appType.length;i++){
          if(appType[i].checked == true) {
            checkedAppType = appType[i].value;
            var appTypeOther = document.getElementById("AppType_text"+checkedAppType);
            if(appTypeOther!=null){
              if(trimString(appTypeOther.value).length<=0){alert("Please input [Application Other]."); appTypeOther.focus(); return; }
          }
          }
      }
      var hidWaysvalue = "";
      var hidAppTypevalue = "";
      for(var j=0; j < document.getElementsByName("AppType").length; j++) {
           if(document.getElementsByName("AppType")[j].checked) {
               hidAppTypevalue = hidAppTypevalue + document.getElementsByName("AppType")[j].value+',';
           }
      }
      if(hidAppTypevalue=='') {
           alert('Please select [Application]');
           return;
      }
      f.hidAppType.value = hidAppTypevalue;
      f.hidWays.value = hidWaysvalue;
  
      if(f.contactId[1].checked){
  
          if(isEmpty(f.boughtFrom, "Please input [I bought it from?].")){  return;}
          if(isEmpty(f.cpu, "Please input [CPU].")){  return;}
          if(isEmpty(f.os, "Please input [OS].")){  return;}
          if(isEmpty(f.memBrand, "Please input [Memory Brand].")){  return;}
          if(isEmpty(f.memSpeed, "Please input [Memory Speed].")){  return;}
          if(isEmpty(f.video, "Please input [Video].")){  return;}
      }
      if(f.message.length==0 || f.message.value==""){alert("Please input [Message]."); f.message.focus();return;}
      else if(f.message.length>600){alert("Message can't more than 600 characters"); f.message.focus();return;}
  
      //2009-11-30 change by Pazzinixu start
      else {
        if(true == f.contactId[0].checked) {
          f.real_message.value = f.message.value;
        } 
      }
     //2009-11-30 change by Pazzinixu end
      
      document.getElementById("but1").disabled = "true";
      document.getElementById("but2").disabled = "true";
      
      f.method = "post";
      f.action = "contactPost.jsp";
      f.submit();
  }
  
  
  function techInfo(bShow) {
      if(bShow) {
         if(isIE)
         {
             document.getElementById("showBoughtFromInfo").style.display = "list-item";
             document.getElementById("showcpuInfo").style.display = "list-item";
             document.getElementById("showosInfo").style.display = "list-item";
             document.getElementById("showmemInfo").style.display = "list-item";
             document.getElementById("showvideoInfo").style.display = "list-item";
          }else{
             document.getElementById("showBoughtFromInfo").style.display = "table-row";
             document.getElementById("showcpuInfo").style.display = "table-row";
             document.getElementById("showosInfo").style.display = "table-row";
             document.getElementById("showmemInfo").style.display = "table-row";
             document.getElementById("showvideoInfo").style.display = "table-row";
          }               
       } else {
           document.getElementById("showBoughtFromInfo").style.display = "none";
           document.getElementById("showcpuInfo").style.display = "none";
           document.getElementById("showosInfo").style.display = "none";
           document.getElementById("showmemInfo").style.display = "none";
           document.getElementById("showvideoInfo").style.display = "none";
       }
  }

  function changeCountry() {
    //2010-11-24 alter by VintageYu start
    var countryIdValue = document.getElementById("countryId").value;
    var countryId=countryIdValue.substring(0,countryIdValue.indexOf("/"));
    //2010-11-24 alter by VintageYu end
    if(null != countryId && "" != countryId) {
      ContactUsAjax.getStatesByCountry(countryId, buildStateResult);
    } else {
        var state = document.getElementById("stateId");
        document.getElementById("spaState").className="sectionHide";
        state.length = 0;

        document.getElementById("hidStateExistFlg").value = "0";
    }
  }
  
  function buildStateResult(result) {
     var data = result.getElementsByTagName("stateList");
        if(null != data.item(0)) {
          var stateExistFlg = data.item(0).getAttribute("stateExistFlg");
          var state = document.getElementById("stateId");
          if(1 == stateExistFlg) {
              var nodeNum = data.item(0).getAttribute("nodeNum");
              var currentState = data.item(0).getAttribute("currentState");
                document.getElementById("spaState").className = "sectionShow";
                state.length = 0;
                for(var i = 0; i < nodeNum; i++) {
                  var stateData = data.item(0).getElementsByTagName("State" + i.toString());
                  var id = stateData.item(0).getAttribute("id");
                  var value = stateData.item(0).getAttribute("value");

                  state.options[i + 1] = new Option(value, id);
                }

                state.options[0] = new Option("--- Please select state ---", "");
                state.options[0].selected = true;
          } else {
              var state = document.getElementById("stateId");
              document.getElementById("spaState").className="sectionHide";
              state.length = 0;

              document.getElementById("hidStateExistFlg").value = "0";
          }
          document.getElementById("hidStateExistFlg").value = stateExistFlg;
        }
  }
  
  function changeProductModel() {
    document.getElementById("txtInProductModel").value = "";
  }
  
  function inputProductModelOther() {
    document.getElementById("mb").value = "-1";
  }
  
  function inputUserTypeOther(userTypeCode) {
    var radioBox = document.getElementsByName("userType");
    for(var i = 0; i < radioBox.length; i++) {
      if(userTypeCode == radioBox[i].value) {
        radioBox[i].checked = true;
        break;
      }
    }
  }
  
  function resetHowToGetThisWebsiteOther(sourceObject){
	  if($(sourceObject).val()!='374'){
		  $("#howToGetThisWebsiteOther").val("");
	  }
  }
  
  function setHowToGetThisWebsiteOther(){
	  $('input[name=howToGetThisWebsite]:radio').each(function(){
		    if($(this).val()=='374'){
		    	$(this).attr("checked","checked");
		    }
	  });
  }
