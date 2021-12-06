import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'IppMasterApplicationCustomizerStrings';
import * as jQuery from 'jquery';
import * as $ from 'jquery';
import { sp, ISearchQuery, SearchResults, SortDirection } from "@pnp/sp/presets/all";
const LOG_SOURCE: string = 'IppMasterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IIppMasterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class IppMasterApplicationCustomizer
  extends BaseApplicationCustomizer<IIppMasterApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {

    sp.web.lists.getByTitle("Ripple Branding").items.top(1).orderBy("Modified", true).get().then(function (data) {

      $('body').append(`<style id="IMFBRANDING" type="text/css">`+data[0].CSS+`</style>`)})




    return Promise.resolve();
  }
}
