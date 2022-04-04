class OauthCredentialsController < ApplicationController
  def index
    render json: OauthCredential.all
  end
end
