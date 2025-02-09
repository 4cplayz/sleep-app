module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Use 'module:metro-react-native-babel-preset' if not using Expo
    plugins: ['react-native-reanimated/plugin'], // Make sure this is the last plugin
  };
};
