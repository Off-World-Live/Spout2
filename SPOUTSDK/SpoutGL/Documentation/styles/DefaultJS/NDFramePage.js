﻿/*
This file is part of Natural Docs, which is Copyright © 2003-2020 Code Clear LLC.
Natural Docs is licensed under version 3 of the GNU Affero General Public
License (AGPL).  Refer to License.txt or www.naturaldocs.org for the
complete details.

This file may be distributed with documentation files generated by Natural Docs.
Such documentation is not covered by Natural Docs' copyright and licensing,
and may have its own copyright and distribution terms as decided by its author.

This file includes code derived from jQuery HashChange Event, which is
Copyright © 2010 "Cowboy" Ben Alman.  jQuery HashChange Event may be
obtained separately under the MIT license or the GNU General Public License (GPL).
However, this combined product is still licensed under the terms of the AGPLv3.
*/

"use strict";var NDFramePage=new function(){this.Start=function(){var ieVersion=NDCore.IEVersion();this.projectTitle=document.title;var loadingNotice=document.getElementById("NDLoadingNotice");loadingNotice.parentNode.removeChild(loadingNotice);var pageElements={NDHeader:true,NDSearchField:true,NDFooter:true,NDMenu:true,NDSummary:false,NDContent:true,NDMessages:false,NDMenuSizer:true,NDSummarySizer:true};var pageElementPositioning="fixed";if(ieVersion==6){pageElementPositioning="absolute";}if(ieVersion<8){document.getElementById("NDMenuSizer").style.display="none";delete pageElements.NDMenuSizer;document.getElementById("NDSummarySizer").style.display="none";delete pageElements.NDSummarySizer;}if(ieVersion!==undefined){document.getElementsByTagName("html")[0].style.overflow="hidden";}for(var pageElementName in pageElements){var domElement=document.getElementById(pageElementName);domElement.style.position=pageElementPositioning;if(pageElements[pageElementName]==true){domElement.style.display="block";}}this.UpdateLayout();window.onresize=function(){NDFramePage.OnResize();};document.onmousedown=function(e){return NDFramePage.OnMouseDown(e);};this.AddHashChangeHandler();window.onblur=function(){NDFramePage.OnBlur();};NDMenu.Start();NDSummary.Start();NDSearch.Start();this.OnHashChange();};this.Message=function(message){var htmlEntry=document.createElement("div");htmlEntry.className="MsgMessage";var htmlMessage=document.createTextNode(message);htmlEntry.appendChild(htmlMessage);document.getElementById("MsgContent").appendChild(htmlEntry);document.getElementById("NDMessages").style.display="block";this.OnResize();};this.CloseMessages=function(){document.getElementById("NDMessages").style.display="none";document.getElementById("MsgContent").innerHTML="";};this.OnBlur=function(){if(NDSearch.SearchFieldIsActive()){NDSearch.ClearResults();NDSearch.DeactivateSearchField();}};this.OnHashChange=function(){var oldLocation=this.currentLocation;this.currentLocation=new NDLocation(location.hash);if(this.hashChangePoller!=undefined){this.hashChangePoller.lastHash=location.hash;}NDSearch.ClearResults();NDSearch.DeactivateSearchField();var oldLocationHasSummary=(oldLocation!=undefined&&oldLocation.summaryFile!=undefined);var currentLocationHasSummary=(this.currentLocation.summaryFile!=undefined);if(oldLocationHasSummary!=currentLocationHasSummary){this.UpdateLayout();}var frame=document.getElementById("CFrame");if(NDCore.IsIE()&&this.currentLocation.type=="File"&&this.currentLocation.member!=undefined){}else{frame.contentWindow.location.replace(this.currentLocation.contentPage);}frame.contentWindow.focus();NDMenu.OnLocationChange(oldLocation,this.currentLocation);NDSummary.OnLocationChange(oldLocation,this.currentLocation);if(this.currentLocation.summaryFile==undefined){this.UpdatePageTitle();}};this.OnPageTitleLoaded=function(hashPath,title){if(this.currentLocation.path==hashPath){this.UpdatePageTitle(title);}};this.UpdatePageTitle=function(pageTitle){if(pageTitle){document.title=pageTitle+" - "+this.projectTitle;}else{document.title=this.projectTitle;}};this.AddHashChangeHandler=function(){var supportsOnHashChange=("onhashchange"in window&&(document.documentMode===undefined||document.documentMode>7));if(supportsOnHashChange){window.onhashchange=function(){NDFramePage.OnHashChange();};}if(!supportsOnHashChange||NDCore.IsIE()){this.hashChangePoller={timeoutLength:200,lastHash:location.hash};if(!NDCore.IsIE()||supportsOnHashChange){this.hashChangePoller.Start=function(){this.Poll();};this.hashChangePoller.Stop=function(){if(this.timeoutID!=undefined){clearTimeout(this.timeoutID);this.timeoutID=undefined;}};this.hashChangePoller.Poll=function(){if(location.hash!=this.lastHash){this.lastHash=location.hash;NDFramePage.OnHashChange();}this.timeoutID=setTimeout("NDFramePage.hashChangePoller.Poll()",this.timeoutLength);};}else{this.hashChangePoller.Start=function(){var iframeElement=document.createElement("iframe");iframeElement.title="empty";iframeElement.tabindex=-1;iframeElement.style.display="none";iframeElement.width=0;iframeElement.height=0;iframeElement.src="javascript:0";this.firstRun=true;iframeElement.attachEvent("onload",function(){if(NDFramePage.hashChangePoller.firstRun){NDFramePage.hashChangePoller.firstRun=false;NDFramePage.hashChangePoller.SetHistory(location.hash);NDFramePage.hashChangePoller.Poll();}});document.body.appendChild(iframeElement);this.iframe=iframeElement.contentWindow;document.onpropertychange=function(){if(event.propertyName=="title"){try{NDFramePage.hashChangePoller.iframe.document.title=document.title;}catch(e){}}};};this.hashChangePoller.Stop=function(){};this.hashChangePoller.Poll=function(){var hash=location.hash;var historyHash=this.GetHistory();if(hash!=this.lastHash){this.lastHash=location.hash;this.SetHistory(hash,historyHash);NDFramePage.OnHashChange();}else if(historyHash!=this.lastHash){location.href=location.href.replace(/#.*/,'')+historyHash;}this.timeoutID=setTimeout("NDFramePage.hashChangePoller.Poll()",this.timeoutLength);};this.hashChangePoller.GetHistory=function(){return this.iframe.location.hash;};this.hashChangePoller.SetHistory=function(hash,historyHash){if(hash!=historyHash){this.iframe.document.title=document.title;this.iframe.document.open();this.iframe.document.close();this.iframe.location.hash=hash;}};}this.hashChangePoller.Start();}};this.OnResize=function(){this.UpdateLayout();};this.UpdateLayout=function(){var ieVersion=NDCore.IEVersion();var useSizers=(ieVersion==undefined||ieVersion>=8);var fullWidth=NDCore.WindowClientWidth();var fullHeight=NDCore.WindowClientHeight();var header=document.getElementById("NDHeader");var searchField=document.getElementById("NDSearchField");var footer=document.getElementById("NDFooter");var menu=document.getElementById("NDMenu");var menuSizer=document.getElementById("NDMenuSizer");var summary=document.getElementById("NDSummary");var summarySizer=document.getElementById("NDSummarySizer");var content=document.getElementById("NDContent");var messages=document.getElementById("NDMessages");NDCore.SetToAbsolutePosition(header,0,0,fullWidth,undefined);NDCore.SetToAbsolutePosition(footer,0,undefined,fullWidth,undefined);var headerHeight=header.offsetHeight-1;var footerHeight=footer.offsetHeight;NDCore.SetToAbsolutePosition(footer,undefined,fullHeight-footerHeight,undefined,undefined);var searchMargin=(headerHeight-searchField.offsetHeight)/2;NDCore.SetToAbsolutePosition(searchField,fullWidth-searchField.offsetWidth-searchMargin,searchMargin,undefined,undefined);var remainingHeight=fullHeight-headerHeight-footerHeight;var remainingWidth=fullWidth;var currentX=0;if(this.MenuIsVisible()){menu.style.display="block";NDCore.SetToAbsolutePosition(menu,currentX,headerHeight,undefined,remainingHeight);currentX+=menu.offsetWidth;remainingWidth-=menu.offsetWidth;if(this.desiredMenuWidth==undefined){this.desiredMenuWidth=menu.offsetWidth;}if(useSizers){menuSizer.style.display="block";NDCore.SetToAbsolutePosition(menuSizer,currentX,headerHeight,undefined,remainingHeight);}NDMenu.OnUpdateLayout();}else{menu.style.display="none";menuSizer.style.display="none";}if(this.SummaryIsVisible()){summary.style.display="block";NDCore.SetToAbsolutePosition(summary,currentX,headerHeight,undefined,remainingHeight);currentX+=summary.offsetWidth;remainingWidth-=summary.offsetWidth;if(this.desiredSummaryWidth==undefined){this.desiredSummaryWidth=summary.offsetWidth;}if(useSizers){summarySizer.style.display="block";NDCore.SetToAbsolutePosition(summarySizer,currentX,headerHeight,undefined,remainingHeight);}}else{summary.style.display="none";summarySizer.style.display="none";}NDCore.SetToAbsolutePosition(content,currentX,headerHeight,remainingWidth,remainingHeight);NDCore.SetToAbsolutePosition(messages,currentX,0,remainingWidth,undefined);NDSearch.OnUpdateLayout();};this.MenuIsVisible=function(){return true;};this.SummaryIsVisible=function(){return(this.currentLocation!=undefined&&this.currentLocation.summaryFile!=undefined);};this.OnMouseDown=function(event){if(event==undefined){event=window.event;}var target=event.target||event.srcElement;if(NDSearch.SearchFieldIsActive()){var targetIsPartOfSearch=false;for(var element=target;element!=undefined;element=element.parentNode){if(element.id=="NDSearchResults"||element.id=="NDSearchField"){targetIsPartOfSearch=true;break;}}if(!targetIsPartOfSearch){NDSearch.ClearResults();NDSearch.DeactivateSearchField();}}if(target.id=="NDMenuSizer"||target.id=="NDSummarySizer"){var element;if(target.id=="NDMenuSizer"){element=document.getElementById("NDMenu");}else{element=document.getElementById("NDSummary");}this.sizerDragging={"sizer":target,"element":element,"originalSizerX":target.offsetLeft,"originalElementWidth":element.offsetWidth,"originalClientX":event.clientX};NDCore.AddClass(target,"Dragging");document.onmousemove=function(e){return NDFramePage.OnSizerMouseMove(e);};document.onmouseup=function(e){return NDFramePage.OnSizerMouseUp(e);};document.onselectstart=function(){return false;};var contentCover=document.createElement("div");contentCover.id="NDContentCover";document.body.appendChild(contentCover);NDCore.SetToAbsolutePosition(contentCover,0,0,NDCore.WindowClientWidth(),NDCore.WindowClientHeight());return false;}else{return true;}};this.OnSizerMouseMove=function(event){if(event==undefined){event=window.event;}var offset=event.clientX-this.sizerDragging.originalClientX;var windowClientWidth=NDCore.WindowClientWidth();if(this.sizerDragging.sizer.id=="NDMenuSizer"){if(this.sizerDragging.originalSizerX+offset<0){offset=0-this.sizerDragging.originalSizerX;}else if(this.sizerDragging.originalSizerX+offset+this.sizerDragging.sizer.offsetWidth>windowClientWidth){offset=windowClientWidth-this.sizerDragging.sizer.offsetWidth-this.sizerDragging.originalSizerX;}}else{var menuSizer=document.getElementById("NDMenuSizer");var leftLimit=menuSizer.offsetLeft+menuSizer.offsetWidth;if(this.sizerDragging.originalSizerX+offset<leftLimit){offset=leftLimit-this.sizerDragging.originalSizerX;}else if(this.sizerDragging.originalSizerX+offset+this.sizerDragging.sizer.offsetWidth>windowClientWidth){offset=windowClientWidth-this.sizerDragging.sizer.offsetWidth-this.sizerDragging.originalSizerX;}}NDCore.SetToAbsolutePosition(this.sizerDragging.sizer,this.sizerDragging.originalSizerX+offset,undefined,undefined,undefined);NDCore.SetToAbsolutePosition(this.sizerDragging.element,undefined,undefined,this.sizerDragging.originalElementWidth+offset,undefined);if(this.sizerDragging.sizer.id=="NDMenuSizer"){this.desiredMenuWidth=document.getElementById("NDMenu").offsetWidth;}else{this.desiredSummaryWidth=document.getElementById("NDSummary").offsetWidth;}this.UpdateLayout();};this.OnSizerMouseUp=function(event){document.onmousemove=null;document.onmouseup=null;document.onselectstart=null;document.body.removeChild(document.getElementById("NDContentCover"));NDCore.RemoveClass(this.sizerDragging.sizer,"Dragging");this.sizerDragging=undefined;};this.SizeSummaryToContent=function(){this.SizePanelToContent(document.getElementById("NDSummary"),this.desiredSummaryWidth);};this.SizePanelToContent=function(panel,desiredOffsetWidth){if(this.desiredSummaryWidth==undefined){return;}var resized=false;if(panel.clientWidth==panel.scrollWidth){if(panel.offsetWidth==desiredOffsetWidth){return;}else{NDCore.SetToAbsolutePosition(panel,undefined,undefined,desiredOffsetWidth,undefined);resized=true;}}var newOffsetWidth=panel.scrollWidth;if(panel.scrollHeight>panel.clientHeight){newOffsetWidth+=panel.offsetWidth-panel.clientWidth;}else{newOffsetWidth+=NDCore.GetComputedPixelWidth(panel,"borderLeftWidth")+NDCore.GetComputedPixelWidth(panel,"borderRightWidth");}if(newOffsetWidth!=desiredOffsetWidth){newOffsetWidth+=3;if(newOffsetWidth/desiredOffsetWidth>1.333){newOffsetWidth=Math.floor(desiredOffsetWidth*1.333);}if(panel.offsetWidth!=newOffsetWidth){NDCore.SetToAbsolutePosition(panel,undefined,undefined,newOffsetWidth,undefined);resized=true;}}if(resized){this.UpdateLayout();}};};