
# Start the jukebox daemon
$player_daemon = Player::Daemon.new
$player_daemon.daemonize(ENV["MUSIC"] == "on")
