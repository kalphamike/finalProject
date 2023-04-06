// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name,color = '#f9fafb') => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} style={{backgroundColor: '#f9fafb'}}/>;





const navConfig = [
  {
    title: 'Isesengura',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    
  },
  {
    title: 'IZU',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Kora imfashanyigisho ',
    path: '/dashboard/NewCase',
    icon: icon('add-case'),
   },
  //  {
  //   title: 'Abana bugarijwe ',
  //   path: '/dashboard/404',
  //   icon: icon('ic_disabled'),
  //  },
    {
    title: 'Ibirego bya twanzwe',
    path: '/dashboard/cases',
    icon: icon('list-cases'),
  },
   {
     title: "lisite y'abana ",
     path: '/dashboard/Victims',
     icon: icon('victimes'),
   },
   
  {
    title: "lisite y'abaregwa",
    path: '/dashboard/Suspect',
    icon: icon('suspects'),
  },
  {
    title: 'Mu muryango',
    path: '/dashboard/Mumuryango',
    icon: icon('family'),
  }
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
