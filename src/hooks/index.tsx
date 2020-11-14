import React from 'react';

import {SettingsProvider} from './settings';

const AppProviders: React.FC = ({children}) => (
  <SettingsProvider>{children}</SettingsProvider>
);

export default AppProviders;
