import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { SkillTotal } from './SkillTotal';

export const SkillsArea = () => {
	const { skillTotals, searchText } = useContext(AppContext);

	return (
		<section className="skillsArea">
			<a id="skills"></a>
			<div className="responsiveHeader">
				<h3>
					{searchText.trim() === '' ? (
						<>
							Total skills:{' '}
							<span className="theNumber">{skillTotals.length}</span>
						</>
					) : (
						<>
							Skills that contain{' '}
							<span className="searching">
								{searchText.trim()}
							</span>{' '}
							= <span className="theNumber">{skillTotals.length}</span>
						</>
					)}
				</h3>
				<div className="skillsLink">
					<a href="#jobs">jobs</a>
				</div>
			</div>
			<div className="skills">
				{skillTotals.map((skillTotal) => {
					return (
						<SkillTotal
							key={skillTotal.skill.idCode}
							skillTotal={skillTotal}
						/>
					);
				})}
			</div>
		</section>
	);
};
