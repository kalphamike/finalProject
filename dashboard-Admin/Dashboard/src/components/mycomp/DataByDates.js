const axios = require('axios');

const Jan = { m:'', f:'', u:'' };
const Feb = { m:'', f:'', u:'' };
const Mar = { m:'', f:'', u:'' };
const Apr = { m:'', f:'', u:'' };
const May = { m:'', f:'', u:'' };
const Jun = { m:'', f:'', u:'' };
const Jul = { m:'', f:'', u:'' };
const Aug = { m:'', f:'', u:'' };
const Sep = { m:'', f:'', u:'' };
const Oct = { m:'', f:'', u:'' };
const Nov = { m:'', f:'', u:'' };
const Dec = { m:'', f:'', u:'' };

let allCases = [];

axios.get(`http://localhost:5000/api/case/list`)
.then(response => {
    allCases = response.data;
})
.catch(error=> { console.log(error)})

exports.january = () => {
    allCases.forEach(element => {
        if (element.locationOfCrime === localStorage.getItem('userLocation')) {
            if (new Date(element.ReportDate).getMonth() === '1') {
            let male = 0;
            let female = 0;
            let disability = 0;
    
            if (element.victimeGender === 'Gabo' || element.victimeGender === 'gabo') {
                male=+1;
            } else if (element.victimeGender === 'Gore' || element.victimeGender === 'gore') {
                female=+1
            } else if (element.hasDisability ==='Yego') {
                disability=+1
            }
    
            Jan.m = male;
            Jan.f = female;
            Jan.u = disability;
            }
        }
    })
}
