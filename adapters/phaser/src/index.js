import HAGELoader from "./hage-loader.js";

export { HAGELoader };

export function createHAGEBootScene(config) {
  config = config || {};
  var sceneKey = config.sceneKey || "HAGEBoot";
  var nextScene = config.nextScene;
  var preloadFn = config.preload;
  var loaderOpts = {
    productName: config.productName,
    logoUrl: config.logoUrl,
    subText: config.subText,
    gameWidth: config.gameWidth,
    gameHeight: config.gameHeight,
    brandColor: config.brandColor,
    statusStages: config.statusStages,
    minDisplayMs: config.minDisplayMs != null ? config.minDisplayMs : 600,
    skipCanvas: true,
    skipTitle: config.skipTitle === true
  };

  return {
    key: sceneKey,
    active: true,

    init: function () {
      this._hageLoader = HAGELoader.init(loaderOpts);
    },

    preload: function () {
      var loader = this._hageLoader;
      this.load.on("progress", function (value) {
        loader.setProgress(value);
      });
      this.load.on("loaderror", function (file) {
        loader.error("Asset load failed: " + (file && file.key));
      });
      if (typeof preloadFn === "function") preloadFn(this);
    },

    create: function () {
      var loader = this._hageLoader;
      loader.setProgress(1);
      loader.hide();
      if (nextScene) this.scene.start(nextScene);
    }
  };
}

export default { HAGELoader: HAGELoader, createHAGEBootScene: createHAGEBootScene };
