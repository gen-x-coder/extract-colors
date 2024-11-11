// Function to extract the color code from the HTML
function getColorCode(html) {
    const searchPattern = '<section id=search-colors><ol><li><figure><a href=/';
    const startIndex = html.indexOf(searchPattern);
    
    if (startIndex !== -1) {
        const endIndex = html.indexOf('><img', startIndex);
        const colorCode = html.substring(startIndex + searchPattern.length, endIndex);
        return colorCode;
    }
    
    return null;
}

// Function to fetch the color data from the website
async function fetchColorData(colorCode) {
    const url = `https://encycolorpedia.com/search?q=${colorCode}`;
    
    try {
        const response = await fetch(url);
        const html = await response.text();
        const extractedColorCode = getColorCode(html);
        
        if (extractedColorCode) {
            return {
                code: colorCode,
                hex: `#${extractedColorCode}`,
                name: '',
                name_de: '',
                years: ''
            };
        } else {
            console.log(`Color code not found for ${colorCode}`);
            return null;
        }
    } catch (error) {
        console.log(`Error fetching color data for ${colorCode}:`, error);
        return null;
    }
}

// Function to update the color data with fetched information
async function updateColorData(colorData) {
    const updatedColorData = await Promise.all(
        colorData.map(async color => {
            const fetchedColor = await fetchColorData(color.code);
            return fetchedColor ? { ...color, hex: fetchedColor.hex } : color;
        })
    );
    
    return updatedColorData;
}

// Function to display the color list on the page
function displayColorList(colors) {
    const colorList = document.getElementById('color-list');
    colorList.innerHTML = ''; // Clear previous color list
    
    colors.forEach(color => {
        const colorItem = document.createElement('div');
        colorItem.innerHTML = `
            <h3>${color.name} (${color.code})</h3>
            <p>Hex: ${color.hex}</p>
            <p>German Name: ${color.name_de}</p>
            <p>Years: ${color.years}</p>
            <div style="background-color: ${color.hex}; width: 50px; height: 50px;"></div>
        `;
        colorList.appendChild(colorItem);
    });
}

