import { useContext } from 'react';
import { AppContext } from './AppContext';
import './App.scss';
import { JobsArea } from './components/JobsArea';
import { SkillsArea } from './components/SkillsArea';
import { PageLoadingArea } from './components/PageLoadingArea';

function App() {
	const {
		originalJobs,
		searchText,
		handleSearchTextChange,
		handleClearSearch,
	} = useContext(AppContext);

	return (
		<div className="App">
			<a id="jobs"></a>
			<div className="topArea">
				<h2>Developer Jobs</h2>
				<div className="inputArea">
					{searchText.trim() !== '' && (
						<div
							className="clearSearch"
							onClick={handleClearSearch}
						>
							X
						</div>
					)}
					<input
						value={searchText}
						className="global_show_computer"
						type="text"
						autoFocus
						onChange={(e) => handleSearchTextChange(e.target.value)}
						placeholder="search"
					/>
				</div>
			</div>
			<main className="content">
				{originalJobs.length === 0 ? (
					<PageLoadingArea />
				) : (
					<>
						<JobsArea />
						<SkillsArea />
					</>
				)}
			</main>
		</div>
	);
}

export default App;
