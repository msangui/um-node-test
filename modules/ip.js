const os = require( 'os' );

const networkInterfaces = os.networkInterfaces();

module.exports  = {
  getIP() {
    return Object.keys(networkInterfaces)
      .map(ni => networkInterfaces[ni][0])
      .filter(ni => ni.family === 'IPv4')
      .map(ni => ni.address)[0];
  }
};
