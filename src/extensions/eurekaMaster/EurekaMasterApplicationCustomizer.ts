import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { setup as pnpSetup, ConsoleListener} from "sp-pnp-js";
import { ISearchQuery, SearchResults } from "@pnp/sp/search";
import { MSGraphClient } from '@microsoft/sp-http';
import {AppInsights} from "applicationinsights-js";
import * as moment from 'moment';
import 'moment/locale/en-gb';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { Web }  from "sp-pnp-js";
import { ListEnsureResult }  from "sp-pnp-js";
import pnp, {JSONFileParser } from "sp-pnp-js";
import { containsInvalidFileFolderChars, sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import "@pnp/sp/site-users/web";
import { IItemAddResult } from "@pnp/sp/items";
import { Dialog } from '@microsoft/sp-dialog';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as strings from 'EurekaMasterApplicationCustomizerStrings';
import * as jQuery from 'jquery';
import * as $ from 'jquery';

const LOG_SOURCE: string = 'EurekaMasterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IEurekaMasterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
}


/** A Custom Action which can be run during execution of a Client Side Application */
export default class EurekaMasterApplicationCustomizer
  extends BaseApplicationCustomizer<IEurekaMasterApplicationCustomizerProperties> {
    private _topPlaceholder: PlaceholderContent | undefined;
    private _bottomPlaceholder: PlaceholderContent | undefined;

  public onInit(): Promise<void> {

    moment.locale('en-gb');

    $('head').append('<style type="text/css">div[data-sp-feature-tag*="PageTitle"] {display: none;}.newmenudesc{font-size:14px;color:rgba(0,0,0,.4);font-family:Roboto, sans-serif !important}.newmenuitem{color:rgba(0,0,0,.6)!important;font-size:15px;font-weight:bold;font-family:Roboto, sans-serif !important}</style>');

    this.context.application.navigatedEvent.add(this, this._renderPlaceHolders);
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    this._renderPlaceHolders();
    return Promise.resolve();


  }
  private _renderPlaceHolders(): void {

    sp.setup({
      spfxContext: this.context,
    });
    function wait(ms){
      var start = new Date().getTime();
      var end = start;
      while(end < start + ms) {
        end = new Date().getTime();
     }
   }
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
sp.web.lists.getByTitle("Ripple Branding").items.get().then(styles =>{
  $("#ripplebranding").remove();
    $("body").append(`<style id="ripplebranding">
    `+styles[0].CSS+`

  .header {
    background: #122331;
    position: relative;
    max-width: 80vw;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    z-index: 1;
  }
  .header a {
    text-decoration: none;
    color: #ffffff;
  }
  .header ul {
    list-style: none;
  }

  .menu-items {
    display: flex;
    align-items: center;
  }

  .menu-items li {
    padding: 0.5rem 1rem;
    transition: background 0.3s ease-in-out;
    width: 150px;
    list-style: none;
}
  .menu-items li:hover {
    background-color: #031794;
    border-radius:10px

  }




  .dropdown {
    position: relative;
  }
  .dropdown-menu,
  .menu-right {
    position: absolute;
    background: #122331;
    width: 100%;
    top: 50px;
    left: 0;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  .menu-right {
    top: 0;
    left: 110%;
  }
  .menu-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .dropdown:hover .dropdown-menu {
    top: 34px;
    opacity: 1;
    visibility: visible;
  }
  .dropdown-right:hover .menu-right {
    left: 100%;
    opacity: 1;
    visibility: visible;
  }


  .mega-menu {
    position: absolute;
    left: 0;
    width: 100%;
    top: 80px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  z-index:10000;
  }
  .mega-menu .content {
    background: white;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    width: 98%;
    justify-content: space-between;
  border:1px solid black;
  }
  .blog .content {
    grid-template-columns: repeat(6, 1fr);
  }
  .content .col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: 3rem;
  }
  .content .col .img-wrapper {
    display: block;
    position: relative;
    width: 100%;
    height: 20vw;
    overflow: hidden;
  }
  .content .col .img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .content .col img {
    width: 100%;
    transition: transform 0.3s ease-in-out;
  }
  .content .col .img-wrapper:hover img {
    transform: scale(1.1);
  }
  .content .col h2 {
    color: #031794 !important;
    font-size: 1.2rem;
    line-height: 3rem;
    font-weight: bold;
  }
  .content .col p {
    line-height: 1.2rem;
  }
  .content .col .mega-links {
    border-left: 1px solid #1a3246;
  }
  .content .col .read-more {
    display: inline-block;
    padding-top: 1rem;
    color: #427dad;
    transition: color 0.3s ease;
  }
  .col .mega-links li,
  .col .mega-links li a {
    padding: 0 1rem;
  }
  .menu-items li:hover .mega-menu {
    top: 50px;
    opacity: 1;
    visibility: visible;
  }
  .content .col .read-more:hover {
    color: #ff652f;
  }
  .menu-items li a {

    color: #4d4d4d !important;
    font-family: 'aa-smartsans', sans-serif !Important;
}
.menu-items li a:hover {

  color: #fff !important;
  font-family: 'aa-smartsans', sans-serif !Important;
}
.menu-items li {
  padding: 0.5rem 1rem;
  transition: background 0.3s ease-in-out;
  width: auto;
  list-style: none;
  padding-left: 20px;
  padding-right: 20px;
  margin-right:15px
;
}
.menu-items li:hover .mega-menu {
  top: 70px;
  opacity: 1;
  visibility: visible;
}
.ms-HubNav {display:none}
.menu-items li:hover {color:white !important}
.dropdown:hover .dropdown-menu {
  top: 64px;
  padding-left:0px;
  padding-right:0px;
  opacity: 1;
  visibility: visible;
  background: white;
  z-index: 100000;
  border: 1px solid rgba(0,0,0,.01);
}
.mega-menu .content {
  background: white;
  padding: 1rem
;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem
;
  width: 98%;
  justify-content: space-between;
  border: 1px solid rgba(0,0,0,.08);
}
section  p, #globalnav > li > div > div > div > p{color:#2d2d2d !important}

.dropdown:hover .dropdown-menu {

  min-width: 200px
;
}
.content .col .img-wrapper {
  display: block;
  position: relative;
  width: 100%;
  height: 200px
;
  overflow: hidden;
}
.blog .col{border: 1px solid rgba(0,0,0,.04);
      padding: 5px
  ;}
  .mega-links li a::after {

  margin-left: 5%;
  transform: translateY(2px);
}
.dropdown-menu, .menu-right {

  background: white;

}
      </style>`)
    })




    // Handling the top placeholder
    if (!this._topPlaceholder) {
    this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
    PlaceholderName.Top,
    { onDispose: this._onDispose }

    );

    // The extension should not assume that the expected placeholder is available.
    if (!this._topPlaceholder) {
    console.error("The expected placeholder (Top) was not found.");

    return;

    }

    if (this.properties) {
    let topString: string = this.properties.Top;
    if (!topString) {
    topString = "(Top property was not defined.)";
    }

    if (this._topPlaceholder.domElement) {
      sp.setup({
        spfxContext: this.context,
      });
sp.web.lists.getByTitle("Menu").items.filter("IsTopLevel eq 1").orderBy("Order1").get().then(menuitems =>{
  console.log(menuitems)
  var menutitle1;
  var menudesc1;
  var menuid1 = menuitems[0].ID
  var language = document.location.href.split("/")[6];
  if (language =="pt-br"){menutitle1 = menuitems[0].pt_x002d_br; menudesc1 = menuitems[0].Description_x002d_pt_x002d_br}
  else
  if (language =="pt-pt"){menutitle1 = menuitems[0].pt_x002d_pt; menudesc1 = menuitems[0].Description_x002d_pt_x002d_pt}
  else {menutitle1 = menuitems[0].Title;; menudesc1 = menuitems[0].Description_x002d_en_x002d_us}


  var menutitle2;
  var menudesc2;
  var menuid2 = menuitems[1].ID
  var language = document.location.href.split("/")[6];
  if (language =="pt-br"){menutitle2 = menuitems[1].pt_x002d_br; menudesc2 = menuitems[1].Description_x002d_pt_x002d_br}
  else
  if (language =="pt-pt"){menutitle2 = menuitems[1].pt_x002d_pt; menudesc2 = menuitems[1].Description_x002d_pt_x002d_pt}
  else {menutitle2 = menuitems[1].Title;; menudesc2 = menuitems[1].Description_x002d_en_x002d_us}



  var menutitle3;
  var menudesc3;
  var menuid3 = menuitems[2].ID
  var language = document.location.href.split("/")[6];
  if (language =="pt-br"){menutitle3 = menuitems[2].pt_x002d_br; menudesc3 = menuitems[2].Description_x002d_pt_x002d_br}
  else
  if (language =="pt-pt"){menutitle3 = menuitems[2].pt_x002d_pt; menudesc3 = menuitems[2].Description_x002d_pt_x002d_pt}
  else {menutitle3 = menuitems[2].Title; menudesc3 = menuitems[2].Description_x002d_en_x002d_us}
  var menutitle4;
  var menudesc4;
  var menuid4 = menuitems[3].ID
  var language = document.location.href.split("/")[6];
  if (language =="pt-br"){menutitle4 = menuitems[3].pt_x002d_br; menudesc4 = menuitems[3].Description_x002d_pt_x002d_br}
  else
  if (language =="pt-pt"){menutitle4 = menuitems[3].pt_x002d_pt; menudesc4 = menuitems[3].Description_x002d_pt_x002d_pt}
  else {menutitle4 = menuitems[3].Title; menudesc4 = menuitems[3].Description_x002d_en_x002d_us}

  var filter;
  if (language =="pt-br" || language =="pt-pt"){filter = "PromotedState eq '2' and OData__SPTranslationLanguage eq '"+language+"'"} else {filter = "PromotedState eq '2' and OData__SPIsTranslation eq 'false'"}
  sp.web.lists.getByTitle("Site Pages").items.filter(filter).get().then(results =>{

    this._topPlaceholder.domElement.innerHTML = `
    <nav class="navbar navbar-expand-lg o365sx-navbar menu-items" style="background: white !important;
    height: 50px;    margin-top: 40px;">

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul id="globalnav" style="" class="navbar-nav mr-auto menu-items">
    <li><a href="#" class="menu-item ms-HorizontalNavItem-link">`+menutitle1+`</a></li>
    <li class="dropdown">
      <a href="#" class="menu-item ms-HorizontalNavItem-link">`+menutitle2+`</a>
      <ul id="menu`+menuid2+`" class="dropdown-menu">



      </ul>
    </li>
    <li>
      <a href="#" class="menu-item ms-HorizontalNavItem-link">`+menutitle3+`</a>
      <div  class="mega-menu">
        <div id="menu`+menuid3+`" class="content">
          <div class="col">
            <section>
              <h2>`+menutitle3+`</h2>
              <a href="#" class="img-wrapper"
                ><span class="img"
                  ><img
                    src="`+menuitems[2].Menu_x002d_Image.Url+`"
                    alt="Random Image" /></span
              ></a>
              <p>`+menudesc3+`</p>
            </section>
          </div>



        </div>
      </div>
    </li>
    <li>
      <a href="#" class="menu-item ms-HorizontalNavItem-link">`+menutitle4+`</a>
      <div class="mega-menu blog container" >
        <div class="content">
          <div class="col">
            <a href="#" class="img-wrapper"
              ><span class="img"
                ><img
                  src="`+results[0].BannerImageUrl.Url.split(',')[0]+`"
                  alt="Random Image" /></span
            ></a>
            <h2>`+results[0].Title+`</h2>
            <p>
            `+results[0].Description+`
            </p>
            <a href="#" class="read-more">read more...</a>
          </div>
          <div class="col">
            <a href="#" class="img-wrapper"
              ><span class="img"
                ><img
                  src="`+results[1].BannerImageUrl.Url.split(',')[0]+`"
                  alt="Random Image" /></span
            ></a>
            <h2>`+results[1].Title+`</h2>
            <p>
            `+results[1].Description+`
            </p>
            <a href="#" class="read-more">read more...</a>
          </div>
          <div class="col">
            <a href="#" class="img-wrapper"
              ><span class="img"
                ><img
                  src="`+results[2].BannerImageUrl.Url.split(',')[0]+`"
                  alt="Random Image" /></span
            ></a>
            <h2>`+results[2].Title+`</h2>
            <p>
            `+results[2].Description+`
            </p>
            <a href="#" class="read-more">read more...</a>
          </div>
          <div class="col">
          <a href="#" class="img-wrapper"
            ><span class="img"
              ><img
                src="`+results[3].BannerImageUrl.Url.split(',')[0]+`"
                alt="Random Image" /></span
          ></a>
          <h2>`+results[0].Title+`</h2>
          <p>
          `+results[3].Description+`
          </p>
          <a href="#" class="read-more">read more...</a>
        </div>
        </div>
      </div>
    </li>
    <li><a href="#" class="menu-item ms-HorizontalNavItem-link">About</a></li>
    <li><a id="additem" href="#" uk-toggle="target: #offcanvas-overlay" class="menu-item ms-HorizontalNavItem-link">edit mode</a></li>

    </ul>


    <button id="notifications"  uk-toggle="target: #offcanvas-slide" style="background:transparent;border:0px" type="button" >
    <i class="ms-Icon ms-Icon--Ringer" style="color:white !important;font-size:20px; cursor:pointer" aria-hidden="true"></i>
    </button>
    <div style="top:108px;" id="offcanvas-slide" uk-offcanvas="overlay: true;flip:true;container: filtermenu">
    <div style="background-color:white;padding-top:0px;width:35%" class="uk-offcanvas-bar">
        <button style="color:black" class="uk-offcanvas-close" type="button" uk-close></button>
        <h3 style="color:black;font-family:Roboto, sans-serif !important;font-weight:800;font-size:18px">Notifications</h3>
        <div style="list-style:none" id="my-trending-items"></div>

    </div>
</div>


  </div>
</nav>
<div id="offcanvas-overlay" uk-offcanvas="overlay: true">
    <div style="width:700px" class="uk-offcanvas-bar">

        <button class="uk-offcanvas-close" type="button" uk-close></button>


        <h3>Edit menu</h3>

        <div id="menuedit" uk-grid>
        <div class="uk-width-1-2@s">
        <ul id="menumanage" style="width:300px" class="uk-nav-default uk-nav-parent-icon" uk-nav="multiple: true"  uk-sortable="handle: .level1">


        </ul>
    </div>
    <div class="uk-width-1-2@s">
    <ul id="menumanage1" style="width:100%" >
    <form id="editform" style="display:none">
    <fieldset class="uk-fieldset">

        <legend class="uk-legend">Edit item</legend>

        <div class="uk-margin">
        <label>Title</label>
            <input id="title" class="uk-input" type="text" placeholder="Title">
        </div>
        <div class="uk-margin">
        <label>Title pt-br</label>
        <input   id="titleptbr" class="uk-input" type="text" placeholder="pt-br">
    </div>
    <div class="uk-margin">
    <label>Title pt-pt</label>
            <input id="titleptpt" class="uk-input" type="text" placeholder="pt-pt">
        </div>
        <div class="uk-margin">
        <label>Parent</label>
            <select id="parent" class="uk-select">
                <option>Option 01</option>
                <option>Option 02</option>
            </select>
        </div>

        <div class="uk-margin">
        <label>Description</label>
            <textarea id="description" class="uk-textarea" rows="2" placeholder="Description"></textarea>
        </div>
        <div class="uk-margin">
        <label>Description-pt-pt</label>
        <textarea id="descriptionptpt" class="uk-textarea" rows="2" placeholder="Description-pt-pt"></textarea>
    </div>
    <div class="uk-margin">
    <label>Description-pt-br</label>
    <textarea id="descriptionptbr" class="uk-textarea" rows="2" placeholder="Description-pt-br"></textarea>
</div>
<button id="menusubmit" class="uk-button uk-button-default">Submit</button>


    </fieldset>
</form>

    </ul>
</div>
        </div>

    </div>
</div>` ;

menuitems.forEach(toplevelmenu => {
  var topmanageurl = ` <li  class="uk-parent level1">
  <a itemid="`+toplevelmenu.ID+`"   href="#">`+toplevelmenu.Title+` <i  itemid="`+toplevelmenu.ID+`" style="padding-left:20px" class="ms-Icon ms-Icon--Edit menuedit" aria-hidden="true"></i></a>
  <ul itemid="`+toplevelmenu.ID+`" id="manage`+toplevelmenu.ID+`" class="uk-nav-sub">

  </ul>
</li>`
$("#menumanage").append(topmanageurl)
  getsublinksfirstlevel(+toplevelmenu.ID, toplevelmenu.Menu_Type)
});

})

})    }

    }

   this.getitems();


    }
function getsublinksfirstlevel(menuid,menutype){


  var menufilter = "Menu_x002d_ParentId eq "+menuid;
  var menu = "#menu"+menuid;
  var manage = "#manage"+menuid;


  sp.web.lists.getByTitle("Menu").items.filter(menufilter).orderBy("Order1").get().then(subitems =>{
    var haschildren:boolean;
    if(subitems.length>0){haschildren = true} else {haschildren = false}

    subitems.forEach(item => {
      var managehtml =` <li> <a href="#">`+item.Title+` <i  itemid="`+item.ID+`" style="padding-left:20px" class="ms-Icon ms-Icon--Edit menuedit" aria-hidden="true"></i></a><ul id="manage`+item.Id+`"></ul></li>`
      $(manage).append(managehtml)

      var menuhtml;
      if(haschildren){
        if(menutype=="DropDown"){menuhtml=    `  <li  class="dropdown dropdown-right">
        <a href="#" class="menu-item ms-HorizontalNavItem-link">
          Item 3
        </a>
        <ul id="menu`+item.Id+`" class="menu-right">

        </ul>
      </li>`}
        else  if(menutype=="Mega Menu"){menuhtml=    `  <div class="col">
        <section>
          <h2><a style=" color: #031794 !important;" href="`+item.MenuLink+`" target="`+item.MenuLink+`">`+item.Title+`</a></h2>
          <ul id="menu`+item.Id+`" class="mega-links">


          </ul>
        </section>
      </div>
      `;
      var length = subitems.length + 1
      $("body").append(`<style id="menurows">#menu`+menuid+`{grid-template-columns: repeat(`+length+`, 1fr);}</style>`)
    }

      } else{
      if(menutype=="DropDown"){menuhtml=    `<li><a href="`+item.MenuLink+`" target="`+item.MenuLink+`" class="menu-item ms-HorizontalNavItem-link">`+item.Title+`</a></li>`}
      else  if(menutype=="Mega Menu"){menuhtml=    `  <div class="col">
      <section>
        <h2><a style=" color: #031794 !important;" href="`+item.MenuLink+`" target="`+item.MenuLink+`">`+item.Title+`</a></h2>
        <ul id="menu`+item.Id+`" class="mega-links">


        </ul>
      </section>
    </div>
    `}}
      $(menu).append(menuhtml)
      getsublinkssecondlevel(item.Id,menutype)
    });
  })
  $(".menuedit").on('click', function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
    $("#editform").toggle()
  });
}
function getsublinkssecondlevel(menuid,menutype){
  var menufilter = "Menu_x002d_ParentId eq "+menuid;
  var menu = "#menu"+menuid;
  var manage = "#manage"+menuid;
  sp.web.lists.getByTitle("Menu").items.filter(menufilter).orderBy("Order1").get().then(subitems =>{
    console.log(subitems)

    subitems.forEach(item => {
      var managehtml =` <li><a href="#">`+item.Title+`  <i  itemid="`+item.ID+`" style="padding-left:20px" class="ms-Icon ms-Icon--Edit menuedit" aria-hidden="true"></i></a></li>`
      $(manage).append(managehtml)
      var menuhtml;
      if(menutype=="DropDown"){menuhtml=    `<li><a href="`+item.MenuLink+`" target="`+item.MenuLink+`" class="menu-item ms-HorizontalNavItem-link">`+item.Title+`</a></li>`}
      else  if(menutype=="Mega Menu"){menuhtml=    `    <li><a href="`+item.MenuLink+`" target="`+item.MenuLink+`" >`+item.Title+`</a></li>
   `}
      $(menu).append(menuhtml)
    });
  })
  $(".menuedit").on('click', function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
    var item = $(this).attr("itemid");
    sp.web.lists.getByTitle("Menu").items.getById(+item).get().then(thisitem =>{
      console.log(thisitem)
    $("#editform").toggle();
    $("#title").val(thisitem.Title);
$("#titleptbr").val(thisitem.pt_x002d_br);
$("#titleptpt").val(thisitem.pt_x002d_pt);
$("#parent").val(thisitem.Menu_x002d_ParentId);
$("#description").val(thisitem.Description_x002d_en_x002d_us);
$("#descriptionptpt").val(thisitem.Description_x002d_pt_x002d_pt);
$("#descriptionptbr").val(thisitem.Description_x002d_pt_x002d_br);

  }) });
}

  }
    private _onDispose(): void {

    }
     private getitems(): void{

  }
    private addsubs(itemid,toporquick) :void{}


    private addsubsubs(itemid,toporquick) :void{
}




    }



