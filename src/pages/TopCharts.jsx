import { useSelector } from 'react-redux'

import Error from '../components/Error'
import Loader from '../components/Loader'
import SongCard from '../components/SongCard'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'

const TopCharts = () => {
	const { data, isFetching, error } = useGetTopChartsQuery()
	const { activeSong, isPlaying } = useSelector(state => state.player)

	if (isFetching) return <Loader title='Loading top Charts' />

	if (error) return <Error />

	return (
		<div className='flex flex-col'>
			<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
				Discover Top Charts
			</h2>

			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{data.map((song, i) => (
					<SongCard
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
						i={i}
					/>
				))}
			</div>
		</div>
	)
}

export default TopCharts
