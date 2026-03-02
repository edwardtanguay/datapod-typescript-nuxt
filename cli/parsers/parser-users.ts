import { DpodFile } from "../classes/DpodFile";

export const parseUsers = () => {
	const dpodFile = new DpodFile("../../data/users.dp.txt");
	dpodFile.debug();
};
