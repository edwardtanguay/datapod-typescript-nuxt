import { DynamicFile } from "../classes/dynamicFile";

export const createDynamicFileWithTemplate = (textTemplateIdCode:string, pathAndFileName:string, variables:Map<string, string>) => {
	const dynamicFile = DynamicFile.createFromTemplate(textTemplateIdCode, pathAndFileName, variables);
	return dynamicFile;
};

export const createDynamicFileFromFile = (pathAndFileName:string) => {
	const dynamicFile = DynamicFile.createFromFile(pathAndFileName);
	return dynamicFile;
};
