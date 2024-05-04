import React from 'react';
import './Welcome.scss';

import Text from '../../atoms/text/Text';

import VersiSvg from '../../../../public/res/svg/versi.svg';

function Welcome() {
  return (
    <div className="app-welcome flex--center">
      <div>
        <img className="app-welcome__logo noselect" src={VersiSvg} alt="Versi logo" />
        <Text className="app-welcome__heading" variant="h1" weight="medium" primary>Welcome to Versi</Text>
        <Text className="app-welcome__subheading" variant="s1">A liberated MIT-licensed fork of Cinny 2.2.4 maintained by and for TrueOG Network.</Text>
      </div>
    </div>
  );
}

export default Welcome;
