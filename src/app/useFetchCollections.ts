/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getActionApi } from "src/app/getActionApi";
import { NFTCollectionPath, NFTCollectionType, SortableFields } from "src/shared/NFTCollection.type";

export function useFetchCollections(sortedField: SortableFields, page: number, initialCollections: NFTCollectionType[], isFetchTrigger: boolean) {
  const { postRequest } = getActionApi();
  const [collections, setCollections] = useState<NFTCollectionType[]>(initialCollections);
  useEffect(() => {
    const fetchCollection = async () => {
      if(!isFetchTrigger) return;
      const result = await postRequest<NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS>(
        NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS, {
          field: sortedField,
          order: "desc",
          page: page,
          pageSize: 10
        }
      )
      if(!result.success) throw new Error("Failed to fetch collections");
      setCollections(prev => [...prev, ...result.data]);
    }
    fetchCollection();
  }, [sortedField, page, isFetchTrigger])
  return { collections, setCollections }
}