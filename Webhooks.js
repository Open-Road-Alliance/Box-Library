function listWebhooks() {
  var response = UrlFetchApp.fetch("https://api.box.com/2.0/webhooks/", {
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + getBoxService_().getAccessToken(),
    },
  });

  var result = JSON.parse(response.getContentText());
  var items = result.entries;

  console.log(items);
}

function deleteWebhook(webhookId) {
  var response = UrlFetchApp.fetch(
    `https://api.box.com/2.0/webhooks/${webhookId}/`,
    {
      method: "DELETE",
      contentType: "application/json",
      muteHttpExceptions: true,
      headers: {
        Authorization: "Bearer " + getBoxService_().getAccessToken(),
      },
    }
  );

  return response;
}

function createWebhook(fileID, fileType, triggersArr, PUBLISHED_URL) {
  var payload = {
    address: PUBLISHED_URL,
    target: {
      id: fileID,
      type: fileType,
    },
    triggers: triggersArr,
  };
  var response = UrlFetchApp.fetch("https://api.box.com/2.0/webhooks/", {
    method: "POST",
    contentType: "application/json",
    muteHttpExceptions: true,
    payload: JSON.stringify(payload),
    headers: {
      Authorization: "Bearer " + getBoxService_().getAccessToken(),
    },
  });

  var result = JSON.parse(response.getContentText());

  console.log(result);
}
