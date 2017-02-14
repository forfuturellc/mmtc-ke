/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Application configurations.
 */


// module variables
const config = {};


// server configuration
config.server = {};
config.server.port = process.env.NODEJS_PORT || 8080;
config.server.ip = process.env.NODEJS_IP || '0.0.0.0';


// site configuration
config.site = {};
config.site.title = 'Mobile Money Transaction Cost in Kenya';
config.site.title_short = 'mmtc | ke';
config.site.email = 'we@forfuture.co.ke';
config.site.description = 'An easy way to calculate cost of mobile money transcations in Kenya';
config.site.url = 'mmtc.forfuture.tech';
config.site.baseurl = '';
config.site.author = {};
config.site.author.name = 'Forfuture LLC';
config.site.author.url = 'https://forfuture.tech';


// export the configurations
exports = module.exports = config;
