module.exports = {
  build: {
    auth: {
      host: config.dev.ftp.auth.host,
      port: config.dev.ftp.auth.port,
      authKey: config.dev.ftp.auth.authKey
    },
    src: config.dev.ftp.src,
    dest: config.dev.ftp.dest,
    exclusions: config.dev.ftp.exclusions,
    forceVerbose: true
  }
};
