function downloadPDF(fileId) {
  var url = 'https://api.box.com/2.0/files/' + fileId + '/content/';
  var response = UrlFetchApp.fetch(url, {
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + getBoxService_().getAccessToken()
    }
  });

  return response.getBlob();
}

function downloadTextRepresentation(urlTemplate) {
  var token = getBoxService_().getAccessToken();
  var response = UrlFetchApp.fetch(urlTemplate, {
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  Logger.log(response.getContentText());

  return response.getContentText();
}

function getFileInformation(fileId) {
  var url = 'https://api.box.com/2.0/files/' + fileId + '?fields=representations,name,created_at,created_by';
  var response = UrlFetchApp.fetch(url, {
    contentType: 'application/json',
    headers: {
      'x-rep-hints': '[extracted_text]',
      'Authorization': 'Bearer ' + getBoxService_().getAccessToken()
    }
  });

  return JSON.parse(response.getContentText());
}