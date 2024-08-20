import { _GET } from "@lib/server/rootAPI";
import { useQuery } from "@tanstack/react-query";

export const getMyAlbumData = ({ id }: { id: string }) => {
  const {
    data: myAlbumData,
    isLoading: isMyAlbumLoading,
    error,
  } = useQuery({
    queryKey: ["myAlbum"],
    queryFn: async () => await _GET(`api/users/${id}/a/albums`),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return { myAlbumData, isMyAlbumLoading, error };
};
