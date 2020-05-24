import React, { Component } from 'react';
import Map from './Map';

class MapContainer extends Component {

	render() {
		return(
			<div style={{ margin: '100px' }}>
				<Map
					google={this.props.google}
					center={{lat: -37.808035, lng: 144.962807
                    }}
					height='500px'
					zoom={15}
				/>
			</div>
		);
	}
}

export default MapContainer;
