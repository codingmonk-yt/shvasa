// components
import { Ticket, User } from '@phosphor-icons/react';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const navConfig = [
  // 
  // ----------------------------------------------------------------------
  {
    subheader: ' ',
    items: [
      { title: 'agents', path: PATH_DASHBOARD.agent, icon: <User /> },
      { title: 'support tickets', path: PATH_DASHBOARD.ticket, icon: <Ticket /> },
    ],
  },
];

export default navConfig;
