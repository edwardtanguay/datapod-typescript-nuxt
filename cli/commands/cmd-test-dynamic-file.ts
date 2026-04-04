import { DynamicText } from "../classes/dynamicText";
import * as dpod from "../dpod/dpod";

const df = dpod.createDynamicFileFromFile("~~/debug/test-files/test001.ts");

// const dt = new DynamicText("code-display-debug", new Map([["fileName", "report002"]]));
// df.addCodeBlockBeforeMarker("NEW_METHOD_AREA", dt, "displayMethodBefore");

df.deleteAllCodeBlocksWithMarker("displayMethodBefore");

df.saveToFile();




