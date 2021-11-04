import { Version } from '@microsoft/sp-core-library';
import {PropertyPaneChoiceGroup,
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import {AppInsights} from "applicationinsights-js";

import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldTextWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldTextWithCallout';
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
import { IPickerTerms, PropertyFieldEnterpriseTermPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldEnterpriseTermPicker';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import * as jQuery from 'jquery';
import * as $ from 'jquery';
import { sp, ISearchQuery, SearchResults, SortDirection } from "@pnp/sp/presets/all";
import UIkit from 'uikit';
require("uikit/dist/css/uikit.min.css");
require("uikit/dist/js/uikit.min.js");
import Icons from 'uikit/dist/js/uikit-icons';
import * as moment from "moment";


import { result } from 'lodash';

import * as strings from 'EurekaNewsWebPartStrings';

export interface IEurekaNewsWebPartProps {
  description: string;
  layout: string;
  list:string;
  type:string;
  poll: string;
  listName: string;
  items: string;
  results: boolean;
  live: boolean;
  sort:string;
  promoted: boolean;
  KQLQuery: string;
  posttype: string;
  uniqueref: string;
  seeall: string;
  numberValue: number;

}

export default class EurekaNewsWebPart extends BaseClientSideWebPart<IEurekaNewsWebPartProps> {

  public render(): void {




    const seeall = this.properties.seeall;
    sp.setup({
      spfxContext: this.context,
    });
    var language = document.location.href.split("/")[6];
    const nav = sp.web.navigation.topNavigationBar;
    sp.web.navigation.topNavigationBar.get().then((items: any[]) => {
      console.log(items)
      console.log( nav.getById(2003).children())
    })

    const instanceid = this.context.instanceId;
    console.log(navigator.language || navigator.geolocation )

      let appInsightsKey: String;

     appInsightsKey  = "39f70f1c-aeed-4ece-8972-029b37259ace"
      AppInsights.downloadAndSetup({ instrumentationKey: appInsightsKey });


    const uniqueref = Math.floor(Math.random()*90000) + 10000;

    sp.setup({
      spfxContext: this.context
    });
    function parseDate(dateStr) {
      var date = dateStr.split('-');
      var day = date[0];
      var month = date[1] - 1; //January = 0
      var year = date[2];
      return new Date(year, month, day);
  }
var siteurl = this.context.pageContext.web.absoluteUrl;
var relurl = this.context.pageContext.site.serverRequestPath;
console.log(relurl)
   function getQueryStringParameter(param) {
      if (window.location.href.indexOf("?") > -1) {
      var params = document.URL.split("?")[1].split("&"); //Split Current URL With ? after that &
      var strParams = "";
      for (var i = 0; i < params.length; i = i + 1) { //param,parse with given URL parameter
          var singleParam = params[i].split("=");
          if (singleParam[0] == param) {
              return decodeURIComponent(singleParam[1]); //Decode URL Result
          }
      }}
  }
  if(this.properties.description==""){var desca = "null"; var desc = this.properties.description;} else{
  var desc = this.properties.description;}
  this.domElement.innerHTML = '<div class="container"> <div style="padding:15px !important" class="webpart-header '+desca+'">'+desc+'</div><span id="'+uniqueref+'seeall" class="right ms-Link '+desca+'" style="color:#666;float:right;position:relative;bottom:35px;right:20px"></span>'

+'<div id="'+uniqueref+'" style="" class="uk-grid uk-grid-small"><ol  style="display:none; padding-left:45px" id="'+uniqueref+'numberedlist"></ol></div></div>';
  const viewpinneda = this.properties.layout;
  var viewpinned;
  if(viewpinneda == undefined){viewpinned = "uk-width-1-3@m"} else{viewpinned = viewpinneda}
  const viewtype = this.properties.type;
    const listName = this.properties.listName;
    const sorta = this.properties.sort;
    var sort;
    if(sorta == undefined){sort = "Created"} else if (sorta =="Modified"){sort = "Created"} else {sort = sorta}
    var sortorder;
    if(sorta =="Modified"){sortorder = SortDirection.Ascending} else {sortorder = SortDirection.Descending}

    var live = this.properties.live;
    var promoted = this.properties.promoted;
var nummber = this.properties.numberValue;
    var KQLQuery = this.properties.KQLQuery;
   var campaign = this.properties.poll;
   var urlfull = window.location.origin+'/sites/'+window.location.href.split("/")[4]
   var stripparams = urlfull.split("?")[0]

    var livequery;
    var promotedquery;

    var newstypeparam;
    var tagsparam;
    if(campaign == undefined||campaign =="*"){campaign = ""} else {campaign = "News_Tags:"+campaign+"'"};

var total;
if (window.location.href.indexOf("layouts") > -1) {
  total = this.properties.numberValue;
  $(".rippleseeall").hide()
}
else {
  total = this.properties.numberValue
}
var campaignfilter;
const thismonth = new Date(new Date().setDate(new Date().getDate() - 0));
const thismonthString = thismonth.toISOString();
let promo;








    var qtext = 'path:"'+siteurl+'" NewsStatusOWSTEXT:Live '+ campaign+' '+promotedquery+' '+KQLQuery;

console.log(this.context.pageContext)
var filter;
if (language =="pt-br" || language =="pt-pt"){filter = "PromotedState eq '2' and OData__SPTranslationLanguage eq '"+language+"'"} else {filter = "PromotedState eq '2' and OData__SPIsTranslation eq 'false'"}
sp.web.lists.getByTitle("Site Pages").items.filter(filter).get().then(results =>{

console.log(results)


  var content = "";

var uniqueseeall = "#"+uniqueref+"seeall";

var seallappend = '<a class="rippleseeall" href="'+siteurl+'/_layouts/15/SeeAll.aspx?Page='+relurl+'%2F&InstanceId='+instanceid+'" data-interception="propogate" aria-disabled="false">See all</a>'

jQuery(uniqueseeall).html("")

jQuery(uniqueseeall).append(seallappend)
  results.forEach(function (result , i) {
    var filtertext = "Title eq '"+result.News_Tags+"'"
    sp.web.lists.getByTitle("Site Pages").items.filter(filtertext).select("FileRef").get().then(pages => {
      let filter;
      if(pages.length){filter = pages[0].FileRef} else{filter = "/SitePages/Content-Hub.aspx?q="+result.News_Tags }

    var e = new Date();
    var publishdate = new Date (result.Modified);




    AppInsights.trackEvent('Post appeared on screen', <any>{
      Site:siteurl,
      Title: result.Title,
      ItemId: result.ID,
      Campaign: result.OData__TopicHeader,





        })
    var words = result.CanvasContent1+" "+result.LayoutWebpartsContent+" "+result.Title+" "+result.Description+" "

    var count;
    if(words !=null||words !=undefined){count =  words.split(/\s+/).length}
    else {count = 0;}
    var readlength = (Math.round((count-5)/265).toString())













 var d_names = new Array("Sun", "Mon", "Tue",
 "Wed", "Thu", "Fri", "Sat");

 var m_names = new Array("Jan", "Feb", "Mar",
 "Apr", "May", "Jun", "Jul", "Aug", "Sep",
 "Oct", "Nov", "Dec");
 var datetouse;
    if(result.Modified==null){datetouse = result.Modified} else {datetouse = result.Modified}
 var d = new Date(datetouse);
 var curr_day = d.getDay();
  var curr_date = d.getDate();
  var sup = "";
  if (curr_date == 1 || curr_date == 21 || curr_date ==31)
     {
     sup = "st";
     }
  else if (curr_date == 2 || curr_date == 22)
     {
     sup = "nd";
     }
  else if (curr_date == 3 || curr_date == 23)
     {
     sup = "rd";
     }
  else
     {
     sup = "th";
     }
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();
  var fulldate = d_names[curr_day] + " " + curr_date + "<SUP>"
  + sup + "</SUP> " + m_names[curr_month];

var imageurl = result.BannerImageUrl.Url.split(',')[0];

   var hexcode = "rgb(63, 71, 128) !important"

   if(viewtype == undefined||viewtype == "Tile"){
      content += '<div class="'+viewpinned+'" posttype="'+result.OData__TopicHeader+'" style="margin-bottom:20px">'
      +' <div class="post-module postmodule uk-card">'
      +'<div class="thumbnail images" style="height:200px"><a data-interception="off" href="'+siteurl+'/SitePages/News.aspx?newsitem='+result.ID+'&newstype='+result.OData__TopicHeader+'"><img alt="'+result.Title+' image" style="object-fit: fill;"height="152" src="'+imageurl+'"/></a></div>'
      +'<div class="post-content">'
      +' <a data-interception="off" class="'+result.OData__TopicHeader+'" style="font-size:12px;font-weight:bold;color:rgba(0,0,0,.8);position:relative;" href="'+filter+'"><span class="">#'+result.OData__TopicHeader+'</span></a></br>'
      +'<a data-interception="off" href="'+siteurl+'/SitePages/News.aspx?newsitem='+result.ID+'&newstype='+result.OData__TopicHeader+'">'
      +'<h4 class="title" style="font-size:16px;height:42px">'+result.Title+'</h4>'
      +'</a>'
      +'<p class="intro '+result.Description+'" >'+result.Description+'</p>'
      +'<div class="post-meta" style="font-size:13px; color:rgba(0,0,0,.8)">'

      +'<i class="" aria-hidden="true"></i>'+fulldate+' </a>'
      +' <span style="float:right;padding-top:2px"><span> <i class="clock outline icon"></i> '+ readlength+' minute read</span>'
      +'</span></div></div></div></div></div>';




  var attach = "#"+uniqueref;
  jQuery(attach).html("");
  jQuery(attach).append(content);
   } else
   if(viewtype == "Slide"){

    var carouselwrapper = `<div uk-slider><div class=""uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider>

    <ul id="carouselitems`+uniqueref+`" class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m  uk-grid-small uk-grid-match" style="margin:0px">
    </ul>

    <a style="color:black;    display: inline !important;" class="uk-position-center-left uk-position-small " href="#" uk-slidenav-previous uk-slider-item="previous"></a>
    <a style="color:black;    display: inline !important;" class="uk-position-center-right uk-position-small " href="#" uk-slidenav-next uk-slider-item="next"></a>

  </div>
  <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul></div>`;
  var attach = "#"+uniqueref;
  jQuery(attach).html("");
  jQuery(attach).append(carouselwrapper);

  content += '<li posttype="'+result.OData__TopicHeader+'" class="'+viewpinned+'" >'
  +' <div class="post-module postmodule uk-card" >'
  +'<div class="thumbnail images" style="height:200px"><a data-interception="off" href="'+siteurl+'/SitePages/News.aspx?newsitem='+result.ID+'&newstype='+result.OData__TopicHeader+'"><img alt="'+result.Title+' image" style="object-fit: fill;"height="152" src="'+imageurl+'"/></a></div>'
  +'<div class="post-content">'
  +'<a data-interception="off" href="'+siteurl+'/SitePages/News.aspx?newsitem='+result.ID+'&newstype='+result.OData__TopicHeader+'">'
  +'<h4 class="title" style="font-size:16px;height:42px">'+result.Title+'</h4>'
  +'</a>'
  +'<p class="intro '+result.Description+'" >'+result.Description+'</p>'
  +'<div class="post-meta" style="font-size:13px; color:rgba(0,0,0,.8)">'
 +' <a data-interception="off" class="'+result.OData__TopicHeader+'" style="font-size:12px;font-weight:bold;color:rgba(0,0,0,.8);position:relative;bottom:10px" href="'+filter+'"><span class="">#'+result.OData__TopicHeader+'</span></a></br>'
  +'<i class="" aria-hidden="true"></i>'+fulldate+' </a>'
  +' <span style="float:right;padding-top:2px"><span> <i class="clock outline icon"></i> '+ readlength+' minute read</span>'
  +'</span></div></div></div></div></li>';
  var attach1 = "#carouselitems"+uniqueref;
  jQuery(attach1).html("");

  jQuery(attach1).append(content);
   }
   else if(viewtype == "ImageSlide"){
    var carouselwrapper1 = `<div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider="clsActivated: uk-transition-active; center: true" style="left:20px">

    <ul  id="carouselitems`+uniqueref+`" class="uk-slider-items uk-grid-small" style="margin:0px;">

    </ul>

    <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
    <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>

</div>`;
var attach = "#"+uniqueref;
jQuery(attach).html("");
jQuery(attach).append(carouselwrapper1);
content += `<li posttype="`+result.OData__TopicHeader+`" class="uk-width-3-4">
<div class="uk-panel" style="height:350px">
    <img alt="`+result.Title+` image" style="height:350px;width:100%;object-fit:cover" src="`+imageurl+`" alt="">
    <div class="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom" style="height:350px">
        <h3 style="font-size:16px;padding-bottom:10px; font-weight:400; -webkit-box;    -webkit-line-clamp: 2;    -webkit-box-orient: vertical;    line-height: 20px;    height: 40px; overflow:hidden" class="uk-margin-remove">`+result.Title+`</h3>

                      <p style="font-size:14px; color:white; font-weight:400;  overflow:hidden; -webkit-box;    -webkit-line-clamp: 3;    -webkit-box-orient: vertical;    line-height: 20px;    height: 72px;padding-top:10px" class="uk-margin-remove">`+result.Description+`</p>
                      <span style="color:white !important" class="" style="">( <i style="color:white !important" class="clock outline icon"></i> `+ readlength+` minute read )</span></br>

        <a href="`+siteurl+'/SitePages/News.aspx?newsitem='+result.ID+`" data-interception="off" style="margin:auto;margin-top:30px;padding:10px;position:relative;top:30px" href="#" class="uk-button-default">Read more</a>
    </div>
</div>
</li>`;
var attach1 = "#carouselitems"+uniqueref;
jQuery(attach1).html("");

jQuery(attach1).append(content); }


else if(viewtype == "Left"){

  content += `<div posttype="`+result.OData__TopicHeader+`" style="margin-left:15px; margin-bottom:10px" class="uk-width-1-1@m uk-card uk-card-default uk-grid-collapse   uk-grid uk-grid-small"  uk-grid>
      <div style="height:170px" class="post-module uk-card-media-left uk-cover-container uk-width-1-4@m">
      <a data-interception="off" href="`+siteurl+`/SitePages/News.aspx?newsitem=`+result.ID+`&newstype=`+result.OData__TopicHeader+`">
       <img class="thumbnail image" style="max-height:170px" src="`+imageurl+`" alt="'+result.Title+' image" uk-cover></a>

      </div>
      <div style="height:185px" class="uk-width-expand@m">
          <div style="padding-top:15px;padding-left:20px" class="uk-width-1-1@m">

          <a data-interception="off" style="font-size:11px;font-weight:bold;color:rgba(0,0,0,.8)" href="`+filter+`"><span style="" class="">#`+result.OData__TopicHeader+`</span></a>
          <a data-interception="off" href="`+siteurl+`/SitePages/News.aspx?newsitem=`+result.ID+`&newstype=`+result.OData__TopicHeader+`">
          <h4 style="-webkit-box;    -webkit-line-clamp: 2;    -webkit-box-orient: vertical;    line-height: 20px;    height: 20px !important; font-size:16px !Important;max-width:90%; margin-bottom:10px;overflow:hidden" class="uk-card-title title">`+result.Title+`</h4></a>

              <p class="intro `+result.Description+`" style="max-width:95%;display: -webkit-box;    -webkit-line-clamp: 2;    -webkit-box-orient: vertical;    line-height: 20px;    height: 50px; position:relative;   overflow: hidden;">`+result.Description+`</p>
              <div class="post-meta" style="max-width:80%;font-size:13px;position:relative;top:-2px; color:rgba(0,0,0,.8)">

<span class="uk-position-left"> `+fulldate+` &nbsp;&nbsp; <i class="clock outline icon"></i>  `+ readlength+` minute read</span>

   </div>
          </div>
      </div>
  </div>`;


  var attach = "#"+uniqueref;
  jQuery(attach).html("");

  jQuery(attach).append(content);


}
else if(viewtype == "List"){

  content += `
  <li posttype="`+result.OData__TopicHeader+`" class="uk-width-1-1@m " style="max-width:100%">
        <span style=" margin-left: -2em; text-indent: 2em; position:relative;bottom:5px;left:35px;padding-bottom:10px;padding-top:5px;line-height:22px;font-size:15px;padding-bottom:15px !important;min-width:100%; ">
        <a  style="color: rgb(41,41,41) !Important;      line-height: 25px;    height: 55px !important;    font-size: 15px !important;    font-weight: 600;" data-interception="off" href="`+siteurl+`/SitePages/News.aspx?newsitem=`+result.ID+`&newstype=`+result.OData__TopicHeader+`">`+result.Title+` </a> </span>
        <hr style="position:relative;right:2em;margin-bottom:5px;margin-top:5px" class="uk-width-1-1@m uk-divider-icon"></li>


`;


var attach = "#"+uniqueref
jQuery("#"+uniqueref+"numberedlist").html("")
jQuery("#"+uniqueref+"numberedlist").append(content);
jQuery("#"+uniqueref+"numberedlist").show()

}
   })  })   });



   $("body").append(`<style>
   /*RIPPLE NEWS STYLES*/

   #workbenchPageContent{max-width:1500px !important}
.intro {
    color: #666 !important
}


div[data-sp-feature-tag*="Comments"] {
    display: none
}


.ms-Checkbox {
    padding-top: 20px
}

.title {
    max-height: 46px;
    overflow: hidden;
}

.pin {
    display: inline-block;
    background: #FEFEFE;
    border: 2px solid #FAFAFA;
    box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4);
    margin: 0 2px 15px;
    -webkit-column-break-inside: avoid;
    -moz-column-break-inside: avoid;

    padding: 15px;
    padding-bottom: 5px;
    background: -webkit-linear-gradient(45deg, #FFF, #F9F9F9);
    opacity: 1;
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    transition: all .2s ease;
    width: 100%;
}
html{zoom:1}
@media (min-width: 960px) {
    #columns {
        -webkit-column-count: 2;
        -moz-column-count: 2;
        column-count: 2;
    }
}

@media (min-width: 1100px) {
    #columns {
        -webkit-column-count: 2;
        -moz-column-count: 2;
        column-count: 2;
    }
}
@media (min-width: 2100px) {
   html{zoom:1.2}
}
@media (min-width: 2500px) {
    html{zoom:1.3}
 }
#columns:hover .pin:not(:hover) {
    opacity: 0.7;
}


.icon {
    color: gray !important;
}

.Emoji {
    height: 32px
}

#columns {
    -webkit-column-count: 3;
    -webkit-column-gap: 10px;
    -webkit-column-fill: auto;
    -moz-column-count: 3;
    -moz-column-gap: 10px;
    -moz-column-fill: auto;
    column-count: 3;
    column-gap: 15px;
    column-fill: auto;
}

.edit {
    background-color: transparent;
    border: none;
    box-sizing: border-box;
    display: block;
    margin: 0;
    outline: 0;
    overflow: hidden;
    resize: none;
    white-space: pre;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-align: inherit;
    color: #333333;
    height: 40px;
}

.post-module {
    position: relative;
    z-index: 1;
    display: block;
    background: #FFFFFF;
    min-width: 25%;
    height: 340px;
    -webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    -webkit-transition: all 0.3s linear 0s;
    -moz-transition: all 0.3s linear 0s;
    -ms-transition: all 0.3s linear 0s;
    -o-transition: all 0.3s linear 0s;
    transition: all 0.3s linear 0s;
}

.post-module:hover,
.hover,
.ControlZone-control {
    -webkit-box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
}

.post-module {
    margin-top: 8px;
    margin-bottom: 10px !important;
}

.post-module .thumbnail {
    height: 400px;
    overflow: hidden;
}

.post-module .thumbnail .date {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;

    width: 60px;
    height: 60px;
    padding: 12.5px 0;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;

    font-weight: 700;
    text-align: center;
    -webkti-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.post-module:hover .thumbnail img,
.hover .thumbnail img {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    transform: scale(1.1);
    opacity: 0.6;
}

.post-module .thumbnail img {
    display: block;
    width: 120%;
    -webkit-transition: all 0.3s linear 0s;
    -moz-transition: all 0.3s linear 0s;
    -ms-transition: all 0.3s linear 0s;
    -o-transition: all 0.3s linear 0s;
    transition: all 0.3s linear 0s;
}

.post-module .post-content {
    position: absolute;
    bottom: 0px;
    background: #FFFFFF;
    width: 100%;
    padding: 15px;
    -webkti-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
    -moz-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
    -ms-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
    -o-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
    transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
}

.post-module .post-content .category {
    position: absolute;
    top: -34px;
    left: 0px;

    padding: 10px 15px;

    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
}

.post-module .thumbnail .date .day {
    font-size: 18px;
}

.post-module .thumbnail .date .month {
    font-size: 12px;
    text-transform: uppercase;
}

.post-module .thumbnail .date {
    background-color: white !important;
    color: #8f92b5 !important;
}

.post-module .thumbnail .date {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;

    width: 60px;
    height: 60px;
    padding: 12.5px 0;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    color: #ffffff;
    font-weight: 700;
    text-align: center;
    -webkti-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.post-module .thumbnail img {
    display: block;
    width: 120%;
    -webkit-transition: all 0.3s linear 0s;
    -moz-transition: all 0.3s linear 0s;
    -ms-transition: all 0.3s linear 0s;
    -o-transition: all 0.3s linear 0s;
    transition: all 0.3s linear 0s;
}

h4.title {
    color: rgb(41, 41, 41) !Important;

    line-height: 25px;
    height: 55px !important;
    font-size: 16px !important;
    font-weight: 800 !important
}

h4,
h2 {
    font-weight: 600 !Important
}

.post-module .post-content .category {
    text-transform: none !important;
}

.card {
    border-radius: 2px
}

.intro {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 20px;
    height: 60px;
    overflow: hidden;
}

.post-module .post-content .post-meta {
    margin: 30px 0 0;
    color: #999999;
}

.post-module .post-content .post-meta {
    margin: 30px 0 0;
    color: #999999;
}

.postmodulefalse {
    height: 210px !important;
}

.imagesfalse {
    display: none
}

.uk-card-title {
    font-size: 14px;
    font-weight: 600 !important;

    text-transform: uppercase;
}

.intro {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    height: 66.6px;
    padding-top: 8px;
    overflow: hidden;
    font-weight: 400;
    color: #333 !important;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
}

h4.title {
    color: rgb(41, 41, 41) !Important;
    line-height: 25px;
    height: 55px !important;
    font-size: 16px !important;
    font-weight: bold !important;
    text-transform: uppercase;
}

.uk-label {
    text-align: center;
    font: normal normal normal 13px/15px;
    letter-spacing: 0px;

    opacity: 1;
    border-radius: 0px;
    padding: 7px;
}

.uk-grid>ol {
    list-style: none;
    counter-reset: mycounter;
    padding: 0;
}

.uk-grid>ol li:before {
    content: counter(mycounter);
    counter-increment: mycounter;
    color: red;
    display: inline-block;
    width: 1em;
    margin-left: -1.5em;
    margin-right: 0.5em;
    font-size: 30px;
    text-align: right;
    direction: rtl
}

.post-module {
    position: relative;
    z-index: 1;
    display: block;
    background: #FFFFFF;
    min-width: 25%;
    height: 340px;
    -webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    -webkit-transition: all 0.3s linear 0s;
    -moz-transition: all 0.3s linear 0s;
    -ms-transition: all 0.3s linear 0s;
    -o-transition: all 0.3s linear 0s;
    transition: all 0.3s linear 0s;
}

.post-module:hover,
.hover,
.ControlZone-control {
    -webkit-box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
}

.post-module {
    margin-top: 8px;
    margin-bottom: 10px !important;
}

.post-module .thumbnail {
    height: 400px;
    overflow: hidden;
}

.post-module .thumbnail .date {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;

    width: 60px;
    height: 60px;
    padding: 12.5px 0;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    color: #ffffff;
    font-weight: 700;
    text-align: center;
    -webkti-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.post-module:hover .thumbnail img,
.hover .thumbnail img {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    transform: scale(1.1);
    opacity: 0.6;
}

.post-module .thumbnail img {
    display: block;
    width: 120%;
    -webkit-transition: all 0.3s linear 0s;
    -moz-transition: all 0.3s linear 0s;
    -ms-transition: all 0.3s linear 0s;
    -o-transition: all 0.3s linear 0s;
    transition: all 0.3s linear 0s;
}

.post-module .post-content {
    position: absolute;
    bottom: 0px;
    background: #FFFFFF;
    width: 100%;
    padding: 15px;
    -webkti-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
    -moz-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
    -ms-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
    -o-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
    transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
}

.post-module .post-content .category {
    position: absolute;
    top: -34px;
    left: 0px;

    padding: 10px 15px;

    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
}

.post-module .thumbnail .date .day {
    font-size: 18px;
}

.post-module .thumbnail .date .month {
    font-size: 12px;
    text-transform: uppercase;
}

.post-module .thumbnail .date {
    background-color: white !important;
    color: #8f92b5 !important;
}

.post-module .thumbnail .date {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;

    width: 60px;
    height: 60px;
    padding: 12.5px 0;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    color: #ffffff;
    font-weight: 700;
    text-align: center;
    -webkti-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.post-module .thumbnail img {
    display: block;
    width: 120%;
    -webkit-transition: all 0.3s linear 0s;
    -moz-transition: all 0.3s linear 0s;
    -ms-transition: all 0.3s linear 0s;
    -o-transition: all 0.3s linear 0s;
    transition: all 0.3s linear 0s;
}

h4.title {
    color: rgb(41, 41, 41) !Important;
    font-family: 'Poppins', sans-serif;
    line-height: 25px;
    height: 55px !important;
    font-size: 16px !important;
    font-weight: 600 !important
}






.component-container {
    background: white
}

.count {
    float: right;
    padding: 20px;
}

#kanban-board {
    width: 98%;
    margin: auto;
}

.sortable-wrapper {
    float: left;
    width: 300px !important
}

.ghost {
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
    opacity: 0.4;
    border-style: solid;
}

.dragging {
    -moz-transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
    opacity: 0.8;
}

#getimages>span,
#save-button {
    color: white !important;
}




#gettitle,
#getintro {

    color: #53565A;
}

.drag-place-holder {
    height: 0px !important;
    margin-top: -5px;
    overflow: hidden;
    height: 200px;
    background: silver;
}





#newform {
    background: white !important;
    overflow: auto;
    height: 600px;
}

.ms-metadata {
    display: inline !important
}

.ui-state-default {
    min-height: 45px;
    max-width: 90%;
    background: white !important;
    border-radius: 3px;
    padding: 10px;
    cursor: pointer;
    margin-left: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 15px;
    margin-bottom: 20px
}

.sortable div {
    padding: 3px;
}

.edit {
    background-color: transparent;
    border: none;
    box-sizing: border-box;
    display: block;
    margin: 0;
    outline: 0;
    overflow: hidden;
    resize: none;
    white-space: pre;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-align: inherit;
    color: #333333;
    height: 40px;
}

   </style>`)






}


private lists: IPropertyPaneDropdownOption[];

private items:IPropertyPaneDropdownOption[];
private thisdropitems:IPropertyPaneDropdownOption[];
private listsDropdownDisabled: boolean = true;

private loadLists(): Promise<IPropertyPaneDropdownOption[]> {
  sp.setup({
    spfxContext: this.context});

  return new Promise<IPropertyPaneDropdownOption[]>((resolve: (options: IPropertyPaneDropdownOption[]) => void, reject: (error: any) => void) => {

    sp.web.lists.getByTitle('Channels').items.get().then(function(data){
      var items: IPropertyPaneDropdownOption[]=[{key:"*", text:"No Campaign Filter"}];
      for(var k in data){
        items.push({key:data[k].Title, text:data[k].Title});
      }

    setTimeout((): void => {
      resolve(items);
    }, 1000);
  });
})
}
protected onPropertyPaneConfigurationStart(): void {




  this.listsDropdownDisabled = !this.lists;

  if (this.lists) {
    return;
  }


  this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists');

  this.loadLists()
    .then((listOptions: IPropertyPaneDropdownOption[]): void => {
      this.lists = listOptions;
      this.listsDropdownDisabled = false;
      this.context.propertyPane.refresh();
      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
      this.render();
    });


}
protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {





  return {
    pages: [
      {

        displayGroupsAsAccordion: true,
        groups: [
            {
              groupName: "Settings",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Web part title"
                }),
                PropertyPaneChoiceGroup('layout', {

                  options: [
                    { key: 'uk-width-1-1@m', text: '1 Column',
                    imageSrc: 'https://cdn0.iconfinder.com/data/icons/software-16/20/software-512.png',
                    imageSize: { width: 48, height: 48 },
                    selectedImageSrc: 'https://cdn0.iconfinder.com/data/icons/software-16/20/software-512.png'
                  },
                   { key: 'uk-width-1-2@m', text: '2 Column',
                     imageSrc: 'https://cdn4.iconfinder.com/data/icons/line-icons-12/64/software_layout_2columns-512.png',
                     imageSize: { width: 48, height: 48 },
                     selectedImageSrc: 'https://cdn4.iconfinder.com/data/icons/line-icons-12/64/software_layout_2columns-512.png'
                   },
                   { key: 'uk-width-1-3@m', text: '3 Column',
                     imageSrc: 'https://cdn4.iconfinder.com/data/icons/line-icons-12/64/software_layout_3columns-512.png',
                     imageSize: { width: 48, height: 48 },
                     selectedImageSrc: 'https://cdn4.iconfinder.com/data/icons/line-icons-12/64/software_layout_3columns-512.png',checked: true
                   },
                   { key: 'uk-width-1-4@m', text: '4 Column',
                     imageSrc: 'https://cdn4.iconfinder.com/data/icons/line-icons-12/64/software_layout_4columns-512.png',
                     imageSize: { width: 48, height: 48 },
                     selectedImageSrc: 'https://cdn4.iconfinder.com/data/icons/line-icons-12/64/software_layout_4columns-512.png'
                   }

                 ]
               })
              ]},
              {groupName: "Layout",

              isCollapsed: true,
              groupFields: [

                PropertyPaneChoiceGroup('type', {

                  options: [
                    { key: 'Tile', text: 'Image on top',
                    imageSrc: 'https://cdn0.iconfinder.com/data/icons/view-1/20/vertical_slider_4-512.png',
                    imageSize: { width: 48, height: 48 },
                    selectedImageSrc: 'https://cdn0.iconfinder.com/data/icons/view-1/20/vertical_slider_4-512.png'
                  },
                   { key: 'Left', text: 'Image Side',
                     imageSrc: 'https://cdn2.iconfinder.com/data/icons/interface-12/24/interface-44-512.png',
                     imageSize: { width: 48, height: 48 },
                     selectedImageSrc: 'https://cdn2.iconfinder.com/data/icons/interface-12/24/interface-44-512.png'
                   },
                   { key: 'List', text: 'List with count',
                     imageSrc: 'https://cdn0.iconfinder.com/data/icons/ikigai-text-and-editorial-line/32/text_Numbered_List-256.png',
                     imageSize: { width: 48, height: 48 },
                     selectedImageSrc: 'https://cdn0.iconfinder.com/data/icons/ikigai-text-and-editorial-line/32/text_Numbered_List-256.png'
                   },
                   { key: 'Slide', text: 'Carousel',
                   imageSrc: 'https://cdn0.iconfinder.com/data/icons/ikigai-text-and-editorial-line/32/text_Vertical_Align_center-256.png',
                   imageSize: { width: 48, height: 48 },
                   selectedImageSrc: 'https://cdn0.iconfinder.com/data/icons/ikigai-text-and-editorial-line/32/text_Vertical_Align_center-256.png'
                 },
                 { key: 'ImageSlide', text: 'Large Carousel',
                 imageSrc: 'https://cdn0.iconfinder.com/data/icons/ikigai-text-and-editorial-line/32/text_Vertical_Distribute_Top-256.png',
                 imageSize: { width: 48, height: 48 },
                 selectedImageSrc: 'https://cdn0.iconfinder.com/data/icons/ikigai-text-and-editorial-line/32/text_Vertical_Distribute_Top-256.png'
               }

                 ]
               })
              ]}
              ,{groupName: "Content to show",

              isCollapsed: true,groupFields:[
              PropertyPaneTextField('KQLQuery', {
                label: "Status", value:""

              }),

             PropertyFieldNumber("numberValue", {
                key: "numberValue",
                label: "Number of results to show",
                description: "Number of results to show",
                value: 10,
                maxValue: 50,

                minValue: 1,
                disabled: false,
              }),
               PropertyPaneCheckbox('promoted',{text:'Show promoted',  checked: true,}) ]},


            {  groupName: "Sorting and Filtering",
            groupFields: [

              PropertyPaneDropdown('poll', {
                label: "Campaign",
                options: this.lists,
                disabled: this.listsDropdownDisabled,

              }),
              PropertyPaneDropdown('sort', {
                label: "Order by",
                options: [
                  { key: 'PublishDate', text: 'Published Date'},
                  { key: 'Created', text: 'Created Date'}


                ],
                selectedKey: '4',
                disabled: this.listsDropdownDisabled
              })
            ]
          }
        ]
      }
    ]
  }
 }
}
