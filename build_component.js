const fs = require('fs');

const originalComponentLines = fs.readFileSync('original_CourseDetailsPage.jsx', 'utf16le').split(/\r?\n/);
const newJsx = fs.readFileSync('converted_layout.jsx', 'utf8');

// The main return is at line 797 (index 796)
const returnIndex = 796;

const header = originalComponentLines.slice(0, returnIndex).join('\n');

const footer = `
export default CourseDetailsPage;
`;

const finalComponent = `${header}
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: 'var(--font-body)', paddingBottom: 100 }}>
        ${newJsx}
    </div>
  );
};
${footer}`;

// Let's also fix the unclosed <br> tag in newJsx before saving!
let fixedComponent = finalComponent.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');

// Replace the thumbnail
fixedComponent = fixedComponent.replace(/src="https:\/\/www\.theiscale\.com\/myadmin\/uploads\/courses\/Data_science_Course_paid_compressed\.png"/g, 'src={data.thumbnail}');

// Replace the certificate
fixedComponent = fixedComponent.replace(/src="https:\/\/www\.theiscale\.com\/assets\/images\/Sample Certificate\.png"/g, 'src={certImg}');

fs.writeFileSync('src/pages/CourseDetailsPage.jsx', fixedComponent, 'utf8');
console.log("Successfully properly rebuilt CourseDetailsPage.jsx");
