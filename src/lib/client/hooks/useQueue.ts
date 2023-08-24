import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { RootState } from "../store/store";
import { queueActions } from "../store/reducers";
import { Track } from "../types";
import QueueToast from "@components/common/Toastify/Toasts/QueueToast";

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
    (track: Track) => {
      QueueToast({ track, isInQueue: true });
      dispatch(queueActions.queueReducer({ type: "ADD_TRACK", track }));
    },
    [dispatch],
  );

  const deleteTrack = useCallback(
    (track: Track) => {
      QueueToast({ track, isInQueue: false });
      dispatch(queueActions.queueReducer({ type: "DELETE_TRACK", track }));
    },
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
