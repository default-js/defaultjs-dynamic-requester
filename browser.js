import GLOBAL from "@default-js/defaultjs-common-utils/src/Global";
import {Requester} from "./index"

GLOBAL.defaultjs = GLOBAL.defaultjs || {};
if(!GLOBAL.defaultjs.DynamicRequester){
	GLOBAL.defaultjs.DynamicRequester = Requester;
	Requester.VERSION = "${version}";
}