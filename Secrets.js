function setSecrets(CLIENT_ID, CLIENT_SECRET, CALLBACK_FUNCTION) {
  PropertiesService.getScriptProperties().setProperty('CLIENT_ID', CLIENT_ID);
  PropertiesService.getScriptProperties().setProperty('CLIENT_SECRET', CLIENT_SECRET);
  PropertiesService.getScriptProperties().setProperty('CALLBACK_FUNCTION', CALLBACK_FUNCTION);
}

function getSecret(typeOfSecret) {
  return PropertiesService.getScriptProperties().getProperty(typeOfSecret);
}

function getClientId() {
  return getSecret('CLIENT_ID');
}

function getClientSecret() {
  return getSecret('CLIENT_SECRET');
}

function getCallbackFunction() {
  return getSecret('CALLBACK_FUNCTION');
}