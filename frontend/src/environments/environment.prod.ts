export const environment = {
  production: true,
  openIDImplicitFlowConfiguration: {
    stsServer: 'https://stepone-v2-api-dev.azurewebsites.net/',
    redirect_url: 'http://localhost:3000/',
    client_id: '2B20C81D2E814C429C6471237CFD1B7C',
    response_type: 'id_token token',
    scope: 'openid profile stepone_api_accountmanagement',
    post_logout_redirect_uri: '/authentication/unauthorized',
    trigger_authorization_result_event: true,
    start_checksession: false,
    silent_renew: true,
    silent_renew_offset_in_seconds: 30,
    post_login_route: '/',
    forbidden_route: '/forbidden',
    unauthorized_route: '/authentication/unauthorized',
    auto_userinfo: true,
    log_console_warning_active: false,
    log_console_debug_active: false,
    max_id_token_iat_offset_allowed_in_seconds: 30,
    override_well_known_configuration: true,
    override_well_known_configuration_url:
      'https://stepone-v2-api-dev.azurewebsites.net/.well-known/openid-configuration',
  },
  pagingConfig: {
    PageSize: 1
  }
};
