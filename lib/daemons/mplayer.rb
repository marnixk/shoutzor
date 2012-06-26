#!/usr/bin/env ruby

# You might want to change this
ENV["RAILS_ENV"] ||= "development"

require File.dirname(__FILE__) + "/../../config/application"
require File.join(File.dirname(__FILE__),'..','lib','mplayer-ruby')
Rails.application.require_environment!

# Replace this with your code
Rails.logger.auto_flushing = true

$running = true
Signal.trap("TERM") do 
  $running = false
end


player = MPlayer::Slave.new
player.load_file "/home/marnix/blind_willie.mp3", :no_append

while($running) do
	
  Rails.logger.info "#{player.time_position} / #{player.time_length}"
  sleep 1
  
end

player.quit