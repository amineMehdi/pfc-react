import React from 'react';
import PropTypes from 'prop-types';

export default class PfcTile extends React.Component{
    render(){
        return (
            <div className="tile">
                <div className="tile-name">
                    <h2>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}</h2>
                </div>
                <div className="tile-image">
                    <img src={this.props.src} alt='fer'/>
                </div>
            </div>
        );
    }
    static propTypes= {
        src : PropTypes.string,
        name: PropTypes.string
    }
}
