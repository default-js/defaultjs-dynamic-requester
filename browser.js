import GLOBAL from "@default-js/defaultjs-common-utils/src/Global";
import {Requester} from "./index"

GLOBAL.defaultjs = GLOBAL.defaultjs || {};
GLOBAL.defaultjs.dynamic = GLOBAL.defaultjs.dynamic || {};
if(!GLOBAL.defaultjs.dynamic.Requester){
	GLOBAL.defaultjs.dynamic.Requester = Requester;
	Requester.VERSION = "${version}";
}