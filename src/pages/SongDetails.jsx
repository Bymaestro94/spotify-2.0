import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Error from '../components/Error'
import Loader from '../components/Loader'

import { playPause, setActiveSong } from '../redux/features/playerSlice'
import {
	useGetSongDetailsQuery,
	useGetSongRelatedQuery,
} from '../redux/services/shazamCore'

const SongDetails = () => {
	const dispatch = useDispatch()
	const { songid, id: artistId } = useParams()
	const { activeSong, isPlaying } = useSelector(state => state.player)

	const {
		data,
		isFetching: isFetchinRelatedSongs,
		error,
	} = useGetSongRelatedQuery({ songid })
	const { data: songData, isFetching: isFetchinSongDetails } =
		useGetSongDetailsQuery({ songid })

	if (isFetchinSongDetails && isFetchinRelatedSongs)
		return <Loader title='Searching song details' />

	console.log(songData)

	if (error) return <Error />

	const handlePauseClick = () => {
		dispatch(playPause(false))
	}

	const handlePlayClick = () => {
		dispatch(setActiveSong({ song, data, i }))
		dispatch(playPause(true))
	}

	return (
		<div className='flex flex-col'>
			<DetailsHeader artistId={artistId} songData={songData} />

			<div className='mb-10'>
				<h2 className='text-white text-3xl font-bold'>Lyrics:</h2>

				<div className='mt-5'>
					{songData?.section[1].type === 'LYRICS' ? (
						songData?.section[1]?.text.map((line, i) => (
							<p
								key={`lyrics-${line}-${i}`}
								className='text-gray-400 text-base my-1'
							>
								{line}
							</p>
						))
					) : (
						<p className=''>Sorry, No lyrics found!</p>
					)}
				</div>
			</div>

			<RelatedSongs
				data={data}
				artistId={artistId}
				isPlaying={isPlaying}
				activeSong={activeSong}
				handlePauseClick={handlePauseClick}
				handlePlayClick={handlePlayClick}
			/>
		</div>
	)
}

export default SongDetails
