import React from 'react';
import { FaTwitter, FaFacebookF } from 'react-icons/fa6';
import { TfiGoogle, TfiPinterest } from 'react-icons/tfi';
import Icon from './Icon';

const SocialIcons = () => (
  <ul className="social-icons">
    <Icon icon={<FaTwitter />} />
    <Icon icon={<FaFacebookF />} />
    <Icon icon={<TfiGoogle />} />
    <Icon icon={<TfiPinterest />} />
  </ul>
);

export default SocialIcons;
