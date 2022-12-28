export interface IJob {
	id: number;
	title: string;
	url: string;
	company: string;
	description: string;
	skillList: string;
	skills: IJobSkill[];
	publicationDate: string;
	bulkSearch: string;
}

export interface ISkill {
	idCode: string;
	name: string;
	url: string;
	description: string;
	lookupGoogleLink: string;
	lookupYouTubeLink: string;
}

export interface IJobSkill extends ISkill {
	isOpen: boolean;
}

export interface ISkillTotal {
	skill: ISkill;
	total: number;
	isOpen: boolean;
	jobs: IJob[];
	bulkSearch: string;
}
