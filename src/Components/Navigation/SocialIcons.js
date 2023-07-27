import React from 'react';
import PropTypes from 'prop-types';
import { FaTwitter, FaFacebookF } from 'react-icons/fa6';
import { TfiGoogle, TfiPinterest } from 'react-icons/tfi';
import Icon from './Icon';

const SocialIcons = ({ className }) => (
  <ul className={className}>
    <Icon icon={<FaTwitter />} />
    <Icon icon={<FaFacebookF />} />
    <Icon icon={<TfiGoogle />} />
    <Icon icon={<TfiPinterest />} />
  </ul>
);

SocialIcons.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SocialIcons;
