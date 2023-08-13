const { FormControl, Select, MenuItem } = require("@mui/material");
const { useEffect, useState } = require("react");

// LANGUAGE SELECTOR 
export default function LanguageSelector() {
    const [selectedLanguage, setSelectedLanguage] = useState('');
  
    useEffect(() => {
      const currentURL = window.location.href;
      if (currentURL === 'http://localhost:3012/dashboard/app') {
        setSelectedLanguage('en');
      }
    }, []);
  
    const handleChange = (event) => {
      setSelectedLanguage(event.target.value);
      if (event.target.value === 'rw') {
        window.location.href = 'http://localhost:3002/dashboard/app';
      }
    };
  
    return (
      <FormControl
        sx={{
          position: 'fixed',
          bottom: 'calc(10% + 16px)',
          left: 16,
          zIndex: 9999,
        }}
      >
        <Select
          value={selectedLanguage}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Select language' }}
          
        >
          {selectedLanguage !== 'en' && (
            <MenuItem value="" disabled>
              <img src="/assets/flags/placeholder.png" alt="Select language" style={{ marginRight: 8 }} />
            </MenuItem>
          )}
          <MenuItem value="en">
            <img src="/assets/eng.svg" alt="English" style={{  width: '20px', height: '20px', marginRight: '8px' }} />
          </MenuItem>
          <MenuItem value="rw">
            <img src="/assets/kiny.svg" alt="Kinyarwanda" style={{  width: '20px', height: '20px', marginRight: '8px' }} />
          </MenuItem>
        </Select>
      </FormControl>
    );
  };