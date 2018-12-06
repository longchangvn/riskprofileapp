// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  openIDImplicitFlowConfiguration: {
    stsServer: '/host/',
    redirect_url: 'http://localhost:3000',
    client_id: 'b0f6ab4b-503f-4010-955f-a3385c4abe0b',
    response_type: 'id_token token',
    scope: 'openid profile stepone.api',
    post_logout_redirect_uri: 'http://localhost:3000/',
    trigger_authorization_result_event: true,
    start_checksession: false,
    silent_renew: true,
    silent_renew_offset_in_seconds: 30,
    post_login_route: '/',
    forbidden_route: '/forbidden',
    unauthorized_route: '/authentication/unauthorized',
    auto_userinfo: true,
    log_console_warning_active: true,
    log_console_debug_active: true,
    max_id_token_iat_offset_allowed_in_seconds: 30,
    override_well_known_configuration: true,
    override_well_known_configuration_url:
    `/config/`,
  },
  pagingConfig: {
    PageSize: 10
  }
};
