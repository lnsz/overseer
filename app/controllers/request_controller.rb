
require 'httparty'

class RequestController < ApplicationController
	def index
		uri = params[:url]
		res = HTTParty.get(uri)
		render json: { code: res.code, body: res.body } 
	end
end
