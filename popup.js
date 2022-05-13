//! Les variables.

let copyInfo;
let infoVehicule;

let prixVehicule;
let anneeVehicule = '-';

//!------------------------------------------------------------------------

//! 1 ) Récupération des informations sur le véhucule.

copyInfo = document.getElementById('copyInfo');

copyInfo.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setCopyInfo,
  });
});

function setCopyInfo() {
  //
  //! Collecte des informations.

  infoVehicule = document.getElementsByClassName('auto2012_dettophead1txt1')[0]
    .innerText;

  console.log('Designation du véhicule : ' + infoVehicule);
  // console.log('Type : Designation du véhicule : ' + typeof infoVehicule);

  prixVehicule = parseFloat(
    document
      .getElementsByClassName('detailcontact-prix')[0]
      .innerText.split('À partir de\n')[1]
      .split('€')[0]
      .split(' ')
      .join('')
  );

  console.log('Prix du prixVehicule : ' + prixVehicule);
  // console.log('Type : Prix du prixVehicule : ' + typeof prixVehicule);

  //! ------------------------------------------------------

  //*! Poste des informations à la base de données.

  const headers = new Headers();
  headers.append(
    'Content-Type',
    'application/json',
    'Access-Control-Allow-Origin: *'
  );

  const values = {
    infoVehicule: infoVehicule,
    prixVehicule: prixVehicule,
  };

  const body = JSON.stringify(values);

  const parametresDeRequete = {
    method: 'POST',
    headers: headers,
    body: body,
  };

  let url =
    'https://rocky-temple-30433.herokuapp.com/api/dataFromExtensionRoute/infoVehicule/';

  fetch(url, parametresDeRequete)
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(
        "Il y a eu un problème avec l'opération fetch : " + error.message
      );
    });

  //! ------------------------------------------------------
}
