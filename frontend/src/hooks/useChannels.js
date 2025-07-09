import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetChannelsQuery } from '@/store/channelsApi'
import {
  setChannels,
  setSelectedChannel,
  selectChannels,
  selectSelectedChannel,
} from '@/store/channelsSlice'

export const useChannels = () => {
  const dispatch = useDispatch()
  const { data: apiChannels, isLoading, error } = useGetChannelsQuery()

  const channels = useSelector(selectChannels)
  const selectedChannel = useSelector(selectSelectedChannel)

  useEffect(() => {
    if (apiChannels) {
      dispatch(setChannels(apiChannels))
    }
  }, [apiChannels, dispatch])

  useEffect(() => {
    if (channels.length > 0 && !selectedChannel) {
      dispatch(setSelectedChannel(channels[0]))
    }
  }, [channels, selectedChannel, dispatch])

  return {
    channels,
    selectedChannel,
    isLoading,
    error,
  }
}
