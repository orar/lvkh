import React from 'react';
import { withI18n, Trans } from 'lingui-react';
import PropTypes from 'prop-types';
import config from 'config';
import { Link } from 'react-router';
import _ from 'lodash';
import './Footer.scss'


const isNull = (arr = []) => arr.join().replace('/,/g', '').replace('/ /g', '').length === 0;

export const Footer = ({ user, children }) => (
    <div className='footer_container'>
        {/*<div className='footer_top'>
            <div className='footer_top_col'>
                <h5 className='footer_top__col--header'>
                    <Link to={config.route.front.platform} >
                        <Trans>Major Gift Cards</Trans>
                    </Link>
                </h5>
                <p className='footer_top__col--item'>
                    <a href='https://amazon.com'>Amazon</a>
                </p>
                <p className='footer_top__col--item'>
                    <a href='https://itunes.com'>Apple iTunes</a>
                </p>
                <p className='footer_top__col--item'>
                    <a href='https://playstore.google.com'>Google Playstore</a>
                </p>
                <p className='footer_top__col--item'>
                    <a href='https://ebay.com'>Ebay</a>
                </p>
            </div>
            { !isNull(children) && <div> { children } </div> }
            <div className='footer_top_col'>
                <h5 className='footer_top__col--header'>
                    <Trans>Check Our Media</Trans>
                </h5>
                <div className='footer_top__col--item'>
                    <a href='https://fb.me/prepur' target='_blank'>Facebook</a>
                </div>
                <div className='footer_top__col--item'>
                    <a href='https://twitter.com/prepurd' target='_blank'>Twitter</a>
                </div>
                <div className='footer_top__col--item'>
                    <a href='https://www.linkedin.com/company/27023759/' target='_blank'>LinkedIn</a>
                </div>
                <div className='footer_top__col--item'>
                    <a href='#' target='_blank'>Whatsapp +233 0200916790</a>
                </div>
            </div>
            <div className='footer_top_col'>
                <h5 className='footer_top__col--header'>
                    <Link to={config.route.home.support} >
                        <Trans>Support</Trans>
                    </Link>
                </h5>
                <p className='footer_top__col--item'><a><Trans>Help</Trans></a></p>
                <p className='footer_top__col--item'>
                    <Link to={config.route.home.faq}>
                        <Trans>Frequently Asked Questions</Trans>
                    </Link>
                </p>
                <p className='footer_top__col--item'><a><Trans>Security</Trans></a></p>
                <p className='footer_top__col--item'>
                    <Link href={config.route.home.support}>
                        <Trans>Contact Us</Trans>
                    </Link>
                </p>
            </div>
        </div>*/}

        <div className='footer_base'>
           <div className='footer_base__item footer_link footer_dim'>
               <p>&copy;{new Date().getFullYear()} Livekoach. All rights reserved.</p>
           </div>
           <div className='footer_base__item footer_link footer_bright'>
               <Link to={config.route.index} >
                   <Trans>Privacy & Terms</Trans>
               </Link>
           </div>
       </div>
    </div>
);



export default Footer;