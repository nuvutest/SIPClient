cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-sip.linphone",
      "file": "plugins/cordova-plugin-sip/www/cordova-plugins-sip.js",
      "pluginId": "cordova-plugin-sip",
      "merges": [
        "cordova.plugins.sip"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-sip": "1.1.4"
  };
});