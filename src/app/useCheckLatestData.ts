/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect, useState } from "react";
import { getActionApi } from "src/app/getActionApi";
import { NFTCollectionPath, NFTCollectionType } from "src/shared/NFTCollection.type";

export function useCheckLatestData(collection: NFTCollectionType[]) {
  const { getRequest } = getActionApi();
  const [isNewData, setIsNewData] = useState(false);
  let latestItem = collection.reduce((prev, current) => {
    if (!current.updatedAt) return prev;
    if (!prev.updatedAt) return current;
    return (prev.updatedAt < current.updatedAt) ? prev : current;
  }, {} as NFTCollectionType);
  
  useEffect(() => {
    const fetchLatestData = async () => {
      const result = await getRequest<NFTCollectionPath.GET_LATEST_UPDATEDAT>(NFTCollectionPath.GET_LATEST_UPDATEDAT)
      if(!result.success) throw new Error("Failed to fetch collections");
      if(!result.updatedAt) throw new Error("Not fetch updatedAt");
      const timeDifference = moment(result.updatedAt).diff(moment(latestItem.updatedAt), 'seconds');
      setIsNewData(timeDifference > 60);
    }
    fetchLatestData();
  }, [])
  return { isNewData, setIsNewData };
}