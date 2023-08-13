// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name,color = '#f9fafb') => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} style={{backgroundColor: '#f9fafb'}}/>;





const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    
  },
  {
    title: 'IZU',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'teaching aids',
    path: '/dashboard/NewCase',
    icon: icon('add-case'),
   },
    {
    title: 'All Cases',
    path: '/dashboard/cases',
    icon: icon('list-cases'),
  },
   {
     title: "All Children ",
     path: '/dashboard/Victims',
     icon: icon('victimes'),
   },
   
  {
    title: "All Suspects",
    path: '/dashboard/Suspect',
    icon: icon('suspects'),
  },
  {
    title: 'In Family',
    path: '/dashboard/Mumuryango',
    icon: icon('family'),
  }
  
];

export default navConfig;
