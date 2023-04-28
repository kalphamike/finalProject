import React, { useState } from 'react';
import { FcPrint } from 'react-icons/fc';
import './ReportStyles.css';
import jsPDF from 'jspdf';

const ReportOne = ({reportData}) => {
    const print = () => {
        const doc = new jsPDF('p', 'cm', [29.7, 21.0]);
        doc.html(document.querySelector("#report"), {
            callback: function (pdf) {
                pdf.save(`Report-${new Date().toDateString()}.pdf`);
            }
        });
    }


     //Supervisor location display 
     var SupervisorSector = localStorage.getItem('supervisorLocation');
     var words = SupervisorSector.split(',');
     var sectorOnly = words[2].trim();
     var districtOnly = words[1].trim();
     var provenceOnly = words[0].trim();

    return (
    <>
        <div className='main-container' id='report'>      
            <div>
                <h1 className="header">Report of Protecting child <FcPrint onClick={print} /></h1>
                <h6 className="subtitle">NCDA Rwanda | www.ncda.gov.rw | info@ncda.gov.rw</h6>
                <h2 className="content-header">Report from {sectorOnly} sector IZU </h2>
                <p>{provenceOnly},{districtOnly},{sectorOnly}, at {new Date().toDateString()}</p>
                <div className="content-date"><p id="date"></p></div>
                <div className="paragraph">
                    
                </div>
            </div>
            <div>
                <center><h4 className="content-header">Children Care information</h4></center>
                <table>
                    <tr>
                        <th>Abana bose</th>
                        <th>Abana bugarijwe</th>
                        <th>Ababana n'ubumuga</th>
                        <th>Gabo</th>
                        <th>Gore</th> 
                    </tr>
                    <tr>
                        <td>{reportData.children}</td>
                        <td>{reportData.riskChildren}</td>
                        <td>{reportData.disabledChildren}</td>
                        <td>{reportData.male}</td>
                        <td>{reportData.female}</td>
                    </tr>
                </table>
            </div>
            <div>
                <center><h4 className="content-header">Fammily care information</h4></center>
                <table>
                    <tr>
                        <th>Imiryango yasuwe</th>
                        <th>Imiryango ifite ibibazo</th>
                        <th>Imiryango yacyemuye ibibazo </th>
                        <th>Imiryango idafite ibibazo</th>
                    </tr>
                    <tr>
                        <td>{reportData.visitedFamilies}</td>
                        <td>{reportData.inRisk}</td>
                        <td>{reportData.solved}</td>
                        <td>{reportData.rest}</td>
                    </tr>
                </table>
            </div>
            <div style={{display: 'flex' ,justifyContent: 'center'}}>
                {/* <div style={{flex: '1'}}>
                    <div className="column">
                        <p>Sector coordinator</p>
                        <p>Names:</p>
                        <p>Phone Number:  </p>
                    </div>
                </div> */}
                <div style={{flex: '1'}}>
                    <div className="column">
                        <p>District coordinator</p>
                        <p>Names: { localStorage.getItem('supervisorName')}  </p>
                        <p>Phone Number: {localStorage.getItem('supervisorPhone')}</p>
                    </div>
                </div>
            </div>
            <footer style={{textAlign: 'center', marginTop: '20px'}}>Copyright &copy; {new Date().getFullYear()} NCDA Rwanda | www.
                cda.gov.rw | info@ncda.gov.rw
            </footer>
        </div>
    </>
  )
}

export default ReportOne
