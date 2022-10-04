import React, {Component} from 'react';
import axios from 'axios';

export default class Fib extends Component {
	state = {
		seenIndices: [],
		values: {},
		index: ''
	};

	componentDidMount() {
		this.fetchValues();
		this.fetchIndices();
	}

	async fetchValues() {
		const values = await axios.get('/api/values/current');
		this.setState({values: values.data});
	}

	async fetchIndices() {
		const seenIndices = await axios.get('/api/values/all');
		this.setState({
			seenIndices: seenIndices.data
		});
	}

	renderSeenIndices() {
		return this.state.seenIndices.map(({number}) => number).join(', ');
	}
	
	renderCalculatedValues() {
		return Object.entries(this.state.values).map(([index, val], id) => (
			<div key={index}>
				For index {index}, I calculated - {val}
			</div>
		));
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		await axios.post('/api/values', {
			index: this.state.index
		});

		this.setState({
			index: ''
		});
	}

	render() {
		return (
			<div>
				<h1>Something</h1>
				<form onSubmit={this.handleSubmit}>
					<label>Enter index:</label>
					<input value={this.state.index} onChange={e => this.setState({
						index: e.target.value
					})} />
					<button type='submit'>Submit</button>
				</form>
				<h3>Indices I have seen:</h3>
				{this.renderSeenIndices()}
				<h3>Calculated values:</h3>
				{this.renderCalculatedValues()}
			</div>
		)
	}
}
