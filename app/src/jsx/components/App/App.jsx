// import styles from "./styles.pcss";
import React, { Component, Suspense } from "react";
import Output from "./../Output/Output";
import GithubRibbon from "./../GithubRibbon/GithubRibbon";
import Section from "./../Section/Section";
import Sidebar from "./../Sidebar/Sidebar";
const SidebarNavigation = React.lazy(() => import("./../SidebarNavigation/SidebarNavigation"));
import Logo from "./../Logo/Logo";
import Hero from "./../Hero/Hero";
import Footer from "./../Footer/Footer";
import * as Nervo from "../../../../../src/js/index";
const data = require("./../../../data/index.js").default;

class App extends Component {
	state = {
		value: 0,
	};

	constructor(props) {
		super(props);
		this.tween = new Nervo.Tween(
			{ value: 0 },
			{ value: 100 },
			{
				autoStart: false,
				duration: 2,
				// loop: true,
				onProgress: e => {
					this.setState({ ...{}, ...e.target.value });
				},
			}
		);
	}

	componentDidMount() {
		this.tween.start();
	}

	render() {
		const sections = data.sections.map((s, i) => {
			return <Section sectionLength={data.sections.length} id={i} value={s} key={s.name} contents={s.contents} />;
		});

		return (
			<div className="app">
				<GithubRibbon />
				<Hero>
					<div className={"nervo-container"}>
						<Logo />
						<br />
						{data.name}
						<br />
						{`v${data.version}`}
						<br />
						<p>{data.description}</p>
					</div>
				</Hero>
				<main className={"js-main-content"}>
					<div className={"nervo-container"}>
						<div className={"nervo-void"}>
							<div className={"nervo-col-12 nervo-col-sm-12 nervo-col-md-12 nervo-col-lg-9"}>
								{sections}
								<Output value={this.state.value} />
							</div>
							<div className={"nervo-col-12 nervo-col-sm-12 nervo-col-md-12 nervo-col-lg-3"}>
								<Sidebar>
									<Suspense fallback={<div>Loading SidebarNavigation Component</div>}>
										<SidebarNavigation sections={sections} />
									</Suspense>
								</Sidebar>
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}

export default App;
