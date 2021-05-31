# Box Library (Google Apps Script)

This is a simple wrapper that facilitates communication between Google Apps Script and the Box API.

## Prerequisites

To successfully use this library, you must first:

- Set up or have access to a [Box App](https://app.box.com/developers/console) (follow [this guide](https://developer.box.com/guides/mobile/ios/quick-start/configure-box-app/) to create an app from scratch)
- Grab your Client ID and Client Secret from the _Configuration_ tab of your Box App

If your secrets are ever compromised, make sure you reset your secrets and re-authorize your app.

## Setup

To add this library to your scrupt file, do the following in the Apps Script code editor:

1. Click on the menu item "Resources > Libraries..."
2. In the "Add a Library" text box, enter the script ID `1cPLsujwI7cGb7btPDrdacq8XxzqNUoqvV12TkEKt2GVTr8P1PuS3ebQr` and click the "Add" button.
3. Choose a version in the dropdown box (usually best to pick the latest version).
4. Click the "Save" button.

In the _new_ editor:

1. Click on the plus sign next to _Libraries_
2. In the _Script ID_ text box, enter the script ID `1cPLsujwI7cGb7btPDrdacq8XxzqNUoqvV12TkEKt2GVTr8P1PuS3ebQr` and click the "Lookup" button.
3. Choose a version in the dropdown box (usually best to pick the latest version).
4. Specify an Identifier (this is the name that will be referenced throughout your script)

If you are [setting explicit scopes](https://developers.google.com/apps-script/concepts/scopes#setting_explicit_scopes) in your manifest file, ensure that the following scope is included:

- `https://www.googleapis.com/auth/script.external_request`

## Usage

Using the library has the following basic steps:

### 1. Pass in secrets

This should happen near the top of your script.

When connecting to this library, you must always use the `setSecrets` method to pass in the Client ID, Client Secret, and Callback Function\* before calling any of the other methods.

`BoxLibrary.setSecrets(<<CLIENT_ID>>, <<CLIENT_SECRET>>, <<CALLBACK_FUNCTION>>)`

The Callback Function should generally be `BoxLibrary.authCallback`, but the library identifier can be whatever you set when adding the library.

\*Normally we would just hardcode the Callback Function name in this library, but this was causing some scope errors when running the `authorizationUrl` from `authorizeBox`.

### 2. Authorization

This only needs to happen the first time you run your script.

This library uses the public [OAuth2 for Apps Script library](https://github.com/googleworkspace/apps-script-oauth2) to handle the OAuth requests.

`authorizeBox()`

In the console log, grab the `authorization url` and navigate to it in your browser. Allow your app the necessary permissions and you should see the following text on the next screen:

`Your Google account is now connected to Box`

### 3. Make Box requests

Now that you have passed in your secrets and authorized your Box app, you can make requests that hit the Box API. This library currently supports the following methods:

- Managing webhooks (listing, deleting, and creating)
- Downloading files
- Downloading text representations
- Grabbing file information

More functionality will be added in the future.

## Working with webhooks

The reason this library was created was to handle Box webhooks and webhooks are a unique enough technology that I figured I should add some words here for newcomers.

Webhooks (sort of like the name implies) allow you to attach event triggers to files and folders. In essense you are _hooking_ actions on to _web_ events. With APIs, you are normally sending requests out-of-the-blue to see a snapshot of the data and then performing actions based on the results you get. This can be very resource-intensive if you constantly have to hit an API just to see if a new file has been added or a value has been changed (especially if you don't know when a change is going to be made). Webhooks alleviate some of this concern by flipping the dynamic. Instead of you requesting information from the API, the API is sending a signal to you whenever a pre-defined condition is triggered. With that signal, you can do whatever you want: add an entry to a spreadsheet, hit the API for additional information, etc.

In this specific case, we can use webhooks to notify us whenever a file has been uploaded. In the Box ecosystem, there can only be _one_ webhook per target, application, user combination. The _target_ is the file or folder that you would like to monitor. The _application_ is the URL of the app that will be handling the webhook signal. If you are getting a `409` error, you likely need to delete an existing webhook (to identify the webhook Id for deletion, use `listWebhooks`).

If the application URL for your app changes, you will need to delete the existing webhook and create a new one. When using Google Web Apps, this will most commonly happen when deploying a new version of your web app.

## Additional Resources

- [Box API Getting Started](https://developer.box.com/get-started/)
- [Box API Apps Console](https://app.box.com/developers/console)
- [Box Webhooks](https://developer.box.com/guides/webhooks/)
- [OAuth2 Google Sciprt Library](https://github.com/googleworkspace/apps-script-oauth2)
