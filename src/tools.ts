import { IJob, ISkill, ISkillTotal } from './interfaces';

/**
 * expandSkillsInJobs fills skills property from skillList
 * 
 * example: expandSkillsInJobs(jobs1, skills1);
 * 
 */
export const expandSkillsInJobs = (jobs: IJob[], skills: ISkill[]) => {
	jobs.forEach((job: IJob) => {
		const idCodes = job.skillList.split(',').map((m) => m.trim());
		job.skills = [];
		idCodes.forEach((idCode) => {
			const skill: ISkill | undefined = skills.find(
				(skill: ISkill) => skill.idCode === idCode
			);
			if (skill) {
				job.skills.push(skill);
			}
		});
	});
};


export const getSkillTotals = (jobs: IJob[]) => {
	const skillTotals: ISkillTotal[] = [];
	jobs.forEach(job => {
		job.skills.forEach(skill => {
			const existingSkillTotal = skillTotals.find(skillTotal => skillTotal.skill.idCode === skill.idCode);
			if (!existingSkillTotal) {
				skillTotals.push({
					skill,
					total: 1,
					isOpen: false,
					jobs: jobs.filter(job => job.skills.map(m => m.idCode).includes(skill.idCode)),
					bulkSearch: ''
				});
			} else {
				existingSkillTotal.total++;
			}
		});
	});
	skillTotals.sort((a: ISkillTotal, b: ISkillTotal) =>  a.total > b.total ? -1 : 1);
	return skillTotals;
}

export const getMinimalAmericanMonthDay = (isoDate: string) => {
	const date = new Date(isoDate);
	let dateText = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	// fix "Dec 6" to "Dec 06"
	if (dateText.length === 5) {
		dateText = dateText.substring(0, 4) + '0' + dateText.substring(4, 5);
	}
	return dateText;
}
