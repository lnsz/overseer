require 'net/http'
require 'httparty'

class TestController < ApplicationController
	def index
		#uri = (params[:url])
    #res = Net::HTTP.get(uri)
		uri = params[:url]
		res = HTTParty.get(uri)
		render json: { code: res.code, body: res.body } 
	end
end
