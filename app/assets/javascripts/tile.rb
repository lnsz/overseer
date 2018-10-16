require 'opal'
require 'clearwater'
require 'clearwater/memoized_component'
require 'browser'
require 'bowser/http'

class Tile < Clearwater::MemoizedComponent

  def initialize(protocol, uri)
		@online = true
    @protocol = protocol
    @uri = uri
    @url = protocol + uri
    @status = 200
    refresh
  end

  def refresh
    Bowser::HTTP.fetch('/test?url=' + @url)
	    .then(&:json)
			.then { |response| @online = true; @status = response['code']; call } 
      .catch { |exception| (@online = false); (@status = 404); call }
  end

  def render
		style = @online == true ? Style.green : Style.red
		div({style: style}, [
      h2({style: Style.h1}, [@uri, br, @status]),
    ])
  end

  module Style
    module_function

    def green
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
    
		def red
      {
				background_color: 'rgba(255, 0, 0, 0.5)',
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
        font_family: 'Arial',
				text_align: 'center'
      }
    end
  end
end
