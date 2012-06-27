module Player

	class VolumeControl

		attr_accessor :volume
		attr_accessor :muted

		#
		#  Set volume
		#
		def set_volume(n)
			volume_command "set Master #{n.to_i}"
		end

		#
		#
		#
		def mute
			volume_command "set Master toggle"
		end

	protected

		def volume_command(args)
			system "amixer --quiet #{args}"
		end

	end

end
