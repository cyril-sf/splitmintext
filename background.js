'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'mint.intuit.com', schemes: ['https']},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

const baseUrl = 'https://secure.splitwise.com/oauth/authorize';
const urlParams = {
  'redirect_uri' : chrome.identity.getRedirectURL(),
  'response_type' : 'code',
  'client_id' : 'dCSHbJPoQYPcJ7JA2cSiyf9eJsJFoyNAW7BnIdBC',
//   'code_challenge': 'MChCW5vD-3h03HMGFZYskOSTir7II_MMTb8a9rJNhnI',
//   'code_challenge_method': 'S256',
  'state': 'some random string to protect against cross-site request forgery attacks'
//   'scope' : 'https://mail.google.com/ https://www.google.com/m8/feeds/',
//   'include_granted_scopes' : 'true'
};

const providerDetails = {
  url : baseUrl + '?' + new URLSearchParams(urlParams).toString(),
  interactive : true
}

const callback = (token) => {
    console.log('callback', token);
    chrome.identity.clearAllCachedAuthTokens(() => {});
}

chrome.runtime.onMessage.addListener(() => {
    console.log('login', providerDetails, urlParams);
    chrome.identity.launchWebAuthFlow(providerDetails, callback);
  
    return true;
  });