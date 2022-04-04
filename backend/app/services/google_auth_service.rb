require 'google/api_client/client_secrets'
require 'google/apis/calendar_v3'

class GoogleAuthService
  GOOGLE_API_CLIENT_ID = 'CLIENT_ID.apps.googleusercontent.com'
  GOOGLE_API_CLIENT_SECRET = 'CLIENT_SECRET'

  def initialize(code)
    @code = code
  end

  def call
    client = Signet::OAuth2::Client.new(client_params)
    client.fetch_access_token!
  end

  private

  def client_params
    {
      client_id: GOOGLE_API_CLIENT_ID,
      client_secret: GOOGLE_API_CLIENT_SECRET,
      scope: Google::Apis::CalendarV3::AUTH_CALENDAR_READONLY,
      code: @code,
      authorization_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_credential_uri: 'https://oauth2.googleapis.com/token',
      redirect_uri: 'postmessage',
      grant_type: 'authorization_code'
    }
  end
end
