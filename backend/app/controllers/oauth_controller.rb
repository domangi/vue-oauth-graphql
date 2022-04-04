class OauthController < ApplicationController
  def connect
    auth_code = params[:auth_code]
    credentials = GoogleAuthService.new(auth_code).call
    credential = OauthCredential.new(credentials.slice('access_token', 'refresh_token'))

    if credential.save
      render json: credential, status: :created
    else
      render json: { error: credential.errors.full_messages }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end
end
