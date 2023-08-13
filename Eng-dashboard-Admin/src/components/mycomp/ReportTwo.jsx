import React, { useState } from 'react';
import { FcPrint } from 'react-icons/fc';
import './ReportStyles.css';
import jsPDF from 'jspdf';

const ReportTwo = ({reportData}) => {
    const print = () => {
        const doc = new jsPDF('p', 'cm', [29.7, 21.0]);
        doc.html(document.querySelector("#report"), {
            callback: function (pdf) {
                pdf.save(`Report-${new Date().toDateString()}.pdf`);
            }
        });
    }
     
    return (
        <div className='main-container' id='report'>      
            <div className='inner-container'>
                <div>
                    <img src="/assets/logo.png" alt="Your Image" />
                    <h6 className="subtitle">NCDA Rwanda | www.ncda.gov.rw | info@ncda.gov.rw</h6>
                    <h1 className="header">Child Protection General Report.</h1>
                    {/* <h2 className="content-header">Report from {sectorOnly} sector IZU </h2> */}
                    <p>At {new Date().toDateString()}</p>
                    <div className="content-date"><p id="date"></p></div>
                    <div className="paragraph"></div>
                </div>

                <center>
                    <h4 className="content-header">Children Care information</h4>
                    <p className="category-header">This table below indicates all numbers of children abuse cases recorded on the national level by IZU<b>{reportData.caseCategory}</b>.</p>
                </center>
                
                <table>
                    <tr>
                        <th>Province</th>
                        <th>Abana bose</th>
                        <th>Ababana n'ubumuga</th>
                        <th>Gabo</th>
                        <th>Gore</th> 
                    </tr>
                    <tr>
                        <td>Kigali City</td>
                        <td>{10}</td>
                        <td>{4}</td>
                        <td>{2}</td>
                        <td>{8}</td>
                    </tr>
                    <tr>
                        <td>Northern province</td>
                        <td>{5}</td>
                        <td>{1}</td>
                        <td>{0}</td>
                        <td>{5}</td>
                    </tr>
                    <tr>
                        <td>Southern province</td>
                        <td>{4}</td>
                        <td>{1}</td>
                        <td>{0}</td>
                        <td>{4}</td>
                    </tr>
                    <tr>
                        <td>Eastern province</td>
                        <td>{7}</td>
                        <td>{2}</td>
                        <td>{1}</td>
                        <td>{6}</td>
                    </tr>
                    <tr>
                        <td>Western province</td>
                        <td>{3}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{3}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{29}</td>
                        <td>{8}</td>
                        <td>{3}</td>
                        <td>{26}</td>
                    </tr>
                </table>


                {/* <table>
                    <tr>
                        <th>District</th>
                        <th>Abana bose</th>
                        <th>Ababana n'ubumuga</th>
                        <th>Gabo</th>
                        <th>Gore</th> 
                    </tr>
                    <tr>
                        <td>Gasabo</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                    </tr>
                    <tr>
                        <td>Nyarugenge</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                    </tr>
                    <tr>
                        <td>Gatsibo</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                    </tr>
                </table> */}


                {/* <table>
                    <tr>
                        <th>Sectors</th>
                        <th>Abana bose</th>
                        <th>Ababana n'ubumuga</th>
                        <th>Gabo</th>
                        <th>Gore</th> 
                    </tr>
                    <tr>
                        <td>Kacyiru</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                    </tr>
                    <tr>
                        <td>Kimironko</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                    </tr>
                    <tr>
                        <td>Kicukiro</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                    </tr>
                    <tr>
                        <td>Kibagabaga</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                    </tr>
                </table> */}

                <center>
                    <h4 className="content-header">Family issue information</h4>
                    <p className="category-header">The table bellow families indicates all numbers of with conflict that can affect children.</p>
                </center>
                
                <table>
                    <tr>
                        <th>Province</th>
                        <th>Families</th>
                        <th>Solved issues</th>
                        <th>Unsolved issues</th>
                    </tr>
                    <tr>
                        <td>Kigali City</td>
                        <td>{40}</td>
                        <td>{25}</td>
                        <td>{15}</td>
                    </tr>
                    <tr>
                        <td>Northern province</td>
                        <td>{20}</td>
                        <td>{5}</td>
                        <td>{15}</td>
                    </tr>
                    <tr>
                        <td>Southern province</td>
                        <td>{22}</td>
                        <td>{2}</td>
                        <td>{20}</td>
                    </tr>
                    <tr>
                        <td>Eastern province</td>
                        <td>{35}</td>
                        <td>{7}</td>
                        <td>{28}</td>
                    </tr>
                    <tr>
                        <td>Western province</td>
                        <td>{24}</td>
                        <td>{18}</td>
                        <td>{6}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{165}</td>
                        <td>{57}</td>
                        <td>{84}</td>
                    </tr>
                </table>
            </div>

            <div style={{display: 'flex' ,justifyContent:'flex-end' , width:'100%', marginTop:'40px' }}>
                <div className="column" style={{width:'40%' }}>
                    <p>CRS Admin</p>
                    <p>Names: { localStorage.getItem('adminName')}  </p>
                    <p>Phone Number: {localStorage.getItem('adminPhone')}</p>
                </div>
            </div>
            <footer style={{textAlign: 'center', marginTop: '20px'}}>Copyright &copy; {new Date().getFullYear()} NCDA Rwanda | www.
                cda.gov.rw | info@ncda.gov.rw
            </footer>
        </div>
  )
}

export default ReportTwo
