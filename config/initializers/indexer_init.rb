if ENV["INDEXER"] == "on" then

	# Start the jukebox daemon
	$indexer_daemon = Indexer::Daemon.new
	$indexer_daemon.daemonize(ENV['SKIP_INDEX'] == "on")

end