
if not ENV["SILENT"] == "true" then
	# Start the jukebox daemon
	$player_daemon = Player::Daemon.new
	$player_daemon.daemonize
end