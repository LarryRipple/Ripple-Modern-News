import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import * as React from 'react';
import { useState } from "react";
import * as  ReactDOM from 'react-dom';
import * as $ from "jquery";
import { sp } from "@pnp/sp";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
require("uikit/dist/css/uikit.min.css");
require("uikit/dist/js/uikit.min.js");
import UIkit from 'uikit'
import { ConsoleListener } from 'sp-pnp-js';
window["jQuery"] = window["$"] = $;
import { PropertyFieldCollectionData, CustomCollectionFieldType, ICustomCollectionField } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

import * as strings from 'EurekaAccordionWebPartStrings';

export interface IEurekaAccordionWebPartProps {
  description: string;
	collectionData: any[];
}

export default class EurekaAccordionWebPart extends BaseClientSideWebPart<IEurekaAccordionWebPartProps> {

  public render(): void {
  	console.log(this.properties.collectionData)


		this.domElement.innerHTML = `<div id="ctas" ></div>`;
		var css = `<style>
#aa-CallToAction-Icon
{
  float: left;
  margin-right: 10px;
}
#aa-CallToAction-Text
{
  display: flow-root;
  font-size: 16px;
}
#TextIcon__item
{
	list-style: none;
    margin-bottom: 8px;
    margin-left: 30px;
}
.aa-CallToAction-Texth2
{
  font-size: 40px;
  margin-bottom: 30px;
  margin-top:16px !important;
}
.aa-CallToAction-Texth2 {
    font-size: 40px !important;
    margin-bottom: 30px;
}
.ck-content ul::marker {
    unicode-bidi: isolate;
    font-variant-numeric: tabular-nums;
    text-transform: none;
    text-indent: 0px !important;
    text-align: start !important;
    text-align-last: start !important;
}
.ck-content li {margin-left:30px}
.ck-content ol  {margin-left:30px}
.c-texticon__list{ font-family: aa-smartsans-light, "Mier B", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
color: rgb(51, 51, 51);
font-size: 16px;
line-height:25px}
#ctas > div > div.uk-width-expand > ul > ul > li {margin: 0px;
    font-family: aa-smartsans-light, "Mier B", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: rgb(51, 51, 51);
    font-size: 16px;
	line-height:25px
    background-color: rgb(255, 255, 255);}
	#ctas > div > div.uk-width-expand > ul > ol > li{margin-left:32px;margin-top:8px}
	ol>li>ol, ol>li>ul, ul>li>ol, ul>li>ul {
		margin-left: 32px;margin-top:8px
	}
</style>`;
		var allitems;
		$("body").append(css)
		if (this.properties.collectionData != undefined) {
			allitems = this.properties.collectionData;
			allitems.forEach(element => {
				var ctahtml = `<div class="uk-grid">
			<div class="uk-width-auto" style="margin-right:-40px"><div class="c-texticon">
		<img class="CallToAction-Icon" id="aa-CallToAction-Icon" alt="${element.icon} icon" src="${this.context.pageContext.site.absoluteUrl}/SiteAssets/Images/ui-icon-` + element.icon + `.svg"/></div></div>
			<div class="uk-width-expand"><h2 class="textIcon-Title aa-CallToAction-Texth2" id="aa-CallToAction-Text">`+ element.Title + `</h2>
			<div class="c-texticon__list">`+ element.description + `</div>
				</div></div></br>
			`
				$("#ctas").append(ctahtml)
			});
		}
	}


	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('description', {
									label: "AA text with icons"
								}),
								PropertyFieldCollectionData("collectionData", {
									key: "collectionData",
									label: "Items",
									panelHeader: "Add items",
									manageBtnLabel: "Manage items",
									value: this.properties.collectionData,
									fields: [
										{
											id: "icon",
											title: "Icon",
											options: [
												{
													key: "how",
													text: "How"
												},
												{
													key: "what",
													text: "What"
												},
												{
													key: "why",
													text: "Why"
												}
											],
											type: CustomCollectionFieldType.dropdown,
											required: false
										}, {
											id: "Title",
											title: "Heading",
											type: CustomCollectionFieldType.string,
											required: true
										},


										{
											id: "description",
											title: "Text Content",
											type: CustomCollectionFieldType.custom,
											onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
												return (
													React.createElement("div", null,
														React.createElement(CKEditor, {
															data: value,
															editor: ClassicEditor,
															key: itemId,
															value: value,

															onInit: (editor: any) => {

															},
															onChange: (event: Event, editor: ClassicEditor) => {
																const data = editor.getData();
																onUpdate(field.id, data);
															}
														}
														)
													)
												);
											}
										}
									],
									disabled: false
								})
							]
						}
					]
				}
			]
		};
	}
}
