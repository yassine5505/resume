import React from 'react';
import { bio } from "../../resume";

const url = "http://localhost:3000/banner.txt";

export default class Whoami extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banner: ""
        }
    }
    loadBanner = async () => {
        await fetch(url)
        .then(response => response.text())
        .then((data) => {
            this.setState({
                banner: data
            });
        })
        .catch(err => console.log(err));
    }

    componentDidMount = () => {
        this.loadBanner();
    }
    
    render() {
        const { banner } = this.state;
        return (
            <div className="whoami">
                <pre className="banner">
                    { banner }
                </pre>
                <h5>{ bio.title }</h5>
                <p>{ bio.description }</p>
                <p>{ "Phone: " + bio.phone }</p>
                <p>
                    Email:
                    &nbsp;
                    <a href={"mailto:" + bio.email}>{ bio.email }</a>
                </p>
                {
                    bio.contact.map((contact, index) => {
                        return (
                            <div key={index}>
                                <a href={contact.link} target="_blank" rel="noopener noreferrer">
                                    {contact.name}
                                </a>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}