// Imports
import React from "react";
import ReactDOM from "react-dom";
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

// style
import './success.scss';

class Success extends React.Component {
    state = {
        authenticated: false,
        loading: true
    }

    componentDidMount() {
        // Check logged in status
        fetch('/api/authenticated')
        .then(handleErrors)
        .then(data => {
            this.setState({
                authenticated: data.authenticated
            })
        });

        // Get booking id
        const booking_id = document.getElementById('params').dataset.bookingId;
        fetch(`/api/bookings/${booking_id}`)
        .then(handleErrors)
        .then(booking_details => {
            this.setState({
                booking: booking_details,
                loading: false
            });
        })

    }

    render() {
        return (
            <Layout isLoggedIn={this.state.authenticated}>
                <div className="main-wrap">
                    <div className={ this.state.loading ? "loading_wrap active" : "loading_wrap" }>
                        <h1>Success! Thank you for booking your stay.</h1>
                    </div>
                    <div className="info_wrap">
                        <div className="main-image" style={{ backgroundImage: `url(${ this.state.loading ? '#' : this.state.booking.image_url })` }}></div>
                        <div className="details-col">
                            <h2>{ this.state.loading ? "" : this.state.booking.property_title }</h2>
                            <p>{ this.state.loading ? "" : this.state.booking.property_description }</p>
                            <div className="dates">
                                <div className="in">{ this.state.loading ? "" : this.state.booking.start_date }</div>
                                <div className="out">{ this.state.loading ? "" : this.state.booking.end_date }</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <Success />,
      document.body.appendChild(document.createElement('div')),
    )
})