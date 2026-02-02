import './Header.css';

import reactLogo from '/src/assets/react.svg';
import awsLogo from '/src/assets/aws.svg';

const Header = () => {
	return (
		<div id="header">
			<div id="logos" className="scale-150">
				<a>
					<img src={awsLogo} className="logo" alt="AWS logo" />
				</a>
				<a>
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1 className="text-6xl font-bold">AWS λ &nbsp; x &nbsp; React</h1>
			<p className="read-the-docs">
				This is a playground for Ravi to learn CRUD using Lambda
			</p>
		</div>
	);
};

export default Header;
