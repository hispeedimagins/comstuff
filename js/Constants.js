
const PARAM_VIEW_MODE = 'view_mode';
const VIEW_MODE_WHISTLE = 'whistle';
const WHISTLE_SIGNUP_COMPLETE = 'whistle_signup_complete';
const SIGNUP_URL = 'https://signup.steemit.com';
const SUBMIT_FORM_ID = 'submitStory';


const noImageText = '(Image not shown due to low ratings)';
const img_proxy_prefix = 'https://steemitimages.com/';
const loadieStartPercent = 0.2;

//Change to true to use as your personal website
const useAsPersonalWebsite = false;
//this username will be used for the personal site, change it to yours
const personalWebsiteUsernameSteem = "hispeedimagins";

//this will be used a bit later on
const tagToUse = "comedyopenmic";
const tagAccountname = "comedyopenmic";

$STM_Config = {
    //fb_app: config.get('facebook_app_id'),
    //steemd_connection_client: config.get('steemd_connection_client'),
    //steemd_connection_server: config.get('steemd_connection_server'),
    //steemd_use_appbase: config.get('steemd_use_appbase'),
    //chain_id: config.get('chain_id'),
    //address_prefix: config.get('address_prefix'),
    img_proxy_prefix: img_proxy_prefix,
    ipfs_prefix: false
    //disable_signups: config.get('disable_signups'),
    //read_only_mode: config.get('read_only_mode'),
    //registrar_fee: config.get('registrar.fee'),
    //upload_image: config.get('upload_image'),
    //site_domain: config.get('site_domain'),
    //facebook_app_id: config.get('facebook_app_id'),
    //google_analytics_id: config.get('google_analytics_id'),
};