import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useCallback } from "react";
import { TRACK } from "../store/types/playerControlType";
import { queueActions } from "../store/reducers";

export const useQueue = () => {
  const dispatch = useDispatch();

  const { queue } = useSelector(({ queue }: RootState) => queue);

  const setQueue = useCallback(
    (queue: Array<TRACK>) =>
      dispatch(
        queueActions.queueReducer({
          type: "SET_QUEUE",
          queue,
        }),
      ),
    [dispatch],
  );

  const addTrack = useCallback(
    (track: TRACK) =>
      dispatch(queueActions.queueReducer({ type: "ADD_TRACK", track })),
    [dispatch],
  );

  const deleteTrack = useCallback(
    (track: TRACK) =>
      dispatch(queueActions.queueReducer({ type: "DELETE_TRACK", track })),
    [dispatch],
  );

  const initQueue = useCallback(
    () => dispatch(queueActions.queueReducer({ type: "INIT_QUEUE" })),
    [dispatch],
  );

  const context = {
    queue,
    setQueue: (queue: Array<TRACK>) => setQueue(queue),
    addTrack: (track: TRACK) => addTrack(track),
    deleteTrack: (track: TRACK) => deleteTrack(track),
    initQueue: () => initQueue(),
  };

  return context;
};