// Example usage
const colorData = [
    { code: 'LY9B', hex: '#1F1F1F', name: 'Brilliant Black', name_de: 'Brillantschwarz', years: '1998-2006' },
    { code: 'LZ9V', hex: '#2D2D2D', name: 'Raven Black', name_de: 'Rabenschwarz', years: '1999-2003' },
    { code: 'LZ9W', hex: '#2E3031', name: 'Ebony Black', name_de: 'Ebonyschwarz', years: '2003-2004' },
    { code: 'LZ9X', hex: '#2D2727', name: 'Cherry Black', name_de: 'Kirschschwarz', years: '2002-2006' },
    { code: 'LZ9Y', hex: '#000000', name: 'Phantom Black', name_de: 'Phantomschwarz', years: '2004-2006' },
    { code: '6DP', hex: '#000000', name: 'Onyx', name_de: 'Onyx', years: '', note: '(interior code=AC, AD, BR, BS, ED)' },
    { code: 'JN', hex: '#000000', name: 'Ziel', name_de: 'schwarz', years: '' },
    { code: 'LA5D', hex: '#000000', name: 'Monaco Blue', name_de: 'Monaco Blau', years: '' },
    { code: 'LD5W', hex: '#000000', name: 'Malibu Blue', name_de: 'Malibu Blau', years: '' },
    { code: 'LR5D', hex: '#000000', name: 'Rave Blue', name_de: 'Rave Blau', years: '' },
    { code: 'LW5Z', hex: '#000000', name: 'Jazz Blue', name_de: 'Jazz Blau', years: '' },
    { code: 'LY5K', hex: '#000000', name: 'Brilliant Blue', name_de: 'Brillantblau', years: '' },
    { code: 'LY5T', hex: '#000000', name: 'Pelican Blue', name_de: 'Pelikanblau', years: '' },
    { code: 'LZ4U', hex: '#000000', name: 'Lilac Blue', name_de: 'Fliederblau', years: '2002-2005' },
    { code: 'LZ5C', hex: '#000000', name: 'Mauritius Blue', name_de: 'Mauritiusblau', years: '2002-2006' },
    { code: 'LZ5J', hex: '#000000', name: 'Moro Blue', name_de: 'Moroblau', years: '2001-2006' },
    { code: 'LZ5F', hex: '#000000', name: 'Sprint Blue', name_de: 'Sprintblau', years: '2002-2006' },
    { code: 'LZ5L', hex: '#000000', name: 'Ming Blue', name_de: 'Ming Blau', years: '' },
    { code: 'LZ5M', hex: '#000000', name: 'Nogaro Blue', name_de: 'Nogaroblau', years: '' },
    { code: 'LZ5W', hex: '#000000', name: 'Denim Blue', name_de: 'Denimblau', years: '1998-2002', note: 'Coupe only' },
    { code: 'LZ7K', hex: '#000000', name: 'Glacier Blue', name_de: 'Gletscherblau', years: '2002-2006' },
    { code: '3ZQ', hex: '#000000', name: 'Maritimblau', name_de: 'Maritimblau', years: '', note: '(interior code=BL, EB)' },
    { code: '1YQ', hex: '#000000', name: 'Terrablau', name_de: 'Terrablau', years: '' },
    { code: '4SM', hex: '#000000', name: 'Royalblau', name_de: 'Royalblau', years: '' },
    { code: 'JP', hex: '#000000', name: 'Denim blau', name_de: 'Denim blau', years: '' },
    { code: 'TJ', hex: '#000000', name: 'Indigo blau', name_de: 'Indigo blau', years: '' },
    { code: '4PH', hex: '#000000', name: 'Basalt', name_de: 'Basalt', years: '', note: '(interior code=EC)' },
    { code: '8EF', hex: '#000000', name: 'Muschel', name_de: 'Muschel', years: '', note: '(interior code=BE)' },
    { code: '46D', hex: '#000000', name: 'Tango', name_de: 'Tango', years: '', note: '(interior code=EA, EE)' },
    { code: '5FS', hex: '#000000', name: 'Schiefer', name_de: 'Schiefer', years: '', note: '(interior code=BN)' },
    { code: '42R', hex: '#000000', name: 'Jive', name_de: 'Jive', years: '', note: '(interior code=EF)' },
    { code: 'JQ', hex: '#000000', name: 'Feder', name_de: 'grau', years: '', note: '(+ bucket seat option)' },
    { code: 'LY7G', hex: '#000000', name: 'Quartz Grey', name_de: 'Quartzgrau', years: '2005-2006' },
    { code: 'LZ7J', hex: '#000000', name: 'Dolomite Grey', name_de: 'Dolomitgrau', years: '2002-2006' },
    { code: 'LZ7W', hex: '#000000', name: 'Arrow Grey', name_de: 'Pfeilgrau', years: '1999-2002', note: 'Coupe only' },
    { code: 'LX7Z', hex: '#000000', name: 'Dolphin Grey', name_de: 'Delphingrau', years: '' },
    { code: 'LY7W', hex: '#000000', name: 'Silver Lake', name_de: 'Silbersee', years: '1998-2006' },
    { code: 'LY7G', hex: '#000000', name: 'Quartz Grey', name_de: 'Quarzgrau', years: '' },
    { code: 'LY7H', hex: '#000000', name: 'Akoya Silver', name_de: 'Akoyasilber', years: '' },
    { code: 'LY7J', hex: '#000000', name: 'Avus Silver', name_de: 'Avussilber', years: '2001-2006' },
    { code: 'LY9F', hex: '#FFFFFF', name: 'Brilliant White', name_de: 'Brilliantweiss', years: '2001-2004' },
    { code: 'LY1Q', hex: '#000000', name: 'Dakar Beige', name_de: 'Dakargrau', years: '2005-2006' },
    { code: 'LY1R', hex: '#000000', name: 'Almond Beige', name_de: 'Mandelbeige', years: '2003-2005' },
    { code: 'LY8W', hex: '#000000', name: 'Jazz Brown', name_de: 'Jazzbraun', years: '' },
    { code: 'L94E', hex: '#000000', name: 'Oak Green', name_de: 'Oakgrün', years: '' },
    { code: 'LY6S', hex: '#000000', name: 'Talisman Green', name_de: 'Talismangrün', years: '' },
    { code: 'LY6W', hex: '#000000', name: 'Java Green', name_de: 'Javagrün', years: '' },
    { code: 'LZ6E', hex: '#000000', name: 'Deep Green', name_de: 'Tiefgrün', years: '2004-2006' },
    { code: 'LZ6Q', hex: '#000000', name: 'Murano Green', name_de: 'Muranogrün', years: '2002-2006' },
    { code: 'LZ6R', hex: '#000000', name: 'Avocado Green', name_de: 'Avocadogrün', years: '' },
    { code: 'LZ6W', hex: '#000000', name: 'Desert Green', name_de: 'Steppengras', years: '1999-2002' },
    { code: 'LZ6X', hex: '#000000', name: 'Goodwood Green', name_de: 'Goodwood Grün', years: '2002-2004' },
    { code: '3SL', hex: '#000000', name: 'Lago', name_de: 'Lago', years: '', note: '(interior code=BP)' },
    { code: 'JR', hex: '#000000', name: 'Steppe grün', name_de: 'Steppe grün', years: '', note: '(in all textile, alcantara, leather, nappa)' },
    { code: 'LY2B', hex: '#000000', name: 'Papaya Orange', name_de: 'Papayaorange', years: '2003-2006' },
    { code: 'L40A', hex: '#FFC0CB', name: 'Pink', name_de: 'Pink', years: '' },
    { code: 'LY1G', hex: '#ffd44c', name: 'Citron Yellow', name_de: 'Zitrusgelb', years: '2003-2005' },
    { code: 'LY4W', hex: '#000000', name: 'Silver Violet', name_de: 'Silberviolett', years: '2002-2005' },
    { code: 'LZ3W', hex: '#000000', name: 'Merlin Red', name_de: 'Merlinrot', years: '' },
    { code: 'LZ4W', hex: '#000000', name: 'Berry', name_de: 'Beere', years: '2002-2006' },
    { code: 'LZ4Z', hex: '#000000', name: 'Venetian Violet', name_de: 'Veneziaviolett', years: '2002-2006' },
    { code: 'LY3C', hex: '#000000', name: 'Amulet Red', name_de: 'Amulettrot', years: '1999-2002' },
    { code: 'LY3D', hex: '#000000', name: 'Tornado Red', name_de: 'Tornadorot', years: '' },
    { code: 'LY3J', hex: '#000000', name: 'Brilliant Red', name_de: 'Brilliantrot', years: '2002-2006' },
    { code: 'LZ3F', hex: '#000000', name: 'Garnet', name_de: 'Granatrot', years: '' },
    { code: 'LZ3H', hex: '#000000', name: 'Piedmont Red', name_de: 'Piemontrot', years: '' },
    { code: 'LZ3K', hex: '#000000', name: 'Burgundy', name_de: 'Burgunderrot', years: '' },
    { code: 'LZ3L', hex: '#000000', name: 'Hibiscus', name_de: 'Hibiskusrot', years: '' },
    { code: 'LZ3M', hex: '#000000', name: 'Misano Red', name_de: 'Misanorot', years: '2001-2006' },
    { code: 'LZ3Q', hex: '#000000', name: 'Merlot', name_de: 'Merlotrot', years: '' }
];

updateColorData(colorData)
    .then(updatedColors => {
        console.log(updatedColors);
        displayColorList(updatedColors);
    })
    .catch(error => {
        console.log('Error updating color data:', error);
    });
