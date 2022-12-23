import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { calculateSize } from '@iconify/react';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  
  // Total Agents

  const n=1993
  const e=6746
  const w=7668
  const s=987
  const k=3822
  const total=n+e+w+k+s;
  const banned= e-n;
  const deleted=e-s;
  const active=w+k;



  //Cases calculator
  const Calcases={
      newCase : 3,
      closedCase : 27,
      pandingCase :2,
    }
    const totalCase=Calcases.newCase + Calcases.closedCase + Calcases.pandingCase
  return (
    <>
      <Helmet>
        <title> Dashboard-Agent</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>


      
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Active User" total={active} icon={'ant-design:case'} />
          </Grid>
          
      
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Banned User " total={banned} color="warning" icon={'ant-design:plus'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Deleted User" total={deleted} color="error" icon={'ant-design:pending'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total User" total={total} color="info" icon={'ant-design:minus'} />
          </Grid>
          

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Cases in Jali sector"
              subheader="Per month"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/04/2023',
                '05/05/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
              ]}
              chartData={[
                {
                  name: 'segment',
                  type: 'column',
                  fill: 'solid',
                  data: [2, 11, 13, 7, 3, 20, 3, 1, 8, 2, 10],
                },
                {
                  name: 'Mental',
                  type: 'area',
                  fill: 'gradient',
                  data: [4, 6, 1, 0, 3, 0, 1, 4, 3, 7, 3],
                },
                {
                  name: 'Physical',
                  type: 'line',
                  fill: 'solid',
                  data: [0, 2, 0, 0, 2, 9, 0, 2, 5, 3, 0],
                },
                {
                  name: 'Rapping',
                  type: 'line',
                  fill: 'solid',
                  data: [6, 8, 7, 0, 2, 9, 10, 20, 5, 3, 0],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Cases In Jali Sector"
              chartData={[
                { label: 'Agateko', value: 44 },
                { label: 'Kinunga ', value: 5 },
                { label: 'Gihogwe', value: 14 },
                { label: 'kabuye', value: 44 },
                { label: 'kabizoza', value: 6 }
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
                theme.palette.error.light,
              ]}
            />
          </Grid>

          

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Curreny Users"
              chartLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20,19,23,22,33,13,12] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80,30, 50, 30, 40, 100, 20] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10, 80, 50, 30, 90, 10, 20] },
              ]}
              chartColors={[...Array(12)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="New Agents In System"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Top 5 Danger Zone Areas"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Muhima',
                  'Kimisagara',
                  'Gisozi',
                  'Nyamirambo',
                  'Jali',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Total Agents Now"
              list={[
                {
                  name: 'Kigali',
                  value: k,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Northern',
                  value: n,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Western',
                  value: w,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Eastern',
                  value: e,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
                {
                  name: 'Southern',
                  value: s,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
                
                {
                  name: 'All Agents',
                  value: total,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1CDCEA" width={32} />,
                },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
