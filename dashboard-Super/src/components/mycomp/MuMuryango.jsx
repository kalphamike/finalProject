import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/material/Collapse';
import ExpandMore from '@mui/material/Collapse';
import { Stack } from '@mui/system';
import { TextField } from '@mui/material';

const MuMuryango = ({ familyInfo, setFamilyInfo }) => {
    
    const [open6, setOpen6] = useState(true);
    const [open7, setOpen7] = useState(true);
    const [open8, setOpen8] = useState(true);   

    const handleClick6 = () => { setOpen6(!open6) };
    const handleClick7 = () => { setOpen7(!open7) };
    const handleClick8 = () => { setOpen8(!open8) };

    const updateFamilyData = ({currentTarget: input}) => { setFamilyInfo({...familyInfo, [input.name]: input.value}) }

    return (
        <>
            <ListItemButton style={{ background: "#2065d1", color: "white", borderBottom: "1px solid white"}} onClick={handleClick6}>
                <ListItemText primary="Amakuru y'umuryango" />
                {open6 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open6} timeout="auto" unmountOnExit>
                <ListItemButton sx={{ pl: 4, gap: '20px' }}>
                    <Stack spacing={3} width='45%'>
                        <TextField name="firstHeadOfFamilyName" size='small' required type="text" label="Amazina y'umugabo" value={familyInfo.firstHeadOfFamilyName} onChange={updateFamilyData}/>
                        <TextField name="headOfFamilyPhone" size='small' required type="text" label="Telefoni y'umugabo" value={familyInfo.headOfFamilyPhone} onChange={updateFamilyData}/>
                        <TextField name="numberOfFamilyMember" size='small' required type="text" label="Umubare w'abagize umuryango" value={familyInfo.numberOfFamilyMember} onChange={updateFamilyData}/>                
                    </Stack>
                    <Stack spacing={3} width='45%'>
                        <TextField name="secondHeadOfFamilyName" size='small' required type="text" label="Amazina y'umugore" value={familyInfo.secondHeadOfFamilyName} onChange={updateFamilyData}/>
                        <TextField name="SecondOfFamilyPhone" size='small' required type="text" label="Telefoni y'umugore" value={familyInfo.SecondOfFamilyPhone} onChange={updateFamilyData}/>
                        {/* <TextField name="familyResidence" size='small' required type="text" label="Aho umuryango utuye" value={familyInfo.familyResidence} onChange={updateFamilyData}/> */}
                    </Stack>
                </ListItemButton>
            </Collapse>

            <ListItemButton style={{ background: "#2065d1", color: "white", borderBottom: "1px solid white"}} onClick={handleClick7}>
                <ListItemText primary="Ikibazo mu muryango" />
                {open7 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open7} timeout="auto" unmountOnExit>
                <ListItemButton sx={{ pl: 4, gap: '20px' }}>
                    <Stack spacing={3} width='45%'>
                        <select  style={{padding: '7px 10px', border: '0.5px solid #b3cccc', width: '100%', borderRadius: '5px', fontSize: '18px', background: 'transparent', color:'#637381'}}
                        name="familyProblem" size='small' required onChange={updateFamilyData}>
                            <option value={''}>Hitamo ikibazo</option>
                            <option value={'Gucana inyuma'}>Gucana inyuma</option>
                            <option value={"Amakimbirane"}>Amakimbirane</option>
                            <option value={"Kutumvikana kunshingano"}>Kutumvikana kunshingano</option>
                            <option value={"Kurwana no gusebyanya"}>Kurwana no gusebyanya</option>
                        </select>
                        {/* {(familyInfo.familyProblem === 'Gucana inyuma' || familyInfo.familyProblem === "Ihohoterwa ry'umubiri" || familyInfo.familyProblem === "Ihohoterwa rishingiye kugitsina" ) 
                            ?  */}
                            <select  style={{padding: '7px 10px', border: '0.5px solid #b3cccc', width: '100%', borderRadius: '5px', fontSize: '18px', background: 'transparent', color:'#637381'}}
                            name="ProblemSolved" size='small' required onChange={updateFamilyData}>
                                <option value=''>Ikibazo cyarakemutse</option>
                                <option value='Yego'>Yego</option>
                                <option value='Oya'>Oya</option>
                            </select>
                            {/* :
                            <></>
                        */}
                    </Stack>
                    <Stack spacing={3} width='45%'>
                        <TextField name="DescriptionOfProblem" size='small' required type="text" label="Ubusobanuro bw'ikibazo" value={familyInfo.DescriptionOfProblem} onChange={updateFamilyData}/>
                    </Stack> 
                </ListItemButton>
            </Collapse>

            <ListItemButton style={{ background: "#2065d1", color: "white", borderBottom: "1px solid white"}} onClick={handleClick8}>
                <ListItemText primary="Ingaruka ku mwana" />
                {open8 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open8} timeout="auto" unmountOnExit>
                <ListItemButton sx={{ pl: 4, gap: '20px' }}>
                    <Stack spacing={3} width='45%'>
                        {/* <TextField name="effectOnChild" size='small' required type="text" label="Ingaruka ku mwana" value={familyInfo.effectOnChild} onChange={updateFamilyData} />                 */}
                        <select
                            style={{padding: '7px 10px', border: '1px solid #b3cccc', width: '100%', borderRadius: '5px', fontSize: '18px', background: 'transparent', color:'#637381'}}
                            name="effectOnChild" id="effectOnChild" onChange={updateFamilyData}>
                            <option value="">Ingaruka ku mwana</option>
                            <option value="Ihohoterwa ry'umubiri">Ihohoterwa ry'umubiri</option>
                            <option value="Ihohotera rishinyiye kugitsina ">Ihohotera rishinyiye kugitsina</option>
                            <option value="Gutotezwa">Gutotezwa</option>
                            <option value="Kuva mwishuri">Kuva mwishuri</option>
                        </select>
                    </Stack>
                    <Stack spacing={3} width='45%'>
                        <TextField name="effectDescription" size='small' required type="text" label="Ubusobanuro bw'ingaruka ku mwana" value={familyInfo.effectDescription} onChange={updateFamilyData} />
                    </Stack>
                </ListItemButton>
            </Collapse>
        </>
    )
}

export default MuMuryango
