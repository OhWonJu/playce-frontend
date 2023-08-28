import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { RootState } from "../store/store";
import { queueActions } from "../store/reducers";
import { Track } from "../types";
import QueueToast from "@components/common/Toastify/Toasts/QueueToast";
import { useMutation } from "@tanstack/react-query";
import { _PATCH } from "@lib/server/rootAPI";
import { UpdateQueueProps } from "src/commonTypes/queue";

export const useQueue = () => {
  // React Query //
  const mutation = useMutation({
    mutationFn: async (formData: UpdateQueueProps) =>
      await _PATCH("api/users/update/queue", formData),
    onSuccess: data => {
      // console.log("SUCCESS: ", data);
    },
  });
  // -------------------------------------------------------------- //

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
      mutation.mutate({ isAdd: true, trackId: track.id });
    },
    [dispatch],
  );

  const deleteTrack = useCallback(
    (track: Track) => {
      QueueToast({ track, isInQueue: false });
      dispatch(queueActions.queueReducer({ type: "DELETE_TRACK", track }));
      mutation.mutate({ isAdd: false, trackId: track.id });
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
