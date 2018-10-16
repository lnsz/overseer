require 'opal'
require 'clearwater'
# require 'browser'
require 'bowser/http'

class Tile
  include Clearwater::Component

  def initialize(protocol, uri, status)
    @protocol = protocol
    @uri = uri
    @url = protocol + uri
    @status = 200
    refresh
  end

  def refresh
    # Browser::HTTP.get "https://google.com" do
    #   on :success do |res|
    #     alert res.json.inspect
    #   end
    # end
    Bowser::HTTP.fetch(@url)
      .then(&:json)
      .then { |response| @status = response.status } 
      .catch { |exception| @status = 404 }
  end

  def render
    div({style: Style.tile}, [
      h2({style: Style.h1}, [@uri, ' ', @status])
    ])
  end

  module Style
    module_function

    def tile
      {
        background_color: 'rgba(0, 255, 0, 0.5)',
        align_self: 'auto',
        margin: 'auto',
        display: 'flex',
        align_items: 'center',
        justify_content: 'center',
        width: '30%', height: '30%'
      }
    end

    def h1
      {
        margin: '0px',
        color: 'rgba(255, 255, 255, 1)',
        font_family: 'Trebuchet MS'
      }
    end
  end
end