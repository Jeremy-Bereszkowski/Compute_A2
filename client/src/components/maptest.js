import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import $ from 'jquery';
import './map.scss'

const key = "AIzaSyB40ugc6sVQINRC16FT7v3llx43H99CQ1A"
const config = {
  initialLat: 51.75,
  initialLon: -3.38,
  mapZoomLevel: 10
}

var map;
var marker;
var mapZoomLevel;



export class MapContainer extends Component 
{

  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.initialLat,
      lon: this.props.initialLon,
      google: this.props.google,
      location: '', 
      weather:  '',
      icon:     '',
      map: '',
      marker: '',
      mapZoomLevel: ''
    };

}

  getData(location, lat, lon) {
    
    /// Variable to return
    var data;
    
    /// If it's a search
    if (location !== null)
    {
      data = $.get('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=' + key)
    }
    else /// It's a pin drop
    {
      data = $.get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + key)
    }
    
    return data;
  }
  
  updateState(locationName, lat, lon) {
    
    /// Get data from the API, then set state with it
    this.getData(locationName, lat, lon)
      .then(function(data) {
        /// Update the state, pass updateMap as a callback
        this.setState({
          lat:      data.coord.lat,
          lon:      data.coord.lon,
          weather:  this.capitalizeFirstLetter( data.weather[0].description ),
          location: data.name,
          icon:     'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png' /// Messy
        }, this.updateMap ) /// Pass updateMap as a callback
      }.bind(this));
  }

  locationSearch() {
    
    /// Get the value from the search field
    var location = this.refs.newLocation.getDOMNode().value;
    
    if ( location !== '' )
    {
      /// Update state with new API Data based on location name
      this.updateState(location, null, null);
    }
  }

  geolocationSearch() {
    
    /// Successful geolocation
    var success = function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      
      /// Update state with new API Data based on lat lon
      this.updateState(null, lat, lon);
    }.bind(this);
  
    /// Error'd geolocation
    var error = function (error) {
      if (error.message == 'User denied Geolocation')
      {
        alert('Please enable location services');
      }
    };
    
    /// Get the position
    navigator.geolocation.getCurrentPosition(success, error);
  }

  formSubmit(e) {
    e.preventDefault();
    
    /// Clear the input
    this.refs.newLocation.getDOMNode().value = '';
  }

  renderMap(lat, lng) 
  {

    /**
     * Map coordinates and pin coordinates are added in updateMap(),
     * which is run by updateStateWithData()
     */
    
    /// Create a new map
    map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: config.mapZoomLevel,
      disableDefaultUI: true,
      zoomControl: true
    });
  
    /// Create a new marker
    marker = new window.google.maps.Marker({
      map: map,
      draggable: true
    });
    
    /// Set the initial pin drop animation
    marker.setAnimation(window.google.maps.Animation.DROP);
  
    /// Add an event listener for click
    window.google.maps.event.addListener(map, 'click', function(event) {
      var latLng = event.latLng;
      var lat = latLng.lat();
      var lng = latLng.lng();
      
      /// Update state based on lat lon
      this.updateState(null, lat, lng)
    }.bind(this));
    
    /// Add an event listener for drag end
    window.google.maps.event.addListener(marker, 'dragend', function(event) {
      
      var latLng = event.latLng;
      var lat = latLng.lat();
      var lng = latLng.lng();
      /// Update state based on lat lon
      this.updateState(null, lat, lng)
    }.bind(this));
    
    /// Update variable on map change
    map.addListener('zoom_changed', function() {
      mapZoomLevel = map.getZoom();
    });
  }

  updateMap(lat, lon) {

   var latLng = new window.google.maps.LatLng(this.state.lat, this.state.lon);
   
   /// Set a timeout before doing map stuff
   window.setTimeout( function() {
     
     /// Set the marker position
     marker.setPosition(latLng);
     
     /// Pan map to that position
     map.panTo(latLng);
   }.bind(this), 300);
 }

 componentDidMount() 
 {
  /// Render a new map
  this.renderMap();
  
  /// Run update state, passing in the setup
  this.updateState(null, this.state.lat, this.state.lon);
}


  render() {
    return (
      <div id="app">
        <div id="app__interface">
          <div className="panel panel-default">
            <div className="panel-heading text-center"><span className="text-muted">Enter a place name below, drag the marker <em>or</em> click directly on the map</span></div>
              <div className="panel-body">
                { /* Search Form - Ideally this should be moved out */ }
                <form onSubmit={this.formSubmit}>
                    <div className="input-group pull-left">
                      <input type="text" className="form-control" placeholder="Enter a town/city name" ref="newLocation"/>
                      <span className="input-group-btn">
                        <button type="submit" className="btn btn-default" onClick={this.locationSearch}>Search</button>
                      </span>
                    </div>
                    
                </form>
              </div>
            <Map location={this.state.location} weather={this.state.weather} icon={this.state.icon} />
          </div>
        </div>
        <div id="map"></div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB40ugc6sVQINRC16FT7v3llx43H99CQ1A'
})(MapContainer);