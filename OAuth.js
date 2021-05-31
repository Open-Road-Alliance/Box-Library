// Written by Amit Agarwal www.ctrlq.org

function authorizeBox() {
  var service = getBoxService_();
  if (!service.hasAccess()) {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL to authorize: %s',
      authorizationUrl);
  } else {
    Logger.log('Your account is already authorized');
  }
}

/**
* Configures the service.
*/
function getBoxService_() {
  return OAuth2.createService('Box')
    .setAuthorizationBaseUrl('https://app.box.com/api/oauth2/authorize')
    .setTokenUrl('https://app.box.com/api/oauth2/token')
    .setClientId(getClientId())
    .setClientSecret(getClientSecret())
    .setCallbackFunction(getCallbackFunction())
    .setPropertyStore(PropertiesService.getUserProperties());
}

/**
* Handles the OAuth callback.
*/
function authCallback(request) {
  var service = getBoxService_();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Your Google account is now connected to Box');
  } else {
    return HtmlService.createHtmlOutput('Sorry, the connection to Box was denied');
  }
}