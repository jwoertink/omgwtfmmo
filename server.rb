require 'rubygems'
require 'em-websocket'
require 'sinatra/base'

EventMachine.run do
  
  class App < Sinatra::Base
    get '/' do
      return 'foo'
    end
  end
  
  EventMachine::WebSocket.start(:host => '0.0.0.0', :port => 8080) do |ws|
    
    ws.onopen {
      ws.send "connected!"
    }
    
    ws.onmessage { |msg| 
      puts "Message: #{msg}"
    }
    
    ws.onclose {
      ws.send "WebSocket closed"
    }
    
  end
  
  App.run!({:port => 3000})
end