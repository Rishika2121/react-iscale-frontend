const fs = require('fs');
const file = 'src/pages/PlacementTalksPage.jsx';
const lines = fs.readFileSync(file, 'utf8').split('\n');

const newLines = [
  ...lines.slice(0, 7),
  `  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetch('https://iscale-backend.onrender.com/api/ppt/public-get-ppts')
      .then(res => res.json())
      .then(result => {
        if (result.status && Array.isArray(result.data)) {
          const mappedTalks = result.data.map(item => {
            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return '';
              const cleaned = url.replace(/\\\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : \`https://iscale-backend.onrender.com/\${cleaned.replace(/^src\\//, '')}\`;
            };
            return {
              image1: getImageUrl(item.m_pre_image),
              name: item.m_pre_name || 'Guest Speaker',
              role: item.m_pre_designation || 'Speaker',
              image2: getImageUrl(item.m_pre_company_img),
              company: item.m_pre_company || '',
              link: item.m_pre_video_link || '#'
            };
          });
          setTalks(mappedTalks);
        } else {
          setTalks([]);
        }
      })
      .catch(err => {
        console.error('PPT API Error:', err);
        setTalks([]);
      })
      .finally(() => setLoading(false));
  }, []);`,
  ...lines.slice(123)
];

fs.writeFileSync(file, newLines.join('\n'));
console.log('Fixed PlacementTalksPage.jsx');
