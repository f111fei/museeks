import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import app   from '../../lib/app';

import AppActions from '../../actions/AppActions';

const shell = electron.shell;


/*
|--------------------------------------------------------------------------
| Child - About
|--------------------------------------------------------------------------
*/

export default class SettingsAbout extends Component {

    constructor(props) {

        super(props);
        this.state = {};
    }

    render() {

        const self = this;
        const museeksLogoRequire = require('../../../images/logos/museeks.png'); // sth wrong with that, need some check with Webpack
        const museeksLogo = `dist/${museeksLogoRequire}`;

        // Don't add yourself here please, I'll do it myself
        const contributors = [
            {
                name: 'Yury Solovyov',
                pseudo: 'YurySolovyov',
                feature: 'tons of back-end tweaks and build improvements',
                url: 'https://github.com/YurySolovyov'
            },
            {
                name: 'Alba de Zanet',
                pseudo: 'Alba',
                feature: 'Museeks logo',
                url: 'https://www.behance.net/albadezanet'
            },
            {
                name: 'Moritz',
                pseudo: 'mrzmyr',
                feature: 'repeat feature',
                url: 'https://github.com/mrzmyr'
            },
            {
                name: 'Jonathan Alpay',
                pseudo: 'Suriteka',
                feature: 'icons editing',
                url: 'http://twitter.com/Suriteka'
            }
        ];

        const contributorsList = contributors.map((data, index) => {
            return (
                <li key={ index }>
                    { data.name } (<a href onClick={ self.openLink.bind(null, data.url) }>{ data.pseudo }</a>): { data.feature }
                </li>
            );
        });

        return (
            <div className='setting setting-about'>
                <div className='setting-section'>
                    <h4>About Museeks</h4>
                    <img src={ museeksLogo } className='logo-museeks' alt='Logo' title='Museeks logo' />
                    <p>
                        Museeks { app.version } - <a href onClick={ self.openLink.bind(null, 'http://museeks.io') }>museeks.io</a> - <a href onClick={ self.openLink.bind(null, `https://github.com/KeitIG/Museeks/releases/tag/${app.version}`) }>release notes</a>
                        <Button bsSize='small' className='update-checker' onClick={ this.checkForUpdate.bind(null) }>Check for update</Button>
                    </p>
                </div>
                <div className='setting-section'>
                    <h4>Contributors</h4>
                    <div className='contributors-list'>
                        <p>Made with <span className='heart'>♥</span> by Pierre de la Martinière (<a href onClick={ this.openLink.bind(null, 'http://github.com/KeitIG') }>KeitIG</a>) and a bunch of great people:</p>
                        <ul>
                            { contributorsList }
                        </ul>
                    </div>
                </div>
                <div className='setting-section'>
                    <h4>Report issue / Ask for a feature</h4>
                    <div className='contributors-list'>
                        <p>If Museeks is mostly stable, a few bugs may still occur. Do not hesitate to report them or to ask for features you would like to see on our <a href onClick={ this.openLink.bind(null, 'http://github.com/KeitIG/Museeks/issues') }>issue tracker.</a></p>
                    </div>
                </div>
            </div>
        );
    }

    openLink(link, e) {
        e.preventDefault();
        shell.openExternal(link);
    }

    checkForUpdate() {
        AppActions.settings.checkForUpdate();
    }
}
