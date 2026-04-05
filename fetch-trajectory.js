// Run with: node fetch-trajectory.js
// Fetches Artemis II trajectory from JPL Horizons and outputs a JS array
// to paste into artemis2.html

const https = require('https');

const url = 'https://ssd.jpl.nasa.gov/api/horizons.api'
  + '?format=json&COMMAND=-1024&OBJ_DATA=NO&MAKE_EPHEM=YES'
  + '&EPHEM_TYPE=VECTORS&CENTER=500@399&REF_PLANE=FRAME'
  + '&START_TIME=JD2461132.6&STOP_TIME=2026-Apr-10&STEP_SIZE=2h'
  + '&VEC_TABLE=1&CSV_FORMAT=YES';

https.get(url, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const raw = json.result || '';

    if (json.error) {
      console.error('Horizons error:', json.error);
      process.exit(1);
    }

    const soe = raw.indexOf('$$SOE');
    const eoe = raw.indexOf('$$EOE');
    if (soe < 0 || eoe < 0) {
      console.error('No ephemeris data found in response');
      console.error(raw.slice(0, 500));
      process.exit(1);
    }

    const lines = raw.slice(soe + 5, eoe).trim().split('\n');
    const points = [];
    for (const line of lines) {
      const cols = line.split(',').map(s => s.trim());
      if (cols.length < 5) continue;
      const x = parseFloat(cols[2]);
      const y = parseFloat(cols[3]);
      const z = parseFloat(cols[4]);
      if (isNaN(x) || isNaN(y) || isNaN(z)) continue;
      points.push(x, y, z);
    }

    const fetchedAt = new Date().toISOString();
    const count = points.length / 3;
    console.log(`// Artemis II trajectory — ${count} points, fetched ${fetchedAt}`);
    console.log(`// Paste this into artemis2.html replacing the TRAJECTORY_POINTS line`);
    console.log(`const TRAJECTORY_POINTS = [${points.join(',')}];`);
    console.log(`const TRAJECTORY_FETCHED = '${fetchedAt}';`);
  });
}).on('error', err => {
  console.error('Fetch failed:', err.message);
});
