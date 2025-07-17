import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetChannelsQuery } from '@/store/channelsApi'
import {
  setSelectedChannel,
  selectSelectedChannel,
} from '@/store/channelsSlice'

export const useChannels = () => {
  const dispatch = useDispatch()
  const { data: apiChannels, isLoading, isSuccess, error } = useGetChannelsQuery()

  const selectedChannel = useSelector(selectSelectedChannel)

  useEffect(() => {
    if (isSuccess && apiChannels.length > 0 && !selectedChannel) {
      dispatch(setSelectedChannel(apiChannels[0]))
    }
  }, [apiChannels, selectedChannel, dispatch, isSuccess])

  return {
    channels: apiChannels,
    selectedChannel,
    isLoading,
    error,
  }
}
