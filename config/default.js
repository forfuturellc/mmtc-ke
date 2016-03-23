// module variables
var config = {};


// server configuration
config.server = {};
config.server.port = process.env.OPENSHIFT_NODEJS_PORT || 8090;
config.server.ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


// site configuration
config.site = {};
config.site.title = `Mobile Money Transaction Cost in Kenya`;
config.site.title_short = `mmtc | ke`;
config.site.email = `we@forfuture.co.ke`;
config.site.description = `An easy way to calculate cost of mobile money transcations in Kenya`
config.site.url = `mmtc.forfuture.co.ke`;
config.site.baseurl = ``;
config.site.author = {};
config.site.author.name = 'Forfuture LLC';
config.site.author.url = 'http://forfuture.co.ke';


// export the configuration
exports = module.exports = config;
