import React, { Component }from 'react';
import CardList from './CardList';
import Scroll from './Scroll';
import SearchBox from './SearchBox';
import ErrorBoundry from './ErrorBoundry';
import Header from './Header';
import './MainPage.css';

class MainPage extends Component {
	componentDidMount() {
		this.props.onRequestRobots();
	}

    filterRobots = () => {
        return this.props.robots.filter( robot => {
            return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase());
        })
    }

	render() {
		const {  onSearchChange, isPending } = this.props;

		return isPending?
			<h1>Loading</h1>:
			(
			<div className = 'tc'>
				<h1 className = 'f2'> RoboFriends</h1>
				<Header />
				<SearchBox searchChange = {onSearchChange} />
				<Scroll>
					<ErrorBoundry>
						<CardList robots = {this.filterRobots()}/>
					</ErrorBoundry>
				</Scroll>
			</div>
			);
		}
}

export default MainPage;