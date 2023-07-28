import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useCallback } from "react";
import { queueActions } from "../store/reducers";
import { Track } from "../types";

export const useQueue = () => {
  const dispatch = useDispatch();

  const { queue } = useSelector(({ queue }: RootState) => queue);

  const setQueue = useCallback(
    (queue: Array<Track>) =>
      dispatch(
        queueActions.queueReducer({
          type: "SET_QUEUE",
          queue,
        }),
      ),
    [dispatch],
  );

  const addTrack = useCallback(
    (track: Track) =>
      dispatch(queueActions.queueReducer({ type: "ADD_TRACK", track })),
    [dispatch],
  );

  const deleteTrack = useCallback(
    (track: Track) =>
      dispatch(queueActions.queueReducer({ type: "DELETE_TRACK", track })),
    [dispatch],
  );

  const initQueue = useCallback(
    () => dispatch(queueActions.queueReducer({ type: "INIT_QUEUE" })),
    [dispatch],
  );

  const context = {
    queue,
    setQueue: (queue: Array<Track>) => setQueue(queue),
    addTrack: (track: Track) => addTrack(track),
    deleteTrack: (track: Track) => deleteTrack(track),
    initQueue: () => initQueue(),
  };

  return context;
};
