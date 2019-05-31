const users = [];

const countriesWithLowerBmi = ["Chad", "Sierra Leone", "Mali", "Gambia", "Uganda", "Ghana", "Senegal", "Somalia", "Ivory Coast", "Isreal"];
const featToMeter = 0.3048;

const bmiCountryRatio = 0.82;
const computeBMI = ({
  weight,
  height,
  country
}) => {

  const heightInMeters = height * featToMeter;
  const hInMeters = height * 0.3048;
    const value = (weight / (hInMeters * hInMeters)) 
      * (countriesWithLowerBmi.includes(country) ? 0.82 : 1);
    return parseFloat(value).toFixed(1);
      
};

const getSelectedUser = (userId) => {
  return users.find(({
    id
  }) => id === userId);
};

const displaySelectedUser = ({
  target
}) => {
  const user = getSelectedUser(target.value);
  const properties = Object.keys(user);

  properties.forEach(prop => {
    const span = document.querySelector(`span[data-${prop}-value]`);
    if (span) {
      span.textContent = user[prop];
    }
  })
}

const letsCalculateBMI = () => {

  const value = document.querySelector('.select-text').value;

  const user = getSelectedUser(value);
   const bmi = computeBMI(user);
  document.querySelector('.mdc-typography--headline5').innerHTML = bmi

};

const powerupTheUI = () => {
  const button = document.querySelector('#oracle');

  const select = document.querySelector('.select-text');

  select.addEventListener('change', displaySelectedUser);

  button.addEventListener('click', letsCalculateBMI);
};

const displayUsers = (users) => {
  users.forEach(user => {
    const select = document.querySelector('.select-text');
    const option = document.createElement('option');

    option.text = user.name;
    option.value = user.id;
    select.appendChild(option);
  });
};


const fetchAndDisplayUsers = () => {
  users.push({
    age: 40,
    weight: 75,
    height: 6,
    gender: "Male",
    country: 'Nigeria',
    name: 'Charles Odili',
    id: 'dfhb454768DghtF'
  }, {
    age: 27,
    weight: 69,
    height: 6,
    country: 'Rwanda',
    gender: "Male",
    name: 'Charles NDAYISABA',
    id: 'nchu1346472bbxda'
  });

  displayUsers(users);
   const api =  'https://randomapi.com/api/y1lfp11q?key=LEIX-GF3O-AG7I-6J84'
          fetch(api)
           .then(response => {
                 return response.json();
           })  
           .then(({results}) => {
            const [ user ] = results;
          users.push(user);
          displayUsers([user]);
          }).catch(error => {
             console.log(error);
          })

};

const startApp = () => {
  powerupTheUI();
  fetchAndDisplayUsers();
};

startApp();
    