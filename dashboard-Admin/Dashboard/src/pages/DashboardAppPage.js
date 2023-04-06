  import React, {useState, useEffect} from 'react';
  import { Helmet } from 'react-helmet-async';
  import { faker } from '@faker-js/faker';
  import { useTheme } from '@mui/material/styles';
  import { Grid, Container, Typography } from '@mui/material';
  import { AppOrderTimeline, AppCurrentVisits, AppWebsiteVisits, AppTrafficBySite, AppWidgetSummary, AppCurrentSubject, AppConversionRates } from '../sections/@dashboard/app';
  import axios from 'axios';
  import Box from '@mui/material/Box';
  import Modal from '@mui/material/Modal';

  const style = { position: 'absolute', top: '0%', right: '0%', width: 800, height: '100vh', bgcolor: 'background.paper', boxShadow: 24, p: 4 };

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
    // Province and category statistics 
    const [casePerProvince, setCasePerProvince] = useState({ kigali: 0, northern: 0, southern: 0, western: 0, eastern: 0 });
    const [caseCategory, setCaseCategory] = useState({ ihohoterwaRyUmubiri: 0, ihohoterwaRishingiyeKugitsina: 0, gutotezwa: 0, kuvaMwIshuri: 0, abanaBugarijwe: 0, muMuryango: 0})
    const [chartOne, setChartOne] = useState({ girls: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], boys:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], inRisk: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });

    const [casePerSector, setCasePerSector] = useState([]);

    useEffect(() => {
      axios.get(`http://localhost:5000/api/case/list`)
      .then(response => {
        const filteredCases = [];
        
        response.data.forEach(element => {
          element.id=element._id;
          filteredCases.push(element)
        })
        setCases(filteredCases.length);

        var boys=0;
        var m=0;
        var f=0;
        var maleDisability=0;
        var femaleDisabiliy=0;  
        response.data.forEach(element => {
          var dateOfCrime = new Date(element.DateOfCrime);
          
          if (element.victimeGender === 'Gabo' || element.victimeGender === 'gabo') {
            if (element.category === 'Abana bugarijwe'){
              maleDisability++;
            }
            m++;
          } else if (element.victimeGender === 'Gore' || element.victimeGender === 'Gore') {
            if (element.category === 'Abana bugarijwe'){
              femaleDisabiliy++;
            }
            f++;
          }

          if (element.victimeGender === 'Gabo' && dateOfCrime.getMonth()+1 === 1) {
            boys++;
          }
        });

        setMale(m);
        setFemale(f);
        setDisMale(maleDisability);
        setDisFemale(femaleDisabiliy);
        
        var u=0;
        
        response.data.forEach(element => {
          if (element.hasDisability ==='Yego') {
            u++;
          }
          setBellowTen(u);
        });
      })
      .catch(error=> {
        console.log(error);
      });  
    }, []);

    // Fetch articles
    useEffect(() => {
      axios.get(`http://localhost:5000/api/blog/list`)
      .then(response => { setArticles(response.data) })
      .catch(error => console.log(error) )
    },[])
   
    useEffect(() => {
      var abugarijwe = [];
      var filteredCases = [];
      var male = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var female = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var risk = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      axios.get(`http://localhost:5000/api/report/list`)
      .then(response => {
        response.data.forEach((element) => {
          element.id=element._id;
          abugarijwe.push(element);
        })

        abugarijwe.forEach(element => {
          let reportMonth = new Date(element.dateOfReport).getMonth();
          
          if (reportMonth === 0)  {
            risk[0] = risk[0]+1;
          } else if (reportMonth === 1)  {
            risk[1] = risk[1]+1;
          } else if (reportMonth === 2)  {
            risk[2] = risk[2]+1;
          } else if (reportMonth === 3)  {
            risk[3] = risk[3]+1;
          } else if (reportMonth === 4)  {
            risk[4] = risk[4]+1;
          } else if (reportMonth === 5)  {
            risk[5] = risk[5]+1;
          } else if (reportMonth === 6)  {
            risk[6] = risk[6]+1;
          } else if (reportMonth === 7)  {
            risk[7] = risk[7]+1;
          } else if (reportMonth === 8)  {
            risk[8] = risk[8]+1;
          } else if (reportMonth === 9)  {
            risk[9] = risk[9]+1;
          } else if (reportMonth === 10)  {
            risk[10] = risk[10]+1;
          } else if (reportMonth === 11)  {
            risk[11] = risk[11]+1;
          }
        })        
      })
      .catch(error => console.log(error));

      axios.get(`http://localhost:5000/api/case/list`)
      .then(response => {
        response.data.forEach((element) => {
          element.id=element._id;
          filteredCases.push(element);
        })

        filteredCases.forEach(element => {
          let reportMonth = new Date(element.ReportDate).getMonth();
          if (element.victimeGender === 'Gabo') {
            if (reportMonth === 0)  {
              male[0] = male[0]+1;
            } else if (reportMonth === 1)  {
              male[1] = male[1]+1;
            } else if (reportMonth === 2)  {
              male[2] = male[2]+1;
            } else if (reportMonth === 3)  {
              male[3] = male[3]+1;
            } else if (reportMonth === 4)  {
              male[4] = male[4]+1;
            } else if (reportMonth === 5)  {
              male[5] = male[5]+1;
            } else if (reportMonth === 6)  {
              male[6] = male[6]+1;
            } else if (reportMonth === 7)  {
              male[7] = male[7]+1;
            } else if (reportMonth === 8)  {
              male[8] = male[8]+1;
            } else if (reportMonth === 9)  {
              male[9] = male[9]+1;
            } else if (reportMonth === 10)  {
              male[10] = male[10]+1;
            } else if (reportMonth === 11)  {
              male[11] = male[11]+1;
            }
          } else if (element.victimeGender === 'Gore') {
            if (reportMonth === 0)  {
              female[0] = female[0]+1;
            } else if (reportMonth === 1)  {
              female[1] = female[1]+1;
            } else if (reportMonth === 2)  {
              female[2] = female[2]+1;
            } else if (reportMonth === 3)  {
              female[3] = female[3]+1;
            } else if (reportMonth === 4)  {
              female[4] = female[4]+1;
            } else if (reportMonth === 5)  {
              female[5] = female[5]+1;
            } else if (reportMonth === 6)  {
              female[6] = female[6]+1;
            } else if (reportMonth === 7)  {
              female[7] = female[7]+1;
            } else if (reportMonth === 8)  {
              female[8] = female[8]+1;
            } else if (reportMonth === 9)  {
              female[9] = female[9]+1;
            } else if (reportMonth === 10)  {
              female[10] = female[10]+1;
            } else if (reportMonth === 11)  {
              female[11] = female[11]+1;
            }
          } 
        })
      
        setChartOne({ boys: male, girls: female, inRisk: risk })
      }
      )
      .catch(error => console.log(error))
    }, [])

    //fetch only year
    useEffect(() => {
      axios.get(`http://localhost:5000/api/case/list`)
      .then(response => {
        var y2023 = [], y2022 = [], y2021 = [], y2020 = [], y2019 = [];
        
        response.data.forEach(element => { 
          const dateFromDb = element.DateOfCrime
          const date = new Date(dateFromDb);
          const year = date.getFullYear();

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
        });

        let kigali=[];
        let northern=[];
        let southern=[];
        let eastern=[];
        let western=[];
        let ihohoterwaRyUmubiri=[]; 
        let ihohoterwaRishingiyeKugitsina=[];
        let gutotezwa=[];
        let kuvaMwIshuri=[];
        let abanaBugarijwe=[];
        let muMuryango = [];
        let sectors = [];

        response.data.forEach(element => {
          var splitLocations = element.agentLocation.split(',');
          var provinceOnly = splitLocations[0].trim();

          if (provinceOnly === 'Kigali City') {
            kigali.push(element);
          } else if (provinceOnly === 'Northern Province') {
            northern.push(element);
          } else if (provinceOnly === 'Southern Province') {
            southern.push(element);
          } else if (provinceOnly === 'Eastern Province') {
            eastern.push(element);
          } else if (provinceOnly === 'Western Province') {
            western.push(element);
          } 

          if (element.category === "Ihohoterwa ry'umubiri") {
            ihohoterwaRyUmubiri.push(element);
          } else if (element.category === "Ihohotera rishinyiye kugitsina") {
            ihohoterwaRishingiyeKugitsina.push(element);
          } else if (element.category === "Gutotezwa") {
            gutotezwa.push(element);
          } else if (element.category === "Kuva mwishuri") {
            kuvaMwIshuri.push(element);
          } else if (element.category === "Abana bugarijwe") {
            abanaBugarijwe.push(element);
          } else if (element.category === "Mu muryango") {
            muMuryango.push(element);
          } 
        }); 

        setCasePerProvince({ kigali: kigali.length, northern: northern.length, southern: southern.length, western: western.length , eastern: eastern.length }) 
        setCaseCategory({ abanaBugarijwe: abanaBugarijwe.length, gutotezwa: gutotezwa.length, ihohoterwaRishingiyeKugitsina: ihohoterwaRishingiyeKugitsina.length, ihohoterwaRyUmubiri: ihohoterwaRyUmubiri.length, kuvaMwIshuri: kuvaMwIshuri.length, muMuryango: muMuryango.length })
        setYear({ yr2023: y2023.length, yr2022: y2022.length, yr2021: y2021.length, yr2020: y2020.length, yr2019: y2019.length })
      })
      .catch(error => console.log(error))
    },[])
  
    useEffect(()=>{
      axios.get(`http://localhost:5000/api/case/list`)
      .then(response => {
        const sectorCounts = countCasesBySector(response.data);
        console.log(sectorCounts);
        setCasePerSector(sectorCounts);
      })
      .catch(error => console.log(error))
    },[])

    function countCasesBySector(cases) {
      const sectorCounts = {};
      for (const caseObj of cases) {
        const agentLocation = caseObj.agentLocation;
        const sector = agentLocation.split(',')[2].trim();
        if (!sectorCounts[sector]) {
          sectorCounts[sector] = 1;
        } else {
          sectorCounts[sector]++;
        }
      }

      const sectorCountArray = [];
      for (const [sector, count] of Object.entries(sectorCounts)) {
        sectorCountArray.push({ name:sector, value:count });
      }
      return sectorCountArray;
    }

    return (
      <>
        <Helmet>
          <title> Dashboard - Supervisor</title>
        </Helmet>

        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>Urakaza neza muri CRM.</Typography>
          
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
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title={` Ikigereranyo`} 
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
                    data: chartOne.girls,
                  },
                  {
                    name: 'Abahungu',
                    type: 'area',
                    fill: 'gradient',
                    data: chartOne.boys
                  },
                  {
                    name: 'Abana bugarijwe',
                    type: 'line',
                    fill: 'solid',
                    data: chartOne.inRisk,
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
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates
                title="Uko intara zigahaze"
                subheader="(+43%) Ugereranyje numwaka ushize"
                chartData={[
                  { label: 'Kigali', value: casePerProvince.kigali  },
                  { label: 'Amanjyaruguru', value: casePerProvince.northern  },
                  { label: 'Amajyepfo', value: casePerProvince.southern },
                  { label: 'Iburasirazuba', value: casePerProvince.eastern },
                  { label: 'Iburenjyerazuba', value: casePerProvince.western },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject
                title="Igereranya ry'ibibazo"
                chartLabels={["Ihohoterwa ry'umubiri", 'Gutotezwa', 'Kuva mwishuri', 'Abana bugarijwe', "Ihohoterwa rishingiye ku gitsina", 'Mu muryango']}
                chartData={[
                  { name: '2021', data: [0, 0, 0, 0, 0, 0] },
                  { name: '2022', data: [0, 0, 0, 0, 0, 0] },
                  { 
                    name: '2023', 
                    data: [
                      caseCategory.ihohoterwaRyUmubiri, 
                      caseCategory.gutotezwa,
                      caseCategory.kuvaMwIshuri, 
                      caseCategory.abanaBugarijwe, 
                      caseCategory.ihohoterwaRishingiyeKugitsina, 
                      caseCategory.muMuryango
                    ] 
                  },
                ]}
                chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
              />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={8}>
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
            </Grid> */}

            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline
                title={`Imyaka 5 ishize.`}
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
               
            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite
                title="Imirenjye yugarijwe"
                list = {casePerSector}
                // list={[
                //   {
                //     name: 'Jali',
                //     value: 323234,
                //    // icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                //   },
                //   {
                //     name: 'Nyarugenge',
                //     value: 341212,
                //     //icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                //   },
                //   {
                //     name: 'Nyaruguru',
                //     value: 411213,
                //    // icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                //   },
                //   {
                //     name: 'Rubavu',
                //     value: 443232,
                //    // icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                //   },
                //   {
                //     name: 'Nyamata',
                //     value: 443232,
                //    // icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                //   },
                //   {
                //     name: 'Burera',
                //     value: 443232,
                //    // icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                //   },
                // ]}
              />
            </Grid>

         
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
