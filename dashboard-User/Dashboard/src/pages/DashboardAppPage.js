  import React, {useState, useEffect} from 'react';
  import { Helmet } from 'react-helmet-async';
  import { faker } from '@faker-js/faker';
  import { useTheme } from '@mui/material/styles';
  import { Grid, Container, Typography } from '@mui/material';
  import Iconify from '../components/iconify';
  import { IoMale, IoMdFemale } from 'react-icons/io';
  import BlogPopper from 'src/components/mycomp/blogPopper';
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
  import axios from 'axios';
  import { element } from 'prop-types';
  import Box from '@mui/material/Box';
  import Button from '@mui/material/Button';
  import Modal from '@mui/material/Modal';

  const style = {
    position: 'absolute',
    top: '0%',
    right: '0%',
    width: 800,
    height: '100vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  export default function DashboardAppPage() {
    const theme = useTheme();

    const [cases, setCases] = useState(0);
    var [male, setMale] = useState(0);
    var [female, setFemale] = useState(0);
    const [bellowTen, setBellowTen] = useState(0);
    const [disMale, setDisMale] = useState(0);
    const [disFemale, setDisFemale] = useState(0);
    const [years, setYear] = useState({yr2023:0,yr2022:0,yr2021:0,yr2020:0,yr2019:0});
    const [articles, setArticles] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
      axios.get(`http://localhost:5000/api/case/list`)
      .then(response => {
        const filteredCases = [];
        response.data.forEach(element => {
          element.id=element._id
          if (element.locationOfCrime === localStorage.getItem('userLocation')) {
            filteredCases.push(element);
          }
        })
        setCases(filteredCases.length);

        var numberOfBoys = [];
        
        var boys=0;
        var m=0;
        var f=0;
        var maleDisability=0;
        var femaleDisabiliy=0;  
        response.data.forEach(element => {
          var dateOfCrime = new Date(element.DateOfCrime);
          
          if ((element.victimeGender === 'Gabo' || element.victimeGender === 'gabo') && element.locationOfCrime === localStorage.getItem('userLocation')) {
                if (element.category === 'Abana bugarijwe'){
                  maleDisability++;
                }
            m++;
          } else if ((element.victimeGender === 'Gore' || element.victimeGender === 'Gore') && element.locationOfCrime === localStorage.getItem('userLocation')){
                if (element.category === 'Abana bugarijwe'){
                  femaleDisabiliy++;
                }
            f++;
          }

          if (element.victimeGender === 'Gabo' && dateOfCrime.getMonth()+1 === 1 && element.locationOfCrime === localStorage.getItem('userLocation')) {
            boys++;
          }
        });
        console.log("Male: "+m+"Female: "+f);
        setMale(m);
        setFemale(f);
        setDisMale(maleDisability);
        setDisFemale(femaleDisabiliy);
        
        var u=0;
        
        response.data.forEach(element => {
          if (element.hasDisability ==='Yego' && element.locationOfCrime === localStorage.getItem('userLocation')) {
            u++;
          }
          setBellowTen(u);
        });
      })
      .catch(error=> {
        console.log(error);
      });  
    }, []);

    //Agent location display 
    var AgentSector = localStorage.getItem('userLocation');
    var words = AgentSector.split(',');
    var sectorOnly = words[3].trim();

    useEffect(() => {
      axios.get(`http://localhost:5000/api/blog/list`)
      .then(response => { setArticles(response.data) })
      .catch(error => console.log(error) )
    },[])
    
    //fetch only year
    useEffect(() => {
      axios.get(`http://localhost:5000/api/case/list`)
      .then(response => {
        var y2023 = [], y2022 = [], y2021 = [], y2020 = [], y2019 = [];
        
        response.data.forEach(element => { 
          const dateFromDb = element.DateOfCrime
          const date = new Date(dateFromDb);
          const year = date.getFullYear();
          
          if ( element.locationOfCrime === localStorage.getItem('userLocation') ){
            if ( year === 2023 ){
              y2023.push(element)
            }else if (year === 2022){
              y2022.push(element)
            }else if (year === 2021){
              y2021.push(element)
            }else if (year === 2020){
              y2020.push(element)
            }else if (year === 2019){
              y2019.push(element)
            }     
          }
                  
        })
        console.log(y2023.length,y2022.length,y2021.length,y2020.length,y2019.length)
        setYear({
          yr2023: y2023.length,
          yr2022: y2022.length,
          yr2021: y2021.length,
          yr2020: y2020.length,
          yr2019: y2019.length,
        })
      })
      .catch(error => console.log(error))
    },[])
        
    return (
      <>
        <Helmet>
          <title> Dashboard - Agent</title>
        </Helmet>

        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>Urakaza neza mu mudugudu wa {sectorOnly}</Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Imibare yose hamwe" total={cases} icon={'iconoir:graph-up'} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Abahungu" total={male} color="info" icon={'ant-design:man-outlined'} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Abakobwa" total={female} color="warning" icon={'ant-design:woman-outlined'} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Ababana n'ubumuga" total={bellowTen} color="error" icon={'fontisto:paralysis-disability'} />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title={` Muri ${sectorOnly}`} 
                subheader="Buri Kwezi"
                chartLabels={[
                  '01/01/2023',
                  '02/01/2023',
                  '03/01/2023',
                  '04/01/2023',
                  '05/01/2023',
                  '06/01/2023',
                  '07/01/2023',
                  '08/01/2023',
                  '09/01/2023',
                  '10/01/2023',
                  '11/01/2023',
                ]}
                chartData={[
                  {
                    name: 'Abakobwa',
                    type: 'column',
                    fill: 'solid',
                    data: [male,34, 13, 7, 3, 20, 3, 1, 8, 2, 10],
                  },
                  {
                    name: 'Abahungu',
                    type: 'area',
                    fill: 'gradient',
                    data: [23, 6, 1, 0, 3, 0, 1, 4, 3, 7, 3],
                  },
                  {
                    name: 'Munsi yimyaka 10',
                    type: 'line',
                    fill: 'solid',
                    data: [23, 2, 0, 0, 2, 9, 0, 2, 5, 3, 80],
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={5} lg={4}>
              <AppCurrentVisits
                title="Abana Bugarijwe  "
                chartData={[
                  { label: 'Abakobwa', value: disFemale },
                  { label: 'Abahungu ', value: disMale },
                  //{ label: 'Abafite ubumuga', value: bellowTen },
                  //{ label: 'Munsi yimyaka 10', value: 44 }
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.warning.main,
                  theme.palette.error.main,
                  theme.palette.error.light,
                ]}
              />
            </Grid> */}

            {/* <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates
                title="Conversion Rates"
                subheader="(+43%) than last year"
                chartData={[
                  { label: 'Italy', value: 400 },
                  { label: 'Japan', value: 430 },
                  { label: 'China', value: 448 },
                  { label: 'Canada', value: 470 },
                  { label: 'France', value: 540 },
                  { label: 'Germany', value: 580 },
                  { label: 'South Korea', value: 690 },
                  { label: 'Netherlands', value: 1100 },
                  { label: 'United States', value: 1200 },
                  { label: 'United Kingdom', value: 1380 },
                ]}
              />
            </Grid> */}

            {/* <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject
                title="Current Subject"
                chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
                chartData={[
                  { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                  { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                  { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                ]}
                chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
              />
            </Grid> */}

            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate
                title="Ipfasha nyigisho"
                setOpen={setOpen}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                list={articles.map((article, index) => ({
                  id: article._id,
                  title:  article.blogTitle,
                  description: article.blogBody,
                  image: `http://localhost:5000/api/blog/uploads/${article.blogPicture}`,
                }))}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline
                title={`Imyaka 5 ishize muri ${sectorOnly}`}
                list={[...Array(5)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: [
                    '2019:'+' '+ years.yr2019 +' '+'Abana',
                    '2020:'+' '+ years.yr2020 +' '+'Abana',
                    '2021:'+' '+ years.yr2021 +' '+'Abana',
                    '2022:'+' '+ years.yr2022 +' '+'Abana',
                    '2023:'+' '+ years.yr2023 +' '+'Abana',
                  ][index],
                  type: `order${index + 1}`,
                  //time: faker.date.past(),
                }))}
              />
            </Grid>
               
            {/* <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite
                title="Traffic by Site"
                list={[
                  {
                    name: 'FaceBook',
                    value: 323234,
                    icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                  },
                  {
                    name: 'Google',
                    value: 341212,
                    icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                  },
                  {
                    name: 'Linkedin',
                    value: 411213,
                    icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                  },
                  {
                    name: 'Twitter',
                    value: 443232,
                    icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                  },
                ]}
              />
            </Grid> */}

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
          
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedItem.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedItem.description}
            </Typography>
          </Box>
        </Modal>
      </>
    );
  }
