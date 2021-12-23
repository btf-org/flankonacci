module.exports = {
  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: "default",
      overrideEndpoint: false,
      region: "us-west-2",
      bucket: "flankonacci",
      createBucket: false,
      staticHosting: false,
      staticIndexPage: "index.html",
      staticErrorPage: "error.html",
      assetPath: "dist",
      assetMatch: "**",
      deployPath: "/",
      acl: "public-read",
      pwa: false,
      enableCloudfront: false,
      pluginVersion: "4.0.0-rc3",
      uploadConcurrency: 5,
    },
  },
};
