import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { IJob, ISkill, IJobSkill, ISkillTotal } from './interfaces';
import * as tools from './tools';

interface IAppContext {
	originalJobs: IJob[];
	jobs: IJob[];
	skillTotals: ISkillTotal[];
	handleInfoBarToggle: (jobSkill: IJobSkill) => void;
	toggleSkillTotalIsOpen: (skillTotal: ISkillTotal) => void;
	searchText: string;
	setSearchText: (text: string) => void;
	handleSearchTextChange: (searchText: string) => void;
	handleClearSearch: () => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

const jobUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';
const skillsUrl = 'https://edwardtanguay.vercel.app/share/skills.json';
const mockApiWaitSeconds = 1;
const sep = '|';

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [originalJobs, setOriginalJobs] = useState<IJob[]>([]);
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [skills, setSkills] = useState<ISkill[]>([]);
	const [skillTotals, setSkillTotals] = useState<ISkillTotal[]>([]);
	const [originalSkillTotals, setOriginalSkillTotals] = useState<ISkillTotal[]>([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		setTimeout(() => {
			(async () => {
				// build jobs
				const jobsResponse = await fetch(jobUrl);
				const _jobs: IJob[] = await jobsResponse.json();
				// sort jobs by newest first
				_jobs.sort((a: IJob, b: IJob) =>
					a.publicationDate > b.publicationDate ? -1 : 1
				);

				// build skills
				const skillsResponse = await axios.get(skillsUrl);
				const _skills: ISkill[] = skillsResponse.data;
				tools.expandSkillsInJobs(_jobs, _skills);
				// _skills.forEach((_skill) => {
				// 	_skill.isOpen = false;
				// });

				// create bulk search
				_jobs.forEach((m) => {
					const separatedSkillsText = m.skills
						.map((m) => m.name + sep + m.description)
						.join(sep);
					const bulkSearch =
						m.title + sep + m.company + sep + separatedSkillsText;
					m.bulkSearch = bulkSearch;
				});

				// build original jobs
				const _originalJobs: IJob[] = [..._jobs];

				// build skillTotals
				const _skillTotals: ISkillTotal[] = tools.getSkillTotals(_jobs);
				_skillTotals.forEach((m) => {
					const bulkSearch =
						m.skill.name + sep + m.skill.description;
					m.bulkSearch = bulkSearch;
				});

				// build original skillTotals
				const _originalSkillTotals = [..._skillTotals];

				setOriginalJobs(_originalJobs);
				setJobs(_jobs);
				setSkills(_skills);
				setOriginalSkillTotals(_originalSkillTotals);
				setSkillTotals(_skillTotals);
			})();
		}, mockApiWaitSeconds * 1000);
	}, []);

	const toggleSkillTotalIsOpen = (skillTotal: ISkillTotal) => {
		skillTotal.isOpen = !skillTotal.isOpen;
		setSkillTotals([...skillTotals]);
	};

	const handleInfoBarToggle = (jobSkill: IJobSkill) => {
		jobSkill.isOpen = !jobSkill.isOpen;
		setSkills([...skills]);
	};

	const handleSearchTextChange = (searchText: string) => {
		const _jobs = originalJobs.filter((m) =>
			m.bulkSearch.toLowerCase().includes(searchText.toLowerCase())
		);
		const _skillTotals = originalSkillTotals.filter((m) =>
			m.bulkSearch.toLowerCase().includes(searchText.toLowerCase())
		);
		setJobs(_jobs);
		setSkillTotals(_skillTotals);
		setSearchText(searchText);
	};

	const handleClearSearch = () => {
		setSearchText('');
		setJobs([...originalJobs]);
		setSkillTotals([...originalSkillTotals]);
	}

	return (
		<AppContext.Provider
			value={{
				originalJobs,
				jobs,
				skillTotals,
				handleInfoBarToggle,
				toggleSkillTotalIsOpen,
				searchText,
				setSearchText,
				handleSearchTextChange,
				handleClearSearch
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
