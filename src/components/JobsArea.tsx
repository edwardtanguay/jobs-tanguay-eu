import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Jobs } from './Jobs';

export const JobsArea = () => {
	const { jobs, searchText, skillTotals, handleInfoBarToggle } =
		useContext(AppContext);

	return (
		<section className="jobArea">
			<div className="responsiveHeader">
				<h3 className="show_smartphone">{jobs.length} jobs</h3>
				<h3 className="show_computer">
					{searchText.trim() === '' ? (
						<div className="jobHeaderWrapper">
						<div className="totalJobs">Total jobs: <span className="theNumber">{jobs.length}</span></div>	
						<div className="infoMessage">Note that <strong>HTML</strong>, <strong>CSS</strong> and <strong>JavaScript</strong> are not listed on this site since they are assumed skills for most developer jobs.</div>
						</div>
					) : (
							<>Jobs that contain <span className="searching">{searchText.trim()}</span> = <span className="theNumber">{jobs.length}</span></>
					)}
				</h3>
				<div className="skillsLink">
					<a href="#skills">{skillTotals.length} skills</a>
				</div>
			</div>
			<Jobs />
		</section>
	);
};
